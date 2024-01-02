import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    background-color: var(--color-grey-50);
`;

function Login() {
    return (
        <LoginLayout>
            <Logo />
            <Heading as="h4">Login To Your Account</Heading>
            <LoginForm />
        </LoginLayout>
    );
}

export default Login;
