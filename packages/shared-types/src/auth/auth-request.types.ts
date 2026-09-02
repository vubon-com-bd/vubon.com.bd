/**
 * Auth Request Types
 * প্রমাণীকরণ রিকোয়েস্ট সম্পর্কিত টাইপ
 */

import { ApiRequest } from '../common/api.request';
import { AuthUserType } from './auth.types';

export interface AuthLoginRequest {
  email?: string;
  phone?: string;
  password: string;
  provider?: string;
  rememberMe?: boolean;
  deviceId?: string;
}

export interface AuthRegisterRequest {
  email?: string;
  phone?: string;
  password: string;
  name: string;
  provider?: string;
  acceptTerms: boolean;
  deviceId?: string;
}

export interface AuthPasswordResetRequest {
  email?: string;
  phone?: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthForgotPasswordRequest {
  email?: string;
  phone?: string;
}

export interface AuthVerifyRequest {
  email?: string;
  phone?: string;
  code: string;
  type: 'email' | 'phone' | 'mfa';
}

export interface AuthRefreshTokenRequest {
  refreshToken: string;
}

export interface AuthLogoutRequest {
  allDevices?: boolean;
}

export interface AuthMFARequest {
  code: string;
  method: string;
  backupCode?: string;
}

export interface AuthApiRequest<T = unknown> extends ApiRequest<T> {
  user?: AuthUserType;
  sessionId?: string;
  deviceId?: string;
}
