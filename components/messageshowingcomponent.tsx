import React from "react";
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from "react-native";

const MessageComponent = ({ message }) => {
  const user = useSelector((state: RootState) => state.user);
  const isUserMessage = message.from === user.name;

  // Extract hours and minutes from the message.time
  const messageDate = new Date(message.time); 
  const hours = String(messageDate.getHours()).padStart(2, '0');
  const minutes = String(messageDate.getMinutes()).padStart(2, '0');

  return (
    <View
      style={[
        styles.messageContainer,
        isUserMessage ? styles.userMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.sender}>{isUserMessage ? "You" : message.from}</Text>
      <Text style={styles.message}>{message.msg}</Text>
      <Text style={styles.time}>{`${hours}:${minutes}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    width: "40%",
    maxWidth: "80%",
    padding: 10,
    marginVertical: 2,
    borderRadius: 15,
  },
  userMessage: {
    backgroundColor: "#d1f7c4",
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "#e2e2e2",
    alignSelf: "flex-start",
  },
  sender: { fontWeight: "bold", marginBottom: 5 },
  message: { fontSize: 16 },
  time: {
    fontSize: 12,
    color: "gray",
    alignSelf: "flex-end",
    marginTop: 5,
  },
});

export default MessageComponent;
