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

// ==================== Types ====================

export interface AccountLockStatus {
  isLocked: boolean;
  lockReason ? : string;
  lockReasonBn ? : string;
  lockLevel ? : 'level_1' | 'level_2' | 'level_3' | 'level_4' | 'permanent';
  lockedAt ? : string;
  expiresAt ? : string | null;
  isPermanent: boolean;
  remainingLockTimeSeconds ? : number;
  nextLockLevel ? : 'level_1' | 'level_2' | 'level_3' | 'level_4';
  failedAttemptCount ? : number;
  remainingAttemptsBeforeLock ? : number;
}

export interface FailedAttempt {
  id ? : string;
  timestamp: string;
  ipAddress: string;
  userAgent ? : string;
  deviceId ? : string;
  reason: string;
  attemptNumber: number;
  remainingAttempts: number;
}

export interface LockHistoryEntry {
  id: string;
  reason: string;
  reasonBn ? : string;
  lockLevel: 'level_1' | 'level_2' | 'level_3' | 'level_4' | 'permanent';
  lockedAt: string;
  expiresAt: string | null;
  unlockedAt: string | null;
  unlockedBy: string | null;
  unlockReason: string | null;
  metadata ? : {
    ipAddress ? : string;
    userAgent ? : string;
    failedAttemptsCount ? : number;
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
  lockCountByReason: Record < string,
  number > ;
  currentLockLevel: string;
}

export interface UnlockAccountRequest {
  email ? : string;
  phoneNumber ? : string;
  backupCode ? : string;
  verificationCode ? : string;
  otpCode ? : string;
  reason ? : string;
}

export interface UnlockAccountResponse {
  success: boolean;
  message: string;
  messageBn ? : string;
  unlockedAt: string;
}

export interface LockAccountRequest {
  userId: string;
  reason: string;
  durationSeconds ? : number;
  adminNotes ? : string;
  notifyUser ? : boolean;
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
  locksByReason: Record < string,
  number > ;
  averageLockDurationSeconds: number;
  mostLockedDistricts ? : Array < { district: string;count: number } > ;
}

// ==================== Endpoint Functions ====================

export const createAccountLockEndpoints = (client: AxiosInstance) => {
  return {
    /**
     * Get account lock status for current user or by email
     */
    getLockStatus: async (email ? : string, phoneNumber ? : string): Promise < AccountLockStatus > => {
      let url = '/api/v1/account-lock/status';
      const params = new URLSearchParams();
      
      if (email) params.append('email', email);
      if (phoneNumber) params.append('phoneNumber', phoneNumber);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await client.get < ApiResponse < AccountLockStatus >> (url);
      return response.data.data;
    },
    
    /**
     * Get failed login attempts for current user
     */
    getFailedAttempts: async (): Promise < FailedAttemptsResponse > => {
      const response = await client.get < ApiResponse < FailedAttemptsResponse >> ('/api/v1/account-lock/failed-attempts');
      return response.data.data;
    },
    
    /**
     * Get failed attempts for specific user (admin only)
     */
    getUserFailedAttempts: async (userId: string): Promise < FailedAttemptsResponse > => {
      const response = await client.get < ApiResponse < FailedAttemptsResponse >> (`/api/v1/account-lock/failed-attempts/${userId}`);
      return response.data.data;
    },
    
    /**
     * Unlock account (self-service)
     */
    unlockAccount: async (data: UnlockAccountRequest): Promise < UnlockAccountResponse > => {
      const response = await client.post < ApiResponse < UnlockAccountResponse >> ('/api/v1/account-lock/unlock', data);
      return response.data.data;
    },
    
    /**
     * Unlock account by admin
     */
    adminUnlockAccount: async (
      userId: string,
      reason: string,
      adminId: string
    ): Promise < UnlockAccountResponse > => {
      const response = await client.post < ApiResponse < UnlockAccountResponse >> (
        '/api/v1/account-lock/admin/unlock', { userId, reason, adminId }
      );
      return response.data.data;
    },
    
    /**
     * Lock account (admin only)
     */
    lockAccount: async (data: LockAccountRequest): Promise < LockAccountResponse > => {
      const response = await client.post < ApiResponse < LockAccountResponse >> ('/api/v1/account-lock/admin/lock', data);
      return response.data.data;
    },
    
    /**
     * Get lock history for current user
     */
    getMyLockHistory: async (limit ? : number, offset ? : number): Promise < LockHistoryResponse > => {
      let url = '/api/v1/account-lock/history';
      const params = new URLSearchParams();
      
      if (limit) params.append('limit', limit.toString());
      if (offset) params.append('offset', offset.toString());
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await client.get < ApiResponse < LockHistoryResponse >> (url);
      return response.data.data;
    },
    
    /**
     * Get lock history for specific user (admin only)
     */
    getLockHistory: async (
      userId: string,
      limit ? : number,
      offset ? : number
    ): Promise < LockHistoryResponse > => {
      let url = `/api/v1/account-lock/history/${userId}`;
      const params = new URLSearchParams();
      
      if (limit) params.append('limit', limit.toString());
      if (offset) params.append('offset', offset.toString());
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await client.get < ApiResponse < LockHistoryResponse >> (url);
      return response.data.data;
    },
    
    /**
     * Get account lock statistics (admin only)
     */
    getLockStats: async (): Promise < AccountLockStats > => {
      const response = await client.get < ApiResponse < AccountLockStats >> ('/api/v1/account-lock/stats');
      return response.data.data;
    },
    
    /**
     * Clear failed attempts for user (admin only)
     */
    clearFailedAttempts: async (userId: string, adminId: string): Promise < { success: boolean } > => {
      const response = await client.post < ApiResponse < { success: boolean } >> (
        '/api/v1/account-lock/clear-failed-attempts', { userId, adminId }
      );
      return response.data.data;
    },
  };
};

export type AccountLockEndpoints = ReturnType < typeof createAccountLockEndpoints > ;
