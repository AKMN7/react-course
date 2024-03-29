import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: "Sono";
    font-weight: 500;
`;

function BookingRow({
    booking: {
        id: bookingId,
        // created_at,
        start_date,
        end_date,
        // num_of_nights,
        // num_of_guests,
        total_price,
        status,
        guests: { name: guest_name, email },
        cabins: { name: cabin_name }
    }
}) {
    const navigate = useNavigate();
    const { checkout, isLoading: isCheckingOut } = useCheckOut();
    const { deleteMutate, isDeleting } = useDeleteBooking();

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver"
    };

    return (
        <Table.Row>
            <Cabin>{cabin_name}</Cabin>

            <Stacked>
                <span>{guest_name}</span>
                <span>{email}</span>
            </Stacked>

            <Stacked>
                <span>
                    {isToday(new Date(start_date)) ? "Today" : formatDistanceFromNow(start_date)} &rarr; {end_date} night stay
                </span>
                <span>
                    {format(new Date(start_date), "MMM dd yyyy")} &mdash; {format(new Date(end_date), "MMM dd yyyy")}
                </span>
            </Stacked>

            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

            <Amount>{formatCurrency(total_price)}</Amount>

            <Menus.Menu>
                <Menus.Toggle id={bookingId} />
                <Menus.List id={bookingId}>
                    <Menus.Button icon={<HiEye />} onClick={() => navigate(`/bookings/${bookingId}`)}>
                        Details
                    </Menus.Button>
                    {status === "unconfirmed" && (
                        <Menus.Button icon={<HiArrowDownOnSquare />} onClick={() => navigate(`/checkin/${bookingId}`)}>
                            Check In
                        </Menus.Button>
                    )}
                    {status === "checked-in" && (
                        <Menus.Button icon={<HiArrowUpOnSquare />} onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
                            Check Out
                        </Menus.Button>
                    )}
                    <Menus.Button icon={<HiTrash />} onClick={() => deleteMutate(bookingId)} disabled={isDeleting}>
                        Delete
                    </Menus.Button>
                </Menus.List>
            </Menus.Menu>
        </Table.Row>
    );
}

export default BookingRow;
