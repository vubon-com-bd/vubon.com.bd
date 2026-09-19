import { httpClient } from '../../common/client/client.factory';
import { ValidationError } from '../../common/errors/validation-error';
import { LOGIN_ENDPOINTS } from './login.endpoints';
import type { LoginRequest, LoginResponse } from './login.types';

/**
 * Login API — transport only.
 * No token storage. No auth logic. Interceptor handles token.
 */
export const loginApi = {
  /**
   * Submit login credentials.
   * @param input - Login credentials
   * @param signal - Optional AbortSignal
   * @returns Token pair + user id
   */
  submit: async (input: LoginRequest, signal?: AbortSignal): Promise<LoginResponse> => {
    const res = await httpClient.post<LoginResponse>(LOGIN_ENDPOINTS.submit, input, {
      signal,
      timeout: 10_000,
    });
    if (!res.data || typeof res.data.accessToken !== 'string') {
      throw new ValidationError('Invalid login response');
    }
    return res.data;
  },
} as const;
