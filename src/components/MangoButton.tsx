import "./MangoButton.css";
import { Link } from "react-router-dom";

type MangoButtonProps =
    /** Navigation: renders a real link, so crawlers and agents can follow it. */
    | { text: string; to: string; onClick?: never }
    /** An action on the current page. */
    | { text: string; onClick: () => void; to?: never };

function MangoButton(props: MangoButtonProps) {
    if (props.to !== undefined) {
        return <Link className="mango-button" to={props.to}>{props.text}</Link>;
    }
    return <button className="mango-button" onClick={props.onClick}>{props.text}</button>;
}

export default MangoButton;
