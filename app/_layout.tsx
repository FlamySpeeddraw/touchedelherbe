import { AuthProvider } from 'context/AuthContext';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const RootLayout = () => {
    return (
        <AuthProvider>
            <GestureHandlerRootView>
                <Stack>
                    <Stack.Screen name='index' options={{ headerShown: false }} />
                    <Stack.Screen name='login' options={{ headerShown: false }} />
                    <Stack.Screen name='register' options={{ headerShown: false }} />
                    <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                </Stack>
            </GestureHandlerRootView>
        </AuthProvider>
    );
};

export default RootLayout;