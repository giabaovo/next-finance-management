import {useMutation, useQueryClient} from "@tanstack/react-query";
import apiClient from "@/features/common/api-client";
import {toast} from "sonner";

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

export const useCreateAccount = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error,RequestType>({
        mutationFn: async (json) => {
            const response: ResponseType = await apiClient.post("/accounts", json)
            return response
        },
        onSuccess: () => {
            toast.success("Account created")
            queryClient.invalidateQueries({queryKey: ['accounts']})
        },
        onError: () => {
            toast.error("Fail to create account")
        }
    })

    return mutation
}