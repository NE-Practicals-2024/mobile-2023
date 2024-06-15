import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Purchase() {
  return (
    <SafeAreaView className='w-full flex-1 flex flex-col bg-white items-center mt-10'>
      <Text className='font-semibold text-xl'>EUCL Electricity Purchasing System</Text>
    </SafeAreaView>
  );
}
