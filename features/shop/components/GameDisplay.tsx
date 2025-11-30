import { getAllJeux } from '@shop/api/shop.api';
import { useAuth } from 'context/AuthContext';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useLoadingStyle } from 'utils/loadingStyle';

const GameDisplay = () => {
    const { onRefreshAccess, authState, onLogout } = useAuth();
    const [jeux, setJeux] = useState<string[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const loadingStyle = useLoadingStyle();

    useEffect(() => {
        const fetchJeux = async () => {
            const res = await getAllJeux(onRefreshAccess!, authState!.refresh ?? "", onLogout!);

            if (res.success) {
                setJeux(res.data?.jeux ?? []);
            }

            setLoaded(true);
        }

        fetchJeux();
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Jeux</Text>
            {loaded ?
                <FlatList contentContainerStyle={{ paddingLeft: 20, columnGap: 20 }} horizontal data={jeux} renderItem={(item => (
                    <View style={[styles.emptyBox, { backgroundColor: 'red' }]} />
                ))} />
                :
                <View style={styles.boxContainer}>
                    {Array(5).fill(0).map((_, index) => (
                        <Animated.View key={index} style={[loadingStyle, styles.emptyBox]} />
                    ))}
                </View>
            }
        </View>
    );
};

export default GameDisplay;

const styles = StyleSheet.create({
    container: {
    },
    title: {
        paddingLeft: 20,
        fontSize: 20,
        marginVertical: 20
    },
    boxContainer: {
        flexDirection: 'row',
        gap: 20,
        paddingLeft: 20
    },
    emptyBox: {
        width: 120,
        aspectRatio: 1 / 1,
        borderRadius: 15
    }
});