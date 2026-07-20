/**
 * Authentication DTOs for data transfer between layers
 * Defines the structure of registration and authentication data
 */
import { DEFAULT_ROLES } from '@vubon/auth-shared-constants';
import type { UserRole } from '@vubon/auth-shared-types';

export interface RegisterDto {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  phoneNumber?: string;
  acceptTerms: boolean;
  acceptPrivacyPolicy: boolean;
  referralCode?: string;
  metadata?: Record<string, unknown>;
}

export interface RegisterResponseDto {
  id: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  status: string;
  isVerified: boolean;
  createdAt: Date;
  requiresVerification: boolean;
  verificationToken?: string;
}

export interface LoginDto {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponseDto {
  user: {
    id: string;
    email: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    role: UserRole;
    status: string;
    isVerified: boolean;
    isActive: boolean;
    lastLoginAt: Date | null;
  };
  accessToken: string;
  refreshToken: string;
  sessionId: string;
  expiresIn: number;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface RefreshTokenResponseDto {
  accessToken: string;
  expiresIn: number;
}

export interface LogoutDto {
  sessionId?: string;
  allSessions?: boolean;
}

export interface LogoutResponseDto {
  success: boolean;
  message: string;
}

export interface VerifyEmailDto {
  token: string;
}

export interface VerifyEmailResponseDto {
  success: boolean;
  message: string;
  user: {
    id: string;
    email: string;
    isVerified: boolean;
  };
}

export interface ResendVerificationDto {
  email: string;
}

export interface ResendVerificationResponseDto {
  success: boolean;
  message: string;
  cooldownSeconds?: number;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ForgotPasswordResponseDto {
  success: boolean;
  message: string;
  resetToken?: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordResponseDto {
  success: boolean;
  message: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponseDto {
  success: boolean;
  message: string;
}

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  username?: string;
}

export interface UpdateProfileResponseDto {
  id: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  role: UserRole;
  updatedAt: Date;
}

export interface UserSessionDto {
  id: string;
  userId: string;
  sessionId: string;
  ipAddress: string | null;
  userAgent: string | null;
  deviceType: string | null;
  browser: string | null;
  operatingSystem: string | null;
  isActive: boolean;
  lastActivityAt: Date;
  expiresAt: Date;
  createdAt: Date;
}

export interface UserActivityDto {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string | null;
  metadata: Record<string, unknown> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
}

export interface AuthErrorDto {
  success: false;
  message: string;
  code: string;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  errors?: Array<{
    field: string;
    message: string;
    code: string;
  }>;
}

export interface AuthSuccessDto<T = unknown> {
  success: true;
  data: T;
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
}

export type AuthResponseDto<T = unknown> = AuthSuccessDto<T> | AuthErrorDto;

export interface SocialLoginDto {
  provider: 'google' | 'facebook' | 'github' | 'apple';
  providerId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  accessToken: string;
}

export interface SocialLoginResponseDto {
  user: {
    id: string;
    email: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    role: UserRole;
    status: string;
    isVerified: boolean;
    isActive: boolean;
  };
  accessToken: string;
  refreshToken: string;
  sessionId: string;
  expiresIn: number;
}

export interface TwoFactorAuthDto {
  userId: string;
  code: string;
  method: 'authenticator' | 'sms' | 'email';
}

export interface TwoFactorAuthResponseDto {
  success: boolean;
  message: string;
  requiresTwoFactor: boolean;
  twoFactorMethod?: 'authenticator' | 'sms' | 'email';
}

export interface RegisterWithSocialDto {
  provider: 'google' | 'facebook' | 'github' | 'apple';
  providerId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  acceptTerms: boolean;
  acceptPrivacyPolicy: boolean;
}
