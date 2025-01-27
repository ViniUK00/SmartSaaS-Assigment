import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useLayoutEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import Button from '../components/ButtonSmartSaaS';
import { AntDesign } from '@expo/vector-icons';

type RootStackParamList = {
    About: undefined;
    UserProfile: undefined;
    Main:undefined;
    PredictionsInitialScreen:undefined;
  };

const About = () => {
    const navigation = useNavigation<any>();
    useLayoutEffect(()=>{
      navigation.setOptions({
        headerShown: false,
      })
    },[])

    const navigationStack = useNavigation<NativeStackNavigationProp<RootStackParamList, 'About'>>();

  const handleClickOnItem = () => {
    navigationStack.navigate('UserProfile');
    
  }

  const handleClickOnPrediction = () => {
    navigationStack.navigate('PredictionsInitialScreen');
    
  }

  const handlePress = () => {
    console.log("test");
  };

  const [clicked,setClicked] = useState(false);

    
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleClickOnItem}>
        <LinearGradient
          colors={['#C33764', '#1D2671']}
          style={styles.gradient}
        >
          <Text style={styles.buttonText}>User Profile</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleClickOnPrediction}>
        <LinearGradient
          colors={['#C33764', '#1D2671']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Text style={styles.buttonText}>Predictions</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

export default About;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: 200,
      height: 200,
      marginBottom: 20,
    },
    gradient: {
      flex: 1,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 24,
    },
    
  });
  