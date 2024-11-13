import React from 'react';
import { Pressable, Text } from 'react-native';

import { tw } from '@/src/config';

interface LinkProps {
  disabled?: boolean;
  text: string;
  customTextStyle?: string;
  onPress?: () => void;
}

export function Link({ disabled, text, customTextStyle, onPress }: Readonly<LinkProps>) {
  return (
    <Pressable disabled={disabled} onPress={onPress}>
      <Text style={tw`text-b3-bold text-primary1 underline leading-4 ${customTextStyle ?? ''}`}>{text}</Text>
    </Pressable>
  );
}
