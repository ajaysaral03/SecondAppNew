import React, {useEffect, useRef, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Animated,
  Easing,
} from 'react-native';

import {
  ArrowLeft,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  RefreshCw,
  ArrowRight,
  Smartphone,
} from 'lucide-react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../navigation/AppNavigator';

import styles from '../styles/OtpVerificationScreen';

// ========================================
// NAVIGATION TYPE
// ========================================

type Props = NativeStackScreenProps<
  RootStackParamList,
  'OtpVerification'
>;


// ========================================
// OTP VERIFICATION SCREEN
// ========================================

const OtpVerificationScreen = ({
  route,
  navigation,
}: Props) => {

  // ========================================
  // MOBILE NUMBER
  // ========================================

  const {mobile} = route.params;


  // ========================================
  // OTP
  // ========================================

  const [otp, setOtp] = useState([
    '',
    '',
    '',
    '',
  ]);


  const inputRefs = useRef<Array<TextInput | null>>([]);


  // ========================================
  // ANIMATIONS
  // ========================================

  const fadeAnim = useRef(
    new Animated.Value(0),
  ).current;

  const slideAnim = useRef(
    new Animated.Value(35),
  ).current;

  const scaleAnim = useRef(
    new Animated.Value(0.92),
  ).current;

  const floatingAnim = useRef(
    new Animated.Value(0),
  ).current;

  const iconRotate = useRef(
    new Animated.Value(0),
  ).current;


  // ========================================
  // START ANIMATION
  // ========================================

  useEffect(() => {

    Animated.parallel([

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
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


    // Floating animation

    Animated.loop(
      Animated.sequence([

        Animated.timing(floatingAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(floatingAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

      ]),
    ).start();


    // Rotation animation

    Animated.loop(
      Animated.timing(iconRotate, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

  }, [
    fadeAnim,
    slideAnim,
    scaleAnim,
    floatingAnim,
    iconRotate,
  ]);


  // ========================================
  // OTP CHANGE
  // ========================================

  const handleOtpChange = (
    text: string,
    index: number,
  ) => {

    const number = text.replace(
      /[^0-9]/g,
      '',
    );


    if (!number) {
      return;
    }


    const newOtp = [...otp];

    newOtp[index] = number[0];

    setOtp(newOtp);


    // Move to next input

    if (index < 3) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };


  // ========================================
  // BACKSPACE
  // ========================================

  const handleKeyPress = (
    event: any,
    index: number,
  ) => {

    if (
      event.nativeEvent.key ===
      'Backspace'
    ) {

      if (
        otp[index] === '' &&
        index > 0
      ) {

        const newOtp = [...otp];

        newOtp[index - 1] = '';

        setOtp(newOtp);

        inputRefs.current[
          index - 1
        ]?.focus();
      }
    }
  };


  // ========================================
  // VERIFY OTP
  // ========================================

  const handleVerify = () => {

    const enteredOtp =
      otp.join('');


    // Check 4 digit OTP

    if (enteredOtp.length !== 4) {

      Alert.alert(
        'Invalid OTP',
        'Please enter 4 digit OTP.',
      );

      return;
    }


    // ========================================
    // DEMO OTP
    // ========================================

    if (enteredOtp === '1234') {

      Alert.alert(
        'Success',
        'OTP Verified Successfully!',
        [
          {
            text: 'Continue',
            onPress: () => {

              // Go to Home

              navigation.replace(
                'Home',
              );
            },
          },
        ],
      );

    } else {

      Alert.alert(
        'Invalid OTP',
        'Please enter correct OTP.',
      );
    }
  };


  // ========================================
  // BACK
  // ========================================

  const handleBack = () => {

    navigation.goBack();
  };


  // ========================================
  // RESEND OTP
  // ========================================

  const handleResend = () => {

    setOtp([
      '',
      '',
      '',
      '',
    ]);


    inputRefs.current[0]?.focus();


    Alert.alert(
      'OTP Sent',
      `New OTP sent to +91 ${mobile}`,
    );
  };


  // ========================================
  // FLOATING STYLE
  // ========================================

  const floatingStyle = {

    transform: [

      {
        translateY:
          floatingAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -12],
          }),
      },

    ],
  };


  const secondFloatingStyle = {

    transform: [

      {
        translateY:
          floatingAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 12],
          }),
      },

    ],
  };


  // ========================================
  // UI
  // ========================================

  return (

    <SafeAreaView
      style={styles.container}
    >

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F5F8FF"
      />


      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >

        <ScrollView
          contentContainerStyle={
            styles.scrollContent
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          {/* ================= BACK ================= */}

          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >

            <View style={styles.backIcon}>

              <ArrowLeft
                size={19}
                color="#172554"
              />

            </View>


            <Text style={styles.backText}>
              Back
            </Text>

          </TouchableOpacity>


          {/* ================= HERO ================= */}

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

            {/* Background circles */}

            <View
              style={styles.circleOne}
            />

            <View
              style={styles.circleTwo}
            />


            {/* Floating shopping bag */}

            <Animated.View
              style={[
                styles.floatingIcon,
                styles.floatingOne,
                floatingStyle,
              ]}
            >

              <ShoppingBag
                size={25}
                color="#2563EB"
              />

            </Animated.View>


            {/* Floating star */}

            <Animated.View
              style={[
                styles.floatingIcon,
                styles.floatingTwo,
                secondFloatingStyle,
              ]}
            >

              <Star
                size={22}
                color="#F59E0B"
                fill="#F59E0B"
              />

            </Animated.View>


            {/* Main icon */}

            <Animated.View
              style={[
                styles.mainIconWrapper,
                {
                  transform: [
                    {
                      scale: scaleAnim,
                    },
                  ],
                },
              ]}
            >

              <View
                style={styles.mainIcon}
              >

                <ShieldCheck
                  size={42}
                  color="#FFFFFF"
                  strokeWidth={2.2}
                />


                <View
                  style={styles.smallSparkle}
                >

                  <Sparkles
                    size={14}
                    color="#FFFFFF"
                  />

                </View>

              </View>

            </Animated.View>


            <Text style={styles.title}>
              Verify Your Number
            </Text>


            <Text style={styles.subtitle}>
              We've sent a verification code to
            </Text>


            {/* Mobile */}

            <View
              style={styles.mobileBadge}
            >

              <Smartphone
                size={15}
                color="#2563EB"
              />

              <Text
                style={styles.mobileText}
              >
                +91 {mobile}
              </Text>

            </View>

          </Animated.View>


          {/* ================= OTP CARD ================= */}

          <Animated.View
            style={[
              styles.card,
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

            <View
              style={styles.cardHeader}
            >

              <Text
                style={styles.cardTitle}
              >
                Enter OTP
              </Text>


              <Text
                style={styles.cardSubtitle}
              >
                Enter the 4 digit code sent to your mobile
              </Text>

            </View>


            {/* ================= OTP INPUTS ================= */}

            <View
              style={styles.otpContainer}
            >

              {otp.map(
                (value, index) => (

                  <Animated.View
                    key={index}
                    style={[
                      styles.otpBoxWrapper,

                      value !== '' &&
                        styles.otpBoxWrapperActive,
                    ]}
                  >

                    <TextInput
                      ref={ref => {
                        inputRefs.current[
                          index
                        ] = ref;
                      }}

                      value={value}

                      onChangeText={text =>
                        handleOtpChange(
                          text,
                          index,
                        )
                      }

                      onKeyPress={event =>
                        handleKeyPress(
                          event,
                          index,
                        )
                      }

                      keyboardType="number-pad"

                      maxLength={1}

                      style={[
                        styles.otpInput,

                        value !== '' &&
                          styles.otpInputActive,
                      ]}

                      textAlign="center"

                      selectTextOnFocus

                    />


                    {value !== '' && (

                      <View
                        style={
                          styles.activeDot
                        }
                      />

                    )}

                  </Animated.View>

                ),
              )}

            </View>


            {/* ================= VERIFY BUTTON ================= */}

            <TouchableOpacity
              style={[
                styles.verifyButton,

                otp.join('').length !== 4 &&
                  styles.disabledButton,
              ]}

              onPress={handleVerify}

              activeOpacity={0.85}

              disabled={
                otp.join('').length !== 4
              }
            >

              <Text
                style={
                  styles.verifyButtonText
                }
              >
                Verify & Continue
              </Text>


              <View
                style={styles.arrowCircle}
              >

                <ArrowRight
                  size={19}
                  color="#2563EB"
                  strokeWidth={2.8}
                />

              </View>

            </TouchableOpacity>


            {/* ================= RESEND ================= */}

            <View
              style={styles.resendContainer}
            >

              <Text
                style={styles.resendText}
              >
                Didn't receive the code?
              </Text>


              <TouchableOpacity
                onPress={handleResend}
                activeOpacity={0.7}
                style={styles.resendButton}
              >

                <RefreshCw
                  size={14}
                  color="#2563EB"
                />


                <Text
                  style={styles.resendLink}
                >
                  Resend OTP
                </Text>

              </TouchableOpacity>

            </View>

          </Animated.View>


          {/* ================= SECURITY ================= */}

          <Animated.View
            style={[
              styles.securityCard,
              {
                opacity: fadeAnim,
              },
            ]}
          >

            <View
              style={styles.securityIcon}
            >

              <ShieldCheck
                size={20}
                color="#2563EB"
              />

            </View>


            <View
              style={styles.securityContent}
            >

              <Text
                style={styles.securityTitle}
              >
                Your account is secure
              </Text>


              <Text
                style={styles.securityText}
              >
                We use OTP verification to keep
                your shopping account protected.
              </Text>

            </View>

          </Animated.View>


          {/* ================= DEMO ================= */}

          <View
            style={styles.demoBox}
          >

            <View
              style={styles.demoIcon}
            >

              <Sparkles
                size={16}
                color="#7C3AED"
              />

            </View>


            <View>

              <Text
                style={styles.demoTitle}
              >
                Demo Mode
              </Text>


              <Text
                style={styles.demoText}
              >
                Use OTP: 1234
              </Text>

            </View>

          </View>


          {/* ================= FOOTER ================= */}

          <Text
            style={styles.footerText}
          >
            🔒 Secure login • ShopEase
          </Text>

        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};


export default OtpVerificationScreen;


// =================================================
// STYLES
// =================================================

