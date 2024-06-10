import { Link } from "react-router-dom";
import "../assets/Home.css";

function Home() {
    return (
        <section className="home">
            <div className="tl-container">
                <h1 className="pr-tl">Tango App</h1>
            </div>
            <div className="options-container">
                <ul className="ul-options">
                    <li className="li-options">
                        <Link to="/table-of-points" className="li-button"> Tabla de Puntuación</Link>
                    </li>
                    <li className="li-options">
                        <Link to="/score-management" className="li-button"> Asignar Puntajes </Link>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Home;
