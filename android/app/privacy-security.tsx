import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Switch, Platform, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

export default function PrivacySecurityScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];
  
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(true);

  const handleNavigation = (label: string) => {
    Alert.alert(label, `This would navigate to the ${label} screen.`);
  };

  const openLink = async (label: string) => {
    Alert.alert('Legal', `Opening ${label}...`);
    // In a real app, use Linking.openURL or WebBrowser
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Account Deletion',
      'This will permanently erase all your data. Are you sure you want to proceed?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Request Sent', 'Your deletion request is being processed.') }
      ]
    );
  };

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
            <Text style={[styles.headerTitle, { color: theme.text }]}>PRIVACY & SECURITY</Text>
            <View style={{ width: 40 }} /> {/* Spacer */}
          </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Security Overview Bento Card */}
        <View style={[styles.bentoCard, { backgroundColor: theme.surfaceContainer, borderColor: theme.border + '20' }]}>
          <View style={styles.bentoContent}>
            <View style={styles.statusBadge}>
              <MaterialIcons name="verified-user" size={14} color={theme.primary} />
              <Text style={[styles.statusText, { color: theme.primary }]}>SECURITY STATUS</Text>
            </View>
            <Text style={[styles.bentoTitle, { color: theme.text }]}>Your account is secured</Text>
            <Text style={[styles.bentoDescription, { color: theme.icon }]}>
              We've detected no unusual activity. Your data is protected with 256-bit encryption.
            </Text>
          </View>
          <View style={styles.bentoIconBackground}>
            <MaterialCommunityIcons name="shield-check-outline" size={160} color={theme.primary} style={{ opacity: 0.05 }} />
          </View>
        </View>

        {/* Account Security Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.icon }]}>ACCOUNT SECURITY</Text>
            <View style={[styles.sectionDivider, { backgroundColor: theme.border + '30' }]} />
          </View>
          
          <View style={styles.menuGroup}>
            {/* 2FA Toggle */}
            <View style={[styles.menuItem, { backgroundColor: theme.surfaceContainer }]}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.iconBox, { backgroundColor: theme.surfaceHigh }]}>
                  <MaterialIcons name="vibration" size={20} color={theme.primary} />
                </View>
                <View>
                  <Text style={[styles.menuLabel, { color: theme.text }]}>Two-factor authentication</Text>
                  <Text style={[styles.menuSublabel, { color: theme.icon }]}>Add an extra layer of security</Text>
                </View>
              </View>
              <Switch 
                value={is2FAEnabled} 
                onValueChange={setIs2FAEnabled}
                trackColor={{ false: theme.surfaceHigh, true: theme.primaryDim }}
                thumbColor={is2FAEnabled ? theme.primary : '#f4f3f4'}
              />
            </View>

            {/* Change Password */}
            <TouchableOpacity 
              style={[styles.menuItem, { backgroundColor: theme.surfaceContainer }]}
              onPress={() => handleNavigation('Change Password')}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.iconBox, { backgroundColor: theme.surfaceHigh }]}>
                  <MaterialIcons name="key" size={20} color={theme.primary} />
                </View>
                <View>
                  <Text style={[styles.menuLabel, { color: theme.text }]}>Change Password</Text>
                  <Text style={[styles.menuSublabel, { color: theme.icon }]}>Update your secure passphrase</Text>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={theme.icon} />
            </TouchableOpacity>

            {/* Biometric Toggle */}
            <View style={[styles.menuItem, { backgroundColor: theme.surfaceContainer }]}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.iconBox, { backgroundColor: theme.surfaceHigh }]}>
                  <MaterialIcons name="fingerprint" size={20} color={theme.primary} />
                </View>
                <View>
                  <Text style={[styles.menuLabel, { color: theme.text }]}>Biometric Login</Text>
                  <Text style={[styles.menuSublabel, { color: theme.icon }]}>Use FaceID or Fingerprint</Text>
                </View>
              </View>
              <Switch 
                value={isBiometricEnabled} 
                onValueChange={setIsBiometricEnabled}
                trackColor={{ false: theme.surfaceHigh, true: theme.primaryDim }}
                thumbColor={isBiometricEnabled ? theme.primary : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* Data & Privacy Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.icon }]}>DATA & PRIVACY</Text>
            <View style={[styles.sectionDivider, { backgroundColor: theme.border + '30' }]} />
          </View>
          
          <View style={styles.menuGroup}>
            {[
              { icon: 'database', label: 'Data Usage', sub: 'Manage how we use your information', iconLib: 'MaterialCommunityIcons' },
              { icon: 'hub', label: 'Third-party access', sub: 'Apps with access to your profile', iconLib: 'MaterialIcons' },
              { icon: 'mail', label: 'Marketing Preferences', sub: 'Newsletter and promo settings', iconLib: 'MaterialIcons' },
            ].map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.menuItem, { backgroundColor: theme.surfaceContainer }]}
                onPress={() => handleNavigation(item.label)}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconBox, { backgroundColor: theme.surfaceHigh }]}>
                    {item.iconLib === 'MaterialIcons' ? (
                      <MaterialIcons name={item.icon as any} size={20} color={theme.primary} />
                    ) : (
                      <MaterialCommunityIcons name={item.icon as any} size={20} color={theme.primary} />
                    )}
                  </View>
                  <View>
                    <Text style={[styles.menuLabel, { color: theme.text }]}>{item.label}</Text>
                    <Text style={[styles.menuSublabel, { color: theme.icon }]}>{item.sub}</Text>
                  </View>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={theme.icon} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Legal Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.icon }]}>LEGAL</Text>
            <View style={[styles.sectionDivider, { backgroundColor: theme.border + '30' }]} />
          </View>
          
          <View style={styles.menuGroup}>
            {[
              { label: 'Terms of Service', sub: 'Last updated Oct 2023', icon: 'description' },
              { label: 'Privacy Policy', sub: 'Our commitment to your data', icon: 'policy' },
            ].map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.menuItem, { backgroundColor: theme.surfaceContainer }]}
                onPress={() => openLink(item.label)}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconBox, { backgroundColor: theme.surfaceHigh }]}>
                    <MaterialIcons name={item.icon as any} size={20} color={theme.primary} />
                  </View>
                  <View>
                    <Text style={[styles.menuLabel, { color: theme.text }]}>{item.label}</Text>
                    <Text style={[styles.menuSublabel, { color: theme.icon }]}>{item.sub}</Text>
                  </View>
                </View>
                <MaterialIcons name="open-in-new" size={18} color={theme.icon} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.dangerZone}>
          <View style={[styles.dangerCard, { backgroundColor: 'rgba(215, 56, 59, 0.05)', borderColor: 'rgba(215, 56, 59, 0.2)' }]}>
            <Text style={styles.dangerTitle}>Request Account Deletion</Text>
            <Text style={[styles.dangerDescription, { color: theme.icon }]}>
              This will permanently erase all your data and purchase history from our servers.
            </Text>
            <TouchableOpacity onPress={handleDeleteAccount}>
              <Text style={styles.dangerAction}>START REQUEST</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 60 }} />

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
  iconButton: {
    padding: 8,
    borderRadius: 20,
    marginLeft: -8,
  },
  scrollContent: {
    paddingTop: 120,
    paddingHorizontal: 24,
  },
  bentoCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  bentoContent: {
    position: 'relative',
    zIndex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  statusText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    letterSpacing: 1.5,
  },
  bentoTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 24,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  bentoDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 20,
    maxWidth: '80%',
  },
  bentoIconBackground: {
    position: 'absolute',
    right: -20,
    bottom: -40,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11,
    letterSpacing: 2,
  },
  sectionDivider: {
    flex: 1,
    height: 1,
  },
  menuGroup: {
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
  },
  menuItemLeft: {
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
  menuLabel: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 15,
    marginBottom: 2,
  },
  menuSublabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    opacity: 0.8,
  },
  dangerZone: {
    marginTop: 8,
  },
  dangerCard: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    alignItems: 'center',
  },
  dangerTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    color: '#d7383b',
    marginBottom: 8,
  },
  dangerDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  dangerAction: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#d7383b',
    letterSpacing: 1.5,
  }
});
