import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  Pressable 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
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
            <View style={[styles.stepperActiveLine, { backgroundColor: theme.primary, width: currentStep >= 3 ? '100%' : currentStep >= 2 ? '50%' : '0%' }]} />
        </View>

        <View style={styles.stepperRow}>
            <View style={styles.step}>
                <View style={[styles.stepIcon, currentStep >= 1 ? styles.stepIconActive : { backgroundColor: theme.surfaceContainerHighest }]}>
                {currentStep >= 1 ? (
                    <LinearGradient
                        colors={[theme.primary, theme.primaryContainer || '#0eb77b']}
                        style={StyleSheet.absoluteFill}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    />
                ) : null}
                <MaterialIcons name="location-on" size={20} color={currentStep >= 1 ? theme.background : theme.icon} />
                </View>
                <Text style={[styles.stepLabel, { color: currentStep >= 1 ? theme.primary : theme.icon, opacity: currentStep >= 1 ? 1 : 0.6 }]}>Address</Text>
            </View>

            <View style={styles.step}>
                <View style={[styles.stepIcon, currentStep >= 2 ? styles.stepIconActive : { backgroundColor: theme.surfaceContainerHighest }]}>
                {currentStep >= 2 ? (
                    <LinearGradient
                        colors={[theme.primary, theme.primaryContainer || '#0eb77b']}
                        style={StyleSheet.absoluteFill}
                    />
                ) : null}
                <MaterialIcons name="payments" size={20} color={currentStep >= 2 ? theme.background : theme.icon} />
                </View>
                <Text style={[styles.stepLabel, { color: currentStep >= 2 ? theme.primary : theme.icon, opacity: currentStep >= 2 ? 1 : 0.6 }]}>Payment</Text>
            </View>

            <View style={styles.step}>
                <View style={[styles.stepIcon, currentStep >= 3 ? styles.stepIconActive : { backgroundColor: theme.surfaceContainerHighest }]}>
                {currentStep >= 3 ? (
                    <LinearGradient
                        colors={[theme.primary, theme.primaryContainer || '#0eb77b']}
                        style={StyleSheet.absoluteFill}
                    />
                ) : null}
                <MaterialIcons name="verified" size={20} color={currentStep >= 3 ? theme.background : theme.icon} />
                </View>
                <Text style={[styles.stepLabel, { color: currentStep >= 3 ? theme.primary : theme.icon, opacity: currentStep >= 3 ? 1 : 0.6 }]}>Review</Text>
            </View>
        </View>
    </View>
  );
};

const AddressCard = ({ 
    type, 
    name, 
    address, 
    city, 
    phone, 
    active, 
    onPress 
}: { 
    type: 'Home' | 'Work'; 
    name: string; 
    address: string; 
    city: string; 
    phone: string; 
    active: boolean; 
    onPress: () => void 
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];

  return (
    <Pressable 
        onPress={onPress}
        style={[
            styles.addressCard, 
            { backgroundColor: theme.surfaceLow },
            active && { borderColor: theme.primary + '33', borderWidth: 1 }
        ]}
    >
      <View style={styles.addressHeader}>
        <View style={styles.addressType}>
          <View style={[styles.typeIcon, { backgroundColor: theme.primary + '15' }]}>
            <MaterialIcons name={type === 'Home' ? 'home' : 'business'} size={20} color={theme.primary} />
          </View>
          <View>
            <Text style={[styles.addressTypeText, { color: theme.text }]}>{type}</Text>
            {active && <Text style={[styles.defaultBadge, { color: theme.primary }]}>DEFAULT ADDRESS</Text>}
          </View>
        </View>
        <View style={[styles.checkCircle, { backgroundColor: active ? theme.primary : theme.surfaceContainerHighest }]}>
          {active && <MaterialIcons name="check" size={14} color={theme.background} />}
        </View>
      </View>
      <View style={styles.addressDetails}>
        <Text style={[styles.addressName, { color: theme.text }]}>{name}</Text>
        <Text style={[styles.addressLine, { color: theme.icon }]}>{address}</Text>
        <Text style={[styles.addressLine, { color: theme.icon }]}>{city}</Text>
        <Text style={[styles.addressPhone, { color: theme.icon }]}>{phone}</Text>
      </View>
    </Pressable>
  );
};

export default function CheckoutAddressScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];
  
  const [selectedAddress, setSelectedAddress] = useState('Home');
  const [deliveryMethod, setDeliveryMethod] = useState('Express');

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
                <Text style={[styles.headerTitle, { color: theme.primary }]}>Checkout</Text>
            </View>
            <Text style={[styles.stepText, { color: theme.icon }]}>Step 1 of 3</Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProgressStepper currentStep={1} />

        <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Shipping Address</Text>
            <TouchableOpacity style={styles.addNewBtn}>
                <MaterialIcons name="add" size={18} color={theme.primary} />
                <Text style={[styles.addNewText, { color: theme.primary }]}>Add New</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.addressList}>
          <AddressCard 
            type="Home"
            active={selectedAddress === 'Home'}
            onPress={() => setSelectedAddress('Home')}
            name="Alex Stratos"
            address="248 Precision Way, Tech District"
            city="San Francisco, CA 94105"
            phone="+1 (555) 012-3456"
          />
          <AddressCard 
            type="Work"
            active={selectedAddress === 'Work'}
            onPress={() => setSelectedAddress('Work')}
            name="Alex Stratos"
            address="Infinite Loop 1, Emerald Plaza"
            city="Cupertino, CA 95014"
            phone="+1 (555) 987-6543"
          />
        </View>

        <Text style={[styles.subSectionTitle, { color: theme.text }]}>Delivery Method</Text>
        <View style={styles.deliveryGrid}>
            <TouchableOpacity 
                onPress={() => setDeliveryMethod('Express')}
                style={[
                    styles.deliveryCard, 
                    { backgroundColor: theme.surfaceLow },
                    deliveryMethod === 'Express' && { borderColor: theme.primary + '33', borderWidth: 1 }
                ]}
            >
                <MaterialIcons name="bolt" size={24} color={deliveryMethod === 'Express' ? theme.primary : theme.icon} />
                <View>
                    <Text style={[styles.deliveryName, { color: theme.text }]}>Express</Text>
                    <Text style={[styles.deliveryTime, { color: theme.icon }]}>1-2 Business Days</Text>
                </View>
                <Text style={[styles.deliveryPrice, { color: deliveryMethod === 'Express' ? theme.primary : theme.text }]}>$14.99</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                onPress={() => setDeliveryMethod('Standard')}
                style={[
                    styles.deliveryCard, 
                    { backgroundColor: theme.surfaceLow },
                    deliveryMethod === 'Standard' && { borderColor: theme.primary + '33', borderWidth: 1 }
                ]}
            >
                <MaterialIcons name="local-shipping" size={24} color={deliveryMethod === 'Standard' ? theme.primary : theme.icon} />
                <View>
                    <Text style={[styles.deliveryName, { color: theme.text }]}>Standard</Text>
                    <Text style={[styles.deliveryTime, { color: theme.icon }]}>5-7 Business Days</Text>
                </View>
                <Text style={[styles.deliveryPrice, { color: deliveryMethod === 'Standard' ? theme.primary : theme.text }]}>FREE</Text>
            </TouchableOpacity>
        </View>
        
        <View style={{ height: 140 }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <BlurView intensity={40} style={styles.bottomBar} tint="dark">
        <SafeAreaView edges={['bottom']} style={styles.bottomContent}>
            <View style={styles.summaryInfo}>
                <View>
                    <Text style={[styles.totalLabel, { color: theme.icon }]}>TOTAL AMOUNT</Text>
                    <Text style={[styles.totalValue, { color: theme.text }]}>$1,249.00</Text>
                </View>
                <TouchableOpacity style={styles.viewDetailsBtn}>
                    <Text style={[styles.viewDetailsText, { color: theme.primary }]}>View Details</Text>
                    <MaterialIcons name="expand-less" size={18} color={theme.primary} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity 
                style={styles.continueBtn} 
                onPress={() => router.push('/checkout/payment')}
                activeOpacity={0.9}
            >
                <LinearGradient
                    colors={[theme.primary, theme.primaryContainer || '#0eb77b']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.continueGradient}
                >
                    <Text style={styles.continueText}>Continue to Payment</Text>
                </LinearGradient>
            </TouchableOpacity>
        </SafeAreaView>
      </BlurView>
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
  stepText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  scrollContent: {
    paddingTop: 120,
    paddingHorizontal: 24,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 24,
    letterSpacing: -0.5,
  },
  addNewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addNewText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
  },
  addressList: {
    gap: 16,
    marginBottom: 40,
  },
  addressCard: {
    padding: 24,
    borderRadius: 20,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  addressType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressTypeText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
  },
  defaultBadge: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 9,
    letterSpacing: 1,
    marginTop: 2,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressDetails: {
    gap: 4,
  },
  addressName: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    marginBottom: 4,
  },
  addressLine: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
  },
  addressPhone: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 11,
    marginTop: 8,
  },
  subSectionTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 20,
    marginBottom: 24,
  },
  deliveryGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  deliveryCard: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    gap: 12,
  },
  deliveryName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
  },
  deliveryTime: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  deliveryPrice: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 18,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  bottomContent: {
    width: '100%',
  },
  summaryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  totalLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    letterSpacing: 1.5,
  },
  totalValue: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 24,
    letterSpacing: -0.5,
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewDetailsText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
  },
  continueBtn: {
    height: 60,
    borderRadius: 16,
    overflow: 'hidden',
  },
  continueGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    color: '#0e0e0e',
  }
});
