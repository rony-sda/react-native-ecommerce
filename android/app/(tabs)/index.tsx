import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, RefreshControl, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function FeaturedBrandsScreen() {
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
            <Text style={[styles.headerTitle, { color: theme.primary }]}>FEATURED BRANDS</Text>
            
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
          <Text style={[styles.heroKicker, { color: theme.primary }]}>CURATED SELECTION</Text>
          <Text style={[styles.heroTitle, { color: theme.text }]}>THE </Text>
          {/* Gradient Text Workaround */}
          <View style={styles.gradientTextContainer}>
             <LinearGradient
               colors={[theme.primary, theme.primaryDim]}
               start={{ x: 0, y: 0 }}
               end={{ x: 1, y: 1 }}
               style={styles.gradientTextOverlay}
             />
             {/* Note: React Native doesn't have true bg-clip-text cross-platform easily, so we use colored text that matches primary */}
             <Text style={[styles.heroTitleHighlight, { color: theme.primaryDim }]}>ELITE</Text>
          </View>
          <Text style={[styles.heroTitle, { color: theme.text, marginTop: -8 }]}>COLLECTIVE</Text>
          <Text style={[styles.heroSubtitle, { color: theme.icon }]}>
            Defining the future of precision performance and aesthetic mastery.
          </Text>
        </View>

        {/* Bento Grid */}
        <View style={styles.gridContainer}>
          
          {/* Brand 1: AERO */}
          <TouchableOpacity style={[styles.cardFull, { backgroundColor: theme.surfaceContainer }]} activeOpacity={0.9}>
            <Image 
              source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCG3Jgr3Nv1QviazGbOk54rURz-ch1zaJtSFY08Ksb8VupWXlIqNSU-rzBivc5DmZgcJFH8Iba0tNKnx3tuwYtkBcYwH-To_mMwx8mz_kUNnjfQE0Mkqm-kl4O77MxK73bbF_iz_qBgCP43G2ktkx6KeoECL13-hs9pSuKHRuFeJD_7Z0BKsWRSVcpi0owC36GXgAQn8O79iyGEFP5XtE9QxViBCsYNIG4iWOE1wAhN2Ec_acGrzhBUG04y3JLLIlHvxWOzL9WXGg" }}
              style={styles.cardImageBase}
              contentFit="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(14,14,14,0.4)', theme.background]}
              style={styles.cardGradient}
            />
            <View style={styles.cardContent}>
              <View style={styles.aeroHeader}>
                <View style={[styles.aeroBar, { backgroundColor: theme.primary }]} />
                <Text style={[styles.aeroTitle, { color: theme.text }]}>AERO</Text>
              </View>
              <Text style={[styles.aeroSubtitle, { color: theme.icon }]}>PRECISION DYNAMICS</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <LinearGradient
                  colors={[theme.primary, theme.primaryDim]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.aeroButton}
                >
                  <Text style={[styles.aeroButtonText, { color: theme.background }]}>VIEW COLLECTION</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View style={styles.gridRow}>
            {/* Brand 2: STUDIO */}
            <TouchableOpacity style={[styles.cardHalf, { backgroundColor: theme.surfaceHigh }]} activeOpacity={0.9}>
              <Image 
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbRoQvjQDHn9LMrrTdpepTKM98zke96UlOUUrAjseuFVXaHKE7AvoKKJG9gPgZKxVL2yrgDyNrD0Nji2TXLqMWO-ywAK5xU8Zoh1vL0_zJ8nyCQy0rYT1skQ4FkqzSOGcXUDuUK2wqtPLXPkQhdAhb__AO7Wcth0ObxeqAJj-TYH1TdzmG3n_OxMh1r-Aq9hUAgclQenUZ3AotXMrRp-t_CDEOZadGDKJLrJvkLQDkcPebf_uUfgajuxGOeA_AsZnlQtzuQxXxpw" }}
                style={styles.cardImageSub}
                contentFit="cover"
              />
              <LinearGradient
                colors={['transparent', theme.surfaceHigh]}
                style={styles.cardGradient}
              />
              <View style={styles.cardContent}>
                <Text style={[styles.halfTitle, { color: theme.text }]}>STUDIO</Text>
                <Text style={[styles.halfSubtitle, { color: theme.primaryDim }]}>ARCHITECTURAL SOUND</Text>
                <View style={styles.exploreLink}>
                  <Text style={[styles.exploreText, { color: theme.primary }]}>EXPLORE</Text>
                  <MaterialIcons name="arrow-forward" size={14} color={theme.primary} />
                </View>
              </View>
            </TouchableOpacity>

            {/* Brand 3: STEALTH */}
            <TouchableOpacity style={[styles.cardHalf, { backgroundColor: theme.surfaceHigh }]} activeOpacity={0.9}>
              <Image 
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnCvKCUcGKetY6f0Nm-lbMAjDGYqofTPkCW_4cXkVQUzH5nGZYuCow0_SPS7OLJGlFzkX9xxZLVBX7SsHQV6AM_D5UH7GetLDqd0AUtjb3suVkJ38MZnjPDeq7jYsfgTbqjVxXPlcvdsNPcF_M3Rs2DQc_lP1RR7WRYrzXMh3Eie-2EExZBzEzgeL7QtefT4Un8qSvu52l0pPn2y_oQlalx2tdN-gH8QFIQn8P99eY9a8lwn5imIXxQkrxJ_nTnTa9VeT5iIUu3A" }}
                style={styles.cardImageSub}
                contentFit="cover"
              />
              <LinearGradient
                colors={['transparent', theme.surfaceHigh]}
                style={styles.cardGradient}
              />
              <View style={styles.cardContent}>
                <Text style={[styles.halfTitle, { color: theme.text }]}>STEALTH</Text>
                <Text style={[styles.halfSubtitle, { color: theme.primaryDim }]}>URBAN SHADOW</Text>
                <View style={styles.exploreLink}>
                  <Text style={[styles.exploreText, { color: theme.primary }]}>EXPLORE</Text>
                  <MaterialIcons name="arrow-forward" size={14} color={theme.primary} />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.gridRow}>
            {/* Brand 4: EVO */}
            <TouchableOpacity style={[styles.cardHalf, { backgroundColor: theme.surfaceHigh }]} activeOpacity={0.9}>
              <Image 
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2FeInNa75BmsPp3z5EGgGym2174-n0sbZ6SxK2Mm2v0DzKdPujJMM7BGReSlqPzgWM5TdSqhjHXHKbllVUtzq-1vXBfnW7-C1ERalI_EV4ZLwOwm0boUFtiY1UZ9DT8VwYC7ATblmM50A4RGQEpQqWKS49B2HLBBZdJpfS0VgzQDRZuFbLGuQLCiJKtfMLZIRPfDe8MmT1vTrGIH8Qn7_hfSKcVJe6QyFCutcT8vJr2wvL6RNePr4v7yYCIL-CsSpnbR2ZyAHSA" }}
                style={styles.cardImageSub}
                contentFit="cover"
              />
              <LinearGradient
                colors={['transparent', theme.surfaceHigh]}
                style={styles.cardGradient}
              />
              <View style={styles.cardContent}>
                <Text style={[styles.halfTitle, { color: theme.text }]}>EVO</Text>
                <Text style={[styles.halfSubtitle, { color: theme.primaryDim }]}>KINETIC POWER</Text>
                <View style={styles.exploreLink}>
                  <Text style={[styles.exploreText, { color: theme.primary }]}>EXPLORE</Text>
                  <MaterialIcons name="arrow-forward" size={14} color={theme.primary} />
                </View>
              </View>
            </TouchableOpacity>

            {/* Brand 5: VORTEX */}
            <TouchableOpacity style={[styles.cardHalf, { backgroundColor: theme.surfaceHigh }]} activeOpacity={0.9}>
              <Image 
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzp1oaIpne0aXSjROB_vWm2z4XQBzGM4384bkOvL0YgbbUmrnR1o0lFZtzRqOmfk64A6wdnGyrh90w8Hf4NPYvYUbMfFZACApFhnZ3Wg6m9Wpt0vl1I5-gnISpFRX7XK_SGxEQjJtG_OihZBClVq72gE_ckUp437urKAitNUyCqr9u2ddn97pCOjqkBRgmVrsrpAIYovRsFfEOSNPul_aw5F9RpcfK4UJlupywRlEVzfEBx1PbFzvk-24XAwxiVf4xe3eNvnPLaQ" }}
                style={styles.cardImageSub}
                contentFit="cover"
              />
              <LinearGradient
                colors={['transparent', theme.surfaceHigh]}
                style={styles.cardGradient}
              />
              <View style={styles.cardContent}>
                <Text style={[styles.halfTitle, { color: theme.text }]}>VORTEX</Text>
                <Text style={[styles.halfSubtitle, { color: theme.primaryDim }]}>INFINITE FLOW</Text>
                <View style={styles.exploreLink}>
                  <Text style={[styles.exploreText, { color: theme.primary }]}>EXPLORE</Text>
                  <MaterialIcons name="arrow-forward" size={14} color={theme.primary} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Editorial Quote Section */}
        <View style={styles.quoteSection}>
          <MaterialIcons name="format-quote" size={36} color="rgba(99, 240, 175, 0.4)" style={styles.quoteIcon} />
          <Text style={[styles.quoteText, { color: theme.text }]}>
            "True luxury isn't heard, it's <Text style={[styles.quoteHighlight, { color: theme.primary }]}>felt</Text>."
          </Text>
          <Text style={[styles.quoteAuthor, { color: theme.icon }]}>THE EXPO PHILOSOPHY</Text>
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
    paddingTop: 100, // accommodate app bar
    paddingBottom: 140, // accommodate bottom custom tab bar (which will be in layout)
    paddingHorizontal: 24,
  },
  heroSection: {
    marginTop: 20,
    marginBottom: 48,
  },
  heroKicker: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    letterSpacing: 2.4,
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 48,
    lineHeight: 52,
    letterSpacing: -2,
  },
  heroTitleHighlight: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 48,
    lineHeight: 52,
    letterSpacing: -2,
  },
  gradientTextContainer: {
    flexDirection: 'row',
  },
  gradientTextOverlay: {
    position: 'absolute',
    // In a full implementation we'd use masked view for real CSS bg-clip-text.
  },
  heroSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
    width: '85%',
  },
  gridContainer: {
    gap: 16,
  },
  cardFull: {
    borderRadius: 20,
    height: 256,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 24,
  },
  cardHalf: {
    flex: 1,
    borderRadius: 20,
    height: 288,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 20,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 16,
  },
 cardImageBase: {
  position: 'absolute',
  top: 0,       
  left: 0,      
  right: 0,      
  bottom: 0,  
  opacity: 0.6,
},
 cardImageSub: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0.65,
},
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  cardContent: {
    zIndex: 10,
  },
  aeroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  aeroBar: {
    width: 32,
    height: 4,
  },
  aeroTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 24,
    letterSpacing: -1,
    fontStyle: 'italic',
  },
  aeroSubtitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    letterSpacing: 2.4,
    marginBottom: 16,
  },
  aeroButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
    shadowColor: '#73ffbc',
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  aeroButtonText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    letterSpacing: 2.4,
  },
  halfTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  halfSubtitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    letterSpacing: 2.4,
    marginBottom: 12,
  },
  exploreLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  exploreText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    letterSpacing: 2.4,
  },
  quoteSection: {
    marginTop: 64,
    paddingTop: 48,
    borderTopWidth: 1,
    borderColor: 'rgba(72, 72, 71, 0.1)',
    alignItems: 'center',
  },
  quoteIcon: {
    marginBottom: 24,
  },
  quoteText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 24,
    letterSpacing: -0.5,
    textAlign: 'center',
    maxWidth: 280,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  quoteHighlight: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontStyle: 'normal',
  },
  quoteAuthor: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    letterSpacing: 3,
  }
});
