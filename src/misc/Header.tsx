import Navbar from "./Navbar";

function Header(props: {
    selected: number,
}) {
    return <>
        <Navbar selected={props.selected} />
    </>   
}

export default Header;