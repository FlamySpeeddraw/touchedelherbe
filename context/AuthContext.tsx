import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { authRequestHandler } from "utils/auth";
import { ACCESS_TOKEN_KEY, API_URL, REFRESH_TOKEN_KEY } from "const/general.const";

interface AuthProps {
    loaded?: boolean | null;
    authState?: { access: string | null, refresh: string | null, authenticated: boolean | null };
    user?: { mail: string | null, pseudo: string | null };
    onRegister?: (mail: string, password: string, pseudo: string) => Promise<any>;
    onLogin?: (mail: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
    onRefreshAccess?: (token: string) => Promise<any>;
    onUpdateUser?: (mail: string | null, pseudo: string | null) => void;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{ access: string | null, refresh: string | null, authenticated: boolean | null }>({ access: null, refresh: null, authenticated: null });
    const [user, setUser] = useState<{ mail: string | null, pseudo: string | null }>({ mail: null, pseudo: null });
    const [loaded, setLoaded] = useState<boolean | null>(false);

    useEffect(() => {
        const loadToken = async () => {
            const access = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
            const refresh = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);

            if (access) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

                setAuthState({ access: access, refresh: refresh, authenticated: true });
            }

            setLoaded(true);
        }

        loadToken();
    }, []);

    const refreshAccess = async (token: string): Promise<any> => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);

            return { success: true, token };
        } catch (e) {
            return { error: true, msg: (e as any).response.data.msg };
        }
    }

    const register = async (mail: string, password: string, pseudo: string) => {
        try {
            return await axios.post(`${API_URL}/auth/register`, { mail, password, pseudo });
        } catch (e) {
            return { error: true, msg: (e as any).response.data.msg };
        }
    };

    const login = async (mail: string, password: string) => {
        try {
            const result = await axios.post(`${API_URL}/auth/login`, { mail, password });

            setAuthState({ access: result.data.accessToken, refresh: result.data.refreshToken, authenticated: true });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`;
            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, result.data.accessToken);
            await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, result.data.refreshToken);

            const infos = await axios.get(`${API_URL}/user/getInfos`);
            setUser({ mail: infos.data.mail, pseudo: infos.data.pseudo });

            return result;
        } catch (error: any) {
            if (error.response) {
                return { error: true, msg: error.response.data };
            } else {
                return { error: true, msg: error.response.data.msg };
            }
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
        axios.defaults.headers.common['Authorization'] = '';
        setAuthState({ access: null, refresh: null, authenticated: false });
    }

    const updateUser = (mail: string | null, pseudo: string | null) => {
        setUser({ mail, pseudo });
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        onRefreshAccess: refreshAccess,
        onUpdateUser: updateUser,
        authState,
        user,
        loaded
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}