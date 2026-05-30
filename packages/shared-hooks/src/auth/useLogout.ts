/**
 * useLogout Hook - Logout mutation orchestration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-hooks/src/auth/useLogout
 * 
 * RULES:
 * ✅ ONLY mutation orchestration - NO business logic
 * ✅ NO router.push hardcoded, UI modal control
 * ✅ Uses shared-auth client
 * ✅ React Query integration
 * ✅ TypeScript strict
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAuthClient } from '@vubon/shared-auth';

// ==================== Types ====================

export interface UseLogoutOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}

export interface LogoutOptions {
  /** Revoke all sessions across all devices */
  allDevices?: boolean;
  /** Specific session ID to revoke (if allDevices is false) */
  sessionId?: string;
  /** Reason for logout (for audit) */
  reason?: string;
}

export interface UseLogoutReturn {
  mutate: (options?: LogoutOptions) => void;
  mutateAsync: (options?: LogoutOptions) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

// ==================== Query Keys ====================

const getSessionsQueryKey = () => ['sessions'] as const;
const getCurrentUserQueryKey = () => ['currentUser'] as const;
const getUserQueryKey = () => ['user'] as const;
const getDevicesQueryKey = () => ['devices'] as const;

// ==================== Hook ====================

/**
 * Hook for user logout mutation
 * Orchestrates API call and cache cleanup
 * 
 * @example
 * const { mutate: logout, isLoading } = useLogout({
 *   onSuccess: () => {
 *     console.log('Logged out successfully');
 *   },
 *   onError: (error) => {
 *     console.error('Logout failed:', error.message);
 *   }
 * });
 * 
 * // Usage
 * logout(); // Logout from current device only
 * logout({ allDevices: true }); // Logout from all devices
 */
export const useLogout = (options?: UseLogoutOptions): UseLogoutReturn => {
  const queryClient = useQueryClient();
  const authClient = getAuthClient();

  const mutation = useMutation({
    mutationFn: async (logoutOptions?: LogoutOptions) => {
      if (!authClient) {
        throw new Error('AuthClient not initialized. Please check shared-auth setup.');
      }
      await authClient.logout(logoutOptions?.allDevices);
    },
    onSuccess: () => {
      // Clear all auth-related queries from cache
      queryClient.clear();
      
      // Alternatively, selectively invalidate:
      // queryClient.invalidateQueries({ queryKey: getSessionsQueryKey() });
      // queryClient.invalidateQueries({ queryKey: getCurrentUserQueryKey() });
      // queryClient.invalidateQueries({ queryKey: getUserQueryKey() });
      // queryClient.invalidateQueries({ queryKey: getDevicesQueryKey() });
      
      options?.onSuccess?.();
    },
    onError: (error) => {
      // Even if API call fails, clear local cache
      queryClient.clear();
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
  };
};

/**
 * Hook for logout that only clears cache (for when logout is handled elsewhere)
 * Useful for scenarios where you want to clear local state without API call
 */
export const useClearAuthCache = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.clear();
  };
};

// ==================== Type Exports ====================

export type { UseLogoutOptions, UseLogoutReturn, LogoutOptions };
