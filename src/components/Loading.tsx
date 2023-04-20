import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';


const Loading = () => {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        style={{
          width: 300,
          height: 300,
        }}
        source={require('../../assets/map-marker-spins.json')}
      />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    animationContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0,
    },
   
  });