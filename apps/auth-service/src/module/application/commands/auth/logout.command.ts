/**
 * Logout Command - Pure Command Data Structure
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/logout.command
 * 
 * @description
 * Command for logging out a user from one or all devices.
 * Note: userId is NOT accepted from client - comes from JWT.
 * 
 * Enterprise Rules:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ Security: userId from JWT, not from client
 * ✅ Framework-free
 * ✅ Bangladesh specific - Device type filtering support
 */

import { randomUUID } from 'crypto';

// ============================================================
// Types
// ============================================================

/**
 * Logout options
 */
export interface LogoutOptions {
  /** Revoke specific session ID */
  sessionId?: string;
  
  /** Revoke all sessions (logout from all devices) */
  allDevices?: boolean;
  
  /** Revoke sessions by device type (Bangladesh specific) */
  deviceType?: 'mobile' | 'tablet' | 'desktop' | 'laptop' | 'feature_phone' | 'tv' | 'wearable';
  
  /** Revoke sessions by device ID */
  deviceId?: string;
  
  /** Keep current session when revoking others */
  keepCurrent?: boolean;
  
  /** Reason for logout (for audit) */
  reason?: string;
}

/**
 * Logout scope
 */
export type LogoutScope = 'current' | 'all' | 'device_type' | 'device_id';

// ============================================================
// Device Info Interface
// ============================================================

export interface LogoutDeviceInfo {
  ipAddress?: string;
  userAgent?: string;
  deviceId?: string;
  sessionId?: string;
  correlationId?: string;
  // Bangladesh specific
  district?: string;
  upazila?: string;
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
}

// ============================================================
// Logout Command
// ============================================================

/**
 * Logout Command
 * 
 * @example
 * // Logout from current session
 * const command = new LogoutCommand(
 *   'refresh_token_abc123',
 *   {
 *     reason: 'User initiated logout'
 *   },
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456'
 *   },
 *   'corr_abc123'
 * );
 * 
 * @example
 * // Logout from all devices
 * const command = new LogoutCommand(
 *   'refresh_token_abc123',
 *   {
 *     allDevices: true,
 *     reason: 'Security precaution'
 *   },
 *   deviceInfo,
 *   'corr_abc123'
 * );
 * 
 * @example
 * // Logout from specific session
 * const command = new LogoutCommand(
 *   'refresh_token_abc123',
 *   {
 *     sessionId: 'sess_xyz789',
 *     reason: 'User revoked session'
 *   },
 *   deviceInfo,
 *   'corr_abc123'
 * );
 * 
 * @example
 * // Logout from all mobile devices (Bangladesh specific)
 * const command = new LogoutCommand(
 *   'refresh_token_abc123',
 *   {
 *     deviceType: 'mobile',
 *     keepCurrent: true,
 *     reason: 'Lost mobile device'
 *   },
 *   deviceInfo,
 *   'corr_abc123'
 * );
 */
export class LogoutCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly scope: LogoutScope;
  
  constructor(
    /** Refresh token to invalidate (optional, can be null) */
    public readonly refreshToken: string | null,
    
    /** Logout options */
    public readonly options?: LogoutOptions,
    
    /** Device context for audit */
    public readonly deviceInfo?: LogoutDeviceInfo,
    
    /** Correlation ID for distributed tracing */
    public readonly correlationId?: string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
    this.scope = this.determineScope();
  }
  
  /**
   * Determine the logout scope from options
   */
  private determineScope(): LogoutScope {
    if (this.options?.allDevices) return 'all';
    if (this.options?.deviceType) return 'device_type';
    if (this.options?.deviceId) return 'device_id';
    if (this.options?.sessionId) return 'current';
    return 'current';
  }
  
  /**
   * Check if logging out from all devices
   */
  public isAllDevices(): boolean {
    return this.scope === 'all';
  }
  
  /**
   * Check if logging out from specific device type
   */
  public isDeviceTypeLogout(): boolean {
    return this.scope === 'device_type';
  }
  
  /**
   * Check if logging out from specific device
   */
  public isDeviceIdLogout(): boolean {
    return this.scope === 'device_id';
  }
  
  /**
   * Check if logging out from current session
   */
  public isCurrentSessionLogout(): boolean {
    return this.scope === 'current';
  }
  
  /**
   * Get session ID to revoke (if specific session)
   */
  public getSessionId(): string | undefined {
    return this.options?.sessionId;
  }
  
  /**
   * Get device type to revoke sessions from
   */
  public getDeviceType(): string | undefined {
    return this.options?.deviceType;
  }
  
  /**
   * Get device ID to revoke sessions from
   */
  public getDeviceId(): string | undefined {
    return this.options?.deviceId;
  }
  
  /**
   * Get logout reason
   */
  public getReason(): string | undefined {
    return this.options?.reason;
  }
  
  /**
   * Check if current session should be kept
   */
  public shouldKeepCurrent(): boolean {
    return this.options?.keepCurrent === true;
  }
  
  /**
   * Check if refresh token is provided (needed for current session logout)
   */
  public hasRefreshToken(): boolean {
    return !!this.refreshToken;
  }
  
  /**
   * Get masked refresh token for logging (privacy)
   */
  public getMaskedRefreshToken(): string {
    if (!this.refreshToken) return '***';
    if (this.refreshToken.length <= 16) return '***';
    return this.refreshToken.slice(0, 8) + '***' + this.refreshToken.slice(-8);
  }
}

// ============================================================
// Admin Logout Command
// ============================================================

/**
 * Admin Logout Command
 * For administrators to log out other users
 * 
 * @example
 * const command = new AdminLogoutCommand(
 *   'admin_123',
 *   'usr_456',
 *   {
 *     allDevices: true,
 *     reason: 'Policy violation'
 *   },
 *   deviceInfo,
 *   'corr_abc123'
 * );
 */
export class AdminLogoutCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  
  constructor(
    /** Admin ID (from JWT) */
    public readonly adminId: string,
    
    /** Target user ID to logout */
    public readonly targetUserId: string,
    
    /** Logout options */
    public readonly options?: LogoutOptions,
    
    /** Device context for audit */
    public readonly deviceInfo?: LogoutDeviceInfo,
    
    /** Correlation ID for distributed tracing */
    public readonly correlationId?: string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
  }
  
  /**
   * Check if logging out from all devices
   */
  public isAllDevices(): boolean {
    return this.options?.allDevices === true;
  }
  
  /**
   * Get logout reason
   */
  public getReason(): string | undefined {
    return this.options?.reason;
  }
  
  /**
   * Get session ID to revoke (if specific session)
   */
  public getSessionId(): string | undefined {
    return this.options?.sessionId;
  }
  
  /**
   * Get masked admin ID for logging
   */
  public getMaskedAdminId(): string {
    if (this.adminId.length <= 8) return '***';
    return this.adminId.slice(0, 4) + '***' + this.adminId.slice(-4);
  }
  
  /**
   * Get masked target user ID for logging
   */
  public getMaskedTargetUserId(): string {
    if (this.targetUserId.length <= 8) return '***';
    return this.targetUserId.slice(0, 4) + '***' + this.targetUserId.slice(-4);
  }
}

// ============================================================
// Bulk Logout Command
// ============================================================

/**
 * Bulk Logout Command
 * For logging out multiple users at once (admin only)
 * 
 * @example
 * const command = new BulkLogoutCommand(
 *   'admin_123',
 *   ['usr_456', 'usr_789'],
 *   {
 *     allDevices: true,
 *     reason: 'Security incident'
 *   },
 *   deviceInfo,
 *   'corr_abc123'
 * );
 */
export class BulkLogoutCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  
  constructor(
    /** Admin ID (from JWT) */
    public readonly adminId: string,
    
    /** Target user IDs to logout */
    public readonly targetUserIds: string[],
    
    /** Logout options */
    public readonly options?: LogoutOptions,
    
    /** Device context for audit */
    public readonly deviceInfo?: LogoutDeviceInfo,
    
    /** Correlation ID for distributed tracing */
    public readonly correlationId?: string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
  }
  
  /**
   * Check if logging out from all devices
   */
  public isAllDevices(): boolean {
    return this.options?.allDevices === true;
  }
  
  /**
   * Get logout reason
   */
  public getReason(): string | undefined {
    return this.options?.reason;
  }
  
  /**
   * Get number of target users
   */
  public getTargetUserCount(): number {
    return this.targetUserIds.length;
  }
  
  /**
   * Get masked admin ID for logging
   */
  public getMaskedAdminId(): string {
    if (this.adminId.length <= 8) return '***';
    return this.adminId.slice(0, 4) + '***' + this.adminId.slice(-4);
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { LogoutOptions as LogoutOptionsType, LogoutDeviceInfo as LogoutDeviceInfoType, LogoutScope as LogoutScopeType };
