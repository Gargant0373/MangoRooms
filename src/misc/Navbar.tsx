import Button from "./Button";
import "./Navbar.css";

function Navbar(props: {
    selected: number,
}) {

    const navbarItems = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "Facilities",
            link: "/facilities",
        },
        {
            title: "Rooms",
            link: "/rooms",
        },
        {
            title: "Contact",
            link: "/contact",
        },
        {
            title: "About",
            link: "/about",
        },
    ]

    return <>
        <nav id="navbar">
            <div className="items">
                {navbarItems.map((item, index) => {
                    return <NavbarItem key={index} title={item.title} link={item.link} selected={props.selected === index} />
                })}
            </div>
            <Button className="book" text="Book Now" redirect="/book" />
        </nav>
    </>
}

function NavbarItem(props: {
    title: string,
    link: string,
    selected: boolean,
}) {
    return <>
        <a className={`item ${props.selected ? "selected" : ""}`} href={props.link}>{props.title}</a>
    </>
}

export default Navbar;