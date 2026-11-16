import type { ReactElement } from 'react';

import Landing from './pages/Landing';
import Rooms from './pages/Rooms';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import About from './pages/About';

export interface SiteRoute {
    path: string;
    element: ReactElement;
    /** Listed in sitemap.xml. Pages marked noindex must be false. */
    indexable: boolean;
    priority: string;
    changefreq: 'weekly' | 'monthly';
}

/**
 * Every route the site serves. The router, the build-time prerender and the
 * generated sitemap.xml all read this list, so a page added here is
 * prerendered and listed automatically.
 *
 * Order matters: the deploy workflow checks the 2nd <loc> in sitemap.xml.
 */
export const ROUTES: SiteRoute[] = [
    { path: '/', element: <Landing />, indexable: true, priority: '1.0', changefreq: 'weekly' },
    { path: '/rooms', element: <Rooms />, indexable: true, priority: '0.9', changefreq: 'weekly' },
    { path: '/contact', element: <Contact />, indexable: true, priority: '0.7', changefreq: 'monthly' },
    { path: '/about', element: <About />, indexable: true, priority: '0.6', changefreq: 'monthly' },
    { path: '/gallery', element: <Gallery />, indexable: false, priority: '0.5', changefreq: 'monthly' },
];
