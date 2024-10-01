import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from '@react-native-firebase/app';
import analytics from '@react-native-firebase/analytics';
import Home from './src/screens/Home';
import Details from './src/screens/Details';
import Booking from './src/screens/Booking';
import Checkout from './src/screens/Checkout';
import Success from './src/screens/Success';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const routeNameRef = React.useRef<string | undefined>();
  const navigationRef = React.useRef<NavigationContainerRef<any> | null>(null);

  return (
    // SafeAreaView akan selalu berada di bagian windows, tidak melibihi status bar atau tombol di bawah
    <SafeAreaView style={styles.container}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          if (navigationRef.current) {
            routeNameRef.current = navigationRef.current.getCurrentRoute()?.name;
          }
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

          if (previousRouteName !== currentRouteName && currentRouteName) {
            await analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            });
          }
          routeNameRef.current = currentRouteName;
        }}
      >
        <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Booking" component={Booking} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Success" component={Success} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
