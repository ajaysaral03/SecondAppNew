import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Easing,
  Alert,
} from 'react-native';

import {
  Search,
  Heart,
  ChevronRight,
  Star,
  Plus,
  Sparkles,
  Tag,
  Package,
} from 'lucide-react-native';

import Slick from 'react-native-slick';
import SweetAlert from 'react-native-sweet-alert';

import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/HomeScreen';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  rating: number;
  image: string;
}

interface ApiProduct {
  id: number;
  title: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
}

interface ProductsApiResponse {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
}

interface HomeScreenProps {
  onLogout?: () => void;
  onProfilePress?: () => void;
  onCartPress?: () => void;
  onProductPress?: (product: Product) => void;
  onHomePress?: () => void;
  onProductsPress?: () => void;
  onFavoritesPress?: () => void;
  onAddToCart?: (product: Product) => void;
}

// Same conversion used by ProductsScreen.fixed.tsx
const USD_TO_INR = 85;

const formatINR = (price: number): string =>
  `₹${Math.round(price).toLocaleString('en-IN')}`;

const mapApiCategory = (category: string): string => {
  const value = category.toLowerCase();

  if (value.includes('shoe')) return 'Shoes';
  if (value.includes('watch')) return 'Watches';
  if (value.includes('bag')) return 'Bags';

  if (
    value.includes('beauty') ||
    value.includes('skin-care') ||
    value.includes('fragrances') ||
    value.includes('makeup')
  ) {
    return 'Beauty';
  }

  if (
    value.includes('furniture') ||
    value.includes('home-decoration') ||
    value.includes('kitchen-accessories')
  ) {
    return 'Home';
  }

  if (
    value.includes('laptop') ||
    value.includes('smartphone') ||
    value.includes('mobile-accessories') ||
    value.includes('tablet')
  ) {
    return 'Electronics';
  }

  return 'Fashion';
};

const HomeScreen: React.FC<HomeScreenProps> = ({
  onLogout,
  onProfilePress,
  onCartPress,
  onProductPress,
  onHomePress,
  onProductsPress,
  onFavoritesPress,
  onAddToCart,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [apiError, setApiError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  const navigation = useNavigation<any>();
  

  // Fetch products
  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        setApiError('');

        const response = await fetch(
          'https://dummyjson.com/products?limit=100',
        );

        if (!response.ok) {
          throw new Error(
            `Products request failed: ${response.status}`,
          );
        }

        const data: ProductsApiResponse = await response.json();

        const formattedProducts: Product[] = data.products.map(item => {
          const discount = Math.min(
            Math.max(item.discountPercentage || 0, 0),
            99,
          );

          const priceInINR = item.price * USD_TO_INR;

          const oldPriceInINR =
            discount > 0
              ? priceInINR / (1 - discount / 100)
              : priceInINR;

          return {
            id: String(item.id),
            name: item.title,
            category: mapApiCategory(item.category),
            price: Math.round(priceInINR),
            oldPrice: Math.round(oldPriceInINR),
            rating: Number(item.rating || 0),
            image: item.thumbnail,
          };
        });

        if (isMounted) {
          setProducts(formattedProducts);
        }
      } catch {
        if (isMounted) {
          setApiError(
            'Products load nahi ho paye. Internet check karke retry karein.',
          );
        }
      } finally {
        if (isMounted) {
          setLoadingProducts(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [retryCount]);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(25)).current;
  const floatingAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 7,
        tension: 45,
        useNativeDriver: true,
      }),
    ]).start();

    const floatingLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnim, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnim, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    floatingLoop.start();

    return () => {
      floatingLoop.stop();
    };
  }, [fadeAnim, slideAnim, floatingAnim]);

  // Categories
  const categories = [
    {id: '1', name: 'All', icon: '✨'},
    {id: '2', name: 'Fashion', icon: '👕'},
    {id: '3', name: 'Shoes', icon: '👟'},
    {id: '4', name: 'Beauty', icon: '💄'},
    {id: '5', name: 'Electronics', icon: '🎧'},
    {id: '6', name: 'Home', icon: '🏠'},
    {id: '7', name: 'Watches', icon: '⌚'},
    {id: '8', name: 'Bags', icon: '👜'},
  ];

  // Banners
  const banners = [
    {
      id: '1',
      title: 'Up to 50% OFF',
      subtitle: 'Fashion & Lifestyle',
      badge: 'BIG SALE',
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000',
    },
    {
      id: '2',
      title: 'New Collection',
      subtitle: 'Trending Fashion 2026',
      badge: 'NEW ARRIVALS',
      image:
        'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1000',
    },
    {
      id: '3',
      title: 'Tech Deals',
      subtitle: 'Smart gadgets at best prices',
      badge: 'HOT DEALS',
      image:
        'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1000',
    },
  ];

  // Search and category filter
  const filteredProducts = products.filter(product => {
    const categoryMatch =
      selectedCategory === 'All' ||
      product.category === selectedCategory;

    const searchMatch = product.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    return categoryMatch && searchMatch;
  });

  // Add to cart
  const handleAddToCart = (product: Product) => {
    if (onAddToCart) {
      onAddToCart(product);
      return;
    }

    setCartCount(previous => previous + 1);

    Alert.alert(
      'Added to Cart',
      `${product.name} added successfully.`,
      [{text: 'Continue Shopping'}],
    );
  };

  // Open ProductDetails screen
  const handleProductPress = (product: Product) => {
    if (onProductPress) {
      onProductPress(product);
      return;
    }

    navigation.navigate('ProductDetails', {
      product: {
        id: product.id,
        name: product.name,
        title: product.name,
        category: product.category,
        price: product.price,
        oldPrice: product.oldPrice,
        rating: product.rating,
        image: product.image,
        thumbnail: product.image,
        images: [product.image],
      },
    });
  };

  // Notifications
  const handleNotification = () => {
    SweetAlert.showAlert(
      'Notifications',
      'You have 3 new notifications.',
      [{text: 'OK'}],
      {type: 'info'},
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
        <Header
          onProfilePress={() => navigation.navigate('Profile')}
          onCartPress={() => navigation.navigate('Cart')}
          cartCount={0}
          onNotificationPress={() => navigation.navigate('Notification')}
        />

      <Animated.View
        style={[
          styles.contentWrapper,
          {
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}],
          },
        ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}>
          {/* Search */}
          <View style={styles.searchContainer}>
            <Search size={21} color="#64748B" />

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search products..."
              placeholderTextColor="#94A3B8"
              style={styles.searchInput}
            />

            <View style={styles.searchIcon}>
              <Sparkles size={17} color="#2563EB" />
            </View>
          </View>

          {/* Banner slider */}
          <View style={styles.sliderContainer}>
            <Slick
              autoplay
              autoplayTimeout={3}
              showsPagination
              loop
              horizontal
              showsButtons={false}
              paginationStyle={styles.pagination}
              dotStyle={styles.dot}
              activeDotStyle={styles.activeDot}>
              {banners.map(banner => (
                <View key={banner.id} style={styles.slide}>
                  <Image
                    source={{uri: banner.image}}
                    style={styles.bannerImage}
                    resizeMode="cover"
                  />

                  <View style={styles.bannerOverlay} />

                  <View style={styles.bannerContent}>
                    <View style={styles.saleBadge}>
                      <Tag size={12} color="#FFFFFF" />
                      <Text style={styles.saleText}>
                        {banner.badge}
                      </Text>
                    </View>

                    <Text style={styles.bannerTitle}>
                      {banner.title}
                    </Text>

                    <Text style={styles.bannerSubtitle}>
                      {banner.subtitle}
                    </Text>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.shopButton}
                      onPress={() => onProductsPress?.()}>
                      <Text style={styles.shopButtonText}>
                        Shop Now
                      </Text>
                      <ChevronRight
                        size={16}
                        color="#2563EB"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </Slick>
          </View>

          {/* Category heading */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>

            <TouchableOpacity
              onPress={() => setSelectedCategory('All')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}>
            {categories.map(category => {
              const active =
                selectedCategory === category.name;

              return (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryItem}
                  activeOpacity={0.8}
                  onPress={() =>
                    setSelectedCategory(category.name)
                  }>
                  <View
                    style={[
                      styles.categoryIcon,
                      active && styles.categoryIconActive,
                    ]}>
                    <Text style={styles.categoryEmoji}>
                      {category.icon}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.categoryText,
                      active && styles.categoryTextActive,
                    ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Products heading */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Popular Products
              </Text>
              <Text style={styles.sectionSubtitle}>
                {filteredProducts.length} products available
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => onProductsPress?.()}>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Loading */}
          {loadingProducts && (
            <View
              style={{
                paddingVertical: 28,
                alignItems: 'center',
              }}>
              <ActivityIndicator
                size="large"
                color="#2563EB"
              />
              <Text
                style={{
                  marginTop: 10,
                  color: '#64748B',
                }}>
                Loading products...
              </Text>
            </View>
          )}

          {/* API error */}
          {!loadingProducts && apiError !== '' && (
            <View
              style={{
                padding: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#DC2626',
                  textAlign: 'center',
                }}>
                {apiError}
              </Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  setRetryCount(previous => previous + 1)
                }
                style={{
                  marginTop: 12,
                  paddingHorizontal: 18,
                  paddingVertical: 10,
                  backgroundColor: '#2563EB',
                  borderRadius: 8,
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '600',
                  }}>
                  Retry
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Product grid */}
          {!loadingProducts && apiError === '' && (
            <View style={styles.productGrid}>
              {filteredProducts.map(product => (
                <TouchableOpacity
                  key={product.id}
                  activeOpacity={0.92}
                  style={styles.productCard}
                  onPress={() => handleProductPress(product)}>
                  {/* Product image */}
                  <View style={styles.productImageContainer}>
                    <Image
                      source={{uri: product.image}}
                      style={styles.productImage}
                      resizeMode="cover"
                    />

                    {/* Favorite */}
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.favoriteButton}
                      onPress={() =>
                        Alert.alert(
                          'Favorites',
                          'Favorites feature ko connect karna baaki hai.',
                        )
                      }>
                      <Heart size={17} color="#334155" />
                    </TouchableOpacity>

                    {/* Sale badge */}
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>
                        SALE
                      </Text>
                    </View>
                  </View>

                  {/* Product info */}
                  <View style={styles.productInfo}>
                    <Text style={styles.productCategory}>
                      {product.category}
                    </Text>

                    <Text
                      numberOfLines={1}
                      style={styles.productName}>
                      {product.name}
                    </Text>

                    {/* Rating */}
                    <View style={styles.ratingRow}>
                      <Star
                        size={13}
                        color="#F59E0B"
                        fill="#F59E0B"
                      />
                      <Text style={styles.ratingText}>
                        {product.rating.toFixed(1)}
                      </Text>
                      <Text style={styles.ratingCount}>
                        (120)
                      </Text>
                    </View>

                    {/* Price in INR */}
                    <View style={styles.priceRow}>
                      <View>
                        <Text style={styles.price}>
                          {formatINR(product.price)}
                        </Text>
                        <Text style={styles.oldPrice}>
                          {formatINR(product.oldPrice)}
                        </Text>
                      </View>

                      {/* Plus only adds to cart */}
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.addButton}
                        onPress={() =>
                          handleAddToCart(product)
                        }>
                        <Plus size={19} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Empty state */}
          {!loadingProducts &&
            apiError === '' &&
            filteredProducts.length === 0 && (
              <View style={styles.emptyContainer}>
                <Package size={45} color="#CBD5E1" />
                <Text style={styles.emptyTitle}>
                  No products found
                </Text>
                <Text style={styles.emptyText}>
                  Try another search or category.
                </Text>
              </View>
            )}
        </ScrollView>
      </Animated.View>

      {/* Footer */}
      <Footer
        activeTab="home"
        cartCount={cartCount}
        onHomePress={onHomePress || (() => {})}
        onProductsPress={onProductsPress || (() => {})}
        onFavoritesPress={onFavoritesPress || (() => {})}
        onCartPress={onCartPress || (() => {})}
        onProfilePress={onProfilePress || (() => {})}
      />
    </View>
  );
};

export default HomeScreen;
