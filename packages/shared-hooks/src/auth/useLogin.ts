/**
 * useLogin Hook - Login mutation orchestration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-hooks/src/auth/useLogin
 * 
 * RULES:
 * ✅ ONLY mutation orchestration - NO business logic
 * ✅ NO password hashing, JWT verification, redirect hardcoding
 * ✅ Uses shared-auth client
 * ✅ React Query integration
 * ✅ TypeScript strict
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAuthClient } from '@vubon/shared-auth';
import type { LoginResponse } from '@vubon/shared-api';
import type { LoginRequest } from '@vubon/auth-schemas';

// ==================== Types ====================

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
  deviceId?: string | null;
  captchaToken?: string;
}

export interface PhoneLoginCredentials {
  phoneNumber: string;
  password: string;
  rememberMe?: boolean;
  deviceId?: string | null;
  captchaToken?: string;
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk';
}

export interface OtpLoginCredentials {
  phoneNumber: string;
  otpCode: string;
  rememberMe?: boolean;
  deviceId?: string | null;
}

export interface UseLoginOptions {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}

export interface UseLoginReturn {
  mutate: (credentials: LoginCredentials) => void;
  mutateAsync: (credentials: LoginCredentials) => Promise<LoginResponse>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: LoginResponse | undefined;
}

// ==================== Query Keys ====================

const getCurrentUserQueryKey = () => ['currentUser'] as const;
const getSessionsQueryKey = () => ['sessions'] as const;
const getUserQueryKey = () => ['user'] as const;

// ==================== Helper ====================

const getAuthClientOrThrow = () => {
  const client = getAuthClient();
  if (!client) {
    throw new Error('AuthClient not initialized. Call createAuthClient() first.');
  }
  return client;
};

// ==================== Hooks ====================

/**
 * Hook for email/password login mutation
 * Orchestrates API call, cache invalidation, and token sync
 * 
 * @example
 * const { mutate: login, isLoading } = useLogin({
 *   onSuccess: (data) => {
 *     // Redirect or show success message
 *     console.log('Logged in as:', data.user.email);
 *   },
 *   onError: (error) => {
 *     console.error('Login failed:', error.message);
 *   }
 * });
 * 
 * // Usage
 * login({ email: 'user@example.com', password: 'password123', rememberMe: true });
 */
export const useLogin = (options?: UseLoginOptions) => {
  const queryClient = useQueryClient();
  const authClient = getAuthClientOrThrow();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<LoginResponse> => {
      const response = await authClient.login(credentials);
      return response;
    },
    onSuccess: (data) => {
      // Invalidate user data queries to refresh cached data
      queryClient.invalidateQueries({ queryKey: getCurrentUserQueryKey() });
      queryClient.invalidateQueries({ queryKey: getSessionsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getUserQueryKey() });
      
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
 * Hook for phone number login (Bangladesh specific)
 * 
 * @example
 * const { mutate: phoneLogin } = usePhoneLogin({
 *   onSuccess: (data) => {
 *     console.log('Logged in with phone:', data.user.phoneNumber);
 *   }
 * });
 * 
 * phoneLogin({ phoneNumber: '01712345678', password: 'password123' });
 */
export const usePhoneLogin = (options?: UseLoginOptions) => {
  const queryClient = useQueryClient();
  const authClient = getAuthClientOrThrow();

  return useMutation({
    mutationFn: async (credentials: PhoneLoginCredentials): Promise<LoginResponse> => {
      const response = await authClient.phoneLogin(
        credentials.phoneNumber,
        credentials.password,
        credentials.rememberMe,
        credentials.deviceId || undefined,
        credentials.mobileOperator
      );
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: getCurrentUserQueryKey() });
      queryClient.invalidateQueries({ queryKey: getSessionsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getUserQueryKey() });
      
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
 * Hook for OTP login (passwordless - Bangladesh specific)
 * 
 * @example
 * const { mutate: otpLogin } = useOtpLogin({
 *   onSuccess: (data) => {
 *     console.log('Logged in with OTP');
 *   }
 * });
 * 
 * otpLogin({ phoneNumber: '01712345678', otpCode: '123456' });
 */
export const useOtpLogin = (options?: UseLoginOptions) => {
  const queryClient = useQueryClient();
  const authClient = getAuthClientOrThrow();

  return useMutation({
    mutationFn: async (credentials: OtpLoginCredentials): Promise<LoginResponse> => {
      const response = await authClient.otpLogin(
        credentials.phoneNumber,
        credentials.otpCode,
        credentials.rememberMe,
        credentials.deviceId || undefined
      );
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: getCurrentUserQueryKey() });
      queryClient.invalidateQueries({ queryKey: getSessionsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getUserQueryKey() });
      
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

export type { UseLoginOptions, UseLoginReturn, LoginCredentials, PhoneLoginCredentials, OtpLoginCredentials };
