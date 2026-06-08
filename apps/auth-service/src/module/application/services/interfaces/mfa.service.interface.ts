/**
 * MFA Service Interface - Pure Domain Contract (Enterprise Enhanced v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/mfa.service.interface
 * 
 * @description
 * Service contract for Multi-Factor Authentication operations with enterprise features.
 * NO implementation - ONLY method signatures.
 * 
 * ENTERPRISE ENHANCEMENTS (v3.0):
 * ✅ Risk-based adaptive MFA (risk score based method selection)
 * ✅ Offline MFA code support (for poor network areas in Bangladesh)
 * ✅ MFA method recommendation engine (based on user device/behavior)
 * ✅ Cross-device MFA sync with QR code (Bangladesh specific)
 * ✅ MFA method compatibility matrix (feature phone support)
 * ✅ Backup code regeneration reminder (auto-notification)
 * ✅ MFA adoption analytics with ML predictions
 * ✅ Geo-IP based MFA method suggestion (district/division level)
 * ✅ MFA health score and recommendations
 * ✅ Bulk MFA operations for enterprises
 * ✅ Real-time MFA monitoring dashboard
 * ✅ Compliance reporting (Bangladesh Bank guidelines)
 * 
 * Enterprise Rules:
 * ✅ ONLY interface definitions
 * ✅ No business logic
 * ✅ No infrastructure imports
 * ✅ No framework decorators
 * ✅ Complete DTO-based contract
 * ✅ Bangladesh specific - WhatsApp, Imo, bKash, Nagad, Rocket MFA support
 * ✅ DeviceInfo from shared-types for consistency
 */

import { 
  EnableMfaDto, 
  EnableMfaResponseDto,
  MFAStatusResponseDto 
} from '../../dtos/mfa/enable-mfa.dto';
import { 
  VerifyMfaDto, 
  MfaVerifyResponseDto,
  MfaVerificationResponseDto
} from '../../dtos/mfa/verify-mfa.dto';
import { 
  DisableMfaDto, 
  DisableMfaResponseDto 
} from '../../dtos/mfa/disable-mfa.dto';
import { MfaBackupCodesResponseDto } from '../../mappers/mfa.mapper';

// ✅ Phase-1 (shared-types) থেকে ইম্পোর্ট - DeviceInfo centralized
import type { 
  DeviceInfo as SharedDeviceInfo, 
  MFAType, 
  MFAStatus,
  AuditMetadata,
  RequestContext,
  PaginationOptions,
  PaginatedResult,
  BulkOperationProgress
} from '@vubon/shared-types';

// ============================================================
// Types (Re-export shared types for convenience)
// ============================================================

/**
 * Device information interface (Bangladesh specific)
 * Re-exported from shared-types for consistency across all services
 */
export type DeviceInfo = SharedDeviceInfo;

/**
 * MFA type enum (Bangladesh specific)
 * Should be imported from shared-constants in implementation
 */
export type { MFAType, MFAStatus };

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 1: Risk-Based Adaptive MFA
// ============================================================

/**
 * Risk assessment for adaptive MFA
 */
export interface MFARiskAssessment {
  /** Risk score (0-100) */
  riskScore: number;
  /** Risk level classification */
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  /** Whether MFA is required based on risk */
  requiresMFA: boolean;
  /** Recommended MFA methods based on risk */
  recommendedMethods: MFAType[];
  /** Why MFA is required (if required) */
  reason?: string;
  /** Reason in Bengali */
  reasonBn?: string;
  /** Risk factors contributing to the score */
  riskFactors: Array<{
    factor: string;
    score: number;
    weight: number;
    description: string;
  }>;
}

/**
 * Adaptive MFA request context
 */
export interface AdaptiveMFARequest {
  /** User ID */
  userId: string;
  /** Operation type (login, payment, sensitive_change) */
  operationType: 'login' | 'payment' | 'sensitive_change' | 'high_value_order';
  /** Transaction amount (for payment operations) */
  amount?: number;
  /** Device information */
  deviceInfo: DeviceInfo;
  /** IP address */
  ipAddress: string;
  /** User agent */
  userAgent: string;
  /** Timestamp of request */
  timestamp: Date;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 2: Offline MFA Support (Bangladesh)
// ============================================================

/**
 * Offline MFA code for poor network areas
 */
export interface OfflineMFACode {
  /** The offline code value */
  code: string;
  /** When the code was generated */
  generatedAt: Date;
  /** When the code expires */
  expiresAt: Date;
  /** Whether the code has been used */
  used: boolean;
  /** When the code was used (if used) */
  usedAt?: Date;
  /** Session ID associated with this code */
  sessionId?: string;
}

/**
 * Generate offline MFA codes request
 */
export interface GenerateOfflineCodesRequest {
  /** User ID */
  userId: string;
  /** Number of codes to generate (default: 10, max: 20) */
  count?: number;
  /** Expiry in days (default: 30, max: 90) */
  expiryDays?: number;
  /** Device information for audit */
  deviceInfo: DeviceInfo;
}

/**
 * Generate offline MFA codes response
 */
export interface GenerateOfflineCodesResponse {
  /** Generated offline codes (plain text - one-time display) */
  codes: string[];
  /** When codes expire */
  expiresAt: Date;
  /** Number of codes generated */
  count: number;
  /** Warning message about keeping codes secure */
  warningMessage: string;
  /** Warning message in Bengali */
  warningMessageBn?: string;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 3: MFA Method Recommendation Engine
// ============================================================

/**
 * MFA method recommendation result
 */
export interface MFAMethodRecommendation {
  /** Recommended MFA method */
  recommendedMethod: MFAType;
  /** Alternative methods (fallback options) */
  alternativeMethods: MFAType[];
  /** Confidence score (0-100) */
  confidenceScore: number;
  /** Reasons for recommendation */
  reasons: string[];
  /** Reasons in Bengali */
  reasonsBn?: string[];
  /** Whether user preference was matched */
  userPreferenceMatched: boolean;
  /** Whether device is compatible with recommended method */
  deviceCompatible: boolean;
  /** Setup instructions */
  setupInstructions?: string;
  /** Setup instructions in Bengali */
  setupInstructionsBn?: string;
}

/**
 * MFA method compatibility information
 */
export interface MFAMethodCompatibility {
  /** MFA method */
  method: MFAType;
  /** Compatible device types */
  compatibleDevices: ('mobile' | 'desktop' | 'tablet' | 'feature_phone')[];
  /** Requires internet connection */
  requiresInternet: boolean;
  /** Recommended network type */
  networkRecommendation: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'any';
  /** Level of support in Bangladesh */
  bangladeshSupport: 'full' | 'partial' | 'limited';
  /** Popularity rank in Bangladesh (1 = most popular) */
  popularityRank: number;
  /** Security level (1-5) */
  securityLevel: 1 | 2 | 3 | 4 | 5;
  /** Ease of use (1-5) */
  easeOfUse: 1 | 2 | 3 | 4 | 5;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 4: Cross-Device MFA Sync
// ============================================================

/**
 * Cross-device MFA sync request
 */
export interface CrossDeviceMFASyncRequest {
  /** Source user ID (where MFA is already set up) */
  sourceUserId: string;
  /** Target user ID (where MFA needs to be synced) */
  targetUserId: string;
  /** MFA methods to sync */
  methodsToSync: MFAType[];
  /** QR code data for verification */
  qrCodeData?: string;
  /** Sync token for verification */
  syncToken?: string;
  /** Expiry time for the sync request */
  expiresAt: Date;
  /** Request status */
  status: 'pending' | 'approved' | 'rejected' | 'expired' | 'completed';
}

/**
 * Cross-device MFA sync result
 */
export interface CrossDeviceMFASyncResult {
  /** Whether sync was successful */
  success: boolean;
  /** Synced method IDs */
  syncedMethodIds: string[];
  /** Failed methods with reasons */
  failedMethods: Array<{ method: MFAType; reason: string }>;
  /** New session ID if auto-login after sync */
  newSessionId?: string;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 5: MFA Health Score
// ============================================================

/**
 * MFA health score for a user
 */
export interface MFAHealthScore {
  /** User ID */
  userId: string;
  /** Health score (0-100) */
  score: number;
  /** Health status classification */
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  /** Breakdown of factors */
  factors: {
    /** Having multiple MFA methods */
    methodCount: { score: number; weight: number; description: string };
    /** Using strong MFA methods (WebAuthn > TOTP > SMS) */
    methodStrength: { score: number; weight: number; description: string };
    /** Backup codes available and not expired */
    backupCodes: { score: number; weight: number; description: string };
    /** Recovery options configured */
    recoveryOptions: { score: number; weight: number; description: string };
    /** Recent verification success rate */
    verificationSuccessRate: { score: number; weight: number; description: string };
  };
  /** Recommendations to improve score */
  recommendations: string[];
  /** Recommendations in Bengali */
  recommendationsBn?: string[];
  /** Requires user action */
  requiresAction: boolean;
  /** Suggested action type */
  suggestedAction?: 'add_method' | 'regenerate_backup_codes' | 'setup_recovery' | 'verify_method';
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 6: Bulk MFA Operations
// ============================================================

/**
 * Bulk MFA operation result
 */
export interface BulkMFAResult {
  /** Total users requested */
  totalRequested: number;
  /** Successful operations */
  successful: number;
  /** Failed operations */
  failed: number;
  /** Skipped operations */
  skipped: number;
  /** Failed details */
  failures: Array<{ userId: string; error: string }>;
  /** Operation progress */
  progress: BulkOperationProgress;
  /** Duration in milliseconds */
  durationMs: number;
  /** Operation type */
  operationType: 'enable' | 'disable' | 'regenerate_codes' | 'reset_lock';
}

/**
 * Bulk MFA enable request
 */
export interface BulkMFAEnableRequest {
  /** User IDs to enable MFA for */
  userIds: string[];
  /** MFA method to enable */
  method: MFAType;
  /** Admin ID performing the operation */
  adminId: string;
  /** Reason for bulk enable */
  reason: string;
  /** Notify users after enable */
  notifyUsers?: boolean;
  /** Force enable even if user has existing MFA */
  force?: boolean;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 7: MFA Monitoring Dashboard
// ============================================================

/**
 * Real-time MFA monitoring metrics
 */
export interface MFAMonitoringMetrics {
  /** Total number of MFA verifications in last hour */
  verificationsLastHour: number;
  /** Success rate in last hour (percentage) */
  successRateLastHour: number;
  /** Failed attempts in last hour */
  failedAttemptsLastHour: number;
  /** Locked accounts in last hour */
  lockedAccountsLastHour: number;
  /** Average verification time in milliseconds */
  averageVerificationTimeMs: number;
  /** P95 verification time */
  p95VerificationTimeMs: number;
  /** P99 verification time */
  p99VerificationTimeMs: number;
  /** Active MFA sessions */
  activeSessions: number;
  /** Methods distribution */
  methodsDistribution: Record<MFAType, number>;
  /** Top failure reasons */
  topFailureReasons: Array<{ reason: string; count: number }>;
  /** Alerts triggered */
  activeAlerts: Array<{
    id: string;
    severity: 'info' | 'warning' | 'critical';
    message: string;
    timestamp: Date;
  }>;
}

/**
 * MFA alert configuration
 */
export interface MFAAlertConfig {
  /** Alert when success rate drops below this threshold */
  successRateThreshold: number;  // default: 90
  /** Alert when failed attempts exceed this count */
  failedAttemptsThreshold: number;  // default: 100
  /** Alert when lockouts exceed this count */
  lockoutThreshold: number;  // default: 50
  /** Alert when verification time exceeds this (ms) */
  latencyThresholdMs: number;  // default: 5000
  /** Notification channels */
  channels: ('email' | 'sms' | 'slack' | 'webhook')[];
  /** Cooldown minutes between alerts */
  cooldownMinutes: number;  // default: 5
  /** Enable/disable alerting */
  enabled: boolean;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 8: MFA Compliance Report
// ============================================================

/**
 * MFA compliance report (Bangladesh Bank guidelines)
 */
export interface MFAComplianceReport {
  /** Report ID */
  reportId: string;
  /** When report was generated */
  generatedAt: Date;
  /** Report period */
  period: { from: Date; to: Date };
  /** Summary statistics */
  summary: {
    totalUsers: number;
    mfaEnabledUsers: number;
    mfaEnabledPercentage: number;
    usersWithStrongMFA: number;  // WebAuthn or TOTP
    usersWithWeakMFA: number;    // SMS or Email only
    compliantUsers: number;
    complianceRate: number;
  };
  /** Breakdown by user tier */
  byUserTier: Array<{
    tier: string;
    totalUsers: number;
    mfaEnabled: number;
    complianceRate: number;
  }>;
  /** Breakdown by district (Bangladesh) */
  byDistrict: Array<{
    district: string;
    totalUsers: number;
    mfaEnabled: number;
    complianceRate: number;
  }>;
  /** Non-compliant users requiring action */
  nonCompliantUsers: Array<{
    userId: string;
    email: string;
    currentMFAMethod: MFAType | null;
    recommendedAction: string;
  }>;
  /** Recommendations for improving compliance */
  recommendations: string[];
  /** Export URL for full report */
  exportUrl: string;
  /** Report expires at */
  expiresAt: Date;
}

// ============================================================
// Backup Code Verification Result
// ============================================================

export interface BackupCodeVerificationResult {
  isValid: boolean;
  remainingCodes: number;
  warning?: string;
  warningBn?: string;
  isLow: boolean;
}

// ============================================================
// MFA Method Info
// ============================================================

export interface MFAMethodInfo {
  id: string;
  type: string;
  typeDisplayName: string;
  typeDisplayNameBn?: string;
  identifier: string;
  maskedIdentifier: string;
  isPrimary: boolean;
  isVerified: boolean;
  createdAt: Date;
  lastUsedAt?: Date;
}

// ============================================================
// MFA Lock Status
// ============================================================

export interface MFALockStatus {
  isLocked: boolean;
  remainingMinutes: number;
  remainingSeconds: number;
  lockedAt?: Date;
  expiresAt?: Date;
}

// ============================================================
// MFA Recovery Options
// ============================================================

export interface MFARecoveryOptions {
  hasBackupCodes: boolean;
  remainingBackupCodes: number;
  hasRecoveryEmail: boolean;
  recoveryEmail?: string;
  maskedRecoveryEmail?: string;
  hasRecoveryPhone: boolean;
  recoveryPhone?: string;
  maskedRecoveryPhone?: string;
}

// ============================================================
// MFA Statistics
// ============================================================

export interface MFAStatistics {
  totalUsers: number;
  mfaEnabledCount: number;
  mfaEnabledPercentage: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  adoptionRate: number;
  // Bangladesh specific
  mfaByOperator?: Record<string, number>;
  mfaByDistrict?: Array<{ district: string; count: number }>;
  monthlyAdoptionTrend?: Array<{ month: string; count: number }>;
}

// ============================================================
// Verify Code DTO
// ============================================================

export interface VerifyCodeDto {
  code: string;
  methodId?: string;
  type?: string;
}

// ============================================================
// Recovery Initiation Result
// ============================================================

export interface RecoveryInitiationResult {
  recoverySessionId: string;
  expiresIn: number;
  remainingAttempts: number;
  maskedRecoveryEmail?: string;
  maskedRecoveryPhone?: string;
}

// ============================================================
// Recovery Completion Result
// ============================================================

export interface RecoveryCompletionResult {
  success: boolean;
  sessionId?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  message?: string;
  messageBn?: string;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 9: Geo-IP Based MFA Suggestion
// ============================================================

/**
 * Geo-location based MFA method suggestion
 */
export interface GeoMfaSuggestion {
  /** User's district (from IP geolocation) */
  district: string;
  /** User's division */
  division: string;
  /** Recommended MFA method based on location */
  recommendedMethod: MFAType;
  /** Alternative methods popular in this area */
  alternativeMethods: MFAType[];
  /** Reason for recommendation */
  reason: string;
  /** Reason in Bengali */
  reasonBn?: string;
  /** Confidence score (0-100) */
  confidenceScore: number;
  /** Local popularity rank */
  localPopularityRank: number;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 10: MFA Prediction Analytics
// ============================================================

/**
 * MFA adoption prediction
 */
export interface MFAAdoptionPrediction {
  /** Predicted MFA adoption rate in next month */
  predictedAdoptionRate: number;
  /** Confidence interval (lower bound) */
  lowerBound: number;
  /** Confidence interval (upper bound) */
  upperBound: number;
  /** Confidence level (0-100) */
  confidenceLevel: number;
  /** Contributing factors */
  factors: Array<{
    factor: string;
    impact: number;  // positive or negative
    description: string;
  }>;
  /** Recommended actions to improve adoption */
  recommendations: string[];
}

// ============================================================
// Main MFA Service Interface
// ============================================================

export interface MfaService {
  // ============================================================
  // MFA Setup
  // ============================================================
  
  /**
   * Enable MFA for user (initiate setup)
   * @param userId - User ID from JWT
   * @param dto - MFA configuration
   * @param deviceInfo - Device context
   * @returns Setup response with secret, QR code, backup codes
   */
  enableMfa(
    userId: string,
    dto: EnableMfaDto,
    deviceInfo: DeviceInfo
  ): Promise<EnableMfaResponseDto>;
  
  /**
   * Verify and complete MFA setup
   * @param userId - User ID from JWT
   * @param dto - Verification data (improved: using VerifyCodeDto)
   * @param deviceInfo - Device context
   * @returns Verification response
   */
  verifyMfaSetup(
    userId: string,
    dto: VerifyCodeDto,
    deviceInfo: DeviceInfo
  ): Promise<MfaVerificationResponseDto>;
  
  /**
   * Verify and complete MFA setup with method ID (simplified)
   * @param userId - User ID from JWT
   * @param methodId - MFA method ID
   * @param code - Verification code
   * @param deviceInfo - Device context
   * @returns Verification response
   */
  verifyMfaSetupWithMethodId(
    userId: string,
    methodId: string,
    code: string,
    deviceInfo: DeviceInfo
  ): Promise<MfaVerificationResponseDto>;
  
  // ============================================================
  // MFA Verification
  // ============================================================
  
  /**
   * Verify MFA code during login
   * @param userId - User ID from MFA session
   * @param dto - Verification data
   * @param deviceInfo - Device context
   * @returns Verification response with login tokens on success
   */
  verifyMfa(
    userId: string,
    dto: VerifyMfaDto,
    deviceInfo: DeviceInfo
  ): Promise<MfaVerifyResponseDto>;
  
  /**
   * Verify backup code
   * @param userId - User ID
   * @param backupCode - Backup code to verify
   * @param deviceInfo - Device context
   * @returns Verification result
   */
  verifyBackupCode(
    userId: string,
    backupCode: string,
    deviceInfo: DeviceInfo
  ): Promise<BackupCodeVerificationResult>;
  
  /**
   * Verify recovery code (for account recovery)
   * @param userId - User ID
   * @param recoveryCode - Recovery code
   * @param deviceInfo - Device context
   * @returns Verification result with temporary access token
   */
  verifyRecoveryCode(
    userId: string,
    recoveryCode: string,
    deviceInfo: DeviceInfo
  ): Promise<{ isValid: boolean; temporaryAccessToken?: string; expiresIn?: number }>;
  
  // ============================================================
  // MFA Management
  // ============================================================
  
  /**
   * Disable MFA for user
   * @param userId - User ID from JWT
   * @param dto - Disable request data
   * @param deviceInfo - Device context
   * @returns Disable response
   */
  disableMfa(
    userId: string,
    dto: DisableMfaDto,
    deviceInfo: DeviceInfo
  ): Promise<DisableMfaResponseDto>;
  
  /**
   * Get MFA status for user
   * @param userId - User ID
   * @returns MFA status response
   */
  getMfaStatus(userId: string): Promise<MFAStatusResponseDto>;
  
  /**
   * Get detailed MFA status for user (admin view)
   * @param userId - User ID
   * @param adminId - Admin ID requesting (for audit)
   * @returns Detailed MFA status
   */
  getDetailedMfaStatus(
    userId: string,
    adminId: string
  ): Promise<MFAStatusResponseDto>;
  
  /**
   * Get all MFA methods for user
   * @param userId - User ID
   * @returns Array of MFA methods
   */
  getUserMfaMethods(userId: string): Promise<MFAMethodInfo[]>;
  
  /**
   * Set primary MFA method
   * @param userId - User ID
   * @param methodId - Method ID to set as primary
   * @param deviceInfo - Device context
   * @returns void
   */
  setPrimaryMfaMethod(
    userId: string,
    methodId: string,
    deviceInfo: DeviceInfo
  ): Promise<void>;
  
  /**
   * Remove MFA method
   * @param userId - User ID
   * @param methodId - Method ID to remove
   * @param deviceInfo - Device context
   * @returns void
   */
  removeMfaMethod(
    userId: string,
    methodId: string,
    deviceInfo: DeviceInfo
  ): Promise<void>;
  
  // ============================================================
  // Backup Codes Management
  // ============================================================
  
  /**
   * Generate new backup codes
   * @param userId - User ID
   * @param deviceInfo - Device context
   * @returns Backup codes response
   */
  generateBackupCodes(
    userId: string,
    deviceInfo: DeviceInfo
  ): Promise<MfaBackupCodesResponseDto>;
  
  /**
   * Regenerate backup codes (invalidate old ones)
   * @param userId - User ID
   * @param deviceInfo - Device context
   * @returns New backup codes
   */
  regenerateBackupCodes(
    userId: string,
    deviceInfo: DeviceInfo
  ): Promise<MfaBackupCodesResponseDto>;
  
  /**
   * Get remaining backup codes count
   * @param userId - User ID
   * @returns Remaining count
   */
  getRemainingBackupCodesCount(userId: string): Promise<number>;
  
  /**
   * Get backup codes (masked) for user
   * @param userId - User ID
   * @returns Masked backup codes for display
   */
  getMaskedBackupCodes(userId: string): Promise<{ codes: string[]; remainingCount: number }>;
  
  // ============================================================
  // MFA Lock Management
  // ============================================================
  
  /**
   * Check if MFA is locked for user
   * @param userId - User ID
   * @returns Lock status and remaining lock time
   */
  isMfaLocked(userId: string): Promise<MFALockStatus>;
  
  /**
   * Get remaining verification attempts
   * @param userId - User ID
   * @returns Remaining attempts
   */
  getRemainingVerificationAttempts(userId: string): Promise<number>;
  
  /**
   * Reset MFA lock (admin action)
   * @param userId - User ID
   * @param adminId - Admin ID
   * @param deviceInfo - Device context
   * @param reason - Reason for reset (for audit)
   * @returns void
   */
  resetMfaLock(
    userId: string,
    adminId: string,
    deviceInfo: DeviceInfo,
    reason?: string
  ): Promise<void>;
  
  // ============================================================
  // Recovery Options
  // ============================================================
  
  /**
   * Get MFA recovery options for user
   * @param userId - User ID
   * @returns Recovery options
   */
  getRecoveryOptions(userId: string): Promise<MFARecoveryOptions>;
  
  /**
   * Initiate MFA recovery flow
   * @param userId - User ID
   * @param deviceInfo - Device context
   * @returns Recovery session result with session ID
   */
  initiateRecovery(
    userId: string,
    deviceInfo: DeviceInfo
  ): Promise<RecoveryInitiationResult>;
  
  /**
   * Complete MFA recovery
   * @param userId - User ID
   * @param recoverySessionId - Recovery session ID
   * @param recoveryCode - Recovery code
   * @param newPassword - Optional new password
   * @param deviceInfo - Device context
   * @returns Recovery completion result
   */
  completeRecovery(
    userId: string,
    recoverySessionId: string,
    recoveryCode: string,
    newPassword?: string,
    deviceInfo?: DeviceInfo
  ): Promise<RecoveryCompletionResult>;
  
  // ============================================================
  // Admin Operations
  // ============================================================
  
  /**
   * Force disable MFA for user (admin only)
   * @param userId - User ID
   * @param adminId - Admin ID
   * @param reason - Reason for disable
   * @param deviceInfo - Device context
   * @returns void
   */
  forceDisableMfa(
    userId: string,
    adminId: string,
    reason: string,
    deviceInfo: DeviceInfo
  ): Promise<void>;
  
  /**
   * Force enable MFA for user (admin only)
   * @param userId - User ID
   * @param adminId - Admin ID
   * @param type - MFA type to enable
   * @param deviceInfo - Device context
   * @returns Setup response
   */
  forceEnableMfa(
    userId: string,
    adminId: string,
    type: MFAType,
    deviceInfo: DeviceInfo
  ): Promise<EnableMfaResponseDto>;
  
  /**
   * Get MFA statistics (admin dashboard)
   * @returns MFA statistics
   */
  getMfaStatistics(): Promise<MFAStatistics>;
  
  /**
   * Get MFA adoption trend
   * @param months - Number of months to analyze (default: 12)
   * @returns Adoption trend data
   */
  getMfaAdoptionTrend(months?: number): Promise<Array<{ month: string; enabledCount: number; totalUsers: number; percentage: number }>>;
  
  /**
   * Export MFA data for audit
   * @param fromDate - Start date
   * @param toDate - End date
   * @param adminId - Admin ID
   * @param format - Export format ('json' | 'csv' | 'xlsx')
   * @returns MFA audit data (string for CSV/JSON, Buffer for XLSX)
   */
  exportMfaAuditData(
    fromDate: Date,
    toDate: Date,
    adminId: string,
    format?: 'json' | 'csv' | 'xlsx'
  ): Promise<string | Buffer>;
  
  /**
   * Get MFA audit trail for user
   * @param userId - User ID
   * @param limit - Maximum number of entries
   * @param offset - Pagination offset
   * @returns Audit trail entries
   */
  getMfaAuditTrail(
    userId: string,
    limit?: number,
    offset?: number
  ): Promise<{
    items: Array<{
      id: string;
      action: 'enabled' | 'disabled' | 'verified' | 'failed' | 'locked' | 'unlocked' | 'backup_code_used';
      timestamp: Date;
      methodType?: string;
      ipAddress?: string;
      deviceId?: string;
      details?: string;
    }>;
    total: number;
  }>;
  
  // ============================================================
  // ✅ ENTERPRISE ENHANCEMENT 1: Risk-Based Adaptive MFA
  // ============================================================
  
  /**
   * Assess risk for MFA requirement
   * @param request - Adaptive MFA request context
   * @returns Risk assessment result
   */
  assessMFARisk(request: AdaptiveMFARequest): Promise<MFARiskAssessment>;
  
  /**
   * Get adaptive MFA requirement based on risk
   * @param request - Adaptive MFA request
   * @returns MFA requirement with recommended methods
   */
  getAdaptiveMFARequirement(request: AdaptiveMFARequest): Promise<MFARiskAssessment>;
  
  /**
   * Calculate risk score for a login attempt
   * @param userId - User ID
   * @param deviceInfo - Device information
   * @param ipAddress - IP address
   * @returns Risk score (0-100)
   */
  calculateRiskScore(
    userId: string,
    deviceInfo: DeviceInfo,
    ipAddress: string
  ): Promise<number>;
  
  // ============================================================
  // ✅ ENTERPRISE ENHANCEMENT 2: Offline MFA Support (Bangladesh)
  // ============================================================
  
  /**
   * Generate offline MFA codes for poor network areas
   * @param request - Generate offline codes request
   * @returns Generated offline codes
   */
  generateOfflineCodes(request: GenerateOfflineCodesRequest): Promise<GenerateOfflineCodesResponse>;
  
  /**
   * Verify offline MFA code
   * @param userId - User ID
   * @param code - Offline code to verify
   * @param deviceInfo - Device context
   * @returns True if code is valid
   */
  verifyOfflineCode(
    userId: string,
    code: string,
    deviceInfo: DeviceInfo
  ): Promise<boolean>;
  
  /**
   * Get unused offline MFA codes for user
   * @param userId - User ID
   * @returns Array of unused offline codes
   */
  getUnusedOfflineCodes(userId: string): Promise<OfflineMFACode[]>;
  
  // ============================================================
  // ✅ ENTERPRISE ENHANCEMENT 3: MFA Method Recommendation
  // ============================================================
  
  /**
   * Recommend best MFA method for user
   * @param userId - User ID
   * @param deviceInfo - Device information
   * @param userPreferences - Optional user preferences
   * @returns Method recommendation
   */
  recommendMFAMethod(
    userId: string,
    deviceInfo: DeviceInfo,
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
  
  // ============================================================
  // ✅ ENTERPRISE ENHANCEMENT 4: Cross-Device MFA Sync
  // ============================================================
  
  /**
   * Create cross-device MFA sync request
   * @param sourceUserId - Source user ID
   * @param targetUserId - Target user ID
   * @param methodsToSync - MFA methods to sync
   * @param deviceInfo - Device context
   * @returns Sync request ID
   */
  createCrossDeviceSyncRequest(
    sourceUserId: string,
    targetUserId: string,
    methodsToSync: MFAType[],
    deviceInfo: DeviceInfo
  ): Promise<string>;
  
  /**
   * Approve cross-device MFA sync
   * @param requestId - Sync request ID
   * @param approvedBy - User ID approving the sync
   * @param deviceInfo - Device context
   * @returns Sync result
   */
  approveCrossDeviceSync(
    requestId: string,
    approvedBy: string,
    deviceInfo: DeviceInfo
  ): Promise<CrossDeviceMFASyncResult>;
  
  /**
   * Get pending cross-device sync requests for user
   * @param userId - User ID
   * @returns Array of pending sync requests
   */
  getPendingSyncRequests(userId: string): Promise<CrossDeviceMFASyncRequest[]>;
  
  /**
   * Generate QR code for cross-device MFA sync
   * @param requestId - Sync request ID
   * @returns QR code data URL
   */
  generateSyncQRCode(requestId: string): Promise<{ qrCodeDataUrl: string; expiresAt: Date }>;
  
  // ============================================================
  // ✅ ENTERPRISE ENHANCEMENT 5: MFA Health Score
  // ============================================================
  
  /**
   * Get MFA health score for a user
   * @param userId - User ID
   * @returns Health score with recommendations
   */
  getMFAHealthScore(userId: string): Promise<MFAHealthScore>;
  
  /**
   * Batch get MFA health scores for multiple users
   * @param userIds - Array of user IDs
   * @returns Map of user ID to health score
   */
  batchGetMFAHealthScores(userIds: string[]): Promise<Map<string, MFAHealthScore>>;
  
  /**
   * Get users with poor MFA health (score below threshold)
   * @param threshold - Health score threshold (default: 50)
   * @param options - Pagination options
   * @returns Paginated users with poor health
   */
  getUsersWithPoorMFAHealth(
    threshold?: number,
    options?: PaginationOptions
  ): Promise<PaginatedResult<{ userId: string; healthScore: MFAHealthScore }>>;
  
  // ============================================================
  // ✅ ENTERPRISE ENHANCEMENT 6: Bulk MFA Operations
  // ============================================================
  
  /**
   * Bulk enable MFA for multiple users (enterprise feature)
   * @param request - Bulk enable request
   * @param onProgress - Progress callback
   * @returns Bulk operation result
   */
  bulkEnableMFA(
    request: BulkMFAEnableRequest,
    onProgress?: (progress: BulkOperationProgress) => void
  ): Promise<BulkMFAResult>;
  
  /**
   * Bulk disable MFA for multiple users (admin only)
   * @param userIds - Array of user IDs
   * @param adminId - Admin ID
   * @param reason - Reason for disable
   * @param onProgress - Progress callback
   * @returns Bulk operation result
   */
  bulkDisableMFA(
    userIds: string[],
    adminId: string,
    reason: string,
    onProgress?: (progress: BulkOperationProgress) => void
  ): Promise<BulkMFAResult>;
  
  /**
   * Bulk regenerate backup codes for multiple users
   * @param userIds - Array of user IDs
   * @param adminId - Admin ID
   * @param onProgress - Progress callback
   * @returns Bulk operation result
   */
  bulkRegenerateBackupCodes(
    userIds: string[],
    adminId: string,
    onProgress?: (progress: BulkOperationProgress) => void
  ): Promise<BulkMFAResult>;
  
  // ============================================================
  // ✅ ENTERPRISE ENHANCEMENT 7: MFA Monitoring Dashboard
  // ============================================================
  
  /**
   * Get real-time MFA monitoring metrics
   * @returns Monitoring metrics
   */
  getMFAMonitoringMetrics(): Promise<MFAMonitoringMetrics>;
  
  /**
   * Get MFA alert configuration
   * @returns Alert configuration
   */
  getMFAAlertConfig(): Promise<MFAAlertConfig>;
  
  /**
   * Update MFA alert configuration
   * @param config - Updated configuration
   * @returns Updated configuration
   */
  updateMFAAlertConfig(config: Partial<MFAAlertConfig>): Promise<MFAAlertConfig>;
  
  /**
   * Get MFA alerts (active and historical)
   * @param activeOnly - Only active (not resolved) alerts
   * @param limit - Maximum number of alerts
   * @returns Alerts
   */
  getMFAAlerts(activeOnly?: boolean, limit?: number): Promise<{
    items: Array<{
      id: string;
      severity: 'info' | 'warning' | 'critical';
      message: string;
      triggeredAt: Date;
      resolvedAt?: Date;
      resolvedBy?: string;
    }>;
    total: number;
  }>;
  
  // ============================================================
  // ✅ ENTERPRISE ENHANCEMENT 8: MFA Compliance Reporting
  // ============================================================
  
  /**
   * Generate compliance report (Bangladesh Bank guidelines)
   * @param fromDate - Start date
   * @param toDate - End date
   * @param adminId - Admin ID requesting the report
   * @returns Compliance report
   */
  generateComplianceReport(
    fromDate: Date,
    toDate: Date,
    adminId: string
  ): Promise<MFAComplianceReport>;
  
  /**
   * Export compliance report for audit
   * @param reportId - Report ID
   * @param format - Export format
   * @returns Export data
   */
  exportComplianceReport(
    reportId: string,
    format?: 'pdf' | 'csv' | 'xlsx'
  ): Promise<Buffer>;
  
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
  // ✅ ENTERPRISE ENHANCEMENT 9: Geo-IP Based MFA Suggestion
  // ============================================================
  
  /**
   * Get geo-location based MFA method suggestion
   * @param ipAddress - User's IP address
   * @param deviceInfo - Device information
   * @returns Suggested MFA methods based on location
   */
  getGeoSuggestion(
    ipAddress: string,
    deviceInfo: DeviceInfo
  ): Promise<GeoMfaSuggestion>;
  
  /**
   * Get popular MFA methods by district (Bangladesh)
   * @param district - District name
   * @returns Popular methods in the district
   */
  getPopularMethodsByDistrict(district: string): Promise<Array<{ method: MFAType; popularity: number }>>;
  
  // ============================================================
  // ✅ ENTERPRISE ENHANCEMENT 10: MFA Prediction Analytics
  // ============================================================
  
  /**
   * Predict MFA adoption for next month
   * @param options - Prediction options
   * @returns Adoption prediction
   */
  predictMFAAdoption(options?: { includeFactors?: boolean }): Promise<MFAAdoptionPrediction>;
  
  /**
   * Predict MFA method adoption for new users
   * @param userSegment - User segment (e.g., 'mobile', 'desktop', 'feature_phone')
   * @returns Predicted adoption by method
   */
  predictMethodAdoption(userSegment: string): Promise<Record<MFAType, number>>;
  
  /**
   * Get MFA conversion funnel analytics
   * @returns Funnel data (viewed → started → completed → active)
   */
  getMFAAnalytics(): Promise<{
    viewed: number;
    started: number;
    completed: number;
    active: number;
    dropoffRates: Record<string, number>;
    averageSetupTimeMinutes: number;
    medianSetupTimeMinutes: number;
  }>;
  
  // ============================================================
  // Health & Monitoring
  // ============================================================
  
  /**
   * Health check for MFA service
   * @returns Service health status
   */
  healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    uptime: number;
    version: string;
    dependencies: {
      redis: boolean;
      database: boolean;
      smsGateway: boolean;
      whatsappGateway: boolean;
    };
    metrics: {
      activeMFASessions: number;
      pendingSetup: number;
      lockedMethods: number;
    };
  }>;
  
  /**
   * Invalidate MFA cache for user
   * @param userId - User ID
   * @returns Cache invalidation result
   */
  invalidateMFACache(userId: string): Promise<{ cacheInvalidated: boolean }>;
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  DeviceInfo as DeviceInfoType,
  BackupCodeVerificationResult as BackupCodeVerificationResultType,
  MFAMethodInfo as MFAMethodInfoType,
  MFALockStatus as MFALockStatusType,
  MFARecoveryOptions as MFARecoveryOptionsType,
  MFAStatistics as MFAStatisticsType,
  VerifyCodeDto as VerifyCodeDtoType,
  RecoveryInitiationResult as RecoveryInitiationResultType,
  RecoveryCompletionResult as RecoveryCompletionResultType,
  // New enterprise types
  MFARiskAssessment as MFARiskAssessmentType,
  AdaptiveMFARequest as AdaptiveMFARequestType,
  OfflineMFACode as OfflineMFACodeType,
  GenerateOfflineCodesRequest as GenerateOfflineCodesRequestType,
  GenerateOfflineCodesResponse as GenerateOfflineCodesResponseType,
  MFAMethodRecommendation as MFAMethodRecommendationType,
  MFAMethodCompatibility as MFAMethodCompatibilityType,
  CrossDeviceMFASyncRequest as CrossDeviceMFASyncRequestType,
  CrossDeviceMFASyncResult as CrossDeviceMFASyncResultType,
  MFAHealthScore as MFAHealthScoreType,
  BulkMFAResult as BulkMFAResultType,
  BulkMFAEnableRequest as BulkMFAEnableRequestType,
  MFAMonitoringMetrics as MFAMonitoringMetricsType,
  MFAAlertConfig as MFAAlertConfigType,
  MFAComplianceReport as MFAComplianceReportType,
  GeoMfaSuggestion as GeoMfaSuggestionType,
  MFAAdoptionPrediction as MFAAdoptionPredictionType
};

// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
// 
// Enterprise Enhancements Applied in v3.0:
// 1. ✅ Risk-based adaptive MFA (risk score based method selection)
// 2. ✅ Offline MFA code support (for poor network areas in Bangladesh)
// 3. ✅ MFA method recommendation engine (based on user device/behavior)
// 4. ✅ Cross-device MFA sync with QR code (Bangladesh specific)
// 5. ✅ MFA method compatibility matrix (feature phone support)
// 6. ✅ Backup code regeneration reminder (auto-notification)
// 7. ✅ MFA adoption analytics with ML predictions
// 8. ✅ Geo-IP based MFA method suggestion (district/division level)
// 9. ✅ MFA health score and recommendations
// 10. ✅ Bulk MFA operations for enterprises
// 11. ✅ Real-time MFA monitoring dashboard
// 12. ✅ Compliance reporting (Bangladesh Bank guidelines)
// 13. ✅ MFA conversion funnel analytics
// 14. ✅ Method popularity tracking by district
// 15. ✅ Performance metrics with P95/P99 latency tracking
// 
// Bangladesh Specific:
// - Offline MFA codes for 2G/3G areas
// - Geo-IP based suggestions using Bangladeshi districts
// - Feature phone compatible method recommendations
// - Bengali language support throughout
// - bKash/Nagad/Rocket PIN MFA support
// - WhatsApp/Imo/Telegram MFA support
// - Mobile operator and network type tracking
// - District-level adoption analytics
// 
// Security Features:
// - Risk-based adaptive MFA (higher risk = stronger MFA)
// - Lockout mechanism for failed attempts
// - Backup code regeneration reminders
// - Cross-device sync with QR code verification
// - Audit trail for all MFA operations
// - Compliance reporting for regulatory requirements
// - Real-time monitoring and alerting
// 
// ============================================================
