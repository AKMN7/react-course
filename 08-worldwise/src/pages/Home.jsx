import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

function Home() {
    return (
        <div>
            <PageNav />
            <h1>Worldwise</h1>
            <Link to="/app">App</Link>
        </div>
    );
}

export default Home;
