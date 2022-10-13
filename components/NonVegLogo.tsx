import { View, Text, Image } from 'react-native'
import React from 'react'
import { Icon } from '@ui-kitten/components'
import dropdown from '../assets/icons/ic_d.png'
export default function NonVegLogo({ size }: number) {
    return (
        <View style={{ alignItems: "center", justifyContent: "center", width: size, aspectRatio: 1 / 1, borderRadius: size / 10, borderColor: "red", borderWidth: 2 }}>
            <Image source={dropdown} style={{ tintColor: "red", width: size - 2, height: size - 2, transform: [{ rotate: "180deg" }] }} />
        </View>
    )
}