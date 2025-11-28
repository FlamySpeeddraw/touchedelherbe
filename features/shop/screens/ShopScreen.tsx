import Header from '@shop/components/Header';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ShopScreen = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Header value={searchQuery} setValue={setSearchQuery} />
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