import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CameraView } from 'expo-camera'

const QrCodeReader = () => {
    const handleBarCodeScan = (data: string) => {
        console.log(data)
    }

    return (
        <View style={{ marginTop: 40 }}>
            <CameraView onBarcodeScanned={({data}) => handleBarCodeScan(data)} facing='back' style={{ width: '80%', aspectRatio: 1/1, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ borderWidth: 3, borderColor: 'white', width: '60%', aspectRatio: 1/1, borderRadius: 15 }} />
            </CameraView>
        </View>
    )
}

export default QrCodeReader

const styles = StyleSheet.create({})