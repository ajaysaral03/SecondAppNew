import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
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

const LoginScreen = ({onLogin}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  // Main animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;

  // Floating animations
  const product1 = useRef(new Animated.Value(0)).current;
  const product2 = useRef(new Animated.Value(0)).current;
  const product3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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

    // Product 1
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

    // Product 2
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

    // Product 3
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

  const handleNameChange = text => {
    setName(text);
  };

  // ================= MOBILE =================

  const handleMobileChange = text => {
    const onlyNumbers = text.replace(/[^0-9]/g, '');

    if (onlyNumbers.length <= 10) {
      setMobile(onlyNumbers);
    }
  };

  // ================= CONTINUE =================

  const handleContinue = () => {
    if (name.trim().length < 2) {
      return;
    }

    if (mobile.length !== 10) {
      return;
    }

    if (onLogin) {
      onLogin(mobile);
    }
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >

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
            ]}
          >

            {/* Background Circles */}

            <View style={styles.blueCircle} />

            <View style={styles.lightCircle} />

            {/* Floating Shopping Bag */}

            <Animated.View
              style={[
                styles.floatingProduct,
                styles.productOne,
                productOneStyle,
              ]}
            >
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
              ]}
            >
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
              ]}
            >
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
              }}
            >
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
            ]}
          >

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
              disabled={!isValid}
            >

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

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F7FF',
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 30,
  },

  /* ================= HERO ================= */

  heroSection: {
    height: 300,
    borderRadius: 32,
    backgroundColor: '#EAF1FF',

    alignItems: 'center',
    justifyContent: 'center',

    position: 'relative',
    overflow: 'hidden',

    marginBottom: -30,
  },

  blueCircle: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#D8E7FF',
    top: -90,
    right: -60,
  },

  lightCircle: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FFFFFF',
    opacity: 0.55,
    bottom: -90,
    left: -60,
  },

  /* ================= LOGO ================= */

  logoContainer: {
    width: 78,
    height: 78,
    borderRadius: 26,

    backgroundColor: '#2563EB',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 5,
    borderColor: '#FFFFFF',

    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,

    elevation: 10,
  },

  brandName: {
    marginTop: 12,
    fontSize: 26,
    fontWeight: '900',
    color: '#172554',
  },

  heroTitle: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '800',
    color: '#1E3A8A',
  },

  heroSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: '#64748B',
  },

  /* ================= FLOATING ITEMS ================= */

  floatingProduct: {
    position: 'absolute',

    width: 55,
    height: 55,

    borderRadius: 18,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#1E40AF',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,

    elevation: 8,
  },

  productOne: {
    left: 25,
    top: 55,
  },

  productTwo: {
    right: 28,
    top: 48,
  },

  productThree: {
    left: 45,
    bottom: 45,
  },

  /* ================= TRUST ================= */

  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13,
  },

  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  trustText: {
    marginLeft: 4,
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 10,
  },

  /* ================= CARD ================= */

  loginCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 30,

    paddingHorizontal: 20,
    paddingVertical: 25,

    borderWidth: 1,
    borderColor: '#EEF2FF',

    shadowColor: '#1E3A8A',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,

    elevation: 10,
  },

  cardHeader: {
    marginBottom: 23,
  },

  welcome: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111827',
  },

  cardSubtitle: {
    marginTop: 5,
    fontSize: 13,
    color: '#64748B',
  },

  /* ================= INPUT ================= */

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#334155',
    marginBottom: 8,
  },

  inputContainer: {
    minHeight: 58,

    borderRadius: 17,

    borderWidth: 1.3,
    borderColor: '#E2E8F0',

    backgroundColor: '#F8FAFF',

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 10,
  },

  inputIcon: {
    width: 40,
    height: 40,

    borderRadius: 13,

    backgroundColor: '#EAF1FF',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 9,
  },

  input: {
    flex: 1,

    height: 55,

    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
  },

  countryCode: {
    fontSize: 13,
    fontWeight: '800',
    color: '#334155',
  },

  verticalLine: {
    width: 1,
    height: 25,

    backgroundColor: '#CBD5E1',

    marginHorizontal: 9,
  },

  mobileInput: {
    flex: 1,

    height: 55,

    fontSize: 14,

    color: '#111827',

    fontWeight: '600',

    letterSpacing: 0.5,
  },

  helperText: {
    marginTop: 6,

    fontSize: 10,

    color: '#94A3B8',
  },

  /* ================= BUTTON ================= */

  loginButton: {
    height: 58,

    borderRadius: 18,

    backgroundColor: '#2563EB',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 3,

    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,

    elevation: 8,
  },

  disabledButton: {
    backgroundColor: '#A5B4FC',

    shadowOpacity: 0,

    elevation: 0,
  },

  loginButtonText: {
    color: '#FFFFFF',

    fontSize: 14,

    fontWeight: '900',

    marginRight: 12,
  },

  arrowCircle: {
    width: 35,
    height: 35,

    borderRadius: 18,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ================= TERMS ================= */

  termsText: {
    marginTop: 16,

    textAlign: 'center',

    fontSize: 10,

    lineHeight: 16,

    color: '#94A3B8',
  },

  termsLink: {
    color: '#2563EB',
    fontWeight: '800',
  },

  /* ================= BENEFITS ================= */

  benefitsContainer: {
    marginTop: 22,

    borderRadius: 18,

    backgroundColor: '#F8FAFF',

    borderWidth: 1,
    borderColor: '#E7EDFF',

    padding: 13,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',

    flex: 1,
  },

  benefitIcon: {
    width: 34,
    height: 34,

    borderRadius: 11,

    backgroundColor: '#EAF1FF',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 8,
  },

  benefitTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#1E293B',
  },

  benefitText: {
    fontSize: 9,
    color: '#94A3B8',
    marginTop: 2,
  },

  benefitDivider: {
    width: 1,
    height: 30,

    backgroundColor: '#E2E8F0',

    marginHorizontal: 8,
  },

  /* ================= FOOTER ================= */

  footerText: {
    textAlign: 'center',

    marginTop: 18,

    fontSize: 11,

    color: '#94A3B8',

    fontWeight: '600',
  },

});