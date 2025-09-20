import { Helmet } from 'react-helmet-async';
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Note from "../components/landing/Note";
import Testimonials from "../components/landing/Testimonials";
import Map from "../components/landing/Map";
import "./Landing.css";

const notes = [
    {
        title: "Location",
        description: "Located in the heart of Brasov, we are a walk away from the city center. Indoor parking can be arranged.",
        image: "/images/kitchen.webp",
        redirect: "/about"
    },
    {
        title: "Rooms",
        description: "We offer a variety of cozy rooms to suit your family or yourself after a long day, each one with a private bathroom.",
        image: "/images/balcony.webp",
        redirect: "/rooms"
    }
]

function Landing() {

    return <>
        <Helmet>
            <title>MangoRooms – Cozy Guesthouse in Brașov</title>
            <meta name="description" content="Motorcycle friendly guesthouse in Brașov. Comfortable rooms with private bathrooms and great location." />
            <link rel="canonical" href="/" />
        </Helmet>
        <Hero image="./images/landing.webp" description="The definition of cozy!" />
        <section id="landing">
            <div className="text">
                <h3>Motorcycle friendly guesthouse in Brasov!</h3>
            </div>
            <div className="notes">
                {notes.map((note, index) => (
                    <Note key={index}
                        image={note.image}
                        title={note.title}
                        description={note.description}
                        redirect={note.redirect} />
                ))}
            </div>
            <Testimonials />
            <Map />
            <Footer />
        </section>
    </>
}

export default Landing;