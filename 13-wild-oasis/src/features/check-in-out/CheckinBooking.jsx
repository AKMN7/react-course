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
import { useSettings } from "../settings/useSetting";

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
    const { settings, isLoading: isLoadingSettings } = useSettings();
    const [confirm, setConfirm] = useState(false);
    const [addBreakFast, setAddBreakFast] = useState(false);

    useEffect(() => {
        setConfirm(booking?.paid ?? false);
    }, [booking]);

    const opeitonalBreakfast = settings?.breakfast_price * booking?.num_of_guests * booking?.num_of_nights;

    function handleCheckin() {
        if (!confirm) return;

        if (addBreakFast) {
            checkin({
                bookingId: booking.id,
                breakfast: { has_breakfast: true, extras_price: opeitonalBreakfast, total_price: booking.total_price + opeitonalBreakfast }
            });
        } else {
            checkin({
                bookingId: booking.id,
                breakfast: {}
            });
        }
    }

    if (isLoading || isLoadingSettings) return <Spinner />;

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{booking.id}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {!booking?.has_breakfast && (
                <Box>
                    <Checkbox
                        checked={addBreakFast}
                        onChange={() => {
                            setAddBreakFast((curr) => !curr);
                            setConfirm(false);
                        }}
                        disabled={isCheckingIn}
                    >
                        Want to add breakfast for {formatCurrency(opeitonalBreakfast)}?
                    </Checkbox>
                </Box>
            )}

            <Box>
                <Checkbox checked={confirm} onChange={() => setConfirm((confirm) => !confirm)} disabled={confirm || isCheckingIn}>
                    Confirm that a full payment of a total ammount ({!addBreakFast ? formatCurrency(booking.total_price) : formatCurrency(booking.total_price + opeitonalBreakfast)}) has been done from {booking.guests.name}.
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
