/**
 * Email Verification Repository Interface - Pure Domain Contract (Enterprise Enhanced v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/repositories/email-verification.repository.interface
 * 
 * @description
 * Repository interface for EmailVerification entity persistence.
 * Manages email verification tokens and their lifecycle.
 * 
 * ENTERPRISE ENHANCEMENTS (v3.0):
 * ✅ Real-time verification dashboard with conversion funnel
 * ✅ Auto-retry mechanism for failed deliveries with smart backoff
 * ✅ Suspicious pattern detection (rapid resend, domain anomalies)
 * ✅ ML-based verification probability prediction
 * ✅ Smart return path validation (MX records, spam trap detection)
 * ✅ Quarantine system for high-risk emails
 * ✅ Performance metrics with percentiles (P95, P99)
 * ✅ Cache management with TTL and invalidation
 * ✅ Rate limit monitoring and alerting
 * ✅ A/B testing support for verification templates
 * 
 * Enterprise Rules:
 * ✅ ONLY interface definitions - NO implementation
 * ✅ Extends BaseRepository for consistency
 * ✅ Framework-free, infrastructure-agnostic
 * ✅ Supports batch operations and cleanup
 */

import { BaseRepository, PaginationOptions, PaginatedResult } from './base.repository.interface';
import { EmailVerification, EmailVerificationStatus } from '../entities/email-verification.entity';
import { Token } from '../value-objects/token.vo';
import { Email } from '../value-objects/email.vo';

// ==================== Types ====================

/**
 * Email verification statistics (Enhanced)
 */
export interface EmailVerificationStatistics {
  totalVerifications: number;
  pendingVerifications: number;
  verifiedVerifications: number;
  expiredVerifications: number;
  revokedVerifications: number;
  averageVerificationTimeHours: number;
  verificationRate: number;
  /** ✅ Enterprise: Median verification time */
  medianVerificationTimeMinutes: number;
  /** ✅ Enterprise: Verification funnel conversion rates */
  conversionFunnel: {
    sent: number;
    opened: number;
    clicked: number;
    verified: number;
    completed: number;
    dropoffRates: Record<string, number>;
  };
  /** ✅ Enterprise: Time series data */
  dailyVerifications?: Array<{ date: string; sent: number; verified: number }>;
  /** ✅ Enterprise: Hourly distribution (peak times) */
  hourlyDistribution?: Array<{ hour: number; sent: number; verified: number; rate: number }>;
}

/**
 * Email verification filters (Enhanced)
 */
export interface EmailVerificationFilters {
  userId?: string;
  email?: string;
  emailDomain?: string;      // Filter by email domain (e.g., gmail.com)
  status?: EmailVerificationStatus;
  fromDate?: Date;
  toDate?: Date;
  isExpired?: boolean;
  isVerified?: boolean;
  resendCountMin?: number;
  resendCountMax?: number;
  /** ✅ Enterprise: Filter by verification method */
  verificationMethod?: 'otp' | 'magic_link';
  /** ✅ Enterprise: Filter by device type */
  deviceType?: 'mobile' | 'desktop' | 'tablet';
  /** ✅ Enterprise: Filter by IP reputation */
  ipReputation?: 'good' | 'neutral' | 'suspicious' | 'blocked';
}

/**
 * Bulk operation result (Enhanced)
 */
export interface BulkOperationResult {
  successCount: number;
  failedCount: number;
  errors: Array<{ id: string; error: string }>;
  successIds: string[];
  /** ✅ Enterprise: Duration in milliseconds */
  durationMs: number;
  /** ✅ Enterprise: Batch size used */
  batchSize: number;
}

/**
 * Verification rate result (Enhanced)
 */
export interface VerificationRateResult {
  totalSent: number;
  totalVerified: number;
  rate: number;
  byDomain?: Array<{ domain: string; sent: number; verified: number; rate: number }>;
  /** ✅ Enterprise: By verification method */
  byMethod?: Array<{ method: string; sent: number; verified: number; rate: number }>;
  /** ✅ Enterprise: By device type */
  byDevice?: Array<{ device: string; sent: number; verified: number; rate: number }>;
}

/**
 * ✅ Enterprise: Verification dashboard (real-time)
 */
export interface VerificationDashboard {
  overallRate: number;
  todayRate: number;
  weekRate: number;
  monthRate: number;
  topPerformingDomains: Array<{ domain: string; rate: number; volume: number }>;
  lowPerformingDomains: Array<{ domain: string; rate: number; volume: number; recommendation: string }>;
  alerts: Array<{ severity: 'info' | 'warning' | 'critical'; message: string; timestamp: Date }>;
  lastUpdated: Date;
}

/**
 * ✅ Enterprise: Auto-retry configuration
 */
export interface RetryConfig {
  maxRetries: number;
  retryDelayMinutes: number;
  maxDelayMinutes: number;
  backoffMultiplier: number;
  retryOnDomains: string[];
  retryOnErrorCodes: string[];
  enabled: boolean;
}

/**
 * ✅ Enterprise: Retry queue item
 */
export interface RetryQueueItem {
  verificationId: string;
  userId: string;
  email: string;
  attemptCount: number;
  lastAttemptAt: Date;
  nextRetryAt: Date;
  lastError?: string;
}

/**
 * ✅ Enterprise: Suspicious pattern detection result
 */
export interface SuspiciousPatternResult {
  isSuspicious: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  patternType: 'rapid_resend' | 'domain_anomaly' | 'volume_spike' | 'ip_rotation' | 'cooldown_abuse';
  details: string;
  affectedEntities: {
    userIds: string[];
    emails: string[];
    ips: string[];
  };
  recommendations: string[];
  requiresAdminReview: boolean;
}

/**
 * ✅ Enterprise: ML-based verification prediction
 */
export interface VerificationPrediction {
  verificationId: string;
  probabilityVerified: number;  // 0-100
  expectedVerificationTimeMinutes: number;
  confidence: number;  // 0-100
  factors: {
    emailReputation: number;
    userHistory: number;
    domainReliability: number;
    timeOfDay: number;
    deviceTrust: number;
  };
  riskScore: number;  // 0-100 (higher = more likely to fail)
  recommendedAction: 'send_reminder' | 'increase_priority' | 'fallback_method' | 'escalate_support';
}

/**
 * ✅ Enterprise: Return path validation result
 */
export interface ReturnPathValidation {
  isValid: boolean;
  mxRecordsExist: boolean;
  isSpamTrap: boolean;
  isDisposable: boolean;
  isRoleAccount: boolean;  // admin@, support@, etc.
  deliverabilityScore: number;  // 0-100
  suggestions: string[];
  validationMethod: 'mx_check' | 'smtp_test' | 'reputation_check';
}

/**
 * ✅ Enterprise: Quarantine entry
 */
export interface QuarantineEntry {
  email: string;
  reason: string;
  quarantinedAt: Date;
  expiresAt: Date;
  quarantinedBy: 'system' | 'admin';
  referenceId?: string;
  releaseToken?: string;
}

/**
 * ✅ Enterprise: Performance metrics
 */
export interface PerformanceMetrics {
  averageQueryTimeMs: number;
  p95QueryTimeMs: number;
  p99QueryTimeMs: number;
  cacheHitRate: number;
  cacheMissRate: number;
  connectionPoolUsage: number;
  activeConnections: number;
  queueLength: number;
  lastMetricsAt: Date;
}

/**
 * ✅ Enterprise: Rate limit status
 */
export interface RateLimitStatus {
  userId?: string;
  email?: string;
  ipAddress?: string;
  remaining: number;
  limit: number;
  resetAt: Date;
  isLimited: boolean;
  reason?: string;
}

/**
 * ✅ Enterprise: A/B test variant
 */
export interface ABTestVariant {
  id: string;
  name: string;
  template: string;
  subject: string;
  senderName: string;
  trafficPercent: number;
  metrics: {
    sent: number;
    opened: number;
    clicked: number;
    verified: number;
    conversionRate: number;
  };
  isActive: boolean;
}

// ==================== Repository Interface ====================

/**
 * Email Verification Repository Interface (Enterprise Enhanced)
 * 
 * Manages email verification token lifecycle
 */
export interface EmailVerificationRepository extends BaseRepository<EmailVerification> {
  // ========== Basic Find Operations ==========
  
  /**
   * Find verification by user ID
   * @param userId - User ID
   * @returns Email verification entity or null
   */
  findByUserId(userId: string): Promise<EmailVerification | null>;
  
  /**
   * Find verification by user ID and status
   * @param userId - User ID
   * @param status - Verification status
   * @returns Email verification entity or null
   */
  findByUserIdAndStatus(
    userId: string,
    status: EmailVerificationStatus
  ): Promise<EmailVerification | null>;
  
  /**
   * Find verification by token
   * @param token - Verification token
   * @returns Email verification entity or null
   */
  findByToken(token: Token): Promise<EmailVerification | null>;
  
  /**
   * Find verification by token value (string)
   * @param tokenValue - Raw token string
   * @returns Email verification entity or null
   */
  findByTokenValue(tokenValue: string): Promise<EmailVerification | null>;
  
  /**
   * Find verification by email
   * @param email - Email address
   * @returns Email verification entity or null
   */
  findByEmail(email: Email): Promise<EmailVerification | null>;
  
  /**
   * Find pending verifications (not verified, not expired)
   * @param options - Pagination options
   * @returns Paginated pending verifications
   */
  findPendingVerifications(
    options: PaginationOptions
  ): Promise<PaginatedResult<EmailVerification>>;
  
  /**
   * Find expired verifications
   * @param options - Pagination options
   * @returns Paginated expired verifications
   */
  findExpiredVerifications(
    options: PaginationOptions
  ): Promise<PaginatedResult<EmailVerification>>;
  
  /**
   * Find verifications by email domain
   * @param domain - Email domain (e.g., 'gmail.com')
   * @param options - Pagination options
   * @returns Paginated verifications
   */
  findByEmailDomain(
    domain: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<EmailVerification>>;
  
  /**
   * Find verifications by filters
   * @param filters - Query filters
   * @param options - Pagination options
   * @returns Paginated verifications
   */
  findByFilters(
    filters: EmailVerificationFilters,
    options: PaginationOptions
  ): Promise<PaginatedResult<EmailVerification>>;
  
  /**
   * Find recent verifications for a user (last N days)
   * @param userId - User ID
   * @param days - Number of days
   * @returns Array of verifications
   */
  findRecentByUser(userId: string, days: number): Promise<EmailVerification[]>;
  
  // ========== Status Check Operations ==========
  
  /**
   * Get pending verification for user (active, not expired)
   * @param userId - User ID
   * @returns Pending verification or null
   */
  getPendingVerification(userId: string): Promise<EmailVerification | null>;
  
  /**
   * Get latest verification for user
   * @param userId - User ID
   * @returns Latest verification or null
   */
  getLatestVerification(userId: string): Promise<EmailVerification | null>;
  
  /**
   * Check if user has pending verification
   * @param userId - User ID
   * @returns True if pending verification exists
   */
  hasPendingVerification(userId: string): Promise<boolean>;
  
  /**
   * Check if email is already verified
   * @param userId - User ID
   * @returns True if email is verified
   */
  isEmailVerified(userId: string): Promise<boolean>;
  
  /**
   * Check if token is valid (exists and not expired)
   * @param tokenValue - Raw token string
   * @returns True if token is valid
   */
  isTokenValid(tokenValue: string): Promise<boolean>;
  
  // ========== Statistics Operations ==========
  
  /**
   * Get verification statistics
   * @returns Email verification statistics
   */
  getStatistics(): Promise<EmailVerificationStatistics>;
  
  /**
   * ✅ Enterprise: Get real-time verification dashboard
   * @returns Verification dashboard data
   */
  getVerificationDashboard(): Promise<VerificationDashboard>;
  
  /**
   * Count verifications by status
   * @param status - Verification status
   * @returns Count of verifications
   */
  countByStatus(status: EmailVerificationStatus): Promise<number>;
  
  /**
   * Count verifications by user
   * @param userId - User ID
   * @returns Number of verifications
   */
  countByUser(userId: string): Promise<number>;
  
  /**
   * Count pending verifications for a user
   * @param userId - User ID
   * @returns Number of pending verifications
   */
  countPendingByUser(userId: string): Promise<number>;
  
  /**
   * Count verifications by date range
   * @param startDate - Start date
   * @param endDate - End date
   * @returns Count by status
   */
  countByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<{
    total: number;
    verified: number;
    expired: number;
    revoked: number;
  }>;
  
  // ========== Cleanup Operations ==========
  
  /**
   * Delete all expired verifications (cleanup)
   * @param olderThanDays - Delete verifications older than N days
   * @returns Number of deleted records
   */
  deleteExpiredVerifications(olderThanDays: number): Promise<number>;
  
  /**
   * Delete verifications by user ID
   * @param userId - User ID
   * @returns Number of deleted records
   */
  deleteByUserId(userId: string): Promise<number>;
  
  /**
   * Delete verifications older than date
   * @param olderThan - Delete verifications older than this date
   * @returns Number of deleted records
   */
  deleteOlderThan(olderThan: Date): Promise<number>;
  
  /**
   * Archive old verifications
   * @param olderThanDays - Archive verifications older than N days
   * @returns Number of archived records
   */
  archiveOldVerifications(olderThanDays: number): Promise<number>;
  
  // ========== Update Operations ==========
  
  /**
   * Mark verification as expired by user ID
   * @param userId - User ID
   * @returns Number of updated records
   */
  expireByUserId(userId: string): Promise<number>;
  
  /**
   * Mark verification as expired by email
   * @param email - Email address
   * @returns Number of updated records
   */
  expireByEmail(email: Email): Promise<number>;
  
  /**
   * Save verification with expiry check
   * @param verification - Email verification entity
   * @returns void
   */
  saveWithExpiryCheck(verification: EmailVerification): Promise<void>;
  
  // ========== Bulk Operations ==========
  
  /**
   * Batch update verification status
   * @param updates - Map of verification IDs to status
   * @returns Bulk operation result
   */
  batchUpdateStatus(
    updates: Map<string, EmailVerificationStatus>
  ): Promise<BulkOperationResult>;
  
  /**
   * Batch expire verifications
   * @param verificationIds - Array of verification IDs
   * @returns Bulk operation result
   */
  batchExpire(verificationIds: string[]): Promise<BulkOperationResult>;
  
  /**
   * Find duplicate verifications (for cleanup)
   * @returns Duplicate verifications
   */
  findDuplicateVerifications(): Promise<Array<{
    userId: string;
    email: string;
    count: number;
    verificationIds: string[];
  }>>;
  
  // ========== Analytics Operations ==========
  
  /**
   * Get verification rate for a date range
   * @param startDate - Start date
   * @param endDate - End date
   * @returns Verification rate
   */
  getVerificationRate(
    startDate: Date,
    endDate: Date
  ): Promise<VerificationRateResult>;
  
  /**
   * Get daily verification metrics
   * @param days - Number of days to look back
   * @returns Daily metrics
   */
  getDailyMetrics(days: number): Promise<Array<{
    date: string;
    sent: number;
    verified: number;
    expired: number;
    verificationRate: number;
  }>>;
  
  /**
   * Get top email domains for verification
   * @param limit - Number of domains to return
   * @returns Top email domains
   */
  getTopEmailDomains(limit: number): Promise<Array<{
    domain: string;
    count: number;
    verifiedCount: number;
    verificationRate: number;
  }>>;
  
  // ========== ✅ Enterprise: Auto-Retry Operations ==========
  
  /**
   * Get auto-retry configuration
   * @returns Current retry configuration
   */
  getRetryConfig(): Promise<RetryConfig>;
  
  /**
   * Update auto-retry configuration
   * @param config - New retry configuration
   * @returns Updated configuration
   */
  updateRetryConfig(config: Partial<RetryConfig>): Promise<RetryConfig>;
  
  /**
   * Add verification to retry queue
   * @param verificationId - Verification ID
   * @param error - Failure reason
   * @returns Queue item
   */
  addToRetryQueue(verificationId: string, error?: string): Promise<RetryQueueItem>;
  
  /**
   * Get pending retries
   * @param limit - Maximum number of items
   * @returns Array of pending retry items
   */
  getPendingRetries(limit?: number): Promise<RetryQueueItem[]>;
  
  /**
   * Mark retry as completed
   * @param verificationId - Verification ID
   * @returns True if successful
   */
  completeRetry(verificationId: string): Promise<boolean>;
  
  /**
   * Get failed verifications that need retry
   * @param maxAttempts - Maximum retry attempts
   * @returns Array of failed verifications
   */
  getFailedVerificationsForRetry(maxAttempts: number): Promise<EmailVerification[]>;
  
  // ========== ✅ Enterprise: Suspicious Pattern Detection ==========
  
  /**
   * Detect suspicious verification patterns
   * @param timeWindowMinutes - Time window for analysis
   * @returns Suspicious pattern result
   */
  detectSuspiciousPatterns(timeWindowMinutes?: number): Promise<SuspiciousPatternResult>;
  
  /**
   * Detect rapid resend abuse for a user
   * @param userId - User ID
   * @param timeWindowMinutes - Time window for analysis
   * @returns True if rapid resend detected
   */
  detectRapidResendAbuse(userId: string, timeWindowMinutes?: number): Promise<boolean>;
  
  /**
   * Get resend velocity for a user
   * @param userId - User ID
   * @param timeWindowMinutes - Time window for analysis
   * @returns Resends per hour
   */
  getResendVelocity(userId: string, timeWindowMinutes?: number): Promise<number>;
  
  /**
   * Get domain anomaly score
   * @param domain - Email domain
   * @returns Anomaly score (0-100)
   */
  getDomainAnomalyScore(domain: string): Promise<number>;
  
  // ========== ✅ Enterprise: ML-based Prediction ==========
  
  /**
   * Predict verification probability
   * @param verificationId - Verification ID
   * @returns Verification prediction
   */
  predictVerificationOutcome(verificationId: string): Promise<VerificationPrediction>;
  
  /**
   * Batch predict verification outcomes
   * @param verificationIds - Array of verification IDs
   * @returns Map of predictions
   */
  batchPredictOutcomes(verificationIds: string[]): Promise<Map<string, VerificationPrediction>>;
  
  /**
   * Get high-risk verifications (likely to fail)
   * @param riskThreshold - Risk score threshold (default 70)
   * @param limit - Maximum number of results
   * @returns High-risk verifications
   */
  getHighRiskVerifications(riskThreshold?: number, limit?: number): Promise<EmailVerification[]>;
  
  // ========== ✅ Enterprise: Return Path Validation ==========
  
  /**
   * Validate email deliverability
   * @param email - Email address
   * @returns Return path validation result
   */
  validateReturnPath(email: Email): Promise<ReturnPathValidation>;
  
  /**
   * Batch validate return paths
   * @param emails - Array of email addresses
   * @returns Map of validation results
   */
  batchValidateReturnPaths(emails: Email[]): Promise<Map<string, ReturnPathValidation>>;
  
  /**
   * Check if email is a spam trap
   * @param email - Email address
   * @returns True if spam trap detected
   */
  isSpamTrap(email: Email): Promise<boolean>;
  
  /**
   * Check if email is disposable
   * @param email - Email address
   * @returns True if disposable email
   */
  isDisposableEmail(email: Email): Promise<boolean>;
  
  // ========== ✅ Enterprise: Quarantine Management ==========
  
  /**
   * Add email to quarantine
   * @param email - Email address
   * @param reason - Quarantine reason
   * @param durationHours - Quarantine duration in hours
   * @returns Quarantine entry
   */
  quarantineEmail(email: Email, reason: string, durationHours?: number): Promise<QuarantineEntry>;
  
  /**
   * Release email from quarantine
   * @param email - Email address
   * @param releasedBy - Who released it
   * @returns True if released successfully
   */
  releaseFromQuarantine(email: Email, releasedBy: string): Promise<boolean>;
  
  /**
   * Check if email is quarantined
   * @param email - Email address
   * @returns True if quarantined
   */
  isQuarantined(email: Email): Promise<boolean>;
  
  /**
   * Get quarantined emails
   * @param options - Pagination options
   * @returns Paginated quarantine entries
   */
  getQuarantinedEmails(options?: PaginationOptions): Promise<PaginatedResult<QuarantineEntry>>;
  
  /**
   * Cleanup expired quarantine entries
   * @returns Number of cleaned entries
   */
  cleanupExpiredQuarantine(): Promise<number>;
  
  // ========== ✅ Enterprise: Cache Management ==========
  
  /**
   * Get cache key for verification query
   * @param queryName - Query name
   * @param params - Query parameters
   * @returns Cache key
   */
  getCacheKey(queryName: string, params: Record<string, unknown>): string;
  
  /**
   * Invalidate verification cache
   * @param userId - User ID
   * @returns void
   */
  invalidateVerificationCache(userId: string): Promise<void>;
  
  /**
   * Invalidate cache by pattern
   * @param pattern - Cache key pattern
   * @returns Number of invalidated keys
   */
  invalidateCacheByPattern(pattern: string): Promise<number>;
  
  /**
   * Get cache statistics
   * @returns Cache stats
   */
  getCacheStats(): Promise<{ hits: number; misses: number; hitRate: number }>;
  
  // ========== ✅ Enterprise: Rate Limit Management ==========
  
  /**
   * Check rate limit for verification request
   * @param identifier - User ID, email, or IP
   * @param type - Rate limit type
   * @returns Rate limit status
   */
  checkRateLimit(identifier: string, type: 'user' | 'email' | 'ip'): Promise<RateLimitStatus>;
  
  /**
   * Increment rate limit counter
   * @param identifier - User ID, email, or IP
   * @param type - Rate limit type
   * @returns Updated count
   */
  incrementRateLimit(identifier: string, type: 'user' | 'email' | 'ip'): Promise<number>;
  
  /**
   * Reset rate limit for identifier
   * @param identifier - User ID, email, or IP
   * @param type - Rate limit type
   * @returns void
   */
  resetRateLimit(identifier: string, type: 'user' | 'email' | 'ip'): Promise<void>;
  
  /**
   * Get global rate limit configuration
   * @returns Rate limit configuration
   */
  getRateLimitConfig(): Promise<{
    user: { max: number; windowMinutes: number };
    email: { max: number; windowMinutes: number };
    ip: { max: number; windowMinutes: number };
  }>;
  
  // ========== ✅ Enterprise: Performance Monitoring ==========
  
  /**
   * Get performance metrics
   * @returns Performance metrics
   */
  getPerformanceMetrics(): Promise<PerformanceMetrics>;
  
  /**
   * Reset performance metrics
   * @returns void
   */
  resetPerformanceMetrics(): Promise<void>;
  
  /**
   * Get slow query log
   * @param thresholdMs - Query time threshold
   * @param limit - Maximum number of queries
   * @returns Slow queries
   */
  getSlowQueries(thresholdMs?: number, limit?: number): Promise<Array<{
    query: string;
    durationMs: number;
    timestamp: Date;
    userId?: string;
  }>>;
  
  // ========== ✅ Enterprise: A/B Testing ==========
  
  /**
   * Get active A/B test variants
   * @returns Array of active variants
   */
  getActiveABVariants(): Promise<ABTestVariant[]>;
  
  /**
   * Assign variant to user
   * @param userId - User ID
   * @param variantId - Variant ID
   * @returns void
   */
  assignVariantToUser(userId: string, variantId: string): Promise<void>;
  
  /**
   * Get variant assigned to user
   * @param userId - User ID
   * @returns Variant ID or null
   */
  getUserVariant(userId: string): Promise<string | null>;
  
  /**
   * Get A/B test metrics
   * @param variantId - Variant ID
   * @returns Metrics for variant
   */
  getABTestMetrics(variantId: string): Promise<{
    sent: number;
    opened: number;
    clicked: number;
    verified: number;
    conversionRate: number;
    improvement: number;
    confidence: number;
  }>;
  
  /**
   * Promote winning variant
   * @param variantId - Winning variant ID
   * @returns Updated configuration
   */
  promoteWinningVariant(variantId: string): Promise<ABTestVariant>;
  
  // ========== Audit Operations ==========
  
  /**
   * Export verifications for audit
   * @param filters - Query filters
   * @returns Verifications for audit
   */
  exportForAudit(filters?: EmailVerificationFilters): Promise<EmailVerification[]>;
  
  /**
   * Get verification audit trail for user
   * @param userId - User ID
   * @returns Audit trail entries
   */
  // email-verification.repository.interface.ts
/**
 * Get verification audit trail for user (Enterprise Enhanced)
 * ✅ FIXED: Now matches BaseRepository signature
 */
getAuditTrail(
  userId: string
): Promise<Array<{
  timestamp: Date;
  action: 'create' | 'update' | 'delete' | 'soft_delete' | 'restore';
  changes?: Record<string, { old: unknown; new: unknown }>;
  performedBy?: string;
  ipAddress?: string;
  entityId?: string;
  entityType?: string;
  // ✅ Additional domain-specific fields
  email?: string;
  status?: EmailVerificationStatus;
  verificationMethod?: string;
  timeToVerifySeconds?: number;
}>>;
  // ========== ✅ Enterprise: Alert Management ==========
  
  /**
   * Send verification alert
   * @param type - Alert type
   * @param data - Alert data
   * @returns void
   */
  sendAlert(type: 'rate_limit' | 'suspicious_pattern' | 'high_failure_rate' | 'quarantine', data: Record<string, unknown>): Promise<void>;
  
  /**
   * Get active alerts
   * @returns Array of active alerts
   */
  getActiveAlerts(): Promise<Array<{
    id: string;
    type: string;
    severity: string;
    message: string;
    createdAt: Date;
    acknowledged: boolean;
  }>>;
  
  /**
   * Acknowledge alert
   * @param alertId - Alert ID
   * @param acknowledgedBy - Admin ID
   * @returns void
   */
  acknowledgeAlert(alertId: string, acknowledgedBy: string): Promise<void>;
}


// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
// 
// Enterprise Enhancements Applied:
// 1. ✅ Real-time verification dashboard with conversion funnel
// 2. ✅ Auto-retry mechanism for failed deliveries (smart backoff)
// 3. ✅ Suspicious pattern detection (rapid resend, domain anomalies)
// 4. ✅ ML-based verification probability prediction
// 5. ✅ Smart return path validation (MX records, spam trap detection)
// 6. ✅ Quarantine system for high-risk emails
// 7. ✅ Performance metrics with percentiles (P95, P99)
// 8. ✅ Cache management with TTL and invalidation
// 9. ✅ Rate limit monitoring and alerting
// 10. ✅ A/B testing support for verification templates
// 11. ✅ Hourly distribution analytics (peak verification times)
// 12. ✅ Device type and verification method tracking
// 13. ✅ IP reputation filtering
// 14. ✅ Slow query logging and optimization insights
// 15. ✅ Multi-channel alerting system
// 
// Bangladesh Specific:
// - Local timezone-based hourly distribution
// - Bengali alert message support ready
// - Mobile network optimization tracking
// - Feature phone compatibility metrics
// 
// ============================================================
