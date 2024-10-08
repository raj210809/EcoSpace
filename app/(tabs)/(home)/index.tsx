import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Drawer} from 'expo-router/drawer'

const home = () => {
  return (
    <SafeAreaView>
      <Text>Hello from home</Text>
    </SafeAreaView>
  )
}

export default home

const styles = StyleSheet.create({})