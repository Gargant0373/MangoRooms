import "./Hero.css";
import { Helmet } from "react-helmet-async";
import MangoButton from "./MangoButton";
import Navbar from "./Navbar";
import ResponsiveImage, { responsiveSources } from "./ResponsiveImage";

export interface HeroProps {
    /** Root-relative path, e.g. "/images/rooms.webp". */
    image: string;
    /** What the photo shows, for screen readers and image search. */
    imageAlt: string;
    /** The page's one <h1>. Unique per page; shown as the small line above the logo. */
    heading: string;
    description: string;
}

const HERO_SIZES = "100vw";

function Hero(props: HeroProps) {
    const sources = responsiveSources(props.image);

    return <>
        {/* The hero photo is the page's largest paint: start fetching it with the HTML. */}
        {sources && (
            <Helmet>
                <link
                    rel="preload"
                    as="image"
                    href={sources.src}
                    imageSrcSet={sources.srcSet}
                    imageSizes={HERO_SIZES}
                    {...{ fetchpriority: "high" }}
                />
            </Helmet>
        )}
        <section id="hero">
            <Navbar />
            <ResponsiveImage src={props.image} alt={props.imageAlt} sizes={HERO_SIZES} priority />
            <div className="text">
                <h1 className="hero-eyebrow">{props.heading}</h1>
                <p className="hero-title">MangoRooms</p>
                <p className="hero-tagline">{props.description}</p>
                <MangoButton text="Book Now!" to="/contact" />
            </div>
            <div className="scroll-cue" aria-hidden="true">
                <span className="scroll-cue-dot" />
            </div>
        </section>
    </>
}

export default Hero;
