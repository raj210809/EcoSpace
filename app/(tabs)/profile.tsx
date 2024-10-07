import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
interface user {
  name : string,
  email : string,
  role : string,
  profilepic : string,
  batch: string
}

const AuthScreen = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<user | null>(null);

  const getUserDetails = async () => {
    try {
      if (token) {
        const response = await axios.get('http://192.168.179.61:3000/auth/getuserdetails', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data);
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      getUserDetails();
    }
  }, [token]);

  return (
    <View className="flex-1 bg-white justify-center items-center px-6 py-8">
      {user ? (
        // Show User Info when the user is logged in
        <>
          {/* Profile Picture */}
          <Image
            source={{ uri: user.profilepic || 'https://via.placeholder.com/150' }}
            className="w-32 h-32 rounded-full mb-6"
          />

          {/* User Name */}
          <Text className="text-3xl font-bold text-center text-gray-800 mb-2">{user.name || 'John Doe'}</Text>

          {/* User Batch */}
          <Text className="text-lg font-semibold text-center text-gray-500 mb-4">{user.batch}</Text>

          {/* User Email */}
          <Text className="text-md text-center text-gray-600 mb-4">{user.email || 'johndoe@example.com'}</Text>

          {/* User Role */}
          <Text className="text-md text-center text-gray-600 mb-8">Role: {user.role || 'Student'}</Text>

          {/* Other Info */}
          <View className="w-full bg-gray-100 rounded-lg p-4">
            <Text className="text-center text-gray-700">Additional Info Section</Text>
          </View>
        </>
      ) : (
        // Show Login and Signup Buttons when user is not logged in
        <>
          {/* Title */}
          <Text className="text-4xl font-bold text-center text-purple-700 mb-10">Welcome!</Text>

          {/* Login Button */}
          <TouchableOpacity
            className="bg-purple-600 py-4 w-full rounded-lg mb-6"
            onPress={() => router.push('/components/login')}
          >
            <Text className="text-center text-white text-lg font-semibold">Log In</Text>
          </TouchableOpacity>

          {/* Signup Button */}
          <TouchableOpacity
            className="bg-purple-200 py-4 w-full rounded-lg"
            onPress={() => router.push('/components/signup')}
          >
            <Text className="text-center text-purple-700 text-lg font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default AuthScreen;
