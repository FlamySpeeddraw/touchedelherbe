import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

const MapScreen = () => {
    const insets = useSafeAreaInsets();
    const [status, requestPermission] = Location.useForegroundPermissions();
    const [location, setLocation] = useState<Location.LocationObject>();

    useEffect(() => {
        const getPosition = async () => {
            await requestPermission();
            const response = await Location.getCurrentPositionAsync();
            setLocation(response);
            
        }

        getPosition();
    }, []);

    return (
        <View>
            <MapView region={{ latitude: location?.coords.latitude ?? 0, longitude: location?.coords.longitude ?? 0, latitudeDelta: 0.005, longitudeDelta: 0.005 }} style={{ width: '100%', height: '100%' }} />
            <View style={[styles.boxContainer, { top: insets.top }]}>
                <View style={styles.box} />
                <View style={styles.box} />
            </View>
        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    boxContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        alignSelf: 'center',
        position: 'absolute'
    },
    box: {
        backgroundColor: '#DDD',
        width: 80,
        aspectRatio: 1 / 1,
        borderRadius: 15
    }
});