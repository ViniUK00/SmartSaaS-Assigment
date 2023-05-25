import { View, Text, Modal, Alert, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import LottieView from 'lottie-react-native';


const WelcomeModal = () => {
    const [modalVisible, setModalVisible] = useState(true);
    
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
                <LottieView
                    autoPlay
                    style={{
                    height: 120,
                    alignSelf:'center'
                    }}
        source={require('../../assets/75705-welcome-animation.json')}
      />
      <Text style={styles.modalText}>
            Welcome to my educational project! As an intern at SmartSaaS, I've developed this React Native app from scratch, 
            utilizing a MongoDB backend and incorporating WeatherAPI and GoogleAPI for enhanced functionality. With Redux handling 
            state management on the frontend. 
            Enjoy exploring the app and its features!
      </Text>
      <Pressable
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Let's go!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight:'600'
      },
    textStyle: {
        color: 'white',
        fontWeight:'bold',
        textAlign: 'center',
      },
      button: {
        backgroundColor: '#0D969B',
        padding:8,
        borderRadius:15,
        marginHorizontal:70,
        margin:5
      },

  });

export default WelcomeModal