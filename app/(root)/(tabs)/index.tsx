import { useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

import Search from '@/components/Search';
import Filters from '@/components/Filters';
import NoResults from '@/components/NoResults';
import { Card, FeaturedCard } from '@/components/Cards';

import { useAppwrite } from '@/lib/useAppwrite';
import { useGlobalContext } from '@/lib/global-provider';
import { getProperties, getLatestProperties } from '@/lib/appwrite';

import icons from '@/constants/icons';

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    loading: propertiesLoading,
    refetch: refetchProperties,
  } = useAppwrite({
    fn: getProperties,
    skip: true,
    params: { query: params.query!, filter: params.filter!, limit: 6 },
  });
  const { data: latestProperties, loading: latestPropertiesLoading } = useAppwrite({ fn: getLatestProperties });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetchProperties({ query: params.query!, filter: params.filter!, limit: 6 });
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
              <View className="flex flex-row items-center">
                <Image className="size-12 rounded-full" source={{ uri: user?.avatar }} />
                <View className="ml-2 flex flex-col items-start justify-center">
                  <Text className="text-xs font-rubik text-black-100">Good Morning</Text>
                  <Text className="text-base font-rubik-medium text-black-300">{user?.name}</Text>
                </View>
              </View>
              <Image className="size-6" source={icons.bell} />
            </View>
            <Search />
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                </TouchableOpacity>
              </View>
              {latestPropertiesLoading ? (
                <ActivityIndicator className="mt-5 text-primary-300" size={'large'} />
              ) : !latestProperties || !latestProperties.length ? (
                <NoResults />
              ) : (
                <FlatList
                  horizontal
                  data={latestProperties}
                  bounces={false}
                  renderItem={({ item }) => <FeaturedCard item={item} onPress={() => handleCardPress(item.$id)} />}
                  keyExtractor={(item) => item.$id}
                  showsVerticalScrollIndicator={false}
                  contentContainerClassName="mt-5 flex gap-5"
                />
              )}
            </View>
            <Filters />
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">Our Recommendations</Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
