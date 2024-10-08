import {useQuery} from "@tanstack/react-query";
import apiClient from "@/features/common/api-client";
import {toast} from "sonner";
import {getTokenFromCookies} from "@/features/tokens/api/set-tokens";

export const useGetAccounts = () => {
    const query = useQuery({
        queryKey: ["accounts"],
        queryFn: async () => {
            const token = await getTokenFromCookies()
            const response = await apiClient.get("/account/", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status !== 200) {
                toast.error('Fail to get accounts')
            }
            return response.data
        }
    })
    return query
}
