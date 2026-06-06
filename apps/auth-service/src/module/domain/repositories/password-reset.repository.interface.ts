/**
 * Password Reset Repository Interface - Pure Domain Contract (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module domain/repositories/password-reset.repository.interface

 * @description
 * Repository interface for PasswordReset entity persistence.
 * Manages password reset requests, token validation, and cleanup.

 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ Real-time reset request monitoring dashboard
 * ✅ ML-based reset fraud prediction
 * ✅ Multi-channel notification tracking (Email/SMS/WhatsApp/Voice)
 * ✅ Smart cooldown with user behavior adaptation
 * ✅ Geographic reset pattern analysis (Bangladesh districts)
 * ✅ Device fingerprint correlation for suspicious resets
 * ✅ Reset attempt anomaly detection (velocity, timing)
 * ✅ Batch reset operations with progress tracking
 * ✅ Compliance reporting (Bangladesh Bank guidelines)
 * ✅ A/B testing for reset flow optimization

 * Enterprise Rules:
 * ✅ ONLY interface definitions - NO implementation
 * ✅ Extends BaseRepository for consistency
 * ✅ Supports pagination and filtering
 * ✅ Bulk operations for maintenance
 * ✅ Framework-free, infrastructure-agnostic
 * ✅ Bangladesh specific - Phone-based reset support
 */

import { BaseRepository, PaginationOptions, PaginatedResult } from './base.repository.interface';
import { PasswordReset, PasswordResetStatus, PasswordResetMethod, ResetIdentifier } from '../entities/password-reset.entity';
import { Token } from '../value-objects/token.vo';
import { Phone } from '../value-objects/phone.vo';

// ==================== Types ====================

/**
 * Password reset status filter
 */
export type PasswordResetStatusFilter = PasswordResetStatus | 'all';

/**
 * Password reset filters (Enhanced)
 */
export interface PasswordResetFilters {
  userId?: string;
  email?: string;
  phoneNumber?: string;
  status?: PasswordResetStatusFilter;
  method?: PasswordResetMethod;
  fromDate?: Date;
  toDate?: Date;
  isExpired?: boolean;
  isActive?: boolean;
  ipAddress?: string;
  deviceId?: string;
  /** ✅ Enterprise: Filter by district (Bangladesh) */
  district?: string;
  /** ✅ Enterprise: Filter by user tier */
  userTier?: string;
  /** ✅ Enterprise: Minimum fraud score */
  minFraudScore?: number;
  /** ✅ Enterprise: Maximum fraud score */
  maxFraudScore?: number;
}

/**
 * Password reset statistics (Enhanced)
 */
export interface PasswordResetStatistics {
  totalRequests: number;
  activeRequests: number;
  expiredRequests: number;
  usedRequests: number;
  cancelledRequests: number;
  averageResponseTimeMinutes: number;
  completionRate: number;
  requestsLast24h: number;
  requestsLast7Days: number;
  requestsLast30Days: number;
  byMethod: Record<PasswordResetMethod, number>;
  byStatus: Record<PasswordResetStatus, number>;
  /** ✅ Enterprise: Geographic distribution */
  byDistrict?: Array<{ district: string; count: number; rate: number }>;
  /** ✅ Enterprise: Fraud prevention metrics */
  fraudPrevention: {
    blockedAttempts: number;
    suspiciousPatterns: number;
    averageFraudScore: number;
    falsePositiveRate: number;
  };
  /** ✅ Enterprise: Channel performance */
  channelPerformance: Record<PasswordResetMethod, {
    sent: number;
    delivered: number;
    completed: number;
    completionRate: number;
    averageTimeMinutes: number;
  }>;
}

/**
 * Rate limit status for password reset (Enhanced)
 */
export interface RateLimitStatus {
  isLimited: boolean;
  remainingRequests: number;
  resetTime?: Date;
  remainingCooldownSeconds: number;
  /** ✅ Enterprise: Dynamic cooldown based on user risk */
  dynamicCooldownSeconds?: number;
  /** ✅ Enterprise: Suggested wait reason */
  reason?: 'too_many_attempts' | 'suspicious_activity' | 'high_risk' | 'policy';
}

/**
 * Bulk delete result (Enhanced)
 */
export interface BulkDeleteResult {
  deletedCount: number;
  expiredCount: number;
  usedCount: number;
  cancelledCount: number;
  errors: string[];
  /** ✅ Enterprise: Duration in milliseconds */
  durationMs: number;
  /** ✅ Enterprise: Archived count */
  archivedCount: number;
}

/**
 * Token validation result (Enhanced)
 */
export interface TokenValidationResult {
  isValid: boolean;
  resetRequest?: PasswordReset;
  error?: 'not_found' | 'expired' | 'used' | 'cancelled';
  /** ✅ Enterprise: Time remaining if expired */
  remainingSeconds?: number;
  /** ✅ Enterprise: Fraud score for this token */
  fraudScore?: number;
  /** ✅ Enterprise: Suggested action */
  suggestedAction?: 'allow' | 'challenge' | 'block';
}

/**
 * ✅ Enterprise: Reset fraud prediction result (ML-based)
 */
export interface ResetFraudPrediction {
  resetId: string;
  fraudProbability: number;  // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;  // 0-100
  factors: {
    velocityScore: number;      // Multiple resets in short time
    locationScore: number;      // Unusual geographic pattern
    deviceScore: number;        // Unknown or suspicious device
    timeScore: number;          // Unusual time of day
    historyScore: number;       // Previous reset history
  };
  recommendations: string[];
  requiresManualReview: boolean;
  suggestedAction: 'allow' | 'challenge' | 'block' | 'manual_review';
}

/**
 * ✅ Enterprise: Reset anomaly detection result
 */
export interface ResetAnomalyResult {
  hasAnomaly: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  anomalyType: 'velocity_spike' | 'geo_anomaly' | 'device_anomaly' | 'time_anomaly' | 'coordinated_attack';
  description: string;
  affectedUsers: string[];
  affectedIPs: string[];
  timeWindow: { start: Date; end: Date };
  recommendations: string[];
  requiresImmediateAction: boolean;
}

/**
 * ✅ Enterprise: Geographic reset pattern (Bangladesh)
 */
export interface GeographicResetPattern {
  district: string;
  division: string;
  resetCount: number;
  uniqueUsers: number;
  completionRate: number;
  averageFraudScore: number;
  peakHours: number[];
  weekOverWeekGrowth: number;
  riskScore: number;
}

/**
 * ✅ Enterprise: Reset batch operation progress
 */
export interface ResetBatchProgress {
  total: number;
  processed: number;
  succeeded: number;
  failed: number;
  percentage: number;
  estimatedRemainingMs: number;
  currentBatch: number;
}

/**
 * ✅ Enterprise: Channel delivery status
 */
export interface ChannelDeliveryStatus {
  channel: PasswordResetMethod;
  requestId: string;
  sentAt: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  completedAt?: Date;
  status: 'pending' | 'sent' | 'delivered' | 'opened' | 'completed' | 'failed';
  attempts: number;
  lastError?: string;
}

/**
 * ✅ Enterprise: Reset flow A/B test variant
 */
export interface ResetABTestVariant {
  id: string;
  name: string;
  template: string;
  subject: string;
  senderName: string;
  trafficPercent: number;
  metrics: {
    sent: number;
    delivered: number;
    opened: number;
    completed: number;
    completionRate: number;
    averageTimeMinutes: number;
  };
  isActive: boolean;
  confidenceInterval?: { lower: number; upper: number };
}

/**
 * ✅ Enterprise: Compliance report (Bangladesh Bank)
 */
export interface ResetComplianceReport {
  reportId: string;
  generatedAt: Date;
  period: { from: Date; to: Date };
  summary: {
    totalResets: number;
    completedResets: number;
    completionRate: number;
    fraudPrevented: number;
    averageResolutionTimeMinutes: number;
    channelDistribution: Record<PasswordResetMethod, number>;
  };
  byDistrict: Array<{ district: string; resetCount: number; completionRate: number; fraudRate: number }>;
  byTimeOfDay: Array<{ hour: number; count: number; completionRate: number }>;
  suspiciousPatterns: Array<{ pattern: string; count: number; severity: string }>;
  recommendations: string[];
  exportUrl: string;
}

/**
 * ✅ Enterprise: Reset health dashboard
 */
export interface ResetHealthDashboard {
  overallHealth: 'healthy' | 'degraded' | 'unhealthy';
  metrics: {
    successRate: number;
    averageLatencyMs: number;
    activeRequests: number;
    stalledRequests: number;
  };
  alerts: Array<{
    id: string;
    severity: 'info' | 'warning' | 'critical';
    message: string;
    timestamp: Date;
    acknowledged: boolean;
  }>;
  trends: {
    dailySuccessRate: Array<{ date: string; rate: number }>;
    hourlyVolume: Array<{ hour: number; count: number }>;
  };
  lastUpdated: Date;
}

/**
 * ✅ Enterprise: Smart cooldown configuration
 */
export interface SmartCooldownConfig {
  baseCooldownSeconds: number;
  maxCooldownSeconds: number;
  escalationMultiplier: number;
  resetWindowHours: number;
  riskThresholds: {
    low: number;     // 0-30
    medium: number;  // 30-60
    high: number;    // 60-80
    critical: number; // 80-100
  };
  adaptiveEnabled: boolean;
}

// ==================== Repository Interface ====================

/**
 * Password Reset Repository Interface (Enterprise Enhanced)

 * Manages password reset requests and token lifecycle
 */
export interface PasswordResetRepository extends BaseRepository<PasswordReset> {
  // ========== Find Operations ==========
  
  /**
   * Find password reset request by token value
   * @param token - Token value object
   * @returns Password reset entity or null
   */
  findByToken(token: Token): Promise<PasswordReset | null>;
  
  /**
   * Find password reset request by raw token string
   * @param tokenValue - Raw token string
   * @returns Password reset entity or null
   */
  findByTokenValue(tokenValue: string): Promise<PasswordReset | null>;
  
  /**
   * Find password reset request by email
   * @param email - Email address
   * @param options - Pagination options
   * @returns Paginated password reset requests
   */
  findByEmail(
    email: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordReset>>;
  
  /**
   * Find password reset request by phone number (Bangladesh specific)
   * @param phone - Phone number
   * @param options - Pagination options
   * @returns Paginated password reset requests
   */
  findByPhone(
    phone: Phone,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordReset>>;
  
  /**
   * Find all password reset requests by user ID
   * @param userId - User ID
   * @param options - Pagination options
   * @returns Paginated password reset requests
   */
  findByUserId(
    userId: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordReset>>;
  
  /**
   * Find active (pending and not expired) password reset requests by user ID
   * @param userId - User ID
   * @returns Array of active password reset requests
   */
  findActiveByUserId(userId: string): Promise<PasswordReset[]>;
  
  /**
   * Find requests by status
   * @param status - Request status
   * @param options - Pagination options
   * @returns Paginated requests
   */
  findByStatus(
    status: PasswordResetStatus,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordReset>>;
  
  /**
   * Find expired requests
   * @param options - Pagination options
   * @returns Paginated expired requests
   */
  findExpiredRequests(options: PaginationOptions): Promise<PaginatedResult<PasswordReset>>;
  
  /**
   * Find requests by method (email, SMS, WhatsApp)
   * @param method - Reset method
   * @param options - Pagination options
   * @returns Paginated requests
   */
  findByMethod(
    method: PasswordResetMethod,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordReset>>;
  
  /**
   * Find requests by filters
   * @param filters - Query filters
   * @param options - Pagination options
   * @returns Paginated requests
   */
  findByFilters(
    filters: PasswordResetFilters,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordReset>>;

  /**
   * ✅ Enterprise: Find requests by district (Bangladesh)
   * @param district - District name
   * @param options - Pagination options
   * @returns Paginated requests
   */
  findByDistrict(
    district: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordReset>>;

  /**
   * ✅ Enterprise: Find high-risk reset requests
   * @param fraudThreshold - Minimum fraud score threshold
   * @param options - Pagination options
   * @returns Paginated high-risk requests
   */
  findHighRiskRequests(
    fraudThreshold: number,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordReset>>;

  /**
   * ✅ Enterprise: Find stalled requests (not completed within expected time)
   * @param stalledMinutes - Minutes after which request is considered stalled
   * @param options - Pagination options
   * @returns Paginated stalled requests
   */
  findStalledRequests(
    stalledMinutes: number,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordReset>>;
  
  // ========== Token Validation ==========
  
  /**
   * Validate token and return request
   * @param token - Token value
   * @returns Token validation result
   */
  validateToken(token: string): Promise<TokenValidationResult>;
  
  /**
   * Check if token exists and is valid
   * @param token - Token value
   * @returns True if token exists and is valid
   */
  isValidToken(token: string): Promise<boolean>;
  
  /**
   * Get validated request by token
   * @param token - Token value
   * @returns Validated request or null
   */
  getValidatedRequestByToken(token: string): Promise<PasswordReset | null>;

  /**
   * ✅ Enterprise: Validate token with fraud detection
   * @param token - Token value
   * @param context - Request context (IP, device, user agent)
   * @returns Enhanced validation result with fraud score
   */
  validateTokenWithFraudDetection(
    token: string,
    context: { ipAddress: string; deviceId: string; userAgent: string }
  ): Promise<TokenValidationResult>;
  
  // ========== Status Operations ==========
  
  /**
   * Mark password reset request as used
   * @param id - Request ID
   * @returns void
   */
  markUsed(id: string): Promise<void>;
  
  /**
   * Mark request as used by token
   * @param token - Token value
   * @returns void
   */
  markUsedByToken(token: string): Promise<void>;
  
  /**
   * Mark request as expired
   * @param id - Request ID
   * @returns void
   */
  markExpired(id: string): Promise<void>;
  
  /**
   * Cancel request
   * @param id - Request ID
   * @param reason - Cancellation reason
   * @returns void
   */
  cancelRequest(id: string, reason: string): Promise<void>;

  /**
   * ✅ Enterprise: Update channel delivery status
   * @param requestId - Request ID
   * @param status - Delivery status
   * @returns Updated status
   */
  updateDeliveryStatus(
    requestId: string,
    status: ChannelDeliveryStatus
  ): Promise<ChannelDeliveryStatus>;

  /**
   * ✅ Enterprise: Mark request as suspicious (for review)
   * @param id - Request ID
   * @param fraudScore - Fraud score (0-100)
   * @param reason - Suspicious reason
   * @returns void
   */
  markAsSuspicious(id: string, fraudScore: number, reason: string): Promise<void>;
  
  // ========== Rate Limiting ==========
  
  /**
   * Get rate limit status for user
   * @param userId - User ID
   * @returns Rate limit status
   */
  getRateLimitStatus(userId: string): Promise<RateLimitStatus>;
  
  /**
   * Get rate limit status by email
   * @param email - Email address
   * @returns Rate limit status
   */
  getRateLimitStatusByEmail(email: string): Promise<RateLimitStatus>;
  
  /**
   * Get rate limit status by phone (Bangladesh specific)
   * @param phone - Phone number
   * @returns Rate limit status
   */
  getRateLimitStatusByPhone(phone: Phone): Promise<RateLimitStatus>;
  
  /**
   * Get request count for user in time window
   * @param userId - User ID
   * @param windowHours - Time window in hours
   * @returns Request count
   */
  getRequestCountInWindow(userId: string, windowHours: number): Promise<number>;

  /**
   * ✅ Enterprise: Get adaptive rate limit based on user risk
   * @param userId - User ID
   * @param userRiskScore - User's risk score (0-100)
   * @returns Enhanced rate limit status
   */
  getAdaptiveRateLimit(userId: string, userRiskScore: number): Promise<RateLimitStatus>;

  /**
   * ✅ Enterprise: Get smart cooldown configuration
   * @returns Smart cooldown configuration
   */
  getSmartCooldownConfig(): Promise<SmartCooldownConfig>;

  /**
   * ✅ Enterprise: Update smart cooldown configuration
   * @param config - Updated configuration
   * @returns Updated configuration
   */
  updateSmartCooldownConfig(config: Partial<SmartCooldownConfig>): Promise<SmartCooldownConfig>;
  
  // ========== Delete Operations ==========
  
  /**
   * Delete all password reset requests for a user
   * @param userId - User ID
   * @returns Number of deleted requests
   */
  deleteByUserId(userId: string): Promise<number>;
  
  /**
   * Delete all expired password reset requests (cleanup)
   * @returns Bulk delete result
   */
  deleteExpired(): Promise<BulkDeleteResult>;
  
  /**
   * Delete requests older than retention period
   * @param retentionDays - Days to retain
   * @returns Bulk delete result
   */
  deleteOldRequests(retentionDays: number): Promise<BulkDeleteResult>;
  
  /**
   * Delete requests by email
   * @param email - Email address
   * @returns Number of deleted requests
   */
  deleteByEmail(email: string): Promise<number>;
  
  /**
   * Delete requests by phone (Bangladesh specific)
   * @param phone - Phone number
   * @returns Number of deleted requests
   */
  deleteByPhone(phone: Phone): Promise<number>;
  
  // ========== Check Operations ==========
  
  /**
   * Check if active reset request exists for user
   * @param userId - User ID
   * @returns True if active request exists
   */
  hasActiveRequest(userId: string): Promise<boolean>;
  
  /**
   * Check if active reset request exists by email
   * @param email - Email address
   * @returns True if active request exists
   */
  hasActiveRequestByEmail(email: string): Promise<boolean>;
  
  /**
   * Check if active reset request exists by phone (Bangladesh specific)
   * @param phone - Phone number
   * @returns True if active request exists
   */
  hasActiveRequestByPhone(phone: Phone): Promise<boolean>;
  
  // ========== Get Operations ==========
  
  /**
   * Get the most recent password reset request for user
   * @param userId - User ID
   * @returns Most recent request or null
   */
  getMostRecentByUserId(userId: string): Promise<PasswordReset | null>;
  
  /**
   * Get the most recent active request for user
   * @param userId - User ID
   * @returns Most recent active request or null
   */
  getMostRecentActiveByUserId(userId: string): Promise<PasswordReset | null>;
  
  /**
   * Get request by email (most recent)
   * @param email - Email address
   * @returns Most recent request or null
   */
  getMostRecentByEmail(email: string): Promise<PasswordReset | null>;
  
  /**
   * Get request by phone (most recent - Bangladesh specific)
   * @param phone - Phone number
   * @returns Most recent request or null
   */
  getMostRecentByPhone(phone: Phone): Promise<PasswordReset | null>;
  
  // ========== Count Operations ==========
  
  /**
   * Count active requests by user
   * @param userId - User ID
   * @returns Number of active requests
   */
  countActiveByUserId(userId: string): Promise<number>;
  
  /**
   * Count requests by status
   * @param status - Request status
   * @returns Count of requests
   */
  countByStatus(status: PasswordResetStatus): Promise<number>;
  
  /**
   * Count requests by method
   * @param method - Reset method
   * @returns Count of requests
   */
  countByMethod(method: PasswordResetMethod): Promise<number>;
  
  /**
   * Count requests in date range
   * @param fromDate - Start date
   * @param toDate - End date
   * @returns Count of requests
   */
  countInDateRange(fromDate: Date, toDate: Date): Promise<number>;
  
  /**
   * Count requests by user in date range
   * @param userId - User ID
   * @param fromDate - Start date
   * @param toDate - End date
   * @returns Count of requests
   */
  countByUserInDateRange(
    userId: string,
    fromDate: Date,
    toDate: Date
  ): Promise<number>;

  /**
   * ✅ Enterprise: Count requests by district
   * @param district - District name
   * @param fromDate - Start date
   * @param toDate - End date
   * @returns Count of requests
   */
  countByDistrict(
    district: string,
    fromDate?: Date,
    toDate?: Date
  ): Promise<number>;
  
  // ========== Statistics Operations ==========
  
  /**
   * Get password reset statistics
   * @returns Password reset statistics
   */
  getStatistics(): Promise<PasswordResetStatistics>;
  
  /**
   * Get daily reset requests for analytics
   * @param days - Number of days to analyze
   * @returns Daily request data
   */
  getDailyRequests(days: number): Promise<Array<{ date: string; count: number; completed: number }>>;
  
  /**
   * Get reset completion rate by method
   * @returns Completion rate by method
   */
  getCompletionRateByMethod(): Promise<Record<PasswordResetMethod, number>>;

  /**
   * ✅ Enterprise: Get geographic reset patterns (Bangladesh)
   * @param fromDate - Start date
   * @param toDate - End date
   * @returns Geographic patterns
   */
  getGeographicPatterns(
    fromDate?: Date,
    toDate?: Date
  ): Promise<GeographicResetPattern[]>;

  /**
   * ✅ Enterprise: Get channel performance metrics
   * @param fromDate - Start date
   * @param toDate - End date
   * @returns Channel performance
   */
  getChannelPerformance(
    fromDate?: Date,
    toDate?: Date
  ): Promise<Record<PasswordResetMethod, ChannelPerformanceMetrics>>;

  /**
   * ✅ Enterprise: Get reset health dashboard
   * @returns Reset health dashboard
   */
  getResetHealthDashboard(): Promise<ResetHealthDashboard>;
  
  // ========== Batch Operations ==========
  
  /**
   * Invalidate all requests for user (security incident)
   * @param userId - User ID
   * @param reason - Invalidation reason
   * @returns Number of invalidated requests
   */
  invalidateAllByUserId(userId: string, reason: string): Promise<number>;
  
  /**
   * Batch update status
   * @param updates - Map of request IDs to status
   * @returns Number of updated records
   */
  batchUpdateStatus(updates: Map<string, PasswordResetStatus>): Promise<number>;
  
  /**
   * Batch expire requests
   * @param ids - Array of request IDs
   * @returns Number of expired requests
   */
  batchExpire(ids: string[]): Promise<number>;

  /**
   * ✅ Enterprise: Batch process requests with progress tracking
   * @param requestIds - Array of request IDs
   * @param operation - Operation to perform
   * @param onProgress - Progress callback
   * @returns Batch operation result
   */
  batchProcessRequests(
    requestIds: string[],
    operation: (request: PasswordReset) => Promise<void>,
    onProgress?: (progress: ResetBatchProgress) => void
  ): Promise<{ succeeded: number; failed: number; errors: Array<{ id: string; error: string }> }>;

  /**
   * ✅ Enterprise: Batch resend notifications
   * @param requestIds - Array of request IDs
   * @param onProgress - Progress callback
   * @returns Batch operation result
   */
  batchResendNotifications(
    requestIds: string[],
    onProgress?: (progress: ResetBatchProgress) => void
  ): Promise<{ succeeded: number; failed: number; errors: Array<{ id: string; error: string }> }>;
  
  // ========== Save Operations ==========
  
  /**
   * Save with expiration check
   * @param reset - Password reset entity
   * @returns void
   */
  saveWithExpiryCheck(reset: PasswordReset): Promise<void>;
  
  /**
   * Save and invalidate other active requests for same user
   * @param reset - Password reset entity
   * @returns void
   */
  saveAndInvalidateOthers(reset: PasswordReset): Promise<void>;

  /**
   * ✅ Enterprise: Save with fraud score
   * @param reset - Password reset entity
   * @param fraudScore - Calculated fraud score (0-100)
   * @returns Saved entity with fraud metadata
   */
  saveWithFraudScore(reset: PasswordReset, fraudScore: number): Promise<PasswordReset>;

  /**
   * ✅ Enterprise: Save and track channel delivery
   * @param reset - Password reset entity
   * @param channel - Notification channel
   * @returns Delivery tracking info
   */
  saveWithDeliveryTracking(
    reset: PasswordReset,
    channel: PasswordResetMethod
  ): Promise<{ reset: PasswordReset; deliveryId: string }>;

  // ========== ✅ Enterprise: Fraud Detection & ML ==========

  /**
   * Predict fraud probability for reset request
   * @param request - Reset request data
   * @param context - Request context
   * @returns Fraud prediction result
   */
  predictFraudProbability(
    request: Omit<PasswordReset, 'id' | 'createdAt' | 'updatedAt' | 'version'>,
    context: { ipAddress: string; deviceId: string; userAgent: string; userHistory?: unknown }
  ): Promise<ResetFraudPrediction>;

  /**
   * Batch predict fraud for multiple requests
   * @param requests - Array of request data with context
   * @returns Map of prediction results
   */
  batchPredictFraud(
    requests: Array<{
      request: Omit<PasswordReset, 'id' | 'createdAt' | 'updatedAt' | 'version'>;
      context: { ipAddress: string; deviceId: string; userAgent: string };
    }>
  ): Promise<Map<string, ResetFraudPrediction>>;

  /**
   * Get fraud score for user based on history
   * @param userId - User ID
   * @returns User fraud score (0-100)
   */
  getUserFraudScore(userId: string): Promise<number>;

  /**
   * Update fraud detection model (ML model retraining)
   * @param trainingData - Training data for model
   * @returns Model version
   */
  updateFraudDetectionModel(trainingData: unknown): Promise<string>;

  // ========== ✅ Enterprise: Anomaly Detection ==========

  /**
   * Detect reset anomalies in time window
   * @param timeWindowMinutes - Time window for analysis
   * @returns Anomaly detection result
   */
  detectResetAnomalies(timeWindowMinutes?: number): Promise<ResetAnomalyResult>;

  /**
   * Detect coordinated reset attacks (multiple users)
   * @param timeWindowMinutes - Time window for analysis
   * @returns Anomaly detection result
   */
  detectCoordinatedResets(timeWindowMinutes?: number): Promise<ResetAnomalyResult>;

  /**
   * Get reset velocity for user
   * @param userId - User ID
   * @param timeWindowMinutes - Time window for analysis
   * @returns Resets per hour
   */
  getResetVelocity(userId: string, timeWindowMinutes?: number): Promise<number>;

  /**
   * Get anomaly score for reset request
   * @param requestId - Request ID
   * @returns Anomaly score (0-100)
   */
  getAnomalyScore(requestId: string): Promise<number>;

  // ========== ✅ Enterprise: A/B Testing ==========

  /**
   * Get active reset flow A/B test variants
   * @returns Array of active variants
   */
  getActiveResetABVariants(): Promise<ResetABTestVariant[]>;

  /**
   * Assign A/B test variant to user
   * @param userId - User ID
   * @param variantId - Variant ID
   * @returns void
   */
  assignResetABVariant(userId: string, variantId: string): Promise<void>;

  /**
   * Get variant assigned to user for reset flow
   * @param userId - User ID
   * @returns Variant ID or null
   */
  getUserResetABVariant(userId: string): Promise<string | null>;

  /**
   * Get A/B test metrics for reset flow
   * @param variantId - Variant ID
   * @returns Metrics for variant
   */
  getResetABMetrics(variantId: string): Promise<{
    sent: number;
    delivered: number;
    opened: number;
    completed: number;
    conversionRate: number;
    improvement: number;
    confidence: number;
    sampleSize: number;
  }>;

  /**
   * Promote winning reset flow variant
   * @param variantId - Winning variant ID
   * @returns Updated configuration
   */
  promoteWinningResetVariant(variantId: string): Promise<ResetABTestVariant>;

  // ========== ✅ Enterprise: Compliance & Audit ==========

  /**
   * Generate compliance report (Bangladesh Bank guidelines)
   * @param fromDate - Start date
   * @param toDate - End date
   * @returns Compliance report
   */
  generateComplianceReport(fromDate: Date, toDate: Date): Promise<ResetComplianceReport>;

  /**
   * Export reset data for audit
   * @param filters - Query filters
   * @param format - Export format ('json', 'csv', 'xlsx')
   * @returns Export result
   */
  exportForAudit(
    filters?: PasswordResetFilters,
    format?: 'json' | 'csv' | 'xlsx'
  ): Promise<{
    exportId: string;
    generatedAt: Date;
    recordCount: number;
    downloadUrl: string;
    expiresAt: Date;
  }>;

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

  // ========== ✅ Enterprise: Real-time Monitoring ==========

  /**
   * Get real-time reset metrics
   * @returns Real-time metrics
   */
  getRealtimeResetMetrics(): Promise<{
    activeRequests: number;
    requestsLastMinute: number;
    requestsLastHour: number;
    successRate: number;
    averageFraudScore: number;
    topChannels: Array<{ channel: PasswordResetMethod; usage: number }>;
    alertsActive: number;
  }>;

  /**
   * Get reset alerts
   * @param activeOnly - Only active (not resolved) alerts
   * @returns Array of alerts
   */
  getResetAlerts(activeOnly?: boolean): Promise<Array<{
    id: string;
    type: string;
    severity: 'info' | 'warning' | 'critical';
    message: string;
    messageBn?: string;
    triggeredAt: Date;
    acknowledged: boolean;
    acknowledgedBy?: string;
    resolvedAt?: Date;
  }>>;

  /**
   * Acknowledge reset alert
   * @param alertId - Alert ID
   * @param acknowledgedBy - Admin ID
   * @returns Updated alert
   */
  acknowledgeResetAlert(alertId: string, acknowledgedBy: string): Promise<void>;

  // ========== Archive & Retention ==========

  /**
   * Archive old reset requests
   * @param olderThanDays - Archive requests older than N days
   * @returns Number of archived requests
   */
  archiveOldRequests(olderThanDays: number): Promise<number>;

  /**
   * Restore archived reset requests
   * @param olderThanDays - Restore requests older than N days
   * @returns Number of restored requests
   */
  restoreArchivedRequests(olderThanDays: number): Promise<number>;

  /**
   * Purge archived requests permanently
   * @param olderThanDays - Purge requests older than N days
   * @returns Number of purged requests
   */
  purgeArchivedRequests(olderThanDays: number): Promise<number>;
}

// ============================================================
// Supporting Interfaces
// ============================================================

/**
 * Channel performance metrics
 */
export interface ChannelPerformanceMetrics {
  sent: number;
  delivered: number;
  opened: number;
  completed: number;
  deliveryRate: number;
  openRate: number;
  completionRate: number;
  averageDeliveryTimeSeconds: number;
  averageCompletionTimeMinutes: number;
  failureRate: number;
}

// ============================================================
// Default Configuration
// ============================================================

/**
 * Default smart cooldown configuration
 */
export const DEFAULT_SMART_COOLDOWN_CONFIG: SmartCooldownConfig = {
  baseCooldownSeconds: 60,
  maxCooldownSeconds: 3600,
  escalationMultiplier: 2,
  resetWindowHours: 24,
  riskThresholds: {
    low: 30,
    medium: 60,
    high: 80,
    critical: 100,
  },
  adaptiveEnabled: true,
};

/**
 * Default rate limit configuration
 */
export const DEFAULT_RATE_LIMIT_CONFIG = {
  user: { max: 3, windowMinutes: 60 },
  email: { max: 3, windowMinutes: 60 },
  phone: { max: 3, windowMinutes: 60 },
  ip: { max: 10, windowMinutes: 60 },
};

// ============================================================
// Type Exports
// ============================================================

export type { 
  PasswordResetFilters, 
  PasswordResetStatistics, 
  RateLimitStatus, 
  BulkDeleteResult,
  TokenValidationResult,
  // ✅ Enterprise: New type exports
  ResetFraudPrediction,
  ResetAnomalyResult,
  GeographicResetPattern,
  ResetBatchProgress,
  ChannelDeliveryStatus,
  ResetABTestVariant,
  ResetComplianceReport,
  ResetHealthDashboard,
  SmartCooldownConfig,
  ChannelPerformanceMetrics,
};

// ============================================================
// ENTERPRISE SUMMARY v2.0
// ============================================================
// 
// Enterprise Enhancements Applied:
// 1. ✅ ML-based reset fraud prediction with risk scoring (0-100)
// 2. ✅ Real-time reset health dashboard with alerts
// 3. ✅ Smart adaptive cooldown based on user risk profile
// 4. ✅ Geographic reset pattern analysis (Bangladesh districts)
// 5. ✅ Multi-channel delivery tracking (Email/SMS/WhatsApp/Voice)
// 6. ✅ Reset anomaly detection (velocity, coordinated attacks)
// 7. ✅ A/B testing support for reset flow optimization
// 8
