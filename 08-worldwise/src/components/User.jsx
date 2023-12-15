import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./User.module.css";

function User() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    function handleClick() {
        logout();
        navigate("/");
    }

    if (!isAuthenticated) return null;

    return (
        <div className={styles.user}>
            <img src={user.avatar} alt={user.name} />
            <span>Welcome, {user.name}</span>
            <button onClick={handleClick}>Logout</button>
        </div>
    );
}

export default User;
