import React from 'react';
import FlashMessage from 'react-native-flash-message';

import { customToastProps } from './Toast.config';

export function ToastHost() {
  return <FlashMessage floating {...customToastProps} />;
}
