/**
 * useUnlinkSocial Hook - Disconnect social account
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
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

import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createSocialEndpoints } from '@vubon/shared-api/endpoints/social';
import type { SocialProvider } from '@vubon/shared-types';

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

export type UseUnlinkSocialOptions = Omit<
  UseMutationOptions<UnlinkSocialResponse, Error, UnlinkSocialRequest>,
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

// ==================== Query Keys ====================

const SOCIAL_ACCOUNTS_QUERY_KEY = ['socialAccounts'] as const;
const USER_QUERY_KEY = ['user'] as const;

// ==================== Helper ====================

const getSocialEndpoints = () => createSocialEndpoints(getAxiosClient());

// ==================== Hook ====================

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
export const useUnlinkMultipleSocial = (options?: UseUnlinkSocialOptions) => {
  const queryClient = useQueryClient();
  const unlinkSocial = useUnlinkSocial();

  const mutation = useMutation({
    mutationFn: async ({ providers, reason }: { providers: SocialProvider[]; reason?: string }) => {
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
      options?.onSuccess?.(data as any);
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
 * @example
 * const { canUnlink, isLoading } = useCanUnlinkSocial();
 *
 * if (canUnlink('google')) {
 *   // Show unlink button
 * }
 */
export const useCanUnlinkSocial = () => {
  const queryClient = useQueryClient();

  const canUnlink = (provider: SocialProvider): boolean => {
    const socialAccounts = queryClient.getQueryData<Array<{ provider: SocialProvider }>>(SOCIAL_ACCOUNTS_QUERY_KEY);
    const user = queryClient.getQueryData<{ email?: string; hasPassword?: boolean }>(USER_QUERY_KEY);

    if (!socialAccounts) return true;

    const otherAccounts = socialAccounts.filter(a => a.provider !== provider);
    const hasOtherLoginMethod = otherAccounts.length > 0 || user?.hasPassword === true;

    return hasOtherLoginMethod;
  };

  const getRemainingLoginMethods = (provider: SocialProvider): number => {
    const socialAccounts = queryClient.getQueryData<Array<{ provider: SocialProvider }>>(SOCIAL_ACCOUNTS_QUERY_KEY);
    if (!socialAccounts) return 0;
    return socialAccounts.filter(a => a.provider !== provider).length;
  };

  return {
    canUnlink,
    getRemainingLoginMethods,
  };
};

// ==================== Type Exports ====================

export type {
  UseUnlinkSocialOptions,
  UseUnlinkSocialReturn,
  UnlinkSocialRequest,
  UnlinkSocialResponse,
};
