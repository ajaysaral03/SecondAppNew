import React, {useEffect, useRef, useState} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Easing,
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
  price: string;
  oldPrice: string;
  rating: string;
  image: string;
}

interface HomeScreenProps {
  onLogout?: () => void;
  onProfilePress?: () => void;
  onCartPress?: () => void;
  onProductPress?: (product: Product) => void;
  onHomePress?: () => void;
  onProductsPress?: () => void;
  onFavoritesPress?: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  onLogout,
  onProfilePress,
  onCartPress,
  onProductPress,
  onHomePress,
  onProductsPress,
  onFavoritesPress,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState('All');

  const [cartCount, setCartCount] = useState(0);

  /* ================= ANIMATION ================= */

  const fadeAnim = useRef(
    new Animated.Value(0),
  ).current;

  const slideAnim = useRef(
    new Animated.Value(25),
  ).current;

  const floatingAnim = useRef(
    new Animated.Value(0),
  ).current;

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

  /* ================= CATEGORIES ================= */

  const categories = [
    {
      id: '1',
      name: 'All',
      icon: '✨',
    },
    {
      id: '2',
      name: 'Fashion',
      icon: '👕',
    },
    {
      id: '3',
      name: 'Shoes',
      icon: '👟',
    },
    {
      id: '4',
      name: 'Beauty',
      icon: '💄',
    },
    {
      id: '5',
      name: 'Electronics',
      icon: '🎧',
    },
    {
      id: '6',
      name: 'Home',
      icon: '🏠',
    },
    {
      id: '7',
      name: 'Watches',
      icon: '⌚',
    },
    {
      id: '8',
      name: 'Bags',
      icon: '👜',
    },
  ];

  /* ================= PRODUCTS ================= */

  const products: Product[] = [
    {
      id: '1',
      name: 'Premium Sneakers',
      category: 'Shoes',
      price: '₹2,499',
      oldPrice: '₹3,999',
      rating: '4.8',
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
    },

    {
      id: '2',
      name: 'Smart Watch',
      category: 'Electronics',
      price: '₹3,499',
      oldPrice: '₹5,999',
      rating: '4.7',
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
    },

    {
      id: '3',
      name: 'Classic T-Shirt',
      category: 'Fashion',
      price: '₹799',
      oldPrice: '₹1,299',
      rating: '4.6',
      image:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
    },

    {
      id: '4',
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: '₹1,999',
      oldPrice: '₹3,499',
      rating: '4.9',
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    },

    {
      id: '5',
      name: 'Leather Handbag',
      category: 'Bags',
      price: '₹1,899',
      oldPrice: '₹2,999',
      rating: '4.7',
      image:
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600',
    },

    {
      id: '6',
      name: 'Running Shoes',
      category: 'Shoes',
      price: '₹1,799',
      oldPrice: '₹2,699',
      rating: '4.6',
      image:
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600',
    },

    {
      id: '7',
      name: 'Sunglasses',
      category: 'Fashion',
      price: '₹699',
      oldPrice: '₹1,199',
      rating: '4.5',
      image:
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600',
    },

    {
      id: '8',
      name: 'Bluetooth Speaker',
      category: 'Electronics',
      price: '₹1,299',
      oldPrice: '₹2,199',
      rating: '4.8',
      image:
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600',
    },

    {
      id: '9',
      name: 'Luxury Watch',
      category: 'Watches',
      price: '₹4,999',
      oldPrice: '₹7,999',
      rating: '4.9',
      image:
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600',
    },

    {
      id: '10',
      name: 'Home Decor Lamp',
      category: 'Home',
      price: '₹999',
      oldPrice: '₹1,599',
      rating: '4.6',
      image:
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600',
    },
  ];

  /* ================= BANNERS ================= */

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

  /* ================= FILTER ================= */

  const filteredProducts = products.filter(product => {
    const categoryMatch =
      selectedCategory === 'All' ||
      product.category === selectedCategory;

    const searchMatch = product.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    return categoryMatch && searchMatch;
  });

  /* ================= ADD CART ================= */

  const handleAddToCart = (product: Product) => {
    setCartCount(previous => previous + 1);

    SweetAlert.showAlert(
      'Added to Cart',
      `${product.name} added successfully.`,
      [
        {
          text: 'Continue Shopping',
        },
      ],
      {
        type: 'success',
      },
    );
  };

  /* ================= PRODUCT ================= */

  const handleProductPress = (product: Product) => {
    if (onProductPress) {
      onProductPress(product);
      return;
    }

    SweetAlert.showAlert(
      product.name,
      `${product.price} • ⭐ ${product.rating}`,
      [
        {
          text: 'Add to Cart',
          onPress: () => handleAddToCart(product),
        },

        {
          text: 'Close',
        },
      ],
      {
        type: 'info',
      },
    );
  };

  /* ================= NOTIFICATION ================= */

  const handleNotification = () => {
    SweetAlert.showAlert(
      'Notifications',
      'You have 3 new notifications.',
      [
        {
          text: 'OK',
        },
      ],
      {
        type: 'info',
      },
    );
  };

  return (
    <View style={styles.container}>

      {/* ================= FIXED HEADER ================= */}

      <Header
        userName="John William"
        cartCount={cartCount}
        onNotificationPress={handleNotification}
        onProfilePress={onProfilePress}
      />

      {/* ================= SCROLLABLE CONTENT ================= */}

      <Animated.View
        style={[
          styles.contentWrapper,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateY: slideAnim,
              },
            ],
          },
        ]}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}>

          {/* ================= SEARCH ================= */}

          <View style={styles.searchContainer}>

            <Search
              size={21}
              color="#64748B"
            />

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search products..."
              placeholderTextColor="#94A3B8"
              style={styles.searchInput}
            />

            <View style={styles.searchIcon}>
              <Sparkles
                size={17}
                color="#2563EB"
              />
            </View>

          </View>

          {/* ================= BANNER ================= */}

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
                <View
                  key={banner.id}
                  style={styles.slide}>

                  <Image
                    source={{
                      uri: banner.image,
                    }}
                    style={styles.bannerImage}
                    resizeMode="cover"
                  />

                  <View style={styles.bannerOverlay} />

                  <View style={styles.bannerContent}>

                    <View style={styles.saleBadge}>

                      <Tag
                        size={12}
                        color="#FFFFFF"
                      />

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
                      style={styles.shopButton}>

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

          {/* ================= CATEGORY TITLE ================= */}

          <View style={styles.sectionHeader}>

            <Text style={styles.sectionTitle}>
              Categories
            </Text>

            <TouchableOpacity>
              <Text style={styles.seeAll}>
                See All
              </Text>
            </TouchableOpacity>

          </View>

          {/* ================= CATEGORIES ================= */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
              styles.categoryScroll
            }>

            {categories.map(category => {

              const active =
                selectedCategory === category.name;

              return (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryItem}
                  activeOpacity={0.8}
                  onPress={() =>
                    setSelectedCategory(
                      category.name,
                    )
                  }>

                  <View
                    style={[
                      styles.categoryIcon,
                      active &&
                        styles.categoryIconActive,
                    ]}>

                    <Text style={styles.categoryEmoji}>
                      {category.icon}
                    </Text>

                  </View>

                  <Text
                    style={[
                      styles.categoryText,
                      active &&
                        styles.categoryTextActive,
                    ]}>

                    {category.name}

                  </Text>

                </TouchableOpacity>
              );
            })}

          </ScrollView>

          {/* ================= PRODUCT TITLE ================= */}

          <View style={styles.sectionHeader}>

            <View>
              <Text style={styles.sectionTitle}>
                Popular Products
              </Text>

              <Text style={styles.sectionSubtitle}>
                {filteredProducts.length} products available
              </Text>
            </View>

            <TouchableOpacity>
              <Text style={styles.seeAll}>
                View All
              </Text>
            </TouchableOpacity>

          </View>

          {/* ================= PRODUCT GRID ================= */}

          <View style={styles.productGrid}>

            {filteredProducts.map(product => (

              <TouchableOpacity
                key={product.id}
                activeOpacity={0.92}
                style={styles.productCard}
                onPress={() =>
                  handleProductPress(product)
                }>

                {/* PRODUCT IMAGE */}

                <View
                  style={
                    styles.productImageContainer
                  }>

                  <Image
                    source={{
                      uri: product.image,
                    }}
                    style={styles.productImage}
                    resizeMode="cover"
                  />

                  {/* FAVORITE */}

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.favoriteButton}>

                    <Heart
                      size={17}
                      color="#334155"
                    />

                  </TouchableOpacity>

                  {/* SALE */}

                  <View style={styles.discountBadge}>

                    <Text style={styles.discountText}>
                      SALE
                    </Text>

                  </View>

                </View>

                {/* PRODUCT INFO */}

                <View style={styles.productInfo}>

                  <Text style={styles.productCategory}>
                    {product.category}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={styles.productName}>

                    {product.name}

                  </Text>

                  {/* RATING */}

                  <View style={styles.ratingRow}>

                    <Star
                      size={13}
                      color="#F59E0B"
                      fill="#F59E0B"
                    />

                    <Text style={styles.ratingText}>
                      {product.rating}
                    </Text>

                    <Text style={styles.ratingCount}>
                      (120)
                    </Text>

                  </View>

                  {/* PRICE */}

                  <View style={styles.priceRow}>

                    <View>

                      <Text style={styles.price}>
                        {product.price}
                      </Text>

                      <Text style={styles.oldPrice}>
                        {product.oldPrice}
                      </Text>

                    </View>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.addButton}
                      onPress={() =>
                        handleAddToCart(product)
                      }>

                      <Plus
                        size={19}
                        color="#FFFFFF"
                      />

                    </TouchableOpacity>

                  </View>

                </View>

              </TouchableOpacity>
            ))}

          </View>

          {/* ================= EMPTY ================= */}

          {filteredProducts.length === 0 && (

            <View style={styles.emptyContainer}>

              <Package
                size={45}
                color="#CBD5E1"
              />

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

      {/* ================= FIXED FOOTER ================= */}

      <Footer
        activeTab="home"
        cartCount={cartCount}
        onHomePress={
          onHomePress || (() => {})
        }
        onProductsPress={
          onProductsPress || (() => {})
        }
        onFavoritesPress={
          onFavoritesPress || (() => {})
        }
        onCartPress={
          onCartPress || (() => {})
        }
        onProfilePress={
          onProfilePress || (() => {})
        }
      />

    </View>
  );
};

export default HomeScreen;