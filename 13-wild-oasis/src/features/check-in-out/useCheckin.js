import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckIn() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: checkin, isLoading } = useMutation({
        mutationFn: (bookingId) =>
            updateBooking(bookingId, {
                status: "checked-in",
                paid: true
            }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} Checked In successfully.`);
            queryClient.invalidateQueries({ active: true });
            navigate("/");
        },
        onError: (err) => toast.error(err.message)
    });

    return { checkin, isLoading };
}
