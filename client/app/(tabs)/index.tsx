import { purchaseToken } from '@/services';
import { PurchaseTokenInputs } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from 'react';
import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import * as yup from 'yup';

export default function Purchase() {

  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()

  const PurchaseTokenSchema = yup.object({
    meter: yup.string().length(6).label("Meter"),
    amount: yup.string().matches(/^(?:[1-9]\d*|0{1,2})00$/, { message: "Amount should be divisible by 100 and greater than 100" }).label("Amount")
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PurchaseTokenInputs>({
    resolver: yupResolver(PurchaseTokenSchema) as Resolver<PurchaseTokenInputs, any>,
    mode: "onTouched"
  })

  const onSubmit: SubmitHandler<PurchaseTokenInputs> = async (data) => {
    await purchaseToken({reset, toast, amount: data.amount, meter: data.meter, setLoading })
  }

  return (
    <SafeAreaView className='w-full flex-1 flex flex-col bg-white items-center mt-10'>
      <Text className='font-semibold text-xl'>EUCL Electricity Purchasing System</Text>
      <View className='w-[90%] flex flex-col bg-slate-100 rounded-lg p-4 items-center mt-32 py-8'>
        <Text className='my-3 text-lg'>Create Token</Text>
        <View className='w-full my-2'>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Amount"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className='border w-full p-2 rounded-lg border-slate-400'
              />
            )}
            name="amount"
          />
          <Text className=' text-red-500'>{errors?.amount?.message}</Text>
        </View>
        <View className='w-full my-2'>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Meter"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className='border w-full p-2 rounded-lg border-slate-400 my-2'
              />
            )}
            name="meter"
          />
          <Text className=' text-red-500'>{errors?.meter?.message}</Text>
        </View>
        <TouchableOpacity className="w-10/12 bg-primary text-white rounded-lg p-2 my-2" onPress={handleSubmit(onSubmit)}>
          <Text className='text-center text-white text-lg font-semibold'>
            {
              loading ?
                <AntDesign name="loading1" size={20} color="white" className='animate-spin' />
                :
                "Submit"
            }
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
