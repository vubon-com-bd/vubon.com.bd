/**
 * usePhoneVerification Hook - Phone verification orchestration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * FIXES:
 * - useIsPhoneVerified now fetches from API when cache is empty
 * - Removed unsafe `as any` type assertions
 * - Added proper type-safe error handling
 * - Improved TypeScript types for API responses
 *
 * @module shared-hooks/src/verification/usePhoneVerification
 */

import { useMutation, useQuery, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createVerificationEndpoints } from '@vubon/shared-api/endpoints/verification';
import type { ApiResponse } from '@vubon/shared-types';

// ==================== Types ====================

export type PhoneVerificationMethod = 'sms' | 'whatsapp' | 'imo' | 'voice';

export interface SendPhoneVerificationRequest {
  phoneNumber: string;
  method?: PhoneVerificationMethod;
  locale?: 'en' | 'bn';
}

export interface SendPhoneVerificationResponse {
  success: boolean;
  message: string;
  messageBn?: string;
  maskedPhone: string;
  method: PhoneVerificationMethod;
  expiresInSeconds: number;
  resendCooldownSeconds: number;
  sessionId: string;
  remainingAttempts: number;
}

export interface VerifyPhoneCodeRequest {
  code: string;
  sessionId?: string;
  phoneNumber?: string;
}

export interface VerifyPhoneCodeResponse {
  success: boolean;
  verified: boolean;
  message: string;
  messageBn?: string;
  remainingAttempts?: number;
}

export interface PhoneVerificationError {
  message: string;
  messageBn?: string;
  code?: string;
  remainingAttempts?: number;
  retryAfterSeconds?: number;
}

export type UseSendPhoneVerificationOptions = Omit<
  UseMutationOptions<SendPhoneVerificationResponse, PhoneVerificationError, SendPhoneVerificationRequest>,
  'mutationFn'
>;

export type UseVerifyPhoneCodeOptions = Omit<
  UseMutationOptions<VerifyPhoneCodeResponse, PhoneVerificationError, VerifyPhoneCodeRequest>,
  'mutationFn'
>;

export interface UsePhoneVerificationOptions {
  onSuccess?: (data: SendPhoneVerificationResponse | VerifyPhoneCodeResponse) => void;
  onError?: (error: PhoneVerificationError) => void;
  onSettled?: () => void;
}

// ==================== Query Keys ====================

const USER_QUERY_KEY = ['user'] as const;
const CURRENT_USER_QUERY_KEY = ['currentUser'] as const;
const VERIFICATION_STATUS_QUERY_KEY = ['verificationStatus'] as const;
const PHONE_VERIFICATION_STATUS_KEY = ['phoneVerificationStatus'] as const;

// Session storage key for phone verification session ID
const PHONE_VERIFICATION_SESSION_KEY = 'phoneVerificationSessionId';

// Helper to get endpoints with authenticated client
const getVerificationEndpoints = () => {
  return createVerificationEndpoints(getAxiosClient());
};

// Helper to extract data from API response
const extractData = <T>(response: ApiResponse<T>): T => response.data;

// Type for the verification status response from API
interface VerificationStatusResponse {
  emailVerified: boolean;
  phoneVerified: boolean;
  whatsappVerified?: boolean;
  fullyVerified: boolean;
  emailVerifiedAt?: string;
  phoneVerifiedAt?: string;
  whatsappVerifiedAt?: string;
}

// Helper to format error response (type-safe - no `as any`)
const formatError = (error: unknown): PhoneVerificationError => {
  if (error instanceof Error) {
    // Safely extract properties without `as any`
    const err = error as Error & {
      code?: string;
      messageBn?: string;
      remainingAttempts?: number;
      retryAfterSeconds?: number;
    };
    return {
      message: err.message,
      code: err.code,
      messageBn: err.messageBn,
      remainingAttempts: err.remainingAttempts,
      retryAfterSeconds: err.retryAfterSeconds,
    };
  }
  return { message: 'An unknown error occurred' };
};

// Helper to check if error is non-retryable
const isNonRetryableError = (error: PhoneVerificationError): boolean => {
  const nonRetryableMessages = [
    'invalid_phone_number',
    'max_attempts_exceeded',
    'phone_already_verified',
    'rate_limited',
  ];
  return nonRetryableMessages.some(msg => error.code?.toLowerCase().includes(msg) || error.message.toLowerCase().includes(msg));
};

// Helper to invalidate verification-related queries
const invalidateVerificationQueries = (queryClient: ReturnType<typeof useQueryClient>) => {
  queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
  queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
  queryClient.invalidateQueries({ queryKey: VERIFICATION_STATUS_QUERY_KEY });
  queryClient.invalidateQueries({ queryKey: PHONE_VERIFICATION_STATUS_KEY });
};

// Helper to store session ID
const storeSessionId = (sessionId: string): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(PHONE_VERIFICATION_SESSION_KEY, sessionId);
  }
};

// Helper to get stored session ID
const getStoredSessionId = (): string | null => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem(PHONE_VERIFICATION_SESSION_KEY);
  }
  return null;
};

// Helper to clear stored session ID
const clearStoredSessionId = (): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(PHONE_VERIFICATION_SESSION_KEY);
  }
};

// ==================== Hooks ====================

/**
 * Hook for sending phone verification code (Bangladesh specific)
 */
export const useSendPhoneVerification = (options?: UseSendPhoneVerificationOptions) => {
  const queryClient = useQueryClient();
  const endpoints = getVerificationEndpoints();

  return useMutation({
    mutationFn: async (data: SendPhoneVerificationRequest): Promise<SendPhoneVerificationResponse> => {
      const response = await endpoints.sendPhoneVerification(
        data.phoneNumber,
        data.method || 'sms',
        data.locale
      );

      return {
        success: response.success,
        message: response.message,
        messageBn: response.messageBn,
        maskedPhone: response.maskedTarget,
        method: (data.method || 'sms') as PhoneVerificationMethod,
        expiresInSeconds: response.expiresInSeconds,
        resendCooldownSeconds: response.resendCooldownSeconds,
        sessionId: response.sessionId || '',
        remainingAttempts: response.remainingAttempts ?? 3,
      };
    },
    onSuccess: (data) => {
      if (data.sessionId) {
        storeSessionId(data.sessionId);
      }
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      const formattedError = formatError(error);
      options?.onError?.(formattedError);
    },
    onSettled: () => {
      options?.onSettled?.();
    },
    retry: (failureCount, error) => {
      const formattedError = formatError(error);
      if (isNonRetryableError(formattedError)) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

/**
 * Hook for sending WhatsApp verification (Bangladesh specific)
 */
export const useSendWhatsAppVerification = (options?: UseSendPhoneVerificationOptions) => {
  const sendVerification = useSendPhoneVerification(options);

  return {
    mutate: (phoneNumber: string, locale?: 'en' | 'bn') =>
      sendVerification.mutate({ phoneNumber, method: 'whatsapp', locale }),
    mutateAsync: (phoneNumber: string, locale?: 'en' | 'bn') =>
      sendVerification.mutateAsync({ phoneNumber, method: 'whatsapp', locale }),
    isLoading: sendVerification.isLoading,
    isError: sendVerification.isError,
    error: sendVerification.error,
    data: sendVerification.data,
  };
};

/**
 * Hook for sending IMO verification (Bangladesh specific)
 */
export const useSendImoVerification = (options?: UseSendPhoneVerificationOptions) => {
  const sendVerification = useSendPhoneVerification(options);

  return {
    mutate: (phoneNumber: string, locale?: 'en' | 'bn') =>
      sendVerification.mutate({ phoneNumber, method: 'imo', locale }),
    mutateAsync: (phoneNumber: string, locale?: 'en' | 'bn') =>
      sendVerification.mutateAsync({ phoneNumber, method: 'imo', locale }),
    isLoading: sendVerification.isLoading,
    isError: sendVerification.isError,
    error: sendVerification.error,
    data: sendVerification.data,
  };
};

/**
 * Hook for sending voice OTP verification (Bangladesh specific - for feature phones)
 */
export const useSendVoiceVerification = (options?: UseSendPhoneVerificationOptions) => {
  const sendVerification = useSendPhoneVerification(options);

  return {
    mutate: (phoneNumber: string, locale?: 'en' | 'bn') =>
      sendVerification.mutate({ phoneNumber, method: 'voice', locale }),
    mutateAsync: (phoneNumber: string, locale?: 'en' | 'bn') =>
      sendVerification.mutateAsync({ phoneNumber, method: 'voice', locale }),
    isLoading: sendVerification.isLoading,
    isError: sendVerification.isError,
    error: sendVerification.error,
    data: sendVerification.data,
  };
};

/**
 * Hook for verifying phone number with OTP code
 */
export const useVerifyPhoneCode = (options?: UseVerifyPhoneCodeOptions) => {
  const queryClient = useQueryClient();
  const endpoints = getVerificationEndpoints();

  return useMutation({
    mutationFn: async (request: VerifyPhoneCodeRequest): Promise<VerifyPhoneCodeResponse> => {
      const sessionId = request.sessionId || getStoredSessionId();

      const response = await endpoints.verify({
        type: 'phone',
        code: request.code,
        sessionId: sessionId || undefined,
      });

      return {
        success: response.success,
        verified: response.verified,
        message: response.message || (response.verified ? 'Phone verified successfully' : 'Verification failed'),
        messageBn: response.messageBn,
        remainingAttempts: response.remainingAttempts,
      };
    },
    onSuccess: (data) => {
      if (data.verified) {
        clearStoredSessionId();
        invalidateVerificationQueries(queryClient);
      }
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      const formattedError = formatError(error);
      options?.onError?.(formattedError);
    },
    onSettled: () => {
      options?.onSettled?.();
    },
    retry: (failureCount, error) => {
      const formattedError = formatError(error);
      if (isNonRetryableError(formattedError) || formattedError.code === 'invalid_code') {
        return false;
      }
      return failureCount < 1;
    },
  });
};

/**
 * Hook for resending phone verification OTP
 */
export const useResendPhoneVerification = (options?: UseSendPhoneVerificationOptions) => {
  const sendVerification = useSendPhoneVerification(options);

  return {
    mutate: (phoneNumber: string, method?: PhoneVerificationMethod) =>
      sendVerification.mutate({ phoneNumber, method }),
    mutateAsync: (phoneNumber: string, method?: PhoneVerificationMethod) =>
      sendVerification.mutateAsync({ phoneNumber, method }),
    isLoading: sendVerification.isLoading,
    isError: sendVerification.isError,
    error: sendVerification.error,
    data: sendVerification.data,
  };
};

/**
 * Hook for checking phone verification status
 * FIXED: Fetches from API when cache is empty
 */
export const useIsPhoneVerified = () => {
  const queryClient = useQueryClient();
  const endpoints = getVerificationEndpoints();

  // First check cache
  const cachedStatus = queryClient.getQueryData<{ phoneVerified: boolean }>(VERIFICATION_STATUS_QUERY_KEY);

  const query = useQuery({
    queryKey: PHONE_VERIFICATION_STATUS_KEY,
    queryFn: async (): Promise<{ phoneVerified: boolean; phoneVerifiedAt?: string }> => {
      const response = await endpoints.getStatus();
      const data = extractData<VerificationStatusResponse>(response);
      // Update cache
      queryClient.setQueryData(VERIFICATION_STATUS_QUERY_KEY, {
        emailVerified: data.emailVerified,
        phoneVerified: data.phoneVerified,
        fullyVerified: data.fullyVerified,
      });
      return {
        phoneVerified: data.phoneVerified,
        phoneVerifiedAt: data.phoneVerifiedAt,
      };
    },
    staleTime: 30 * 1000, // 30 seconds
    enabled: cachedStatus === undefined, // Only fetch if cache is empty
  });

  // Return cached value if available, otherwise use query result
  if (cachedStatus !== undefined) {
    return {
      isPhoneVerified: cachedStatus.phoneVerified ?? false,
      isLoading: false,
      refetch: () => query.refetch(),
    };
  }

  return {
    isPhoneVerified: query.data?.phoneVerified ?? false,
    isLoading: query.isLoading,
    refetch: () => query.refetch(),
  };
};

/**
 * Hook for resending phone verification with cooldown management
 */
export const useResendWithCooldown = () => {
  const [remainingSeconds, setRemainingSeconds] = React.useState(0);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const startCooldown = React.useCallback((seconds: number) => {
    setRemainingSeconds(seconds);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const canResend = remainingSeconds === 0;

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const resend = useResendPhoneVerification({
    onSuccess: (data) => {
      startCooldown(data.resendCooldownSeconds);
    },
  });

  return {
    resend: resend.mutate,
    resendAsync: resend.mutateAsync,
    isLoading: resend.isLoading,
    remainingSeconds,
    canResend,
    startCooldown,
  };
};

// Import React for hooks
import React from 'react';

// ==================== Type Exports ====================

export type {
  UsePhoneVerificationOptions,
  SendPhoneVerificationRequest,
  SendPhoneVerificationResponse,
  VerifyPhoneCodeRequest,
  VerifyPhoneCodeResponse,
  PhoneVerificationError,
  PhoneVerificationMethod,
  UseSendPhoneVerificationOptions,
  UseVerifyPhoneCodeOptions,
};
