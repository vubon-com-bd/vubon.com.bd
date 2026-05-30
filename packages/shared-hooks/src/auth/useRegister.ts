/**
 * useRegister Hook - Registration mutation orchestration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-hooks/src/auth/useRegister
 *
 * RULES:
 * ✅ ONLY mutation orchestration - NO business logic
 * ✅ NO email verification business logic, account creation policies
 * ✅ Uses shared-auth client
 * ✅ React Query integration
 * ✅ TypeScript strict
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAuthClient } from '@vubon/shared-auth';
import type { RegisterResponse } from '@vubon/shared-api';

// ==================== Types ====================

export interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  acceptTerms: boolean;
  acceptPrivacy?: boolean;
  marketingConsent?: boolean;
  referrerCode?: string;
  captchaToken?: string;
}

export interface PhoneRegisterData {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptPrivacy?: boolean;
  marketingConsent?: boolean;
  referrerCode?: string;
  captchaToken?: string;
}

export interface OtpRegisterData {
  phoneNumber: string;
  otpCode: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
  marketingConsent?: boolean;
  referrerCode?: string;
}

export interface UseRegisterOptions {
  onSuccess?: (data: RegisterResponse) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}

export interface UseRegisterReturn {
  mutate: (data: RegisterData) => void;
  mutateAsync: (data: RegisterData) => Promise<RegisterResponse>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: RegisterResponse | undefined;
}

// ==================== Query Keys ====================

const getCurrentUserQueryKey = () => ['currentUser'] as const;
const getUserQueryKey = () => ['user'] as const;

// Helper to ensure auth client is initialized
const getAuthClientOrThrow = () => {
  const client = getAuthClient();
  if (!client) {
    throw new Error('AuthClient not initialized. Call createAuthClient() first.');
  }
  return client;
};

// Helper to generate placeholder email for phone-only users
// Uses timestamp + phoneNumber to ensure uniqueness
const generatePlaceholderEmail = (phoneNumber: string): string => {
  // Normalize phone number to remove special characters
  const normalizedPhone = phoneNumber.replace(/[^0-9]/g, '');
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${normalizedPhone}.${timestamp}.${randomSuffix}@phone.vubon.com.bd`;
};

// ==================== Hooks ====================

/**
 * Hook for standard email registration mutation
 * Orchestrates API call and optional cache invalidation
 *
 * @example
 * const { mutate: register, isLoading } = useRegister({
 *   onSuccess: (data) => {
 *     if (data.emailVerificationRequired) {
 *       console.log('Please verify your email');
 *     } else {
 *       console.log('Registration successful!');
 *     }
 *   }
 * });
 *
 * register({
 *   email: 'user@example.com',
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   password: 'SecurePass123!',
 *   confirmPassword: 'SecurePass123!',
 *   acceptTerms: true
 * });
 */
export const useRegister = (options?: UseRegisterOptions): UseRegisterReturn => {
  const queryClient = useQueryClient();
  const authClient = getAuthClientOrThrow();

  const mutation = useMutation({
    mutationFn: async (data: RegisterData): Promise<RegisterResponse> => {
      const response = await authClient.register(data);
      return response;
    },
    onSuccess: (data) => {
      // Invalidate user queries if registration auto-logs in (no verification required)
      if (data.success && !data.emailVerificationRequired && !data.phoneVerificationRequired) {
        queryClient.invalidateQueries({ queryKey: getCurrentUserQueryKey() });
        queryClient.invalidateQueries({ queryKey: getUserQueryKey() });
      }
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
    onSettled: () => {
      options?.onSettled?.();
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
 * Hook for phone-only registration (Bangladesh specific)
 *
 * @example
 * const { mutate: phoneRegister, isLoading } = usePhoneRegister({
 *   onSuccess: (data) => {
 *     console.log('Phone registration successful');
 *   }
 * });
 *
 * phoneRegister({
 *   phoneNumber: '01712345678',
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   password: 'SecurePass123!',
 *   confirmPassword: 'SecurePass123!',
 *   acceptTerms: true
 * });
 */
export const usePhoneRegister = (options?: UseRegisterOptions) => {
  const queryClient = useQueryClient();
  const authClient = getAuthClientOrThrow();

  return useMutation({
    mutationFn: async (data: PhoneRegisterData): Promise<RegisterResponse> => {
      const registerData: RegisterData = {
        email: generatePlaceholderEmail(data.phoneNumber),
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        confirmPassword: data.confirmPassword,
        phoneNumber: data.phoneNumber,
        acceptTerms: data.acceptTerms,
        acceptPrivacy: data.acceptPrivacy,
        marketingConsent: data.marketingConsent,
        referrerCode: data.referrerCode,
        captchaToken: data.captchaToken,
      };
      const response = await authClient.register(registerData);
      return response;
    },
    onSuccess: (data) => {
      if (data.success && !data.emailVerificationRequired && !data.phoneVerificationRequired) {
        queryClient.invalidateQueries({ queryKey: getCurrentUserQueryKey() });
        queryClient.invalidateQueries({ queryKey: getUserQueryKey() });
      }
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
 * Hook for OTP registration (passwordless - Bangladesh specific)
 * Uses shared-api directly (AuthClient may not have otpRegister method)
 *
 * @example
 * const { mutate: otpRegister, isLoading } = useOtpRegister({
 *   onSuccess: (data) => {
 *     console.log('OTP registration successful');
 *   }
 * });
 *
 * otpRegister({
 *   phoneNumber: '01712345678',
 *   otpCode: '123456',
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   acceptTerms: true
 * });
 */
export const useOtpRegister = (options?: UseRegisterOptions) => {
  const queryClient = useQueryClient();
  const authClient = getAuthClientOrThrow();

  // Check if authClient supports otpRegister
  if (typeof authClient.otpRegister !== 'function') {
    throw new Error(
      'AuthClient does not support otpRegister. Please ensure your AuthClient implementation includes this method.'
    );
  }

  return useMutation({
    mutationFn: async (data: OtpRegisterData): Promise<RegisterResponse> => {
      const response = await authClient.otpRegister!(data);
      return response;
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: getCurrentUserQueryKey() });
        queryClient.invalidateQueries({ queryKey: getUserQueryKey() });
      }
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
  UseRegisterOptions,
  UseRegisterReturn,
  RegisterData,
  PhoneRegisterData,
  OtpRegisterData,
};
