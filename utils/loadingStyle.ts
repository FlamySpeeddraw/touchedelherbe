import { useEffect } from "react";
import { interpolateColor, ReduceMotion, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

export const useLoadingStyle = () => {
    const progressSV = useSharedValue<number>(0);

    useEffect(() => {
        progressSV.value = withRepeat(
            withTiming(1, { duration: 700 }),
            -1,
            true
        );
    }, []);

    const loadingStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(progressSV.value, [0, 1], ['#DDD', '#888'])
    }));

    return loadingStyle;
}