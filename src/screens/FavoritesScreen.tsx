
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  Modal,
  Pressable,
  StatusBar,
  Text,
  View,
} from 'react-native';

import {
  ArrowLeft,
  Check,
  Heart,
  HeartOff,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import styles from '../styles/FavoritesScreen';
import Footer from '../components/Footer';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Hafsa Mina',
    price: 360.56,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600',
  },
  {
    id: '2',
    name: 'Al Sheikha',
    price: 660.76,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600',
  },
  {
    id: '3',
    name: 'Kadeem',
    price: 580.99,
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600',
  },
  {
    id: '4',
    name: 'Alia',
    price: 146.76,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600',
  },
  {
    id: '5',
    name: 'Elegant Abaya',
    price: 425.50,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600',
  },
  {
    id: '6',
    name: 'Classic Collection',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600',
  },
  {
    id: '7',
    name: 'Modern Style',
    price: 510.00,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600',
  },
  {
    id: '8',
    name: 'Premium Outfit',
    price: 720.25,
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600',
  },
];

interface ProductCardProps {
  item: Product;
  index: number;
  onFavorite: (item: Product) => void;
  onCart: (item: Product) => void;
}

const ProductCard = ({
  item,
  index,
  onFavorite,
  onCart,
}: ProductCardProps) => {
  const scale = useRef(new Animated.Value(0.94)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const pressScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        speed: 16,
        bounciness: 3,
        delay: (index % 4) * 55,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        delay: (index % 4) * 55,
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => animation.stop();
  }, [index, opacity, scale]);

  const animatePress = (pressed: boolean) => {
    Animated.spring(pressScale, {
      toValue: pressed ? 0.97 : 1,
      speed: 25,
      bounciness: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        {
          opacity,
          transform: [
            { scale },
            { scale: pressScale },
          ],
        },
      ]}
    >
      <View style={styles.card}>
        {/* PRODUCT IMAGE */}
        <View style={styles.imageSection}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />

          <View style={styles.imageOverlay} />

          {/* FAVORITE HEART */}
          <Pressable
            accessibilityLabel={`Remove ${item.name} from favorites`}
            hitSlop={6}
            style={({ pressed }) => [
              styles.heart,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => onFavorite(item)}
          >
            <Heart
              size={19}
              color="#EF4444"
              fill="#EF4444"
            />
          </Pressable>
        </View>

        {/* PRODUCT INFORMATION */}
        <View style={styles.info}>
          <View style={styles.productDetails}>
            <Text
              style={styles.productName}
              numberOfLines={2}
            >
              {item.name}
            </Text>

            <Text style={styles.price}>
              {item.price.toFixed(2)} AED
            </Text>
          </View>

          {/* ADD BUTTON */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Add ${item.name} to cart`}
            style={({ pressed }) => [
              styles.cartBtn,
              pressed && styles.cartPressed,
            ]}
            onPress={() => onCart(item)}
            onPressIn={() => animatePress(true)}
            onPressOut={() => animatePress(false)}
          >
            <ShoppingBag
              size={15}
              color="#FFFFFF"
              strokeWidth={2.3}
            />
            <Text style={styles.cartText}>Add to Cart</Text>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
};

const FavoritesScreen = () => {
  const navigation = useNavigation<any>();

  const [products, setProducts] =
    useState<Product[]>(INITIAL_PRODUCTS);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [successText, setSuccessText] = useState('');

  const timer =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const showSuccess = (message: string) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    setSuccessText(message);
    setSuccessModal(true);

    timer.current = setTimeout(() => {
      setSuccessModal(false);
    }, 1800);
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  const removeFavorite = (item: Product) => {
    setSelectedProduct(item);
    setDeleteModal(true);
  };

  const confirmRemove = () => {
    if (!selectedProduct) return;

    setProducts(current =>
      current.filter(item => item.id !== selectedProduct.id),
    );

    setDeleteModal(false);
    setSelectedProduct(null);

    showSuccess('Product removed from favorites');
  };

  const addToCart = (item: Product) => {
    // Connect your existing cart state or API here.
    showSuccess(`${item.name} added to cart`);
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top']}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F9FF"
      />

      <View style={styles.screen}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            accessibilityLabel="Go back"
            hitSlop={8}
            onPress={handleBack}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
          >
            <ArrowLeft
              size={22}
              color="#334155"
              strokeWidth={2.5}
            />
          </Pressable>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>
              My Favorites
            </Text>

            <Text style={styles.headerSubtitle}>
              {products.length} products saved
            </Text>
          </View>

          <View style={styles.editButton}>
            <Heart
              size={21}
              color="#2563EB"
              fill="#2563EB"
            />
          </View>
        </View>

        {/* SCROLLABLE TWO-COLUMN GRID */}
        {products.length > 0 ? (
          <FlatList
            style={styles.list}
            data={products}
            numColumns={2}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContent}
            renderItem={({ item, index }) => (
              <ProductCard
                item={item}
                index={index}
                onFavorite={removeFavorite}
                onCart={addToCart}
              />
            )}
          />
        ) : (
          <View style={styles.empty}>
            <View style={styles.emptyCircle}>
              <HeartOff
                size={42}
                color="#2563EB"
              />
            </View>

            <Text style={styles.emptyTitle}>
              No Favorites Yet
            </Text>

            <Text style={styles.emptyText}>
              Save your favorite products to see them here.
            </Text>

            <Pressable
              style={styles.exploreBtn}
              onPress={() => navigation.navigate('Products')}
            >
              <Text style={styles.exploreText}>
                Explore Products
              </Text>
            </Pressable>
          </View>
        )}

        {/* DELETE CONFIRMATION */}
        <Modal
          visible={deleteModal}
          transparent
          animationType="fade"
          statusBarTranslucent
          onRequestClose={() => setDeleteModal(false)}
        >
          <View style={styles.overlay}>
            <View style={styles.alertBox}>
              <Pressable
                style={styles.close}
                onPress={() => setDeleteModal(false)}
              >
                <X size={18} color="#64748B" />
              </Pressable>

              <View style={styles.warningIcon}>
                <Trash2
                  size={26}
                  color="#EF4444"
                />
              </View>

              <Text style={styles.alertTitle}>
                Remove Favorite?
              </Text>

              <Text style={styles.alertMessage}>
                Are you sure you want to remove this
                product from your favorites?
              </Text>

              <View style={styles.alertActions}>
                <Pressable
                  style={styles.cancel}
                  onPress={() => setDeleteModal(false)}
                >
                  <Text style={styles.cancelText}>
                    Cancel
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.confirm}
                  onPress={confirmRemove}
                >
                  <Text style={styles.confirmText}>
                    Remove
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* SUCCESS TOAST */}
        <Modal
          visible={successModal}
          transparent
          animationType="fade"
          statusBarTranslucent
          onRequestClose={() => setSuccessModal(false)}
        >
          <View
            style={styles.successOverlay}
            pointerEvents="box-none"
          >
            <View style={styles.successBox}>
              <View style={styles.successIcon}>
                <Check
                  size={22}
                  color="#FFFFFF"
                  strokeWidth={3}
                />
              </View>

              <View style={styles.successContent}>
                <Text style={styles.successTitle}>
                  Success
                </Text>

                <Text style={styles.successMessage}>
                  {successText}
                </Text>
              </View>

              <Pressable
                onPress={() => setSuccessModal(false)}
              >
                <X size={18} color="#9CA3AF" />
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* BOTTOM NAVIGATION */}
        <Footer
          activeTab="favorites"
          cartCount={0}
        />
      </View>
    </SafeAreaView>
  );
};

export default FavoritesScreen;
