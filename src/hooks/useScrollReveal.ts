import { useEffect } from "react";

/**
 * Animates elements with the `.reveal` class into view as they enter the
 * viewport. Call once per page; elements are revealed a single time.
 */
function useScrollReveal() {
    useEffect(() => {
        const elements = document.querySelectorAll<HTMLElement>(".reveal");

        if (!("IntersectionObserver" in window)) {
            elements.forEach((el) => el.classList.add("visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
}

export default useScrollReveal;
