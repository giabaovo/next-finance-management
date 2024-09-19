import {auth, clerkClient} from "@clerk/nextjs/server";
import apiClient from "@/features/common/api-client";

export const getToken = async () => {
    try {
        const {userId} = auth()
        let data = {}
        if (userId) {
            const user = await clerkClient().users.getUser(userId)
            data = {
                "email": user.primaryEmailAddress,
                "userId": userId
            }
        }
        const response = await apiClient.post('user/token/', data);
        return response.data;

    } catch (error) {
        throw new Error("Something went wrong")
    }
};