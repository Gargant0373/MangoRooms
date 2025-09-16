import "./Footer.css";

function Footer() {
    return <>
        <footer>
            <div className="column">
                <h1>MangoRooms</h1>
                <div className="line" />
                <p><a href="/">Mihai Viteazul 128, 500183</a></p>
            </div>
            <div className="column">
                <h1>Company</h1>
                <div className="line" />
                <p><a href="/">Home</a></p>
                <p><a href="/about">About Us</a></p>
                <p><a href="/rooms">Rooms</a></p>
                <p><a href="/contact">Contact</a></p>
            </div>
            <div className="column">
                <h1>Socials</h1>
                <div className="line" />
                <p><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></p>
                <p><a href="https://google.com" target="_blank" rel="noopener noreferrer">Google</a></p>
                <p><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></p>
            </div>
        </footer>
    </>
}

export default Footer;