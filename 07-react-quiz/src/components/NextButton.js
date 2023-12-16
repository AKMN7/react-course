import { useQuiz } from "../context/QuizContext";

function NextButton() {
    const { questions, dispatch, answer, index } = useQuiz();

    if (answer === null) return null;

    if (index < questions.length - 1)
        return (
            <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>
                Next
            </button>
        );

    if (index === questions.length - 1)
        return (
            <button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>
                Finish
            </button>
        );
}

export default NextButton;
