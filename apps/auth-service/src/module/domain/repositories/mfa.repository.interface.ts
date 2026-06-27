/**
 * MFA Repository Interface - Pure Domain Contract (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/repositories/mfa.repository.interface
 * 
 * @description
 * Repository interface for MFA entity persistence.
 * Manages multi-factor authentication configuration, backup codes, and verification tracking.
 * 
 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ MFA recovery email/SMS/WhatsApp templates
 * ✅ Per-method validation rules configuration
 * ✅ Geo-IP based MFA method suggestion
 * ✅ Risk-based adaptive MFA
 * ✅ MFA method compatibility matrix
 * ✅ Backup code regeneration reminder
 * ✅ Failed attempt anomaly detection
 * ✅ MFA method recommendation engine
 * ✅ Cross-device MFA sync support
 * ✅ Offline MFA code support (Bangladesh specific)
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
  /** ✅ Enterprise: Regeneration reminder needed */
  needsRegenerationReminder: boolean;
  /** ✅ Enterprise: Days until expiry */
  daysUntilExpiry?: number;
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
  /** ✅ Enterprise: Suggested alternative method */
  suggestedAlternative?: MFAType;
  /** ✅ Enterprise: Risk score for this attempt (0-100) */
  riskScore?: number;
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
  /** ✅ Enterprise: Offline MFA usage count */
  offlineMfaUsageCount: number;
  /** ✅ Enterprise: Average backup code usage per user */
  averageBackupCodeUsage: number;
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
  /** ✅ Enterprise: Filter by device compatibility */
  deviceCompatible?: boolean;
  /** ✅ Enterprise: Filter by offline support */
  offlineSupported?: boolean;
}

/**
 * Bulk disable result
 */
export interface BulkDisableResult {
  disabledCount: number;
  failedCount: number;
  errors: Array<{ id: string; error: string }>;
  disabledUserIds: string[];
  /** ✅ Enterprise: Notification sent status */
  notificationsSent: boolean;
  /** ✅ Enterprise: Affected users requiring re-enrollment */
  reenrollmentRequired: string[];
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
  /** ✅ Enterprise: Method-specific metadata */
  metadata?: MFAMethodMetadata;
}

/**
 * ✅ Enterprise: MFA method metadata
 */
export interface MFAMethodMetadata {
  /** Device info for WebAuthn */
  deviceName?: string;
  /** Phone number for SMS/WhatsApp */
  phoneNumber?: string;
  /** Email for email OTP */
  email?: string;
  /** Last IP used for this method */
  lastUsedIp?: string;
  /** Success rate for this method (0-100) */
  successRate?: number;
  /** Average verification time for this method (ms) */
  averageTimeMs?: number;
}

/**
 * ✅ Enterprise: MFA recovery configuration
 */
export interface MFARecoveryConfig {
  emailTemplate: string;
  smsTemplate: string;
  whatsappTemplate: string;
  backupCodeRegenerationLink: string;
  /** Recovery code expiry in days */
  recoveryCodeExpiryDays: number;
  /** Max recovery attempts allowed */
  maxRecoveryAttempts: number;
}

/**
 * ✅ Enterprise: Per-method validation rules
 */
export interface MFAMethodConfig {
  maxAttempts: number;
  lockoutMinutes: number;
  codeLength: number;
  expirySeconds: number;
  requiresInternet: boolean;
  requiresSmartphone: boolean;
  /** ✅ Enterprise: Requires active SIM (for SMS) */
  requiresActiveSim: boolean;
  /** ✅ Enterprise: Requires MFS account (for bKash/Nagad/Rocket) */
  requiresMfsAccount: boolean;
  /** ✅ Enterprise: Supports offline mode */
  supportsOffline: boolean;
  /** ✅ Enterprise: Priority in fallback chain */
  fallbackPriority: number;
  /** ✅ Enterprise: Minimum user tier required */
  minUserTier?: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
}

/**
 * ✅ Enterprise: MFA method compatibility matrix
 */
export interface MFAMethodCompatibility {
  method: MFAType;
  compatibleDevices: ('mobile' | 'desktop' | 'tablet' | 'feature_phone')[];
  requiresInternet: boolean;
  networkRecommendation: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'any';
  bangladeshSupport: 'full' | 'partial' | 'limited';
  popularityRank: number;  // 1 = most popular in BD
}

/**
 * ✅ Enterprise: Risk-based adaptive MFA request
 */
export interface AdaptiveMFARequest {
  userId: string;
  riskScore: number;  // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  context: {
    ipAddress: string;
    deviceId: string;
    userAgent: string;
    location?: string;
    timeOfDay: number;
    isNewDevice: boolean;
    isNewLocation: boolean;
    previousMfaMethod?: MFAType;
  };
  /** ✅ Enterprise: Recommended methods based on risk */
  recommendedMethods: MFAType[];
  /** ✅ Enterprise: Whether MFA can be skipped */
  canSkip: boolean;
  /** ✅ Enterprise: Why MFA is required (if not skippable) */
  requirementReason?: string;
}

/**
 * ✅ Enterprise: MFA method recommendation result
 */
export interface MFAMethodRecommendation {
  recommendedMethod: MFAType;
  alternatives: MFAType[];
  reasons: string[];
  confidenceScore: number;  // 0-100
  userPreferenceMatched: boolean;
  deviceCompatible: boolean;
}

/**
 * ✅ Enterprise: Offline MFA code
 */
export interface OfflineMFACode {
  code: string;
  generatedAt: Date;
  expiresAt: Date;
  used: boolean;
  usedAt?: Date;
  sessionId?: string;
}

/**
 * ✅ Enterprise: Failed attempt anomaly detection result
 */
export interface FailedAttemptAnomaly {
  isAnomaly: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  reason: string;
  patternType: 'rapid' | 'ip_change' | 'device_change' | 'location_change' | 'time_anomaly';
  recommendations: string[];
  requiresAdminReview: boolean;
}

/**
 * ✅ Enterprise: Cross-device MFA sync request
 */
export interface CrossDeviceMFASyncRequest {
  userId: string;
  sourceDeviceId: string;
  targetDeviceId: string;
  mfaMethodId: string;
  syncToken: string;
  expiresAt: Date;
}

// ==================== Repository Interface ====================

/**
 * MFA Repository Interface (Enterprise Enhanced)
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
  
  /**
   * ✅ Enterprise: Send backup code regeneration reminder
   * @param userId - User ID
   * @returns True if reminder was sent
   */
  sendBackupCodeRegenerationReminder(userId: string): Promise<boolean>;
  
  /**
   * ✅ Enterprise: Get users who need backup code regeneration
   * @param thresholdDays - Days threshold for warning
   * @returns Array of user IDs
   */
  getUsersNeedingBackupCodeRegeneration(thresholdDays: number): Promise<string[]>;
  
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
  
  /**
   * ✅ Enterprise: Detect anomaly in failed attempts
   * @param userId - User ID
   * @returns Anomaly detection result
   */
  detectFailedAttemptAnomaly(userId: string): Promise<FailedAttemptAnomaly>;
  
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
  
  // ========== ✅ Enterprise: Risk-Based Adaptive MFA ==========
  
  /**
   * Get adaptive MFA requirement based on risk score
   * @param request - Adaptive MFA request with context
   * @returns Adaptive MFA recommendation
   */
  getAdaptiveMFARequirement(request: AdaptiveMFARequest): Promise<AdaptiveMFARequest>;
  
  /**
   * Calculate risk score for a login attempt
   * @param userId - User ID
   * @param context - Request context
   * @returns Risk score (0-100)
   */
  calculateRiskScore(
    userId: string, 
    context: { ipAddress: string; deviceId: string; userAgent: string; location?: string }
  ): Promise<number>;
  
  // ========== ✅ Enterprise: MFA Method Recommendation ==========
  
  /**
   * Recommend best MFA method for user
   * @param userId - User ID
   * @param userPreferences - Optional user preferences
   * @returns Method recommendation
   */
  recommendMFAMethod(
    userId: string,
    userPreferences?: { preferredMethods?: MFAType[]; deviceType?: string }
  ): Promise<MFAMethodRecommendation>;
  
  /**
   * Get MFA method compatibility for device
   * @param method - MFA method
   * @param deviceType - Device type
   * @returns Compatibility result
   */
  getMethodCompatibility(method: MFAType, deviceType: string): Promise<MFAMethodCompatibility>;
  
  /**
   * Get all MFA method compatibilities
   * @returns Array of method compatibilities
   */
  getAllMethodCompatibilities(): Promise<MFAMethodCompatibility[]>;
  
  // ========== ✅ Enterprise: Offline MFA Support ==========
  
  /**
   * Generate offline MFA code for user
   * @param userId - User ID
   * @param expiryMinutes - Code expiry in minutes
   * @returns Offline MFA code
   */
  generateOfflineMFACode(userId: string, expiryMinutes?: number): Promise<OfflineMFACode>;
  
  /**
   * Verify offline MFA code
   * @param userId - User ID
   * @param code - Offline code to verify
   * @returns True if code is valid
   */
  verifyOfflineMFACode(userId: string, code: string): Promise<boolean>;
  
  /**
   * Get unused offline MFA codes for user
   * @param userId - User ID
   * @returns Array of unused offline codes
   */
  getUnusedOfflineCodes(userId: string): Promise<OfflineMFACode[]>;
  
  // ========== ✅ Enterprise: Cross-Device MFA Sync ==========
  
  /**
   * Create cross-device MFA sync request
   * @param request - Sync request data
   * @returns Sync request ID
   */
  createCrossDeviceSyncRequest(request: CrossDeviceMFASyncRequest): Promise<string>;
  
  /**
   * Approve cross-device MFA sync
   * @param requestId - Sync request ID
   * @param approvedBy - User ID approving the sync
   * @returns True if approved successfully
   */
  approveCrossDeviceSync(requestId: string, approvedBy: string): Promise<boolean>;
  
  /**
   * Get pending cross-device sync requests for user
   * @param userId - User ID
   * @returns Array of pending sync requests
   */
  getPendingSyncRequests(userId: string): Promise<CrossDeviceMFASyncRequest[]>;
  
  // ========== ✅ Enterprise: MFA Recovery Configuration ==========
  
  /**
   * Get MFA recovery configuration
   * @returns Recovery configuration
   */
  getRecoveryConfig(): Promise<MFARecoveryConfig>;
  
  /**
   * Update MFA recovery configuration
   * @param config - New recovery configuration
   * @returns Updated configuration
   */
  updateRecoveryConfig(config: Partial<MFARecoveryConfig>): Promise<MFARecoveryConfig>;
  
  /**
   * Send recovery notification to user
   * @param userId - User ID
   * @param method - Notification method (email/sms/whatsapp)
   * @param recoveryLink - Recovery link or code
   * @returns True if sent successfully
   */
  sendRecoveryNotification(userId: string, method: 'email' | 'sms' | 'whatsapp', recoveryLink: string): Promise<boolean>;
  
  // ========== ✅ Enterprise: Per-Method Configuration ==========
  
  /**
   * Get MFA method configuration
   * @param type - MFA method type
   * @returns Method configuration
   */
  getMethodConfig(type: MFAType): Promise<MFAMethodConfig>;
  
  /**
   * Get all MFA method configurations
   * @returns Record of method configurations
   */
  getAllMethodConfigs(): Promise<Record<MFAType, MFAMethodConfig>>;
  
  /**
   * Update MFA method configuration
   * @param type - MFA method type
   * @param config - Updated configuration
   * @returns Updated configuration
   */
  updateMethodConfig(type: MFAType, config: Partial<MFAMethodConfig>): Promise<MFAMethodConfig>;
  
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
  
  /**
   * ✅ Enterprise: Clean up expired offline MFA codes
   * @returns Number of cleaned codes
   */
  cleanupExpiredOfflineCodes(): Promise<number>;
  
  /**
   * ✅ Enterprise: Clean up expired cross-device sync requests
   * @returns Number of cleaned requests
   */
  cleanupExpiredSyncRequests(): Promise<number>;
  
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
    action: 'enabled' | 'disabled' | 'verified' | 'failed' | 'locked' | 'unlocked' | 'recovery_used' | 'method_changed';
    timestamp: Date;
    methodType?: MFAType;
    details?: string;
    ipAddress?: string;
    userAgent?: string;
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
 * Advanced MFA Repository with analytics and ML capabilities
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
  
  /**
   * ✅ Enterprise: Predict MFA method adoption for new users
   * @param userSegment - User segment (e.g., 'mobile', 'desktop', 'feature_phone')
   * @returns Predicted adoption by method
   */
  predictMethodAdoption(userSegment: string): Promise<Record<MFAType, number>>;
  
  /**
   * ✅ Enterprise: Get MFA method churn rate
   * @param type - MFA method type
   * @returns Churn rate percentage
   */
  getMethodChurnRate(type: MFAType): Promise<number>;
  
  /**
   * ✅ Enterprise: Get MFA conversion funnel
   * @returns Funnel data (viewed → started → completed → active)
   */
  getConversionFunnel(): Promise<{
    viewed: number;
    started: number;
    completed: number;
    active: number;
    dropoffRates: Record<string, number>;
  }>;
}


// ============================================================
// ENTERPRISE SUMMARY v2.0
// ============================================================
// 
// Enterprise Enhancements Applied:
// 1. ✅ MFA recovery email/SMS/WhatsApp templates
// 2. ✅ Per-method validation rules configuration
// 3. ✅ Geo-IP based MFA method suggestion
// 4. ✅ Risk-based adaptive MFA with context awareness
// 5. ✅ MFA method compatibility matrix
// 6. ✅ Backup code regeneration reminder system
// 7. ✅ Failed attempt anomaly detection
// 8. ✅ MFA method recommendation engine
// 9. ✅ Cross-device MFA sync support
// 10. ✅ Offline MFA code support (Bangladesh specific)
// 11. ✅ Predictive method adoption analytics
// 12. ✅ MFA conversion funnel tracking
// 13. ✅ Method churn rate analysis
// 14. ✅ Recovery notification system
// 15. ✅ Audit log with IP and user agent tracking
// 
// Bangladesh Specific:
// - WhatsApp template support for MFA recovery
// - Offline MFA codes for poor network areas
// - Feature phone compatible methods
// - bKash/Nagad/Rocket MFA method configurations
// - District-level MFA adoption analytics
// - Mobile operator tracking for SMS MFA
// 
// Security Note:
// - Actual codes/tokens stored in infrastructure (secure vault)
// - Domain only stores hashed values and metadata
// - No sensitive data in JSON serialization
// 
// ============================================================
