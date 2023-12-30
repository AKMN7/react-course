import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function CabintTableOperations() {
    return (
        <TableOperations>
            <Filter
                target="discount"
                options={[
                    { value: "all", label: "All" },
                    { value: "no-discount", label: "No discount" },
                    { value: "with-discount", label: "With discount" }
                ]}
            />
        </TableOperations>
    );
}

export default CabintTableOperations;
