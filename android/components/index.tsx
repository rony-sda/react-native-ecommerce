import React, { useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  Animated, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.75;
const ITEM_SPACING = (width - ITEM_WIDTH) / 2;

// --- Demo Data ---
const HERO_ITEMS = [
  {
    id: '1',
    title: 'ZENITH\nELITE',
    subtitle: 'PRECISION PERFORMANCE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtP2Xz4XlXnKzWv-ZgK6Xf0yR0S3_S4_T0_R_P_Q_O_N_M_L_K_J_I_H_G_F_E_D_C_B_A', // Placeholder
    brand: 'AERO X',
    accent: '#73ffbc'
  },
  {
    id: '2',
    title: 'OBSIDIAN\nPRO',
    subtitle: 'ACOUSTIC MASTERY',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtP2Xz4XlXnKzWv-ZgK6Xf0yR0S3_S4_T0_R_P_Q_O_N_M_L_K_J_I_H_G_F_E_D_C_B_A', // Placeholder
    brand: 'STUDIO 01',
    accent: '#5efcce'
  },
  {
    id: '3',
    title: 'CHRONO\nSTEALTH',
    subtitle: 'URBAN SHADOW',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtP2Xz4XlXnKzWv-ZgK6Xf0yR0S3_S4_T0_R_P_Q_O_N_M_L_K_J_I_H_G_F_E_D_C_B_A', // Placeholder
    brand: 'EVO TIME',
    accent: '#7de9ff'
  }
];

const NEW_DROPS = [
  { id: 'd1', name: 'Alpha Runner', price: '$240', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtP2Xz4XlXnKzWv-ZgK6Xf0yR0S3_S4_T0_R_P_Q_O_N_M_L_K_J_I_H_G_F_E_D_C_B_A' },
  { id: 'd2', name: 'Gravity Tee', price: '$85', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtP2Xz4XlXnKzWv-ZgK6Xf0yR0S3_S4_T0_R_P_Q_O_N_M_L_K_J_I_H_G_F_E_D_C_B_A' },
  { id: 'd3', name: 'Nexus Pack', price: '$180', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtP2Xz4XlXnKzWv-ZgK6Xf0yR0S3_S4_T0_R_P_Q_O_N_M_L_K_J_I_H_G_F_E_D_C_B_A' },
  { id: 'd4', name: 'Vector Cap', price: '$45', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtP2Xz4XlXnKzWv-ZgK6Xf0yR0S3_S4_T0_R_P_Q_O_N_M_L_K_J_I_H_G_F_E_D_C_B_A' },
];

// --- Components ---

const SpotlightItem = ({ item, index, scrollX, theme }: any) => {
  const inputRange = [
    (index - 1) * ITEM_WIDTH,
    index * ITEM_WIDTH,
    (index + 1) * ITEM_WIDTH,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.85, 1, 0.85],
    extrapolate: 'clamp',
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.4, 1, 0.4],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.spotlightItem, { transform: [{ scale }], opacity }]}>
      <View style={[styles.itemCard, { backgroundColor: theme.surfaceHigh }]}>
        <Image 
          source={{ uri: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000&auto=format&fit=crop" }} 
          style={styles.itemImage}
          contentFit="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(14,14,14,0.8)']}
          style={styles.itemGradient}
        />
        <View style={styles.itemContent}>
          <Text style={[styles.itemBrand, { color: theme.primary }]}>{item.brand}</Text>
          <Text style={[styles.itemTitle, { color: theme.text }]}>{item.title}</Text>
          <Text style={[styles.itemSubtitle, { color: theme.icon }]}>{item.subtitle}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default function ShopHomeScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style="light" />

      {/* Glass Navigation */}
      <View style={styles.navBar}>
        <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
        <SafeAreaView edges={['top']} style={styles.safeNav}>
          <View style={styles.navContent}>
            <View>
              <Text style={[styles.navGreeting, { color: theme.icon }]}>EXPLORE</Text>
              <Text style={[styles.navBrand, { color: theme.text }]}>MODERN EXPO</Text>
            </View>
            <TouchableOpacity style={[styles.searchButton, { backgroundColor: theme.surfaceHigh }]}>
              <MaterialIcons name="search" size={20} color={theme.primary} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Spotlight Scroller */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionKicker, { color: theme.primary }]}>SPOTLIGHT</Text>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>ELITE DROPS</Text>
        </View>

        <Animated.FlatList
          data={HERO_ITEMS}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          contentContainerStyle={styles.spotlightContainer}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          renderItem={({ item, index }) => (
            <SpotlightItem item={item} index={index} scrollX={scrollX} theme={theme} />
          )}
        />

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryPills}>
            {['All', 'Footwear', 'Apparel', 'Essentials', 'Tech'].map((cat, i) => (
              <TouchableOpacity key={cat} style={[styles.pill, i === 0 && { backgroundColor: theme.primary }]}>
                <Text style={[styles.pillText, { color: i === 0 ? theme.background : theme.text }]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* New Drops */}
        <View style={styles.sectionHeader}>
          <View style={styles.headerRow}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>NEW DROPS</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: theme.primary }]}>SEE ALL</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dropsGrid}>
          {NEW_DROPS.map((drop) => (
            <TouchableOpacity key={drop.id} style={[styles.dropCard, { backgroundColor: theme.surfaceContainer }]}>
              <Image 
                source={{ uri: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop" }} 
                style={styles.dropImage}
                contentFit="cover"
              />
              <View style={styles.dropInfo}>
                <Text style={[styles.dropName, { color: theme.text }]}>{drop.name}</Text>
                <Text style={[styles.dropPrice, { color: theme.primary }]}>{drop.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Signature CTA */}
        <View style={styles.ctaSection}>
          <LinearGradient
            colors={[theme.primary, theme.primaryDim]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaGradient}
          >
            <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8}>
              <Text style={[styles.ctaText, { color: theme.background }]}>EXPLORE FULL CATALOG</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    overflow: 'hidden',
  },
  safeNav: {
    width: '100%',
  },
  navContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  navGreeting: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    letterSpacing: 2,
  },
  navBrand: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 18,
    letterSpacing: -0.5,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingTop: 120,
    paddingBottom: 120,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  sectionKicker: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    letterSpacing: 3,
    marginBottom: 4,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 32,
    letterSpacing: -1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  seeAll: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    letterSpacing: 1,
  },
  spotlightContainer: {
    paddingLeft: ITEM_SPACING,
    paddingRight: ITEM_SPACING,
    paddingBottom: 40,
  },
  spotlightItem: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemCard: {
    width: ITEM_WIDTH - 20,
    height: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  itemImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.7,
  },
  itemGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  itemContent: {
    padding: 24,
  },
  itemBrand: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 8,
  },
  itemTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: -1,
    marginBottom: 8,
  },
  itemSubtitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    letterSpacing: 1,
  },
  categoriesSection: {
    marginBottom: 40,
  },
  categoryPills: {
    paddingHorizontal: 24,
    gap: 12,
  },
  pill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  pillText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
  },
  dropsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 16,
  },
  dropCard: {
    width: (width - 48 - 16) / 2,
    borderRadius: 20,
    padding: 12,
  },
  dropImage: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    marginBottom: 12,
  },
  dropInfo: {
    gap: 4,
  },
  dropName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  dropPrice: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
  },
  ctaSection: {
    paddingHorizontal: 24,
    marginTop: 48,
  },
  ctaGradient: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  ctaButton: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    letterSpacing: 2,
  }
});
