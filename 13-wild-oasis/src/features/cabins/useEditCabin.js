import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
    const queryClient = useQueryClient();

    const { mutate: editMutate, isLoading: isEditing } = useMutation({
        mutationFn: ({ cabin, id }) => createEditCabin(cabin, id),
        onSuccess: () => {
            toast.success("Cabin edited successfully.");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (err) => toast.error(err.message)
    });

    return { editMutate, isEditing };
}
