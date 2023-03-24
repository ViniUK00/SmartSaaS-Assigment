import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import UseEffectData from './UseEffectData';
import UseQueryData from './UseQueryData';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
      <Text>///useEffect() version</Text>
      <UseEffectData />
      <Text>///useQuery() version</Text>
      <UseQueryData />
      <StatusBar style="auto" />
    </View>     
    </QueryClientProvider>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
