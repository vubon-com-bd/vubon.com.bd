/**
 * useDisableMFA Hook - Disable MFA mutation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * IMPROVEMENTS:
 * - Uses shared-api instead of raw fetch (consistent with other hooks)
 * - Proper error handling with Bengali support
 * - Added retry logic for transient failures
 * - Fixed missing imports for queryKeys
 * - Added proper type casting for onSuccess callbacks
 *
 * @module shared-hooks/src/mfa/useDisableMFA
 *
 * RULES:
 * ✅ ONLY mutation orchestration - NO business logic
 * ✅ NO security policy engine (handled by backend)
 * ✅ Uses shared-api (not raw fetch)
 * ✅ React Query integration with cache invalidation
 * ✅ TypeScript strict
 */

import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createMfaEndpoints } from '@vubon/shared-api/endpoints/mfa';
import type { ApiResponse } from '@vubon/shared-types';

// ==================== Types ====================

export interface DisableMFARequest {
  methodId?: string;
  code?: string;
  backupCode?: string;
  reason?: string;
}

export interface DisableMFAResponse {
  success: boolean;
  message: string;
  messageBn?: string;
  remainingMethods?: number;
}

export type UseDisableMFAOptions = Omit<
  UseMutationOptions<DisableMFAResponse, Error, DisableMFARequest>,
  'mutationFn'
>;

export interface UseDisableMFAReturn {
  mutate: (data: DisableMFARequest) => void;
  mutateAsync: (data: DisableMFARequest) => Promise<DisableMFAResponse>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: DisableMFAResponse | undefined;
}

export interface DisableMFAMethodRequest {
  methodId: string;
  code: string;
}

export interface DisableAllMFARequest {
  backupCode: string;
  reason?: string;
}

// ==================== Query Keys ====================

const MFA_STATUS_QUERY_KEY = ['mfaStatus'] as const;
const MFA_METHODS_QUERY_KEY = ['mfaMethods'] as const;
const USER_QUERY_KEY = ['user'] as const;
const CURRENT_USER_QUERY_KEY = ['currentUser'] as const;

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
 * Hook for disabling MFA (Multi-Factor Authentication)
 * Uses shared-api instead of raw fetch for consistent error handling and auth
 *
 * @example
 * const { mutate: disableMFA, isLoading } = useDisableMFA({
 *   onSuccess: (data) => {
 *     console.log('MFA disabled:', data.message);
 *   },
 *   onError: (error) => {
 *     console.error('Failed to disable MFA:', error.message);
 *   }
 * });
 *
 * // Disable specific method
 * disableMFA({ methodId: 'method-123', code: '123456' });
 *
 * // Disable all MFA methods using backup code
 * disableMFA({ backupCode: 'AB3F9K2M' });
 */
export const useDisableMFA = (options?: UseDisableMFAOptions): UseDisableMFAReturn => {
  const queryClient = useQueryClient();
  const endpoints = getMfaEndpoints();

  const mutation = useMutation({
    mutationFn: async (data: DisableMFARequest): Promise<DisableMFAResponse> => {
      const response = await endpoints.disable(data.methodId, data.reason);
      return {
        success: response.success,
        message: response.message,
        messageBn: (response as any).messageBn,
        remainingMethods: (response as any).remainingMethods,
      };
    },
    onSuccess: (data) => {
      // Invalidate MFA status and methods cache
      queryClient.invalidateQueries({ queryKey: MFA_STATUS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: MFA_METHODS_QUERY_KEY });

      // Invalidate user data (MFA status may affect user)
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });

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
 * Hook for disabling specific MFA method
 * Uses shared-api instead of raw fetch
 *
 * @example
 * const { mutate: disableMFAMethod } = useDisableMFAMethod({
 *   onSuccess: (data) => {
 *     console.log('MFA method disabled:', data.message);
 *   }
 * });
 *
 * disableMFAMethod({ methodId: 'method-123', code: '123456' });
 */
export const useDisableMFAMethod = (options?: UseDisableMFAOptions) => {
  const queryClient = useQueryClient();
  const endpoints = getMfaEndpoints();

  const mutation = useMutation({
    mutationFn: async ({ methodId }: DisableMFAMethodRequest): Promise<DisableMFAResponse> => {
      const response = await endpoints.disable(methodId);
      return {
        success: response.success,
        message: response.message,
        messageBn: (response as any).messageBn,
        remainingMethods: (response as any).remainingMethods,
      };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: MFA_STATUS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: MFA_METHODS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
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

  return mutation;
};

/**
 * Hook for disabling all MFA methods (requires backup code or admin)
 * Uses shared-api instead of raw fetch
 *
 * @example
 * const { mutate: disableAllMFA } = useDisableAllMFA({
 *   onSuccess: (data) => {
 *     console.log('All MFA methods disabled:', data.message);
 *   }
 * });
 *
 * disableAllMFA({ backupCode: 'AB3F9K2M', reason: 'Lost phone' });
 */
export const useDisableAllMFA = (options?: UseDisableMFAOptions) => {
  const queryClient = useQueryClient();
  const endpoints = getMfaEndpoints();

  const mutation = useMutation({
    mutationFn: async ({ backupCode, reason }: DisableAllMFARequest): Promise<DisableMFAResponse> => {
      // Use the disable endpoint with backup code verification
      // Note: You may need to add a specific endpoint for this in shared-api
      const response = await endpoints.verifyWithBackupCode(backupCode);
      
      if (response.success && response.recovered) {
        // After successful backup code verification, disable all methods
        const disableResponse = await endpoints.disable(undefined, reason);
        return {
          success: disableResponse.success,
          message: disableResponse.message,
          messageBn: (disableResponse as any).messageBn,
          remainingMethods: (disableResponse as any).remainingMethods,
        };
      }
      
      return {
        success: false,
        message: 'Invalid backup code or verification failed',
      };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: MFA_STATUS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: MFA_METHODS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
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
      return failureCount < 1; // Only retry once for backup code verification
    },
  });

  return mutation;
};

/**
 * Hook for checking if MFA can be disabled
 *
 * @example
 * const { canDisable, reason } = useCanDisableMFA();
 *
 * if (!canDisable) {
 *   console.log('Cannot disable MFA:', reason);
 *   return <DisabledButton tooltip={reason} />;
 * }
 */
export const useCanDisableMFA = () => {
  const queryClient = useQueryClient();

  const canDisable = (): boolean => {
    const mfaMethods = queryClient.getQueryData<Array<{ isVerified: boolean }>>(MFA_METHODS_QUERY_KEY);
    
    if (!mfaMethods) return true;
    
    const activeMethods = mfaMethods.filter(m => m.isVerified);
    
    // Allow disabling if there's at least one backup method or user has alternative login
    return activeMethods.length > 0;
  };

  const getDisableRestrictionReason = (): string | null => {
    const mfaMethods = queryClient.getQueryData<Array<{ isVerified: boolean; provider: string }>>(MFA_METHODS_QUERY_KEY);
    
    if (!mfaMethods) return null;
    
    const activeMethods = mfaMethods.filter(m => m.isVerified);
    
    if (activeMethods.length === 0) {
      return 'No active MFA methods to disable.';
    }
    
    return null;
  };

  return {
    canDisable: canDisable(),
    getDisableRestrictionReason,
  };
};

// ==================== Type Exports ====================

export type {
  UseDisableMFAOptions,
  UseDisableMFAReturn,
  DisableMFARequest,
  DisableMFAResponse,
  DisableMFAMethodRequest,
  DisableAllMFARequest,
};
