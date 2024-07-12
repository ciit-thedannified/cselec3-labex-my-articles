import {Link, Outlet} from "react-router-dom";
import "./css/App.css";

function App() {

    return (
        <div className="App">
            <nav>
                <h1> My Articles </h1>
                <Link to="/"> Home</Link>
                <Link to="/about"> About </Link>
                <Link to="/contact"> Contact </Link>
                <Link to="/articles/new"> New Article </Link>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default App
