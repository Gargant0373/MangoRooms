import "./Hero.css";
import MangoButton from "./MangoButton";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export interface HeroProps {
    image: string;
    description: string;
}

function Hero(props: HeroProps) {
    const navigate = useNavigate();

    return <>
        <section id="hero">
            <Navbar />
            <img src={props.image} alt="MangoRooms guesthouse in Brașov" />
            <div className="text">
                <p className="hero-eyebrow">Guesthouse · Brașov, Romania</p>
                <h1>MangoRooms</h1>
                <p className="hero-tagline">{props.description}</p>
                <MangoButton text="Book Now!" onClick={() => navigate("/contact")} />
            </div>
            <div className="scroll-cue" aria-hidden="true">
                <span className="scroll-cue-dot" />
            </div>
        </section>
    </>
}

export default Hero;
