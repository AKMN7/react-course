import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
    const { data: acitivties, isLoading } = useQuery({
        queryFn: getStaysTodayActivity,
        queryKey: ["today-activity"]
    });

    return { acitivties, isLoading };
}
