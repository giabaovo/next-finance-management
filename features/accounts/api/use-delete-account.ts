import {useMutation, useQueryClient} from "@tanstack/react-query";
import apiClient from "@/features/common/api-client";
import {toast} from "sonner";
import {getTokenFromCookies} from "@/features/tokens/api/set-tokens";

export const useDeleteAccount = (id?: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async () => {
            const token = await getTokenFromCookies()
            const response: ResponseType = await apiClient.delete(`/account/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response
        },
        onSuccess: () => {
            toast.success("Account deleted")
            queryClient.invalidateQueries({queryKey: ['account', {id}]})
            queryClient.invalidateQueries({queryKey: ['accounts']})
        },
        onError: () => {
            toast.error("Fail to delete account")
        }
    })

    return mutation
}