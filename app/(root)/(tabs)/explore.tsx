import { useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Text, View, Image, FlatList, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';

import { Card } from '@/components/Cards';
import Search from '@/components/Search';
import Filters from '@/components/Filters';
import NoResults from '@/components/NoResults';

import { useAppwrite } from '@/lib/useAppwrite';
import { getProperties } from '@/lib/appwrite';

import icons from '@/constants/icons';

export default function Explore() {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    loading: propertiesLoading,
    refetch: refetchProperties,
  } = useAppwrite({
    fn: getProperties,
    skip: true,
    params: { query: params.query!, filter: params.filter!, limit: 20 },
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetchProperties({ query: params.query!, filter: params.filter!, limit: 20 });
  }, [params.query, params.filter]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={properties}
        renderItem={({ item }) => <Card item={item} onPress={() => handleCardPress(item.$id)} />}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="px-5 flex gap-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={propertiesLoading ? <ActivityIndicator className="mt-5 text-primary-300" size={'large'} /> : NoResults}
        ListHeaderComponent={
          <View className="px-5">
            <View className="mt-5 flex flex-row items-center justify-between">
              <TouchableOpacity
                className="flex flex-row items-center justify-center bg-primary-200 rounded-full size-11"
                onPress={() => router.back()}
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>
              <Text className="mr-2 text-center text-base font-rubik-medium text-black-300">Search for Your Ideal Home</Text>
              <Image source={icons.bell} className="w-6 h-6" />
            </View>
            <Search />
            <View className="mt-5">
              <Filters />
              <Text className="mt-5 text-xl font-rubik-bold text-black-300">Found {properties?.length} Properties</Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
