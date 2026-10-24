import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
  Dimensions,
  StatusBar,
  Alert,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Star,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
} from 'lucide-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {useCart} from '../context/CartContext';
import {useFavorites, type Product as FavoriteProduct} from '../context/FavoritesContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const COLORS = {
  primary: '#2563EB',
  primaryLight: '#EFF6FF',
  ink: '#111827',
  muted: '#64748B',
  border: '#E5EAF2',
  background: '#F7F9FC',
  white: '#FFFFFF',
  green: '#15803D',
  red: '#DC2626',
};

const ProductDetailsScreen = ({route, navigation}: Props) => {
  // A caller must pass { product }, but guard against missing route params.
  const product = (route?.params as any)?.product ?? {
    id: 'missing-product',
    name: 'Product unavailable',
    category: 'General',
    price: 0,
    oldPrice: 0,
    rating: 0,
    image: '',
    images: [],
    stock: 0,
    description: 'Please go back and open a product from the Products screen.',
  };
  const {addToCart: addProductToCart, itemCount} = useCart();
  const {
    products: favoriteProducts,
    setProducts: setFavoriteProducts,
    favorites,
    toggleFavorite,
  } = useFavorites();

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const galleryRef = useRef<FlatList<string>>(null);
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(14)).current;

  // Supports the common image fields used by product APIs.
  const images = Array.from(
    new Set(
      [product.image, product.thumbnail, ...(product.images || [])]
        .filter((value): value is string =>
          typeof value === 'string' && value.trim().length > 0,
        ),
    ),
  );

  const price = Math.max(0, Number(product.price) || 0);
  const oldPrice = Math.max(0, Number(product.oldPrice) || 0);
  const rating = Number(product.rating) || 0;

  // Use the same shared favorites state as ProductsScreen and FavoritesScreen.
  const favorite = favorites.some(id => String(id) === String(product.id));

  const toFavoriteProduct = (): FavoriteProduct => ({
    id: String(product.id),
    name: String(product.name || product.title || 'Product'),
    category: String(product.category || 'General'),
    price,
    oldPrice,
    rating,
    image: String(product.image || product.thumbnail || images[0] || ''),
  });

  const handleToggleFavorite = () => {
    const favoriteProduct = toFavoriteProduct();

    // Ensure the product is available to FavoritesScreen even if it was opened
    // from a source that did not populate the shared products list.
    setFavoriteProducts(previous => {
      const exists = previous.some(
        item => String(item.id) === String(favoriteProduct.id),
      );
      return exists ? previous : [...previous, favoriteProduct];
    });

    toggleFavorite(favoriteProduct);
  };
  const discount =
    oldPrice > price && oldPrice > 0
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;
  const inStock =
    product.stock === undefined || Number(product.stock) > 0;
  const money = (value: number) => `₹${value.toLocaleString('en-IN')}`;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, slide]);

  const handleGalleryScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    setActiveImage(
      Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH),
    );
  };

  const changeImage = (index: number) => {
    setActiveImage(index);
    galleryRef.current?.scrollToIndex({index, animated: true});
  };

  const addToCart = () => {
    if (!inStock) {
      Alert.alert('Out of stock', 'This product is currently unavailable.');
      return;
    }
    addProductToCart(product, quantity);
    navigation.navigate('Cart');
  };

const buyNow = () => {
  if (!inStock) {
    Alert.alert(
      'Out of Stock',
      'This product is currently unavailable.',
    );
    return;
  }

  if (!product?.id || price <= 0) {
    Alert.alert(
      'Invalid Product',
      'Product details or price are unavailable.',
    );
    return;
  }

  // Add selected product to cart
  addProductToCart(product, quantity);

  // Navigate directly to Checkout
  navigation.navigate('Checkout');
};

  const renderProductImage = ({item}: {item: string}) => (
    <View style={styles.imageSlide}>
      <Image
        source={{uri: item}}
        style={styles.productImage}
        resizeMode="contain"
        onError={() => {
          // The placeholder below is used when the product has no usable URL.
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />

      {/* Header styled to match the Cart screen */}
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Go back"
          activeOpacity={0.75}
          onPress={() => navigation.goBack()}
          style={styles.headerButton}>
          <ArrowLeft size={21} color="#334155" strokeWidth={2.2} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Product Details</Text>
          <Text style={styles.headerSubtitle}>Explore product information</Text>
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`Open cart, ${itemCount} items`}
          activeOpacity={0.75}
          onPress={() => navigation.navigate('Cart')}
          style={styles.cartButtonHeader}>
          <ShoppingCart size={21} color={COLORS.primary} strokeWidth={2.2} />
          {itemCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {itemCount > 99 ? '99+' : itemCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

        {/* Image slider */}
        <View style={styles.gallery}>
          {images.length > 0 ? (
            <FlatList
              ref={galleryRef}
              data={images}
              horizontal
              pagingEnabled
              nestedScrollEnabled
              initialNumToRender={1}
              windowSize={3}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={renderProductImage}
              onMomentumScrollEnd={handleGalleryScroll}
              getItemLayout={(_, index) => ({
                length: SCREEN_WIDTH,
                offset: SCREEN_WIDTH * index,
                index,
              })}
            />
          ) : (
            <View style={styles.noImage}>
              <ShoppingBag size={46} color="#94A3B8" />
              <Text style={styles.noImageTitle}>Image unavailable</Text>
              <Text style={styles.noImageText}>
                No product photos have been added yet.
              </Text>
            </View>
          )}

          {discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{discount}% OFF</Text>
            </View>
          )}

          <TouchableOpacity
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={favorite ? 'Remove from wishlist' : 'Add to wishlist'}
            onPress={handleToggleFavorite}
            style={styles.favoriteButton}>
            <Heart
              size={21}
              color={favorite ? COLORS.red : '#475569'}
              fill={favorite ? COLORS.red : 'transparent'}
              strokeWidth={2}
            />
          </TouchableOpacity>

          {images.length > 1 && (
            <View style={styles.imageCounter}>
              <Text style={styles.imageCounterText}>
                {activeImage + 1} / {images.length}
              </Text>
            </View>
          )}
        </View>

        {images.length > 1 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailRow}>
            {images.map((image, index) => (
              <TouchableOpacity
                key={`${image}-thumb-${index}`}
                activeOpacity={0.8}
                onPress={() => changeImage(index)}
                style={[
                  styles.thumbnail,
                  activeImage === index && styles.thumbnailActive,
                ]}>
                <Image source={{uri: image}} style={styles.thumbnailImage} resizeMode="contain" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <Animated.View
          style={{opacity: fade, transform: [{translateY: slide}]}}>
          <View style={styles.content}>
            <View style={styles.brandStockRow}>
              <Text style={styles.brand} numberOfLines={1}>
                {product.brand || 'FEATURED PRODUCT'}
              </Text>
              <View style={[styles.stockBadge, !inStock && styles.soldOutBadge]}>
                <View style={[styles.stockDot, !inStock && styles.soldOutDot]} />
                <Text style={[styles.stockText, !inStock && styles.soldOutText]}>
                  {inStock ? 'In stock' : 'Out of stock'}
                </Text>
              </View>
            </View>

            <Text style={styles.productName}>{product.name || 'Product'}</Text>

            <View style={styles.ratingRow}>
              <View style={styles.ratingBadge}>
                <Star size={13} color="#FFFFFF" fill="#FFFFFF" />
                <Text style={styles.ratingValue}>{rating.toFixed(1)}</Text>
              </View>
              <Text style={styles.ratingLabel}>
                {rating > 0 ? 'Customer rating' : 'Not rated yet'}
              </Text>
            </View>

            <View style={styles.priceCard}>
              <View style={styles.priceTopRow}>
                <View>
                  <Text style={styles.priceLabel}>Price</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.price}>{money(price)}</Text>
                    {oldPrice > price && (
                      <Text style={styles.oldPrice}>{money(oldPrice)}</Text>
                    )}
                  </View>
                </View>
                {discount > 0 && (
                  <View style={styles.saveBadge}>
                    <Text style={styles.saveBadgeText}>SAVE {discount}%</Text>
                  </View>
                )}
              </View>
              {oldPrice > price && (
                <Text style={styles.savings}>
                  You save {money(oldPrice - price)}
                </Text>
              )}
              <View style={styles.priceDivider} />
              <Text style={styles.taxText}>Inclusive of applicable taxes</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quantity</Text>
              <View style={styles.quantityCard}>
                <View style={styles.quantityControl}>
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel="Decrease quantity"
                    disabled={quantity <= 1}
                    onPress={() => setQuantity(value => Math.max(1, value - 1))}
                    style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}>
                    <Minus size={17} color={quantity <= 1 ? '#CBD5E1' : COLORS.ink} />
                  </TouchableOpacity>
                  <Text style={styles.quantityValue}>{quantity}</Text>
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel="Increase quantity"
                    disabled={product.stock !== undefined && quantity >= Number(product.stock)}
                    onPress={() =>
                      setQuantity(value =>
                        product.stock === undefined
                          ? value + 1
                          : Math.min(Number(product.stock), value + 1),
                      )
                    }
                    style={styles.quantityButton}>
                    <Plus size={17} color={COLORS.ink} />
                  </TouchableOpacity>
                </View>
                <View style={styles.totalWrap}>
                  <Text style={styles.totalLabel}>Item total</Text>
                  <Text style={styles.totalValue}>{money(price * quantity)}</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Product description</Text>
              <Text style={styles.description}>
                {product.description || 'No description is available for this product yet.'}
              </Text>
            </View>

            <View style={styles.benefitsCard}>
              <View style={styles.benefitRow}>
                <View style={styles.benefitIcon}><ShieldCheck size={19} color={COLORS.primary} /></View>
                <View style={styles.benefitTextWrap}>
                  <Text style={styles.benefitTitle}>Secure shopping</Text>
                  <Text style={styles.benefitText}>Your cart and order details stay easy to review.</Text>
                </View>
              </View>
              <View style={styles.benefitDivider} />
              <View style={styles.benefitRow}>
                <View style={styles.benefitIcon}><Truck size={19} color={COLORS.primary} /></View>
                <View style={styles.benefitTextWrap}>
                  <Text style={styles.benefitTitle}>Delivery information</Text>
                  <Text style={styles.benefitText}>Delivery charges are calculated at checkout.</Text>
                </View>
              </View>
              <View style={styles.benefitDivider} />
              <View style={styles.benefitRow}>
                <View style={styles.benefitIcon}><RotateCcw size={19} color={COLORS.primary} /></View>
                <View style={styles.benefitTextWrap}>
                  <Text style={styles.benefitTitle}>Need help?</Text>
                  <Text style={styles.benefitText}>Check the store's return policy before ordering.</Text>
                </View>
              </View>
            </View>

            <Text style={styles.productId}>Product ID: {String(product.id ?? 'N/A')}</Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Fixed bottom purchase actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          activeOpacity={0.82}
          disabled={!inStock}
          onPress={addToCart}
          style={[styles.addToCartButton, !inStock && styles.disabledButton]}>
          <ShoppingCart size={18} color={COLORS.primary} strokeWidth={2.2} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          disabled={!inStock}
          onPress={buyNow}
          style={[styles.buyNowButton, !inStock && styles.disabledButton]}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    minHeight: 76,
    marginTop: 30,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF1F8',
  },
  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8EDFF',
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  headerCenter: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.ink,
    letterSpacing: -0.25,
  },
  headerSubtitle: {
    marginTop: 3,
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.muted,
  },
  cartButtonHeader: {
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
    borderColor: COLORS.background,
  },
  cartBadgeText: {fontSize: 9, fontWeight: '800', color: COLORS.white},
  scrollContent: {paddingBottom: 22},
  gallery: {
    position: 'relative',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',
  },
  imageSlide: {
    width: SCREEN_WIDTH,
    height: Math.min(380, SCREEN_WIDTH * 0.92),
    paddingHorizontal: 26,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  productImage: {width: '100%', height: '100%'},
  noImage: {
    width: SCREEN_WIDTH,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 24,
  },
  noImageTitle: {fontSize: 15, fontWeight: '700', color: '#334155', marginTop: 12},
  noImageText: {fontSize: 12, lineHeight: 18, color: COLORS.muted, marginTop: 5, textAlign: 'center'},
  discountBadge: {
    position: 'absolute',
    top: 17,
    left: 17,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: COLORS.red,
  },
  discountText: {fontSize: 11, fontWeight: '800', color: COLORS.white, letterSpacing: 0.3},
  favoriteButton: {
    position: 'absolute',
    top: 14,
    right: 16,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5EAF2',
    elevation: 2,
  },
  imageCounter: {
    position: 'absolute',
    right: 16,
    bottom: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(17,24,39,0.78)',
  },
  imageCounterText: {fontSize: 11, fontWeight: '700', color: COLORS.white},
  thumbnailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  thumbnail: {
    width: 54,
    height: 54,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#FFFFFF',
    padding: 4,
    overflow: 'hidden',
  },
  thumbnailActive: {borderWidth: 2, borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight},
  thumbnailImage: {width: '100%', height: '100%'},
  content: {paddingHorizontal: 18, paddingTop: 20},
  brandStockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  brand: {
    flex: 1,
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#DCFCE7',
  },
  stockDot: {width: 6, height: 6, borderRadius: 3, backgroundColor: '#16A34A', marginRight: 6},
  stockText: {fontSize: 10, fontWeight: '700', color: COLORS.green},
  soldOutBadge: {backgroundColor: '#FEE2E2'},
  soldOutDot: {backgroundColor: COLORS.red},
  soldOutText: {color: '#B91C1C'},
  productName: {
    marginTop: 12,
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '800',
    color: COLORS.ink,
    letterSpacing: -0.55,
  },
  ratingRow: {flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 12},
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 7,
    backgroundColor: '#16A34A',
  },
  ratingValue: {fontSize: 11, fontWeight: '800', color: COLORS.white},
  ratingLabel: {fontSize: 12, fontWeight: '500', color: COLORS.muted},
  priceCard: {
    marginTop: 19,
    padding: 16,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  priceTopRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10},
  priceLabel: {fontSize: 11, fontWeight: '600', color: COLORS.muted, marginBottom: 4},
  priceRow: {flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 9},
  price: {fontSize: 28, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.6},
  oldPrice: {fontSize: 15, fontWeight: '500', color: '#94A3B8', textDecorationLine: 'line-through'},
  saveBadge: {paddingHorizontal: 9, paddingVertical: 7, borderRadius: 8, backgroundColor: '#DCFCE7'},
  saveBadgeText: {fontSize: 10, fontWeight: '800', color: COLORS.green},
  savings: {fontSize: 12, fontWeight: '700', color: COLORS.green, marginTop: 5},
  priceDivider: {height: 1, backgroundColor: '#EEF2F7', marginTop: 13, marginBottom: 9},
  taxText: {fontSize: 11, fontWeight: '500', color: COLORS.muted},
  section: {marginTop: 24},
  sectionTitle: {fontSize: 17, fontWeight: '800', color: COLORS.ink, letterSpacing: -0.25, marginBottom: 12},
  quantityCard: {
    minHeight: 66,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    overflow: 'hidden',
  },
  quantityButton: {width: 38, height: 38, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white},
  quantityButtonDisabled: {backgroundColor: '#F8FAFC'},
  quantityValue: {minWidth: 34, textAlign: 'center', fontSize: 15, fontWeight: '800', color: COLORS.ink},
  totalWrap: {alignItems: 'flex-end', flexShrink: 1},
  totalLabel: {fontSize: 10, fontWeight: '600', color: COLORS.muted, marginBottom: 3},
  totalValue: {fontSize: 16, fontWeight: '800', color: COLORS.primary},
  description: {fontSize: 14, lineHeight: 23, fontWeight: '400', color: '#475569'},
  benefitsCard: {
    marginTop: 25,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  benefitRow: {flexDirection: 'row', alignItems: 'center', paddingVertical: 13, gap: 11},
  benefitIcon: {width: 38, height: 38, borderRadius: 12, backgroundColor: COLORS.primaryLight, alignItems: 'center', justifyContent: 'center'},
  benefitTextWrap: {flex: 1},
  benefitTitle: {fontSize: 12, fontWeight: '800', color: COLORS.ink},
  benefitText: {fontSize: 11, lineHeight: 17, fontWeight: '400', color: COLORS.muted, marginTop: 3},
  benefitDivider: {height: 1, backgroundColor: '#EEF2F7'},
  productId: {fontSize: 10, fontWeight: '500', color: '#94A3B8', textAlign: 'center', marginTop: 20},
  bottomBar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 11,
    paddingBottom: 14,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    elevation: 12,
    shadowColor: '#0F172A',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: -3},
  },
  addToCartButton: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  addToCartText: {fontSize: 13, fontWeight: '800', color: COLORS.primary},
  buyNowButton: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 3},
  },
  buyNowText: {fontSize: 14, fontWeight: '800', color: COLORS.white},
  disabledButton: {opacity: 0.45},
});
