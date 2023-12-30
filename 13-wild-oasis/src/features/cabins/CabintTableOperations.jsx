import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
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
            <SortBy
                options={[
                    { value: "name-asc", label: "Name (A-Z)" },
                    { value: "name-desc", label: "Name (Z-A)" },
                    { value: "price-asc", label: "Price (Low To High)" },
                    { value: "price-desc", label: "Price (High To Low)" }
                ]}
            />
        </TableOperations>
    );
}

export default CabintTableOperations;
