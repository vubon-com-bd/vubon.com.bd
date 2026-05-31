/**
 * usePhoneVerification Hook - Phone verification orchestration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * IMPROVEMENTS:
 * - Uses shared-api instead of raw fetch for consistent error handling
 * - Proper TypeScript types with shared-types integration
 * - Added Bengali message support (messageBn)
 * - Proper retry logic and error handling
 * - Cache invalidation strategies
 * - Type-safe query keys
 * - Proper loading states and error formatting
 * - Cooldown management for resend functionality
 *
 * @module shared-hooks/src/verification/usePhoneVerification
 *
 * RULES:
 * ✅ ONLY mutation orchestration - NO business logic
 * ✅ NO SMS provider integration (handled by backend)
 * ✅ React Query integration with cache invalidation
 * ✅ TypeScript strict
 */

import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
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

// Helper to format error response
const formatError = (error: unknown): PhoneVerificationError => {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: (error as any).code,
      messageBn: (error as any).messageBn,
      remainingAttempts: (error as any).remainingAttempts,
      retryAfterSeconds: (error as any).retryAfterSeconds,
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
 * Uses shared-api instead of raw fetch for consistent error handling and auth
 *
 * @example
 * const { mutate: sendVerification, isLoading } = useSendPhoneVerification({
 *   onSuccess: (data) => {
 *     console.log('OTP sent to:', data.maskedPhone);
 *     console.log('Expires in:', data.expiresInSeconds, 'seconds');
 *     // Store sessionId for verification
 *     setSessionId(data.sessionId);
 *   },
 *   onError: (error) => {
 *     console.error('Failed to send OTP:', error.message);
 *     if (error.remainingAttempts) {
 *       console.log(`${error.remainingAttempts} attempts remaining`);
 *     }
 *   },
 *   retry: (failureCount, error) => {
 *     // Don't retry on rate limit
 *     return error.code !== 'rate_limited';
 *   }
 * });
 *
 * sendVerification({ phoneNumber: '01712345678', method: 'whatsapp', locale: 'bn' });
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
        remainingAttempts: (response as any).remainingAttempts || 3,
      };
    },
    onSuccess: (data) => {
      // Store session ID for later verification
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
 * Simplified wrapper around useSendPhoneVerification
 *
 * @example
 * const { mutate: sendWhatsAppVerification, isLoading } = useSendWhatsAppVerification({
 *   onSuccess: (data) => {
 *     console.log('WhatsApp verification sent to:', data.maskedPhone);
 *   },
 *   onError: (error) => {
 *     console.error('Failed:', error.message);
 *   }
 * });
 *
 * sendWhatsAppVerification('01712345678', 'bn');
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
 * Simplified wrapper around useSendPhoneVerification
 *
 * @example
 * const { mutate: sendImoVerification } = useSendImoVerification({
 *   onSuccess: (data) => {
 *     console.log('IMO verification sent');
 *   }
 * });
 *
 * sendImoVerification('01712345678');
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
 * Simplified wrapper around useSendPhoneVerification
 *
 * @example
 * const { mutate: sendVoiceVerification } = useSendVoiceVerification({
 *   onSuccess: (data) => {
 *     console.log('Voice OTP call initiated');
 *   }
 * });
 *
 * sendVoiceVerification('01712345678', 'bn');
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
 * Uses shared-api instead of raw fetch for consistent error handling
 *
 * @example
 * const { mutate: verifyPhone, isLoading } = useVerifyPhoneCode({
 *   onSuccess: (data) => {
 *     if (data.verified) {
 *       console.log('Phone number verified successfully');
 *     } else if (data.remainingAttempts > 0) {
 *       console.log(`Verification failed, ${data.remainingAttempts} attempts left`);
 *     }
 *   },
 *   onError: (error) => {
 *     console.error('Verification failed:', error.message);
 *   },
 *   retry: (failureCount, error) => {
 *     // Don't retry verification on invalid code
 *     return error.code !== 'invalid_code';
 *   }
 * });
 *
 * verifyPhone({ code: '123456', sessionId: 'session-123' });
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
        // Clear stored session ID
        clearStoredSessionId();

        // Invalidate user data to reflect verified status
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
      // Don't retry verification on invalid code or max attempts exceeded
      if (isNonRetryableError(formattedError) || formattedError.code === 'invalid_code') {
        return false;
      }
      return failureCount < 1; // Verification shouldn't retry automatically
    },
  });
};

/**
 * Hook for resending phone verification OTP
 * Uses shared-api for consistent error handling
 *
 * @example
 * const { mutate: resendVerification, isLoading } = useResendPhoneVerification({
 *   onSuccess: (data) => {
 *     console.log('OTP resent, cooldown:', data.resendCooldownSeconds);
 *   },
 *   onError: (error) => {
 *     if (error.retryAfterSeconds) {
 *       console.log(`Please wait ${error.retryAfterSeconds} seconds`);
 *     }
 *   }
 * });
 *
 * resendVerification('01712345678');
 *
 * // With specific method
 * resendVerification('01712345678', 'whatsapp');
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
 *
 * @example
 * const { isPhoneVerified, isLoading } = useIsPhoneVerified();
 *
 * if (!isPhoneVerified && !isLoading) {
 *   return <VerifyPhonePrompt />;
 * }
 */
export const useIsPhoneVerified = () => {
  const queryClient = useQueryClient();

  // Get verification status from cache
  const verificationStatus = queryClient.getQueryData<{ phoneVerified: boolean }>(VERIFICATION_STATUS_QUERY_KEY);

  return {
    isPhoneVerified: verificationStatus?.phoneVerified ?? false,
  };
};

/**
 * Hook for resending phone verification with cooldown management
 *
 * @example
 * const { resend, remainingSeconds, canResend, startCooldown } = useResendWithCooldown();
 *
 * const handleResend = () => {
 *   resend('01712345678', {
 *     onSuccess: (data) => {
 *       startCooldown(data.resendCooldownSeconds);
 *     }
 *   });
 * };
 *
 * <Button onClick={handleResend} disabled={!canResend}>
 *   {canResend ? 'Resend OTP' : `Wait ${remainingSeconds}s`}
 * </Button>
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
