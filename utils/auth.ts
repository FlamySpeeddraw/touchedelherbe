import axios, { AxiosResponse } from "axios";
import { API_URL } from "const/general.const";

export const authRequestHandler = async (
    apiCall: () => Promise<AxiosResponse>,
    onRefreshAccess: (accessToken: string) => Promise<AxiosResponse>,
    refreshToken: string,
    onLogout: () => void
): Promise<AxiosResponse> => {
    try {
        return await apiCall();

    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data.message === "Token expiré") {
            try {
                const refreshResponse = await axios.post(`${API_URL}/auth/refresh`, { refresh: refreshToken });
                onRefreshAccess(refreshResponse.data.accessToken);
                return await apiCall();

            } catch (error2) {
                if (axios.isAxiosError(error2) && error2.response?.data.message === "Token expiré") {
                    onLogout();
                    throw new Error("Session expirée");
                }

                if (error2 instanceof Error) {
                    throw error2;
                }

                throw new Error("Erreur inconnue");
            }
        }

        if (error instanceof Error) {
            throw error;
        }

        throw new Error("Erreur inconnue");
    }
}