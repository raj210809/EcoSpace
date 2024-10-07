import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const AuthScreen = () => {
    const router =  useRouter()

  return (
    <View className="flex-1 bg-white justify-center items-center px-6">
      {/* Title */}
      <Text className="text-4xl font-bold text-center text-purple-700 mb-10">Welcome!</Text>

      {/* Login Button */}
      <TouchableOpacity className="bg-purple-600 py-4 w-full rounded-lg mb-6">
        <Text className="text-center text-white text-lg font-semibold">Log In</Text>
      </TouchableOpacity>

      {/* Signup Button */}
      <TouchableOpacity 
        className="bg-purple-200 py-4 w-full rounded-lg"
        onPress={() => router.push('/signup')} // Navigate to Signup screen
      >
        <Text className="text-center text-purple-700 text-lg font-semibold">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;
