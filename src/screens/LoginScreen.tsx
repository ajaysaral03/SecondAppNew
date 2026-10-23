import React, {useEffect, useRef, useState} from 'react';

import {
  View,
  Text,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';

import {
  ShoppingBag,
  User,
  Smartphone,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react-native';

/* eslint-disable react/prop-types */
import styles from '../styles/LoginScreenStyles';
import {useUser} from '../context/UserContext';

const LoginScreen = ({navigation}) => {
  const {setUser} = useUser();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  // ================= MAIN ANIMATIONS =================

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;

  // ================= FLOATING ANIMATIONS =================

  const product1 = useRef(new Animated.Value(0)).current;
  const product2 = useRef(new Animated.Value(0)).current;
  const product3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Main animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),

      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 7,
        tension: 45,
        useNativeDriver: true,
      }),

      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 45,
        useNativeDriver: true,
      }),
    ]).start();

    // Product 1 animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(product1, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(product1, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Product 2 animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(product2, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(product2, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Product 3 animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(product3, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(product3, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [
    fadeAnim,
    slideAnim,
    scaleAnim,
    product1,
    product2,
    product3,
  ]);

  // ================= NAME =================

  const handleNameChange = (text: string) => {
    setName(text);
  };

  // ================= MOBILE =================

  const handleMobileChange = (text: string) => {
    const onlyNumbers = text.replace(/[^0-9]/g, '');

    if (onlyNumbers.length <= 10) {
      setMobile(onlyNumbers);
    }
  };

  // ================= DEMO OTP LOGIN =================
  // This is a frontend demo only. It does NOT send a real SMS.
  // For production, generate/verify OTP securely on your backend
  // and send it through an SMS/OTP provider.
  const handleContinue = async () => {
    if (name.trim().length < 2) {
      Alert.alert('Invalid name', 'Please enter at least 2 characters for your name.');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      Alert.alert('Invalid mobile number', 'Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    // Share the entered profile with CheckoutScreen through UserContext.
    setUser({name: name.trim(), mobile});

    // Demo OTP: visible in Metro/terminal console and in an alert.
    const otp = String(Math.floor(1000 + Math.random() * 9000));
    console.log(`[DEMO OTP] Mobile: +91${mobile} | OTP: ${otp}`);

    Alert.alert(
      'Demo OTP generated',
      `Your demo OTP is ${otp}\n\nIt is also printed in the Metro console. No SMS was sent.`,
      [
        {
          text: 'Continue to verify',
          onPress: () =>
            navigation.navigate('OtpVerification', {
              mobile,
              name: name.trim(),
              otp, // Demo only: OTPVerification screen must compare user input with this value.
            }),
        },
      ],
      { cancelable: false },
    );
  };

  // ================= VALIDATION =================

  const isValid =
    name.trim().length >= 2 &&
    mobile.length === 10;

  // ================= FLOATING ANIMATION =================

  const productOneStyle = {
    transform: [
      {
        translateY: product1.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -12],
        }),
      },
      {
        rotate: product1.interpolate({
          inputRange: [0, 1],
          outputRange: ['-4deg', '4deg'],
        }),
      },
    ],
  };

  const productTwoStyle = {
    transform: [
      {
        translateY: product2.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 14],
        }),
      },
      {
        rotate: product2.interpolate({
          inputRange: [0, 1],
          outputRange: ['5deg', '-5deg'],
        }),
      },
    ],
  };

  const productThreeStyle = {
    transform: [
      {
        translateY: product3.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
      {
        rotate: product3.interpolate({
          inputRange: [0, 1],
          outputRange: ['-3deg', '5deg'],
        }),
      },
    ],
  };

  // ================= UI =================

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}>

          {/* ================= HERO SECTION ================= */}

          <Animated.View
            style={[
              styles.heroSection,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: slideAnim,
                  },
                ],
              },
            ]}>

            {/* Background Circles */}

            <View style={styles.blueCircle} />

            <View style={styles.lightCircle} />

            {/* Floating Shopping Bag */}

            <Animated.View
              style={[
                styles.floatingProduct,
                styles.productOne,
                productOneStyle,
              ]}>

              <ShoppingBag
                size={28}
                color="#2563EB"
                strokeWidth={2.5}
              />

            </Animated.View>

            {/* Floating Star */}

            <Animated.View
              style={[
                styles.floatingProduct,
                styles.productTwo,
                productTwoStyle,
              ]}>

              <Star
                size={25}
                color="#F59E0B"
                fill="#F59E0B"
              />

            </Animated.View>

            {/* Floating Sparkles */}

            <Animated.View
              style={[
                styles.floatingProduct,
                styles.productThree,
                productThreeStyle,
              ]}>

              <Sparkles
                size={25}
                color="#7C3AED"
              />

            </Animated.View>

            {/* LOGO */}

            <Animated.View
              style={{
                transform: [
                  {
                    scale: scaleAnim,
                  },
                ],
              }}>

              <View style={styles.logoContainer}>

                <ShoppingBag
                  size={42}
                  color="#FFFFFF"
                  strokeWidth={2.5}
                />

              </View>

            </Animated.View>

            {/* BRAND NAME */}

            <Text style={styles.brandName}>
              ShopEase
            </Text>

            <Text style={styles.heroTitle}>
              Shop smarter.
            </Text>

            <Text style={styles.heroSubtitle}>
              Discover products you love
            </Text>

            {/* TRUST */}

            <View style={styles.trustRow}>

              <View style={styles.trustItem}>

                <ShieldCheck
                  size={15}
                  color="#2563EB"
                />

                <Text style={styles.trustText}>
                  Secure
                </Text>

              </View>

              <View style={styles.dot} />

              <View style={styles.trustItem}>

                <Star
                  size={15}
                  color="#F59E0B"
                  fill="#F59E0B"
                />

                <Text style={styles.trustText}>
                  Trusted
                </Text>

              </View>

              <View style={styles.dot} />

              <View style={styles.trustItem}>

                <Sparkles
                  size={15}
                  color="#7C3AED"
                />

                <Text style={styles.trustText}>
                  Fast
                </Text>

              </View>

            </View>

          </Animated.View>

          {/* ================= LOGIN CARD ================= */}

          <Animated.View
            style={[
              styles.loginCard,
              {
                opacity: fadeAnim,

                transform: [
                  {
                    translateY: slideAnim,
                  },
                  {
                    scale: scaleAnim,
                  },
                ],
              },
            ]}>

            {/* HEADER */}

            <View style={styles.cardHeader}>

              <Text style={styles.welcome}>
                Welcome Back 👋
              </Text>

              <Text style={styles.cardSubtitle}>
                Enter your details to continue
              </Text>

            </View>

            {/* ================= NAME ================= */}

            <View style={styles.inputGroup}>

              <Text style={styles.label}>
                Full Name
              </Text>

              <View style={styles.inputContainer}>

                <View style={styles.inputIcon}>

                  <User
                    size={21}
                    color="#2563EB"
                  />

                </View>

                <TextInput
                  value={name}
                  onChangeText={handleNameChange}
                  placeholder="Enter your full name"
                  placeholderTextColor="#A1AABD"
                  style={styles.input}
                  autoCapitalize="words"
                />

              </View>

            </View>

            {/* ================= MOBILE ================= */}

            <View style={styles.inputGroup}>

              <Text style={styles.label}>
                Mobile Number
              </Text>

              <View style={styles.inputContainer}>

                <View style={styles.inputIcon}>

                  <Smartphone
                    size={21}
                    color="#2563EB"
                  />

                </View>

                <Text style={styles.countryCode}>
                  🇮🇳 +91
                </Text>

                <View style={styles.verticalLine} />

                <TextInput
                  value={mobile}
                  onChangeText={handleMobileChange}
                  placeholder="Enter mobile number"
                  placeholderTextColor="#A1AABD"
                  keyboardType="number-pad"
                  maxLength={10}
                  style={styles.mobileInput}
                />

              </View>

              <Text style={styles.helperText}>
                We'll send an OTP to verify your number
              </Text>

            </View>

            {/* ================= BUTTON ================= */}

            <TouchableOpacity
              style={[
                styles.loginButton,
                !isValid && styles.disabledButton,
              ]}
              activeOpacity={0.85}
              onPress={handleContinue}
              disabled={!isValid}>

              <Text style={styles.loginButtonText}>
                Continue Shopping
              </Text>

              <View style={styles.arrowCircle}>

                <ArrowRight
                  size={20}
                  color="#2563EB"
                  strokeWidth={2.8}
                />

              </View>

            </TouchableOpacity>

            {/* ================= TERMS ================= */}

            <Text style={styles.termsText}>
              By continuing, you agree to our{' '}

              <Text style={styles.termsLink}>
                Terms
              </Text>{' '}

              &{' '}

              <Text style={styles.termsLink}>
                Privacy Policy
              </Text>
            </Text>

            {/* ================= BENEFITS ================= */}

            <View style={styles.benefitsContainer}>

              <View style={styles.benefitItem}>

                <View style={styles.benefitIcon}>

                  <ShieldCheck
                    size={18}
                    color="#2563EB"
                  />

                </View>

                <View>

                  <Text style={styles.benefitTitle}>
                    Secure
                  </Text>

                  <Text style={styles.benefitText}>
                    100% Safe
                  </Text>

                </View>

              </View>

              <View style={styles.benefitDivider} />

              <View style={styles.benefitItem}>

                <View style={styles.benefitIcon}>

                  <Sparkles
                    size={18}
                    color="#7C3AED"
                  />

                </View>

                <View>

                  <Text style={styles.benefitTitle}>
                    Easy
                  </Text>

                  <Text style={styles.benefitText}>
                    Quick Login
                  </Text>

                </View>

              </View>

            </View>

          </Animated.View>

          {/* ================= FOOTER ================= */}

          <Text style={styles.footerText}>
            Your shopping journey starts here ✨
          </Text>

        </ScrollView>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

/* ================================================= */
/* ===================== STYLES ==================== */
/* ================================================= */

