
import { StyleSheet } from 'react-native';

const BLUE = '#2563EB';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F9FF',
  },

  screen: {
    flex: 1,
    backgroundColor: '#F7F9FF',
  },

  /* HEADER */

  header: {
    minHeight: 76,
    backgroundColor: '#F7F9FF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E8EDF7',
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
    zIndex: 2,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E1E9FA',
    elevation: 2,
  },

  backButtonPressed: {
    backgroundColor: '#EAF1FF',
    transform: [{ scale: 0.95 }],
  },

  headerTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },

  headerTitle: {
    fontSize: 19,
    color: '#111827',
    fontWeight: '900',
    letterSpacing: -0.3,
  },

  headerSubtitle: {
    marginTop: 3,
    fontSize: 11,
    color: '#8995AA',
    fontWeight: '600',
  },

  editButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D9E6FF',
    elevation: 2,
  },

  /* SCROLLABLE PRODUCT LIST */

  list: {
    flex: 1,
    width: '100%',
    marginBottom:35,
  },

  listContent: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 40,
    flexGrow: 1,
  },

  columnWrapper: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  /* PRODUCT CARD */

  cardWrapper: {
    width: '48.5%',
    marginBottom: 16,
  },

  card: {
    width: '100%',
    padding: 7,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E6EBF5',
    overflow: 'hidden',
    shadowColor: '#1D4ED8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 3,
  },

  /* PRODUCT IMAGE */

  imageSection: {
    width: '100%',
    height: 125,
    borderRadius: 13,
    overflow: 'hidden',
    backgroundColor: '#EAF0FF',
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,23,42,0.025)',
  },

  heart: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 33,
    height: 33,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },

  /* PRODUCT DETAILS */

  info: {
    paddingHorizontal: 3,
    paddingTop: 9,
    paddingBottom: 3,
  },

  productDetails: {
    minHeight: 49,
    justifyContent: 'flex-start',
  },

  productName: {
    minHeight: 18,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '800',
    color: '#172033',
  },

  price: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8490A5',
    marginTop: 5,
  },

  /* ADD TO CART BUTTON */

  cartBtn: {
    width: '100%',
    height: 40,
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: BLUE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 3,
  },

  cartText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    marginLeft: 7,
  },

  buttonPressed: {
    opacity: 0.75,
  },

  cartPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },

  /* EMPTY FAVORITES */

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },

  emptyCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#111827',
  },

  emptyText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#8B95A7',
    textAlign: 'center',
    marginTop: 8,
  },

  exploreBtn: {
    marginTop: 20,
    height: 44,
    paddingHorizontal: 24,
    borderRadius: 13,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  exploreText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* DELETE CONFIRMATION MODAL */

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'rgba(15,23,42,0.55)',
  },

  alertBox: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    elevation: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },

  close: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  warningIcon: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 7,
    marginBottom: 14,
  },

  alertTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#111827',
  },

  alertMessage: {
    fontSize: 13,
    lineHeight: 20,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },

  alertActions: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
  },

  cancel: {
    flex: 1,
    height: 44,
    borderRadius: 11,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },

  cancelText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#374151',
  },

  confirm: {
    flex: 1,
    height: 44,
    borderRadius: 11,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },

  confirmText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* ADD TO CART SUCCESS ALERT */

  successOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 30,
    backgroundColor: 'rgba(15,23,42,0.12)',
  },

  successBox: {
    width: '100%',
    maxWidth: 400,
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    elevation: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
  },

  successIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  successContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },

  successTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#053d1a',
  },

  successMessage: {
    fontSize: 12,
    lineHeight: 18,
    color: '#64748B',
    marginTop: 3,
  },
});

export default styles;
