import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CartStack() {
  const insets = useSafeAreaInsets();

  return (
    <Stack
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="details" />
    </Stack>
  );
}
