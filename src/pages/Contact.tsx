import BookingForm from "../components/contact/BookingForm";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import useScrollReveal from "../hooks/useScrollReveal";
import { Helmet } from 'react-helmet-async'
import "./Contact.css";

function Contact() {
    useScrollReveal();

    return <>
        <Helmet>
            <title>Contact & Booking – MangoRooms Guesthouse Brașov</title>
            <meta name="description" content="Book your stay at MangoRooms, a cozy motorcycle-friendly guesthouse in Brașov. Address, phone, email and booking request form — we reply in English and nine other languages." />
            <link rel="canonical" href="https://www.mangorooms.ro/contact" />
        </Helmet>
        <Hero image="./images/contact.webp" description="Should I stay or should I manGO?" />
        <section id="contact">
            <div className="text reveal">
                <span className="kicker">Contact & booking</span>
                <h3>Do not hesitate to ask!</h3>
            </div>
            <div className="info">
                <a className="info-card reveal" href="https://maps.app.goo.gl/xDLBLkZsb61cQ6eh8" target="_blank" rel="noopener noreferrer">
                    <span className="info-card-label">Address</span>
                    <span className="info-card-value">Mihai Viteazul 128, 500183</span>
                    <span className="info-card-value">Brașov, Romania</span>
                    <span className="info-card-hint">View map →</span>
                </a>
                <a className="info-card reveal" href="tel:+40721373747">
                    <span className="info-card-label">Phone</span>
                    <span className="info-card-value">+40 721 373 747</span>
                    <span className="info-card-hint">Give us a call →</span>
                </a>
                <a className="info-card reveal" href="mailto:anudani241@hotmail.com">
                    <span className="info-card-label">Email</span>
                    <span className="info-card-value">anudani241@hotmail.com</span>
                    <span className="info-card-hint">Write to us →</span>
                </a>
            </div>
            <div className="booking-card reveal">
                <h2>Request a booking</h2>
                <p>Send us the details of your stay and we will get back to you as soon as possible.</p>
                <BookingForm />
            </div>
            <Footer />
        </section>
    </>
}

export default Contact;
