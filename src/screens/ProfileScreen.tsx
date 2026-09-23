import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
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
} from 'lucide-react-native';

import Footer from '../components/Footer';

interface ProfileScreenProps {
  navigation?: any;
  cartCount?: number;

  onHomePress?: () => void;
  onProductsPress?: () => void;
  onFavoritesPress?: () => void;
  onCartPress?: () => void;
  onProfilePress?: () => void;
}

const ProfileScreen = ({
  navigation,
  cartCount = 0,

  onHomePress,
  onProductsPress,
  onFavoritesPress,
  onCartPress,
  onProfilePress,
}: ProfileScreenProps) => {

  /* ================================================= */
  /* ================= BACK BUTTON =================== */
  /* ================================================= */

const handleBack = () => {
  if (navigation && navigation.canGoBack()) {
    navigation.goBack();
  }
};

  /* ================================================= */
  /* ================= LOGOUT ======================== */
  /* ================================================= */

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
            // Add logout logic here
          },
        },
      ],
    );
  };

  /* ================================================= */
  /* ================= OPTION ========================= */
  /* ================================================= */

  const renderOption = (
    icon: React.ReactNode,
    title: string,
    subtitle: string,
    onPress?: () => void,
  ) => {
    return (
      <TouchableOpacity
        style={styles.optionCard}
        activeOpacity={0.75}
        onPress={onPress}
      >
        <View style={styles.optionLeft}>

          <View style={styles.optionIcon}>
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

        <ChevronRight
          size={19}
          color="#94A3B8"
          strokeWidth={2.2}
        />

      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>

      {/* ================================================= */}
      {/* ================= STATUS BAR =================== */}
      {/* ================================================= */}

      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
        translucent={false}
      />

      {/* ================================================= */}
      {/* ================= HEADER ======================= */}
      {/* ================================================= */}

      <View style={styles.headerWrapper}>

        <View style={styles.header}>

          <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.7}
        onPress={handleBack}
      >
        <ArrowLeft
          size={22}
          color="#0F172A"
          strokeWidth={2.5}
        />
      </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Profile
          </Text>

          <View style={styles.headerSpacer} />

        </View>

      </View>

      {/* ================================================= */}
      {/* ================= CONTENT ====================== */}
      {/* ================================================= */}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ================================================= */}
        {/* ================= PROFILE CARD ================= */}
        {/* ================================================= */}

        <View style={styles.profileCard}>

          <View style={styles.avatarContainer}>
            <User
              size={40}
              color="#2563EB"
              strokeWidth={2}
            />
          </View>

          <View style={styles.profileInfo}>

            <Text style={styles.profileName}>
              John William
            </Text>

            <Text style={styles.profileEmail}>
              johnwilliam@gmail.com
            </Text>

            <View style={styles.phoneRow}>

              <Phone
                size={13}
                color="#64748B"
                strokeWidth={2}
              />

              <Text style={styles.profilePhone}>
                +91 98765 43210
              </Text>

            </View>

          </View>

          <TouchableOpacity
            style={styles.editButton}
            activeOpacity={0.7}
          >
            <Edit3
              size={17}
              color="#2563EB"
              strokeWidth={2.2}
            />
          </TouchableOpacity>

        </View>

        {/* ================================================= */}
        {/* ================= ACCOUNT ====================== */}
        {/* ================================================= */}

        <Text style={styles.sectionTitle}>
          My Account
        </Text>

        {renderOption(
          <ShoppingBag
            size={20}
            color="#2563EB"
            strokeWidth={2.2}
          />,
          'My Orders',
          'View your orders and purchases',
        )}

        {renderOption(
          <Heart
            size={20}
            color="#EF4444"
            strokeWidth={2.2}
          />,
          'Favorites',
          'View your favorite products',
        )}

        {renderOption(
          <User
            size={20}
            color="#2563EB"
            strokeWidth={2.2}
          />,
          'Personal Information',
          'Manage your profile information',
        )}

        {/* ================================================= */}
        {/* ================= SETTINGS ===================== */}
        {/* ================================================= */}

        <Text style={styles.sectionTitle}>
          Settings
        </Text>

        {renderOption(
          <Bell
            size={20}
            color="#2563EB"
            strokeWidth={2.2}
          />,
          'Notifications',
          'Manage notification preferences',
        )}

        {renderOption(
          <Settings
            size={20}
            color="#2563EB"
            strokeWidth={2.2}
          />,
          'Settings',
          'Manage application settings',
        )}

        {renderOption(
          <Shield
            size={20}
            color="#2563EB"
            strokeWidth={2.2}
          />,
          'Privacy & Security',
          'Manage privacy and security',
        )}

        {/* ================================================= */}
        {/* ================= CONTACT ====================== */}
        {/* ================================================= */}

        <Text style={styles.sectionTitle}>
          Contact Information
        </Text>

        <View style={styles.contactCard}>

          <View style={styles.contactItem}>

            <View style={styles.contactIcon}>
              <Mail
                size={18}
                color="#2563EB"
              />
            </View>

            <View style={styles.contactText}>
              <Text style={styles.contactLabel}>
                Email
              </Text>

              <Text style={styles.contactValue}>
                johnwilliam@gmail.com
              </Text>
            </View>

          </View>

          <View style={styles.divider} />

          <View style={styles.contactItem}>

            <View style={styles.contactIcon}>
              <Phone
                size={18}
                color="#2563EB"
              />
            </View>

            <View style={styles.contactText}>
              <Text style={styles.contactLabel}>
                Phone
              </Text>

              <Text style={styles.contactValue}>
                +91 98765 43210
              </Text>
            </View>

          </View>

        </View>

        {/* ================================================= */}
        {/* ================= LOGOUT ======================= */}
        {/* ================================================= */}

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.75}
          onPress={handleLogout}
        >

          <LogOut
            size={19}
            color="#EF4444"
            strokeWidth={2.4}
          />

          <Text style={styles.logoutText}>
            Logout
          </Text>

        </TouchableOpacity>

        <Text style={styles.version}>
          Version 1.0.0
        </Text>

      </ScrollView>

      {/* ================================================= */}
      {/* ================= FOOTER ======================== */}
      {/* ================================================= */}

     <Footer
        activeTab="profile"
        cartCount={cartCount}
        onHomePress={() => navigation.navigate('Home')}
        onProductsPress={() => navigation.navigate('Products')}
        onFavoritesPress={() => navigation.navigate('Favorites')}
        onCartPress={() => navigation.navigate('Cart')}
        onProfilePress={() => navigation.navigate('Profile')}
      />

    </View>
  );
};

export default ProfileScreen;


/* ================================================= */
/* ===================== STYLES ==================== */
/* ================================================= */

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  /* ================= HEADER ================= */

  headerWrapper: {
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EDF5',

  },

  header: {
    height: 58,
    marginTop:20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },

  headerSpacer: {
    width: 42,
  },

  /* ================= SCROLL ================= */

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 110,
  },

  /* ================= PROFILE CARD ================= */

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#E8EDFF',

    elevation: 3,

    shadowColor: '#0F172A',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 7,
  },

  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileInfo: {
    flex: 1,
    marginLeft: 13,
  },

  profileName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },

  profileEmail: {
    marginTop: 4,
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },

  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  profilePhone: {
    marginLeft: 5,
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },

  editButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ================= SECTION ================= */

  sectionTitle: {
    marginTop: 22,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },

  /* ================= OPTION ================= */

  optionCard: {
    minHeight: 66,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,

    marginBottom: 9,

    paddingHorizontal: 13,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderWidth: 1,
    borderColor: '#EEF2F7',
  },

  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  optionIcon: {
    width: 41,
    height: 41,
    borderRadius: 12,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionContent: {
    flex: 1,
    marginLeft: 12,
  },

  optionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },

  optionSubtitle: {
    marginTop: 3,
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
  },

  /* ================= CONTACT ================= */

  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,

    borderWidth: 1,
    borderColor: '#EEF2F7',

    paddingHorizontal: 14,
  },

  contactItem: {
    minHeight: 65,
    flexDirection: 'row',
    alignItems: 'center',
  },

  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contactText: {
    marginLeft: 12,
  },

  contactLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
  },

  contactValue: {
    marginTop: 3,
    fontSize: 12,
    color: '#0F172A',
    fontWeight: '700',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEF2F7',
    marginLeft: 52,
  },

  /* ================= LOGOUT ================= */

  logoutButton: {
    height: 53,
    borderRadius: 16,

    backgroundColor: '#FFF1F2',

    borderWidth: 1,
    borderColor: '#FECACA',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 22,
  },

  logoutText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '800',
    color: '#EF4444',
  },

  /* ================= VERSION ================= */

  version: {
    textAlign: 'center',
    marginTop: 14,
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
  },

});