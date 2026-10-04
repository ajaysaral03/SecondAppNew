import React, {useEffect, useRef, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
} from 'react-native';

import {
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  ChevronRight,
  Tag,
  Check,
  AlertTriangle,
  X,
} from 'lucide-react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

type CartItem = {
  id: string;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
};

type AlertType = 'success' | 'warning' | 'error';

const CartScreen = ({navigation}: Props) => {
  // =========================================================
  // CART DATA
  // =========================================================

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Premium T-Shirt',
      size: 'L',
      color: 'Black',
      price: 799,
      quantity: 1,
      image:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
    },
    {
      id: '2',
      name: 'Casual Sneakers',
      size: '9',
      color: 'White',
      price: 1499,
      quantity: 1,
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
    },
    {
      id: '3',
      name: 'Classic Backpack',
      size: 'Standard',
      color: 'Blue',
      price: 999,
      quantity: 2,
      image:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
    },
  ]);

  // =========================================================
  // SWEET ALERT STATES
  // =========================================================

  const [alertVisible, setAlertVisible] = useState(false);

  const [alertType, setAlertType] =
    useState<AlertType>('success');

  const [alertTitle, setAlertTitle] = useState('');

  const [alertMessage, setAlertMessage] = useState('');

  const [alertConfirmText, setAlertConfirmText] =
    useState('OK');

  const [alertCancelText, setAlertCancelText] =
    useState('');

  const [showCancelButton, setShowCancelButton] =
    useState(false);

  const [confirmButtonColor, setConfirmButtonColor] =
    useState('#2563EB');

  const alertConfirmAction =
    useRef<(() => void) | null>(null);

  // =========================================================
  // ALERT ANIMATION
  // =========================================================

  const alertScale = useRef(
    new Animated.Value(0.75),
  ).current;

  const alertOpacity = useRef(
    new Animated.Value(0),
  ).current;

  useEffect(() => {
    if (alertVisible) {
      alertScale.setValue(0.75);
      alertOpacity.setValue(0);

      Animated.parallel([
        Animated.spring(alertScale, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),

        Animated.timing(alertOpacity, {
          toValue: 1,
          duration: 220,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [alertVisible, alertScale, alertOpacity]);

  // =========================================================
  // SHOW SWEET ALERT
  // =========================================================

  const showSweetAlert = ({
    type,
    title,
    message,
    confirmText = 'OK',
    cancelText = '',
    showCancel = false,
    buttonColor = '#2563EB',
    onConfirm,
  }: {
    type: AlertType;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    showCancel?: boolean;
    buttonColor?: string;
    onConfirm?: () => void;
  }) => {
    setAlertType(type);
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertConfirmText(confirmText);
    setAlertCancelText(cancelText);
    setShowCancelButton(showCancel);
    setConfirmButtonColor(buttonColor);

    alertConfirmAction.current =
      onConfirm || null;

    setAlertVisible(true);
  };

  // =========================================================
  // CLOSE ALERT
  // =========================================================

  const closeSweetAlert = () => {
    Animated.parallel([
      Animated.timing(alertScale, {
        toValue: 0.85,
        duration: 150,
        useNativeDriver: true,
      }),

      Animated.timing(alertOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setAlertVisible(false);
      alertConfirmAction.current = null;
    });
  };

  // =========================================================
  // ALERT CONFIRM
  // =========================================================

  const handleAlertConfirm = () => {
    const action = alertConfirmAction.current;

    closeSweetAlert();

    if (action) {
      setTimeout(() => {
        action();
      }, 180);
    }
  };

  // =========================================================
  // UPDATE QUANTITY
  // =========================================================

  const updateQuantity = (
    id: string,
    type: 'increase' | 'decrease',
  ) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id !== id) {
          return item;
        }

        let newQuantity = item.quantity;

        if (type === 'increase') {
          newQuantity = item.quantity + 1;
        }

        if (type === 'decrease') {
          newQuantity = Math.max(
            1,
            item.quantity - 1,
          );
        }

        return {
          ...item,
          quantity: newQuantity,
        };
      }),
    );
  };

  // =========================================================
  // DELETE ITEM
  // =========================================================

  const removeItem = (item: CartItem) => {
    showSweetAlert({
      type: 'warning',
      title: 'Remove Item?',
      message: `${item.name} will be removed from your cart.`,
      confirmText: 'Remove',
      cancelText: 'Cancel',
      showCancel: true,
      buttonColor: '#DC2626',

      onConfirm: () => {
        setCartItems(prevItems =>
          prevItems.filter(
            cartItem => cartItem.id !== item.id,
          ),
        );

        setTimeout(() => {
          showSweetAlert({
            type: 'success',
            title: 'Removed Successfully',
            message:
              'The product has been removed from your cart.',
            confirmText: 'OK',
            showCancel: false,
            buttonColor: '#2563EB',
          });
        }, 250);
      },
    });
  };

  // =========================================================
  // PRICE CALCULATION
  // =========================================================

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0,
  );

  const deliveryCharge =
    subtotal > 999 ? 0 : 49;

  const discount =
    subtotal > 2000 ? 200 : 0;

  const total =
    subtotal +
    deliveryCharge -
    discount;

  // =========================================================
  // CHECKOUT
  // =========================================================

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showSweetAlert({
        type: 'warning',
        title: 'Your Cart is Empty',
        message:
          'Please add some products before proceeding to checkout.',
        confirmText: 'OK',
        showCancel: false,
        buttonColor: '#2563EB',
      });

      return;
    }

    showSweetAlert({
      type: 'warning',
      title: 'Proceed to Checkout?',
      message: `Your total amount is ₹${total.toLocaleString(
        'en-IN',
      )}. Do you want to continue?`,
      confirmText: 'Proceed',
      cancelText: 'Cancel',
      showCancel: true,
      buttonColor: '#2563EB',

      onConfirm: () => {
        setTimeout(() => {
          showSweetAlert({
            type: 'success',
            title: 'Order Successful 🎉',
            message:
              'Your order has been placed successfully.',
            confirmText: 'Continue',
            showCancel: false,
            buttonColor: '#2563EB',

            onConfirm: () => {
              // Future:
              // navigation.navigate('OrderDetails')
            },
          });
        }, 250);
      },
    });
  };

  // =========================================================
  // RENDER CART ITEM
  // =========================================================

  const renderCartItem = ({
    item,
  }: {
    item: CartItem;
  }) => {
    return (
      <View style={styles.cartCard}>
        {/* PRODUCT IMAGE */}

        <View style={styles.imageContainer}>
          <Image
            source={{uri: item.image}}
            style={styles.productImage}
            resizeMode="cover"
          />
        </View>

        {/* PRODUCT DETAILS */}

        <View style={styles.productDetails}>
          <View style={styles.productTopRow}>
            <Text
              style={styles.productName}
              numberOfLines={2}>
              {item.name}
            </Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => removeItem(item)}
              style={styles.deleteButton}>
              <Trash2
                size={18}
                color="#EF4444"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.productMeta}>
            Size: {item.size}
          </Text>

          <Text style={styles.productMeta}>
            Color: {item.color}
          </Text>

          {/* PRICE + QUANTITY */}

          <View style={styles.bottomRow}>
            <Text style={styles.priceText}>
              ₹
              {(
                item.price *
                item.quantity
              ).toLocaleString('en-IN')}
            </Text>

            <View style={styles.quantityContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  updateQuantity(
                    item.id,
                    'decrease',
                  )
                }
                style={styles.quantityButton}>
                <Minus
                  size={15}
                  color="#111827"
                />
              </TouchableOpacity>

              <Text style={styles.quantityText}>
                {item.quantity}
              </Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  updateQuantity(
                    item.id,
                    'increase',
                  )
                }
                style={styles.quantityButton}>
                <Plus
                  size={15}
                  color="#111827"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // =========================================================
  // EMPTY CART
  // =========================================================

  const renderEmptyCart = () => {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <ShoppingCart
            size={50}
            color="#2563EB"
          />
        </View>

        <Text style={styles.emptyTitle}>
          Your Cart is Empty
        </Text>

        <Text style={styles.emptyMessage}>
          Looks like you haven't added
          {'\n'}
          anything to your cart yet.
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.shopButton}
          onPress={() =>
            navigation.navigate('Home')
          }>
          <Text style={styles.shopButtonText}>
            Start Shopping
          </Text>

          <ChevronRight
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
    );
  };

  // =========================================================
  // SWEET ALERT ICON
  // =========================================================

  const renderAlertIcon = () => {
    if (alertType === 'success') {
      return (
        <View
          style={[
            styles.alertIconCircle,
            styles.successIconCircle,
          ]}>
          <Check
            size={34}
            color="#16A34A"
            strokeWidth={3}
          />
        </View>
      );
    }

    if (alertType === 'error') {
      return (
        <View
          style={[
            styles.alertIconCircle,
            styles.errorIconCircle,
          ]}>
          <X
            size={34}
            color="#DC2626"
            strokeWidth={3}
          />
        </View>
      );
    }

    return (
      <View
        style={[
          styles.alertIconCircle,
          styles.warningIconCircle,
        ]}>
        <AlertTriangle
          size={34}
          color="#F59E0B"
          strokeWidth={2.5}
        />
      </View>
    );
  };

  // =========================================================
  // SWEET ALERT MODAL
  // =========================================================

  const renderSweetAlert = () => {
    return (
      <Modal
        visible={alertVisible}
        transparent
        animationType="none"
        statusBarTranslucent>
        <View style={styles.alertOverlay}>
          <Animated.View
            style={[
              styles.alertBox,
              {
                opacity: alertOpacity,
                transform: [
                  {
                    scale: alertScale,
                  },
                ],
              },
            ]}>
            {renderAlertIcon()}

            <Text style={styles.alertTitle}>
              {alertTitle}
            </Text>

            <Text style={styles.alertMessage}>
              {alertMessage}
            </Text>

            <View
              style={[
                styles.alertButtonsContainer,
                !showCancelButton &&
                  styles.singleButtonContainer,
              ]}>
              {showCancelButton && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.cancelAlertButton}
                  onPress={closeSweetAlert}>
                  <Text style={styles.cancelAlertText}>
                    {alertCancelText}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.confirmAlertButton,
                  {
                    backgroundColor:
                      confirmButtonColor,
                    width: showCancelButton
                      ? '48%'
                      : '100%',
                  },
                ]}
                onPress={handleAlertConfirm}>
                <Text style={styles.confirmAlertText}>
                  {alertConfirmText}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  };

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <View style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        {/* BACK BUTTON */}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <ArrowLeft
            size={21}
            color="#334155"
            strokeWidth={2.2}
          />
        </TouchableOpacity>

        {/* TITLE */}

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>
            My Cart
          </Text>

          <Text style={styles.headerSubtitle}>
            {cartItems.length}{' '}
            {cartItems.length === 1
              ? 'item'
              : 'items'}
          </Text>
        </View>

        {/* CART ICON */}

        <View style={styles.headerRight}>
          <ShoppingCart
            size={21}
            color="#2563EB"
            strokeWidth={2.2}
          />

          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {cartItems.length}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* PRODUCTS + SUMMARY */}

      {cartItems.length === 0 ? (
        renderEmptyCart()
      ) : (
        <View style={styles.content}>
          {/* PRODUCT LIST */}

          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={renderCartItem}
            showsVerticalScrollIndicator={false}
            style={styles.productList}
            contentContainerStyle={
              styles.listContent
            }
          />

          {/* ORDER SUMMARY */}

          <View style={styles.summaryContainer}>
            <View style={styles.summaryHeader}>
              <View style={styles.summaryTitleRow}>
                <Tag
                  size={18}
                  color="#2563EB"
                />

                <Text style={styles.summaryTitle}>
                  Order Summary
                </Text>
              </View>
            </View>

            {/* SUBTOTAL */}

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Subtotal
              </Text>

              <Text style={styles.summaryValue}>
                ₹
                {subtotal.toLocaleString(
                  'en-IN',
                )}
              </Text>
            </View>

            {/* DELIVERY */}

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Delivery
              </Text>

              <Text
                style={[
                  styles.summaryValue,
                  deliveryCharge === 0 &&
                    styles.freeText,
                ]}>
                {deliveryCharge === 0
                  ? 'FREE'
                  : `₹${deliveryCharge}`}
              </Text>
            </View>

            {/* DISCOUNT */}

            {discount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>
                  Discount
                </Text>

                <Text style={styles.discountText}>
                  - ₹
                  {discount.toLocaleString(
                    'en-IN',
                  )}
                </Text>
              </View>
            )}

            <View
              style={styles.summaryDivider}
            />

            {/* TOTAL */}

            <View
              style={[
                styles.summaryRow,
                styles.totalRow,
              ]}>
              <Text style={styles.totalLabel}>
                Total
              </Text>

              <Text style={styles.totalValue}>
                ₹
                {total.toLocaleString(
                  'en-IN',
                )}
              </Text>
            </View>

            {/* CHECKOUT */}

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleCheckout}
              style={styles.checkoutButton}>
              <Text
                style={
                  styles.checkoutButtonText
                }>
                Proceed to Checkout
              </Text>

              <ChevronRight
                size={21}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* SWEET ALERT */}

      {renderSweetAlert()}
    </View>
  );
};

export default CartScreen;

// =========================================================
// STYLES
// =========================================================

const styles = StyleSheet.create({
  // =======================================================
  // CONTAINER
  // =======================================================

  container: {
    flex: 1,
    backgroundColor: '#F7F9FF',
  },

  // =======================================================
  // HEADER
  // =======================================================

  header: {
    height: 76,
    marginTop:30,
    backgroundColor: '#F7F9FF',

    paddingHorizontal: 18,

    flexDirection: 'row',
    alignItems: 'center',

    borderBottomWidth: 1,
    borderBottomColor: '#EDF1F8',
  },

  backButton: {
    width: 42,
    height: 42,

    borderRadius: 14,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#E8EDFF',

    elevation: 2,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  headerCenter: {
    flex: 1,
    marginLeft: 12,
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
  },

  headerSubtitle: {
    marginTop: 3,
    fontSize: 10,
    color: '#64748B',
  },

  headerRight: {
    width: 42,
    height: 42,

    borderRadius: 14,

    backgroundColor: '#EAF1FF',

    alignItems: 'center',
    justifyContent: 'center',

    position: 'relative',

    borderWidth: 1,
    borderColor: '#D9E6FF',
  },

  cartBadge: {
    position: 'absolute',

    top: -4,
    right: -4,

    minWidth: 19,
    height: 19,

    paddingHorizontal: 4,

    borderRadius: 10,

    backgroundColor: '#EF4444',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 2,
    borderColor: '#F7F9FF',
  },

  cartBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // =======================================================
  // CONTENT
  // =======================================================

  content: {
    flex: 1,
    minHeight: 0,
  },

  productList: {
    flex: 1,
  },

  // =======================================================
  // LIST
  // =======================================================

  listContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
  },

  // =======================================================
  // CART CARD
  // =======================================================

  cartCard: {
    flexDirection: 'row',

    backgroundColor: '#FFFFFF',

    borderRadius: 16,

    padding: 10,

    marginBottom: 12,

    borderWidth: 1,
    borderColor: '#E8EDFF',

    elevation: 2,

    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  imageContainer: {
    width: 92,
    height: 105,

    borderRadius: 13,

    overflow: 'hidden',

    backgroundColor: '#F1F5F9',
  },

  productImage: {
    width: '100%',
    height: '100%',
  },

  productDetails: {
    flex: 1,

    marginLeft: 12,

    justifyContent: 'space-between',
  },

  productTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  productName: {
    flex: 1,

    fontSize: 15,

    fontWeight: '700',

    color: '#111827',

    lineHeight: 19,

    paddingRight: 5,
  },

  deleteButton: {
    width: 34,
    height: 34,

    borderRadius: 17,

    backgroundColor: '#FEF2F2',

    alignItems: 'center',
    justifyContent: 'center',
  },

  productMeta: {
    fontSize: 11.5,

    color: '#6B7280',

    marginTop: 3,
  },

  bottomRow: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    marginTop: 8,
  },

  priceText: {
    fontSize: 16,

    fontWeight: '800',

    color: '#111827',
  },

  // =======================================================
  // QUANTITY
  // =======================================================

  quantityContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    height: 34,

    borderRadius: 9,

    borderWidth: 1,
    borderColor: '#E5E7EB',

    backgroundColor: '#F8FAFC',

    overflow: 'hidden',
  },

  quantityButton: {
    width: 32,
    height: 32,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#FFFFFF',
  },

  quantityText: {
    minWidth: 30,

    textAlign: 'center',

    fontSize: 13,

    fontWeight: '700',

    color: '#111827',
  },

  // =======================================================
  // SUMMARY
  // =======================================================

  summaryContainer: {
    backgroundColor: '#FFFFFF',

    paddingHorizontal: 18,

    paddingTop: 12,
    paddingBottom: 14,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    borderTopWidth: 1,
    borderColor: '#E5E7EB',

    elevation: 10,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: -3,
    },
  },

  summaryHeader: {
    marginBottom: 8,
  },

  summaryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  summaryTitle: {
    marginLeft: 8,

    fontSize: 16,

    fontWeight: '800',

    color: '#111827',
  },

  summaryRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginVertical: 3,
  },

  summaryLabel: {
    fontSize: 13,
    color: '#6B7280',
  },

  summaryValue: {
    fontSize: 13,

    fontWeight: '600',

    color: '#111827',
  },

  freeText: {
    color: '#16A34A',
    fontWeight: '800',
  },

  discountText: {
    fontSize: 13,

    fontWeight: '700',

    color: '#16A34A',
  },

  summaryDivider: {
    height: 1,

    backgroundColor: '#E5E7EB',

    marginVertical: 7,
  },

  totalRow: {
    marginTop: 2,
    marginBottom: 10,
  },

  totalLabel: {
    fontSize: 16,

    fontWeight: '800',

    color: '#111827',
  },

  totalValue: {
    fontSize: 19,

    fontWeight: '900',

    color: '#2563EB',
  },

  checkoutButton: {
    height: 50,

    borderRadius: 14,

    backgroundColor: '#2563EB',

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    elevation: 4,

    shadowColor: '#2563EB',

    shadowOpacity: 0.25,

    shadowRadius: 7,

    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  checkoutButtonText: {
    fontSize: 15,

    fontWeight: '800',

    color: '#FFFFFF',

    marginRight: 7,
  },

  // =======================================================
  // EMPTY CART
  // =======================================================

  emptyContainer: {
    flex: 1,

    alignItems: 'center',

    justifyContent: 'center',

    paddingHorizontal: 35,
  },

  emptyIcon: {
    width: 105,
    height: 105,

    borderRadius: 53,

    backgroundColor: '#EFF6FF',

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 22,

    fontWeight: '800',

    color: '#111827',

    marginBottom: 8,
  },

  emptyMessage: {
    fontSize: 14,

    lineHeight: 21,

    color: '#6B7280',

    textAlign: 'center',

    marginBottom: 24,
  },

  shopButton: {
    height: 50,

    paddingHorizontal: 24,

    borderRadius: 13,

    backgroundColor: '#2563EB',

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',
  },

  shopButtonText: {
    color: '#FFFFFF',

    fontSize: 15,

    fontWeight: '800',

    marginRight: 5,
  },

  // =======================================================
  // SWEET ALERT
  // =======================================================

  alertOverlay: {
    flex: 1,

    backgroundColor:
      'rgba(15, 23, 42, 0.55)',

    alignItems: 'center',

    justifyContent: 'center',

    paddingHorizontal: 24,
  },

  alertBox: {
    width: '100%',

    maxWidth: 390,

    backgroundColor: '#FFFFFF',

    borderRadius: 24,

    paddingHorizontal: 22,

    paddingTop: 25,

    paddingBottom: 20,

    alignItems: 'center',

    shadowColor: '#000',

    shadowOpacity: 0.2,

    shadowRadius: 18,

    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 15,
  },

  alertIconCircle: {
    width: 76,
    height: 76,

    borderRadius: 38,

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 15,
  },

  successIconCircle: {
    backgroundColor: '#DCFCE7',
  },

  warningIconCircle: {
    backgroundColor: '#FEF3C7',
  },

  errorIconCircle: {
    backgroundColor: '#FEE2E2',
  },

  alertTitle: {
    fontSize: 21,

    fontWeight: '800',

    color: '#111827',

    textAlign: 'center',

    marginBottom: 8,
  },

  alertMessage: {
    fontSize: 14,

    lineHeight: 21,

    color: '#6B7280',

    textAlign: 'center',

    marginBottom: 22,

    paddingHorizontal: 8,
  },

  alertButtonsContainer: {
    width: '100%',

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  singleButtonContainer: {
    justifyContent: 'center',
  },

  cancelAlertButton: {
    width: '48%',

    height: 48,

    borderRadius: 12,

    backgroundColor: '#F1F5F9',

    alignItems: 'center',

    justifyContent: 'center',

    borderWidth: 1,

    borderColor: '#E2E8F0',
  },

  cancelAlertText: {
    fontSize: 14,

    fontWeight: '700',

    color: '#475569',
  },

  confirmAlertButton: {
    width: '48%',

    height: 48,

    borderRadius: 12,

    backgroundColor: '#2563EB',

    alignItems: 'center',

    justifyContent: 'center',
  },

  confirmAlertText: {
    fontSize: 14,

    fontWeight: '800',

    color: '#FFFFFF',
  },
});