import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Text, View, FlatList, Button,Image, Pressable, ActivityIndicator, Touchable, TouchableOpacity, SafeAreaView, ScrollView, Animated } from 'react-native';
import styles from '../../stylesheet'
import { UsersContext } from "../contexts/UsersContext";
import User from "../components/User";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { changeUser, userId } from "../redux/changeUser";
import { selectUser, setUserObject } from "../redux/userSlice";
import MapView, { Marker } from "react-native-maps";
import { AntDesign } from '@expo/vector-icons';
import { Weather } from "../types/WeatherApiResponse";
import { getWeather } from "../../api/fetchWeatherData";
import { usePostUserInfo } from "../hooks/usePostUserInfo";
import { usePostUserAtom } from "../hooks/usePostUserAtom";
import { FontAwesome5 } from '@expo/vector-icons';
import axios from "axios";
import { usePostWeather } from "../hooks/usePostWeather";

type UserObjectData = {
  id: string
    first_name: string
    last_name: string
    avatar: string
    weatherIcon: string
    temp: number
};

const ShowUsers: React.FC = () =>{
  const user = useSelector(selectUser);  

  const [previousRegion,setPreviousRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
})

  const { usersData, isLoading } = useContext(UsersContext);
  const [weatherData, setWeatherData] = useState<Weather | undefined>();
  const [temp,setTemp] = useState(0);
  const changeUserState = useSelector((state:any)=>state.changeUser);
  const { currentUserIndex } = changeUserState;
  const { showResetComponent } = useSelector((state:any)=>state.changeUser);
  const dispatch = useDispatch();
  const [userDataObject,setUserDataObject] = useState<any>();


  useEffect(()=>{
    setUserDataObject({
      id: usersData?.[currentUserIndex].id,
      first_name: usersData?.[currentUserIndex].first_name,
      last_name: usersData?.[currentUserIndex].last_name,
      avatar: usersData?.[currentUserIndex].avatar,
      weatherIcon: `https://openweathermap.org/img/wn/${weatherData?.current.weather[0].icon}@2x.png`,
      temp: weatherData?.current.temp
      })
  },[usersData?.[currentUserIndex]])
  
  const weatherType = weatherData?.current.weather[0].main

  

    const LoadingComponent = ()=> {
      return(
        <Text>Loading</Text>
      )
    }

    const ResetComponent = ()=> {
      return(
        <View style={[styles.loading__container]}>
          <ActivityIndicator size="large" />
          <LoadingComponent />
        </View>
      )
    }

    const navigation = useNavigation<any>();
    useLayoutEffect(()=>{
      navigation.setOptions({
        headerShown: false,
      })
    },[])

    
    // Initial state of the user[0] 
    useEffect(() => {
      //usersData && dispatch(userId(usersData[0].uid));
    }, [usersData]);
    


    const handleUserChange = (actionType: string) => {
      if (usersData && !isLoading) {
        const currentUserId = usersData[currentUserIndex].uid;
        dispatch(userId(currentUserId));
        dispatch(changeUser(actionType));
        console.log("Current state:", changeUserState);
        dispatch(setUserObject(usersData[currentUserIndex]))
        setPreviousRegion({latitude: usersData[currentUserIndex].address.coordinates.lat,
          longitude: usersData[currentUserIndex].address.coordinates.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,})

        fadeAnim.setValue(0);
      }
    }

    const [region, setRegion] = useState({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
  })
  
    usersData && useEffect(()=>{
      setRegion({latitude: usersData[currentUserIndex].address.coordinates.lat,
        longitude: usersData[currentUserIndex].address.coordinates.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,})
    },[usersData,currentUserIndex])

    console.log(region, ";feh;kvbanjk");
    

    

    // Start changes

    useEffect(() => {
      const fetchWeather = async () => {
        try {
          const random= (max:number, min:number) => Math.random() * (max - min) + min;
          const lat = usersData?.[currentUserIndex]?.address?.coordinates?.lat + random(1, 5);;
          const lng = usersData?.[currentUserIndex]?.address?.coordinates?.lng + random(1, 5);
          const data = await getWeather(lat, lng);
                    
          const weatherDataStructure:Weather = {
            id: usersData?.[currentUserIndex].id,
            lat: lat,
            lon: lng,
            timezone: data.timezone,
            timezone_offset: data.timezone_offset,
            current: {
              dt: data.current.dt,
              temp: data.current.temp,
              feels_like: data.current.feels_like,
              humidity: data.current.humidity,
              uvi: data.current.uvi,
              wind_speed: data.current.wind_speed,
              pressure: data.current.pressure,
              weather: [
                  {
                      main: data.current.weather[0].main,
                      description: data.current.weather[0].description,
                      icon: data.current.weather[0].icon,
                }
            ]
          }}
          setWeatherData(weatherDataStructure);
        } catch (error) {
          console.log(error);
        }
      };
      fetchWeather();
    }, [usersData?.[currentUserIndex]]);
    
       // atomic
       usePostUserAtom(userDataObject, weatherType)
       usePostWeather(weatherData)
      

    //usePostUserInfo(usersData?.[currentUserIndex], weatherData?.current.weather[0].main);
    //usePostUserAtom(usersData?.[currentUserIndex], weatherData?.current.weather[0].main);
    // TODO Change to callback method on handling user post
    // TODO object.entries READ
    // TODO Look up reduce
    const handle = () => {
      if(user) {
        
      }
    }
    
    
    

    


    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 10,
        duration: 10000,
        useNativeDriver: true,
      }).start();
    }, [currentUserIndex]);
    // End

    // anmation
    const markerPosition = useRef(new Animated.ValueXY({ x: previousRegion.latitude, y: previousRegion.longitude })).current;

    useEffect(() => {
      Animated.timing(markerPosition, {
        toValue: { x: region.latitude, y: region.longitude },
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, [region]);
    

    console.log(region.latitude);
    console.log(previousRegion.latitude);    
    

    return (
    isLoading && weatherData ? <LoadingComponent /> :
    <SafeAreaView style={[styles.App, {gap:5}]}>
      <View style={styles.App}>
    <LinearGradient colors={['#C33764','#1D2671']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {usersData && <User item={usersData[currentUserIndex]}/>}
      </ScrollView>
      <View style={styles.buttonPrevContainer}>
        <Pressable style={styles.button} onPress={()=>handleUserChange('prev')}>
      <AntDesign name="caretleft" size={24} color="white" />
    </Pressable>
    </View>
    <View style={styles.buttonNextContainer}>
    <Pressable style={styles.button} onPress={()=>handleUserChange('next')}>
    <AntDesign name="caretright" size={24} color="white" />
    </Pressable>
    </View>
    
    </LinearGradient>
    {showResetComponent && <ResetComponent />}
      </View>
      <MapView
          region={region}
          style={[styles.map]}
          // onRegionChange={}
          mapType='mutedStandard'>
          <Marker.Animated
           coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          >
            <Animated.View
            style={{
              transform: [
                { translateX: markerPosition.x },
                { translateY: markerPosition.y },
              ],
              
            }}>
              <FontAwesome5 name="map-marker-alt" size={24} color="red" /></Animated.View>
          </Marker.Animated>
          <View style={styles.weatherContainer}>
          <Image
        style={styles.weatherIcon}
        source={{
          uri: `https://openweathermap.org/img/wn/${weatherData?.current.weather[0].icon}@2x.png`,
        }}
      />
      {weatherData && <Text style={styles.tempText}>{`${(weatherData?.current.temp - 273.15).toFixed(0)}°C`}</Text>}
          </View>
          </MapView>
          <View style={styles.container__Buttons}>
    <Pressable style={styles.button} onPress={()=>handleUserChange('prev')}>
      <AntDesign name="caretleft" size={24} color="white" />
    </Pressable>
    <Pressable style={styles.button} onPress={()=>handleUserChange('next')}>
    <AntDesign name="caretright" size={24} color="white" />
    </Pressable>
    </View>
    </SafeAreaView>
      
  );
};

export default ShowUsers;