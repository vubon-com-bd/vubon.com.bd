/**
 * Revoke Session Command - Pure Command Data Structure
 * 
 * @module application/commands/session/revoke-session.command
 * 
 * @description
 * Command for revoking a specific user session.
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
}

/**
 * Revoke Session Command
 * 
 * @example
 * const command = new RevokeSessionCommand(
 *   'sess_550e8400-e29b-41d4-a716-446655440000',
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456'
 *   },
 *   'corr_abc123',
 *   'User requested logout from this device'
 * );
 */
export class RevokeSessionCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  
  constructor(
    /** Session ID to revoke */
    public readonly sessionId: string,
    /** Device context for security audit */
    public readonly deviceInfo ? : DeviceInfo,
    /** Correlation ID for distributed tracing */
    public readonly correlationId ? : string,
    /** Reason for revoking session (for audit) */
    public readonly reason ? : string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
  }
  
  /**
   * Get session ID
   */
  public getSessionId(): string {
    return this.sessionId;
  }
  
  /**
   * Check if revoking current session
   */
  public isRevokingCurrentSession(currentSessionId: string): boolean {
    return this.sessionId === currentSessionId;
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
    return this.reason || 'User initiated - session revocation';
  }
}
