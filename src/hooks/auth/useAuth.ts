import { useMutation } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/src/constants';
import { APIError, AuthService, ToastService } from '@/src/services';

export function useAuth({ onLogoutCompleted }: { onLogoutCompleted?: () => Promise<void> }) {
  const {
    mutateAsync: login,
    isPending: isLoginLoading,
    isError: isLoginError,
    isSuccess: isLoginSuccess,
  } = useMutation({
    mutationKey: [QUERY_KEYS.auth.login],
    mutationFn: AuthService.login,
    onError(error) {
      if (error instanceof APIError) ToastService.error({ message: error?.data?.data?.message });
    },
  });

  const {
    mutateAsync: logout,
    isPending: isLogoutLoading,
    isError: isLogoutError,
    isSuccess: isLogoutSuccess,
  } = useMutation({
    mutationKey: [QUERY_KEYS.auth.logout],
    mutationFn: () => AuthService.logout(),
    onError: async error => {
      if (onLogoutCompleted) {
        await onLogoutCompleted();
      }
    },
    onSuccess: async () => {
      if (onLogoutCompleted) {
        await onLogoutCompleted();
      }
    },
  });

  const {
    mutateAsync: register,
    isPending: isRegisterLoading,
    isError: isRegisterError,
    isSuccess: isRegisterSuccess,
  } = useMutation({
    mutationKey: [QUERY_KEYS.auth.register],
    mutationFn: AuthService.register,
    onError() {
      ToastService.error({ message: 'Something went wrong while registering user data' });
    },
  });

  const {
    mutateAsync: verifyOtpRegister,
    isPending: isVerifyOtpRegisterLoading,
    isError: isVerifyOtpRegisterError,
    isSuccess: isVerifyOtpRegisterSuccess,
  } = useMutation({
    mutationKey: [QUERY_KEYS.otp.verifyOtpRegister],
    mutationFn: AuthService.verifyOtpRegister,
    onError(error) {
      if (error instanceof APIError) ToastService.error({ message: error?.data?.data?.message });
    },
  });

  const {
    mutateAsync: verifyOtpLogin,
    isPending: isVerifyOtpLoginLoading,
    isError: isVerifyOtpLoginError,
    isSuccess: isVerifyOtpLoginSuccess,
  } = useMutation({
    mutationKey: [QUERY_KEYS.otp.verifyOtpLogin],
    mutationFn: AuthService.verifyOtpLogin,
    onError(error) {
      if (error instanceof APIError) ToastService.error({ message: error?.data?.data?.message });
    },
  });

  const {
    mutateAsync: requestRecoveryOtp,
    isPending: isRequestRecoveryOtpLoading,
    isError: isRequestRecoveryOtpError,
    isSuccess: isRequestRecoveryOtpSuccess,
  } = useMutation({
    mutationKey: [QUERY_KEYS.otp.requestRecoveryOtp],
    mutationFn: AuthService.requestRecoveryOtp,
    onError(error) {
      if (error instanceof APIError) ToastService.error({ message: error?.data?.data?.message });
    },
  });

  const {
    mutateAsync: verifyRecoveryOtp,
    isPending: isVerifyRecoveryOtpLoading,
    isError: isVerifyRecoveryOtpError,
    isSuccess: isVerifyRecoveryOtpSuccess,
  } = useMutation({
    mutationKey: [QUERY_KEYS.otp.verifyRecoveryOtp],
    mutationFn: AuthService.verifyRecoveryOtp,
    onError(error) {
      if (error instanceof APIError) ToastService.error({ message: error?.data?.data?.message });
    },
  });

  const {
    mutateAsync: resetPassword,
    isPending: isResetPasswordLoading,
    isError: isResetPasswordError,
    isSuccess: isResetPasswordSuccess,
  } = useMutation({
    mutationKey: [QUERY_KEYS.auth.resetPassword],
    mutationFn: AuthService.resetPassword,
    onError(error) {
      if (error instanceof APIError) ToastService.error({ message: error?.data?.data?.message });
    },
  });

  return {
    login: {
      isLoading: isLoginLoading,
      sendLoginReq: login,
      isError: isLoginError,
      isSuccess: isLoginSuccess,
    },
    logout: {
      isLoading: isLogoutLoading,
      sendLogoutReq: logout,
      isError: isLogoutError,
      isSuccess: isLogoutSuccess,
    },
    register: {
      isLoading: isRegisterLoading,
      sendRegisterReq: register,
      isError: isRegisterError,
      isSuccess: isRegisterSuccess,
    },
    verifyOtpRegister: {
      isLoading: isVerifyOtpRegisterLoading,
      sendVerifyOtpRegisterReq: verifyOtpRegister,
      isError: isVerifyOtpRegisterError,
      isSuccess: isVerifyOtpRegisterSuccess,
    },
    verifyOtpLogin: {
      isLoading: isVerifyOtpLoginLoading,
      sendVerifyOtpLoginReq: verifyOtpLogin,
      isError: isVerifyOtpLoginError,
      isSuccess: isVerifyOtpLoginSuccess,
    },
    requestRecoveryOtp: {
      isLoading: isRequestRecoveryOtpLoading,
      sendRequestRecoveryOtpReq: requestRecoveryOtp,
      isError: isRequestRecoveryOtpError,
      isSuccess: isRequestRecoveryOtpSuccess,
    },
    verifyRecoveryOtp: {
      isLoading: isVerifyRecoveryOtpLoading,
      sendVerifyRecoveryOtpReq: verifyRecoveryOtp,
      isError: isVerifyRecoveryOtpError,
      isSuccess: isVerifyRecoveryOtpSuccess,
    },
    resetPassword: {
      isLoading: isResetPasswordLoading,
      sendResetPasswordReq: resetPassword,
      isError: isResetPasswordError,
      isSuccess: isResetPasswordSuccess,
    },
  };
}
