import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';

const SignupScreen = () => {
  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [batch, setBatch] = useState('');

  // Function to handle form submission
  const handleSignup = async () => {
    if (!name || !email || !password || !batch) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    try {
      const response = await axios.post('http://192.168.179.61:3000/auth/signup', {
        name,
        email,
        password,
        batch,
      });
      
      // Handle the response
      Alert.alert('Success', 'Account created successfully!');
      console.log(response.data);
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

        {/* Name Input */}
        <TextInput
          className="bg-gray-100 p-4 mb-4 rounded-lg"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        {/* Email Input */}
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

        {/* Batch Input */}
        <TextInput
          className="bg-gray-100 p-4 mb-4 rounded-lg"
          placeholder="Batch"
          value={batch}
          onChangeText={setBatch}
        />

        {/* Signup Button */}
        <TouchableOpacity className="bg-purple-600 py-4 rounded-lg" onPress={handleSignup}>
          <Text className="text-center text-white text-lg font-semibold">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
