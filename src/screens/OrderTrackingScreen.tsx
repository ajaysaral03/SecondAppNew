import React, { useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@react-native-vector-icons/feather';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from '../styles/OrderTrackingScreen';

type RootStackParamList = {
  OrderTracking: { orderId?: string; total?: number };
  Home: undefined;
  OrderSuccess: { orderId?: string; total?: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'OrderTracking'>;

type TrackingStep = {
  title: string;
  description: string;
  icon: string;
};

const steps: TrackingStep[] = [
  { title: 'Order Placed', description: 'We have received your order.', icon: 'shopping-bag' },
  { title: 'Order Confirmed', description: 'Your order has been confirmed.', icon: 'check-circle' },
  { title: 'Shipped', description: 'Your order is on its way.', icon: 'package' },
  { title: 'Out for Delivery', description: 'Your delivery partner is bringing your order.', icon: 'truck' },
  { title: 'Delivered', description: 'Your order has been delivered.', icon: 'home' },
];

const formatINR = (amount: number) =>
  `₹${Number(amount || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

const OrderTrackingScreen: React.FC<Props> = ({ navigation, route }) => {
  const orderId = route.params?.orderId ?? 'ORD-100001';
  const total = Number(route.params?.total ?? 0);

  // Demo UI: update this index when you connect real tracking/order status API.
  const currentStep = 1;

  const estimatedDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F9FF" />

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
        <View style={styles.deliveryCard}>
          <View style={styles.deliveryTopRow}>
            <View style={styles.deliveryIconCircle}>
              <Feather name="truck" size={25} color="#3563E9" />
            </View>
            <View style={styles.deliveryTextContainer}>
              <Text style={styles.deliveryLabel}>ESTIMATED DELIVERY</Text>
              <Text style={styles.deliveryDate}>{estimatedDate}</Text>
              <Text style={styles.deliverySubtext}>Expected in 2–4 days</Text>
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
              <Text selectable style={styles.orderId}>{orderId}</Text>
            </View>
            <View style={styles.amountContainer}>
              <Text style={styles.smallLabel}>Order Total</Text>
              <Text style={styles.amount}>{formatINR(total)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Order Status</Text>
          <Text style={styles.sectionSubtitle}>
            Follow your order as it moves towards delivery.
          </Text>

          <View style={styles.timeline}>
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
                      <Feather
                        name={completed ? 'check' : (step.icon as any)}
                        size={17}
                        color={pending ? '#A6AFBF' : '#FFFFFF'}
                      />
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

                  <View style={[styles.stepContent, index < steps.length - 1 && styles.stepContentSpaced]}>
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
                          <Text style={styles.currentBadgeText}>CURRENT</Text>
                        </View>
                      )}
                      {completed && (
                        <Feather name="check-circle" size={16} color="#20B26B" />
                      )}
                    </View>
                    <Text style={styles.stepDescription}>{step.description}</Text>
                    {active && (
                      <Text style={styles.activeHint}>Your order is currently at this stage.</Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.helpCard}>
          <View style={styles.helpIcon}>
            <Feather name="headphones" size={21} color="#3563E9" />
          </View>
          <View style={styles.helpContent}>
            <Text style={styles.helpTitle}>Need help?</Text>
            <Text style={styles.helpDescription}>
              Contact customer support if you have questions about your order.
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color="#7C8597" />
        </View>
      </ScrollView>

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
          onPress={() => navigation.navigate('OrderSuccess', { orderId, total })}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryButtonText}>Back to Order Confirmation</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OrderTrackingScreen;
