
import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';


const CartScreen = ({onBack}) => {

  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Premium T-Shirt',
      size: 'L',
      color: 'Black',
      price: 799,
      quantity: 1,
      image:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    },

    {
      id: '2',
      name: 'Casual Sneakers',
      size: '9',
      color: 'White',
      price: 1499,
      quantity: 1,
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    },
    {
      id: '5',
      name: 'Casual Sneakers',
      size: '9',
      color: 'White',
      price: 1499,
      quantity: 1,
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    },

    {
      id: '3',
      name: 'Classic Backpack',
      size: 'Standard',
      color: 'Blue',
      price: 999,
      quantity: 2,
      image:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    },
    {
      id: '4',
      name: 'Classic Backpack',
      size: 'Standard',
      color: 'Blue',
      price: 999,
      quantity: 2,
      image:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    },
  ]);


  // =====================================================
  // QUANTITY
  // =====================================================

  const updateQuantity = (id, type) => {

    setCartItems(prev =>
      prev.map(item => {

        if (item.id !== id) {
          return item;
        }

        let quantity = item.quantity;

        if (type === 'increase') {
          quantity += 1;
        }

        if (type === 'decrease' && quantity > 1) {
          quantity -= 1;
        }

        return {
          ...item,
          quantity,
        };
      }),
    );
  };


  // =====================================================
  // REMOVE
  // =====================================================

  const removeItem = id => {

    setCartItems(prev =>
      prev.filter(item => item.id !== id),
    );

  };


  // =====================================================
  // PRICE
  // =====================================================

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0,
  );

  const delivery = subtotal > 999 ? 0 : 49;

  const discount =
    subtotal > 2000 ? 200 : 0;

  const total =
    subtotal + delivery - discount;


  // =====================================================
  // PRODUCT ITEM
  // =====================================================

  const renderItem = ({item}) => (

    <View style={styles.productCard}>

      <Image
        source={{uri: item.image}}
        style={styles.productImage}
      />

      <View style={styles.productInfo}>

        <View style={styles.productTopRow}>

          <Text
            style={styles.productName}
            numberOfLines={2}
          >
            {item.name}
          </Text>

          <TouchableOpacity
            onPress={() => removeItem(item.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.deleteIcon}>
              🗑
            </Text>
          </TouchableOpacity>

        </View>


        <Text style={styles.productDetails}>
          {item.color} • {item.size}
        </Text>


        <Text style={styles.price}>
          ₹{item.price.toLocaleString('en-IN')}
        </Text>


        <View style={styles.bottomRow}>

          <View style={styles.quantityContainer}>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() =>
                updateQuantity(
                  item.id,
                  'decrease',
                )
              }
            >
              <Text style={styles.quantityButtonText}>
                −
              </Text>
            </TouchableOpacity>


            <Text style={styles.quantity}>
              {item.quantity}
            </Text>


            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() =>
                updateQuantity(
                  item.id,
                  'increase',
                )
              }
            >
              <Text style={styles.quantityButtonText}>
                +
              </Text>
            </TouchableOpacity>

          </View>


          <Text style={styles.itemTotal}>
            ₹
            {(
              item.price *
              item.quantity
            ).toLocaleString('en-IN')}
          </Text>

        </View>

      </View>

    </View>
  );


  // =====================================================
  // SCREEN
  // =====================================================

  return (

    <View style={styles.container}>

      {/* STATUS BAR */}

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
        hidden={false}
      />


      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={onBack}
        >
          <Text style={styles.backIcon}>
            ‹
          </Text>
        </TouchableOpacity>


        <View style={styles.headerTitleContainer}>

          <Text style={styles.headerTitle}>
            My Cart
          </Text>

          <Text style={styles.headerSubtitle}>
            {cartItems.length} items
          </Text>

        </View>

      </View>


      {/* CART LIST */}

      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}

        ListEmptyComponent={

          <View style={styles.emptyContainer}>

            <Text style={styles.emptyIcon}>
              🛒
            </Text>

            <Text style={styles.emptyTitle}>
              Your cart is empty
            </Text>

            <Text style={styles.emptyText}>
              Add some products to your cart.
            </Text>

          </View>

        }
      />


      {/* BOTTOM SUMMARY */}

      {cartItems.length > 0 && (

        <View style={styles.bottomContainer}>

          <View style={styles.summaryRow}>

            <Text style={styles.summaryLabel}>
              Subtotal
            </Text>

            <Text style={styles.summaryValue}>
              ₹{subtotal.toLocaleString('en-IN')}
            </Text>

          </View>


          <View style={styles.summaryRow}>

            <Text style={styles.summaryLabel}>
              Delivery
            </Text>

            <Text style={styles.deliveryValue}>
              {delivery === 0
                ? 'FREE'
                : `₹${delivery}`}
            </Text>

          </View>


          {discount > 0 && (

            <View style={styles.summaryRow}>

              <Text style={styles.summaryLabel}>
                Discount
              </Text>

              <Text style={styles.discountValue}>
                -₹{discount}
              </Text>

            </View>

          )}


          <View style={styles.divider} />


          <View style={styles.totalRow}>

            <Text style={styles.totalLabel}>
              Total
            </Text>

            <Text style={styles.totalValue}>
              ₹{total.toLocaleString('en-IN')}
            </Text>

          </View>


          <TouchableOpacity
            style={styles.checkoutButton}
            activeOpacity={0.85}
          >

            <Text style={styles.checkoutText}>
              Proceed to Checkout
            </Text>

            <Text style={styles.checkoutArrow}>
              →
            </Text>

          </TouchableOpacity>

        </View>

      )}

    </View>
  );
};


export default CartScreen;


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },


  // ===================================================
  // HEADER
  // ===================================================

  header: {
    height: 125,

    backgroundColor: '#FFFFFF',

    flexDirection: 'row',
    alignItems: 'flex-end',

    paddingHorizontal: 16,

    paddingBottom: 18,

    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',

    elevation: 4,
  },


  backButton: {
    width: 44,
    height: 44,

    borderRadius: 13,

    backgroundColor: '#F1F5F9',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 12,
  },


  backIcon: {
    fontSize: 32,
    lineHeight: 35,

    color: '#111827',

    marginTop: -3,
  },


  headerTitleContainer: {
    justifyContent: 'center',
  },


  headerTitle: {
    fontSize: 21,

    fontWeight: '700',

    color: '#111827',
  },


  headerSubtitle: {
    marginTop: 3,

    fontSize: 12,

    color: '#64748B',
  },


  // ===================================================
  // LIST
  // ===================================================

  listContent: {
    padding: 16,

    paddingTop: 16,

    paddingBottom: 20,
  },


  // ===================================================
  // PRODUCT CARD
  // ===================================================

  productCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 18,

    padding: 12,

    marginBottom: 12,

    flexDirection: 'row',

    borderWidth: 1,

    borderColor: '#EEF2F7',

    elevation: 2,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.05,

    shadowRadius: 5,
  },


  productImage: {
    width: 105,

    height: 115,

    borderRadius: 14,

    backgroundColor: '#F1F5F9',
  },


  productInfo: {
    flex: 1,

    marginLeft: 13,
  },


  productTopRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'flex-start',
  },


  productName: {
    flex: 1,

    fontSize: 15,

    fontWeight: '700',

    color: '#111827',

    marginRight: 8,
  },


  deleteIcon: {
    fontSize: 17,
  },


  productDetails: {
    marginTop: 6,

    fontSize: 12,

    color: '#64748B',
  },


  price: {
    marginTop: 8,

    fontSize: 16,

    fontWeight: '700',

    color: '#2563EB',
  },


  bottomRow: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    marginTop: 10,
  },


  quantityContainer: {
    height: 34,

    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor: '#F8FAFC',

    borderRadius: 10,

    borderWidth: 1,

    borderColor: '#E2E8F0',
  },


  quantityButton: {
    width: 32,

    height: 32,

    justifyContent: 'center',

    alignItems: 'center',
  },


  quantityButtonText: {
    fontSize: 19,

    fontWeight: '600',

    color: '#2563EB',
  },


  quantity: {
    minWidth: 25,

    textAlign: 'center',

    fontSize: 13,

    fontWeight: '700',

    color: '#111827',
  },


  itemTotal: {
    fontSize: 14,

    fontWeight: '700',

    color: '#111827',
  },


  // ===================================================
  // BOTTOM SUMMARY
  // ===================================================

  bottomContainer: {
    backgroundColor: '#FFFFFF',

    paddingHorizontal: 18,

    paddingTop: 14,

    paddingBottom: 14,

    borderTopLeftRadius: 24,

    borderTopRightRadius: 24,

    elevation: 12,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: -3,
    },

    shadowOpacity: 0.08,

    shadowRadius: 8,
  },


  summaryRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginBottom: 7,
  },


  summaryLabel: {
    fontSize: 13,

    color: '#64748B',
  },


  summaryValue: {
    fontSize: 13,

    fontWeight: '600',

    color: '#334155',
  },


  deliveryValue: {
    fontSize: 13,

    fontWeight: '700',

    color: '#16A34A',
  },


  discountValue: {
    fontSize: 13,

    fontWeight: '700',

    color: '#16A34A',
  },


  divider: {
    height: 1,

    backgroundColor: '#E2E8F0',

    marginVertical: 8,
  },


  totalRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: 12,
  },


  totalLabel: {
    fontSize: 16,

    fontWeight: '700',

    color: '#111827',
  },


  totalValue: {
    fontSize: 20,

    fontWeight: '800',

    color: '#111827',
  },


  checkoutButton: {
    height: 52,

    borderRadius: 15,

    backgroundColor: '#2563EB',

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    elevation: 4,
  },


  checkoutText: {
    fontSize: 15,

    fontWeight: '700',

    color: '#FFFFFF',
  },


  checkoutArrow: {
    marginLeft: 10,

    fontSize: 21,

    color: '#FFFFFF',
  },


  // ===================================================
  // EMPTY
  // ===================================================

  emptyContainer: {
    alignItems: 'center',

    justifyContent: 'center',

    paddingTop: 100,
  },


  emptyIcon: {
    fontSize: 55,
  },


  emptyTitle: {
    marginTop: 16,

    fontSize: 19,

    fontWeight: '700',

    color: '#111827',
  },


  emptyText: {
    marginTop: 6,

    fontSize: 13,

    color: '#64748B',
  },

});