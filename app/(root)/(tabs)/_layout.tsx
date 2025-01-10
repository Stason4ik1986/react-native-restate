import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, Image } from 'react-native';

import icons from '@/constants/icons';

const TabIcon = ({ icon, title, focused }: { icon: any; title: string; focused: boolean }) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    <Image className="size-6" source={icon} tintColor={focused ? '#0061FF' : '#666876'} resizeMode="contain" />
    <Text className={`${focused ? 'text-primary-300 font-rubik-medium' : 'text-black-200 font-rubik'} text-xs w-full text-center mt-1`}>
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          position: 'absolute',
          borderTopColor: '#0061FF1A',
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon icon={icons.home} title="Home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon icon={icons.search} title="Explore" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon icon={icons.person} title="Profile" focused={focused} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
