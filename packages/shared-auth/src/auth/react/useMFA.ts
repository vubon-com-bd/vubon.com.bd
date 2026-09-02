/**
 * Auth useMFA Hook
 * প্রমীকরণ MFA হুক
 */

import { useState, useCallback, useEffect } from 'react';
import { AuthMFAEndpoints } from '@vubon/shared-api';
import { AUTH_MFA } from '@vubon/shared-constants';
import { AuthMFAType, AuthMFAMethod } from '@vubon/shared-types';

export interface AuthMFAState {
  enabled: boolean;
  methods: string[];
  defaultMethod?: string;
  isLoading: boolean;
  error: Error | null;
}

export interface AuthMFAActions {
  setupMFA: (
    type: AuthMFAType,
    method: AuthMFAMethod,
    data?: Record<string, unknown>
  ) => Promise<unknown>;
  verifyMFA: (code: string, method: AuthMFAMethod) => Promise<boolean>;
  enableMFA: (type: string) => Promise<void>;
  disableMFA: (type: string) => Promise<void>;
  generateBackupCodes: () => Promise<string[]>;
  refreshStatus: () => Promise<void>;
}

export const useMFA = (mfaEndpoints: AuthMFAEndpoints): AuthMFAState & AuthMFAActions => {
  const [state, setState] = useState<AuthMFAState>({
    enabled: false,
    methods: [],
    isLoading: true,
    error: null,
  });

  const refreshStatus = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const status = await mfaEndpoints.getMFAStatus();
      setState({
        enabled: status.enabled,
        methods: status.methods,
        defaultMethod: status.defaultMethod,
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
  }, [mfaEndpoints]);

  const setupMFA = useCallback(
    async (type: AuthMFAType, method: AuthMFAMethod, data?: Record<string, unknown>) => {
      try {
        const validTypes = Object.values(AUTH_MFA.TYPES);
        const validMethods = Object.values(AUTH_MFA.METHODS);

        if (!validTypes.includes(type as AuthMFAType)) {
          throw new Error(`Invalid MFA type: ${type}. Valid types: ${validTypes.join(', ')}`);
        }
        if (!validMethods.includes(method as AuthMFAMethod)) {
          throw new Error(
            `Invalid MFA method: ${method}. Valid methods: ${validMethods.join(', ')}`
          );
        }

        const response = await mfaEndpoints.setupMFA({ type, method, ...data });
        await refreshStatus();
        return response;
      } catch (error) {
        throw error;
      }
    },
    [mfaEndpoints, refreshStatus]
  );

  const verifyMFA = useCallback(
    async (code: string, method: AuthMFAMethod) => {
      try {
        const validMethods = Object.values(AUTH_MFA.METHODS);
        if (!validMethods.includes(method as AuthMFAMethod)) {
          throw new Error(
            `Invalid MFA method: ${method}. Valid methods: ${validMethods.join(', ')}`
          );
        }

        const response = await mfaEndpoints.verifyMFA({ code, method });
        if (response.verified) {
          await refreshStatus();
        }
        return response.verified;
      } catch (error) {
        throw error;
      }
    },
    [mfaEndpoints, refreshStatus]
  );

  const enableMFA = useCallback(
    async (type: string) => {
      try {
        const validTypes = Object.values(AUTH_MFA.TYPES);
        if (!validTypes.includes(type as AuthMFAType)) {
          throw new Error(`Invalid MFA type: ${type}. Valid types: ${validTypes.join(', ')}`);
        }

        await mfaEndpoints.enableMFA(type);
        await refreshStatus();
      } catch (error) {
        throw error;
      }
    },
    [mfaEndpoints, refreshStatus]
  );

  const disableMFA = useCallback(
    async (type: string) => {
      try {
        const validTypes = Object.values(AUTH_MFA.TYPES);
        if (!validTypes.includes(type as AuthMFAType)) {
          throw new Error(`Invalid MFA type: ${type}. Valid types: ${validTypes.join(', ')}`);
        }

        await mfaEndpoints.disableMFA(type);
        await refreshStatus();
      } catch (error) {
        throw error;
      }
    },
    [mfaEndpoints, refreshStatus]
  );

  const generateBackupCodes = useCallback(async () => {
    try {
      const response = await mfaEndpoints.generateBackupCodes();
      return response.codes;
    } catch (error) {
      throw error;
    }
  }, [mfaEndpoints]);

  // Initialize
  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  return {
    ...state,
    setupMFA,
    verifyMFA,
    enableMFA,
    disableMFA,
    generateBackupCodes,
    refreshStatus,
  };
};
