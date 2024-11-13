/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */
import { useColorScheme } from 'react-native';

import { Color } from '@/src/config/tw';

export function useThemeColor(props: { light?: string; dark?: string }) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Color.primary1;
  }
}
