function FinishedScreen({ points, maxPoints, highscore, dispatch }) {
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
