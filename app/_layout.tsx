import { Stack } from 'expo-router'
import React from 'react'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignupScreen from '@/app/components/signup'

const Layout = () => {
  return (
    <GestureHandlerRootView>
        <Stack screenOptions={{
            headerShown:false
        }}>
            
        </Stack>
    </GestureHandlerRootView>
  )
}

export default Layout