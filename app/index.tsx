import TempButton from '@components/TempButton';
import Title from '@components/Title';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>CHARGEMENT</Text>
        </SafeAreaView>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 20
    }
});