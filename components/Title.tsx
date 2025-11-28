import { StyleSheet, Text } from 'react-native';

interface props {
    text: string;
}

const Title = ({ text }: props) => {
    return <Text style={styles.title}>{text}</Text>;
};

export default Title;

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 600
    }
});