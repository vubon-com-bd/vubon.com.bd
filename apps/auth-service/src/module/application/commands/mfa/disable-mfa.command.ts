/**
 * Disable MFA Command - Pure Command Data Structure (Enterprise Enhanced)
 * 
 * @module application/commands/mfa/disable-mfa.command
 * 
 * @description
 * Command for disabling Multi-Factor Authentication for a user.
 * Note: userId is NOT accepted from client - comes from JWT.
 * Requires verification (MFA code or password) for security.
 * 
 * ENTERPRISE ENHANCEMENTS:
 * ✅ Shared-constants integration (Single Source of Truth)
 * ✅ Shared-types integration for DeviceInfo
 * ✅ Bangladesh-specific fields (district, networkType, mobileOperator)
 * ✅ Built-in validation for verification code requirements
 * ✅ Factory functions for common use cases
 * ✅ Type guards for runtime checking
 * ✅ Command summary for logging
 * ✅ JSON serialization support
 * ✅ Comprehensive JSDoc documentation
 * ✅ Bengali error messages support (via validation)
 * 
 * Enterprise Rules:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ Security: userId from JWT, verification required
 * ✅ Framework-free
 */

import { randomUUID } from 'crypto';

// ✅ ENTERPRISE: Import from shared packages (Single Source of Truth)
import { DISABLE_MFA_VERIFICATION_TYPES } from '@vubon/shared-constants';
import type { DeviceInfo as SharedDeviceInfo, DisableMfaVerificationType as SharedDisableMfaVerificationType } from '@vubon/shared-types';
import { isValidBdMobile, maskPhone } from '@vubon/shared-utils';

// ============================================================
// Re-export verification types from shared-constants for convenience
// ============================================================

/**
 * Verification type for disabling MFA (from shared-constants)
 * 
 * @example
 * DisableMfaVerificationType.MFA_CODE    // Verify with MFA code
 * DisableMfaVerificationType.PASSWORD    // Verify with password
 * DisableMfaVerificationType.BACKUP_CODE // Verify with backup code
 * DisableMfaVerificationType.ADMIN_OVERRIDE // Admin override (no verification)
 */
export const DisableMfaVerificationType = DISABLE_MFA_VERIFICATION_TYPES;
export type DisableMfaVerificationType = SharedDisableMfaVerificationType;

// ============================================================
// Device Information (Using shared-types with Bangladesh fields)
// ============================================================

/**
 * Device information for security audit (Bangladesh enhanced)
 * Using shared-types for consistency across services
 */
export interface DeviceInfo extends SharedDeviceInfo {
  /** IP address of the client */
  ipAddress?: string;
  
  /** User agent string for device fingerprinting */
  userAgent?: string;
  
  /** Device identifier for tracking */
  deviceId?: string;
  
  /** Device fingerprint hash for fraud detection */
  deviceFingerprint?: string;
  
  /** District for geographic tracking (Bangladesh) */
  district?: string;
  
  /** Division for geographic tracking (Bangladesh) */
  division?: string;
  
  /** Network type (2G/3G/4G/5G/WiFi) - Bangladesh specific */
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  
  /** Mobile operator (Bangladesh specific) */
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  
  /** Upazila/Sub-district (Bangladesh specific) */
  upazila?: string;
}

// ============================================================
// Verification Result Interface
// ============================================================

/**
 * Result of verification validation
 */
export interface VerificationValidationResult {
  /** Whether the verification is valid */
  isValid: boolean;
  
  /** Error message (if invalid) */
  error?: string;
  
  /** Bengali error message (if invalid) */
  errorBn?: string;
  
  /** Missing fields */
  missingFields?: string[];
}

// ============================================================
// Disable MFA Command (Enterprise Enhanced)
// ============================================================

/**
 * Disable MFA Command
 * 
 * @example
 * // User disables MFA with MFA code
 * const command = DisableMfaCommand.createWithMfaCode(
 *   '123456',
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456',
 *     district: 'Dhaka',
 *     networkType: '4g'
 *   },
 *   'Lost my phone',
 *   'corr_abc123'
 * );
 * 
 * @example
 * // User disables MFA with password
 * const command = DisableMfaCommand.createWithPassword(
 *   'MyP@ssw0rd',
 *   deviceInfo,
 *   'Security precaution',
 *   'corr_abc123'
 * );
 * 
 * @example
 * // User disables MFA with backup code
 * const command = DisableMfaCommand.createWithBackupCode(
 *   'AB3F-9K2M',
 *   deviceInfo,
 *   'Lost authenticator app',
 *   'corr_abc123'
 * );
 * 
 * @example
 * // Admin disables MFA for a user
 * const command = DisableMfaCommand.createAdminOverride(
 *   'target_user_123',
 *   'admin_456',
 *   'User lost access to authenticator',
 *   deviceInfo,
 *   'corr_abc123'
 * );
 */
export class DisableMfaCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  private readonly _validationResult?: VerificationValidationResult;

  constructor(
    /** Type of verification being used */
    public readonly verificationType: DisableMfaVerificationType,
    
    /** Verification code (MFA code, password, or backup code) */
    public readonly verificationCode?: string,
    
    /** Device context for security audit */
    public readonly deviceInfo?: DeviceInfo,
    
    /** Reason for disabling MFA (for audit) */
    public readonly reason?: string,
    
    /** Correlation ID for distributed tracing */
    public readonly correlationId?: string,
    
    /** Target user ID (only for admin override) */
    public readonly targetUserId?: string,
    
    /** Admin ID (only for admin override) */
    public readonly adminId?: string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
    
    // ✅ ENTERPRISE: Auto-validate on construction
    this._validationResult = this.validate();
    
    // ✅ ENTERPRISE: Throw on validation failure
    if (!this._validationResult.isValid) {
      throw new Error(this._validationResult.error || 'Invalid command parameters');
    }
  }

  // ============================================================
  // Validation Methods
  // ============================================================

  /**
   * Validate command parameters
   * @returns Validation result with error messages
   */
  private validate(): VerificationValidationResult {
    const missingFields: string[] = [];

    // Admin override doesn't require verification code
    if (!this.isAdminOverride()) {
      if (!this.verificationCode || this.verificationCode.trim().length === 0) {
        missingFields.push('verificationCode');
        return {
          isValid: false,
          error: 'Verification code is required for non-admin disable operations',
          errorBn: 'অ্যাডমিন ছাড়া অন্যান্য ক্ষেত্রে ভেরিফিকেশন কোড প্রয়োজন',
          missingFields
        };
      }

      // Validate based on verification type
      switch (this.verificationType) {
        case DisableMfaVerificationType.MFA_CODE:
          if (!/^\d{6,8}$/.test(this.verificationCode)) {
            return {
              isValid: false,
              error: 'MFA code must be 6-8 digits',
              errorBn: 'MFA কোড ৬-৮ ডিজিটের হতে হবে',
              missingFields: ['verificationCode']
            };
          }
          break;
          
        case DisableMfaVerificationType.BACKUP_CODE:
          if (!/^[A-Z0-9]{4,5}-[A-Z0-9]{4,5}$/i.test(this.verificationCode)) {
            return {
              isValid: false,
              error: 'Backup code must be in format XXXX-XXXX or XXXXX-XXXXX',
              errorBn: 'ব্যাকআপ কোডের ফরম্যাট XXXX-XXXX বা XXXXX-XXXXX হতে হবে',
              missingFields: ['verificationCode']
            };
          }
          break;
          
        case DisableMfaVerificationType.PASSWORD:
          if (this.verificationCode.length < 8) {
            return {
              isValid: false,
              error: 'Password must be at least 8 characters',
              errorBn: 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে',
              missingFields: ['verificationCode']
            };
          }
          break;
      }
    }

    // Admin override validation
    if (this.isAdminOverride()) {
      if (!this.targetUserId) {
        missingFields.push('targetUserId');
      }
      if (!this.adminId) {
        missingFields.push('adminId');
      }
      
      if (missingFields.length > 0) {
        return {
          isValid: false,
          error: `Admin override requires: ${missingFields.join(', ')}`,
          errorBn: `অ্যাডমিন ওভাররাইডের জন্য প্রয়োজন: ${missingFields.join(', ')}`,
          missingFields
        };
      }
    }

    return { isValid: true };
  }

  // ============================================================
  // Type Guards
  // ============================================================

  /**
   * Check if this is an admin override operation
   */
  public isAdminOverride(): boolean {
    return this.verificationType === DisableMfaVerificationType.ADMIN_OVERRIDE;
  }

  /**
   * Check if verification is with MFA code
   */
  public isMfaCodeVerification(): boolean {
    return this.verificationType === DisableMfaVerificationType.MFA_CODE;
  }

  /**
   * Check if verification is with password
   */
  public isPasswordVerification(): boolean {
    return this.verificationType === DisableMfaVerificationType.PASSWORD;
  }

  /**
   * Check if verification is with backup code
   */
  public isBackupCodeVerification(): boolean {
    return this.verificationType === DisableMfaVerificationType.BACKUP_CODE;
  }

  /**
   * Check if verification code is provided
   */
  public hasVerificationCode(): boolean {
    return !!this.verificationCode && this.verificationCode.trim().length > 0;
  }

  // ============================================================
  // Getter Methods
  // ============================================================

  /**
   * Get the effective user ID (target for admin, or from context)
   * 
   * @param contextUserId - User ID from JWT/request context
   * @returns Effective user ID to operate on
   */
  public getEffectiveUserId(contextUserId: string): string {
    if (this.isAdminOverride() && this.targetUserId) {
      return this.targetUserId;
    }
    return contextUserId;
  }

  /**
   * Get IP address for audit
   */
  public getIpAddress(): string | undefined {
    return this.deviceInfo?.ipAddress;
  }

  /**
   * Get user agent for device fingerprinting
   */
  public getUserAgent(): string | undefined {
    return this.deviceInfo?.userAgent;
  }

  /**
   * Get device ID for tracking
   */
  public getDeviceId(): string | undefined {
    return this.deviceInfo?.deviceId;
  }

  /**
   * Get device fingerprint for fraud detection
   */
  public getDeviceFingerprint(): string | undefined {
    return this.deviceInfo?.deviceFingerprint;
  }

  /**
   * Get district for geographic tracking (Bangladesh)
   */
  public getDistrict(): string | undefined {
    return this.deviceInfo?.district;
  }

  /**
   * Get division for geographic tracking (Bangladesh)
   */
  public getDivision(): string | undefined {
    return this.deviceInfo?.division;
  }

  /**
   * Get network type for connection quality (Bangladesh)
   */
  public getNetworkType(): string | undefined {
    return this.deviceInfo?.networkType;
  }

  /**
   * Get mobile operator (Bangladesh specific)
   */
  public getMobileOperator(): string | undefined {
    return this.deviceInfo?.mobileOperator;
  }

  /**
   * Get reason for disabling (or default)
   */
  public getReason(): string {
    if (this.reason) return this.reason;
    if (this.isAdminOverride()) return 'Admin override - MFA disabled';
    return 'User requested - MFA disabled';
  }

  /**
   * Get masked verification code for logging (hides actual value)
   */
  public getMaskedVerificationCode(): string | undefined {
    if (!this.verificationCode) return undefined;
    const code = this.verificationCode;
    if (code.length <= 4) return '****';
    return code.substring(0, 2) + '****' + code.substring(code.length - 2);
  }

  /**
   * Get validation result (for debugging)
   */
  public getValidationResult(): VerificationValidationResult | undefined {
    return this._validationResult;
  }

  // ============================================================
  // Utility Methods
  // ============================================================

  /**
   * Get command summary for logging
   */
  public getSummary(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      verificationType: this.verificationType,
      timestamp: this.timestamp.toISOString(),
      correlationId: this.correlationId,
      isAdminOverride: this.isAdminOverride(),
      hasVerificationCode: this.hasVerificationCode(),
      maskedVerificationCode: this.getMaskedVerificationCode(),
      targetUserId: this.targetUserId,
      adminId: this.adminId,
      reason: this.getReason(),
      hasDeviceInfo: !!this.deviceInfo,
      deviceFingerprintPresent: !!this.deviceInfo?.deviceFingerprint,
      district: this.deviceInfo?.district,
      division: this.deviceInfo?.division,
      networkType: this.deviceInfo?.networkType,
      mobileOperator: this.deviceInfo?.mobileOperator,
      upazila: this.deviceInfo?.upazila,
      isValid: this._validationResult?.isValid ?? true
    };
  }

  /**
   * Get validation error message in Bengali (if validation failed)
   */
  public getBengaliErrorMessage(): string | undefined {
    return this._validationResult?.errorBn;
  }

  /**
   * Convert to plain object for serialization
   */
  public toJSON(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      verificationType: this.verificationType,
      timestamp: this.timestamp.toISOString(),
      correlationId: this.correlationId,
      isAdminOverride: this.isAdminOverride(),
      targetUserId: this.targetUserId,
      adminId: this.adminId,
      reason: this.getReason(),
      deviceInfo: this.deviceInfo,
      // ⚠️ verificationCode intentionally excluded for security
    };
  }

  /**
   * String representation for debugging
   */
  public toString(): string {
    return `DisableMfaCommand(id=${this.commandId}, type=${this.verificationType}, admin=${this.isAdminOverride()}, timestamp=${this.timestamp.toISOString()})`;
  }
}

// ============================================================
// Factory Functions (Enterprise Enhancement)
// ============================================================

/**
 * Create a command for disabling MFA with MFA code verification
 * 
 * @param mfaCode - MFA code (6-8 digits)
 * @param deviceInfo - Device context for audit
 * @param reason - Reason for disabling (optional)
 * @param correlationId - Correlation ID for tracing (optional)
 * @returns DisableMfaCommand instance
 * 
 * @example
 * const command = DisableMfaCommand.createWithMfaCode(
 *   '123456',
 *   { ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0...' },
 *   'Lost my phone',
 *   'corr_abc123'
 * );
 */
export function createDisableMfaWithMfaCodeCommand(
  mfaCode: string,
  deviceInfo?: DeviceInfo,
  reason?: string,
  correlationId?: string
): DisableMfaCommand {
  return new DisableMfaCommand(
    DisableMfaVerificationType.MFA_CODE,
    mfaCode,
    deviceInfo,
    reason,
    correlationId
  );
}

/**
 * Create a command for disabling MFA with password verification
 * 
 * @param password - User's password
 * @param deviceInfo - Device context for audit
 * @param reason - Reason for disabling (optional)
 * @param correlationId - Correlation ID for tracing (optional)
 * @returns DisableMfaCommand instance
 * 
 * @example
 * const command = DisableMfaCommand.createWithPassword(
 *   'MyP@ssw0rd',
 *   { ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0...' },
 *   'Security precaution',
 *   'corr_abc123'
 * );
 */
export function createDisableMfaWithPasswordCommand(
  password: string,
  deviceInfo?: DeviceInfo,
  reason?: string,
  correlationId?: string
): DisableMfaCommand {
  return new DisableMfaCommand(
    DisableMfaVerificationType.PASSWORD,
    password,
    deviceInfo,
    reason,
    correlationId
  );
}

/**
 * Create a command for disabling MFA with backup code verification
 * 
 * @param backupCode - Backup code (format: XXXX-XXXX or XXXXX-XXXXX)
 * @param deviceInfo - Device context for audit
 * @param reason - Reason for disabling (optional)
 * @param correlationId - Correlation ID for tracing (optional)
 * @returns DisableMfaCommand instance
 * 
 * @example
 * const command = DisableMfaCommand.createWithBackupCode(
 *   'AB3F-9K2M',
 *   { ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0...' },
 *   'Lost authenticator app',
 *   'corr_abc123'
 * );
 */
export function createDisableMfaWithBackupCodeCommand(
  backupCode: string,
  deviceInfo?: DeviceInfo,
  reason?: string,
  correlationId?: string
): DisableMfaCommand {
  return new DisableMfaCommand(
    DisableMfaVerificationType.BACKUP_CODE,
    backupCode,
    deviceInfo,
    reason,
    correlationId
  );
}

/**
 * Create an admin override command for disabling MFA
 * 
 * @param targetUserId - User ID whose MFA will be disabled
 * @param adminId - Admin ID performing the operation
 * @param reason - Reason for admin override (required)
 * @param deviceInfo - Device context for audit
 * @param correlationId - Correlation ID for tracing (optional)
 * @returns DisableMfaCommand instance
 * 
 * @example
 * const command = DisableMfaCommand.createAdminOverride(
 *   'target_user_123',
 *   'admin_456',
 *   'User lost access to authenticator',
 *   { ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0...' },
 *   'corr_abc123'
 * );
 */
export function createAdminDisableMfaCommand(
  targetUserId: string,
  adminId: string,
  reason: string,
  deviceInfo?: DeviceInfo,
  correlationId?: string
): DisableMfaCommand {
  if (!reason || reason.trim().length === 0) {
    throw new Error('Reason is required for admin override MFA disable');
  }
  
  return new DisableMfaCommand(
    DisableMfaVerificationType.ADMIN_OVERRIDE,
    undefined,
    deviceInfo,
    reason,
    correlationId,
    targetUserId,
    adminId
  );
}

// ============================================================
// Type Guards (Runtime Checking)
// ============================================================

/**
 * Type guard to check if a value is a DisableMfaCommand
 * 
 * @param command - Value to check
 * @returns True if value is a DisableMfaCommand instance
 */
export function isDisableMfaCommand(command: unknown): command is DisableMfaCommand {
  return command instanceof DisableMfaCommand;
}

/**
 * Type guard to check if command is an admin override
 * 
 * @param command - DisableMfaCommand to check
 * @returns True if command is admin override
 */
export function isAdminOverrideCommand(command: DisableMfaCommand): boolean {
  return command.isAdminOverride();
}

/**
 * Type guard to check if command has verification code
 * 
 * @param command - DisableMfaCommand to check
 * @returns True if command has verification code
 */
export function hasVerificationCode(command: DisableMfaCommand): boolean {
  return command.hasVerificationCode();
}

// ============================================================
// Validation Helper Functions
// ============================================================

/**
 * Validate MFA code format
 * 
 * @param code - MFA code to validate
 * @returns True if code is valid
 */
export function isValidMfaCode(code: string): boolean {
  return /^\d{6,8}$/.test(code);
}

/**
 * Validate backup code format
 * 
 * @param code - Backup code to validate
 * @returns True if backup code format is valid
 */
export function isValidBackupCode(code: string): boolean {
  return /^[A-Z0-9]{4,5}-[A-Z0-9]{4,5}$/i.test(code);
}

/**
 * Normalize backup code (remove spaces, convert to uppercase)
 * 
 * @param code - Backup code to normalize
 * @returns Normalized backup code
 */
export function normalizeBackupCode(code: string): string {
  return code.trim().toUpperCase().replace(/\s/g, '');
}

// ============================================================
// Default Export
// ============================================================

export default DisableMfaCommand;
