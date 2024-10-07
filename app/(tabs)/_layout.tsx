import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import {FontAwesome} from "@expo/vector-icons"

const tablayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name='home' options={{title : "home" , tabBarIcon: ({color})=> <FontAwesome size={28} name='home' color={color}/>,headerShown:false}}/>
        <Tabs.Screen name='profile' options={{title : "profile" , tabBarIcon: ({color})=> <FontAwesome size={28} name='user' color={color}/>,headerShown:false}}/>
    </Tabs>
  )
}

export default tablayout

const styles = StyleSheet.create({})