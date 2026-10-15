import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import {
  Check,
  ShoppingBag,
  Truck,
  Package,
  Copy,
  CreditCard,
  ArrowRight,
  Home,
  CheckCircle2,
} from 'lucide-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import styles from '../styles/OrderSuccessScreen';

type OrderItem = {
  id?: string | number;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
};

const OrderSuccessScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const orderId = route.params?.orderId ?? 'ORD-20261015-4821';
  const total = Number(route.params?.total ?? 1499);
  const paymentMethod = route.params?.paymentMethod ?? 'UPI';

  const orderItems: OrderItem[] =
    route.params?.orderItems ??
    route.params?.cartItems ?? [
      {
        id: '1',
        name: route.params?.productName ?? 'Classic Running Shoes',
        price: Number(route.params?.productPrice ?? total),
        quantity: Number(route.params?.quantity ?? 1),
        variant: route.params?.productVariant ?? 'White • Size 8',
      },
    ];

  const firstItem = orderItems[0];
  const itemCount = orderItems.reduce(
    (sum, item) => sum + Number(item.quantity || 1),
    0,
  );

  const successScale = useRef(new Animated.Value(0.2)).current;
  const successOpacity = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslate = useRef(new Animated.Value(24)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslate = useRef(new Animated.Value(-12)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslate = useRef(new Animated.Value(18)).current;
  const pulseScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 280,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(headerTranslate, {
          toValue: 0,
          duration: 320,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(successScale, {
          toValue: 1,
          friction: 5,
          tension: 90,
          useNativeDriver: true,
        }),
        Animated.timing(successOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 350,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(contentTranslate, {
          toValue: 0,
          duration: 380,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(buttonTranslate, {
          toValue: 0,
          duration: 380,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseScale, {
          toValue: 1.045,
          duration: 950,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulseScale, {
          toValue: 1,
          duration: 950,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );

    pulse.start();
    return () => pulse.stop();
  }, [
    successScale,
    successOpacity,
    contentOpacity,
    contentTranslate,
    headerOpacity,
    headerTranslate,
    buttonOpacity,
    buttonTranslate,
    pulseScale,
  ]);

  const copyOrderId = () => {
    // Optional: install @react-native-clipboard/clipboard for actual copying.
    console.log('Order ID:', orderId);
  };

  const trackOrder = () => {
    // Make sure "OrderTracking" is registered in your Stack Navigator.
    navigation.navigate('OrderTracking', {orderId, total, orderItems});
  };

  const continueShopping = () => {
    // Change "Home" to the exact route name used in your navigator.
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Clean, aligned app header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: headerOpacity,
            transform: [{translateY: headerTranslate}],
          },
        ]}>
        <View style={styles.logoContainer}>
          <ShoppingBag size={21} color="#2563EB" strokeWidth={2.3} />
        </View>

        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle}>Order Confirmed</Text>
          <Text style={styles.headerSubtitle}>Thank you for your purchase</Text>
        </View>

        <View style={styles.headerStatus}>
          <CheckCircle2 size={19} color="#16A34A" />
        </View>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Animated success badge */}
        <Animated.View
          style={[
            styles.successSection,
            {
              opacity: successOpacity,
              transform: [{scale: successScale}],
            },
          ]}>
          <Animated.View
            style={[
              styles.successHalo,
              {transform: [{scale: pulseScale}]},
            ]}>
            <View style={styles.successCircle}>
              <Check size={47} color="#FFFFFF" strokeWidth={3.2} />
            </View>
          </Animated.View>

          <View style={[styles.confetti, styles.confettiOne]} />
          <View style={[styles.confetti, styles.confettiTwo]} />
          <View style={[styles.confetti, styles.confettiThree]} />
          <View style={[styles.confetti, styles.confettiFour]} />
          <View style={[styles.confetti, styles.confettiFive]} />
        </Animated.View>

        <Animated.View
          style={[
            styles.titleSection,
            {
              opacity: contentOpacity,
              transform: [{translateY: contentTranslate}],
            },
          ]}>
          <View style={styles.successPill}>
            <CheckCircle2 size={14} color="#15803D" />
            <Text style={styles.successPillText}>PAYMENT CONFIRMATION</Text>
          </View>

          <Text style={styles.successTitle}>Order Placed Successfully!</Text>
          <Text style={styles.successSubtitle}>
            Thank you for shopping with us.{'\n'}Your order is being prepared.
          </Text>
        </Animated.View>

        <Animated.View
          style={{
            opacity: contentOpacity,
            transform: [{translateY: contentTranslate}],
          }}>
          {/* Order ID */}
          <View style={styles.orderIdCard}>
            <View style={styles.orderIdCopy}>
              <Text style={styles.smallLabel}>ORDER ID</Text>
              <Text style={styles.orderIdText}>#{orderId}</Text>
            </View>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={copyOrderId}
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityLabel="Copy order ID">
              <Copy size={17} color="#2563EB" />
            </TouchableOpacity>
          </View>

          {/* Delivery estimate */}
          <View style={styles.deliveryCard}>
            <View style={styles.deliveryIcon}>
              <Truck size={24} color="#2563EB" />
            </View>
            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryLabel}>EXPECTED DELIVERY</Text>
              <Text style={styles.deliveryDate}>In 3–5 business days</Text>
              <Text style={styles.deliveryHint}>
                We’ll update you when your order ships.
              </Text>
            </View>
          </View>

          {/* Order summary */}
          <View style={styles.section}>
            <View style={styles.sectionHeadingRow}>
              <Text style={styles.sectionTitle}>Order Summary</Text>
              <Text style={styles.itemCount}>{itemCount} item(s)</Text>
            </View>

            {orderItems.map((item, index) => (
              <View
                key={String(item.id ?? `${item.name}-${index}`)}
                style={[
                  styles.productCard,
                  index > 0 && styles.productCardDivider,
                ]}>
                <View style={styles.productImage}>
                  <Package size={30} color="#2563EB" />
                </View>

                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <Text style={styles.productVariant}>
                    {item.variant ?? 'Product'}
                  </Text>
                  <Text style={styles.productQuantity}>
                    Qty: {item.quantity}
                  </Text>
                </View>

                <Text style={styles.productPrice}>
                  ₹{(Number(item.price) * Number(item.quantity)).toLocaleString('en-IN')}
                </Text>
              </View>
            ))}

            <View style={styles.divider} />
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Total Amount</Text>
              <Text style={styles.totalPrice}>
                ₹{total.toLocaleString('en-IN')}
              </Text>
            </View>
          </View>

          {/* Payment */}
          <View style={styles.paymentCard}>
            <View style={styles.paymentIcon}>
              <CreditCard size={21} color="#2563EB" />
            </View>

            <View style={styles.paymentInfo}>
              <Text style={styles.paymentLabel}>Payment Method</Text>
              <Text style={styles.paymentValue}>
                {paymentMethod === 'COD'
                  ? 'Cash on Delivery'
                  : paymentMethod === 'UPI'
                    ? 'UPI Payment'
                    : 'Card Payment'}
              </Text>
            </View>

            <View
              style={[
                styles.paymentStatus,
                paymentMethod === 'COD' && styles.codStatus,
              ]}>
              <Text
                style={[
                  styles.paymentStatusText,
                  paymentMethod === 'COD' && styles.codStatusText,
                ]}>
                {paymentMethod === 'COD' ? 'PAY LATER' : 'DEMO PAID'}
              </Text>
            </View>
          </View>

          <View style={styles.secureNote}>
            <CheckCircle2 size={16} color="#16A34A" />
            <Text style={styles.secureNoteText}>
              Your order details are ready to view.
            </Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Fixed bottom actions */}
      <Animated.View
        style={[
          styles.bottomContainer,
          {
            opacity: buttonOpacity,
            transform: [{translateY: buttonTranslate}],
          },
        ]}>
        <TouchableOpacity
          style={styles.trackButton}
          onPress={trackOrder}
          activeOpacity={0.85}
          accessibilityRole="button">
          <Truck size={20} color="#FFFFFF" />
          <Text style={styles.trackButtonText}>Track Order</Text>
          <ArrowRight size={19} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={continueShopping}
          activeOpacity={0.85}
          accessibilityRole="button">
          <Home size={18} color="#2563EB" />
          <Text style={styles.continueButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default OrderSuccessScreen;
