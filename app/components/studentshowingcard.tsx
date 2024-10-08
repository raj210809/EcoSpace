import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

interface Cardprop {
    id:string,
    name : string,
    about : string,
    imageUrl : string,
    onPress : (id: string) => void;
}
export const StudentCard = (card : Cardprop) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => card.onPress(card.id)}>
    <View style={styles.textContainer}>
        <Text style={styles.name}>{card.name}</Text>
        <Text style={styles.about}>{card.about}</Text>
    </View>
      <Image source={{uri:card.imageUrl}} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 10,
      alignItems: 'center',
    },
    card: {
      width: '95%',
      backgroundColor: '#f8f8f8',
      borderRadius: 10,
      padding: 10,
      margin: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      display : 'flex',
      flexDirection : 'row',
      justifyContent : 'space-between'
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 10,
      marginBottom: 10,
    },
    textContainer: {
      
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    about: {
      fontSize: 12,
      color: '#666',
      textAlign: 'center',
    },
  });