import "./Note.css";
import MangoButton from "../MangoButton";
import ResponsiveImage from "../ResponsiveImage";

interface NoteProps {
    image: string;
    imageAlt: string;
    title: string;
    description: string;
    redirect: string;
    /** Link text; say where it goes ("See our rooms"), not "Find out more". */
    linkText: string;
    reverse?: boolean;
}

function Note(props: NoteProps) {
    return <>
        <div className={`note reveal ${props.reverse ? "note-reverse" : ""}`}>
            <div className="left">
                <h3>{props.title}</h3>
                <p>{props.description}</p>
                <MangoButton text={props.linkText} to={props.redirect} />
            </div>
            <div className="right">
                <ResponsiveImage
                    src={props.image}
                    alt={props.imageAlt}
                    sizes="(max-width: 768px) 92vw, 550px"
                />
            </div>
        </div>
    </>
}

export default Note;
