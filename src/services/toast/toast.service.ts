import { MessageOptions, showMessage } from 'react-native-flash-message';

import { Color } from '@/src/config/tw';

type ToastParams = {
  message: string | string[];
  otherConfigs?: Omit<MessageOptions, 'message' | 'description'>;
};

/*
 * This contains all the variants of toasts("success", "warning",etc...) as static methods
 */
export abstract class ToastService {
  /*
   * Generates a final error message with bullet points only if the description message consists of multiple errors (e.g., an array of errors)
   *
   * @param description {String|string[]}
   */
  public static generateCustomErrorDescription(description: string | string[]) {
    if (!description) return '';
    if (typeof description === 'string') return description;
    if (description.length === 1) return description[0];

    return description.map(message => `• ${message}`).join('\n');
  }

  /**
   * Show success toast alert
   * @param message {String}   Alert text
   * @param otherConfigs {Partial<MessageOptions>}   Partially picked props from 'react-native-flash-message' that can be use to further modify the toast
   */
  public static success({ message, otherConfigs }: ToastParams) {
    showMessage({
      message: ToastService.generateCustomErrorDescription(message),
      backgroundColor: Color.status.success.DEFAULT,
      ...otherConfigs,
    });
  }

  /**
   * Show information toast alert
   * @param message {String}   Alert text
   * @param otherConfigs {Partial<MessageOptions>}   Partially picked props from 'react-native-flash-message' that can be use to further modify the toast
   */
  public static information({ message, otherConfigs }: ToastParams) {
    showMessage({
      message: ToastService.generateCustomErrorDescription(message),
      backgroundColor: Color.status.info.DEFAULT,
      ...otherConfigs,
    });
  }

  /**
   * Show error toast alert
   * @param message {String}   Alert text
   * @param otherConfigs {Partial<MessageOptions>}   Partially picked props from 'react-native-flash-message' that can be use to further modify the toast
   */
  public static error({ message, otherConfigs }: ToastParams) {
    showMessage({
      message: ToastService.generateCustomErrorDescription(message),
      backgroundColor: Color.status.error.DEFAULT,
      ...otherConfigs,
    });
  }

  /**
   * Show warning toast alert
   * @param message {String}   Alert text
   * @param otherConfigs {Partial<MessageOptions>}   Partially picked props from 'react-native-flash-message' that can be use to further modify the toast
   */
  public static warning({ message, otherConfigs }: ToastParams) {
    showMessage({
      message: ToastService.generateCustomErrorDescription(message),
      backgroundColor: Color.status.warning.DEFAULT,
      ...otherConfigs,
    });
  }
}
