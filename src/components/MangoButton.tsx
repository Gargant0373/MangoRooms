import "./MangoButton.css";

interface MangoButtonProps {
    text: string;
    onClick: () => void;
}

function MangoButton(props: MangoButtonProps) {
    return <>
        <button className="mango-button" onClick={props.onClick}>{props.text}</button>
    </>
}

export default MangoButton;