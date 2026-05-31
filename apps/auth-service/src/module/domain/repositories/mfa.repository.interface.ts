/**
 * MFA Repository Interface - Pure Domain Contract
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/repositories/mfa.repository.interface
 * 
 * @description
 * Repository interface for MFA entity persistence.
 * Manages multi-factor authentication configuration, backup codes, and verification tracking.
 * 
 * Enterprise Rules:
 * ✅ ONLY interface definitions - NO implementation
 * ✅ Extends BaseRepository for consistency
 * ✅ Supports multiple MFA types per user
 * ✅ Backup code management
 * ✅ Verification attempt tracking
 * ✅ Framework-free, infrastructure-agnostic
 * ✅ Bangladesh specific - WhatsApp, Imo, bKash, Nagad, Rocket MFA support
 */

import { BaseRepository, PaginationOptions, PaginatedResult } from './base.repository.interface';
import { MFA, MFAType, MFAStatus } from '../entities/mfa.entity';

// ==================== Types ====================

/**
 * MFA status result
 */
export interface MFAStatusResult {
  isEnabled: boolean;
  isPending: boolean;
  isLocked: boolean;
  isRecoveryMode: boolean;
  type?: MFAType;
  verifiedAt?: Date;
  lastUsedAt?: Date;
  remainingAttempts: number;
  remainingLockTimeMinutes: number;
  hasBackupCodes: boolean;
  backupCodesRemaining: number;
  areBackupCodesLow: boolean;
}

/**
 * Backup codes result
 */
export interface BackupCodesResult {
  codes: string[];
  remainingCount: number;
  totalCount: number;
  isLow: boolean;
  regeneratedAt?: Date;
  expiresAt?: Date;
}

/**
 * MFA verification result
 */
export interface VerificationResult {
  success: boolean;
  remainingAttempts: number;
  isLocked: boolean;
  lockExpiresAt?: Date;
  error?: string;
  errorCode?: 'invalid_code' | 'max_attempts' | 'locked' | 'not_found';
}

/**
 * MFA statistics
 */
export interface MFAStatistics {
  totalUsers: number;
  mfaEnabledCount: number;
  mfaEnabledPercentage: number;
  mfaPendingCount: number;
  mfaLockedCount: number;
  byType: Record<MFAType, number>;
  byStatus: Record<MFAStatus, number>;
  adoptionRate: number;
  averageVerificationTimeMs: number;
  failedVerificationsLast24h: number;
  successfulVerificationsLast24h: number;
  // Bangladesh specific
  mfaByOperator?: Record<string, number>;
  mfaByDistrict?: Array<{ district: string; count: number }>;
}

/**
 * MFA query filters
 */
export interface MFAFilters {
  userId?: string;
  type?: MFAType;
  status?: MFAStatus;
  isEnabled?: boolean;
  isLocked?: boolean;
  hasBackupCodes?: boolean;
  fromDate?: Date;
  toDate?: Date;
  district?: string;
  mobileOperator?: string;
}

/**
 * Bulk disable result
 */
export interface BulkDisableResult {
  disabledCount: number;
  failedCount: number;
  errors: Array<{ id: string; error: string }>;
  disabledUserIds: string[];
}

/**
 * MFA method info
 */
export interface MFAMethodInfo {
  id: string;
  type: MFAType;
  identifier: string;
  isPrimary: boolean;
  isVerified: boolean;
  priority: number;
  createdAt: Date;
  lastUsedAt?: Date;
}

// ==================== Repository Interface ====================

/**
 * MFA Repository Interface
 * 
 * Manages multi-factor authentication configuration
 */
export interface MFARepository extends BaseRepository<MFA> {
  // ========== Find Operations ==========
  
  /**
   * Find MFA configuration by user ID
   * @param userId - User ID
   * @returns MFA entity or null if not exists
   */
  findByUserId(userId: string): Promise<MFA | null>;
  
  /**
   * Find MFA configuration by user ID and type
   * @param userId - User ID
   * @param type - MFA type
   * @returns MFA entity or null if not exists
   */
  findByUserIdAndType(userId: string, type: MFAType): Promise<MFA | null>;
  
  /**
   * Find all MFA configurations for a user (multiple types)
   * @param userId - User ID
   * @returns Array of MFA entities
   */
  findAllByUserId(userId: string): Promise<MFA[]>;
  
  /**
   * Find all MFA methods for a user with details
   * @param userId - User ID
   * @returns Array of MFA method info
   */
  findAllMethodsByUserId(userId: string): Promise<MFAMethodInfo[]>;
  
  /**
   * Find enabled MFA configurations
   * @param options - Pagination options
   * @returns Paginated enabled MFA configurations
   */
  findEnabledMFA(options: PaginationOptions): Promise<PaginatedResult<MFA>>;
  
  /**
   * Find pending MFA configurations (not yet verified)
   * @param options - Pagination options
   * @returns Paginated pending MFA configurations
   */
  findPendingMFA(options: PaginationOptions): Promise<PaginatedResult<MFA>>;
  
  /**
   * Find locked MFA configurations
   * @param options - Pagination options
   * @returns Paginated locked MFA configurations
   */
  findLockedMFA(options: PaginationOptions): Promise<PaginatedResult<MFA>>;
  
  /**
   * Find by MFA type
   * @param type - MFA type
   * @param options - Pagination options
   * @returns Paginated MFA configurations
   */
  findByType(type: MFAType, options: PaginationOptions): Promise<PaginatedResult<MFA>>;
  
  /**
   * Find expired MFA configurations (older than retention period)
   * @param retentionDays - Days to retain
   * @returns Array of expired MFA configurations
   */
  findExpiredMFA(retentionDays: number): Promise<MFA[]>;
  
  /**
   * Find MFA by filters
   * @param filters - Query filters
   * @param options - Pagination options
   * @returns Paginated results
   */
  findByFilters(
    filters: MFAFilters,
    options: PaginationOptions
  ): Promise<PaginatedResult<MFA>>;
  
  /**
   * Find primary MFA method for a user
   * @param userId - User ID
   * @returns Primary MFA method or null
   */
  findPrimaryMethod(userId: string): Promise<MFAMethodInfo | null>;
  
  // ========== Backup Code Operations ==========
  
  /**
   * Get backup codes for a user
   * @param userId - User ID
   * @returns Backup codes result
   */
  getBackupCodes(userId: string): Promise<BackupCodesResult>;
  
  /**
   * Regenerate backup codes for a user
   * @param userId - User ID
   * @param newCodes - New backup codes (hashed)
   * @returns Updated backup codes result
   */
  regenerateBackupCodes(userId: string, newCodes: string[]): Promise<BackupCodesResult>;
  
  /**
   * Validate and use a backup code
   * @param userId - User ID
   * @param code - Backup code to validate
   * @returns True if code is valid and used
   */
  validateAndUseBackupCode(userId: string, code: string): Promise<boolean>;
  
  /**
   * Get remaining backup codes count
   * @param userId - User ID
   * @returns Number of remaining backup codes
   */
  getRemainingBackupCodesCount(userId: string): Promise<number>;
  
  /**
   * Check if backup codes are low
   * @param userId - User ID
   * @returns True if backup codes are low (<= 3)
   */
  areBackupCodesLow(userId: string): Promise<boolean>;
  
  // ========== Status Operations ==========
  
  /**
   * Get MFA status for a user
   * @param userId - User ID
   * @returns MFA status result
   */
  getMFAStatus(userId: string): Promise<MFAStatusResult>;
  
  /**
   * Check if user has MFA enabled
   * @param userId - User ID
   * @returns True if MFA is enabled
   */
  hasMFAEnabled(userId: string): Promise<boolean>;
  
  /**
   * Check if user has specific MFA type enabled
   * @param userId - User ID
   * @param type - MFA type
   * @returns True if specified MFA type is enabled
   */
  hasMFAOfType(userId: string, type: MFAType): Promise<boolean>;
  
  /**
   * Check if user has any MFA configured
   * @param userId - User ID
   * @returns True if any MFA is configured
   */
  hasAnyMFAConfigured(userId: string): Promise<boolean>;
  
  /**
   * Check if MFA is locked for user
   * @param userId - User ID
   * @returns True if MFA is locked
   */
  isMFALocked(userId: string): Promise<boolean>;
  
  // ========== Verification Operations ==========
  
  /**
   * Record MFA verification attempt
   * @param userId - User ID
   * @param success - Whether verification succeeded
   * @returns Updated verification result
   */
  recordVerificationAttempt(userId: string, success: boolean): Promise<VerificationResult>;
  
  /**
   * Get failed verification attempts for user
   * @param userId - User ID
   * @returns Number of failed attempts
   */
  getFailedAttempts(userId: string): Promise<number>;
  
  /**
   * Reset verification attempts for user
   * @param userId - User ID
   * @returns void
   */
  resetVerificationAttempts(userId: string): Promise<void>;
  
  /**
   * Get last successful verification time
   * @param userId - User ID
   * @returns Last verification time or null
   */
  getLastVerificationTime(userId: string): Promise<Date | null>;
  
  // ========== Lock Operations ==========
  
  /**
   * Lock MFA for user (too many failed attempts)
   * @param userId - User ID
   * @param durationMinutes - Lock duration in minutes
   * @returns void
   */
  lockMFA(userId: string, durationMinutes: number): Promise<void>;
  
  /**
   * Unlock MFA for user
   * @param userId - User ID
   * @returns void
   */
  unlockMFA(userId: string): Promise<void>;
  
  /**
   * Get lock expiry time for user
   * @param userId - User ID
   * @returns Lock expiry time or null if not locked
   */
  getLockExpiry(userId: string): Promise<Date | null>;
  
  // ========== Statistics Operations ==========
  
  /**
   * Count users with MFA enabled
   * @returns Number of users with MFA enabled
   */
  countEnabledMFA(): Promise<number>;
  
  /**
   * Count users with MFA by type
   * @returns Count by type
   */
  countByType(): Promise<Record<MFAType, number>>;
  
  /**
   * Get MFA statistics
   * @returns MFA statistics
   */
  getMFAStatistics(): Promise<MFAStatistics>;
  
  /**
   * Get MFA distribution by type
   * @returns Distribution of MFA types
   */
  getMFAByTypeDistribution(): Promise<Record<MFAType, number>>;
  
  /**
   * Get adoption rate
   * @returns Adoption rate percentage (0-100)
   */
  getAdoptionRate(): Promise<number>;
  
  // ========== Bulk Operations ==========
  
  /**
   * Bulk disable MFA for users (security event)
   * @param userIds - Array of user IDs
   * @param reason - Reason for disabling
   * @returns Bulk disable result
   */
  bulkDisableMFA(userIds: string[], reason: string): Promise<BulkDisableResult>;
  
  /**
   * Disable all MFA for a user (emergency)
   * @param userId - User ID
   * @param reason - Reason for disabling
   * @returns void
   */
  emergencyDisableMFA(userId: string, reason: string): Promise<void>;
  
  /**
   * Batch update MFA status
   * @param updates - Map of MFA IDs to status
   * @returns void
   */
  batchUpdateStatus(updates: Map<string, MFAStatus>): Promise<void>;
  
  // ========== Cleanup Operations ==========
  
  /**
   * Clean up old unverified MFA configurations
   * @param retentionDays - Days to keep unverified MFA
   * @returns Number of deleted records
   */
  cleanupUnverifiedMFA(retentionDays: number): Promise<number>;
  
  /**
   * Clean up old verification attempts
   * @param retentionDays - Days to keep verification attempts
   * @returns Number of deleted records
   */
  cleanupOldVerificationAttempts(retentionDays: number): Promise<number>;
  
  // ========== Save Operations ==========
  
  /**
   * Save MFA and handle verification state
   * @param mfa - MFA entity
   * @returns void
   */
  saveWithVerificationState(mfa: MFA): Promise<void>;
  
  /**
   * Set primary MFA method for user
   * @param userId - User ID
   * @param methodId - Method ID to set as primary
   * @returns void
   */
  setPrimaryMethod(userId: string, methodId: string): Promise<void>;
  
  // ========== Audit Operations ==========
  
  /**
   * Get MFA audit log for user
   * @param userId - User ID
   * @param limit - Maximum number of entries
   * @returns Audit log entries
   */
  getMFAAuditLog(userId: string, limit?: number): Promise<Array<{
    id: string;
    action: 'enabled' | 'disabled' | 'verified' | 'failed' | 'locked' | 'unlocked';
    timestamp: Date;
    methodType?: MFAType;
    details?: string;
  }>>;
  
  /**
   * Export MFA data for audit
   * @param filters - Query filters
   * @returns Export data
   */
  exportMFAForAudit(filters: MFAFilters): Promise<MFA[]>;
}

// ============================================================
// Advanced Repository Interface
// ============================================================

/**
 * Advanced MFA Repository with analytics
 */
export interface AdvancedMFARepository extends MFARepository {
  /**
   * Get MFA adoption trend over time
   * @param days - Number of days to analyze
   * @returns Daily adoption data
   */
  getAdoptionTrend(days: number): Promise<Array<{ date: string; count: number; cumulative: number }>>;
  
  /**
   * Get verification success rate by MFA type
   * @returns Success rate by type
   */
  getVerificationSuccessRates(): Promise<Record<MFAType, number>>;
  
  /**
   * Get average verification time by MFA type
   * @returns Average verification time in milliseconds
   */
  getAverageVerificationTimes(): Promise<Record<MFAType, number>>;
  
  /**
   * Get MFA usage heatmap by hour
   * @returns Hourly usage data
   */
  getUsageHeatmap(): Promise<Array<{ hour: number; count: number }>>;
  
  /**
   * Get user preferences for MFA methods
   * @returns User preference distribution
   */
  getUserPreferences(): Promise<Array<{ method: MFAType; percentage: number }>>;
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  MFAStatusResult, 
  BackupCodesResult, 
  VerificationResult, 
  MFAStatistics, 
  MFAFilters,
  BulkDisableResult,
  MFAMethodInfo
};
