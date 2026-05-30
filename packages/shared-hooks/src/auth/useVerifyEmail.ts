/**
 * useVerifyEmail Hook - Email verification mutation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-hooks/src/auth/useVerifyEmail
 * 
 * RULES:
 * ✅ ONLY mutation orchestration - NO business logic
 * ✅ NO verification engine (handled by backend)
 * ✅ Uses shared-api (not raw fetch)
 * ✅ React Query integration
 * ✅ TypeScript strict
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createAuthEndpoints } from '@vubon/shared-api/endpoints/auth';

// ==================== Types ====================

export interface VerifyEmailRequest {
  token: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  message?: string;
  messageBn?: string;
  email?: string;
  verifiedAt?: string;
}

export interface VerifyEmailWithOtpRequest {
  email: string;
  otpCode: string;
}

export interface UseVerifyEmailOptions {
  onSuccess?: (data: VerifyEmailResponse) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  /** Whether to auto-refresh user data after verification (default: true) */
  refreshUserData?: boolean;
}

export interface UseVerifyEmailReturn {
  mutate: (token: string) => void;
  mutateAsync: (token: string) => Promise<VerifyEmailResponse>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: VerifyEmailResponse | undefined;
}

export interface UseVerifyEmailWithOtpReturn {
  mutate: (data: VerifyEmailWithOtpRequest) => void;
  mutateAsync: (data: VerifyEmailWithOtpRequest) => Promise<VerifyEmailResponse>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: VerifyEmailResponse | undefined;
}

export interface EmailVerificationStatus {
  verified: boolean;
  verifiedAt?: string;
  email?: string;
}

// ==================== Query Keys ====================

const USER_QUERY_KEY = ['user'] as const;
const CURRENT_USER_QUERY_KEY = ['currentUser'] as const;
const VERIFICATION_STATUS_QUERY_KEY = ['verificationStatus'] as const;

// Helper to ensure auth client is initialized
const getAuthEndpoints = () => {
  return createAuthEndpoints(getAxiosClient());
};

// ==================== Hook ====================

/**
 * Hook for verifying email with token
 * Uses shared-api instead of raw fetch for consistent error handling
 * 
 * @example
 * // In your email verification page (e.g., /verify-email?token=...)
 * const { mutate: verifyEmail, isLoading, error } = useVerifyEmail({
 *   onSuccess: (data) => {
 *     if (data.success) {
 *       console.log('Email verified successfully!');
 *       // Redirect to dashboard or show success message
 *       window.location.href = '/dashboard';
 *     }
 *   },
 *   onError: (error) => {
 *     console.error('Verification failed:', error.message);
 *   }
 * });
 * 
 * // Get token from URL and verify
 * const token = new URLSearchParams(window.location.search).get('token');
 * if (token) {
 *   verifyEmail(token);
 * }
 */
export const useVerifyEmail = (options?: UseVerifyEmailOptions): UseVerifyEmailReturn => {
  const queryClient = useQueryClient();
  const refreshUserData = options?.refreshUserData ?? true;
  const authEndpoints = getAuthEndpoints();

  return useMutation({
    mutationFn: async (token: string): Promise<VerifyEmailResponse> => {
      const response = await authEndpoints.verifyEmail(token);
      return {
        success: true,
        message: response.message,
      };
    },
    onSuccess: (data) => {
      if (data.success && refreshUserData) {
        // Invalidate user data to get updated verification status
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: VERIFICATION_STATUS_QUERY_KEY });
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
 * Hook for verifying email with OTP code (Bangladesh specific alternative)
 * Uses shared-api instead of raw fetch
 * 
 * @example
 * const { mutate: verifyEmailWithOtp } = useVerifyEmailWithOtp({
 *   onSuccess: (data) => {
 *     console.log('Email verified with OTP');
 *   }
 * });
 * 
 * verifyEmailWithOtp({ email: 'user@example.com', otpCode: '123456' });
 */
export const useVerifyEmailWithOtp = (options?: UseVerifyEmailOptions): UseVerifyEmailWithOtpReturn => {
  const queryClient = useQueryClient();
  const refreshUserData = options?.refreshUserData ?? true;
  const authEndpoints = getAuthEndpoints();

  return useMutation({
    mutationFn: async ({ email, otpCode }: VerifyEmailWithOtpRequest): Promise<VerifyEmailResponse> => {
      // Note: This assumes there's an endpoint for OTP-based email verification
      // If not available in shared-api, you may need to add it or fallback to raw fetch
      // For now, using the standard verify endpoint with OTP approach
      const response = await authEndpoints.verifyOtp({
        phoneNumber: email, // Note: This is a workaround; ideally backend should support email OTP
        otpCode,
        type: 'email_verification',
      });
      
      return {
        success: response.success,
        message: response.success ? 'Email verified successfully' : 'Verification failed',
        verifiedAt: response.success ? new Date().toISOString() : undefined,
      };
    },
    onSuccess: (data) => {
      if (data.success && refreshUserData) {
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: VERIFICATION_STATUS_QUERY_KEY });
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
 * Hook for checking email verification status
 * Uses shared-api instead of raw fetch
 * 
 * @example
 * const { data, isLoading } = useEmailVerificationStatus('user@example.com');
 * 
 * if (data?.verified) {
 *   console.log('Email is verified');
 * }
 */
export const useEmailVerificationStatus = (email?: string) => {
  const authEndpoints = getAuthEndpoints();
  
  return useQuery({
    queryKey: [...VERIFICATION_STATUS_QUERY_KEY, 'email', email],
    queryFn: async (): Promise<EmailVerificationStatus> => {
      if (!email) return { verified: false };
      
      const response = await authEndpoints.checkEmailVerified(email);
      return {
        verified: response.verified,
        email: email,
      };
    },
    enabled: !!email,
    staleTime: 30000, // 30 seconds
  });
};

// ==================== Type Exports ====================

export type { 
  UseVerifyEmailOptions, 
  UseVerifyEmailReturn, 
  VerifyEmailResponse, 
  VerifyEmailRequest,
  VerifyEmailWithOtpRequest,
  UseVerifyEmailWithOtpReturn,
  EmailVerificationStatus,
};
