
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Bell,
  MapPin,
  ChevronDown,
  ShoppingBag,
} from 'lucide-react-native';

import {useUser} from '../context/UserContext';

type HeaderProps = {
  userName?: string;
  onNotificationPress?: (notificationCount: number) => void;
  onProfilePress?: () => void;
  onCartPress?: () => void;
  cartCount?: number;
  notificationCount?: number;
};

const Header: React.FC<HeaderProps> = ({
  userName,
  onNotificationPress,
  onProfilePress,
  onCartPress,
  cartCount = 0,
  notificationCount = 0,
}) => {
  const {user} = useUser();

  const displayName =
    user?.name?.trim() || userName?.trim() || 'Guest';

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress(notificationCount);
      return;
    }

    Alert.alert(
      'Notifications',
      `You have ${notificationCount} notifications.`,
    );
  };

  const handleProfilePress = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      Alert.alert('Profile', 'Profile screen is not connected yet.');
    }
  };

  const handleCartPress = () => {
    if (onCartPress) {
      onCartPress();
    } else {
      Alert.alert('Shopping Bag', 'Cart screen is not connected yet.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F9FF"
      />

      <View style={styles.header}>
        {/* Profile Image */}
        <TouchableOpacity
          style={styles.profileWrapper}
          onPress={handleProfilePress}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Open profile">
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
            }}
            style={styles.profileImage}
          />

          <View style={styles.onlineDot} />
        </TouchableOpacity>

        {/* User Information */}
        <View style={styles.userInfo}>
          <Text style={styles.helloText}>Good Morning 👋</Text>

          <Text style={styles.userName} numberOfLines={1}>
            {displayName}
          </Text>

          <View style={styles.locationRow}>
            <MapPin size={12} color="#2563EB" strokeWidth={2.5} />

            <Text style={styles.locationText}>Indore, India</Text>

            <ChevronDown
              size={12}
              color="#64748B"
              strokeWidth={2.5}
            />
          </View>
        </View>

        {/* Notification and Cart Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleNotificationPress}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel="Open notifications">
            <Bell size={21} color="#334155" strokeWidth={2.2} />

            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>
                  {notificationCount > 99 ? '99+' : notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.bagButton]}
            onPress={handleCartPress}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel="Open shopping cart">
            <ShoppingBag
              size={21}
              color="#2563EB"
              strokeWidth={2.2}
            />

            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.badgeText}>
                  {cartCount > 99 ? '99+' : cartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F7F9FF',
  },

  header: {
    minHeight: 82,
    backgroundColor: '#F7F9FF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileWrapper: {
    width: 52,
    height: 52,
    borderRadius: 17,
    position: 'relative',
  },

  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#E2E8F0',
  },

  onlineDot: {
    position: 'absolute',
    right: -1,
    bottom: -1,
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#F7F9FF',
  },

  userInfo: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
    justifyContent: 'center',
  },

  helloText: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
    marginBottom: 2,
  },

  userName: {
    fontSize: 17,
    color: '#111827',
    fontWeight: '900',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },

  locationText: {
    marginLeft: 3,
    marginRight: 2,
    fontSize: 9,
    color: '#64748B',
    fontWeight: '600',
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 8,
  },

  actionButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8EDFF',
    position: 'relative',
    elevation: 2,
  },

  bagButton: {
    backgroundColor: '#EAF1FF',
    borderColor: '#D9E6FF',
  },

  notificationBadge: {
    position: 'absolute',
    top: 3,
    right: 2,
    minWidth: 15,
    height: 15,
    paddingHorizontal: 3,
    borderRadius: 8,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  cartBadge: {
    position: 'absolute',
    top: 3,
    right: 2,
    minWidth: 15,
    height: 15,
    paddingHorizontal: 3,
    borderRadius: 8,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 7,
    fontWeight: '900',
  },
});
