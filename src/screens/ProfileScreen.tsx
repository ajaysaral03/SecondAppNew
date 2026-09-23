import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  SafeAreaView,
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
} from 'lucide-react-native';

import Footer from '../components/Footer';

interface ProfileScreenProps {
  navigation?: any;
  cartCount?: number;

  onBackPress?: () => void;

  onHomePress?: () => void;
  onProductsPress?: () => void;
  onFavoritesPress?: () => void;
  onCartPress?: () => void;
  onProfilePress?: () => void;
}

const ProfileScreen = ({
  navigation,
  cartCount = 0,

  onBackPress,

  onHomePress,
  onProductsPress,
  onFavoritesPress,
  onCartPress,
  onProfilePress,
}: ProfileScreenProps) => {

  // =====================================================
  // BACK BUTTON
  // =====================================================

  const handleBack = () => {
    // Parent callback available hai to wahi use karo
    if (typeof onBackPress === 'function') {
      onBackPress();
      return;
    }

    // React Navigation available hai
    if (navigation) {
      try {
        if (
          typeof navigation.canGoBack === 'function' &&
          navigation.canGoBack()
        ) {
          navigation.goBack();
          return;
        }

        // Agar previous screen nahi hai
        if (typeof navigation.navigate === 'function') {
          navigation.navigate('Home');
          return;
        }
      } catch (error) {
        console.log('Back Button Error:', error);
      }
    }

    console.log('Navigation object not available');
  };

  // =====================================================
  // HOME
  // =====================================================

  const handleHome = () => {
    if (typeof onHomePress === 'function') {
      onHomePress();
      return;
    }

    if (navigation?.navigate) {
      navigation.navigate('Home');
    }
  };

  // =====================================================
  // PRODUCTS
  // =====================================================

  const handleProducts = () => {
    if (typeof onProductsPress === 'function') {
      onProductsPress();
      return;
    }

    if (navigation?.navigate) {
      navigation.navigate('Products');
    }
  };

  // =====================================================
  // FAVORITES
  // =====================================================

  const handleFavorites = () => {
    if (typeof onFavoritesPress === 'function') {
      onFavoritesPress();
      return;
    }

    if (navigation?.navigate) {
      navigation.navigate('Favorites');
    }
  };

  // =====================================================
  // CART
  // =====================================================

  const handleCart = () => {
    if (typeof onCartPress === 'function') {
      onCartPress();
      return;
    }

    if (navigation?.navigate) {
      navigation.navigate('Cart');
    }
  };

  // =====================================================
  // PROFILE
  // =====================================================

  const handleProfile = () => {
    if (typeof onProfilePress === 'function') {
      onProfilePress();
      return;
    }

    if (navigation?.navigate) {
      navigation.navigate('Profile');
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            console.log('User logged out');
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  // =====================================================
  // OPTION CARD
  // =====================================================

  const renderOption = (
    icon: React.ReactNode,
    title: string,
    subtitle: string,
    iconBackground: string,
    onPress?: () => void,
  ) => {
    return (
      <TouchableOpacity
        style={styles.optionCard}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View style={styles.optionLeft}>

          <View
            style={[
              styles.optionIcon,
              {
                backgroundColor: iconBackground,
              },
            ]}
          >
            {icon}
          </View>

          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>
              {title}
            </Text>

            <Text style={styles.optionSubtitle}>
              {subtitle}
            </Text>
          </View>

        </View>

        <View style={styles.chevronContainer}>
          <ChevronRight
            size={18}
            color="#64748B"
            strokeWidth={2.3}
          />
        </View>
      </TouchableOpacity>
    );
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
        translucent={false}
      />

      <View style={styles.screen}>

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <View style={styles.headerWrapper}>

          <View style={styles.header}>

            {/* BACK BUTTON */}

            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.7}
              onPress={handleBack}
              hitSlop={{
                top: 12,
                bottom: 12,
                left: 12,
                right: 12,
              }}
            >
              <ArrowLeft
                size={24}
                color="#0F172A"
                strokeWidth={2.7}
              />
            </TouchableOpacity>

            {/* TITLE */}

            <View style={styles.headerTitleContainer}>

              <Text style={styles.headerTitle}>
                Profile
              </Text>

              <Text style={styles.headerSubtitle}>
                Manage your account
              </Text>

            </View>

            {/* EDIT */}

            <TouchableOpacity
              style={styles.editButton}
              activeOpacity={0.7}
              onPress={() => {
                console.log('Edit profile');
              }}
            >
              <Edit3
                size={18}
                color="#2563EB"
                strokeWidth={2.3}
              />
            </TouchableOpacity>

          </View>

        </View>

        {/* ================================================= */}
        {/* CONTENT */}
        {/* ================================================= */}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* ================================================= */}
          {/* PROFILE CARD */}
          {/* ================================================= */}

          <View style={styles.profileCard}>

            <View style={styles.profileTop}>

              <View style={styles.avatarWrapper}>

                <View style={styles.avatar}>
                  <User
                    size={38}
                    color="#2563EB"
                    strokeWidth={2.2}
                  />
                </View>

                <View style={styles.onlineDot} />

              </View>

              <View style={styles.profileInfo}>

                <Text
                  style={styles.profileName}
                  numberOfLines={1}
                >
                  John William
                </Text>

                <View style={styles.infoRow}>

                  <Mail
                    size={13}
                    color="#64748B"
                    strokeWidth={2}
                  />

                  <Text
                    style={styles.infoText}
                    numberOfLines={1}
                  >
                    johnwilliam@gmail.com
                  </Text>

                </View>

                <View style={styles.infoRow}>

                  <Phone
                    size={13}
                    color="#64748B"
                    strokeWidth={2}
                  />

                  <Text style={styles.infoText}>
                    +91 98765 43210
                  </Text>

                </View>

              </View>

            </View>

            {/* ================================================= */}
            {/* STATS */}
            {/* ================================================= */}

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

          </View>

          {/* ================================================= */}
          {/* MY ACCOUNT */}
          {/* ================================================= */}

          <Text style={styles.sectionTitle}>
            My Account
          </Text>

          {renderOption(
            <ShoppingBag
              size={20}
              color="#2563EB"
            />,
            'My Orders',
            'View your orders and purchases',
            '#EEF4FF',
            () => navigation?.navigate?.('Orders'),
          )}

          {renderOption(
            <Heart
              size={20}
              color="#EF4444"
            />,
            'Favorites',
            'View your favorite products',
            '#FFF1F2',
            handleFavorites,
          )}

          {renderOption(
            <User
              size={20}
              color="#7C3AED"
            />,
            'Personal Information',
            'Manage your profile information',
            '#F5F3FF',
            () =>
              navigation?.navigate?.(
                'PersonalInformation',
              ),
          )}

          {renderOption(
            <MapPin
              size={20}
              color="#F59E0B"
            />,
            'Saved Addresses',
            'Manage your delivery addresses',
            '#FFFBEB',
            () =>
              navigation?.navigate?.('Addresses'),
          )}

          {/* ================================================= */}
          {/* SETTINGS */}
          {/* ================================================= */}

          <Text style={styles.sectionTitle}>
            Settings
          </Text>

          {renderOption(
            <Bell
              size={20}
              color="#2563EB"
            />,
            'Notifications',
            'Manage notification preferences',
            '#EEF4FF',
            () =>
              navigation?.navigate?.(
                'Notifications',
              ),
          )}

          {renderOption(
            <Settings
              size={20}
              color="#64748B"
            />,
            'Settings',
            'Manage application settings',
            '#F1F5F9',
            () =>
              navigation?.navigate?.('Settings'),
          )}

          {renderOption(
            <Shield
              size={20}
              color="#16A34A"
            />,
            'Privacy & Security',
            'Manage privacy and security',
            '#F0FDF4',
            () =>
              navigation?.navigate?.(
                'PrivacySecurity',
              ),
          )}

          {/* ================================================= */}
          {/* CONTACT */}
          {/* ================================================= */}

          <Text style={styles.sectionTitle}>
            Contact Information
          </Text>

          <View style={styles.contactCard}>

            <View style={styles.contactItem}>

              <View
                style={[
                  styles.contactIcon,
                  {
                    backgroundColor: '#EEF4FF',
                  },
                ]}
              >
                <Mail
                  size={18}
                  color="#2563EB"
                  strokeWidth={2.2}
                />
              </View>

              <View style={styles.contactText}>

                <Text style={styles.contactLabel}>
                  Email Address
                </Text>

                <Text
                  style={styles.contactValue}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  johnwilliam@gmail.com
                </Text>

              </View>

            </View>

            <View style={styles.divider} />

            <View style={styles.contactItem}>

              <View
                style={[
                  styles.contactIcon,
                  {
                    backgroundColor: '#F0FDF4',
                  },
                ]}
              >
                <Phone
                  size={18}
                  color="#16A34A"
                  strokeWidth={2.2}
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

          {/* ================================================= */}
          {/* LOGOUT */}
          {/* ================================================= */}

          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.7}
            onPress={handleLogout}
          >

            <View style={styles.logoutIcon}>

              <LogOut
                size={19}
                color="#EF4444"
                strokeWidth={2.4}
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

          </TouchableOpacity>

          <Text style={styles.version}>
            ShopEase • Version 1.0.0
          </Text>

          <Text style={styles.bottomText}>
            Your shopping journey starts here ✨
          </Text>

        </ScrollView>

        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        <View style={styles.footerContainer}>

          <Footer
            activeTab="profile"
            cartCount={cartCount}
            onHomePress={handleHome}
            onProductsPress={handleProducts}
            onFavoritesPress={handleFavorites}
            onCartPress={handleCart}
            onProfilePress={handleProfile}
          />

        </View>

      </View>

    </SafeAreaView>
  );
};

export default ProfileScreen;

// =========================================================
// STYLES
// =========================================================

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // =======================================================
  // HEADER
  // =======================================================

  headerWrapper: {
    backgroundColor: '#FFFFFF',

    paddingHorizontal: 16,

    paddingTop:
      Platform.OS === 'android'
        ? 10
        : 5,

    paddingBottom: 12,

    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',

    elevation: 4,

    zIndex: 100,
  },

  header: {
    minHeight: 58,
     marginTop:30,
    flexDirection: 'row',

    alignItems: 'center',
  },

  backButton: {
    width: 45,
    height: 45,

    borderRadius: 13,

    backgroundColor: '#F1F5F9',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#E2E8F0',

    elevation: 3,

    zIndex: 999,
  },

  headerTitleContainer: {
    flex: 1,

    marginLeft: 13,
  },

  headerTitle: {
    fontSize: 21,

    fontWeight: '900',

    color: '#0F172A',
  },

  headerSubtitle: {
    marginTop: 2,

    fontSize: 10,

    color: '#94A3B8',

    fontWeight: '600',
  },

  editButton: {
    width: 45,
    height: 45,

    borderRadius: 13,

    backgroundColor: '#EEF4FF',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#DCE8FF',

    elevation: 2,
  },

  // =======================================================
  // SCROLL
  // =======================================================

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,

    paddingTop: 20,

    // Footer ke niche content hide nahi hoga
    paddingBottom: 150,
  },

  // =======================================================
  // PROFILE
  // =======================================================

  profileCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 22,

    padding: 17,

    borderWidth: 1,
    borderColor: '#E8EDFF',

    elevation: 4,

    shadowColor: '#1E3A8A',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.08,

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

  avatar: {
    width: 76,
    height: 76,

    borderRadius: 38,

    backgroundColor: '#EAF1FF',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 4,
    borderColor: '#F8FAFF',
  },

  onlineDot: {
    position: 'absolute',

    right: 0,
    bottom: 1,

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

    color: '#0F172A',

    marginBottom: 6,
  },

  infoRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 4,

    minWidth: 0,
  },

  infoText: {
    flex: 1,

    marginLeft: 6,

    fontSize: 10.5,

    color: '#64748B',

    fontWeight: '500',
  },

  // =======================================================
  // STATS
  // =======================================================

  statsContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 18,

    paddingTop: 15,

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

    color: '#0F172A',
  },

  statLabel: {
    marginTop: 1,

    fontSize: 8.5,

    color: '#94A3B8',
  },

  statDivider: {
    width: 1,

    height: 30,

    backgroundColor: '#E2E8F0',
  },

  // =======================================================
  // SECTION
  // =======================================================

  sectionTitle: {
    marginTop: 23,

    marginBottom: 10,

    fontSize: 15,

    fontWeight: '900',

    color: '#0F172A',
  },

  // =======================================================
  // OPTION
  // =======================================================

  optionCard: {
    minHeight: 68,

    width: '100%',

    backgroundColor: '#FFFFFF',

    borderRadius: 17,

    marginBottom: 9,

    paddingHorizontal: 13,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    borderWidth: 1,

    borderColor: '#EEF2F7',

    elevation: 2,

    overflow: 'hidden',
  },

  optionLeft: {
    flexDirection: 'row',

    alignItems: 'center',

    flex: 1,

    minWidth: 0,
  },

  optionIcon: {
    width: 43,
    height: 43,

    borderRadius: 13,

    alignItems: 'center',
    justifyContent: 'center',

    flexShrink: 0,
  },

  optionContent: {
    flex: 1,

    marginLeft: 12,

    minWidth: 0,
  },

  optionTitle: {
    fontSize: 13,

    fontWeight: '800',

    color: '#0F172A',
  },

  optionSubtitle: {
    marginTop: 3,

    fontSize: 9.5,

    color: '#94A3B8',

    fontWeight: '500',
  },

  chevronContainer: {
    width: 30,
    height: 30,

    borderRadius: 10,

    backgroundColor: '#F8FAFC',

    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: 8,
  },

  // =======================================================
  // CONTACT
  // =======================================================

  contactCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 18,

    borderWidth: 1,

    borderColor: '#EEF2F7',

    paddingHorizontal: 14,

    elevation: 2,
  },

  contactItem: {
    minHeight: 70,

    flexDirection: 'row',

    alignItems: 'center',
  },

  contactIcon: {
    width: 42,
    height: 42,

    borderRadius: 13,

    alignItems: 'center',
    justifyContent: 'center',
  },

  contactText: {
    flex: 1,

    marginLeft: 12,

    minWidth: 0,
  },

  contactLabel: {
    fontSize: 10,

    color: '#94A3B8',

    fontWeight: '600',
  },

  contactValue: {
    marginTop: 4,

    fontSize: 12,

    color: '#0F172A',

    fontWeight: '800',
  },

  divider: {
    height: 1,

    backgroundColor: '#EEF2F7',

    marginLeft: 54,
  },

  // =======================================================
  // LOGOUT
  // =======================================================

  logoutButton: {
    minHeight: 64,

    width: '100%',

    borderRadius: 18,

    backgroundColor: '#FFF5F5',

    borderWidth: 1,

    borderColor: '#FECACA',

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 13,

    marginTop: 23,
  },

  logoutIcon: {
    width: 40,
    height: 40,

    borderRadius: 12,

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

    marginTop: 18,

    fontSize: 10,

    color: '#94A3B8',
  },

  bottomText: {
    textAlign: 'center',

    marginTop: 7,

    fontSize: 10,

    color: '#CBD5E1',

    marginBottom: 10,
  },

  // =======================================================
  // FOOTER
  // =======================================================

  footerContainer: {
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: '#FFFFFF',

    borderTopWidth: 1,

    borderTopColor: '#E5E7EB',

    elevation: 15,

    zIndex: 999,
  },
});