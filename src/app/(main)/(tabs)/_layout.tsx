import { Tabs } from 'expo-router';
import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeIcon, ProfileIcon, WishIcon } from '@/src/components';
import { tw } from '@/src/config';

type TabItem = {
  key: string;
  name: string;
  icon: FC<{ color: string }>;
};

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const height = 49 + insets.bottom;

  const tabs: TabItem[] = [
    { key: 'Home', name: 'home-tab', icon: HomeIcon },
    { key: 'Wishlist', name: 'wishlist', icon: WishIcon },
    { key: 'Profile', name: 'profile', icon: ProfileIcon },
  ];

  const renderTabBarIcon = useMemo(
    () => (IconComponent: FC<{ color: string }>, focused: boolean, color?: string) => {
      const iconColor = useMemo(() => (focused ? tw.color('primary1') : tw.color('neutral-dark')), [focused]);

      return (
        <View style={tw`flex-1 items-center`}>
          <IconComponent color={color || (iconColor as string)} />
        </View>
      );
    },
    [],
  );

  return (
    <Tabs
      initialRouteName="home-tab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tw.color('primary1'),
        tabBarInactiveTintColor: tw.color('neutral-dark'),
        tabBarStyle: tw`h-[${height}px] bg-neutral-dark-200`,
        tabBarLabelStyle: tw`text-neutral-dark text-b3-regular`,
      }}>
      {tabs.map(tab => (
        <Tabs.Screen
          key={tab.key}
          name={tab.name}
          options={{
            title: tab.key,
            tabBarIcon: ({ focused, color }) => renderTabBarIcon(tab.icon, focused, color),
          }}
        />
      ))}
    </Tabs>
  );
}
