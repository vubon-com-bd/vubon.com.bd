/**
 * MFA Service Interface - Pure Domain Contract
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/mfa.service.interface
 * 
 * @description
 * Service contract for Multi-Factor Authentication operations.
 * NO implementation - ONLY method signatures.
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
import type { DeviceInfo as SharedDeviceInfo, MFAType, MFAStatus } from '@vubon/shared-types';

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

/**
 * Backup code verification result
 */
export interface BackupCodeVerificationResult {
  isValid: boolean;
  remainingCodes: number;
  warning?: string;
  warningBn?: string;
  isLow: boolean;
}

/**
 * MFA method info
 */
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

/**
 * MFA lock status
 */
export interface MFALockStatus {
  isLocked: boolean;
  remainingMinutes: number;
  remainingSeconds: number;
  lockedAt?: Date;
  expiresAt?: Date;
}

/**
 * MFA recovery options
 */
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

/**
 * MFA statistics (admin dashboard)
 */
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

/**
 * Verify code DTO (improvement: grouped parameters)
 */
export interface VerifyCodeDto {
  code: string;
  methodId?: string;
  type?: string;
}

/**
 * Recovery initiation result
 */
export interface RecoveryInitiationResult {
  recoverySessionId: string;
  expiresIn: number;
  remainingAttempts: number;
  maskedRecoveryEmail?: string;
  maskedRecoveryPhone?: string;
}

/**
 * Recovery completion result
 */
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
// MFA Service Interface
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
  RecoveryCompletionResult as RecoveryCompletionResultType
};
