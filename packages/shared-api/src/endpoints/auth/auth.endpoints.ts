/**
 * Auth Endpoints - Authentication API contracts
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-api/endpoints/auth/auth.endpoints
 * 
 * RULES:
 * ✅ ONLY API endpoint contracts - NO business logic
 * ✅ NO password hashing, session creation, JWT verification
 * ✅ Thin endpoints - only URL + request function + typed response
 * ✅ Named exports only
 * ✅ No side effects beyond HTTP requests
 */

import type { AxiosInstance } from 'axios';
import type { 
  ApiResponse, 
  PaginatedApiResponse,
} from '@vubon/auth-types';

// Import retry utilities
import { withRetry, DEFAULT_RETRY_CONFIG } from '../client/retry.client';

// ==================== Types ====================

// Request Types
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
  deviceId?: string | null;
  captchaToken?: string;
}

export interface PhoneLoginRequest {
  phoneNumber: string;
  password: string;
  rememberMe?: boolean;
  deviceId?: string | null;
  captchaToken?: string;
}

export interface OtpLoginRequest {
  phoneNumber: string;
  otpCode: string;
  rememberMe?: boolean;
  deviceId?: string | null;
}

export interface RegisterRequest {
  email: string;
  phoneNumber?: string | null;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  marketingConsent?: boolean;
  referrerCode?: string;
  captchaToken?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
  captchaToken?: string;
}

export interface ForgotPasswordPhoneRequest {
  phoneNumber: string;
  method?: 'sms' | 'whatsapp';
  captchaToken?: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordOtpRequest {
  phoneNumber: string;
  otpCode: string;
  newPassword: string;
  confirmPassword: string;
}

export interface LogoutRequest {
  refreshToken?: string;
  allDevices?: boolean;
  sessionId?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyOtpRequest {
  phoneNumber: string;
  otpCode: string;
  type?: 'login' | 'reset' | 'verify';
}

// Response Types
export interface UserInfo {
  id: string;
  email: string;
  phoneNumber: string | null;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string | null;
  role: string;
  userTier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  emailVerified: boolean;
  phoneVerified: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  tokenType: 'Bearer';
  user: UserInfo;
  requiresMfa: boolean;
  mfaMethods?: string[];
  sessionId?: string;
}

export interface RegisterResponse {
  success: boolean;
  userId: string;
  emailVerificationRequired: boolean;
  phoneVerificationRequired?: boolean;
  message?: string;
  messageBn?: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  messageBn?: string;
  resetTokenSent: boolean;
  maskedEmail?: string;
  expiresInSeconds: number;
}

export interface ForgotPasswordPhoneResponse {
  success: boolean;
  message: string;
  messageBn?: string;
  otpSent: boolean;
  maskedPhone: string;
  method: 'sms' | 'whatsapp';
  expiresInSeconds: number;
  sessionId: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  messageBn?: string;
  requiresLogin: boolean;
}

export interface VerifyOtpResponse {
  success: boolean;
  verified: boolean;
  resetToken?: string;
  expiresInSeconds?: number;
  remainingAttempts?: number;
}

export interface ValidateResetTokenResponse {
  valid: boolean;
  userId?: string;
  email?: string;
  expiresAt?: string;
}

export interface SessionInfo {
  user: UserInfo;
  expiresAt: string;
  createdAt: string;
  lastActivityAt: string;
  sessionId: string;
}

// ==================== Endpoint Functions ====================

export const createAuthEndpoints = (client: AxiosInstance) => {
  return {
    /**
     * Login with email and password
     */
    login: async (data: LoginRequest): Promise<LoginResponse> => {
      const response = await client.post<ApiResponse<LoginResponse>>('/api/v1/auth/login', data);
      return response.data.data;
    },
    
    /**
     * Login with phone number and password (Bangladesh specific)
     */
    phoneLogin: async (data: PhoneLoginRequest): Promise<LoginResponse> => {
      const response = await client.post<ApiResponse<LoginResponse>>('/api/v1/auth/login/phone', data);
      return response.data.data;
    },
    
    /**
     * Login with OTP (passwordless)
     */
    otpLogin: async (data: OtpLoginRequest): Promise<LoginResponse> => {
      const response = await client.post<ApiResponse<LoginResponse>>('/api/v1/auth/login/otp', data);
      return response.data.data;
    },
    
    /**
     * Register new user
     */
    register: async (data: RegisterRequest): Promise<RegisterResponse> => {
      const response = await client.post<ApiResponse<RegisterResponse>>('/api/v1/auth/register', data);
      return response.data.data;
    },
    
    /**
     * Refresh access token
     */
    refreshToken: async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
      const response = await client.post<ApiResponse<RefreshTokenResponse>>('/api/v1/auth/refresh', data);
      return response.data.data;
    },
    
    /**
     * Logout user
     */
    logout: async (data?: LogoutRequest): Promise<{ success: boolean }> => {
      const response = await client.post<ApiResponse<{ success: boolean }>>('/api/v1/auth/logout', data || {});
      return response.data.data;
    },
    
    /**
     * Forgot password - send reset email
     */
    forgotPassword: async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
      const response = await client.post<ApiResponse<ForgotPasswordResponse>>('/api/v1/auth/forgot-password', data);
      return response.data.data;
    },
    
    /**
     * Forgot password - send OTP to phone (Bangladesh specific)
     */
    forgotPasswordPhone: async (data: ForgotPasswordPhoneRequest): Promise<ForgotPasswordPhoneResponse> => {
      const response = await client.post<ApiResponse<ForgotPasswordPhoneResponse>>('/api/v1/auth/forgot-password/phone', data);
      return response.data.data;
    },
    
    /**
     * Reset password with token
     */
    resetPassword: async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
      const response = await client.post<ApiResponse<ResetPasswordResponse>>('/api/v1/auth/reset-password', data);
      return response.data.data;
    },
    
    /**
     * Reset password with OTP (Bangladesh specific)
     */
    resetPasswordWithOtp: async (data: ResetPasswordOtpRequest): Promise<ResetPasswordResponse> => {
      const response = await client.post<ApiResponse<ResetPasswordResponse>>('/api/v1/auth/reset-password/otp', data);
      return response.data.data;
    },
    
    /**
     * Validate reset token
     */
    validateResetToken: async (token: string): Promise<ValidateResetTokenResponse> => {
      const response = await client.get<ApiResponse<ValidateResetTokenResponse>>(`/api/v1/auth/validate-reset-token/${token}`);
      return response.data.data;
    },
    
    /**
     * Verify OTP (Bangladesh specific)
     */
    verifyOtp: async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
      const response = await client.post<ApiResponse<VerifyOtpResponse>>('/api/v1/auth/verify-otp', data);
      return response.data.data;
    },
    
    /**
     * Request OTP for password reset
     */
    requestResetOtp: async (phoneNumber: string, method: 'sms' | 'whatsapp' = 'sms'): Promise<ForgotPasswordPhoneResponse> => {
      const response = await client.post<ApiResponse<ForgotPasswordPhoneResponse>>('/api/v1/auth/request-reset-otp', {
        phoneNumber,
        method,
      });
      return response.data.data;
    },
    
    /**
     * Change password (authenticated)
     */
    changePassword: async (data: ChangePasswordRequest): Promise<{ success: boolean; message: string }> => {
      const response = await client.post<ApiResponse<{ success: boolean; message: string }>>('/api/v1/auth/change-password', data);
      return response.data.data;
    },
    
    /**
     * Get current session info
     */
    getSession: async (): Promise<SessionInfo> => {
      const response = await client.get<ApiResponse<SessionInfo>>('/api/v1/auth/session');
      return response.data.data;
    },
    
    /**
     * Send email verification (resend)
     */
    sendEmailVerification: async (email?: string): Promise<{ success: boolean; message: string; expiresInSeconds: number }> => {
      const response = await client.post<ApiResponse<{ success: boolean; message: string; expiresInSeconds: number }>>(
        '/api/v1/auth/send-email-verification',
        { email }
      );
      return response.data.data;
    },
    
    /**
     * Verify email with token
     */
    verifyEmail: async (token: string): Promise<{ success: boolean; message: string }> => {
      const response = await client.post<ApiResponse<{ success: boolean; message: string }>>('/api/v1/auth/verify-email', { token });
      return response.data.data;
    },
    
    /**
     * Send phone verification OTP (Bangladesh specific)
     */
    sendPhoneVerification: async (phoneNumber: string, method: 'sms' | 'whatsapp' = 'sms'): Promise<{ success: boolean; message: string; expiresInSeconds: number; resendCooldownSeconds: number }> => {
      const response = await client.post<ApiResponse<{ success: boolean; message: string; expiresInSeconds: number; resendCooldownSeconds: number }>>(
        '/api/v1/auth/send-phone-verification',
        { phoneNumber, method }
      );
      return response.data.data;
    },
    
    /**
     * Verify phone with OTP
     */
    verifyPhone: async (phoneNumber: string, otpCode: string): Promise<{ success: boolean; message: string; verified: boolean }> => {
      const response = await client.post<ApiResponse<{ success: boolean; message: string; verified: boolean }>>('/api/v1/auth/verify-phone', {
        phoneNumber,
        otpCode,
      });
      return response.data.data;
    },
  };
};

export type AuthEndpoints = ReturnType<typeof createAuthEndpoints>;
