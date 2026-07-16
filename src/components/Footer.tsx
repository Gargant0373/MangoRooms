import "./Footer.css";

function Footer() {
    return <>
        <footer>
            <div className="footer-inner">
                <div className="footer-brand">
                    <span className="footer-logo">MangoRooms</span>
                    <a
                        className="footer-address"
                        href="https://maps.app.goo.gl/xDLBLkZsb61cQ6eh8"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Mihai Viteazul 128, 500183, Brașov
                    </a>
                </div>
                <nav className="footer-links" aria-label="Footer">
                    <a href="/">Home</a>
                    <a href="/about">About Us</a>
                    <a href="/rooms">Rooms</a>
                    <a href="/contact">Contact</a>
                </nav>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} MangoRooms · Family-run guesthouse in Brașov since 2007</p>
            </div>
        </footer>
    </>
}

export default Footer;
