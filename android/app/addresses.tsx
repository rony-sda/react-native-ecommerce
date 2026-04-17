import React from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Platform, 
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

// ─── Address Card Component ──────────────────────────────────────────────────

interface AddressCardProps {
  tag: string;
  name: string;
  address: string;
  phone: string;
  isDefault?: boolean;
}

const AddressCard = ({ tag, name, address, phone, isDefault }: AddressCardProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];

  return (
    <View style={[styles.card, { backgroundColor: theme.surfaceContainer }]}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={[styles.tagBadge, { backgroundColor: theme.primary + '1A' }]}>
            <Text style={[styles.tagText, { color: theme.primary }]}>{tag.toUpperCase()}</Text>
          </View>
          {isDefault && (
            <MaterialIcons name="verified" size={18} color={theme.primary} />
          )}
        </View>

        <Text style={[styles.cardName, { color: theme.text }]}>{name}</Text>
        <Text style={[styles.cardAddress, { color: theme.icon }]} numberOfLines={2}>
          {address}
        </Text>
        
        <View style={styles.cardFooter}>
          <View style={styles.phoneWrapper}>
            <MaterialIcons name="phone" size={14} color={theme.icon} />
            <Text style={[styles.phoneText, { color: theme.icon }]}>{phone}</Text>
          </View>
          
          <View style={styles.actionRow}>
            <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: theme.surfaceHigh }]}
                onPress={() => Alert.alert('Edit', `Editing address for ${name}...`)}
            >
              <MaterialIcons name="edit" size={18} color={theme.primary} />
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: theme.surfaceHigh }]}
                onPress={() => Alert.alert('Delete', `Deleting address for ${name}...`)}
            >
              <MaterialIcons name="delete-outline" size={18} color={theme.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

// ─── Main Screen ─────────────────────────────────────────────────────────────

export default function SavedAddressesScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      {/* Decorative Glows */}
      <View style={[styles.glowTop, { backgroundColor: theme.primary + '0D' }]} />
      <View style={[styles.glowBottom, { backgroundColor: theme.primary + '0D' }]} />

      {/* Top Bar */}
      <View style={styles.appBar}>
        <BlurView intensity={80} style={StyleSheet.absoluteFill} tint={colorScheme === 'dark' ? 'dark' : 'light'} />
        <SafeAreaView edges={['top']} style={styles.safeAreaHeader}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
                <MaterialIcons name="arrow-back" size={24} color={theme.primary} />
              </TouchableOpacity>
              <Text style={[styles.headerTitle, { color: theme.primary }]}>SAVED ADDRESSES</Text>
            </View>
            <TouchableOpacity style={styles.iconButton} onPress={() => Alert.alert('Add New', 'Opening new address form...')}>
              <MaterialIcons name="add-location-alt" size={24} color={theme.primary} />
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
          <Text style={[styles.heroLabel, { color: theme.primaryDim }]}>LOGISTICS</Text>
          <Text style={[styles.heroTitle, { color: theme.text }]}>Delivery Points</Text>
          <Text style={[styles.heroSubtitle, { color: theme.icon }]}>
            Manage your saved locations for faster checkout and precise shipping.
          </Text>
        </View>

        {/* Address List */}
        <View style={styles.addressList}>
          <AddressCard 
            tag="Home"
            name="Alex Rivers"
            address="142 Emerald Street, Suite 502, Green District, NY 10012"
            phone="+1 (555) 902-1422"
            isDefault={true}
          />

          <AddressCard 
            tag="Work"
            name="Alex Rivers (Tech Solutions)"
            address="888 Azure Plaza, Floor 14, Financial District, NY 10005"
            phone="+1 (555) 888-0091"
          />

          {/* New Address CTA */}
          <TouchableOpacity 
            style={[styles.newAddressCard, { borderColor: theme.surfaceHigh }]} 
            activeOpacity={0.7}
            onPress={() => Alert.alert('Add New', 'Opening new address form...')}
          >
            <View style={[styles.newAddressIconBox, { backgroundColor: theme.surfaceHigh }]}>
              <MaterialIcons name="add" size={32} color={theme.primary} />
            </View>
            <Text style={[styles.newAddressTitle, { color: theme.text }]}>Add New Location</Text>
            <Text style={[styles.newAddressSubtitle, { color: theme.icon }]}>
              Securely save a new shipping or billing address.
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  glowTop: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  glowBottom: {
    position: 'absolute',
    bottom: -100,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
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
    letterSpacing: 1.5,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  scrollContent: {
    paddingTop: 120,
    paddingHorizontal: 24,
  },
  heroSection: {
    marginBottom: 40,
    paddingLeft: 4,
  },
  heroLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    letterSpacing: 3,
    marginBottom: 4,
  },
  heroTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 36,
    letterSpacing: -1.5,
    marginBottom: 12,
  },
  heroSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 22,
    maxWidth: '85%',
  },
  addressList: {
    gap: 20,
  },
  card: {
    borderRadius: 28,
    padding: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tagBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    letterSpacing: 1,
  },
  cardName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    marginBottom: 6,
  },
  cardAddress: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
    opacity: 0.8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  phoneWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  phoneText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newAddressCard: {
    marginTop: 20,
    alignItems: 'center',
    padding: 32,
    borderRadius: 28,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  newAddressIconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  newAddressTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    marginBottom: 6,
  },
  newAddressSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.6,
    maxWidth: '70%',
  }
});
