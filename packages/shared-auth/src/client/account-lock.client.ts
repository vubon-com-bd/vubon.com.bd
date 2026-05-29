/**
 * Account Lock Client - Account lock management
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-auth/src/client/account-lock.client
 *
 * RULES:
 * ✅ ONLY account lock orchestration - NO business logic
 * ✅ NO UI rendering, toast, redirect
 * ✅ Singleton pattern for consistent state
 * ✅ TypeScript strict
 */

// Import from shared-config for environment-aware configuration
import { env } from '@vubon/shared-config/env';

// ==================== Types ====================

// Progressive lock levels (based on shared-constants)
export type LockLevel = 'level_1' | 'level_2' | 'level_3' | 'level_4' | 'permanent';

export interface AccountLockStatus {
  isLocked: boolean;
  lockReason?: string;
  lockReasonBn?: string;
  lockLevel?: LockLevel;
  lockedAt?: string;
  expiresAt?: string | null;
  isPermanent: boolean;
  remainingLockTimeSeconds?: number;
  remainingAttemptsBeforeLock?: number;
  failedAttemptCount?: number;
}

export interface AccountLockClientConfig {
  apiClient: {
    getLockStatus: (email?: string, phoneNumber?: string) => Promise<AccountLockStatus>;
    unlockAccount: (data: { email?: string; phoneNumber?: string; backupCode?: string; verificationCode?: string; otpCode?: string }) => Promise<{ success: boolean; message: string; messageBn?: string }>;
    getFailedAttempts: () => Promise<{ attempts: unknown[]; remainingAttempts: number; lockThreshold: number }>;
  };
  onLockStatusChanged?: (status: AccountLockStatus) => void;
  onUnlockSuccess?: () => void;
  onUnlockFailed?: (message: string) => void;
  /** Default lock threshold (max attempts before lock) - defaults to env or 5 */
  defaultLockThreshold?: number;
}

export interface AccountLockState {
  status: AccountLockStatus | null;
  isLoading: boolean;
  remainingAttempts: number;
  lockThreshold: number;
}

// Get default lock threshold from environment
const getDefaultLockThreshold = (): number => {
  const threshold = env.ACCOUNT_LOCK_THRESHOLD;
  return threshold ? Number(threshold) : 5;
};

// ==================== Account Lock Client ====================

export class AccountLockClient {
  private config: AccountLockClientConfig;
  private state: AccountLockState = {
    status: null,
    isLoading: false,
    remainingAttempts: 0,
    lockThreshold: getDefaultLockThreshold(),
  };
  private listeners: Set<(state: AccountLockState) => void> = new Set();

  constructor(config: AccountLockClientConfig) {
    this.config = config;
    // Override default lock threshold if provided in config
    if (config.defaultLockThreshold !== undefined) {
      this.state.lockThreshold = config.defaultLockThreshold;
    }
  }

  /**
   * Check account lock status
   */
  async checkLockStatus(email?: string, phoneNumber?: string): Promise<AccountLockStatus> {
    this.state.isLoading = true;
    this.notifyListeners();

    try {
      const status = await this.config.apiClient.getLockStatus(email, phoneNumber);
      this.state.status = status;
      this.state.remainingAttempts = status.remainingAttemptsBeforeLock ?? 0;
      // Use API returned threshold or fallback to config/default
      if (status.remainingAttemptsBeforeLock !== undefined) {
        // threshold is derived from the API response
        this.state.lockThreshold = Math.max(this.state.lockThreshold, 5);
      }
      
      this.config.onLockStatusChanged?.(status);
      this.notifyListeners();
      return status;
    } finally {
      this.state.isLoading = false;
      this.notifyListeners();
    }
  }

  /**
   * Get failed attempts for current user
   */
  async getFailedAttempts(): Promise<{ remainingAttempts: number; lockThreshold: number }> {
    try {
      const response = await this.config.apiClient.getFailedAttempts();
      this.state.remainingAttempts = response.remainingAttempts;
      this.state.lockThreshold = response.lockThreshold;
      this.notifyListeners();
      return response;
    } catch {
      return { remainingAttempts: 0, lockThreshold: this.state.lockThreshold };
    }
  }

  /**
   * Unlock account (self-service)
   */
  async unlockAccount(data: { email?: string; phoneNumber?: string; backupCode?: string; verificationCode?: string; otpCode?: string }): Promise<boolean> {
    try {
      const response = await this.config.apiClient.unlockAccount(data);
      
      if (response.success) {
        // Refresh lock status
        await this.checkLockStatus();
        this.config.onUnlockSuccess?.();
        return true;
      } else {
        this.config.onUnlockFailed?.(response.message);
        return false;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unlock failed';
      this.config.onUnlockFailed?.(message);
      return false;
    }
  }

  /**
   * Check if account is locked
   */
  isLocked(): boolean {
    return this.state.status?.isLocked ?? false;
  }

  /**
   * Get remaining lock time (seconds)
   */
  getRemainingLockTime(): number | undefined {
    return this.state.status?.remainingLockTimeSeconds;
  }

  /**
   * Get remaining attempts before lock
   */
  getRemainingAttempts(): number {
    return this.state.remainingAttempts;
  }

  /**
   * Get lock threshold (max attempts before lock)
   */
  getLockThreshold(): number {
    return this.state.lockThreshold;
  }

  /**
   * Get lock level
   */
  getLockLevel(): LockLevel | undefined {
    return this.state.status?.lockLevel;
  }

  /**
   * Get lock reason (English)
   */
  getLockReason(): string | undefined {
    return this.state.status?.lockReason;
  }

  /**
   * Get lock reason (Bangla)
   */
  getLockReasonBn(): string | undefined {
    return this.state.status?.lockReasonBn;
  }

  /**
   * Check if lock is permanent
   */
  isPermanentLock(): boolean {
    return this.state.status?.isPermanent ?? false;
  }

  /**
   * Get formatted lock message (prioritizes Bangla if available)
   */
  getLockMessage(): string {
    if (this.state.status?.lockReasonBn) {
      return this.state.status.lockReasonBn;
    }
    return this.state.status?.lockReason || 'Account is locked';
  }

  /**
   * Get current state
   */
  getState(): AccountLockState {
    return { ...this.state };
  }

  /**
   * Subscribe to state changes
   */
  subscribe(listener: (state: AccountLockState) => void): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify listeners
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  /**
   * Reset state
   */
  reset(): void {
    this.state = {
      status: null,
      isLoading: false,
      remainingAttempts: 0,
      lockThreshold: getDefaultLockThreshold(),
    };
    // Override with config if provided
    if (this.config.defaultLockThreshold !== undefined) {
      this.state.lockThreshold = this.config.defaultLockThreshold;
    }
    this.notifyListeners();
  }

  /**
   * Destroy client
   */
  destroy(): void {
    this.listeners.clear();
  }
}

// ==================== Singleton ====================

let accountLockClientInstance: AccountLockClient | null = null;

export const createAccountLockClient = (config: AccountLockClientConfig): AccountLockClient => {
  if (accountLockClientInstance) {
    accountLockClientInstance.destroy();
  }
  accountLockClientInstance = new AccountLockClient(config);
  return accountLockClientInstance;
};

export const getAccountLockClient = (): AccountLockClient | null => {
  return accountLockClientInstance;
};

export const resetAccountLockClient = (): void => {
  if (accountLockClientInstance) {
    accountLockClientInstance.destroy();
    accountLockClientInstance = null;
  }
};

// ==================== Type Exports ====================

export type { AccountLockStatus, LockLevel };
