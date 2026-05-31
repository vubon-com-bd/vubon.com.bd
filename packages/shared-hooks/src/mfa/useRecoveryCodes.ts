/**
 * useRecoveryCodes Hook - Recovery codes query and regeneration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * IMPROVEMENTS:
 * - Uses shared-api instead of raw fetch
 * - Proper TypeScript types with shared-types integration
 * - Added Bengali message support
 * - Proper error handling with retry logic
 * - Consistent with other shared-hooks patterns
 * - Added proper cache invalidation
 *
 * @module shared-hooks/src/mfa/useRecoveryCodes
 * 
 * RULES:
 * ✅ ONLY query and mutation orchestration - NO business logic
 * ✅ NO recovery code generation (handled by backend)
 * ✅ React Query integration with proper caching
 * ✅ TypeScript strict
 */

import { useQuery, useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createMfaEndpoints } from '@vubon/shared-api/endpoints/mfa';
import type { ApiResponse } from '@vubon/shared-types';

// ==================== Types ====================

export interface RecoveryCodesResponse {
  backupCodes: string[];
  remainingCount: number;
  totalCount: number;
  regeneratedAt?: string;
}

export interface RecoveryCodesError {
  message: string;
  messageBn?: string;
  code?: string;
}

export interface UseRecoveryCodesOptions {
  enabled?: boolean;
  staleTime?: number;
  refetchInterval?: number;
  /** Callback when data is fetched */
  onSuccess?: (data: RecoveryCodesResponse) => void;
  /** Callback when error occurs */
  onError?: (error: RecoveryCodesError) => void;
}

export interface UseRecoveryCodesReturn {
  data: RecoveryCodesResponse | undefined;
  codes: string[];
  remainingCount: number;
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
  error: RecoveryCodesError | null;
  isFetching: boolean;
  refetch: () => Promise<void>;
}

export interface UseRegenerateRecoveryCodesOptions extends Omit<
  UseMutationOptions<RecoveryCodesResponse, RecoveryCodesError, void>,
  'mutationFn'
> {
  /** Whether to invalidate MFA status after regeneration (default: true) */
  invalidateMFAStatus?: boolean;
}

export interface UseRegenerateRecoveryCodesReturn {
  mutate: () => void;
  mutateAsync: () => Promise<RecoveryCodesResponse>;
  isLoading: boolean;
  isError: boolean;
  error: RecoveryCodesError | null;
  data: RecoveryCodesResponse | undefined;
}

// ==================== Query Keys ====================

const RECOVERY_CODES_QUERY_KEY = ['recoveryCodes'] as const;
const MFA_STATUS_QUERY_KEY = ['mfaStatus'] as const;

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

// Helper to format error response
const formatError = (error: unknown): RecoveryCodesError => {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: (error as any).code,
      messageBn: (error as any).messageBn,
    };
  }
  return { message: 'An unknown error occurred' };
};

// ==================== Hooks ====================

/**
 * Hook for fetching backup/recovery codes
 * Uses shared-api instead of raw fetch for consistent error handling and auth
 * 
 * @example
 * const { data: codes, refetch, isLoading } = useRecoveryCodes({
 *   enabled: false, // Only fetch when needed
 *   onSuccess: (data) => {
 *     console.log('Backup codes fetched successfully');
 *   },
 *   onError: (error) => {
 *     console.error('Failed to fetch:', error.message);
 *   }
 * });
 * 
 * // Fetch codes when user clicks "Show backup codes"
 * const handleShowCodes = () => {
 *   refetch();
 * };
 * 
 * if (codes) {
 *   console.log('Backup codes:', codes.backupCodes);
 *   console.log('Remaining:', codes.remainingCount);
 * }
 */
export const useRecoveryCodes = (options?: UseRecoveryCodesOptions): UseRecoveryCodesReturn => {
  const endpoints = getMfaEndpoints();

  const query = useQuery({
    queryKey: RECOVERY_CODES_QUERY_KEY,
    queryFn: async (): Promise<RecoveryCodesResponse> => {
      const response = await endpoints.getBackupCodes();
      const data = extractData<{
        backupCodes: string[];
        remainingCount: number;
        totalCount: number;
        regeneratedAt?: string;
      }>(response);
      
      return {
        backupCodes: data.backupCodes || [],
        remainingCount: data.remainingCount ?? data.backupCodes?.length ?? 0,
        totalCount: data.totalCount ?? 10,
        regeneratedAt: data.regeneratedAt,
      };
    },
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes
    refetchInterval: options?.refetchInterval,
    enabled: options?.enabled ?? false, // Only fetch when explicitly needed (security)
    retry: (failureCount, error) => {
      if (isNonRetryableError(error as Error)) {
        return false;
      }
      return failureCount < 2;
    },
  });

  const data = query.data;
  
  // Call onSuccess/onError callbacks
  if (query.isSuccess && data && options?.onSuccess) {
    options.onSuccess(data);
  }
  if (query.isError && query.error && options?.onError) {
    options.onError(formatError(query.error));
  }
  
  return {
    data: query.data,
    codes: data?.backupCodes || [],
    remainingCount: data?.remainingCount || 0,
    totalCount: data?.totalCount || 10,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error ? formatError(query.error) : null,
    isFetching: query.isFetching,
    refetch: async () => {
      await query.refetch();
    },
  };
};

/**
 * Hook for regenerating backup/recovery codes
 * Uses shared-api instead of raw fetch for consistent error handling and auth
 * 
 * @example
 * const { mutate: regenerateCodes, isLoading } = useRegenerateRecoveryCodes({
 *   onSuccess: (data) => {
 *     console.log('New backup codes generated');
 *     // Show codes to user
 *     setShowCodesDialog(true);
 *   },
 *   onError: (error) => {
 *     console.error('Failed to regenerate:', error.message);
 *     // Show error message in UI
 *     setError(error.message);
 *   }
 * });
 * 
 * regenerateCodes();
 */
export const useRegenerateRecoveryCodes = (
  options?: UseRegenerateRecoveryCodesOptions
): UseRegenerateRecoveryCodesReturn => {
  const queryClient = useQueryClient();
  const endpoints = getMfaEndpoints();
  const invalidateMFAStatus = options?.invalidateMFAStatus ?? true;

  const mutation = useMutation({
    mutationFn: async (): Promise<RecoveryCodesResponse> => {
      const response = await endpoints.regenerateBackupCodes();
      const data = extractData<{
        backupCodes: string[];
        remainingCount: number;
        totalCount: number;
        regeneratedAt?: string;
      }>(response);
      
      return {
        backupCodes: data.backupCodes || [],
        remainingCount: data.remainingCount ?? data.backupCodes?.length ?? 10,
        totalCount: data.totalCount ?? 10,
        regeneratedAt: data.regeneratedAt || new Date().toISOString(),
      };
    },
    onSuccess: (data) => {
      // Update cache with new codes
      queryClient.setQueryData(RECOVERY_CODES_QUERY_KEY, data);
      
      // Invalidate MFA status (recovery codes count may have changed)
      if (invalidateMFAStatus) {
        queryClient.invalidateQueries({ queryKey: MFA_STATUS_QUERY_KEY });
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
      if (isNonRetryableError(error as Error)) {
        return false;
      }
      return failureCount < 2;
    },
  });

  return {
    mutate: () => mutation.mutate(),
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error ? formatError(mutation.error) : null,
    data: mutation.data,
  };
};

/**
 * Hook for checking if recovery codes are low (<= 3 remaining)
 * Uses shared-api for consistent data fetching
 * 
 * @example
 * const { isLow, remainingCount, shouldRegenerate, isLoading } = useLowRecoveryCodesWarning();
 * 
 * if (isLoading) return <LoadingSpinner />;
 * 
 * if (shouldRegenerate) {
 *   return <RecoveryCodesLowWarning onRegenerate={regenerateCodes} />;
 * }
 */
export const useLowRecoveryCodesWarning = (options?: UseRecoveryCodesOptions) => {
  const { data, isLoading, refetch, isError, error } = useRecoveryCodes({ 
    ...options, 
    enabled: options?.enabled ?? true 
  });
  
  const remainingCount = data?.remainingCount || 0;
  const isLow = remainingCount <= 3;
  const isCritical = remainingCount === 0;
  const shouldRegenerate = isLow;
  
  return {
    remainingCount,
    isLow,
    isCritical,
    shouldRegenerate,
    isLoading,
    isError,
    error,
    refetch,
  };
};

/**
 * Hook for checking if user has any recovery codes
 * 
 * @example
 * const { hasRecoveryCodes, isLoading } = useHasRecoveryCodes();
 * 
 * if (!hasRecoveryCodes && !isLoading) {
 *   return <RegenerateRecoveryCodesPrompt />;
 * }
 */
export const useHasRecoveryCodes = (options?: UseRecoveryCodesOptions) => {
  const { data, isLoading, isError, error } = useRecoveryCodes({ 
    ...options, 
    enabled: options?.enabled ?? true 
  });
  
  const hasRecoveryCodes = (data?.remainingCount ?? 0) > 0;
  
  return {
    hasRecoveryCodes,
    remainingCount: data?.remainingCount ?? 0,
    isLoading,
    isError,
    error,
  };
};

// ==================== Type Exports ====================

export type { 
  UseRecoveryCodesOptions, 
  UseRecoveryCodesReturn, 
  UseRegenerateRecoveryCodesOptions, 
  UseRegenerateRecoveryCodesReturn,
  RecoveryCodesResponse,
  RecoveryCodesError,
};
