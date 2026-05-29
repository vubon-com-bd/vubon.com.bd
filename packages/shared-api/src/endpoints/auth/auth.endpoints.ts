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

// Import API routes from constants
import { API_ROUTES } from '@vubon/auth-constants';

// Import retry utilities
import { withRetry, DEFAULT_RETRY_CONFIG } from '../../client/retry.client';

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
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk';  // বাংলাদেশ স্পেসিফিক
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

// Helper function to make requests with retry for idempotent operations
const withOptionalRetry = async <T>(
  requestFn: () => Promise<T>,
  shouldRetry: boolean = false
): Promise<T> => {
  if (shouldRetry) {
    return withRetry(requestFn, DEFAULT_RETRY_CONFIG);
  }
  return requestFn();
};

// ==================== Endpoint Functions ====================

export const createAuthEndpoints = (client: AxiosInstance) => {
  // Helper to get full API path (using constants)
  const api = (path: string) => path;
  
  return {
    /**
     * Login with email and password
     */
    login: async (data: LoginRequest): Promise<LoginResponse> => {
      const response = await client.post<ApiResponse<LoginResponse>>(api(API_ROUTES.AUTH_LOGIN), data);
      return response.data.data;
    },
    
    /**
     * Login with phone number and password (Bangladesh specific)
     */
    phoneLogin: async (data: PhoneLoginRequest): Promise<LoginResponse> => {
      const response = await client.post<ApiResponse<LoginResponse>>(API_ROUTES.AUTH_LOGIN, {
        ...data,
        loginMethod: 'phone',
      });
      return response.data.data;
    },
    
    /**
     * Login with OTP (passwordless)
     */
    otpLogin: async (data: OtpLoginRequest): Promise<LoginResponse> => {
      const response = await client.post<ApiResponse<LoginResponse>>(`${API_ROUTES.AUTH_LOGIN}/otp`, data);
      return response.data.data;
    },
    
    /**
     * Register new user
     */
    register: async (data: RegisterRequest): Promise<RegisterResponse> => {
      const response = await client.post<ApiResponse<RegisterResponse>>(api(API_ROUTES.AUTH_REGISTER), data);
      return response.data.data;
    },
    
    /**
     * Refresh access token
     */
    refreshToken: async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
      const response = await client.post<ApiResponse<RefreshTokenResponse>>(api(API_ROUTES.AUTH_REFRESH), data);
      return response.data.data;
    },
    
    /**
     * Logout user
     */
    logout: async (data?: LogoutRequest): Promise<{ success: boolean }> => {
      const response = await client.post<ApiResponse<{ success: boolean }>>(api(API_ROUTES.AUTH_LOGOUT), data || {});
      return response.data.data;
    },
    
    /**
     * Forgot password - send reset email
     */
    forgotPassword: async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
      const response = await client.post<ApiResponse<ForgotPasswordResponse>>(api(API_ROUTES.AUTH_FORGOT_PASSWORD), data);
      return response.data.data;
    },
    
    /**
     * Forgot password - send OTP to phone (Bangladesh specific)
     */
    forgotPasswordPhone: async (data: ForgotPasswordPhoneRequest): Promise<ForgotPasswordPhoneResponse> => {
      const response = await client.post<ApiResponse<ForgotPasswordPhoneResponse>>(`${API_ROUTES.AUTH_FORGOT_PASSWORD}/phone`, data);
      return response.data.data;
    },
    
    /**
     * Reset password with token (idempotent - can retry on network errors)
     */
    resetPassword: async (data: ResetPasswordRequest, enableRetry: boolean = false): Promise<ResetPasswordResponse> => {
      return withOptionalRetry(async () => {
        const response = await client.post<ApiResponse<ResetPasswordResponse>>(api(API_ROUTES.AUTH_RESET_PASSWORD), data);
        return response.data.data;
      }, enableRetry);
    },
    
    /**
     * Reset password with OTP (Bangladesh specific)
     */
    resetPasswordWithOtp: async (data: ResetPasswordOtpRequest): Promise<ResetPasswordResponse> => {
      const response = await client.post<ApiResponse<ResetPasswordResponse>>(`${API_ROUTES.AUTH_RESET_PASSWORD}/otp`, data);
      return response.data.data;
    },
    
    /**
     * Validate reset token (idempotent GET - safe to retry)
     */
    validateResetToken: async (token: string): Promise<ValidateResetTokenResponse> => {
      return withRetry(async () => {
        const response = await client.get<ApiResponse<ValidateResetTokenResponse>>(`${api(API_ROUTES.AUTH_RESET_PASSWORD)}/validate/${token}`);
        return response.data.data;
      }, DEFAULT_RETRY_CONFIG);
    },
    
    /**
     * Verify OTP (Bangladesh specific)
     */
    verifyOtp: async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
      const response = await client.post<ApiResponse<VerifyOtpResponse>>(API_ROUTES.AUTH_VERIFY_OTP, data);
      return response.data.data;
    },
    
    /**
     * Request OTP for password reset
     */
    requestResetOtp: async (phoneNumber: string, method: 'sms' | 'whatsapp' = 'sms'): Promise<ForgotPasswordPhoneResponse> => {
      const response = await client.post<ApiResponse<ForgotPasswordPhoneResponse>>(API_ROUTES.AUTH_SEND_OTP, {
        phoneNumber,
        method,
        type: 'password_reset',
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
     * Get current session info (idempotent GET - safe to retry)
     */
    getSession: async (): Promise<SessionInfo> => {
      return withRetry(async () => {
        const response = await client.get<ApiResponse<SessionInfo>>('/api/v1/auth/session');
        return response.data.data;
      }, DEFAULT_RETRY_CONFIG);
    },
    
    /**
     * Send email verification (resend)
     */
    sendEmailVerification: async (email?: string): Promise<{ success: boolean; message: string; expiresInSeconds: number }> => {
      const response = await client.post<ApiResponse<{ success: boolean; message: string; expiresInSeconds: number }>>(
        `${api(API_ROUTES.AUTH_VERIFY_EMAIL)}/resend`,
        { email }
      );
      return response.data.data;
    },
    
    /**
     * Verify email with token
     */
    verifyEmail: async (token: string): Promise<{ success: boolean; message: string }> => {
      const response = await client.post<ApiResponse<{ success: boolean; message: string }>>(api(API_ROUTES.AUTH_VERIFY_EMAIL), { token });
      return response.data.data;
    },
    
    /**
     * Send phone verification OTP (Bangladesh specific)
     */
    sendPhoneVerification: async (phoneNumber: string, method: 'sms' | 'whatsapp' = 'sms'): Promise<{ 
      success: boolean; 
      message: string; 
      expiresInSeconds: number; 
      resendCooldownSeconds: number 
    }> => {
      const response = await client.post<ApiResponse<{ 
        success: boolean; 
        message: string; 
        expiresInSeconds: number; 
        resendCooldownSeconds: number 
      }>>(API_ROUTES.AUTH_SEND_OTP, {
        phoneNumber,
        method,
        type: 'phone_verification',
      });
      return response.data.data;
    },
    
    /**
     * Verify phone with OTP
     */
    verifyPhone: async (phoneNumber: string, otpCode: string): Promise<{ success: boolean; message: string; verified: boolean }> => {
      const response = await client.post<ApiResponse<{ success: boolean; message: string; verified: boolean }>>(API_ROUTES.AUTH_VERIFY_OTP, {
        phoneNumber,
        otpCode,
        type: 'phone_verification',
      });
      return response.data.data;
    },
  };
};

export type AuthEndpoints = ReturnType<typeof createAuthEndpoints>;
