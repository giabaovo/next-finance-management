import {useMutation, useQueryClient} from "@tanstack/react-query";
import apiClient from "@/features/common/api-client";
import {toast} from "sonner";
import {getTokenFromCookies} from "@/features/tokens/api/set-tokens";

type ResponseType = {
    error: string
} | {
    data: {
        id: string
    }[]
}

type RequestType = {
    ids: string[]
}

export const useBulkDeleteCategories = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const token = await getTokenFromCookies()
            const response: ResponseType = await apiClient.post("/category/bulk-delete/", json, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response
        },
        onSuccess: () => {
            toast.success("Categories deleted")
            queryClient.invalidateQueries({queryKey: ['categories']})
        },
        onError: () => {
            toast.error("Fail to delete categories")
        }
    })

    return mutation
}