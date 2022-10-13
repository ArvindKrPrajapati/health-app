import { View, Text } from 'react-native'
import React from 'react'

export default function VegLogo({ size }: number) {
    return (
        <View style={{ alignItems: "center", justifyContent: "center", width: size, aspectRatio: 1 / 1, borderRadius: size / 10, borderColor: "green", borderWidth: 2 }}>
            <View style={{ width: size / 2 - 2, aspectRatio: 1 / 1, backgroundColor: "green", borderRadius: 50 }}></View>
        </View>
    )
}