import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import Profile from './components/Profile';
// import UseEffectData from './UseEffectData';
// import UseQueryData from './UseQueryData';


const queryClient = new QueryClient();

export default function App() {
  return (
    // <QueryClientProvider client={queryClient}>
      <View>
      {/*<Text>///useEffect() version</Text> 
      <UseEffectData />
      <Text>///useQuery() version</Text>
      <UseQueryData /> */}
      <Profile />
      <StatusBar style="auto" />
    </View>     
    // </QueryClientProvider>
      
  );
}
