# MangoRooms

Website of MangoRooms, a family-run guesthouse in Brașov: <https://www.mangorooms.ro>.

React + Vite + TypeScript, prerendered to static HTML at build time.

## Development

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check, build and prerender into dist/
npm run lint
```

The booking form needs the EmailJS and reCAPTCHA keys in `.env`
(`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_USER_ID`,
`VITE_CAPTCHA_SITE_KEY`). `.env` is not committed.

### Pages, prerendering and the sitemap

- Routes live in [`src/routes.tsx`](src/routes.tsx). The router, the prerender and
  `sitemap.xml` all read that list, so a new page only has to be added there.
- Each page sets its title, description and canonical URL with the
  [`<Seo>`](src/components/Seo.tsx) component. Site-wide tags (icons, JSON-LD,
  `og:image`) are in [`index.html`](index.html).
- [`scripts/vite-plugin-prerender.mjs`](scripts/vite-plugin-prerender.mjs) runs inside
  `vite build`. It renders every route to `dist/<route>/index.html`, renders the
  404 page to `dist/404.html` and generates `dist/sitemap.xml` from the indexable
  routes. The build fails if a route does not render its own canonical link.

## Hosting and deployment

The site runs in Docker on a VPS it shares with other projects (LaDespani among
them). nginx on the VPS proxies `mangorooms.ro` and `www.mangorooms.ro` to
`localhost:3001`, and Cloudflare sits in front of nginx. `www.mangorooms.ro` is
canonical; nginx redirects the bare domain to it.

### How a deploy works

Every push to `master` (or a manual run of the **Deploy** workflow) runs
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. The workflow SSHes into the VPS as root with a deploy key. In
   `authorized_keys` that key is pinned to one script, so the workflow sends no
   command. The server runs [`deploy/deploy.sh`](deploy/deploy.sh), which:
   1. takes a lock (`/tmp/mangorooms-deploy.lock`), so deploys never overlap;
   2. fetches `master` and runs `git reset --hard`. Untracked files such as `.env` stay;
   3. builds `mangorooms:<short-sha>` *before* touching the running container,
      so a failed build changes nothing on the live site;
   4. replaces the `mangorooms` container, publishing `127.0.0.1:3001` to the
      container's port 3000. Localhost only, because Docker-published ports
      bypass ufw and would otherwise expose the origin around Cloudflare;
   5. checks health: `/` must return 200 and `/__deploy-check__` must return 404;
   6. rolls back to the previous image if that check fails;
   7. keeps the 3 newest `mangorooms` images and prunes build cache unused for
      7 days. It never touches other sites' images or containers.
2. The workflow then checks the live site through Cloudflare. The 2nd `<loc>` in
   `/sitemap.xml` must serve a page whose `rel="canonical"` is its own URL, and an
   unknown URL must return 404. This catches a server that falls back to the
   homepage for every URL, which looks healthy because every URL returns 200.

The script's defaults can be overridden with `MR_REPO_DIR` (`/root/MangoRooms`),
`MR_CONTAINER` (`mangorooms`) and `MR_PUBLISH` (`127.0.0.1:3001`).

The [`Dockerfile`](Dockerfile) is multi-stage. The first stage runs `npm ci` and
`npm run build`. The second ships only `dist/` and [`serve.json`](serve.json) with
`serve@14`. `serve.json` holds clean URLs, `trailingSlash: false`, redirects, and
the security and cache headers. `.dockerignore` deliberately does **not** exclude
`.env`, because Vite bakes the `VITE_*` keys into the bundle at build time.

> **Never run `serve -s`** (single-page mode), in the Dockerfile or anywhere else.
> It serves the root `index.html` for every URL: the prerendered pages are never
> used and every 404 becomes a 200 copy of the homepage. The health check and the
> live check both fail on it, by design.

### Secrets

Set these in the repo's `production` environment (Settings → Environments), or
at repo level:

| Secret | Value |
| --- | --- |
| `DEPLOY_HOST` | The VPS IP. Kept secret because Cloudflare hides the origin. |
| `DEPLOY_SSH_KEY` | Private half of an ed25519 key used only by this repo. Do not reuse another site's key: each key in `authorized_keys` is pinned to one script. |
| `DEPLOY_KNOWN_HOSTS` | Output of `ssh-keyscan <vps-ip>` (same value as LaDespani's). |

```sh
ssh-keygen -t ed25519 -N '' -C github-actions-deploy@mangorooms -f ~/.ssh/mangorooms_deploy
gh api -X PUT repos/Gargant0373/MangoRooms/environments/production
gh secret set DEPLOY_HOST        --env production --repo Gargant0373/MangoRooms --body '<vps-ip>'
gh secret set DEPLOY_SSH_KEY     --env production --repo Gargant0373/MangoRooms < ~/.ssh/mangorooms_deploy
ssh-keyscan <vps-ip> | gh secret set DEPLOY_KNOWN_HOSTS --env production --repo Gargant0373/MangoRooms
```

### One-time server setup (as root on the VPS)

```sh
# 1. Checkout, with .env next to it (the VITE_* keys).
git clone https://github.com/Gargant0373/MangoRooms.git /root/MangoRooms

# 2. Pin the deploy key to the script. Paste the public half of the key
#    (~/.ssh/mangorooms_deploy.pub); no env prefix, the defaults fit this server.
echo 'command="/root/MangoRooms/deploy/deploy.sh",restrict ssh-ed25519 AAAA… github-actions-deploy@mangorooms' >> /root/.ssh/authorized_keys

# 3. nginx must proxy the domain to the port the script publishes (3001).
grep proxy_pass /etc/nginx/sites-available/mangorooms.ro.conf

# 4. First deploy by hand, then run the Deploy workflow from the Actions tab.
/root/MangoRooms/deploy/deploy.sh
```
