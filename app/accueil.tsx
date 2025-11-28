import TempButton from '@components/TempButton';
import Title from '@components/Title';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Accueil = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Title text="index" />
            <TempButton text="Se connecter" to='/login' />
            <TempButton text="S'enregistrer" to='/register' />
        </SafeAreaView>
    );
};

export default Accueil;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        rowGap: 20
    }
});