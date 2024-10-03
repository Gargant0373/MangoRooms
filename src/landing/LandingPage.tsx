import Header from "../misc/Header";
import "./LandingPage.css";

function LandingPage() {
    return (
        <>  
            <Header selected={0} />
            <section id="landing">
                <h1>Hello World!</h1>
            </section>
        </>
    )
}

export default LandingPage;