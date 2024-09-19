import {useQuery} from "@tanstack/react-query";
import apiClient from "@/features/common/api-client";
import {toast} from "sonner";

export const useGetAccounts = () => {
    const query = useQuery({
        queryKey: ["accounts"],
        queryFn: async () => {
            apiClient.get("/accounts")
                .then((response) => {
                    return response.data
                })
                .catch(() => {
                    toast.error("Fail to get user accounts")
                })
        }
    })
    return query
}
