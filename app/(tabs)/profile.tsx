import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Button , Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import {Cloudinary} from '@cloudinary/url-gen';

interface user {
  _id : string,
  name : string,
  email : string,
  role : string,
  profilePic : string,
  batch: string
}

const AuthScreen = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<user | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    // Ask the user for permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    // Let the user pick an image from the media library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
    setTimeout(() => {
      console.log(profileImage)
      uploadImage();
    }, 1000);
  };

  const uploadImage = async () => {
    if (!profileImage) {
      alert('Please select an image first');
      return;
    }

    const formData = new FormData();

    // Append the file to the FormData object
    formData.append('file', {
      name: 'profilepic.jpg', // The file name
      type: 'image/jpeg', // The MIME type of the file
      uri: profileImage, // The file URI from the ImagePicker
    } as any); // Casting as 'any' to bypass TypeScript type checking
    

    formData.append('upload_preset', 'ytnw1qht'); // Your Cloudinary upload preset

    try {
      const response1 = await axios.post('https://api.cloudinary.com/v1_1/dx2l62ub6/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // On successful upload, get the image URL
      const imageUrl = response1.data.secure_url;
      const response = await axios.put('http://192.168.14.61:3000/auth/updateprofilepic',{id : user?._id , profilepic : imageUrl})
      console.log('Image URL: ', imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserDetails = async () => {
    try {
      if (token) {
        const response = await axios.get('http://192.168.14.61:3000/auth/getuserdetails', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data.user.profilePic);
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
            source={{ uri: user.profilePic || 'https://www.pngitem.com/pimgs/m/146-1462217_profile-icon-png-image-free-download-searchpng-employee.png' }}
            className="w-32 h-32 rounded-full mb-6"
          />

          <Button title={user.profilePic === null ? "ADD DP" : "EDIT DP"} onPress={pickImage} />

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
