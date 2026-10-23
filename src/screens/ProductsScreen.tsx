
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import {
  Search,
  Heart,
  Star,
  Plus,
  SlidersHorizontal,
  ArrowUpDown,
  Package,
  ShoppingBag,
  X,
} from 'lucide-react-native';

import Header from '../components/Header';
import Footer from '../components/Footer';
import {useFavorites} from '../context/FavoritesContext';
import type {Product} from '../context/FavoritesContext';

import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';



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

interface ProductsScreenProps {
  onLogout?: () => void;
  onProfilePress?: () => void;
  onCartPress?: () => void;
  onProductPress?: (product: Product) => void;
  onHomePress?: () => void;
  onProductsPress?: () => void;
  onFavoritesPress?: () => void;
  cartCount?: number;
  onAddToCart?: (product: Product) => void;
}

const USD_TO_INR = 85;

const formatINR = (price: number) =>
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

const categories = [
  'All',
  'Fashion',
  'Shoes',
  'Beauty',
  'Electronics',
  'Home',
  'Watches',
  'Bags',
];

const ProductsScreen: React.FC<ProductsScreenProps> = ({
  onLogout,
  onProfilePress,
  onCartPress,
  onProductPress,
  onHomePress,
  onProductsPress,
  onFavoritesPress,
  cartCount = 0,
  onAddToCart,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {products, setProducts, favorites, toggleFavorite} = useFavorites();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'low' | 'high' | 'rating'>(
    'default',
  );
  const [showSortOptions, setShowSortOptions] = useState(false);

  // Fetch products from API.
  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          'https://dummyjson.com/products?limit=100',
        );

        if (!response.ok) {
          throw new Error('Products request failed');
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
          setError('Products load nahi ho paye. Internet check karein.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [retryCount]);

  // Filter and sort products.
  const filteredProducts = products
    .filter(product => {
      const matchesCategory =
        selectedCategory === 'All' ||
        product.category === selectedCategory;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesFavorite =
        !showFavoritesOnly || favorites.includes(product.id);

      return matchesCategory && matchesSearch && matchesFavorite;
    })
    .sort((a, b) => {
      if (sortBy === 'low') return a.price - b.price;
      if (sortBy === 'high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });


  // Add product to cart.

const handleAddToCart = (product: Product) => {
  if (onAddToCart) {
    onAddToCart(product);
    return;
  }

  Alert.alert(
    'Cart',
    `${product.name} selected. Connect onAddToCart to add it to your shared cart.`,
    [{ text: 'OK' }],
  );
};

  // Product details.

const handleProductPress = (product: Product) => {
  if (onProductPress) {
    onProductPress(product);
    return;
  }

  navigation.navigate('ProductDetails', {
    product: product,
  });
};
  const renderProduct = ({item}: {item: Product}) => {
    const isFavorite = favorites.includes(item.id);

    return (
      <TouchableOpacity
        activeOpacity={0.93}
        style={styles.productCard}
        onPress={() => handleProductPress(item)}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: item.image}}
            style={styles.productImage}
            resizeMode="cover"
          />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(item)}>
            <Heart
              size={19}
              color={isFavorite ? '#EF4444' : '#334155'}
              fill={isFavorite ? '#EF4444' : 'transparent'}
            />
          </TouchableOpacity>

          {item.oldPrice > item.price && (
            <View style={styles.saleBadge}>
              <Text style={styles.saleText}>SALE</Text>
            </View>
          )}
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productCategory}>{item.category}</Text>

          <Text numberOfLines={2} style={styles.productName}>
            {item.name}
          </Text>

          <View style={styles.ratingRow}>
            <Star size={14} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>
              {item.rating.toFixed(1)}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{formatINR(item.price)}</Text>

              {item.oldPrice > item.price && (
                <Text style={styles.oldPrice}>
                  {formatINR(item.oldPrice)}
                </Text>
              )}
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.addButton}
              onPress={() => handleAddToCart(item)}>
              <Plus size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        userName="John William"
        cartCount={cartCount}
        onNotificationPress={() =>
          Alert.alert(
            'Notifications',
            'You have 3 new notifications.',
            [{text: 'OK'}],
          )
        }
        onProfilePress={onProfilePress}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}>
        {/* Page Heading */}
        <View style={styles.headingRow}>
          <View>
            <Text style={styles.welcomeText}>Discover your style</Text>
            <Text style={styles.pageTitle}>All Products</Text>
            <Text style={styles.subtitle}>
              Find your favourite products
            </Text>
          </View>

          <View style={styles.bagIcon}>
            <ShoppingBag size={27} color="#2563EB" />
          </View>
        </View>

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

          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <X size={19} color="#64748B" />
            </TouchableOpacity>
          )}
        </View>

        {/* Favorites Filter */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.favoriteFilter,
              showFavoritesOnly && styles.favoriteFilterActive,
            ]}
            onPress={() => navigation.navigate('Favorites')}>
            <Heart
              size={17}
              color={showFavoritesOnly ? '#FFFFFF' : '#E11D48'}
              fill={showFavoritesOnly ? '#FFFFFF' : 'transparent'}
            />
            <Text
              style={[
                styles.favoriteFilterText,
                showFavoritesOnly && styles.favoriteFilterTextActive,
              ]}>
              Favorites ({favorites.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.sortButton}
            onPress={() => setShowSortOptions(previous => !previous)}>
            <SlidersHorizontal size={17} color="#334155" />
            <Text style={styles.sortButtonText}>Sort</Text>
            <ArrowUpDown size={15} color="#334155" />
          </TouchableOpacity>
        </View>

        {/* Sorting Options */}
        {showSortOptions && (
          <View style={styles.sortOptions}>
            {[
              {label: 'Recommended', value: 'default'},
              {label: 'Price: Low to High', value: 'low'},
              {label: 'Price: High to Low', value: 'high'},
              {label: 'Top Rated', value: 'rating'},
            ].map(option => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.sortOption,
                  sortBy === option.value && styles.sortOptionActive,
                ]}
                onPress={() => {
                  setSortBy(option.value as typeof sortBy);
                  setShowSortOptions(false);
                }}>
                <Text
                  style={[
                    styles.sortOptionText,
                    sortBy === option.value && styles.sortOptionTextActive,
                  ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Category Heading */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Categories</Text>
            <Text style={styles.sectionSubtitle}>
              Choose your favourite category
            </Text>
          </View>
        </View>

        {/* Category List */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}>
          {categories.map(category => {
            const active = selectedCategory === category;

            return (
              <TouchableOpacity
                key={category}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryChip,
                  active && styles.categoryChipActive,
                ]}>
                <Text
                  style={[
                    styles.categoryChipText,
                    active && styles.categoryChipTextActive,
                  ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Products Heading */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              {showFavoritesOnly ? 'My Favorites' : 'Explore Products'}
            </Text>
            <Text style={styles.sectionSubtitle}>
              {filteredProducts.length} products found
            </Text>
          </View>
        </View>

        {/* Loading */}
        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#2563EB" />
            <Text style={styles.statusText}>Loading products...</Text>
          </View>
        )}

        {/* API Error */}
        {!loading && error !== '' && (
          <View style={styles.centerContainer}>
            <Package size={44} color="#CBD5E1" />
            <Text style={styles.errorText}>{error}</Text>

            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => setRetryCount(previous => previous + 1)}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Product Grid */}
        {!loading && error === '' && (
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.productRow}
            contentContainerStyle={styles.productGrid}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Package size={48} color="#CBD5E1" />
                <Text style={styles.emptyTitle}>No products found</Text>
                <Text style={styles.emptyText}>
                  Try another search or category.
                </Text>
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => {
                    setSearch('');
                    setSelectedCategory('All');
                    setShowFavoritesOnly(false);
                  }}>
                  <Text style={styles.clearButtonText}>Clear Filters</Text>
                </TouchableOpacity>
              </View>
            }
          />
        )}
      </ScrollView>

      {/* Footer */}
      <Footer
        activeTab="products"
        cartCount={cartCount}
        onHomePress={onHomePress || (() => navigation.navigate('Home'))}
        onProductsPress={onProductsPress || (() => navigation.navigate('Products'))}
        onFavoritesPress={onFavoritesPress || (() => navigation.navigate('Favorites'))}
        onCartPress={onCartPress || (() => navigation.navigate('Cart'))}
        onProfilePress={onProfilePress || (() => navigation.navigate('Profile'))}
      />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 5,
  },
  pageTitle: {
    fontSize: 27,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 5,
  },
  bagIcon: {
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 53,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: '#0F172A',
    fontSize: 14,
    paddingVertical: 0,
  },
  quickActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  favoriteFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#FFF1F2',
    borderRadius: 11,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  favoriteFilterActive: {
    backgroundColor: '#E11D48',
  },
  favoriteFilterText: {
    color: '#BE123C',
    fontSize: 12,
    fontWeight: '700',
  },
  favoriteFilterTextActive: {
    color: '#FFFFFF',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 11,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  sortButtonText: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '700',
  },
  sortOptions: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 7,
    marginTop: -14,
    marginBottom: 22,
  },
  sortOption: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 9,
  },
  sortOptionActive: {
    backgroundColor: '#EFF6FF',
  },
  sortOptionText: {
    color: '#475569',
    fontSize: 13,
  },
  sortOptionTextActive: {
    color: '#2563EB',
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#0F172A',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
  },
  categoryList: {
    paddingBottom: 25,
    gap: 9,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryChipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  categoryChipText: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  productGrid: {
    paddingBottom: 15,
  },
  productRow: {
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 14,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 2,
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 7,
    shadowOffset: {width: 0, height: 3},
  },
  imageContainer: {
    height: 155,
    backgroundColor: '#F1F5F9',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  saleBadge: {
    position: 'absolute',
    top: 10,
    left: 9,
    backgroundColor: '#EF4444',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 7,
  },
  saleText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  productInfo: {
    padding: 11,
  },
  productCategory: {
    color: '#2563EB',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 5,
  },
  productName: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '700',
    minHeight: 36,
    lineHeight: 18,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 7,
    marginBottom: 9,
  },
  ratingText: {
    color: '#475569',
    fontSize: 11,
    fontWeight: '700',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  priceContainer: {
    flex: 1,
    marginRight: 3,
  },
  price: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '800',
  },
  oldPrice: {
    color: '#94A3B8',
    fontSize: 10,
    textDecorationLine: 'line-through',
    marginTop: 3,
  },
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    paddingVertical: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    marginTop: 12,
    color: '#64748B',
    fontSize: 13,
  },
  errorText: {
    marginTop: 12,
    color: '#DC2626',
    textAlign: 'center',
    fontSize: 13,
  },
  retryButton: {
    marginTop: 14,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingHorizontal: 22,
    paddingVertical: 11,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 45,
    width: '100%',
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#334155',
    marginTop: 14,
  },
  emptyText: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 6,
    textAlign: 'center',
  },
  clearButton: {
    marginTop: 15,
    backgroundColor: '#2563EB',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 10,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
