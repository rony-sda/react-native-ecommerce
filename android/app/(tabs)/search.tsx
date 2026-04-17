import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Dimensions, 
  Animated,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

// --- Custom Components ---

const SuggestionItem = ({ icon, text, highlight, isHistory = false }: any) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];
  
  return (
    <TouchableOpacity 
        style={[styles.suggestionItem, { borderBottomColor: theme.border + '20' }]}
        onPress={() => router.push('/search-results')}
    >
      <View style={styles.suggestionLeft}>
        <MaterialIcons 
            name={isHistory ? 'history' : (icon === 'trending_up' ? 'trending-up' : 'search')} 
            size={22} 
            color={theme.icon} 
        />
        <Text style={[styles.suggestionText, { color: theme.text }]}>
          {text}
          {highlight && <Text style={{ color: theme.primary }}>{highlight}</Text>}
        </Text>
      </View>
      <MaterialIcons name="arrow-outward" size={20} color={theme.border} />
    </TouchableOpacity>
  );
};

// --- Main Screen ---

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];
  
  const [searchQuery, setSearchQuery] = useState('Sneakers');
  const [cursorVisible, setCursorVisible] = useState(true);
  
  // Cursor Blinking Animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      {/* Hero Header Context */}
      <View style={styles.appBar}>
        <BlurView intensity={80} style={StyleSheet.absoluteFill} tint={colorScheme === 'dark' ? 'dark' : 'light'} />
        <SafeAreaView edges={['top']} style={styles.safeAreaHeader}>
          <View style={styles.headerContent}>
            <View style={styles.searchBar}>
                <MaterialIcons name="search" size={24} color={theme.primary} />
                <View style={styles.searchInputContainer}>
                    <Text style={[styles.searchInputMain, { color: theme.text }]}>Sneak</Text>
                    <View style={[
                        styles.cursor, 
                        { backgroundColor: theme.primary, opacity: cursorVisible ? 1 : 0 }
                    ]} />
                    <Text style={[styles.searchInputMuted, { color: theme.icon + '60' }]}>ers</Text>
                </View>
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <MaterialIcons name="close" size={24} color={theme.icon} />
                </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Suggestions Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.icon }]}>SUGGESTIONS</Text>
          <SuggestionItem isHistory text="Sneak" highlight="ers" />
          <SuggestionItem icon="trending_up" text="Sneak" highlight="er Cleaner" />
          <SuggestionItem icon="search" text="Sneak" highlight="er Shield" />
        </View>

        {/* Suggested Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.icon }]}>SUGGESTED CATEGORIES</Text>
          <View style={styles.categoriesContainer}>
            <TouchableOpacity style={[styles.categoryPillActive, { backgroundColor: theme.primary }]}>
                <Text style={[styles.categoryTextActive, { color: theme.background }]}>Footwear</Text>
            </TouchableOpacity>
            {['Performance', 'Lifestyle'].map(cat => (
                <TouchableOpacity key={cat} style={[styles.categoryPill, { backgroundColor: theme.surfaceHigh, borderColor: theme.border + '33' }]}>
                    <Text style={[styles.categoryText, { color: theme.text }]}>{cat}</Text>
                </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Trending in "Sneakers" - Bento Grid */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.icon }]}>TRENDING IN "SNEAKERS"</Text>
          
          <View style={styles.bentoContainer}>
            {/* Featured Large Card */}
            <TouchableOpacity 
                style={styles.featuredCard} 
                activeOpacity={0.9}
                onPress={() => router.push('/search-results')}
            >
                <Image 
                    source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkPVqZwPglEpL5SA8n-DkczVh0sDy6joy7vk4VJ3yaCbm47i8i8UGQIhH1cH-4yJhyfAg2GATcvilZY3-krZ-AMZPtRLzNIIvYnJ3YZzRqgpY74bOAkPt7Rjiw-PbUyYzqjaEFI8IMfuYgJMF4tlzhocMlEzRvDYXVuA9nSny-WBdzUZBEiMpIR05POPY5sfc8yUImHZUo4QAsqvln3tS8AjcWGZpqYEszJs7hIRb00SlCycHPSvwNZJ3ZZ5Vc9-7L33cdSaTKew" }}
                    style={styles.featuredImage}
                    contentFit="cover"
                />
                <LinearGradient
                    colors={['transparent', 'rgba(14,14,14,0.8)', theme.surface]}
                    style={styles.featuredGradient}
                />
                <View style={styles.featuredContent}>
                    <View style={styles.newBadge}>
                        <Text style={styles.newBadgeText}>NEW ARRIVAL</Text>
                    </View>
                    <Text style={styles.featuredTitle}>Phantom Elite V2</Text>
                    <Text style={[styles.featuredSubtitle, { color: theme.icon }]}>Elevate your run with carbon tech</Text>
                </View>
            </TouchableOpacity>

            {/* Two Side-by-Side Cards */}
            <View style={styles.bentoRow}>
                <TouchableOpacity 
                    style={[styles.halfCard, { backgroundColor: theme.surfaceContainer }]} 
                    activeOpacity={0.9}
                    onPress={() => router.push('/search-results')}
                >
                    <Image 
                        source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoeJ51XCOyCqYtXVD-xxVsWNC0WGFKov6OK5hM_vgPIG_NTbFVnJGGlwJDL65qO2_ORvySNIJT9nRY-zkYsXHlX3rqbLrKvEDh2WiY3iKBwl9ErLYC_H9cdLdQKtnPlDvDwjjYqAd4rP0zAel6jXfd3v-FAuoGjOH58-nEx67ElcPu4j4oCLaVGlRuHoyLqVuDc8mRTOfWAgVmlCzifeBR9kmLWdvsYa3rDVCIikcR2KKSfYlzQHJ6Y74eNcPKI6xXIi9W76Fy2g" }}
                        style={styles.halfCardImage}
                        contentFit="contain"
                    />
                    <View style={styles.halfCardInfo}>
                        <Text style={[styles.halfCardTitle, { color: theme.text }]}>Classic LX</Text>
                        <Text style={[styles.halfCardPrice, { color: theme.primary }]}>$129.00</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.halfCard, { backgroundColor: theme.surfaceContainer }]} 
                    activeOpacity={0.9}
                    onPress={() => router.push('/search-results')}
                >
                    <Image 
                        source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiGsijqpuTe_Lt7lvuGkFmYt3x9F7wjKhEGpLu4-gqoC8GZepooDCIB80EhxrdD2fTd_1jGuGhlS6L6JsXbLsbsPm5DVNBCRu3qyuc9wFwfS_nZcOoDGlH-4soVQC2Fui8iGsSnAT-PkCH-M0ivZ7Yewwm88SNFB8BRrIl-GyxmSQXkNjBHy2P4J2HDP2OW8krnh5vIBF4zB6QvPP1wAQr9i4ubK0NOfF0EIahKaQzmil3Zh8ltOC_k33IemkbuapmoXALbRJZTw" }}
                        style={styles.halfCardImage}
                        contentFit="contain"
                    />
                    <View style={styles.halfCardInfo}>
                        <Text style={[styles.halfCardTitle, { color: theme.text }]}>Vortex Mesh</Text>
                        <Text style={[styles.halfCardPrice, { color: theme.primary }]}>$159.00</Text>
                    </View>
                </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
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
    height: 72,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(38, 38, 38, 0.4)',
    height: 48,
    borderRadius: 16,
    paddingHorizontal: 16,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputMain: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
  },
  searchInputMuted: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 18,
  },
  cursor: {
    width: 2,
    height: 20,
    marginLeft: 2,
  },
  scrollContent: {
    paddingTop: 110,
    paddingBottom: 40,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 16,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  suggestionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  suggestionText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 18,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 99,
    borderWidth: 1,
  },
  categoryPillActive: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 99,
  },
  categoryText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
  },
  categoryTextActive: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
  },
  bentoContainer: {
    gap: 16,
  },
  featuredCard: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  featuredImage: {
    ...StyleSheet.absoluteFillObject,
  },
  featuredGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  featuredContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  newBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(115, 255, 188, 0.2)',
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  newBadgeText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 10,
    color: '#73ffbc',
    letterSpacing: 1,
  },
  featuredTitle: {
    color: 'white',
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 24,
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
  bentoRow: {
    flexDirection: 'row',
    gap: 16,
  },
  halfCard: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 24,
    padding: 16,
    justifyContent: 'space-between',
  },
  halfCardImage: {
    width: '100%',
    height: '65%',
  },
  halfCardInfo: {
    gap: 2,
  },
  halfCardTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
  },
  halfCardPrice: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
  }
});
