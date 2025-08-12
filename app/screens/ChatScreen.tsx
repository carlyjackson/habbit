import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation } from '@react-navigation/native';

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Button } from 'react-native-paper';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const defaultWelcomeMessage: Message = {
  role: 'assistant',
  content:
    "Hi there! 🐰 I'm Bun, your friendly habit helper! Ready to track your habbits and earn some tasty carrots? 🥕 What shall we do today?",
};

export default function ChatScreen() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([defaultWelcomeMessage]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        let storedSessionId = await AsyncStorage.getItem('sessionId');
        if (!storedSessionId) {
          storedSessionId = uuidv4();
          await AsyncStorage.setItem('sessionId', storedSessionId);
        }
        setSessionId(storedSessionId);
      } catch (error) {
        console.error('Error accessing AsyncStorage:', error);
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: input }),
      });
      const data = await response.json();
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.reply },
        ]);
      } else if (data.redirectToHabbitsList) {
        navigation.navigate('habbits');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.role === 'user' ? styles.user : styles.bot,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                item.role === 'user' ? styles.userText : styles.botText,
              ]}
            >
              {item.content}
            </Text>
          </View>
        )}
      />
      {loading && (
        <View style={{ padding: 10 }}>
          <ActivityIndicator size='small' color='#EB6A55' />
        </View>
      )}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder='Type a message...'
          placeholderTextColor='#B892C4'
          editable={!loading}
        />
        <Button
          mode='contained'
          onPress={sendMessage}
          disabled={loading}
          contentStyle={styles.sendButtonContent}
          labelStyle={styles.sendButtonLabel}
          buttonColor='#EB6A55'
          style={styles.sendButton}
          uppercase={false}
          accessibilityLabel='Send message'
        >
          Send 🥕
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9F4EC' },
  message: {
    padding: 14,
    marginVertical: 6,
    borderRadius: 20,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  user: {
    backgroundColor: '#F7B7B2', 
    alignSelf: 'flex-end',
  },
  bot: {
    backgroundColor: '#F5DA8C', 
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: '#EB6A55', 
    fontWeight: 'bold',
  },
  botText: {
    color: '#88C7B2', 
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#B892C4', 
    backgroundColor: '#F9F4EC', 
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#B892C4', 
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    backgroundColor: '#FFF',
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    borderRadius: 25,
    shadowColor: '#EB6A55',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  sendButtonContent: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  sendButtonLabel: {
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
});
