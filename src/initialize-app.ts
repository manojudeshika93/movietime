import { HttpService, HttpServiceInstance } from './services';
import { useAuthStore } from './store';

const onTokenUpdateFailed = async () => {
  await useAuthStore.getState().removeAccessTokenAndRefreshToken();
  useAuthStore.getState().setIsLoggedIn(false);
};

const getAccessToken = async () => {
  const { accessToken } = await useAuthStore.getState().getAccessAndRefreshToken();
  return accessToken;
};

const getRefreshToken = async () => {
  const { refreshToken } = await useAuthStore.getState().getAccessAndRefreshToken();
  return refreshToken;
};

const onTokenUpdate = async (accessToken: string, refreshToken: string) => {
  await useAuthStore.getState().setAccessTokenAndRefreshToken(accessToken, refreshToken);
};

// TODO: get the api url from environment, create a config service for this
const httpService = new HttpService(
  process.env.EXPO_PUBLIC_API_URL || '',
  getAccessToken,
  getRefreshToken,
  onTokenUpdate,
  onTokenUpdateFailed,
);

HttpServiceInstance.setHttpServiceInstance(httpService);
