import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface EmeraldButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  isLoading?: boolean;
  style?: ViewStyle;
}

export const EmeraldButton = ({ onPress, title, variant = 'primary', isLoading = false, style }: EmeraldButtonProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];

  if (variant === 'tertiary') {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.tertiaryContainer, style]} disabled={isLoading}>
        <Text style={[styles.tertiaryText, { color: theme.primary }]}>{title}</Text>
      </TouchableOpacity>
    );
  }

  if (variant === 'secondary') {
    return (
      <TouchableOpacity 
        onPress={onPress} 
        style={[styles.secondaryContainer, { borderColor: theme.border }, style]}
        disabled={isLoading}
      >
        <Text style={[styles.secondaryText, { color: theme.primary }]}>
          {isLoading ? 'Loading...' : title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.primaryContainer, style]} disabled={isLoading}>
      <LinearGradient
        colors={[theme.primary, theme.primaryDim]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {isLoading ? (
          <ActivityIndicator color={theme.surface} />
        ) : (
          <Text style={[styles.primaryText, { color: theme.surface }]}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 56,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
  },
  secondaryContainer: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  secondaryText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
  },
  tertiaryContainer: {
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tertiaryText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
