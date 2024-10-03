import "./Button.css";

function Button(props: {
    text: string,
    redirect?: string,
    className?: string,
}) {
    return <>
        <button className={`button ${props.className || ""}`} onClick={() => window.location.href = props.redirect || "/"}>{props.text}</button>
    </>
}

export default Button;