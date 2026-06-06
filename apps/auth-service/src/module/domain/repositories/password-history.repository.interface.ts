/**
 * Password History Repository Interface - Pure Domain Contract (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/repositories/password-history.repository.interface
 * 
 * @description
 * Repository interface for PasswordHistory entity persistence.
 * Tracks password changes for security, prevents password reuse,
 * and enforces password expiry policies.
 * 
 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ Password health scoring (0-100) with trend analysis
 * ✅ Expiry notification tracking with acknowledgment
 * ✅ Batch import for legacy system migration
 * ✅ Breach detection integration (HaveIBeenPwned)
 * ✅ Password strength trend analysis
 * ✅ User segmentation for expiry campaigns
 * ✅ Real-time password change monitoring
 * ✅ Anomaly detection for unusual patterns
 * ✅ Compliance reporting (Bangladesh Bank)
 * ✅ Export for security audit
 * 
 * Enterprise Rules:
 * ✅ ONLY interface definitions - NO implementation
 * ✅ Extends BaseRepository for consistency
 * ✅ Pagination support for large datasets
 * ✅ Bulk operations for performance
 * ✅ Framework-free, infrastructure-agnostic
 */

import { 
  BaseRepository, 
  PaginationOptions, 
  PaginatedResult 
} from './base.repository.interface';
import { PasswordHistory, PasswordChangeContext, PasswordChangeMetadata } from '../entities/password-history.entity';

// ==================== Types ====================

/**
 * Password history statistics (Enhanced)
 */
export interface PasswordHistoryStatistics {
  totalChanges: number;
  uniquePasswords: number;
  firstChangeDate: Date | null;
  lastChangeDate: Date | null;
  averageDaysBetweenChanges: number;
  changesByYear: Record<number, number>;
  changesByMonth: Record<string, number>;
  changesByContext: Record<PasswordChangeContext, number>;
  breachRelatedChanges: number;
  expiryRelatedChanges: number;
  /** ✅ Enterprise: Average password strength over time */
  averageStrengthTrend: Array<{ date: string; score: number }>;
  /** ✅ Enterprise: Reuse rate (how often users reuse passwords) */
  reuseRate: number;
  /** ✅ Enterprise: Compliance status */
  complianceStatus: {
    compliant: boolean;
    issues: string[];
    lastAuditDate?: Date;
  };
}

/**
 * Password reuse check result (Enhanced)
 */
export interface PasswordReuseResult {
  reused: boolean;
  matchedHistoryId?: string;
  matchedAt?: Date;
  position?: number;  // Which previous password matched (1 = most recent)
  /** ✅ Enterprise: Days since the matched password was used */
  daysSinceMatched?: number;
  /** ✅ Enterprise: Similarity score (0-100) if not exact match */
  similarityScore?: number;
}

/**
 * Password expiry status (Enhanced)
 */
export interface PasswordExpiryStatus {
  isExpired: boolean;
  lastChangedAt?: Date;
  daysSinceLastChange: number;
  daysUntilExpiry: number;
  expiryDate?: Date;
  /** ✅ Enterprise: Grace period remaining (days) */
  gracePeriodRemaining?: number;
  /** ✅ Enterprise: Is in grace period */
  isInGracePeriod?: boolean;
}

/**
 * Password change recommendation (Enhanced)
 */
export interface PasswordChangeRecommendation {
  shouldChange: boolean;
  reason: 'expired' | 'reused' | 'breach' | 'policy' | 'weak' | 'none';
  urgency: 'high' | 'medium' | 'low';
  recommendedDate?: Date;
  message?: string;
  messageBn?: string;
  /** ✅ Enterprise: Recommended new password strength */
  recommendedStrength?: 'medium' | 'strong' | 'very_strong';
  /** ✅ Enterprise: Days until force change */
  daysUntilForceChange?: number;
}

/**
 * Password health score result (✅ Enterprise)
 */
export interface PasswordHealthScore {
  userId: string;
  score: number;  // 0-100
  level: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  factors: {
    ageDays: { score: number; weight: number; description: string };      // newer = better
    reuseCount: { score: number; weight: number; description: string };   // fewer = better
    breachExposure: { score: number; weight: number; description: string };
    complexity: { score: number; weight: number; description: string };
    changeFrequency: { score: number; weight: number; description: string };
  };
  trend: 'improving' | 'stable' | 'declining';
  recommendations: string[];
  lastCalculatedAt: Date;
  requiresAction: boolean;
}

/**
 * Expiry notification tracking (✅ Enterprise)
 */
export interface ExpiryNotification {
  id: string;
  userId: string;
  sentAt: Date;
  daysBeforeExpiry: number;
  channel: 'email' | 'sms' | 'push' | 'whatsapp';
  acknowledged: boolean;
  acknowledgedAt?: Date;
  actionTaken: 'changed' | 'dismissed' | 'ignored';
  notificationType: 'warning' | 'critical' | 'expired';
}

/**
 * Batch import result (✅ Enterprise)
 */
export interface BatchImportResult {
  totalProcessed: number;
  successful: number;
  failed: number;
  skipped: number;
  errors: Array<{ index: number; userId: string; error: string }>;
  importId: string;
  durationMs: number;
}

/**
 * Breach detection result (✅ Enterprise)
 */
export interface BreachDetectionResult {
  isCompromised: boolean;
  breachCount: number;
  breachSources: string[];
  firstBreachDate?: Date;
  lastBreachDate?: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
}

/**
 * Password strength trend (✅ Enterprise)
 */
export interface PasswordStrengthTrend {
  userId: string;
  history: Array<{
    changedAt: Date;
    strengthScore: number;
    strengthLevel: string;
    context: PasswordChangeContext;
  }>;
  averageScore: number;
  improvement: number;  // Positive = getting stronger
  consistencyScore: number;  // 0-100
}

/**
 * User segment for expiry campaigns (✅ Enterprise)
 */
export interface UserExpirySegment {
  segmentName: string;
  userIds: string[];
  criteria: {
    daysUntilExpiryMin: number;
    daysUntilExpiryMax: number;
    userTiers?: string[];
    districts?: string[];
    lastActiveDays?: number;
  };
  count: number;
  priority: 'high' | 'medium' | 'low';
  recommendedChannel: 'email' | 'sms' | 'push' | 'whatsapp';
}

/**
 * Password change anomaly (✅ Enterprise)
 */
export interface PasswordChangeAnomaly {
  hasAnomaly: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  anomalyType: 'rapid_change' | 'unusual_time' | 'unusual_location' | 'unusual_device' | 'mass_change';
  description: string;
  affectedUsers: string[];
  detectedAt: Date;
  recommendations: string[];
}

/**
 * Password history filters (Enhanced)
 */
export interface PasswordHistoryFilters {
  userId?: string;
  startDate?: Date;
  endDate?: Date;
  changedBy?: PasswordChangeContext;
  minStrength?: string;
  ipAddress?: string;
  deviceId?: string;
  isBreachChange?: boolean;
  isExpiryChange?: boolean;
  /** ✅ Enterprise: Filter by health score range */
  healthScoreMin?: number;
  healthScoreMax?: number;
  /** ✅ Enterprise: Filter by district (Bangladesh) */
  district?: string;
  /** ✅ Enterprise: Filter by user tier */
  userTier?: string;
}

/**
 * Bulk delete result (Enhanced)
 */
export interface BulkDeleteResult {
  deletedCount: number;
  failedCount: number;
  errors: Array<{ id: string; error: string }>;
  /** ✅ Enterprise: Duration in milliseconds */
  durationMs: number;
}

/**
 * Compliance report (✅ Enterprise - Bangladesh Bank)
 */
export interface ComplianceReport {
  reportId: string;
  generatedAt: Date;
  period: { from: Date; to: Date };
  summary: {
    totalUsers: number;
    compliantUsers: number;
    nonCompliantUsers: number;
    complianceRate: number;
    averagePasswordAgeDays: number;
    reuseRate: number;
    breachExposedUsers: number;
  };
  byDistrict: Array<{ district: string; compliantCount: number; totalCount: number; rate: number }>;
  byUserTier: Array<{ tier: string; compliantCount: number; totalCount: number; rate: number }>;
  nonCompliantUsers: Array<{
    userId: string;
    email: string;
    daysSinceLastChange: number;
    riskLevel: string;
    recommendation: string;
  }>;
  recommendations: string[];
  exportUrl: string;
}

/**
 * Audit export result (✅ Enterprise)
 */
export interface AuditExportResult {
  exportId: string;
  generatedAt: Date;
  recordCount: number;
  format: 'json' | 'csv' | 'xlsx';
  downloadUrl: string;
  expiresAt: Date;
}

// ==================== Repository Interface ====================

/**
 * Password History Repository Interface (Enterprise Enhanced)
 * 
 * Manages password change history for security compliance
 */
export interface PasswordHistoryRepository extends BaseRepository<PasswordHistory> {
  // ========== Find Operations ==========
  
  /**
   * Find all password history entries for a user
   * @param userId - User ID
   * @returns Array of password history entries
   */
  findByUserId(userId: string): Promise<PasswordHistory[]>;
  
  /**
   * Find password history entries for a user with pagination
   * @param userId - User ID
   * @param options - Pagination options
   * @returns Paginated password history entries
   */
  findByUserIdPaginated(
    userId: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordHistory>>;
  
  /**
   * Find recent password history entries for a user (limited by count)
   * @param userId - User ID
   * @param limit - Maximum number of entries to return
   * @returns Array of recent password history entries
   */
  findRecentByUserId(userId: string, limit: number): Promise<PasswordHistory[]>;
  
  /**
   * Find password history entries within a time window
   * @param userId - User ID
   * @param startDate - Start date
   * @param endDate - End date
   * @returns Array of password history entries
   */
  findByUserIdAndTimeRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<PasswordHistory[]>;
  
  /**
   * Find password history entries by filters
   * @param filters - Query filters
   * @param options - Pagination options
   * @returns Paginated password history entries
   */
  findByFilters(
    filters: PasswordHistoryFilters,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordHistory>>;
  
  /**
   * Find password changes by context (e.g., 'user', 'admin', 'reset')
   * @param userId - User ID
   * @param changedBy - Who initiated the change
   * @returns Array of password history entries
   */
  findByChangeContext(
    userId: string,
    changedBy: PasswordChangeContext
  ): Promise<PasswordHistory[]>;
  
  /**
   * Find password changes by IP address (security monitoring)
   * @param ipAddress - IP address
   * @param options - Pagination options
   * @returns Paginated password history entries
   */
  findByIpAddress(
    ipAddress: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordHistory>>;
  
  /**
   * Find password changes by device ID (security monitoring)
   * @param deviceId - Device ID
   * @param options - Pagination options
   * @returns Paginated password history entries
   */
  findByDeviceId(
    deviceId: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordHistory>>;
  
  // ========== Single Entry Operations ==========
  
  /**
   * Get the last password history entry for a user
   * @param userId - User ID
   * @returns Last password history entry or null
   */
  getLastEntry(userId: string): Promise<PasswordHistory | null>;
  
  /**
   * Get the first password history entry for a user
   * @param userId - User ID
   * @returns First password history entry or null
   */
  getFirstEntry(userId: string): Promise<PasswordHistory | null>;
  
  /**
   * Get password history entry by user ID and password hash
   * @param userId - User ID
   * @param passwordHash - Hashed password
   * @returns Password history entry or null
   */
  findByUserIdAndHash(userId: string, passwordHash: string): Promise<PasswordHistory | null>;
  
  // ========== Save Operations ==========
  
  /**
   * Save password history entry (create or update)
   * @param history - Password history entity
   * @returns void
   */
  save(history: PasswordHistory): Promise<void>;
  
  /**
   * Save multiple password history entries (batch)
   * @param histories - Array of password history entities
   * @returns void
   */
  saveMany(histories: PasswordHistory[]): Promise<void>;
  
  // ========== Delete Operations ==========
  
  /**
   * Delete password history entry by ID
   * @param id - Entry ID
   * @returns void
   */
  delete(id: string): Promise<void>;
  
  /**
   * Delete all password history entries for a user
   * @param userId - User ID
   * @returns void
   */
  deleteByUserId(userId: string): Promise<void>;
  
  /**
   * Delete old password history entries (older than specified days)
   * @param daysToKeep - Number of days to keep (default 365)
   * @returns Number of deleted entries
   */
  deleteOldEntries(daysToKeep: number): Promise<number>;
  
  /**
   * Delete entries by IDs
   * @param ids - Array of entry IDs
   * @returns Bulk delete result
   */
  deleteByIds(ids: string[]): Promise<BulkDeleteResult>;
  
  // ========== Password Reuse Prevention ==========
  
  /**
   * Check if a password hash was used before (prevent reuse)
   * @param userId - User ID
   * @param hashedPassword - Hashed password to check
   * @param checkCount - Number of previous passwords to check (default 5)
   * @returns True if password was used before
   */
  wasPasswordUsedBefore(
    userId: string,
    hashedPassword: string,
    checkCount?: number
  ): Promise<PasswordReuseResult>;
  
  /**
   * Get previous N passwords for a user
   * @param userId - User ID
   * @param count - Number of previous passwords to retrieve
   * @returns Array of previous password hashes
   */
  getPreviousPasswords(userId: string, count: number): Promise<string[]>;
  
  /**
   * Get all password hashes for a user
   * @param userId - User ID
   * @returns Array of all password hashes
   */
  getAllPasswordHashes(userId: string): Promise<string[]>;
  
  // ========== Password Expiry ==========
  
  /**
   * Get last password change date for a user
   * @param userId - User ID
   * @returns Last password change date or null
   */
  getLastPasswordChangeDate(userId: string): Promise<Date | null>;
  
  /**
   * Check if password age exceeds maximum allowed days
   * @param userId - User ID
   * @param maxAgeDays - Maximum allowed password age in days
   * @returns True if password is expired
   */
  isPasswordExpired(userId: string, maxAgeDays: number): Promise<boolean>;
  
  /**
   * Get password expiry status for a user
   * @param userId - User ID
   * @param maxAgeDays - Maximum allowed password age in days
   * @param gracePeriodDays - Grace period days after expiry (default 7)
   * @returns Password expiry status
   */
  getPasswordExpiryStatus(
    userId: string, 
    maxAgeDays: number,
    gracePeriodDays?: number
  ): Promise<PasswordExpiryStatus>;
  
  /**
   * Get password change recommendation for a user
   * @param userId - User ID
   * @param maxAgeDays - Maximum allowed password age in days
   * @param checkBreach - Whether to check breach database
   * @returns Password change recommendation
   */
  getChangeRecommendation(
    userId: string,
    maxAgeDays: number,
    checkBreach?: boolean
  ): Promise<PasswordChangeRecommendation>;
  
  // ========== ✅ Enterprise: Password Health Score ==========
  
  /**
   * Get password health score for a user (0-100)
   * @param userId - User ID
   * @returns Password health score
   */
  getPasswordHealthScore(userId: string): Promise<PasswordHealthScore>;
  
  /**
   * Batch get password health scores for multiple users
   * @param userIds - Array of user IDs
   * @returns Map of user ID to health score
   */
  batchGetHealthScores(userIds: string[]): Promise<Map<string, PasswordHealthScore>>;
  
  /**
   * Get users with poor password health (score below threshold)
   * @param threshold - Health score threshold (default 50)
   * @param options - Pagination options
   * @returns Paginated users with poor health
   */
  getUsersWithPoorPasswordHealth(
    threshold?: number,
    options?: PaginationOptions
  ): Promise<PaginatedResult<{ userId: string; healthScore: PasswordHealthScore }>>;
  
  /**
   * Refresh password health scores for all users (batch)
   * @param options - Batch options
   * @returns Number of updated users
   */
  refreshAllHealthScores(options?: { batchSize?: number }): Promise<number>;
  
  // ========== ✅ Enterprise: Expiry Notification Tracking ==========
  
  /**
   * Record expiry notification sent to user
   * @param notification - Notification record
   * @returns Notification ID
   */
  recordExpiryNotification(notification: Omit<ExpiryNotification, 'id'>): Promise<string>;
  
  /**
   * Get expiry notifications for a user
   * @param userId - User ID
   * @param limit - Maximum number of notifications
   * @returns Array of notifications
   */
  getExpiryNotifications(userId: string, limit?: number): Promise<ExpiryNotification[]>;
  
  /**
   * Mark notification as acknowledged
   * @param notificationId - Notification ID
   * @returns void
   */
  acknowledgeNotification(notificationId: string): Promise<void>;
  
  /**
   * Get users who haven't acknowledged expiry warnings
   * @param daysBeforeExpiry - Days before expiry threshold
   * @returns Array of user IDs
   */
  getUsersWithUnacknowledgedWarnings(daysBeforeExpiry: number): Promise<string[]>;
  
  // ========== ✅ Enterprise: Batch Import (Legacy Migration) ==========
  
  /**
   * Batch import password history from legacy system
   * @param entries - Array of password history entries
   * @param options - Import options (skipDuplicates, batchSize)
   * @returns Import result
   */
  batchImportHistory(
    entries: Array<{
      userId: string;
      passwordHash: string;
      changedAt: Date;
      changedBy: PasswordChangeContext;
      metadata?: PasswordChangeMetadata;
    }>,
    options?: { skipDuplicates?: boolean; batchSize?: number; dryRun?: boolean }
  ): Promise<BatchImportResult>;
  
  // ========== ✅ Enterprise: Breach Detection ==========
  
  /**
   * Check if user's password has been exposed in data breaches
   * @param userId - User ID
   * @returns Breach detection result
   */
  checkBreachExposure(userId: string): Promise<BreachDetectionResult>;
  
  /**
   * Batch check breach exposure for multiple users
   * @param userIds - Array of user IDs
   * @returns Map of user ID to breach result
   */
  batchCheckBreachExposure(userIds: string[]): Promise<Map<string, BreachDetectionResult>>;
  
  /**
   * Get users with breached passwords (for force reset)
   * @param limit - Maximum number of users
   * @returns Array of user IDs with breached passwords
   */
  getUsersWithBreachedPasswords(limit?: number): Promise<string[]>;
  
  /**
   * Mark password as breached and require change
   * @param userId - User ID
   * @param breachSource - Source of breach information
   * @returns void
   */
  markPasswordAsBreached(userId: string, breachSource: string): Promise<void>;
  
  // ========== ✅ Enterprise: Password Strength Trend ==========
  
  /**
   * Get password strength trend for a user
   * @param userId - User ID
   * @returns Password strength trend analysis
   */
  getPasswordStrengthTrend(userId: string): Promise<PasswordStrengthTrend>;
  
  /**
   * Get overall password strength metrics across all users
   * @returns Strength metrics
   */
  getGlobalStrengthMetrics(): Promise<{
    averageStrength: number;
    strengthDistribution: Record<string, number>;
    improvementOverTime: Array<{ month: string; averageScore: number }>;
    topImprovers: Array<{ userId: string; improvement: number }>;
  }>;
  
  // ========== ✅ Enterprise: User Segmentation for Campaigns ==========
  
  /**
   * Get user segments for expiry campaigns
   * @param segments - Array of segment criteria
   * @returns Array of user segments
   */
  getUserExpirySegments(segments: UserExpirySegment[]): Promise<UserExpirySegment[]>;
  
  /**
   * Get users by expiry criteria (for batch notifications)
   * @param daysUntilExpiryMin - Minimum days until expiry
   * @param daysUntilExpiryMax - Maximum days until expiry
   * @param options - Pagination options
   * @returns Paginated users with expiry info
   */
  getUsersByExpiryRange(
    daysUntilExpiryMin: number,
    daysUntilExpiryMax: number,
    options?: PaginationOptions
  ): Promise<PaginatedResult<{
    userId: string;
    email: string;
    phone?: string;
    daysUntilExpiry: number;
    lastChangeDate: Date;
    preferredLanguage?: string;
  }>>;
  
  // ========== ✅ Enterprise: Anomaly Detection ==========
  
  /**
   * Detect password change anomalies
   * @param timeWindowHours - Time window for analysis (default 24)
   * @returns Anomaly detection result
   */
  detectPasswordChangeAnomalies(timeWindowHours?: number): Promise<PasswordChangeAnomaly>;
  
  /**
   * Detect rapid password changes for a specific user
   * @param userId - User ID
   * @param timeWindowHours - Time window for analysis
   * @returns True if rapid changes detected
   */
  detectRapidChanges(userId: string, timeWindowHours?: number): Promise<boolean>;
  
  // ========== Statistics Operations ==========
  
  /**
   * Get password change count for a user
   * @param userId - User ID
   * @returns Number of password changes
   */
  getPasswordChangeCount(userId: string): Promise<number>;
  
  /**
   * Count password changes in a time range
   * @param userId - User ID
   * @param startDate - Start date
   * @param endDate - End date
   * @returns Count of password changes
   */
  countByUserIdAndTimeRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<number>;
  
  /**
   * Count password changes by context
   * @param userId - User ID
   * @returns Count by context
   */
  countByContext(userId: string): Promise<Record<PasswordChangeContext, number>>;
  
  /**
   * Get unique password count for a user
   * @param userId - User ID
   * @returns Number of unique passwords
   */
  getUniquePasswordCount(userId: string): Promise<number>;
  
  /**
   * Get password history statistics for a user
   * @param userId - User ID
   * @returns Password history statistics
   */
  getStatistics(userId: string): Promise<PasswordHistoryStatistics>;
  
  /**
   * Get global password statistics (admin)
   * @returns Global statistics
   */
  getGlobalStatistics(): Promise<{
    totalUsersWithHistory: number;
    totalPasswordChanges: number;
    averageChangesPerUser: number;
    averagePasswordAgeDays: number;
    mostCommonChangeContext: PasswordChangeContext;
    breachForcedChanges: number;
    expiryForcedChanges: number;
    /** ✅ Enterprise: Additional metrics */
    averageHealthScore: number;
    usersNeedingAttention: number;
    complianceRate: number;
  }>;
  
  // ========== Admin Operations ==========
  
  /**
   * Find users who haven't changed password in N days
   * @param daysInactive - Number of days since last password change
   * @param options - Pagination options
   * @returns Paginated users with expired passwords
   */
  findUsersWithExpiredPasswords(
    daysInactive: number,
    options: PaginationOptions
  ): Promise<PaginatedResult<{ userId: string; lastChangeDate: Date; email?: string; phone?: string }>>;
  
  /**
   * Get password change frequency (for security monitoring)
   * @param days - Number of days to analyze
   * @returns Password change frequency data
   */
  getChangeFrequency(days: number): Promise<{
    daily: Array<{ date: string; count: number }>;
    weekly: Array<{ week: string; count: number }>;
    monthly: Array<{ month: string; count: number }>;
    byHour: Array<{ hour: number; count: number }>;
  }>;
  
  /**
   * Get recent password changes across all users (admin)
   * @param limit - Maximum number of entries
   * @returns Recent password changes
   */
  getRecentChanges(limit: number): Promise<PasswordHistory[]>;
  
  /**
   * Get password changes by date range
   * @param startDate - Start date
   * @param endDate - End date
   * @returns Password changes in date range
   */
  getChangesByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<PasswordHistory[]>;
  
  /**
   * Check if a user has any password history
   * @param userId - User ID
   * @returns True if user has password history
   */
  hasHistory(userId: string): Promise<boolean>;
  
  // ========== ✅ Enterprise: Compliance Reporting ==========
  
  /**
   * Generate compliance report (Bangladesh Bank guidelines)
   * @param fromDate - Start date
   * @param toDate - End date
   * @returns Compliance report
   */
  generateComplianceReport(fromDate: Date, toDate: Date): Promise<ComplianceReport>;
  
  /**
   * Get compliance status summary
   * @returns Compliance status
   */
  getComplianceStatus(): Promise<{
    compliant: boolean;
    issues: string[];
    recommendations: string[];
    lastComplianceCheck: Date;
    nextRequiredCheck: Date;
  }>;
  
  /**
   * Export password history for security audit
   * @param filters - Query filters
   * @param format - Export format ('json', 'csv', 'xlsx')
   * @returns Export result
   */
  exportForAudit(
    filters?: PasswordHistoryFilters,
    format?: 'json' | 'csv' | 'xlsx'
  ): Promise<AuditExportResult>;
  
  // ========== Archive Operations ==========
  
  /**
   * Archive old password history entries (move to archive table)
   * @param olderThanDays - Archive entries older than N days
   * @returns Number of archived entries
   */
  archiveOldEntries(olderThanDays: number): Promise<number>;
  
  /**
   * Restore archived password history entries
   * @param olderThanDays - Restore entries older than N days
   * @returns Number of restored entries
   */
  restoreArchivedEntries(olderThanDays: number): Promise<number>;
  
  /**
   * Purge archived entries permanently
   * @param olderThanDays - Purge entries older than N days
   * @returns Number of purged entries
   */
  purgeArchivedEntries(olderThanDays: number): Promise<number>;
}

// ============================================================
// Default Configuration
// ============================================================

/**
 * Default password policy configuration
 */
export const DEFAULT_PASSWORD_POLICY = {
  maxAgeDays: 90,           // 90 days expiry (Bangladesh Bank guideline)
  gracePeriodDays: 7,       // 7 days grace period after expiry
  preventReuseCount: 5,     // Prevent reuse of last 5 passwords
  minStrengthScore: 60,     // Minimum acceptable strength score (0-100)
  healthScoreThresholds: {
    excellent: 80,
    good: 60,
    fair: 40,
    poor: 20,
    critical: 0,
  },
};

// ============================================================
// Type Exports
// ============================================================

export type { 
  PasswordHistoryStatistics, 
  PasswordHistoryFilters,
  PasswordReuseResult,
  PasswordExpiryStatus,
  PasswordChangeRecommendation,
  BulkDeleteResult,
  // ✅ Enterprise: New type exports
  PasswordHealthScore,
  ExpiryNotification,
  BatchImportResult,
  BreachDetectionResult,
  PasswordStrengthTrend,
  UserExpirySegment,
  PasswordChangeAnomaly,
  ComplianceReport,
  AuditExportResult,
};

// ============================================================
// ENTERPRISE SUMMARY v2.0
// ============================================================
// 
// Enterprise Enhancements Applied:
// 1. ✅ Password health scoring (0-100) with 5-level classification
// 2. ✅ Expiry notification tracking with acknowledgment
// 3. ✅ Batch import for legacy system migration
// 4. ✅ Breach detection integration (HaveIBeenPwned)
// 5. ✅ Password strength trend analysis
// 6. ✅ User segmentation for expiry campaigns
// 7. ✅ Real-time password change anomaly detection
// 8. ✅ Compliance reporting (Bangladesh Bank guidelines)
// 9. ✅ Audit export with multiple formats (JSON/CSV/XLSX)
// 10. ✅ Grace period support for password expiry
// 11. ✅ Similarity score for fuzzy password reuse detection
// 12. ✅ Health score batch refresh for all users
// 13. ✅ Multi-channel notification tracking (email/sms/push/whatsapp)
// 14. ✅ Breach severity scoring
// 15. ✅ Compliance rate tracking by district and user tier
// 
// Bangladesh Specific:
// - District-level compliance tracking
// - Bengali message support in recommendations
// - WhatsApp channel for expiry notifications
// - Bangladesh Bank 90-day expiry guideline
// 
// ============================================================
