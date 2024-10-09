import { Image, StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import { user } from '@/app/(tabs)/profile';
import {useLocalSearchParams} from 'expo-router'
import axios from 'axios';
import { ScrollView } from "react-native-gesture-handler";

const index = () => {
    const [user, setUser] = useState<user | null>(null);
    const {id} = useLocalSearchParams()
    console.log(id)

    const getUserDetails = async () => {
        try {
            const response = await axios.get(`http://192.168.90.61:3000/auth/getuserdetail?id=${id}`);
            setUser(response.data.user);
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(()=>{
      getUserDetails()
    },[])
  return (
    <ScrollView className='flex-1 bg-white mt-6'>
      <View className="flex-1 bg-white justify-center items-center px-6 py-8">
          {/* Profile Picture */}
          <Image
            source={{ uri: user?.profilePic || 'https://www.pngitem.com/pimgs/m/146-1462217_profile-icon-png-image-free-download-searchpng-employee.png' }}
            className="w-32 h-32 rounded-full mb-6"
          />

          {/* User Name */}
          <Text className="text-3xl font-bold text-center text-gray-800 mb-2">{user?.name || 'John Doe'}</Text>

          {/* User Batch */}
          <Text className="text-lg font-semibold text-center text-gray-500 mb-4">{user?.batch}</Text>

          {/* User Email */}
          <Text className="text-md text-center text-gray-600 mb-4">{user?.email || 'johndoe@example.com'}</Text>

          {/* User Role */}
          <Text className="text-md text-center text-gray-600 mb-8">Role: {user?.role || 'Student'}</Text>

          {/* Other Info */}
          <View className="w-full bg-gray-100 rounded-lg p-4">
            <Text className="text-center text-gray-700">{user?.currentlyIn}</Text>
          </View>
        </View>
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})