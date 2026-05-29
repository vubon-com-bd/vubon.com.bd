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
  regenerateBackupCodes: () =>Promise<string[]>;
  /** Disable MFA for a method */
  disableMFA: (methodId?:string, reason?: string) =>Promise<boolean>;
  /** Set primary MFA method */
  setPrimaryMethod: (methodId: string) => Promise<boolean>;
  /** Refresh MFA methods list */
  refreshMethods:() => Promise<void>;
}

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

  const loadMethods = React.useCallback(async () => {
    try {
      setLoading(true);
      const loadedMethods = await getMfaMethods();
      setMethods(loadedMethods);
    } catch (error) {
      console.error('Failed to load MFA methods:', error);
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
        return false;
      }
    },
    [verifyMfa, loadMethods]
  );

  const getBackupCodes = React.useCallback(async (): Promise<string[]> => {
    const response = await fetch('/api/v1/mfa/backup-codes', { credentials: 'include' });
    const data = await response.json();
    return data.data?.backupCodes || [];
  }, []);

  const regenerateBackupCodes = React.useCallback(async (): Promise<string[]> => {
    const response = await fetch('/api/v1/mfa/backup-codes/regenerate', {
      method: 'POST',
      credentials: 'include',
    });
    const data = await response.json();
    return data.data?.backupCodes || [];
  }, []);

  const disableMFA = React.useCallback(
    async (methodId?: string, reason?: string): Promise<boolean> => {
      const response = await fetch('/api/v1/mfa/disable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ methodId, reason }),
      });
      const data = await response.json();
      if (data.success) {
        await loadMethods();
      }
      return data.success;
    },
    [loadMethods]
  );

  const setPrimaryMethod = React.useCallback(
    async (methodId: string): Promise<boolean> => {
      const response = await fetch('/api/v1/mfa/primary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ methodId }),
      });
      const data = await response.json();
      if (data.success) {
        await loadMethods();
      }
      return data.success;
    },
    [loadMethods]
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
