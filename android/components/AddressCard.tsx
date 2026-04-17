import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  isDefault?: boolean;
}

interface AddressCardProps {
  item: Address;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSetDefault?: (id: string) => void;
}

export const AddressCard = ({ item, onEdit, onDelete, onSetDefault }: AddressCardProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];

  return (
    <View style={[styles.addressCard, { backgroundColor: theme.surfaceContainer }]}>
      <View style={styles.cardHeader}>
        <View style={styles.labelWrapper}>
          <Text style={[styles.addressLabel, { color: theme.primary }]}>{item.label.toUpperCase()}</Text>
          {item.isDefault && (
            <View style={[styles.defaultBadge, { backgroundColor: 'rgba(115, 255, 188, 0.15)' }]}>
              <Text style={[styles.defaultText, { color: theme.primary }]}>DEFAULT</Text>
            </View>
          )}
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(item.id)}>
            <MaterialIcons name="edit" size={18} color={theme.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(item.id)}>
            <MaterialIcons name="delete-outline" size={18} color="#ff716c" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.addressInfo}>
        <Text style={[styles.userName, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.userPhone, { color: theme.icon }]}>{item.phone}</Text>
        <Text style={[styles.addressDetails, { color: theme.icon }]}>{item.address}</Text>
      </View>

      {!item.isDefault && onSetDefault && (
        <TouchableOpacity style={styles.setAsDefaultButton} onPress={() => onSetDefault(item.id)}>
          <Text style={[styles.setAsDefaultText, { color: theme.primary }]}>Set as Default</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addressCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addressLabel: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 12,
    letterSpacing: 1.5,
  },
  defaultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
    letterSpacing: 0.5,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  addressInfo: {
    gap: 4,
  },
  userName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  userPhone: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    marginBottom: 8,
  },
  addressDetails: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 22,
  },
  setAsDefaultButton: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(72, 72, 71, 0.1)',
  },
  setAsDefaultText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
});
