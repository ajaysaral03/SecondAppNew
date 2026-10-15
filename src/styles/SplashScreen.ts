import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F7F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  /* ================= BACKGROUND ================= */

  backgroundCircleLarge: {
    position: 'absolute',

    width: 350,
    height: 350,

    borderRadius: 175,

    backgroundColor: '#E7EFFF',

    top: -150,
    right: -120,
  },

  backgroundCircleSmall: {
    position: 'absolute',

    width: 280,
    height: 280,

    borderRadius: 140,

    backgroundColor: '#EEF2FF',

    bottom: -130,
    left: -100,
  },

  /* ================= FLOATING ICONS ================= */

  floatingIcon: {
    position: 'absolute',

    width: 58,
    height: 58,

    borderRadius: 20,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#1E3A8A',

    shadowOffset: {
      width: 0,
      height: 7,
    },

    shadowOpacity: 0.12,
    shadowRadius: 12,

    elevation: 8,
  },

  floatingOne: {
    top: '22%',
    left: 35,
  },

  floatingTwo: {
    top: '28%',
    right: 32,
  },

  /* ================= SPARKLE ================= */

  sparkle: {
    position: 'absolute',

    width: 52,
    height: 52,

    alignItems: 'center',
    justifyContent: 'center',
  },

  sparkleOne: {
    right: 55,
    top: '18%',
  },

  /* ================= MAIN LOGO ================= */

  mainContent: {
    alignItems: 'center',
  },

  logoShadow: {
    shadowColor: '#2563EB',

    shadowOffset: {
      width: 0,
      height: 15,
    },

    shadowOpacity: 0.28,
    shadowRadius: 20,

    elevation: 15,
  },

  logoContainer: {
    width: 135,
    height: 135,

    borderRadius: 42,

    backgroundColor: '#2563EB',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 6,
    borderColor: '#FFFFFF',

    position: 'relative',
  },

  logoSparkle: {
    position: 'absolute',

    right: 8,
    top: 8,

    width: 31,
    height: 31,

    borderRadius: 16,

    backgroundColor: '#7C3AED',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 3,
    borderColor: '#FFFFFF',
  },

  /* ================= TEXT ================= */

  textContainer: {
    alignItems: 'center',

    marginTop: 28,

    paddingHorizontal: 25,
  },

  appName: {
    fontSize: 36,

    fontWeight: '900',

    color: '#111827',

    letterSpacing: -1,
  },

  tagline: {
    marginTop: 5,

    fontSize: 16,

    fontWeight: '700',

    color: '#2563EB',
  },

  description: {
    marginTop: 12,

    textAlign: 'center',

    fontSize: 13,

    lineHeight: 20,

    color: '#64748B',
  },

  /* ================= TRUST ================= */

  trustRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 24,
  },

  trustItem: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  trustIcon: {
    width: 30,
    height: 30,

    borderRadius: 10,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 6,

    shadowColor: '#1E3A8A',

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 3,
  },

  trustText: {
    fontSize: 11,

    fontWeight: '700',

    color: '#475569',
  },

  divider: {
    width: 1,
    height: 25,

    backgroundColor: '#CBD5E1',

    marginHorizontal: 15,
  },

  /* ================= BOTTOM ================= */

  bottomContainer: {
    position: 'absolute',

    bottom: 35,

    alignItems: 'center',

    width: '100%',
  },

  loadingTrack: {
    width: 80,
    height: 4,

    borderRadius: 4,

    backgroundColor: '#DCE5FF',

    overflow: 'hidden',

    marginBottom: 12,
  },

  loadingBar: {
    width: 45,
    height: 4,

    borderRadius: 4,

    backgroundColor: '#2563EB',
  },

  bottomText: {
    fontSize: 10,

    color: '#94A3B8',

    fontWeight: '600',
  },

});

export default styles;