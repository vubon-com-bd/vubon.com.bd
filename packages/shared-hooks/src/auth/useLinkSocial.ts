/**
 * useLinkSocial Hook - Connect social account to existing user
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module shared-hooks/src/auth/useLinkSocial

 * RULES:
 * ✅ ONLY mutation orchestration - NO business logic
 * ✅ NO direct provider SDK secrets
 * ✅ Uses shared-api
 * ✅ React Query integration
 * ✅ TypeScript strict
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createSocialEndpoints } from '@vubon/shared-api/endpoints/social';
import type { SocialProvider, SocialAccount } from '@vubon/shared-types';

// ==================== Types ====================

export interface LinkSocialRequest {
  provider: SocialProvider;
  code: string;
  state?: string;
  makePrimary?: boolean;
}

export interface LinkSocialResponse extends SocialAccount {
  isPrimary: boolean;
  isVerified: boolean;
}

export interface SetPrimarySocialResponse {
  success: boolean;
  message?: string;
}

export interface UseLinkSocialOptions {
  onSuccess?: (data: LinkSocialResponse) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}

export interface UseSetPrimarySocialOptions {
  onSuccess?: (data: SetPrimarySocialResponse) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}

// ==================== Query Keys ====================

const getSocialAccountsQueryKey = () => ['socialAccounts'] as const;
const getUserQueryKey = () => ['user'] as const;

// ==================== Hook ====================

/**
 * Hook for linking social account to existing user

 * @example
 * const { mutate: linkSocial, isLoading } = useLinkSocial({
 *   onSuccess: (data) => {
 *     console.log('Linked:', data.provider);
 *   },
 *   onError: (error) => {
 *     console.error('Failed to link:', error);
 *   }
 * });

 * // Usage after OAuth callback
 * linkSocial({ provider: 'google', code: 'authorization_code' });
 */
export const useLinkSocial = (options?: UseLinkSocialOptions) => {
  const queryClient = useQueryClient();

  // Create endpoints with authenticated client
  const endpoints = createSocialEndpoints(getAxiosClient());

  return useMutation({
    mutationFn: async (request: LinkSocialRequest): Promise<LinkSocialResponse> => {
      const response = await endpoints.connectAccount({
        provider: request.provider,
        code: request.code,
        state: request.state || '',
        makePrimary: request.makePrimary,
      });
      return response as LinkSocialResponse;
    },
    onSuccess: (data) => {
      // Invalidate social accounts list
      queryClient.invalidateQueries({ queryKey: getSocialAccountsQueryKey() });

      // Invalidate user query (in case primary account changed)
      queryClient.invalidateQueries({ queryKey: getUserQueryKey() });

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
 * Hook for setting primary social account

 * @example
 * const { mutate: setPrimarySocial } = useSetPrimarySocial({
 *   onSuccess: (data) => {
 *     console.log('Primary account updated:', data.message);
 *   }
 * });

 * setPrimarySocial({ accountId: 'social_account_id' });
 */
export const useSetPrimarySocial = (options?: UseSetPrimarySocialOptions) => {
  const queryClient = useQueryClient();

  // Create endpoints with authenticated client
  const endpoints = createSocialEndpoints(getAxiosClient());

  return useMutation({
    mutationFn: async ({ accountId }: { accountId: string }): Promise<SetPrimarySocialResponse> => {
      const response = await endpoints.setPrimaryAccount(accountId);
      return { success: true, message: 'Primary account updated successfully' };
    },
    onSuccess: (data) => {
      // Invalidate social accounts list
      queryClient.invalidateQueries({ queryKey: getSocialAccountsQueryKey() });

      // Invalidate user query
      queryClient.invalidateQueries({ queryKey: getUserQueryKey() });

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

// ==================== Type Exports ====================

export type { UseLinkSocialOptions, UseSetPrimarySocialOptions, LinkSocialRequest, LinkSocialResponse, SetPrimarySocialResponse };
