import "./Gallery.css";
import { Helmet } from 'react-helmet-async';

function Gallery() {
    return <>
        <Helmet>
            <title>Gallery – MangoRooms Brașov</title>
            <meta name="description" content="Browse photos of our rooms and guesthouse at MangoRooms Brașov." />
            <link rel="canonical" href="/gallery" />
        </Helmet>
    </>
}

export default Gallery;