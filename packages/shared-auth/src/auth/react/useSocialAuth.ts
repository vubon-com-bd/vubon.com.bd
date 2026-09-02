/**
 * Auth useSocialAuth Hook
 * প্রমীকরণ সোশ্যাল অথ হুক
 */

import { useState, useCallback } from 'react';
import { AuthSocialEndpoints } from '@vubon/shared-api';
import { AUTH_SOCIAL } from '@vubon/shared-constants';
import { AuthSocial, AuthSocialProfile } from '@vubon/shared-types';

export interface AuthSocialState {
  accounts: AuthSocial[];
  isLoading: boolean;
  error: Error | null;
}

export interface AuthSocialActions {
  linkAccount: (provider: string, data: AuthSocialProfile) => Promise<AuthSocial>;
  unlinkAccount: (provider: string) => Promise<void>;
  loginWithSocial: (
    provider: string,
    token: string
  ) => Promise<{ user: unknown; accessToken: string }>;
  getLoginUrl: (provider: string) => Promise<string>;
  refreshAccounts: () => Promise<void>;
}

export const useSocialAuth = (
  socialEndpoints: AuthSocialEndpoints
): AuthSocialState & AuthSocialActions => {
  const [state, setState] = useState<AuthSocialState>({
    accounts: [],
    isLoading: true,
    error: null,
  });

  // AUTH_SOCIAL ব্যবহার করা হয়েছে - valid providers চেক করার জন্য
  const isValidProvider = (provider: string): boolean => {
    const validProviders: string[] = Object.values(AUTH_SOCIAL.PROVIDERS);
    return validProviders.includes(provider);
  };

  const refreshAccounts = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const accounts = await socialEndpoints.getSocialAccounts();
      setState({
        accounts,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error as Error,
      }));
    }
  }, [socialEndpoints]);

  const linkAccount = useCallback(
    async (provider: string, data: AuthSocialProfile) => {
      // AUTH_SOCIAL ব্যবহার করে প্রোভাইডার ভ্যালিডেট করা
      if (!isValidProvider(provider)) {
        throw new Error(`Invalid social provider: ${provider}`);
      }
      try {
        const response = await socialEndpoints.linkSocialAccount(provider, data);
        await refreshAccounts();
        return response;
      } catch (error) {
        throw error;
      }
    },
    [socialEndpoints, refreshAccounts]
  );

  const unlinkAccount = useCallback(
    async (provider: string) => {
      // AUTH_SOCIAL ব্যবহার করে প্রোভাইডার ভ্যালিডেট করা
      if (!isValidProvider(provider)) {
        throw new Error(`Invalid social provider: ${provider}`);
      }
      try {
        await socialEndpoints.unlinkSocialAccount(provider);
        await refreshAccounts();
      } catch (error) {
        throw error;
      }
    },
    [socialEndpoints, refreshAccounts]
  );

  const loginWithSocial = useCallback(
    async (provider: string, token: string) => {
      // AUTH_SOCIAL ব্যবহার করে প্রোভাইডার ভ্যালিডেট করা
      if (!isValidProvider(provider)) {
        throw new Error(`Invalid social provider: ${provider}`);
      }
      try {
        return await socialEndpoints.loginWithSocial(provider, token);
      } catch (error) {
        throw error;
      }
    },
    [socialEndpoints]
  );

  const getLoginUrl = useCallback(
    async (provider: string) => {
      // AUTH_SOCIAL ব্যবহার করে প্রোভাইডার ভ্যালিডেট করা
      if (!isValidProvider(provider)) {
        throw new Error(`Invalid social provider: ${provider}`);
      }
      try {
        const response = await socialEndpoints.getSocialLoginUrl(provider);
        return response.url;
      } catch (error) {
        throw error;
      }
    },
    [socialEndpoints]
  );

  // Initialize
  useState(() => {
    refreshAccounts();
  });

  return {
    ...state,
    linkAccount,
    unlinkAccount,
    loginWithSocial,
    getLoginUrl,
    refreshAccounts,
  };
};
