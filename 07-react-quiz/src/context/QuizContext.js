import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null
};

function reducer(state, action) {
    switch (action.type) {
        case "received":
            return { ...state, questions: action.payload, status: "ready" };
        case "failed":
            return { ...state, questions: [], status: "error" };
        case "start":
            return { ...state, status: "active", secondsRemaining: state.questions.length * 30 };
        case "newAnswer":
            const currentQuestion = state.questions.at(state.index);
            return { ...state, answer: action.payload, points: currentQuestion.correctOption === action.payload ? state.points + currentQuestion.points : state.points };
        case "nextQuestion":
            return { ...state, index: state.index + 1, answer: null };
        case "finish":
            return { ...state, status: "finished", highscore: state.points > state.highscore ? state.points : state.highscore };
        case "restart":
            return { ...state, status: "ready", index: 0, answer: null, points: 0, secondsRemaining: 10 };
        case "tick":
            return { ...state, secondsRemaining: state.secondsRemaining - 1, status: state.secondsRemaining === 0 ? "finished" : state.status };
        default:
            throw new Error("Action Type Unkown: " + action.type);
    }
}

export function QuizProvider({ children }) {
    const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState);
    return <QuizContext.Provider value={{ questions, status, index, answer, points, highscore, secondsRemaining, dispatch }}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
    const context = useContext(QuizContext);
    if (context === undefined) throw new Error("Context use outside provider!");
    return context;
}
