import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Search, Heart, Star, ShoppingCart, Trash2, Package, X} from 'lucide-react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useFavorites} from '../context/FavoritesContext';
import type {Product} from '../context/FavoritesContext';



interface FavoritesScreenProps {
  onProductPress?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onHomePress?: () => void;
  onProductsPress?: () => void;
  onFavoritesPress?: () => void;
  onCartPress?: () => void;
  onProfilePress?: () => void;
  onLogout?: () => void;
  cartCount?: number;
  loading?: boolean;
}

const formatINR = (price: number) => `₹${Math.round(price).toLocaleString('en-IN')}`;

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  onProductPress,
  onAddToCart,
  onHomePress,
  onProductsPress,
  onFavoritesPress,
  onCartPress,
  onProfilePress,
  cartCount = 0,
  loading = false,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {products, favorites, toggleFavorite} = useFavorites();
  const [search, setSearch] = useState('');


  const safeProducts = Array.isArray(products) ? products : [];
  const safeFavorites = Array.isArray(favorites) ? favorites : [];

  const favoriteProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return safeProducts.filter(product =>
      safeFavorites.map(String).includes(String(product.id)) &&
      (String(product.name ?? '').toLowerCase().includes(query) ||
        String(product.category ?? '').toLowerCase().includes(query)),
    );
  }, [products, favorites, search]);

  const handleAddToCart = (product: Product) => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      Alert.alert('Cart', `${product.name} selected. Please connect onAddToCart to your shared cart.`);
    }
  };

  const renderProduct = ({item}: {item: Product}) => (
    <View style={styles.card}>
      <TouchableOpacity activeOpacity={0.9} onPress={() => onProductPress?.(item)}>
        <View style={styles.imageWrap}>
          <Image source={{uri: item.image}} style={styles.productImage} resizeMode="contain" />
          <View style={styles.savedBadge}>
            <Heart size={12} color="#E11D48" fill="#E11D48" />
            <Text style={styles.savedBadgeText}>SAVED</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.cardInfo}>
        <Text style={styles.category}>{item.category}</Text>
        <TouchableOpacity activeOpacity={0.85} onPress={() => onProductPress?.(item)}>
          <Text numberOfLines={2} style={styles.productName}>{item.name}</Text>
        </TouchableOpacity>

        <View style={styles.ratingRow}>
          <Star size={13} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.ratingText}>{Number(item.rating || 0).toFixed(1)}</Text>
        </View>

        <View style={styles.priceRow}>
          <View style={styles.priceGroup}>
            <Text style={styles.price}>{formatINR(item.price)}</Text>
            {item.oldPrice > item.price && (
              <Text style={styles.oldPrice}>{formatINR(item.oldPrice)}</Text>
            )}
          </View>
          <TouchableOpacity
            accessibilityLabel={`Add ${item.name} to cart`}
            activeOpacity={0.8}
            style={styles.cartButton}
            onPress={() => handleAddToCart(item)}>
            <ShoppingCart size={17} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.removeButton}
          onPress={() => toggleFavorite(item)}>
          <Trash2 size={14} color="#E11D48" />
          <Text style={styles.removeText}>Remove from favorites</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        userName="John William"
        cartCount={cartCount}
        onNotificationPress={() => Alert.alert('Notifications', 'You have 3 new notifications.')}
        onProfilePress={onProfilePress}
      />

      <View style={styles.pageContent}>
        <View style={styles.headingRow}>
          <View style={styles.headingTextWrap}>
            <Text style={styles.eyebrow}>YOUR COLLECTION</Text>
            <Text style={styles.title}>My Favorites</Text>
            <Text style={styles.subtitle}>
              {safeFavorites.length} {safeFavorites.length === 1 ? 'product' : 'products'} saved for later
            </Text>
          </View>
          <View style={styles.heartCircle}>
            <Heart size={25} color="#E11D48" fill="#FFE4E6" />
          </View>
        </View>

        <View style={styles.searchBox}>
          <Search size={19} color="#94A3B8" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search your favorites..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <X size={18} color="#64748B" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.listHeader}>
          <View>
            <Text style={styles.sectionTitle}>Saved items</Text>
            <Text style={styles.sectionSubtitle}>{favoriteProducts.length} items found</Text>
          </View>
          <View style={styles.countPill}>
            <Heart size={13} color="#E11D48" fill="#E11D48" />
            <Text style={styles.countText}>{favoriteProducts.length}</Text>
          </View>
        </View>

        {loading ? (
          <View style={styles.centerState}>
            <ActivityIndicator size="large" color="#2563EB" />
            <Text style={styles.stateText}>Loading favorites...</Text>
          </View>
        ) : (
          <FlatList
            data={favoriteProducts}
            renderItem={renderProduct}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            contentContainerStyle={[
              styles.gridContent,
              favoriteProducts.length === 0 && styles.emptyGridContent,
            ]}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <View style={styles.emptyIconCircle}>
                  <Package size={34} color="#E11D48" />
                </View>
                <Text style={styles.emptyTitle}>{search ? 'No matching favorites' : 'No favorites yet'}</Text>
                <Text style={styles.emptyDescription}>
                  {search
                    ? 'Try another product name or category.'
                    : 'Tap the heart icon on a product to save it here for later.'}
                </Text>
                {search.length > 0 && (
                  <TouchableOpacity style={styles.clearSearchButton} onPress={() => setSearch('')}>
                    <Text style={styles.clearSearchText}>Clear search</Text>
                  </TouchableOpacity>
                )}
              </View>
            }
          />
        )}
      </View>

      <Footer
        activeTab="favorites"
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

export default FavoritesScreen;

const BLUE = '#2563EB';
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F7F9FF'},
  pageContent: {flex: 1, paddingHorizontal: 16, paddingTop: 18},
  headingRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18},
  headingTextWrap: {flex: 1, paddingRight: 12},
  eyebrow: {fontSize: 10, letterSpacing: 1.4, color: '#E11D48', fontWeight: '800', marginBottom: 5},
  title: {fontSize: 27, lineHeight: 33, color: '#111827', fontWeight: '900'},
  subtitle: {fontSize: 12, color: '#8490A5', marginTop: 5, fontWeight: '500'},
  heartCircle: {width: 56, height: 56, borderRadius: 19, backgroundColor: '#FFF1F2', borderWidth: 1, borderColor: '#FFE4E6', alignItems: 'center', justifyContent: 'center'},
  searchBox: {height: 50, borderRadius: 15, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5EAF4', paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20},
  searchInput: {flex: 1, color: '#172033', fontSize: 13, paddingVertical: 0},
  listHeader: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13},
  sectionTitle: {fontSize: 17, color: '#172033', fontWeight: '800'},
  sectionSubtitle: {fontSize: 11, color: '#94A3B8', marginTop: 3},
  countPill: {flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 12, backgroundColor: '#FFF1F2'},
  countText: {fontSize: 12, color: '#BE123C', fontWeight: '800'},
  gridContent: {paddingBottom: 18},
  emptyGridContent: {flexGrow: 1},
  productRow: {justifyContent: 'space-between', gap: 12, marginBottom: 13},
  card: {flex: 1, backgroundColor: '#FFFFFF', borderRadius: 17, borderWidth: 1, borderColor: '#E8EDF6', overflow: 'hidden', elevation: 2, shadowColor: '#0F172A', shadowOffset: {width: 0, height: 3}, shadowOpacity: 0.05, shadowRadius: 7},
  imageWrap: {height: 142, backgroundColor: '#F5F7FC', alignItems: 'center', justifyContent: 'center', position: 'relative'},
  productImage: {width: '100%', height: '100%'},
  savedBadge: {position: 'absolute', left: 8, top: 8, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FFFFFF', borderRadius: 8, paddingHorizontal: 7, paddingVertical: 5, elevation: 1},
  savedBadgeText: {fontSize: 8, color: '#BE123C', fontWeight: '900', letterSpacing: 0.4},
  cardInfo: {padding: 10},
  category: {fontSize: 9, color: BLUE, fontWeight: '800', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5},
  productName: {fontSize: 12, lineHeight: 17, minHeight: 34, color: '#172033', fontWeight: '700'},
  ratingRow: {flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 7, marginBottom: 8},
  ratingText: {fontSize: 10, color: '#64748B', fontWeight: '700'},
  priceRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  priceGroup: {flex: 1, marginRight: 5},
  price: {fontSize: 14, color: '#111827', fontWeight: '900'},
  oldPrice: {fontSize: 10, color: '#94A3B8', textDecorationLine: 'line-through', marginTop: 2},
  cartButton: {width: 34, height: 34, borderRadius: 11, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center'},
  removeButton: {marginTop: 10, borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 9, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5},
  removeText: {fontSize: 9, color: '#E11D48', fontWeight: '700'},
  centerState: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  stateText: {fontSize: 12, color: '#64748B', marginTop: 10},
  emptyState: {flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28, paddingVertical: 40},
  emptyIconCircle: {width: 78, height: 78, borderRadius: 26, backgroundColor: '#FFF1F2', alignItems: 'center', justifyContent: 'center', marginBottom: 16},
  emptyTitle: {fontSize: 18, color: '#172033', fontWeight: '900', textAlign: 'center'},
  emptyDescription: {fontSize: 12, lineHeight: 19, color: '#8490A5', textAlign: 'center', marginTop: 8},
  clearSearchButton: {marginTop: 16, backgroundColor: BLUE, paddingHorizontal: 18, paddingVertical: 10, borderRadius: 11},
  clearSearchText: {fontSize: 12, color: '#FFFFFF', fontWeight: '800'},
});
