function Options({ question, dispatch, answer }) {
    return (
        <div className="options">
            {question.options.map((option, index) => (
                <button className={`btn btn-option ${index === answer ? "answer" : ""} ${answer !== null ? (index === question.correctOption ? "correct" : "wrong") : ""}`} disabled={answer !== null} onClick={() => dispatch({ type: "newAnswer", payload: index })} key={option}>
                    {option}
                </button>
            ))}
        </div>
    );
}

export default Options;
