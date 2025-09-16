import { useNavigate } from "react-router-dom";
import "./Note.css";
import MangoButton from "../MangoButton";

interface NoteProps {
    image: string;
    title: string;
    description: string;
    redirect: string;
}

function Note(props: NoteProps) {
    const navigate = useNavigate();

    return <>
        <div className="note">
            <div className="left">
                <h1>{props.title}</h1>
                <p>{props.description}</p>
                <MangoButton text="Find out more!" onClick={() => navigate(props.redirect)} />
            </div>
            <div className="right">
                <img src={props.image} alt="Note" />
            </div>
        </div>
    </>
}

export default Note;