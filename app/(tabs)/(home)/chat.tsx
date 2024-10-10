import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const chat = () => {
    const router = useRouter()
  return (
    <View>
      <TouchableOpacity className='bg-grey-600 w-full' onPress={()=> {router.push('/components/activechat')}}>
        <Text>Active</Text>
      </TouchableOpacity>
    </View>
  )
}

export default chat

const styles = StyleSheet.create({})