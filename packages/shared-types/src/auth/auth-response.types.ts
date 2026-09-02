/**
 * Auth Response Types
 * প্রমাণীকরণ রেসপন্স সম্পর্কিত টাইপ
 */

import { BaseResponse } from '../common/base.response';
import { AuthUserType } from './auth.types';

export interface AuthLoginResponse extends BaseResponse {
  user: AuthUserType;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  mfaRequired?: boolean;
  mfaMethods?: string[];
  sessionId: string;
}

export interface AuthRegisterResponse extends BaseResponse {
  user: AuthUserType;
  verificationRequired?: boolean;
  verificationMethod?: 'email' | 'phone' | 'both';
  sessionId?: string;
}

export interface AuthRefreshTokenResponse extends BaseResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface AuthVerifyResponse extends BaseResponse {
  verified: boolean;
  user?: AuthUserType;
}

export interface AuthLogoutResponse extends BaseResponse {
  success: boolean;
  sessionId?: string;
}

export interface AuthMFAResponse extends BaseResponse {
  verified: boolean;
  mfaRequired?: boolean;
  recoveryCodes?: string[];
}

export interface AuthPasswordResetResponse extends BaseResponse {
  success: boolean;
  email?: string;
  phone?: string;
}

export interface AuthForgotPasswordResponse extends BaseResponse {
  success: boolean;
  email?: string;
  phone?: string;
  resetToken?: string;
}

export interface AuthApiResponse<T = unknown> extends BaseResponse<T> {
  auth?: AuthUserType;
  sessionId?: string;
}
