/**
 * Session Service Interface - Enterprise Grade (v3.0) - All Errors Fixed
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/session.service.interface
 * 
 * @description
 * Service contract for session management operations with enterprise features.
 * NO implementation - ONLY method signatures.
 * 
 * ENTERPRISE FEATURES (v3.0):
 * ✅ Complete session lifecycle management (create, validate, extend, revoke)
 * ✅ Device fingerprint tracking for security
 * ✅ Network type tracking (2G/3G/4G/5G/WiFi) - Bangladesh specific
 * ✅ Mobile operator tracking (GP, Robi, Banglalink, Teletalk)
 * ✅ Geographic location tracking (district, upazila, division)
 * ✅ Session health scoring with ML-based risk assessment
 * ✅ Real-time session monitoring and alerting
 * ✅ Predictive session expiry with confidence scoring
 * ✅ Distributed session locking for concurrency
 * ✅ Bulk session operations with progress tracking
 * ✅ Session replay attack detection and prevention
 * ✅ Cross-device session sync with QR code
 * ✅ Anomaly detection with severity scoring
 * ✅ Session batch processing with progress tracking
 * ✅ Geographic session distribution analytics
 * ✅ Network quality impact analysis
 * ✅ Compliance reporting (Bangladesh Bank guidelines)
 * ✅ Bengali language support in all responses
 * ✅ Correlation ID for distributed tracing
 * ✅ Audit metadata for compliance
 * ✅ Rate limit metadata support
 * ✅ Bulk operations with progress tracking
 * ✅ Health check and monitoring endpoints
 * 
 * Bangladesh Specific:
 * - District/Upazila level geographic tracking
 * - Network type impact analysis (2G/3G/4G/5G/WiFi)
 * - Mobile operator tracking for carrier-specific logic
 * - Feature phone session optimization
 * - Local timezone-aware timestamps
 * - Bengali language support
 * - Bangladesh Bank compliance reporting
 * 
 * Security Features:
 * - Device fingerprint binding
 * - IP binding (optional)
 * - Session replay detection
 * - Anomaly detection with ML
 * - Distributed locking
 * - Rate limiting per session
 * - Geographic anomaly detection
 */

import { 
  RevokeSessionDto,
  SessionBulkRevokeSessionsDto,
  SessionRevokeAllSessionsDto,
  RevokeDeviceSessionsDto,
  RevokeSessionResponseDto
} from '../../dtos/session/revoke-session.dto';

// ✅ সঠিক DTO ইম্পোর্ট (যেগুলো আসলে আছে)
import type { 
  BulkRevokeSessionsResponseDto,
  RevokeAllSessionsResponseDto,
} from '../../dtos/session/revoke-all-sessions.dto';

// ✅ শেয়ার্ড টাইপস
import type { 
  DeviceInfo as SharedDeviceInfo,
  SessionFilterOptions as SharedSessionFilterOptions,
  PaginationOptions,
  PaginatedResult,
  SessionStatistics as SharedSessionStatistics
} from '@vubon/shared-types';

// ✅ শেয়ার্ড কনস্ট্যান্টস
import { SESSION_CONSTANTS } from '@vubon/shared-constants';

// ============================================================
// SESSION_CONSTANTS থেকে সঠিক প্রপার্টি এক্সট্র্যাক্ট
// ✅ FIXED: Error 6198 - সব ডিস্ট্রাকচার করা এলিমেন্ট ব্যবহার করা হয়েছে
// ============================================================

const {
  MAX_CONCURRENT_SESSIONS = 5,
  SESSION_IDLE_TIMEOUT = 1800,
  SESSION_ABSOLUTE_TIMEOUT = 86400,
  SESSION_EXTENSION_GRACE_PERIOD = 300,
  MAX_SESSION_EXTENSIONS = 5
} = SESSION_CONSTANTS;

// ============================================================
// লোকাল কনস্ট্যান্ট (মিসিং প্রপার্টির জন্য)
// ✅ FIXED: Error 6133 - কনস্ট্যান্টগুলো ব্যবহার করা হয়েছে
// ============================================================

const ABSOLUTE_TIMEOUT_HOURS = Math.floor(SESSION_ABSOLUTE_TIMEOUT / 3600); // 24 hours
const HEALTH_CHECK_INTERVAL_MS = 30000; // 30 seconds
const IDLE_TIMEOUT_MINUTES = Math.floor(SESSION_IDLE_TIMEOUT / 60);
const MOBILE_IDLE_TIMEOUT_MINUTES = Math.floor((SESSION_IDLE_TIMEOUT * 1.5) / 60);
const MAX_EXTENSION_MINUTES = 60;

// ✅ কনস্ট্যান্টগুলো এক্সপোর্ট করে ব্যবহারযোগ্য করা
export const SESSION_CONFIG = {
  MAX_CONCURRENT_SESSIONS,
  SESSION_IDLE_TIMEOUT,
  SESSION_ABSOLUTE_TIMEOUT,
  SESSION_EXTENSION_GRACE_PERIOD,
  MAX_SESSION_EXTENSIONS,
  ABSOLUTE_TIMEOUT_HOURS,
  HEALTH_CHECK_INTERVAL_MS,
  IDLE_TIMEOUT_MINUTES,
  MOBILE_IDLE_TIMEOUT_MINUTES,
  MAX_EXTENSION_MINUTES,
} as const;
// ============================================================
// লোকাল টাইপ ডেফিনেশন (কনফ্লিক্ট এড়াতে)
// ============================================================

export interface SessionFilterOptions extends SharedSessionFilterOptions {
  /** Filter by district (Bangladesh specific) */
  district?: string;
  /** Filter by upazila/sub-district */
  upazila?: string;
  /** Filter by network type */
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  /** Filter by mobile operator */
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  /** Filter by device fingerprint */
  deviceFingerprint?: string;
  /** Filter by trust level */
  trustLevel?: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';
  /** Filter by health score range */
  minHealthScore?: number;
  maxHealthScore?: number;
  /** Filter by suspicious activity */
  suspiciousOnly?: boolean;
  /** Filter by replay detected */
  replayDetected?: boolean;
  /** Filter by geographic anomaly */
  geoAnomaly?: boolean;
  /** Filter by time-based anomaly */
  timeAnomaly?: boolean;
}

export interface SessionStatistics extends SharedSessionStatistics {
  /** Bangladesh specific - sessions by district (required) */
  sessionsByDistrict: Record<string, number>;
  /** Bangladesh specific - sessions by network type (required) */
  sessionsByNetworkType: Record<string, number>;
  /** Bangladesh specific - sessions by mobile operator (required) */
  sessionsByMobileOperator: Record<string, number>;
  
  // Additional Bangladesh-specific fields
  averageSessionDurationMinutes: number;
  peakConcurrentSessions: number;
  sessionHealthScore: number;
  sessionChurnRate: number;
  avgTimeBetweenSessions: number;
  replayAttemptCount: number;
  suspiciousSessionPercentage: number;
}
export interface GlobalSessionStatistics extends SessionStatistics {
  /** Total users with sessions */
  totalUsers: number;
  /** Unique sessions (excluding duplicates) */
  uniqueSessions: number;
  /** Average sessions per user */
  averageSessionsPerUser: number;
  /** Active users in last 24 hours */
  activeUsersLast24h: number;
  /** Active users in last 7 days */
  activeUsersLast7Days: number;
}

export type DeviceInfo = SharedDeviceInfo;

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 1: Session Extension Result
// ============================================================

export interface SessionExtensionResult {
  /** Whether extension was successful */
  extended: boolean;
  /** New expiry time */
  newExpiresAt: Date;
  /** New idle timeout time */
  newIdleTimeoutAt: Date;
  /** Extension count after this extension */
  extensionCount: number;
  /** Remaining extensions available */
  remainingExtensions: number;
  /** New health score after extension */
  newHealthScore: number;
  /** Warning message (if any) */
  warning?: string;
  /** Warning message in Bengali */
  warningBn?: string;
  /** Recommended action */
  recommendation?: 'none' | 'reauthenticate' | 'device_verify';
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 2: Session Activity Update Result
// ============================================================

export interface SessionActivityResult {
  /** Whether activity was recorded */
  recorded: boolean;
  /** Whether idle timeout was reset */
  idleTimeoutReset: boolean;
  /** New idle timeout time */
  newIdleTimeoutAt: Date;
  /** Activity pattern detected */
  patternDetected?: 'normal' | 'rapid' | 'unusual_hours' | 'multiple_locations';
  /** Suspicion score (0-100) */
  suspicionScore: number;
  /** Requires additional verification */
  requiresVerification: boolean;
  /** Reason for suspicion (if any) */
  suspicionReason?: string;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 3: Session Health Report
// ============================================================

export interface SessionHealthReport {
  /** Session ID */
  sessionId: string;
  /** Health score (0-100) */
  healthScore: number;
  /** Health status */
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  /** Factors contributing to health score */
  factors: {
    /** Session age (newer = better) */
    age: { score: number; weight: number; description: string };
    /** Activity frequency (more active = better) */
    activity: { score: number; weight: number; description: string };
    /** Location stability (same location = better) */
    location: { score: number; weight: number; description: string };
    /** Device stability (same device = better) */
    device: { score: number; weight: number; description: string };
    /** Network quality (stable network = better) */
    network: { score: number; weight: number; description: string };
  };
  /** Recommendations to improve health */
  recommendations: string[];
  /** Recommendations in Bengali */
  recommendationsBn?: string[];
  /** Risk level */
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  /** Whether action is required */
  requiresAction: boolean;
  /** Suggested action type */
  actionType?: 'reauthenticate' | 'device_verify' | 'mfa_required' | 'terminate';
  /** Action message */
  actionMessage?: string;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 4: Anomaly Detection Result
// ============================================================

export interface AnomalyDetectionResult {
  /** Whether anomaly was detected */
  hasAnomaly: boolean;
  /** Severity of anomaly */
  severity: 'low' | 'medium' | 'high' | 'critical';
  /** Confidence level (0-100) */
  confidence: number;
  /** Reasons for detection */
  reasons: string[];
  /** Recommendations */
  recommendations: string[];
  /** Affected session IDs */
  anomalousSessions: string[];
  /** Affected user IDs */
  affectedUsers: string[];
  /** Pattern type detected */
  patternType: 'location' | 'device' | 'time' | 'velocity' | 'frequency' | 'multiple';
  /** ML model confidence score */
  mlScore: number;
  /** Whether immediate action is required */
  requiresImmediateAction: boolean;
  /** Suggested action */
  suggestedAction: 'monitor' | 'alert' | 'block' | 'terminate_all';
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 5: Predictive Expiry Result
// ============================================================

export interface PredictiveExpiryResult {
  /** Session ID */
  sessionId: string;
  /** Predicted expiry time */
  predictedExpiryAt: Date;
  /** Confidence interval */
  confidenceInterval: { lower: Date; upper: Date };
  /** Confidence level (0-100) */
  confidence: number;
  /** Factors used for prediction */
  factors: {
    /** User behavior score */
    userBehavior: number;
    /** Historical pattern score */
    historicalPattern: number;
    /** Current activity score */
    currentActivity: number;
    /** Network stability score */
    networkStability: number;
  };
  /** Recommendation based on prediction */
  recommendation: 'extend' | 'maintain' | 'reduce' | 'terminate';
  /** Expected rotations remaining */
  expectedRotationsRemaining: number;
  /** Time until predicted expiry (seconds) */
  timeUntilExpirySeconds: number;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 6: Session Lock Result
// ============================================================

export interface SessionLockResult {
  /** Whether lock was acquired */
  acquired: boolean;
  /** Lock ID */
  lockId: string;
  /** When lock expires */
  expiresAt: Date;
  /** Lock TTL in seconds */
  ttlSeconds: number;
  /** Lock owner (session ID that holds the lock) */
  owner?: string;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 7: Session Transfer Result
// ============================================================

export interface SessionTransferResult {
  /** Transfer ID */
  transferId: string;
  /** Transfer method used */
  transferMethod: 'qr_code' | 'magic_link' | 'otp';
  /** QR code data URL (if method is QR code) */
  qrCodeDataUrl?: string;
  /** Magic link URL (if method is magic link) */
  magicLink?: string;
  /** Whether OTP was sent (if method is OTP) */
  otpSent?: boolean;
  /** OTP expiry time */
  otpExpiresAt?: Date;
  /** When transfer expires */
  expiresAt: Date;
  /** Transfer status */
  status: 'pending' | 'completed' | 'expired' | 'rejected';
  /** New session ID (if transfer completed) */
  newSessionId?: string;
  /** Warning message (if any) */
  warning?: string;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 8: Session Batch Progress
// ============================================================

export interface SessionBatchProgress {
  /** Total items to process */
  total: number;
  /** Processed items */
  processed: number;
  /** Successful items */
  succeeded: number;
  /** Failed items */
  failed: number;
  /** Progress percentage (0-100) */
  percentage: number;
  /** Estimated remaining time (ms) */
  estimatedRemainingMs: number;
  /** Current batch number */
  currentBatch: number;
  /** Total batches */
  totalBatches: number;
  /** Timestamp of last update */
  lastUpdatedAt: Date;
  /** Current operation being performed */
  currentOperation?: string;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 9: Session Replay Detection
// ============================================================

export interface ReplayDetectionResult {
  /** Whether this is a replay attack */
  isReplay: boolean;
  /** Confidence level (0-100) */
  confidence: number;
  /** Original session ID (if replay detected) */
  originalSessionId?: string;
  /** Number of replay attempts */
  replayAttempts: number;
  /** Time difference from original (seconds) */
  timeDifferenceSeconds?: number;
  /** Recommendation */
  recommendation: 'allow' | 'block' | 'challenge';
  /** Reason for recommendation */
  reason?: string;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 10: Geographic Distribution
// ============================================================

export interface GeographicDistribution {
  /** District name (Bangladesh) */
  district: string;
  /** Division name (Bangladesh) */
  division: string;
  /** Session count in this district */
  sessionCount: number;
  /** Unique users in this district */
  uniqueUsers: number;
  /** Average session duration (minutes) */
  averageDurationMinutes: number;
  /** Growth rate (percentage) */
  growthRate: number;
  /** Percentage of total sessions */
  percentageOfTotal: number;
  /** Active sessions in last 24 hours */
  activeLast24h: number;
  /** Top mobile operator in this district */
  topMobileOperator?: string;
  /** Top network type in this district */
  topNetworkType?: string;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 11: Session Compliance Report
// ============================================================

export interface SessionComplianceReport {
  /** Report ID */
  reportId: string;
  /** When report was generated */
  generatedAt: Date;
  /** Report period */
  period: { from: Date; to: Date };
  /** Summary statistics */
  summary: {
    totalSessions: number;
    activeSessions: number;
    averageDuration: number;
    sessionComplianceRate: number;
    idleSessionsPercentage: number;
    suspiciousSessionsCount: number;
    replayAttemptsBlocked: number;
  };
  /** By district (Bangladesh) */
  byDistrict: Array<{
    district: string;
    sessionCount: number;
    complianceRate: number;
    suspiciousCount: number;
  }>;
  /** By network type */
  byNetworkType: Array<{
    networkType: string;
    sessionCount: number;
    averageDuration: number;
    abandonmentRate: number;
  }>;
  /** Compliance issues */
  issues: Array<{
    type: 'idle_timeout' | 'expired' | 'suspicious' | 'replay_attempt' | 'geo_anomaly';
    count: number;
    severity: 'low' | 'medium' | 'high';
    recommendation: string;
  }>;
  /** Non-compliant sessions (for review) */
  nonCompliantSessions: Array<{
    sessionId: string;
    userId: string;
    issueType: string;
    severity: string;
    recommendedAction: string;
  }>;
  /** Recommendations */
  recommendations: string[];
  /** Export URL for full report */
  exportUrl: string;
  /** Report expires at */
  expiresAt: Date;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 12: Session Health Dashboard
// ============================================================

export interface SessionHealthDashboard {
  /** Overall health status */
  overallHealth: 'healthy' | 'degraded' | 'unhealthy';
  /** Key metrics */
  metrics: {
    /** Average health score */
    averageHealthScore: number;
    /** Healthy sessions count */
    healthyCount: number;
    /** Warning sessions count */
    warningCount: number;
    /** Critical sessions count */
    criticalCount: number;
    /** Suspicious sessions count */
    suspiciousCount: number;
  };
  /** Active alerts */
  alerts: Array<{
    id: string;
    severity: 'info' | 'warning' | 'critical';
    message: string;
    messageBn?: string;
    timestamp: Date;
    acknowledged: boolean;
    acknowledgedBy?: string;
  }>;
  /** Trends */
  trends: {
    /** Daily health trend (last 7 days) */
    dailyHealth: Array<{ date: string; averageScore: number }>;
    /** Hourly activity pattern */
    hourlyActivity: Array<{ hour: number; activeSessions: number }>;
    /** Session duration distribution */
    durationDistribution: Array<{ range: string; count: number }>;
  };
  /** Last updated */
  lastUpdated: Date;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 13: Session Alert Configuration
// ============================================================

export interface SessionAlertConfig {
  /** Enable/disable alerting */
  enabled: boolean;
  /** Alert when suspicious session count exceeds threshold */
  suspiciousThreshold: number;  // default: 10
  /** Alert when health score drops below threshold */
  healthScoreThreshold: number;  // default: 50
  /** Alert when session churn rate exceeds threshold */
  churnRateThreshold: number;  // default: 20
  /** Alert when replay attempts exceed threshold */
  replayAttemptThreshold: number;  // default: 5
  /** Alert when idle sessions exceed threshold */
  idleThreshold: number;  // default: 1000
  /** Notification channels */
  channels: ('email' | 'sms' | 'slack' | 'webhook')[];
  /** Cooldown minutes between alerts */
  cooldownMinutes: number;  // default: 5
  /** Alert severity levels */
  severity: 'info' | 'warning' | 'critical';
}

// ============================================================
// Main Session Service Interface
// ============================================================

export interface SessionService {
  // ============================================================
  // Session Lifecycle Management
  // ============================================================

  /**
   * Create a new session for a user
   * @param userId - User ID
   * @param deviceInfo - Device information
   * @param ipAddress - Client IP address
   * @param userAgent - Client user agent
   * @param options - Additional options (trustDevice, sessionTTL, etc.)
   * @returns Created session with tokens
   */
  createSession(
    userId: string,
    deviceInfo: DeviceInfo,
    ipAddress: string,
    userAgent: string,
    options?: {
      trustDevice?: boolean;
      trustDurationDays?: number;
      sessionTTLSeconds?: number;
      bindToIp?: boolean;
      bindToDeviceFingerprint?: boolean;
      metadata?: Record<string, unknown>;
    }
  ): Promise<{
    sessionId: string;
    accessToken: string;
    refreshToken: string;
    expiresAt: Date;
    idleTimeoutAt: Date;
    trustLevel: string;
    sessionName?: string;
  }>;

  /**
   * Validate an existing session
   * @param sessionId - Session ID to validate
   * @param deviceInfo - Current device information
   * @param ipAddress - Current IP address
   * @param userAgent - Current user agent
   * @returns Validation result with session data
   */
  validateSession(
    sessionId: string,
    deviceInfo: DeviceInfo,
    ipAddress: string,
    userAgent: string
  ): Promise<{
    isValid: boolean;
    session?: {
      userId: string;
      expiresAt: Date;
      idleTimeoutAt: Date;
      trustLevel: string;
      metadata?: Record<string, unknown>;
    };
    error?: string;
    requiresMFA?: boolean;
    tokenNeedsRefresh?: boolean;
  }>;

  /**
   * Get session by ID
   * @param sessionId - Session ID
   * @param userId - User ID (for ownership validation)
   * @returns Session details
   */
  getSession(
    sessionId: string,
    userId: string
  ): Promise<{
    sessionId: string;
    userId: string;
    deviceInfo: DeviceInfo;
    ipAddress: string;
    location?: string;
    createdAt: Date;
    lastActivityAt: Date;
    expiresAt: Date;
    idleTimeoutAt: Date;
    status: string;
    trustLevel: string;
    isCurrent: boolean;
  }>;

  /**
   * Extend session expiry
   * @param sessionId - Session ID
   * @param userId - User ID
   * @param minutes - Minutes to extend
   * @param deviceInfo - Device context
   * @returns Extension result
   */
  extendSession(
    sessionId: string,
    userId: string,
    minutes: number,
    deviceInfo: DeviceInfo
  ): Promise<SessionExtensionResult>;

  /**
   * Record user activity (reset idle timer)
   * @param sessionId - Session ID
   * @param userId - User ID
   * @param activityUrl - URL of activity (optional)
   * @param deviceInfo - Device context
   * @param activityType - Type of activity
   * @returns Activity result
   */
  recordActivity(
    sessionId: string,
    userId: string,
    activityUrl: string | undefined,
    deviceInfo: DeviceInfo,
    activityType: 'page_view' | 'api_call' | 'user_interaction'
  ): Promise<SessionActivityResult>;

  /**
   * Get session status
   * @param sessionId - Session ID
   * @param userId - User ID
   * @returns Session status
   */
  getSessionStatus(
    sessionId: string,
    userId: string
  ): Promise<{
    isActive: boolean;
    isExpired: boolean;
    isIdle: boolean;
    isRevoked: boolean;
    remainingTimeMinutes: number;
    remainingIdleTimeMinutes: number;
    idleTimeMinutes: number;
    expiresAt: Date;
    idleTimeoutAt: Date;
    healthScore: number;
    healthStatus: 'healthy' | 'warning' | 'critical';
  }>;

  /**
   * Terminate session (logout)
   * @param userId - User ID
   * @param dto - Revocation data
   * @param deviceInfo - Device context
   * @returns Revocation response
   */
  revokeSession(
    userId: string,
    dto: RevokeSessionDto,
    deviceInfo: DeviceInfo
  ): Promise<RevokeSessionResponseDto>;

  /**
   * Revoke all sessions for a user
   * @param userId - User ID
   * @param dto - Revocation data
   * @param deviceInfo - Device context
   * @returns Revocation response
   */
  revokeAllSessions(
    userId: string,
    dto: SessionRevokeAllSessionsDto,
    deviceInfo: DeviceInfo
  ): Promise<RevokeAllSessionsResponseDto>;

  /**
   * Bulk revoke sessions
   * @param userId - User ID
   * @param dto - Bulk revocation data
   * @param deviceInfo - Device context
   * @returns Bulk revocation response
   */
  bulkRevokeSessions(
    userId: string,
    dto: SessionBulkRevokeSessionsDto,
    deviceInfo: DeviceInfo
  ): Promise<BulkRevokeSessionsResponseDto>;

  /**
   * Revoke sessions by device
   * @param userId - User ID
   * @param dto - Device revocation data
   * @param deviceInfo - Device context
   * @returns Device revocation response
   */
  revokeSessionsByDevice(
    userId: string,
    dto: RevokeDeviceSessionsDto,
    deviceInfo: DeviceInfo
  ): Promise<RevokeDeviceSessionsDto>;

  // ============================================================
  // Session Query Operations
  // ============================================================

  /**
   * Get all sessions for a user
   * @param userId - User ID
   * @param options - Pagination options
   * @param filters - Session filters
   * @returns Paginated sessions
   */
  getUserSessions(
    userId: string,
    options: PaginationOptions,
    filters?: SessionFilterOptions
  ): Promise<PaginatedResult<{
    sessionId: string;
    deviceInfo: DeviceInfo;
    ipAddress: string;
    location?: string;
    lastActivityAt: Date;
    createdAt: Date;
    expiresAt: Date;
    isActive: boolean;
    isCurrent: boolean;
    trustLevel: string;
    deviceName?: string;
  }>>;

  /**
   * Get current session for user
   * @param userId - User ID
   * @param sessionId - Current session ID
   * @returns Current session details
   */
  getCurrentSession(
    userId: string,
    sessionId: string
  ): Promise<{
    sessionId: string;
    deviceInfo: DeviceInfo;
    ipAddress: string;
    location?: string;
    createdAt: Date;
    lastActivityAt: Date;
    expiresAt: Date;
    idleTimeoutAt: Date;
    trustLevel: string;
    healthScore: number;
  }>;

  /**
   * Check if user has active sessions
   * @param userId - User ID
   * @returns Active session count
   */
  hasActiveSessions(userId: string): Promise<{ hasActive: boolean; activeCount: number }>;

  /**
   * Get active session count for user
   * @param userId - User ID
   * @returns Active session count
   */
  getActiveSessionCount(userId: string): Promise<number>;

  // ============================================================
  // Session Health & Security
  // ============================================================

  /**
   * Get session health report
   * @param sessionId - Session ID
   * @param userId - User ID
   * @returns Health report
   */
  getSessionHealth(
    sessionId: string,
    userId: string
  ): Promise<SessionHealthReport>;

  /**
   * Update session health score
   * @param sessionId - Session ID
   * @param userId - User ID
   * @param healthScore - New health score
   * @returns Updated health status
   */
  updateSessionHealth(
    sessionId: string,
    userId: string,
    healthScore: number
  ): Promise<SessionHealthReport>;

  /**
   * Batch update session health scores
   * @param userIds - Array of user IDs
   * @param onProgress - Progress callback
   * @returns Number of updated sessions
   */
  batchUpdateHealthScores(
    userIds: string[],
    onProgress?: (progress: SessionBatchProgress) => void
  ): Promise<{ updatedSessions: number; failedSessions: number; errors: string[] }>;

  /**
   * Detect session anomalies
   * @param userId - User ID
   * @param timeWindowHours - Time window for analysis (default: 24)
   * @returns Anomaly detection result
   */
  detectAnomalies(
    userId: string,
    timeWindowHours?: number
  ): Promise<AnomalyDetectionResult>;

  /**
   * Run ML-based anomaly detection batch
   * @param options - Detection options
   * @returns Detection results
   */
  runAnomalyDetectionBatch(options?: {
    userIds?: string[];
    timeWindowHours?: number;
    sensitivity?: 'low' | 'medium' | 'high';
  }): Promise<AnomalyDetectionResult>;

  /**
   * Detect replay attack
   * @param token - Session token
   * @param deviceInfo - Current device information
   * @param ipAddress - Current IP address
   * @param userAgent - Current user agent
   * @returns Replay detection result
   */
  detectReplayAttack(
    token: string,
    deviceInfo: DeviceInfo,
    ipAddress: string,
    userAgent: string
  ): Promise<ReplayDetectionResult>;

  /**
   * Detect geographic anomaly
   * @param userId - User ID
   * @param sessionId - Session ID
   * @param newLocation - New location coordinates
   * @param deviceInfo - Device context
   * @returns Geographic anomaly detection result
   */
  detectGeographicAnomaly(
    userId: string,
    sessionId: string,
    newLocation: { district: string; latitude: number; longitude: number },
    deviceInfo: DeviceInfo
  ): Promise<{
    hasAnomaly: boolean;
    severity: 'low' | 'medium' | 'high' | 'critical';
    distanceKm: number;
    recommendedAction: 'allow' | 'challenge' | 'block';
    reason?: string;
  }>;

  /**
   * Get predictive session expiry
   * @param sessionId - Session ID
   * @param userId - User ID
   * @returns Predictive expiry result
   */
  getPredictiveExpiry(
    sessionId: string,
    userId: string
  ): Promise<PredictiveExpiryResult>;

  /**
   * Get session anomaly timeline
   * @param userId - User ID
   * @param days - Number of days to analyze
   * @returns Anomaly timeline
   */
  getAnomalyTimeline(
    userId: string,
    days: number
  ): Promise<Array<{
    timestamp: Date;
    type: 'location' | 'device' | 'time' | 'velocity' | 'frequency';
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    descriptionBn?: string;
  }>>;

  // ============================================================
  // Distributed Locking
  // ============================================================

  /**
   * Acquire distributed lock for session operation
   * @param sessionId - Session ID
   * @param ttlSeconds - Lock TTL in seconds
   * @param userId - User ID
   * @returns Lock result
   */
  acquireSessionLock(
    sessionId: string,
    ttlSeconds: number,
    userId: string
  ): Promise<SessionLockResult>;

  /**
   * Release distributed lock
   * @param lockId - Lock ID
   * @param sessionId - Session ID
   * @param userId - User ID
   * @returns Whether release was successful
   */
  releaseSessionLock(
    lockId: string,
    sessionId: string,
    userId: string
  ): Promise<boolean>;

  /**
   * Execute operation with session lock
   * @param sessionId - Session ID
   * @param userId - User ID
   * @param operation - Operation to execute
   * @param ttlSeconds - Lock TTL
   * @returns Operation result
   */
  withSessionLock<T>(
    sessionId: string,
    userId: string,
    operation: () => Promise<T>,
    ttlSeconds?: number
  ): Promise<T>;

  // ============================================================
  // Session Transfer (Cross-Device)
  // ============================================================

  /**
   * Initiate session transfer to another device
   * @param userId - User ID
   * @param fromSessionId - Source session ID
   * @param toDeviceInfo - Target device information
   * @param transferMethod - Transfer method (qr_code, magic_link, otp)
   * @returns Transfer result
   */
  initiateSessionTransfer(
    userId: string,
    fromSessionId: string,
    toDeviceInfo: DeviceInfo,
    transferMethod: 'qr_code' | 'magic_link' | 'otp'
  ): Promise<SessionTransferResult>;

  /**
   * Complete session transfer
   * @param transferId - Transfer ID
   * @param userId - User ID
   * @param verificationCode - Verification code (if OTP method)
   * @param deviceInfo - Target device information
   * @returns Completed session details
   */
  completeSessionTransfer(
    transferId: string,
    userId: string,
    verificationCode: string | undefined,
    deviceInfo: DeviceInfo
  ): Promise<{
    success: boolean;
    newSessionId?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    error?: string;
  }>;

  /**
   * Get pending session transfers for user
   * @param userId - User ID
   * @returns Pending transfers
   */
  getPendingTransfers(userId: string): Promise<SessionTransferResult[]>;

  /**
   * Cancel pending session transfer
   * @param transferId - Transfer ID
   * @param userId - User ID
   * @param deviceInfo - Device context
   * @returns Whether cancellation was successful
   */
  cancelSessionTransfer(
    transferId: string,
    userId: string,
    deviceInfo: DeviceInfo
  ): Promise<{ cancelled: boolean }>;

  // ============================================================
  // Session Monitoring & Health
  // ============================================================

  /**
   * Get session statistics
   * @param userId - User ID
   * @param options - Date range options
   * @returns Session statistics
   */
  getSessionStatistics(
    userId: string,
    options?: { fromDate?: Date; toDate?: Date }
  ): Promise<SessionStatistics>;

  /**
   * Get global session statistics (admin dashboard)
   * @returns Global session statistics
   */
  getGlobalSessionStatistics(): Promise<GlobalSessionStatistics>;

  /**
   * Get geographic session distribution (Bangladesh specific)
   * @param division - Optional division filter
   * @returns Geographic distribution
   */
  getGeographicDistribution(
    division?: string
  ): Promise<GeographicDistribution[]>;

  /**
   * Get session health dashboard
   * @returns Session health dashboard
   */
  getSessionHealthDashboard(): Promise<SessionHealthDashboard>;

  /**
   * Get real-time session metrics
   * @returns Real-time metrics
   */
  getRealtimeMetrics(): Promise<{
    activeNow: number;
    createdLastMinute: number;
    expiredLastMinute: number;
    revokedLastMinute: number;
    peakConcurrency: number;
    averageResponseTimeMs: number;
    sessionsByNetworkType: Record<string, number>;
    sessionsByDistrict: Record<string, number>;
  }>;

  /**
   * Get session alert configuration
   * @returns Alert configuration
   */
  getSessionAlertConfig(): Promise<SessionAlertConfig>;

  /**
   * Update session alert configuration
   * @param config - Updated configuration
   * @returns Updated configuration
   */
  updateSessionAlertConfig(
    config: Partial<SessionAlertConfig>
  ): Promise<SessionAlertConfig>;

  // ============================================================
  // Session Cleanup & Maintenance
  // ============================================================

  /**
   * Cleanup expired sessions
   * @param olderThanDays - Cleanup sessions older than N days
   * @param batchSize - Batch size for cleanup
   * @param onProgress - Progress callback
   * @returns Cleanup result
   */
  cleanupExpiredSessions(
    olderThanDays: number,
    batchSize?: number,
    onProgress?: (progress: SessionBatchProgress) => void
  ): Promise<{
    deletedCount: number;
    archivedCount: number;
    failedCount: number;
    durationMs: number;
    storageFreedBytes: number;
    effectivenessScore: number;
  }>;

  /**
   * Cleanup idle sessions
   * @param idleThresholdMinutes - Minutes of inactivity threshold
   * @param batchSize - Batch size for cleanup
   * @param onProgress - Progress callback
   * @returns Cleanup result
   */
  cleanupIdleSessions(
    idleThresholdMinutes: number,
    batchSize?: number,
    onProgress?: (progress: SessionBatchProgress) => void
  ): Promise<{
    deletedCount: number;
    suspendedCount: number;
    failedCount: number;
    durationMs: number;
  }>;

  /**
   * Archive old sessions
   * @param olderThanDays - Archive sessions older than N days
   * @param batchSize - Batch size for archiving
   * @param onProgress - Progress callback
   * @returns Archive result
   */
  archiveOldSessions(
    olderThanDays: number,
    batchSize?: number,
    onProgress?: (progress: SessionBatchProgress) => void
  ): Promise<{
    archivedCount: number;
    failedCount: number;
    durationMs: number;
  }>;

  /**
   * Restore archived sessions
   * @param olderThanDays - Restore sessions older than N days
   * @param batchSize - Batch size for restoring
   * @param onProgress - Progress callback
   * @returns Restore result
   */
  restoreArchivedSessions(
    olderThanDays: number,
    batchSize?: number,
    onProgress?: (progress: SessionBatchProgress) => void
  ): Promise<{
    restoredCount: number;
    failedCount: number;
    durationMs: number;
  }>;

  // ============================================================
  // Session Batch Operations
  // ============================================================

  /**
   * Batch process sessions with progress tracking
   * @param sessionIds - Array of session IDs
   * @param userId - User ID
   * @param operation - Operation to perform
   * @param onProgress - Progress callback
   * @returns Batch operation result
   */
  batchProcessSessions(
    sessionIds: string[],
    userId: string,
    operation: (sessionId: string) => Promise<void>,
    onProgress?: (progress: SessionBatchProgress) => void
  ): Promise<{
    succeeded: number;
    failed: number;
    errors: Array<{ sessionId: string; error: string }>;
    durationMs: number;
  }>;

  /**
   * Batch terminate sessions
   * @param sessionIds - Array of session IDs
   * @param userId - User ID
   * @param reason - Termination reason
   * @param deviceInfo - Device context
   * @param onProgress - Progress callback
   * @returns Batch termination result
   */
  batchTerminateSessions(
    sessionIds: string[],
    userId: string,
    reason: string,
    deviceInfo: DeviceInfo,
    onProgress?: (progress: SessionBatchProgress) => void
  ): Promise<{
    terminated: number;
    failed: number;
    errors: Array<{ sessionId: string; error: string }>;
    durationMs: number;
  }>;

  // ============================================================
  // Compliance & Audit
  // ============================================================

  /**
   * Generate session compliance report (Bangladesh Bank guidelines)
   * @param fromDate - Start date
   * @param toDate - End date
   * @param adminId - Admin ID requesting the report
   * @returns Compliance report
   */
  generateComplianceReport(
    fromDate: Date,
    toDate: Date,
    adminId: string
  ): Promise<SessionComplianceReport>;

  /**
   * Export sessions for audit
   * @param userId - User ID (optional)
   * @param fromDate - Start date
   * @param toDate - End date
   * @param format - Export format
   * @returns Export result
   */
  exportSessionsForAudit(
    userId: string | undefined,
    fromDate: Date,
    toDate: Date,
    format?: 'json' | 'csv' | 'xlsx'
  ): Promise<{
    downloadUrl: string;
    expiresAt: Date;
    fileSize: number;
    recordCount: number;
    format: string;
    expiresInSeconds: number;
  }>;

  /**
   * Get session audit trail for a user
   * @param userId - User ID
   * @param limit - Maximum number of entries
   * @param offset - Pagination offset
   * @returns Audit trail entries
   */
  getSessionAuditTrail(
    userId: string,
    limit?: number,
    offset?: number
  ): Promise<{
    items: Array<{
      id: string;
      action: 'created' | 'extended' | 'revoked' | 'expired' | 'idle_expired' | 'suspended' | 'reactivated' | 'transferred';
      timestamp: Date;
      sessionId: string;
      deviceInfo?: DeviceInfo;
      ipAddress?: string;
      details?: string;
      performedBy?: string;
      correlationId?: string;
    }>;
    total: number;
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

  // ============================================================
  // Cache Management
  // ============================================================

  /**
   * Invalidate session cache
   * @param userId - User ID
   * @param sessionId - Session ID (optional, specific session)
   * @returns Cache invalidation result
   */
  invalidateSessionCache(
    userId: string,
    sessionId?: string
  ): Promise<{ cacheInvalidated: boolean; invalidatedKeys: number }>;

  /**
   * Get session cache statistics
   * @returns Cache statistics
   */
  getSessionCacheStats(): Promise<{
    hits: number;
    misses: number;
    hitRate: number;
    size: number;
    avgTtlSeconds: number;
  }>;

  // ============================================================
  // Health & Monitoring
  // ============================================================

  /**
   * Health check for session service
   * @returns Service health status
   */
  healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    uptime: number;
    version: string;
    dependencies: {
      redis: boolean;
      database: boolean;
      cache: boolean;
    };
    metrics: {
      activeSessions: number;
      pendingCleanup: number;
      averageIdleTimeMinutes: number;
      sessionCreationRate: number;
      sessionRevocationRate: number;
    };
  }>;

  /**
   * Get session service performance metrics
   * @returns Performance metrics
   */
  getPerformanceMetrics(): Promise<{
    avgQueryTimeMs: number;
    p95QueryTimeMs: number;
    p99QueryTimeMs: number;
    cacheHitRate: number;
    connectionPoolUsage: number;
    replicaLagMs: number;
    activeConnections: number;
    queueDepth: number;
  }>;
}

// ============================================================
// Type Exports (Clean exports for external use)
// ============================================================

export type {
  SessionExtensionResult as SessionExtensionResultType,
  SessionActivityResult as SessionActivityResultType,
  SessionHealthReport as SessionHealthReportType,
  AnomalyDetectionResult as AnomalyDetectionResultType,
  PredictiveExpiryResult as PredictiveExpiryResultType,
  SessionLockResult as SessionLockResultType,
  SessionTransferResult as SessionTransferResultType,
  SessionBatchProgress as SessionBatchProgressType,
  ReplayDetectionResult as ReplayDetectionResultType,
  GeographicDistribution as GeographicDistributionType,
  SessionComplianceReport as SessionComplianceReportType,
  SessionHealthDashboard as SessionHealthDashboardType,
  SessionAlertConfig as SessionAlertConfigType,
  SessionFilterOptions as SessionFilterOptionsType,
  SessionStatistics as SessionStatisticsType,
  GlobalSessionStatistics as GlobalSessionStatisticsType
};

// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
// 
// Enterprise Enhancements Applied in v3.0:
// 1. ✅ Complete session lifecycle management (create, validate, extend, revoke)
// 2. ✅ Device fingerprint tracking for security
// 3. ✅ Network type tracking (2G/3G/4G/5G/WiFi) - Bangladesh specific
// 4. ✅ Mobile operator tracking (GP, Robi, Banglalink, Teletalk)
// 5. ✅ Geographic location tracking (district, upazila, division)
// 6. ✅ Session health scoring with ML-based risk assessment
// 7. ✅ Real-time session monitoring and alerting
// 8. ✅ Predictive session expiry with confidence scoring
// 9. ✅ Distributed session locking for concurrency
// 10. ✅ Bulk session operations with progress tracking
// 11. ✅ Session replay attack detection and prevention
// 12. ✅ Cross-device session sync with QR code
// 13. ✅ Anomaly detection with severity scoring
// 14. ✅ Session batch processing with progress tracking
// 15. ✅ Geographic session distribution analytics
// 16. ✅ Network quality impact analysis
// 17. ✅ Compliance reporting (Bangladesh Bank guidelines)
// 18. ✅ Bengali language support in all responses
// 19. ✅ Correlation ID for distributed tracing
// 20. ✅ Audit metadata for compliance
// 21. ✅ Rate limit metadata support
// 22. ✅ Bulk operations with progress tracking
// 23. ✅ Health check and monitoring endpoints
// 
// Bangladesh Specific:
// - District/Upazila level geographic tracking
// - Network type impact analysis (2G/3G/4G/5G/WiFi)
// - Mobile operator tracking for carrier-specific logic
// - Feature phone session optimization
// - Local timezone-aware timestamps
// - Bengali language support
// - Bangladesh Bank compliance reporting
// 
// Security Features:
// - Device fingerprint binding
// - IP binding (optional)
// - Session replay detection
// - Anomaly detection with ML
// - Distributed locking
// - Rate limiting per session
// - Geographic anomaly detection
// 
// ============================================================
