/**
 * Auth Endpoints
 * প্রমীকরণ এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import {
  AuthLoginRequest,
  AuthRegisterRequest,
  AuthRefreshTokenRequest,
  AuthLoginResponse,
  AuthRegisterResponse,
  AuthRefreshTokenResponse,
  AuthLogoutResponse,
  AuthForgotPasswordResponse,
  AuthPasswordResetResponse,
  AuthUserType,
} from '@vubon/shared-types';
import { HTTP_STATUS } from '@vubon/shared-constants';

export interface AuthUserResponse {
  user: AuthUserType;
}

export interface AuthCheckResponse {
  authenticated: boolean;
  user?: AuthUserType;
}

export interface AuthVerifyEmailResponse {
  success: boolean;
  message: string;
}

export interface AuthChangePasswordResponse {
  success: boolean;
  message: string;
}

export class AuthEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Login user
   * ইউজার লগইন
   */
  async login(data: AuthLoginRequest): Promise<AuthLoginResponse> {
    return this.client.post<AuthLoginResponse>('/auth/login', data);
  }

  /**
   * Register user
   * ইউজার রেজিস্টার
   */
  async register(data: AuthRegisterRequest): Promise<AuthRegisterResponse> {
    return this.client.post<AuthRegisterResponse>('/auth/register', data);
  }

  /**
   * Refresh token
   * টোকেন রিফ্রেশ
   */
  async refreshToken(data: AuthRefreshTokenRequest): Promise<AuthRefreshTokenResponse> {
    return this.client.post<AuthRefreshTokenResponse>('/auth/refresh', data);
  }

  /**
   * Logout user
   * ইউজার লগআউট
   */
  async logout(): Promise<AuthLogoutResponse> {
    return this.client.post<AuthLogoutResponse>('/auth/logout');
  }

  /**
   * Forgot password
   * পাসওয়ার্ড ভুলে গেছেন
   */
  async forgotPassword(email: string): Promise<AuthForgotPasswordResponse> {
    return this.client.post<AuthForgotPasswordResponse>('/auth/forgot-password', { email });
  }

  /**
   * Reset password
   * পাসওয়ার্ড রিসেট
   */
  async resetPassword(token: string, newPassword: string): Promise<AuthPasswordResetResponse> {
    return this.client.post<AuthPasswordResetResponse>('/auth/reset-password', {
      token,
      newPassword,
    });
  }

  /**
   * Verify email
   * ইমেইল ভেরিফাই
   */
  async verifyEmail(token: string): Promise<AuthVerifyEmailResponse> {
    return this.client.post<AuthVerifyEmailResponse>('/auth/verify-email', { token });
  }

  /**
   * Resend verification email
   * ভেরিফিকেশন ইমেইল পুনরায় পাঠান
   */
  async resendVerification(email: string): Promise<AuthVerifyEmailResponse> {
    return this.client.post<AuthVerifyEmailResponse>('/auth/resend-verification', { email });
  }

  /**
   * Change password
   * পাসওয়ার্ড পরিবর্তন
   */
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<AuthChangePasswordResponse> {
    return this.client.post<AuthChangePasswordResponse>('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  }

  /**
   * Get current user
   * বর্তমান ইউজার পাওয়া
   */
  async getCurrentUser(): Promise<AuthUserResponse> {
    return this.client.get<AuthUserResponse>('/auth/me');
  }

  /**
   * Check if user is authenticated
   * ইউজার অথেনটিকেটেড কিনা চেক করা
   */
  async isAuthenticated(): Promise<AuthCheckResponse> {
    return this.client.get<AuthCheckResponse>('/auth/check');
  }

  /**
   * Get HTTP status codes (utility)
   * HTTP স্ট্যাটাস কোড পাওয়া (ইউটিলিটি)
   */
  getHttpStatus() {
    return HTTP_STATUS;
  }

  /**
   * Check if status is success
   * স্ট্যাটাস সাকসেস কিনা চেক করা
   */
  isSuccessStatus(status: number): boolean {
    return (
      status === HTTP_STATUS.OK ||
      status === HTTP_STATUS.CREATED ||
      status === HTTP_STATUS.ACCEPTED ||
      status === HTTP_STATUS.NO_CONTENT
    );
  }

  /**
   * Check if status is client error
   * স্ট্যাটাস ক্লায়েন্ট এরর কিনা চেক করা
   */
  isClientErrorStatus(status: number): boolean {
    return (
      status === HTTP_STATUS.BAD_REQUEST ||
      status === HTTP_STATUS.UNAUTHORIZED ||
      status === HTTP_STATUS.FORBIDDEN ||
      status === HTTP_STATUS.NOT_FOUND ||
      status === HTTP_STATUS.CONFLICT ||
      status === HTTP_STATUS.UNPROCESSABLE_ENTITY ||
      status === HTTP_STATUS.TOO_MANY_REQUESTS
    );
  }

  /**
   * Check if status is server error
   * স্ট্যাটাস সার্ভার এরর কিনা চেক করা
   */
  isServerErrorStatus(status: number): boolean {
    return (
      status === HTTP_STATUS.INTERNAL_SERVER_ERROR ||
      status === HTTP_STATUS.BAD_GATEWAY ||
      status === HTTP_STATUS.SERVICE_UNAVAILABLE ||
      status === HTTP_STATUS.GATEWAY_TIMEOUT
    );
  }
}
