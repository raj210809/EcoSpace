import { StyleSheet, Text, View, KeyboardAvoidingView, FlatList, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import MessageComponent from '@/components/messageshowingcomponent';

export interface chatblock {
  id: string;
  from: string;
  time: Date;
  msg: string;
}

const ActiveChat = () => {
  const [messages, setMessages] = useState<chatblock[]>([]);
  const [sendMessageContent, setSendMessageContent] = useState<string>('');
  
  // Use useRef to maintain a persistent socket connection across renders
  const socketRef = useRef<Socket | null>(null);

  const user = useSelector((state: RootState) => state.user);

  const getDate = () => {
    const date = Date.now();
    const struct = new Date(date);
    return struct;
  };

  const generateCustomId = () => {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substr(2, 5);
    return `${timestamp}-${randomString}`;
  };

  useEffect(() => {
    // Initialize the socket connection only once when component mounts
    socketRef.current = io('ws://192.168.22.61:3000');

    // Handle connection event
    socketRef.current.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    // Handle incoming messages from the group
    socketRef.current.on('group', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup when the component unmounts (disconnect socket)
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log('Socket disconnected');
      }
    };
  }, []);

  const sendMessage = () => {
    if (sendMessageContent.trim() !== '') {
      if (socketRef.current) {
        socketRef.current.emit('activemessage', {
          id: generateCustomId(),
          from: user.name,
          time: getDate(),
          msg: sendMessageContent.trim(),
        });

        // Clear input after sending the message
        setSendMessageContent('');
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* Group Name */}
      <View style={styles.header}>
        <Text style={styles.groupName}>Chat Group Name</Text>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageComponent message={item} />}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
      />

      {/* Chat Input */}
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
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 15, backgroundColor: '#6a51ae', alignItems: 'center' },
  groupName: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  messagesList: { flex: 1, padding: 10 },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: { flex: 1, padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 20 },
  sendButton: {
    backgroundColor: '#6a51ae',
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  sendButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default ActiveChat;
