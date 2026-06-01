/**
 * Refresh Token Command - Pure Command Data Structure
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/refresh-token.command
 * 
 * @description
 * Command for refreshing an expired access token using a refresh token.
 * Contains device context for security monitoring and audit.
 * 
 * Enterprise Rules:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ No validation (handled by handler)
 * ✅ Framework-free
 * ✅ Bangladesh specific - Network type and mobile operator tracking
 */

import { randomUUID } from 'crypto';

// ============================================================
// Types
// ============================================================

/**
 * Device information for security audit (Bangladesh specific)
 */
export interface DeviceInfo {
  /** IP address of the request */
  ipAddress ? : string;
  
  /** User agent string */
  userAgent ? : string;
  
  /** Device identifier */
  deviceId ? : string;
  
  /** Session ID (if available) */
  sessionId ? : string;
  
  /** Correlation ID for distributed tracing */
  correlationId ? : string;
  
  /** Request ID for API log linking */
  requestId ? : string;
  
  // Bangladesh specific fields
  /** District (from IP geolocation) */
  district ? : string;
  
  /** Upazila (from IP geolocation) */
  upazila ? : string;
  
  /** Mobile operator (for mobile network users) */
  mobileOperator ? : 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  
  /** Network type (2G, 3G, 4G, 5G, WiFi) */
  networkType ? : '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  
  /** Whether data saver is enabled */
  dataSaverEnabled ? : boolean;
}

// ============================================================
// Command Class
// ============================================================

/**
 * Refresh Token Command
 * 
 * @example
 * const command = new RefreshTokenCommand(
 *   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456',
 *     mobileOperator: 'gp',
 *     networkType: '4g'
 *   },
 *   'corr_abc123'
 * );
 */
export class RefreshTokenCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  
  constructor(
    /** Refresh token to exchange for new tokens */
    public readonly refreshToken: string,
    /** Device context for security audit */
    public readonly deviceInfo ? : DeviceInfo,
    /** Correlation ID for distributed tracing */
    public readonly correlationId ? : string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
  }
  
  /**
   * Get device ID from device info
   */
  getDeviceId(): string | undefined {
    return this.deviceInfo?.deviceId;
  }
  
  /**
   * Get IP address from device info
   */
  getIpAddress(): string | undefined {
    return this.deviceInfo?.ipAddress;
  }
  
  /**
   * Get user agent from device info
   */
  getUserAgent(): string | undefined {
    return this.deviceInfo?.userAgent;
  }
  
  /**
   * Get session ID from device info
   */
  getSessionId(): string | undefined {
    return this.deviceInfo?.sessionId;
  }
  
  /**
   * Get mobile operator (Bangladesh specific)
   */
  getMobileOperator(): string | undefined {
    return this.deviceInfo?.mobileOperator;
  }
  
  /**
   * Get network type (Bangladesh specific)
   */
  getNetworkType(): string | undefined {
    return this.deviceInfo?.networkType;
  }
  
  /**
   * Check if device info is present
   */
  hasDeviceInfo(): boolean {
    return !!this.deviceInfo && (
      !!this.deviceInfo.ipAddress ||
      !!this.deviceInfo.userAgent ||
      !!this.deviceInfo.deviceId
    );
  }
}

// ============================================================
// Command Result
// ============================================================

/**
 * Refresh Token Command Result
 */
export interface RefreshTokenCommandResult {
  /** Whether the operation was successful */
  success: boolean;
  
  /** New access token */
  accessToken ? : string;
  
  /** New refresh token (if rotated) */
  refreshToken ? : string;
  
  /** Access token expiry in seconds */
  expiresIn ? : number;
  
  /** Refresh token expiry in seconds */
  refreshExpiresIn ? : number;
  
  /** Token type (always 'Bearer') */
  tokenType ? : 'Bearer';
  
  /** Session ID (if session was rotated) */
  sessionId ? : string;
  
  /** Error message (if failed) */
  error ? : string;
  
  /** Error code for programmatic handling */
  errorCode ? : 'INVALID_TOKEN' | 'TOKEN_EXPIRED' | 'TOKEN_REVOKED' | 'DEVICE_MISMATCH' | 'SESSION_NOT_FOUND';
}

// ============================================================
// Command Result Factory
// ============================================================

export class RefreshTokenCommandResultFactory {
  static success(
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    refreshExpiresIn: number,
    sessionId ? : string
  ): RefreshTokenCommandResult {
    return {
      success: true,
      accessToken,
      refreshToken,
      expiresIn,
      refreshExpiresIn,
      tokenType: 'Bearer',
      sessionId,
    };
  }
  
  static error(
    error: string,
    errorCode: RefreshTokenCommandResult['errorCode']
  ): RefreshTokenCommandResult {
    return {
      success: false,
      error,
      errorCode,
    };
  }
  
  static invalidToken(): RefreshTokenCommandResult {
    return this.error('Invalid refresh token', 'INVALID_TOKEN');
  }
  
  static tokenExpired(): RefreshTokenCommandResult {
    return this.error('Refresh token has expired', 'TOKEN_EXPIRED');
  }
  
  static tokenRevoked(): RefreshTokenCommandResult {
    return this.error('Refresh token has been revoked', 'TOKEN_REVOKED');
  }
  
  static deviceMismatch(): RefreshTokenCommandResult {
    return this.error('Device mismatch - token was issued for a different device', 'DEVICE_MISMATCH');
  }
  
  static sessionNotFound(): RefreshTokenCommandResult {
    return this.error('Associated session not found', 'SESSION_NOT_FOUND');
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { DeviceInfo as DeviceInfoType };
