import Footer from "../components/Footer";
import Hero from "../components/Hero";
import useScrollReveal from "../hooks/useScrollReveal";
import "./About.css";
import { Helmet } from 'react-helmet-async'

function About() {
    useScrollReveal();

    return <>
        <Helmet>
            <title>About MangoRooms – Family-Run Guesthouse in Brașov</title>
            <meta name="description" content="The story of MangoRooms: a family of travellers running a cozy guesthouse in Brașov since 2007, welcoming backpackers, motorcycle riders and international guests in ten languages." />
            <link rel="canonical" href="https://www.mangorooms.ro/about" />
        </Helmet>
        <Hero image="./images/about.webp" description="Your place to sleep on the manGO!" />
        <section id="about">
            <div className="text reveal">
                <span className="kicker">About us</span>
                <h3>Excellent reviews, excellent people...</h3>
            </div>
            <AboutCard title="Our Story" description="We are an Estonian-Romanian family of travellers. After 15 years of backpacking and riding around the world, in 2007 we decided it was time to settle down in Brașov — and to give back to fellow travellers the kindness we had received on our own journeys. So we opened this cozy guesthouse and have been running it ever since. It saw our kids grow up, brought us friends from every corner of the world, and grew deep into our hearts. Whether you arrive by motorcycle, by bus or with a backpack, you will find a warm bed and a warmer welcome. We speak Romanian, English, German, Italian, Spanish, French, Estonian, Russian, Finnish — and with a little help from AI, actually every language. Come to us, we welcome You!" image="./images/about2.webp" />
            <div className="about-highlights">
                <Highlight number="2007" label="Welcoming guests since" />
                <Highlight number="9+" label="Languages spoken" />
                <Highlight number="5" label="Cozy rooms" />
            </div>
            <Footer />
        </section>
    </>
}

function AboutCard(props: { title: string, description: string, image: string }) {
    return <div className="card reveal">
        <div className="text">
            <h1>{props.title}</h1>
            <p>{props.description}</p>
        </div>
        <img src={props.image} alt={props.title} loading="lazy" />
    </div>
}

function Highlight(props: { number: string, label: string }) {
    return <div className="highlight reveal">
        <span className="highlight-number">{props.number}</span>
        <span className="highlight-label">{props.label}</span>
    </div>
}

export default About
