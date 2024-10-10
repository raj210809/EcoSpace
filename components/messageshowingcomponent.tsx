import React from "react";
import { RootState } from '@/redux/store'
import {useSelector} from 'react-redux'
import { View, Text, StyleSheet } from "react-native";
import { chatblock } from "@/app/components/activechat";



const MessageComponent = ({ message }) => {

    const user = useSelector((state : RootState)=>state.user)
  const isUserMessage = message.from === user.name ;

  return (
    <View
      style={[
        styles.messageContainer,
        isUserMessage ? styles.userMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.sender}>{isUserMessage ? "You" : user.name}</Text>
      <Text style={styles.message}>{message.msg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: "80%",
    padding: 10,
    marginVertical: 5,
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
});

export default MessageComponent;
