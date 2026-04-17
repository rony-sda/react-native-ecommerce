import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Platform, Dimensions, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface CartItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
}
 
interface UpsellItem {
  id: string;
  name: string;
  price: number;
  image: string;
}
 
// ─── Data ────────────────────────────────────────────────────────────────────
 
const INITIAL_CART: CartItem[] = [
  {
    id: '1',
    name: 'Precision Series V3',
    variant: 'Midnight Obsidian',
    price: 499,
    quantity: 1,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB0SYTIJ3OfRDFqIHJoaYXkjS7dsTjWHQOyPmY0H8fID0BPKVs4NSeNqyY7EK4cJPVS7Lf_2bos3pNzUWTOoO76Kei18N9dYPUtejkcbmkzLfLgTjF5WvlaJol9q9F2K1r8Wh-eJ5skPW39ucqSzKXbsNqrz0yQ5cYkj9izhYwOOZ3JD2G8A5mA2V6wPYD9KdLhwZjSEmZc81L4t5J09Vemv4sDjy5OqZur_49fhYSsKWWfAmCcpNUaQtQII0MluS_GATDvSI_dJg',
  },
  {
    id: '2',
    name: 'Studio Core Pro',
    variant: 'Matte Stealth',
    price: 299,
    quantity: 1,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAMDrbTYbPtZ2nhum0kx-vwJVTSAGDuRGuSiUDADZZHqluOV2Su6uHsET6sZk_ivmY8N1toiuSQUea82MOpZhT5BHRWVIp7hR2Uqlk5tLzeivjWlQh7Cmjmd24fpopBa_YlW7Sfd3pboPDThQxr0TyorC2QQjWPvHrTM6KpraV4_lcOLYTf8Let92gDI5d1rnNbyS0WiA43hufV1-4YiRQW_9ztWm6RlpoDt9mDdRHaIKEnLdPg2cdUdow7HXQUaRwj1B1D5Khf1A',
  },
];
 
const UPSELL_ITEMS: UpsellItem[] = [
  {
    id: 'u1',
    name: 'Pro Leather Sleeve',
    price: 45,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCZs1irUqaI1YvYJgvhX5t5jRTXhU_e5efxyEI6GrJJiEBHGMwkRuZGCmORu_gawyFxZFp9uHbKaNr1SWfghBf9fFhjdUCva9KECNQp5XoJSM7MHJ1pg3PGyQFaKaS190Fxvu4n8rcEv5Q1AReMksWpscCU3AsMLqzw_XCZvgSZ0VAwMPvYfxzsdx3i1LzJSoXgaYQSJ8tQLAYmEBUloWH7teHLfHhH4ogGad9L-c5ywTW9XYWSFPrPeDtQdEw5WbSGmNnSXfelzg',
  },
  {
    id: 'u2',
    name: 'Elite Care Kit',
    price: 29,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD9EEfOJ_U4wNM-9MudDDejJ3wjiSfzDyDmIXxTyb-Tko6IqzOyQVGFRvHxZRPQvfHp7XyfZZI6hDlc41-RmAotQ2RudP4TH3Yc1zuqOiAg8pjH1d633wdQ4TaqXBA1uVPYftwF5oGT6q3ebLpnHSobci8FMdwKfwIlbnPqEgHX64XHAM3ykOIGNjHJG5oL8j40BjMdKu9oaqYDy6uWKYSSFv3ZDwyoLBPnSQ3TmDgPSYJNKcwLvuQm_oCHg__pmCbjcSEmWbzQtw',
  },
  {
    id: 'u3',
    name: 'Tech Pouch 2.0',
    price: 65,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCmhi8SRXzssNwE0Zlji-71foXErGc5bbm68daW7ifI_worjMUCe_dRIboVDtj3kEbjlFJq3pxlBslskuXkiyBR5hONkxX8LJJtgdT1u1jvjO5ruWswODZvOUT-P7hyvrpR_E4usIL1AuO14I9LrcBQqKNIo_FWR_qX_zrpPgl7sRELIh1v6OuZU9UnWzDx3BeB1LQBhwVltDZ0m44KnBbE5RbEcgCajMRAWV1i6wgeS5tgwfgUPxbOsLgOvabTGMdSILJRAuPRYQ',
  },
];
 
// ─── Theme ───────────────────────────────────────────────────────────────────
 
const C = {
  background: '#0e0e0e',
  surface: '#131313',
  surfaceHigh: '#1a1a1a',
  surfaceHighest: '#262626',
  surfaceBright: '#2c2c2c',
  primary: '#73ffbc',
  primaryDim: '#63f0af',
  primaryContainer: '#0eb77b',
  onBackground: '#ffffff',
  onSurface: '#ffffff',
  onSurfaceVariant: '#adaaaa',
  outline: '#767575',
  outlineVariant: '#484847',
  error: '#ff716c',
  onPrimaryContainer: '#002918',
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const CartItemCard = ({
  item,
  onRemove,
  onIncrement,
  onDecrement,
}: {
  item: CartItem;
  onRemove: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}) => (
  <View style={styles.cartCard}>
    <Image source={{ uri: item.image }} style={styles.cartImage} />
    <View style={styles.cartInfo}>
      <View style={styles.cartRow}>
        <Text style={styles.cartName}>{item.name}</Text>
        <TouchableOpacity onPress={() => onRemove(item.id)} hitSlop={8}>
          <Text style={styles.deleteIcon}>🗑</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.cartVariant}>{item.variant}</Text>
      <View style={styles.cartPriceRow}>
        <Text style={styles.cartPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.qtyPill}>
          <TouchableOpacity onPress={() => onDecrement(item.id)} hitSlop={8}>
            <Text style={styles.qtyBtn}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => onIncrement(item.id)} hitSlop={8}>
            <Text style={styles.qtyBtn}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);
 
const UpsellCard = ({ item, first }: { item: UpsellItem; first: boolean }) => (
  <View style={[styles.upsellCard, !first && styles.upsellCardFaded]}>
    <Image source={{ uri: item.image }} style={styles.upsellImage} />
    <Text style={styles.upsellName}>{item.name}</Text>
    <Text style={styles.upsellPrice}>${item.price.toFixed(2)}</Text>
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function CartScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];
   const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
  const [promoCode, setPromoCode] = useState('');
 
  const removeItem = (id: string) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id));
 
  const increment = (id: string) =>
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
 
  const decrement = (id: string) =>
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i
      )
    );
 
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      {/* TopAppBar */}
      <View style={styles.appBar}>
        <BlurView intensity={80} style={StyleSheet.absoluteFill} tint={colorScheme === 'dark' ? 'dark' : 'light'} />
        <SafeAreaView edges={['top']} style={styles.safeAreaHeader}>
          <View style={styles.headerContent}>
            <Text style={[styles.headerTitle, { color: theme.primary }]}>YOUR CART</Text>
          <TouchableOpacity style={styles.iconButton}>
                        <MaterialIcons name="search" size={24} color={theme.primary} />
                      </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

       <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Cart Items ── */}
        <View style={styles.section}>
          {cartItems.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              onRemove={removeItem}
              onIncrement={increment}
              onDecrement={decrement}
            />
          ))}
        </View>
 
        {/* ── Promo Code ── */}
        <View style={styles.promoSection}>
          <Text style={styles.sectionLabel}>Promo Code</Text>
          <View style={styles.promoRow}>
            <TextInput
              style={styles.promoInput}
              placeholder="Enter code"
              placeholderTextColor={C.outline}
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity style={styles.applyBtn} activeOpacity={0.75}>
              <Text style={styles.applyBtnText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
 
        {/* ── Order Summary ── */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.shippingFree}>FREE</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <View style={styles.totalRight}>
              <Text style={styles.totalAmount}>${subtotal.toFixed(2)}</Text>
              <Text style={styles.vatNote}>VAT INCLUDED</Text>
            </View>
          </View>
        </View>
 
        {/* ── Checkout Button ── */}
        <LinearGradient
          colors={[C.primary, C.primaryContainer]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.checkoutGradient}
        >
          <TouchableOpacity 
            style={styles.checkoutBtn} 
            activeOpacity={0.85}
            onPress={() => router.push('/checkout/address')}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            <Text style={styles.checkoutArrow}>→</Text>
          </TouchableOpacity>
        </LinearGradient>
 
        {/* ── Upsell Scroller ── */}
        <View style={styles.upsellSection}>
          <Text style={[styles.sectionLabel, { textAlign: 'center' }]}>
            Complete the look
          </Text>
          <FlatList
            data={UPSELL_ITEMS}
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.upsellList}
            renderItem={({ item, index }) => (
              <UpsellCard item={item} first={index === 0} />
            )}
          />
        </View>
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
   scroll: { flex: 1 },
    section: { paddingHorizontal: 20, gap: 16 },
  safeAreaHeader: {
    width: '100%',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    letterSpacing: 2,
  },
  iconButton: {
    padding: 4,
  },
  scrollContent: {
    paddingTop: 120,
    paddingBottom: 220,
    paddingHorizontal: 16,
  },
  heroSection: {
    marginBottom: 40,
  },
  heroKicker: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11,
    letterSpacing: 2.2,
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 42,
    lineHeight: 46,
    letterSpacing: -1.5,
  },
  heroTitleHighlight: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 42,
    lineHeight: 46,
    letterSpacing: -1.5,
  },
  heroSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
    opacity: 0.8,
  },
  listContainer: {
    gap: 16,
    marginBottom: 32,
  },
  
  // Cart Card
  cartCard: {
    backgroundColor: C.surface,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  cartImage: {
    width: 88,
    height: 88,
    borderRadius: 12,
    backgroundColor: C.surfaceHighest,
  },
  cartInfo: { flex: 1 },
  cartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cartName: {
    fontSize: 15,
    fontWeight: '700',
    color: C.onSurface,
    flex: 1,
    marginRight: 8,
  },
  deleteIcon: { fontSize: 16 },
  cartVariant: {
    fontSize: 12,
    color: C.onSurfaceVariant,
    fontStyle: 'italic',
    marginTop: 3,
  },
  cartPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  cartPrice: {
    fontSize: 17,
    fontWeight: '800',
    color: C.primary,
  },
  qtyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: C.surfaceHighest,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 99,
  },
  qtyBtn: {
    fontSize: 16,
    color: C.onSurface,
    fontWeight: '600',
  },
  qtyText: {
    fontSize: 12,
    fontWeight: '700',
    color: C.onSurface,
    minWidth: 12,
    textAlign: 'center',
  },
 
  // Promo
  promoSection: { marginTop: 32, paddingHorizontal: 20 },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: C.onSurfaceVariant,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  promoRow: { flexDirection: 'row', gap: 10 },
  promoInput: {
    flex: 1,
    backgroundColor: C.surfaceHighest,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: C.onSurface,
  },
  applyBtn: {
    backgroundColor: C.surfaceHighest,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  applyBtnText: {
    color: C.primary,
    fontWeight: '700',
    fontSize: 13,
  },
 
  // Summary
  summaryCard: {
    marginTop: 28,
    marginHorizontal: 20,
    backgroundColor: C.surface,
    borderRadius: 16,
    padding: 20,
    gap: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: { fontSize: 13, color: C.onSurfaceVariant },
  summaryValue: { fontSize: 14, fontWeight: '500', color: C.onSurface },
  shippingFree: {
    fontSize: 10,
    fontWeight: '700',
    color: C.primary,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(72,72,71,0.3)',
    marginVertical: 4,
  },
  totalLabel: { fontSize: 18, fontWeight: '700', color: C.onSurface },
  totalRight: { alignItems: 'flex-end' },
  totalAmount: { fontSize: 26, fontWeight: '800', color: C.primary },
  vatNote: {
    fontSize: 9,
    color: C.onSurfaceVariant,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
 
  // Checkout
  checkoutGradient: {
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 16,
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  checkoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 18,
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: '800',
    color: C.onPrimaryContainer,
    letterSpacing: 0.2,
  },
  checkoutArrow: {
    fontSize: 18,
    fontWeight: '700',
    color: C.onPrimaryContainer,
  },
 
  // Upsell
  upsellSection: { marginTop: 40, paddingLeft: 20 },
  upsellList: { paddingRight: 20, gap: 16, paddingTop: 4 },
  upsellCard: { width: 160 },
  upsellCardFaded: { opacity: 0.45, transform: [{ scale: 0.92 }] },
  upsellImage: {
    width: 160,
    height: 160,
    borderRadius: 16,
    backgroundColor: C.surfaceHighest,
    marginBottom: 10,
  },
  upsellName: {
    fontSize: 12,
    fontWeight: '700',
    color: C.onSurface,
    textAlign: 'center',
  },
  upsellPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: C.primary,
    textAlign: 'center',
    marginTop: 4,
  },
 
});
