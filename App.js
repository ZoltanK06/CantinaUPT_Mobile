import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, useRoute } from '@react-navigation/native'
import { DefaultTheme } from '@react-navigation/native';
import {StatusBar} from 'react-native'
import HomeScreen from './Screens/HomeScreen';
import Header from './Components/Header';
import MenuScreen from './Screens/MenuScreen';
import NavBar from './Components/NavBar';
import CartScreen from './Screens/CartScreen';
import OrderScreen from './Screens/OrderScreen';
import AuthenticationScreen from './Screens/AuthenticationScreen';
import RegisterScreen from './Screens/RegisterScreen';
import PaymentScreen from './Screens/PaymentScreen';
import React, { useState } from 'react';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent"
  }
}

export const NavigationContext = React.createContext();
export const MealContext = React.createContext();

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('AuthenticationScreen');
  const [meals, setMeals] = useState([{}]);

  return (
    <NavigationContainer theme={theme}>
      <NavigationContext.Provider value={{currentScreen, setCurrentScreen}}>
      <MealContext.Provider value={{meals, setMeals}}>
        <StatusBar backgroundColor="#01135d"/>
        <Header /> 
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Authentication">
          <Stack.Screen name="AuthenticationScreen" component={AuthenticationScreen}/>
          <Stack.Screen name="HomeScreen" component={HomeScreen}/>
          <Stack.Screen name="MenuScreen" component={MenuScreen}/>
          <Stack.Screen name="OrderScreen" component={OrderScreen}/>
          <Stack.Screen name="CartScreen" component={CartScreen}/>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
          <Stack.Screen name="PaymentScreen" component={PaymentScreen}/>
        </Stack.Navigator>
        <NavBar />
      </MealContext.Provider>
      </NavigationContext.Provider>
    </NavigationContainer>
  );
}
