import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { z } from 'zod';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [batch, setBatch] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [batchError, setBatchError] = useState('');

  const emailSchema = z.string().email('Invalid email format').refine((email) => email.endsWith('@hs.iitr.ac.in'), {
    message: 'Email must be a student email ending with @hs.iitr.ac.in',
  });
  const passwordSchema = z.string().min(8, 'Password must be at least 6 characters long');

  const router = useRouter();

  const handleSignup = async () => {
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setBatchError('');

    if (!name) {
      setNameError('Name is required');
      return;
    }
    if (!email) {
      setEmailError('Email is required');
      return;
    }

    const emailValidation = emailSchema.safeParse(email);
    if (!emailValidation.success) {
      setEmailError(emailValidation.error.errors[0].message);
      return;
    }

    const passwordvalidation = passwordSchema.safeParse(password);
    if (!passwordvalidation.success) {
      setPasswordError(passwordvalidation.error.errors[0].message);
      return;
    }
    if (!password) {
      setPasswordError('Password is required');
      return;
    }
    if (!batch) {
      setBatchError('Batch is required');
      return;
    }

    try {
      const response = await axios.post('http://192.168.22.61:3000/auth/signup', {
        name,
        email,
        password,
        batch,
      });
      
      Alert.alert('Success', 'Account created successfully!');
      router.push('/components/login');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to create account');
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-6">
      <View className="mt-10">
        <Text className="text-4xl font-bold text-center text-purple-700 mb-8">Sign Up</Text>

        <TextInput
          className="bg-gray-100 p-4 mb-1 rounded-lg"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        {nameError ? <Text className="text-red-500 mb-4">{nameError}</Text> : null}

        <TextInput
          className="bg-gray-100 p-4 mb-1 rounded-lg"
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {emailError ? <Text className="text-red-500 mb-4">{emailError}</Text> : null}

        <TextInput
          className="bg-gray-100 p-4 mb-1 rounded-lg"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {passwordError ? <Text className="text-red-500 mb-4">{passwordError}</Text> : null}

        <TextInput
          className="bg-gray-100 p-4 mb-1 rounded-lg"
          placeholder="Batch"
          value={batch}
          onChangeText={setBatch}
        />
        {batchError ? <Text className="text-red-500 mb-4">{batchError}</Text> : null}

        <TouchableOpacity className="bg-purple-600 py-4 rounded-lg" onPress={handleSignup}>
          <Text className="text-center text-white text-lg font-semibold">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
