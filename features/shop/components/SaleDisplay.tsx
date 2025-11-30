import { getPromotions } from '@shop/api/shop.api';
import { Produit, Promotion } from '@shop/types/shop.types';
import { useAuth } from 'context/AuthContext';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLoadingStyle } from 'utils/loadingStyle';

interface props {
    produits: Produit[];
    produitsLoaded: boolean;
}

const SaleDisplay = ({ produits, produitsLoaded }: props) => {
    const { onRefreshAccess, authState, onLogout } = useAuth();
    const [promos, setPromos] = useState<Promotion[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const loadingStyle = useLoadingStyle();

    useEffect(() => {
        const fetchPromos = async () => {
            const res = await getPromotions(onRefreshAccess!, authState!.refresh ?? "", onLogout!);

            if (res.success) {
                setPromos(res.data?.produits ?? []);
            }

            setLoaded(true);
        }

        fetchPromos();
    });

    return (
        <View>
            <Text>SaleDisplay</Text>
        </View>
    );
};

export default SaleDisplay;

const styles = StyleSheet.create({});