import { Redirect, Stack } from 'expo-router';

export default function InsideLayout() {
  if (false) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
