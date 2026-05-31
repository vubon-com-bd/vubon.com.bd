/**
 * useEmailVerification Hook - Email verification orchestration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * IMPROVEMENTS:
 * - Uses shared-api instead of raw fetch
 * - Proper TypeScript types with shared-types integration
 * - Added Bengali message support
 * - Proper retry logic and error handling
 * - Cache invalidation strategies
 * - Type-safe query keys
 * - Added proper loading states and error formatting
 * 
 * @module shared-hooks/src/verification/useEmailVerification
 * 
 * RULES:
 * ✅ ONLY mutation orchestration - NO business logic
 * ✅ NO mail delivery logic (handled by backend)
 * ✅ React Query integration with cache invalidation
 * ✅ TypeScript strict
 */

import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createVerificationEndpoints } from '@vubon/shared-api/endpoints/verification';
import type { ApiResponse } from '@vubon/shared-types';

// ==================== Types ====================

export interface SendEmailVerificationRequest {
  email?: string;
  locale?: 'en' | 'bn';
}

export interface SendEmailVerificationResponse {
  success: boolean;
  message: string;
  messageBn?: string;
  maskedEmail: string;
  expiresInSeconds: number;
  resendCooldownSeconds: number;
  sessionId?: string;
}

export interface VerifyEmailCodeRequest {
  code: string;
  token?: string;
  sessionId?: string;
}

export interface VerifyEmailCodeResponse {
  success: boolean;
  verified: boolean;
  message: string;
  messageBn?: string;
  email?: string;
  verifiedAt?: string;
  remainingAttempts?: number;
}

export interface EmailVerificationStatus {
  verified: boolean;
  verifiedAt?: string;
  email?: string;
  emailVerified?: boolean;
}

export interface VerificationError {
  message: string;
  messageBn?: string;
  code?: string;
  remainingAttempts?: number;
  retryAfterSeconds?: number;
}

export type UseSendEmailVerificationOptions = Omit<
  UseMutationOptions<SendEmailVerificationResponse, VerificationError, SendEmailVerificationRequest | void>,
  'mutationFn'
>;

export type UseVerifyEmailCodeOptions = Omit<
  UseMutationOptions<VerifyEmailCodeResponse, VerificationError, VerifyEmailCodeRequest>,
  'mutationFn'
>;

export interface UseEmailVerificationStatusOptions extends Omit<UseQueryOptions<EmailVerificationStatus, VerificationError>, 'queryKey' | 'queryFn'> {
  enabled?: boolean;
  staleTime?: number;
}

// ==================== Query Keys ====================

const USER_QUERY_KEY = ['user'] as const;
const CURRENT_USER_QUERY_KEY = ['currentUser'] as const;
const VERIFICATION_STATUS_QUERY_KEY = ['verificationStatus'] as const;
const EMAIL_VERIFICATION_STATUS_KEY = ['emailVerificationStatus'] as const;

// Helper to get endpoints with authenticated client
const getVerificationEndpoints = () => {
  return createVerificationEndpoints(getAxiosClient());
};

// Helper to extract data from API response
const extractData = <T>(response: ApiResponse<T>): T => response.data;

// Helper to format error response
const formatError = (error: unknown): VerificationError => {
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
const isNonRetryableError = (error: VerificationError): boolean => {
  const nonRetryableMessages = ['invalid_code', 'code_expired', 'max_attempts_exceeded', 'email_already_verified'];
  return nonRetryableMessages.some(msg => error.code?.toLowerCase().includes(msg) || error.message.toLowerCase().includes(msg));
};

// Helper to invalidate verification-related queries
const invalidateVerificationQueries = (queryClient: ReturnType<typeof useQueryClient>) => {
  queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
  queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
  queryClient.invalidateQueries({ queryKey: VERIFICATION_STATUS_QUERY_KEY });
  queryClient.invalidateQueries({ queryKey: EMAIL_VERIFICATION_STATUS_KEY });
};

// ==================== Hooks ====================

/**
 * Hook for sending email verification using shared-api
 * 
 * @example
 * const { mutate: sendVerification, isLoading } = useSendEmailVerification({
 *   onSuccess: (data) => {
 *     console.log('Verification email sent to:', data.maskedEmail);
 *   },
 *   onError: (error) => {
 *     console.error('Failed to send:', error.message);
 *     if (error.remainingAttempts) {
 *       console.log(`${error.remainingAttempts} attempts remaining`);
 *     }
 *   },
 *   retry: (failureCount, error) => {
 *     // Don't retry on validation errors
 *     return error.code !== 'validation_error';
 *   }
 * });
 * 
 * // Usage
 * sendVerification(); // Send to current user's email
 * sendVerification({ email: 'user@example.com', locale: 'bn' }); // For specific email with Bengali
 */
export const useSendEmailVerification = (options?: UseSendEmailVerificationOptions) => {
  const queryClient = useQueryClient();
  const endpoints = getVerificationEndpoints();

  return useMutation({
    mutationFn: async (request?: SendEmailVerificationRequest): Promise<SendEmailVerificationResponse> => {
      // If no email provided, send to current user's email
      const payload: SendEmailVerificationRequest = request || {};
      
      const response = await endpoints.sendVerification({
        type: 'email',
        ...(payload.email ? { email: payload.email } : {}),
        locale: payload.locale,
      });
      
      return {
        success: response.success,
        message: response.message,
        messageBn: response.messageBn,
        maskedEmail: response.maskedTarget,
        expiresInSeconds: response.expiresInSeconds,
        resendCooldownSeconds: response.resendCooldownSeconds,
        sessionId: response.sessionId,
      };
    },
    onSuccess: (data) => {
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
 * Hook for verifying email with code using shared-api
 * 
 * @example
 * const { mutate: verifyEmail, isLoading } = useVerifyEmailCode({
 *   onSuccess: (data) => {
 *     if (data.verified) {
 *       console.log('Email verified successfully:', data.message);
 *     }
 *   },
 *   onError: (error) => {
 *     console.error('Verification failed:', error.message);
 *     if (error.remainingAttempts) {
 *       console.log(`${error.remainingAttempts} attempts remaining`);
 *     }
 *   },
 *   retry: (failureCount, error) => {
 *     // Don't retry verification on invalid code
 *     return error.code !== 'invalid_code';
 *   }
 * });
 * 
 * // Usage with OTP
 * verifyEmail({ code: '123456' });
 * 
 * // Usage with token (from email link)
 * verifyEmail({ token: 'verification-token-123' });
 * 
 * // Usage with session ID (for OTP flow)
 * verifyEmail({ code: '123456', sessionId: 'session-123' });
 */
export const useVerifyEmailCode = (options?: UseVerifyEmailCodeOptions) => {
  const queryClient = useQueryClient();
  const endpoints = getVerificationEndpoints();

  return useMutation({
    mutationFn: async (request: VerifyEmailCodeRequest): Promise<VerifyEmailCodeResponse> => {
      let response;
      
      if (request.token) {
        // Token-based verification (from email link)
        response = await endpoints.verifyEmail(request.token);
        return {
          success: response.success,
          verified: response.success,
          message: response.message || (response.success ? 'Email verified successfully' : 'Verification failed'),
          messageBn: (response as any).messageBn,
          email: (response as any).email,
          verifiedAt: (response as any).verifiedAt,
        };
      } else {
        // OTP-based verification
        response = await endpoints.verify({
          type: 'email',
          code: request.code,
          sessionId: request.sessionId,
        });
        return {
          success: response.success,
          verified: response.verified,
          message: response.message || (response.verified ? 'Email verified successfully' : 'Verification failed'),
          messageBn: response.messageBn,
          remainingAttempts: response.remainingAttempts,
        };
      }
    },
    onSuccess: (data) => {
      if (data.verified) {
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
      if (isNonRetryableError(formattedError)) {
        return false;
      }
      return failureCount < 1; // Verification shouldn't retry automatically
    },
  });
};

/**
 * Hook for resending email verification using shared-api
 * 
 * @example
 * const { mutate: resendVerification, isLoading, cooldownRemaining } = useResendEmailVerification({
 *   onSuccess: (data) => {
 *     console.log('Verification email resent, cooldown:', data.resendCooldownSeconds);
 *     setCooldown(data.resendCooldownSeconds);
 *   },
 *   onError: (error) => {
 *     if (error.retryAfterSeconds) {
 *       console.log(`Please wait ${error.retryAfterSeconds} seconds`);
 *     }
 *   }
 * });
 * 
 * resendVerification();
 * resendVerification({ email: 'user@example.com', locale: 'bn' });
 */
export const useResendEmailVerification = (options?: UseSendEmailVerificationOptions) => {
  const sendVerification = useSendEmailVerification(options);
  
  return {
    mutate: (request?: SendEmailVerificationRequest) => sendVerification.mutate(request),
    mutateAsync: (request?: SendEmailVerificationRequest) => sendVerification.mutateAsync(request),
    isLoading: sendVerification.isLoading,
    isError: sendVerification.isError,
    error: sendVerification.error,
    data: sendVerification.data,
  };
};

/**
 * Hook for checking email verification status using shared-api
 * 
 * @example
 * const { data: status, isLoading, refetch } = useEmailVerificationStatus({
 *   onSuccess: (data) => {
 *     if (data.verified) {
 *       console.log('Email is verified');
 *     } else {
 *       console.log('Email not verified');
 *     }
 *   }
 * });
 * 
 * if (isLoading) return <LoadingSpinner />;
 * 
 * return (
 *   <div>
 *     {status?.verified ? (
 *       <VerifiedBadge />
 *     ) : (
 *       <VerifyEmailPrompt onResend={resendVerification} />
 *     )}
 *   </div>
 * );
 */
export const useEmailVerificationStatus = (options?: UseEmailVerificationStatusOptions) => {
  const endpoints = getVerificationEndpoints();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: EMAIL_VERIFICATION_STATUS_KEY,
    queryFn: async (): Promise<EmailVerificationStatus> => {
      const response = await endpoints.getStatus();
      return {
        verified: response.emailVerified,
        verifiedAt: response.emailVerifiedAt,
        emailVerified: response.emailVerified,
      };
    },
    staleTime: options?.staleTime ?? 60 * 1000, // 1 minute default
    enabled: options?.enabled ?? true,
    retry: (failureCount, error) => {
      const formattedError = formatError(error);
      if (formattedError.code === 'unauthorized') {
        return false;
      }
      return failureCount < 2;
    },
  });
};

/**
 * Hook for checking if email is verified (boolean only, lightweight)
 * 
 * @example
 * const { isEmailVerified, isLoading } = useIsEmailVerified();
 * 
 * if (!isEmailVerified && !isLoading) {
 *   return <VerifyEmailBanner />;
 * }
 */
export const useIsEmailVerified = () => {
  const { data, isLoading } = useEmailVerificationStatus();
  return {
    isEmailVerified: data?.verified ?? false,
    isLoading,
  };
};

/**
 * Hook for getting verification cooldown status
 * 
 * @example
 * const { remainingSeconds, canResend, startCooldown } = useVerificationCooldown();
 * 
 * // After sending verification
 * if (canResend) {
 *   showResendButton();
 * }
 */
export const useVerificationCooldown = (initialCooldownSeconds: number = 60) => {
  const [remainingSeconds, setRemainingSeconds] = React.useState(0);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const startCooldown = React.useCallback((seconds: number = initialCooldownSeconds) => {
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
  }, [initialCooldownSeconds]);

  const canResend = remainingSeconds === 0;

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    remainingSeconds,
    canResend,
    startCooldown,
  };
};

// Import React for hooks
import React from 'react';

// ==================== Type Exports ====================

export type { 
  UseEmailVerificationStatusOptions,
  SendEmailVerificationRequest, 
  SendEmailVerificationResponse,
  VerifyEmailCodeRequest,
  VerifyEmailCodeResponse,
  EmailVerificationStatus,
  VerificationError,
};
