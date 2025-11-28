import { StyleSheet, Text, TextInput, View } from 'react-native';

interface props {
    inputName: string;
    value: string;
    setValue: (text: string) => void;
    isPassword?: boolean;
    forgotPassword?: boolean;
}

const TempTextInput = ({ inputName, value, setValue, isPassword, forgotPassword }: props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{inputName}</Text>
            <TextInput value={value} onChangeText={setValue} secureTextEntry={isPassword} style={styles.input} autoCapitalize='none' />
            {forgotPassword && <Text style={styles.forgot}>Mot de passe oublié ?</Text>}
        </View>
    );
};

export default TempTextInput;

const styles = StyleSheet.create({
    container: {
        width: '90%'
    },
    text: {
        fontWeight: 500,
        fontSize: 16
    },
    input: {
        backgroundColor: '#DDD',
        paddingVertical: 10
    },
    forgot: {
        alignItems: 'flex-end',
        fontStyle: 'italic',
        marginTop: 5,
        textAlign: 'right'
    }
});