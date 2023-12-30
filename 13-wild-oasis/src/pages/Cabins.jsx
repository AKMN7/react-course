import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabintTableOperations from "../features/cabins/CabintTableOperations";

function Cabins() {
    return (
        <>
            <Row>
                <Heading as="h1">Cabins</Heading>
                <CabintTableOperations />
            </Row>
            <Row type="vertical">
                <CabinTable />
                <AddCabin />
            </Row>
        </>
    );
}

export default Cabins;
