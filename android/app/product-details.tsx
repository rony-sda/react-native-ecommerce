import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  FlatList,
  Animated,
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCLDBaEHr2VQFYHQqGrl6q30mi7WJk2VOT6G2_NCWb3SpTeGGLB-y4yo1aq-hpRhou2HYceoye_xVerI4O8lj37dMmekTM0TA_wRen3u3i0TBRlSkZv30RzUxSn_lKDzGkXC7f00_fVq3JPUhJtrt2XbAIaNkPGYX6V8uTO2mVty0SCvC-ut27QCuujoSiqGZhB73imfeaqBo1ataRIKTmNHsFYq4KheCB06YyNaFGy-aoDqBHQ8OV5_d3mBqVUVmkCaMGrVWyGkQ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCLDBaEHr2VQFYHQqGrl6q30mi7WJk2VOT6G2_NCWb3SpTeGGLB-y4yo1aq-hpRhou2HYceoye_xVerI4O8lj37dMmekTM0TA_wRen3u3i0TBRlSkZv30RzUxSn_lKDzGkXC7f00_fVq3JPUhJtrt2XbAIaNkPGYX6V8uTO2mVty0SCvC-ut27QCuujoSiqGZhB73imfeaqBo1ataRIKTmNHsFYq4KheCB06YyNaFGy-aoDqBHQ8OV5_d3mBqVUVmkCaMGrVWyGkQ', // Mocking multiple images
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCLDBaEHr2VQFYHQqGrl6q30mi7WJk2VOT6G2_NCWb3SpTeGGLB-y4yo1aq-hpRhou2HYceoye_xVerI4O8lj37dMmekTM0TA_wRen3u3i0TBRlSkZv30RzUxSn_lKDzGkXC7f00_fVq3JPUhJtrt2XbAIaNkPGYX6V8uTO2mVty0SCvC-ut27QCuujoSiqGZhB73imfeaqBo1ataRIKTmNHsFYq4KheCB06YyNaFGy-aoDqBHQ8OV5_d3mBqVUVmkCaMGrVWyGkQ'
];

const SpecItem = ({ icon, label, value }: { icon: string; label: string; value: string }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];
  
  return (
    <View style={[styles.specItem, { backgroundColor: theme.surfaceLow, borderColor: 'transparent' }]}>
      <View style={[styles.specIconContainer, { backgroundColor: theme.surfaceHigh }]}>
        <MaterialIcons name={icon as any} size={20} color={theme.primary} />
      </View>
      <View>
        <Text style={[styles.specLabel, { color: theme.icon }]}>{label}</Text>
        <Text style={[styles.specValue, { color: theme.text }]}>{value}</Text>
      </View>
    </View>
  );
};

export default function ProductDetailsScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false, listener: (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
        setActiveImageIndex(index);
    }}
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.appBar}>
        <BlurView intensity={20} style={StyleSheet.absoluteFill} tint="dark" />
        <SafeAreaView edges={['top']} style={styles.safeAreaHeader}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                <MaterialIcons name="arrow-back" size={24} color={theme.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="favorite-border" size={24} color={theme.primary} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Carousel */}
        <View style={styles.carouselContainer}>
          <FlatList 
            data={IMAGES}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
            renderItem={({ item }) => (
              <View style={styles.imageWrapper}>
                <Image 
                    source={{ uri: item }}
                    style={styles.productImage}
                    contentFit="cover"
                />
                <View style={styles.imageOverlay} />
              </View>
            )}
          />
          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {IMAGES.map((_, index) => (
                <View 
                    key={index} 
                    style={[
                        styles.dot, 
                        activeImageIndex === index ? [styles.dotActive, { backgroundColor: theme.primary }] : { backgroundColor: theme.surfaceHigh }
                    ]} 
                />
            ))}
          </View>
        </View>

        {/* Product Details Section */}
        <View style={styles.detailsContent}>
          <View style={styles.headerInfo}>
            <Text style={[styles.brandLabel, { color: theme.primary }]}>STEALTH AUDIO LAB</Text>
            <Text style={[styles.productTitle, { color: theme.text }]}>Precision Series V3</Text>
            
            <View style={styles.priceReviewRow}>
                <Text style={[styles.price, { color: theme.text }]}>$1,299.00</Text>
                <View style={[styles.reviewBadge, { backgroundColor: theme.surfaceHigh }]}>
                    <MaterialIcons name="star" size={14} color={theme.primary} />
                    <Text style={[styles.reviewText, { color: theme.text }]}>4.8</Text>
                    <Text style={[styles.reviewCount, { color: theme.icon }]}> (1.2k)</Text>
                </View>
            </View>
          </View>

          <Text style={[styles.description, { color: theme.icon }]}>
            Engineered for the absolute purist. The Precision Series V3 redefines wearable acoustics with custom-machined titanium housing and proprietary dual-driver architecture. Experience unparalleled clarity wrapped in an obsidian aesthetic designed for the urban nocturnal.
          </Text>

          {/* Specs Grid */}
          <View style={styles.specsGrid}>
            <SpecItem icon="battery-charging-full" label="Battery" value="72 Hours" />
            <SpecItem icon="opacity" label="Durability" value="10ATM Water" />
            <SpecItem icon="wifi" label="Connectivity" value="Lossless 5.3" />
            <SpecItem icon="verified" label="Warranty" value="2 Years Pro" />
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Fixed Bottom Actions */}
      <BlurView intensity={40} style={styles.bottomBar} tint="dark">
        <SafeAreaView edges={['bottom']} style={styles.bottomContent}>
          <View style={[styles.quantitySelector, { backgroundColor: theme.surfaceHigh }]}>
            <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.qtyBtn}>
                <MaterialIcons name="remove" size={20} color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.qtyText, { color: theme.text }]}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.qtyBtn}>
                <MaterialIcons name="add" size={20} color={theme.text} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.addBtn} activeOpacity={0.9}>
            <LinearGradient
                colors={[theme.primary, theme.primaryContainer || '#0eb77b']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.addGradient}
            >
                <MaterialIcons name="shopping-bag" size={20} color={theme.background} />
                <Text style={[styles.addBtnText, { color: theme.background }]}>Add to Bag</Text>
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
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  carouselContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    position: 'relative',
  },
  imageWrapper: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  pagination: {
    position: 'absolute',
    bottom: 24,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 16,
    shadowColor: 'rgba(115, 255, 188, 0.6)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  detailsContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  headerInfo: {
    marginBottom: 24,
  },
  brandLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    letterSpacing: 3,
    marginBottom: 8,
  },
  productTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 32,
    lineHeight: 38,
    marginBottom: 16,
  },
  priceReviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 28,
  },
  reviewBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  reviewText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    marginLeft: 4,
  },
  reviewCount: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
  },
  description: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 32,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  specItem: {
    width: (SCREEN_WIDTH - 60) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    gap: 12,
  },
  specIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  specLabel: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  specValue: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 13,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  bottomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  qtyBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    width: 32,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
  },
  addBtn: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
  },
  addGradient: {
    fill: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  addBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
  }
});
