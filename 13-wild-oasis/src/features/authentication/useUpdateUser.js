import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateMutate, isLoading: isUpdating } = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            toast.success("User Updated Successfully.");
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (err) => toast.error(err.message)
    });

    return { updateMutate, isUpdating };
}
