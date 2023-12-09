function Progress({ index, numOfQuestions, points, maxPoints, answer }) {
    return (
        <header className="progress">
            <progress max={numOfQuestions} value={index + Number(answer !== null)} />
            <p>
                Question:{" "}
                <strong>
                    {index + 1} / {numOfQuestions}
                </strong>
            </p>
            <p>
                Points:{" "}
                <strong>
                    {points} / {maxPoints}
                </strong>
            </p>
        </header>
    );
}

export default Progress;
