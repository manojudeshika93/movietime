import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

import { tw } from '@/src/config';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={tw`flex-1 items-center justify-center p-5`}>
        <Text style={tw`text-b3-bold`}>This screen doesn't exist.</Text>
        <Link href="/(main)/(tabs)" style={tw`mt-4 py-4`}>
          <Text style={tw`text-b3-regular`}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
