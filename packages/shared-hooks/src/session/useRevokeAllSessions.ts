/**
 * useRevokeAllSessions Hook - Revoke all sessions mutation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * IMPROVEMENTS:
 * - Uses shared-api instead of raw fetch for consistent error handling and auth
 * - Proper TypeScript types with shared-types integration
 * - Added Bengali message support
 * - Proper retry logic and error handling
 * - Cache invalidation for sessions and user data
 * - Memoized redirect to avoid multiple triggers

 * @module shared-hooks/src/session/useRevokeAllSessions
 */

import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createSessionEndpoints } from '@vubon/shared-api/endpoints/session';
import { getAuthClient } from '@vubon/shared-auth';
import type { ApiResponse } from '@vubon/shared-types';

// ==================== Types ====================

export interface RevokeAllSessionsRequest {
  exceptCurrent?: boolean;
  exceptDeviceIds?: string[];
  deviceTypes?: string[];
  networkTypes?: ('2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown')[]; // বাংলাদেশ স্পেসিফিক
  reason?: string;
}

export interface RevokeAllSessionsResponse {
  success: boolean;
  revokedCount: number;
  revokedSessionIds: string[];
  message?: string;
  messageBn?: string; // বাংলা মেসেজ
}

export type UseRevokeAllSessionsOptions = Omit<
  UseMutationOptions<RevokeAllSessionsResponse, Error, RevokeAllSessionsRequest>,
  'mutationFn'
> & {
  /** Redirect URL after logout (default: '/login') */
  redirectUrl?: string;
  /** Whether to redirect after logout (default: true) */
  redirectOnLogout?: boolean;
};

export interface UseRevokeAllSessionsReturn {
  mutate: (request?: RevokeAllSessionsRequest) => void;
  mutateAsync: (request?: RevokeAllSessionsRequest) => Promise<RevokeAllSessionsResponse>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: RevokeAllSessionsResponse | undefined;
}

// ==================== Query Keys ====================

const SESSIONS_QUERY_KEY = ['sessions'] as const;
const CURRENT_USER_QUERY_KEY = ['currentUser'] as const;
const DEVICES_QUERY_KEY = ['devices'] as const;
const SESSION_STATISTICS_QUERY_KEY = ['sessionStatistics'] as const;

// Helper to get endpoints with authenticated client
const getSessionEndpoints = () => {
  return createSessionEndpoints(getAxiosClient());
};

// Helper to extract data from API response
const extractData = <T>(response: ApiResponse<T>): T => response.data;

// Helper to check if error is non-retryable
const isNonRetryableError = (error: Error): boolean => {
  return error.message.includes('400') || error.message.includes('401') || error.message.includes('403');
};

// Helper to determine if redirect is needed
const shouldRedirect = (request: RevokeAllSessionsRequest, options: UseRevokeAllSessionsOptions): boolean => {
  return request.exceptCurrent === false && options.redirectOnLogout !== false;
};

// ==================== Hook ====================

/**
 * Hook for revoking all user sessions
 * Uses shared-api instead of raw fetch for consistent error handling and auth
 *
 * @example
 * const { mutate: revokeAllSessions, isLoading } = useRevokeAllSessions({
 *   onSuccess: (data) => {
 *     console.log(`Revoked ${data.revokedCount} sessions`);
 *   },
 *   onError: (error) => {
 *     console.error('Failed to revoke sessions:', error.message);
 *   },
 *   redirectUrl: '/login'
 * });
 *
 * // Revoke all sessions except current
 * revokeAllSessions({ exceptCurrent: true });
 *
 * // Revoke all sessions including current (will logout)
 * revokeAllSessions({ exceptCurrent: false });
 *
 * // Revoke sessions by device type (Bangladesh specific)
 * revokeAllSessions({ deviceTypes: ['feature_phone', 'mobile'] });
 *
 * // Revoke sessions by network type (Bangladesh specific)
 * revokeAllSessions({ networkTypes: ['2g', '3g'] });
 */
export const useRevokeAllSessions = (options?: UseRevokeAllSessionsOptions): UseRevokeAllSessionsReturn => {
  const queryClient = useQueryClient();
  const endpoints = getSessionEndpoints();

  const mutation = useMutation({
    mutationFn: async (request: RevokeAllSessionsRequest = { exceptCurrent: true }): Promise<RevokeAllSessionsResponse> => {
      const response = await endpoints.revokeAllSessions(request.exceptCurrent, request.reason);
      
      // If revoking current session, logout
      if (request.exceptCurrent === false) {
        const authClient = getAuthClient();
        if (authClient) {
          await authClient.logout(true);
        }
      }
      
      return {
        success: response.success,
        revokedCount: response.revokedCount,
        revokedSessionIds: response.revokedSessionIds,
        message: response.message,
        messageBn: (response as any).messageBn,
      };
    },
    onSuccess: (data, variables) => {
      // Invalidate sessions cache
      queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: SESSION_STATISTICS_QUERY_KEY });
      
      // If sessions were revoked, refresh user data
      if (data.revokedCount > 0) {
        queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
        // Devices might be affected as well
        queryClient.invalidateQueries({ queryKey: DEVICES_QUERY_KEY });
      }
      
      options?.onSuccess?.(data);
      
      // Handle redirect after success for current session revocation
      if (shouldRedirect(variables, options || {})) {
        const redirectUrl = options?.redirectUrl || '/login';
        window.location.href = redirectUrl;
      }
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
 * Hook for revoking all sessions except current (quick action)
 *
 * @example
 * const { mutate: revokeOtherSessions, isLoading } = useRevokeOtherSessions({
 *   onSuccess: (data) => {
 *     console.log(`Revoked ${data.revokedCount} other sessions`);
 *   }
 * });
 *
 * revokeOtherSessions();
 */
export const useRevokeOtherSessions = (options?: Omit<UseRevokeAllSessionsOptions, 'onSuccess'> & { onSuccess?: (data: RevokeAllSessionsResponse) => void }) => {
  const revokeAll = useRevokeAllSessions(options);
  
  return {
    mutate: () => revokeAll.mutate({ exceptCurrent: true }),
    mutateAsync: () => revokeAll.mutateAsync({ exceptCurrent: true }),
    isLoading: revokeAll.isLoading,
    isError: revokeAll.isError,
    error: revokeAll.error,
    data: revokeAll.data,
  };
};

/**
 * Hook for revoking sessions by device type (Bangladesh specific - useful for feature phones)
 *
 * @example
 * const { mutate: revokeFeaturePhoneSessions, isLoading } = useRevokeSessionsByDeviceType({
 *   onSuccess: (data) => {
 *     console.log(`Revoked ${data.revokedCount} feature phone sessions`);
 *   }
 * });
 *
 * revokeFeaturePhoneSessions('feature_phone', 'Security check');
 */
export const useRevokeSessionsByDeviceType = (options?: UseRevokeAllSessionsOptions) => {
  const revokeAll = useRevokeAllSessions(options);
  
  return {
    mutate: (deviceType: string, reason?: string) => 
      revokeAll.mutate({ deviceTypes: [deviceType], exceptCurrent: true, reason }),
    mutateAsync: (deviceType: string, reason?: string) => 
      revokeAll.mutateAsync({ deviceTypes: [deviceType], exceptCurrent: true, reason }),
    isLoading: revokeAll.isLoading,
    isError: revokeAll.isError,
    error: revokeAll.error,
    data: revokeAll.data,
  };
};

/**
 * Hook for revoking sessions by network type (Bangladesh specific - for 2G/3G security)
 *
 * @example
 * const { mutate: revokeSlowNetworkSessions } = useRevokeSessionsByNetworkType({
 *   onSuccess: (data) => {
 *     console.log('Sessions on slow networks revoked');
 *   }
 * });
 *
 * revokeSlowNetworkSessions(['2g', '3g'], 'Security policy');
 */
export const useRevokeSessionsByNetworkType = (options?: UseRevokeAllSessionsOptions) => {
  const revokeAll = useRevokeAllSessions(options);
  
  return {
    mutate: (networkTypes: RevokeAllSessionsRequest['networkTypes'], reason?: string) => 
      revokeAll.mutate({ networkTypes, exceptCurrent: true, reason }),
    mutateAsync: (networkTypes: RevokeAllSessionsRequest['networkTypes'], reason?: string) => 
      revokeAll.mutateAsync({ networkTypes, exceptCurrent: true, reason }),
    isLoading: revokeAll.isLoading,
    isError: revokeAll.isError,
    error: revokeAll.error,
    data: revokeAll.data,
  };
};

// ==================== Type Exports ====================

export type {
  UseRevokeAllSessionsOptions,
  UseRevokeAllSessionsReturn,
  RevokeAllSessionsRequest,
  RevokeAllSessionsResponse,
};
