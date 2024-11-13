import React from 'react';
import { Pressable, Text } from 'react-native';

import { tw } from '@/src/config/tw';

interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
}

export function Button({ onPress, title, disabled = false }: Readonly<ButtonProps>) {
  return (
    <Pressable
      style={tw.style(`py-3 items-center justify-center rounded-4 bg-primary1`, { 'bg-neutral-dark-200': disabled })}
      disabled={disabled}
      onPress={onPress}>
      <Text style={tw.style(`text-b1-bold text-neutral-light`, { 'text-neutral-dark-300': disabled })}>{title}</Text>
    </Pressable>
  );
}
