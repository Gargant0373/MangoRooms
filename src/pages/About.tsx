import Footer from "../components/Footer";
import Hero from "../components/Hero";
import "./About.css";
import { Helmet } from 'react-helmet-async'

function About() {
    return <>
        <Helmet>
            <title>About MangoRooms – Guesthouse in Brașov</title>
            <meta name="description" content="Learn the story behind MangoRooms, a family-run guesthouse welcoming travelers in Brașov since 2007." />
            <link rel="canonical" href="/about" />
        </Helmet>
        <Hero image="./images/about.jpeg" description="Your place to sleep on the manGO!" />
        <section id="about">
            <div className="text">
                <h3>Excellent reviews, excellent people...</h3>
            </div>
            <AboutCard title="Our Story" description="We are a mixed Estonian Romanian family. After 15 years of traveling around the world, in 2007, we decided that it is time to settle down. We thought of starting to give back to fellow travelers the kindness we had received on our journeys. So we opened our guesthouse and are running it ever since. This place saw our kids grow up, it has brought us a lot of new friends and grown very deep into our hearts. We speak Romanian, English, German, Italian, Spanish, French, Estonian, Russian, Finnish and with a little help from AI actually every language. Come to us, we welcome You!" image="./images/about2.jpg" />
            <Footer />
        </section>
    </>
}

function AboutCard(props: { title: string, description: string, image: string }) {
    return <div className="card">
        <div className="text">
            <h1>{props.title}</h1>
            <p>{props.description}</p>
        </div>
        <img src={props.image} alt={props.title} />
    </div>
}

export default About