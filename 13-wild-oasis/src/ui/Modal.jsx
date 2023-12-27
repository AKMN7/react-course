import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import Button from "./Button";

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 3.2rem 4rem;
    transition: all 0.5s;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 1000;
    transition: all 0.5s;
`;

const CloseBtn = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1.2rem;
    right: 1.9rem;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        /* Sometimes we need both */
        /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
        color: var(--color-grey-500);
    }
`;

const ModalContext = createContext();

function Modal({ children }) {
    const [target, setTarget] = useState("");
    const open = setTarget;
    const close = () => setTarget("");
    return <ModalContext.Provider value={{ target, open, close }}>{children}</ModalContext.Provider>;
}

function Open({ target, text }) {
    const { open } = useContext(ModalContext);
    return <Button onClick={() => open(target)}>{text}</Button>;
}

function Content({ name, children }) {
    const { target, close } = useContext(ModalContext);

    if (target !== name) return null;

    return createPortal(
        <Overlay>
            <StyledModal>
                <CloseBtn onClick={close}>
                    <HiXMark />
                </CloseBtn>
                <div>{cloneElement(children, { onCloseModal: close })}</div>
            </StyledModal>
        </Overlay>,
        document.body
    );
}

Modal.Open = Open;
Modal.Content = Content;

export default Modal;
