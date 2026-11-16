/**
 * Renders every route to static HTML at build time, plus dist/404.html and
 * dist/sitemap.xml.
 *
 * This is a Vite plugin rather than an npm `postbuild` script on purpose: it
 * runs inside `vite build` itself, so no way of invoking the build can skip it
 * and ship the same empty shell for every URL.
 *
 * Output layout: dist/index.html for "/", dist/<route>/index.html for the rest.
 * `serve` (see serve.json: cleanUrls, trailingSlash: false) maps /rooms to
 * dist/rooms/index.html, and answers unknown URLs with dist/404.html and a 404.
 */
import { mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const SSR_OUT = 'dist-ssr';

function sitemap(mod) {
  const entries = mod.routes
    .filter((r) => r.indexable)
    .map((r) =>
      [
        '  <url>',
        `    <loc>${mod.ORIGIN}${r.path}</loc>`,
        `    <changefreq>${r.changefreq}</changefreq>`,
        `    <priority>${r.priority}</priority>`,
        '  </url>',
      ].join('\n'),
    );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');
}

// The placeholder line is already indented; indent the lines after it to match.
const indent = (s) => s.split('\n').join('\n  ');

export function prerender() {
  return {
    name: 'mangorooms-prerender',
    // Only in a client build; never in the SSR pass this plugin kicks off,
    // which would recurse.
    apply: (_config, { command }) => command === 'build' && !process.env.MR_SSR,
    enforce: 'post',

    async closeBundle() {
      const { build } = await import('vite');
      const outDir = join(process.cwd(), 'dist');
      const ssrDir = join(process.cwd(), SSR_OUT);

      // Build a Node-targeted bundle of the same app (see `apply` for MR_SSR).
      process.env.MR_SSR = '1';
      try {
        await build({
          logLevel: 'warn',
          // Bundle dependencies instead of leaving them external, so bare Node
          // never has to resolve a package's ESM/CJS quirks at import time.
          ssr: { noExternal: true },
          build: {
            ssr: 'src/entry-server.tsx',
            outDir: SSR_OUT,
            emptyOutDir: true,
          },
        });
      } finally {
        delete process.env.MR_SSR;
      }

      const entry = join(ssrDir, 'entry-server.js');
      if (!existsSync(entry)) {
        throw new Error(`prerender: SSR bundle missing at ${entry}`);
      }
      const mod = await import(pathToFileURL(entry).href);

      const template = readFileSync(join(outDir, 'index.html'), 'utf8');
      if (!template.includes('<!--app-html-->') || !template.includes('<!--app-head-->')) {
        throw new Error('prerender: index.html is missing the <!--app-html--> / <!--app-head--> placeholders');
      }

      // A function replacement, so `$` in rendered content is never treated
      // as a replacement pattern.
      const page = ({ html, head }) =>
        template.replace('<!--app-head-->', () => indent(head)).replace('<!--app-html-->', () => html);

      for (const { path } of mod.routes) {
        // Fail the build rather than ship a route without its own head tags:
        // the deploy checks would catch it later, but only after it is live.
        const rendered = mod.render(path);
        if (!rendered.head.includes(`rel="canonical" href="${mod.ORIGIN}${path}"`)) {
          throw new Error(`prerender: ${path} did not render its own canonical link`);
        }
        const file = path === '/' ? join(outDir, 'index.html') : join(outDir, path.slice(1), 'index.html');
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, page(rendered));
      }

      // Real 404 page. serve returns dist/404.html with a 404 status, which
      // stops unknown URLs from looking like copies of the homepage.
      writeFileSync(join(outDir, '404.html'), page(mod.render('/__not-found__')));

      // No <lastmod>: the build date is not when a page's content changed, and
      // Google stops trusting lastmod values that are always "today".
      writeFileSync(join(outDir, 'sitemap.xml'), sitemap(mod));

      rmSync(ssrDir, { recursive: true, force: true });

      this.info?.(`prerendered ${mod.routes.length} routes + 404.html + sitemap.xml`);
    },
  };
}
