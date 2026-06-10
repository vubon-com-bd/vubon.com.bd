/**
 * Revoke Session Command - Pure Command Data Structure (Enterprise Enhanced)

 * @module application/commands/session/revoke-session.command

 * @description
 * Command for revoking a specific user session with enterprise-grade features.
 * Note: userId is NOT accepted from client - comes from JWT.

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
 * ✅ Comprehensive JSDoc documentation

 * Enterprise Rules:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ Security: userId from JWT, session ownership validation
 * ✅ Framework-free
 */

import { randomUUID } from 'crypto';

// ✅ ENTERPRISE: Import from shared packages (Single Source of Truth)
import { SESSION_CONFIG } from '@vubon/shared-constants';
import type { DeviceInfo as SharedDeviceInfo } from '@vubon/shared-types';
import { maskPhone } from '@vubon/shared-utils';

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
// Revoke Session Command (Enterprise Enhanced)
// ============================================================

/**
 * Revoke Session Command

 * @example
 * // User revokes a specific session
 * const command = new RevokeSessionCommand(
 *   'usr_550e8400-e29b-41d4-a716-446655440000',  // userId from JWT
 *   'sess_550e8400-e29b-41d4-a716-446655440000', // sessionId to revoke
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456',
 *     district: 'Dhaka',
 *     networkType: '4g'
 *   },
 *   'corr_abc123',
 *   'Suspicious activity detected on this device'
 * );
 *
 * @example
 * // User revokes current session (logout)
 * const command = RevokeSessionCommand.createForCurrentSession(
 *   'usr_550e8400-e29b-41d4-a716-446655440000',
 *   'sess_550e8400-e29b-41d4-a716-446655440000',
 *   deviceInfo,
 *   'corr_abc123'
 * );
 *
 * @example
 * // Admin revokes another user's session
 * const command = RevokeSessionCommand.createAdminRevoke(
 *   'admin_550e8400-e29b-41d4-a716-446655440000',
 *   'usr_target_123',
 *   'sess_target_456',
 *   deviceInfo,
 *   'corr_abc123',
 *   'Policy violation - session terminated by admin'
 * );
 */
export class RevokeSessionCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly isAdminOverride: boolean;
  public readonly targetUserId?: string;
  private readonly _validationResult: CommandValidationResult;

  constructor(
    /** User ID from JWT (NOT from client) - The actor performing the revocation */
    public readonly userId: string,

    /** Session ID to revoke */
    public readonly sessionId: string,

    /** Device context for security audit */
    public readonly deviceInfo?: DeviceInfo,

    /** Correlation ID for distributed tracing */
    public readonly correlationId?: string,

    /** Reason for revoking session (for audit) */
    public readonly reason?: string,

    /** Target user ID (only for admin override - which user's session to revoke) */
    targetUserId?: string,

    /** Whether this is an admin override operation */
    isAdminOverride?: boolean
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
    this.targetUserId = targetUserId;
    this.isAdminOverride = isAdminOverride ?? false;

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

    // Validate user ID (actor)
    if (!this.userId || this.userId.trim().length === 0) {
      invalidFields.push('userId');
      return {
        isValid: false,
        error: 'User ID is required',
        errorBn: 'ইউজার আইডি প্রয়োজন',
        invalidFields
      };
    }

    // Validate session ID
    if (!this.sessionId || this.sessionId.trim().length === 0) {
      invalidFields.push('sessionId');
      return {
        isValid: false,
        error: 'Session ID is required',
        errorBn: 'সেশন আইডি প্রয়োজন',
        invalidFields
      };
    }

    // Validate session ID format (UUID)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(this.sessionId)) {
      invalidFields.push('sessionId');
      return {
        isValid: false,
        error: 'Session ID must be a valid UUID',
        errorBn: 'সেশন আইডি টি সঠিক UUID হতে হবে',
        invalidFields
      };
    }

    // For admin override, target user ID is required
    if (this.isAdminOverride && (!this.targetUserId || this.targetUserId.trim().length === 0)) {
      invalidFields.push('targetUserId');
      return {
        isValid: false,
        error: 'Target user ID is required for admin override',
        errorBn: 'অ্যাডমিন ওভাররাইডের জন্য টার্গেট ইউজার আইডি প্রয়োজন',
        invalidFields
      };
    }

    // For admin override, target user ID must be valid UUID
    if (this.isAdminOverride && this.targetUserId && !uuidRegex.test(this.targetUserId)) {
      invalidFields.push('targetUserId');
      return {
        isValid: false,
        error: 'Target user ID must be a valid UUID',
        errorBn: 'টার্গেট ইউজার আইডি টি সঠিক UUID হতে হবে',
        invalidFields
      };
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
   * Check if revoking current session
   * @param currentSessionId - The current session ID from request context
   * @returns True if revoking the current session
   */
  public isRevokingCurrentSession(currentSessionId: string): boolean {
    return this.sessionId === currentSessionId;
  }

  /**
   * Get the effective user ID (target for admin, or actor for self)
   * @returns User ID whose session will be revoked
   */
  public getEffectiveUserId(): string {
    if (this.isAdminOverride && this.targetUserId) {
      return this.targetUserId;
    }
    return this.userId;
  }

  /**
   * Check if this is an admin override operation
   */
  public isAdminOverrideOperation(): boolean {
    return this.isAdminOverride;
  }

  /**
   * Check if the actor is revoking their own session
   * @returns True if revoking own session (not admin override)
   */
  public isRevokingOwnSession(): boolean {
    return !this.isAdminOverride;
  }

  // ============================================================
  // Getter Methods
  // ============================================================

  /**
   * Get session ID
   */
  public getSessionId(): string {
    return this.sessionId;
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
   * Get upazila for detailed location (Bangladesh)
   */
  public getUpazila(): string | undefined {
    return this.deviceInfo?.upazila;
  }

  /**
   * Get revocation reason (or default)
   */
  public getReason(): string {
    if (this.reason) return this.reason;
    if (this.isAdminOverride) {
      return `Admin override - session revoked${this.targetUserId ? ` for user ${this.targetUserId}` : ''}`;
    }
    return 'User initiated - session revocation';
  }

  /**
   * Get revocation reason in Bengali
   */
  public getReasonBn(): string {
    if (this.reason) return this.reason;
    if (this.isAdminOverride) {
      return `অ্যাডমিন ওভাররাইড - সেশন রিভোক করা হয়েছে${this.targetUserId ? ` ইউজার ${this.targetUserId} এর জন্য` : ''}`;
    }
    return 'ব্যবহারকারী অনুরোধ - সেশন রিভোক';
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
      sessionId: this.sessionId,
      targetUserId: this.targetUserId,
      isAdminOverride: this.isAdminOverride,
      timestamp: this.timestamp.toISOString(),
      correlationId: this.correlationId,
      reason: this.getReason(),
      hasDeviceInfo: !!this.deviceInfo,
      deviceFingerprintPresent: !!this.deviceInfo?.deviceFingerprint,
      ipAddress: this.deviceInfo?.ipAddress,
      deviceId: this.deviceInfo?.deviceId,
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
      sessionId: this.sessionId,
      targetUserId: this.targetUserId,
      isAdminOverride: this.isAdminOverride,
      timestamp: this.timestamp.toISOString(),
      correlationId: this.correlationId,
      reason: this.getReason(),
      deviceInfo: this.deviceInfo
    };
  }

  /**
   * String representation for debugging
   */
  public toString(): string {
    return `RevokeSessionCommand(id=${this.commandId}, userId=${this.userId}, sessionId=${this.sessionId}, adminOverride=${this.isAdminOverride}, timestamp=${this.timestamp.toISOString()})`;
  }
}

// ============================================================
// Factory Functions (Enterprise Enhancement)
// ============================================================

/**
 * Create a command to revoke a specific session (self revocation)

 * @param userId - User ID from JWT (actor)
 * @param sessionId - Session ID to revoke
 * @param deviceInfo - Device context for audit
 * @param correlationId - Correlation ID for tracing (optional)
 * @param reason - Reason for revocation (optional)
 * @returns RevokeSessionCommand instance
 */
export function createRevokeSessionCommand(
  userId: string,
  sessionId: string,
  deviceInfo?: DeviceInfo,
  correlationId?: string,
  reason?: string
): RevokeSessionCommand {
  return new RevokeSessionCommand(
    userId,
    sessionId,
    deviceInfo,
    correlationId,
    reason,
    undefined,
    false
  );
}

/**
 * Create a command to revoke the current session (logout)

 * @param userId - User ID from JWT
 * @param currentSessionId - Current session ID
 * @param deviceInfo - Device context for audit
 * @param correlationId - Correlation ID for tracing (optional)
 * @returns RevokeSessionCommand instance
 */
export function createRevokeCurrentSessionCommand(
  userId: string,
  currentSessionId: string,
  deviceInfo?: DeviceInfo,
  correlationId?: string
): RevokeSessionCommand {
  return new RevokeSessionCommand(
    userId,
    currentSessionId,
    deviceInfo,
    correlationId,
    'User initiated logout - current session terminated',
    undefined,
    false
  );
}

/**
 * Create an admin command to revoke another user's session

 * @param adminId - Admin ID from JWT (actor)
 * @param targetUserId - Target user ID whose session to revoke
 * @param sessionId - Session ID to revoke
 * @param deviceInfo - Device context for audit
 * @param correlationId - Correlation ID for tracing (optional)
 * @param reason - Reason for revocation (required for admin actions)
 * @returns RevokeSessionCommand instance
 */
export function createAdminRevokeSessionCommand(
  adminId: string,
  targetUserId: string,
  sessionId: string,
  deviceInfo?: DeviceInfo,
  correlationId?: string,
  reason?: string
): RevokeSessionCommand {
  const finalReason = reason || `Admin action: Session revoked for user ${targetUserId}`;
  return new RevokeSessionCommand(
    adminId,
    sessionId,
    deviceInfo,
    correlationId,
    finalReason,
    targetUserId,
    true
  );
}

/**
 * Create a security command to revoke a session due to suspicious activity

 * @param userId - User ID (can be admin or user)
 * @param sessionId - Session ID to revoke
 * @param suspiciousReason - Reason for security revocation
 * @param deviceInfo - Device context for audit
 * @param correlationId - Correlation ID for tracing (optional)
 * @param isAdminOverride - Whether this is an admin action
 * @returns RevokeSessionCommand instance
 */
export function createSecurityRevokeSessionCommand(
  userId: string,
  sessionId: string,
  suspiciousReason: string,
  deviceInfo?: DeviceInfo,
  correlationId?: string,
  isAdminOverride: boolean = true
): RevokeSessionCommand {
  const reason = `SECURITY: ${suspiciousReason} - Session terminated`;
  return new RevokeSessionCommand(
    userId,
    sessionId,
    deviceInfo,
    correlationId,
    reason,
    isAdminOverride ? userId : undefined,
    isAdminOverride
  );
}

// ============================================================
// Type Guards (Runtime Checking)
// ============================================================

/**
 * Type guard to check if a value is a RevokeSessionCommand

 * @param command - Value to check
 * @returns True if value is a RevokeSessionCommand instance
 */
export function isRevokeSessionCommand(command: unknown): command is RevokeSessionCommand {
  return command instanceof RevokeSessionCommand;
}

/**
 * Type guard to check if command is revoking current session

 * @param command - RevokeSessionCommand to check
 * @param currentSessionId - Current session ID
 * @returns True if command is revoking current session
 */
export function isRevokingCurrentSession(
  command: RevokeSessionCommand,
  currentSessionId: string
): boolean {
  return command.isRevokingCurrentSession(currentSessionId);
}

/**
 * Type guard to check if command is admin override

 * @param command - RevokeSessionCommand to check
 * @returns True if command is admin override
 */
export function isAdminOverrideCommand(command: RevokeSessionCommand): boolean {
  return command.isAdminOverrideOperation();
}

/**
 * Type guard to check if user is revoking own session

 * @param command - RevokeSessionCommand to check
 * @returns True if user is revoking own session
 */
export function isRevokingOwnSession(command: RevokeSessionCommand): boolean {
  return command.isRevokingOwnSession();
}

// ============================================================
// Helper Functions
// ============================================================

/**
 * Get default reason for different revocation types

 * @param isAdminOverride - Whether this is an admin action
 * @param isCurrentSession - Whether revoking current session
 * @returns Default reason message
 */
export function getDefaultReason(isAdminOverride: boolean, isCurrentSession: boolean): string {
  if (isAdminOverride) {
    return 'Admin action - session revoked';
  }
  if (isCurrentSession) {
    return 'User initiated logout';
  }
  return 'User initiated - session revocation';
}

/**
 * Get default reason in Bengali

 * @param isAdminOverride - Whether this is an admin action
 * @param isCurrentSession - Whether revoking current session
 * @returns Bengali reason message
 */
export function getDefaultReasonBn(isAdminOverride: boolean, isCurrentSession: boolean): string {
  if (isAdminOverride) {
    return 'অ্যাডমিন অ্যাকশন - সেশন রিভোক করা হয়েছে';
  }
  if (isCurrentSession) {
    return 'ব্যবহারকারী লগআউট';
  }
  return 'ব্যবহারকারী অনুরোধ - সেশন রিভোক';
}

// ============================================================
// Default Export
// ============================================================

export default RevokeSessionCommand;
