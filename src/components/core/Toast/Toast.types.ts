import { MessageOptions } from 'react-native-flash-message';

export type InitialToastStyleProps = Pick<
  MessageOptions,
  'hideStatusBar' | 'statusBarHeight' | 'style' | 'textStyle' | 'titleStyle'
>;

export type OtherInitialToastProps = Pick<
  MessageOptions,
  'icon' | 'autoHide' | 'hideOnPress' | 'duration' | 'position'
>;
