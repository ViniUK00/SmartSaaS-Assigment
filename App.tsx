import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView,View,Text } from 'react-native';
import ShowUsers from './src/screens/ShowUsers';
import styles from './stylesheet';
import { UsersProvider } from './src/contexts/UsersContext';
import store from './src/redux/store'
import { Provider } from 'react-redux';

export default function App() {
  return (
    <SafeAreaView style={styles.App}>
      <Provider store={store}>
      <View>
        <StatusBar style="auto" />
        <UsersProvider>
        <ShowUsers />
        </UsersProvider>
      </View>
      </Provider>
    </SafeAreaView>
  );
}
