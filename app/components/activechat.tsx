import React, { useEffect, useState, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  KeyboardAvoidingView, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { useSelector } from 'react-redux';
import SQLite from 'react-native-sqlite-storage';
import { io, Socket } from 'socket.io-client';
import { RootState } from '@/redux/store';
import MessageComponent from '@/components/messageshowingcomponent';
import chat from '../(tabs)/(home)/chat';

export interface chatblock {
  id: string;
  from: string;
  time: Date;
  msg: string;
}

const ActiveChat = () => {
  const [messages, setMessages] = useState<chatblock[]>([]);
  const [sendMessageContent, setSendMessageContent] = useState<string>('');
  const socketRef = useRef<Socket | null>(null);
  const dbRef = useRef<SQLite.SQLiteDatabase | null>(null);
  const user = useSelector((state: RootState) => state.user);

  const openDatabase = async () => {
    try {
      const db = await SQLite.openDatabase({ name: 'chat.db', location: 'default' });
      console.log('Database opened:', db);
      dbRef.current = db;
      console.log('Database opened:', db);
      await createTable(); 
      await fetchMessagesFromDB(); 
    } catch (error) {
      console.error('Failed to open database:', error);
    }
  };

  const createTable = async () => {
    try {
      dbRef.current?.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS activechat (id TEXT PRIMARY KEY, from TEXT, time TEXT, msg TEXT);',
          [],
          () => console.log('Table created successfully'),
          (_, error) => console.error('Error creating table:', error)
        );
      });
    } catch (error) {
      console.error('Error creating table:', error);
    }
  };

  const fetchMessagesFromDB = async () => {
    try {
      dbRef.current?.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM activechat;',
          [],
          (_, results) => {
            const rows = [];
            for (let i = 0; i < results.rows.length; i++) {
              rows.push(results.rows.item(i));
            }
            setMessages(rows);
          },
          (_, error) => console.error('Error fetching messages:', error)
        );
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const saveMessageToDB = (message: chatblock) => {
    dbRef.current?.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO activechat (id, from, time, msg) VALUES (?, ?, ?, ?);',
        [message.id, message.from, message.time.toISOString(), message.msg],
        () => console.log('Message saved successfully'),
        (_, error) => console.error('Error saving message:', error)
      );
    });
  };

  const generateCustomId = () =>
    `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5)}`;

  const sendMessage = () => {
    if (sendMessageContent.trim() && socketRef.current) {
      const message: chatblock = {
        id: generateCustomId(),
        from: user.name,
        time: new Date(),
        msg: sendMessageContent.trim(),
      };

      socketRef.current.emit('activemessage', message);
      setMessages((prev) => [...prev, message]);
      saveMessageToDB(message);
      setSendMessageContent(''); 
    }
  };

  useEffect(() => {
    openDatabase(); 

    const socket = io('ws://192.168.53.61:3000', {
      reconnectionAttempts: 3,
      timeout: 5000,
    });

    socketRef.current = socket;

    socket.on('connect', () => console.log('Connected to WebSocket'));
    socket.on('connect_error', (error) => console.error('Connection error:', error));
    socket.on('disconnect', (reason) => console.log('Socket disconnected:', reason));
    socket.on('group', (message) => {
      console.log('New message received:', message);
      setMessages((prev) => [...prev, message]);
      saveMessageToDB(message);
    });

    return () => {
      socketRef.current?.disconnect();
      console.log('Socket disconnected');
    };
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <Text style={styles.groupName}>Active Members</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageComponent message={item} />}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={sendMessageContent}
          onChangeText={setSendMessageContent}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', marginTop: 25 },
  header: { padding: 15, backgroundColor: '#6a51ae', alignItems: 'center' },
  groupName: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  messagesList: { flex: 1, padding: 10 },
  inputContainer: { flexDirection: 'row', padding: 10, backgroundColor: '#fff', alignItems: 'center' },
  input: { flex: 1, padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 20 },
  sendButton: { backgroundColor: '#6a51ae', padding: 10, borderRadius: 20, marginLeft: 10 },
  sendButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default ActiveChat;
