import React from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';


// ========================================
// NAVIGATION TYPES
// ========================================

export type RootStackParamList = {
  Splash: undefined;

  Login: undefined;

  OtpVerification: {
    mobile: string;
  };

  Home: undefined;

  Profile: undefined;

  Cart: undefined;
};


// ========================================
// STACK
// ========================================

const Stack =
  createNativeStackNavigator<RootStackParamList>();


// ========================================
// APP NAVIGATOR
// ========================================

const AppNavigator = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Splash"

        screenOptions={{
          headerShown: false,
        }}
      >

        {/* =========================
            SPLASH
        ========================= */}

        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />


        {/* =========================
            LOGIN
        ========================= */}

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />


        {/* =========================
            OTP
        ========================= */}

        <Stack.Screen
          name="OtpVerification"
          component={OtpVerificationScreen}
        />


        {/* =========================
            HOME
        ========================= */}

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />


        {/* =========================
            PROFILE
        ========================= */}

        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />


        {/* =========================
            CART
        ========================= */}

        <Stack.Screen
          name="Cart"
          component={CartScreen}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default AppNavigator;