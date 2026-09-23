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

const OtpVerificationScreen = ({
  mobile,
  onVerify,
  onBack,
}) => {
  // ================= OTP =================

  const [otp, setOtp] = useState([
    '',
    '',
    '',
    '',
  ]);

  const inputRefs = useRef([]);

  // ================= ANIMATION =================

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

  // ================= START ANIMATION =================

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

    // Rotation
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

  // ================= OTP CHANGE =================

  const handleOtpChange = (text, index) => {
    const number = text.replace(/[^0-9]/g, '');

    if (!number) {
      return;
    }

    const newOtp = [...otp];

    newOtp[index] = number[0];

    setOtp(newOtp);

    // Next input
    if (index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // ================= BACKSPACE =================

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        const newOtp = [...otp];

        newOtp[index - 1] = '';

        setOtp(newOtp);

        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // ================= VERIFY =================

  const handleVerify = () => {
    const enteredOtp = otp.join('');

    if (enteredOtp.length !== 4) {
      Alert.alert(
        'Invalid OTP',
        'Please enter 4 digit OTP',
      );

      return;
    }

    // Demo OTP
    if (enteredOtp === '1234') {
      Alert.alert(
        'Success',
        'OTP verified successfully',
        [
          {
            text: 'Continue',
            onPress: () => {
              if (onVerify) {
                onVerify();
              }
            },
          },
        ],
      );
    } else {
      Alert.alert(
        'Invalid OTP',
        'Please enter correct OTP',
      );
    }
  };

  // ================= RESEND =================

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

  // ================= FLOATING =================

  const floatingStyle = {
    transform: [
      {
        translateY: floatingAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -12],
        }),
      },
    ],
  };

  const secondFloatingStyle = {
    transform: [
      {
        translateY: floatingAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 12],
        }),
      },
    ],
  };

  const rotateStyle = {
    transform: [
      {
        rotate: iconRotate.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  // ================= UI =================

  return (
    <SafeAreaView style={styles.container}>

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
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          {/* ================= BACK ================= */}

          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
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

            <View style={styles.circleOne} />
            <View style={styles.circleTwo} />

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

              <View style={styles.mainIcon}>

                <ShieldCheck
                  size={42}
                  color="#FFFFFF"
                  strokeWidth={2.2}
                />

                <View style={styles.smallSparkle}>
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

            <View style={styles.mobileBadge}>

              <Smartphone
                size={15}
                color="#2563EB"
              />

              <Text style={styles.mobileText}>
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

            <View style={styles.cardHeader}>

              <Text style={styles.cardTitle}>
                Enter OTP
              </Text>

              <Text style={styles.cardSubtitle}>
                Enter the 4 digit code sent to your mobile
              </Text>

            </View>


            {/* ================= OTP INPUTS ================= */}

            <View style={styles.otpContainer}>

              {otp.map((value, index) => (

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
                      inputRefs.current[index] = ref;
                    }}
                    value={value}
                    onChangeText={text =>
                      handleOtpChange(text, index)
                    }
                    onKeyPress={event =>
                      handleKeyPress(event, index)
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
                    <View style={styles.activeDot} />
                  )}

                </Animated.View>

              ))}

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
              disabled={otp.join('').length !== 4}
            >

              <Text style={styles.verifyButtonText}>
                Verify & Continue
              </Text>

              <View style={styles.arrowCircle}>

                <ArrowRight
                  size={19}
                  color="#2563EB"
                  strokeWidth={2.8}
                />

              </View>

            </TouchableOpacity>


            {/* ================= RESEND ================= */}

            <View style={styles.resendContainer}>

              <Text style={styles.resendText}>
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

                <Text style={styles.resendLink}>
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

            <View style={styles.securityIcon}>

              <ShieldCheck
                size={20}
                color="#2563EB"
              />

            </View>

            <View style={styles.securityContent}>

              <Text style={styles.securityTitle}>
                Your account is secure
              </Text>

              <Text style={styles.securityText}>
                We use OTP verification to keep
                your shopping account protected.
              </Text>

            </View>

          </Animated.View>


          {/* ================= DEMO ================= */}

          <View style={styles.demoBox}>

            <View style={styles.demoIcon}>

              <Sparkles
                size={16}
                color="#7C3AED"
              />

            </View>

            <View>

              <Text style={styles.demoTitle}>
                Demo Mode
              </Text>

              <Text style={styles.demoText}>
                Use OTP: 1234
              </Text>

            </View>

          </View>


          {/* ================= FOOTER ================= */}

          <Text style={styles.footerText}>
            🔒 Secure login • ShopEase
          </Text>

        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};

export default OtpVerificationScreen;


/* ================================================= */
/* ===================== STYLES ==================== */
/* ================================================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
    marginTop: 40,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 30,
  },

  /* ================= BACK ================= */

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',

    alignSelf: 'flex-start',

    marginBottom: 12,
  },

  backIcon: {
    width: 38,
    height: 38,

    borderRadius: 13,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#E7EDFF',

    shadowColor: '#1E3A8A',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 3,
  },

  backText: {
    marginLeft: 8,

    fontSize: 13,

    fontWeight: '800',

    color: '#172554',
  },

  /* ================= HERO ================= */

  heroSection: {
    height: 275,

    borderRadius: 30,

    backgroundColor: '#EAF1FF',

    alignItems: 'center',
    justifyContent: 'center',

    overflow: 'hidden',

    position: 'relative',

    marginBottom: -25,
  },

  circleOne: {
    position: 'absolute',

    width: 210,
    height: 210,

    borderRadius: 105,

    backgroundColor: '#D8E7FF',

    top: -100,
    right: -65,
  },

  circleTwo: {
    position: 'absolute',

    width: 180,
    height: 180,

    borderRadius: 90,

    backgroundColor: '#FFFFFF',

    opacity: 0.5,

    bottom: -100,
    left: -70,
  },

  /* ================= FLOATING ================= */

  floatingIcon: {
    position: 'absolute',

    width: 52,
    height: 52,

    borderRadius: 17,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#1E3A8A',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.13,
    shadowRadius: 10,

    elevation: 7,
  },

  floatingOne: {
    left: 25,
    top: 45,
  },

  floatingTwo: {
    right: 25,
    top: 60,
  },

  /* ================= MAIN ICON ================= */

  mainIconWrapper: {
    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15,

    elevation: 12,
  },

  mainIcon: {
    width: 86,
    height: 86,

    borderRadius: 28,

    backgroundColor: '#2563EB',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 5,
    borderColor: '#FFFFFF',

    position: 'relative',
  },

  smallSparkle: {
    position: 'absolute',

    right: 4,
    top: 4,

    width: 25,
    height: 25,

    borderRadius: 13,

    backgroundColor: '#7C3AED',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  /* ================= HERO TEXT ================= */

  title: {
    marginTop: 14,

    fontSize: 25,

    fontWeight: '900',

    color: '#111827',
  },

  subtitle: {
    marginTop: 5,

    fontSize: 12,

    color: '#64748B',

    textAlign: 'center',
  },

  mobileBadge: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 9,

    paddingHorizontal: 13,
    paddingVertical: 7,

    borderRadius: 20,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#DCE7FF',
  },

  mobileText: {
    marginLeft: 6,

    fontSize: 13,

    fontWeight: '900',

    color: '#2563EB',
  },

  /* ================= CARD ================= */

  card: {
    width: '100%',

    backgroundColor: '#FFFFFF',

    borderRadius: 28,

    paddingHorizontal: 20,
    paddingVertical: 24,

    borderWidth: 1,
    borderColor: '#EAF0FF',

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
    alignItems: 'center',

    marginBottom: 22,
  },

  cardTitle: {
    fontSize: 19,

    fontWeight: '900',

    color: '#111827',
  },

  cardSubtitle: {
    marginTop: 5,

    fontSize: 11,

    color: '#94A3B8',

    textAlign: 'center',

    lineHeight: 17,
  },

  /* ================= OTP ================= */

  otpContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: 24,

    paddingHorizontal: 5,
  },

  otpBoxWrapper: {
    width: 58,
    height: 62,

    borderRadius: 17,

    backgroundColor: '#F8FAFF',

    borderWidth: 1.5,
    borderColor: '#DCE3EF',

    alignItems: 'center',
    justifyContent: 'center',
  },

  otpBoxWrapperActive: {
    borderColor: '#2563EB',

    backgroundColor: '#EFF6FF',

    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,

    elevation: 4,
  },

  otpInput: {
    width: '100%',
    height: '100%',

    fontSize: 24,

    fontWeight: '900',

    color: '#111827',
  },

  otpInputActive: {
    color: '#2563EB',
  },

  activeDot: {
    position: 'absolute',

    bottom: 5,

    width: 5,
    height: 5,

    borderRadius: 3,

    backgroundColor: '#2563EB',
  },

  /* ================= VERIFY ================= */

  verifyButton: {
    height: 57,

    borderRadius: 18,

    backgroundColor: '#2563EB',

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.28,
    shadowRadius: 12,

    elevation: 7,
  },

  disabledButton: {
    backgroundColor: '#A5B4FC',

    shadowOpacity: 0,

    elevation: 0,
  },

  verifyButtonText: {
    color: '#FFFFFF',

    fontSize: 14,

    fontWeight: '900',

    marginRight: 12,
  },

  arrowCircle: {
    width: 34,
    height: 34,

    borderRadius: 17,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ================= RESEND ================= */

  resendContainer: {
    alignItems: 'center',

    marginTop: 20,
  },

  resendText: {
    fontSize: 11,

    color: '#94A3B8',
  },

  resendButton: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 8,

    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  resendLink: {
    marginLeft: 5,

    fontSize: 12,

    color: '#2563EB',

    fontWeight: '900',
  },

  /* ================= SECURITY ================= */

  securityCard: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 18,

    padding: 14,

    borderRadius: 18,

    backgroundColor: '#F8FAFF',

    borderWidth: 1,
    borderColor: '#E3EBFF',
  },

  securityIcon: {
    width: 40,
    height: 40,

    borderRadius: 13,

    backgroundColor: '#EAF1FF',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 11,
  },

  securityContent: {
    flex: 1,
  },

  securityTitle: {
    fontSize: 11,

    fontWeight: '900',

    color: '#1E293B',
  },

  securityText: {
    marginTop: 3,

    fontSize: 9,

    lineHeight: 14,

    color: '#94A3B8',
  },

  /* ================= DEMO ================= */

  demoBox: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 12,

    padding: 12,

    borderRadius: 16,

    backgroundColor: '#F5F0FF',

    borderWidth: 1,
    borderColor: '#E6D9FF',
  },

  demoIcon: {
    width: 34,
    height: 34,

    borderRadius: 11,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 9,
  },

  demoTitle: {
    fontSize: 10,

    fontWeight: '900',

    color: '#6D28D9',
  },

  demoText: {
    marginTop: 2,

    fontSize: 10,

    color: '#7C3AED',
  },

  /* ================= FOOTER ================= */

  footerText: {
    textAlign: 'center',

    marginTop: 18,

    fontSize: 10,

    color: '#94A3B8',

    fontWeight: '600',
  },

});