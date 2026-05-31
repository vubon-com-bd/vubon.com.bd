/**
 * usePasswordReset Hook - Password reset workflow abstraction
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * IMPROVEMENTS:
 * - Uses shared-api instead of raw fetch for consistent error handling
 * - Proper TypeScript types with shared-types integration
 * - Added Bengali message support (messageBn)
 * - Proper retry logic and error handling
 * - Cache invalidation strategies
 * - Type-safe query keys
 * - Added request OTP hook for phone-based reset
 * - Added verify OTP hook for phone-based reset
 * - Proper loading states and error formatting

 * @module shared-hooks/src/verification/usePasswordReset

 * RULES:
 * ✅ ONLY mutation orchestration - NO business logic
 * ✅ NO token generation (handled by backend)
 * ✅ Uses shared-api (not raw fetch)
 * ✅ React Query integration with proper caching
 * ✅ TypeScript strict
 */

import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createAuthEndpoints } from '@vubon/shared-api/endpoints/auth';
import type { ApiResponse } from '@vubon/shared-types';

// ==================== Types ====================

export interface ForgotPasswordRequest {
  email: string;
  captchaToken?: string;
}

export interface ForgotPasswordPhoneRequest {
  phoneNumber: string;
  method?: 'sms' | 'whatsapp';
  captchaToken?: string;
  locale?: 'en' | 'bn';
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  messageBn?: string;
  resetTokenSent: boolean;
  maskedEmail?: string;
  maskedPhone?: string;
  expiresInSeconds: number;
  resendCooldownSeconds: number;
  sessionId?: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordWithOtpRequest {
  phoneNumber: string;
  otpCode: string;
  newPassword: string;
  confirmPassword: string;
  sessionId?: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  messageBn?: string;
  requiresLogin: boolean;
  redirectUrl?: string;
}

export interface RequestResetOtpRequest {
  phoneNumber: string;
  method?: 'sms' | 'whatsapp' | 'voice';
  captchaToken?: string;
  locale?: 'en' | 'bn';
  sessionId?: string;
}

export interface RequestResetOtpResponse {
  success: boolean;
  message: string;
  messageBn?: string;
  otpSent: boolean;
  maskedPhone: string;
  method: 'sms' | 'whatsapp' | 'voice';
  expiresInSeconds: number;
  resendCooldownSeconds: number;
  sessionId: string;
  remainingAttempts: number;
}

export interface VerifyResetOtpRequest {
  phoneNumber: string;
  otpCode: string;
  sessionId?: string;
}

export interface VerifyResetOtpResponse {
  success: boolean;
  verified: boolean;
  resetToken?: string;
  expiresInSeconds?: number;
  remainingAttempts?: number;
  message?: string;
  messageBn?: string;
}

export interface ValidateResetTokenRequest {
  token: string;
}

export interface ValidateResetTokenResponse {
  valid: boolean;
  userId?: string;
  email?: string;
  phoneNumber?: string;
  expiresAt?: string;
  remainingSeconds?: number;
  isExpired?: boolean;
}

export interface PasswordResetError {
  message: string;
  messageBn?: string;
  code?: string;
  remainingAttempts?: number;
  retryAfterSeconds?: number;
}

// ==================== Query Keys ====================

const USER_QUERY_KEY = ['user'] as const;
const SESSIONS_QUERY_KEY = ['sessions'] as const;
const ACCOUNT_LOCK_QUERY_KEY = ['accountLock'] as const;
const VERIFICATION_STATUS_QUERY_KEY = ['verificationStatus'] as const;

// Helper to get endpoints with authenticated client
const getAuthEndpoints = () => {
  return createAuthEndpoints(getAxiosClient());
};

// Helper to extract data from API response
const extractData = <T>(response: ApiResponse<T>): T => response.data;

// Helper to format error response
const formatError = (error: unknown): PasswordResetError => {
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
const isNonRetryableError = (error: PasswordResetError): boolean => {
  const nonRetryableMessages = [
    'invalid_token',
    'token_expired',
    'invalid_otp',
    'otp_expired',
    'max_attempts_exceeded',
    'account_locked',
    'user_not_found',
  ];
  return nonRetryableMessages.some(msg => error.code?.toLowerCase().includes(msg) || error.message.toLowerCase().includes(msg));
};

// Helper to invalidate user-related queries after password reset
const invalidateUserQueries = (queryClient: ReturnType<typeof useQueryClient>) => {
  queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
  queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });
  queryClient.invalidateQueries({ queryKey: ACCOUNT_LOCK_QUERY_KEY });
  queryClient.invalidateQueries({ queryKey: VERIFICATION_STATUS_QUERY_KEY });
};

// ==================== Hooks ====================

/**
 * Hook for requesting password reset via email
 * Uses shared-api instead of raw fetch for consistent error handling
 *
 * @example
 * const { mutate: forgotPassword, isLoading } = useForgotPassword({
 *   onSuccess: (data) => {
 *     console.log('Reset email sent to:', data.maskedEmail);
 *   },
 *   onError: (error) => {
 *     console.error('Failed:', error.message);
 *     if (error.retryAfterSeconds) {
 *       console.log(`Please wait ${error.retryAfterSeconds} seconds`);
 *     }
 *   },
 *   enableRetry: false
 * });
 *
 * forgotPassword({ email: 'user@example.com', captchaToken: 'token-123' });
 */
export const useForgotPassword = (options?: {
  onSuccess?: (data: ForgotPasswordResponse) => void;
  onError?: (error: PasswordResetError) => void;
  onSettled?: () => void;
  enableRetry?: boolean;
}) => {
  const endpoints = getAuthEndpoints();
  const enableRetry = options?.enableRetry ?? false;

  return useMutation({
    mutationFn: async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
      const response = await endpoints.forgotPassword({
        email: data.email,
        captchaToken: data.captchaToken,
      });
      return response;
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
      if (!enableRetry) return false;
      const formattedError = formatError(error);
      if (isNonRetryableError(formattedError)) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

/**
 * Hook for requesting password reset via phone (Bangladesh specific)
 * Uses shared-api instead of raw fetch for consistent error handling
 *
 * @example
 * const { mutate: forgotPasswordPhone, isLoading } = useForgotPasswordPhone({
 *   onSuccess: (data) => {
 *     console.log('Reset OTP sent to:', data.maskedPhone);
 *     console.log('Session ID:', data.sessionId);
 *   },
 *   onError: (error) => {
 *     console.error('Failed:', error.message);
 *     if (error.remainingAttempts) {
 *       console.log(`${error.remainingAttempts} attempts remaining`);
 *     }
 *   }
 * });
 *
 * forgotPasswordPhone({
 *   phoneNumber: '01712345678',
 *   method: 'whatsapp',
 *   captchaToken: 'token-123',
 *   locale: 'bn'
 * });
 */
export const useForgotPasswordPhone = (options?: {
  onSuccess?: (data: ForgotPasswordResponse) => void;
  onError?: (error: PasswordResetError) => void;
  onSettled?: () => void;
  enableRetry?: boolean;
}) => {
  const endpoints = getAuthEndpoints();
  const enableRetry = options?.enableRetry ?? false;

  return useMutation({
    mutationFn: async (data: ForgotPasswordPhoneRequest): Promise<ForgotPasswordResponse> => {
      const response = await endpoints.forgotPasswordPhone({
        phoneNumber: data.phoneNumber,
        method: data.method,
        captchaToken: data.captchaToken,
      });
      return {
        ...response,
        maskedPhone: response.maskedPhone,
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
      if (!enableRetry) return false;
      const formattedError = formatError(error);
      if (isNonRetryableError(formattedError)) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

/**
 * Hook for requesting password reset OTP (Bangladesh specific)
 * Separate from forgotPasswordPhone for explicit OTP request flow
 *
 * @example
 * const { mutate: requestResetOtp, isLoading } = useRequestResetOtp({
 *   onSuccess: (data) => {
 *     console.log('OTP sent to:', data.maskedPhone);
 *     // Store sessionId for verification
 *     setSessionId(data.sessionId);
 *   },
 *   onError: (error) => {
 *     console.error('Failed:', error.message);
 *   }
 * });
 *
 * requestResetOtp({
 *   phoneNumber: '01712345678',
 *   method: 'whatsapp',
 *   locale: 'bn'
 * });
 */
export const useRequestResetOtp = (options?: {
  onSuccess?: (data: RequestResetOtpResponse) => void;
  onError?: (error: PasswordResetError) => void;
  onSettled?: () => void;
  enableRetry?: boolean;
}) => {
  const endpoints = getAuthEndpoints();
  const enableRetry = options?.enableRetry ?? false;

  return useMutation({
    mutationFn: async (data: RequestResetOtpRequest): Promise<RequestResetOtpResponse> => {
      const response = await endpoints.requestResetOtp(data.phoneNumber, data.method || 'sms');
      return {
        success: response.success,
        message: response.message,
        messageBn: response.messageBn,
        otpSent: response.otpSent,
        maskedPhone: response.maskedPhone,
        method: response.method,
        expiresInSeconds: response.expiresInSeconds,
        resendCooldownSeconds: response.resendCooldownSeconds,
        sessionId: response.sessionId,
        remainingAttempts: response.remainingAttempts,
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
      if (!enableRetry) return false;
      const formattedError = formatError(error);
      if (isNonRetryableError(formattedError)) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

/**
 * Hook for verifying password reset OTP (Bangladesh specific)
 *
 * @example
 * const { mutate: verifyResetOtp, isLoading } = useVerifyResetOtp({
 *   onSuccess: (data) => {
 *     if (data.verified && data.resetToken) {
 *       console.log('OTP verified, proceed to reset with token:', data.resetToken);
 *       // Store reset token and proceed to password reset form
 *       setResetToken(data.resetToken);
 *     } else {
 *       console.log(`${data.remainingAttempts} attempts remaining`);
 *     }
 *   },
 *   onError: (error) => {
 *     console.error('Verification failed:', error.message);
 *   }
 * });
 *
 * verifyResetOtp({
 *   phoneNumber: '01712345678',
 *   otpCode: '123456',
 *   sessionId: 'session-123'
 * });
 */
export const useVerifyResetOtp = (options?: {
  onSuccess?: (data: VerifyResetOtpResponse) => void;
  onError?: (error: PasswordResetError) => void;
  onSettled?: () => void;
  enableRetry?: boolean;
}) => {
  const endpoints = getAuthEndpoints();
  const enableRetry = options?.enableRetry ?? false;

  return useMutation({
    mutationFn: async (data: VerifyResetOtpRequest): Promise<VerifyResetOtpResponse> => {
      const response = await endpoints.verifyOtp({
        phoneNumber: data.phoneNumber,
        otpCode: data.otpCode,
        type: 'password_reset',
        sessionId: data.sessionId,
      });
      return {
        success: response.success,
        verified: response.verified,
        resetToken: response.resetToken,
        expiresInSeconds: response.expiresInSeconds,
        remainingAttempts: response.remainingAttempts,
        message: response.message,
        messageBn: response.messageBn,
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
      if (!enableRetry) return false;
      const formattedError = formatError(error);
      // Don't retry OTP verification on invalid code
      if (formattedError.code === 'invalid_otp' || formattedError.code === 'otp_expired') {
        return false;
      }
      return failureCount < 1;
    },
  });
};

/**
 * Hook for resetting password with token (from email)
 * Uses shared-api instead of raw fetch for consistent error handling
 *
 * @example
 * const { mutate: resetPassword, isLoading } = useResetPassword({
 *   onSuccess: (data) => {
 *     console.log('Password reset successful:', data.message);
 *     if (data.requiresLogin) {
 *       // Redirect to login page
 *       window.location.href = '/login';
 *     }
 *   },
 *   onError: (error) => {
 *     console.error('Reset failed:', error.message);
 *   },
 *   invalidateSessions: true,
 *   enableRetry: false
 * });
 *
 * resetPassword({
 *   token: 'reset-token-from-email',
 *   newPassword: 'NewSecurePass123!',
 *   confirmPassword: 'NewSecurePass123!'
 * });
 */
export const useResetPassword = (options?: {
  onSuccess?: (data: ResetPasswordResponse) => void;
  onError?: (error: PasswordResetError) => void;
  onSettled?: () => void;
  invalidateSessions?: boolean;
  enableRetry?: boolean;
}) => {
  const queryClient = useQueryClient();
  const endpoints = getAuthEndpoints();
  const invalidateSessions = options?.invalidateSessions ?? true;
  const enableRetry = options?.enableRetry ?? false;

  return useMutation({
    mutationFn: async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
      // Client-side validation (UX only - backend will validate too)
      if (data.newPassword !== data.confirmPassword) {
        throw new Error('New password and confirmation do not match');
      }

      const response = await endpoints.resetPassword(
        { token: data.token, newPassword: data.newPassword, confirmPassword: data.confirmPassword },
        true // enableRetry for idempotent operation
      );
      return response;
    },
    onSuccess: (data) => {
      // Invalidate all user-related caches
      invalidateUserQueries(queryClient);

      // Also invalidate sessions if requested
      if (invalidateSessions) {
        queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });
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
      if (!enableRetry) return false;
      const formattedError = formatError(error);
      if (isNonRetryableError(formattedError)) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

/**
 * Hook for resetting password with OTP (Bangladesh specific - phone-based)
 * Uses shared-api instead of raw fetch for consistent error handling
 *
 * @example
 * const { mutate: resetPasswordWithOtp, isLoading } = useResetPasswordWithOtp({
 *   onSuccess: (data) => {
 *     console.log('Password reset successful');
 *     if (data.requiresLogin) {
 *       window.location.href = '/login';
 *     }
 *   },
 *   onError: (error) => {
 *     console.error('Reset failed:', error.message);
 *     if (error.remainingAttempts) {
 *       console.log(`${error.remainingAttempts} attempts remaining`);
 *     }
 *   },
 *   invalidateSessions: true,
 *   enableRetry: false
 * });
 *
 * resetPasswordWithOtp({
 *   phoneNumber: '01712345678',
 *   otpCode: '123456',
 *   newPassword: 'NewSecurePass123!',
 *   confirmPassword: 'NewSecurePass123!',
 *   sessionId: 'session-123'
 * });
 */
export const useResetPasswordWithOtp = (options?: {
  onSuccess?: (data: ResetPasswordResponse) => void;
  onError?: (error: PasswordResetError) => void;
  onSettled?: () => void;
  invalidateSessions?: boolean;
  enableRetry?: boolean;
}) => {
  const queryClient = useQueryClient();
  const endpoints = getAuthEndpoints();
  const invalidateSessions = options?.invalidateSessions ?? true;
  const enableRetry = options?.enableRetry ?? false;

  return useMutation({
    mutationFn: async (data: ResetPasswordWithOtpRequest): Promise<ResetPasswordResponse> => {
      if (data.newPassword !== data.confirmPassword) {
        throw new Error('New password and confirmation do not match');
      }

      const response = await endpoints.resetPasswordWithOtp({
        phoneNumber: data.phoneNumber,
        otpCode: data.otpCode,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
        sessionId: data.sessionId,
      });
      return response;
    },
    onSuccess: (data) => {
      invalidateUserQueries(queryClient);

      if (invalidateSessions) {
        queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });
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
      if (!enableRetry) return false;
      const formattedError = formatError(error);
      if (isNonRetryableError(formattedError)) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

/**
 * Hook for validating reset token
 * Uses shared-api with retry support for idempotent GET
 *
 * @example
 * const { mutate: validateToken, isLoading } = useValidateResetToken({
 *   onSuccess: (data) => {
 *     if (data.valid) {
 *       console.log('Token is valid for user:', data.userId);
 *       console.log(`Expires in: ${data.remainingSeconds} seconds`);
 *     } else {
 *       console.log('Token is invalid or expired');
 *     }
 *   },
 *   onError: (error) => {
 *     console.error('Validation failed:', error.message);
 *   }
 * });
 *
 * validateToken({ token: 'reset-token-from-email' });
 */
export const useValidateResetToken = (options?: {
  onSuccess?: (data: ValidateResetTokenResponse) => void;
  onError?: (error: PasswordResetError) => void;
  onSettled?: () => void;
  enableRetry?: boolean;
}) => {
  const endpoints = getAuthEndpoints();
  const enableRetry = options?.enableRetry ?? true;

  return useMutation({
    mutationFn: async ({ token }: ValidateResetTokenRequest): Promise<ValidateResetTokenResponse> => {
      const response = await endpoints.validateResetToken(token);
      return response;
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
      if (!enableRetry) return false;
      const formattedError = formatError(error);
      if (isNonRetryableError(formattedError)) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

/**
 * Hook for resending password reset OTP
 *
 * @example
 * const { mutate: resendResetOtp, isLoading } = useResendResetOtp({
 *   onSuccess: (data) => {
 *     console.log(`Resend cooldown: ${data.resendCooldownSeconds} seconds`);
 *   },
 *   onError: (error) => {
 *     console.error('Failed to resend:', error.message);
 *   }
 * });
 *
 * resendResetOtp({ sessionId: 'session-123', phoneNumber: '01712345678' });
 */
export const useResendResetOtp = (options?: {
  onSuccess?: (data: RequestResetOtpResponse) => void;
  onError?: (error: PasswordResetError) => void;
  onSettled?: () => void;
  enableRetry?: boolean;
}) => {
  const requestOtp = useRequestResetOtp(options);

  return {
    mutate: (phoneNumber: string, sessionId?: string) => {
      if (!phoneNumber) {
        console.warn('Phone number is required for resending OTP');
        return;
      }
      requestOtp.mutate({ phoneNumber, sessionId });
    },
    mutateAsync: (phoneNumber: string, sessionId?: string) => {
      if (!phoneNumber) {
        return Promise.reject(new Error('Phone number is required for resending OTP'));
      }
      return requestOtp.mutateAsync({ phoneNumber, sessionId });
    },
    isLoading: requestOtp.isLoading,
    isError: requestOtp.isError,
    error: requestOtp.error,
    data: requestOtp.data,
  };
};

// ==================== Type Exports ====================

export type {
  UsePasswordResetOptions,
  ForgotPasswordRequest,
  ForgotPasswordPhoneRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordWithOtpRequest,
  ResetPasswordResponse,
  RequestResetOtpRequest,
  RequestResetOtpResponse,
  VerifyResetOtpRequest,
  VerifyResetOtpResponse,
  ValidateResetTokenRequest,
  ValidateResetTokenResponse,
  PasswordResetError,
};
