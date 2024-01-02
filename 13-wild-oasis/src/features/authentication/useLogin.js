import { useMutation } from "@tanstack/react-query";
import { login as LoginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
    const navigate = useNavigate();
    const { mutate: login, isLoading } = useMutation({
        mutationFn: LoginAPI,
        onSuccess: () => {
            navigate("/dashboard", { replace: true });
        },
        onError: (error) => {
            console.log("🚀 ~ error:", error);
            toast.error("Invalid Credentials.");
        }
    });

    return { login, isLoading };
}
