import React, {useEffect, useState} from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import OtpVerificationScreen from './src/screens/OtpVerificationScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CartScreen from './src/screens/CartScreen';


const App = () => {

  // =====================================================
  // STATES
  // =====================================================

  const [showSplash, setShowSplash] = useState(true);

  const [currentScreen, setCurrentScreen] = useState('login');

  const [mobile, setMobile] = useState('');


  // =====================================================
  // SPLASH TIMER
  // =====================================================

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);

  }, []);


  // =====================================================
  // SPLASH SCREEN
  // =====================================================

  if (showSplash) {

    return (
      <View style={styles.container}>
        <SplashScreen />
      </View>
    );

  }


  // =====================================================
  // LOGIN SCREEN
  // =====================================================

  if (currentScreen === 'login') {

    return (
      <View style={styles.container}>

        <LoginScreen
          onLogin={number => {

            setMobile(number);

            setCurrentScreen('otp');

          }}
        />

      </View>
    );

  }


  // =====================================================
  // OTP SCREEN
  // =====================================================

  if (currentScreen === 'otp') {

    return (
      <View style={styles.container}>

        <OtpVerificationScreen
          mobile={mobile}

          onVerify={() => {

            setCurrentScreen('home');

          }}

          onBack={() => {

            setCurrentScreen('login');

          }}
        />

      </View>
    );

  }


  // =====================================================
  // PROFILE SCREEN
  // =====================================================

  if (currentScreen === 'profile') {

    return (
      <View style={styles.container}>

        <ProfileScreen

          onBack={() => {
            setCurrentScreen('home');
          }}

          onLogout={() => {

            setMobile('');

            setCurrentScreen('login');

          }}

        />

      </View>
    );

  }


  // =====================================================
  // CART SCREEN
  // =====================================================

  if (currentScreen === 'cart') {

    return (
      <View style={styles.container}>

        <CartScreen

          onBack={() => {
            setCurrentScreen('home');
          }}

        />

      </View>
    );

  }


  // =====================================================
  // HOME SCREEN
  // =====================================================

  if (currentScreen === 'home') {

    return (
      <View style={styles.container}>

<HomeScreen
  onProfilePress={() => {
    setCurrentScreen('profile');
  }}

  onCartPress={() => {
    setCurrentScreen('cart');
  }}
/>

      </View>
    );

  }


  // =====================================================
  // DEFAULT
  // =====================================================

  return null;
};


export default App;


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

});