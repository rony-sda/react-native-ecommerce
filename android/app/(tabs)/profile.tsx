import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];

  const handlePress = (target: string) => {
    if (target === 'addresses') {
      router.push('/addresses');
    } else if (target === 'privacy') {
      router.push('/privacy-security');
    } else if (target === 'notifications') {
      router.push('/notifications');
    } else if (target === 'help') {
      router.push('/help-support');
    }
    // Other routes can be added here
  };

  const menuItems = [
    { icon: 'shopping-bag', label: 'My Orders', target: 'orders', iconType: 'Material' },
    { icon: 'location-on', label: 'Shipping Addresses', target: 'addresses', iconType: 'Material' },
    { icon: 'credit-card', label: 'Payment Methods', target: 'payments', iconType: 'Material' },
    { icon: 'notifications', label: 'Notifications', target: 'notifications', iconType: 'Material' },
    { icon: 'info', label: 'Help & Support', target: 'help', iconType: 'Material' },
    { icon: 'privacy-tip', label: 'Privacy & Security', target: 'privacy', iconType: 'Material' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      {/* Top Bar / App Bar */}
      <View style={styles.appBar}>
        <BlurView intensity={80} style={StyleSheet.absoluteFill} tint={colorScheme === 'dark' ? 'dark' : 'light'} />
        <SafeAreaView edges={['top']} style={styles.safeAreaHeader}>
          <View style={styles.headerContent}>
            <Text style={[styles.headerTitle, { color: theme.primary }]}>MY PROFILE</Text>
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
        {/* Profile Header Card */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
             <LinearGradient
                colors={[theme.primary, 'transparent']}
                style={styles.avatarGlow}
             />
             <Image 
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/ALiY37I_dMubXUvR3YqL4q5q5q5q5q5q5q5q5q5q" || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" }}
                style={styles.avatar}
                contentFit="cover"
             />
             <TouchableOpacity style={[styles.editBadge, { backgroundColor: theme.primary }]}>
                <MaterialIcons name="edit" size={14} color={theme.background} />
             </TouchableOpacity>
          </View>

          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: theme.text }]}>Alex Rivers</Text>
            <View style={styles.membershipBadge}>
              <Text style={[styles.membershipText, { color: theme.primary }]}>ELITE MEMBER</Text>
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.8}>
            <LinearGradient
              colors={[theme.primary, theme.primaryDim]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.editButton}
            >
              <Text style={[styles.editButtonText, { color: theme.background }]}>COMPLETE PROFILE</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Dashboard Stats */}
        <View style={styles.statsContainer}>
          {[
            { label: 'Orders', value: '12', icon: 'package-variant' },
            { label: 'Wishlist', value: '48', icon: 'heart-outline' },
            { label: 'Points', value: '2.5k', icon: 'star-outline' }
          ].map((stat, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.statCard, { backgroundColor: theme.surfaceContainer }]}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name={stat.icon as any} size={20} color={theme.primary} />
              <Text style={[styles.statValue, { color: theme.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: theme.icon }]}>{stat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Account Settings List */}
        <View style={styles.menuContainer}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>ACCOUNT SETTINGS</Text>
          
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.menuItem, { borderBottomWidth: 0 }]}
              activeOpacity={0.6}
              onPress={() => handlePress(item.target)}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.iconWrapper, { backgroundColor: theme.surfaceHigh }]}>
                    <MaterialIcons name={item.icon as any} size={20} color={theme.primary} />
                </View>
                <Text style={[styles.menuLabel, { color: theme.text }]}>{item.label}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={theme.icon} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Preferences / Toggles */}
        <View style={styles.menuContainer}>
            <Text style={[styles.sectionTitle, { color: theme.primary }]}>PREFERENCES</Text>
            
            <View style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                    <View style={[styles.iconWrapper, { backgroundColor: theme.surfaceHigh }]}>
                        <Ionicons name="moon-outline" size={20} color={theme.primary} />
                    </View>
                    <Text style={[styles.menuLabel, { color: theme.text }]}>Dark Mode</Text>
                </View>
                <Switch 
                    value={colorScheme === 'dark'} 
                    trackColor={{ false: '#767577', true: theme.primary }}
                    thumbColor={Platform.OS === 'ios' ? undefined : '#f4f3f4'}
                />
            </View>
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
            <Text style={[styles.logoutText, { color: theme.icon }]}>SIGN OUT</Text>
        </TouchableOpacity>

        <Text style={[styles.versionText, { color: theme.icon }]}>Version 2.4.0</Text>

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
    paddingTop: 140,
    paddingBottom: 140,
    paddingHorizontal: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatarGlow: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 60,
    opacity: 0.15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgba(115, 255, 188, 0.2)',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#0e0e0e',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  userName: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 28,
    letterSpacing: -1,
    marginBottom: 4,
  },
  membershipBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(115, 255, 188, 0.3)',
  },
  membershipText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    letterSpacing: 1.5,
  },
  editButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#73ffbc',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
  },
  editButtonText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 13,
    letterSpacing: 1.5,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    marginTop: 8,
  },
  statLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    letterSpacing: 1,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  menuContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 16,
    opacity: 0.6,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(72, 72, 71, 0.2)',
    borderRadius: 12,
  },
  logoutText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    letterSpacing: 2,
  },
  versionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
    opacity: 0.4,
  }
});
