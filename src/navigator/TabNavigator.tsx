import React, { useLayoutEffect } from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import ShowUsers from '../screens/ShowUsers'
import About from '../screens/About'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import HomeScreen from '../screens/HomeScreen'
import SearchUserScreen from '../screens/SearchUserScreen'
import Reports from '../screens/Reports'
import styles  from '../../stylesheet'
import { Touchable, TouchableOpacity, View } from 'react-native'

export type TabStackParamList = {
  About: undefined;
  Users: undefined;
  Home: undefined;
  Search: undefined;
  Reports: undefined;
}

const Tab = createBottomTabNavigator()

const CustomTabBarButton = ({children,onPress}:any) => (
  <TouchableOpacity
  style={{
    top: -30,
    justifyContent:'center',
    alignItems:'center',
    shadowColor:'#7F5DF0',
    shadowOffset:{
      width:0,
      height:10,
    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
  }}
  onPress={onPress}
  >
    <View style={{width:70, height:70, borderRadius:35, paddingTop:12,
    backgroundColor:'#1D2671'}}>
      {children}
    </View>
    
  </TouchableOpacity>
)

const TabNavigator = () => {
  const navigation = useNavigation();

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerShown: false,
    });
  },[])

  return (

    <Tab.Navigator
    initialRouteName='Home'
      screenOptions={({route})=>({
        tabBarActiveTintColor: '#1D2671',
        tabBarActiveBackgroundColor:'rgba(239, 239, 240,1)',
        tabBarStyle: styles.tabBar,
        tabBarShowLabel:false,
        tabBarLabel:'',
        tabBarIcon: ({focused,color,size}) => {
          if (route.name === 'Users') {
            return  (<FontAwesome name="users" size={28} color={focused ? '#1D2671' : 'gray'}/>)
          } else if (route.name === 'About') {
            return (<FontAwesome name="info-circle" size={28} color={focused ? '#1D2671' : 'gray'} />) 
          } else if (route.name ==='Home') {
             return  (<FontAwesome name="home" size={32} color={'white'} style={{marginBottom:10,}}/>) 
            } else if (route.name ==='Search') {
              return  (<FontAwesome name="search" size={28} color={focused ? '#1D2671' : 'gray'} />) 
             } else if (route.name ==='Reports') {
              return  (<FontAwesome name="pie-chart" size={28} color={focused ? '#1D2671' : 'gray'} />) 
             } }})}
    >
      
      <Tab.Screen name="Users" component={ShowUsers} />
      <Tab.Screen name="About" component={About} />
      <Tab.Screen name="Home" component={HomeScreen}
      options={{tabBarButton: CustomTabBarButton}} />
      <Tab.Screen name='Search' component={SearchUserScreen} />
      <Tab.Screen name='Reports' component={Reports} />
    </Tab.Navigator>
  )
}

export default TabNavigator;
