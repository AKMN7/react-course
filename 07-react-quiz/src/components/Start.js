import { useQuiz } from "../context/QuizContext";

function Start() {
    console.log("Start");
    const { numOfQuestions, dispatch } = useQuiz();
    return (
        <div className="start">
            <h2>Welcome To The React Quiz!</h2>
            <h3>{numOfQuestions} questions to test your React skills!</h3>
            <button className="btn btn-ui" onClick={() => dispatch({ type: "start" })}>
                Let's Start
            </button>
        </div>
    );
}

export default Start;
