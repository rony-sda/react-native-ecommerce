import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const FAVORITES_DATA = [
  {
    id: '1',
    title: 'Neon Pulse Runner',
    price: '$185.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB8_6Y4I09l1e-3UqL71f9yZ5m-_vN9qI2eA2_6Ie0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3',
    category: 'Performance Footwear'
  },
  {
    id: '2',
    title: 'Stealth Horizon 40mm',
    price: '$320.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB8_6Y4I09l1e-3UqL71f9yZ5m-_vN9qI2eA2_6Ie0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3',
    category: 'Precision Timepieces'
  },
  {
    id: '3',
    title: 'Void Over-Ear ANC',
    price: '$450.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB8_6Y4I09l1e-3UqL71f9yZ5m-_vN9qI2eA2_6Ie0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3',
    category: 'Acoustic Engineering'
  },
  {
    id: '4',
    title: 'Cinema Prime 50mm',
    price: '$899.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB8_6Y4I09l1e-3UqL71f9yZ5m-_vN9qI2eA2_6Ie0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3L2e0w-K7y3',
    category: 'Optical Mastery'
  }
];

// Note: Using placeholders since direct image URLs from Stitch code might be session-bound or internal.
// I'll use high-quality themed placeholders that match the emerald aesthetic.
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop"
];

export default function FavoritesScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      {/* TopAppBar */}
      <View style={styles.appBar}>
        <BlurView intensity={80} style={StyleSheet.absoluteFill} tint={colorScheme === 'dark' ? 'dark' : 'light'} />
        <SafeAreaView edges={['top']} style={styles.safeAreaHeader}>
          <View style={styles.headerContent}>
            <Text style={[styles.headerTitle, { color: theme.primary }]}>FAVORITES</Text>
            
             <TouchableOpacity style={styles.iconButton}>
                           <MaterialIcons name="search" size={24} color={theme.primary} />
                       </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Editorial Header */}
        <View style={styles.heroSection}>
          <Text style={[styles.heroKicker, { color: theme.primary }]}>YOUR CURATED SELECTION</Text>
          <Text style={[styles.heroTitle, { color: theme.text }]}>THE </Text>
          <View style={styles.gradientTextContainer}>
             <Text style={[styles.heroTitleHighlight, { color: theme.primary }]}>WISHLIST</Text>
          </View>
          <Text style={[styles.heroSubtitle, { color: theme.icon }]}>
            4 Items carefully preserved for your next acquisition.
          </Text>
        </View>

        {/* Product List */}
        <View style={styles.listContainer}>
          {FAVORITES_DATA.map((item, index) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.productCard, { backgroundColor: theme.surfaceContainer }]}
              activeOpacity={0.9}
            >
              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: FALLBACK_IMAGES[index] }}
                  style={styles.productImage}
                  contentFit="cover"
                  transition={1000}
                />
                <TouchableOpacity style={styles.heartButton}>
                   <MaterialIcons name="favorite" size={20} color={theme.primary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.cardInfo}>
                <View>
                  <Text style={[styles.categoryText, { color: theme.primaryDim }]}>{item.category.toUpperCase()}</Text>
                  <Text style={[styles.productTitle, { color: theme.text }]}>{item.title}</Text>
                </View>
                
                <View style={styles.priceRow}>
                  <Text style={[styles.priceText, { color: theme.text }]}>{item.price}</Text>
                  <TouchableOpacity activeOpacity={0.7}>
                    <LinearGradient
                      colors={[theme.primary, theme.primaryDim]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.addButton}
                    >
                      <MaterialIcons name="add-shopping-cart" size={18} color={theme.background} />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer CTA */}
        <View style={styles.footerSection}>
          <View style={[styles.footerDivider, { backgroundColor: theme.border, opacity: 0.1 }]} />
          <Text style={[styles.footerTitle, { color: theme.text }]}>Finding something else?</Text>
          <Text style={[styles.footerSubtitle, { color: theme.icon }]}>
            Explore our new arrivals and continue building your collection.
          </Text>
          
          <TouchableOpacity 
            style={[styles.ghostButton, { borderColor: theme.primary }]}
            onPress={() => router.push('/Shop')}
          >
            <Text style={[styles.ghostButtonText, { color: theme.primary }]}>EXPLORE SHOP</Text>
            <MaterialIcons name="arrow-forward" size={16} color={theme.primary} />
          </TouchableOpacity>
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
    paddingBottom: 160,
    paddingHorizontal: 24,
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
  gradientTextContainer: {
    flexDirection: 'row',
  },
  heroSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
    width: '90%',
    opacity: 0.8,
  },
  listContainer: {
    gap: 20,
  },
  productCard: {
    flexDirection: 'row',
    borderRadius: 24,
    height: 160,
    overflow: 'hidden',
    padding: 12,
  },
  imageContainer: {
    width: 136,
    height: '100%',
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(14,14,14,0.6)',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
  },
  cardInfo: {
    flex: 1,
    paddingLeft: 16,
    paddingVertical: 4,
    justifyContent: 'space-between',
  },
  categoryText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  productTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.5,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 18,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#73ffbc',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  footerSection: {
    marginTop: 64,
    alignItems: 'center',
  },
  footerDivider: {
    width: 40,
    height: 1,
    marginBottom: 32,
  },
  footerTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 20,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  footerSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.7,
    paddingHorizontal: 20,
  },
  ghostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 100,
  },
  ghostButtonText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
    letterSpacing: 2,
  }
});
