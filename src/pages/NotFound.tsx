import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Seo from "../components/Seo";
import "./NotFound.css";

/** Rendered for unknown URLs, and prerendered to dist/404.html, which serve returns with a 404 status. */
function NotFound() {
    return <>
        <Seo
            title="Page not found – MangoRooms Brașov"
            description="This page does not exist. Find rooms, photos and booking details on the MangoRooms homepage."
            noindex
        />
        {/* Absolute path: the 404 page is served at any depth, e.g. /a/b/c. */}
        <Hero
            image="/images/landing.webp"
            imageAlt="Raspberries ripening on the bush"
            heading="Page not found"
            description="Oops, this page went on a ride without us."
        />
        <section id="not-found">
            <div className="text">
                <span className="kicker">404</span>
                <h2>We couldn't find that page</h2>
                <p>The link may be old or mistyped. <Link to="/">Go to the homepage</Link> or <Link to="/rooms">see our rooms</Link>.</p>
            </div>
            <Footer />
        </section>
    </>
}

export default NotFound;
