import "./Map.css";

function Map() {
    return (
        <section id="map">
            <h1>Find us</h1>
            <h2>LOCATION</h2>
            <div className="map-frame">
                <iframe
                    title="Google map - Mango Rooms Brașov"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2788.547780517223!2d25.589266077395173!3d45.65990252035822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b35bccd49abfc5%3A0x6616fb443e78b6b8!2sMango%20Rooms%20Brasov!5e0!3m2!1sro!2snl!4v1758375533082!5m2!1sro!2snl"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                />
            </div>
        </section>
    );
}

export default Map;
