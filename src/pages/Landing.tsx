import Seo from "../components/Seo";
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
        imageAlt: "Shared kitchen at MangoRooms guesthouse in Brașov",
        redirect: "/about",
        linkText: "About the guesthouse"
    },
    {
        title: "Rooms",
        description: "Cozy rooms with private bathrooms for every kind of traveller — solo backpackers, couples, riders and families alike. Comfortable beds and a warm welcome after a long day on the road.",
        image: "/images/balcony.webp",
        imageAlt: "Wooden terrace with chairs and a table outside a guest room",
        redirect: "/rooms",
        linkText: "See our rooms"
    }
]

function Landing() {
    useScrollReveal();

    return <>
        <Seo
            title="MangoRooms – Cozy Motorcycle-Friendly Guesthouse in Brașov"
            description="Cozy, motorcycle-friendly guesthouse in Brașov, Romania. Family-run since 2007, welcoming international travellers and backpackers with private bathrooms and secure parking near the old town."
            path="/"
        />
        <Hero
            image="/images/landing.webp"
            imageAlt="Raspberries ripening on the bush"
            heading="Guesthouse in Brașov, Romania"
            description="The definition of cozy!"
        />
        <section id="landing">
            <div className="text reveal">
                <span className="kicker">Welcome</span>
                <h2>A cozy, motorcycle-friendly guesthouse in the heart of Brașov</h2>
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
                        imageAlt={note.imageAlt}
                        title={note.title}
                        description={note.description}
                        redirect={note.redirect}
                        linkText={note.linkText}
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
