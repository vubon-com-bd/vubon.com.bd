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

// Helper to ensure auth client is initialized
const getAuthClientOrThrow = () => {
  const client = getAuthClient();
  if (!client) {
    throw new Error('AuthClient not initialized. Call createAuthClient() first.');
  }
  return client;
};

// Helper to decode token and get expiry
const getTokenExpiry = (token: string): number => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1] || ''));
    return payload.exp || 0;
  } catch {
    return 0;
  }
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
      
      // Calculate expiry from token
      const exp = getTokenExpiry(accessToken);
      const now = Math.floor(Date.now() / 1000);
      const expiresIn = Math.max(60, exp - now);
      
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
export const useEnsureValidToken = () => {
  const { mutateAsync: refreshToken, isPending: isRefreshing } = useRefreshToken();

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
    const exp = getTokenExpiry(token);
    const now = Math.floor(Date.now() / 1000);
    const buffer = 300; // 5 minutes buffer
    
    if (exp - now < buffer) {
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
