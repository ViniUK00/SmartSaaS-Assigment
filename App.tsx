import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import ShowUsers from './src/screens/ShowUsers';
import styles from './src/styles/ShowUsersStyles';
// import UseEffectData from './UseEffectData';
// import UseQueryData from './UseQueryData';


const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaView style={styles.App}>
      <View>
        <StatusBar style="auto" />
        <ShowUsers />
      </View>
    </SafeAreaView>
                 
  );
}
