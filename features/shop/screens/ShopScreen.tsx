import { getAllJeux, getAllProduit } from '@shop/api/shop.api';
import GameDisplay from '@shop/components/GameDisplay';
import Header from '@shop/components/Header';
import SaleDisplay from '@shop/components/SaleDisplay';
import { Produit } from '@shop/types/shop.types';
import { useAuth } from 'context/AuthContext';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ShopScreen = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [produits, setProduits] = useState<Produit[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const { onRefreshAccess, onLogout, authState } = useAuth();

    useEffect(() => {
        const fetchProduits = async () => {
            const res = await getAllProduit(onRefreshAccess!, authState!.refresh ?? "", onLogout!);
            
            if (res.success) {
                setProduits(res.data?.produits ?? []);
            }

            setLoaded(true);
        }

        fetchProduits();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Header value={searchQuery} setValue={setSearchQuery} />
                <GameDisplay />
                <SaleDisplay produitsLoaded={loaded} produits={produits} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ShopScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        flexGrow: 1
    }
});