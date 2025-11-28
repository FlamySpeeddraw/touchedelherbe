import { Achat } from '@shop/types/shop.types';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatDate } from 'utils/date';

const HistoriqueScreen = () => {
    const [achats, setAchats] = useState<Achat[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data: Achat[] = [
                { produit: "300 Vbuck", dateAchat: new Date(), prix: 250 },
                { produit: "400 Roblux", dateAchat: new Date(), prix: 400 },
                { produit: "1000 Vbuck", dateAchat: new Date(), prix: 600 },
                { produit: "300 Vbuck", dateAchat: new Date(), prix: 300 },
                { produit: "300 Vbuck", dateAchat: new Date(), prix: 250 }
            ];

            setAchats(data);
        };

        fetchData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {achats.map((achat, index) => (
                    <View key={index} style={styles.achatContainer}>
                        <View>
                            <Text style={styles.text}>{achat.produit}</Text>
                            <Text style={styles.date}>{formatDate(achat.dateAchat)}</Text>
                        </View>
                        <Text style={styles.text}>{achat.prix} points</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default HistoriqueScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        flexGrow: 1,
        rowGap: 15
    },
    achatContainer: {
        padding: 10,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#DDD',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 18,
        fontWeight: 600
    },
    date: {
        fontSize: 14,
        fontWeight: 500
    }
});