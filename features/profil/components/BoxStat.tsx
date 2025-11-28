import { StyleSheet, Text, View } from 'react-native';

interface props {
    data: 'streak' | 'points' | 'rencontres' | 'évènements';
}

const units = {
    'streak': 'jours',
    'points': 'points',
    'rencontres': 'joueurs',
    'évènements': 'évènements',
}

const BoxStat = ({ data }: props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{data.charAt(0).toUpperCase() + data.slice(1)}</Text>
            <Text style={styles.text}>{Math.floor(Math.random() * 200) + " " + units[data]}</Text>
        </View>
    );
};

export default BoxStat;

const styles = StyleSheet.create({
    container: {
        width: '45%',
        backgroundColor: '#DDD',
        padding: 10,
        borderRadius: 15
    },
    title: {
        fontSize: 16,
        fontWeight: 600
    },
    text: {
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 400,
        fontSize: 16
    }
});