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
            <img src={props.image} alt={props.description || "MangoRooms hero image"} />
            <div className="text">
                <h1>MangoRooms</h1>
                <p>{props.description}</p>
            </div>
            <MangoButton text="Book Now!" onClick={() => navigate("/contact")} />
        </section>
    </>
}

export default Hero;