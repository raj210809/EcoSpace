import { Stack } from 'expo-router'
import React from 'react'
import {Provider} from 'react-redux'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignupScreen from '@/app/components/signup'
import store from '@/redux/store'

const Layout = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView className='flex-1'>
        <Stack screenOptions={{
            headerShown:false
        }}>
            
        </Stack>
    </GestureHandlerRootView>
    </Provider>
  )
}

export default Layout