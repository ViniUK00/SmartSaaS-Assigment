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


const ShowUsers: React.FC = () =>{
  const user = useSelector(selectUser);

  const { usersData, isLoading } = useContext(UsersContext);
  const [weatherData, setWeatherData] = useState<Weather | undefined>();
  const [temp,setTemp] = useState(0);
  const changeUserState = useSelector((state:any)=>state.changeUser);
  const { currentUserIndex } = changeUserState;
  const { showResetComponent } = useSelector((state:any)=>state.changeUser);
  const dispatch = useDispatch();

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

    
    // // Initial state of the user[0] 
    useEffect(() => {
      // usersData && dispatch(userId(usersData[0].uid));
    }, [usersData]);


    const handleUserChange = (actionType: string) => {
      if (usersData && !isLoading) {
        const currentUserId = usersData[currentUserIndex].uid;
        dispatch(userId(currentUserId));
        dispatch(changeUser(actionType));
        console.log("Current state:", changeUserState);
        dispatch(setUserObject(usersData[currentUserIndex]))
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
    

    // Start changes

    useEffect(() => {
      const fetchWeather = async () => {
        try {
          const data = await getWeather(usersData?.[currentUserIndex]?.address?.coordinates?.lat, usersData?.[currentUserIndex]?.address?.coordinates?.lng);
          setWeatherData(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchWeather();
    },[usersData?.[currentUserIndex]]);

    console.log(usersData?.[currentUserIndex].address.coordinates);
    

    usePostUserInfo(usersData?.[currentUserIndex], weatherData?.current.weather[0].main);
    
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 10,
        duration: 10000,
        useNativeDriver: true,
      }).start();
    }, [currentUserIndex]);
    // End

    

    return (
    isLoading && weatherData ? <LoadingComponent /> :
    <SafeAreaView style={styles.App}>
      <View style={styles.App}>
    <LinearGradient colors={['#C33764','#1D2671']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {usersData && <User item={usersData[currentUserIndex]}/>}
      </ScrollView>
    </LinearGradient>
    {showResetComponent && <ResetComponent />}
      </View>
      <MapView.Animated
          region={region}
          style={[styles.map,{opacity: fadeAnim}]}
          mapType='mutedStandard'>
          <Marker
           coordinate={{
            latitude:region.latitude,
            longitude:region.longitude
          }}
          />
          <View style={styles.weatherContainer}>
          <Image
        style={styles.weatherIcon}
        source={{
          uri: `https://openweathermap.org/img/wn/${weatherData?.current.weather[0].icon}@2x.png`,
        }}
      />
      {weatherData && <Text style={styles.tempText}>{`${(weatherData?.current.temp - 273.15).toFixed(0)}°C`}</Text>}
          </View>
          </MapView.Animated>
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