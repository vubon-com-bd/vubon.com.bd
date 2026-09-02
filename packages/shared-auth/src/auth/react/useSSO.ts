/**
 * Auth useSSO Hook
 * প্রমীকরণ SSO হুক
 */

import { useState, useCallback } from 'react';
import { AuthSSOEndpoints } from '@vubon/shared-api';
import { AUTH_SSO } from '@vubon/shared-constants';
import {
  AuthSSO,
  AuthSSOProvider,
  AuthSSOSAMLRequest,
  AuthSSOSAMLResponse,
} from '@vubon/shared-types';

export interface AuthSSOState {
  providers: { id: string; name: string; protocol: string }[];
  sessions: AuthSSO[];
  isLoading: boolean;
  error: Error | null;
}

export interface AuthSSOActions {
  initiateLogin: (providerId: AuthSSOProvider) => Promise<{ url: string; requestId: string }>;
  handleCallback: (
    providerId: AuthSSOProvider,
    data: AuthSSOSAMLResponse | AuthSSOSAMLRequest
  ) => Promise<{ user: unknown; accessToken: string }>;
  terminateSession: (sessionId: string) => Promise<void>;
  getSAMLMetadata: (providerId: AuthSSOProvider) => Promise<string>;
  refreshProviders: () => Promise<void>;
}

export const useSSO = (ssoEndpoints: AuthSSOEndpoints): AuthSSOState & AuthSSOActions => {
  const [state, setState] = useState<AuthSSOState>({
    providers: [],
    sessions: [],
    isLoading: true,
    error: null,
  });

  const refreshProviders = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const providersResponse = await ssoEndpoints.getSSOProviders();
      const sessions = await ssoEndpoints.getSSOSessions();

      // AUTH_SSO ব্যবহার
      const validProviders = providersResponse.providers.filter((p) =>
        Object.values(AUTH_SSO.PROVIDERS).includes(p.id as AuthSSOProvider)
      );

      setState({
        providers: validProviders,
        sessions,
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
  }, [ssoEndpoints]);

  const initiateLogin = useCallback(
    async (providerId: AuthSSOProvider) => {
      try {
        return await ssoEndpoints.initiateSSOLogin(providerId);
      } catch (error) {
        throw error;
      }
    },
    [ssoEndpoints]
  );

  const handleCallback = useCallback(
    async (providerId: AuthSSOProvider, data: AuthSSOSAMLResponse | AuthSSOSAMLRequest) => {
      try {
        const response = await ssoEndpoints.handleSSOCallback(providerId, data);
        await refreshProviders();
        return response;
      } catch (error) {
        throw error;
      }
    },
    [ssoEndpoints, refreshProviders]
  );

  const terminateSession = useCallback(
    async (sessionId: string) => {
      try {
        await ssoEndpoints.terminateSSOSession(sessionId);
        await refreshProviders();
      } catch (error) {
        throw error;
      }
    },
    [ssoEndpoints, refreshProviders]
  );

  const getSAMLMetadata = useCallback(
    async (providerId: AuthSSOProvider) => {
      try {
        const response = await ssoEndpoints.getSAMLMetadata(providerId);
        return response.metadata;
      } catch (error) {
        throw error;
      }
    },
    [ssoEndpoints]
  );

  // Initialize
  useState(() => {
    refreshProviders();
  });

  return {
    ...state,
    initiateLogin,
    handleCallback,
    terminateSession,
    getSAMLMetadata,
    refreshProviders,
  };
};
