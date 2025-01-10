import React, { useState } from 'react';
import { router, usePathname, useLocalSearchParams } from 'expo-router';
import { View, Image, TextInput, TouchableOpacity } from 'react-native';

import icons from '@/constants/icons';
import { useDebouncedCallback } from 'use-debounce';

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);
  const debouncedSearch = useDebouncedCallback((query: string) => router.setParams({ query }), 500);

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };
  
  return (
    <View className="px-4 mt-5 py-2 w-full flex flex-row items-center justify-between rounded-lg bg-accent-100 border border-primary-100">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <Image className="size-5" source={icons.search} />
        <TextInput
          className="ml-2 flex-1 text-sm font-rubik text-black-300"
          value={search}
          placeholder="Search for anything"
          onChangeText={handleSearch}
        />
      </View>
      <TouchableOpacity>
        <Image className="size-5" source={icons.filter} />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
