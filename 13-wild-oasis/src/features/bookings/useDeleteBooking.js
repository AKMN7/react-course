import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: deleteMutate, isLoading: isDeleting } = useMutation({
        mutationFn: deleteBooking,
        onSuccess: () => {
            toast.success("Booking deleted successfully.");
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            navigate("/bookings");
        },
        onError: (err) => toast.error(err.message)
    });

    return { deleteMutate, isDeleting };
}
