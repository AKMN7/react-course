import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const filterValue = searchParams.get("status");
    const filter = !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue, method: "eq" };

    const sortValue = searchParams.get("sort") || "total_price-asc";
    const [field, direction] = sortValue.split("-");
    const sort = { field, direction };

    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

    const { data: { data: bookings, count } = {}, isLoading } = useQuery({ queryKey: ["bookings", filter, sort, page], queryFn: () => getBookings({ filter, sort, page }) });

    // PreFetching
    const pageCount = Math.ceil(count / 10);

    if (page < pageCount) {
        queryClient.prefetchQuery({ queryKey: ["bookings", filter, sort, page + 1], queryFn: () => getBookings({ filter, sort, page: page + 1 }) });
    }

    if (page > 1) {
        queryClient.prefetchQuery({ queryKey: ["bookings", filter, sort, page - 1], queryFn: () => getBookings({ filter, sort, page: page - 1 }) });
    }

    return { bookings, count, isLoading };
}
