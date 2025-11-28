import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TempBackButton = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <Pressable onPress={() => router.back()} style={[styles.container, { top: insets.top }]} />
    );
};

export default TempBackButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DDD',
        width: 60,
        aspectRatio: 1/1,
        borderRadius: '50%',
        position: 'absolute',
        left: 15
    }
});