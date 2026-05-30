/**
 * useLinkSocial Hook - Connect social account to existing user
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-hooks/auth-hooks/auth/useLinkSocial
 * 
 * RULES:
 * ✅ ONLY mutation orchestration - NO business logic
 * ✅ NO direct provider SDK secrets
 * ✅ Uses shared-api
 * ✅ React Query integration
 * ✅ TypeScript strict
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSocialEndpoints } from '@vubon/auth-api';
import type { SocialProvider, SocialAccount } from '@vubon/auth-api';

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

export interface UseLinkSocialOptions {
  onSuccess?: (data: LinkSocialResponse) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}

// ==================== Query Keys ====================

const SOCIAL_ACCOUNTS_QUERY_KEY = ['socialAccounts'] as const;
const USER_QUERY_KEY = ['user'] as const;

// ==================== Hook ====================

/**
 * Hook for linking social account to existing user
 * 
 * @example
 * const { mutate: linkSocial, isLoading } = useLinkSocial({
 *   onSuccess: (data) => {
 *     console.log('Linked:', data.provider);
 *   },
 *   onError: (error) => {
 *     console.error('Failed to link:', error);
 *   }
 * });
 * 
 * // Usage after OAuth callback
 * linkSocial({ provider: 'google', code: 'authorization_code' });
 */
export const useLinkSocial = (options?: UseLinkSocialOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: LinkSocialRequest): Promise<LinkSocialResponse> => {
      const response = await fetch('/api/v1/auth/social/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to link social account');
      }
      
      const data = await response.json();
      return data.data || data;
    },
    onSuccess: (data) => {
      // Invalidate social accounts list
      queryClient.invalidateQueries({ queryKey: SOCIAL_ACCOUNTS_QUERY_KEY });
      
      // Invalidate user query (in case primary account changed)
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
};

/**
 * Hook for setting primary social account
 * 
 * @example
 * const { mutate: setPrimarySocial } = useSetPrimarySocial({
 *   onSuccess: () => {
 *     console.log('Primary account updated');
 *   }
 * });
 * 
 * setPrimarySocial({ accountId: 'social_account_id' });
 */
export const useSetPrimarySocial = (options?: UseLinkSocialOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ accountId }: { accountId: string }): Promise<{ success: boolean }> => {
      const response = await fetch('/api/v1/auth/social/primary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId }),
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to set primary account');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Invalidate social accounts list
      queryClient.invalidateQueries({ queryKey: SOCIAL_ACCOUNTS_QUERY_KEY });
      
      // Invalidate user query
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
      
      options?.onSuccess?.(null as never);
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

export type { UseLinkSocialOptions, LinkSocialRequest, LinkSocialResponse };
