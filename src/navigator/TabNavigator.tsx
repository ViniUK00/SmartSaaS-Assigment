import React, { useLayoutEffect } from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import ShowUsers from '../screens/ShowUsers'
import About from '../screens/About'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import HomeScreen from '../screens/HomeScreen'
import SearchUserScreen from '../screens/SearchUserScreen'
import Reports from '../screens/Reports'

export type TabStackParamList = {
  About: undefined;
  Users: undefined;
  Home: undefined;
  Search: undefined;
  Reports: undefined;
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
            return  (<FontAwesome name="users" size={24} color={focused ? '#1D2671' : 'gray'} />)
          } else if (route.name === 'About') {
            return (<FontAwesome name="info-circle" size={24} color={focused ? '#1D2671' : 'gray'} />) 
          } else if (route.name ==='Home') {
             return  (<FontAwesome name="home" size={24} color={focused ? '#1D2671' : 'gray'} />) 
            } else if (route.name ==='Search') {
              return  (<FontAwesome name="search" size={24} color={focused ? '#1D2671' : 'gray'} />) 
             } else if (route.name ==='Reports') {
              return  (<FontAwesome name="pie-chart" size={24} color={focused ? '#1D2671' : 'gray'} />) 
             } 
    } })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Users" component={ShowUsers} />
      <Tab.Screen name="About" component={About} />
      <Tab.Screen name='Search' component={SearchUserScreen} />
      <Tab.Screen name='Reports' component={Reports} />
    </Tab.Navigator>
  )
}

export default TabNavigator;
