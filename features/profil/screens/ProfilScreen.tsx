import Button3D from '@components/Button3D';
import BoxStat from '@profil/components/BoxStat';
import ProfilePicture from '@profil/components/ProfilePicture';
import { useAuth } from 'context/AuthContext';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfilScreen = () => {
    const { onLogout } = useAuth();
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <ProfilePicture pseudo='Flamy' />
            <View style={styles.boxContainer}>
                <BoxStat data='streak' />
                <BoxStat data='points' />
                <BoxStat data='rencontres' />
                <BoxStat data='évènements' />
            </View>
            <Button3D onPress={() => router.push("/historique")} width={"90%"} color={'#DDD'} darkColor={'#9c9c9cff'}>
                <Text>Historique des achats</Text>
            </Button3D>
            <Pressable onPress={() => onLogout!()} style={{ backgroundColor: 'red', width: '90%', marginTop: 20, paddingVertical: 20 }}>
                <Text>Deconnexion</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default ProfilScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    boxContainer: {
        width: '90%',
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 15,
        gap: 15
    }
});