import { ApiResponse, ApisauceInstance, create } from 'apisauce';

import { LoginResponse } from '@/src/models';

import { APIError } from './APIError';

type HttpVerbs = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type OnTokenUpdateHandler = (accessToken: string, refreshToken: string) => Promise<unknown>;
export type GetAccessTokenCallback = () => Promise<string | null>;
export type GetRefreshTokenCallback = () => Promise<string | null>;
export type OnTokenUpdateFailedHandler = () => Promise<unknown>;

export class HttpService {
  // used to handle anonymous API calls
  private apiSauceWithoutAuth!: ApisauceInstance;

  // used to handle authenticated API calls
  private apiSauce!: ApisauceInstance;
  private apiSauceState: 'pending' | 'ready' = 'pending';

  // used to put requests on hold when tokens are being refreshed
  private waitingList: Array<() => void> = [];

  // passed as an argument in order to avoid issues with JEST runtime
  private baseUrl: string;
  private getAccessToken: GetAccessTokenCallback;
  private getRefreshToken: GetRefreshTokenCallback;
  private onTokenUpdate: OnTokenUpdateHandler;
  private onTokenUpdateFailed: OnTokenUpdateFailedHandler;

  constructor(
    baseUrl: string,
    getAccessToken: GetAccessTokenCallback,
    getRefreshToken: GetRefreshTokenCallback,
    onTokenUpdate: OnTokenUpdateHandler,
    onTokenUpdateFailed: OnTokenUpdateFailedHandler,
  ) {
    this.baseUrl = baseUrl;
    this.initializeApiSauce();
    this.getAccessToken = getAccessToken;
    this.getRefreshToken = getRefreshToken;
    this.onTokenUpdate = onTokenUpdate;
    this.onTokenUpdateFailed = onTokenUpdateFailed;
  }

  private initializeApiSauce = () => {
    this.apiSauce = create({ baseURL: this.baseUrl });
    this.apiSauceWithoutAuth = create({ baseURL: this.baseUrl });

    // Setting Authorization header
    this.apiSauce.addAsyncRequestTransform(async request => {
      const accessToken = await this.getAccessToken();

      if (accessToken) {
        request.headers = {
          ...request.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      } else {
        // TODO: Log the unexpected scenario (A tool to do logging is needed here)
      }
    });

    // Setting custom header (KC_MOBILE_CLIENT_ID)
    this.apiSauce.addRequestTransform(request => {
      request.headers = {
        ...request.headers,
      };
    });

    this.apiSauceState = 'ready';
  };

  private waitUntilReady = () =>
    new Promise<void>(resolve => {
      this.waitingList.push(() => resolve());
    });

  private notifyAndReleaseWaitingList = () => {
    // notify the waiters
    for (const entry of this.waitingList) {
      entry();
    }

    // empty the list
    this.waitingList = [];
  };

  private refreshAccessToken = async () => {
    const currentRefreshToken = await this.getRefreshToken();

    if (!currentRefreshToken) {
      throw new APIError('INTERNAL_ERROR', 'Refresh token is not available!');
    }

    try {
      //TODO:: Check response of this API
      const response = await this.postAnonymous<LoginResponse>('/auth/refreshtoken', {
        refreshToken: currentRefreshToken,
      });

      if (!response) {
        await this.onTokenUpdateFailed();
        throw new APIError('INTERNAL_ERROR', 'Response or response data is undefined');
      }
      const accessToken = response.access_token;
      const refreshToken = response.refresh_token;

      await this.onTokenUpdate(accessToken, refreshToken);
    } catch {
      await this.onTokenUpdateFailed();
    }
  };

  private fetch = async <T, U = T>(
    method: HttpVerbs,
    path: string,
    params: unknown,
    data: unknown,
    anonymous: boolean,
    headers: {} | undefined,
  ) => {
    const { baseUrl } = this;

    if (!baseUrl) {
      throw new APIError('INTERNAL_ERROR', `DnsUrl is not available for ${baseUrl}`);
    }
    let response: ApiResponse<T, U>;

    if (anonymous) {
      response = await this.apiSauceWithoutAuth.any<T, U>({
        method,
        baseURL: this.baseUrl,
        url: path,
        params,
        data,
        headers,
      });
    } else {
      // wait while apiSauce is not ready
      if (this.apiSauceState === 'pending') {
        await this.waitUntilReady();
      }

      if (!(await this.getAccessToken())) {
        throw new APIError('INTERNAL_ERROR', 'Access token is not defined');
      }

      if (!(await this.getRefreshToken())) {
        throw new APIError('INTERNAL_ERROR', 'Refresh token is not defined');
      }

      // make the request
      response = await this.apiSauce.any<T, U>({
        method,
        baseURL: baseUrl,
        url: path,
        params,
        data,
        headers,
      });

      if (response.status === 401) {
        if (this.apiSauceState === 'ready') {
          try {
            this.apiSauceState = 'pending';
            await this.refreshAccessToken();
          } catch (error) {
            console.error('Could not refresh the access token');
            // handle the error
          } finally {
            this.apiSauceState = 'ready';
            // notify other requests waiting for apiSauce to be ready
            this.notifyAndReleaseWaitingList();
          }
        } else {
          await this.waitUntilReady();
        }

        response = await this.apiSauce.any<T, U>({
          method,
          baseURL: baseUrl,
          url: path,
          params,
          data,
          headers,
        });
      }
    }

    // format the response as needed
    if (!response.ok) {
      throw new APIError(response.problem, response.data, response.status);
    }

    return response.data;
  };

  public get = async <T, U = T>(path: string, query?: {}) =>
    await this.fetch<T, U>('GET', path, query, undefined, false, undefined);

  public post = async <T, U = T>(path: string, data?: unknown, query?: {}) =>
    await this.fetch<T, U>('POST', path, query, data, false, undefined);

  public put = async <T, U = T>(path: string, data?: unknown, query?: {}) =>
    await this.fetch<T, U>('PUT', path, query, data, false, undefined);

  public patch = async <T, U = T>(path: string, data?: unknown, query?: {}) =>
    await this.fetch<T, U>('PATCH', path, query, data, false, undefined);

  public patchAnonymous = async <T, U = T>(path: string, data?: unknown, query?: {}) =>
    await this.fetch<T, U>('PATCH', path, query, data, true, undefined);

  public patchAnonymousWithCustomHeaders = async <T, U = T>(path: string, headers: {}, data?: unknown, query?: {}) =>
    await this.fetch<T, U>('PATCH', path, query, data, true, headers);

  public postAnonymousWithCustomHeaders = async <T, U = T>(path: string, headers: {}, data: unknown, query?: {}) =>
    await this.fetch<T, U>('POST', path, query, data, true, headers);

  public delete = async <T, U = T>(path: string, query?: {}) =>
    await this.fetch<T, U>('DELETE', path, query, undefined, false, undefined);

  public getAnonymous = async <T, U = T>(path: string, query?: {}) =>
    await this.fetch<T, U>('GET', path, query, undefined, true, undefined);

  public postAnonymous = async <T, U = T>(path: string, data?: unknown, query?: {}) =>
    await this.fetch<T, U>('POST', path, query, data, true, undefined);

  public getApiSauceInstance = () => this.apiSauceWithoutAuth;
}
