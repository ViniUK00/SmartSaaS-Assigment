import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView,View } from 'react-native';
import ShowUsers from './src/screens/ShowUsers';
import styles from './src/styles/ShowUsersStyles';
import { UsersProvider } from './src/contexts/UsersContext';


export default function App() {
  return (
    <SafeAreaView style={styles.App}>
      <View>
        <StatusBar style="auto" />
        <UsersProvider>
          <ShowUsers />
        </UsersProvider>
      </View>
    </SafeAreaView>
                 
  );
}
