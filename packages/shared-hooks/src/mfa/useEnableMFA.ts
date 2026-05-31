/**
 * useEnableMFA Hook - Enable MFA mutation with shared-api integration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * IMPROVEMENTS:
 * - Uses shared-api instead of raw fetch
 * - Integrated with shared-types for type safety
 * - Added proper retry logic and error handling
 * - Added Bengali message support
 * - Consistent with other shared-hooks patterns
 * - Added proper query invalidation
 *
 * @module shared-hooks/src/mfa/useEnableMFA
 *
 * RULES:
 * ✅ ONLY mutation orchestration - NO business logic
 * ✅ NO QR secret generation (handled by backend)
 * ✅ Uses shared-api (not raw fetch)
 * ✅ React Query integration
 * ✅ TypeScript strict
 */

import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createMfaEndpoints } from '@vubon/shared-api/endpoints/mfa';
import type { ApiResponse } from '@vubon/shared-types';

// ==================== Types ====================

export type MFAProvider = 'totp' | 'sms' | 'email' | 'whatsapp' | 'imo' | 'bkash_pin' | 'nagad_pin' | 'rocket_pin';

export interface EnableMFARequest {
  provider: MFAProvider;
  identifier?: string;
  label?: string;
  setAsPrimary?: boolean;
}

export interface EnableMFAResponse {
  methodId: string;
  provider: MFAProvider;
  qrCodeUrl?: string;
  secret?: string;
  backupCodes?: string[];
  instructions?: string;
  instructionsBn?: string;
  expiresAt: string;
}

export interface VerifyMFARequest {
  methodId: string;
  code: string;
  trustDevice?: boolean;
  trustDurationDays?: number;
  challengeId?: string;
}

export interface VerifyMFAResponse {
  success: boolean;
  verified: boolean;
  methodUsed: MFAProvider | null;
  remainingAttempts: number;
  isLocked: boolean;
  lockExpiresAt?: string;
  error?: string;
  errorCode?: string;
  requiresAlternativeMethod?: boolean;
  alternativeMethods?: MFAProvider[];
  message?: string;
  messageBn?: string;
}

export type UseEnableMFAOptions = Omit<
  UseMutationOptions<EnableMFAResponse, Error, EnableMFARequest>,
  'mutationFn'
>;

export type UseVerifyMFAOptions = Omit<
  UseMutationOptions<VerifyMFAResponse, Error, VerifyMFARequest>,
  'mutationFn'
>;

export interface UseEnableMFAReturn {
  mutate: (data: EnableMFARequest) => void;
  mutateAsync: (data: EnableMFARequest) => Promise<EnableMFAResponse>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: EnableMFAResponse | undefined;
}

export interface UseVerifyMFAReturn {
  mutate: (data: VerifyMFARequest) => void;
  mutateAsync: (data: VerifyMFARequest) => Promise<VerifyMFAResponse>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: VerifyMFAResponse | undefined;
}

// ==================== Query Keys ====================

const MFA_STATUS_QUERY_KEY = ['mfaStatus'] as const;
const MFA_METHODS_QUERY_KEY = ['mfaMethods'] as const;
const USER_QUERY_KEY = ['user'] as const;
const CURRENT_USER_QUERY_KEY = ['currentUser'] as const;
const MFASetupQueryKey = (methodId: string) => ['mfaSetup', methodId] as const;

// Helper to get endpoints with authenticated client
const getMfaEndpoints = () => {
  return createMfaEndpoints(getAxiosClient());
};

// Helper to extract data from API response
const extractData = <T>(response: ApiResponse<T>): T => response.data;

// Helper to check if error is non-retryable
const isNonRetryableError = (error: Error): boolean => {
  return error.message.includes('400') || error.message.includes('401') || error.message.includes('403');
};

// ==================== Hooks ====================

/**
 * Hook for enabling MFA (Multi-Factor Authentication)
 * Uses shared-api instead of raw fetch for consistent error handling and auth
 *
 * @example
 * const { mutate: enableMFA, data: setupData, isLoading } = useEnableMFA({
 *   onSuccess: (data) => {
 *     console.log('MFA setup initiated');
 *     // Show QR code to user
 *     if (data.qrCodeUrl) {
 *       setQrCode(data.qrCodeUrl);
 *     }
 *   },
 *   onError: (error) => {
 *     console.error('Failed to setup MFA:', error.message);
 *   }
 * });
 *
 * // Setup TOTP
 * enableMFA({ provider: 'totp' });
 *
 * // Setup SMS (Bangladesh specific)
 * enableMFA({ provider: 'sms', identifier: '+8801712345678', setAsPrimary: true });
 *
 * // Setup WhatsApp MFA (Bangladesh specific)
 * enableMFA({ provider: 'whatsapp', identifier: '+8801712345678' });
 *
 * // Setup bKash PIN MFA (Bangladesh specific)
 * enableMFA({ provider: 'bkash_pin', identifier: '01712345678' });
 */
export const useEnableMFA = (options?: UseEnableMFAOptions): UseEnableMFAReturn => {
  const queryClient = useQueryClient();
  const endpoints = getMfaEndpoints();

  const mutation = useMutation({
    mutationFn: async (data: EnableMFARequest): Promise<EnableMFAResponse> => {
      const response = await endpoints.setupMFA(data.provider, data.identifier, data.label);
      const extracted = extractData(response);
      
      // If setAsPrimary is requested, update after setup
      if (data.setAsPrimary && extracted.methodId) {
        try {
          await endpoints.setPrimaryMethod(extracted.methodId);
        } catch {
          // Non-critical, continue anyway
        }
      }
      
      return {
        methodId: extracted.methodId,
        provider: extracted.provider as MFAProvider,
        qrCodeUrl: extracted.qrCodeUrl,
        secret: extracted.secret,
        backupCodes: extracted.backupCodes,
        instructions: extracted.instructions,
        expiresAt: extracted.expiresAt,
      };
    },
    onSuccess: (data) => {
      // Store setup data temporarily for verification step
      queryClient.setQueryData(MFASetupQueryKey(data.methodId), data);
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
    onSettled: () => {
      options?.onSettled?.();
    },
    retry: (failureCount, error) => {
      if (isNonRetryableError(error as Error)) {
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
    error: mutation.error as Error | null,
    data: mutation.data,
  };
};

/**
 * Hook for verifying and completing MFA setup
 * Uses shared-api instead of raw fetch
 *
 * @example
 * const { mutate: verifyMFA, isLoading } = useVerifyMFA({
 *   onSuccess: (data) => {
 *     if (data.verified) {
 *       console.log('MFA enabled successfully');
 *       // Invalidate MFA status
 *     }
 *   },
 *   onError: (error) => {
 *     console.error('Verification failed:', error.message);
 *   }
 * });
 *
 * verifyMFA({ methodId: 'method-123', code: '123456', trustDevice: true });
 */
export const useVerifyMFA = (options?: UseVerifyMFAOptions): UseVerifyMFAReturn => {
  const queryClient = useQueryClient();
  const endpoints = getMfaEndpoints();

  const mutation = useMutation({
    mutationFn: async (data: VerifyMFARequest): Promise<VerifyMFAResponse> => {
      const response = await endpoints.verifyMFA(
        data.code,
        data.methodId,
        data.trustDevice,
        data.challengeId
      );
      
      return {
        success: response.success,
        verified: response.verified,
        methodUsed: response.methodUsed as MFAProvider | null,
        remainingAttempts: response.remainingAttempts,
        isLocked: response.isLocked,
        lockExpiresAt: response.lockExpiresAt,
        error: response.error,
        errorCode: response.errorCode as any,
        requiresAlternativeMethod: response.requiresAlternativeMethod,
        alternativeMethods: response.alternativeMethods as MFAProvider[],
      };
    },
    onSuccess: (data) => {
      if (data.verified) {
        // Invalidate MFA status cache
        queryClient.invalidateQueries({ queryKey: MFA_STATUS_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: MFA_METHODS_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
        
        // Clear setup data
        if (data.methodUsed) {
          queryClient.removeQueries({ queryKey: MFASetupQueryKey(data.methodUsed) });
        }
      }
      
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
    onSettled: () => {
      options?.onSettled?.();
    },
    retry: (failureCount, error) => {
      if (isNonRetryableError(error as Error)) {
        return false;
      }
      return failureCount < 1; // Don't retry verification
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
 * Hook for setting up TOTP specifically (simplified)
 * Uses useEnableMFA internally
 *
 * @example
 * const { mutate: setupTotp, data: totpData } = useSetupTOTP({
 *   onSuccess: (data) => {
 *     // Show QR code
 *   }
 * });
 *
 * setupTotp();
 */
export const useSetupTOTP = (options?: UseEnableMFAOptions) => {
  const enableMFA = useEnableMFA(options);
  
  return {
    mutate: () => enableMFA.mutate({ provider: 'totp', setAsPrimary: true }),
    mutateAsync: () => enableMFA.mutateAsync({ provider: 'totp', setAsPrimary: true }),
    isLoading: enableMFA.isLoading,
    isError: enableMFA.isError,
    error: enableMFA.error,
    data: enableMFA.data,
  };
};

/**
 * Hook for setting up SMS MFA (Bangladesh specific)
 * Uses useEnableMFA internally
 *
 * @example
 * const { mutate: setupSmsMFA } = useSetupSMSMFA({
 *   onSuccess: (data) => {
 *     console.log('SMS MFA setup initiated');
 *   }
 * });
 *
 * setupSmsMFA('+8801712345678');
 */
export const useSetupSMSMFA = (options?: UseEnableMFAOptions) => {
  const enableMFA = useEnableMFA(options);
  
  return {
    mutate: (phoneNumber: string, label?: string) => 
      enableMFA.mutate({ provider: 'sms', identifier: phoneNumber, label, setAsPrimary: true }),
    mutateAsync: (phoneNumber: string, label?: string) => 
      enableMFA.mutateAsync({ provider: 'sms', identifier: phoneNumber, label, setAsPrimary: true }),
    isLoading: enableMFA.isLoading,
    isError: enableMFA.isError,
    error: enableMFA.error,
    data: enableMFA.data,
  };
};

/**
 * Hook for setting up WhatsApp MFA (Bangladesh specific)
 * Uses useEnableMFA internally
 *
 * @example
 * const { mutate: setupWhatsAppMFA } = useSetupWhatsAppMFA({
 *   onSuccess: (data) => {
 *     console.log('WhatsApp MFA setup initiated');
 *   }
 * });
 *
 * setupWhatsAppMFA('+8801712345678');
 */
export const useSetupWhatsAppMFA = (options?: UseEnableMFAOptions) => {
  const enableMFA = useEnableMFA(options);
  
  return {
    mutate: (phoneNumber: string, label?: string) => 
      enableMFA.mutate({ provider: 'whatsapp', identifier: phoneNumber, label, setAsPrimary: true }),
    mutateAsync: (phoneNumber: string, label?: string) => 
      enableMFA.mutateAsync({ provider: 'whatsapp', identifier: phoneNumber, label, setAsPrimary: true }),
    isLoading: enableMFA.isLoading,
    isError: enableMFA.isError,
    error: enableMFA.error,
    data: enableMFA.data,
  };
};

/**
 * Hook for setting up bKash PIN MFA (Bangladesh specific)
 * Uses useEnableMFA internally
 *
 * @example
 * const { mutate: setupBkashMFA } = useSetupBkashMFA({
 *   onSuccess: (data) => {
 *     console.log('bKash MFA setup initiated');
 *   }
 * });
 *
 * setupBkashMFA('01712345678');
 */
export const useSetupBkashMFA = (options?: UseEnableMFAOptions) => {
  const enableMFA = useEnableMFA(options);
  
  return {
    mutate: (accountNumber: string, label?: string) => 
      enableMFA.mutate({ provider: 'bkash_pin', identifier: accountNumber, label, setAsPrimary: true }),
    mutateAsync: (accountNumber: string, label?: string) => 
      enableMFA.mutateAsync({ provider: 'bkash_pin', identifier: accountNumber, label, setAsPrimary: true }),
    isLoading: enableMFA.isLoading,
    isError: enableMFA.isError,
    error: enableMFA.error,
    data: enableMFA.data,
  };
};

/**
 * Hook for setting up Nagad PIN MFA (Bangladesh specific)
 * Uses useEnableMFA internally
 *
 * @example
 * const { mutate: setupNagadMFA } = useSetupNagadMFA();
 * setupNagadMFA('01712345678');
 */
export const useSetupNagadMFA = (options?: UseEnableMFAOptions) => {
  const enableMFA = useEnableMFA(options);
  
  return {
    mutate: (accountNumber: string, label?: string) => 
      enableMFA.mutate({ provider: 'nagad_pin', identifier: accountNumber, label, setAsPrimary: true }),
    mutateAsync: (accountNumber: string, label?: string) => 
      enableMFA.mutateAsync({ provider: 'nagad_pin', identifier: accountNumber, label, setAsPrimary: true }),
    isLoading: enableMFA.isLoading,
    isError: enableMFA.isError,
    error: enableMFA.error,
    data: enableMFA.data,
  };
};

// ==================== Type Exports ====================

export type {
  UseEnableMFAOptions,
  UseEnableMFAReturn,
  UseVerifyMFAOptions,
  UseVerifyMFAReturn,
  EnableMFARequest,
  EnableMFAResponse,
  VerifyMFARequest,
  VerifyMFAResponse,
};
