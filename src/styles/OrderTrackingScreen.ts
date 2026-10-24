
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F9FF',
  },

  // Header
  header: {
    minHeight: 70,
    marginTop: 35,
    paddingHorizontal: 18,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F9FF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECF5',
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF4',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#172033',
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 8,
  },
  headerRightSpace: {
    width: 42,
  },

  // Scroll area
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 18,
  },

  // Delivery information
  deliveryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8ECF5',
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#172033',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  deliveryTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#EEF3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  deliveryTextContainer: {
    flex: 1,
  },
  deliveryLabel: {
    color: '#8992A4',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  deliveryDate: {
    color: '#172033',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 5,
  },
  deliverySubtext: {
    color: '#697386',
    fontSize: 11,
    marginTop: 4,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3D9',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D99A18',
    marginRight: 5,
  },
  liveBadgeText: {
    color: '#986900',
    fontSize: 9,
    fontWeight: '900',
  },
  deliveryDivider: {
    height: 1,
    backgroundColor: '#E9EDF5',
    marginVertical: 15,
  },
  orderIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  smallLabel: {
    color: '#8992A4',
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 5,
  },
  orderId: {
    color: '#172033',
    fontSize: 13,
    fontWeight: '800',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    color: '#3563E9',
    fontSize: 16,
    fontWeight: '900',
  },

  // Tracking card
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8ECF5',
    padding: 17,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#172033',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  sectionTitle: {
    color: '#172033',
    fontSize: 18,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: '#7C8597',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
    marginBottom: 20,
  },

  // Timeline
  timeline: {
    position: 'relative',
    paddingTop: 2,
  },
  timelineRow: {
    flexDirection: 'row',
    minHeight: 76,
  },
  timelineRail: {
    width: 38,
    alignItems: 'center',
  },
  stepCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  stepCircleCompleted: {
    backgroundColor: '#20B26B',
  },
  stepCircleActive: {
    backgroundColor: '#3563E9',
    borderWidth: 4,
    borderColor: '#DCE6FF',
  },
  stepCirclePending: {
    backgroundColor: '#EEF1F6',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    minHeight: 40,
    backgroundColor: '#E2E7F0',
    marginVertical: 3,
  },
  timelineLineCompleted: {
    backgroundColor: '#20B26B',
  },

  // Moving bike
  bikeMarker: {
    position: 'absolute',
    top: 2,
    left: 0,
    width: 38,
    height: 38,
    borderRadius: 21,
    backgroundColor: '#3563E9',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
    elevation: 6,
    shadowColor: '#3563E9',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },

  stepContent: {
    flex: 1,
    paddingLeft: 12,
    paddingTop: 2,
    paddingBottom: 16,
  },
  stepContentSpaced: {
    minHeight: 76,
  },
  stepTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 7,
  },
  stepTitle: {
    color: '#172033',
    fontSize: 14,
    fontWeight: '800',
  },
  stepTitlePending: {
    color: '#9AA3B3',
  },
  stepDescription: {
    color: '#7C8597',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  currentBadge: {
    backgroundColor: '#EEF3FF',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 7,
  },
  currentBadgeText: {
    color: '#3563E9',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  activeHint: {
    color: '#3563E9',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 6,
  },
  deliveryNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#E7F9EF',
    padding: 12,
    borderRadius: 12,
    marginTop: 6,
  },
  deliveryNoticeText: {
    color: '#13834D',
    fontSize: 12,
    fontWeight: '800',
  },

  // Customer support
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#E8ECF5',
    padding: 14,
    marginBottom: 8,
  },
  helpIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#EEF3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    color: '#172033',
    fontSize: 13,
    fontWeight: '800',
  },
  helpDescription: {
    color: '#7C8597',
    fontSize: 11,
    lineHeight: 17,
    marginTop: 4,
  },

  // Bottom buttons
  bottomContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8ECF5',
    elevation: 8,
    shadowColor: '#172033',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.04,
    shadowRadius: 7,
  },
  primaryButton: {
    minHeight: 50,
    borderRadius: 14,
    backgroundColor: '#3563E9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    paddingHorizontal: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryButton: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 4,
  },
  secondaryButtonText: {
    color: '#53627D',
    fontSize: 12,
    fontWeight: '700',
  },

  // Animated alert modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(14, 23, 43, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  alertCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 23,
    paddingTop: 25,
    paddingBottom: 22,
    alignItems: 'center',
    elevation: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
  },
  alertIconCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#EEF3FF',
    borderWidth: 2,
    borderColor: '#DCE6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  alertTitle: {
    color: '#172033',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  alertMessage: {
    color: '#7C8597',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 22,
  },
  alertButton: {
    width: '100%',
    minHeight: 47,
    borderRadius: 13,
    backgroundColor: '#3563E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default styles;
