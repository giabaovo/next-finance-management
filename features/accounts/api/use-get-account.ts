import {useQuery} from "@tanstack/react-query";
import apiClient from "@/features/common/api-client";
import {toast} from "sonner";
import {getTokenFromCookies} from "@/features/tokens/api/set-tokens";

export const useGetAccount = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["account", { id }],
        queryFn: async () => {
            const token = await getTokenFromCookies()
            const response = await apiClient.get(`/account/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status !== 200) {
                toast.error('Fail to get account')
            }
            return response.data
        }
    })
    return query
}
