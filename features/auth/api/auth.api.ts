import { PostMailTakenError, PostMailTakenResponse } from "@auth/types/api.type";
import axios from "axios";
import { API_URL } from "const/general.const";

export const verifyMailTaken = async (
    mail: string
): Promise<PostMailTakenResponse | PostMailTakenError> => {
    try {
        console.log(`${API_URL}/auth/isMailUsed`)
        const response = await axios.post(`${API_URL}/auth/isMailUsed`, { mail });

        return {
            success: true,
            message: response.data.message,
            headers: response.headers
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { success: false, code: error.status, message: error.response?.data.message };
        }

        if (error instanceof Error) {
            return { success: false, code: undefined, message: error.message };
        }

        return { success: false, code: undefined, message: "Post mailTaken : Erreur inconnue" };
    }
}