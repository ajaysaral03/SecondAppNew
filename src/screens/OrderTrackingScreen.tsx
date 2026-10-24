
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
  Easing,
  Modal,
  Pressable,
} from 'react-native';
import { Feather } from '@react-native-vector-icons/feather';
import { Bike } from 'lucide-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import styles from '../styles/OrderTrackingScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderTracking'>;

type TrackingStep = {
  title: string;
  description: string;
  icon: string;
};

const steps: TrackingStep[] = [
  {
    title: 'Order Placed',
    description: 'We have received your order.',
    icon: 'shopping-bag',
  },
  {
    title: 'Order Confirmed',
    description: 'Your order has been confirmed.',
    icon: 'check-circle',
  },
  {
    title: 'Shipped',
    description: 'Your order is on its way.',
    icon: 'package',
  },
  {
    title: 'Out for Delivery',
    description: 'Your delivery partner is bringing your order.',
    icon: 'truck',
  },
  {
    title: 'Delivered',
    description: 'Your order has been delivered.',
    icon: 'home',
  },
];

const formatINR = (amount: number) =>
  `₹${Number(amount || 0).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
  })}`;

const OrderTrackingScreen: React.FC<Props> = ({ navigation, route }) => {
  const orderId = route.params?.orderId ?? 'ORD-100001';
  const total = Number(route.params?.total ?? 0);

  // Demo: bike/status stops at Out for Delivery (step index 3).
  const [currentStep, setCurrentStep] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const bikeProgress = useRef(new Animated.Value(0)).current;
  const alertScale = useRef(new Animated.Value(0.8)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;

  const estimatedDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }, []);

  // Advance one status every 2 seconds, stopping at Out for Delivery.
  useEffect(() => {
    if (currentStep >= 4) {
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(previous => Math.min(previous + 1, 4));
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  // Animate the bike to the active timeline step.
  useEffect(() => {
    Animated.timing(bikeProgress, {
      toValue: currentStep,
      duration: 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [currentStep, bikeProgress]);

  const bikeTranslateY = bikeProgress.interpolate({
    inputRange: [0, 1, 2, 3,4],
    outputRange: [0, 76, 152, 228,304],
    extrapolate: 'clamp',
  });

  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);

    alertScale.setValue(0.8);
    alertOpacity.setValue(0);

    Animated.parallel([
      Animated.spring(alertScale, {
        toValue: 1,
        friction: 7,
        tension: 70,
        useNativeDriver: true,
      }),
      Animated.timing(alertOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeAlert = () => {
    Animated.parallel([
      Animated.timing(alertScale, {
        toValue: 0.85,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(alertOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setAlertVisible(false);
      }
    });
  };

  const handleBackToConfirmation = () => {
    const routeNames = navigation.getState().routeNames;

    if (routeNames.includes('OrderSuccess')) {
      navigation.navigate('OrderSuccess', { orderId, total });
    } else {
      showAlert(
        'Order Confirmation',
        'OrderSuccess route is not registered in your navigation.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F9FF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.75}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Feather name="arrow-left" size={21} color="#172033" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Track Order</Text>

        <View style={styles.headerRightSpace} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Delivery details */}
        <View style={styles.deliveryCard}>
          <View style={styles.deliveryTopRow}>
            <View style={styles.deliveryIconCircle}>
              <Feather name="truck" size={25} color="#3563E9" />
            </View>

            <View style={styles.deliveryTextContainer}>
              <Text style={styles.deliveryLabel}>ESTIMATED DELIVERY</Text>
              <Text style={styles.deliveryDate}>{estimatedDate}</Text>
              <Text style={styles.deliverySubtext}>
                Expected in 2–4 days
              </Text>
            </View>

            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveBadgeText}>DEMO</Text>
            </View>
          </View>

          <View style={styles.deliveryDivider} />

          <View style={styles.orderIdRow}>
            <View>
              <Text style={styles.smallLabel}>Order ID</Text>
              <Text selectable style={styles.orderId}>
                {orderId}
              </Text>
            </View>

            <View style={styles.amountContainer}>
              <Text style={styles.smallLabel}>Order Total</Text>
              <Text style={styles.amount}>{formatINR(total)}</Text>
            </View>
          </View>
        </View>

        {/* Tracking timeline */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Order Status</Text>
          <Text style={styles.sectionSubtitle}>
            Follow your order as it moves towards delivery.
          </Text>

          <View style={styles.timeline}>
            {/* Animated bike */}
            <Animated.View
              pointerEvents="none"
              style={[
                styles.bikeMarker,
                { transform: [{ translateY: bikeTranslateY }] },
              ]}
            >
              <Bike size={23} color="#FFFFFF" />
            </Animated.View>

            {steps.map((step, index) => {
              const completed = index < currentStep;
              const active = index === currentStep;
              const pending = index > currentStep;

              return (
                <View key={step.title} style={styles.timelineRow}>
                  <View style={styles.timelineRail}>
                    <View
                      style={[
                        styles.stepCircle,
                        completed && styles.stepCircleCompleted,
                        active && styles.stepCircleActive,
                        pending && styles.stepCirclePending,
                      ]}
                    >
                      {completed ? (
                        <Feather name="check" size={17} color="#FFFFFF" />
                      ) : (
                        <Feather
                          name={step.icon as any}
                          size={16}
                          color={pending ? '#A6AFBF' : '#FFFFFF'}
                        />
                      )}
                    </View>

                    {index < steps.length - 1 && (
                      <View
                        style={[
                          styles.timelineLine,
                          index < currentStep && styles.timelineLineCompleted,
                        ]}
                      />
                    )}
                  </View>

                  <View
                    style={[
                      styles.stepContent,
                      index < steps.length - 1 && styles.stepContentSpaced,
                    ]}
                  >
                    <View style={styles.stepTitleRow}>
                      <Text
                        style={[
                          styles.stepTitle,
                          pending && styles.stepTitlePending,
                        ]}
                      >
                        {step.title}
                      </Text>

                      {active && (
                        <View style={styles.currentBadge}>
                          <Text style={styles.currentBadgeText}>
                            CURRENT
                          </Text>
                        </View>
                      )}

                      {completed && (
                        <Feather
                          name="check-circle"
                          size={16}
                          color="#20B26B"
                        />
                      )}
                    </View>

                    <Text style={styles.stepDescription}>
                      {step.description}
                    </Text>

                    {active && (
                      <Text style={styles.activeHint}>
                        {currentStep === 3
                          ? 'Your delivery partner is on the way!'
                          : 'Moving to the next order status...'}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>

          {currentStep === 4 && (
            <View style={styles.deliveryNotice}>
              <Feather name="truck" size={17} color="#13834D" />
              <Text style={styles.deliveryNoticeText}>
                Your order is out for delivery!
              </Text>
            </View>
          )}
        </View>

        {/* Help */}
        <TouchableOpacity
          style={styles.helpCard}
          activeOpacity={0.8}
          onPress={() =>
            showAlert(
              'Need help?',
              'Please contact customer support if you have questions about your order.',
            )
          }
        >
          <View style={styles.helpIcon}>
            <Feather name="headphones" size={21} color="#3563E9" />
          </View>

          <View style={styles.helpContent}>
            <Text style={styles.helpTitle}>Need help?</Text>
            <Text style={styles.helpDescription}>
              Contact customer support about your order.
            </Text>
          </View>

          <Feather name="chevron-right" size={20} color="#7C8597" />
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.85}
        >
          <Feather name="shopping-bag" size={18} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Continue Shopping</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleBackToConfirmation}
          activeOpacity={0.8}
        >
          <Feather name="arrow-left" size={16} color="#53627D" />
          <Text style={styles.secondaryButtonText}>
            Back to Order Confirmation
          </Text>
        </TouchableOpacity>
      </View>

      {/* Animated SweetAlert-style modal */}
      <Modal
        visible={alertVisible}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={closeAlert}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.alertCard,
              {
                opacity: alertOpacity,
                transform: [{ scale: alertScale }],
              },
            ]}
          >
            <View style={styles.alertIconCircle}>
              <Feather name="info" size={30} color="#3563E9" />
            </View>

            <Text style={styles.alertTitle}>{alertTitle}</Text>
            <Text style={styles.alertMessage}>{alertMessage}</Text>

            <Pressable style={styles.alertButton} onPress={closeAlert}>
              <Text style={styles.alertButtonText}>Okay</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default OrderTrackingScreen;
