import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useEditSettings() {
    const queryClient = useQueryClient();

    const { mutate: editMutate, isLoading: isEditing } = useMutation({
        mutationFn: updateSetting,
        onSuccess: () => {
            toast.success("Settings updated successfully.");
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (err) => toast.error(err.message)
    });

    return { editMutate, isEditing };
}
