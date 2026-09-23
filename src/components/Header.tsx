import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {
  Bell,
  MapPin,
  ChevronDown,
  ShoppingBag,
} from 'lucide-react-native';

const Header = ({
  userName = 'John William',
  onNotificationPress,
  onProfilePress,
  cartCount = 2,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F9FF"
      />

      <View style={styles.header}>

        {/* PROFILE */}

        <TouchableOpacity
          style={styles.profileWrapper}
          onPress={onProfilePress}
          activeOpacity={0.8}
        >
          <Image
            source={{
              uri:
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
            }}
            style={styles.profileImage}
          />

          <View style={styles.onlineDot} />
        </TouchableOpacity>


        {/* USER INFORMATION */}

        <View style={styles.userInfo}>

          <Text style={styles.helloText}>
            Good Morning 👋
          </Text>

          <Text
            style={styles.userName}
            numberOfLines={1}
          >
            {userName}
          </Text>

          <View style={styles.locationRow}>

            <MapPin
              size={12}
              color="#2563EB"
              strokeWidth={2.5}
            />

            <Text style={styles.locationText}>
              Indore, India
            </Text>

            <ChevronDown
              size={12}
              color="#64748B"
              strokeWidth={2.5}
            />

          </View>

        </View>


        {/* ACTIONS */}

        <View style={styles.actions}>

          {/* NOTIFICATION */}

          <TouchableOpacity
            style={styles.actionButton}
            onPress={onNotificationPress}
            activeOpacity={0.75}
          >

            <Bell
              size={21}
              color="#334155"
              strokeWidth={2.2}
            />

            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>
                3
              </Text>
            </View>

          </TouchableOpacity>


          {/* CART */}

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.bagButton,
            ]}
            activeOpacity={0.75}
          >

            <ShoppingBag
              size={21}
              color="#2563EB"
              strokeWidth={2.2}
            />

            {cartCount > 0 && (
              <View style={styles.cartBadge}>

                <Text style={styles.badgeText}>
                  {cartCount}
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

    top: 5,
    right: 4,

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

    top: 5,
    right: 4,

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