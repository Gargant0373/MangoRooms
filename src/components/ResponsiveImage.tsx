/* eslint-disable react-refresh/only-export-components */
import type { ImgHTMLAttributes } from "react";
import manifest from "../image-manifest.json";

type ManifestEntry = { width: number; height: number; widths: number[] };
const images: Record<string, ManifestEntry> = manifest;

/**
 * srcset for a photo in public/images, from the sizes `npm run images` wrote.
 * Undefined for an image that has no smaller copies yet.
 */
export function responsiveSources(src: string) {
    const entry = images[src];
    if (!entry || entry.widths.length === 0) return undefined;
    const variant = (w: number) => src.replace(/\.webp$/, `-${w}w.webp`);
    const largest = entry.widths[entry.widths.length - 1];
    return {
        // The full-size original is only the og:image; pages never need more than the largest copy.
        src: variant(largest),
        srcSet: entry.widths.map((w) => `${variant(w)} ${w}w`).join(", "),
        width: entry.width,
        height: entry.height,
    };
}

interface ResponsiveImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes"> {
    /** Root-relative path, e.g. "/images/rooms/1_1.webp". */
    src: string;
    alt: string;
    /** How wide the image is drawn, e.g. "100vw" or "(max-width: 768px) 92vw, 550px". */
    sizes: string;
    /** The page's main image: load it first instead of lazily. */
    priority?: boolean;
}

/** An <img> that lets the browser pick a size fitting the screen, with width/height set to avoid layout shift. */
function ResponsiveImage({ src, sizes, priority = false, ...rest }: ResponsiveImageProps) {
    const sources = responsiveSources(src);
    const entry = images[src];
    const loading = priority
        ? { fetchpriority: "high" as const }
        : { loading: "lazy" as const, decoding: "async" as const };

    return (
        <img
            src={sources?.src ?? src}
            srcSet={sources?.srcSet}
            sizes={sources ? sizes : undefined}
            width={entry?.width}
            height={entry?.height}
            {...loading}
            {...rest}
        />
    );
}

export default ResponsiveImage;
