import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

import { tw } from '@/src/config';

interface LabelComponentProps {
  label?: string;
}

export function LabelComponent({ label }: Readonly<LabelComponentProps>) {
  return useMemo(
    () => (
      <View style={tw`flex-row justify-end`}>
        <Text style={tw`text-b2-regular text-right text-neutral-dark`}>{label}</Text>
      </View>
    ),
    [label],
  );
}
