import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

export default function NotificationsScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];

  const [settings, setSettings] = useState({
    orderUpdates: true,
    promotions: false,
    newArrivals: true,
    securityAlerts: true,
    newsletter: false,
    flashSales: false,
  });

  const toggleSwitch = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const SectionHeader = ({ title, icon }: { title: string; icon: string }) => (
    <View style={styles.sectionHeader}>
      <MaterialIcons name={icon as any} size={14} color={theme.primary} />
      <Text style={[styles.sectionTitle, { color: theme.icon }]}>{title}</Text>
    </View>
  );

  const NotificationCard = ({ 
    icon, 
    label, 
    sublabel, 
    value, 
    onToggle 
  }: { 
    icon: string; 
    label: string; 
    sublabel: string; 
    value: boolean; 
    onToggle: () => void 
  }) => (
    <View style={[styles.card, { backgroundColor: theme.surfaceContainer }]}>
      <View style={styles.cardLeft}>
        <View style={[styles.iconBox, { backgroundColor: theme.surfaceHigh }]}>
          <MaterialIcons name={icon as any} size={20} color={theme.primaryDim} />
        </View>
        <View style={styles.cardText}>
          <Text style={[styles.cardLabel, { color: theme.text }]}>{label}</Text>
          <Text style={[styles.cardSublabel, { color: theme.icon }]}>{sublabel}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: theme.surfaceHigh, true: theme.primaryDim }}
        thumbColor={value ? theme.primary : '#f4f3f4'}
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      {/* Top Bar / App Bar */}
      <View style={styles.appBar}>
        <BlurView intensity={80} style={StyleSheet.absoluteFill} tint={colorScheme === 'dark' ? 'dark' : 'light'} />
        <SafeAreaView edges={['top']} style={styles.safeAreaHeader}>
          <View style={styles.headerContent}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
              <MaterialIcons name="arrow-back" size={24} color={theme.primary} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.text }]}>NOTIFICATIONS</Text>
            <Text style={[styles.brandText, { color: theme.primary }]}>Expo Shop</Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={[styles.heroTitle, { color: theme.text }]}>Alert{'\n'}
            <Text style={{ color: theme.primary }}>Preferences.</Text>
          </Text>
          <Text style={[styles.heroSubtitle, { color: theme.icon }]}>
            Tailor how you receive updates and maintain your focus in the emerald digital space.
          </Text>
        </View>

        {/* Push Notifications Section */}
        <View style={styles.section}>
          <SectionHeader title="PUSH NOTIFICATIONS" icon="notifications-active" />
          <View style={styles.cardGroup}>
            <NotificationCard 
              icon="local-shipping" 
              label="Order Updates" 
              sublabel="Real-time status of your purchases" 
              value={settings.orderUpdates}
              onToggle={() => toggleSwitch('orderUpdates')}
            />
            <NotificationCard 
              icon="sell" 
              label="Promotions" 
              sublabel="Exclusive deals and seasonal offers" 
              value={settings.promotions}
              onToggle={() => toggleSwitch('promotions')}
            />
            <NotificationCard 
              icon="new-releases" 
              label="New Arrivals" 
              sublabel="Be the first to see fresh drops" 
              value={settings.newArrivals}
              onToggle={() => toggleSwitch('newArrivals')}
            />
          </View>
        </View>

        {/* Email Notifications Section */}
        <View style={styles.section}>
          <SectionHeader title="EMAIL NOTIFICATIONS" icon="mail" />
          <View style={styles.cardGroup}>
            <NotificationCard 
              icon="security" 
              label="Security Alerts" 
              sublabel="Login activity and security tips" 
              value={settings.securityAlerts}
              onToggle={() => toggleSwitch('securityAlerts')}
            />
            <NotificationCard 
              icon="newspaper" 
              label="Newsletter" 
              sublabel="Weekly curation of shop stories" 
              value={settings.newsletter}
              onToggle={() => toggleSwitch('newsletter')}
            />
          </View>
        </View>

        {/* SMS Notifications Section */}
        <View style={styles.section}>
          <SectionHeader title="SMS NOTIFICATIONS" icon="chat-bubble" />
          <View style={styles.cardGroup}>
            <NotificationCard 
              icon="sms" 
              label="Flash Sales" 
              sublabel="High-speed alerts for limited drops" 
              value={settings.flashSales}
              onToggle={() => toggleSwitch('flashSales')}
            />
          </View>
        </View>

        {/* Decorative Privacy Card */}
        <View style={[styles.privacyCard, { backgroundColor: theme.surfaceHigh }]}>
          <View style={styles.privacyContent}>
            <Text style={[styles.privacyTitle, { color: theme.primary }]}>Privacy First</Text>
            <Text style={[styles.privacyDescription, { color: theme.icon }]}>
              We value your peace of mind. Your notification data is encrypted and used only to enhance your shopping experience.
            </Text>
          </View>
          <View style={[styles.abstractShape, { backgroundColor: theme.primary + '10' }]} />
        </View>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  brandText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 14,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    marginLeft: -8,
  },
  scrollContent: {
    paddingTop: 120,
    paddingHorizontal: 24,
  },
  heroSection: {
    marginBottom: 48,
  },
  heroTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 40,
    lineHeight: 46,
    letterSpacing: -1,
    marginBottom: 12,
  },
  heroSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 22,
    maxWidth: '85%',
    opacity: 0.8,
  },
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  cardGroup: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
  },
  cardLabel: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 15,
    marginBottom: 2,
  },
  cardSublabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    opacity: 0.8,
  },
  privacyCard: {
    borderRadius: 24,
    padding: 32,
    marginTop: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  privacyContent: {
    position: 'relative',
    zIndex: 1,
  },
  privacyTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 20,
    marginBottom: 8,
  },
  privacyDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 20,
    opacity: 0.9,
  },
  abstractShape: {
    position: 'absolute',
    right: -40,
    bottom: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
  }
});
