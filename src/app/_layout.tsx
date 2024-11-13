import { DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { AnimatedBootSplash, ToastHost } from '@/src/components';
import { Color, tw } from '@/src/config';

const theme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: Color.neutral.light.DEFAULT,
    border: Color.neutral.dark[100],
  },
  fonts: {
    ...DefaultTheme.fonts,
  },
};

export default function RootLayout() {
  const [splashVisible, setSplashVisible] = useState(true);

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <GestureHandlerRootView style={tw`flex-1`}>
        <ThemeProvider value={theme}>
          <ToastHost />
          <Slot />
        </ThemeProvider>
        {splashVisible && (
          <AnimatedBootSplash
            isReady={true}
            onAnimationEnd={() => {
              setSplashVisible(false);
            }}
          />
        )}
      </GestureHandlerRootView>
    </>
  );
}
