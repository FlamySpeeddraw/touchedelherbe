import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { SharedValue, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import QrCodeReader from './QrCodeReader';
import QrCodeDisplay from './QrCodeDisplay';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface props {
    isOpen: SharedValue<boolean>;
}

const QrContainer = ({ isOpen }: props) => {
    const [containerHeight, setContainerHeight] = useState<number>(0);
    const [cameraDisplay, setCameraDisplay] = useState<boolean>(true);
    const offsetY = useSharedValue<number>(0);

    const gesture = Gesture.Pan().onUpdate((e) => {
        if (e.translationY > 0) {
            offsetY.value = e.translationY
        }
    }).onEnd((e) => {
        if (e.velocityY > 500 || containerHeight / 3 < offsetY.value) {
            isOpen.value = false;
            offsetY.value = withDelay(1000, withTiming(0));
        } else {
            offsetY.value = withTiming(0, { duration: 200 });
        }
    });

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: offsetY.value }]
    }));

    return (
        <>
            <AnimatedPressable onPress={() => isOpen.set(false)} style={{ height: 200, width: '100%' }} />
            <GestureDetector gesture={gesture}>
                <Animated.View onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)} style={[animatedStyles, { flex: 1, borderRadius: 15, width: '100%', backgroundColor: 'white', alignItems: 'center' }]}>
                    {cameraDisplay ?
                        <QrCodeReader />
                        :
                        <QrCodeDisplay />
                    }
                    <View style={{ flexDirection: 'row', marginTop: 40, width: '80%', justifyContent: 'space-around' }}>
                        <Pressable onPress={() => setCameraDisplay(true)} style={{ width: '40%', alignItems: 'center' }}>
                            <Text style={{ color: cameraDisplay ? '#63636398' : 'black' }}>Scan</Text>
                        </Pressable>
                        <View style={{ width: 2, borderRadius: 15, backgroundColor: 'black', height: '100%' }} />
                        <Pressable onPress={() => setCameraDisplay(false)} style={{ width: '40%', alignItems: 'center' }}>
                            <Text style={{ color: !cameraDisplay ? '#63636398' : 'black' }}>Qr code</Text>
                        </Pressable>
                    </View>
                </Animated.View>
            </GestureDetector>
        </>

    );
};

export default QrContainer;

const styles = StyleSheet.create({});