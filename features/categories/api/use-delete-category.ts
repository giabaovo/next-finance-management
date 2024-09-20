import {useMutation, useQueryClient} from "@tanstack/react-query";
import apiClient from "@/features/common/api-client";
import {toast} from "sonner";
import {getTokenFromCookies} from "@/features/tokens/api/set-tokens";

export const useDeleteCategory = (id?: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async () => {
            const token = await getTokenFromCookies()
            const response: ResponseType = await apiClient.delete(`/category/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response
        },
        onSuccess: () => {
            toast.success("Category deleted")
            queryClient.invalidateQueries({queryKey: ['category', {id}]})
            queryClient.invalidateQueries({queryKey: ['categories']})
        },
        onError: () => {
            toast.error("Fail to delete category")
        }
    })

    return mutation
}