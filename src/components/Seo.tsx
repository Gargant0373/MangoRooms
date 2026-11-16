import { Helmet } from 'react-helmet-async';

export const ORIGIN = 'https://www.mangorooms.ro';

export interface SeoProps {
    title: string;
    description: string;
    /** Route path such as "/rooms". Omit for pages with no canonical URL (the 404 page). */
    path?: string;
    noindex?: boolean;
}

/**
 * Per-page head tags. The build-time prerender (scripts/vite-plugin-prerender.mjs)
 * writes these into each route's static HTML, and in the browser Helmet keeps
 * them in sync on client-side navigation. Site-wide tags live in index.html.
 */
function Seo({ title, description, path, noindex = false }: SeoProps) {
    const url = path === undefined ? undefined : ORIGIN + path;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="robots" content={noindex ? 'noindex,follow' : 'index,follow'} />
            {url && <link rel="canonical" href={url} />}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {url && <meta property="og:url" content={url} />}
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
}

export default Seo;
