import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F7FF',
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 30,
  },

  /* ================= HERO ================= */

  heroSection: {
    height: 300,
    borderRadius: 32,
    backgroundColor: '#EAF1FF',

    alignItems: 'center',
    justifyContent: 'center',

    position: 'relative',
    overflow: 'hidden',

    marginBottom: -30,
  },

  blueCircle: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#D8E7FF',
    top: -90,
    right: -60,
  },

  lightCircle: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FFFFFF',
    opacity: 0.55,
    bottom: -90,
    left: -60,
  },

  /* ================= LOGO ================= */

  logoContainer: {
    width: 78,
    height: 78,
    borderRadius: 26,

    backgroundColor: '#2563EB',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 5,
    borderColor: '#FFFFFF',

    shadowColor: '#2563EB',

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.3,
    shadowRadius: 12,

    elevation: 10,
  },

  brandName: {
    marginTop: 12,
    fontSize: 26,
    fontWeight: '900',
    color: '#172554',
  },

  heroTitle: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '800',
    color: '#1E3A8A',
  },

  heroSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: '#64748B',
  },

  /* ================= FLOATING ITEMS ================= */

  floatingProduct: {
    position: 'absolute',

    width: 55,
    height: 55,

    borderRadius: 18,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#1E40AF',

    shadowOffset: {
      width: 0,
      height: 7,
    },

    shadowOpacity: 0.15,
    shadowRadius: 10,

    elevation: 8,
  },

  productOne: {
    left: 25,
    top: 55,
  },

  productTwo: {
    right: 28,
    top: 48,
  },

  productThree: {
    left: 45,
    bottom: 45,
  },

  /* ================= TRUST ================= */

  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13,
  },

  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  trustText: {
    marginLeft: 4,
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 10,
  },

  /* ================= CARD ================= */

  loginCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 30,

    paddingHorizontal: 20,
    paddingVertical: 25,

    borderWidth: 1,
    borderColor: '#EEF2FF',

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
    marginBottom: 23,
  },

  welcome: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111827',
  },

  cardSubtitle: {
    marginTop: 5,
    fontSize: 13,
    color: '#64748B',
  },

  /* ================= INPUT ================= */

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#334155',
    marginBottom: 8,
  },

  inputContainer: {
    minHeight: 58,

    borderRadius: 17,

    borderWidth: 1.3,
    borderColor: '#E2E8F0',

    backgroundColor: '#F8FAFF',

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 10,
  },

  inputIcon: {
    width: 40,
    height: 40,

    borderRadius: 13,

    backgroundColor: '#EAF1FF',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 9,
  },

  input: {
    flex: 1,

    height: 55,

    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
  },

  countryCode: {
    fontSize: 13,
    fontWeight: '800',
    color: '#334155',
  },

  verticalLine: {
    width: 1,
    height: 25,

    backgroundColor: '#CBD5E1',

    marginHorizontal: 9,
  },

  mobileInput: {
    flex: 1,

    height: 55,

    fontSize: 14,

    color: '#111827',

    fontWeight: '600',

    letterSpacing: 0.5,
  },

  helperText: {
    marginTop: 6,

    fontSize: 10,

    color: '#94A3B8',
  },

  /* ================= BUTTON ================= */

  loginButton: {
    height: 58,

    borderRadius: 18,

    backgroundColor: '#2563EB',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 3,

    shadowColor: '#2563EB',

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.3,
    shadowRadius: 12,

    elevation: 8,
  },

  disabledButton: {
    backgroundColor: '#A5B4FC',

    shadowOpacity: 0,

    elevation: 0,
  },

  loginButtonText: {
    color: '#FFFFFF',

    fontSize: 14,

    fontWeight: '900',

    marginRight: 12,
  },

  arrowCircle: {
    width: 35,
    height: 35,

    borderRadius: 18,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ================= TERMS ================= */

  termsText: {
    marginTop: 16,

    textAlign: 'center',

    fontSize: 10,

    lineHeight: 16,

    color: '#94A3B8',
  },

  termsLink: {
    color: '#2563EB',
    fontWeight: '800',
  },

  /* ================= BENEFITS ================= */

  benefitsContainer: {
    marginTop: 22,

    borderRadius: 18,

    backgroundColor: '#F8FAFF',

    borderWidth: 1,
    borderColor: '#E7EDFF',

    padding: 13,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',

    flex: 1,
  },

  benefitIcon: {
    width: 34,
    height: 34,

    borderRadius: 11,

    backgroundColor: '#EAF1FF',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 8,
  },

  benefitTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#1E293B',
  },

  benefitText: {
    fontSize: 9,
    color: '#94A3B8',
    marginTop: 2,
  },

  benefitDivider: {
    width: 1,
    height: 30,

    backgroundColor: '#E2E8F0',

    marginHorizontal: 8,
  },

  /* ================= FOOTER ================= */

  footerText: {
    textAlign: 'center',

    marginTop: 18,

    fontSize: 11,

    color: '#94A3B8',

    fontWeight: '600',
  },

});

export default styles;