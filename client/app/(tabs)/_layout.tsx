import { Tabs } from 'expo-router';
import React from 'react';

import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {

  return (
    <Tabs
      initialRouteName='purchase'
      screenOptions={{
        tabBarActiveTintColor: '#1967D2',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="validate"
        options={{
          title: 'Validate',
          tabBarIcon: ({ focused }) => (
            <AntDesign name='checkcircleo' size={24} color={focused ? "#1967D2" : "black"} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Purchase',
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name='payment' size={24} color={focused ? "#1967D2" : "black"} />
          ),
        }}
      />
      <Tabs.Screen
        name="tokens"
        options={{
          title: 'Tokens',
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="generating-tokens" size={24} color={focused ? "#1967D2" : "black"} />
          ),
        }}
      />
    </Tabs>
  );
}
