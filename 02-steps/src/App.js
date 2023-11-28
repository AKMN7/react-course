import { useState } from "react";

const messages = ["Learn React ⚛️", "Apply for jobs 💼", "Invest your new income 🤑"];

export default function App() {
    return (
        <div>
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

                    <Message step={step}>{messages[step - 1]}</Message>

                    <div className="buttons">
                        <Button bgColor="#7950f2" textColor="#fff" action={decrement}>
                            <span>👈</span> Previous
                        </Button>
                        <Button bgColor="#7950f2" textColor="#fff" action={increment}>
                            Next <span>👉</span>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

function Message({ step, children }) {
    console.log("Rendering MESSAGE COMPONENT");
    return (
        <div className="message">
            <h3>Step {step}</h3> {children}
        </div>
    );
}

function Button({ bgColor, textColor, action, children }) {
    return (
        <button style={{ backgroundColor: bgColor, color: textColor }} onClick={action}>
            {children}
        </button>
    );
}
