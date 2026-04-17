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

export default function OrderSuccessScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];

  const orderItems = [
    {
      id: 1,
      name: 'Volt Runner X2',
      details: 'Neon Green • Size 42',
      price: '$189.00',
      qty: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDFZ7zkLET9vB8eKdKCo8fAad8bEj5VbdvEtlOMaUbr6OVozUYVVzkUUihivJmGs150X71YV3CnD3HhCB9b4Z-LZ3GBFpTDlGzLpBCFkFBDAdVaQkg9yqvvvhp9P5RU4qBTQfZbPs9tAxW0neHF6g6mkOChn9Qr3crdm9WIdq4rQdNbCdsmogXnXmltun9jNOWdh_USZoIkqhn_zRPjNEkFvoEVFBAKAka9mZ8zFSwkve8ozpn174sdPfruFaSsoDmuLDTVfJczw'
    },
    {
      id: 2,
      name: 'Nocturnal ANC V1',
      details: 'Obsidian • Qty: 1',
      price: '$299.00',
      qty: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1_CfIoGbDhNnNULjbbohW3bGtu50Y4RpluRGzVEcuL8rA_Tk-PFMRT2m4XUFHkUFz6XXdydAtchuo3DPPD8s7l8hXWCHQuLuJjBwopqVfQG8ijZN5YZPTZNH-6gZPYgsXmQE1KHt-iJFRPJ41daS3omqBSNRzmzvy0Wh_kdpwWDzurpvs7ryfoWFudtk8-a9dRPxsPFHrjrgIRj60tAr7uMQfZAv9Fw15oCCVOwvlaVEfGAiHAv59_bXNPOI2VspenMIpD5Odcg'
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
            <TouchableOpacity onPress={() => router.replace('/shop')} style={styles.headerIconBtn}>
                <MaterialIcons name="arrow-back" size={24} color={theme.primary} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.primary }]}>Order Complete</Text>
            <View style={{ width: 32 }} />
          </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Spotlight Success Hero */}
        <View style={styles.heroSection}>
            <View style={styles.glowContainer}>
                <LinearGradient
                    colors={[theme.primary + '33', 'transparent']}
                    style={styles.heroGlow}
                />
                <View style={[styles.checkCircle, { backgroundColor: theme.surfaceContainerHighest, borderColor: theme.primary + '4D' }]}>
                    <MaterialIcons name="check-circle" size={64} color={theme.primary} />
                </View>
            </View>
            <Text style={[styles.heroTitle, { color: theme.text }]}>Order Confirmed</Text>
            <Text style={[styles.heroSubtitle, { color: theme.icon }]}>Thank you for your purchase!</Text>
        </View>

        {/* Info Bento Section */}
        <View style={styles.bentoContainer}>
            {/* Order Details Card */}
            <View style={[styles.bentoCard, { backgroundColor: theme.surfaceLow }]}>
                <View style={styles.orderHeader}>
                    <View>
                        <Text style={[styles.metaLabel, { color: theme.icon }]}>ORDER NUMBER</Text>
                        <Text style={[styles.orderNumber, { color: theme.primary }]}>#EM-98421</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: theme.primary + '1A' }]}>
                        <Text style={[styles.statusText, { color: theme.primary }]}>Processing</Text>
                    </View>
                </View>
                
                <View style={[styles.deliveryBox, { backgroundColor: theme.surfaceContainerHighest }]}>
                    <MaterialIcons name="local-shipping" size={24} color={theme.primaryDim} />
                    <View>
                        <Text style={[styles.deliveryLabel, { color: theme.icon }]}>Estimated Delivery</Text>
                        <Text style={[styles.deliveryDate, { color: theme.text }]}>Friday, Oct 24th - Monday, Oct 27th</Text>
                    </View>
                </View>
            </View>

            {/* Order Summary Card */}
            <View style={[styles.bentoCard, { backgroundColor: theme.surfaceLow }]}>
                <Text style={[styles.metaLabel, { color: theme.icon, marginBottom: 16 }]}>ORDER SUMMARY</Text>
                
                <View style={styles.itemList}>
                    {orderItems.map((item) => (
                        <View key={item.id} style={styles.orderItem}>
                            <Image source={{ uri: item.image }} style={styles.itemThumb} contentFit="cover" />
                            <View style={styles.itemInfo}>
                                <Text style={[styles.itemName, { color: theme.text }]}>{item.name}</Text>
                                <Text style={[styles.itemMeta, { color: theme.icon }]}>{item.details}</Text>
                            </View>
                            <Text style={[styles.itemPrice, { color: theme.primary }]}>{item.price}</Text>
                        </View>
                    ))}
                </View>

                <View style={[styles.divider, { backgroundColor: theme.outline + '22' }]} />

                <View style={styles.totalsSection}>
                    <View style={styles.totalRow}>
                        <Text style={[styles.summaryLabel, { color: theme.icon }]}>Subtotal</Text>
                        <Text style={[styles.summaryValue, { color: theme.text }]}>$488.00</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={[styles.summaryLabel, { color: theme.icon }]}>Shipping</Text>
                        <Text style={[styles.summaryValue, { color: theme.secondary }]}>Free</Text>
                    </View>
                    <View style={[styles.totalRow, { marginTop: 8 }]}>
                        <Text style={[styles.totalLabel, { color: theme.text }]}>Total</Text>
                        <Text style={[styles.totalAmount, { color: theme.primary }]}>$488.00</Text>
                    </View>
                </View>
            </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
            <TouchableOpacity 
                style={styles.primaryBtn}
                onPress={() => router.push('/orders/track')}
                activeOpacity={0.9}
            >
                <LinearGradient
                    colors={[theme.primary, theme.primaryContainer || '#0eb77b']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.btnGradient}
                >
                    <Text style={styles.primaryBtnText}>Track Order</Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.secondaryBtn, { borderColor: theme.outline + '4D' }]}
                onPress={() => router.replace('/shop')}
            >
                <Text style={[styles.secondaryBtnText, { color: theme.text }]}>Continue Shopping</Text>
            </TouchableOpacity>
        </View>

        <Text style={[styles.supportText, { color: theme.icon }]}>
            Having issues with your order? <Text style={{ color: theme.primary }}>Contact our 24/7 support team</Text>.
        </Text>

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
  headerIconBtn: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    letterSpacing: -0.5,
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -width / 4 }], // Approximate center
    textAlign: 'center',
    width: width / 2,
  },
  scrollContent: {
    paddingTop: 100,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  glowContainer: {
    position: 'relative',
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  heroGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    transform: [{ scale: 1.5 }],
  },
  checkCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  heroTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 36,
    letterSpacing: -1,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
  bentoContainer: {
    gap: 16,
    marginBottom: 40,
  },
  bentoCard: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  metaLabel: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 10,
    letterSpacing: 1.5,
  },
  orderNumber: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 20,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
  },
  statusText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11,
  },
  deliveryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 16,
  },
  deliveryLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    marginBottom: 2,
  },
  deliveryDate: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
  },
  itemList: {
    gap: 20,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  itemThumb: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    marginBottom: 2,
  },
  itemMeta: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  itemPrice: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginVertical: 24,
  },
  totalsSection: {
    gap: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
  summaryValue: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
  },
  totalLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
  },
  totalAmount: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 24,
    letterSpacing: -0.5,
  },
  actionsSection: {
    gap: 16,
    marginBottom: 32,
  },
  primaryBtn: {
    height: 60,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#73ffbc',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  btnGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 16,
    color: '#0e0e0e',
    letterSpacing: 0.5,
  },
  secondaryBtn: {
    height: 60,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
  },
  supportText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 24,
  }
});
