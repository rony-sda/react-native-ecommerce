import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface VirtualCardProps {
  cardholderName?: string;
  cardNumber?: string;
  expiryDate?: string;
  cardType?: 'VISA' | 'MASTERCARD';
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;
const CARD_ASPECT_RATIO = 1.586;
const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;

export const VirtualCard = ({ 
  cardholderName = 'JOHN DOE', 
  cardNumber = '**** **** **** ****', 
  expiryDate = 'MM/YY',
  cardType = 'VISA'
}: VirtualCardProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];

  return (
    <View style={[styles.container, { height: CARD_HEIGHT }]}>
      <LinearGradient
        colors={[theme.surfaceHigh, theme.surfaceContainer]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Decorative blur orb (simulated with a colored view and opacity) */}
        <View style={[styles.orb, { backgroundColor: theme.primary + '1a' }]} />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <MaterialIcons name="contactless" size={32} color={theme.primaryDim + '99'} />
            <Text style={[styles.cardTypeText, { color: theme.icon }]}>{cardType}</Text>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.cardNumberText, { color: theme.text }]}>
              {cardNumber || '**** **** **** ****'}
            </Text>
            
            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, { color: theme.icon }]}>CARDHOLDER</Text>
                <Text style={[styles.detailValue, { color: theme.text }]} numberOfLines={1}>
                  {cardholderName.toUpperCase() || 'JOHN DOE'}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, { color: theme.icon }]}>EXPIRES</Text>
                <Text style={[styles.detailValue, { color: theme.text }]}>
                  {expiryDate || 'MM/YY'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#73ffbc',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  gradient: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  orb: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTypeText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  footer: {
    gap: 20,
  },
  cardNumberText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 22,
    letterSpacing: 4,
    opacity: 0.8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  detailItem: {
    gap: 4,
  },
  detailLabel: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    letterSpacing: 1.5,
  },
  detailValue: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    maxWidth: 180,
  },
});
