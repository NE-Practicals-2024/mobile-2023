import { fetchTokensByMeter } from '@/services';
import { IToken } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { FlatList, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import * as yup from 'yup';

export default function Tokens() {

  const [loading, setLoading] = useState<boolean>(false)
  const [tokens, setTokens] = useState<IToken[]>([])
  const [viewModal, setViewModal] = useState<boolean>(false)
  const [activeToken, setActiveToken] = useState<IToken>()

  const toast = useToast()

  type GetTokensInputs = {
    meter: string
  }
  const ValidateTokenSchema = yup.object({
    meter: yup.string().length(6).required().label("Meter")
  })

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<GetTokensInputs>({
    resolver: yupResolver(ValidateTokenSchema) as Resolver<GetTokensInputs, any>,
    mode: "onTouched"
  })

  const onSubmit: SubmitHandler<GetTokensInputs> = async (data) => {
    await fetchTokensByMeter({ meter: data.meter, setLoading, toast, setTokens })
  }

  return (
    <SafeAreaView className='w-full flex-1 flex flex-col items-center bg-white h-full'>
      <View className='w-[90%] flex flex-col bg-slate-100 rounded-lg p-4 items-center mt-14 py-8'>
        <Text className='my-3 text-lg'>Fetch Tokens</Text>
        <View className='my-2 w-full'>
          <Controller
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Meter"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className='border w-full p-2 rounded-lg border-slate-400'
              />
            )}
            name="meter"
          />
          <Text className=' text-red-500'>{errors?.meter?.message}</Text>
        </View>
        <TouchableOpacity className="w-10/12 bg-primary text-white rounded-lg p-2 my-2" onPress={handleSubmit(onSubmit)}>
          {
            loading ?
              <AntDesign name="loading1" size={20} color="white" className='animate-spin' />
              :
              <Text className='text-center text-white text-lg font-semibold'>
                Get Tokens
              </Text>
          }
        </TouchableOpacity>
      </View>
      <ScrollView className='w-full' nestedScrollEnabled>
      {
        tokens.length ?
          <View className='w-full flex flex-col items-center bg-white mt-4'>
            <Text className='text-lg font-semibold'>Tokens by {getValues("meter")}</Text>
            <FlatList
              className='w-full'
              data={tokens}
              scrollEnabled={true}
              ListHeaderComponent={() => (
                <View></View>
              )}
              ListFooterComponent={() => (
                <View></View>
              )}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={handleSubmit(onSubmit)} />
              }
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {
                  setActiveToken(item)
                  setViewModal(true)
                }} className='w-11/12 flex flex-col mx-auto bg-gray-100 rounded-xl p-2 my-2'>
                  <Text className='my-2'>Token: {item.token}</Text>
                  <Text className='my-2'>Amount: {item.amount}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
          : null
      }
      </ScrollView>
    </SafeAreaView>
  );
}
