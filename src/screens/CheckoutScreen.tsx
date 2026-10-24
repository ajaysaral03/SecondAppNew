
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  MapPin,
  ChevronRight,
  Truck,
  CreditCard,
  Smartphone,
  Banknote,
  CheckCircle2,
  ShieldCheck,
  Plus,
  Minus,
  ShoppingBag,
  X,
  AlertCircle,
  PackageCheck,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import styles from '../styles/CheckoutScreen';

type PaymentMethod = 'UPI' | 'Card' | 'COD';
type DeliveryType = 'standard' | 'express';
type AlertType = 'success' | 'error' | 'confirm' | 'info';

type CheckoutItem = {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  color?: string;
};

type AlertState = {
  visible: boolean;
  type: AlertType;
  title: string;
  message: string;
  confirmText: string;
  cancelText?: string;
  onConfirm?: () => void;
};

const formatPrice = (amount: number) =>
  `₹${amount.toLocaleString('en-IN')}`;

const CheckoutScreen = () => {
  const navigation = useNavigation<any>();
  const { cartItems, updateQuantity, clearCart } = useCart();
  const { user } = useUser();

  // Use the same shared cart data as CartScreen; never show demo products.
  const items = cartItems as CheckoutItem[];

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('UPI');

  const [deliveryType, setDeliveryType] =
    useState<DeliveryType>('standard');

  const [address, setAddress] = useState({
    line1: 'House No. 12, Vijay Nagar',
    city: 'Indore, Madhya Pradesh',
    pincode: '452010',
  });
  const [addressModalVisible, setAddressModalVisible] = useState(false);

  const [alert, setAlert] = useState<AlertState>({
    visible: false,
    type: 'info',
    title: '',
    message: '',
    confirmText: 'OK',
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const headerAnim = useRef(new Animated.Value(0)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryCharge =
    subtotal === 0
      ? 0
      : deliveryType === 'express'
        ? 99
        : subtotal >= 999
          ? 0
          : 49;

  const total = subtotal + deliveryCharge;

  useEffect(() => {
    Animated.stagger(120, [
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(contentAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(buttonAnim, {
        toValue: 1,
        speed: 12,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, [headerAnim, contentAnim, buttonAnim]);

  useEffect(() => {
    if (!alert.visible) {
      return;
    }

    fadeAnim.setValue(0);
    scaleAnim.setValue(0.8);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 75,
        useNativeDriver: true,
      }),
    ]).start();
  }, [alert.visible, fadeAnim, scaleAnim]);

  useEffect(() => {
    if (!alert.visible) {
      return;
    }

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        closeAlert();
        return true;
      },
    );

    return () => subscription.remove();
  }, [alert.visible]);

  const showAlert = (
    type: AlertType,
    title: string,
    message: string,
    confirmText = 'OK',
    onConfirm?: () => void,
    cancelText?: string,
  ) => {
    setAlert({
      visible: true,
      type,
      title,
      message,
      confirmText,
      cancelText,
      onConfirm,
    });
  };

  const closeAlert = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setAlert(current => ({ ...current, visible: false }));
    });
  };

  const confirmAlert = () => {
    const callback = alert.onConfirm;
    closeAlert();
    callback?.();
  };

  const changeQuantity = (
    id: string | number,
    change: number,
  ) => {
    const item = items.find(current => String(current.id) === String(id));
    if (!item) return;
    // The shared cart context keeps Cart and Checkout quantities in sync.
    if (change > 0) {
      updateQuantity(String(id), 'increase');
    } else if (item.quantity > 1) {
      updateQuantity(String(id), 'decrease');
    }
  };

  const handleChangeAddress = () => {
    setAddressModalVisible(true);
  };

  const handleSaveAddress = () => {
    if (!address.line1.trim() || !address.city.trim() || !/^\d{6}$/.test(address.pincode.trim())) {
      showAlert('error', 'Invalid address', 'Please enter your full address, city and a valid 6-digit PIN code.', 'OK');
      return;
    }
    setAddressModalVisible(false);
    showAlert('success', 'Address updated', 'Your delivery address has been updated.', 'OK');
  };


const handlePlaceOrder = () => {
  if (items.length === 0) {
    showAlert(
      'error',
      'Your cart is empty',
      'Please add products before checkout.',
      'OK',
    );
    return;
  }

  if (!address.line1.trim() || !address.city.trim() || !/^\d{6}$/.test(address.pincode.trim())) {
    showAlert(
      'error',
      'Address required',
      'Please select a valid delivery address.',
      'OK',
    );
    return;
  }

  showAlert(
    'confirm',
    'Confirm Your Order',
    `Total: ${formatPrice(total)}\nPayment: ${paymentMethod}\nDelivery: ${
      deliveryType === 'express' ? 'Express' : 'Standard'
    }\n\nDo you want to place this order?`,
    'Confirm Order',
    () => {
      const orderId = `ORD-${Date.now()}`;
      const orderItems = items.map(item => ({ ...item }));

      navigation.replace('OrderSuccess', {
        orderId,
        total,
        paymentMethod,
        deliveryType,
        cartItems: orderItems,
        orderItems,
        productName: orderItems[0]?.name ?? 'Your Product',
        productPrice: orderItems[0]?.price ?? total,
        quantity: orderItems[0]?.quantity ?? 1,
        productVariant: '',
      });
      clearCart();
    },
    'Review',
  );
};

  const renderPaymentOption = (
    method: PaymentMethod,
    title: string,
    subtitle: string,
    icon: React.ReactNode,
  ) => {
    const selected = paymentMethod === method;

    return (
      <TouchableOpacity
        key={method}
        activeOpacity={0.8}
        style={[
          styles.paymentOption,
          selected && styles.paymentOptionSelected,
        ]}
        onPress={() => setPaymentMethod(method)}
      >
        <View
          style={[
            styles.paymentIcon,
            selected && styles.paymentIconSelected,
          ]}
        >
          {icon}
        </View>

        <View style={styles.paymentTextContainer}>
          <Text style={styles.paymentTitle}>{title}</Text>
          <Text style={styles.paymentSubtitle}>{subtitle}</Text>
        </View>

        <View
          style={[
            styles.radioOuter,
            selected && styles.radioOuterSelected,
          ]}
        >
          {selected && <View style={styles.radioInner} />}
        </View>
      </TouchableOpacity>
    );
  };

  const alertColor =
    alert.type === 'success'
      ? '#16A34A'
      : alert.type === 'error'
        ? '#DC2626'
        : alert.type === 'confirm'
          ? '#2563EB'
          : '#7C3AED';

  const alertBackground =
    alert.type === 'success'
      ? '#DCFCE7'
      : alert.type === 'error'
        ? '#FEE2E2'
        : alert.type === 'confirm'
          ? '#DBEAFE'
          : '#EDE9FE';

  const AlertIcon =
    alert.type === 'success'
      ? CheckCircle2
      : alert.type === 'error'
        ? AlertCircle
        : alert.type === 'confirm'
          ? PackageCheck
          : ShieldCheck;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar backgroundColor="#F7F9FF" barStyle="dark-content" />

      {/* ANIMATED HEADER */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: headerAnim,
            transform: [
              {
                translateY: headerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-15, 0],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.75}
          style={styles.backButton}
        >
          <ArrowLeft size={22} color="#172033" />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Checkout</Text>
          <Text style={styles.headerSubtitle}>
            Complete your purchase
          </Text>
        </View>

        <View style={styles.secureBadge}>
          <ShieldCheck size={19} color="#16A34A" />
        </View>
      </Animated.View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={{
            opacity: contentAnim,
            transform: [
              {
                translateY: contentAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          }}
        >
          {/* ADDRESS */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <Text style={styles.stepLabel}>STEP 1 OF 3</Text>
          </View>

          <View style={styles.addressCard}>
            <View style={styles.addressTopRow}>
              <View style={styles.addressIcon}>
                <MapPin size={22} color="#2563EB" />
              </View>

              <View style={styles.addressMain}>
                <Text style={styles.addressName}>{user.name || 'Name not available'}</Text>
                <Text style={styles.addressPhone}>{user.mobile ? `+91 ${user.mobile}` : 'Mobile number not available'}</Text>
              </View>

              <TouchableOpacity
                onPress={handleChangeAddress}
                activeOpacity={0.75}
              >
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.addressDivider} />

            <Text style={styles.addressLine}>{address.line1}</Text>
            <Text style={styles.addressLine}>
              {address.city} - {address.pincode}
            </Text>

            <View style={styles.defaultAddressBadge}>
              <CheckCircle2 size={14} color="#16A34A" />
              <Text style={styles.defaultAddressText}>
                Default delivery address
              </Text>
            </View>
          </View>

          {/* DELIVERY */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Method</Text>
            <Text style={styles.stepLabel}>STEP 2 OF 3</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.deliveryOption,
              deliveryType === 'standard' &&
                styles.deliveryOptionSelected,
            ]}
            onPress={() => setDeliveryType('standard')}
          >
            <View style={styles.deliveryIcon}>
              <Truck size={22} color="#2563EB" />
            </View>

            <View style={styles.deliveryTextContainer}>
              <Text style={styles.deliveryTitle}>Standard Delivery</Text>
              <Text style={styles.deliverySubtitle}>
                Arrives in 3–5 business days
              </Text>
            </View>

            <View style={styles.deliveryPriceContainer}>
              <Text style={styles.deliveryPrice}>
                {subtotal >= 999 ? 'FREE' : '₹49'}
              </Text>
              <View
                style={[
                  styles.radioOuter,
                  deliveryType === 'standard' &&
                    styles.radioOuterSelected,
                ]}
              >
                {deliveryType === 'standard' && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.deliveryOption,
              deliveryType === 'express' &&
                styles.deliveryOptionSelected,
            ]}
            onPress={() => setDeliveryType('express')}
          >
            <View style={styles.deliveryIcon}>
              <Truck size={22} color="#7C3AED" />
            </View>

            <View style={styles.deliveryTextContainer}>
              <Text style={styles.deliveryTitle}>Express Delivery</Text>
              <Text style={styles.deliverySubtitle}>
                Faster delivery in 1–2 days
              </Text>
            </View>

            <View style={styles.deliveryPriceContainer}>
              <Text style={styles.deliveryPrice}>₹99</Text>
              <View
                style={[
                  styles.radioOuter,
                  deliveryType === 'express' &&
                    styles.radioOuterSelected,
                ]}
              >
                {deliveryType === 'express' && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </View>
          </TouchableOpacity>

          {/* PAYMENT */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <Text style={styles.stepLabel}>STEP 3 OF 3</Text>
          </View>

          <View style={styles.paymentCard}>
            {renderPaymentOption(
              'UPI',
              'UPI Payment',
              'Google Pay, PhonePe, Paytm',
              <Smartphone size={21} color="#2563EB" />,
            )}

            <View style={styles.optionDivider} />

            {renderPaymentOption(
              'Card',
              'Credit / Debit Card',
              'Visa, Mastercard and more',
              <CreditCard size={21} color="#2563EB" />,
            )}

            <View style={styles.optionDivider} />

            {renderPaymentOption(
              'COD',
              'Cash on Delivery',
              'Pay when your order arrives',
              <Banknote size={21} color="#2563EB" />,
            )}
          </View>

          {/* ORDER ITEMS */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Order Items</Text>
            <Text style={styles.itemsCount}>
              {items.reduce((count, item) => count + item.quantity, 0)} items 
            </Text>
          </View>

          <View style={styles.orderCard}>
            {items.length === 0 ? (
              <View style={styles.emptyCart}>
                <ShoppingBag size={32} color="#94A3B8" />
                <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
                <Text style={styles.emptyCartText}>
                  Add products before placing an order.
                </Text>
              </View>
            ) : (
              items.map((item, index) => (
                <View key={String(item.id)}>
                  {index > 0 && <View style={styles.orderDivider} />}

                  <View style={styles.orderItem}>
                    <View style={styles.productPlaceholder}>
                        {item.image ? (
                          <Image
                            source={{uri: item.image}}
                            style={styles.productImage}
                            resizeMode="contain"
                          />
                        ) : (
                          <ShoppingBag size={26} color="#2563EB" />
                        )}
                      </View>

                    <View style={styles.orderItemDetails}>
                      <Text style={styles.orderItemName} numberOfLines={2}>
                        {item.name}
                      </Text>

                      <Text style={styles.orderItemPrice}>
                        {formatPrice(item.price)}
                      </Text>

                      <View style={styles.quantityControl}>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => changeQuantity(item.id, -1)}
                          accessibilityLabel="Decrease quantity"
                        >
                          <Minus size={14} color="#334155" />
                        </TouchableOpacity>

                        <Text style={styles.quantityText}>
                          {item.quantity}
                        </Text>

                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => changeQuantity(item.id, 1)}
                          accessibilityLabel="Increase quantity"
                        >
                          <Plus size={14} color="#334155" />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <Text style={styles.itemTotal}>
                      {formatPrice(item.price * item.quantity)}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>

          {/* PRICE DETAILS */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Price Details</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>
                {formatPrice(subtotal)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Charges</Text>
              <Text
                style={[
                  styles.summaryValue,
                  deliveryCharge === 0 && styles.freeText,
                ]}
              >
                {deliveryCharge === 0
                  ? 'FREE'
                  : formatPrice(deliveryCharge)}
              </Text>
            </View>

            {subtotal > 0 &&
              subtotal < 999 &&
              deliveryType === 'standard' && (
                <Text style={styles.deliveryHint}>
                  Add {formatPrice(999 - subtotal)} more for free standard
                  delivery.
                </Text>
              )}

            <View style={styles.summaryDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>{formatPrice(total)}</Text>
            </View>

            <View style={styles.savingsBadge}>
              <CheckCircle2 size={15} color="#16A34A" />
              <Text style={styles.savingsText}>
                {deliveryCharge === 0
                  ? 'You are saving on delivery!'
                  : 'Secure checkout with no hidden fees'}
              </Text>
            </View>
          </View>

          <View style={styles.bottomNote}>
            <ShieldCheck size={12} color="#64748B" />
            <Text style={styles.bottomNoteText}>
              Your information is protected during checkout.
            </Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* FIXED BOTTOM BAR */}
      <Animated.View
        style={[
          styles.bottomBar,
          {
            opacity: buttonAnim,
            transform: [
              {
                translateY: buttonAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [35, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.bottomPriceContainer}>
          <Text style={styles.bottomTotalLabel}>Total Amount</Text>
          <Text style={styles.bottomTotal}>{formatPrice(total)}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.placeOrderButton,
            items.length === 0 && styles.placeOrderDisabled,
          ]}
          activeOpacity={0.85}
          onPress={handlePlaceOrder}
          disabled={items.length === 0}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
          <ChevronRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </Animated.View>

      {/* EDIT DELIVERY ADDRESS MODAL */}
      <Modal
        transparent
        visible={addressModalVisible}
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setAddressModalVisible(false)}
      >
        <View style={{flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.55)', justifyContent: 'center', padding: 20}}>
          <View style={{backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8}}>
              <Text style={{fontSize: 20, fontWeight: '700', color: '#0F172A'}}>Edit delivery address</Text>
              <TouchableOpacity onPress={() => setAddressModalVisible(false)} accessibilityLabel="Close address editor">
                <X size={22} color="#64748B" />
              </TouchableOpacity>
            </View>
            <Text style={{fontSize: 13, color: '#64748B', marginBottom: 16}}>Name and mobile number come from your login details.</Text>
            <Text style={{fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 6}}>House / street address</Text>
            <TextInput
              value={address.line1}
              onChangeText={value => setAddress(current => ({...current, line1: value}))}
              placeholder="House number, street, area"
              multiline
              style={{borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, color: '#0F172A', marginBottom: 12, minHeight: 48}}
              placeholderTextColor="#94A3B8"
            />
            <Text style={{fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 6}}>City / State</Text>
            <TextInput
              value={address.city}
              onChangeText={value => setAddress(current => ({...current, city: value}))}
              placeholder="City, State"
              style={{borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, color: '#0F172A', marginBottom: 12}}
              placeholderTextColor="#94A3B8"
            />
            <Text style={{fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 6}}>PIN code</Text>
            <TextInput
              value={address.pincode}
              onChangeText={value => setAddress(current => ({...current, pincode: value.replace(/\D/g, '').slice(0, 6)}))}
              placeholder="6-digit PIN code"
              keyboardType="number-pad"
              maxLength={6}
              style={{borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, color: '#0F172A', marginBottom: 18}}
              placeholderTextColor="#94A3B8"
            />
            <TouchableOpacity onPress={handleSaveAddress} activeOpacity={0.85} style={{backgroundColor: '#2563EB', borderRadius: 12, paddingVertical: 14, alignItems: 'center'}}>
              <Text style={{color: '#FFFFFF', fontSize: 15, fontWeight: '700'}}>Save Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* CUSTOM SWEETALERT MODAL */}
      <Modal
        transparent
        visible={alert.visible}
        animationType="none"
        statusBarTranslucent
        onRequestClose={closeAlert}
      >
        <Animated.View
          style={[
            styles.alertOverlay,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.alertCard,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.alertClose}
              onPress={closeAlert}
              activeOpacity={0.7}
            >
              <X size={18} color="#64748B" />
            </TouchableOpacity>

            <View
              style={[
                styles.alertIconCircle,
                { backgroundColor: alertBackground },
              ]}
            >
              <AlertIcon size={34} color={alertColor} />
            </View>

            <Text style={styles.alertTitle}>{alert.title}</Text>

            <Text style={styles.alertMessage}>{alert.message}</Text>

            <View style={styles.alertActions}>
              {alert.cancelText && (
                <TouchableOpacity
                  style={styles.alertCancelButton}
                  activeOpacity={0.8}
                  onPress={closeAlert}
                >
                  <Text style={styles.alertCancelText}>
                    {alert.cancelText}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  styles.alertConfirmButton,
                  { backgroundColor: alertColor },
                  !alert.cancelText && styles.alertSingleButton,
                ]}
                activeOpacity={0.85}
                onPress={confirmAlert}
              >
                <Text style={styles.alertConfirmText}>
                  {alert.confirmText}
                </Text>
                <ChevronRight size={17} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
};

export default CheckoutScreen;
