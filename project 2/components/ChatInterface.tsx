import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { Send } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type MessageType = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

export default function ChatInterface() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      text: 'Hello! I\'m CommUnity Assistant. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSend = () => {
    if (message.trim() === '') return;

    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate AI response (would call API in a real app)
    setTimeout(() => {
      let responseText = 'I\'m searching for resources to help you.';
      
      if (message.toLowerCase().includes('food')) {
        responseText = 'I found 3 food banks near you. The closest is Community Food Bank, about 1.2 miles away. They\'re open today until 6pm.';
      } else if (message.toLowerCase().includes('housing') || message.toLowerCase().includes('rent')) {
        responseText = 'For housing assistance, I recommend contacting the Housing Resource Center at (555) 123-4567. They offer emergency rent assistance and long-term housing solutions.';
      } else if (message.toLowerCase().includes('job') || message.toLowerCase().includes('work')) {
        responseText = 'There are 15 entry-level positions within 5 miles of you. Would you like me to show you the most recent listings?';
      }

      const botMessage: MessageType = {
        id: Date.now().toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          }],
        },
      ]}
    >
      <Text style={styles.title}>Ask for Help</Text>
      
      <View style={styles.chatContainer}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.isUser ? styles.userBubble : styles.assistantBubble,
              ]}
            >
              <Text style={[styles.messageText, msg.isUser ? styles.userText : styles.assistantText]}>
                {msg.text}
              </Text>
            </View>
          ))}
        </ScrollView>
        
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Ask about resources, jobs, or help..."
              placeholderTextColor={Colors.gray[400]}
              multiline
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                !message.trim() && styles.disabledButton,
              ]}
              onPress={handleSend}
              disabled={!message.trim()}
            >
              <Send size={18} color={!message.trim() ? Colors.gray[400] : '#fff'} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: Colors.gray[800],
  },
  chatContainer: {
    borderWidth: 1,
    borderColor: Colors.gray[200],
    borderRadius: 12,
    backgroundColor: Colors.gray[50],
    overflow: 'hidden',
  },
  messagesContainer: {
    maxHeight: 280,
  },
  messagesContent: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 8,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary[600],
    borderTopRightRadius: 4,
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: 'white',
  },
  assistantText: {
    color: Colors.gray[800],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    backgroundColor: Colors.gray[100],
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingRight: 48,
    fontSize: 15,
    color: Colors.gray[900],
    maxHeight: 100,
  },
  sendButton: {
    position: 'absolute',
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.gray[300],
  },
});