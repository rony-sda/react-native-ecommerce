import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text, TextInputProps } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface EmeraldInputProps extends TextInputProps {
  label: string;
  error?: string;
}

export const EmeraldInput = ({ label, error, ...props }: EmeraldInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'dark'];

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.icon }]}>
        {label}
      </Text>
      <View style={[
        styles.inputContainer,
        { backgroundColor: theme.inputBackground },
        isFocused && { 
          borderColor: theme.primary,
          borderWidth: 1,
          shadowColor: theme.primary,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 4
        },
        error ? { borderColor: '#ff716c', borderWidth: 1 } : {}
      ]}>
        <TextInput
          {...props}
          style={[styles.input, { color: theme.text }]}
          placeholderTextColor={theme.icon}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {error && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    marginBottom: 8,
  },
  inputContainer: {
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  input: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    flex: 1,
  },
  errorText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#ff716c',
    marginTop: 4,
  }
});
