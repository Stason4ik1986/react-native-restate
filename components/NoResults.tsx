import React from 'react';
import { View, Text, Image } from 'react-native';

import images from '@/constants/images';

const NoResults = () => {
  return (
    <View className="my-5 flex items-center">
      <Image className="w-11/12 h-80" source={images.noResult} resizeMode="contain" />
      <Text className="mt-5 text-2xl font-rubik-bold text-black-300">No Results</Text>
      <Text className="mt-2 text-base text-black-100">We could not find any results</Text>
    </View>
  );
};

export default NoResults;
