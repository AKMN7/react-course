import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
    const { mutate: signUpMutate, isLoading } = useMutation({
        mutationFn: signup,
        onSuccess: (user) => {
            console.log("🚀 ~ user:", user);
            toast.success("User Signed Up Successfully");
        },
        onError: () => {
            toast.error("Unable to sign up");
        }
    });

    return { signUpMutate, isLoading };
}
