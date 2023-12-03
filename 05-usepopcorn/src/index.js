import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Test() {
    const [movieRating, setMovieRating] = useState(0);
    return (
        <div>
            <StarRating color="blue" onSet={setMovieRating} />
            <p>This movie has {movieRating} stars!</p>
        </div>
    );
}
root.render(
    <React.StrictMode>
        {/* <App /> */}
        <StarRating max={10} />
        <Test />
    </React.StrictMode>
);
