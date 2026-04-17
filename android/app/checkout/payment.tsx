import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  TextInput,
  Animated,
  Pressable,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

// --- Custom Components ---

const ProgressStepper = ({ currentStep }: { currentStep: number }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];
  
  return (
    <View style={styles.stepperContainer}>
        <View style={styles.lineContainer}>
            <View style={[styles.stepperLine, { backgroundColor: theme.surfaceContainerHighest }]} />
            <View style={[styles.stepperActiveLine, { backgroundColor: theme.primary, width: currentStep >= 3 ? '100%' : currentStep >= 2 ? '50%' : '0%' }]} />
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
                {currentStep >= 2 ? (
                    <LinearGradient
                        colors={[theme.primary, theme.primaryContainer || '#0eb77b']}
                        style={StyleSheet.absoluteFill}
                    />
                ) : null}
                <MaterialIcons name={currentStep > 2 ? "check" : "payments"} size={20} color={currentStep >= 2 ? theme.background : theme.icon} />
                </View>
                <Text style={[styles.stepLabel, { color: currentStep >= 2 ? theme.primary : theme.icon, opacity: currentStep >= 2 ? 1 : 0.6 }]}>Payment</Text>
            </View>

            <View style={styles.step}>
                <View style={[styles.stepIcon, currentStep >= 3 ? styles.stepIconActive : { backgroundColor: theme.surfaceContainerHighest }]}>
                <MaterialIcons name="verified" size={20} color={theme.icon} />
                </View>
                <Text style={[styles.stepLabel, { color: theme.icon, opacity: 0.6 }]}>Review</Text>
            </View>
        </View>
    </View>
  );
};

export default function CheckoutPaymentScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];
  
  const [selectedMethod, setSelectedMethod] = useState('Card');
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSelectorOpen) {
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, friction: 8, tension: 40 }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: height, duration: 300, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 0, duration: 250, useNativeDriver: true })
      ]).start();
    }
  }, [isSelectorOpen]);

  const paymentMethods = [
    { id: 'Card', label: 'Credit / Debit Card', icon: 'credit-card', sub: 'Visa, Mastercard, AMEX' },
    { id: 'Apple', label: 'Apple Pay', icon: 'apple', sub: 'Fast, secure checkout' },
    { id: 'PayPal', label: 'PayPal', icon: 'account-balance-wallet', sub: 'Pay with your balance' },
    { id: 'GPay', label: 'Google Pay', icon: 'payment', sub: 'Quick checkout with GPay' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.surface }}>
        <StatusBar style="light" />
        
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
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
                       <Text style={[styles.stepText, { color: theme.icon }]}>Step 2 of 3</Text>
                    </View>
                    </SafeAreaView>
                </View>

                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                   
                    <ProgressStepper currentStep={2} />

                    {/* Active Method Summary Card */}
                    <TouchableOpacity 
                        style={[styles.activeMethodCard, { backgroundColor: theme.surfaceLow, borderColor: theme.primary + '22' }]}
                        activeOpacity={0.8}
                        onPress={() => setIsSelectorOpen(true)}
                    >
                        <View style={styles.methodInfo}>
                            <View style={[styles.methodIconBox, { backgroundColor: theme.primary + '15' }]}>
                                <MaterialIcons 
                                    name={paymentMethods.find(m => m.id === selectedMethod)?.icon as any || 'credit-card'} 
                                    size={24} 
                                    color={theme.primary} 
                                />
                            </View>
                            <View>
                                <Text style={[styles.selectedMethodName, { color: theme.text }]}>
                                    {paymentMethods.find(m => m.id === selectedMethod)?.label}
                                </Text>
                                <Text style={[styles.selectedMethodSub, { color: theme.icon }]}>
                                    {paymentMethods.find(m => m.id === selectedMethod)?.sub}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.changeBadge, { backgroundColor: theme.surfaceContainerHighest }]}>
                            <Text style={[styles.changeText, { color: theme.primary }]}>CHANGE</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Card Form - Only shown if Card is selected */}
                    {selectedMethod === 'Card' && (
                        <View style={[styles.cardForm, { backgroundColor: theme.surfaceHigh, borderColor: theme.primary + '22' }]}>
                            <View style={styles.cardFormHeader}>
                                <View style={styles.cardTitleRow}>
                                    <MaterialIcons name="credit-card" size={22} color={theme.primary} />
                                    <Text style={[styles.cardTitle, { color: theme.text }]}>Card Details</Text>
                                </View>
                                <View style={styles.cardIcons}>
                                    <View style={[styles.miniCard, { backgroundColor: theme.surfaceContainerHighest }]}><Text style={styles.miniCardText}>VISA</Text></View>
                                    <View style={[styles.miniCard, { backgroundColor: theme.surfaceContainerHighest }]}><Text style={styles.miniCardText}>MC</Text></View>
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={[styles.inputLabel, { color: theme.icon }]}>CARDHOLDER NAME</Text>
                                <TextInput 
                                    style={[styles.input, { backgroundColor: theme.surfaceContainerHighest, color: theme.text }]}
                                    placeholder="Johnathan Doe"
                                    placeholderTextColor={theme.icon + '66'}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={[styles.inputLabel, { color: theme.icon }]}>CARD NUMBER</Text>
                                <View style={styles.cardInputWrapper}>
                                    <TextInput 
                                        style={[styles.input, { backgroundColor: theme.surfaceContainerHighest, color: theme.text }]}
                                        placeholder="0000 0000 0000 0000"
                                        placeholderTextColor={theme.icon + '66'}
                                        keyboardType="numeric"
                                    />
                                    <MaterialIcons name="lock" size={16} color={theme.icon + '44'} style={styles.lockIcon} />
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={[styles.inputGroup, { flex: 1 }]}>
                                    <Text style={[styles.inputLabel, { color: theme.icon }]}>EXPIRY DATE</Text>
                                    <TextInput 
                                        style={[styles.input, { backgroundColor: theme.surfaceContainerHighest, color: theme.text }]}
                                        placeholder="MM / YY"
                                        placeholderTextColor={theme.icon + '66'}
                                    />
                                </View>
                                <View style={[styles.inputGroup, { flex: 1 }]}>
                                    <Text style={[styles.inputLabel, { color: theme.icon }]}>CVV</Text>
                                    <TextInput 
                                        style={[styles.input, { backgroundColor: theme.surfaceContainerHighest, color: theme.text }]}
                                        placeholder="•••"
                                        placeholderTextColor={theme.icon + '66'}
                                        keyboardType="numeric"
                                        secureTextEntry
                                    />
                                </View>
                            </View>
                        </View>
                    )}

                    <View style={{ height: 180 }} />
                </ScrollView>

                {/* Bottom Bar with Gradient-to-Solid fix */}
                <View style={styles.bottomBarWrapper}>
                    <LinearGradient
                        colors={['transparent', theme.surface]}
                        style={styles.bottomBarFade}
                    />
                    <BlurView intensity={Platform.OS === 'ios' ? 40 : 80} style={styles.bottomBar} tint="dark">
                        <SafeAreaView edges={['bottom']} style={styles.bottomContent}>
                            <View style={styles.summaryRow}>
                                <View>
                                    <Text style={[styles.totalLabel, { color: theme.icon }]}>TOTAL AMOUNT</Text>
                                    <Text style={[styles.totalValue, { color: theme.text }]}>$1,249.00</Text>
                                </View>
                                <View style={styles.taxInfo}>
                                    <Text style={[styles.taxLabel, { color: theme.icon }]}>Incl. Tax</Text>
                                    <Text style={[styles.taxValue, { color: theme.primary }]}>+$42.50</Text>
                                </View>
                            </View>
                            <TouchableOpacity 
                                style={styles.processBtn}
                                onPress={() => setIsSelectorOpen(true)}
                                activeOpacity={0.9}
                            >
                                <LinearGradient
                                    colors={[theme.primary, theme.primaryContainer || '#0eb77b']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.processGradient}
                                >
                                    <Text style={styles.processText}>CONTINUE TO REVIEW</Text>
                                    <MaterialIcons name="chevron-right" size={24} color={theme.background} />
                                </LinearGradient>
                            </TouchableOpacity>
                        </SafeAreaView>
                    </BlurView>
                </View>
            </View>
        </KeyboardAvoidingView>

        {/* Payment Selection Dropdown (Bottom Sheet) */}
        {isSelectorOpen && (
            <Animated.View 
                style={[
                    StyleSheet.absoluteFill, 
                    { backgroundColor: 'rgba(0,0,0,0.7)', opacity: opacityAnim, zIndex: 1000 }
                ]}
            >
                <Pressable style={{ flex: 1 }} onPress={() => setIsSelectorOpen(false)} />
            </Animated.View>
        )}
        
        <Animated.View 
            pointerEvents={isSelectorOpen ? 'auto' : 'none'}
            style={[
                styles.bottomSheet, 
                { 
                    backgroundColor: '#000000',
                    transform: [{ translateY: slideAnim }],
                    zIndex: 1001
                }
            ]}
        >
            <View style={styles.sheetHeader}>
                <View style={styles.sheetHandle} />
                <Text style={[styles.sheetTitle, { color: theme.text }]}>Payment Selection</Text>
            </View>
            
            <View style={styles.sheetContent}>
                {paymentMethods.map((method) => (
                    <TouchableOpacity 
                        key={method.id}
                        onPress={() => {
                            setSelectedMethod(method.id);
                        }}
                        style={[
                            styles.sheetItem, 
                            selectedMethod === method.id && { borderColor: theme.primary, borderWidth: 1 }
                        ]}
                        activeOpacity={0.7}
                    >
                        <View style={styles.sheetItemLeft}>
                            <View style={[styles.sheetIconBox, { backgroundColor: theme.primary + '15' }]}>
                                <MaterialIcons name={method.icon as any} size={22} color={theme.primary} />
                            </View>
                            <View>
                                <Text style={[styles.sheetMethodLabel, { color: theme.text }]}>{method.label}</Text>
                                <Text style={[styles.sheetMethodSub, { color: theme.icon }]}>{method.sub}</Text>
                            </View>
                        </View>
                        {selectedMethod === method.id && (
                            <MaterialIcons name="check-circle" size={24} color={theme.primary} />
                        )}
                    </TouchableOpacity>
                ))}

                <TouchableOpacity 
                    style={styles.confirmBtn}
                    onPress={() => {
                        setIsSelectorOpen(false);
                        router.push('/checkout/review');
                    }}
                >
                    <LinearGradient
                        colors={[theme.primary, theme.primaryContainer || '#0eb77b']}
                        style={styles.confirmGradient}
                    >
                        <Text style={styles.confirmText}>CONFIRM & CONTINUE</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <SafeAreaView edges={['bottom']} />
        </Animated.View>
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
  brandText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 18,
    color: '#3CCF91',
    fontStyle: 'italic',
  },
  scrollContent: {
    paddingTop: 110,
    paddingHorizontal: 24,
    paddingBottom: 100, // Increased for overlay safety
  },
  titleSection: {
    marginBottom: 32,
  },
  stepCounter: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  mainTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 28,
    letterSpacing: -0.5,
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
  activeMethodCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 32,
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  methodIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedMethodName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
  },
  selectedMethodSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  changeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  changeText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 10,
    letterSpacing: 1,
  },
  cardForm: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
  },
  cardFormHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
   stepText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
  },
  cardIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  miniCard: {
    width: 32,
    height: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  miniCardText: {
    fontSize: 8,
    fontFamily: 'Inter_700Bold',
    color: '#ffffff',
  },
  inputGroup: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  inputLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    letterSpacing: 1.2,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
  },
  cardInputWrapper: {
    position: 'relative',
  },
  lockIcon: {
    position: 'absolute',
    right: 16,
    top: 20,
  },
  bottomBarWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 100,
  },
  bottomBarFade: {
    height: 40,
    width: '100%',
  },
  bottomBar: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  bottomContent: {
    width: '100%',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 20,
  },
  totalLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    letterSpacing: 1.5,
  },
  totalValue: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 26,
  },
  taxInfo: {
    alignItems: 'flex-end',
  },
  taxLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 10,
  },
  taxValue: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
  },
  processBtn: {
    height: 64,
    borderRadius: 18,
    overflow: 'hidden',
  },
  processGradient: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  processText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 15,
    color: '#0e0e0e',
    letterSpacing: 1,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 20,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  sheetHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  sheetTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 20,
  },
  sheetContent: {
    gap: 12,
  },
  sheetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  sheetItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  sheetIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetMethodLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 15,
  },
  sheetMethodSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  confirmBtn: {
    marginTop: 24,
    height: 60,
    borderRadius: 16,
    overflow: 'hidden',
  },
  confirmGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 16,
    color: '#0e0e0e',
    letterSpacing: 1,
  }
});
