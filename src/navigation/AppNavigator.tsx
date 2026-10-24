
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
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
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';

// Context Providers
import { CartProvider } from '../context/CartContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { UserProvider } from '../context/UserContext';

// Navigation Types
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
  Products: undefined;
  MyOrders: undefined;
  Notification: undefined;

  ProductDetails: {
    product: {
      id: string | number;
      name: string;
      price: number | string;
      image?: string;
      thumbnail?: string;
      images?: string[];
      size?: string;
      color?: string;
      [key: string]: any;
    };
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <UserProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{
                headerShown: false,
              }}>

              <Stack.Screen
                name="Splash"
                component={SplashScreen}
              />

              <Stack.Screen
                name="Login"
                component={LoginScreen}
              />

              <Stack.Screen
                name="OtpVerification"
                component={OtpVerificationScreen}
              />

              <Stack.Screen
                name="Home"
                component={HomeScreen}
              />

              <Stack.Screen
                name="Products"
                component={ProductsScreen}
              />

              <Stack.Screen
                name="ProductDetails"
                component={ProductDetailsScreen}
              />

              <Stack.Screen
                name="Favorites"
                component={FavoritesScreen}
              />

              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
              />

              <Stack.Screen
                name="Cart"
                component={CartScreen}
              />

              <Stack.Screen
                name="Checkout"
                component={CheckoutScreen}
              />

              <Stack.Screen
                name="OrderSuccess"
                component={OrderSuccessScreen}
              />

              <Stack.Screen
                name="OrderTracking"
                component={OrderTrackingScreen}
              />

              <Stack.Screen
                name="Notification"
                component={NotificationScreen}
              />

              <Stack.Screen
                name="MyOrders"
                component={MyOrdersScreen}
              />

            </Stack.Navigator>
          </NavigationContainer>
        </UserProvider>
      </FavoritesProvider>
    </CartProvider>
  );
};

export default AppNavigator;
