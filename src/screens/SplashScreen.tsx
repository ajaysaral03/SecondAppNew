import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import styles from '../styles/SplashScreen';


import {useNavigation} from '@react-navigation/native';

import {
  ShoppingBag,
  Sparkles,
  Star,
  Package,
} from 'lucide-react-native';

const SplashScreen = () => {
  const navigation = useNavigation();

  // ================= ANIMATION VALUES =================

  const logoScale = useRef(
    new Animated.Value(0.5),
  ).current;

  const logoOpacity = useRef(
    new Animated.Value(0),
  ).current;

  const contentOpacity = useRef(
    new Animated.Value(0),
  ).current;

  const contentTranslate = useRef(
    new Animated.Value(25),
  ).current;

  const circleOne = useRef(
    new Animated.Value(0),
  ).current;

  const circleTwo = useRef(
    new Animated.Value(0),
  ).current;

  const sparkleRotate = useRef(
    new Animated.Value(0),
  ).current;

  // ================= START ANIMATION =================

  useEffect(() => {
    // ================= SPLASH -> LOGIN =================

    const timer = setTimeout(() => {
      navigation.replace('Login' as never);
    }, 3000);

    // ================= LOGO ANIMATION =================

    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 5,
        tension: 45,
        useNativeDriver: true,
      }),

      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();

    // ================= TEXT ANIMATION =================

    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 900,
        delay: 350,
        useNativeDriver: true,
      }),

      Animated.spring(contentTranslate, {
        toValue: 0,
        friction: 7,
        tension: 45,
        delay: 350,
        useNativeDriver: true,
      }),
    ]).start();

    // ================= FLOATING CIRCLE 1 =================

    Animated.loop(
      Animated.sequence([
        Animated.timing(circleOne, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(circleOne, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // ================= FLOATING CIRCLE 2 =================

    Animated.loop(
      Animated.sequence([
        Animated.timing(circleTwo, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(circleTwo, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // ================= SPARKLE ROTATION =================

    Animated.loop(
      Animated.timing(sparkleRotate, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    // ================= CLEANUP =================

    return () => {
      clearTimeout(timer);
    };
  }, [
    navigation,
    logoScale,
    logoOpacity,
    contentOpacity,
    contentTranslate,
    circleOne,
    circleTwo,
    sparkleRotate,
  ]);

  // ================= ANIMATION STYLES =================

  const circleOneStyle = {
    transform: [
      {
        translateY: circleOne.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -25],
        }),
      },
      {
        translateX: circleOne.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 15],
        }),
      },
    ],
  };

  const circleTwoStyle = {
    transform: [
      {
        translateY: circleTwo.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 25],
        }),
      },
      {
        translateX: circleTwo.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -15],
        }),
      },
    ],
  };

  const sparkleStyle = {
    transform: [
      {
        rotate: sparkleRotate.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  // ================= UI =================

  return (
    <View style={styles.container}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F9FF"
      />

      {/* ================= BACKGROUND ================= */}

      <View style={styles.backgroundCircleLarge} />

      <View style={styles.backgroundCircleSmall} />

      {/* ================= FLOATING PRODUCT 1 ================= */}

      <Animated.View
        style={[
          styles.floatingIcon,
          styles.floatingOne,
          circleOneStyle,
        ]}>
        <Package
          size={25}
          color="#2563EB"
          strokeWidth={2.3}
        />
      </Animated.View>

      {/* ================= FLOATING PRODUCT 2 ================= */}

      <Animated.View
        style={[
          styles.floatingIcon,
          styles.floatingTwo,
          circleTwoStyle,
        ]}>
        <Star
          size={23}
          color="#F59E0B"
          fill="#F59E0B"
        />
      </Animated.View>

      {/* ================= SPARKLE ================= */}

      <Animated.View
        style={[
          styles.sparkle,
          styles.sparkleOne,
          sparkleStyle,
        ]}>
        <Sparkles
          size={27}
          color="#7C3AED"
        />
      </Animated.View>

      {/* ================= MAIN LOGO ================= */}

      <Animated.View
        style={[
          styles.mainContent,
          {
            opacity: logoOpacity,
            transform: [
              {
                scale: logoScale,
              },
            ],
          },
        ]}>

        <View style={styles.logoShadow}>

          <View style={styles.logoContainer}>

            <ShoppingBag
              size={64}
              color="#FFFFFF"
              strokeWidth={2.2}
            />

            {/* Small sparkle */}

            <View style={styles.logoSparkle}>

              <Sparkles
                size={17}
                color="#FFFFFF"
              />

            </View>

          </View>

        </View>

      </Animated.View>

      {/* ================= TEXT ================= */}

      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: contentOpacity,
            transform: [
              {
                translateY: contentTranslate,
              },
            ],
          },
        ]}>

        <Text style={styles.appName}>
          ShopEase
        </Text>

        <Text style={styles.tagline}>
          Shop smarter. Live better.
        </Text>

        <Text style={styles.description}>
          Everything you love,
          {'\n'}
          delivered to your doorstep.
        </Text>

        {/* Trust Row */}

        <View style={styles.trustRow}>

          <View style={styles.trustItem}>

            <View style={styles.trustIcon}>

              <Package
                size={15}
                color="#2563EB"
              />

            </View>

            <Text style={styles.trustText}>
              Easy Shopping
            </Text>

          </View>

          <View style={styles.divider} />

          <View style={styles.trustItem}>

            <View style={styles.trustIcon}>

              <Star
                size={15}
                color="#F59E0B"
                fill="#F59E0B"
              />

            </View>

            <Text style={styles.trustText}>
              Trusted
            </Text>

          </View>

        </View>

      </Animated.View>

      {/* ================= BOTTOM ================= */}

      <View style={styles.bottomContainer}>

        <View style={styles.loadingTrack}>

          <Animated.View
            style={[
              styles.loadingBar,
              {
                opacity: contentOpacity,
              },
            ]}
          />

        </View>

        <Text style={styles.bottomText}>
          Your shopping journey starts here
        </Text>

      </View>

    </View>
  );
};

export default SplashScreen;


/* ================================================= */
/* ===================== STYLES ==================== */
/* ================================================= */

