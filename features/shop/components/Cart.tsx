import { StyleSheet, Text, View } from 'react-native';

const Cart = () => {
    return (
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                <Text style={styles.text}>0</Text>
            </View>
        </View>
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ACACAC',
        aspectRatio: 1 / 1,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    subcontainer: {
        backgroundColor: '#757070',
        borderRadius: '50%',
        position: 'absolute',
        top: -4,
        right: -4,
        padding: 2
    },
    text: {
        aspectRatio: 1/1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 500
    }
});