import React, {useEffect, useRef, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';

import {
  Search,
  Heart,
  Bell,
  ChevronRight,
  Star,
  Plus,
  Sparkles,
  Tag,
  LogOut,
  Package,
} from 'lucide-react-native';

import Slick from 'react-native-slick';

import SweetAlert from 'react-native-sweet-alert';

import Header from '../components/Header';
import Footer from '../components/Footer';

const {width} = Dimensions.get('window');


const HomeScreen = ({
  onLogout,
  onProfilePress,
  onCartPress,
  onProductPress,
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
    new Animated.Value(30),
  ).current;

  const floatingAnim = useRef(
    new Animated.Value(0),
  ).current;


  useEffect(() => {

    Animated.parallel([

      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        },
      ),

      Animated.spring(
        slideAnim,
        {
          toValue: 0,
          friction: 7,
          tension: 45,
          useNativeDriver: true,
        },
      ),

    ]).start();


    Animated.loop(

      Animated.sequence([

        Animated.timing(
          floatingAnim,
          {
            toValue: 1,
            duration: 1800,
            easing: Easing.inOut(
              Easing.ease,
            ),
            useNativeDriver: true,
          },
        ),

        Animated.timing(
          floatingAnim,
          {
            toValue: 0,
            duration: 1800,
            easing: Easing.inOut(
              Easing.ease,
            ),
            useNativeDriver: true,
          },
        ),

      ]),

    ).start();

  }, [
    fadeAnim,
    slideAnim,
    floatingAnim,
  ]);


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

  const products = [

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

  const filteredProducts =
    products.filter(product => {

      const categoryMatch =
        selectedCategory === 'All' ||
        product.category === selectedCategory;

      const searchMatch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase(),
          );

      return (
        categoryMatch &&
        searchMatch
      );

    });


  /* ================= ADD CART ================= */

  const handleAddToCart = product => {

    setCartCount(
      previous => previous + 1,
    );

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

  const handleProductPress = product => {

    if (onProductPress) {

      onProductPress(product);

      return;

    }

    SweetAlert.showAlert(
      product.name,
      `${product.price}  •  ⭐ ${product.rating}`,
      [
        {
          text: 'Add to Cart',
          onPress: () =>
            handleAddToCart(product),
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


  /* ================= LOGOUT ================= */

  const handleLogout = () => {

    SweetAlert.showAlert(
      'Logout',
      'Are you sure you want to logout?',
      [

        {
          text: 'Cancel',
        },

        {
          text: 'Logout',

          onPress: () => {

            if (onLogout) {
              onLogout();
            }

          },
        },

      ],
      {
        type: 'warning',
      },
    );

  };


  return (

    <View style={styles.container}>

      {/* ================================================= */}
      {/* ================= FIXED HEADER ================== */}
      {/* ================================================= */}

      <Header
        userName="John William"

        cartCount={cartCount}

        onNotificationPress={() => {

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

        }}

        onProfilePress={onProfilePress}
      />


      {/* ================================================= */}
      {/* =============== ONLY THIS SCROLLS =============== */}
      {/* ================================================= */}

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
        ]}
      >

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.scrollContent
          }
          keyboardShouldPersistTaps="handled"
        >

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


          {/* ================= SLIDER ================= */}

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
              activeDotStyle={
                styles.activeDot
              }
            >

              {banners.map(
                banner => (

                  <View
                    key={banner.id}
                    style={styles.slide}
                  >

                    <Image
                      source={{
                        uri:
                          banner.image,
                      }}
                      style={
                        styles.bannerImage
                      }
                    />

                    <View
                      style={
                        styles.bannerOverlay
                      }
                    />

                    <View
                      style={
                        styles.bannerContent
                      }
                    >

                      <View
                        style={
                          styles.saleBadge
                        }
                      >

                        <Tag
                          size={12}
                          color="#FFFFFF"
                        />

                        <Text
                          style={
                            styles.saleText
                          }
                        >
                          {banner.badge}
                        </Text>

                      </View>

                      <Text
                        style={
                          styles.bannerTitle
                        }
                      >
                        {banner.title}
                      </Text>

                      <Text
                        style={
                          styles.bannerSubtitle
                        }
                      >
                        {banner.subtitle}
                      </Text>

                      <TouchableOpacity
                        style={
                          styles.shopButton
                        }
                      >

                        <Text
                          style={
                            styles.shopButtonText
                          }
                        >
                          Shop Now
                        </Text>

                        <ChevronRight
                          size={16}
                          color="#2563EB"
                        />

                      </TouchableOpacity>

                    </View>

                  </View>

                ),
              )}

            </Slick>

          </View>


          {/* ================= CATEGORY TITLE ================= */}

          <View
            style={
              styles.sectionHeader
            }
          >

            <Text
              style={
                styles.sectionTitle
              }
            >
              Categories
            </Text>

            <Text
              style={styles.seeAll}
            >
              See All
            </Text>

          </View>


          {/* ================= CATEGORIES ================= */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={
              false
            }
            contentContainerStyle={
              styles.categoryScroll
            }
          >

            {categories.map(
              category => {

                const active =
                  selectedCategory ===
                  category.name;

                return (

                  <TouchableOpacity
                    key={
                      category.id
                    }
                    style={
                      styles.categoryItem
                    }
                    onPress={() =>
                      setSelectedCategory(
                        category.name,
                      )
                    }
                    activeOpacity={
                      0.8
                    }
                  >

                    <View
                      style={[
                        styles.categoryIcon,

                        active &&
                          styles.categoryIconActive,
                      ]}
                    >

                      <Text
                        style={
                          styles.categoryEmoji
                        }
                      >
                        {
                          category.icon
                        }
                      </Text>

                    </View>

                    <Text
                      style={[
                        styles.categoryText,

                        active &&
                          styles.categoryTextActive,
                      ]}
                    >
                      {
                        category.name
                      }
                    </Text>

                  </TouchableOpacity>

                );

              },
            )}

          </ScrollView>


          {/* ================= PRODUCT TITLE ================= */}

          <View
            style={
              styles.sectionHeader
            }
          >

            <View>

              <Text
                style={
                  styles.sectionTitle
                }
              >
                Popular Products
              </Text>

              <Text
                style={
                  styles.sectionSubtitle
                }
              >
                {
                  filteredProducts.length
                } products available
              </Text>

            </View>

            <Text
              style={styles.seeAll}
            >
              View All
            </Text>

          </View>


          {/* ================= PRODUCT GRID ================= */}

          <View
            style={styles.productGrid}
          >

            {filteredProducts.map(
              product => (

                <TouchableOpacity
                  key={product.id}
                  style={
                    styles.productCard
                  }
                  activeOpacity={
                    0.9
                  }
                  onPress={() =>
                    handleProductPress(
                      product,
                    )
                  }
                >

                  <View
                    style={
                      styles.productImageContainer
                    }
                  >

                    <Image
                      source={{
                        uri:
                          product.image,
                      }}
                      style={
                        styles.productImage
                      }
                    />

                    <TouchableOpacity
                      style={
                        styles.favoriteButton
                      }
                    >

                      <Heart
                        size={17}
                        color="#334155"
                      />

                    </TouchableOpacity>

                    <View
                      style={
                        styles.discountBadge
                      }
                    >

                      <Text
                        style={
                          styles.discountText
                        }
                      >
                        SALE
                      </Text>

                    </View>

                  </View>


                  <View
                    style={
                      styles.productInfo
                    }
                  >

                    <Text
                      style={
                        styles.productCategory
                      }
                    >
                      {
                        product.category
                      }
                    </Text>

                    <Text
                      style={
                        styles.productName
                      }
                      numberOfLines={1}
                    >
                      {
                        product.name
                      }
                    </Text>


                    <View
                      style={
                        styles.ratingRow
                      }
                    >

                      <Star
                        size={13}
                        color="#F59E0B"
                        fill="#F59E0B"
                      />

                      <Text
                        style={
                          styles.ratingText
                        }
                      >
                        {
                          product.rating
                        }
                      </Text>

                      <Text
                        style={
                          styles.ratingCount
                        }
                      >
                        (120)
                      </Text>

                    </View>


                    <View
                      style={
                        styles.priceRow
                      }
                    >

                      <View>

                        <Text
                          style={
                            styles.price
                          }
                        >
                          {
                            product.price
                          }
                        </Text>

                        <Text
                          style={
                            styles.oldPrice
                          }
                        >
                          {
                            product.oldPrice
                          }
                        </Text>

                      </View>


                      <TouchableOpacity
                        style={
                          styles.addButton
                        }
                        onPress={() =>
                          handleAddToCart(
                            product,
                          )
                        }
                      >

                        <Plus
                          size={19}
                          color="#FFFFFF"
                        />

                      </TouchableOpacity>

                    </View>

                  </View>

                </TouchableOpacity>

              ),
            )}

          </View>


          {/* ================= EMPTY ================= */}

          {filteredProducts.length ===
            0 && (

            <View
              style={
                styles.emptyContainer
              }
            >

              <Package
                size={45}
                color="#CBD5E1"
              />

              <Text
                style={
                  styles.emptyTitle
                }
              >
                No products found
              </Text>

              <Text
                style={
                  styles.emptyText
                }
              >
                Try another search
                or category.
              </Text>

            </View>

          )}

  
       

        </ScrollView>

      </Animated.View>



      {/* ================= REUSABLE FOOTER ================= */}
      <Footer
        activeTab="home"
        cartCount={cartCount}
        onHomePress={() => {}}
        onProductsPress={() => {}}
        onFavoritesPress={() => {}}
        onCartPress={onCartPress}
        onProfilePress={onProfilePress}
      />



    </View>

  );
};

export default HomeScreen;


/* ================================================= */
/* ===================== STYLES ==================== */
/* ================================================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F7F9FF',
  },

  contentWrapper: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 100,
  },


  /* ================= SEARCH ================= */

  searchContainer: {
    height: 56,

    borderRadius: 18,

    backgroundColor: '#FFFFFF',

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 13,

    borderWidth: 1,
    borderColor: '#E5EAF5',

    marginBottom: 18,
  },

  searchInput: {
    flex: 1,

    height: 55,

    marginLeft: 9,

    fontSize: 13,

    color: '#111827',
  },

  searchIcon: {
    width: 36,
    height: 36,

    borderRadius: 12,

    backgroundColor: '#EAF1FF',

    alignItems: 'center',
    justifyContent: 'center',
  },


  /* ================= SLIDER ================= */

  sliderContainer: {
    height: 205,

    marginBottom: 25,

    borderRadius: 25,

    overflow: 'hidden',
  },

  slide: {
    flex: 1,

    borderRadius: 25,

    overflow: 'hidden',
  },

  bannerImage: {
    width: '100%',
    height: '100%',

    position: 'absolute',
  },

  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor:
      'rgba(15, 23, 42, 0.48)',
  },

  bannerContent: {
    flex: 1,

    justifyContent: 'center',

    paddingHorizontal: 22,
  },

  saleBadge: {
    alignSelf: 'flex-start',

    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor: '#2563EB',

    paddingHorizontal: 9,
    paddingVertical: 5,

    borderRadius: 20,
  },

  saleText: {
    marginLeft: 5,

    fontSize: 8,

    color: '#FFFFFF',

    fontWeight: '900',
  },

  bannerTitle: {
    marginTop: 10,

    color: '#FFFFFF',

    fontSize: 27,

    fontWeight: '900',
  },

  bannerSubtitle: {
    marginTop: 3,

    color: '#E2E8F0',

    fontSize: 11,
  },

  shopButton: {
    alignSelf: 'flex-start',

    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor: '#FFFFFF',

    borderRadius: 13,

    paddingHorizontal: 12,
    paddingVertical: 8,

    marginTop: 12,
  },

  shopButtonText: {
    fontSize: 10,

    color: '#2563EB',

    fontWeight: '900',
  },

  pagination: {
    bottom: 8,
  },

  dot: {
    width: 6,
    height: 6,

    borderRadius: 3,

    backgroundColor: '#CBD5E1',

    marginHorizontal: 3,
  },

  activeDot: {
    width: 18,
    height: 6,

    borderRadius: 3,

    backgroundColor: '#FFFFFF',

    marginHorizontal: 3,
  },


  /* ================= SECTION ================= */

  sectionHeader: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: 13,
  },

  sectionTitle: {
    fontSize: 18,

    fontWeight: '900',

    color: '#111827',
  },

  sectionSubtitle: {
    fontSize: 10,

    color: '#94A3B8',

    marginTop: 3,
  },

  seeAll: {
    fontSize: 11,

    color: '#2563EB',

    fontWeight: '800',
  },


  /* ================= CATEGORY ================= */

  categoryScroll: {
    paddingBottom: 22,
  },

  categoryItem: {
    alignItems: 'center',

    marginRight: 16,
  },

  categoryIcon: {
    width: 59,
    height: 59,

    borderRadius: 19,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#E8EDFF',
  },

  categoryIconActive: {
    backgroundColor: '#2563EB',

    borderColor: '#2563EB',
  },

  categoryEmoji: {
    fontSize: 25,
  },

  categoryText: {
    marginTop: 7,

    fontSize: 10,

    color: '#64748B',

    fontWeight: '700',
  },

  categoryTextActive: {
    color: '#2563EB',

    fontWeight: '900',
  },


  /* ================= PRODUCT ================= */

  productGrid: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'space-between',
  },

  productCard: {
    width: (width - 46) / 2,

    backgroundColor: '#FFFFFF',

    borderRadius: 21,

    overflow: 'hidden',

    marginBottom: 15,

    borderWidth: 1,

    borderColor: '#EDF1F8',
  },

  productImageContainer: {
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

    width: 31,
    height: 31,

    borderRadius: 11,

    backgroundColor:
      'rgba(255,255,255,0.92)',

    alignItems: 'center',
    justifyContent: 'center',
  },

  discountBadge: {
    position: 'absolute',

    left: 9,
    top: 9,

    backgroundColor: '#EF4444',

    paddingHorizontal: 7,
    paddingVertical: 4,

    borderRadius: 7,
  },

  discountText: {
    color: '#FFFFFF',

    fontSize: 7,

    fontWeight: '900',
  },

  productInfo: {
    padding: 11,
  },

  productCategory: {
    fontSize: 8,

    color: '#94A3B8',

    fontWeight: '700',

    textTransform: 'uppercase',
  },

  productName: {
    marginTop: 4,

    fontSize: 12,

    color: '#1E293B',

    fontWeight: '800',
  },

  ratingRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 6,
  },

  ratingText: {
    marginLeft: 4,

    fontSize: 9,

    color: '#334155',

    fontWeight: '800',
  },

  ratingCount: {
    marginLeft: 3,

    fontSize: 8,

    color: '#94A3B8',
  },

  priceRow: {
    marginTop: 9,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  price: {
    fontSize: 15,

    color: '#111827',

    fontWeight: '900',
  },

  oldPrice: {
    fontSize: 8,

    color: '#94A3B8',

    textDecorationLine:
      'line-through',

    marginTop: 2,
  },

  addButton: {
    width: 34,
    height: 34,

    borderRadius: 12,

    backgroundColor: '#2563EB',

    alignItems: 'center',
    justifyContent: 'center',
  },


  /* ================= EMPTY ================= */

  emptyContainer: {
    alignItems: 'center',

    paddingVertical: 50,
  },

  emptyTitle: {
    marginTop: 10,

    fontSize: 15,

    color: '#475569',

    fontWeight: '800',
  },

  emptyText: {
    marginTop: 4,

    fontSize: 11,

    color: '#94A3B8',
  },



});
