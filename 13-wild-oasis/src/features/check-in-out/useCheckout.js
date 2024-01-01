import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOut() {
    const queryClient = useQueryClient();
    const { mutate: checkout, isLoading } = useMutation({
        mutationFn: (bookingId) =>
            updateBooking(bookingId, {
                status: "checked-out"
            }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} Checked Out successfully.`);
            queryClient.invalidateQueries({ active: true });
        },
        onError: (err) => toast.error(err.message)
    });

    return { checkout, isLoading };
}
