import { verifyMailTaken } from '@auth/api/auth.api';
import TempPressable from '@components/TempPressable';
import TempTextInput from '@components/TempTextInput';
import { useAuth } from 'context/AuthContext';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface props {
    isRegister?: boolean;
}

const Form = ({ isRegister }: props) => {
    const [mail, setMail] = useState<string>("");
    const [mdp, setMdp] = useState<string>("");
    const [confirmMdp, setConfirmMdp] = useState<string>("");
    const [error, setError] = useState<string>("");
    const { onRegister, onLogin } = useAuth();

    const register = async () => {
        if (!mail || !mdp || !confirmMdp) {
            return setError("Tous les champs doivent être remplis");
        }

        if (!mail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return setError("Format de mail invalide");
        }

        if (mdp.length < 8 || !(/^(?=.*[A-Z])(?=.*[0-9!@#$%^&*()_\-+=\[{\]}|:;"'<>,.?/]).+$/).test(mdp)) {
            return setError("Le mot de passe doit au moins faire 8 caractères, contenir au moins une majuscule et un chiffre ou caractère spécial");
        }

        if (mdp !== confirmMdp) {
            return setError("Les mots de passe doivent être identique");
        }

        const response = await verifyMailTaken(mail);
        if (!response.success) {
            return setError(response.code === 409 ? "Le mail est déjà utilisé" : "Une erreur est survenue");
        }

        const result = await onRegister!(mail, mdp, "Flamy");
        if (result.status !== 201) {
            return setError("Une erreur est survenue");
        }

        await onLogin!(mail, mdp);
    };

    const login = async () => {
        if (mail === "" || mdp === "" || !mail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return setError("Indentifiant ou mot de passe invalide");
        }

        const result = await onLogin!(mail, mdp);
        if (result && result.error) {
            return setError("Indentifiant ou mot de passe invalide");
        }
    }

    return (
        <>
            <TempTextInput inputName='Mail' value={mail} setValue={setMail} />
            <TempTextInput inputName='Mot de passe' value={mdp} setValue={setMdp} isPassword />
            {isRegister && <TempTextInput inputName='Confirmer mot de passe' value={confirmMdp} setValue={setConfirmMdp} isPassword />}
            <Text>{error}</Text>
            <View style={{ flex: 1 }} />
            <TempPressable text={isRegister ? "S'enregistrer" : "Se connecter"} onPress={() => isRegister ? register() : login()} />
        </>
    );
};

export default Form;

const styles = StyleSheet.create({});