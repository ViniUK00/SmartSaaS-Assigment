import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native';

const Splash = ({navigation}:any) => {
    const [isSplashVisible, setIsSplashVisible] = useState(true);

    useEffect(() => {
      setTimeout(() => navigation.navigate('Main'), 3000); // Show the splash screen for 5 seconds
    }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        source={require('../../assets/splash.json')}
        autoPlay
        loop
      />
    </View>
  )
}

export default Splash