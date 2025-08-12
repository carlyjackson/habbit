import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Chat() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

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

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput(''); // Clear input immediately
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
            <Text>{item.content}</Text>
          </View>
        )}
      />
      {loading && (
        <View style={{ padding: 10 }}>
          <ActivityIndicator size='small' color='#555' />
        </View>
      )}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder='Type a message...'
          editable={!loading} // disable input when loading
        />
        <Button title='Send' onPress={sendMessage} disabled={loading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  message: { padding: 10, marginVertical: 4, borderRadius: 8, maxWidth: '80%' },
  user: { backgroundColor: '#d1e7dd', alignSelf: 'flex-end' },
  bot: { backgroundColor: '#F5DA8C', alignSelf: 'flex-start' },
  inputRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
});
