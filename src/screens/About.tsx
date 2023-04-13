import { View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const About = () => {


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* TODO Fix web view (works fine on iOS but not in web) */}
      <LottieView
        source={require('../../assets/coming-soon.json')}
        autoPlay
        loop
      />   
    </View>
  )
}

export default About