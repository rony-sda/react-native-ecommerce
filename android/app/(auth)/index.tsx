import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { router } from 'expo-router';

export default function SocialAuthScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.header}>
        <BlurView intensity={70} style={StyleSheet.absoluteFill} tint={colorScheme === 'dark' ? 'dark' : 'light'} />
        <SafeAreaView style={styles.headerSafeArea}>
          <View style={styles.headerContent}>
            <Text style={[styles.headerTitle, { color: theme.primary }]}>Expo Shop</Text>
            <TouchableOpacity onPress={() => router.back()} style={[styles.closeButton, { backgroundColor: theme.surfaceHigh }]}>
              <MaterialIcons name="close" size={24} color={theme.icon} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={[styles.title, { color: theme.text }]}>Welcome Back</Text>
          <Text style={[styles.subtitle, { color: theme.icon }]}>Enter your details to access your curated gallery.</Text>
        </View>

        {/* Social Logins */}
        <View style={[styles.authCard, { backgroundColor: theme.surfaceContainer, borderColor: 'rgba(255,255,255,0.03)' }]}>
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: theme.surfaceHigh, borderColor: 'rgba(255,255,255,0.05)' }]}>
            <Svg width="24" height="24" viewBox="0 0 24 24">
              <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </Svg>
            <Text style={[styles.socialText, { color: theme.text }]}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.socialButton, { backgroundColor: theme.surfaceHigh, borderColor: 'rgba(255,255,255,0.05)', marginTop: 16 }]}>
            <Svg width="24" height="24" viewBox="0 0 24 24">
              <Path d="M16.365 14.12c-.008-3.085 2.518-4.562 2.634-4.636-1.428-2.09-3.64-2.375-4.437-2.42-1.898-.19-3.708 1.118-4.673 1.118-.962 0-2.463-1.09-4.04-1.06-2.052.028-3.945 1.192-5.008 3.04-2.146 3.716-.548 9.215 1.542 12.235 1.026 1.48 2.25 3.14 3.824 3.085 1.517-.057 2.086-.977 3.916-.977 1.82 0 2.348.977 3.924.94 1.62-.028 2.685-1.492 3.696-2.97 1.168-1.702 1.648-3.354 1.67-3.442-.036-.016-3.04-1.166-3.048-4.914zM14.673 4.41c.833-1.008 1.393-2.408 1.24-3.81-1.192.048-2.658.793-3.518 1.82-.76.88-1.434 2.308-1.258 3.684 1.332.103 2.698-.68 3.536-1.694z" fill={theme.text} />
            </Svg>
            <Text style={[styles.socialText, { color: theme.text }]}>Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Promo Area */}
        <View style={styles.promoGrid}>
          <View style={styles.promoImageContainer}>
            <Image 
              source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDwlZGHhn_7g0-x-DBx7e2ePayCVwzrXpWpuomspF-0BS3OEjP5Tz2nLRyVEkElNgvDTX0IbX584WD_v6XaWMryWiY3jI0RZpg3uc8U06w8PM1P7aaQAmnLqzcC2s3XIHb7jcr6RpdqV-JyouuppOBcVA7u5ucJomiEiZ8RiOdNHeBBLbpaX04R5-MqoP_IfCtipOajqL4aq1ZX9RglKJX0uDe4BjLCOGZMVTd2_LTq7YWpWZuY_NUJLYvpqf6lrp8q2GdgizbZw" }}
              style={styles.promoImage}
              contentFit="cover"
            />
            <LinearGradient
              colors={['transparent', theme.surface]}
              style={styles.promoGradient}
            />
            <View style={styles.promoContent}>
              <Text style={[styles.promoLabel, { color: theme.primaryDim }]}>NEW ARRIVAL</Text>
              <Text style={[styles.promoTitle, { color: theme.text }]}>Emerald Series 2024</Text>
            </View>
          </View>

          <View style={styles.featuresRow}>
            <View style={[styles.featureBox, { backgroundColor: theme.surfaceContainer }]}>
              <MaterialIcons name="verified" size={24} color={theme.primary} style={{ marginBottom: 8 }} />
              <Text style={[styles.featureText, { color: theme.text }]}>CURATED{'\n'}AUTHENTICITY</Text>
            </View>
            <View style={[styles.featureBox, { backgroundColor: theme.surfaceContainer }]}>
              <MaterialIcons name="local-shipping" size={24} color={theme.primary} style={{ marginBottom: 8 }} />
              <Text style={[styles.featureText, { color: theme.text }]}>GLOBAL{'\n'}EXHIBITION</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.icon }]}>
            By continuing, you agree to Expo Shop's{'\n'}
            <Text style={[styles.footerLink, { color: theme.text, textDecorationColor: theme.primaryDim }]}>Terms of Service</Text>
            {' and '}
            <Text style={[styles.footerLink, { color: theme.text, textDecorationColor: theme.primaryDim }]}>Privacy Policy</Text>.
          </Text>
        </View>
      </ScrollView>
      
      <LinearGradient 
        colors={['transparent', 'rgba(115,255,188,0.2)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.bottomDecorativeLine}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  headerSafeArea: {
    paddingTop: Platform.OS === 'android' ? 32 : 0,
  },
  headerContent: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 20,
    letterSpacing: -0.5,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 120, // To avoid header overlap
    paddingBottom: 60,
    paddingHorizontal: 24,
  },
  heroSection: {
    marginBottom: 40,
  },
  title: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 36,
    letterSpacing: -1,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  authCard: {
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    shadowColor: '#73ffbc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 40,
    elevation: 3, 
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  socialText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginLeft: 12,
  },
  promoGrid: {
    marginTop: 48,
    gap: 16,
  },
  promoImageContainer: {
    width: '100%',
    height: 128,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  promoImage: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  promoGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  promoContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  promoLabel: {
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
    letterSpacing: 2.4, // 0.2em
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  promoTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    lineHeight: 22,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 16,
  },
  featureBox: {
    flex: 1,
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight: 14,
  },
  footer: {
    marginTop: 48,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 18,
  },
  footerLink: {
    textDecorationLine: 'underline',
  },
  bottomDecorativeLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
  }
});
