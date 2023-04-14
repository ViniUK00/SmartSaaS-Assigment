import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Text, View, FlatList, Button, Pressable, ActivityIndicator, Touchable, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from '../../stylesheet'
import { UsersContext } from "../contexts/UsersContext";
import User from "../components/User";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { changeUser, userId } from "../redux/changeUser";
import { setUserObject } from "../redux/userSlice";


const ShowUsers: React.FC = () =>{

  const { usersData, isLoading } = useContext(UsersContext);
  // const [currentUserIndex, setCurrentUserIndex] = useState(0);
  // const [showResetComponent, setShowResetComponent] = useState(false);
  // const [isDisabled, setIsDisabled] = useState(false)
  const changeUserState = useSelector((state:any)=>state.changeUser);
  const { currentUserIndex } = changeUserState;
  const { showResetComponent } = useSelector((state:any)=>state.changeUser);
  const dispatch = useDispatch();

console.log(currentUserIndex)

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

    
    // // Initial state of the user[0] 
    useEffect(() => {
      // usersData && dispatch(userId(usersData[0].uid));
    }, [usersData]);


    const handleUserChange = (actionType: string) => {
      if (usersData && !isLoading) {
        const currentUserId = usersData[currentUserIndex].uid;
        dispatch(userId(currentUserId));
        dispatch(changeUser(actionType));
        console.log("Current state:", changeUserState); // Logging the state
        dispatch(setUserObject(usersData[currentUserIndex]))      
      }
    }
    

    return (
    isLoading ? <LoadingComponent /> :
    <SafeAreaView style={styles.App}>
      <View style={styles.App}>
    <LinearGradient colors={['#C33764','#1D2671']} style={styles.container}>
      {usersData && <User item={usersData[currentUserIndex]}/>}
    </LinearGradient>
    {showResetComponent && <ResetComponent />}
    <View style={styles.container__Buttons}>
    <Pressable style={styles.button} onPress={()=>handleUserChange('prev')}>
      <Text style={[styles.button__text]} numberOfLines={1}>Previous User</Text>
    </Pressable>
    <Pressable style={styles.button} onPress={()=>handleUserChange('next')}>
      <Text style={styles.button__text}>Next User</Text>
    </Pressable>
    </View>
      </View>
    </SafeAreaView>
      
  );
};

export default ShowUsers;