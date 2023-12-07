function Start({ numOfQuestions }) {
    return (
        <div className="start">
            <h2>Welcome To The React Quiz!</h2>
            <h3>{numOfQuestions} questions to test your React skills!</h3>
            <button className="btn btn-ui">Let's Start</button>
        </div>
    );
}

export default Start;
