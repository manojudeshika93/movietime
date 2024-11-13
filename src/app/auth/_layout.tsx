import { Redirect, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { tw } from '@/src/config';

export default function AuthStack() {
  const insets = useSafeAreaInsets();

  if (false) {
    return <Redirect href="/(main)" />;
  }

  return (
    <Stack
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
        contentStyle: tw`pt-[${insets.top}px] pb-[${insets.bottom}px]`,
      }}>
      <Stack.Screen name="login" />
    </Stack>
  );
}
