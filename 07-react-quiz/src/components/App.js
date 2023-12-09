import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Question from "./Question";

const initialState = {
    questions: [],
    status: "loading", // "loading" | "error" | "ready" | "active" | "finished"
    index: 0
};

function reducer(state, action) {
    switch (action.type) {
        case "received":
            return { ...state, questions: action.payload, status: "ready" };
        case "failed":
            return { ...state, questions: [], status: "error" };
        case "start":
            return { ...state, status: "active" };
        default:
            throw new Error("Action Type Unkown: " + action.type);
    }
}

export default function App() {
    const [{ questions, status, index }, dispatch] = useReducer(reducer, initialState);
    console.log("🚀 ~ initialState:", initialState);

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
                {status === "error" && <Error />}
                {status === "ready" && <Start numOfQuestions={questions.length} dispatch={dispatch} />}
                {status === "active" && <Question question={questions[index]} />}
            </Main>
        </div>
    );
}
