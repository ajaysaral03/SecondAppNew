import React, {useEffect, useRef} from 'react';

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';

import {
  ShoppingBag,
  Sparkles,
  Star,
  Package,
} from 'lucide-react-native';

const SplashScreen = () => {
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
    // Logo animation
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

    // Text animation
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

    // Floating circle 1
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

    // Floating circle 2
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

    // Sparkle rotation
    Animated.loop(
      Animated.timing(sparkleRotate, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [
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
        ]}
      >
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
        ]}
      >
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
        ]}
      >
        <Sparkles
          size={27}
          color="#7C3AED"
        />
      </Animated.View>

      {/* ================= MAIN CONTENT ================= */}

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
        ]}
      >

        {/* Logo Shadow */}

        <View style={styles.logoShadow}>

          {/* Logo */}

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
        ]}
      >

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

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F7F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  /* ================= BACKGROUND ================= */

  backgroundCircleLarge: {
    position: 'absolute',

    width: 350,
    height: 350,

    borderRadius: 175,

    backgroundColor: '#E7EFFF',

    top: -150,
    right: -120,
  },

  backgroundCircleSmall: {
    position: 'absolute',

    width: 280,
    height: 280,

    borderRadius: 140,

    backgroundColor: '#EEF2FF',

    bottom: -130,
    left: -100,
  },

  /* ================= FLOATING ICONS ================= */

  floatingIcon: {
    position: 'absolute',

    width: 58,
    height: 58,

    borderRadius: 20,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#1E3A8A',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,

    elevation: 8,
  },

  floatingOne: {
    top: '22%',
    left: 35,
  },

  floatingTwo: {
    top: '28%',
    right: 32,
  },

  /* ================= SPARKLE ================= */

  sparkle: {
    position: 'absolute',

    width: 52,
    height: 52,

    alignItems: 'center',
    justifyContent: 'center',
  },

  sparkleOne: {
    right: 55,
    top: '18%',
  },

  /* ================= MAIN LOGO ================= */

  mainContent: {
    alignItems: 'center',
  },

  logoShadow: {
    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.28,
    shadowRadius: 20,

    elevation: 15,
  },

  logoContainer: {
    width: 135,
    height: 135,

    borderRadius: 42,

    backgroundColor: '#2563EB',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 6,
    borderColor: '#FFFFFF',

    position: 'relative',
  },

  logoSparkle: {
    position: 'absolute',

    right: 8,
    top: 8,

    width: 31,
    height: 31,

    borderRadius: 16,

    backgroundColor: '#7C3AED',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 3,
    borderColor: '#FFFFFF',
  },

  /* ================= TEXT ================= */

  textContainer: {
    alignItems: 'center',

    marginTop: 28,

    paddingHorizontal: 25,
  },

  appName: {
    fontSize: 36,

    fontWeight: '900',

    color: '#111827',

    letterSpacing: -1,
  },

  tagline: {
    marginTop: 5,

    fontSize: 16,

    fontWeight: '700',

    color: '#2563EB',
  },

  description: {
    marginTop: 12,

    textAlign: 'center',

    fontSize: 13,

    lineHeight: 20,

    color: '#64748B',
  },

  /* ================= TRUST ================= */

  trustRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 24,
  },

  trustItem: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  trustIcon: {
    width: 30,
    height: 30,

    borderRadius: 10,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 6,

    shadowColor: '#1E3A8A',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 3,
  },

  trustText: {
    fontSize: 11,

    fontWeight: '700',

    color: '#475569',
  },

  divider: {
    width: 1,
    height: 25,

    backgroundColor: '#CBD5E1',

    marginHorizontal: 15,
  },

  /* ================= BOTTOM ================= */

  bottomContainer: {
    position: 'absolute',

    bottom: 35,

    alignItems: 'center',

    width: '100%',
  },

  loadingTrack: {
    width: 80,
    height: 4,

    borderRadius: 4,

    backgroundColor: '#DCE5FF',

    overflow: 'hidden',

    marginBottom: 12,
  },

  loadingBar: {
    width: 45,
    height: 4,

    borderRadius: 4,

    backgroundColor: '#2563EB',
  },

  bottomText: {
    fontSize: 10,

    color: '#94A3B8',

    fontWeight: '600',
  },

});