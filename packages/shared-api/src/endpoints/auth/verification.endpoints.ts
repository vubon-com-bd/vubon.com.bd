/**
 * Verification Endpoints - Email/Phone verification API contracts
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-api/endpoints/auth/verification.endpoints
 *
 * RULES:
 * ✅ ONLY API endpoint contracts - NO business logic
 * ✅ NO email sending, SMS logic
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

const VERIFICATION_BASE = '/api/v1/verification';

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

export type VerificationType = 'email' | 'phone' | 'whatsapp' | 'imo' | 'voice';

export interface SendVerificationRequest {
  type: VerificationType;
  phoneNumber?: string; // For phone verification
  method?: 'sms' | 'whatsapp' | 'imo' | 'voice';
  locale?: 'en' | 'bn';
}

export interface SendVerificationResponse {
  success: boolean;
  message: string;
  messageBn?: string;
  maskedTarget: string;
  expiresInSeconds: number;
  resendCooldownSeconds: number;
  sessionId?: string;
}

export interface VerifyRequest {
  type: VerificationType;
  code: string;
  sessionId?: string;
}

export interface VerifyResponse {
  success: boolean;
  verified: boolean;
  message?: string;
  messageBn?: string;
  remainingAttempts?: number;
}

export interface VerificationStatusResponse {
  emailVerified: boolean;
  phoneVerified: boolean;
  whatsappVerified?: boolean;
  fullyVerified: boolean;
  emailVerifiedAt?: string;
  phoneVerifiedAt?: string;
  whatsappVerifiedAt?: string;
  kycVerified: boolean;
  kycVerifiedAt?: string;
}

export interface InitiateEmailChangeRequest {
  newEmail: string;
  password: string;
  reason?: string;
}

export interface InitiateEmailChangeResponse {
  success: boolean;
  message: string;
  verificationSent: boolean;
  maskedNewEmail: string;
  expiresInSeconds: number;
}

export interface InitiatePhoneChangeRequest {
  newPhoneNumber: string;
  password: string;
  method?: 'sms' | 'whatsapp' | 'imo' | 'voice';
  reason?: string;
}

export interface InitiatePhoneChangeResponse {
  success: boolean;
  message: string;
  messageBn?: string;
  verificationSent: boolean;
  maskedNewPhone: string;
  method: string;
  expiresInSeconds: number;
  sessionId: string;
}

export interface VerifyEmailChangeRequest {
  token: string;
}

export interface VerifyEmailChangeResponse {
  success: boolean;
  oldEmail: string;
  newEmail: string;
  verifiedAt: string;
}

export interface VerifyPhoneChangeRequest {
  sessionId: string;
  code: string;
}

export interface VerifyPhoneChangeResponse {
  success: boolean;
  verified: boolean;
  newPhoneNumber?: string;
  message?: string;
}

export interface CheckVerificationStatusRequest {
  userId?: string;
  type?: VerificationType;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

// ==================== Endpoint Functions ====================

export const createVerificationEndpoints = (client: AxiosInstance) => {
  return {
    /**
     * Send verification code to email or phone
     * Non-idempotent POST - no retry (user action, sends OTP)
     */
    sendVerification: async (data: SendVerificationRequest): Promise<SendVerificationResponse> => {
      const response = await client.post<ApiResponse<SendVerificationResponse>>(`${VERIFICATION_BASE}/send`, data);
      return response.data.data;
    },

    /**
     * Send verification to phone with specific method (Bangladesh specific)
     * Non-idempotent POST - no retry (user action, sends OTP)
     */
    sendPhoneVerification: async (
      phoneNumber: string,
      method: 'sms' | 'whatsapp' | 'imo' | 'voice' = 'sms',
      locale?: 'en' | 'bn'
    ): Promise<SendVerificationResponse> => {
      const response = await client.post<ApiResponse<SendVerificationResponse>>(`${VERIFICATION_BASE}/send-phone`, {
        phoneNumber,
        method,
        locale,
      });
      return response.data.data;
    },

    /**
     * Send WhatsApp verification (Bangladesh specific)
     * Non-idempotent POST - no retry (user action, sends OTP)
     */
    sendWhatsAppVerification: async (phoneNumber: string, locale?: 'en' | 'bn'): Promise<SendVerificationResponse> => {
      const response = await client.post<ApiResponse<SendVerificationResponse>>(`${VERIFICATION_BASE}/send-whatsapp`, {
        phoneNumber,
        locale,
      });
      return response.data.data;
    },

    /**
     * Verify code
     * Non-idempotent POST - no retry (user action, consumes OTP)
     */
    verify: async (data: VerifyRequest): Promise<VerifyResponse> => {
      const response = await client.post<ApiResponse<VerifyResponse>>(`${VERIFICATION_BASE}/verify`, data);
      return response.data.data;
    },

    /**
     * Get verification status for current user
     * Idempotent GET - safe to retry
     */
    getStatus: async (): Promise<VerificationStatusResponse> => {
      return withIdempotentRetry(async () => {
        const response = await client.get<ApiResponse<VerificationStatusResponse>>(`${VERIFICATION_BASE}/status`);
        return response.data.data;
      });
    },

    /**
     * Get verification status for specific user (admin only)
     * Idempotent GET - safe to retry
     */
    getUserVerificationStatus: async (userId: string): Promise<VerificationStatusResponse> => {
      return withIdempotentRetry(async () => {
        const response = await client.get<ApiResponse<VerificationStatusResponse>>(`${VERIFICATION_BASE}/user/${userId}/status`);
        return response.data.data;
      });
    },

    /**
     * Resend verification code
     * Non-idempotent POST - no retry (user action, resends OTP)
     */
    resendVerification: async (type: VerificationType, sessionId?: string): Promise<SendVerificationResponse> => {
      const response = await client.post<ApiResponse<SendVerificationResponse>>(`${VERIFICATION_BASE}/resend/${type}`, {
        sessionId,
      });
      return response.data.data;
    },

    /**
     * Initiate email change request
     * Non-idempotent POST - no retry (user action, requires password verification)
     */
    initiateEmailChange: async (data: InitiateEmailChangeRequest): Promise<InitiateEmailChangeResponse> => {
      const response = await client.post<ApiResponse<InitiateEmailChangeResponse>>(`${VERIFICATION_BASE}/email-change`, data);
      return response.data.data;
    },

    /**
     * Verify email change with token
     * Non-idempotent POST - no retry (user action, consumes token)
     */
    verifyEmailChange: async (data: VerifyEmailChangeRequest): Promise<VerifyEmailChangeResponse> => {
      const response = await client.post<ApiResponse<VerifyEmailChangeResponse>>(`${VERIFICATION_BASE}/email-change/verify`, data);
      return response.data.data;
    },

    /**
     * Initiate phone change request (Bangladesh specific)
     * Non-idempotent POST - no retry (user action, requires password verification)
     */
    initiatePhoneChange: async (data: InitiatePhoneChangeRequest): Promise<InitiatePhoneChangeResponse> => {
      const response = await client.post<ApiResponse<InitiatePhoneChangeResponse>>(`${VERIFICATION_BASE}/phone-change`, data);
      return response.data.data;
    },

    /**
     * Verify phone change with OTP
     * Non-idempotent POST - no retry (user action, consumes OTP)
     */
    verifyPhoneChange: async (data: VerifyPhoneChangeRequest): Promise<VerifyPhoneChangeResponse> => {
      const response = await client.post<ApiResponse<VerifyPhoneChangeResponse>>(`${VERIFICATION_BASE}/phone-change/verify`, data);
      return response.data.data;
    },

    /**
     * Check if email is already verified
     * Idempotent GET - safe to retry
     */
    checkEmailVerified: async (email?: string): Promise<{ verified: boolean; exists: boolean }> => {
      const url = buildUrlWithParams(`${VERIFICATION_BASE}/check-email`, { email });
      
      return withIdempotentRetry(async () => {
        const response = await client.get<ApiResponse<{ verified: boolean; exists: boolean }>>(url);
        return response.data.data;
      });
    },

    /**
     * Check if phone is already verified
     * Idempotent GET - safe to retry
     */
    checkPhoneVerified: async (phoneNumber?: string): Promise<{ verified: boolean; exists: boolean }> => {
      const url = buildUrlWithParams(`${VERIFICATION_BASE}/check-phone`, { phoneNumber });
      
      return withIdempotentRetry(async () => {
        const response = await client.get<ApiResponse<{ verified: boolean; exists: boolean }>>(url);
        return response.data.data;
      });
    },

    /**
     * Get paginated verification history (admin only)
     * Idempotent GET - safe to retry
     */
    getVerificationHistory: async (params?: PaginationParams): Promise<{ items: unknown[]; total: number; page: number; limit: number }> => {
      const url = buildUrlWithParams(`${VERIFICATION_BASE}/history`, params);
      
      return withIdempotentRetry(async () => {
        const response = await client.get<ApiResponse<{ items: unknown[]; total: number; page: number; limit: number }>>(url);
        return response.data.data;
      });
    },
  };
};

export type VerificationEndpoints = ReturnType<typeof createVerificationEndpoints>;
