import { useState } from "react";

const messages = ["Learn React ⚛️", "Apply for jobs 💼", "Invest your new income 🤑"];

export default function App() {
    return (
        <div>
            <Steps />
            <Steps />
        </div>
    );
}

function Steps() {
    const [isOpen, setIsOpen] = useState(true);
    const [step, setStep] = useState(1);

    function increment() {
        if (step < 3) setStep((s) => s + 1);
    }

    function decrement() {
        if (step > 1) setStep((s) => s - 1);
    }

    return (
        <div>
            <button className="close" onClick={() => setIsOpen((curr) => !curr)}>
                &times;
            </button>

            {isOpen && (
                <div className="steps">
                    <div className="numbers">
                        <div className={step >= 1 ? "active" : ""}>1</div>
                        <div className={step >= 2 ? "active" : ""}>2</div>
                        <div className={step === 3 ? "active" : ""}>3</div>
                    </div>

                    <p className="message">
                        Step {step}: {messages[step - 1]}
                    </p>

                    <div className="buttons">
                        <button style={{ backgroundColor: "#7950f2", color: "#fff" }} onClick={decrement}>
                            Previous
                        </button>
                        <button style={{ backgroundColor: "#7950f2", color: "#fff" }} onClick={increment}>
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
