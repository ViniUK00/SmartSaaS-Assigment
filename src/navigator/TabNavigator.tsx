import React, { useLayoutEffect } from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import ShowUsers from '../screens/ShowUsers'
import About from '../screens/About'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'

export type TabStackParamList = {
  About: undefined;
  Users: undefined;
}

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  const navigation = useNavigation();

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerShown: false,
    });
  },[])

  return (
    <Tab.Navigator
      screenOptions={({route})=>({
        tabBarActiveTintColor: '#1D2671',
        tabBarInactiveTintBackgroundColor:'gray',
        tabBarIcon: ({focused,color,size}) => {
          if (route.name === 'Users') {
            return  (<FontAwesome name="user" size={24} color={focused ? '#1D2671' : 'gray'} />)
          } else if (route.name === 'About') {
            return (<FontAwesome name="home" size={24} color={focused ? '#1D2671' : 'gray'} />)
      }
    } })}
    >
      <Tab.Screen name="About" component={About} />
      <Tab.Screen name="Users" component={ShowUsers} />
    </Tab.Navigator>
  )
}

export default TabNavigator;
