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

export const useEditCategory = (id?: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error,RequestType>({
        mutationFn: async (json) => {
            const token = await getTokenFromCookies()
            const response: ResponseType = await apiClient.patch(`/category/${id}/`, json, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response
        },
        onSuccess: () => {
            toast.success("Category updated")
            queryClient.invalidateQueries({queryKey: ['category', {id}]})
            queryClient.invalidateQueries({queryKey: ['categories']})
        },
        onError: () => {
            toast.error("Fail to update category")
        }
    })

    return mutation
}