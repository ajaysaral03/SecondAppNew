import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({

  /* ================= CONTAINER ================= */

  container: {
    flex: 1,
    backgroundColor: '#F7F9FF',
  },

  contentWrapper: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 120,
  },

  /* ================= SEARCH ================= */

  searchContainer: {
    height: 54,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',

    borderRadius: 17,

    paddingHorizontal: 14,

    borderWidth: 1,
    borderColor: '#E5EAF5',

    marginBottom: 18,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 7,

    elevation: 2,
  },

  searchInput: {
    flex: 1,

    height: 52,

    marginLeft: 9,

    paddingVertical: 0,

    fontSize: 13,

    color: '#111827',

    fontWeight: '500',
  },

  searchIcon: {
    width: 35,
    height: 35,

    borderRadius: 11,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#EAF1FF',
  },

  /* ================= BANNER ================= */

  sliderContainer: {
    height: 205,

    marginBottom: 25,

    borderRadius: 24,

    overflow: 'hidden',

    backgroundColor: '#E2E8F0',
  },

  slide: {
    flex: 1,

    overflow: 'hidden',

    borderRadius: 24,
  },

  bannerImage: {
    width: '100%',
    height: '100%',

    position: 'absolute',
  },

  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: 'rgba(15,23,42,0.52)',
  },

  bannerContent: {
    flex: 1,

    justifyContent: 'center',

    paddingHorizontal: 22,
  },

  saleBadge: {
    flexDirection: 'row',

    alignItems: 'center',

    alignSelf: 'flex-start',

    backgroundColor: '#2563EB',

    borderRadius: 20,

    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  saleText: {
    marginLeft: 5,

    fontSize: 8,

    color: '#FFFFFF',

    fontWeight: '900',
  },

  bannerTitle: {
    marginTop: 10,

    fontSize: 27,

    color: '#FFFFFF',

    fontWeight: '900',

    letterSpacing: -0.5,
  },

  bannerSubtitle: {
    marginTop: 4,

    fontSize: 11,

    color: '#E2E8F0',

    fontWeight: '500',
  },

  shopButton: {
    flexDirection: 'row',

    alignItems: 'center',

    alignSelf: 'flex-start',

    marginTop: 12,

    paddingHorizontal: 12,
    paddingVertical: 8,

    borderRadius: 13,

    backgroundColor: '#FFFFFF',
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

    marginHorizontal: 3,

    backgroundColor: '#CBD5E1',
  },

  activeDot: {
    width: 18,
    height: 6,

    borderRadius: 3,

    marginHorizontal: 3,

    backgroundColor: '#FFFFFF',
  },

  /* ================= SECTION ================= */

  sectionHeader: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    marginBottom: 13,
  },

  sectionTitle: {
    fontSize: 18,

    color: '#111827',

    fontWeight: '900',

    letterSpacing: -0.3,
  },

  sectionSubtitle: {
    marginTop: 3,

    fontSize: 10,

    color: '#94A3B8',

    fontWeight: '500',
  },

  seeAll: {
    fontSize: 11,

    color: '#2563EB',

    fontWeight: '800',
  },

  /* ================= CATEGORY ================= */

  categoryScroll: {
    paddingBottom: 23,
  },

  categoryItem: {
    alignItems: 'center',

    marginRight: 16,

    minWidth: 59,
  },

  categoryIcon: {
    width: 59,
    height: 59,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 18,

    backgroundColor: '#FFFFFF',

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

    textAlign: 'center',
  },

  categoryTextActive: {
    color: '#2563EB',

    fontWeight: '900',
  },

  /* ================= PRODUCT GRID ================= */

  productGrid: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'space-between',
  },

  productCard: {
    width: (width - 46) / 2,

    marginBottom: 15,

    overflow: 'hidden',

    backgroundColor: '#FFFFFF',

    borderRadius: 20,

    borderWidth: 1,

    borderColor: '#EDF1F8',

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.04,

    shadowRadius: 7,

    elevation: 2,
  },

  productImageContainer: {
    height: 155,

    position: 'relative',

    overflow: 'hidden',

    backgroundColor: '#F1F5F9',
  },

  productImage: {
    width: '100%',
    height: '100%',
  },

  favoriteButton: {
    position: 'absolute',

    top: 9,
    right: 9,

    width: 32,
    height: 32,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 11,

    backgroundColor: 'rgba(255,255,255,0.94)',
  },

  discountBadge: {
    position: 'absolute',

    top: 9,
    left: 9,

    paddingHorizontal: 7,
    paddingVertical: 4,

    borderRadius: 7,

    backgroundColor: '#EF4444',
  },

  discountText: {
    fontSize: 7,

    color: '#FFFFFF',

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

    fontWeight: '500',
  },

  priceRow: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    marginTop: 9,
  },

  price: {
    fontSize: 15,

    color: '#111827',

    fontWeight: '900',
  },

  oldPrice: {
    marginTop: 2,

    fontSize: 8,

    color: '#94A3B8',

    textDecorationLine: 'line-through',

    fontWeight: '500',
  },

  addButton: {
    width: 34,
    height: 34,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 12,

    backgroundColor: '#2563EB',
  },

  /* ================= EMPTY ================= */

  emptyContainer: {
    alignItems: 'center',

    paddingVertical: 55,
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

    fontWeight: '500',
  },
});

export default styles;