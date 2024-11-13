import React, { useMemo } from 'react';
import { Text } from 'react-native';

import { tw } from '@/src/config';

interface LabelComponentProps {
  helperText?: string;
  error?: boolean;
}

export function HelperTextComponent({ helperText, error }: Readonly<LabelComponentProps>) {
  return useMemo(
    () =>
      error && helperText ? <Text style={tw`text-b2-regular text-right text-status-error`}>{helperText}</Text> : null,
    [error, helperText],
  );
}
