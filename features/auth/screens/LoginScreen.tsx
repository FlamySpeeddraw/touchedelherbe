import TempBackButton from '@components/TempBackButton';
import TempButton from '@components/TempButton';
import TempTextInput from '@components/TempTextInput';
import Title from '@components/Title';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
    const [mail, setMail] = useState<string>("");
    const [mdp, setMdp] = useState<string>("");

    return (
        <SafeAreaView style={styles.container}>
            <TempBackButton />
            <Title text="Se connecter" />
            <View style={{ marginTop: 40 }} />
            <TempTextInput inputName='Mail' value={mail} setValue={setMail} />
            <TempTextInput inputName='Mot de passe' value={mdp} setValue={setMdp} isPassword forgotPassword />
            <View style={{ flex: 1 }} />
            <TempButton text='Se connecter' to='/map' />
            <View style={{ marginBottom: 20 }} />
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        rowGap: 30
    }
});