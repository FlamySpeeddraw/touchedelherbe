import TempButton from '@components/TempButton';
import BoxStat from '@profil/components/BoxStat';
import ProfilePicture from '@profil/components/ProfilePicture';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfilScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ProfilePicture pseudo='Flamy' />
            <View style={styles.boxContainer}>
                <BoxStat data='streak' />
                <BoxStat data='points' />
                <BoxStat data='rencontres' />
                <BoxStat data='évènements' />
            </View>
            <TempButton text='Historique des achats' to='/historique' />
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