import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const ButtonGenerate = ({ onPress }:any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#C33764','#1D2671']}
        style={{
          borderRadius: 25,
          padding: 10,
          marginBottom:6,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 16,
            color: 'white',
          }}>
          Generate Users
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default ButtonGenerate