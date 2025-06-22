import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, Globe } from 'lucide-react-native';
import { useState } from 'react';

interface Suggestion {
  id: string;
  question: string;
  questionGurmukhi?: string;
}

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const suggestions: Suggestion[] = [
  {
    id: '1',
    question: 'What is the significance of Japji Sahib?',
    questionGurmukhi: 'ਜਪੁਜੀ ਸਾਹਿਬ ਦਾ ਕੀ ਮਹੱਤਵ ਹੈ?',
  },
  {
    id: '2',
    question: 'Explain the meaning of Waheguru',
    questionGurmukhi: 'ਵਾਹਿਗੁਰੂ ਦਾ ਅਰਥ ਦੱਸੋ',
  },
  {
    id: '3',
    question: 'How should I start my spiritual journey?',
    questionGurmukhi: 'ਮੈਂ ਆਪਣੀ ਰੂਹਾਨੀ ਯਾਤਰਾ ਕਿਵੇਂ ਸ਼ੁਰੂ ਕਰਾਂ?',
  },
];

export default function TeacherScreen() {
  const [inputText, setInputText] = useState('');
  const [isGurmukhi, setIsGurmukhi] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Japji Sahib holds significant spiritual importance as the foundational composition of the Sikh faith.',
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: 'Thank you for your question. Let me help you understand this spiritual concept better.',
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleSuggestionPress = (suggestion: Suggestion) => {
    setInputText(suggestion.question);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Teacher</Text>
        <TouchableOpacity 
          style={styles.languageToggle}
          onPress={() => setIsGurmukhi(!isGurmukhi)}
        >
          <Globe size={20} color="#10b981" />
          <Text style={styles.languageText}>
            {isGurmukhi ? 'ਪੰਜਾਬੀ' : 'EN'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.guruSection}>
        <View style={styles.guruAvatar}>
          <View style={styles.guruImage}>
            <View style={styles.turban} />
            <View style={styles.face} />
            <View style={styles.beard} />
          </View>
        </View>
      </View>

      <KeyboardAvoidingView 
        style={styles.contentContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.chatContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.suggestionsSection}>
            <Text style={styles.suggestionsTitle}>Suggestions</Text>
            {suggestions.map((suggestion) => (
              <TouchableOpacity
                key={suggestion.id}
                style={styles.suggestionCard}
                onPress={() => handleSuggestionPress(suggestion)}
              >
                <Text style={styles.suggestionText}>
                  {isGurmukhi && suggestion.questionGurmukhi 
                    ? suggestion.questionGurmukhi 
                    : suggestion.question}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.messagesContainer}>
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageContainer,
                  message.isUser ? styles.userMessage : styles.aiMessage,
                ]}
              >
                <Text style={[
                  styles.messageText,
                  message.isUser ? styles.userMessageText : styles.aiMessageText,
                ]}>
                  {message.text}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder={isGurmukhi ? 'ਇੱਥੇ ਲਿਖੋ...' : 'Text here...'}
            placeholderTextColor="#9ca3af"
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Send size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  languageToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  languageText: {
    color: '#10b981',
    marginLeft: 4,
    fontWeight: '600',
  },
  guruSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  guruAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guruImage: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  turban: {
    width: 80,
    height: 50,
    backgroundColor: '#f59e0b',
    borderRadius: 40,
    position: 'absolute',
    top: 0,
    left: 10,
  },
  face: {
    width: 60,
    height: 60,
    backgroundColor: '#d2b48c',
    borderRadius: 30,
    position: 'absolute',
    top: 25,
    left: 20,
  },
  beard: {
    width: 40,
    height: 30,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    position: 'absolute',
    top: 60,
    left: 30,
  },
  contentContainer: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  suggestionsSection: {
    marginBottom: 20,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  suggestionCard: {
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  suggestionText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  messagesContainer: {
    marginBottom: 20,
  },
  messageContainer: {
    marginBottom: 12,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#10b981',
    borderRadius: 16,
    borderBottomRightRadius: 4,
    padding: 12,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    padding: 12,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#ffffff',
  },
  aiMessageText: {
    color: '#d1d5db',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 16,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
  },
});