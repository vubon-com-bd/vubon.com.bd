/**
 * useChangePassword Hook - Password change mutation with shared-api integration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * IMPROVEMENTS:
 * - Uses shared-api instead of raw fetch for consistent error handling and auth
 * - Proper TypeScript types with shared-types integration
 * - Added Bengali message support
 * - Proper retry logic and error handling
 * - Cache invalidation for user and sessions
 * - Added proper loading states and error formatting
 *
 * @module shared-hooks/src/user/useChangePassword
 *
 * RULES:
 * ✅ ONLY mutation orchestration - NO business logic
 * ✅ NO password hashing, crypto logic (handled by backend)
 * ✅ Uses shared-api (not raw fetch)
 * ✅ React Query integration with proper caching
 * ✅ TypeScript strict
 */

import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createAuthEndpoints } from '@vubon/shared-api/endpoints/auth';
import type { ApiResponse } from '@vubon/shared-types';

// ==================== Types ====================

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordWithOtpData {
  phoneNumber: string;
  otpCode: string;
  newPassword: string;
  confirmPassword: string;
  sessionId?: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
  messageBn?: string;
  requiresReauth?: boolean;
  remainingAttempts?: number;
}

export interface ChangePasswordError {
  message: string;
  messageBn?: string;
  code?: string;
  remainingAttempts?: number;
}

export type UseChangePasswordOptions = Omit<
  UseMutationOptions<ChangePasswordResponse, ChangePasswordError, ChangePasswordData>,
  'mutationFn'
> & {
  /** Whether to invalidate sessions after password change (default: true) */
  invalidateSessions?: boolean;
  /** Whether to enable retry for transient errors (default: false) */
  enableRetry?: boolean;
};

export type UseChangePasswordWithOtpOptions = Omit<
  UseMutationOptions<ChangePasswordResponse, ChangePasswordError, ChangePasswordWithOtpData>,
  'mutationFn'
> & {
  invalidateSessions?: boolean;
  enableRetry?: boolean;
};

export interface UseChangePasswordReturn {
  mutate: (data: ChangePasswordData) => void;
  mutateAsync: (data: ChangePasswordData) => Promise<ChangePasswordResponse>;
  isLoading: boolean;
  isError: boolean;
  error: ChangePasswordError | null;
  data: ChangePasswordResponse | undefined;
}

export interface UseChangePasswordWithOtpReturn {
  mutate: (data: ChangePasswordWithOtpData) => void;
  mutateAsync: (data: ChangePasswordWithOtpData) => Promise<ChangePasswordResponse>;
  isLoading: boolean;
  isError: boolean;
  error: ChangePasswordError | null;
  data: ChangePasswordResponse | undefined;
}

// ==================== Query Keys ====================

const USER_QUERY_KEY = ['user'] as const;
const SESSIONS_QUERY_KEY = ['sessions'] as const;
const CURRENT_USER_QUERY_KEY = ['currentUser'] as const;
const ACCOUNT_LOCK_QUERY_KEY = ['accountLock'] as const;

// Helper to get endpoints with authenticated client
const getAuthEndpoints = () => {
  return createAuthEndpoints(getAxiosClient());
};

// Helper to extract data from API response
const extractData = <T>(response: ApiResponse<T>): T => response.data;

// Helper to format error response
const formatError = (error: unknown): ChangePasswordError => {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: (error as any).code,
      messageBn: (error as any).messageBn,
      remainingAttempts: (error as any).remainingAttempts,
    };
  }
  return { message: 'An unknown error occurred' };
};

// Helper to check if error is non-retryable
const isNonRetryableError = (error: ChangePasswordError): boolean => {
  const nonRetryableMessages = [
    'invalid_current_password',
    'password_too_weak',
    'password_reused',
    'passwords_do_not_match',
    'account_locked',
    'invalid_otp',
    'otp_expired',
  ];
  return nonRetryableMessages.some(msg => error.message?.toLowerCase().includes(msg));
};

// ==================== Hooks ====================

/**
 * Hook for changing user password using shared-api
 *
 * @example
 * const { mutate: changePassword, isLoading } = useChangePassword({
 *   onSuccess: (data) => {
 *     console.log('Password changed successfully:', data.message);
 *     if (data.requiresReauth) {
 *       // Redirect to login
 *       window.location.href = '/login';
 *     }
 *   },
 *   onError: (error) => {
 *     console.error('Failed to change password:', error.message);
 *     if (error.remainingAttempts) {
 *       console.log(`${error.remainingAttempts} attempts remaining`);
 *     }
 *   },
 *   invalidateSessions: true,
 *   enableRetry: false
 * });
 *
 * // Usage
 * changePassword({
 *   currentPassword: 'oldPassword123',
 *   newPassword: 'newSecurePassword456!',
 *   confirmPassword: 'newSecurePassword456!'
 * });
 */
export const useChangePassword = (options?: UseChangePasswordOptions): UseChangePasswordReturn => {
  const queryClient = useQueryClient();
  const endpoints = getAuthEndpoints();
  const invalidateSessions = options?.invalidateSessions ?? true;
  const enableRetry = options?.enableRetry ?? false;

  const mutation = useMutation({
    mutationFn: async (data: ChangePasswordData): Promise<ChangePasswordResponse> => {
      // Client-side validation (UX only - backend will validate too)
      if (data.newPassword !== data.confirmPassword) {
        throw new Error('New password and confirmation do not match');
      }

      const response = await endpoints.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      return {
        success: response.success,
        message: response.message,
        messageBn: (response as any).messageBn,
        requiresReauth: (response as any).requiresReauth,
        remainingAttempts: (response as any).remainingAttempts,
      };
    },
    onSuccess: (data) => {
      // Invalidate user data to refresh
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });

      // Invalidate all sessions to force re-login with new password
      if (invalidateSessions) {
        queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });
      }

      // Invalidate account lock status (in case account was locked)
      queryClient.invalidateQueries({ queryKey: ACCOUNT_LOCK_QUERY_KEY });

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
      if (isNonRetryableError(formatError(error))) {
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
    error: mutation.error ? formatError(mutation.error) : null,
    data: mutation.data,
  };
};

/**
 * Hook for changing password with OTP verification (Bangladesh specific)
 * Requires OTP verification before password change for enhanced security
 * Uses shared-api for consistent error handling and auth
 *
 * @example
 * const { mutate: changePasswordWithOtp, isLoading } = useChangePasswordWithOtp({
 *   onSuccess: (data) => {
 *     console.log('Password changed with OTP verification:', data.message);
 *     if (data.requiresReauth) {
 *       window.location.href = '/login';
 *     }
 *   },
 *   onError: (error) => {
 *     console.error('Failed to change password:', error.message);
 *     if (error.remainingAttempts) {
 *       console.log(`${error.remainingAttempts} attempts remaining`);
 *     }
 *   },
 *   invalidateSessions: true,
 *   enableRetry: false
 * });
 *
 * // Usage
 * changePasswordWithOtp({
 *   phoneNumber: '01712345678',
 *   otpCode: '123456',
 *   newPassword: 'newSecurePassword456!',
 *   confirmPassword: 'newSecurePassword456!',
 *   sessionId: 'session-123'
 * });
 */
export const useChangePasswordWithOtp = (options?: UseChangePasswordWithOtpOptions): UseChangePasswordWithOtpReturn => {
  const queryClient = useQueryClient();
  const endpoints = getAuthEndpoints();
  const invalidateSessions = options?.invalidateSessions ?? true;
  const enableRetry = options?.enableRetry ?? false;

  const mutation = useMutation({
    mutationFn: async (data: ChangePasswordWithOtpData): Promise<ChangePasswordResponse> => {
      // Client-side validation
      if (data.newPassword !== data.confirmPassword) {
        throw new Error('New password and confirmation do not match');
      }

      const response = await endpoints.changePasswordWithOtp?.({
        phoneNumber: data.phoneNumber,
        otpCode: data.otpCode,
        newPassword: data.newPassword,
        sessionId: data.sessionId,
      });

      if (!response) {
        throw new Error('OTP password change not supported by auth client');
      }

      return {
        success: response.success,
        message: response.message,
        messageBn: (response as any).messageBn,
        requiresReauth: (response as any).requiresReauth,
        remainingAttempts: (response as any).remainingAttempts,
      };
    },
    onSuccess: (data) => {
      // Invalidate user data
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });

      // Invalidate all sessions
      if (invalidateSessions) {
        queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });
      }

      // Invalidate account lock status
      queryClient.invalidateQueries({ queryKey: ACCOUNT_LOCK_QUERY_KEY });

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
      if (isNonRetryableError(formatError(error))) {
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
    error: mutation.error ? formatError(mutation.error) : null,
    data: mutation.data,
  };
};

/**
 * Hook for checking password strength before submission (client-side only)

 * @example
 * const { strength, score, isValid, suggestions } = usePasswordStrength();
 *
 * const handlePasswordChange = (newPassword: string) => {
 *   const result = strength(newPassword);
 *   if (!result.isValid) {
 *     setErrors(result.missing);
 *   }
 *   setPasswordStrength(result.score);
 * };
 */
export const usePasswordStrength = () => {
  const checkStrength = (password: string): {
    score: number;
    isValid: boolean;
    isStrong: boolean;
    missing: string[];
    suggestions: string[];
  } => {
    const missing: string[] = [];
    const suggestions: string[] = [];
    let score = 0;

    // Length check
    if (password.length >= 8) {
      score += 1;
    } else {
      missing.push('At least 8 characters');
      suggestions.push(`Add ${8 - password.length} more characters`);
    }

    if (password.length >= 12) {
      score += 0.5;
    }

    // Uppercase
    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      missing.push('At least one uppercase letter (A-Z)');
      suggestions.push('Add an uppercase letter');
    }

    // Lowercase
    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      missing.push('At least one lowercase letter (a-z)');
      suggestions.push('Add a lowercase letter');
    }

    // Number
    if (/[0-9]/.test(password)) {
      score += 1;
    } else {
      missing.push('At least one number (0-9)');
      suggestions.push('Add a number');
    }

    // Special character
    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    } else {
      missing.push('At least one special character (!@#$%^&* etc.)');
      suggestions.push('Add a special character like !@#$%');
    }

    // Common pattern check
    const commonPatterns = ['password', '123456', 'qwerty', 'admin', 'welcome'];
    const hasCommonPattern = commonPatterns.some(p => password.toLowerCase().includes(p));
    if (!hasCommonPattern) {
      score += 0.5;
    } else {
      suggestions.push('Avoid common words and patterns');
    }

    const normalizedScore = Math.min(5, Math.floor(score));
    const isValid = missing.length === 0;
    const isStrong = password.length >= 12 && isValid;

    return {
      score: normalizedScore,
      isValid,
      isStrong,
      missing,
      suggestions,
    };
  };

  return { checkStrength };
};

// ==================== Type Exports ====================

export type {
  UseChangePasswordOptions,
  UseChangePasswordReturn,
  UseChangePasswordWithOtpOptions,
  UseChangePasswordWithOtpReturn,
  ChangePasswordData,
  ChangePasswordWithOtpData,
  ChangePasswordResponse,
  ChangePasswordError,
};
