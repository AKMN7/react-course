import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";

function Bookings() {
    return (
        <>
            <Row>
                <Heading as="h1">Bookings</Heading>
                <p>TEST</p>
            </Row>
            <Row type="vertical">
                <BookingTable />
            </Row>
        </>
    );
}

export default Bookings;
