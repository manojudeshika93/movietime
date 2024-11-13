import { LoginResponse } from '@/src/models';
import { store } from '@/src/store';
import { clearAccessToken } from '@/src/store/secure.reducer';

import { APIError, HttpServiceInstance } from '../http';

export class AuthService {
  /**
   * Logs in a user with the provided username and password.
   * @param username The user's username.
   * @param password The user's password.
   * @returns The login response.
   */
  static async login({ username, password }: { username: string; password: string }) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();
    try {
      const response = await httpServiceInstance.postAnonymous<LoginResponse>('auth/signin', {
        username,
        password,
      });
      if (!response) {
        throw new APIError('UNKNOWN_ERROR');
      }
      return response;
    } catch (error) {
      throw new APIError('CLIENT_ERROR', error);
    }
  }

  /**
   * Logs out the currently authenticated user.
   * Clears the token from the state.
   */
  static async logout() {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();
    try {
      // Retrieve the token dynamically from Redux or state
      const token = store.getState().secure.token;
      if (!token) {
        throw new APIError('INTERNAL_ERROR');
      }

      // Perform the logout request
      await httpServiceInstance.post('auth/logout', {
        token,
      });

      // Clear the token from the Redux store
      store.dispatch(clearAccessToken());
    } catch (error) {
      throw new APIError('CLIENT_ERROR', error);
    }
  }
}
