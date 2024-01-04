import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import Empty from "../../ui/Empty";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { useCheckOut } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const navigate = useNavigate();
    const moveBack = useMoveBack();
    const { booking, isLoading } = useBooking();
    const { checkout, isLoading: isCheckingOut } = useCheckOut();
    const { deleteMutate, isDeleting } = useDeleteBooking();

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver"
    };

    if (isLoading) return <Spinner />;
    if (!booking) return <Empty resource="Booking" />;

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{booking.id}</Heading>
                    <Tag type={statusToTagName[booking.status]}>{booking.status.replace("-", " ")}</Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                {booking.status === "unconfirmed" && <Button onClick={() => navigate(`/checkin/${booking.id}`)}>Ceck In</Button>}
                {booking.status === "checked-in" && (
                    <Button onClick={() => checkout(booking.id)} disabled={isCheckingOut}>
                        Check Out
                    </Button>
                )}
                <Button variation="danger" onClick={() => deleteMutate(booking.id)} disabled={isDeleting}>
                    Delete
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
