import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Switch
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { VirtualCard } from '@/components/VirtualCard';
import { EmeraldInput } from '@/components/EmeraldInput';
import { EmeraldButton } from '@/components/EmeraldButton';
import { LinearGradient } from 'expo-linear-gradient';

export default function AddPaymentMethodScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];

  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(true);

  // Simple formatting for card number (groups of 4)
  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  // Simple formatting for expiry date (MM/YY)
  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      {/* Glass Header */}
      <View style={styles.appBar}>
        <BlurView intensity={80} style={StyleSheet.absoluteFill} tint={colorScheme === 'dark' ? 'dark' : 'light'} />
        <SafeAreaView edges={['top']} style={styles.safeAreaHeader}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={24} color={theme.primary} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.text }]}>Add Payment Method</Text>
            <View style={styles.headerSpacer} />
          </View>
        </SafeAreaView>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Virtual Card Preview */}
          <View style={styles.cardPreviewContainer}>
            <VirtualCard 
              cardholderName={cardholderName || 'JOHN DOE'}
              cardNumber={cardholderName ? formatCardNumber(cardNumber) : '**** **** **** ****'}
              expiryDate={expiryDate || 'MM/YY'}
            />
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <EmeraldInput 
              label="Cardholder Name"
              placeholder="e.g. John Doe"
              value={cardholderName}
              onChangeText={setCardholderName}
              autoCapitalize="words"
            />

            <View style={styles.inputWithIcon}>
              <View style={styles.inputWrapper}>
                <EmeraldInput 
                  label="Card Number"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                  keyboardType="numeric"
                  maxLength={19}
                  style={{ paddingLeft: 36 }}
                />
                <View style={styles.leftIcon}>
                    <MaterialIcons name="lock" size={20} color={theme.icon + '80'} />
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <EmeraldInput 
                  label="Expiry Date"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>
              <View style={{ width: 16 }} />
              <View style={{ flex: 1 }}>
                <EmeraldInput 
                  label="CVV"
                  placeholder="123"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Save Card Toggle */}
            <View style={[styles.toggleContainer, { backgroundColor: theme.surfaceContainer }]}>
              <View>
                <Text style={[styles.toggleTitle, { color: theme.text }]}>Save card for future purchases</Text>
                <Text style={[styles.toggleSubtitle, { color: theme.icon }]}>Securely encrypted & stored</Text>
              </View>
              <Switch 
                value={saveCard}
                onValueChange={setSaveCard}
                trackColor={{ false: theme.surfaceHigh, true: theme.primary + '80' }}
                thumbColor={saveCard ? theme.primary : theme.icon}
                ios_backgroundColor={theme.surfaceHigh}
              />
            </View>
          </View>
          
          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Fixed Bottom Action Area */}
        <View style={styles.bottomAction}>
            <LinearGradient
                colors={['transparent', theme.surface]}
                style={styles.bottomGradient}
            />
            <EmeraldButton 
                title="Add Card"
                onPress={() => router.back()}
                style={styles.actionButton}
            />
        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    letterSpacing: -0.5,
  },
  headerSpacer: {
    width: 24,
  },
  scrollContent: {
    paddingTop: 120,
    paddingHorizontal: 24,
  },
  cardPreviewContainer: {
    marginBottom: 40,
  },
  formContainer: {
    gap: 4,
  },
  row: {
    flexDirection: 'row',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginTop: 12,
  },
  toggleTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    marginBottom: 2,
  },
  toggleSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  bottomAction: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomGradient: {
    position: 'absolute',
    top: -60,
    left: 0,
    right: 0,
    height: 60,
  },
  actionButton: {
    shadowColor: '#73ffbc',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 8,
  },
  inputWithIcon: {
      position: 'relative',
  },
  inputWrapper: {
      paddingLeft: 0,
  },
  leftIcon: {
      position: 'absolute',
      left: 16,
      top: 46, // Adjusted to align with EmeraldInput text
      zIndex: 1,
  }
});
