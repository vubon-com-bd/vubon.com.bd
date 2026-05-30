/**
 * useResendVerification Hook - Resend verification email/OTP mutation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-hooks/src/auth/useResendVerification
 *
 * RULES:
 * ✅ ONLY mutation orchestration - NO business logic
 * ✅ NO email provider logic, SMS provider logic
 * ✅ Uses shared-api (not raw fetch)
 * ✅ React Query integration
 * ✅ TypeScript strict
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createVerificationEndpoints } from '@vubon/shared-api/endpoints/verification';
import type { ApiResponse } from '@vubon/shared-types';

// ==================== Types ====================

export type VerificationType = 'email' | 'phone' | 'whatsapp' | 'imo';

export interface ResendVerificationRequest {
  /** Type of verification to resend */
  type: VerificationType;
  /** Email address (for email verification) */
  email?: string;
  /** Phone number (for phone/WhatsApp/Imo verification) */
  phoneNumber?: string;
  /** Session ID from previous verification attempt */
  sessionId?: string;
  /** Method for phone verification (default: 'sms') */
  method?: 'sms' | 'whatsapp' | 'imo' | 'voice';
  /** Language for messages (en/bn) */
  locale?: 'en' | 'bn';
}

export interface ResendVerificationResponse {
  success: boolean;
  message: string;
  messageBn?: string;
  maskedTarget: string;
  expiresInSeconds: number;
  resendCooldownSeconds: number;
  sessionId?: string;
  remainingAttempts?: number;
}

export interface UseResendVerificationOptions {
  onSuccess?: (data: ResendVerificationResponse) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}

// Type for the internal API response (before mapping)
interface VerificationApiResendResponse {
  success: boolean;
  message: string;
  messageBn?: string;
  expiresInSeconds: number;
  resendCooldownSeconds: number;
  sessionId?: string;
  remainingAttempts?: number;
}

// Helper to get masked target from type and identifier
const getMaskedTarget = (type: VerificationType, email?: string, phoneNumber?: string): string => {
  if (type === 'email' && email) {
    const [username, domain] = email.split('@');
    const maskedUsername = username ? username.slice(0, 2) + '***' : '***';
    return `${maskedUsername}@${domain || 'example.com'}`;
  }
  if ((type === 'phone' || type === 'whatsapp' || type === 'imo') && phoneNumber) {
    // Mask phone: keep first 3 and last 3 digits
    const cleaned = phoneNumber.replace(/[^0-9]/g, '');
    if (cleaned.length >= 6) {
      return cleaned.slice(0, 3) + '*****' + cleaned.slice(-3);
    }
    return '***';
  }
  return '***';
};

// ==================== Query Keys ====================

const getVerificationStatusQueryKey = () => ['verificationStatus'] as const;

// Helper to ensure endpoints are initialized
const getVerificationEndpoints = () => {
  return createVerificationEndpoints(getAxiosClient());
};

// ==================== Hook ====================

/**
 * Hook for resending verification email or OTP
 * Uses shared-api layer instead of raw fetch
 *
 * @example
 * // Resend email verification
 * const { mutate: resendVerification, isLoading } = useResendVerification({
 *   onSuccess: (data) => {
 *     console.log('Verification sent to:', data.maskedTarget);
 *   },
 *   onError: (error) => {
 *     console.error('Failed:', error.message);
 *   }
 * });
 *
 * resendVerification({ type: 'email', email: 'user@example.com' });
 *
 * @example
 * // Resend phone OTP (Bangladesh specific)
 * resendVerification({
 *   type: 'phone',
 *   phoneNumber: '01712345678',
 *   method: 'whatsapp',
 *   locale: 'bn'
 * });
 */
export const useResendVerification = (options?: UseResendVerificationOptions) => {
  const queryClient = useQueryClient();
  const endpoints = getVerificationEndpoints();

  return useMutation({
    mutationFn: async (request: ResendVerificationRequest): Promise<ResendVerificationResponse> => {
      const response = await endpoints.resendVerification(request.type, request.sessionId) as unknown as VerificationApiResendResponse;

      const maskedTarget = getMaskedTarget(request.type, request.email, request.phoneNumber);

      return {
        success: response.success,
        message: response.message,
        messageBn: response.messageBn,
        maskedTarget,
        expiresInSeconds: response.expiresInSeconds,
        resendCooldownSeconds: response.resendCooldownSeconds,
        sessionId: response.sessionId,
        remainingAttempts: response.remainingAttempts,
      };
    },
    onSuccess: (data) => {
      // Invalidate verification status to refresh
      queryClient.invalidateQueries({ queryKey: getVerificationStatusQueryKey() });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
    onSettled: () => {
      options?.onSettled?.();
    },
  });
};

/**
 * Type-safe wrapper for email verification resend
 * Uses the same useResendVerification hook internally
 *
 * @example
 * const { mutate: resendEmail, isLoading } = useResendEmailVerification({
 *   onSuccess: (data) => {
 *     console.log('Email sent to:', data.maskedTarget);
 *   }
 * });
 *
 * resendEmail('user@example.com');
 */
export const useResendEmailVerification = (options?: UseResendVerificationOptions) => {
  const resendVerification = useResendVerification(options);

  return {
    mutate: (email: string) => resendVerification.mutate({ type: 'email', email }),
    mutateAsync: (email: string) => resendVerification.mutateAsync({ type: 'email', email }),
    isLoading: resendVerification.isLoading,
    isError: resendVerification.isError,
    error: resendVerification.error,
    data: resendVerification.data,
  };
};

/**
 * Type-safe wrapper for phone OTP verification resend (Bangladesh specific)
 * Uses the same useResendVerification hook internally
 *
 * @example
 * const { mutate: resendPhone } = useResendPhoneVerification({
 *   onSuccess: (data) => {
 *     console.log('OTP sent to:', data.maskedTarget);
 *   }
 * });
 *
 * resendPhone('01712345678', 'whatsapp', 'bn');
 */
export const useResendPhoneVerification = (options?: UseResendVerificationOptions) => {
  const resendVerification = useResendVerification(options);

  return {
    mutate: (phoneNumber: string, method: 'sms' | 'whatsapp' | 'imo' | 'voice' = 'sms', locale?: 'en' | 'bn') =>
      resendVerification.mutate({ type: 'phone', phoneNumber, method, locale }),
    mutateAsync: (phoneNumber: string, method: 'sms' | 'whatsapp' | 'imo' | 'voice' = 'sms', locale?: 'en' | 'bn') =>
      resendVerification.mutateAsync({ type: 'phone', phoneNumber, method, locale }),
    isLoading: resendVerification.isLoading,
    isError: resendVerification.isError,
    error: resendVerification.error,
    data: resendVerification.data,
  };
};

/**
 * Type-safe wrapper for WhatsApp verification resend (Bangladesh specific)
 *
 * @example
 * const { mutate: resendWhatsApp } = useResendWhatsAppVerification({
 *   onSuccess: (data) => {
 *     console.log('WhatsApp OTP sent to:', data.maskedTarget);
 *   }
 * });
 *
 * resendWhatsApp('01712345678', 'bn');
 */
export const useResendWhatsAppVerification = (options?: UseResendVerificationOptions) => {
  const resendVerification = useResendVerification(options);

  return {
    mutate: (phoneNumber: string, locale?: 'en' | 'bn') =>
      resendVerification.mutate({
        type: 'whatsapp',
        phoneNumber,
        method: 'whatsapp',
        locale,
      }),
    mutateAsync: (phoneNumber: string, locale?: 'en' | 'bn') =>
      resendVerification.mutateAsync({
        type: 'whatsapp',
        phoneNumber,
        method: 'whatsapp',
        locale,
      }),
    isLoading: resendVerification.isLoading,
    isError: resendVerification.isError,
    error: resendVerification.error,
    data: resendVerification.data,
  };
};

// ==================== Type Exports ====================

export type {
  UseResendVerificationOptions,
  ResendVerificationRequest,
  ResendVerificationResponse,
};
