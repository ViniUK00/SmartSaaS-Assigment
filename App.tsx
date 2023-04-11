import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { UsersProvider } from './src/contexts/UsersContext';
import store from './src/redux/store'
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigator/RootNavigator';


export default function App() {

  return (
      <Provider store={store}>
        <StatusBar style="auto" />
        <UsersProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </UsersProvider>
      </Provider>
  );
}
