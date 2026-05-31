/**
 * useDeleteAccount Hook - Account deletion mutation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * IMPROVEMENTS:
 * - Uses shared-api instead of raw fetch
 * - Fixed import paths to match monorepo structure
 * - Proper TypeScript types with shared-types integration
 * - Added Bengali message support
 * - Cache invalidation for all auth-related queries
 * - Proper retry logic and error handling
 *
 * @module shared-hooks/src/user/useDeleteAccount
 */

import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createUserEndpoints } from '@vubon/shared-api/endpoints/user';
import { getAuthClient } from '@vubon/shared-auth';
import type { ApiResponse } from '@vubon/shared-types';

// ==================== Types ====================

export interface DeleteAccountData {
  password: string;
  reason?: string;
  confirmationText?: string;
}

export interface DeleteAccountResponse {
  success: boolean;
  message: string;
  messageBn?: string;
  accountScheduledForDeletion?: boolean;
  deletionDate?: string;
  remainingAttempts?: number;
}

export interface ScheduleDeletionResponse {
  success: boolean;
  message: string;
  messageBn?: string;
  deletionDate: string;
  cancellationDeadline: string;
}

export interface CancelDeletionResponse {
  success: boolean;
  message: string;
  messageBn?: string;
}

export type UseDeleteAccountOptions = Omit<
  UseMutationOptions<DeleteAccountResponse, Error, DeleteAccountData>,
  'mutationFn'
> & {
  /** Whether to require confirmation text (e.g., 'DELETE') */
  requireConfirmation?: boolean;
  /** Confirmation text required (e.g., 'DELETE') */
  confirmationText?: string;
  /** Whether to enable retry for transient errors (default: false) */
  enableRetry?: boolean;
};

export type UseScheduleDeletionOptions = Omit<
  UseMutationOptions<ScheduleDeletionResponse, Error, DeleteAccountData>,
  'mutationFn'
>;

export type UseCancelDeletionOptions = Omit<
  UseMutationOptions<CancelDeletionResponse, Error, void>,
  'mutationFn'
>;

// ==================== Query Keys ====================

const USER_QUERY_KEY = ['user'] as const;
const CURRENT_USER_QUERY_KEY = ['currentUser'] as const;
const SESSIONS_QUERY_KEY = ['sessions'] as const;
const DEVICES_QUERY_KEY = ['devices'] as const;
const ACCOUNT_LOCK_QUERY_KEY = ['accountLock'] as const;

// Helper to get endpoints with authenticated client
const getUserEndpoints = () => {
  return createUserEndpoints(getAxiosClient());
};

// Helper to get auth client for logout
const getAuthClientOrThrow = () => {
  const client = getAuthClient();
  if (!client) {
    throw new Error('AuthClient not initialized. Call createAuthClient() first.');
  }
  return client;
};

// Helper to extract data from API response
const extractData = <T>(response: ApiResponse<T>): T => response.data;

// Helper to check if error is non-retryable
const isNonRetryableError = (error: Error): boolean => {
  const nonRetryableMessages = [
    'invalid_password',
    'account_already_deleted',
    'deletion_cancelled',
    'invalid_confirmation',
  ];
  return nonRetryableMessages.some(msg => error.message?.toLowerCase().includes(msg));
};

// ==================== Hooks ====================

/**
 * Hook for deleting user account
 * Uses shared-api instead of raw fetch for consistent error handling and auth
 * 
 * @example
 * const { mutate: deleteAccount, isLoading } = useDeleteAccount({
 *   onSuccess: (data) => {
 *     console.log('Account deleted:', data.message);
 *     // Redirect to goodbye page
 *     window.location.href = '/goodbye';
 *   },
 *   onError: (error) => {
 *     console.error('Failed to delete account:', error.message);
 *   },
 *   requireConfirmation: true,
 *   confirmationText: 'DELETE'
 * });
 * 
 * // Usage
 * deleteAccount({
 *   password: 'currentPassword123',
 *   reason: 'Found alternative service',
 *   confirmationText: 'DELETE'
 * });
 */
export const useDeleteAccount = (options?: UseDeleteAccountOptions) => {
  const queryClient = useQueryClient();
  const endpoints = getUserEndpoints();
  const authClient = getAuthClientOrThrow();
  const enableRetry = options?.enableRetry ?? false;

  return useMutation({
    mutationFn: async (data: DeleteAccountData): Promise<DeleteAccountResponse> => {
      // Validate confirmation text if required
      if (options?.requireConfirmation) {
        const requiredText = options.confirmationText || 'DELETE';
        if (data.confirmationText !== requiredText) {
          throw new Error(`Please type "${requiredText}" to confirm account deletion`);
        }
      }
      
      const response = await endpoints.deleteAccount({
        password: data.password,
        reason: data.reason,
      });
      
      // Clear local auth state after successful deletion
      await authClient.logout(true);
      
      return response;
    },
    onSuccess: (data) => {
      // Clear all React Query cache
      queryClient.clear();
      
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
    onSettled: () => {
      options?.onSettled?.();
    },
    retry: (failureCount, error) => {
      if (!enableRetry) return false;
      if (isNonRetryableError(error as Error)) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

/**
 * Hook for scheduling account deletion (with cooldown period)
 * Uses shared-api instead of raw fetch
 * 
 * @example
 * const { mutate: scheduleDeletion } = useScheduleAccountDeletion({
 *   onSuccess: (data) => {
 *     console.log('Account scheduled for deletion on:', data.deletionDate);
 *   }
 * });
 * 
 * scheduleDeletion({ password: 'currentPassword123', reason: 'Taking a break' });
 */
export const useScheduleAccountDeletion = (options?: UseScheduleDeletionOptions) => {
  const queryClient = useQueryClient();
  const endpoints = getUserEndpoints();

  return useMutation({
    mutationFn: async (data: DeleteAccountData): Promise<ScheduleDeletionResponse> => {
      const response = await endpoints.scheduleAccountDeletion({
        password: data.password,
        reason: data.reason,
      });
      return response;
    },
    onSuccess: (data) => {
      // Invalidate user data to show pending deletion status
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
  });
};

/**
 * Hook for canceling scheduled account deletion
 * Uses shared-api instead of raw fetch
 * 
 * @example
 * const { mutate: cancelDeletion } = useCancelAccountDeletion({
 *   onSuccess: (data) => {
 *     console.log('Account deletion cancelled:', data.message);
 *   }
 * });
 * 
 * cancelDeletion();
 */
export const useCancelAccountDeletion = (options?: UseCancelDeletionOptions) => {
  const queryClient = useQueryClient();
  const endpoints = getUserEndpoints();

  return useMutation({
    mutationFn: async (): Promise<CancelDeletionResponse> => {
      const response = await endpoints.cancelAccountDeletion();
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
      
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
  });
};

/**
 * Hook for checking account deletion status

 * @example
 * const { isScheduledForDeletion, deletionDate, isLoading } = useAccountDeletionStatus();
 * 
 * if (isScheduledForDeletion) {
 *   return <AccountScheduledWarning deletionDate={deletionDate} />;
 * }
 */
export const useAccountDeletionStatus = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [...USER_QUERY_KEY, 'deletionStatus'],
    queryFn: async () => {
      const endpoints = getUserEndpoints();
      const response = await endpoints.getAccountDeletionStatus();
      return extractData<{
        isScheduled: boolean;
        scheduledDeletionDate?: string;
        cancellationDeadline?: string;
      }>(response);
    },
    staleTime: 60 * 1000, // 1 minute
  });

  return {
    isScheduledForDeletion: data?.isScheduled ?? false,
    deletionDate: data?.scheduledDeletionDate,
    cancellationDeadline: data?.cancellationDeadline,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  };
};

// ==================== Type Exports ====================

export type {
  UseDeleteAccountOptions,
  DeleteAccountData,
  DeleteAccountResponse,
  ScheduleDeletionResponse,
  CancelDeletionResponse,
};
