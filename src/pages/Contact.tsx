import BookingForm from "../components/contact/BookingForm";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { Helmet } from 'react-helmet-async'
import "./Contact.css";

function Contact() {
    return <>
        <Helmet>
            <title>Contact – MangoRooms Brașov</title>
            <meta name="description" content="Get in touch with MangoRooms: address, phone, email, and booking request form." />
            <link rel="canonical" href="/contact" />
        </Helmet>
        <Hero image="./images/about.jpeg" description="Should I stay or should I manGO?" />
        <section id="contact">
        <div className="text">
                <h3>Do not hesitate to ask!</h3>
            </div>
            <BookingForm />
            <div className="info">
                <div className="line">Mihai Viteazul 128, 500183</div>
                <div className="line">Brasov, Romania</div>
                <div className="map"><a href="https://maps.app.goo.gl/xDLBLkZsb61cQ6eh8" target="_blank">View map →</a></div>
                <br />
                <div className="line">Phone: <a href="tel:+40721373747">+40721373747</a></div>
                <div className="line">Email: <a href="mailto:anudani241@hotmail.com">anudani241@hotmail.com</a></div>
            </div>
            <Footer />
        </section>
    </>
}

export default Contact;