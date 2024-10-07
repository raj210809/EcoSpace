import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter()

  // Function to handle form submission
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    try {
      const response = await axios.post('http://192.168.179.61:3000/auth/login', {
        email,
        password,
      });
      
      // Handle the response
      Alert.alert('Success', response.data.message);
      console.log(response.data);
      await AsyncStorage.setItem('token' , response.data.token)
      router.push('/')
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to create account');
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-6">
      <View className="mt-10">
        {/* Title */}
        <Text className="text-4xl font-bold text-center text-purple-700 mb-8">Sign Up</Text>

        <TextInput
          className="bg-gray-100 p-4 mb-4 rounded-lg"
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <TextInput
          className="bg-gray-100 p-4 mb-4 rounded-lg"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Signup Button */}
        <TouchableOpacity className="bg-purple-600 py-4 rounded-lg" onPress={handleLogin}>
          <Text className="text-center text-white text-lg font-semibold">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
