import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Bell, ShoppingBag, Truck, Tag, CheckCircle} from 'lucide-react-native';

const notifications = [
  {
    id: '1',
    title: 'Order Confirmed',
    message: 'Your order has been confirmed successfully.',
    time: '2 min ago',
    icon: ShoppingBag,
  },
  {
    id: '2',
    title: 'Order Shipped',
    message: 'Your package is on its way.',
    time: '1 hour ago',
    icon: Truck,
  },
  {
    id: '3',
    title: 'Special Offer',
    message: 'Check out the latest offers on your favourite products.',
    time: 'Yesterday',
    icon: Tag,
  },
];

const NotificationScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Notifications</Text>
        <Bell size={22} color="#2563EB" />
      </View>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>No notifications yet.</Text>
        }
        renderItem={({item}) => {
          const Icon = item.icon;

          return (
            <View style={styles.card}>
              <View style={styles.iconBox}>
                <Icon size={23} color="#2563EB" />
              </View>

              <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.message}>{item.message}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>

              <CheckCircle size={16} color="#22C55E" />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  back: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '600',
  },
  heading: {
    fontSize: 21,
    fontWeight: '800',
    color: '#111827',
  },
  list: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    gap: 12,
    elevation: 2,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
  },
  message: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 5,
    lineHeight: 19,
  },
  time: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 8,
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: '#64748B',
  },
});