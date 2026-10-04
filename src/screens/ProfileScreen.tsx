import React, {useEffect, useRef, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  StatusBar,
  Image,
  Animated,
  Modal,
  Dimensions,
  Platform,
} from 'react-native';

import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Edit3,
  ShoppingBag,
  Heart,
  Settings,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Package,
  CreditCard,
  MapPin,
  X,
  CheckCircle,
} from 'lucide-react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation<any>();

  // =========================
  // ANIMATIONS
  // =========================

  const headerAnim = useRef(new Animated.Value(-20)).current;
  const profileAnim = useRef(new Animated.Value(20)).current;
  const profileOpacity = useRef(new Animated.Value(0)).current;

  const ordersAnim = useRef(new Animated.Value(20)).current;
  const favoritesAnim = useRef(new Animated.Value(20)).current;
  const personalAnim = useRef(new Animated.Value(20)).current;
  const addressAnim = useRef(new Animated.Value(20)).current;

  const notificationsAnim = useRef(new Animated.Value(20)).current;
  const settingsAnim = useRef(new Animated.Value(20)).current;
  const privacyAnim = useRef(new Animated.Value(20)).current;

  const contactAnim = useRef(new Animated.Value(20)).current;
  const logoutAnim = useRef(new Animated.Value(20)).current;

  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  // =========================
  // START ANIMATION
  // =========================

  useEffect(() => {
    Animated.parallel([
      Animated.spring(headerAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 18,
      }),

      Animated.timing(profileOpacity, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),

      Animated.spring(profileAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 16,
      }),

      Animated.spring(ordersAnim, {
        toValue: 0,
        delay: 80,
        useNativeDriver: true,
        damping: 16,
      }),

      Animated.spring(favoritesAnim, {
        toValue: 0,
        delay: 120,
        useNativeDriver: true,
        damping: 16,
      }),

      Animated.spring(personalAnim, {
        toValue: 0,
        delay: 160,
        useNativeDriver: true,
        damping: 16,
      }),

      Animated.spring(addressAnim, {
        toValue: 0,
        delay: 200,
        useNativeDriver: true,
        damping: 16,
      }),

      Animated.spring(notificationsAnim, {
        toValue: 0,
        delay: 240,
        useNativeDriver: true,
        damping: 16,
      }),

      Animated.spring(settingsAnim, {
        toValue: 0,
        delay: 280,
        useNativeDriver: true,
        damping: 16,
      }),

      Animated.spring(privacyAnim, {
        toValue: 0,
        delay: 320,
        useNativeDriver: true,
        damping: 16,
      }),

      Animated.spring(contactAnim, {
        toValue: 0,
        delay: 360,
        useNativeDriver: true,
        damping: 16,
      }),

      Animated.spring(logoutAnim, {
        toValue: 0,
        delay: 400,
        useNativeDriver: true,
        damping: 16,
      }),
    ]).start();
  }, []);

  // =========================
  // BACK
  // =========================

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  // =========================
  // NAVIGATION
  // =========================

  const goTo = (screenName: string) => {
    try {
      navigation.navigate(screenName);
    } catch (error) {
      console.log(`Navigation error: ${screenName}`, error);
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    setShowLogoutAlert(true);
  };

  const confirmLogout = () => {
    setShowLogoutAlert(false);

    setTimeout(() => {
      try {
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      } catch (error) {
        console.log('Logout error:', error);
        navigation.navigate('Login');
      }
    }, 150);
  };

  // =========================
  // OPTION CARD
  // =========================

  const renderOption = (
    icon: React.ReactNode,
    title: string,
    subtitle: string,
    iconBackground: string,
    onPress: () => void,
    animation: Animated.Value,
  ) => {
    return (
      <Animated.View
        style={{
          opacity: profileOpacity,
          transform: [{translateY: animation}],
        }}>
        <Pressable
          onPress={onPress}
          android_ripple={{color: '#E2E8F0'}}
          style={({pressed}) => [
            styles.optionCard,
            pressed && styles.optionPressed,
          ]}>
          <View style={styles.optionLeft}>
            <View
              style={[
                styles.optionIcon,
                {backgroundColor: iconBackground},
              ]}>
              {icon}
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>{title}</Text>

              <Text style={styles.optionSubtitle}>{subtitle}</Text>
            </View>
          </View>

          <View style={styles.chevronContainer}>
            <ChevronRight
              size={17}
              color="#64748B"
              strokeWidth={2.5}
            />
          </View>
        </Pressable>
      </Animated.View>
    );
  };

  // =========================
  // UI
  // =========================

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F9FF"
      />

      <View style={styles.screen}>

        {/* =====================================
            HEADER
        ===================================== */}

        <Animated.View
          style={[
            styles.header,
            {
              transform: [{translateY: headerAnim}],
            },
          ]}>

          {/* BACK BUTTON */}

          <Pressable
            onPress={handleBack}
            hitSlop={10}
            android_ripple={{color: '#E2E8F0'}}
            style={({pressed}) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}>
            <ArrowLeft
              size={22}
              color="#334155"
              strokeWidth={2.6}
            />
          </Pressable>

          {/* HEADER TITLE */}

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>
              Profile
            </Text>

            <Text style={styles.headerSubtitle}>
              Manage your account
            </Text>
          </View>

          {/* EDIT BUTTON */}

          <Pressable
            onPress={() => {
              console.log('Edit profile');
            }}
            style={({pressed}) => [
              styles.editButton,
              pressed && styles.editPressed,
            ]}>
            <Edit3
              size={19}
              color="#2563EB"
              strokeWidth={2.4}
            />
          </Pressable>
        </Animated.View>

        {/* =====================================
            CONTENT
        ===================================== */}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

          {/* =====================================
              PROFILE CARD
          ===================================== */}

          <Animated.View
            style={[
              styles.profileCard,
              {
                opacity: profileOpacity,
                transform: [{translateY: profileAnim}],
              },
            ]}>

            {/* TOP PROFILE */}

            <View style={styles.profileTop}>

              {/* PROFILE IMAGE */}

              <View style={styles.avatarWrapper}>
                <Image
                  source={{
                    uri:
                      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
                  }}
                  style={styles.avatarImage}
                />

                <View style={styles.onlineDot} />
              </View>

              {/* USER INFO */}

              <View style={styles.profileInfo}>
                <Text
                  style={styles.profileName}
                  numberOfLines={1}>
                  John William
                </Text>

                <View style={styles.infoRow}>
                  <Mail
                    size={13}
                    color="#64748B"
                  />

                  <Text
                    style={styles.infoText}
                    numberOfLines={1}>
                    johnwilliam@gmail.com
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Phone
                    size={13}
                    color="#64748B"
                  />

                  <Text style={styles.infoText}>
                    +91 98765 43210
                  </Text>
                </View>

                <View style={styles.profileLocation}>
                  <MapPin
                    size={12}
                    color="#2563EB"
                  />

                  <Text style={styles.locationText}>
                    Indore, India
                  </Text>
                </View>
              </View>
            </View>

            {/* STATS */}

            <View style={styles.statsContainer}>

              <View style={styles.statItem}>
                <Package
                  size={18}
                  color="#2563EB"
                />

                <View style={styles.statText}>
                  <Text style={styles.statNumber}>
                    12
                  </Text>

                  <Text style={styles.statLabel}>
                    Orders
                  </Text>
                </View>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <Heart
                  size={18}
                  color="#EF4444"
                />

                <View style={styles.statText}>
                  <Text style={styles.statNumber}>
                    08
                  </Text>

                  <Text style={styles.statLabel}>
                    Favorites
                  </Text>
                </View>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <CreditCard
                  size={18}
                  color="#7C3AED"
                />

                <View style={styles.statText}>
                  <Text style={styles.statNumber}>
                    05
                  </Text>

                  <Text style={styles.statLabel}>
                    Payments
                  </Text>
                </View>
              </View>

            </View>
          </Animated.View>

          {/* =====================================
              MY ACCOUNT
          ===================================== */}

          <Text style={styles.sectionTitle}>
            My Account
          </Text>

          {renderOption(
            <ShoppingBag size={20} color="#2563EB" />,
            'My Orders',
            'View your orders and purchases',
            '#EAF1FF',
            () => goTo('Orders'),
            ordersAnim,
          )}

          {renderOption(
            <Heart size={20} color="#EF4444" />,
            'Favorites',
            'View your favorite products',
            '#FFF1F2',
            () => goTo('Favorites'),
            favoritesAnim,
          )}

          {renderOption(
            <User size={20} color="#7C3AED" />,
            'Personal Information',
            'Manage your profile information',
            '#F5F3FF',
            () => goTo('PersonalInformation'),
            personalAnim,
          )}

          {renderOption(
            <MapPin size={20} color="#F59E0B" />,
            'Saved Addresses',
            'Manage your delivery addresses',
            '#FFFBEB',
            () => goTo('Addresses'),
            addressAnim,
          )}

          {/* =====================================
              SETTINGS
          ===================================== */}

          <Text style={styles.sectionTitle}>
            Settings
          </Text>

          {renderOption(
            <Bell size={20} color="#2563EB" />,
            'Notifications',
            'Manage notification preferences',
            '#EAF1FF',
            () => goTo('Notifications'),
            notificationsAnim,
          )}

          {renderOption(
            <Settings size={20} color="#64748B" />,
            'Settings',
            'Manage application settings',
            '#F1F5F9',
            () => goTo('Settings'),
            settingsAnim,
          )}

          {renderOption(
            <Shield size={20} color="#16A34A" />,
            'Privacy & Security',
            'Manage privacy and security',
            '#F0FDF4',
            () => goTo('PrivacySecurity'),
            privacyAnim,
          )}

          {/* =====================================
              CONTACT
          ===================================== */}

          <Text style={styles.sectionTitle}>
            Contact Information
          </Text>

          <Animated.View
            style={{
              opacity: profileOpacity,
              transform: [{translateY: contactAnim}],
            }}>

            <View style={styles.contactCard}>

              <View style={styles.contactItem}>
                <View
                  style={[
                    styles.contactIcon,
                    {backgroundColor: '#EAF1FF'},
                  ]}>
                  <Mail
                    size={18}
                    color="#2563EB"
                  />
                </View>

                <View style={styles.contactText}>
                  <Text style={styles.contactLabel}>
                    Email Address
                  </Text>

                  <Text
                    style={styles.contactValue}
                    numberOfLines={1}>
                    johnwilliam@gmail.com
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.contactItem}>
                <View
                  style={[
                    styles.contactIcon,
                    {backgroundColor: '#F0FDF4'},
                  ]}>
                  <Phone
                    size={18}
                    color="#16A34A"
                  />
                </View>

                <View style={styles.contactText}>
                  <Text style={styles.contactLabel}>
                    Phone Number
                  </Text>

                  <Text style={styles.contactValue}>
                    +91 98765 43210
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* =====================================
              LOGOUT
          ===================================== */}

          <Animated.View
            style={{
              opacity: profileOpacity,
              transform: [{translateY: logoutAnim}],
            }}>

            <Pressable
              onPress={handleLogout}
              android_ripple={{color: '#FECACA'}}
              style={({pressed}) => [
                styles.logoutButton,
                pressed && styles.logoutPressed,
              ]}>

              <View style={styles.logoutIcon}>
                <LogOut
                  size={20}
                  color="#EF4444"
                  strokeWidth={2.5}
                />
              </View>

              <View style={styles.logoutContent}>
                <Text style={styles.logoutTitle}>
                  Logout
                </Text>

                <Text style={styles.logoutSubtitle}>
                  Sign out from your account
                </Text>
              </View>

              <ChevronRight
                size={18}
                color="#EF4444"
              />
            </Pressable>
          </Animated.View>

          <Text style={styles.version}>
            ShopEase • Version 1.0.0
          </Text>

          <Text style={styles.bottomText}>
            Your shopping journey starts here ✨
          </Text>
        </ScrollView>
      </View>

      {/* =====================================
          LOGOUT MODAL
      ===================================== */}

      <Modal
        visible={showLogoutAlert}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() =>
          setShowLogoutAlert(false)
        }>

        <View style={styles.modalOverlay}>

          <View style={styles.alertBox}>

            <Pressable
              onPress={() =>
                setShowLogoutAlert(false)
              }
              hitSlop={10}
              style={styles.closeAlertButton}>
              <X
                size={18}
                color="#64748B"
              />
            </Pressable>

            <View style={styles.alertIconCircle}>
              <LogOut
                size={30}
                color="#EF4444"
                strokeWidth={2.5}
              />
            </View>

            <Text style={styles.alertTitle}>
              Logout?
            </Text>

            <Text style={styles.alertMessage}>
              Are you sure you want to logout
              from your account?
            </Text>

            <View style={styles.alertButtons}>

              <Pressable
                onPress={() =>
                  setShowLogoutAlert(false)
                }
                style={({pressed}) => [
                  styles.cancelButton,
                  pressed && styles.cancelPressed,
                ]}>
                <Text style={styles.cancelButtonText}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                onPress={confirmLogout}
                style={({pressed}) => [
                  styles.confirmButton,
                  pressed && styles.confirmPressed,
                ]}>

                <CheckCircle
                  size={18}
                  color="#FFFFFF"
                />

                <Text style={styles.confirmButtonText}>
                  Logout
                </Text>
              </Pressable>

            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F9FF',
  },

  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // ===================================================
  // HEADER
  // ===================================================

  header: {
    minHeight: 76,
    backgroundColor: '#F7F9FF',

    paddingHorizontal: 18,
    paddingVertical: 10,

    flexDirection: 'row',
    alignItems: 'center',

    borderBottomWidth: 1,
    borderBottomColor: '#EDF1F8',
  },

  backButton: {
    width: 44,
    height: 44,

    borderRadius: 14,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#E8EDFF',

    elevation: 2,
  },

  backButtonPressed: {
    backgroundColor: '#EAF1FF',

    transform: [
      {
        scale: 0.94,
      },
    ],
  },

  headerTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },

  headerTitle: {
    fontSize: 19,
    color: '#111827',
    fontWeight: '900',
  },

  headerSubtitle: {
    marginTop: 2,
    fontSize: 9,
    color: '#94A3B8',
    fontWeight: '600',
  },

  editButton: {
    width: 44,
    height: 44,

    borderRadius: 14,

    backgroundColor: '#EAF1FF',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#D9E6FF',

    elevation: 2,
  },

  editPressed: {
    backgroundColor: '#DCE8FF',

    transform: [
      {
        scale: 0.94,
      },
    ],
  },

  // ===================================================
  // SCROLL
  // ===================================================

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 35,
  },

  // ===================================================
  // PROFILE CARD
  // ===================================================

  profileCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 22,

    padding: 16,

    borderWidth: 1,
    borderColor: '#E8EDFF',

    elevation: 3,

    shadowColor: '#1E3A8A',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },

  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatarWrapper: {
    width: 76,
    height: 76,
    position: 'relative',
  },

  avatarImage: {
    width: 76,
    height: 76,

    borderRadius: 20,

    borderWidth: 3,
    borderColor: '#EAF1FF',
  },

  onlineDot: {
    position: 'absolute',

    right: -2,
    bottom: -2,

    width: 16,
    height: 16,

    borderRadius: 8,

    backgroundColor: '#22C55E',

    borderWidth: 3,
    borderColor: '#FFFFFF',
  },

  profileInfo: {
    flex: 1,
    marginLeft: 14,
    minWidth: 0,
  },

  profileName: {
    fontSize: 19,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 5,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  infoText: {
    flex: 1,

    marginLeft: 6,

    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },

  profileLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  locationText: {
    marginLeft: 4,
    fontSize: 9,
    color: '#64748B',
    fontWeight: '600',
  },

  // ===================================================
  // STATS
  // ===================================================

  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 17,
    paddingTop: 14,

    borderTopWidth: 1,
    borderTopColor: '#EEF2F7',
  },

  statItem: {
    flex: 1,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  statText: {
    marginLeft: 6,
  },

  statNumber: {
    fontSize: 14,
    fontWeight: '900',
    color: '#111827',
  },

  statLabel: {
    marginTop: 1,
    fontSize: 8.5,
    color: '#94A3B8',
    fontWeight: '600',
  },

  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#E2E8F0',
  },

  // ===================================================
  // SECTION
  // ===================================================

  sectionTitle: {
    marginTop: 22,
    marginBottom: 9,

    fontSize: 14,
    fontWeight: '900',
    color: '#111827',
  },

  // ===================================================
  // OPTION
  // ===================================================

  optionCard: {
    minHeight: 68,

    width: '100%',

    backgroundColor: '#FFFFFF',

    borderRadius: 17,

    marginBottom: 8,

    paddingHorizontal: 12,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderWidth: 1,
    borderColor: '#EEF2F7',

    elevation: 2,

    overflow: 'hidden',
  },

  optionPressed: {
    backgroundColor: '#F8FAFC',

    transform: [
      {
        scale: 0.985,
      },
    ],
  },

  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  optionIcon: {
    width: 43,
    height: 43,

    borderRadius: 13,

    alignItems: 'center',
    justifyContent: 'center',
  },

  optionContent: {
    flex: 1,
    marginLeft: 11,
  },

  optionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
  },

  optionSubtitle: {
    marginTop: 3,
    fontSize: 9,
    color: '#94A3B8',
    fontWeight: '500',
  },

  chevronContainer: {
    width: 30,
    height: 30,

    borderRadius: 10,

    backgroundColor: '#F7F9FF',

    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: 8,
  },

  // ===================================================
  // CONTACT
  // ===================================================

  contactCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 18,

    borderWidth: 1,
    borderColor: '#EEF2F7',

    paddingHorizontal: 13,

    elevation: 2,
  },

  contactItem: {
    minHeight: 67,

    flexDirection: 'row',
    alignItems: 'center',
  },

  contactIcon: {
    width: 41,
    height: 41,

    borderRadius: 13,

    alignItems: 'center',
    justifyContent: 'center',
  },

  contactText: {
    flex: 1,
    marginLeft: 11,
  },

  contactLabel: {
    fontSize: 9.5,
    color: '#94A3B8',
    fontWeight: '600',
  },

  contactValue: {
    marginTop: 4,
    fontSize: 11.5,
    color: '#111827',
    fontWeight: '800',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEF2F7',
    marginLeft: 52,
  },

  // ===================================================
  // LOGOUT
  // ===================================================

  logoutButton: {
    minHeight: 66,

    width: '100%',

    borderRadius: 18,

    backgroundColor: '#FFF5F5',

    borderWidth: 1,
    borderColor: '#FECACA',

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 12,

    marginTop: 22,

    elevation: 2,

    overflow: 'hidden',
  },

  logoutPressed: {
    backgroundColor: '#FEE2E2',

    transform: [
      {
        scale: 0.985,
      },
    ],
  },

  logoutIcon: {
    width: 42,
    height: 42,

    borderRadius: 13,

    backgroundColor: '#FEE2E2',

    alignItems: 'center',
    justifyContent: 'center',
  },

  logoutContent: {
    flex: 1,
    marginLeft: 11,
  },

  logoutTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#EF4444',
  },

  logoutSubtitle: {
    marginTop: 3,
    fontSize: 9,
    color: '#F87171',
  },

  version: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 9.5,
    color: '#94A3B8',
  },

  bottomText: {
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 8,
    fontSize: 9.5,
    color: '#CBD5E1',
  },

  // ===================================================
  // MODAL
  // ===================================================

  modalOverlay: {
    flex: 1,

    backgroundColor: 'rgba(15, 23, 42, 0.60)',

    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 20,
  },

  alertBox: {
    width: Math.min(width - 40, 360),

    backgroundColor: '#FFFFFF',

    borderRadius: 26,

    paddingHorizontal: 22,
    paddingVertical: 25,

    alignItems: 'center',

    elevation: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },

  closeAlertButton: {
    position: 'absolute',

    right: 15,
    top: 15,

    width: 32,
    height: 32,

    borderRadius: 16,

    backgroundColor: '#F1F5F9',

    alignItems: 'center',
    justifyContent: 'center',
  },

  alertIconCircle: {
    width: 72,
    height: 72,

    borderRadius: 36,

    backgroundColor: '#FFF1F2',

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 5,
    marginBottom: 15,

    borderWidth: 1,
    borderColor: '#FFE4E6',
  },

  alertTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111827',
  },

  alertMessage: {
    marginTop: 8,

    fontSize: 13,
    lineHeight: 20,

    color: '#64748B',

    textAlign: 'center',

    paddingHorizontal: 10,
  },

  alertButtons: {
    flexDirection: 'row',

    width: '100%',

    marginTop: 23,

    gap: 10,
  },

  cancelButton: {
    flex: 1,

    height: 48,

    borderRadius: 14,

    backgroundColor: '#F1F5F9',

    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelPressed: {
    backgroundColor: '#E2E8F0',
  },

  cancelButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#475569',
  },

  confirmButton: {
    flex: 1,

    height: 48,

    borderRadius: 14,

    backgroundColor: '#EF4444',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 7,

    elevation: 3,
  },

  confirmPressed: {
    backgroundColor: '#DC2626',

    transform: [
      {
        scale: 0.97,
      },
    ],
  },

  confirmButtonText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#FFFFFF',
  },
});