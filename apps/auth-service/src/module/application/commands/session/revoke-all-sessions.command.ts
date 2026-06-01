/**
 * Revoke All Sessions Command - Pure Command Data Structure
 * 
 * @module application/commands/session/revoke-all-sessions.command
 * 
 * @description
 * Command for revoking all user sessions (logout from all devices).
 * Note: userId is NOT accepted from client - comes from JWT.
 * 
 * Enterprise Rules:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ Security: userId from JWT
 * ✅ Framework-free
 */

import { randomUUID } from 'crypto';

/**
 * Device information for security audit
 */
export interface DeviceInfo {
  ipAddress ? : string;
  userAgent ? : string;
  deviceId ? : string;
  sessionId ? : string;
}

/**
 * Revoke All Sessions Command
 * 
 * @example
 * // Revoke all sessions except current
 * const command = new RevokeAllSessionsCommand(
 *   true,
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456',
 *     sessionId: 'sess_abc123'
 *   },
 *   'corr_abc123',
 *   'Security precaution - lost phone'
 * );
 * 
 * @example
 * // Revoke all sessions including current
 * const command = new RevokeAllSessionsCommand(
 *   false,
 *   deviceInfo,
 *   'corr_abc123',
 *   'Logout from all devices'
 * );
 */
export class RevokeAllSessionsCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  
  constructor(
    /** Confirmation for destructive action */
    public readonly confirm: boolean,
    /** Device context for security audit */
    public readonly deviceInfo ? : DeviceInfo,
    /** Correlation ID for distributed tracing */
    public readonly correlationId ? : string,
    /** Reason for revoking all sessions (for audit) */
    public readonly reason ? : string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
  }
  
  /**
   * Check if confirmation is provided
   */
  public isConfirmed(): boolean {
    return this.confirm === true;
  }
  
  /**
   * Check if current session should be excluded
   */
  public shouldExcludeCurrent(): boolean {
    return this.deviceInfo?.sessionId !== undefined;
  }
  
  /**
   * Get current session ID to exclude
   */
  public getCurrentSessionId(): string | undefined {
    return this.deviceInfo?.sessionId;
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
   * Get revocation reason (or default)
   */
  public getReason(): string {
    return this.reason || 'User initiated - logout from all devices';
  }
}
