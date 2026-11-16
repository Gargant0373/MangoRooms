#!/usr/bin/env bash
# Builds master and replaces the running container, rolling back if the new
# one fails its health check. Run by GitHub Actions over SSH: the deploy key is
# pinned to this script in /root/.ssh/authorized_keys, so the workflow never
# sends a command. Safe to run by hand.
#
# Everything is inside main() so bash has parsed the whole file before
# `git reset` rewrites it on disk mid-run.
set -euo pipefail
main() {
  local repo_dir="${MR_REPO_DIR:-/root/MangoRooms}"
  local name="${MR_CONTAINER:-mangorooms}"
  # Host port nginx proxies www.mangorooms.ro to (LaDespani uses 3000 on the
  # same VPS). Bound to 127.0.0.1 only: Docker-published ports bypass ufw, so
  # a bare "3001" would let anyone reach the origin directly, around
  # Cloudflare. The health check uses the port part.
  local publish="${MR_PUBLISH:-127.0.0.1:3001}"
  local repo_url="https://github.com/Gargant0373/MangoRooms.git"
  local branch="master"
  if command -v flock >/dev/null; then exec 9>/tmp/mangorooms-deploy.lock; flock 9; fi
  if [ ! -d "$repo_dir/.git" ]; then git clone --quiet --branch "$branch" "$repo_url" "$repo_dir"; fi
  cd "$repo_dir"
  # Untracked files such as .env (the VITE_* keys) survive the reset.
  git fetch --quiet "$repo_url" "$branch"
  git reset --quiet --hard FETCH_HEAD
  local rev; rev="$(git rev-parse --short HEAD)"
  # Build before touching the running container: a failed build leaves the
  # live site exactly as it was.
  echo "==> building $rev"
  docker build --tag "$name:$rev" .
  local previous; previous="$(docker inspect --format '{{.Config.Image}}' "$name" 2>/dev/null || true)"
  echo "==> starting $name:$rev"
  start "$name" "$name:$rev" "$publish"
  if ! healthy "$publish"; then
    echo "==> $name:$rev failed its health check" >&2
    docker logs --tail 40 "$name" >&2 || true
    if [ -n "$previous" ]; then
      echo "==> rolling back to $previous" >&2
      start "$name" "$previous" "$publish"
      if healthy "$publish"; then echo "==> $previous is serving again" >&2
      else echo "==> $previous is unhealthy too; the site is down" >&2; fi
    fi
    exit 1
  fi
  # Only this site's images: `docker images <repo>` lists the mangorooms
  # repository alone, newest first. Keep the 3 newest.
  docker images "$name" --format '{{.Tag}}' | tail -n +4 |
    while read -r tag; do docker rmi "$name:$tag" >/dev/null 2>&1 || true; done
  docker builder prune --force --filter until=168h >/dev/null
  echo "==> deployed $rev"
}
start() {
  docker rm --force "$1" >/dev/null 2>&1 || true
  docker run --detach --name "$1" --restart unless-stopped --publish "$3:3000" "$2" >/dev/null
}
# Healthy means the homepage is served and unknown URLs are real 404s. A
# server in single-page mode (`serve -s`) answers 200 for everything and fails.
healthy() {
  local base="http://127.0.0.1:${1##*:}"
  for _ in $(seq 1 30); do
    if [ "$(status "$base/")" = 200 ] && [ "$(status "$base/__deploy-check__")" = 404 ]; then return 0; fi
    sleep 1
  done
  return 1
}
status() { curl --silent --output /dev/null --write-out '%{http_code}' "$1" || true; }
main "$@"
