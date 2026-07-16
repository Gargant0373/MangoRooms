import { useEffect, useState } from 'react';
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

const ROTATE_INTERVAL_MS = 6000;

function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, ROTATE_INTERVAL_MS);
        return () => clearInterval(timer);
    }, [paused]);

    const testimonial = testimonials[current];

    return <>
        <section id="testimonials" className="reveal">
            <span className="kicker">Guest stories</span>
            <h2>What our guests say</h2>
            <div
                className="testimonial"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <div className="ghili" aria-hidden="true">“</div>
                <div className="testimonial-body" key={current}>
                    <p>{testimonial.text}</p>
                    <span className="testimonial-name">{testimonial.name}</span>
                </div>
            </div>
            <div className="testimonial-dots" role="tablist" aria-label="Testimonials">
                {testimonials.map((t, index) => (
                    <button
                        key={index}
                        className={`dot ${index === current ? "active" : ""}`}
                        aria-label={`Show testimonial from ${t.name}`}
                        aria-selected={index === current}
                        role="tab"
                        onClick={() => setCurrent(index)}
                    />
                ))}
            </div>
        </section>
    </>
}

export default Testimonials;
