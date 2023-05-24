import { StatusBar } from 'expo-status-bar';
import React , {Suspense}from 'react';
import { UsersProvider } from './src/contexts/UsersContext';
import store from './src/redux/store'
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import Loading from './src/components/Loading';
const RootNavigator = React.lazy(() => import('./src/navigator/RootNavigator'));


export default function App() {

  return (
      <Provider store={store}>
        <StatusBar style="auto" />
        <UsersProvider>
          <NavigationContainer>
          <Suspense fallback={<Loading />}>
            <RootNavigator />
            </Suspense>
          </NavigationContainer>
        </UsersProvider>
      </Provider>
  );
}
