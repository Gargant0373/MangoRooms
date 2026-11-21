import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const LINKS = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/rooms", label: "Rooms" },
    { to: "/contact", label: "Contact" },
];

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    useMenuEffects(isOpen, close);

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">MangoRooms</Link>
            </div>
            <button
                className="hamburger"
                aria-controls="mobile-navigation"
                aria-expanded={isOpen}
                aria-label="Open menu"
                onClick={() => setIsOpen(true)}
            >
                <span className="bar bar-1" aria-hidden="true" />
                <span className="bar bar-2" aria-hidden="true" />
                <span className="bar bar-3" aria-hidden="true" />
            </button>
            <ul className="nav-links">
                {LINKS.map((l) => (
                    <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
                ))}
            </ul>
            {/* The overlay is portaled to <body> so the hero's overflow and
                stacking contexts can't clip it or let the page show through. */}
            {isOpen && createPortal(
                <div className="mobile-menu" id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Menu">
                    <button className="mobile-menu-close" aria-label="Close menu" onClick={close}>
                        <span className="bar bar-1" aria-hidden="true" />
                        <span className="bar bar-3" aria-hidden="true" />
                    </button>
                    <ul>
                        {LINKS.map((l) => (
                            <li key={l.to}><Link to={l.to} onClick={close}>{l.label}</Link></li>
                        ))}
                    </ul>
                </div>,
                document.body,
            )}
        </nav>
    );
}

export default Navbar;

// Escape closes the menu, and the page behind it doesn't scroll while open.
function useMenuEffects(isOpen: boolean, onClose: () => void) {
    useEffect(() => {
        if (!isOpen) return;
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKey);
        };
    }, [isOpen, onClose]);
}
