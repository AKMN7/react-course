import { useQuiz } from "../context/QuizContext";

function FinishedScreen() {
    console.log("FinishedScreen");
    const { points, questions, highscore, dispatch } = useQuiz();
    const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);
    const percentage = (points / maxPoints) * 100;

    let emoji = "❌";
    if (percentage > 50) emoji = "✅";

    return (
        <>
            <p className="result">
                <span>{emoji}</span>You scored{" "}
                <strong>
                    {points} / {maxPoints}{" "}
                </strong>
                ({Math.ceil(percentage)}%)
            </p>
            <p className="highscore">High Score: {highscore}</p>
            <button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>
                Restart
            </button>
        </>
    );
}

export default FinishedScreen;
