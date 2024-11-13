import { ComponentProps, ReactNode } from 'react';
import { KeyboardTypeOptions, TextInput as RNTextInput, StyleProp, ViewStyle } from 'react-native';

type RNTextInputProps = ComponentProps<typeof RNTextInput>;

type WithRNTextInputProps = Pick<
  RNTextInputProps,
  | 'defaultValue'
  | 'value'
  | 'placeholder'
  | 'onChangeText'
  | 'onBlur'
  | 'onFocus'
  | 'onSubmitEditing'
  | 'onEndEditing'
  | 'editable'
  | 'secureTextEntry'
  | 'returnKeyType'
  | 'onPress'
>;

export interface TextInputProps extends WithRNTextInputProps {
  label?: string;
  innerTextInputStyles?: StyleProp<ViewStyle>;
  helperText?: string;
  error?: boolean;
  success?: boolean;
  isLabelVisible?: boolean;
  isSearch?: boolean;
  renderLeft?: ReactNode;
  renderRight?: ReactNode;
  disabled?: boolean;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
}

export interface PhoneNumberInputProps extends TextInputProps {
  countryCode: string;
  setCountryCode: (code: string) => void;
}
