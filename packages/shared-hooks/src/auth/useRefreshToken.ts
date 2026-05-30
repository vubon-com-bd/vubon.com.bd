/**
 * useRefreshToken Hook - Token refresh orchestration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-hooks/src/auth/useRefreshToken
 *
 * RULES:
 * ✅ ONLY token refresh orchestration - NO business logic
 * ✅ NO infinite retry loops, refresh business rules
 * ✅ Uses shared-auth client (handles deduplication)
 * ✅ React Query integration
 * ✅ TypeScript strict
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAuthClient } from '@vubon/shared-auth';
import { getTokenExpiry, decodeToken } from '@vubon/shared-utils';

// ==================== Types ====================

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  success: boolean;
}

export interface UseRefreshTokenOptions {
  onSuccess?: (data: RefreshTokenResponse) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  /** Whether to invalidate user queries after refresh (default: true) */
  invalidateUserQueries?: boolean;
  /** Refresh buffer in seconds before token expiry (default: 60) */
  refreshBufferSeconds?: number;
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

// Helper to ensure auth client is initialized
const getAuthClientOrThrow = () => {
  const client = getAuthClient();
  if (!client) {
    throw new Error('AuthClient not initialized. Call createAuthClient() first.');
  }
  return client;
};

// Helper to check if token is about to expire
const isTokenExpiringSoon = (token: string, bufferSeconds: number): boolean => {
  if (!token) return true;
  const exp = getTokenExpiry(token);
  if (exp === null) return true;
  const now = Math.floor(Date.now() / 1000);
  return exp - now < bufferSeconds;
};

// ==================== Hook ====================

/**
 * Hook for refreshing access token
 * Handles deduplication and queueing via auth client
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
export const useRefreshToken = (options?: UseRefreshTokenOptions) => {
  const queryClient = useQueryClient();
  const authClient = getAuthClientOrThrow();
  const invalidateUserQueries = options?.invalidateUserQueries ?? true;
  const refreshBufferSeconds = options?.refreshBufferSeconds ?? 60;

  return useMutation({
    mutationFn: async (): Promise<RefreshTokenResponse> => {
      const oldAccessToken = authClient.getAccessToken();

      // Skip refresh if token is still fresh enough
      if (oldAccessToken && !isTokenExpiringSoon(oldAccessToken, refreshBufferSeconds)) {
        const refreshToken = authClient.getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const exp = getTokenExpiry(oldAccessToken);
        const now = Math.floor(Date.now() / 1000);
        const expiresIn = Math.max(60, (exp || now + 3600) - now);

        return {
          accessToken: oldAccessToken,
          refreshToken: refreshToken,
          expiresIn,
          success: true,
        };
      }

      // Perform refresh
      const success = await authClient.refreshSession();

      if (!success) {
        throw new Error('Failed to refresh token: session refresh returned false');
      }

      const newAccessToken = authClient.getAccessToken();
      const newRefreshToken = authClient.getRefreshToken();

      if (!newAccessToken) {
        throw new Error('No access token available after successful refresh');
      }

      if (!newRefreshToken) {
        throw new Error('No refresh token available after successful refresh');
      }

      // Calculate expiry from token
      const exp = getTokenExpiry(newAccessToken);
      const now = Math.floor(Date.now() / 1000);
      const expiresIn = Math.max(60, (exp || now + 3600) - now);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
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
      // Don't clear cache here - let the interceptor handle logout
      options?.onError?.(error as Error);
    },
    onSettled: () => {
      options?.onSettled?.();
    },
  });
};

/**
 * Hook that returns a function to check if token is expired and refresh if needed
 * Useful for manual token management
 *
 * @example
 * const { ensureValidToken, isRefreshing } = useEnsureValidToken();
 *
 * // Before making an API call
 * await ensureValidToken();
 * // Then make the API call
 */
export const useEnsureValidToken = (bufferSeconds?: number) => {
  const { mutateAsync: refreshToken, isPending: isRefreshing } = useRefreshToken({
    refreshBufferSeconds: bufferSeconds,
  });
  const authClient = getAuthClient();

  const ensureValidToken = async (): Promise<boolean> => {
    if (!authClient) {
      return false;
    }

    const token = authClient.getAccessToken();
    if (!token) {
      return false;
    }

    const buffer = bufferSeconds ?? 60;
    if (isTokenExpiringSoon(token, buffer)) {
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

/**
 * Hook to get current token expiry info
 *
 * @example
 * const { expiresIn, isExpired, expiresAt } = useTokenExpiry();
 */
export const useTokenExpiry = () => {
  const authClient = getAuthClient();

  const token = authClient?.getAccessToken();
  const expirySeconds = token ? getTokenExpiry(token) : null;

  const now = Math.floor(Date.now() / 1000);
  const expiresIn = expirySeconds ? Math.max(0, expirySeconds - now) : 0;
  const isExpired = expiresIn <= 0;
  const isExpiringSoon = expiresIn <= 60;

  return {
    expiresIn,
    isExpired,
    isExpiringSoon,
    expiresAt: expirySeconds ? new Date(expirySeconds * 1000) : null,
    hasToken: !!token,
  };
};

// ==================== Type Exports ====================

export type { UseRefreshTokenOptions, UseRefreshTokenReturn, RefreshTokenResponse };
