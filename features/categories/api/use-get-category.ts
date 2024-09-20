import {useQuery} from "@tanstack/react-query";
import apiClient from "@/features/common/api-client";
import {toast} from "sonner";
import {getTokenFromCookies} from "@/features/tokens/api/set-tokens";

export const useGetCategory = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["category", { id }],
        queryFn: async () => {
            const token = await getTokenFromCookies()
            const response = await apiClient.get(`/category/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status !== 200) {
                toast.error('Fail to get category')
            }
            return response.data
        }
    })
    return query
}
