/**
 * useResetPassword Hook - Password reset mutation orchestration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-hooks/src/auth/useResetPassword
 *
 * RULES:
 * ✅ ONLY mutation orchestration - NO business logic
 * ✅ NO password policy engine (validation happens in schema layer)
 * ✅ Uses shared-api, not raw fetch
 * ✅ React Query integration
 * ✅ TypeScript strict
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createAuthEndpoints } from '@vubon/shared-api/endpoints/auth';
import type { ApiResponse } from '@vubon/shared-types';

// ==================== Types ====================

export interface ResetPasswordData {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordWithOtpData {
  phoneNumber: string;
  otpCode: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ValidateResetTokenData {
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

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  messageBn?: string;
  requiresLogin: boolean;
  redirectUrl?: string;
}

export interface RequestResetOtpData {
  phoneNumber: string;
  method?: 'sms' | 'whatsapp';
  captchaToken?: string;
}

export interface RequestResetOtpResponse {
  success: boolean;
  message: string;
  messageBn?: string;
  otpSent: boolean;
  maskedPhone: string;
  method: 'sms' | 'whatsapp';
  expiresInSeconds: number;
  resendCooldownSeconds: number;
  sessionId: string;
  remainingAttempts: number;
}

export interface VerifyResetOtpData {
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
}

export interface UseResetPasswordOptions {
  onSuccess?: (data: ResetPasswordResponse) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}

export interface UseRequestResetOtpOptions {
  onSuccess?: (data: RequestResetOtpResponse) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}

export interface UseValidateResetTokenOptions {
  onSuccess?: (data: ValidateResetTokenResponse) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}

export interface UseVerifyResetOtpOptions {
  onSuccess?: (data: VerifyResetOtpResponse) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}

// ==================== Query Keys ====================

const USER_QUERY_KEY = ['user'] as const;
const SESSIONS_QUERY_KEY = ['sessions'] as const;

// Helper to ensure auth client is initialized
const getAuthEndpoints = () => {
  return createAuthEndpoints(getAxiosClient());
};

// ==================== Hooks ====================

/**
 * Hook for resetting password with token (email-based)
 * Uses shared-api layer instead of raw fetch
 *
 * @example
 * const { mutate: resetPassword, isLoading } = useResetPassword({
 *   onSuccess: (data) => {
 *     console.log('Password reset successful:', data.message);
 *     // Redirect to login
 *   },
 *   onError: (error) => {
 *     console.error('Reset failed:', error.message);
 *   }
 * });
 *
 * resetPassword({
 *   token: 'reset-token-from-email',
 *   newPassword: 'NewSecurePass123!',
 *   confirmPassword: 'NewSecurePass123!'
 * });
 */
export const useResetPassword = (options?: UseResetPasswordOptions) => {
  const queryClient = useQueryClient();
  const endpoints = getAuthEndpoints();

  return useMutation({
    mutationFn: async (data: ResetPasswordData): Promise<ResetPasswordResponse> => {
      const response = await endpoints.resetPassword(data, true); // enableRetry for idempotent operation
      return response;
    },
    onSuccess: (data) => {
      // Invalidate user cache since password changed
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
      // Invalidate sessions (should revoke all sessions after password change)
      queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });
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
 * Hook for resetting password with OTP (phone-based - Bangladesh specific)
 * Uses shared-api layer instead of raw fetch
 *
 * @example
 * const { mutate: resetPasswordWithOtp } = useResetPasswordWithOtp({
 *   onSuccess: (data) => {
 *     console.log('Password reset successful');
 *   }
 * });
 *
 * resetPasswordWithOtp({
 *   phoneNumber: '01712345678',
 *   otpCode: '123456',
 *   newPassword: 'NewSecurePass123!',
 *   confirmPassword: 'NewSecurePass123!'
 * });
 */
export const useResetPasswordWithOtp = (options?: UseResetPasswordOptions) => {
  const queryClient = useQueryClient();
  const endpoints = getAuthEndpoints();

  return useMutation({
    mutationFn: async (data: ResetPasswordWithOtpData): Promise<ResetPasswordResponse> => {
      const response = await endpoints.resetPasswordWithOtp(data);
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });
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
 * Hook for validating reset token
 * Uses shared-api layer with retry support for idempotent GET
 *
 * @example
 * const { mutate: validateToken, isLoading } = useValidateResetToken({
 *   onSuccess: (data) => {
 *     if (data.valid) {
 *       console.log('Token is valid for user:', data.userId);
 *     } else {
 *       console.log('Token is invalid or expired');
 *     }
 *   }
 * });
 *
 * validateToken({ token: 'reset-token-from-email' });
 */
export const useValidateResetToken = (options?: UseValidateResetTokenOptions) => {
  const endpoints = getAuthEndpoints();

  return useMutation({
    mutationFn: async (data: ValidateResetTokenData): Promise<ValidateResetTokenResponse> => {
      const response = await endpoints.validateResetToken(data.token);
      return response;
    },
    onSuccess: (data) => {
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
 * Hook for requesting password reset OTP (Bangladesh specific)
 * Uses shared-api layer
 *
 * @example
 * const { mutate: requestResetOtp, isLoading } = useRequestResetOtp({
 *   onSuccess: (data) => {
 *     console.log('OTP sent to:', data.maskedPhone);
 *   }
 * });
 *
 * requestResetOtp({ phoneNumber: '01712345678', method: 'whatsapp' });
 */
export const useRequestResetOtp = (options?: UseRequestResetOtpOptions) => {
  const endpoints = getAuthEndpoints();

  return useMutation({
    mutationFn: async (data: RequestResetOtpData): Promise<RequestResetOtpResponse> => {
      const response = await endpoints.requestResetOtp(data.phoneNumber, data.method || 'sms');
      return response;
    },
    onSuccess: (data) => {
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
 * Hook for verifying reset OTP (step before resetting password)
 *
 * @example
 * const { mutate: verifyResetOtp } = useVerifyResetOtp({
 *   onSuccess: (data) => {
 *     if (data.verified && data.resetToken) {
 *       console.log('OTP verified, proceed to reset with token:', data.resetToken);
 *     }
 *   }
 * });
 *
 * verifyResetOtp({ phoneNumber: '01712345678', otpCode: '123456', sessionId: 'session-123' });
 */
export const useVerifyResetOtp = (options?: UseVerifyResetOtpOptions) => {
  const endpoints = getAuthEndpoints();

  return useMutation({
    mutationFn: async (data: VerifyResetOtpData): Promise<VerifyResetOtpResponse> => {
      const response = await endpoints.verifyOtp({
        phoneNumber: data.phoneNumber,
        otpCode: data.otpCode,
        type: 'reset',
        sessionId: data.sessionId,
      });
      return response;
    },
    onSuccess: (data) => {
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

// ==================== Type Exports ====================

export type {
  UseResetPasswordOptions,
  UseRequestResetOtpOptions,
  UseValidateResetTokenOptions,
  UseVerifyResetOtpOptions,
  ResetPasswordData,
  ResetPasswordWithOtpData,
  ResetPasswordResponse,
  RequestResetOtpData,
  RequestResetOtpResponse,
  ValidateResetTokenData,
  ValidateResetTokenResponse,
  VerifyResetOtpData,
  VerifyResetOtpResponse,
};
