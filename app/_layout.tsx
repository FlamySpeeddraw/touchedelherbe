import axios from 'axios';
import { API_URL } from 'const/general.const';
import { AuthProvider, useAuth } from 'context/AuthContext';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { authRequestHandler } from 'utils/auth';

const ProviderLayout = () => {
    return (
        <AuthProvider>
            <GestureHandlerRootView>
                <RootLayout />
            </GestureHandlerRootView>
        </AuthProvider>
    );
};

const RootLayout = () => {
    const { authState, loaded, onUpdateUser, onRefreshAccess, onLogout } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const inAuthGroup = segments[0] === "(protected)";

        const verifyAccess = async () => {
            try {
                await authRequestHandler(() => axios.get(`${API_URL}/auth/accessProtected`), onRefreshAccess!, authState!.refresh ?? "", onLogout!);
                return true;
            } catch (_) {
                return false;
            }
        };

        const redirectByAccess = async () => {
            if (!authState?.authenticated && inAuthGroup) {
                router.replace("/accueil");
                onUpdateUser!(null, null);

            } else if (authState?.authenticated) {
                const access = await verifyAccess();

                if (access) {
                    const res = await authRequestHandler(() => axios.get(`${API_URL}/user/getInfos`), onRefreshAccess!, authState!.refresh ?? "", onLogout!);
                    onUpdateUser!(res.data.mail, res.data.pseudo);
                    router.replace("/(protected)/(tabs)/map");

                } else {
                    router.replace("/index");
                    onUpdateUser!(null, null);
                }
            } else if (!authState?.authenticated && loaded) {
                router.replace("/accueil");
                onUpdateUser!(null, null);
            }
        }

        redirectByAccess();
    }, [authState, loaded]);

    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='login' options={{ headerShown: false }} />
            <Stack.Screen name='register' options={{ headerShown: false }} />
            <Stack.Screen name='accueil' options={{ headerShown: false }} />
            <Stack.Screen name='(protected)' options={{ headerShown: false }} />
        </Stack>
    );
};

export default ProviderLayout;