import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tw } from '@/src/config';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={tw`flex-1 items-center`}>
      <Text style={tw`text-h5-extrabold`}>Profile Screen</Text>
    </SafeAreaView>
  );
}
