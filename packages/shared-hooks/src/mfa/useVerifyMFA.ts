/**
 * useVerifyMFA Hook - MFA verification mutation with shared-api integration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * IMPROVEMENTS:
 * - Uses shared-api instead of raw fetch for consistent error handling
 * - Proper TypeScript types with shared-types integration
 * - Added Bengali message support
 * - Proper retry logic and error handling
 * - Cache invalidation for MFA status, user, and sessions
 * - Type-safe verification types using constants
 *
 * @module shared-hooks/src/mfa/useVerifyMFA
 *
 * RULES:
 * ✅ ONLY mutation orchestration - NO business logic
 * ✅ NO TOTP algorithm implementation (handled by backend)
 * ✅ Uses shared-api (not raw fetch)
 * ✅ React Query integration with proper caching
 * ✅ TypeScript strict
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createMfaEndpoints } from '@vubon/shared-api/endpoints/mfa';
import type { ApiResponse } from '@vubon/shared-types';
import { MFA_VERIFICATION_TYPES } from '@vubon/auth-constants';

// ==================== Types ====================

// Using constants from shared-constants for type safety
export type MFAVerificationType = typeof MFA_VERIFICATION_TYPES[keyof typeof MFA_VERIFICATION_TYPES];

// Extended types for Bangladesh specific verification
export type ExtendedMFAVerificationType = 
  | MFAVerificationType
  | 'high_value_order'
  | 'international_order'
  | 'bulk_order'
  | 'first_time_payment';

export interface VerifyMFARequest {
  methodId?: string;
  code: string;
  verificationType: ExtendedMFAVerificationType;
  trustDevice?: boolean;
  trustDurationDays?: number;
  challengeId?: string;
}

export interface VerifyMFAResponse {
  success: boolean;
  verified: boolean;
  methodUsed: string | null;
  remainingAttempts: number;
  isLocked: boolean;
  lockExpiresAt?: string;
  lockExpiresAtBn?: string; // বাংলাদেশ স্পেসিফিক
  error?: string;
  errorCode?: 'invalid_code' | 'method_locked' | 'max_attempts_exceeded' | 'method_not_found' | 'verification_expired';
  requiresAlternativeMethod?: boolean;
  alternativeMethods?: string[];
  sessionId?: string;
  message?: string;
  messageBn?: string; // বাংলাদেশ স্পেসিফিক
}

export interface UseVerifyMFAOptions {
  onSuccess?: (data: VerifyMFAResponse) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  /** Whether to invalidate user session after verification (default: true for login type) */
  invalidateSession?: boolean;
  /** Whether to enable retry for transient errors (default: false) */
  enableRetry?: boolean;
}

export interface UseVerifyMFAReturn {
  mutate: (data: VerifyMFARequest) => void;
  mutateAsync: (data: VerifyMFARequest) => Promise<VerifyMFAResponse>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: VerifyMFAResponse | undefined;
}

// ==================== Query Keys ====================

const MFA_STATUS_QUERY_KEY = ['mfaStatus'] as const;
const MFA_METHODS_QUERY_KEY = ['mfaMethods'] as const;
const USER_QUERY_KEY = ['user'] as const;
const CURRENT_USER_QUERY_KEY = ['currentUser'] as const;
const SESSIONS_QUERY_KEY = ['sessions'] as const;
const ACCOUNT_LOCK_QUERY_KEY = ['accountLock'] as const;

// Helper to get endpoints with authenticated client
const getMfaEndpoints = () => {
  return createMfaEndpoints(getAxiosClient());
};

// Helper to extract data from API response
const extractData = <T>(response: ApiResponse<T>): T => response.data;

// Helper to check if error is non-retryable
const isNonRetryableError = (error: Error): boolean => {
  const nonRetryableMessages = [
    'invalid_code',
    'method_locked',
    'max_attempts_exceeded',
    'method_not_found',
  ];
  return nonRetryableMessages.some(msg => error.message.toLowerCase().includes(msg));
};

// Helper to determine if session should be invalidated based on verification type
const shouldInvalidateSession = (verificationType: ExtendedMFAVerificationType): boolean => {
  const sessionInvalidatingTypes: ExtendedMFAVerificationType[] = [
    'login',
    'password_change',
    'sensitive_change',
  ];
  return sessionInvalidatingTypes.includes(verificationType);
};

// ==================== Hook ====================

/**
 * Hook for verifying MFA code during authentication or sensitive actions
 * Uses shared-api instead of raw fetch for consistent error handling and auth
 *
 * @example
 * // During login flow
 * const { mutate: verifyMFA, isLoading } = useVerifyMFA({
 *   onSuccess: (data) => {
 *     if (data.verified) {
 *       console.log('MFA verified, login complete');
 *       // Redirect to dashboard
 *     } else if (data.remainingAttempts > 0) {
 *       console.log(`Verification failed, ${data.remainingAttempts} attempts left`);
 *     }
 *   },
 *   onError: (error) => {
 *     console.error('MFA verification failed:', error.message);
 *   }
 * });
 *
 * verifyMFA({
 *   code: '123456',
 *   verificationType: 'login',
 *   trustDevice: true,
 *   trustDurationDays: 30
 * });
 *
 * @example
 * // For payment verification (Bangladesh high-value orders)
 * verifyMFA({
 *   code: '123456',
 *   verificationType: 'high_value_order',
 *   challengeId: 'challenge-123'
 * });
 */
export const useVerifyMFA = (options?: UseVerifyMFAOptions): UseVerifyMFAReturn => {
  const queryClient = useQueryClient();
  const endpoints = getMfaEndpoints();
  const enableRetry = options?.enableRetry ?? false;

  const mutation = useMutation({
    mutationFn: async (data: VerifyMFARequest): Promise<VerifyMFAResponse> => {
      const response = await endpoints.verifyMFA(
        data.code,
        data.methodId,
        data.trustDevice,
        data.challengeId
      );

      return {
        success: response.success,
        verified: response.verified,
        methodUsed: response.methodUsed,
        remainingAttempts: response.remainingAttempts,
        isLocked: response.isLocked,
        lockExpiresAt: response.lockExpiresAt,
        error: response.error,
        errorCode: response.errorCode,
        requiresAlternativeMethod: response.requiresAlternativeMethod,
        alternativeMethods: response.alternativeMethods,
        sessionId: response.sessionId,
        message: response.message,
        messageBn: (response as any).messageBn,
        lockExpiresAtBn: (response as any).lockExpiresAtBn,
      };
    },
    onSuccess: (data, variables) => {
      if (data.verified) {
        // Invalidate MFA status cache
        queryClient.invalidateQueries({ queryKey: MFA_STATUS_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: MFA_METHODS_QUERY_KEY });

        // Invalidate user data (MFA status may have changed)
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });

        // Invalidate sessions if needed
        const shouldInvalidate = options?.invalidateSession ?? shouldInvalidateSession(variables.verificationType);
        if (shouldInvalidate) {
          queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });
        }

        // Invalidate account lock status if verification failed previously
        if (data.isLocked === false) {
          queryClient.invalidateQueries({ queryKey: ACCOUNT_LOCK_QUERY_KEY });
        }
      } else if (data.isLocked) {
        // If account/method is locked, invalidate lock status
        queryClient.invalidateQueries({ queryKey: ACCOUNT_LOCK_QUERY_KEY });
      }

      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
    onSettled: () => {
      options?.onSettled?.();
    },
    retry: (failureCount, error) => {
      if (!enableRetry) return false;
      if (isNonRetryableError(error as Error)) {
        return false;
      }
      return failureCount < 2;
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error as Error | null,
    data: mutation.data,
  };
};

/**
 * Hook for MFA verification during login (with automatic redirect on success)
 *
 * @example
 * const { mutate: verifyMFALogin, isLoading } = useVerifyMFALogin({
 *   redirectUrl: '/dashboard',
 *   onSuccess: (data) => {
 *     console.log('MFA verified, redirecting...');
 *   }
 * });
 *
 * verifyMFALogin({ code: '123456', trustDevice: true });
 */
export const useVerifyMFALogin = (
  options?: UseVerifyMFAOptions & { redirectUrl?: string; autoRedirect?: boolean }
) => {
  const verifyMFA = useVerifyMFA({
    ...options,
    invalidateSession: true,
    onSuccess: (data) => {
      if (data.verified && options?.autoRedirect !== false) {
        const redirectUrl = options?.redirectUrl || '/dashboard';
        // Use window.location for full page redirect
        if (typeof window !== 'undefined') {
          window.location.href = redirectUrl;
        }
      }
      options?.onSuccess?.(data);
    },
  });

  return {
    mutate: (code: string, trustDevice?: boolean, trustDurationDays?: number, methodId?: string) =>
      verifyMFA.mutate({ code, verificationType: 'login', trustDevice, trustDurationDays, methodId }),
    mutateAsync: (code: string, trustDevice?: boolean, trustDurationDays?: number, methodId?: string) =>
      verifyMFA.mutateAsync({ code, verificationType: 'login', trustDevice, trustDurationDays, methodId }),
    isLoading: verifyMFA.isLoading,
    isError: verifyMFA.isError,
    error: verifyMFA.error,
    data: verifyMFA.data,
  };
};

/**
 * Hook for MFA verification during payment (high-value transactions - Bangladesh specific)
 *
 * @example
 * const { mutate: verifyMFAPayment, isLoading } = useVerifyMFAPayment({
 *   onSuccess: (data) => {
 *     if (data.verified) {
 *       // Process payment
 *       processPayment();
 *     }
 *   }
 * });
 *
 * verifyMFAPayment({ code: '123456', challengeId: 'payment-challenge-123' });
 */
export const useVerifyMFAPayment = (options?: UseVerifyMFAOptions) => {
  const verifyMFA = useVerifyMFA({
    ...options,
    invalidateSession: false, // Payment verification shouldn't invalidate session
  });

  return {
    mutate: (code: string, challengeId?: string, trustDevice?: boolean, methodId?: string) =>
      verifyMFA.mutate({ code, verificationType: 'payment', challengeId, trustDevice, methodId }),
    mutateAsync: (code: string, challengeId?: string, trustDevice?: boolean, methodId?: string) =>
      verifyMFA.mutateAsync({ code, verificationType: 'payment', challengeId, trustDevice, methodId }),
    isLoading: verifyMFA.isLoading,
    isError: verifyMFA.isError,
    error: verifyMFA.error,
    data: verifyMFA.data,
  };
};

/**
 * Hook for MFA verification for high-value orders (Bangladesh specific)
 * Orders above 25,000 BDT require additional verification
 *
 * @example
 * const { mutate: verifyHighValueOrder } = useVerifyHighValueOrder({
 *   onSuccess: (data) => {
 *     if (data.verified) {
 *       // Proceed with order confirmation
 *       confirmOrder();
 *     }
 *   }
 * });
 *
 * verifyHighValueOrder({ code: '123456', orderId: 'order-123' });
 */
export const useVerifyHighValueOrder = (options?: UseVerifyMFAOptions) => {
  const verifyMFA = useVerifyMFA({
    ...options,
    invalidateSession: false,
  });

  return {
    mutate: (code: string, orderId?: string, challengeId?: string, methodId?: string) =>
      verifyMFA.mutate({
        code,
        verificationType: 'high_value_order',
        challengeId: challengeId || orderId,
        methodId,
      }),
    mutateAsync: (code: string, orderId?: string, challengeId?: string, methodId?: string) =>
      verifyMFA.mutateAsync({
        code,
        verificationType: 'high_value_order',
        challengeId: challengeId || orderId,
        methodId,
      }),
    isLoading: verifyMFA.isLoading,
    isError: verifyMFA.isError,
    error: verifyMFA.error,
    data: verifyMFA.data,
  };
};

/**
 * Hook for MFA verification for sensitive account changes
 * (email change, phone change, password change)
 *
 * @example
 * const { mutate: verifySensitiveChange } = useVerifySensitiveChange({
 *   onSuccess: (data) => {
 *     if (data.verified) {
 *       // Proceed with sensitive change
 *       updateEmail();
 *     }
 *   }
 * });
 *
 * verifySensitiveChange({ code: '123456', challengeId: 'email-change-123' });
 */
export const useVerifySensitiveChange = (options?: UseVerifyMFAOptions) => {
  const verifyMFA = useVerifyMFA({
    ...options,
    invalidateSession: true, // Sensitive changes should invalidate session
  });

  return {
    mutate: (code: string, challengeId?: string, methodId?: string, trustDevice?: boolean) =>
      verifyMFA.mutate({
        code,
        verificationType: 'sensitive_change',
        challengeId,
        methodId,
        trustDevice,
      }),
    mutateAsync: (code: string, challengeId?: string, methodId?: string, trustDevice?: boolean) =>
      verifyMFA.mutateAsync({
        code,
        verificationType: 'sensitive_change',
        challengeId,
        methodId,
        trustDevice,
      }),
    isLoading: verifyMFA.isLoading,
    isError: verifyMFA.isError,
    error: verifyMFA.error,
    data: verifyMFA.data,
  };
};

// ==================== Type Exports ====================

export type {
  UseVerifyMFAOptions,
  UseVerifyMFAReturn,
  VerifyMFARequest,
  VerifyMFAResponse,
  MFAVerificationType,
  ExtendedMFAVerificationType,
};
