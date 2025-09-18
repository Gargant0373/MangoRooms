import { useState } from 'react';
import "./Testimonials.css";

const testimonials = [
    {
        name: "Ionut Rotaru",
        text: "The place was amazing and so were the hosts."
    },
    {
        name: "Alexander the Great",
        text: "I conquered the world, but nothing compares to the taste of this mango.",
    },
    {
        name: "Victor Mazilescu",
        text: "Beautiful hosts and great location. Fair prices, clean and welcoming!"
    },
    {
        name: "Julius Caesar",
        text: "Veni, Vidi, Mango! I came, I saw, I tasted the best mango.",
    },
    {
        name: "Patricia Istrate",
        text: "Perfect place to stay in Brașov. I will definitely come back here again."
    }
];

function Testimonials() {
    const [current, setCurrent] = useState(0);

    const handleClick = () => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
    };

    const testimonial = testimonials[current];

    return <>
        <section id="testimonials">
            <h1>Customer</h1>
            <h2>TESTIMONIALS</h2>
            <div className="testimonial" onClick={handleClick}>
                <div className="ghili">"  "</div>
                <div className="text">
                    <p>{testimonial.text}</p>
                    <h3>{testimonial.name}</h3>
                </div>
            </div>
        </section>
    </>
}

export default Testimonials;