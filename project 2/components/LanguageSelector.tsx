import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ViewStyle } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface LanguageSelectorProps {
  language: string;
  onPress: () => void;
  style?: ViewStyle;
}

export default function LanguageSelector({ language, onPress, style }: LanguageSelectorProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={onPress}
    >
      <Text style={styles.language}>{language}</Text>
      <ChevronDown size={16} color={Colors.gray[600]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.gray[100],
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  language: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.gray[800],
  },
});