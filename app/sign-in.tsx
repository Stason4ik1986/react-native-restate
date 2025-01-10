import React from 'react';
import { Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Alert, Image, ScrollView, TouchableOpacity } from 'react-native';

import { login } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';

import icons from '@/constants/icons';
import images from '@/constants/images';

const SignIn = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  if (!loading && isLoggedIn) return <Redirect href="/" />;

  const handleLogin = async () => {
    const result = await login();
    if (result) {
      refetch();
    } else {
      Alert.alert('Error', '4 Failed to login');
    }
  };
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image source={images.onboarding} className="w-full h-4/6" resizeMode="contain" />
        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">Welcome to ReState</Text>
          <Text className="mt-2 text-3xl text-center font-rubik-bold text-black-300">
            Let's Get You Closer to {'\n'}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>
          <Text className="mt-12 text-lg text-center font-rubik ">Login To ReState with Google</Text>
          <TouchableOpacity className="bg-white shadow-md shadow-zink-300 rounded-full w-full py-4 mt-5" onPress={handleLogin}>
            <View className="flex flex-row items-center justify-center">
              <Image className="h-5 w-5" source={icons.google} resizeMode="contain" />
              <Text className="ml-2 text-lg font-rubik-medium text-black-300">Continue with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
