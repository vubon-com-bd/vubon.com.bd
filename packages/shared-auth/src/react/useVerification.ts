/**
 * useVerification Hook - Email/Phone verification with shared-api integration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module shared-auth/src/react/useVerification

 * RULES:
 * ✅ ONLY verification UI abstraction - NO email/SMS logic
 * ✅ Pure React hook for verification orchestration
 * ✅ TypeScript strict
 */

import React from 'react';
import { useAuthContext } from './AuthContext';

// Import from shared-api and shared-utils
import { createVerificationEndpoints } from '@vubon/shared-api';
import { withRetry, DEFAULT_RETRY_CONFIG } from '@vubon/shared-api/client/retry';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { env } from '@vubon/shared-config/env';

// ==================== Types ====================

export type VerificationType = 'email' | 'phone' | 'whatsapp' | 'imo' | 'voice';

export interface SendVerificationParams {
  type: VerificationType;
  phoneNumber?: string; // Required for phone verification
  method?: 'sms' | 'whatsapp' | 'imo' | 'voice';
  locale?: 'en' | 'bn'; // Language for OTP message
}

export interface SendVerificationResult {
  success: boolean;
  message: string;
  messageBn?: string;
  maskedTarget: string;
  expiresInSeconds: number;
  resendCooldownSeconds: number;
  sessionId?: string;
}

export interface VerifyParams {
  type: VerificationType;
  code: string;
  sessionId?: string;
}

export interface VerifyResult {
  success: boolean;
  verified: boolean;
  message?: string;
  messageBn?: string;
  remainingAttempts?: number;
}

export interface VerificationStatus {
  emailVerified: boolean;
  phoneVerified: boolean;
  whatsappVerified?: boolean;
  fullyVerified: boolean;
  emailVerifiedAt?: string;
  phoneVerifiedAt?: string;
  whatsappVerifiedAt?: string;
}

export interface UseVerificationReturn {
  /** Send verification code to email or phone */
  sendVerification: (params: SendVerificationParams) => Promise<SendVerificationResult>;
  /** Send phone verification (Bangladesh specific) */
  sendPhoneVerification: (phoneNumber: string, method?: 'sms' | 'whatsapp' | 'imo' | 'voice', locale?: 'en' | 'bn') => Promise<SendVerificationResult>;
  /** Send WhatsApp verification (Bangladesh specific) */
  sendWhatsAppVerification: (phoneNumber: string, locale?: 'en' | 'bn') => Promise<SendVerificationResult>;
  /** Verify code */
  verify: (params: VerifyParams) => Promise<VerifyResult>;
  /** Get verification status */
  getStatus: () => Promise<VerificationStatus>;
  /** Check if email is verified */
  isEmailVerified: boolean;
  /** Check if phone is verified */
  isPhoneVerified: boolean;
  /** Check if fully verified (email + phone) */
  isFullyVerified: boolean;
  /** Loading state */
  loading: boolean;
  /** Resend verification code */
  resendVerification: (type: VerificationType, sessionId?: string) => Promise<SendVerificationResult>;
}

// ==================== Helpers ====================

// Simple logger that can be replaced with proper logging solution
const logError = (error: unknown, context: string): void => {
  if (env.NODE_ENV === 'development') {
    console.error(`[useVerification] ${context}:`, error);
  }
};

// Helper function to extract data from API response
const extractData = <T>(response: { data?: { data?: T } }): T | undefined => {
  return response.data?.data;
};

// Helper function for idempotent GET requests with retry
const withIdempotentRetry = async <T>(requestFn: () => Promise<T>): Promise<T> => {
  return withRetry(requestFn, DEFAULT_RETRY_CONFIG);
};

// ==================== Hook ====================

/**
 * Hook for email and phone verification

 * @example
 * const { sendVerification, verify, isEmailVerified } = useVerification();

 * // Send OTP
 * await sendVerification({ type: 'phone', phoneNumber: '01712345678', method: 'whatsapp' });

 * // Verify OTP
 * const result = await verify({ type: 'phone', code: '123456' });
 */
export const useVerification = (): UseVerificationReturn => {
  const { user } = useAuthContext();
  const [loading, setLoading] = React.useState(false);
  const [isEmailVerified, setIsEmailVerified] = React.useState(user?.emailVerified || false);
  const [isPhoneVerified, setIsPhoneVerified] = React.useState(user?.phoneVerified || false);

  // Create API client once
  const verificationApi = React.useMemo(() => {
    const client = getAxiosClient({ baseURL: env.API_URL });
    return createVerificationEndpoints(client);
  }, []);

  // Sync with user context
  React.useEffect(() => {
    setIsEmailVerified(user?.emailVerified || false);
    setIsPhoneVerified(user?.phoneVerified || false);
  }, [user?.emailVerified, user?.phoneVerified]);

  const sendVerification = React.useCallback(
    async (params: SendVerificationParams): Promise<SendVerificationResult> => {
      setLoading(true);
      try {
        const response = await verificationApi.sendVerification(params);
        return extractData(response) as SendVerificationResult;
      } catch (error) {
        logError(error, 'sendVerification failed');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [verificationApi]
  );

  const sendPhoneVerification = React.useCallback(
    async (phoneNumber: string, method: 'sms' | 'whatsapp' | 'imo' | 'voice' = 'sms', locale?: 'en' | 'bn'): Promise<SendVerificationResult> => {
      return sendVerification({
        type: 'phone',
        phoneNumber,
        method,
        locale,
      });
    },
    [sendVerification]
  );

  const sendWhatsAppVerification = React.useCallback(
    async (phoneNumber: string, locale?: 'en' | 'bn'): Promise<SendVerificationResult> => {
      return sendVerification({
        type: 'whatsapp',
        phoneNumber,
        method: 'whatsapp',
        locale,
      });
    },
    [sendVerification]
  );

  const verify = React.useCallback(
    async (params: VerifyParams): Promise<VerifyResult> => {
      setLoading(true);
      try {
        const response = await verificationApi.verify(params);
        const result = extractData(response) as VerifyResult;

        // Update local verification status on success
        if (result?.verified) {
          if (params.type === 'email') {
            setIsEmailVerified(true);
          } else if (params.type === 'phone' || params.type === 'whatsapp') {
            setIsPhoneVerified(true);
          }
        }

        return result;
      } catch (error) {
        logError(error, 'verify failed');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [verificationApi]
  );

  const getStatus = React.useCallback(async (): Promise<VerificationStatus> => {
    return withIdempotentRetry(async () => {
      const response = await verificationApi.getStatus();
      const status = extractData(response) as VerificationStatus;

      setIsEmailVerified(status?.emailVerified || false);
      setIsPhoneVerified(status?.phoneVerified || false);

      return status;
    });
  }, [verificationApi]);

  const resendVerification = React.useCallback(
    async (type: VerificationType, sessionId?: string): Promise<SendVerificationResult> => {
      setLoading(true);
      try {
        const response = await verificationApi.resendVerification(type, sessionId);
        return extractData(response) as SendVerificationResult;
      } catch (error) {
        logError(error, 'resendVerification failed');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [verificationApi]
  );

  const isFullyVerified = isEmailVerified && isPhoneVerified;

  return {
    sendVerification,
    sendPhoneVerification,
    sendWhatsAppVerification,
    verify,
    getStatus,
    isEmailVerified,
    isPhoneVerified,
    isFullyVerified,
    loading,
    resendVerification,
  };
};

/**
 * Hook for checking email verification status only (lightweight)
 */
export const useIsEmailVerified = (): boolean => {
  const { user } = useAuthContext();
  return user?.emailVerified || false;
};

/**
 * Hook for checking phone verification status only (lightweight)
 */
export const useIsPhoneVerified = (): boolean => {
  const { user } = useAuthContext();
  return user?.phoneVerified || false;
};

/**
 * Hook for resending verification code (lightweight) with shared-api integration
 */
export const useResendVerification = () => {
  const [loading, setLoading] = React.useState(false);

  // Create API client once
  const verificationApi = React.useMemo(() => {
    const client = getAxiosClient({ baseURL: env.API_URL });
    return createVerificationEndpoints(client);
  }, []);

  const resend = React.useCallback(async (type: VerificationType, sessionId?: string): Promise<SendVerificationResult> => {
    setLoading(true);
    try {
      const response = await verificationApi.resendVerification(type, sessionId);
      return extractData(response) as SendVerificationResult;
    } catch (error) {
      logError(error, 'resendVerification failed');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [verificationApi]);

  return { resend, loading };
};

// ==================== Type Exports ====================

export type { UseVerificationReturn, VerificationStatus };
