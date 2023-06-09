import { View,Text,Image,SafeAreaView, ImageBackground } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import LottieView from 'lottie-react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import { UsersContext } from '../contexts/UsersContext';
import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { selectSelectedCurrentUser } from '../redux/currentUserSlice';

const About = () => {
  const [loading,setLoading] = useState(true);
  const user = useSelector(selectSelectedCurrentUser);
  const [lat, setLat] = useState();
  const [ lon, setLon] = useState();
  
  const navigation = useNavigation<any>();
    useLayoutEffect(()=>{
      navigation.setOptions({
        headerShown: false,
      })
    },[])
    
    useEffect(()=>{
      {
        if(user){
          setLoading(false)
        }
      }
    },[user])
  
  let region: Region = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  
if (region) {
  region = {
    latitude: user?.address.coordinates.lat,
    longitude: user?.address.coordinates.lon,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
}
}
    
  

  return (
    loading?
    <ImageBackground
      source={require('../../assets/about-background.webp')}
      style={styles.backgroundImage}
    >
    <SafeAreaView style={styles.loadingContainer}>
      <Text style={styles.text}>Select a user from the users tab
       to show more details about the user</Text>
       <LottieView
        style={styles.lottieContainer}
        source={require('../../assets/blue-bird-waiting.json')}
        autoPlay
        loop
      />
      </SafeAreaView></ImageBackground> :
      <LinearGradient colors={['#C33764','#1D2671']} style={styles.backgroundImage}>
      <View style={styles.detailContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={{uri: user.avatar}}
            style={styles.avatar}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.fName}>{user.first_name} {user.last_name}</Text>
        </View>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>{user.address.city}, {user.address.country}</Text>
        </View>
      </View>
      <View style={styles.extraInfoContainer}>
        <View style={styles.extraInfoContainerHeader}>
        <Text style={styles.headerText}>Contact Details</Text>
        </View>
        <View style={styles.line} />
      <View style={styles.emailContainer}>
        <FontAwesome name="envelope" size={20} color="#3A3B3C" />
          <Text style={styles.emailText}>{user.email}</Text>
        </View>
        <View style={styles.emailContainer}>
        <FontAwesome5 name="phone-alt" size={20} color="#3A3B3C" />
          <Text style={styles.emailText}>{user.phone_number}</Text>
        </View>
      </View>
      <View style={styles.mapContainer}>
      <MapView
          region={region}
          style={[styles.map]}
          mapType='mutedStandard'>
          <Marker
           coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          >
            <View>
              <FontAwesome5 name="map-marker-alt" size={24} color="red" /></View>
          </Marker>
          
          </MapView>
      </View>
      
    </LinearGradient>

  )
}

export default About

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 70,
    height: 50,
    borderRadius: 50,
    alignItems:'center',
    justifyContent:'center'
  },
  detailContainer:{
    backgroundColor:'white',
    padding:30,
    margin:10,
    marginTop:130,
    borderRadius:15,
    shadowOpacity:0.1
  },
  nameContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  avatarContainer:{
    justifyContent:'flex-start',
    alignItems:'center'
  },
  fName: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  extraInfoContainer:{
    backgroundColor:'white',
    padding:25,
    margin:10,
    borderRadius:15,
    shadowOpacity:0.2,
    gap:20
  },
  emailContainer:{
    flexDirection:'row',
    gap:15
  },
  extraInfoContainerHeader:{
    justifyContent:'center',
    alignItems:'center'
  },
  locationContainer:{
    justifyContent:'flex-start',
    alignItems:'center',
  },
  locationText:{
    fontSize:12,
  },
  emailText:{
    fontSize:15,
    fontWeight:'600'
  },
  mapContainer:{
    flex:1,
    marginHorizontal:12,
    borderRadius:10,
    marginBottom:120,
    shadowOpacity:0.2,
    
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  headerText:{
    fontSize:18,
    fontWeight:'bold'
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius:10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  lottieContainer: {
    marginTop: 30,
    width: '80%',
    height: 200,
  },
});