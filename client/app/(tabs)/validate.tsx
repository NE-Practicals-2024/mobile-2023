import { validateToken } from '@/services';
import { ITokenInfo } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from 'react';
import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import * as yup from 'yup';

export default function Validate() {

  const [loading, setLoading] = useState<boolean>(false)
  const [tokenInfo, setTokenInfo] = useState<ITokenInfo>({
    remainingDays: 0,
    token: ""
  })
  const toast = useToast()

  type ValidateTokenInputs = {
    token: string
  }
  const ValidateTokenSchema = yup.object({
    token: yup.string().length(8).required().label("Token")
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidateTokenInputs>({
    resolver: yupResolver(ValidateTokenSchema) as Resolver<ValidateTokenInputs, any>,
    mode: "onTouched"
  })

  const onSubmit: SubmitHandler<ValidateTokenInputs> = async (data) => {
    await validateToken({ token: data.token, setLoading, toast, setTokenInfo })
  }

  return (
    <SafeAreaView className='w-full flex-1 flex flex-col bg-white items-center mt-10'>
      <Text className='font-semibold text-xl'>EUCL Electricity Purchasing System</Text>
      <View className='w-[90%] flex flex-col bg-slate-100 rounded-lg p-4 items-center mt-14 py-8'>
        <Text className='my-3 text-lg'>Validate Token</Text>
        <View className='my-2 w-full'>
          <Controller
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Token"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className='border w-full p-2 rounded-lg border-slate-400'
              />
            )}
            name="token"
          />
          <Text className=' text-red-500'>{errors?.token?.message}</Text>
        </View>
        <TouchableOpacity className="w-10/12 bg-primary text-white rounded-lg p-2 my-2" onPress={handleSubmit(onSubmit)}>
          <Text className='text-center text-white text-lg font-semibold'>
            {
              loading ?
                <AntDesign name="loading1" size={20} color="white" className='animate-spin' />
                :
                "Validate"
            }
          </Text>
        </TouchableOpacity>
      </View>
      {
        tokenInfo.token &&
        <View className='my-4 flex flex-col w-full items-center'>
          <Text className='text-lg font-semibold my-2'>Token Info</Text>
          <Text className='my-2'>
            <Text className='font-semibold'>Token:</Text> {tokenInfo.token}</Text>
          <Text className='my-2'>
            <Text className='font-semibold'>Remaining Days:</Text> {tokenInfo.remainingDays}</Text>
        </View>
      }
    </SafeAreaView>
  );
}
