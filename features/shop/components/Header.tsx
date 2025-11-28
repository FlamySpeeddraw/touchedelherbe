import { StyleSheet, Text, TextInput, View } from 'react-native';
import Cart from './Cart';

interface props {
    value: string;
    setValue: (value: string) => void;
}

const Header = ({ value, setValue }: props) => {
    return (
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                <TextInput value={value} onChangeText={setValue} style={styles.input} />
                <Cart />
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DDD',
        paddingVertical: 50,
        alignItems: 'center'
    },
    subcontainer: {
        width: '90%',
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        backgroundColor: '#ACACAC',
        marginRight: 20,
        borderRadius: 15
    }
});