// WeatherCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export interface WeatherCard {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    temp: number;
    feels_like: number;
    humidity: any;
    uvi: number;
    weather: WeatherCardProps;
  };
}
interface WeatherCardProps {
  city: string;
  temp: number;
  feels_like: number;
  main: string;
  icon: string;
}

type RootStackParamList = {
  HomeScreen: undefined;
  ChartScreen: undefined;
};



const WeatherCard: React.FC<WeatherCardProps> = ({ icon, temp, feels_like, main }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>>();
  
  return (
    <TouchableOpacity
      onPress={()=>{ navigation.navigate('ChartScreen')}}
      style={styles.container}>
      <LinearGradient
        colors={[
          'rgba(45, 170, 255, 0.7)',
          'rgba(57, 141, 203, 0.9)',
          'rgba(45, 170, 255, 0.7)',
            ]} style={styles.backround}>
        <View>
          
        </View>
        <View style={styles.weatherIcon}>
          <Image
        style={styles.weatherIcon}
        source={{
          uri: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        }}
      />
            <Text style={styles.Condition_Text}>{main}</Text>
        </View>
      <View style={styles.temperature}>
        <Text style={styles.temperature_text}>{`${(temp - 273.15).toFixed(0)}°`}</Text>
      </View>
      <View style={styles.feels_like_container}>
      <Text style={styles.feels_like_text}>{`Feels like ${(feels_like - 273.15).toFixed(0)}°`}</Text>
      </View>
      
    </LinearGradient>
    </TouchableOpacity>
      
  );
};

const styles = StyleSheet.create({
  container:{
    width:'91%',
    height:'25%',
    alignItems: 'center',
  },
  backround:{
    justifyContent:'flex-start',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height:'100%',
    borderRadius:30,
  },
  temperature: {
    position: 'absolute',
    top:0,
    right:0,
    padding:15
  },
  temperature_text:{
    fontSize:60,
    fontWeight:'bold',
    color:'white',
  },
  feels_like_container: {
    position: 'absolute',
    bottom:0,
    right:0,
    padding:20
  },
  feels_like_text: {
    fontSize:16,
    color:'white'
  },
  weatherIcon: {
    justifyContent:'center',
    alignItems:'center',
    height:120,
    width:130,
    position:'absolute',
    top:0,
    left:0,
  },
  Condition_Text:{
    flex: 1,
    alignSelf: 'center',
    position:'absolute',
    marginTop:20,
    bottom:0,
    fontSize:16,
    color:'white',
    fontWeight:'bold'
}
});

export default WeatherCard;