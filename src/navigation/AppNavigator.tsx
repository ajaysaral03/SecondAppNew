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
import FavoritesScreen from '../screens/FavoritesScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderSuccessScreen from '../screens/OrderSuccessScreen';
import OrderTrackingScreen from '../screens/OrderTrackingScreen';

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
  Favorites: undefined;
  Checkout: undefined;
  OrderSuccess: undefined;
  OrderTracking: undefined;
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
            FAVORITES
        ========================= */}

        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
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

        {/* =========================
            CHECKOUT
        ========================= */}

        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
        />

        {/* =========================
            ORDER SUCCESS
        ========================= */}

        <Stack.Screen
          name="OrderSuccess"
          component={OrderSuccessScreen}
           options={{headerShown: false}}
        />
        {/* =========================
            Order  Tracking Screen
        ========================= */}

        <Stack.Screen
          name="OrderTracking"
          component={OrderTrackingScreen}
           options={{headerShown: false}}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default AppNavigator;