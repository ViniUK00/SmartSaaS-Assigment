import { View, Text, SafeAreaView, Pressable, ImageBackground } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { getWeather } from '../../api/fetchWeatherData';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedPlace, setSelectedPlace } from '../redux/locationSlice';
import { Weather } from '../types/WeatherApiResponse'
import * as Location from 'expo-location';
import WeatherCard from '../components/WeatherCard';
import styles  from '../../stylesheet'
import { MaterialIcons } from '@expo/vector-icons';
import Loading from '../components/Loading';
import ExtraInfoCard from '../components/ExtraInfoCard';
import Geocoder from 'react-native-geocoding';
import Forecast from '../components/Forecast';
import { current } from '@reduxjs/toolkit';

const HomeScreen = () => {
  Geocoder.init(GOOGLE_MAPS_APIKEY)

  const [inputText, setInputText] = useState('');
  const dispatch = useDispatch();
  const selectedPlace = useSelector(selectSelectedPlace);
  
  const [city,setCity] = useState<String>();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const lat = selectedPlace?.location.lat;
  const lng = selectedPlace?.location.lng;
  const [weatherData, setWeatherData] = useState<Weather | undefined>();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather(lat, lng);
        setWeatherData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeather();
  }, [lat, lng]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  //console.log(location?.coords.longitude);
  

  const useCurrentLocationHandler = async () => {
    if (location?.coords) {
      try {
        const data = await getWeather(location?.coords.latitude, location?.coords.longitude);
        setWeatherData(data);
        dispatch(
          setSelectedPlace({
            location: location?.coords
          })
        );
        const lat = location.coords.latitude
        const lng = location.coords.longitude
      Geocoder.from(lat,lng)
		.then(json => {
      const addressComponent = json.results[1];
      setCity(addressComponent.address_components[3].long_name)
      
      dispatch(
        setSelectedPlace({
          location: location?.coords
        })
      );
		})
		.catch(error => <Text>Not a city</Text>);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(weatherData?.lat);

  const mainWeather = weatherData?.current.weather[0].main;
  console.log(mainWeather);
  
  Geocoder.from(lat,lng)
		.then(json => {
        		const addressComponent = json.results[1];
            setCity(addressComponent.address_components[3].long_name)      
		})
		.catch(error => <Text>Not a city</Text>);
    

  return (
    <SafeAreaView style={styles.screen}>
      {/* <ImageBackground source={require('.')}/> */}
      <View style={styles.searchAndIconContainer}>
      <GooglePlacesAutocomplete
        placeholder={'Search for a city'}
        styles={{
          container:{
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft:40,
          paddingRight:40,
          padding:5,
        },
        listView: {
          borderRadius:20,
        },
        textInput: {
        fontSize: 18,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#d1d1d1',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft:40,
        shadowOpacity:0.2
      },}}
        onPress={(data, details = null) => {
          console.log('hey 2', details?.geometry.location);
          
          dispatch(
            setSelectedPlace({
              location: details?.geometry.location
            })
          );
        }}
        fetchDetails={true}
        enablePoweredByContainer={false}
        minLength={2}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
          type: '(cities)'
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={100}
      />
      <Pressable onPress={useCurrentLocationHandler} style={styles.icon_usemylocation}>
      <MaterialIcons name="my-location" size={30} color='gray' />
      </Pressable>
      </View>
      <View style={styles.cityContainer}><Text style={styles.cityText}>{city}</Text></View>
      {weatherData?
        <View style={styles.card}>
        <WeatherCard icon={weatherData?.current.weather[0].icon} temp={weatherData?.current.temp} feels_like={weatherData?.current.feels_like} main={weatherData?.current.weather[0].main} city={''}  />
        <View style={{padding:10}}></View>
       <ExtraInfoCard
      city={selectedPlace?.location} 
      temperature={weatherData?.current.temp} 
      condition={weatherData?.current.humidity} 
      data={[
    { label: 'Wind', value: weatherData?.current.wind_speed, metric: 'mph' },
    { label: 'Humidity', value: weatherData?.current.humidity, metric: '%' },
    { label: 'Pressure', value: weatherData?.current.pressure, metric: 'hPa'},
  ]}  />
  {selectedPlace?.location && <Forecast />}
      </View> : <Loading />}
  </SafeAreaView>
  );
};

export default HomeScreen;
