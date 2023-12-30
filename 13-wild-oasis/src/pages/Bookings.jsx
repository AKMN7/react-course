import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

function Bookings() {
    return (
        <>
            <Row>
                <Heading as="h1">Bookings</Heading>
                <BookingTableOperations />
            </Row>
            <Row type="vertical">
                <BookingTable />
            </Row>
        </>
    );
}

export default Bookings;
