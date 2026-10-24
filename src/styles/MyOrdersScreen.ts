
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    marginTop:30,
    borderBottomColor: '#EAEFF6',
  },
  headerBack: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#F2F5FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    color: '#172033',
    fontSize: 20,
    fontWeight: '900',
  },
  headerSubtitle: {
    color: '#8A93A5',
    fontSize: 11,
    marginTop: 4,
  },
  headerCount: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#EAF0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCountText: {
    color: '#3563E9',
    fontSize: 14,
    fontWeight: '900',
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },

  summaryCard: {
    backgroundColor: '#263F92',
    borderRadius: 20,
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: '#4264CA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  summarySubtitle: {
    color: '#D5DFFF',
    fontSize: 11,
    marginTop: 5,
  },

  filterContainer: {
    gap: 9,
    paddingBottom: 19,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF3',
    borderRadius: 13,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  filterButtonActive: {
    backgroundColor: '#3563E9',
    borderColor: '#3563E9',
  },
  filterText: {
    color: '#687389',
    fontSize: 12,
    fontWeight: '700',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  filterCount: {
    minWidth: 21,
    height: 21,
    paddingHorizontal: 5,
    borderRadius: 7,
    backgroundColor: '#F0F2F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterCountActive: {
    backgroundColor: '#5578EE',
  },
  filterCountText: {
    color: '#687389',
    fontSize: 10,
    fontWeight: '800',
  },
  filterCountTextActive: {
    color: '#FFFFFF',
  },

  listHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  listTitle: {
    color: '#172033',
    fontSize: 17,
    fontWeight: '900',
  },
  listCount: {
    color: '#8992A4',
    fontSize: 11,
  },

  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#E8ECF4',
    padding: 14,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#172033',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.035,
    shadowRadius: 7,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingBottom: 13,
  },
  orderHeaderLeft: {
    flex: 1,
  },
  orderIdLabel: {
    color: '#98A1B1',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  orderId: {
    color: '#172033',
    fontSize: 13,
    fontWeight: '900',
    marginTop: 4,
  },
  orderDate: {
    color: '#8992A4',
    fontSize: 11,
    marginTop: 5,
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 9,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  statusActive: {
    backgroundColor: '#FFF4D9',
  },
  statusDelivered: {
    backgroundColor: '#E4F8EC',
  },
  statusCancelled: {
    backgroundColor: '#FDECEC',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusDotActive: {
    backgroundColor: '#D69A13',
  },
  statusDotDelivered: {
    backgroundColor: '#1BA45C',
  },
  statusDotCancelled: {
    backgroundColor: '#D04444',
  },
  statusText: {
    color: '#38445A',
    fontSize: 10,
    fontWeight: '800',
  },

  divider: {
    height: 1,
    backgroundColor: '#EDF0F6',
    marginBottom: 12,
  },
  productDivider: {
    height: 1,
    backgroundColor: '#F0F2F7',
    marginVertical: 11,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  productImageContainer: {
    width: 68,
    height: 72,
    borderRadius: 13,
    backgroundColor: '#F2F4F8',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: '#172033',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 17,
  },
  productVariant: {
    color: '#8992A4',
    fontSize: 10,
    marginTop: 5,
  },
  productQuantity: {
    color: '#657188',
    fontSize: 10,
    marginTop: 5,
    fontWeight: '600',
  },
  productPrice: {
    color: '#172033',
    fontSize: 12,
    fontWeight: '900',
    alignSelf: 'center',
  },

  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  totalLabel: {
    color: '#657188',
    fontSize: 11,
    fontWeight: '600',
  },
  itemCount: {
    color: '#9AA3B2',
    fontSize: 10,
    marginTop: 4,
  },
  totalAmount: {
    color: '#172033',
    fontSize: 19,
    fontWeight: '900',
  },

  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailsButton: {
    flex: 1,
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#EFF3FF',
    borderRadius: 11,
    paddingHorizontal: 7,
  },
  detailsButtonText: {
    color: '#3563E9',
    fontSize: 11,
    fontWeight: '800',
  },
  trackButton: {
    flex: 1,
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#3563E9',
    borderRadius: 11,
    paddingHorizontal: 7,
  },
  trackButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  deliveredButton: {
    flex: 1,
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#E4F8EC',
    borderRadius: 11,
  },
  deliveredButtonText: {
    color: '#16834E',
    fontSize: 11,
    fontWeight: '800',
  },
  cancelledButton: {
    flex: 1,
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FDECEC',
    borderRadius: 11,
  },
  cancelledButtonText: {
    color: '#D04444',
    fontSize: 11,
    fontWeight: '800',
  },
  cancelOrderButton: {
    alignSelf: 'center',
    paddingVertical: 11,
    paddingHorizontal: 14,
    marginTop: 2,
  },
  cancelOrderText: {
    color: '#D04444',
    fontSize: 11,
    fontWeight: '700',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 35,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8ECF4',
  },
  emptyIcon: {
    width: 70,
    height: 70,
    borderRadius: 24,
    backgroundColor: '#EEF3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  emptyTitle: {
    color: '#172033',
    fontSize: 17,
    fontWeight: '900',
  },
  emptyDescription: {
    color: '#8992A4',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 8,
  },
  shopButton: {
    backgroundColor: '#3563E9',
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 13,
    marginTop: 19,
  },
  shopButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  // Order details modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(14, 23, 43, 0.5)',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 11,
    paddingBottom: 25,
    maxHeight: '85%',
  },
  modalHandle: {
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D9DFEA',
    alignSelf: 'center',
    marginBottom: 18,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  modalTitle: {
    color: '#172033',
    fontSize: 20,
    fontWeight: '900',
  },
  modalOrderId: {
    color: '#8992A4',
    fontSize: 11,
    marginTop: 5,
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F1F4F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EDF0F6',
    marginBottom: 20,
  },
  modalLabel: {
    color: '#657188',
    fontSize: 12,
    fontWeight: '700',
  },
  modalSectionTitle: {
    color: '#172033',
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 13,
  },
  modalProductRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F7',
  },
  modalProductImage: {
    width: 57,
    height: 60,
    borderRadius: 11,
    backgroundColor: '#F2F4F8',
  },
  modalProductInfo: {
    flex: 1,
  },
  modalProductName: {
    color: '#172033',
    fontSize: 12,
    fontWeight: '800',
  },
  modalProductVariant: {
    color: '#8992A4',
    fontSize: 10,
    marginTop: 5,
  },
  modalProductPrice: {
    color: '#172033',
    fontSize: 12,
    fontWeight: '900',
  },
  modalTotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF0F6',
  },
  modalTotalLabel: {
    color: '#657188',
    fontSize: 13,
    fontWeight: '700',
  },
  modalTotalAmount: {
    color: '#172033',
    fontSize: 21,
    fontWeight: '900',
  },
  modalDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginTop: 15,
    marginBottom: 18,
  },
  modalDateText: {
    color: '#657188',
    fontSize: 12,
  },
  modalTrackButton: {
    minHeight: 48,
    borderRadius: 13,
    backgroundColor: '#3563E9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  modalTrackButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  modalCancelButton: {
    minHeight: 43,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  modalCancelButtonText: {
    color: '#D04444',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default styles;
