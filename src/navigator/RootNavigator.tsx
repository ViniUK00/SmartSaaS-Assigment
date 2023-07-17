import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator';
import SplashScreen from '../screens/SplashScreen';
import { Platform } from 'react-native';
import ChartScreen from '../screens/ChartScreen';
import ChartUserScreen from '../screens/ChartUserScreen';
import UserProfile from '../screens/UserProfile';
import PredictionsInitialScreen from '../screens/PredictionsInitialScreen';


export type RootStackParamList = {
    Main: undefined;
    Splash:undefined;
    ChartScreen:undefined;
    ChartUserScreen:undefined;
    Search:undefined;
    UserProfile:undefined;
    PredictionsInitialScreen:undefined;
}

const RootStack = createNativeStackNavigator<RootStackParamList>();


const RootNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName="Splash">
      <RootStack.Group>
        <RootStack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        /> 
        <RootStack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name='ChartScreen'
          component={ChartScreen}
          options={{
            headerShown: true,
          }}
        />
        <RootStack.Screen 
          name='ChartUserScreen'
          component={ChartUserScreen}
          options={{
            headerShown: true,
          }}
        />
        <RootStack.Screen
        name='UserProfile'
        component={UserProfile}
        options={{
          headerShown: true,
        }}
        
      />
      <RootStack.Screen
        name='PredictionsInitialScreen'
        component={PredictionsInitialScreen}
        options={{
          headerShown: false,
        }}
        
      />

      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
