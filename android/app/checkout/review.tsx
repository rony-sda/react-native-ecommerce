import React from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// --- Custom Components ---

const ProgressStepper = ({ currentStep }: { currentStep: number }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];
  
  return (
    <View style={styles.stepperContainer}>
        <View style={styles.lineContainer}>
            <View style={[styles.stepperLine, { backgroundColor: theme.surfaceContainerHighest }]} />
            <View style={[styles.stepperActiveLine, { backgroundColor: theme.primary, width: '100%' }]} />
        </View>

        <View style={styles.stepperRow}>
            <View style={styles.step}>
                <View style={[styles.stepIcon, currentStep >= 1 ? styles.stepIconActive : { backgroundColor: theme.surfaceContainerHighest }]}>
                <LinearGradient
                    colors={[theme.primary, theme.primaryContainer || '#0eb77b']}
                    style={StyleSheet.absoluteFill}
                />
                <MaterialIcons name="check" size={20} color={theme.background} />
                </View>
                <Text style={[styles.stepLabel, { color: theme.primary }]}>Address</Text>
            </View>

            <View style={styles.step}>
                <View style={[styles.stepIcon, currentStep >= 2 ? styles.stepIconActive : { backgroundColor: theme.surfaceContainerHighest }]}>
                <LinearGradient
                    colors={[theme.primary, theme.primaryContainer || '#0eb77b']}
                    style={StyleSheet.absoluteFill}
                />
                <MaterialIcons name="check" size={20} color={theme.background} />
                </View>
                <Text style={[styles.stepLabel, { color: theme.primary }]}>Payment</Text>
            </View>

            <View style={styles.step}>
                <View style={[styles.stepIcon, currentStep >= 3 ? styles.stepIconActive : { backgroundColor: theme.surfaceContainerHighest }]}>
                    <LinearGradient
                        colors={[theme.primary, theme.primaryContainer || '#0eb77b']}
                        style={StyleSheet.absoluteFill}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    />
                <MaterialIcons name="verified" size={20} color={theme.background} />
                </View>
                <Text style={[styles.stepLabel, { color: theme.primary }]}>Review</Text>
            </View>
        </View>
    </View>
  );
};

export default function CheckoutReviewScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];
  
  const items = [
    {
      id: 1,
      name: 'Zenith Runner Gen-2',
      details: 'Emerald / Carbon • Size 10',
      price: '$185.00',
      qty: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIizH8mI91W3iunEbuJK9Os7-43tkTc9CSXxqLaX2AF_OTvB-ap_JK9qce8NjgObXnx9x_7tAoLY_JghM1BXNq-cAixZpjT53TwnUBylnQlSMcCA58J-WiRzwNuhWgeCrytzKpVJ1Pckr_NY0kLGap5ck_pPNav_xrpaD2tpCMge1rJdCdWN8QmPq0HZX_y_0l-NZmqCieDxEQShSoHCxa3M2XblsctXiFZ8903S-8YPONE6ZDG5DsPGlCkaGXMiOJ_NEVaw4yGg'
    },
    {
      id: 2,
      name: 'Prism Smart Watch',
      details: 'Lunar Silver • 44mm',
      price: '$349.00',
      qty: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJp3TKWoSfLTDmlR1ML-q9b3pB_gG9H9LAhE6hF_WDC20_F5MMHnu1myU4CKvgGQ_77mzL3UuubsVMxa3ZjtTGnQLJfAr17hCgQ9SfVVGHk-JZARqaTX4DmRHFS98eDqT6lUaKJT8kiidsD_iKTRf_cwoWpJnEpr_DZRt0MPf3Sy5QPZ38f3tLS7wbZ06oLsiCOz9DlkSou-5ct8rT_e6Z8U3nEpPxG6-Ke-UH032H1GTSvfluV04ay6rEWURc8zaIlV36pXjSMg'
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.appBar}>
        <BlurView intensity={20} style={StyleSheet.absoluteFill} tint="dark" />
        <SafeAreaView edges={['top']} style={styles.safeAreaHeader}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerIconBtn}>
                    <MaterialIcons name="arrow-back" size={24} color={theme.primary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Checkout</Text>
            </View>
            <Text style={[styles.stepText, { color: theme.icon }]}>Step 3 of 3</Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProgressStepper currentStep={3} />

        {/* Selection Scroller */}
        <View style={styles.selectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Your Selection</Text>
        </View>
        
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.itemScroller}
            snapToInterval={280 + 16}
            decelerationRate="fast"
        >
          {items.map((item, index) => (
            <View key={item.id} style={[styles.itemCard, { backgroundColor: theme.surfaceLow }]}>
              <View style={styles.itemImageWrapper}>
                <Image source={{ uri: item.image }} style={styles.itemImage} contentFit="cover" />
              </View>
              <Text style={[styles.itemName, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
              <Text style={[styles.itemDetails, { color: theme.icon }]}>{item.details}</Text>
              <View style={styles.itemBottom}>
                <Text style={[styles.itemPrice, { color: theme.primary }]}>{item.price}</Text>
                <Text style={[styles.itemQty, { color: theme.icon }]}>Qty: {item.qty}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Info Bento Grid */}
        <View style={styles.bentoGrid}>
            {/* Address */}
            <View style={[styles.bentoCard, { backgroundColor: theme.surfaceLow }]}>
                <View style={styles.bentoHeader}>
                    <MaterialIcons name="local-shipping" size={20} color={theme.primaryDim} />
                    <TouchableOpacity><Text style={[styles.editText, { color: theme.primary }]}>EDIT</Text></TouchableOpacity>
                </View>
                <Text style={[styles.bentoLabel, { color: theme.icon }]}>SHIPPING TO</Text>
                <Text style={[styles.bentoName, { color: theme.text }]}>Julian Sterling</Text>
                <Text style={[styles.bentoText, { color: theme.icon }]}>
                    1204 Obsidian Heights Blvd{"\n"}Suite 405, Dark District{"\n"}San Francisco, CA 94103
                </Text>
            </View>

            {/* Payment */}
            <View style={[styles.bentoCard, { backgroundColor: theme.surfaceLow }]}>
                <View style={styles.bentoHeader}>
                    <MaterialIcons name="payments" size={20} color={theme.primaryDim} />
                    <TouchableOpacity><Text style={[styles.editText, { color: theme.primary }]}>EDIT</Text></TouchableOpacity>
                </View>
                <Text style={[styles.bentoLabel, { color: theme.icon }]}>PAYMENT</Text>
                <View style={styles.paymentMethod}>
                    <View style={[styles.visaBadge, { backgroundColor: theme.surfaceContainerHighest }]}><Text style={styles.visaText}>VISA</Text></View>
                    <Text style={[styles.bentoName, { color: theme.text }]}>•••• 4821</Text>
                </View>
                <Text style={[styles.deliveryEst, { color: theme.icon }]}>Estimated delivery: Oct 24 - 26</Text>
            </View>
        </View>

        {/* Order Summary */}
        <View style={[styles.orderSummary, { backgroundColor: theme.surfaceLow + '80' }]}>
            <Text style={[styles.summaryTitle, { color: theme.text }]}>Order Summary</Text>
            <View style={styles.summaryList}>
                <View style={styles.summaryItem}>
                    <Text style={[styles.summaryItemLabel, { color: theme.icon }]}>Subtotal</Text>
                    <Text style={[styles.summaryItemValue, { color: theme.text }]}>$534.00</Text>
                </View>
                <View style={styles.summaryItem}>
                    <Text style={[styles.summaryItemLabel, { color: theme.icon }]}>Shipping</Text>
                    <Text style={[styles.summaryItemValue, { color: theme.primary }]}>Free</Text>
                </View>
                <View style={styles.summaryItem}>
                    <Text style={[styles.summaryItemLabel, { color: theme.icon }]}>Estimated Tax</Text>
                    <Text style={[styles.summaryItemValue, { color: theme.text }]}>$42.72</Text>
                </View>
                
                <View style={[styles.divider, { backgroundColor: theme.outline + '22' }]} />
                
                <View style={styles.totalRow}>
                    <Text style={[styles.totalLabel, { color: theme.text }]}>Total</Text>
                    <View style={styles.totalValueWrapper}>
                        <Text style={[styles.totalValue, { color: theme.primary }]}>$576.72</Text>
                        <Text style={[styles.taxSmall, { color: theme.icon }]}>USD INCL. TAX</Text>
                    </View>
                </View>
            </View>
        </View>

        {/* Place Order Button */}
        <View style={styles.actionSection}>
            <TouchableOpacity 
                style={styles.placeOrderBtn}
                onPress={() => router.push('/checkout/success')}
                activeOpacity={0.9}
            >
                <LinearGradient
                    colors={[theme.primary, theme.primaryContainer || '#0eb77b']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.btnGradient}
                >
                    <Text style={styles.btnText}>Place Order</Text>
                    <MaterialIcons name="arrow-forward" size={24} color={theme.background} />
                </LinearGradient>
            </TouchableOpacity>
            <Text style={[styles.termsText, { color: theme.icon }]}>
                By placing your order, you agree to our <Text style={{ color: theme.primary }}>Terms of Service</Text> and <Text style={{ color: theme.primary }}>Privacy Policy</Text>.
            </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 100,
  },
  safeAreaHeader: {
    width: '100%',
  },
  headerContent: {
    height: 64,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerIconBtn: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 20,
    letterSpacing: -0.5,
  },
  scrollContent: {
    paddingTop: 110,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  stepperContainer: {
    marginBottom: 48,
    paddingHorizontal: 12,
    position: 'relative',
  },
  lineContainer: {
    position: 'absolute',
    top: 20,
    left: 32, // Offset to center of first icon (icon is 40px, padding is 12)
    right: 32, // Offset to center of last icon
    height: 1,
    zIndex: 0,
  },
  stepperLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
  },
  stepperActiveLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 1,
  },
  stepperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 5,
  },
  step: {
    alignItems: 'center',
    gap: 12,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  stepIconActive: {
    shadowColor: 'rgba(115, 255, 188, 0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 4,
  },
  stepLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 24,
    letterSpacing: -0.5,
    marginBottom: 24,
  },
  itemScroller: {
    gap: 16,
    paddingRight: 24,
    marginBottom: 40,
  },
  itemCard: {
    width: 280,
    padding: 16,
    borderRadius: 20,
  },
  itemImageWrapper: {
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.03)',
    marginBottom: 16,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  itemDetails: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    marginBottom: 12,
  },
  itemBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 18,
  },
  itemQty: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
  },
  bentoGrid: {
    gap: 16,
    marginBottom: 40,
  },
  bentoCard: {
    padding: 24,
    borderRadius: 20,
  },
  bentoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  editText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 10,
    letterSpacing: 1.5,
  },
  bentoLabel: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  bentoName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  bentoText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  visaBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  visaText: {
    fontSize: 8,
    fontFamily: 'Inter_800ExtraBold',
    color: '#ffffff',
  },
  deliveryEst: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 16,
  },
  orderSummary: {
    padding: 24,
    borderRadius: 24,
  },
  summaryTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 20,
    marginBottom: 24,
  },
  summaryList: {
    gap: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryItemLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
  summaryItemValue: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  totalLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
  },
  totalValueWrapper: {
    alignItems: 'flex-end',
  },
  totalValue: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 32,
    letterSpacing: -1,
  },
  taxSmall: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 9,
    letterSpacing: 1,
    marginTop: 4,
  },
  actionSection: {
    marginTop: 48,
    gap: 24,
  },
  placeOrderBtn: {
    height: 64,
    borderRadius: 20,
    overflow: 'hidden',
  },
   stepText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  btnGradient: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  btnText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 18,
    color: '#0e0e0e',
  },
  termsText: {
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
    fontSize: 10,
    lineHeight: 16,
    paddingHorizontal: 20,
  }
});
