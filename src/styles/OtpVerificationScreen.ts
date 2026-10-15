
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
     paddingTop: 18,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 30,
  },


  // ================= BACK =================

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },

  backIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E7EDFF',
    shadowColor: '#1E3A8A',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  backText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '800',
    color: '#172554',
  },


  // ================= HERO =================

  heroSection: {
    height: 275,
    borderRadius: 30,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: -25,
  },

  circleOne: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: '#D8E7FF',
    top: -100,
    right: -65,
  },

  circleTwo: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
    bottom: -100,
    left: -70,
  },


  // ================= FLOATING =================

  floatingIcon: {
    position: 'absolute',
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1E3A8A',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.13,
    shadowRadius: 10,
    elevation: 7,
  },

  floatingOne: {
    left: 25,
    top: 45,
  },

  floatingTwo: {
    right: 25,
    top: 60,
  },


  // ================= MAIN ICON =================

  mainIconWrapper: {
    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 12,
  },

  mainIcon: {
    width: 86,
    height: 86,
    borderRadius: 28,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#FFFFFF',
    position: 'relative',
  },

  smallSparkle: {
    position: 'absolute',
    right: 4,
    top: 4,
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },


  // ================= HERO TEXT =================

  title: {
    marginTop: 14,
    fontSize: 25,
    fontWeight: '900',
    color: '#111827',
  },

  subtitle: {
    marginTop: 5,
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },

  mobileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE7FF',
  },

  mobileText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '900',
    color: '#2563EB',
  },


  // ================= CARD =================

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderWidth: 1,
    borderColor: '#EAF0FF',
    shadowColor: '#1E3A8A',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
  },

  cardHeader: {
    alignItems: 'center',
    marginBottom: 22,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#111827',
  },

  cardSubtitle: {
    marginTop: 5,
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 17,
  },


  // ================= OTP =================

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 5,
  },

  otpBoxWrapper: {
    width: 58,
    height: 62,
    borderRadius: 17,
    backgroundColor: '#F8FAFF',
    borderWidth: 1.5,
    borderColor: '#DCE3EF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  otpBoxWrapperActive: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  otpInput: {
    width: '100%',
    height: '100%',
    fontSize: 24,
    fontWeight: '900',
    color: '#111827',
  },

  otpInputActive: {
    color: '#2563EB',
  },

  activeDot: {
    position: 'absolute',
    bottom: 5,
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#2563EB',
  },


  // ================= VERIFY =================

  verifyButton: {
    height: 57,
    borderRadius: 18,
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 7,
  },

  disabledButton: {
    backgroundColor: '#A5B4FC',
    shadowOpacity: 0,
    elevation: 0,
  },

  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    marginRight: 12,
  },

  arrowCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },


  // ================= RESEND =================

  resendContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  resendText: {
    fontSize: 11,
    color: '#94A3B8',
  },

  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  resendLink: {
    marginLeft: 5,
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '900',
  },


  // ================= SECURITY =================

  securityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    padding: 14,
    borderRadius: 18,
    backgroundColor: '#F8FAFF',
    borderWidth: 1,
    borderColor: '#E3EBFF',
  },

  securityIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  securityContent: {
    flex: 1,
  },

  securityTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#1E293B',
  },

  securityText: {
    marginTop: 3,
    fontSize: 9,
    lineHeight: 14,
    color: '#94A3B8',
  },


  // ================= DEMO =================

  demoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#F5F0FF',
    borderWidth: 1,
    borderColor: '#E6D9FF',
  },

  demoIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },

  demoTitle: {
    fontSize: 10,
    fontWeight: '900',
    color: '#6D28D9',
  },

  demoText: {
    marginTop: 2,
    fontSize: 10,
    color: '#7C3AED',
  },


  // ================= FOOTER =================

  footerText: {
    textAlign: 'center',
    marginTop: 18,
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
  },

});


export default styles;