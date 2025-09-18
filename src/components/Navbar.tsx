import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // close with Escape key
    useEscapeClose(isOpen, () => setIsOpen(false));

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">MangoRooms</Link>
            </div>
            <button
                className={`hamburger ${isOpen ? 'is-open' : ''}`}
                aria-controls="primary-navigation"
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="bar bar-1" aria-hidden="true" />
                <span className="bar bar-2" aria-hidden="true" />
                <span className="bar bar-3" aria-hidden="true" />
            </button>
            <ul
                id="primary-navigation"
                className={`nav-links ${isOpen ? "open" : ""}`}
                role="menu"
                aria-hidden={!isOpen}
            >
                <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
                <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
                <li><Link to="/rooms" onClick={() => setIsOpen(false)}>Rooms</Link></li>
                <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;

// close overlay with Escape key for improved accessibility
function useEscapeClose(isOpen: boolean, onClose: () => void) {
    useEffect(() => {
        if (!isOpen) return;
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);
}