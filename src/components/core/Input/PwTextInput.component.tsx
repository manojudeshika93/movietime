import React, { forwardRef, useState } from 'react';
import { Pressable, TextInput as RNTextInput } from 'react-native';

import { tw } from '@/src/config';

import { HidePwIcon } from '../Icon';
import { TextInputProps } from './Input.types';
import { TextInput } from './TextInput.component';

export const PwTextInput = forwardRef<RNTextInput, TextInputProps>(function AppTextInput(
  {
    defaultValue,
    value,
    onChangeText,
    onSubmitEditing,
    onEndEditing,
    placeholder,
    editable = true,
    error,
    success,
    ...props
  }: TextInputProps,
  ref,
) {
  const [secureText, setSecureText] = useState(true);

  return (
    <TextInput
      ref={ref}
      defaultValue={defaultValue}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      onEndEditing={onEndEditing}
      placeholder={placeholder}
      editable={editable}
      error={error}
      success={success}
      secureTextEntry={secureText}
      {...props}
      renderRight={
        <Pressable onPress={() => setSecureText(!secureText)}>
          <HidePwIcon color={secureText ? tw.color('neutral-dark-400') : tw.color('primary1')} />
        </Pressable>
      }
    />
  );
});
