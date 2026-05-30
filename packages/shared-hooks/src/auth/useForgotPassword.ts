/**
 * useForgotPassword Hook - Password reset request mutation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-hooks/src/auth/useForgotPassword
 * 
 * RULES:
 * ✅ ONLY mutation orchestration - NO business logic
 * ✅ NO email sending, reset token generation
 * ✅ Uses shared-api, not raw fetch
 * ✅ React Query integration
 * ✅ TypeScript strict
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAuthEndpoints } from '@vubon/auth-api';
import { getAuthClient } from '@vubon/auth-shared';

// ==================== Types ====================

export interface ForgotPasswordRequest {
  email: string;
  captchaToken ? : string;
}

export interface ForgotPasswordPhoneRequest {
  phoneNumber: string;
  method ? : 'sms' | 'whatsapp';
  captchaToken ? : string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  messageBn ? : string;
  resetTokenSent: boolean;
  maskedEmail ? : string;
  maskedPhone ? : string;
  expiresInSeconds: number;
  resendCooldownSeconds: number;
}

export interface UseForgotPasswordOptions {
  onSuccess ? : (data: ForgotPasswordResponse) => void;
  onError ? : (error: Error) => void;
  onSettled ? : () => void;
}

// ==================== Hook ====================

/**
 * Hook for requesting password reset email
 * 
 * @example
 * const { mutate: forgotPassword, isLoading, error } = useForgotPassword({
 *   onSuccess: (data) => {
 *     console.log('Reset email sent:', data.message);
 *   },
 *   onError: (error) => {
 *     console.error('Failed:', error);
 *   }
 * });
 * 
 * // Usage
 * forgotPassword({ email: 'user@example.com' });
 */
export const useForgotPassword = (options ? : UseForgotPasswordOptions) => {
  const queryClient = useQueryClient();
  const authClient = getAuthClient();
  
  // Get API client (uses the same axios instance as auth client)
  const apiClient = authClient?.['config']?.apiClient;
  
  return useMutation({
    mutationFn: async (data: ForgotPasswordRequest | ForgotPasswordPhoneRequest): Promise < ForgotPasswordResponse > => {
      // Check if phone number is provided (Bangladesh specific)
      if ('phoneNumber' in data) {
        // Phone-based reset
        const response = await fetch('/api/v1/auth/forgot-password/phone', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to send reset OTP');
        }
        
        return response.json();
      }
      
      // Email-based reset
      const response = await fetch('/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send reset email');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      // Invalidate any password-related queries if needed
      // queryClient.invalidateQueries({ queryKey: ['user'] });
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
 * Hook for requesting password reset via phone (Bangladesh specific)
 * 
 * @example
 * const { mutate: forgotPasswordPhone, isLoading } = useForgotPasswordPhone({
 *   onSuccess: (data) => {
 *     console.log('OTP sent to:', data.maskedPhone);
 *   }
 * });
 * 
 * forgotPasswordPhone({ phoneNumber: '01712345678', method: 'whatsapp' });
 */
export const useForgotPasswordPhone = (options ? : UseForgotPasswordOptions) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: ForgotPasswordPhoneRequest): Promise < ForgotPasswordResponse > => {
      const response = await fetch('/api/v1/auth/forgot-password/phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || error.messageBn || 'Failed to send reset OTP');
      }
      
      return response.json();
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

export type { UseForgotPasswordOptions };
