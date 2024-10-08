import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Active from '@/app/components/active'
import Alumni from '@/app/components/alumni'
const people = () => {
  const Tab = createMaterialTopTabNavigator()
  return (
    <Tab.Navigator className='flex-1'>
      <Tab.Screen name='Active' component={Active}/>
      <Tab.Screen name='Alumni' component={Alumni}/>
    </Tab.Navigator>
  )
}

export default people

const styles = StyleSheet.create({})