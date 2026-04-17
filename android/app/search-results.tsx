import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  Animated,
  Modal,
  Platform,
  Pressable
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

const { width, height } = Dimensions.get('window');

// --- Types ---
type SortOption = 'Popularity' | 'Newest' | 'Price: Low to High' | 'Price: High to Low' | 'Rating';

// --- Custom Components ---

const ProductCard = ({ item, staggered }: { item: any; staggered?: boolean }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];
  
  return (
    <TouchableOpacity 
        style={[
            styles.productCard, 
            staggered && { marginTop: 24 }
        ]} 
        activeOpacity={0.8}
        onPress={() => router.push('/product-details')}
    >
      <View style={[styles.imageContainer, { backgroundColor: theme.surfaceHigh }]}>
        <Image 
            source={{ uri: item.image }}
            style={styles.productImage}
            contentFit="cover"
        />
        <TouchableOpacity style={styles.favoriteButton}>
            <BlurView intensity={20} style={StyleSheet.absoluteFill} tint="dark" />
            <MaterialIcons name="favorite" size={18} color={theme.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
        <Text style={[styles.productPrice, { color: theme.primary }]}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

// --- Main Screen ---

export default function SearchResultsScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];
  
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortOption>('Popularity');
  
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (isSortOpen) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 50,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isSortOpen]);

  const brands = ['All', 'Aero', 'Studio', 'Evo'];
  const sortOptions: SortOption[] = ['Popularity', 'Newest', 'Price: Low to High', 'Price: High to Low', 'Rating'];

  const products = [
    { id: 1, name: 'Aero Phantom X1', price: 189.0, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8BcSSL_be0XbBmV6-sSBf53CO9HX3zVdWhfWxR_DM9llFamdNwe7y8klbbNF5dJPqf6HwcswBcRUCMFsG9kOFgWXw4IE857I0zeEVJYMR6svIwk85uJ4iKr7v5IKA-PqcBDGXEZpmqHGhZgp5YUY_ffw-UvO4y-5RQg57zx1BFlFcDFrsfg0SglUe2IRMjuOrgyZT24eZN-c-EpyWQ6Hc8kcwrFt-4LRMWU200QE2dqjxBMD5crRXTyNp0HPbEEQ2qN5MJ2RanA" },
    { id: 2, name: 'Studio Stealth HD', price: 349.0, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLcIWsqRbNCwDNoW4fkMsAdpI6QopAtGXQP84eFRWsjWdBQJmUt_YWA9iHrScqJiSNGSe23IjmuhalR3Ct_lN0JGN8KRYf5EuS61b_Ipb7vGfB4zQqYuws0VOOh7r8w2cUSEfBAobYJOSdRC5MwnhpsfHtb5jMJmFCpqbRPHOHaxhjB-5UPMYq8tuH_alY1yIQwXXqm8OAvxk-OxHFOwHCElX79IQ9UBZVP4T1aaNJtpZlBhY0Sxakp4DNxMTjvN6yy8MS3h8wYg" },
    { id: 3, name: 'Evo Speedlight', price: 120.0, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDY9dwgIg5HJR9wFADOo5NlqzLDJ8LRgzVCp0ylliGR1InSQxDQo3mnTA1sltpCP1aYgNLQpLZqoj1WJ8GX7UejKLVrwvMWFfK9lbf5oB5zQPMeC1yLtXeobasKVBvx6KWlXituQgibtcKpRI2eRiTvPGSq1u99foU0ew6XYt146hodvp1cRPTdAMKY7JCBAD8lzTTAbAeCc7YCHxqgVDFCW28R0nqdeqVNSGVTtcjK0rat3FGxKL2lWO_pdrD1b8j6bK1_LHpOJw" },
    { id: 4, name: 'Aero Stealth Visor', price: 215.0, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBj-JJmIFM-X5LNmHjEQXdcmUcXazZJo5rWo7jljgLCQwVEsoa8ID3x1gQ4LDIZKc2qYpObUBy_MERlVfWFz9dU8p8wOXQ46XmTCIAf3ve-WKpNrKPy7-4PRGInv43SynqkmVkOV3MYSRvQG8ZRksmzSaNvFB6DXfRJpjMeZXcAeK0aaDp4lwafssI1Zq8CDHhK85x23PBI-NuQBJL6yFx5Bhf8LRCWwIT229iWWe4jASi7zsy0gYMMM1rRvSI5hNwWJqzT3Qv6Vw" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      {/* GlassAppBar */}
      <View style={styles.appBar}>
        <BlurView intensity={80} style={StyleSheet.absoluteFill} tint={colorScheme === 'dark' ? 'dark' : 'light'} />
        <SafeAreaView edges={['top']} style={styles.safeAreaHeader}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                <MaterialIcons name="arrow-back" size={24} color={theme.primary} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.primary }]}>Search Results</Text>
            <TouchableOpacity onPress={() => setIsSortOpen(true)} style={styles.iconButton}>
                <MaterialIcons name="tune" size={24} color={theme.primary} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Filters */}
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.brandContainer}
            style={styles.brandScroll}
        >
          {brands.map(brand => (
            <TouchableOpacity 
                key={brand}
                onPress={() => setSelectedBrand(brand)}
                style={[
                    styles.brandPill, 
                    { backgroundColor: theme.surfaceHigh },
                    brand === selectedBrand && { backgroundColor: theme.primary }
                ]}
            >
              <Text style={[
                  styles.brandText, 
                  { color: theme.icon },
                  brand === selectedBrand && { color: theme.background, fontFamily: 'PlusJakartaSans_700Bold' }
              ]}>
                {brand}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Price Range Section (Static UI) */}
        <View style={styles.section}>
          <View style={[styles.priceBox, { backgroundColor: theme.surfaceLow }]}>
            <View style={styles.priceHeader}>
                <Text style={[styles.priceTitle, { color: theme.text }]}>Price Range</Text>
                <Text style={[styles.priceValue, { color: theme.primary }]}>$0 - $1000</Text>
            </View>
            <View style={styles.sliderContainer}>
                <View style={[styles.sliderTrack, { backgroundColor: theme.surfaceHigh }]}>
                    <View style={[styles.sliderActive, { backgroundColor: theme.primary, width: '45%' }]} />
                </View>
                <View style={[styles.sliderThumb, { borderColor: theme.primary, left: '42%' }]} />
            </View>
            <View style={styles.sliderLabels}>
                <Text style={[styles.sliderLabel, { color: theme.icon }]}>MIN</Text>
                <Text style={[styles.sliderLabel, { color: theme.icon }]}>MAX</Text>
            </View>
          </View>
        </View>

        {/* Results Info */}
        <View style={styles.resultsInfo}>
          <Text style={[styles.resultsTitle, { color: theme.text }]}>Stealth Series</Text>
          <Text style={[styles.resultsCount, { color: theme.icon }]}>24 ITEMS</Text>
        </View>

        {/* Asymmetric Product Grid */}
        <View style={styles.grid}>
          <View style={styles.gridColumn}>
            {products.filter((_, i) => i % 2 === 0).map(item => (
                <ProductCard key={item.id} item={item} />
            ))}
          </View>
          <View style={styles.gridColumn}>
            {products.filter((_, i) => i % 2 !== 0).map(item => (
                <ProductCard key={item.id} item={item} staggered />
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sort Bottom Sheet */}
      {isSortOpen && (
        <View style={StyleSheet.absoluteFill}>
          <Pressable 
            style={[styles.backdrop, { backgroundColor: 'rgba(0,0,0,0.6)' }]} 
            onPress={() => setIsSortOpen(false)}
          >
            <BlurView intensity={20} style={StyleSheet.absoluteFill} tint="dark" />
          </Pressable>
          <Animated.View 
            style={[
              styles.bottomSheet, 
              { 
                backgroundColor: theme.surfaceHigh,
                transform: [{ translateY: slideAnim }] 
              }
            ]}
          >
            <View style={styles.sheetHandleContainer}>
                <View style={[styles.sheetHandle, { backgroundColor: theme.border + '44' }]} />
            </View>
            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: theme.text }]}>Sort By</Text>
              <TouchableOpacity onPress={() => setIsSortOpen(false)}>
                <MaterialIcons name="close" size={24} color={theme.icon} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.sortList}>
              {sortOptions.map(option => (
                <TouchableOpacity 
                    key={option}
                    onPress={() => setSelectedSort(option)}
                    style={[
                        styles.sortItem,
                        option === selectedSort && [styles.sortItemActive, { borderColor: theme.primary + '33', backgroundColor: theme.surfaceContainer + '88' }]
                    ]}
                >
                  <Text style={[
                      styles.sortItemText, 
                      { color: theme.text },
                      option === selectedSort && { color: theme.primary, fontFamily: 'PlusJakartaSans_600SemiBold' }
                  ]}>
                    {option}
                  </Text>
                  {option === selectedSort && (
                    <MaterialIcons name="check-circle" size={22} color={theme.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => setIsSortOpen(false)}
                activeOpacity={0.9}
            >
              <LinearGradient
                colors={[theme.primary, theme.primaryContainer || '#0eb77b']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.applyGradient}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
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
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    letterSpacing: -0.5,
  },
  scrollContent: {
    paddingTop: 100,
    paddingBottom: 40,
  },
  brandScroll: {
    maxHeight: 60,
    marginBottom: 24,
  },
  brandContainer: {
    paddingHorizontal: 24,
    gap: 12,
    alignItems: 'center',
  },
  brandPill: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 99,
  },
  brandText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  priceBox: {
    padding: 24,
    borderRadius: 24,
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  priceTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
  },
  priceValue: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  sliderContainer: {
    width: '100%',
    height: 24,
    justifyContent: 'center',
    position: 'relative',
  },
  sliderTrack: {
    height: 4,
    width: '100%',
    borderRadius: 2,
  },
  sliderActive: {
    height: '100%',
    borderRadius: 2,
  },
  sliderThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0e0e0e',
    borderWidth: 2,
    position: 'absolute',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  sliderLabel: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 10,
    letterSpacing: 1.5,
  },
  resultsInfo: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  resultsTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 24,
    letterSpacing: -0.5,
  },
  resultsCount: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    letterSpacing: 2,
  },
  grid: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    gap: 16,
  },
  gridColumn: {
    flex: 1,
  },
  productCard: {
    marginBottom: 24,
  },
  imageContainer: {
    aspectRatio: 4 / 5,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: {
    paddingTop: 12,
    gap: 4,
  },
  productName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
  },
  productPrice: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 12,
  },
  sheetHandleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sheetHandle: {
    width: 48,
    height: 6,
    borderRadius: 3,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sheetTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 20,
  },
  sortList: {
    gap: 8,
  },
  sortItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 20,
  },
  sortItemActive: {
    borderWidth: 1,
  },
  sortItemText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 16,
  },
  applyButton: {
    marginTop: 32,
    width: '100%',
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
  },
  applyGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    color: '#0e0e0e',
  }
});
