/**
 * useMFA Hook - Multi-Factor Authentication
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-auth/src/react/useMFA
 * 
 * RULES:
 * ✅ ONLY MFA UI abstraction - NO OTP generation, TOTP verification
 * ✅ Pure React hook for MFA orchestration
 * ✅ TypeScript strict
 */

import React from 'react';
import { useAuthContext } from './AuthContext';
import type { MFAProvider, MFASetupResponse, MFAMethod } from '../client/auth.client';

// Import from shared-api and shared-utils
import { createMfaEndpoints } from '@vubon/shared-api';
import { withRetry, DEFAULT_RETRY_CONFIG } from '@vubon/shared-api/client/retry';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { env } from '@vubon/shared-config/env';

// ==================== Types ====================

export interface UseMFAReturn {
  /** Current MFA methods */
  methods: MFAMethod[];
  /** Whether MFA is required */
  isRequired: boolean;
  /** Whether MFA is loading */
  loading: boolean;
  /** Setup MFA for a provider (TOTP, SMS, WhatsApp, bKash PIN, etc.) */
  setupMFA: (provider: MFAProvider, identifier?: string, label?: string) => Promise<MFASetupResponse>;
  /** Verify MFA code */
  verifyMFA: (code: string, methodId?: string, trustDevice?: boolean, challengeId?: string) => Promise<boolean>;
  /** Get backup codes */
  getBackupCodes: () => Promise<string[]>;
  /** Regenerate backup codes */
  regenerateBackupCodes: () => Promise<string[]>;
  /** Disable MFA for a method */
  disableMFA: (methodId?: string, reason?: string) => Promise<boolean>;
  /** Set primary MFA method */
  setPrimaryMethod: (methodId: string) => Promise<boolean>;
  /** Refresh MFA methods list */
  refreshMethods: () => Promise<void>;
}

// Simple logger that can be replaced with proper logging solution
const logError = (error: unknown, context: string): void => {
  if (env.NODE_ENV === 'development') {
    console.error(`[useMFA] ${context}:`, error);
  }
};

// Helper function to extract data from API response
const extractData = <T>(response: { data?: { data?: T } }): T | undefined => {
  return response.data?.data;
};

// Helper function for idempotent GET requests with retry
const withIdempotentRetry = async <T>(requestFn: () => Promise<T>): Promise<T> => {
  return withRetry(requestFn, DEFAULT_RETRY_CONFIG);
};

// ==================== Hook ====================

/**
 * Hook for Multi-Factor Authentication management
 * 
 * @example
 * const { setupMFA, verifyMFA, methods, isRequired } = useMFA();
 * 
 * // Setup TOTP
 * const { qrCodeUrl, secret } = await setupMFA('totp');
 * 
 * // Verify MFA
 * const verified = await verifyMFA('123456');
 */
export const useMFA = (): UseMFAReturn => {
  const { getMfaMethods, setupMfa, verifyMfa, isMfaRequired } = useAuthContext();
  const [methods, setMethods] = React.useState<MFAMethod[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Create API client once
  const mfaApi = React.useMemo(() => {
    const client = getAxiosClient();
    return createMfaEndpoints(client);
  }, []);

  const loadMethods = React.useCallback(async () => {
    try {
      setLoading(true);
      const loadedMethods = await getMfaMethods();
      setMethods(loadedMethods);
    } catch (error) {
      logError(error, 'Failed to load MFA methods');
    } finally {
      setLoading(false);
    }
  }, [getMfaMethods]);

  // Load methods on mount
  React.useEffect(() => {
    loadMethods();
  }, [loadMethods]);

  const setupMFA = React.useCallback(
    async (provider: MFAProvider, identifier?: string, label?: string): Promise<MFASetupResponse> => {
      const result = await setupMfa(provider, identifier, label);
      await loadMethods(); // Refresh methods after setup
      return result;
    },
    [setupMfa, loadMethods]
  );

  const verifyMFA = React.useCallback(
    async (code: string, methodId?: string, trustDevice?: boolean, challengeId?: string): Promise<boolean> => {
      try {
        await verifyMfa(code, methodId, trustDevice, challengeId);
        await loadMethods(); // Refresh methods after verification
        return true;
      } catch (error) {
        logError(error, 'MFA verification failed');
        return false;
      }
    },
    [verifyMfa, loadMethods]
  );

  // Using shared-api endpoints with retry support
  const getBackupCodes = React.useCallback(async (): Promise<string[]> => {
    try {
      const response = await withIdempotentRetry(() => mfaApi.getBackupCodes());
      return extractData(response)?.backupCodes || [];
    } catch (error) {
      logError(error, 'Failed to get backup codes');
      return [];
    }
  }, [mfaApi]);

  const regenerateBackupCodes = React.useCallback(async (): Promise<string[]> => {
    try {
      const response = await mfaApi.regenerateBackupCodes();
      return extractData(response)?.backupCodes || [];
    } catch (error) {
      logError(error, 'Failed to regenerate backup codes');
      return [];
    }
  }, [mfaApi]);

  const disableMFA = React.useCallback(
    async (methodId?: string, reason?: string): Promise<boolean> => {
      try {
        const response = await mfaApi.disable(methodId, reason);
        const success = extractData(response)?.success ?? false;
        if (success) {
          await loadMethods();
        }
        return success;
      } catch (error) {
        logError(error, 'Failed to disable MFA');
        return false;
      }
    },
    [mfaApi, loadMethods]
  );

  const setPrimaryMethod = React.useCallback(
    async (methodId: string): Promise<boolean> => {
      try {
        const response = await mfaApi.setPrimaryMethod(methodId);
        const success = extractData(response)?.success ?? false;
        if (success) {
          await loadMethods();
        }
        return success;
      } catch (error) {
        logError(error, 'Failed to set primary MFA method');
        return false;
      }
    },
    [mfaApi, loadMethods]
  );

  const refreshMethods = React.useCallback(async () => {
    await loadMethods();
  }, [loadMethods]);

  return {
    methods,
    isRequired: isMfaRequired,
    loading,
    setupMFA,
    verifyMFA,
    getBackupCodes,
    regenerateBackupCodes,
    disableMFA,
    setPrimaryMethod,
    refreshMethods,
  };
};

/**
 * Hook for checking if MFA is required for current action
 */
export const useIsMFARequired = (): boolean => {
  const { isMfaRequired } = useAuthContext();
  return isMfaRequired;
};

/**
 * Hook for MFA setup only (lightweight)
 */
export const useMFASetup = () => {
  const { setupMfa } = useAuthContext();
  const [loading, setLoading] = React.useState(false);

  const setup = React.useCallback(
    async (provider: MFAProvider, identifier?: string, label?: string): Promise<MFASetupResponse> => {
      setLoading(true);
      try {
        return await setupMfa(provider, identifier, label);
      } finally {
        setLoading(false);
      }
    },
    [setupMfa]
  );

  return { setup, loading };
};

// ==================== Type Exports ====================

export type { UseMFAReturn };
