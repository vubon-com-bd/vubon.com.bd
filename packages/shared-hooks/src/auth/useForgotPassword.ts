/**
 * useForgotPassword Hook - Password reset request mutation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module shared-hooks/src/auth/useForgotPassword

 * RULES:
 * ✅ ONLY mutation orchestration - NO business logic
 * ✅ NO email sending, reset token generation
 * ✅ Uses shared-api, not raw fetch
 * ✅ React Query integration
 * ✅ TypeScript strict
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createAuthEndpoints } from '@vubon/shared-api/endpoints/auth';

// ==================== Types ====================

// Union type for both email and phone-based reset (better than separate hooks)
export type ForgotPasswordInput =
  | { email: string; captchaToken?: string }
  | { phoneNumber: string; method?: 'sms' | 'whatsapp'; captchaToken?: string };

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  messageBn?: string;
  resetTokenSent: boolean;
  maskedEmail?: string;
  maskedPhone?: string;
  expiresInSeconds: number;
  resendCooldownSeconds: number;
  sessionId?: string; // For OTP-based reset
}

export interface UseForgotPasswordOptions {
  onSuccess?: (data: ForgotPasswordResponse) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}

// Helper to check if input is phone-based
const isPhoneRequest = (input: ForgotPasswordInput): input is Extract<ForgotPasswordInput, { phoneNumber: string }> => {
  return 'phoneNumber' in input;
};

// ==================== Hook ====================

/**
 * Hook for requesting password reset (email or phone - Bangladesh specific)
 * Single unified hook that handles both email and phone-based reset

 * @example
 * // Email reset
 * const { mutate: forgotPassword, isLoading } = useForgotPassword({
 *   onSuccess: (data) => {
 *     console.log('Reset email sent:', data.message);
 *   }
 * });
 * forgotPassword({ email: 'user@example.com' });

 * @example
 * // Phone reset (Bangladesh specific)
 * forgotPassword({ phoneNumber: '01712345678', method: 'whatsapp' });
 */
export const useForgotPassword = (options?: UseForgotPasswordOptions) => {
  const queryClient = useQueryClient();

  // Get authenticated endpoints (uses same axios instance as auth client)
  const endpoints = createAuthEndpoints(getAxiosClient());

  return useMutation({
    mutationFn: async (data: ForgotPasswordInput): Promise<ForgotPasswordResponse> => {
      if (isPhoneRequest(data)) {
        // Phone-based reset (Bangladesh specific)
        const response = await endpoints.forgotPasswordPhone({
          phoneNumber: data.phoneNumber,
          method: data.method,
          captchaToken: data.captchaToken,
        });
        return response;
      }

      // Email-based reset
      const response = await endpoints.forgotPassword({
        email: data.email,
        captchaToken: data.captchaToken,
      });
      return response;
    },
    onSuccess: (data) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['account-lock'] });
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

export type { UseForgotPasswordOptions };
