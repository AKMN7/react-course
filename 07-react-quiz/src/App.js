import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";

const initialState = {
    questions: [],
    status: "loading" // "loading" | "error" | "ready" | "active" | "finished"
};

function reducer(state, action) {
    switch (action.type) {
        case "received":
            return { questions: action.payload, status: "ready" };
        case "failed":
            return { questions: [], status: "error" };
        default:
            throw new Error("Action Type Unkown: " + action.type);
    }
}

export default function App() {
    const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

    useEffect(function () {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({ type: "received", payload: data }))
            .catch((_) => dispatch({ type: "failed" }));
    }, []);

    return (
        <div className="app">
            <Header />
            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Loader />}
                {status === "ready" && <Start numOfQuestions={questions.length} />}
            </Main>
        </div>
    );
}
