import { useState } from 'react';
import "./Testimonials.css";

const testimonials = [
    {
        name: "Alexander the Great",
        text: "I conquered the world, but nothing compares to the taste of this mango.",
    },
    {
        name: "Cleopatra",
        text: "The sweetness of this mango is as captivating as the Nile.",
    },
    {
        name: "Julius Caesar",
        text: "Veni, Vidi, Mango! I came, I saw, I tasted the best mango.",
    },
    {
        name: "Hannibal",
        text: "Crossing the Alps was easy compared to finding a mango this good.",
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