import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckIn } from "./useCheckin";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const moveBack = useMoveBack();
    const { booking, isLoading } = useBooking();
    const { checkin, isLoading: isCheckingIn } = useCheckIn();
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        setConfirm(booking?.paid ?? false);
    }, [booking]);

    function handleCheckin() {
        if (!confirm) return;
        checkin(booking.id);
    }

    if (isLoading) return <Spinner />;

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{booking.id}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <Box>
                <Checkbox checked={confirm} onChange={() => setConfirm((confirm) => !confirm)} disabled={confirm || isCheckingIn}>
                    Confirm that a full payment of a total ammount ({formatCurrency(booking.total_price)}) has been done from {booking.guests.name}.
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button onClick={handleCheckin} disabled={!confirm || isCheckingIn}>
                    Check in booking #{booking.id}
                </Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
