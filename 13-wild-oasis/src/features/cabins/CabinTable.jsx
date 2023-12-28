import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function CabinTable() {
    const { cabins, isLoading } = useCabins();
    if (isLoading) return <Spinner />;
    return (
        <Menus>
            <Table columns="1.2fr 1.8fr 1.4fr 1.2fr 1.2fr 0.6fr">
                <Table.Header role="row">
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>

                <Table.Body data={cabins} render={(el) => <CabinRow cabin={el} key={el.id} />} />
            </Table>
        </Menus>
    );
}

export default CabinTable;
