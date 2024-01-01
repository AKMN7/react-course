import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
    const [searchParams] = useSearchParams();

    const filterValue = searchParams.get("status");
    const filter = !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue, method: "eq" };

    const sortValue = searchParams.get("sort") || "total_price-asc";
    const [field, direction] = sortValue.split("-");
    const sort = { field, direction };

    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

    const { data: { data: bookings, count } = {}, isLoading } = useQuery({ queryKey: ["bookings", filter, sort, page], queryFn: () => getBookings({ filter, sort, page }) });
    return { bookings, count, isLoading };
}
