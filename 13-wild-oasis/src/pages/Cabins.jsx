import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
    const [show, setShow] = useState(false);
    return (
        <>
            <Row>
                <Heading as="h1">All cabins</Heading>
                <p>Filter / Sort</p>
            </Row>
            <Row type="vertical">
                <CabinTable />
                {show && <CreateCabinForm />}
                <Button onClick={() => setShow((curr) => !curr)}>Add New Cabin</Button>
            </Row>
        </>
    );
}

export default Cabins;
