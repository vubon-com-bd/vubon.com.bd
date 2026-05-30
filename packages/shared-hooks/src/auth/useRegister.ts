/**
 * useRefreshToken Hook - Token refresh orchestration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-hooks/src/auth/useRefreshToken
 *
 * @description Provides token refresh functionality with deduplication support.
 * The actual refresh logic with request queuing is handled by the shared-auth client.
 *
 * @rules
 * - ONLY token refresh orchestration - NO business logic
 * - NO infinite retry loops, refresh business rules
 * - Uses shared-auth client (handles deduplication)
 * - React Query integration
 * - TypeScript strict
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAuthClient } from '@vubon/shared-auth';
import { getTokenExpiry } from '@vubon/shared-utils';

// ==================== Types ====================

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  success: boolean;
}

export interface UseRefreshTokenOptions {
  /** Called when refresh succeeds */
  onSuccess?: (data: RefreshTokenResponse) => void;
  /** Called when refresh fails */
  onError?: (error: Error) => void;
  /** Called when refresh settles (success or error) */
  onSettled?: () => void;
  /** Whether to invalidate user queries after refresh (default: true) */
  invalidateUserQueries?: boolean;
  /** Optional callback when unauthenticated (e.g., redirect to login) */
  onUnauthenticated?: () => void;
}

export interface UseRefreshTokenReturn {
  mutate: () => void;
  mutateAsync: () => Promise<RefreshTokenResponse>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: RefreshTokenResponse | undefined;
}

// ==================== Query Keys ====================

const getCurrentUserQueryKey = () => ['currentUser'] as const;
const getUserQueryKey = () => ['user'] as const;
const getSessionsQueryKey = () => ['sessions'] as const;
const getDevicesQueryKey = () => ['devices'] as const;

/**
 * Ensures auth client is initialized before use
 * @throws Error if AuthClient is not initialized
 */
const getAuthClientOrThrow = () => {
  const client = getAuthClient();
  if (!client) {
    throw new Error(
      'AuthClient not initialized. Call createAuthClient() before using useRefreshToken.'
    );
  }
  return client;
};

// ==================== Hook ====================

/**
 * Hook for refreshing access token
 *
 * @description
 * Handles deduplication and queueing via the shared-auth client.
 * The actual refresh logic (with request queuing during concurrent refreshes)
 * is managed by the AuthClient to prevent multiple simultaneous refresh calls.
 *
 * @example
 * const { mutate: refreshToken, isLoading } = useRefreshToken({
 *   onSuccess: (data) => {
 *     console.log('Token refreshed, expires in:', data.expiresIn);
 *   },
 *   onError: (error) => {
 *     console.error('Refresh failed:', error.message);
 *     // Redirect to login
 *   }
 * });
 *
 * // Usage (usually called automatically by interceptor)
 * refreshToken();
 */
export const useRefreshToken = (
  options?: UseRefreshTokenOptions
): UseRefreshTokenReturn => {
  const queryClient = useQueryClient();
  const authClient = getAuthClientOrThrow();
  const invalidateUserQueries = options?.invalidateUserQueries ?? true;

  return useMutation({
    mutationFn: async (): Promise<RefreshTokenResponse> => {
      const success = await authClient.refreshSession();

      if (!success) {
        throw new Error('Failed to refresh token: session refresh returned false');
      }

      const accessToken = authClient.getAccessToken();
      const refreshToken = authClient.getRefreshToken();

      if (!accessToken) {
        throw new Error('No access token available after successful refresh');
      }

      // Calculate expiry from token using shared-utils
      const expiryTimestamp = getTokenExpiry(accessToken);
      const now = Math.floor(Date.now() / 1000);
      // Ensure at least 60 seconds expiry
      const expiresIn = Math.max(60, expiryTimestamp - now);

      return {
        accessToken,
        refreshToken: refreshToken || '',
        expiresIn,
        success: true,
      };
    },
    onSuccess: (data) => {
      // Invalidate user data queries to ensure fresh data with new token
      if (invalidateUserQueries) {
        queryClient.invalidateQueries({ queryKey: getCurrentUserQueryKey() });
        queryClient.invalidateQueries({ queryKey: getUserQueryKey() });
        queryClient.invalidateQueries({ queryKey: getSessionsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getDevicesQueryKey() });
      }

      options?.onSuccess?.(data);
    },
    onError: (error) => {
      const authError = error as Error;

      // If the error indicates the user is no longer authenticated,
      // clear local cache and trigger unauthenticated callback
      if (
        authError.message?.includes('unauthenticated') ||
        authError.message?.includes('invalid refresh token') ||
        authError.message?.includes('refresh token expired')
      ) {
        // Clear React Query cache
        queryClient.clear();
        // Trigger redirect or cleanup
        options?.onUnauthenticated?.();
      }

      options?.onError?.(authError);
    },
    onSettled: () => {
      options?.onSettled?.();
    },
  });
};

/**
 * Hook that returns a function to check if token is expired and refresh if needed
 *
 * @description Useful for manual token management before making critical API calls.
 * Checks token expiry and refreshes automatically if the token is about to expire.
 *
 * @example
 * const { ensureValidToken, isRefreshing } = useEnsureValidToken();
 *
 * // Before making an API call
 * await ensureValidToken();
 * // Then make the API call
 */
export const useEnsureValidToken = () => {
  const { mutateAsync: refreshToken, isPending: isRefreshing } = useRefreshToken({
    // Don't invalidate user queries on auto-refresh to avoid unnecessary re-renders
    invalidateUserQueries: false,
  });

  const ensureValidToken = async (): Promise<boolean> => {
    const authClient = getAuthClient();
    if (!authClient) {
      return false;
    }

    const token = authClient.getAccessToken();
    if (!token) {
      return false;
    }

    // Check if token is expired or about to expire (within 5 minutes)
    const expiryTimestamp = getTokenExpiry(token);
    const now = Math.floor(Date.now() / 1000);
    const bufferSeconds = 300; // 5 minutes buffer

    if (expiryTimestamp - now < bufferSeconds) {
      try {
        await refreshToken();
      } catch {
        return false;
      }
    }
    return true;
  };

  return {
    ensureValidToken,
    isRefreshing,
  };
};

// ==================== Type Exports ====================

export type { UseRefreshTokenOptions, UseRefreshTokenReturn, RefreshTokenResponse };
