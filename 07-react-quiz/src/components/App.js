import { useQuiz } from "../context/QuizContext";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";

export default function App() {
    const { status } = useQuiz();

    return (
        <div className="app">
            <Header />
            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && <Start />}
                {status === "active" && (
                    <>
                        <Progress />
                        <Question />
                        <Footer>
                            <Timer />
                            <NextButton />
                        </Footer>
                    </>
                )}
                {status === "finished" && <FinishedScreen />}
            </Main>
        </div>
    );
}
