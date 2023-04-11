import React, { useContext, useLayoutEffect, useState } from "react";
import { Text, View, FlatList, Button, Pressable, ActivityIndicator, Touchable, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from '../../stylesheet'
import { UsersContext } from "../contexts/UsersContext";
import User from "../components/User";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import changeUser from "../redux/changeUser";
import {changeUserReduc} from "../redux/changeUser";
import { useNavigation } from "@react-navigation/native";


const ShowUsers: React.FC = () =>{

  const { usersData, isLoading } = useContext(UsersContext);
  // const [currentUserIndex, setCurrentUserIndex] = useState(0);
  // const [showResetComponent, setShowResetComponent] = useState(false);
  // const [isDisabled, setIsDisabled] = useState(false)

  const { currentUserIndex } = useSelector((state:any)=>state.changeUser);
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

    // const changeUser = () => {
    //   setCurrentUserIndex((prevIndex) => {
    //     prevIndex += 1
    //     if (prevIndex >= 10){
    //         prevIndex = 0
    //         setShowResetComponent(true);
    //         setIsDisabled(true);
    //         setTimeout(() => {setShowResetComponent(false),setIsDisabled(false)}, 3000); // Hide ResetComponent after 3 seconds
    //     } else {
    //         setShowResetComponent(false);
    //     }
    //     return prevIndex
    //   });
    // }

    const navigation = useNavigation<any>();
    useLayoutEffect(()=>{
      navigation.setOptions({
        headerShown: false,
      })
    },[])

    return (
    isLoading ? <LoadingComponent /> :
    <SafeAreaView style={styles.App}>
      <View style={styles.App}>
    <LinearGradient colors={['#C33764','#1D2671']} style={styles.container}>
      {usersData && <User item={usersData[currentUserIndex]}/>}
    </LinearGradient>
    {showResetComponent && <ResetComponent />} 
    <Pressable style={styles.button} onPress={()=>{dispatch(changeUserReduc())}}>
      <Text style={styles.button__text}>Change User</Text>
    </Pressable>
      </View>
    </SafeAreaView>
      
  );
};

export default ShowUsers;