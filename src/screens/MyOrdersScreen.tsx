
import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { Feather } from '@react-native-vector-icons/feather';
import styles from '../styles/MyOrdersScreen';

type OrderStatus = 'Active' | 'Delivered' | 'Cancelled';

type OrderItem = {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
};

type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
};

const initialOrders: Order[] = [
  {
    id: 'ORD-100001',
    date: '24 Oct 2026',
    status: 'Active',
    items: [
      {
        id: 'P101',
        name: 'Wireless Headphones',
        variant: 'Black · Bluetooth',
        price: 1499,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
      },
      {
        id: 'P102',
        name: 'Smart Watch',
        variant: 'Black · Standard',
        price: 2199,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
      },
    ],
  },
  {
    id: 'ORD-100002',
    date: '20 Oct 2026',
    status: 'Delivered',
    items: [
      {
        id: 'P103',
        name: 'Casual Sneakers',
        variant: 'White · Size 9',
        price: 1799,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
      },
    ],
  },
  {
    id: 'ORD-100003',
    date: '18 Oct 2026',
    status: 'Cancelled',
    items: [
      {
        id: 'P104',
        name: 'Travel Backpack',
        variant: 'Grey · 25 L',
        price: 999,
        quantity: 2,
        image:
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300',
      },
    ],
  },
];

const filters = ['All', 'Active', 'Delivered', 'Cancelled'] as const;
type FilterType = (typeof filters)[number];

const formatINR = (amount: number) =>
  `₹${amount.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
  })}`;

const getOrderTotal = (order: Order) =>
  order.items.reduce((total, item) => total + item.price * item.quantity, 0);

const MyOrdersScreen = ({ navigation }: any) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders =
    selectedFilter === 'All'
      ? orders
      : orders.filter(order => order.status === selectedFilter);

  const handleTrackOrder = (order: Order) => {
    setSelectedOrder(null);

    if (order.status === 'Cancelled') {
      Alert.alert('Order Cancelled', 'This order cannot be tracked.');
      return;
    }

    if (order.status === 'Delivered') {
      Alert.alert('Order Delivered', 'This order has already been delivered.');
      return;
    }

    navigation.navigate('OrderTracking', {
      orderId: order.id,
      total: getOrderTotal(order),
    });
  };

  const handleCancelOrder = (order: Order) => {
    if (order.status !== 'Active') {
      Alert.alert(
        'Cannot Cancel',
        'Only active orders can be cancelled in this demo.',
      );
      return;
    }

    Alert.alert(
      'Cancel Order',
      `Are you sure you want to cancel ${order.id}?`,
      [
        { text: 'Keep Order', style: 'cancel' },
        {
          text: 'Cancel Order',
          style: 'destructive',
          onPress: () => {
            setOrders(previous =>
              previous.map(item =>
                item.id === order.id
                  ? { ...item, status: 'Cancelled' }
                  : item,
              ),
            );

            setSelectedOrder(null);
            Alert.alert('Order Cancelled', `${order.id} has been cancelled.`);
          },
        },
      ],
    );
  };

  const renderStatus = (status: OrderStatus) => {
    const statusStyle =
      status === 'Active'
        ? styles.statusActive
        : status === 'Delivered'
          ? styles.statusDelivered
          : styles.statusCancelled;

    const dotStyle =
      status === 'Active'
        ? styles.statusDotActive
        : status === 'Delivered'
          ? styles.statusDotDelivered
          : styles.statusDotCancelled;

    return (
      <View style={[styles.statusBadge, statusStyle]}>
        <View style={[styles.statusDot, dotStyle]} />
        <Text style={styles.statusText}>{status}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FC" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBack}
          onPress={() => navigation.goBack()}
          activeOpacity={0.75}
        >
          <Feather name="arrow-left" size={21} color="#172033" />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>My Orders</Text>
          <Text style={styles.headerSubtitle}>
            Track and manage your purchases
          </Text>
        </View>

        <View style={styles.headerCount}>
          <Text style={styles.headerCountText}>{orders.length}</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Feather name="shopping-bag" size={23} color="#FFFFFF" />
          </View>

          <View style={styles.summaryTextContainer}>
            <Text style={styles.summaryTitle}>Your purchases</Text>
            <Text style={styles.summarySubtitle}>
              You have {orders.length} orders in your list
            </Text>
          </View>

          <Feather name="package" size={27} color="#B8C8FF" />
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {filters.map(filter => {
            const active = selectedFilter === filter;
            const count =
              filter === 'All'
                ? orders.length
                : orders.filter(order => order.status === filter).length;

            return (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  active && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedFilter(filter)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.filterText,
                    active && styles.filterTextActive,
                  ]}
                >
                  {filter}
                </Text>

                <View
                  style={[
                    styles.filterCount,
                    active && styles.filterCountActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterCountText,
                      active && styles.filterCountTextActive,
                    ]}
                  >
                    {count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Order list */}
        <View style={styles.listHeading}>
          <Text style={styles.listTitle}>
            {selectedFilter === 'All' ? 'All Orders' : `${selectedFilter} Orders`}
          </Text>
          <Text style={styles.listCount}>
            {filteredOrders.length} found
          </Text>
        </View>

        {filteredOrders.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Feather name="shopping-cart" size={31} color="#3563E9" />
            </View>
            <Text style={styles.emptyTitle}>No orders found</Text>
            <Text style={styles.emptyDescription}>
              You don't have any {selectedFilter.toLowerCase()} orders yet.
            </Text>

            <TouchableOpacity
              style={styles.shopButton}
              onPress={() => navigation.navigate('Home')}
              activeOpacity={0.85}
            >
              <Text style={styles.shopButtonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredOrders.map(order => (
            <View key={order.id} style={styles.orderCard}>
              {/* Order heading */}
              <View style={styles.orderHeader}>
                <View style={styles.orderHeaderLeft}>
                  <Text style={styles.orderIdLabel}>ORDER ID</Text>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <Text style={styles.orderDate}>{order.date}</Text>
                </View>

                {renderStatus(order.status)}
              </View>

              <View style={styles.divider} />

              {/* Products in this order */}
              {order.items.map((item, index) => (
                <View key={item.id}>
                  <View style={styles.productRow}>
                    <View style={styles.productImageContainer}>
                      <Image
                        source={{ uri: item.image }}
                        style={styles.productImage}
                        resizeMode="cover"
                      />
                    </View>

                    <View style={styles.productInfo}>
                      <Text style={styles.productName} numberOfLines={2}>
                        {item.name}
                      </Text>
                      <Text style={styles.productVariant}>
                        {item.variant}
                      </Text>
                      <Text style={styles.productQuantity}>
                        Qty: {item.quantity}
                      </Text>
                    </View>

                    <Text style={styles.productPrice}>
                      {formatINR(item.price * item.quantity)}
                    </Text>
                  </View>

                  {index < order.items.length - 1 && (
                    <View style={styles.productDivider} />
                  )}
                </View>
              ))}

              <View style={styles.divider} />

              {/* Order total */}
              <View style={styles.totalRow}>
                <View>
                  <Text style={styles.totalLabel}>Total Amount</Text>
                  <Text style={styles.itemCount}>
                    {order.items.reduce(
                      (sum, item) => sum + item.quantity,
                      0,
                    )}{' '}
                    item(s)
                  </Text>
                </View>

                <Text style={styles.totalAmount}>
                  {formatINR(getOrderTotal(order))}
                </Text>
              </View>

              {/* Actions */}
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => setSelectedOrder(order)}
                  activeOpacity={0.8}
                >
                  <Feather name="eye" size={16} color="#3563E9" />
                  <Text style={styles.detailsButtonText}>View Details</Text>
                </TouchableOpacity>

                {order.status === 'Active' && (
                  <TouchableOpacity
                    style={styles.trackButton}
                    onPress={() => handleTrackOrder(order)}
                    activeOpacity={0.85}
                  >
                    <Feather name="truck" size={16} color="#FFFFFF" />
                    <Text style={styles.trackButtonText}>Track Order</Text>
                  </TouchableOpacity>
                )}

                {order.status === 'Delivered' && (
                  <View style={styles.deliveredButton}>
                    <Feather
                      name="check-circle"
                      size={16}
                      color="#16834E"
                    />
                    <Text style={styles.deliveredButtonText}>Delivered</Text>
                  </View>
                )}

                {order.status === 'Cancelled' && (
                  <View style={styles.cancelledButton}>
                    <Feather name="x-circle" size={16} color="#D04444" />
                    <Text style={styles.cancelledButtonText}>Cancelled</Text>
                  </View>
                )}
              </View>

              {order.status === 'Active' && (
                <TouchableOpacity
                  style={styles.cancelOrderButton}
                  onPress={() => handleCancelOrder(order)}
                  activeOpacity={0.75}
                >
                  <Text style={styles.cancelOrderText}>Cancel Order</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </ScrollView>

      {/* Full order details modal */}
      <Modal
        visible={selectedOrder !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedOrder(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHandle} />

            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Order Details</Text>
                <Text style={styles.modalOrderId}>
                  {selectedOrder?.id}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedOrder(null)}
              >
                <Feather name="x" size={21} color="#172033" />
              </TouchableOpacity>
            </View>

            {selectedOrder && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalStatusRow}>
                  <Text style={styles.modalLabel}>Order Status</Text>
                  {renderStatus(selectedOrder.status)}
                </View>

                <Text style={styles.modalSectionTitle}>Items ordered</Text>

                {selectedOrder.items.map(item => (
                  <View key={item.id} style={styles.modalProductRow}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.modalProductImage}
                      resizeMode="cover"
                    />

                    <View style={styles.modalProductInfo}>
                      <Text style={styles.modalProductName}>
                        {item.name}
                      </Text>
                      <Text style={styles.modalProductVariant}>
                        {item.variant}
                      </Text>
                      <Text style={styles.modalProductVariant}>
                        Quantity: {item.quantity}
                      </Text>
                    </View>

                    <Text style={styles.modalProductPrice}>
                      {formatINR(item.price * item.quantity)}
                    </Text>
                  </View>
                ))}

                <View style={styles.modalTotalRow}>
                  <Text style={styles.modalTotalLabel}>Order Total</Text>
                  <Text style={styles.modalTotalAmount}>
                    {formatINR(getOrderTotal(selectedOrder))}
                  </Text>
                </View>

                <View style={styles.modalDateRow}>
                  <Feather name="calendar" size={17} color="#7C8597" />
                  <Text style={styles.modalDateText}>
                    Ordered on {selectedOrder.date}
                  </Text>
                </View>

                {selectedOrder.status === 'Active' && (
                  <TouchableOpacity
                    style={styles.modalTrackButton}
                    onPress={() => handleTrackOrder(selectedOrder)}
                  >
                    <Feather name="truck" size={17} color="#FFFFFF" />
                    <Text style={styles.modalTrackButtonText}>
                      Track this Order
                    </Text>
                  </TouchableOpacity>
                )}

                {selectedOrder.status === 'Active' && (
                  <TouchableOpacity
                    style={styles.modalCancelButton}
                    onPress={() => handleCancelOrder(selectedOrder)}
                  >
                    <Text style={styles.modalCancelButtonText}>
                      Cancel Order
                    </Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MyOrdersScreen;
