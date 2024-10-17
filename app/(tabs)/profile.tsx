import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Button , Alert } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { useRouter } from 'expo-router';
import {useDispatch , useSelector} from 'react-redux'
import { RootState, AppDispatch } from '@/redux/store';
import { setUser } from '@/redux/slice/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import EditProfile from '../components/profileupdater';

export interface user {
  _id : string,
  name : string,
  email : string,
  role : string,
  profilePic : string,
  batch: string,
  currentlyIn : string,
  about : string,
  position : string,
  instagram : string,
  linkedin : string
}

const AuthScreen = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUserp] = useState<user | null>(null);
  const [isedit , setisedit] = useState(false)

  const getUserDetails = async () => {
    try {
      if (token) {
        const response = await axios.get('http://192.168.53.61:3000/auth/getuserdetails', {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setUser({
          name : response.data.user.name,
          _id : response.data.user._id,
          batch :response.data.user.batch,
          role : response.data.user.role,
          email : response.data.user.email
        }))
        setUserp(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sendupdateddata =async (updateprofile : any) =>{
    try {
      const response = await axios.put('http://192.168.53.61/auth/updateprofile' , updateprofile)
      console.log(response.data)
      Alert.alert(response.data.message)
    } catch (error) {
      Alert.alert('server error , try again')
    }
  }

  const handleSaveProfile = (updatedProfile: any) => {
    console.log(updatedProfile)
    sendupdateddata(updatedProfile)
    setisedit(false);
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
  }, [token,isedit]);

  return (
    <ScrollView className='flex-1 bg-white mt-6'>
      <View className="flex-1 bg-white justify-center items-center px-6 py-8">
      {user ? (
        // Show User Info when the user is logged in
        <>
          {/* Profile Picture */}
          <Image
            source={{ uri: user.profilePic || 'https://www.pngitem.com/pimgs/m/146-1462217_profile-icon-png-image-free-download-searchpng-employee.png' }}
            className="w-32 h-32 rounded-full mb-6"
          />

          <Button title={'Edit Profile'} onPress={()=>{setisedit(true)}} />

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
            <Text className="text-center text-gray-700">{user.about}</Text>
          </View>
          <Text className="text-center text-gray-700">{user.position}</Text>
          <Text className="text-center text-gray-700">{user.currentlyIn}</Text>
          <View className="w-full bg-gray-100 rounded-lg p-4">
            <Text className="text-center text-gray-700">instagram : {user.instagram}</Text>
            <Text className="text-center text-gray-700">linkedin : {user.linkedin}</Text>
          </View>
          {isedit && <EditProfile currentProfile={user} onSave={handleSaveProfile} onCancel={()=>{setisedit(false)}}/>}
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
    </ScrollView>
    
  );
};

export default AuthScreen;
