import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg'

const QrCodeDisplay = () => {
    return (
        <View style={{ marginTop: 40 }}>
            <QRCode value='TEST' size={200} />
        </View>
    )
}

export default QrCodeDisplay

const styles = StyleSheet.create({})