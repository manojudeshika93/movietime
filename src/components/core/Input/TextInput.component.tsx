import React, { forwardRef, useMemo, useState } from 'react';
import { Platform, TextInput as RNTextInput, View } from 'react-native';

import { Color, tw } from '@/src/config/tw';

import { TextInputProps } from './Input.types';
import { HelperTextComponent, LabelComponent } from './components';

export const TextInput = forwardRef<RNTextInput, TextInputProps>(function AppTextInput(
  {
    defaultValue,
    value,
    onChangeText,
    onSubmitEditing,
    onEndEditing,
    placeholder,
    disabled,
    label,
    helperText,
    error,
    success,
    isLabelVisible = true,
    isSearch = false,
    renderLeft,
    renderRight,
    onBlur,
    onFocus,
    maxLength,
    keyboardType,
    ...props
  }: TextInputProps,
  ref,
) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const inputStyles = useMemo(() => {
    const borderClass = error
      ? `border border-status-error`
      : success
        ? `border border-status-success`
        : isFocused
          ? `border border-primary1`
          : `border border-neutral-dark-200`;

    const backgroundColor = !disabled ? `bg-neutral-light` : `bg-neutral-dark-100`;
    const textStyle = !disabled ? `text-b1-medium text-neutral-dark` : `text-b1-regular text-neutral-dark-400`;
    return { borderClass, backgroundColor, textStyle };
  }, [disabled, isFocused, error, success]);

  return (
    <View style={tw`gap-2`}>
      {isLabelVisible && <LabelComponent label={label} />}
      <View
        style={tw.style(
          `h-12 flex-row rounded-2xl px-4 items-center ${inputStyles.backgroundColor} ${inputStyles.borderClass}`,
          { 'border border-neutral-dark-300 bg-neutral-dark-200 gap-3': isSearch },
        )}>
        {renderLeft}
        <RNTextInput
          ref={ref}
          style={tw.style(`flex-1 ${inputStyles.textStyle}`, {
            'mt-1': Platform.OS === 'ios',
          })}
          keyboardType={keyboardType}
          placeholder={placeholder}
          editable={!disabled}
          placeholderTextColor={Color.neutral.dark[400]}
          defaultValue={defaultValue}
          value={value}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
          onSubmitEditing={onSubmitEditing}
          onBlur={e => {
            handleBlur();
            onBlur && onBlur(e);
          }}
          onFocus={e => {
            handleFocus();
            onFocus && onFocus(e);
          }}
          textAlign="right"
          textAlignVertical="center"
          maxLength={maxLength}
          {...props}
        />
        {renderRight}
      </View>
      <HelperTextComponent helperText={helperText} error={error} />
    </View>
  );
});
