import { Helmet } from 'react-helmet-async';
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Note from "../components/landing/Note";
import Testimonials from "../components/landing/Testimonials";
import Map from "../components/landing/Map";
import useScrollReveal from "../hooks/useScrollReveal";
import "./Landing.css";

const notes = [
    {
        title: "Location",
        description: "In the heart of Brașov, just a short walk from the old town. Secure indoor parking for motorcycles and bicycles can be arranged — a perfect base for riders touring Transylvania.",
        image: "/images/kitchen.webp",
        redirect: "/about"
    },
    {
        title: "Rooms",
        description: "Cozy rooms with private bathrooms for every kind of traveller — solo backpackers, couples, riders and families alike. Comfortable beds and a warm welcome after a long day on the road.",
        image: "/images/balcony.webp",
        redirect: "/rooms"
    }
]

function Landing() {
    useScrollReveal();

    return <>
        <Helmet>
            <title>MangoRooms – Cozy Motorcycle-Friendly Guesthouse in Brașov</title>
            <meta name="description" content="Cozy, motorcycle-friendly guesthouse in Brașov, Romania. Family-run since 2007, welcoming international travellers and backpackers with private bathrooms and secure parking near the old town." />
            <link rel="canonical" href="https://www.mangorooms.ro/" />
        </Helmet>
        <Hero image="./images/landing.webp" description="The definition of cozy!" />
        <section id="landing">
            <div className="text reveal">
                <span className="kicker">Welcome</span>
                <h3>A cozy, motorcycle-friendly guesthouse in the heart of Brașov</h3>
                <p>
                    Family-run since 2007, MangoRooms welcomes international travellers,
                    backpackers and motorcycle riders from all over the world. Park your
                    bike safely, drop your backpack and feel at home in Transylvania.
                </p>
            </div>
            <div className="notes">
                {notes.map((note, index) => (
                    <Note key={index}
                        image={note.image}
                        title={note.title}
                        description={note.description}
                        redirect={note.redirect}
                        reverse={index % 2 === 1} />
                ))}
            </div>
            <Testimonials />
            <Map />
            <Footer />
        </section>
    </>
}

export default Landing;
