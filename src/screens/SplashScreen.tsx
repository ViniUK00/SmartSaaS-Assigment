import { View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react-native';


const Splash = ({ navigation }: any) => {
  const animationRef = useRef<Lottie>(null)

  useEffect(() => {
    setTimeout(() => navigation.navigate('Main'), 2500) // Show the splash screen for 3 seconds
    animationRef.current?.play()
  }, [navigation]);


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Lottie ref={animationRef}  source={require('../../assets/splash.json')}/>
      {/* TODO Fix web view (works fine on iOS but not in web) */}
      {/* <LottieView  source={require('../../assets/splash.json')}/> */}
    </View>
  );
};

export default Splash;
