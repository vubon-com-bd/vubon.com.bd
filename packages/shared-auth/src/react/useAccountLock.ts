/**
 * useAccountLock Hook - Account lock management
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-auth/src/react/useAccountLock
 * 
 * RULES:
 * ✅ ONLY account lock UI abstraction - NO lock enforcement logic
 * ✅ Pure React hook for lock status & unlock
 * ✅ TypeScript strict
 */

import React from 'react';
import { useAuthContext } from './AuthContext';

// Import from shared-api and shared-utils
import { createAccountLockEndpoints } from '@vubon/shared-api';
import { withRetry, DEFAULT_RETRY_CONFIG } from '@vubon/shared-api/client/retry';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { env } from '@vubon/shared-config/env';

// ==================== Types ====================

export interface AccountLockInfo {
  /** Whether account is locked */
  isLocked: boolean;
  /** Lock reason (e.g., 'too_many_failed_attempts', 'sim_swap_detected') */
  lockReason?: string;
  /** Lock reason in Bengali */
  lockReasonBn?: string;
  /** Lock level (1-4 or permanent) */
  lockLevel?: 'level_1' | 'level_2' | 'level_3' | 'level_4' | 'permanent';
  /** When account was locked (ISO string) */
  lockedAt?: string;
  /** When lock expires (ISO string or null for permanent) */
  expiresAt?: string | null;
  /** Whether lock is permanent */
  isPermanent: boolean;
  /** Remaining lock time in seconds (0 if not locked) */
  remainingLockTimeSeconds: number;
  /** Next lock level if another attempt fails */
  nextLockLevel?: 'level_1' | 'level_2' | 'level_3' | 'level_4';
  /** Failed attempt count */
  failedAttemptCount?: number;
  /** Remaining attempts before lock */
  remainingAttemptsBeforeLock?: number;
}

export interface UnlockAccountParams {
  email?: string;
  phoneNumber?: string;
  backupCode?: string;
  verificationCode?: string;
  otpCode?: string;
  reason?: string;
}

export interface UnlockAccountResult {
  success: boolean;
  message: string;
  messageBn?: string;
  unlockedAt: string;
}

export interface UseAccountLockReturn {
  /** Account lock information */
  info: AccountLockInfo;
  /** Unlock account using various methods */
  unlockAccount: (params: UnlockAccountParams) => Promise<UnlockAccountResult>;
  /** Refresh lock status */
  refreshStatus: () => Promise<void>;
  /** Loading state while fetching lock status */
  loading: boolean;
}

// Simple logger that can be replaced with proper logging solution
const logError = (error: unknown, context: string): void => {
  if (env.NODE_ENV === 'development') {
    console.error(`[useAccountLock] ${context}:`, error);
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

// ==================== Helper ====================

/**
 * Fetch lock status using shared-api with retry support
 */
const fetchLockStatus = async (): Promise<AccountLockInfo> => {
  const client = getAxiosClient({ baseURL: env.API_URL });
  const accountLockApi = createAccountLockEndpoints(client);
  
  return withIdempotentRetry(() => accountLockApi.getLockStatus());
};

// ==================== Hook ====================

/**
 * Hook for account lock management
 * 
 * @example
 * const { info, unlockAccount, refreshStatus } = useAccountLock();
 * 
 * // Check lock status
 * if (info.isLocked) {
 *   console.log(`Account locked for ${info.remainingLockTimeSeconds} seconds`);
 * }
 * 
 * // Unlock with backup code
 * await unlockAccount({ backupCode: 'XXXX-XXXX' });
 */
export const useAccountLock = (): UseAccountLockReturn => {
  const { isAccountLocked: authIsLocked, getRemainingLockTime: authGetRemainingTime, unlockAccount: authUnlockAccount } = useAuthContext();
  const [info, setInfo] = React.useState<AccountLockInfo>({
    isLocked: false,
    isPermanent: false,
    remainingLockTimeSeconds: 0,
  });
  const [loading, setLoading] = React.useState(true);

  const loadStatus = React.useCallback(async () => {
    try {
      setLoading(true);
      const status = await fetchLockStatus();
      setInfo(status);
    } catch (error) {
      logError(error, 'Failed to load account lock status');
      // Fallback to auth context values
      setInfo({
        isLocked: authIsLocked(),
        isPermanent: false,
        remainingLockTimeSeconds: authGetRemainingTime(),
      });
    } finally {
      setLoading(false);
    }
  }, [authIsLocked, authGetRemainingTime]);

  // Load status on mount and periodically while locked
  React.useEffect(() => {
    loadStatus();

    let interval: ReturnType<typeof setInterval> | null = null;

    if (info.isLocked && !info.isPermanent && info.remainingLockTimeSeconds > 0) {
      // Update remaining time every second when locked
      interval = setInterval(() => {
        setInfo((prev) => ({
          ...prev,
          remainingLockTimeSeconds: Math.max(0, prev.remainingLockTimeSeconds - 1),
        }));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [info.isLocked, info.isPermanent, info.remainingLockTimeSeconds, loadStatus]);

  const unlockAccount = React.useCallback(
    async (params: UnlockAccountParams): Promise<UnlockAccountResult> => {
      const result = await authUnlockAccount(params);
      if (result.success) {
        await loadStatus(); // Refresh lock status after unlock
      }
      return result;
    },
    [authUnlockAccount, loadStatus]
  );

  const refreshStatus = React.useCallback(async () => {
    await loadStatus();
  }, [loadStatus]);

  return {
    info,
    unlockAccount,
    refreshStatus,
    loading,
  };
};

/**
 * Hook for checking if account is locked (lightweight)
 */
export const useIsAccountLocked = (): boolean => {
  const { isAccountLocked } = useAuthContext();
  return isAccountLocked();
};

/**
 * Hook for remaining lock time (lightweight)
 */
export const useRemainingLockTime = (): number => {
  const { getRemainingLockTime } = useAuthContext();
  return getRemainingLockTime();
};

// ==================== Type Exports ====================

export type { UseAccountLockReturn, AccountLockInfo, UnlockAccountParams, UnlockAccountResult };
