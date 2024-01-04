import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
    const { checkout, isLoading } = useCheckOut();
    return (
        <Button variation="primary" size="small" onClick={() => checkout(bookingId)} disabled={isLoading}>
            Check out
        </Button>
    );
}

export default CheckoutButton;
