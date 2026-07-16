import "./Gallery.css";
import { Helmet } from 'react-helmet-async';

function Gallery() {
    return <>
        <Helmet>
            <title>Gallery – MangoRooms Brașov</title>
            <meta name="description" content="Browse photos of our cozy rooms and guesthouse at MangoRooms Brașov." />
            <link rel="canonical" href="https://www.mangorooms.ro/gallery" />
            <meta name="robots" content="noindex,follow" />
        </Helmet>
    </>
}

export default Gallery;