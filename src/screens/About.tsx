import { View,Text,Image,SafeAreaView } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import LottieView from 'lottie-react-native';
import { useSelector } from 'react-redux';
import { selectAvatar, selectCoordinates, selectFirstName, selectLastName } from '../redux/userSlice';
import User from '../components/User';
import { UsersContext } from '../contexts/UsersContext';
import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native';

const About = () => {
  const navigation = useNavigation<any>();
    useLayoutEffect(()=>{
      navigation.setOptions({
        headerShown: false,
      })
    },[])
    
  let loading = true
  let region: Region = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  
  const fName = useSelector(selectFirstName)
  const lName = useSelector(selectLastName)
  const avatar = useSelector(selectAvatar)
  const coordinates = useSelector(selectCoordinates)

  if (coordinates) {
    loading = false
    region = {
      latitude: coordinates.coordinates.lat,
      longitude: coordinates.coordinates.lon,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
  }
}

  

  return (
    loading?<SafeAreaView style={styles.loadingContainer}>
      <Text style={styles.text}>Select a user from the users tab
       to show more details about the user</Text>
       <LottieView
        style={styles.lottieContainer}
        source={require('../../assets/blue-bird-waiting.json')}
        autoPlay
        loop
      />
      </SafeAreaView> :
     <SafeAreaView style={{flex:1, alignContent:'center', alignItems:'center'}}>
      {/* <LottieView
        source={require('../../assets/coming-soon.json')}
        autoPlay
        loop
      /> */}
          <Image
            source={{uri: avatar }}
            style={styles.avatar}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.fName}>{fName}</Text>
            <Text style={styles.lName}>{lName}</Text>
          </View>
          {!loading && <MapView
          region={region}
          style={styles.map}
          mapType='mutedStandard'>
          <Marker
           coordinate={{
            latitude:coordinates.coordinates.lat,
            longitude:coordinates.coordinates.lon
          }}
          />
          </MapView>}

          
    </SafeAreaView>

  )
}

export default About

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 40,
  },
  nameContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  fName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  lName: {
    fontSize: 20,
    color: '#555',
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: '50%',
    marginTop: 20,
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