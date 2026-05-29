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

// ==================== Constants ====================

const ACCOUNT_LOCK_BASE = '/api/v1/account-lock';

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

export const createAccountLockEndpoints = (client: AxiosInstance) => {
  return {
    /**
     * Get account lock status for current user or by email
     * Idempotent GET - safe to retry
     */
    getLockStatus: async (email?: string, phoneNumber?: string): Promise<AccountLockStatus> => {
      const url = buildUrlWithParams(`${ACCOUNT_LOCK_BASE}/status`, { email, phoneNumber });
      
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
      return withIdempotentRetry(async () => {
        const response = await client.get<ApiResponse<FailedAttemptsResponse>>(`${ACCOUNT_LOCK_BASE}/failed-attempts`);
        return response.data.data;
      });
    },

    /**
     * Get failed attempts for specific user (admin only)
     * Idempotent GET - safe to retry
     */
    getUserFailedAttempts: async (userId: string): Promise<FailedAttemptsResponse> => {
      return withIdempotentRetry(async () => {
        const response = await client.get<ApiResponse<FailedAttemptsResponse>>(`${ACCOUNT_LOCK_BASE}/failed-attempts/${userId}`);
        return response.data.data;
      });
    },

    /**
     * Unlock account (self-service)
     * Non-idempotent - no retry (user action)
     */
    unlockAccount: async (data: UnlockAccountRequest): Promise<UnlockAccountResponse> => {
      const response = await client.post<ApiResponse<UnlockAccountResponse>>(`${ACCOUNT_LOCK_BASE}/unlock`, data);
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
      const response = await client.post<ApiResponse<UnlockAccountResponse>>(
        `${ACCOUNT_LOCK_BASE}/admin/unlock`,
        { userId, reason, adminId }
      );
      return response.data.data;
    },

    /**
     * Lock account (admin only)
     * Non-idempotent - no retry (admin action)
     */
    lockAccount: async (data: LockAccountRequest): Promise<LockAccountResponse> => {
      const response = await client.post<ApiResponse<LockAccountResponse>>(`${ACCOUNT_LOCK_BASE}/admin/lock`, data);
      return response.data.data;
    },

    /**
     * Get lock history for current user (paginated)
     * Idempotent GET - safe to retry
     */
    getMyLockHistory: async (params?: PaginationParams): Promise<LockHistoryResponse> => {
      const url = buildUrlWithParams(`${ACCOUNT_LOCK_BASE}/history`, params);
      
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
      const url = buildUrlWithParams(`${ACCOUNT_LOCK_BASE}/history/${userId}`, params);
      
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
      return withIdempotentRetry(async () => {
        const response = await client.get<ApiResponse<AccountLockStats>>(`${ACCOUNT_LOCK_BASE}/stats`);
        return response.data.data;
      });
    },

    /**
     * Clear failed attempts for user (admin only)
     * Non-idempotent - no retry (admin action)
     */
    clearFailedAttempts: async (userId: string, adminId: string): Promise<{ success: boolean }> => {
      const response = await client.post<ApiResponse<{ success: boolean }>>(
        `${ACCOUNT_LOCK_BASE}/clear-failed-attempts`,
        { userId, adminId }
      );
      return response.data.data;
    },
  };
};

export type AccountLockEndpoints = ReturnType<typeof createAccountLockEndpoints>;
