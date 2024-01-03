import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
    const [searParams] = useSearchParams();

    const numDays = searParams.get("last") || 7;
    const queryDate = subDays(new Date(), numDays).toISOString();

    const { data: stays, isLoading } = useQuery({
        queryFn: () => getStaysAfterDate(queryDate),
        queryKey: ["stays", `last-${numDays}`]
    });

    const confirmedStays = stays?.filter((stay) => stay.status === "checked-in" || "checked-out");

    return { stays, confirmedStays, numDays, isLoading };
}
