/**
 * Logout Response DTO - Interface Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module interfaces/dtos/auth/logout.response.dto
 *
 * @description
 * Response DTO for logout endpoint.
 * Returns logout result with session revocation details.
 *
 * Enterprise Features:
 * ✅ Complete logout response with session revocation details
 * ✅ Multi-language support (English/Bengali)
 * ✅ Security event categorization
 * ✅ Audit metadata for compliance
 * ✅ Device information tracking
 * ✅ Bangladesh specific - District/NetworkType fields
 * ✅ Token revocation status
 * ✅ Bulk logout support
 * ✅ Correlation ID for distributed tracing
 * ✅ GDPR compliant
 * ✅ Session count tracking
 *
 * @example
 * // Success response for current session logout
 * {
 *   "success": true,
 *   "message": "Successfully logged out",
 *   "messageBn": "সফলভাবে লগআউট হয়েছে",
 *   "data": {
 *     "sessionsRevoked": 1,
 *     "scope": "current",
 *     "revokedSessionIds": ["sess_1234567890"],
 *     "revokedToken": true,
 *     "currentSessionKept": false,
 *     "securityCategory": "LOGOUT"
 *   },
 *   "correlationId": "corr_1234567890",
 *   "timestamp": "2024-01-15T10:30:00Z"
 * }
 *
 * // Success response for all devices logout
 * {
 *   "success": true,
 *   "message": "Successfully logged out from 5 devices",
 *   "messageBn": "৫টি ডিভাইস থেকে সফলভাবে লগআউট হয়েছে",
 *   "data": {
 *     "sessionsRevoked": 5,
 *     "devicesAffected": 3,
 *     "scope": "all",
 *     "currentSessionKept": false,
 *     "securityCategory": "MASS_LOGOUT"
 *   }
 * }
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

// ============================================================
// Phase-1: shared-constants import
// ============================================================
import { LOGOUT_SCOPE, DEVICE_TYPES } from '@vubon/shared-constants';
import type { LogoutScope } from '@vubon/shared-types';

// ============================================================
// Constants
// ============================================================

/**
 * Security event categories for logging
 */
export enum SecurityEventCategory {
  LOGOUT = 'LOGOUT',
  SESSION_REVOCATION = 'SESSION_REVOCATION',
  DEVICE_LOGOUT = 'DEVICE_LOGOUT',
  MASS_LOGOUT = 'MASS_LOGOUT',
}

/**
 * Logout status types
 */
export enum LogoutStatus {
  SUCCESS = 'success',
  PARTIAL = 'partial',
  FAILED = 'failed',
}

/**
 * Token revocation status
 */
export enum TokenRevocationStatus {
  REVOKED = 'revoked',
  NOT_FOUND = 'not_found',
  ALREADY_REVOKED = 'already_revoked',
  SKIPPED = 'skipped',
}

// ============================================================
// Audit Metadata DTO
// ============================================================

/**
 * Audit metadata for logout response (GDPR compliance)
 */
export class LogoutAuditMetadataDto {
  @ApiPropertyOptional({
    description: 'IP address of the request (masked for privacy)',
    example: '192.168.***.***',
  })
  maskedIp?: string;

  @ApiPropertyOptional({
    description: 'User agent of the request',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  })
  userAgent?: string;

  @ApiPropertyOptional({
    description: 'Device ID (masked for privacy)',
    example: 'dev_****...****1234',
  })
  maskedDeviceId?: string;

  @ApiPropertyOptional({
    description: 'District (Bangladesh specific)',
    example: 'Dhaka',
  })
  district?: string;

  @ApiPropertyOptional({
    description: 'Division (Bangladesh specific)',
    example: 'Dhaka',
  })
  division?: string;

  @ApiPropertyOptional({
    description: 'Mobile operator (Bangladesh specific)',
    example: 'gp',
    enum: ['gp', 'robi', 'banglalink', 'teletalk', 'unknown'],
  })
  mobileOperator?: string;

  @ApiPropertyOptional({
    description: 'Network type (Bangladesh specific)',
    example: '4g',
    enum: ['2g', '3g', '4g', '5g', 'wifi', 'unknown'],
  })
  networkType?: string;

  @ApiPropertyOptional({
    description: 'Request timestamp',
    example: '2024-01-15T10:30:00Z',
  })
  timestamp?: string;

  @ApiPropertyOptional({
    description: 'Request ID for tracing',
    example: 'req_550e8400-e29b-41d4-a716-446655440000',
  })
  requestId?: string;

  constructor(data: Partial<LogoutAuditMetadataDto>) {
    Object.assign(this, data);
  }
}

// ============================================================
// Token Revocation Info DTO
// ============================================================

/**
 * Token revocation information
 */
export class TokenRevocationInfoDto {
  @ApiPropertyOptional({
    description: 'Token revocation status',
    enum: TokenRevocationStatus,
    example: TokenRevocationStatus.REVOKED,
  })
  status?: TokenRevocationStatus;

  @ApiPropertyOptional({
    description: 'Token ID (masked for privacy)',
    example: 'tok_****...****5678',
  })
  maskedTokenId?: string;

  @ApiPropertyOptional({
    description: 'Revocation timestamp',
    example: '2024-01-15T10:30:00Z',
  })
  revokedAt?: string;

  @ApiPropertyOptional({
    description: 'Reason for revocation (if any)',
    example: 'User initiated logout',
  })
  reason?: string;

  constructor(data: Partial<TokenRevocationInfoDto>) {
    Object.assign(this, data);
  }
}

// ============================================================
// Session Revocation Info DTO
// ============================================================

/**
 * Session revocation information
 */
export class SessionRevocationInfoDto {
  @ApiProperty({
    description: 'Number of sessions revoked',
    example: 1,
    minimum: 0,
  })
  sessionsRevoked: number;

  @ApiPropertyOptional({
    description: 'Revoked session IDs (for debugging)',
    example: ['sess_abc123', 'sess_def456'],
    isArray: true,
  })
  revokedSessionIds?: string[];

  @ApiPropertyOptional({
    description: 'Number of devices affected',
    example: 1,
  })
  devicesAffected?: number;

  @ApiPropertyOptional({
    description: 'Revoked device IDs (for debugging)',
    example: ['device_abc123'],
    isArray: true,
  })
  revokedDeviceIds?: string[];

  @ApiPropertyOptional({
    description: 'Whether current session was kept',
    example: false,
  })
  currentSessionKept?: boolean;

  @ApiPropertyOptional({
    description: 'Whether this was the last active session',
    example: true,
  })
  wasLastSession?: boolean;

  @ApiPropertyOptional({
    description: 'Number of remaining active sessions',
    example: 0,
    minimum: 0,
  })
  remainingSessions?: number;

  @ApiPropertyOptional({
    description: 'Token revocation information',
    type: TokenRevocationInfoDto,
  })
  tokenRevocation?: TokenRevocationInfoDto;

  constructor(data: Partial<SessionRevocationInfoDto>) {
    Object.assign(this, data);
  }
}

// ============================================================
// Bulk Logout Result DTO
// ============================================================

/**
 * Bulk logout result entry
 */
export class BulkLogoutResultEntryDto {
  @ApiPropertyOptional({
    description: 'Session ID (if applicable)',
    example: 'sess_abc123',
  })
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'Device ID (if applicable)',
    example: 'device_abc123',
  })
  deviceId?: string;

  @ApiProperty({
    description: 'Whether the revocation was successful',
    example: true,
  })
  success: boolean;

  @ApiPropertyOptional({
    description: 'Error reason if failed',
    example: 'Session not found',
  })
  error?: string;

  @ApiPropertyOptional({
    description: 'Error reason in Bengali',
    example: 'সেশন পাওয়া যায়নি',
  })
  errorBn?: string;

  constructor(data: Partial<BulkLogoutResultEntryDto>) {
    Object.assign(this, data);
  }
}

// ============================================================
// Bulk Logout Data DTO
// ============================================================

/**
 * Bulk logout data
 */
export class BulkLogoutDataDto {
  @ApiProperty({
    description: 'Total sessions requested for revocation',
    example: 10,
    minimum: 0,
  })
  totalRequested: number;

  @ApiProperty({
    description: 'Successful revocations',
    example: 9,
    minimum: 0,
  })
  successful: number;

  @ApiProperty({
    description: 'Failed revocations',
    example: 1,
    minimum: 0,
  })
  failed: number;

  @ApiPropertyOptional({
    description: 'List of failed revocations',
    type: [BulkLogoutResultEntryDto],
  })
  failures?: BulkLogoutResultEntryDto[];

  @ApiPropertyOptional({
    description: 'Processing duration in milliseconds',
    example: 150,
    minimum: 0,
  })
  durationMs?: number;

  @ApiPropertyOptional({
    description: 'Total devices affected',
    example: 5,
  })
  devicesAffected?: number;

  @ApiPropertyOptional({
    description: 'User IDs affected (if admin bulk logout)',
    example: ['usr_abc123', 'usr_def456'],
    isArray: true,
  })
  affectedUserIds?: string[];

  constructor(data: Partial<BulkLogoutDataDto>) {
    Object.assign(this, data);
  }
}

// ============================================================
// Main Logout Response Data DTO
// ============================================================

/**
 * Logout response data
 */
export class LogoutResponseDataDto {
  @ApiProperty({
    description: 'Number of sessions revoked',
    example: 1,
    minimum: 0,
  })
  sessionsRevoked: number;

  @ApiPropertyOptional({
    description: 'Logout scope',
    enum: LOGOUT_SCOPE,
    example: 'current',
  })
  scope?: LogoutScope;

  @ApiPropertyOptional({
    description: 'Revoked session IDs (for debugging)',
    example: ['sess_abc123'],
    isArray: true,
  })
  revokedSessionIds?: string[];

  @ApiPropertyOptional({
    description: 'Revoked device IDs (for debugging)',
    example: ['device_abc123'],
    isArray: true,
  })
  revokedDeviceIds?: string[];

  @ApiPropertyOptional({
    description: 'Number of devices affected',
    example: 1,
  })
  devicesAffected?: number;

  @ApiPropertyOptional({
    description: 'Whether current session was kept',
    example: false,
  })
  currentSessionKept?: boolean;

  @ApiPropertyOptional({
    description: 'Whether token was revoked',
    example: true,
  })
  tokenRevoked?: boolean;

  @ApiPropertyOptional({
    description: 'Security event category',
    enum: SecurityEventCategory,
    example: SecurityEventCategory.LOGOUT,
  })
  securityCategory?: SecurityEventCategory;

  @ApiPropertyOptional({
    description: 'Remaining active sessions',
    example: 0,
    minimum: 0,
  })
  remainingSessions?: number;

  @ApiPropertyOptional({
    description: 'Bulk logout data (if bulk operation)',
    type: BulkLogoutDataDto,
  })
  bulkData?: BulkLogoutDataDto;

  @ApiPropertyOptional({
    description: 'Audit metadata',
    type: LogoutAuditMetadataDto,
  })
  auditMetadata?: LogoutAuditMetadataDto;

  @ApiPropertyOptional({
    description: 'Logout reason',
    example: 'User initiated logout',
  })
  reason?: string;

  @ApiPropertyOptional({
    description: 'Logout reason in Bengali',
    example: 'ব্যবহারকারী লগআউট করেছেন',
  })
  reasonBn?: string;

  constructor(data: Partial<LogoutResponseDataDto>) {
    Object.assign(this, data);
  }
}

// ============================================================
// Main Logout Response DTO
// ============================================================

/**
 * Logout Response DTO
 */
export class LogoutResponseDto {
  @ApiProperty({
    description: 'Success status',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Logout status',
    enum: LogoutStatus,
    example: LogoutStatus.SUCCESS,
  })
  status: LogoutStatus;

  @ApiProperty({
    description: 'Response message (English)',
    example: 'Successfully logged out',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Response message (Bengali)',
    example: 'সফলভাবে লগআউট হয়েছে',
  })
  messageBn?: string;

  @ApiPropertyOptional({
    description: 'Logout response data',
    type: LogoutResponseDataDto,
  })
  data?: LogoutResponseDataDto;

  @ApiPropertyOptional({
    description: 'Error code (if failed)',
    example: 'SESSION_NOT_FOUND',
  })
  errorCode?: string;

  @ApiPropertyOptional({
    description: 'Error details (if failed)',
    example: 'Session not found',
  })
  errorDetails?: string;

  @ApiPropertyOptional({
    description: 'Error details in Bengali',
    example: 'সেশন পাওয়া যায়নি',
  })
  errorDetailsBn?: string;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_1234567890',
  })
  correlationId?: string;

  @ApiProperty({
    description: 'Response timestamp',
    example: '2024-01-15T10:30:00Z',
  })
  timestamp: string;

  // ============================================================
  // Constructors
  // ============================================================

  /**
   * Create a successful logout response
   */
  static success(data: {
    sessionsRevoked: number;
    scope?: LogoutScope;
    revokedSessionIds?: string[];
    revokedDeviceIds?: string[];
    devicesAffected?: number;
    currentSessionKept?: boolean;
    tokenRevoked?: boolean;
    securityCategory?: SecurityEventCategory;
    remainingSessions?: number;
    reason?: string;
    reasonBn?: string;
    auditMetadata?: LogoutAuditMetadataDto;
    correlationId?: string;
    message?: string;
    messageBn?: string;
  }): LogoutResponseDto {
    const response = new LogoutResponseDto();
    response.success = true;
    response.status = LogoutStatus.SUCCESS;
    response.message = data.message || 
      (data.sessionsRevoked === 1 ? 'Successfully logged out' : `Successfully logged out from ${data.sessionsRevoked} sessions`);
    response.messageBn = data.messageBn || 
      (data.sessionsRevoked === 1 ? 'সফলভাবে লগআউট হয়েছে' : `${data.sessionsRevoked}টি সেশন থেকে সফলভাবে লগআউট হয়েছে`);
    response.correlationId = data.correlationId;
    response.timestamp = new Date().toISOString();

    response.data = new LogoutResponseDataDto({
      sessionsRevoked: data.sessionsRevoked,
      scope: data.scope,
      revokedSessionIds: data.revokedSessionIds,
      revokedDeviceIds: data.revokedDeviceIds,
      devicesAffected: data.devicesAffected,
      currentSessionKept: data.currentSessionKept,
      tokenRevoked: data.tokenRevoked,
      securityCategory: data.securityCategory,
      remainingSessions: data.remainingSessions,
      reason: data.reason,
      reasonBn: data.reasonBn,
      auditMetadata: data.auditMetadata,
    });

    return response;
  }

  /**
   * Create a response for logout from all devices
   */
  static allDevices(data: {
    sessionsRevoked: number;
    devicesAffected?: number;
    currentSessionKept?: boolean;
    tokenRevoked?: boolean;
    securityCategory?: SecurityEventCategory;
    remainingSessions?: number;
    reason?: string;
    reasonBn?: string;
    auditMetadata?: LogoutAuditMetadataDto;
    correlationId?: string;
    message?: string;
    messageBn?: string;
  }): LogoutResponseDto {
    const response = LogoutResponseDto.success({
      sessionsRevoked: data.sessionsRevoked,
      scope: 'all',
      devicesAffected: data.devicesAffected,
      currentSessionKept: data.currentSessionKept,
      tokenRevoked: data.tokenRevoked,
      securityCategory: data.securityCategory || SecurityEventCategory.MASS_LOGOUT,
      remainingSessions: data.remainingSessions,
      reason: data.reason,
      reasonBn: data.reasonBn,
      auditMetadata: data.auditMetadata,
      correlationId: data.correlationId,
      message: data.message || `Successfully logged out from ${data.sessionsRevoked} devices`,
      messageBn: data.messageBn || `${data.sessionsRevoked}টি ডিভাইস থেকে সফলভাবে লগআউট হয়েছে`,
    });

    return response;
  }

  /**
   * Create a response for device-specific logout
   */
  static device(data: {
    sessionsRevoked: number;
    deviceId: string;
    currentSessionKept?: boolean;
    tokenRevoked?: boolean;
    securityCategory?: SecurityEventCategory;
    remainingSessions?: number;
    reason?: string;
    reasonBn?: string;
    auditMetadata?: LogoutAuditMetadataDto;
    correlationId?: string;
    message?: string;
    messageBn?: string;
  }): LogoutResponseDto {
    const response = LogoutResponseDto.success({
      sessionsRevoked: data.sessionsRevoked,
      scope: 'device',
      revokedDeviceIds: [data.deviceId],
      devicesAffected: 1,
      currentSessionKept: data.currentSessionKept,
      tokenRevoked: data.tokenRevoked,
      securityCategory: data.securityCategory || SecurityEventCategory.DEVICE_LOGOUT,
      remainingSessions: data.remainingSessions,
      reason: data.reason,
      reasonBn: data.reasonBn,
      auditMetadata: data.auditMetadata,
      correlationId: data.correlationId,
      message: data.message || `Successfully logged out from device`,
      messageBn: data.messageBn || 'ডিভাইস থেকে সফলভাবে লগআউট হয়েছে',
    });

    return response;
  }

  /**
   * Create a response for bulk logout
   */
  static bulk(data: {
    totalRequested: number;
    successful: number;
    failed: number;
    failures?: BulkLogoutResultEntryDto[];
    durationMs?: number;
    devicesAffected?: number;
    affectedUserIds?: string[];
    securityCategory?: SecurityEventCategory;
    reason?: string;
    reasonBn?: string;
    auditMetadata?: LogoutAuditMetadataDto;
    correlationId?: string;
    message?: string;
    messageBn?: string;
  }): LogoutResponseDto {
    const response = new LogoutResponseDto();
    response.success = data.failed === 0;
    response.status = data.failed === 0 ? LogoutStatus.SUCCESS : LogoutStatus.PARTIAL;
    response.message = data.message || `Bulk logout: ${data.successful} successful, ${data.failed} failed`;
    response.messageBn = data.messageBn || `বাল্ক লগআউট: ${data.successful}টি সফল, ${data.failed}টি ব্যর্থ`;
    response.correlationId = data.correlationId;
    response.timestamp = new Date().toISOString();

    response.data = new LogoutResponseDataDto({
      sessionsRevoked: data.successful,
      devicesAffected: data.devicesAffected,
      securityCategory: data.securityCategory || SecurityEventCategory.MASS_LOGOUT,
      reason: data.reason,
      reasonBn: data.reasonBn,
      auditMetadata: data.auditMetadata,
      bulkData: new BulkLogoutDataDto({
        totalRequested: data.totalRequested,
        successful: data.successful,
        failed: data.failed,
        failures: data.failures,
        durationMs: data.durationMs,
        devicesAffected: data.devicesAffected,
        affectedUserIds: data.affectedUserIds,
      }),
    });

    if (data.failed > 0) {
      response.errorCode = 'BULK_LOGOUT_PARTIAL_FAILURE';
      response.errorDetails = `${data.failed} revocations failed`;
      response.errorDetailsBn = `${data.failed}টি রিভোকেশন ব্যর্থ হয়েছে`;
    }

    return response;
  }

  /**
   * Create a failed logout response
   */
  static failed(data: {
    message: string;
    messageBn?: string;
    errorCode?: string;
    errorDetails?: string;
    errorDetailsBn?: string;
    correlationId?: string;
  }): LogoutResponseDto {
    const response = new LogoutResponseDto();
    response.success = false;
    response.status = LogoutStatus.FAILED;
    response.message = data.message;
    response.messageBn = data.messageBn;
    response.errorCode = data.errorCode || 'LOGOUT_FAILED';
    response.errorDetails = data.errorDetails;
    response.errorDetailsBn = data.errorDetailsBn;
    response.correlationId = data.correlationId;
    response.timestamp = new Date().toISOString();

    response.data = new LogoutResponseDataDto({
      sessionsRevoked: 0,
    });

    return response;
  }

  /**
   * Create a response for session not found
   */
  static sessionNotFound(data: {
    sessionId: string;
    correlationId?: string;
    message?: string;
    messageBn?: string;
  }): LogoutResponseDto {
    return LogoutResponseDto.failed({
      message: data.message || `Session ${data.sessionId} not found`,
      messageBn: data.messageBn || `সেশন ${data.sessionId} পাওয়া যায়নি`,
      errorCode: 'SESSION_NOT_FOUND',
      errorDetails: `Session ID: ${data.sessionId}`,
      correlationId: data.correlationId,
    });
  }

  /**
   * Create a response for session already revoked
   */
  static alreadyRevoked(data: {
    sessionId: string;
    correlationId?: string;
    message?: string;
    messageBn?: string;
  }): LogoutResponseDto {
    return LogoutResponseDto.failed({
      message: data.message || `Session ${data.sessionId} already revoked`,
      messageBn: data.messageBn || `সেশন ${data.sessionId} ইতিমধ্যে রিভোক করা হয়েছে`,
      errorCode: 'SESSION_ALREADY_REVOKED',
      errorDetails: `Session ID: ${data.sessionId}`,
      correlationId: data.correlationId,
    });
  }

  /**
   * Create a response for unauthorized session revocation
   */
  static unauthorized(data: {
    correlationId?: string;
    message?: string;
    messageBn?: string;
  }): LogoutResponseDto {
    return LogoutResponseDto.failed({
      message: data.message || 'Unauthorized to revoke this session',
      messageBn: data.messageBn || 'এই সেশন রিভোক করার অনুমতি নেই',
      errorCode: 'UNAUTHORIZED_SESSION_REVOCATION',
      correlationId: data.correlationId,
    });
  }

  /**
   * Create a response for rate limit exceeded
   */
  static rateLimited(data: {
    retryAfterSeconds: number;
    correlationId?: string;
    message?: string;
    messageBn?: string;
  }): LogoutResponseDto {
    const response = LogoutResponseDto.failed({
      message: data.message || `Too many logout attempts. Please try again in ${data.retryAfterSeconds} seconds.`,
      messageBn: data.messageBn || `অনেকবার লগআউট চেষ্টা করা হয়েছে। ${data.retryAfterSeconds} সেকেন্ড পরে আবার চেষ্টা করুন।`,
      errorCode: 'RATE_LIMIT_EXCEEDED',
      correlationId: data.correlationId,
    });

    (response as any).retryAfterSeconds = data.retryAfterSeconds;

    return response;
  }

  /**
   * Create a response for invalid refresh token
   */
  static invalidRefreshToken(data: {
    correlationId?: string;
    message?: string;
    messageBn?: string;
  }): LogoutResponseDto {
    return LogoutResponseDto.failed({
      message: data.message || 'Invalid refresh token provided',
      messageBn: data.messageBn || 'অবৈধ রিফ্রেশ টোকেন প্রদান করা হয়েছে',
      errorCode: 'INVALID_REFRESH_TOKEN',
      correlationId: data.correlationId,
    });
  }

  // ============================================================
  // Helper Methods
  // ============================================================

  /**
   * Check if response is successful
   */
  isSuccess(): boolean {
    return this.success === true;
  }

  /**
   * Check if response is a bulk logout response
   */
  isBulkResponse(): boolean {
    return !!this.data?.bulkData;
  }

  /**
   * Get number of sessions revoked
   */
  getSessionsRevoked(): number {
    return this.data?.sessionsRevoked || 0;
  }

  /**
   * Get number of devices affected
   */
  getDevicesAffected(): number | undefined {
    return this.data?.devicesAffected;
  }

  /**
   * Get logout scope
   */
  getScope(): LogoutScope | undefined {
    return this.data?.scope;
  }

  /**
   * Get security category
   */
  getSecurityCategory(): SecurityEventCategory | undefined {
    return this.data?.securityCategory;
  }

  /**
   * Check if token was revoked
   */
  wasTokenRevoked(): boolean {
    return this.data?.tokenRevoked === true;
  }

  /**
   * Check if current session was kept
   */
  wasCurrentSessionKept(): boolean {
    return this.data?.currentSessionKept === true;
  }

  /**
   * Get error code (if failed)
   */
  getErrorCode(): string | undefined {
    return this.errorCode;
  }

  /**
   * Get retry after seconds (if rate limited)
   */
  getRetryAfterSeconds(): number | undefined {
    return (this as any).retryAfterSeconds;
  }

  /**
   * Convert to plain object for API response
   */
  toPlainObject(): Record<string, unknown> {
    const result: Record<string, unknown> = {
      success: this.success,
      status: this.status,
      message: this.message,
      timestamp: this.timestamp,
    };

    if (this.messageBn) {
      result.messageBn = this.messageBn;
    }

    if (this.correlationId) {
      result.correlationId = this.correlationId;
    }

    if (this.errorCode) {
      result.errorCode = this.errorCode;
    }

    if (this.errorDetails) {
      result.errorDetails = this.errorDetails;
    }

    if (this.errorDetailsBn) {
      result.errorDetailsBn = this.errorDetailsBn;
    }

    if (this.data) {
      result.data = {
        sessionsRevoked: this.data.sessionsRevoked,
      };

      if (this.data.scope) {
        (result.data as Record<string, unknown>).scope = this.data.scope;
      }

      if (this.data.revokedSessionIds && this.data.revokedSessionIds.length > 0) {
        (result.data as Record<string, unknown>).revokedSessionIds = this.data.revokedSessionIds;
      }

      if (this.data.revokedDeviceIds && this.data.revokedDeviceIds.length > 0) {
        (result.data as Record<string, unknown>).revokedDeviceIds = this.data.revokedDeviceIds;
      }

      if (this.data.devicesAffected !== undefined) {
        (result.data as Record<string, unknown>).devicesAffected = this.data.devicesAffected;
      }

      if (this.data.currentSessionKept !== undefined) {
        (result.data as Record<string, unknown>).currentSessionKept = this.data.currentSessionKept;
      }

      if (this.data.tokenRevoked !== undefined) {
        (result.data as Record<string, unknown>).tokenRevoked = this.data.tokenRevoked;
      }

      if (this.data.securityCategory) {
        (result.data as Record<string, unknown>).securityCategory = this.data.securityCategory;
      }

      if (this.data.remainingSessions !== undefined) {
        (result.data as Record<string, unknown>).remainingSessions = this.data.remainingSessions;
      }

      if (this.data.reason) {
        (result.data as Record<string, unknown>).reason = this.data.reason;
      }

      if (this.data.reasonBn) {
        (result.data as Record<string, unknown>).reasonBn = this.data.reasonBn;
      }

      if (this.data.auditMetadata) {
        (result.data as Record<string, unknown>).auditMetadata = this.data.auditMetadata;
      }

      if (this.data.bulkData) {
        (result.data as Record<string, unknown>).bulk = {
          totalRequested: this.data.bulkData.totalRequested,
          successful: this.data.bulkData.successful,
          failed: this.data.bulkData.failed,
        };

        if (this.data.bulkData.failures && this.data.bulkData.failures.length > 0) {
          (result.data as Record<string, unknown>).bulkFailures = this.data.bulkData.failures;
        }

        if (this.data.bulkData.durationMs !== undefined) {
          (result.data as Record<string, unknown>).durationMs = this.data.bulkData.durationMs;
        }

        if (this.data.bulkData.devicesAffected !== undefined) {
          (result.data as Record<string, unknown>).devicesAffected = this.data.bulkData.devicesAffected;
        }

        if (this.data.bulkData.affectedUserIds && this.data.bulkData.affectedUserIds.length > 0) {
          (result.data as Record<string, unknown>).affectedUserIds = this.data.bulkData.affectedUserIds;
        }
      }
    }

    if ((this as any).retryAfterSeconds !== undefined) {
      result.retryAfterSeconds = (this as any).retryAfterSeconds;
    }

    return result;
  }
}

// ============================================================
// Simplified Logout Response DTO (For common use cases)
// ============================================================

/**
 * Simplified logout response (tokens only)
 */
export class SimpleLogoutResponseDto {
  @ApiProperty({
    description: 'Success status',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    example: 'Successfully logged out',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Response message (Bengali)',
    example: 'সফলভাবে লগআউট হয়েছে',
  })
  messageBn?: string;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_1234567890',
  })
  correlationId?: string;

  @ApiProperty({
    description: 'Response timestamp',
    example: '2024-01-15T10:30:00Z',
  })
  timestamp: string;

  constructor(data: {
    success: boolean;
    message: string;
    messageBn?: string;
    correlationId?: string;
  }) {
    this.success = data.success;
    this.message = data.message;
    this.messageBn = data.messageBn;
    this.correlationId = data.correlationId;
    this.timestamp = new Date().toISOString();
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { LogoutResponseDataDto as LogoutResponseDataType };
export type { LogoutAuditMetadataDto as LogoutAuditMetadataType };
export type { BulkLogoutDataDto as BulkLogoutDataType };
export type { BulkLogoutResultEntryDto as BulkLogoutResultEntryType };
