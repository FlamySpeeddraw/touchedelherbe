import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

interface props {
    text: string;
    to: string;
}

const TempButton = ({ text, to }: props) => {
    const router = useRouter();

    return (
        <Pressable onPress={() => router.push(to)} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

export default TempButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DDD',
        paddingVertical: 8,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    text: {
        fontSize: 20,
        fontWeight: 500
    }
});