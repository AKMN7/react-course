import { useQuiz } from "../context/QuizContext";

function Progress() {
    const { questions, index, answer, points } = useQuiz();
    const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

    return (
        <header className="progress">
            <progress max={questions.length} value={index + Number(answer !== null)} />
            <p>
                Question:{" "}
                <strong>
                    {index + 1} / {questions.length}
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
