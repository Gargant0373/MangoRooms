import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
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
    images: string[],
    kidsBed: boolean
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
        images: ["1_1.webp", "1_2.webp", "1_3.webp", "1_4.webp"],
        kidsBed: true
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
        images: ["2_1.webp", "2_2.webp", "2_3.webp", "2_4.webp"],
        kidsBed: true
    },
    {
        name: "Mango I",
        description: "A cozy and intimate room designed for couples or solo travellers. With a comfortable double bed and essential facilities, it is a restful base after a day of exploring Brașov or riding through Transylvania.",
        capacity: 2,
        facilities: [
            Facilities.WIFI,
            Facilities.TV,
            Facilities.BATHROOM,
            Facilities.DESK,
            Facilities.SHOWER
        ],
        images: ["3_1.webp", "3_2.webp", "3_3.webp", "3_4.webp"],
        kidsBed: false
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
        images: ["4_1.webp", "4_2.webp", "4_3.webp"],
        kidsBed: false
    },
    {
        name: "Petite Mango",
        description: "A small, delightful room designed for maximum comfort in a compact space. Ideal for backpackers, solo travellers or friends looking for a budget-friendly yet stylish stay. Please note the beds are fixed and cannot be joined.",
        capacity: 2,
        facilities: [
            Facilities.WIFI,
            Facilities.TV,
            Facilities.BATHROOM,
            Facilities.DESK,
            Facilities.SHOWER
        ],
        images: ["5_1.webp", "5_2.webp", "5_3.webp"],
        kidsBed: false
    }
];

function Rooms() {
    useScrollReveal();

    return <>
        <Helmet>
            <title>Cozy Rooms in Brașov – MangoRooms Guesthouse</title>
            <meta name="description" content="Five cozy guesthouse rooms in Brașov, each with a private bathroom, Wi-Fi and TV. Options for families, couples, solo travellers and backpackers on a budget." />
            <link rel="canonical" href="https://www.mangorooms.ro/rooms" />
        </Helmet>
        <Hero image="./images/rooms.webp" description="Your home in Brasov!" />
        <section id="rooms">
            <div className="text reveal">
                <span className="kicker">Our rooms</span>
                <h3>Cozy, clean and ready for you!</h3>
                <p>Every room comes with a private bathroom, Wi-Fi and TV — whether you are a family on holiday, a couple, a backpacker or a rider passing through Brașov.</p>
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
        <div className="room reveal">
            <div className="room-images">
                <div className="main-image">
                    <img
                        key={selectedImage}
                        src={`./images/rooms/${selectedImage}`}
                        alt={`${props.name} – cozy guesthouse room at MangoRooms Brașov`}
                        loading="lazy"
                    />
                    <span className="capacity-badge">
                        {props.capacity} {props.capacity === 1 ? "guest" : "guests"}
                    </span>
                </div>
                <div className="thumbnail-images">
                    {props.images.map((image, index) => (
                        <img
                            key={index}
                            src={`./images/rooms/${image}`}
                            alt={`${props.name} thumbnail ${index + 1}`}
                            loading="lazy"
                            className={selectedImage === image ? "active" : ""}
                            onClick={() => setSelectedImage(image)}
                        />
                    ))}
                </div>
            </div>
            <div className="room-details">
                <h1>{props.name}</h1>
                <p>{props.description}</p>
                <p className="room-extra">{props.kidsBed ? "Extra bed for children available on request." : "No extra bed for children available."}</p>
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
