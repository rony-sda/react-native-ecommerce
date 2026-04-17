import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Address {
  id: string;
  label: string;
  subtitle: string;
  icon: string;
  street: string;
  city: string;
  phone: string;
  isPrimary?: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const INITIAL_ADDRESSES: Address[] = [
  {
    id: '1',
    label: 'Home',
    subtitle: 'Primary Address',
    icon: 'home',
    street: '4522 Emerald Heights Blvd, Suite 400',
    city: 'Silicon Valley, CA 94025',
    phone: '+1 (555) 012-3456',
    isPrimary: true,
  },
  {
    id: '2',
    label: 'Office',
    subtitle: 'Corporate HQ',
    icon: 'briefcase',
    street: 'Infinite Loop 1, Apple Park Way',
    city: 'Cupertino, CA 95014',
    phone: '+1 (555) 987-6543',
  },
  {
    id: '3',
    label: 'Gym',
    subtitle: 'Daily Routine',
    icon: 'dumbbell',
    street: '888 Iron Gate Lane, Fitness District',
    city: 'Los Angeles, CA 90001',
    phone: '+1 (555) 246-8135',
  },
];

// ─── Colors ───────────────────────────────────────────────────────────────────

export default function SavedAddressesScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);

// ─── AddressCard Component ────────────────────────────────────────────────────

interface AddressCardProps {
  address: Address;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  theme: typeof theme;
}

const AddressCard: React.FC<AddressCardProps> = ({ address, onEdit, onDelete, theme }) => {
  return (
    <View style={[styles.card, { backgroundColor: theme.surfaceContainer }, address.isPrimary && styles.cardPrimary]}>
      {/* Header row */}
      <View style={styles.cardHeader}>
        <View style={styles.cardLeft}>
          <View
            style={[
              styles.iconBox,
              { backgroundColor: theme.surfaceHigh },
              address.isPrimary && styles.iconBoxPrimary,
            ]}
          >
            <MaterialCommunityIcons
              name={address.icon as any}
              size={20}
              color={address.isPrimary ? theme.primary : theme.icon}
            />
          </View>
          <View>
            <Text style={[styles.cardLabel, { color: theme.text }]}>{address.label}</Text>
            <Text
              style={[
                styles.cardSubtitle,
                { color: theme.icon },
                address.isPrimary && styles.cardSubtitlePrimary,
              ]}
            >
              {address.subtitle}
            </Text>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: theme.surfaceHigh }]}
            onPress={() => onEdit(address.id)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="pencil-outline"
              size={18}
              color={theme.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: theme.surfaceHigh }]}
            onPress={() => onDelete(address.id)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="delete-outline"
              size={18}
              color={theme.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Address details */}
      <View style={styles.cardBody}>
        <Text style={[styles.addressText, { color: theme.icon }]}>
          {address.street}
          {'\n'}
          {address.city}
        </Text>
        <View style={styles.phoneRow}>
          <MaterialCommunityIcons name="phone-outline" size={13} color={theme.icon} />
          <Text style={[styles.phoneText, { color: theme.icon }]}>{address.phone}</Text>
        </View>
      </View>
    </View>
  );
};



  const handleEdit = (id: string) => {
    Alert.alert('Edit', `Editing address ${id}`);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to remove this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            setAddresses((prev) => prev.filter((a) => a.id !== id)),
        },
      ]
    );
  };

  const handleAddNew = () => {
    Alert.alert('Add Address', 'Open add address form');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      {/* TopAppBar */}
      <View style={styles.appBar}>
        <BlurView intensity={80} style={StyleSheet.absoluteFill} tint={colorScheme === 'dark' ? 'dark' : 'light'} />
        <SafeAreaView edges={['top']} style={styles.safeAreaHeader}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} activeOpacity={0.7}>
                <MaterialIcons name="arrow-back" size={24} color={theme.primary} />
              </TouchableOpacity>
              <Text style={[styles.headerTitle, { color: theme.primary }]}>SAVED ADDRESSES</Text>
            </View>
            <TouchableOpacity style={styles.iconButton} onPress={handleAddNew} activeOpacity={0.7}>
              <MaterialIcons name="add" size={24} color={theme.primary} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={[styles.heroKicker, { color: theme.primary }]}>DELIVERY DESTINATIONS</Text>
          <Text style={[styles.heroTitle, { color: theme.text }]}>YOUR </Text>
          <View style={styles.gradientTextContainer}>
            <Text style={[styles.heroTitleHighlight, { color: theme.primary }]}>LOCATIONS</Text>
          </View>
          <Text style={[styles.heroSubtitle, { color: theme.icon }]}>
            {addresses.length} saved addresses for seamless delivery.
          </Text>
        </View>

        {/* Address Cards */}
        <View style={styles.listContainer}>
          {addresses.map((addr) => (
            <AddressCard
              key={addr.id}
              address={addr}
              onEdit={handleEdit}
              onDelete={handleDelete}
              theme={theme}
            />
          ))}
        </View>

        {/* Add New CTA Button */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={handleAddNew}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[theme.primary, theme.primaryDim]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaGradient}
          >
            <MaterialIcons name="add" size={20} color={theme.background} />
            <Text style={[styles.ctaButtonText, { color: theme.background }]}>ADD NEW ADDRESS</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
    paddingBottom: 140,
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
    gap: 16,
  },
  card: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 0.5,
  },
  cardPrimary: {
    borderColor: 'rgba(115, 255, 188, 0.3)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxPrimary: {
    backgroundColor: 'rgba(115, 255, 188, 0.15)',
  },
  cardLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    letterSpacing: 1,
  },
  cardSubtitlePrimary: {
    color: '#73ffbc',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    padding: 8,
    borderRadius: 10,
  },
  cardBody: {
    gap: 8,
  },
  addressText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  phoneText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    opacity: 0.7,
  },
  ctaButton: {
    marginTop: 32,
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    paddingVertical: 16,
    shadowColor: '#73ffbc',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
  },
  ctaButtonText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 13,
    letterSpacing: 1.5,
  },
});