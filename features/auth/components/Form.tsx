import { verifyMailTaken } from '@auth/api/auth.api';
import TempButton from '@components/TempButton';
import TempPressable from '@components/TempPressable';
import TempTextInput from '@components/TempTextInput';
import { useAuth } from 'context/AuthContext';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Form = () => {
    const [mail, setMail] = useState<string>("");
    const [mdp, setMdp] = useState<string>("");
    const [confirmMdp, setConfirmMdp] = useState<string>("");
    const [error, setError] = useState<string>("");
    const { onRegister } = useAuth();

    const register = async () => {
        console.log("oui")
        if (!mail || !mdp || !confirmMdp) {
            return setError("Tous les champs doivent être remplis");
        }

        if (!mail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return setError("Format de mail invalide");
        }

        if (mdp !== confirmMdp) {
            return setError("Les mots de passe doivent être identique");
        }

        const response = await verifyMailTaken(mail);
        if (!response.success) {
            return setError(response.code === 409 ? "Le mail est déjà utilisé" : "Une erreur est survenue");
        }

        onRegister!(mail, mdp, "Flamy");
    };

    return (
        <>
            <TempTextInput inputName='Mail' value={mail} setValue={setMail} />
            <TempTextInput inputName='Mot de passe' value={mdp} setValue={setMdp} isPassword />
            <TempTextInput inputName='Confirmer mot de passe' value={confirmMdp} setValue={setConfirmMdp} isPassword />
            <Text>{error}</Text>
            <View style={{ flex: 1 }} />
            <TempPressable text="S'enregistrer" onPress={() => register()} />
        </>
    );
};

export default Form;

const styles = StyleSheet.create({});