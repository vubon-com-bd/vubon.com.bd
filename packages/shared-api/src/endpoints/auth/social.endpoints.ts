/**
 * Social Endpoints - OAuth API contracts
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-api/endpoints/auth/social.endpoints
 *
 * RULES:
 * ✅ ONLY API endpoint contracts - NO business logic
 * ✅ NO OAuth secrets, token exchange logic
 * ✅ Thin endpoints - only URL + request function + typed response
 * ✅ Named exports only
 * ✅ No side effects beyond HTTP requests
 */

import type { AxiosInstance } from 'axios';
import type { ApiResponse } from '@vubon/auth-types';

// Import API routes from constants and retry utilities
import { API_ROUTES } from '@vubon/auth-constants';
import { withRetry, DEFAULT_RETRY_CONFIG } from '../../client/retry.client';

// ==================== Constants ====================

const SOCIAL_BASE = '/api/v1/auth/social';

// Helper function for idempotent GET requests with retry
const withIdempotentRetry = async <T>(requestFn: () => Promise<T>): Promise<T> => {
  return withRetry(requestFn, DEFAULT_RETRY_CONFIG);
};

// Helper function for building URL with query params
const buildUrlWithParams = (baseUrl: string, params?: Record<string, string | number | undefined>): string => {
  if (!params) return baseUrl;
  
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null)
  );
  
  if (Object.keys(filteredParams).length === 0) return baseUrl;
  
  const searchParams = new URLSearchParams();
  Object.entries(filteredParams).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });
  
  return `${baseUrl}?${searchParams.toString()}`;
};

// ==================== Types ====================

export type SocialProvider = 
  | 'google'
  | 'github'
  | 'facebook'
  | 'apple'
  | 'linkedin'
  | 'whatsapp'
  | 'imo'
  | 'telegram'
  | 'viber'
  | 'bkash'
  | 'nagad'
  | 'rocket';

export interface SocialLoginRequest {
  provider: SocialProvider;
  redirectUri?: string;
  scopes?: string[];
}

export interface SocialLoginResponse {
  url: string;
  state: string;
  provider: SocialProvider;
}

export interface SocialCallbackRequest {
  provider: SocialProvider;
  code: string;
  state: string;
  error?: string;
  errorDescription?: string;
  codeVerifier?: string; // PKCE
}

export interface SocialUserInfo {
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  provider: SocialProvider;
  providerUserId: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  phoneVerified?: boolean;
}

export interface ExistingUserInfo {
  userId: string;
  email: string;
  isLinked: boolean;
}

export interface SocialCallbackResponse {
  success: boolean;
  user?: SocialUserInfo;
  existingUser?: ExistingUserInfo;
  isNewUser: boolean;
  isNewConnection: boolean;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  requiresEmailVerification?: boolean;
  requiresPhoneVerification?: boolean;
}

export interface SocialConnectRequest {
  provider: SocialProvider;
  code: string;
  state: string;
  makePrimary?: boolean;
}

export interface SocialAccount {
  id: string;
  provider: SocialProvider;
  providerUserId: string;
  email: string;
  phoneNumber?: string;
  name: string;
  firstName?: string;
  lastName?: string;
  avatar: string | null;
  isPrimary: boolean;
  isVerified: boolean;
  connectedAt: string;
  lastUsedAt: string | null;
}

export interface SocialOTPRequest {
  phoneNumber: string;
  provider: 'whatsapp' | 'imo' | 'phone_otp';
  method: 'sms' | 'whatsapp' | 'imo';
  locale?: 'en' | 'bn';
}

export interface SocialOTPResponse {
  success: boolean;
  otpSent: boolean;
  maskedPhone: string;
  method: 'sms' | 'whatsapp' | 'imo';
  expiresInSeconds: number;
  resendCooldownSeconds: number;
  sessionId: string;
  remainingAttempts: number;
  messageBn?: string;
}

export interface SocialOTPVerificationRequest {
  phoneNumber: string;
  provider: 'whatsapp' | 'imo' | 'phone_otp';
  otpCode: string;
  sessionId?: string;
}

export interface SocialOTPVerificationResponse {
  success: boolean;
  verified: boolean;
  userId?: string;
  accessToken?: string;
  refreshToken?: string;
  isNewUser: boolean;
  messageBn?: string;
}

export interface MFSAuthRequest {
  provider: 'bkash' | 'nagad' | 'rocket';
  accountNumber: string;
  pin?: string;
  otpCode?: string;
  callbackUrl?: string;
}

export interface MFSAuthResponse {
  success: boolean;
  authenticated: boolean;
  requiresOTP: boolean;
  requiresPin: boolean;
  sessionId?: string;
  userInfo?: SocialUserInfo;
  errorMessage?: string;
  messageBn?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

// ==================== Endpoint Functions ====================

export const createSocialEndpoints = (client: AxiosInstance) => {
  return {
    /**
     * Get OAuth login URL for a provider
     * Non-idempotent POST - no retry (user action, creates new state)
     */
    getAuthUrl: async (data: SocialLoginRequest): Promise<SocialLoginResponse> => {
      const response = await client.post<ApiResponse<SocialLoginResponse>>(`${SOCIAL_BASE}/auth-url`, data);
      return response.data.data;
    },

    /**
     * Handle OAuth callback from provider
     * Non-idempotent POST - no retry (user action, consumes code)
     */
    handleCallback: async (data: SocialCallbackRequest): Promise<SocialCallbackResponse> => {
      const response = await client.post<ApiResponse<SocialCallbackResponse>>(`${SOCIAL_BASE}/callback`, data);
      return response.data.data;
    },

    /**
     * Connect social account to existing user
     * Non-idempotent POST - no retry (user action)
     */
    connectAccount: async (data: SocialConnectRequest): Promise<SocialAccount> => {
      const response = await client.post<ApiResponse<SocialAccount>>(`${SOCIAL_BASE}/connect`, data);
      return response.data.data;
    },

    /**
     * Disconnect social account
     * Non-idempotent DELETE - no retry (user action)
     */
    disconnectAccount: async (provider: SocialProvider, reason?: string): Promise<{ success: boolean; message: string }> => {
      const response = await client.delete<ApiResponse<{ success: boolean; message: string }>>(`${SOCIAL_BASE}/${provider}`, {
        data: { reason },
      });
      return response.data.data;
    },

    /**
     * Get connected social accounts for current user (paginated)
     * Idempotent GET - safe to retry
     */
    getConnectedAccounts: async (params?: PaginationParams): Promise<{ accounts: SocialAccount[]; total: number; page: number; limit: number }> => {
      const url = buildUrlWithParams(`${SOCIAL_BASE}/accounts`, params);
      
      return withIdempotentRetry(async () => {
        const response = await client.get<ApiResponse<{ accounts: SocialAccount[]; total: number; page: number; limit: number }>>(url);
        return response.data.data;
      });
    },

    /**
     * Set primary social account
     * Non-idempotent POST - no retry (user action)
     */
    setPrimaryAccount: async (accountId: string): Promise<{ success: boolean }> => {
      const response = await client.post<ApiResponse<{ success: boolean }>>(`${SOCIAL_BASE}/primary`, { accountId });
      return response.data.data;
    },

    /**
     * Send OTP for social login (Bangladesh specific)
     * Non-idempotent POST - no retry (user action, sends OTP)
     */
    sendSocialOTP: async (data: SocialOTPRequest): Promise<SocialOTPResponse> => {
      const response = await client.post<ApiResponse<SocialOTPResponse>>(`${SOCIAL_BASE}/send-otp`, data);
      return response.data.data;
    },

    /**
     * Verify OTP for social login (Bangladesh specific)
     * Non-idempotent POST - no retry (user action, consumes OTP)
     */
    verifySocialOTP: async (data: SocialOTPVerificationRequest): Promise<SocialOTPVerificationResponse> => {
      const response = await client.post<ApiResponse<SocialOTPVerificationResponse>>(`${SOCIAL_BASE}/verify-otp`, data);
      return response.data.data;
    },

    /**
     * Authenticate with MFS (bKash/Nagad/Rocket) - Bangladesh specific
     * Non-idempotent POST - no retry (user action)
     */
    mfsAuth: async (data: MFSAuthRequest): Promise<MFSAuthResponse> => {
      const response = await client.post<ApiResponse<MFSAuthResponse>>(`${SOCIAL_BASE}/mfs-auth`, data);
      return response.data.data;
    },

    /**
     * Link social accounts (merge multiple accounts)
     * Non-idempotent POST - no retry (user action)
     */
    linkAccounts: async (targetProvider: SocialProvider, targetCode: string): Promise<{ success: boolean; message: string }> => {
      const response = await client.post<ApiResponse<{ success: boolean; message: string }>>(`${SOCIAL_BASE}/link`, {
        targetProvider,
        targetCode,
      });
      return response.data.data;
    },

    /**
     * Unlink social account from another
     * Non-idempotent DELETE - no retry (user action)
     */
    unlinkAccount: async (provider: SocialProvider): Promise<{ success: boolean }> => {
      const response = await client.delete<ApiResponse<{ success: boolean }>>(`${SOCIAL_BASE}/link/${provider}`);
      return response.data.data;
    },
  };
};

export type SocialEndpoints = ReturnType<typeof createSocialEndpoints>;
