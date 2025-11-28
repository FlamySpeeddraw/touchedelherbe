import Button3D from '@components/Button3D';
import Title from '@components/Title';
import { useRouter } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AccueilScreen = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Title text="index" />
            <Button3D onPress={() => router.push("/login")} width={"90%"} color={'#DDD'} darkColor={'#9c9c9cff'}>
                <Text>Se connecter</Text>
            </Button3D>
            <Button3D onPress={() => router.push("/register")} width={"90%"} color={'#DDD'} darkColor={'#9c9c9cff'}>
                <Text>S'enregistrer</Text>
            </Button3D>
        </SafeAreaView>
    );
};

export default AccueilScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        rowGap: 20
    }
});