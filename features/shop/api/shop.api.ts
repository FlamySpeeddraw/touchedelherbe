import { Achat, GetHistoriqueReponse, GetJeuxResponse, GetProductReponse, GetPromotionsResponse, PostAchatResponse } from "@shop/types/shop.types";
import axios, { AxiosResponse } from "axios";
import { API_URL } from "const/general.const";
import { ErrorApiResponse } from "types/general.type";
import { authRequestHandler } from "utils/auth";

export const getAllProduit = async (
    onRefreshAccess: (accessToken: string) => Promise<AxiosResponse>,
    refreshToken: string,
    onLogout: () => void
): Promise<GetProductReponse | ErrorApiResponse> => {
    try {
        const response = await authRequestHandler(() => axios.get(`${API_URL}/shop/`), onRefreshAccess, refreshToken, onLogout);

        return {
            success: true,
            message: response.data.message,
            headers: response.headers,
            data: response.data
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { success: false, message: error.response?.data.message };
        }

        if (error instanceof Error) {
            return { success: false, message: error.message };
        }

        return { success: false, message: "Get allProduit : Erreur inconnue" };
    }
}

export const getPromotions = async (
    onRefreshAccess: (accessToken: string) => Promise<AxiosResponse>,
    refreshToken: string,
    onLogout: () => void
): Promise<GetPromotionsResponse | ErrorApiResponse> => {
    try {
        const response = await authRequestHandler(() => axios.get(`${API_URL}/shop/promotions`), onRefreshAccess, refreshToken, onLogout);

        return {
            success: true,
            message: response.data.message,
            headers: response.headers,
            data: response.data
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { success: false, message: error.response?.data.message };
        }

        if (error instanceof Error) {
            return { success: false, message: error.message };
        }

        return { success: false, message: "Get promotions : Erreur inconnue" };
    }
}

export const getAllJeux = async (
    onRefreshAccess: (accessToken: string) => Promise<AxiosResponse>,
    refreshToken: string,
    onLogout: () => void
): Promise<GetJeuxResponse | ErrorApiResponse> => {
    try {
        const response = await authRequestHandler(() => axios.get(`${API_URL}/shop/jeux`), onRefreshAccess, refreshToken, onLogout);

        return {
            success: true,
            message: response.data.message,
            headers: response.headers,
            data: response.data
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { success: false, message: error.response?.data.message };
        }

        if (error instanceof Error) {
            return { success: false, message: error.message };
        }

        return { success: false, message: "Get allProduit : Erreur inconnue" };
    }
}

export const getProduitByJeu = async (
    jeu: string,
    onRefreshAccess: (accessToken: string) => Promise<AxiosResponse>,
    refreshToken: string,
    onLogout: () => void
): Promise<GetProductReponse | ErrorApiResponse> => {
    try {
        const response = await authRequestHandler(() => axios.get(`${API_URL}/shop/${jeu}`), onRefreshAccess, refreshToken, onLogout);

        return {
            success: true,
            message: response.data.message,
            headers: response.headers,
            data: response.data
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { success: false, message: error.response?.data.message };
        }

        if (error instanceof Error) {
            return { success: false, message: error.message };
        }

        return { success: false, message: "Get allProduit : Erreur inconnue" };
    }
}

export const postAchat = async (
    achat: Omit<Achat, "dateAchat" | "_id">,
    onRefreshAccess: (accessToken: string) => Promise<AxiosResponse>,
    refreshToken: string,
    onLogout: () => void
): Promise<PostAchatResponse | ErrorApiResponse> => {
    try {
        const response = await authRequestHandler(() => axios.post(`${API_URL}/shop/achat`, achat), onRefreshAccess, refreshToken, onLogout);

        return {
            success: true,
            message: response.data.message,
            headers: response.headers
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { success: false, message: error.response?.data.message };
        }

        if (error instanceof Error) {
            return { success: false, message: error.message };
        }

        return { success: false, message: "Get allProduit : Erreur inconnue" };
    }
}

export const getHistorique = async (
    mail: string,
    onRefreshAccess: (accessToken: string) => Promise<AxiosResponse>,
    refreshToken: string,
    onLogout: () => void
): Promise<GetHistoriqueReponse | ErrorApiResponse> => {
    try {
        const response = await authRequestHandler(() => axios.post(`${API_URL}/shop/historique`, { mail }), onRefreshAccess, refreshToken, onLogout);

        return {
            success: true,
            message: response.data.message,
            headers: response.headers,
            data: response.data
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { success: false, message: error.response?.data.message };
        }

        if (error instanceof Error) {
            return { success: false, message: error.message };
        }

        return { success: false, message: "Get allProduit : Erreur inconnue" };
    }
}