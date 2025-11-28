import { ReactElement } from 'react';
import { DimensionValue, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Animated, { Easing, ReduceMotion, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface props {
    onPress?: () => void;
    children: ReactElement;
    style?: ViewStyle;
    color: string;
    darkColor: string;
    circle?: boolean;
    keepPressed?: boolean;
    width?: DimensionValue;
    height?: DimensionValue;
    disabled?: boolean
}

const Button3D = ({ onPress, children, style, color, darkColor, circle, keepPressed, width, height, disabled = false }: props) => {
    const pressed = useSharedValue<boolean>(false);

    const top = useSharedValue<number>(0);
    const left = useSharedValue<number>(0);

    const animatedStyle = useAnimatedStyle(() => ({
        top: top.value,
        left: left.value
    }));

    const handlePress = () => {
        top.value = withTiming(pressed.value ? 0 : 3, { duration: 100, easing: Easing.out(Easing.quad), reduceMotion: ReduceMotion.System });
        left.value = withTiming(pressed.value ? 0 : 3, { duration: 100, easing: Easing.out(Easing.quad), reduceMotion: ReduceMotion.System }, (isFinished) => {
            if (isFinished && !keepPressed) {
                top.value = withTiming(0, { duration: 100, easing: Easing.out(Easing.quad), reduceMotion: ReduceMotion.System });
                left.value = withTiming(0, { duration: 100, easing: Easing.out(Easing.quad), reduceMotion: ReduceMotion.System });
            }
        });

        if (keepPressed) {
            pressed.value = !pressed.value
        }
        if (onPress) runOnJS(onPress)();
    }

    return (
        <Pressable disabled={disabled} onPress={() => handlePress()} style={[{ justifyContent: 'center', alignItems: 'center', width: width ?? "auto", height: height ?? "auto" }, style]}>
            <Animated.View style={[{ position: 'absolute', width: width ? "100%" : "auto", height: height ? "100%" : "auto", zIndex: 1, backgroundColor: color, borderWidth: 2, borderColor: darkColor, borderRadius: circle ? '100%' : 15, paddingHorizontal: circle ? 4 : 10, paddingVertical: circle ? 4 : 8 }, animatedStyle]}>
                {children}
            </Animated.View>
            <View style={{ backgroundColor: darkColor, width: width ? "100%" : "auto", height: height ? "100%" : "auto", top: 3, transform: [{ translateX: 3 }], borderRadius: circle ? '100%' : 15, paddingHorizontal: circle ? 6 : 12, paddingVertical: circle ? 6 : 10 }}>
                <View style={{ opacity: 0 }}>
                    {children}
                </View>
            </View>
        </Pressable>
    );
};

export default Button3D;

const styles = StyleSheet.create({});