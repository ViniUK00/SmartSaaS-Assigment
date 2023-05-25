import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';


const Loading = () => {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        style={{
          height: 450,
        }}
        source={require('../../assets/142181-city.json')}
      />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    animationContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      marginTop:300,
      marginRight:30
    },
   
  });