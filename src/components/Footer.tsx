import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  Home,
  ShoppingBag,
  Heart,
  ShoppingCart,
  User,
} from 'lucide-react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import type {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import type {
  RootStackParamList,
} from '../navigation/AppNavigator';

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

interface FooterProps {
  activeTab?: 'home' | 'products' | 'favorites' | 'cart' | 'profile';
  cartCount?: number;
}

const Footer = ({
  activeTab = 'home',
  cartCount = 0,
}: FooterProps) => {

  const navigation = useNavigation<NavigationProp>();

  // ==============================
  // NAVIGATION FUNCTIONS
  // ==============================

  const goHome = () => {
    navigation.navigate('Home');
  };

  const goCart = () => {
    navigation.navigate('Cart');
  };

  const goProfile = () => {
    navigation.navigate('Profile');
  };

  const renderItem = (
    tab: FooterProps['activeTab'],
    icon: React.ReactNode,
    label: string,
    onPress: () => void,
  ) => {

    const isActive = activeTab === tab;

    return (
      <TouchableOpacity
        style={styles.footerItem}
        activeOpacity={0.75}
        onPress={onPress}
      >

        <View
          style={[
            styles.iconContainer,
            isActive && styles.activeIconContainer,
          ]}
        >
          {icon}
        </View>

        <Text
          style={[
            styles.footerText,
            isActive && styles.footerTextActive,
          ]}
        >
          {label}
        </Text>

      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.footer}>

      {/* ================= HOME ================= */}

      {renderItem(
        'home',

        <Home
          size={21}
          color={
            activeTab === 'home'
              ? '#2563EB'
              : '#94A3B8'
          }
          strokeWidth={
            activeTab === 'home'
              ? 2.7
              : 2
          }
          fill={
            activeTab === 'home'
              ? '#EAF1FF'
              : 'none'
          }
        />,

        'Home',

        goHome,
      )}

      {/* ================= PRODUCTS ================= */}

      {renderItem(
        'products',

        <ShoppingBag
          size={21}
          color={
            activeTab === 'products'
              ? '#2563EB'
              : '#94A3B8'
          }
          strokeWidth={
            activeTab === 'products'
              ? 2.7
              : 2
          }
        />,

        'Products',

        () => {
          // Products screen add hone ke baad:
          // navigation.navigate('Products');
        },
      )}

      {/* ================= FAVORITES ================= */}

      {renderItem(
        'favorites',

        <Heart
          size={21}
          color={
            activeTab === 'favorites'
              ? '#EF4444'
              : '#94A3B8'
          }
          strokeWidth={
            activeTab === 'favorites'
              ? 2.7
              : 2
          }
          fill={
            activeTab === 'favorites'
              ? '#FEE2E2'
              : 'none'
          }
        />,

        'Favorites',

        () => {
          // Favorites screen add hone ke baad:
          // navigation.navigate('Favorites');
        },
      )}

      {/* ================= CART ================= */}

      <TouchableOpacity
        style={styles.footerItem}
        activeOpacity={0.8}
        onPress={goCart}
      >

        <View style={styles.cartIconWrapper}>

          <View
            style={[
              styles.cartIconContainer,
              activeTab === 'cart' &&
                styles.activeIconContainer,
            ]}
          >

            <ShoppingCart
              size={21}
              color={
                activeTab === 'cart'
                  ? '#EF4444'
                  : '#94A3B8'
              }
              strokeWidth={
                activeTab === 'cart'
                  ? 2.5
                  : 1.8
              }
            />

          </View>

          {/* CART BADGE */}

          {cartCount > 0 && (
            <View style={styles.cartBadge}>

              <Text style={styles.cartBadgeText}>
                {cartCount > 99
                  ? '99+'
                  : cartCount}
              </Text>

            </View>
          )}

        </View>

        <Text
          style={[
            styles.footerText,
            {
              color:
                activeTab === 'cart'
                  ? '#EF4444'
                  : '#94A3B8',
            },
          ]}
        >
          Cart
        </Text>

      </TouchableOpacity>

      {/* ================= PROFILE ================= */}

      {renderItem(
        'profile',

        <User
          size={21}
          color={
            activeTab === 'profile'
              ? '#2563EB'
              : '#94A3B8'
          }
          strokeWidth={
            activeTab === 'profile'
              ? 2.7
              : 2
          }
        />,

        'Profile',

        goProfile,
      )}

    </View>
  );
};

export default Footer;


/* ================================================= */
/* ===================== STYLES ==================== */
/* ================================================= */

const styles = StyleSheet.create({

  footer: {
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: 0,

    height: 76,

    backgroundColor: '#FFFFFF',

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-around',

    paddingHorizontal: 6,

    paddingBottom: 6,

    borderTopWidth: 1,

    borderTopColor: '#E8EDFF',

    elevation: 18,

    shadowColor: '#0F172A',

    shadowOffset: {
      width: 0,
      height: -3,
    },

    shadowOpacity: 0.08,

    shadowRadius: 10,
  },

  footerItem: {
    flex: 1,

    height: 66,

    alignItems: 'center',

    justifyContent: 'center',

    position: 'relative',
  },

  iconContainer: {
    width: 39,

    height: 32,

    borderRadius: 12,

    alignItems: 'center',

    justifyContent: 'center',
  },

  activeIconContainer: {
    backgroundColor: '#EAF1FF',
  },

  footerText: {
    marginTop: 4,

    fontSize: 9,

    color: '#94A3B8',

    fontWeight: '700',
  },

  footerTextActive: {
    color: '#2563EB',

    fontWeight: '900',
  },

  cartIconWrapper: {
    width: 43,

    height: 36,

    alignItems: 'center',

    justifyContent: 'center',

    position: 'relative',
  },

  cartIconContainer: {
    width: 39,

    height: 32,

    borderRadius: 12,

    alignItems: 'center',

    justifyContent: 'center',
  },

  cartBadge: {
    position: 'absolute',

    top: -3,

    right: 0,

    minWidth: 17,

    height: 17,

    paddingHorizontal: 4,

    borderRadius: 9,

    backgroundColor: '#EF4444',

    alignItems: 'center',

    justifyContent: 'center',

    borderWidth: 2,

    borderColor: '#FFFFFF',
  },

  cartBadgeText: {
    color: '#FFFFFF',

    fontSize: 7,

    fontWeight: '900',
  },

});