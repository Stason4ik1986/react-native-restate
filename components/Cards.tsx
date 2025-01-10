import React from 'react';
import { Models } from 'react-native-appwrite';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import icons from '@/constants/icons';
import images from '@/constants/images';

interface CardProps {
  item?: Models.Document;
  onPress?: () => void;
}

export const FeaturedCard = ({ item, onPress }: CardProps) => {
  return (
    <TouchableOpacity className="flex flex-col items-start w-60 h-80 relative" onPress={onPress}>
      <Image className="size-full rounded-2xl" source={{ uri: item?.image }} />
      <Image className="size-full rounded-2xl absolute bottom-0" source={images.cardGradient} />
      <View className="px-3 py-1.5 absolute top-5 right-5 flex flex-row items-center bg-white/90 rounded-full">
        <Image className="size-3.5" source={icons.star} />
        <Text className="ml-1 text-xs font-rubik-bold text-primary-300">{item?.rating}</Text>
      </View>
      <View className="absolute bottom-5 inset-x-5 flex flex-col items-start">
        <Text className="text-xl font-rubik-extrabold text-white" numberOfLines={1}>
          {item?.name}, {item?.type}
        </Text>
        <Text className="text-base font-rubik text-white">{item?.address}</Text>
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-xl font-rubik-extrabold text-white" numberOfLines={1}>
            ${item?.price}
          </Text>
          <Image className="size-5" source={icons.heart} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export const Card = ({ item, onPress }: CardProps) => {
  return (
    <TouchableOpacity className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative" onPress={onPress}>
      <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
        <Image source={icons.star} className="size-2.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">{item?.rating}</Text>
      </View>
      <Image source={{ uri: item?.image }} className="w-full h-40 rounded-lg" />
      <View className="flex flex-col mt-2">
        <Text className="text-base font-rubik-bold text-black-300">
          {item?.name}, {item?.type}
        </Text>
        <Text className="text-xs font-rubik text-black-100">{item?.address}</Text>

        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubik-bold text-primary-300">${item?.price}</Text>
          <Image source={icons.heart} className="w-5 h-5 mr-2" tintColor="#191D31" />
        </View>
      </View>
    </TouchableOpacity>
  );
};
