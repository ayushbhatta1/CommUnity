import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from '@/constants/Colors';

interface CategoryButtonProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function CategoryButton({ title, isSelected, onPress }: CategoryButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSelected ? styles.selectedButton : null,
      ]}
      onPress={onPress}
    >
      <Text 
        style={[
          styles.buttonText,
          isSelected ? styles.selectedButtonText : null,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.gray[100],
    marginRight: 8,
  },
  selectedButton: {
    backgroundColor: Colors.primary[600],
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray[700],
  },
  selectedButtonText: {
    color: '#fff',
  },
});