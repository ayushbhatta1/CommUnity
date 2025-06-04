import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowDownUp } from 'lucide-react-native';
import Header from '@/components/Header';
import LanguageSelector from '@/components/LanguageSelector';
import Colors from '@/constants/Colors';

export default function TranslateScreen() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('English');
  const [targetLanguage, setTargetLanguage] = useState('Spanish');

  const handleTranslate = () => {
    // Mock translation - in a real app, this would call a translation API
    if (sourceText) {
      setTranslatedText(
        sourceText.length > 0 
          ? `This is a simulated translation from ${sourceLanguage} to ${targetLanguage}.`
          : ''
      );
    }
  };

  const swapLanguages = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  return (
    <View style={styles.container}>
      <Header title="Translate" showBackButton={false} />

      <ScrollView style={styles.content}>
        <View style={styles.languageSelectors}>
          <LanguageSelector
            language={sourceLanguage}
            onPress={() => console.log('Select source language')}
            style={styles.sourceLanguage}
          />
          
          <TouchableOpacity style={styles.swapButton} onPress={swapLanguages}>
            <ArrowDownUp size={18} color={Colors.primary[600]} />
          </TouchableOpacity>
          
          <LanguageSelector
            language={targetLanguage}
            onPress={() => console.log('Select target language')}
            style={styles.targetLanguage}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter text to translate..."
            placeholderTextColor={Colors.gray[400]}
            multiline
            value={sourceText}
            onChangeText={setSourceText}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity 
          style={styles.translateButton}
          onPress={handleTranslate}
          disabled={!sourceText}
        >
          <Text style={styles.translateButtonText}>Translate</Text>
        </TouchableOpacity>

        {translatedText ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Translation</Text>
            <View style={styles.translatedTextContainer}>
              <Text style={styles.translatedText}>{translatedText}</Text>
            </View>
          </View>
        ) : null}

        <View style={styles.featureSection}>
          <Text style={styles.featureTitle}>Document Translation</Text>
          <TouchableOpacity style={styles.documentButton}>
            <Text style={styles.documentButtonText}>Upload Document</Text>
          </TouchableOpacity>
          <Text style={styles.featureDescription}>
            Translate forms, documents, and other important papers to help you understand and fill them out.
          </Text>
        </View>

        <View style={styles.featureSection}>
          <Text style={styles.featureTitle}>Conversation Mode</Text>
          <TouchableOpacity style={styles.conversationButton}>
            <Text style={styles.conversationButtonText}>Start Conversation</Text>
          </TouchableOpacity>
          <Text style={styles.featureDescription}>
            Have a real-time translated conversation for appointments, interviews, or everyday communication.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  languageSelectors: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sourceLanguage: {
    flex: 2,
  },
  targetLanguage: {
    flex: 2,
  },
  swapButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.gray[200],
    borderRadius: 8,
    backgroundColor: Colors.gray[50],
    height: 120,
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: Colors.gray[900],
  },
  translateButton: {
    backgroundColor: Colors.primary[600],
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  translateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.gray[700],
  },
  translatedTextContainer: {
    borderWidth: 1,
    borderColor: Colors.gray[200],
    borderRadius: 8,
    backgroundColor: Colors.gray[50],
    padding: 12,
  },
  translatedText: {
    fontSize: 16,
    color: Colors.gray[900],
  },
  featureSection: {
    backgroundColor: Colors.gray[50],
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: Colors.gray[800],
  },
  documentButton: {
    backgroundColor: Colors.secondary[600],
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  documentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  conversationButton: {
    backgroundColor: Colors.accent[500],
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  conversationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  featureDescription: {
    fontSize: 14,
    color: Colors.gray[600],
    lineHeight: 20,
  },
});