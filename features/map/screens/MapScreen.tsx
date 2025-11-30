import { Pressable, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import Svg, { Path } from "react-native-svg";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import QrCodeDisplay from '@map/components/QrCodeDisplay';
import QrContainer from '@map/components/QrContainer';

const MapScreen = () => {
    const insets = useSafeAreaInsets();
    const [status, requestPermission] = Location.useForegroundPermissions();
    const [location, setLocation] = useState<Location.LocationObject>();

    const isOpen = useSharedValue<boolean>(false);

    const animatedStylePressable = useAnimatedStyle(() => ({
        top: withTiming(!isOpen.value ? "100%" : "0%", { duration: 1000 })
    }));

    useEffect(() => {
        const getPosition = async () => {
            await requestPermission();
            const response = await Location.getCurrentPositionAsync();
            setLocation(response);

        }

        getPosition();
    }, []);

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Animated.View style={[animatedStylePressable, { width: "100%", zIndex: 1, height: "100%", position: 'absolute' }]}>
                <QrContainer isOpen={isOpen} />
            </Animated.View>
            <MapView region={{ latitude: location?.coords.latitude ?? 0, longitude: location?.coords.longitude ?? 0, latitudeDelta: 0.005, longitudeDelta: 0.005 }} style={{ width: '100%', height: '120%' }}>
                <Marker coordinate={{ latitude: location?.coords.latitude ?? 0, longitude: location?.coords.longitude ?? 0 }} title='Toi' />
            </MapView>
            <View style={[styles.boxContainer, { top: insets.top }]}>
                <View style={styles.box} />
                <Pressable style={styles.box} onPress={() => isOpen.set(true)}>
                    <Svg
                        width={"70%"}
                        height={"70%"}
                        viewBox="0 0 60 61"
                        fill="none"
                    >
                        <Path
                            d="M8.57143 17.25H17.1429V8.625H8.57143V17.25ZM0 6.46875C0 2.89746 2.87946 0 6.42857 0H19.2857C22.8348 0 25.7143 2.89746 25.7143 6.46875V19.4062C25.7143 22.9775 22.8348 25.875 19.2857 25.875H6.42857C2.87946 25.875 0 22.9775 0 19.4062V6.46875ZM8.57143 51.75H17.1429V43.125H8.57143V51.75ZM0 40.9688C0 37.3975 2.87946 34.5 6.42857 34.5H19.2857C22.8348 34.5 25.7143 37.3975 25.7143 40.9688V53.9062C25.7143 57.4775 22.8348 60.375 19.2857 60.375H6.42857C2.87946 60.375 0 57.4775 0 53.9062V40.9688ZM42.8571 8.625V17.25H51.4286V8.625H42.8571ZM40.7143 0H53.5714C57.1205 0 60 2.89746 60 6.46875V19.4062C60 22.9775 57.1205 25.875 53.5714 25.875H40.7143C37.1652 25.875 34.2857 22.9775 34.2857 19.4062V6.46875C34.2857 2.89746 37.1652 0 40.7143 0ZM38.5714 43.125C37.4348 43.125 36.3447 42.6706 35.541 41.8619C34.7372 41.0531 34.2857 39.9562 34.2857 38.8125C34.2857 37.6688 34.7372 36.5719 35.541 35.7631C36.3447 34.9544 37.4348 34.5 38.5714 34.5C39.7081 34.5 40.7982 34.9544 41.6019 35.7631C42.4056 36.5719 42.8571 37.6688 42.8571 38.8125C42.8571 39.9562 42.4056 41.0531 41.6019 41.8619C40.7982 42.6706 39.7081 43.125 38.5714 43.125ZM38.5714 51.75C40.942 51.75 42.8571 53.6771 42.8571 56.0625C42.8571 58.4479 40.942 60.375 38.5714 60.375C36.2009 60.375 34.2857 58.4479 34.2857 56.0625C34.2857 53.6771 36.2009 51.75 38.5714 51.75ZM51.4286 56.0625C51.4286 53.6771 53.3438 51.75 55.7143 51.75C58.0848 51.75 60 53.6771 60 56.0625C60 58.4479 58.0848 60.375 55.7143 60.375C53.3438 60.375 51.4286 58.4479 51.4286 56.0625ZM55.7143 43.125C54.5776 43.125 53.4876 42.6706 52.6838 41.8619C51.8801 41.0531 51.4286 39.9562 51.4286 38.8125C51.4286 37.6688 51.8801 36.5719 52.6838 35.7631C53.4876 34.9544 54.5776 34.5 55.7143 34.5C56.8509 34.5 57.941 34.9544 58.7447 35.7631C59.5485 36.5719 60 37.6688 60 38.8125C60 39.9562 59.5485 41.0531 58.7447 41.8619C57.941 42.6706 56.8509 43.125 55.7143 43.125ZM51.4286 47.4375C51.4286 48.5812 50.977 49.6781 50.1733 50.4869C49.3696 51.2956 48.2795 51.75 47.1429 51.75C46.0062 51.75 44.9161 51.2956 44.1124 50.4869C43.3087 49.6781 42.8571 48.5812 42.8571 47.4375C42.8571 46.2938 43.3087 45.1969 44.1124 44.3881C44.9161 43.5794 46.0062 43.125 47.1429 43.125C48.2795 43.125 49.3696 43.5794 50.1733 44.3881C50.977 45.1969 51.4286 46.2938 51.4286 47.4375Z"
                            fill="black"
                        />
                    </Svg>
                </Pressable>
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
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
});