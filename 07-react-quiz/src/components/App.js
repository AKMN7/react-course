import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";

const initialState = {
    questions: [],
    status: "loading", // "loading" | "error" | "ready" | "active" | "finished"
    index: 0,
    answer: null,
    points: 0,
    highscore: 0
};

function reducer(state, action) {
    switch (action.type) {
        case "received":
            return { ...state, questions: action.payload, status: "ready" };
        case "failed":
            return { ...state, questions: [], status: "error" };
        case "start":
            return { ...state, status: "active" };
        case "newAnswer":
            const currentQuestion = state.questions.at(state.index);
            return { ...state, answer: action.payload, points: currentQuestion.correctOption === action.payload ? state.points + currentQuestion.points : state.points };
        case "nextQuestion":
            return { ...state, index: state.index + 1, answer: null };
        case "finish":
            return { ...state, status: "finished", highscore: state.points > state.highscore ? state.points : state.highscore };
        case "restart":
            return { ...state, status: "ready", index: 0, answer: null, points: 0 };
        default:
            throw new Error("Action Type Unkown: " + action.type);
    }
}

export default function App() {
    const [{ questions, status, index, answer, points, highscore }, dispatch] = useReducer(reducer, initialState);
    const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

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
                {status === "active" && (
                    <>
                        <Progress index={index} numOfQuestions={questions.length} points={points} maxPoints={maxPoints} answer={answer} />
                        <Question question={questions[index]} dispatch={dispatch} answer={answer} />
                        <NextButton dispatch={dispatch} answer={answer} index={index} numOfQuestion={questions.length} />
                    </>
                )}
                {status === "finished" && <FinishedScreen points={points} maxPoints={maxPoints} highscore={highscore} dispatch={dispatch} />}
            </Main>
        </div>
    );
}
