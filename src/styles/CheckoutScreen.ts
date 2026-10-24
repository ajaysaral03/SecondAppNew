
import { StyleSheet } from 'react-native';

const BLUE = '#2563EB';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F9FF',
  },

  /* HEADER */

  header: {
    minHeight: 72,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F9FF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8EDF7',
    zIndex: 2,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E9FA',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  headerTextContainer: {
    flex: 1,
    marginLeft: 12,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111827',
  },

  headerSubtitle: {
    fontSize: 11,
    color: '#8995AA',
    marginTop: 3,
    fontWeight: '600',
  },

  secureBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* SCROLL */

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 24,
  },

  /* SECTION HEADINGS */

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#172033',
  },

  stepLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: BLUE,
    backgroundColor: '#EAF1FF',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },

  itemsCount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8490A5',
  },

  /* ADDRESS */

  addressCard: {
    padding: 15,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3EAF7',
    elevation: 2,
    shadowColor: '#1D4ED8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 7,
  },

  addressTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  addressIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addressMain: {
    flex: 1,
    marginLeft: 11,
  },

  addressName: {
    fontSize: 14,
    fontWeight: '900',
    color: '#172033',
  },

  addressPhone: {
    fontSize: 12,
    color: '#8490A5',
    marginTop: 4,
  },

  changeText: {
    fontSize: 12,
    fontWeight: '800',
    color: BLUE,
    padding: 5,
  },

  addressDivider: {
    height: 1,
    backgroundColor: '#EDF1F7',
    marginVertical: 13,
  },

  addressLine: {
    fontSize: 12,
    lineHeight: 19,
    color: '#64748B',
  },

  defaultAddressBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 12,
    gap: 5,
  },

  defaultAddressText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#15803D',
  },

  /* DELIVERY */

  deliveryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E3EAF7',
    backgroundColor: '#FFFFFF',
  },

  deliveryOptionSelected: {
    borderColor: BLUE,
    backgroundColor: '#F5F8FF',
  },

  deliveryIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  deliveryTextContainer: {
    flex: 1,
    marginLeft: 11,
  },

  deliveryTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#172033',
  },

  deliverySubtitle: {
    fontSize: 10,
    color: '#8490A5',
    marginTop: 5,
  },

  deliveryPriceContainer: {
    alignItems: 'flex-end',
    gap: 9,
  },

  deliveryPrice: {
    fontSize: 12,
    fontWeight: '900',
    color: '#172033',
  },

  /* RADIO */

  radioOuter: {
    width: 19,
    height: 19,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioOuterSelected: {
    borderColor: BLUE,
  },

  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: BLUE,
  },

  /* PAYMENT */

  paymentCard: {
    paddingHorizontal: 13,
    paddingVertical: 3,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3EAF7',
  },

  paymentOption: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },

  paymentOptionSelected: {
    backgroundColor: '#F8FAFF',
  },

  paymentIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: '#F1F5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paymentIconSelected: {
    backgroundColor: '#E0EAFF',
  },

  paymentTextContainer: {
    flex: 1,
    marginLeft: 11,
  },

  paymentTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#172033',
  },

  paymentSubtitle: {
    fontSize: 10,
    color: '#8490A5',
    marginTop: 4,
  },

  optionDivider: {
    height: 1,
    backgroundColor: '#EDF1F7',
  },

  /* ORDER ITEMS */

  orderCard: {
    paddingHorizontal: 13,
    paddingVertical: 5,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3EAF7',
  },

  orderItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 13,
  },

productPlaceholder: {
  width: 88,
  height: 88,
  borderRadius: 14,
  backgroundColor: '#F8FAFC',
  borderWidth: 1,
  borderColor: '#E2E8F0',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
},

productImage: {
  width: '100%',
  height: '100%',
},

  orderItemDetails: {
    flex: 1,
    marginLeft: 10,
    marginRight: 5,
  },

  orderItemName: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '800',
    color: '#172033',
  },

  orderItemPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: BLUE,
    marginTop: 5,
  },

  itemTotal: {
    fontSize: 12,
    fontWeight: '900',
    color: '#172033',
    marginTop: 2,
  },

  orderDivider: {
    height: 1,
    backgroundColor: '#EDF1F7',
  },

  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E3EAF7',
    overflow: 'hidden',
  },

  quantityButton: {
    width: 27,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F9FF',
  },

  quantityText: {
    minWidth: 27,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '800',
    color: '#172033',
  },

  emptyCart: {
    alignItems: 'center',
    paddingVertical: 25,
  },

  emptyCartTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#172033',
    marginTop: 10,
  },

  emptyCartText: {
    fontSize: 12,
    color: '#8490A5',
    marginTop: 5,
    textAlign: 'center',
  },

  /* PRICE SUMMARY */

  summaryCard: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3EAF7',
  },

  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },

  summaryLabel: {
    fontSize: 12,
    color: '#8490A5',
    fontWeight: '600',
  },

  summaryValue: {
    fontSize: 12,
    color: '#172033',
    fontWeight: '800',
  },

  freeText: {
    color: '#16A34A',
  },

  deliveryHint: {
    fontSize: 10,
    lineHeight: 15,
    color: BLUE,
    backgroundColor: '#EFF6FF',
    padding: 9,
    borderRadius: 9,
    marginBottom: 12,
  },

  summaryDivider: {
    height: 1,
    backgroundColor: '#E8EDF7',
    marginBottom: 15,
  },

  totalLabel: {
    fontSize: 14,
    fontWeight: '900',
    color: '#172033',
  },

  totalValue: {
    fontSize: 19,
    fontWeight: '900',
    color: BLUE,
  },

  savingsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F0FDF4',
    marginTop: 3,
  },

  savingsText: {
    flex: 1,
    fontSize: 10,
    fontWeight: '700',
    color: '#15803D',
  },

  bottomNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 2,
    gap: 7,
  },

  bottomNoteText: {
    fontSize: 10,
    color: '#8490A5',
  },

  /* FIXED BOTTOM BAR */

  bottomBar: {
    paddingHorizontal: 18,
    paddingTop: 9,
    paddingBottom: 9,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8EDF7',
    elevation: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    gap: 7,
  },

  bottomPriceContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  bottomPriceTextGroup: {
    flexDirection: 'column',
    justifyContent: 'center',
  },

  bottomTotalLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#8490A5',
  },

  bottomTotal: {
    fontSize: 22,
    fontWeight: '900',
    color: '#172033',
    marginTop: 2,
  },

  bottomSecureHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
  },

  bottomSecureText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#15803D',
  },

  placeOrderButton: {
    width: '100%',
    minHeight: 48,
    paddingHorizontal: 16,
    borderRadius: 15,
    backgroundColor: BLUE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    elevation: 4,
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
  },

  placeOrderDisabled: {
    backgroundColor: '#94A3B8',
    elevation: 0,
    shadowOpacity: 0,
  },

  placeOrderText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },

  /* SWEETALERT OVERLAY */

  alertOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.58)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  alertCard: {
    width: '100%',
    maxWidth: 380,
    paddingHorizontal: 22,
    paddingTop: 30,
    paddingBottom: 22,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    elevation: 18,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },

  alertClose: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },

  alertIconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17,
  },

  alertTitle: {
    fontSize: 21,
    lineHeight: 27,
    fontWeight: '900',
    color: '#172033',
    textAlign: 'center',
  },

  alertMessage: {
    fontSize: 13,
    lineHeight: 21,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 10,
  },

  alertActions: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 24,
    gap: 10,
  },

  alertCancelButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 13,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  alertCancelText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#475569',
  },

  alertConfirmButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    gap: 5,
    elevation: 3,
  },

  alertSingleButton: {
    flex: 1,
  },

  alertConfirmText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#FFFFFF',
  },
});

export default styles;
