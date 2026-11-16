// Build-time Node entry only (scripts/vite-plugin-prerender.mjs); never hot-reloaded.
/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import App from './App';
import { ROUTES } from './routes';
import './index.css';

/** Renders one route to static HTML for the build-time prerender step. */
export function render(url: string): { html: string; head: string } {
    const context: { helmet?: HelmetServerState } = {};
    const html = renderToString(
        <StrictMode>
            <HelmetProvider context={context}>
                <StaticRouter location={url}>
                    <App />
                </StaticRouter>
            </HelmetProvider>
        </StrictMode>,
    );
    const h = context.helmet;
    const head = h ? [h.title, h.meta, h.link, h.script].map((t) => t.toString()).filter(Boolean).join('\n') : '';
    return { html, head };
}

export const routes = ROUTES.map(({ path, indexable, priority, changefreq }) => ({ path, indexable, priority, changefreq }));
export { ORIGIN } from './components/Seo';
