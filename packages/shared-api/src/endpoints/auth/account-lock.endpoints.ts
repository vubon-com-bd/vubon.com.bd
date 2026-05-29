/**
 * Account Lock Endpoints - Account lock management API contracts
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-api/endpoints/auth/account-lock.endpoints
 *
 * RULES:
 * ✅ ONLY API endpoint contracts - NO business logic
 * ✅ NO brute force detection engine
 * ✅ Thin endpoints - only URL + request function + typed response
 * ✅ Named exports only
 * ✅ No side effects beyond HTTP requests
 */

import type { AxiosInstance } from 'axios';
import type { ApiResponse } from '@vubon/auth-types';

// Import API routes from constants
import { API_ROUTES } from '@vubon/auth-constants';

// Import retry utilities
import { withRetry, DEFAULT_RETRY_CONFIG } from '../../client/retry.client';

// ==================== Types ====================

export interface AccountLockStatus {
  isLocked: boolean;
  lockReason?: string;
  lockReasonBn?: string;
  lockLevel?: 'level_1' | 'level_2' | 'level_3' | 'level_4' | 'permanent';
  lockedAt?: string;
  expiresAt?: string | null;
  isPermanent: boolean;
  remainingLockTimeSeconds?: number;
  nextLockLevel?: 'level_1' | 'level_2' | 'level_3' | 'level_4';
  failedAttemptCount?: number;
  remainingAttemptsBeforeLock?: number;
}

export interface FailedAttempt {
  id?: string;
  timestamp: string;
  ipAddress: string;
  userAgent?: string;
  deviceId?: string;
  reason: string;
  attemptNumber: number;
  remainingAttempts: number;
}

export interface LockHistoryEntry {
  id: string;
  reason: string;
  reasonBn?: string;
  lockLevel: 'level_1' | 'level_2' | 'level_3' | 'level_4' | 'permanent';
  lockedAt: string;
  expiresAt: string | null;
  unlockedAt: string | null;
  unlockedBy: string | null;
  unlockReason: string | null;
  metadata?: {
    ipAddress?: string;
    userAgent?: string;
    failedAttemptsCount?: number;
  };
}

export interface LockHistoryResponse {
  userId: string;
  email: string;
  locks: LockHistoryEntry[];
  totalLocks: number;
  permanentLocks: number;
  temporaryLocks: number;
  lastLockAt: string | null;
  lastUnlockAt: string | null;
  lockCountByReason: Record<string, number>;
  currentLockLevel: string;
}

export interface UnlockAccountRequest {
  email?: string;
  phoneNumber?: string;
  backupCode?: string;
  verificationCode?: string;
  otpCode?: string;
  reason?: string;
}

export interface UnlockAccountResponse {
  success: boolean;
  message: string;
  messageBn?: string;
  unlockedAt: string;
}

export interface LockAccountRequest {
  userId: string;
  reason: string;
  durationSeconds?: number;
  adminNotes?: string;
  notifyUser?: boolean;
}

export interface LockAccountResponse {
  success: boolean;
  message: string;
  lockId: string;
  expiresAt: string | null;
  isPermanent: boolean;
}

export interface FailedAttemptsResponse {
  attempts: FailedAttempt[];
  total: number;
  todayCount: number;
  remainingAttempts: number;
  lockThreshold: number;
}

export interface AccountLockStats {
  activeLocks: number;
  permanentLocks: number;
  temporaryLocks: number;
  locksByLevel: {
    level_1: number;
    level_2: number;
    level_3: number;
    level_4: number;
    permanent: number;
  };
  locksByReason: Record<string, number>;
  averageLockDurationSeconds: number;
  mostLockedDistricts?: Array<{ district: string; count: number }>;
}

// Pagination params (standardized)
export interface PaginationParams {
  page?: number;
  limit?: number;
}

// Helper function for building URL with query params
const buildUrlWithParams = (baseUrl: string, params?: Record<string, string | number | undefined>): string => {
  if (!params) return baseUrl;
  
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null)
  );
  
  if (Object.keys(filteredParams).length === 0) return baseUrl;
  
  const searchParams = new URLSearchParams();
  Object.entries(filteredParams).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });
  
  return `${baseUrl}?${searchParams.toString()}`;
};

// Helper function for idempotent GET requests with retry
const withIdempotentRetry = async <T>(requestFn: () => Promise<T>): Promise<T> => {
  return withRetry(requestFn, DEFAULT_RETRY_CONFIG);
};

// ==================== Endpoint Functions ====================

// Helper to get the base path from constants, with fallback
// Assumes API_ROUTES has ACCOUNT_LOCK or similar structure
// If not, you'll need to add: ACCOUNT_LOCK: '/api/v1/account-lock' to your constants
const getAccountLockBase = (): string => {
  // Try to get from constants first (assuming API_ROUTES has ACCOUNT_LOCK)
  if (API_ROUTES.ACCOUNT_LOCK) {
    return API_ROUTES.ACCOUNT_LOCK;
  }
  // Fallback for backward compatibility
  return '/api/v1/account-lock';
};

const ACCOUNT_LOCK_BASE = getAccountLockBase();

export const createAccountLockEndpoints = (client: AxiosInstance) => {
  return {
    /**
     * Get account lock status for current user or by email
     * Idempotent GET - safe to retry
     */
    getLockStatus: async (email?: string, phoneNumber?: string): Promise<AccountLockStatus> => {
      // Try to use API_ROUTES.ACCOUNT_LOCK_STATUS if available, otherwise construct
      const statusPath = API_ROUTES.ACCOUNT_LOCK_STATUS 
        ? API_ROUTES.ACCOUNT_LOCK_STATUS 
        : `${ACCOUNT_LOCK_BASE}/status`;
      
      const url = buildUrlWithParams(statusPath, { email, phoneNumber });
      
      return withIdempotentRetry(async () => {
        const response = await client.get<ApiResponse<AccountLockStatus>>(url);
        return response.data.data;
      });
    },

    /**
     * Get failed login attempts for current user
     * Idempotent GET - safe to retry
     */
    getFailedAttempts: async (): Promise<FailedAttemptsResponse> => {
      const path = API_ROUTES.ACCOUNT_LOCK_FAILED_ATTEMPTS 
        ? API_ROUTES.ACCOUNT_LOCK_FAILED_ATTEMPTS 
        : `${ACCOUNT_LOCK_BASE}/failed-attempts`;
      
      return withIdempotentRetry(async () => {
        const response = await client.get<ApiResponse<FailedAttemptsResponse>>(path);
        return response.data.data;
      });
    },

    /**
     * Get failed attempts for specific user (admin only)
     * Idempotent GET - safe to retry
     */
    getUserFailedAttempts: async (userId: string): Promise<FailedAttemptsResponse> => {
      const path = API_ROUTES.ACCOUNT_LOCK_USER_FAILED_ATTEMPTS 
        ? API_ROUTES.ACCOUNT_LOCK_USER_FAILED_ATTEMPTS.replace('{{userId}}', userId)
        : `${ACCOUNT_LOCK_BASE}/failed-attempts/${userId}`;
      
      return withIdempotentRetry(async () => {
        const response = await client.get<ApiResponse<FailedAttemptsResponse>>(path);
        return response.data.data;
      });
    },

    /**
     * Unlock account (self-service)
     * Non-idempotent - no retry (user action)
     */
    unlockAccount: async (data: UnlockAccountRequest): Promise<UnlockAccountResponse> => {
      const path = API_ROUTES.ACCOUNT_LOCK_UNLOCK 
        ? API_ROUTES.ACCOUNT_LOCK_UNLOCK 
        : `${ACCOUNT_LOCK_BASE}/unlock`;
      
      const response = await client.post<ApiResponse<UnlockAccountResponse>>(path, data);
      return response.data.data;
    },

    /**
     * Unlock account by admin
     * Non-idempotent - no retry (admin action)
     */
    adminUnlockAccount: async (
      userId: string,
      reason: string,
      adminId: string
    ): Promise<UnlockAccountResponse> => {
      const path = API_ROUTES.ACCOUNT_LOCK_ADMIN_UNLOCK 
        ? API_ROUTES.ACCOUNT_LOCK_ADMIN_UNLOCK 
        : `${ACCOUNT_LOCK_BASE}/admin/unlock`;
      
      const response = await client.post<ApiResponse<UnlockAccountResponse>>(
        path,
        { userId, reason, adminId }
      );
      return response.data.data;
    },

    /**
     * Lock account (admin only)
     * Non-idempotent - no retry (admin action)
     */
    lockAccount: async (data: LockAccountRequest): Promise<LockAccountResponse> => {
      const path = API_ROUTES.ACCOUNT_LOCK_ADMIN_LOCK 
        ? API_ROUTES.ACCOUNT_LOCK_ADMIN_LOCK 
        : `${ACCOUNT_LOCK_BASE}/admin/lock`;
      
      const response = await client.post<ApiResponse<LockAccountResponse>>(path, data);
      return response.data.data;
    },

    /**
     * Get lock history for current user (paginated)
     * Idempotent GET - safe to retry
     */
    getMyLockHistory: async (params?: PaginationParams): Promise<LockHistoryResponse> => {
      const historyPath = API_ROUTES.ACCOUNT_LOCK_HISTORY 
        ? API_ROUTES.ACCOUNT_LOCK_HISTORY 
        : `${ACCOUNT_LOCK_BASE}/history`;
      
      const url = buildUrlWithParams(historyPath, params);
      
      return withIdempotentRetry(async () => {
        const response = await client.get<ApiResponse<LockHistoryResponse>>(url);
        return response.data.data;
      });
    },

    /**
     * Get lock history for specific user (admin only)
     * Idempotent GET - safe to retry
     */
    getLockHistory: async (userId: string, params?: PaginationParams): Promise<LockHistoryResponse> => {
      const path = API_ROUTES.ACCOUNT_LOCK_USER_HISTORY 
        ? API_ROUTES.ACCOUNT_LOCK_USER_HISTORY.replace('{{userId}}', userId)
        : `${ACCOUNT_LOCK_BASE}/history/${userId}`;
      
      const url = buildUrlWithParams(path, params);
      
      return withIdempotentRetry(async () => {
        const response = await client.get<ApiResponse<LockHistoryResponse>>(url);
        return response.data.data;
      });
    },

    /**
     * Get account lock statistics (admin only)
     * Idempotent GET - safe to retry
     */
    getLockStats: async (): Promise<AccountLockStats> => {
      const path = API_ROUTES.ACCOUNT_LOCK_STATS 
        ? API_ROUTES.ACCOUNT_LOCK_STATS 
        : `${ACCOUNT_LOCK_BASE}/stats`;
      
      return withIdempotentRetry(async () => {
        const response = await client.get<ApiResponse<AccountLockStats>>(path);
        return response.data.data;
      });
    },

    /**
     * Clear failed attempts for user (admin only)
     * Non-idempotent - no retry (admin action)
     */
    clearFailedAttempts: async (userId: string, adminId: string): Promise<{ success: boolean }> => {
      const path = API_ROUTES.ACCOUNT_LOCK_CLEAR_ATTEMPTS 
        ? API_ROUTES.ACCOUNT_LOCK_CLEAR_ATTEMPTS 
        : `${ACCOUNT_LOCK_BASE}/clear-failed-attempts`;
      
      const response = await client.post<ApiResponse<{ success: boolean }>>(
        path,
        { userId, adminId }
      );
      return response.data.data;
    },
  };
};

export type AccountLockEndpoints = ReturnType<typeof createAccountLockEndpoints>;
