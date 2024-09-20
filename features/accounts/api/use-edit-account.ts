import {useMutation, useQueryClient} from "@tanstack/react-query";
import apiClient from "@/features/common/api-client";
import {toast} from "sonner";
import {getTokenFromCookies} from "@/features/tokens/api/set-tokens";

type ResponseType = {
    error: string
} | {
    data: {
        id: string
        plaidId: string | null
        name: string
        userId: string
    }
}

type RequestType = {
    values: {
        name: string
    }
}

export const useEditAccount = (id?: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error,RequestType>({
        mutationFn: async (json) => {
            const token = await getTokenFromCookies()
            const response: ResponseType = await apiClient.patch(`/account/${id}/`, json, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response
        },
        onSuccess: () => {
            toast.success("Account updated")
            queryClient.invalidateQueries({queryKey: ['account', {id}]})
            queryClient.invalidateQueries({queryKey: ['accounts']})
        },
        onError: () => {
            toast.error("Fail to update account")
        }
    })

    return mutation
}