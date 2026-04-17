import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2; // 2 columns, 16px padding each side + 16px gap

// ─── Colors ───────────────────────────────────────────────────────────────────

const C = {
  bg: '#0e0e0e',
  surface: '#1a1a1a',
  surfaceLow: '#131313',
  surfaceHigh: '#262626',
  surfaceHighest: '#262626',
  primary: '#73ffbc',
  primaryDim: '#3CCF91',
  primaryMid: '#0eb77b',
  onPrimary: '#002918',
  onSurface: '#ffffff',
  onSurfaceVariant: '#adaaaa',
  outline: '#484847',
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = ['All', 'Exclusives', 'Watches', 'Audio', 'Camera'];

const BRANDS = ['AERO', 'Studio', 'Stealth', 'Onyx', 'Core'];

const PRODUCTS = [
  {
    id: '1',
    name: 'Studio Core Pro',
    subtitle: 'Noise Isolation V2',
    price: '$349.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAV83PGuTqfTzFmdYX06n38QM8bSS-AGDvR0OHLLOCCG56AhcgCGcY1YsjDeKEAs1SMiFPGTtFa2DapskacdVW6K40AGTUc230HASMd4qpcuc9DomPvfs7E81-HhMtFrKRFLtjcMm1sEuANEjgYDKujlEThUTOQMgR7Q98Bkn7g64tjvrSPvRiEo3RtkIPrSE2yJK4mpTXCrKwvnc8Sr8ALirbmlUTIeobledy5v89slah7U-36HbwqaqLUCszin5De-Xbw6s5Slw',
    offset: 0,
  },
  {
    id: '2',
    name: 'Lumina R-9',
    subtitle: '4K Cinematic Kit',
    price: '$1,850.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBevwPmat2mx-fdDrkA08OgyUrIr13MLqVDQNjjPnYR6zKhPG5hfEseRIQVmrjqS6t9hEXbeNtiA2Qz3bJgH4WzEEY8J8IXBh9uxuKad1WvXWuoboxPmoGLU32JR5tdAB9Y4lgKL9ofVhtcfeYB5_tIOdxyx8uGaynOZnA2J2Aalmux_5mOMtKVl_1zSzVhBs6R_BU0uRPE4cTc6O2GLokHQUYRFcqHBHlzWYN4O4e1sVBTjbTHBF0wZU0TaYnFsauJxLz7ld-YKg',
    offset: 24,
  },
  {
    id: '3',
    name: 'Onyx Horizon',
    subtitle: 'Titanium Edition',
    price: '$599.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjOrmSxQVluf6_prv81XXFftBfq0K5-NkUa6C6NouCi0v6u2NusjZGfQr1EC55yRPEwDxqtS3H0R3z6gd_RrT0MfOBDnYVNgRl27udOo_k80Erw4AuyCTv4IQX1FRAvDwWbUSnRCaA7UUGAa-1hNnhHJwzgp9iXZGUbiFymdO0njrlxFOyhicIuTGGn51Pqyh8zbnYU74KHLUA44cR2RCaCFqE9yYGAHIrFNfyPnJlowdU-1C4pH9QjGVcgtYnTPSzmZneuV0ovQ',
    offset: -24,
  },
  {
    id: '4',
    name: 'Aero Pods Pro',
    subtitle: 'Spatial Audio 3D',
    price: '$229.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7CIiY0ABASmbI8u4iDlnQmd4ZKnXv-0b0f59NOp6ri34h09XWV4pkEdXwNf92ysL7RQkOb3OkCGSl9q-a9cAwpkSwgRu5TwyzRZsTlEkoD8gHRymVxHV6k-HnGHxcz4UEJjiO-aP7KHyyRhDN26oHARwHlgNaUIccT0FrPX7NbK_yzS0KSLzdJwCymC5j0CwENuotvF-BD1S-lgHHQKCT1CEOsjTWuPKjC2iEqwOi0Fe7N5Zs3REX5qIUCia0u5_kypMNQeAJ-A',
    offset: 0,
  },
];

// ─── ProductCard Component ────────────────────────────────────────────────────

interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  image: string;
  offset: number;
}

const ProductCard = ({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (id: string) => void;
}) => (
  <View style={[styles.productCard, { marginTop: product.offset > 0 ? product.offset : 0 }]}>
    <View style={styles.productImageBox}>
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => onAdd(product.id)}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="plus" size={20} color={C.onPrimary} />
      </TouchableOpacity>
    </View>
    <Text style={styles.productName}>{product.name}</Text>
    <Text style={styles.productSubtitle}>{product.subtitle}</Text>
    <Text style={styles.productPrice}>{product.price}</Text>
  </View>
);


// ─── Main HomeScreen ──────────────────────────────────────────────────────────

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('Shop');
  const [searchText, setSearchText] = useState('');
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'dark'];

  const handleAddToCart = (id: string) => {
    console.log('Add to cart:', id);
  };

  // Split products into 2 columns
  const leftCol = PRODUCTS.filter((_, i) => i % 2 === 0);
  const rightCol = PRODUCTS.filter((_, i) => i % 2 !== 0);

  return (
     <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      {/* TopAppBar */}
      <View style={styles.appBar}>
        <BlurView intensity={80} style={StyleSheet.absoluteFill} tint={colorScheme === 'dark' ? 'dark' : 'light'} />
        <SafeAreaView edges={['top']} style={styles.safeAreaHeader}>
          <View style={styles.headerContent}>
            <Text style={[styles.headerTitle, { color: theme.primary }]}>Expo Shop</Text>
            
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
        {/* ── Search Bar ── */}
        {/* <View style={styles.searchContainer}>
          <MaterialCommunityIcons
            name="magnify"
            size={20}
            color={C.onSurfaceVariant}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Find premium tech..."
            placeholderTextColor={C.onSurfaceVariant + '80'}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View> */}

        {/* ── Hero / Featured Banner ── */}
        <View style={styles.hero}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUtYCynYKc2B4xkLcmN5vUoWTccMOBeswrYG5nCjhizKjbZBgVy1NQDQf6KpTbIzSogfF3dBwnZOPlqsLEFim7pfJquByJvZb6BavCXBZrRI6ViglYj8Q29wbODGd_h_6uIbX38xbo4bzDYIxqrJLX8l-Q7OOeVDjYL7l1ElZLxEQWcj9Jst3Qa8ll2-NwMtCIjPpDnGry6MQbPpTHQK16JIOzJAk39ujuNhEPCH9Awy7unxaojIDQnlSt3A93lOdSl7tqtHvATA',
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          {/* Overlay gradient simulation */}
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTag}>FEATURED EDITION</Text>
            <Text style={styles.heroTitle}>The Precision{'\n'}Series</Text>
            <TouchableOpacity style={styles.heroBtn} activeOpacity={0.85}>
              <Text style={styles.heroBtnText}>Explore</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Category Filters ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
          style={styles.categoryRow}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryPill, isActive && styles.categoryPillActive]}
                onPress={() => setActiveCategory(cat)}
                activeOpacity={0.7}
              >
                <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

         {/* ── Featured Brands — Bento Grid (from FeaturedBrandsScreen) ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>FEATURED BRANDS</Text>
          <View style={styles.sectionDivider} />
        </View>
 
        <View style={styles.bentoGrid}>
          {/* Full-width card — AERO */}
          <TouchableOpacity
            style={[styles.brandCardFull, { backgroundColor: C.surfaceHigh }]}
            activeOpacity={0.9}
          >
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCG3Jgr3Nv1QviazGbOk54rURz-ch1zaJtSFY08Ksb8VupWXlIqNSU-rzBivc5DmZgcJFH8Iba0tNKnx3tuwYtkBcYwH-To_mMwx8mz_kUNnjfQE0Mkqm-kl4O77MxK73bbF_iz_qBgCP43G2ktkx6KeoECL13-hs9pSuKHRuFeJD_7Z0BKsWRSVcpi0owC36GXgAQn8O79iyGEFP5XtE9QxViBCsYNIG4iWOE1wAhN2Ec_acGrzhBUG04y3JLLIlHvxWOzL9WXGg',
              }}
              style={styles.brandCardImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(14,14,14,0.45)', C.bg]}
              style={styles.brandCardGradient}
            />
            <View style={styles.brandCardContent}>
              <View style={styles.aeroHeader}>
                <View style={styles.aeroBar} />
                <Text style={styles.aeroTitle}>AERO</Text>
              </View>
              <Text style={styles.aeroSubtitle}>PRECISION DYNAMICS</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <LinearGradient
                  colors={[C.primaryDim, C.primaryMid]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.aeroButton}
                >
                  <Text style={styles.aeroButtonText}>VIEW COLLECTION</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
 
          {/* Half-width row — Studio + Stealth */}
          <View style={styles.bentoRow}>
            {[
              {
                name: 'STUDIO',
                sub: 'ARCHITECTURAL SOUND',
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbRoQvjQDHn9LMrrTdpepTKM98zke96UlOUUrAjseuFVXaHKE7AvoKKJG9gPgZKxVL2yrgDyNrD0Nji2TXLqMWO-ywAK5xU8Zoh1vL0_zJ8nyCQy0rYT1skQ4FkqzSOGcXUDuUK2wqtPLXPkQhdAhb__AO7Wcth0ObxeqAJj-TYH1TdzmG3n_OxMh1r-Aq9hUAgclQenUZ3AotXMrRp-t_CDEOZadGDKJLrJvkLQDkcPebf_uUfgajuxGOeA_AsZnlQtzuQxXxpw',
              },
              {
                name: 'STEALTH',
                sub: 'URBAN SHADOW',
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnCvKCUcGKetY6f0Nm-lbMAjDGYqofTPkCW_4cXkVQUzH5nGZYuCow0_SPS7OLJGlFzkX9xxZLVBX7SsHQV6AM_D5UH7GetLDqd0AUtjb3suVkJ38MZnjPDeq7jYsfgTbqjVxXPlcvdsNPcF_M3Rs2DQc_lP1RR7WRYrzXMh3Eie-2EExZBzEzgeL7QtefT4Un8qSvu52l0pPn2y_oQlalx2tdN-gH8QFIQn8P99eY9a8lwn5imIXxQkrxJ_nTnTa9VeT5iIUu3A',
              },
            ].map((b) => (
              <TouchableOpacity
                key={b.name}
                style={[styles.brandCardHalf, { backgroundColor: C.surfaceHigh }]}
                activeOpacity={0.9}
              >
                <Image
                  source={{ uri: b.uri }}
                  style={styles.brandCardImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', C.surfaceHigh]}
                  style={styles.brandCardGradient}
                />
                <View style={styles.brandCardContent}>
                  <Text style={styles.halfTitle}>{b.name}</Text>
                  <Text style={styles.halfSubtitle}>{b.sub}</Text>
                  <View style={styles.exploreLink}>
                    <Text style={styles.exploreText}>EXPLORE</Text>
                    <MaterialIcons name="arrow-forward" size={12} color={C.primary} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.brandsScroll}
          style={styles.brandsRow}
        >
         
        </ScrollView>

          <View style={[styles.sectionHeader, { marginTop: 32 }]}>
          <Text style={styles.sectionTitle}>NEW ARRIVALS</Text>
          <View style={styles.sectionDivider} />
        </View>

        {/* ── Product Grid (2 columns, staggered) ── */}
        <View style={styles.productGrid}>
          {/* Left Column */}
          <View style={styles.productCol}>
            {leftCol.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
            ))}
          </View>
          {/* Right Column — offset by 24px for stagger */}
          <View style={[styles.productCol, { marginTop: 24 }]}>
            {rightCol.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
            ))}
          </View>
        </View>
        
        {/* ── Editorial Quote Section (from FeaturedBrandsScreen) ── */}
        <View style={styles.quoteSection}>
          <MaterialIcons
            name="format-quote"
            size={36}
            color="rgba(99, 240, 175, 0.4)"
            style={styles.quoteIcon}
          />
          <Text style={styles.quoteText}>
            "True luxury isn't heard, it's{' '}
            <Text style={styles.quoteHighlight}>felt</Text>."
          </Text>
          <Text style={styles.quoteAuthor}>THE EXPO PHILOSOPHY</Text>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

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
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '800',
    color: C.primaryDim,
    letterSpacing: -0.5,
  },
  iconBtn: {
    padding: 4,
  },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: {
    paddingBottom: 120,
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.surfaceHighest,
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderWidth: 0.5,
    borderColor: C.outline + '40',
  },
  searchIcon: { marginRight: 8 },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: C.onSurface,
    fontFamily: 'System',
  },

  // Hero
  hero: {
    marginHorizontal: 16,
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 48,
    marginTop: 110,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    opacity: 0.65,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(14,14,14,0.45)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  heroTag: {
    fontSize: 10,
    fontWeight: '700',
    color: C.primary,
    letterSpacing: 2,
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
    lineHeight: 32,
    marginBottom: 14,
  },
  heroBtn: {
    alignSelf: 'flex-start',
    backgroundColor: C.primaryDim,
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 10,
  },
  heroBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: C.onPrimary,
  },

  // Category pills
  categoryRow: { marginBottom: 28 },
  categoryScroll: { paddingHorizontal: 16, gap: 10 },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 99,
    backgroundColor: C.surfaceHighest,
    borderWidth: 0.5,
    borderColor: C.outline + '60',
  },
  categoryPillActive: {
    backgroundColor: C.primaryDim + '25',
    borderColor: C.primaryDim + '60',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: C.onSurfaceVariant,
  },
  categoryTextActive: {
    color: C.primary,
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 14,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: C.onSurfaceVariant,
    letterSpacing: 1.5,
  },
  sectionDivider: {
    flex: 1,
    height: 0.5,
    backgroundColor: C.outline + '40',
  },

  // Brands
  brandsRow: { marginBottom: 28 },
  brandsScroll: { paddingHorizontal: 16, gap: 12 },
  brandCard: {
    width: 88,
    height: 88,
    borderRadius: 16,
    backgroundColor: C.surfaceLow,
    borderWidth: 0.5,
    borderColor: C.outline + '40',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  brandText: {
    fontSize: 14,
    fontWeight: '800',
    color: C.onSurface,
    letterSpacing: -0.3,
  },
  brandDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: C.primaryDim,
    opacity: 0.6,
  },

  // Product Grid
  productGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  productCol: {
    flex: 1,
    gap: 16,
  },
  productCard: {
    flex: 1,
  },
  productImageBox: {
    aspectRatio: 4 / 5,
    backgroundColor: C.surfaceLow,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 10,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  addBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: C.primaryDim,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  productName: {
    fontSize: 13,
    fontWeight: '700',
    color: C.onSurface,
    marginBottom: 3,
  },
  productSubtitle: {
    fontSize: 11,
    color: C.onSurfaceVariant,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: C.primary,
  },
   bentoGrid: { gap: 16 , marginHorizontal: 16,},
  bentoRow: { flexDirection: 'row', gap: 16 },
 
  brandCardFull: {
    borderRadius: 20,
    height: 220,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 20,
   
    
  },
  brandCardHalf: {
    flex: 1,
    borderRadius: 20,
    height: 200,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 16,
  },
  brandCardImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.6,
  },
  brandCardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  brandCardContent: { zIndex: 10 },
 
  aeroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  aeroBar: {
    width: 28,
    height: 4,
    backgroundColor: C.primary,
  },
  aeroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: C.onSurface,
    letterSpacing: -0.5,
    fontStyle: 'italic',
  },
  aeroSubtitle: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 2.4,
    color: C.onSurfaceVariant,
    marginBottom: 14,
  },
  aeroButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  aeroButtonText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.4,
    color: C.onPrimary,
  },
 
  halfTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: C.onSurface,
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  halfSubtitle: {
    fontSize: 9,
    fontWeight: '500',
    letterSpacing: 2,
    color: C.primaryDim,
    marginBottom: 10,
  },
  exploreLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  exploreText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2.4,
    color: C.primary,
  },
 

  // Bottom Nav
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: C.surfaceHigh,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 0.5,
    borderTopColor: C.outline + '50',
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  navItemActive: {
    backgroundColor: C.primaryDim + '15',
  },
  navLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: C.onSurfaceVariant,
    letterSpacing: 0.8,
  },
  navLabelActive: {
    color: C.primary,
  },
   // ── Quote Section (from FeaturedBrandsScreen) ──
  quoteSection: {
    marginTop: 48,
    paddingTop: 40,
    borderTopWidth: 1,
    borderTopColor: 'rgba(72,72,71,0.15)',
    alignItems: 'center',
    marginBottom: 16,
  },
  quoteIcon: { marginBottom: 20 },
  quoteText: {
    fontSize: 22,
    fontWeight: '400',
    color: C.onSurface,
    letterSpacing: -0.5,
    textAlign: 'center',
    maxWidth: 280,
    marginBottom: 14,
    fontStyle: 'italic',
  },
  quoteHighlight: {
    fontWeight: '700',
    color: C.primary,
    fontStyle: 'normal',
  },
  quoteAuthor: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 3,
    color: C.onSurfaceVariant,
  },
});