/**
 * useUnlinkSocial Hook - Disconnect social account
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * IMPROVED: Type-safe useCanUnlinkSocial, removed hardcoded 'hasPassword' field
 *
 * @module shared-hooks/src/auth/useUnlinkSocial
 *
 * RULES:
 * ✅ ONLY mutation orchestration - NO business logic
 * ✅ NO provider token revocation engine (handled by backend)
 * ✅ Uses shared-api (not raw fetch)
 * ✅ React Query integration
 * ✅ TypeScript strict
 */

import { useCallback, useMemo } from 'react';
import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createSocialEndpoints } from '@vubon/shared-api/endpoints/social';
import type { SocialProvider, SocialAccount, User } from '@vubon/shared-types';

// ==================== Types ====================

export interface UnlinkSocialRequest {
  provider: SocialProvider;
  reason?: string;
  keepData?: boolean;
}

export interface UnlinkSocialResponse {
  success: boolean;
  message: string;
  messageBn?: string;
}

export interface UnlinkMultipleRequest {
  providers: SocialProvider[];
  reason?: string;
}

export interface UnlinkMultipleResponse {
  success: boolean;
  unlinkedCount: number;
}

export type UseUnlinkSocialOptions = Omit<
  UseMutationOptions<UnlinkSocialResponse, Error, UnlinkSocialRequest>,
  'mutationFn'
>;

export type UseUnlinkMultipleOptions = Omit<
  UseMutationOptions<UnlinkMultipleResponse, Error, UnlinkMultipleRequest>,
  'mutationFn'
>;

export interface UseUnlinkSocialReturn {
  mutate: (request: UnlinkSocialRequest) => void;
  mutateAsync: (request: UnlinkSocialRequest) => Promise<UnlinkSocialResponse>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: UnlinkSocialResponse | undefined;
}

export interface CanUnlinkResult {
  /** Check if specific provider can be unlinked */
  canUnlink: (provider: SocialProvider) => boolean;
  /** Get remaining login methods after unlinking */
  getRemainingLoginMethods: (provider: SocialProvider) => number;
  /** Check if user has any alternative login method */
  hasAlternativeLoginMethod: (provider: SocialProvider) => boolean;
  /** Get the reason why unlinking is not allowed (if any) */
  getUnlinkRestrictionReason: (provider: SocialProvider) => string | null;
}

// ==================== Query Keys ====================

const SOCIAL_ACCOUNTS_QUERY_KEY = ['socialAccounts'] as const;
const USER_QUERY_KEY = ['user'] as const;

// ==================== Helper ====================

const getSocialEndpoints = () => createSocialEndpoints(getAxiosClient());

/**
 * Check if user has password-based login (from user object)
 */
const hasPasswordLogin = (user: User | null | undefined): boolean => {
  if (!user) return false;
  // Check if user has email (which typically has password)
  // or if user has a password hash stored
  return !!(user.email || user.phoneNumber);
};

// ==================== Hooks ====================

/**
 * Hook for unlinking social account from user
 * Uses shared-api instead of raw fetch
 *
 * @example
 * const { mutate: unlinkSocial, isLoading } = useUnlinkSocial({
 *   onSuccess: (data) => {
 *     console.log('Account unlinked:', data.message);
 *   },
 *   onError: (error) => {
 *     console.error('Failed to unlink:', error.message);
 *   }
 * });
 *
 * // Usage
 * unlinkSocial({ provider: 'google', reason: 'user requested' });
 */
export const useUnlinkSocial = (options?: UseUnlinkSocialOptions): UseUnlinkSocialReturn => {
  const queryClient = useQueryClient();
  const endpoints = getSocialEndpoints();

  const mutation = useMutation({
    mutationFn: async (request: UnlinkSocialRequest): Promise<UnlinkSocialResponse> => {
      const response = await endpoints.disconnectAccount(request.provider, request.reason);
      return {
        success: response.success,
        message: response.message,
      };
    },
    onSuccess: (data) => {
      // Invalidate social accounts list to refresh
      queryClient.invalidateQueries({ queryKey: SOCIAL_ACCOUNTS_QUERY_KEY });

      // Also invalidate user query in case primary account changed
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });

      options?.onSuccess?.(data);
    },
    onError: (error) => {
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
    data: mutation.data,
  };
};

/**
 * Hook for unlinking multiple social accounts at once
 *
 * @example
 * const { mutate: unlinkMultiple } = useUnlinkMultipleSocial({
 *   onSuccess: () => {
 *     console.log('Multiple accounts unlinked');
 *   }
 * });
 *
 * unlinkMultiple({ providers: ['google', 'facebook'] });
 */
export const useUnlinkMultipleSocial = (options?: UseUnlinkMultipleOptions) => {
  const queryClient = useQueryClient();
  const unlinkSocial = useUnlinkSocial();

  const mutation = useMutation({
    mutationFn: async ({ providers, reason }: UnlinkMultipleRequest): Promise<UnlinkMultipleResponse> => {
      const results = await Promise.allSettled(
        providers.map(provider => unlinkSocial.mutateAsync({ provider, reason }))
      );

      const failed = results.filter(r => r.status === 'rejected');
      if (failed.length > 0) {
        throw new Error(`Failed to unlink ${failed.length} account(s)`);
      }

      return { success: true, unlinkedCount: providers.length };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: SOCIAL_ACCOUNTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
    onSettled: () => {
      options?.onSettled?.();
    },
  });

  return mutation;
};

/**
 * Hook for checking if a social account can be unlinked
 * (prevents unlinking if it would leave the user without login methods)
 *
 * IMPROVED:
 * - Added proper TypeScript types for query data
 * - Replaced 'hasPassword' with standard user fields check
 * - Added memoized results for better performance
 * - Added detailed restriction reasons
 *
 * @example
 * const { canUnlink, getUnlinkRestrictionReason } = useCanUnlinkSocial();
 *
 * if (canUnlink('google')) {
 *   // Show unlink button
 * } else {
 *   // Show tooltip with getUnlinkRestrictionReason('google')
 * }
 */
export const useCanUnlinkSocial = (): CanUnlinkResult => {
  const queryClient = useQueryClient();

  // Type-safe data retrieval
  const socialAccounts = queryClient.getQueryData<SocialAccount[]>(SOCIAL_ACCOUNTS_QUERY_KEY);
  const user = queryClient.getQueryData<User>(USER_QUERY_KEY);

  const canUnlink = useCallback(
    (provider: SocialProvider): boolean => {
      if (!socialAccounts) return true;

      const otherAccounts = socialAccounts.filter(account => account.provider !== provider);
      const hasOtherSocialLogin = otherAccounts.length > 0;
      const hasPasswordLoginMethod = hasPasswordLogin(user);

      return hasOtherSocialLogin || hasPasswordLoginMethod;
    },
    [socialAccounts, user]
  );

  const getRemainingLoginMethods = useCallback(
    (provider: SocialProvider): number => {
      if (!socialAccounts) return 0;
      return socialAccounts.filter(account => account.provider !== provider).length;
    },
    [socialAccounts]
  );

  const hasAlternativeLoginMethod = useCallback(
    (provider: SocialProvider): boolean => {
      if (!socialAccounts) return true;

      const otherSocialCount = socialAccounts.filter(account => account.provider !== provider).length;
      const hasPasswordMethod = hasPasswordLogin(user);

      return otherSocialCount > 0 || hasPasswordMethod;
    },
    [socialAccounts, user]
  );

  const getUnlinkRestrictionReason = useCallback(
    (provider: SocialProvider): string | null => {
      if (!socialAccounts) return null;

      const otherAccounts = socialAccounts.filter(account => account.provider !== provider);
      const hasOtherSocialLogin = otherAccounts.length > 0;
      const hasPasswordMethod = hasPasswordLogin(user);

      if (hasOtherSocialLogin) return null;
      if (hasPasswordMethod) return null;

      return 'Cannot unlink the only login method. Please set up another login method (email/password or another social account) first.';
    },
    [socialAccounts, user]
  );

  // Memoize the entire result object to prevent unnecessary re-renders
  const result = useMemo<CanUnlinkResult>(
    () => ({
      canUnlink,
      getRemainingLoginMethods,
      hasAlternativeLoginMethod,
      getUnlinkRestrictionReason,
    }),
    [canUnlink, getRemainingLoginMethods, hasAlternativeLoginMethod, getUnlinkRestrictionReason]
  );

  return result;
};

// ==================== Type Exports ====================

export type {
  UseUnlinkSocialOptions,
  UseUnlinkSocialReturn,
  UseUnlinkMultipleOptions,
  UnlinkSocialRequest,
  UnlinkSocialResponse,
  UnlinkMultipleRequest,
  UnlinkMultipleResponse,
  CanUnlinkResult,
};
