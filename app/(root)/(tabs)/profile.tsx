import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, Alert, ScrollView, TouchableOpacity, ImageSourcePropType } from 'react-native';

import icons from '@/constants/icons';
import images from '@/constants/images';
import { settings } from '@/constants/data';

import { logout } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  showError?: boolean;
  textClass?: string;
  onPress?: () => void;
}

const SettingsItem = ({ icon, title, showError = true, textClass, onPress }: SettingsItemProps) => (
  <TouchableOpacity className="py-3 flex flex-row items-center justify-between" onPress={onPress}>
    <View className="flex flex-row items-center gap-3">
      <Image className="size-6" source={icon} />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textClass}`}>{title}</Text>
    </View>
    {showError && <Image className="size-5" source={icons.rightArrow} />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert('Success', 'You have been logged out successfully');
      refetch();
    } else {
      Alert.alert('Error', 'An error occured while logging out');
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32 px-7">
        <View className="mt-5 flex flex-row items-center justify-between">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image className="size-5" source={icons.bell} />
        </View>
        <View className="mt-5 flex flex-col items-center justify-center">
          <View className="mt-5 size-44 relative flex flex-col items-center">
            <Image source={{ uri: user?.avatar }} className="size-44 relative rounded-full" />
            <TouchableOpacity className="absolute bottom-3 right-0">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
          </View>
          <Text className="mt-2 text-xl font-rubik-bold">{user?.name}</Text>
        </View>
        <View className="mt-10 flex flex-col">
          <SettingsItem icon={icons.calendar} title="My Booking" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>
        <View className="mt-5 pt-5 flex flex-col border-t border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>
        <View className="mt-5 pt-5 flex flex-col border-t border-primary-200">
          <SettingsItem icon={icons.logout} title="Logout" textClass="text-danger" showError={false} onPress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
