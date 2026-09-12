/**
 * Auth API — wrapper functions around endpoints.
 * @module shared-api/apis/auth
 */

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  AuthPublic,
} from '@vubon/shared-types';
import { ApiClient } from '../client/api-client';
import { AUTH_ENDPOINTS } from '../endpoints/auth.endpoints';

export const authApi = {
  login: (body: LoginRequest): Promise<LoginResponse> =>
    ApiClient.post(AUTH_ENDPOINTS.LOGIN, body, { skipAuth: true }),

  logout: (): Promise<void> => ApiClient.post(AUTH_ENDPOINTS.LOGOUT),

  register: (body: RegisterRequest): Promise<RegisterResponse> =>
    ApiClient.post(AUTH_ENDPOINTS.REGISTER, body, { skipAuth: true }),

  me: (): Promise<AuthPublic> => ApiClient.get(AUTH_ENDPOINTS.ME),

  refresh: (refreshToken: string): Promise<LoginResponse> =>
    ApiClient.post(AUTH_ENDPOINTS.REFRESH, { refreshToken }, { skipAuth: true }),

  forgotPassword: (email: string): Promise<void> =>
    ApiClient.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email }, { skipAuth: true }),

  resetPassword: (token: string, newPassword: string): Promise<void> =>
    ApiClient.post(AUTH_ENDPOINTS.RESET_PASSWORD, { token, newPassword }, { skipAuth: true }),

  changePassword: (oldPassword: string, newPassword: string): Promise<void> =>
    ApiClient.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, { oldPassword, newPassword }),

  verifyEmail: (code: string): Promise<void> =>
    ApiClient.post(AUTH_ENDPOINTS.VERIFY_EMAIL, { code }),

  verifyPhone: (code: string): Promise<void> =>
    ApiClient.post(AUTH_ENDPOINTS.VERIFY_PHONE, { code }),

  enable2FA: (type: string): Promise<{ secret: string; qrCode: string }> =>
    ApiClient.post(AUTH_ENDPOINTS.ENABLE_2FA, { type }),

  disable2FA: (code: string): Promise<void> => ApiClient.post(AUTH_ENDPOINTS.DISABLE_2FA, { code }),

  verify2FA: (code: string): Promise<LoginResponse> =>
    ApiClient.post(AUTH_ENDPOINTS.VERIFY_2FA, { code }),
} as const;
