import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { useState } from "react";
import "./Rooms.css";
import { Helmet } from 'react-helmet-async'

enum Facilities {
    WIFI = "Wi-Fi",
    TV = "Television",
    BATHROOM = "Private Bathroom",
    DESK = "Desk",
    KITCHEN = "Shared Kitchen",
    BATHTUB = "Private Bathtub",
    SHOWER = "Private Shower"
}

interface RoomProp {
    name: string,
    capacity: number,
    description: string;
    facilities: Facilities[],
    images: string[]
}

const rooms: RoomProp[] = [
    {
        name: "Grand Mango I",
        description: "A spacious room featuring a queen-sized bed and a single bed, making it the perfect choice for families or small groups. Enjoy the comfort and elegance of this beautifully designed space.",
        capacity: 3,
        facilities: [
            Facilities.WIFI,
            Facilities.TV,
            Facilities.BATHROOM,
            Facilities.DESK,
            Facilities.BATHTUB,
            Facilities.SHOWER
        ],
        images: ["1_1.jpg", "1_2.jpg", "1_3.jpg", "1_4.jpg"]
    },
    {
        name: "Grand Mango II",
        description: "Similar to Grand Mango I, this room offers a queen-sized bed and a single bed, ideal for families or friends traveling together. Relax in style and enjoy all the modern amenities.",
        capacity: 3,
        facilities: [
            Facilities.WIFI,
            Facilities.TV,
            Facilities.BATHROOM,
            Facilities.DESK,
            Facilities.BATHTUB,
            Facilities.SHOWER
        ],
        images: ["2_1.jpg", "2_2.jpg", "2_3.jpg", "2_4.jpg"]
    },
    {
        name: "Mango I",
        description: "A cozy and intimate room designed for couples or solo travelers. With a comfortable double bed and essential facilities, this room ensures a pleasant stay.",
        capacity: 2,
        facilities: [
            Facilities.WIFI,
            Facilities.TV,
            Facilities.BATHROOM,
            Facilities.DESK,
            Facilities.SHOWER
        ],
        images: ["3_1.jpg", "3_2.jpg", "3_3.jpg", "3_4.jpg"]
    },
    {
        name: "Mango II",
        description: "This charming room is perfect for two guests, offering a warm and inviting atmosphere. Equipped with modern amenities, it provides everything you need for a relaxing stay.",
        capacity: 2,
        facilities: [
            Facilities.WIFI,
            Facilities.TV,
            Facilities.BATHROOM,
            Facilities.DESK,
            Facilities.SHOWER
        ],
        images: ["4_1.jpg", "4_2.jpg", "4_3.jpg"]
    },
    {
        name: "Petite Mango",
        description: "A delightful and compact room designed for maximum comfort. Ideal for solo travelers or couples looking for a budget-friendly yet stylish option.",
        capacity: 2,
        facilities: [
            Facilities.WIFI,
            Facilities.TV,
            Facilities.BATHROOM,
            Facilities.DESK,
            Facilities.SHOWER
        ],
        images: ["5_1.jpg", "5_2.jpg", "5_3.jpg"]
    }
];

function Rooms() {
    return <>
        <Helmet>
            <title>Rooms – MangoRooms Brașov</title>
            <meta name="description" content="Explore our cozy rooms with private bathrooms and amenities like Wi‑Fi and TV. Perfect for families and solo travelers." />
            <link rel="canonical" href="/rooms" />
        </Helmet>
        <Hero image="./images/rooms.jpg" description="Your home in Brasov!" />
        <section id="rooms">
            <div className="text">
                <h3>Cozy, clean and ready for you!</h3>
            </div>
            <div className="rooms">
                {rooms.map((room, index) => (
                    <Room key={index} {...room} />
                ))}
            </div>
            <Footer />
        </section>
    </>
}

function Room(props: RoomProp) {
    const [selectedImage, setSelectedImage] = useState(props.images[0]);

    return <>
        <div className="room">
            <div className="room-images">
                <div className="main-image">
                    <img src={`./images/rooms/${selectedImage}`} alt={props.name} />
                </div>
                <div className="thumbnail-images">
                    {props.images.map((image, index) => (
                        <img
                            key={index}
                            src={`./images/rooms/${image}`}
                            alt={`${props.name} thumbnail ${index + 1}`}
                            className={selectedImage === image ? "active" : ""}
                            onClick={() => setSelectedImage(image)}
                        />
                    ))}
                </div>
            </div>
            <div className="room-details">
                <h1>{props.name}</h1>
                <p>{props.description}</p>
                <p>This room can fit {props.capacity} people. (Extra beds for children possible)</p>
                <ul>
                    {props.facilities.map((facility, index) => (
                        <li key={index}>{facility}</li>
                    ))}
                </ul>
            </div>
        </div>
    </>
}

export default Rooms;