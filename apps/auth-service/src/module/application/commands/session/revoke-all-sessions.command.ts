/**
 * Revoke All Sessions Command - Pure Command Data Structure (Enterprise Enhanced)

 * @module application/commands/session/revoke-all-sessions.command

 * @description
 * Command for revoking all sessions for a user with enterprise-grade features.
 * Note: userId is NOT accepted from client - comes from JWT.
 * Supports multiple revocation scopes (all, except current, by device type, by trust level).

 * ENTERPRISE ENHANCEMENTS:
 * ✅ Shared-constants integration (Single Source of Truth)
 * ✅ Shared-types integration for DeviceInfo
 * ✅ Built-in validation with meaningful error messages
 * ✅ Factory functions for common use cases
 * ✅ Type guards for runtime checking
 * ✅ Command summary for logging
 * ✅ JSON serialization support
 * ✅ Bangladesh-specific fields (district, networkType, mobileOperator)
 * ✅ Bengali error messages support (via validation)
 * ✅ Default scope and values
 * ✅ Comprehensive JSDoc documentation

 * Enterprise Rules:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ Security: userId from JWT, confirmation required
 * ✅ Framework-free
 */

import { randomUUID } from 'crypto';

// ✅ ENTERPRISE: Import from shared packages (Single Source of Truth)
import { REVOCATION_SCOPES, SESSION_CONFIG } from '@vubon/shared-constants';
import type { DeviceInfo as SharedDeviceInfo, DeviceType, TrustLevel, RevocationScope as SharedRevocationScope } from '@vubon/shared-types';
import { isValidBdMobile, maskPhone } from '@vubon/shared-utils';

// ============================================================
// Re-export revocation scope from shared-constants for convenience
// ============================================================

/**
 * Revocation scope types (from shared-constants)

 * @example
 * RevocationScope.ALL              // Revoke ALL sessions
 * RevocationScope.EXCEPT_CURRENT   // Revoke all except current session
 * RevocationScope.BY_DEVICE_TYPE   // Revoke sessions by device type
 * RevocationScope.BY_TRUST_LEVEL   // Revoke sessions by trust level
 */
export const RevocationScope = REVOCATION_SCOPES;
export type RevocationScope = SharedRevocationScope;

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

  /** Upazila/Sub-district for detailed location (Bangladesh) */
  upazila?: string;

  /** Network type (2G/3G/4G/5G/WiFi) - Bangladesh specific */
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';

  /** Mobile operator (Bangladesh specific) */
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';

  /** Whether data saver mode is enabled */
  dataSaverEnabled?: boolean;
}

// ============================================================
// Validation Result Interface
// ============================================================

/**
 * Result of command validation
 */
export interface CommandValidationResult {
  /** Whether the command is valid */
  isValid: boolean;

  /** Error message (if invalid) */
  error?: string;

  /** Bengali error message (if invalid) */
  errorBn?: string;

  /** Missing or invalid fields */
  invalidFields?: string[];
}

// ============================================================
// Revoke All Sessions Command (Enterprise Enhanced)
// ============================================================

/**
 * Revoke All Sessions Command

 * @example
 * // Revoke all sessions except current (user logout from all other devices)
 * const command = RevokeAllSessionsCommand.createExceptCurrent(
 *   'usr_550e8400-e29b-41d4-a716-446655440000',
 *   true,
 *   'sess_550e8400-e29b-41d4-a716-446655440000',
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456',
 *     district: 'Dhaka'
 *   },
 *   'Security precaution - logged out from all devices',
 *   'corr_abc123'
 * );

 * @example
 * // Revoke all sessions by device type (mobile and tablet)
 * const command = RevokeAllSessionsCommand.createByDeviceType(
 *   'usr_550e8400-e29b-41d4-a716-446655440000',
 *   true,
 *   ['mobile', 'tablet'],
 *   deviceInfo,
 *   'Logout from all mobile devices',
 *   'corr_abc123'
 * );

 * @example
 * // Revoke all sessions by trust level (untrusted and standard)
 * const command = RevokeAllSessionsCommand.createByTrustLevel(
 *   'usr_550e8400-e29b-41d4-a716-446655440000',
 *   true,
 *   ['untrusted', 'standard'],
 *   deviceInfo,
 *   'Security cleanup',
 *   'corr_abc123'
 * );

 * @example
 * // Revoke ALL sessions (including current - forces re-login)
 * const command = RevokeAllSessionsCommand.createAll(
 *   'usr_550e8400-e29b-41d4-a716-446655440000',
 *   true,
 *   deviceInfo,
 *   'Security incident - force re-login',
 *   'corr_abc123'
 * );
 */
export class RevokeAllSessionsCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly scope: RevocationScope;
  public readonly excludeCurrentSession: boolean;
  public readonly currentSessionId?: string;
  public readonly deviceTypes?: DeviceType[];
  public readonly trustLevels?: TrustLevel[];
  private readonly _validationResult: CommandValidationResult;

  constructor(
    /** User ID from JWT (NOT from client) */
    public readonly userId: string,

    /** Confirmation for destructive operation (required) */
    public readonly confirm: boolean,

    /** Revocation scope (default: EXCEPT_CURRENT) */
    scope?: RevocationScope,

    /** Whether to exclude current session (default: true) */
    excludeCurrentSession?: boolean,

    /** Current session ID (to exclude from revocation) */
    currentSessionId?: string,

    /** Device types to filter (for BY_DEVICE_TYPE scope) */
    deviceTypes?: DeviceType[],

    /** Trust levels to filter (for BY_TRUST_LEVEL scope) */
    trustLevels?: TrustLevel[],

    /** Reason for revocation (for audit) */
    public readonly reason?: string,

    /** Device context for security audit */
    public readonly deviceInfo?: DeviceInfo,

    /** Correlation ID for distributed tracing */
    public readonly correlationId?: string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
    this.scope = scope ?? RevocationScope.EXCEPT_CURRENT;
    this.excludeCurrentSession = excludeCurrentSession ?? true;
    this.currentSessionId = currentSessionId;
    this.deviceTypes = deviceTypes;
    this.trustLevels = trustLevels;

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
  private validate(): CommandValidationResult {
    const invalidFields: string[] = [];

    // Validate user ID
    if (!this.userId || this.userId.trim().length === 0) {
      invalidFields.push('userId');
      return {
        isValid: false,
        error: 'User ID is required',
        errorBn: 'ইউজার আইডি প্রয়োজন',
        invalidFields
      };
    }

    // Validate confirmation for destructive operation
    if (!this.confirm) {
      invalidFields.push('confirm');
      return {
        isValid: false,
        error: 'Confirmation is required to revoke all sessions',
        errorBn: 'সব সেশন রিভোক করার জন্য নিশ্চিতকরণ প্রয়োজন',
        invalidFields
      };
    }

    // Validate scope-specific requirements
    if (this.scope === RevocationScope.BY_DEVICE_TYPE) {
      if (!this.deviceTypes || this.deviceTypes.length === 0) {
        invalidFields.push('deviceTypes');
        return {
          isValid: false,
          error: 'Device types are required for BY_DEVICE_TYPE scope',
          errorBn: 'BY_DEVICE_TYPE স্কোপের জন্য ডিভাইস টাইপ প্রয়োজন',
          invalidFields
        };
      }

      // Validate device types are valid
      const validDeviceTypes = ['mobile', 'tablet', 'desktop', 'laptop', 'tv', 'console', 'wearable', 'feature_phone'];
      const invalidTypes = this.deviceTypes.filter(dt => !validDeviceTypes.includes(dt));
      if (invalidTypes.length > 0) {
        invalidFields.push('deviceTypes');
        return {
          isValid: false,
          error: `Invalid device types: ${invalidTypes.join(', ')}`,
          errorBn: `ভুল ডিভাইস টাইপ: ${invalidTypes.join(', ')}`,
          invalidFields
        };
      }
    }

    if (this.scope === RevocationScope.BY_TRUST_LEVEL) {
      if (!this.trustLevels || this.trustLevels.length === 0) {
        invalidFields.push('trustLevels');
        return {
          isValid: false,
          error: 'Trust levels are required for BY_TRUST_LEVEL scope',
          errorBn: 'BY_TRUST_LEVEL স্কোপের জন্য ট্রাস্ট লেভেল প্রয়োজন',
          invalidFields
        };
      }

      // Validate trust levels are valid
      const validTrustLevels = ['untrusted', 'standard', 'trusted', 'high_trust', 'maximum_trust'];
      const invalidLevels = this.trustLevels.filter(tl => !validTrustLevels.includes(tl));
      if (invalidLevels.length > 0) {
        invalidFields.push('trustLevels');
        return {
          isValid: false,
          error: `Invalid trust levels: ${invalidLevels.join(', ')}`,
          errorBn: `ভুল ট্রাস্ট লেভেল: ${invalidLevels.join(', ')}`,
          invalidFields
        };
      }
    }

    // Validate current session ID for EXCEPT_CURRENT scope
    if (this.scope === RevocationScope.EXCEPT_CURRENT && this.excludeCurrentSession) {
      if (!this.currentSessionId) {
        invalidFields.push('currentSessionId');
        return {
          isValid: false,
          error: 'Current session ID is required when excluding current session',
          errorBn: 'কারেন্ট সেশন বাদ দিতে কারেন্ট সেশন আইডি প্রয়োজন',
          invalidFields
        };
      }
    }

    // Validate reason length
    if (this.reason && this.reason.length > 500) {
      invalidFields.push('reason');
      return {
        isValid: false,
        error: 'Reason cannot exceed 500 characters',
        errorBn: 'কারণ ৫০০ অক্ষরের বেশি হতে পারবে না',
        invalidFields
      };
    }

    return { isValid: true };
  }

  // ============================================================
  // Type Guards
  // ============================================================

  /**
   * Check if revoking ALL sessions (including current)
   */
  public isAllDevices(): boolean {
    return this.scope === RevocationScope.ALL;
  }

  /**
   * Check if revoking all sessions EXCEPT current
   */
  public isExceptCurrent(): boolean {
    return this.scope === RevocationScope.EXCEPT_CURRENT;
  }

  /**
   * Check if revoking sessions BY DEVICE TYPE
   */
  public isByDeviceType(): boolean {
    return this.scope === RevocationScope.BY_DEVICE_TYPE;
  }

  /**
   * Check if revoking sessions BY TRUST LEVEL
   */
  public isByTrustLevel(): boolean {
    return this.scope === RevocationScope.BY_TRUST_LEVEL;
  }

  /**
   * Check if current session should be excluded
   */
  public shouldExcludeCurrent(): boolean {
    return this.excludeCurrentSession && !!this.currentSessionId;
  }

  /**
   * Check if confirmation is provided
   */
  public hasConfirmation(): boolean {
    return this.confirm === true;
  }

  /**
   * Check if reason is provided
   */
  public hasReason(): boolean {
    return !!this.reason && this.reason.trim().length > 0;
  }

  // ============================================================
  // Getter Methods
  // ============================================================

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
   * Get upazila for detailed location (Bangladesh)
   */
  public getUpazila(): string | undefined {
    return this.deviceInfo?.upazila;
  }

  /**
   * Get reason (or default reason)
   */
  public getReason(): string {
    if (this.reason) return this.reason;
    if (this.isAllDevices()) return 'All sessions revoked';
    if (this.isExceptCurrent()) return 'All other sessions revoked';
    if (this.isByDeviceType()) return `Sessions revoked by device type: ${this.deviceTypes?.join(', ')}`;
    if (this.isByTrustLevel()) return `Sessions revoked by trust level: ${this.trustLevels?.join(', ')}`;
    return 'Sessions revoked';
  }

  /**
   * Get validation result (for debugging)
   */
  public getValidationResult(): CommandValidationResult {
    return this._validationResult;
  }

  /**
   * Get validation error message in Bengali (if validation failed)
   */
  public getBengaliErrorMessage(): string | undefined {
    return this._validationResult.errorBn;
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
      userId: this.userId,
      scope: this.scope,
      timestamp: this.timestamp.toISOString(),
      correlationId: this.correlationId,
      confirm: this.confirm,
      excludeCurrentSession: this.excludeCurrentSession,
      hasCurrentSessionId: !!this.currentSessionId,
      deviceTypes: this.deviceTypes,
      trustLevels: this.trustLevels,
      reason: this.getReason(),
      hasDeviceInfo: !!this.deviceInfo,
      deviceFingerprintPresent: !!this.deviceInfo?.deviceFingerprint,
      district: this.deviceInfo?.district,
      division: this.deviceInfo?.division,
      networkType: this.deviceInfo?.networkType,
      mobileOperator: this.deviceInfo?.mobileOperator,
      upazila: this.deviceInfo?.upazila,
      isValid: this._validationResult.isValid
    };
  }

  /**
   * Convert to plain object for serialization
   */
  public toJSON(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      userId: this.userId,
      scope: this.scope,
      timestamp: this.timestamp.toISOString(),
      correlationId: this.correlationId,
      confirm: this.confirm,
      excludeCurrentSession: this.excludeCurrentSession,
      deviceTypes: this.deviceTypes,
      trustLevels: this.trustLevels,
      reason: this.getReason(),
      deviceInfo: this.deviceInfo
    };
  }

  /**
   * String representation for debugging
   */
  public toString(): string {
    return `RevokeAllSessionsCommand(id=${this.commandId}, userId=${this.userId}, scope=${this.scope}, confirm=${this.confirm}, timestamp=${this.timestamp.toISOString()})`;
  }
}

// ============================================================
// Factory Functions (Enterprise Enhancement)
// ============================================================

/**
 * Create a command to revoke ALL sessions (including current - forces re-login)

 * @param userId - User ID from JWT
 * @param confirm - Confirmation (must be true)
 * @param deviceInfo - Device context for audit
 * @param reason - Reason for revocation (optional)
 * @param correlationId - Correlation ID for tracing (optional)
 * @returns RevokeAllSessionsCommand instance
 */
export function createRevokeAllSessionsCommand(
  userId: string,
  confirm: boolean,
  deviceInfo?: DeviceInfo,
  reason?: string,
  correlationId?: string
): RevokeAllSessionsCommand {
  return new RevokeAllSessionsCommand(
    userId,
    confirm,
    RevocationScope.ALL,
    false,
    undefined,
    undefined,
    undefined,
    reason,
    deviceInfo,
    correlationId
  );
}

/**
 * Create a command to revoke all sessions EXCEPT current

 * @param userId - User ID from JWT
 * @param confirm - Confirmation (must be true)
 * @param currentSessionId - Current session ID to keep
 * @param deviceInfo - Device context for audit
 * @param reason - Reason for revocation (optional)
 * @param correlationId - Correlation ID for tracing (optional)
 * @returns RevokeAllSessionsCommand instance
 */
export function createRevokeAllExceptCurrentCommand(
  userId: string,
  confirm: boolean,
  currentSessionId: string,
  deviceInfo?: DeviceInfo,
  reason?: string,
  correlationId?: string
): RevokeAllSessionsCommand {
  return new RevokeAllSessionsCommand(
    userId,
    confirm,
    RevocationScope.EXCEPT_CURRENT,
    true,
    currentSessionId,
    undefined,
    undefined,
    reason,
    deviceInfo,
    correlationId
  );
}

/**
 * Create a command to revoke sessions by device type

 * @param userId - User ID from JWT
 * @param confirm - Confirmation (must be true)
 * @param deviceTypes - Array of device types to revoke
 * @param deviceInfo - Device context for audit
 * @param reason - Reason for revocation (optional)
 * @param correlationId - Correlation ID for tracing (optional)
 * @returns RevokeAllSessionsCommand instance
 */
export function createRevokeByDeviceTypeCommand(
  userId: string,
  confirm: boolean,
  deviceTypes: DeviceType[],
  deviceInfo?: DeviceInfo,
  reason?: string,
  correlationId?: string
): RevokeAllSessionsCommand {
  return new RevokeAllSessionsCommand(
    userId,
    confirm,
    RevocationScope.BY_DEVICE_TYPE,
    false,
    undefined,
    deviceTypes,
    undefined,
    reason,
    deviceInfo,
    correlationId
  );
}

/**
 * Create a command to revoke sessions by trust level

 * @param userId - User ID from JWT
 * @param confirm - Confirmation (must be true)
 * @param trustLevels - Array of trust levels to revoke
 * @param deviceInfo - Device context for audit
 * @param reason - Reason for revocation (optional)
 * @param correlationId - Correlation ID for tracing (optional)
 * @returns RevokeAllSessionsCommand instance
 */
export function createRevokeByTrustLevelCommand(
  userId: string,
  confirm: boolean,
  trustLevels: TrustLevel[],
  deviceInfo?: DeviceInfo,
  reason?: string,
  correlationId?: string
): RevokeAllSessionsCommand {
  return new RevokeAllSessionsCommand(
    userId,
    confirm,
    RevocationScope.BY_TRUST_LEVEL,
    false,
    undefined,
    undefined,
    trustLevels,
    reason,
    deviceInfo,
    correlationId
  );
}

/**
 * Create a command to revoke all sessions for security incident (forces re-login)

 * @param userId - User ID from JWT
 * @param deviceInfo - Device context for audit
 * @param reason - Reason for security revocation (required)
 * @param correlationId - Correlation ID for tracing (optional)
 * @returns RevokeAllSessionsCommand instance
 */
export function createSecurityRevokeCommand(
  userId: string,
  deviceInfo: DeviceInfo,
  reason: string,
  correlationId?: string
): RevokeAllSessionsCommand {
  return new RevokeAllSessionsCommand(
    userId,
    true,
    RevocationScope.ALL,
    false,
    undefined,
    undefined,
    undefined,
    `SECURITY: ${reason}`,
    deviceInfo,
    correlationId
  );
}

// ============================================================
// Type Guards (Runtime Checking)
// ============================================================

/**
 * Type guard to check if a value is a RevokeAllSessionsCommand

 * @param command - Value to check
 * @returns True if value is a RevokeAllSessionsCommand instance
 */
export function isRevokeAllSessionsCommand(command: unknown): command is RevokeAllSessionsCommand {
  return command instanceof RevokeAllSessionsCommand;
}

/**
 * Type guard to check if command is ALL devices scope

 * @param command - RevokeAllSessionsCommand to check
 * @returns True if command is ALL devices scope
 */
export function isAllDevicesScope(command: RevokeAllSessionsCommand): boolean {
  return command.isAllDevices();
}

/**
 * Type guard to check if command is EXCEPT CURRENT scope

 * @param command - RevokeAllSessionsCommand to check
 * @returns True if command is EXCEPT CURRENT scope
 */
export function isExceptCurrentScope(command: RevokeAllSessionsCommand): boolean {
  return command.isExceptCurrent();
}

/**
 * Type guard to check if command is BY DEVICE TYPE scope

 * @param command - RevokeAllSessionsCommand to check
 * @returns True if command is BY DEVICE TYPE scope
 */
export function isByDeviceTypeScope(command: RevokeAllSessionsCommand): boolean {
  return command.isByDeviceType();
}

/**
 * Type guard to check if command is BY TRUST LEVEL scope

 * @param command - RevokeAllSessionsCommand to check
 * @returns True if command is BY TRUST LEVEL scope
 */
export function isByTrustLevelScope(command: RevokeAllSessionsCommand): boolean {
  return command.isByTrustLevel();
}

// ============================================================
// Validation Helper Functions
// ============================================================

/**
 * Validate if a revocation scope is valid

 * @param scope - Scope to validate
 * @returns True if scope is valid
 */
export function isValidRevocationScope(scope: string): scope is RevocationScope {
  return Object.values(RevocationScope).includes(scope as RevocationScope);
}

/**
 * Get default reason for a revocation scope

 * @param scope - Revocation scope
 * @returns Default reason message
 */
export function getDefaultReasonForScope(scope: RevocationScope): string {
  switch (scope) {
    case RevocationScope.ALL:
      return 'All sessions revoked - security precaution';
    case RevocationScope.EXCEPT_CURRENT:
      return 'All other sessions revoked - user initiated';
    case RevocationScope.BY_DEVICE_TYPE:
      return 'Sessions revoked by device type - security policy';
    case RevocationScope.BY_TRUST_LEVEL:
      return 'Sessions revoked by trust level - security cleanup';
    default:
      return 'Sessions revoked';
  }
}

/**
 * Get Bengali reason for a revocation scope

 * @param scope - Revocation scope
 * @returns Bengali reason message
 */
export function getDefaultReasonBnForScope(scope: RevocationScope): string {
  switch (scope) {
    case RevocationScope.ALL:
      return 'সব সেশন রিভোক করা হয়েছে - নিরাপত্তা সতর্কতা';
    case RevocationScope.EXCEPT_CURRENT:
      return 'অন্যান্য সব সেশন রিভোক করা হয়েছে - ব্যবহারকারী অনুরোধ';
    case RevocationScope.BY_DEVICE_TYPE:
      return 'ডিভাইস টাইপ অনুযায়ী সেশন রিভোক করা হয়েছে - নিরাপত্তা নীতি';
    case RevocationScope.BY_TRUST_LEVEL:
      return 'ট্রাস্ট লেভেল অনুযায়ী সেশন রিভোক করা হয়েছে - নিরাপত্তা ক্লিনআপ';
    default:
      return 'সেশন রিভোক করা হয়েছে';
  }
}

// ============================================================
// Default Export
// ============================================================

export default RevokeAllSessionsCommand;
