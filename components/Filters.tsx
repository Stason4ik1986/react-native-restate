import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Text, ScrollView, TouchableOpacity } from 'react-native';

import { categories } from '@/constants/data';

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(params.filter || 'All');

  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory('');
      router.setParams({ filter: '' });
      return;
    }

    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView className="mt-3 mb-2" horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          className={`mr-4 px-4 py-2 flex flex-col items-start rounded-full ${
            selectedCategory === item.category ? 'bg-primary-300' : 'bg-primary-100 border border-primary-200'
          }`}
          onPress={() => handleCategoryPress(item.category)}
        >
          <Text
            className={`text-sm ${selectedCategory === item.category ? 'mt-0.5 font-rubik-bold text-white' : 'font-rubik text-black-300'}`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
