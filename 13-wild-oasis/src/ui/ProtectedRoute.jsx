import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({ children }) {
    console.log("Test Middleware");
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useUser();

    useEffect(
        function () {
            if (!isLoading && !isAuthenticated) navigate("/login");
        },
        [isAuthenticated, isLoading, navigate]
    );

    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    if (isAuthenticated) return children;
}

export default ProtectedRoute;
