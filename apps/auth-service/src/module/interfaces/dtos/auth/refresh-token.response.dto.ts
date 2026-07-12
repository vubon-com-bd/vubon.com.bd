/**
 * Refresh Token Response DTO - Interface Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module interfaces/dtos/auth/refresh-token.response.dto
 *
 * @description
 * Response DTO for refresh token endpoint.
 * Returns new access token and optional new refresh token.
 *
 * Enterprise Features:
 * ✅ Complete token response with expiry information
 * ✅ Multi-language support (English/Bengali)
 * ✅ Token rotation tracking
 * ✅ Session information
 * ✅ Security headers
 * ✅ Bangladesh specific - District/NetworkType fields
 * ✅ Audit trail ready
 * ✅ GDPR compliant
 * ✅ Token version tracking
 * ✅ Device trust information
 * ✅ Correlation ID for distributed tracing
 *
 * @example
 * // Success response
 * {
 *   "success": true,
 *   "message": "Token refreshed successfully",
 *   "data": {
 *     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *     "tokenType": "Bearer",
 *     "expiresIn": 900,
 *     "refreshExpiresIn": 604800,
 *     "tokenVersion": 2,
 *     "sessionId": "sess_1234567890",
 *     "familyId": "fam_1234567890",
 *     "rotationCount": 2,
 *     "isNewToken": true,
 *     "deviceTrusted": true
 *   },
 *   "correlationId": "corr_1234567890",
 *   "timestamp": "2024-01-15T10:30:00Z"
 * }
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

// ============================================================
// Phase-1: shared-constants import
// ============================================================
import { TOKEN_CONFIG, SESSION_CONFIG } from '@vubon/shared-constants';

// ============================================================
// Constants
// ============================================================

/**
 * Token type constants
 */
export const TOKEN_TYPES = {
  BEARER: 'Bearer',
} as const;

/**
 * Token refresh status
 */
export enum RefreshTokenStatus {
  SUCCESS = 'success',
  ROTATED = 'rotated',
  SAME = 'same',
  ERROR = 'error',
}

// ============================================================
// Token Info DTO
// ============================================================

/**
 * Token information in refresh response
 */
export class TokenInfoDto {
  @ApiProperty({
    description: 'Access token (JWT)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  accessToken: string;

  @ApiPropertyOptional({
    description: 'Refresh token (JWT) - only provided when rotated',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  refreshToken?: string;

  @ApiProperty({
    description: 'Token type',
    example: 'Bearer',
    default: 'Bearer',
  })
  tokenType: string = TOKEN_TYPES.BEARER;

  @ApiProperty({
    description: 'Access token expiry in seconds',
    example: 900,
  })
  expiresIn: number;

  @ApiPropertyOptional({
    description: 'Refresh token expiry in seconds (only when rotated)',
    example: 604800,
  })
  refreshExpiresIn?: number;

  @ApiPropertyOptional({
    description: 'Token version (increments on rotation)',
    example: 2,
  })
  tokenVersion?: number;

  @ApiPropertyOptional({
    description: 'Token family ID',
    example: 'fam_1234567890',
  })
  familyId?: string;

  @ApiPropertyOptional({
    description: 'Rotation count',
    example: 2,
  })
  rotationCount?: number;

  @ApiPropertyOptional({
    description: 'Whether a new token was issued',
    example: true,
  })
  isNewToken?: boolean;

  @ApiPropertyOptional({
    description: 'Refresh token status',
    enum: RefreshTokenStatus,
    example: RefreshTokenStatus.ROTATED,
  })
  refreshStatus?: RefreshTokenStatus;

  constructor(data: Partial<TokenInfoDto>) {
    Object.assign(this, data);
    this.tokenType = this.tokenType || TOKEN_TYPES.BEARER;
  }
}

// ============================================================
// Session Info DTO
// ============================================================

/**
 * Session information in refresh response
 */
export class SessionInfoDto {
  @ApiPropertyOptional({
    description: 'Session ID',
    example: 'sess_1234567890',
  })
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'Whether session was extended',
    example: true,
  })
  extended?: boolean;

  @ApiPropertyOptional({
    description: 'New session expiry time (ISO)',
    example: '2024-01-15T11:30:00Z',
  })
  newExpiryAt?: string;

  @ApiPropertyOptional({
    description: 'Session extension in seconds',
    example: 3600,
  })
  extensionSeconds?: number;

  @ApiPropertyOptional({
    description: 'Remaining session time in seconds',
    example: 7200,
  })
  remainingSeconds?: number;

  @ApiPropertyOptional({
    description: 'Whether session was revalidated',
    example: true,
  })
  revalidated?: boolean;

  constructor(data: Partial<SessionInfoDto>) {
    Object.assign(this, data);
  }
}

// ============================================================
// Security Info DTO
// ============================================================

/**
 * Security information in refresh response
 */
export class SecurityInfoDto {
  @ApiPropertyOptional({
    description: 'Whether device is trusted',
    example: true,
  })
  deviceTrusted?: boolean;

  @ApiPropertyOptional({
    description: 'Device trust level',
    example: 'trusted',
    enum: ['untrusted', 'standard', 'trusted', 'high_trust', 'maximum_trust'],
  })
  trustLevel?: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';

  @ApiPropertyOptional({
    description: 'Device information',
    example: { type: 'desktop', browser: 'Chrome', os: 'Windows' },
  })
  deviceInfo?: Record<string, unknown>;

  @ApiPropertyOptional({
    description: 'IP address (masked for privacy)',
    example: '192.168.***.***',
  })
  maskedIp?: string;

  @ApiPropertyOptional({
    description: 'District (Bangladesh specific)',
    example: 'Dhaka',
  })
  district?: string;

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
    description: 'Whether security alert was triggered',
    example: false,
  })
  securityAlertTriggered?: boolean;

  @ApiPropertyOptional({
    description: 'Security alert message (if triggered)',
    example: 'Suspicious rotation detected',
  })
  securityAlertMessage?: string;

  constructor(data: Partial<SecurityInfoDto>) {
    Object.assign(this, data);
  }
}

// ============================================================
// Metrics Info DTO
// ============================================================

/**
 * Metrics information in refresh response
 */
export class MetricsInfoDto {
  @ApiPropertyOptional({
    description: 'Token health score (0-100)',
    example: 85,
  })
  healthScore?: number;

  @ApiPropertyOptional({
    description: 'Health status',
    example: 'good',
    enum: ['excellent', 'good', 'fair', 'poor', 'critical'],
  })
  healthStatus?: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';

  @ApiPropertyOptional({
    description: 'Rotation velocity (rotations per hour)',
    example: 0.5,
  })
  rotationVelocity?: number;

  @ApiPropertyOptional({
    description: 'Time since last rotation (seconds)',
    example: 3600,
  })
  timeSinceLastRotation?: number;

  @ApiPropertyOptional({
    description: 'Whether velocity is suspicious',
    example: false,
  })
  isVelocitySuspicious?: boolean;

  @ApiPropertyOptional({
    description: 'Recommended action',
    example: 'maintain',
    enum: ['extend', 'maintain', 'rotate', 'revoke'],
  })
  recommendedAction?: 'extend' | 'maintain' | 'rotate' | 'revoke';

  constructor(data: Partial<MetricsInfoDto>) {
    Object.assign(this, data);
  }
}

// ============================================================
// Main Refresh Token Response DTO
// ============================================================

/**
 * Refresh Token Response DTO
 */
export class RefreshTokenResponseDto {
  @ApiProperty({
    description: 'Success status',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message (English)',
    example: 'Token refreshed successfully',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Response message (Bengali)',
    example: 'টোকেন রিফ্রেশ সফল হয়েছে',
  })
  messageBn?: string;

  @ApiPropertyOptional({
    description: 'Token information',
    type: TokenInfoDto,
  })
  data?: TokenInfoDto;

  @ApiPropertyOptional({
    description: 'Session information',
    type: SessionInfoDto,
  })
  session?: SessionInfoDto;

  @ApiPropertyOptional({
    description: 'Security information',
    type: SecurityInfoDto,
  })
  security?: SecurityInfoDto;

  @ApiPropertyOptional({
    description: 'Metrics information',
    type: MetricsInfoDto,
  })
  metrics?: MetricsInfoDto;

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

  @ApiPropertyOptional({
    description: 'Warning message (if any)',
    example: 'Token family has multiple active tokens',
  })
  warning?: string;

  @ApiPropertyOptional({
    description: 'Warning message (Bengali)',
    example: 'টোকেন ফ্যামিলিতে একাধিক সক্রিয় টোকেন রয়েছে',
  })
  warningBn?: string;

  // ============================================================
  // Constructors
  // ============================================================

  /**
   * Create a successful refresh response
   */
  static success(data: {
    accessToken: string;
    refreshToken?: string;
    expiresIn: number;
    refreshExpiresIn?: number;
    tokenVersion?: number;
    familyId?: string;
    rotationCount?: number;
    isNewToken?: boolean;
    refreshStatus?: RefreshTokenStatus;
    sessionId?: string;
    extended?: boolean;
    newExpiryAt?: Date;
    extensionSeconds?: number;
    remainingSeconds?: number;
    deviceTrusted?: boolean;
    trustLevel?: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';
    deviceInfo?: Record<string, unknown>;
    maskedIp?: string;
    district?: string;
    mobileOperator?: string;
    networkType?: string;
    healthScore?: number;
    healthStatus?: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
    rotationVelocity?: number;
    timeSinceLastRotation?: number;
    isVelocitySuspicious?: boolean;
    recommendedAction?: 'extend' | 'maintain' | 'rotate' | 'revoke';
    correlationId?: string;
    message?: string;
    messageBn?: string;
    warning?: string;
    warningBn?: string;
  }): RefreshTokenResponseDto {
    const response = new RefreshTokenResponseDto();
    response.success = true;
    response.message = data.message || 'Token refreshed successfully';
    response.messageBn = data.messageBn || 'টোকেন রিফ্রেশ সফল হয়েছে';
    response.correlationId = data.correlationId;
    response.timestamp = new Date().toISOString();

    // Token info
    response.data = new TokenInfoDto({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
      refreshExpiresIn: data.refreshExpiresIn,
      tokenVersion: data.tokenVersion,
      familyId: data.familyId,
      rotationCount: data.rotationCount,
      isNewToken: data.isNewToken,
      refreshStatus: data.refreshStatus,
    });

    // Session info
    if (data.sessionId) {
      response.session = new SessionInfoDto({
        sessionId: data.sessionId,
        extended: data.extended,
        newExpiryAt: data.newExpiryAt?.toISOString(),
        extensionSeconds: data.extensionSeconds,
        remainingSeconds: data.remainingSeconds,
        revalidated: data.extended,
      });
    }

    // Security info
    response.security = new SecurityInfoDto({
      deviceTrusted: data.deviceTrusted,
      trustLevel: data.trustLevel,
      deviceInfo: data.deviceInfo,
      maskedIp: data.maskedIp,
      district: data.district,
      mobileOperator: data.mobileOperator,
      networkType: data.networkType,
    });

    // Metrics info
    if (data.healthScore !== undefined) {
      response.metrics = new MetricsInfoDto({
        healthScore: data.healthScore,
        healthStatus: data.healthStatus,
        rotationVelocity: data.rotationVelocity,
        timeSinceLastRotation: data.timeSinceLastRotation,
        isVelocitySuspicious: data.isVelocitySuspicious,
        recommendedAction: data.recommendedAction,
      });
    }

    // Warning
    if (data.warning) {
      response.warning = data.warning;
      response.warningBn = data.warningBn;
    }

    return response;
  }

  /**
   * Create a rotated refresh response (new refresh token issued)
   */
  static rotated(data: {
    accessToken: string;
    newRefreshToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
    tokenVersion: number;
    familyId: string;
    rotationCount: number;
    sessionId?: string;
    correlationId?: string;
    message?: string;
    messageBn?: string;
  }): RefreshTokenResponseDto {
    return RefreshTokenResponseDto.success({
      accessToken: data.accessToken,
      refreshToken: data.newRefreshToken,
      expiresIn: data.expiresIn,
      refreshExpiresIn: data.refreshExpiresIn,
      tokenVersion: data.tokenVersion,
      familyId: data.familyId,
      rotationCount: data.rotationCount,
      isNewToken: true,
      refreshStatus: RefreshTokenStatus.ROTATED,
      sessionId: data.sessionId,
      correlationId: data.correlationId,
      message: data.message || 'Token refreshed and rotated successfully',
      messageBn: data.messageBn || 'টোকেন রিফ্রেশ ও রোটেট সফল হয়েছে',
    });
  }

  /**
   * Create a response for when refresh token was not rotated (same token used)
   */
  static same(data: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
    tokenVersion: number;
    familyId: string;
    rotationCount: number;
    sessionId?: string;
    correlationId?: string;
    message?: string;
    messageBn?: string;
  }): RefreshTokenResponseDto {
    return RefreshTokenResponseDto.success({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
      refreshExpiresIn: data.refreshExpiresIn,
      tokenVersion: data.tokenVersion,
      familyId: data.familyId,
      rotationCount: data.rotationCount,
      isNewToken: false,
      refreshStatus: RefreshTokenStatus.SAME,
      sessionId: data.sessionId,
      correlationId: data.correlationId,
      message: data.message || 'Token refreshed successfully (same token)',
      messageBn: data.messageBn || 'টোকেন রিফ্রেশ সফল হয়েছে (একই টোকেন)',
    });
  }

  /**
   * Create a failed refresh response
   */
  static failed(data: {
    message: string;
    messageBn?: string;
    correlationId?: string;
    errorCode?: string;
  }): RefreshTokenResponseDto {
    const response = new RefreshTokenResponseDto();
    response.success = false;
    response.message = data.message;
    response.messageBn = data.messageBn;
    response.correlationId = data.correlationId;
    response.timestamp = new Date().toISOString();

    return response;
  }

  /**
   * Create a response for when token is expired
   */
  static expired(data: {
    correlationId?: string;
    message?: string;
    messageBn?: string;
  }): RefreshTokenResponseDto {
    return RefreshTokenResponseDto.failed({
      message: data.message || 'Refresh token has expired. Please login again.',
      messageBn: data.messageBn || 'রিফ্রেশ টোকেনের মেয়াদ শেষ হয়ে গেছে। অনুগ্রহ করে আবার লগইন করুন।',
      correlationId: data.correlationId,
      errorCode: 'TOKEN_EXPIRED',
    });
  }

  /**
   * Create a response for when token is revoked
   */
  static revoked(data: {
    correlationId?: string;
    message?: string;
    messageBn?: string;
  }): RefreshTokenResponseDto {
    return RefreshTokenResponseDto.failed({
      message: data.message || 'Refresh token has been revoked. Please login again.',
      messageBn: data.messageBn || 'রিফ্রেশ টোকেন বাতিল করা হয়েছে। অনুগ্রহ করে আবার লগইন করুন।',
      correlationId: data.correlationId,
      errorCode: 'TOKEN_REVOKED',
    });
  }

  /**
   * Create a response for when token is compromised
   */
  static compromised(data: {
    correlationId?: string;
    message?: string;
    messageBn?: string;
    securityAlertMessage?: string;
  }): RefreshTokenResponseDto {
    const response = RefreshTokenResponseDto.failed({
      message: data.message || 'Security breach detected. Token has been compromised.',
      messageBn: data.messageBn || 'নিরাপত্তা লঙ্ঘন সনাক্ত করা হয়েছে। টোকেন আপস করা হয়েছে।',
      correlationId: data.correlationId,
      errorCode: 'TOKEN_COMPROMISED',
    });

    // Add security alert info
    if (data.securityAlertMessage) {
      response.security = new SecurityInfoDto({
        securityAlertTriggered: true,
        securityAlertMessage: data.securityAlertMessage,
      });
    }

    return response;
  }

  /**
   * Create a response for rate limit exceeded
   */
  static rateLimited(data: {
    retryAfterSeconds: number;
    correlationId?: string;
    message?: string;
    messageBn?: string;
  }): RefreshTokenResponseDto {
    const response = RefreshTokenResponseDto.failed({
      message: data.message || `Too many refresh attempts. Please try again in ${data.retryAfterSeconds} seconds.`,
      messageBn: data.messageBn || `অনেকবার রিফ্রেশ চেষ্টা করা হয়েছে। ${data.retryAfterSeconds} সেকেন্ড পরে আবার চেষ্টা করুন।`,
      correlationId: data.correlationId,
      errorCode: 'RATE_LIMITED',
    });

    // Add retry after header info
    (response as any).retryAfterSeconds = data.retryAfterSeconds;

    return response;
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
   * Check if token was rotated
   */
  wasRotated(): boolean {
    return this.data?.refreshStatus === RefreshTokenStatus.ROTATED;
  }

  /**
   * Check if same token was used
   */
  wasSameToken(): boolean {
    return this.data?.refreshStatus === RefreshTokenStatus.SAME;
  }

  /**
   * Get access token
   */
  getAccessToken(): string | undefined {
    return this.data?.accessToken;
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string | undefined {
    return this.data?.refreshToken;
  }

  /**
   * Get token version
   */
  getTokenVersion(): number | undefined {
    return this.data?.tokenVersion;
  }

  /**
   * Get session ID
   */
  getSessionId(): string | undefined {
    return this.session?.sessionId;
  }

  /**
   * Get family ID
   */
  getFamilyId(): string | undefined {
    return this.data?.familyId;
  }

  /**
   * Get rotation count
   */
  getRotationCount(): number | undefined {
    return this.data?.rotationCount;
  }

  /**
   * Get health score
   */
  getHealthScore(): number | undefined {
    return this.metrics?.healthScore;
  }

  /**
   * Get recommended action
   */
  getRecommendedAction(): string | undefined {
    return this.metrics?.recommendedAction;
  }

  /**
   * Get warning message
   */
  getWarning(): string | undefined {
    return this.warning;
  }

  /**
   * Get error code (if failed)
   */
  getErrorCode(): string | undefined {
    return (this as any).errorCode;
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
      message: this.message,
      timestamp: this.timestamp,
    };

    if (this.messageBn) {
      result.messageBn = this.messageBn;
    }

    if (this.correlationId) {
      result.correlationId = this.correlationId;
    }

    if (this.data) {
      result.data = {
        accessToken: this.data.accessToken,
        tokenType: this.data.tokenType,
        expiresIn: this.data.expiresIn,
      };

      if (this.data.refreshToken) {
        (result.data as Record<string, unknown>).refreshToken = this.data.refreshToken;
      }

      if (this.data.refreshExpiresIn) {
        (result.data as Record<string, unknown>).refreshExpiresIn = this.data.refreshExpiresIn;
      }

      if (this.data.tokenVersion !== undefined) {
        (result.data as Record<string, unknown>).tokenVersion = this.data.tokenVersion;
      }

      if (this.data.familyId) {
        (result.data as Record<string, unknown>).familyId = this.data.familyId;
      }

      if (this.data.rotationCount !== undefined) {
        (result.data as Record<string, unknown>).rotationCount = this.data.rotationCount;
      }

      if (this.data.isNewToken !== undefined) {
        (result.data as Record<string, unknown>).isNewToken = this.data.isNewToken;
      }

      if (this.data.refreshStatus) {
        (result.data as Record<string, unknown>).refreshStatus = this.data.refreshStatus;
      }
    }

    if (this.session) {
      result.session = {};

      if (this.session.sessionId) {
        (result.session as Record<string, unknown>).sessionId = this.session.sessionId;
      }

      if (this.session.extended !== undefined) {
        (result.session as Record<string, unknown>).extended = this.session.extended;
      }

      if (this.session.newExpiryAt) {
        (result.session as Record<string, unknown>).newExpiryAt = this.session.newExpiryAt;
      }

      if (this.session.extensionSeconds !== undefined) {
        (result.session as Record<string, unknown>).extensionSeconds = this.session.extensionSeconds;
      }

      if (this.session.remainingSeconds !== undefined) {
        (result.session as Record<string, unknown>).remainingSeconds = this.session.remainingSeconds;
      }
    }

    if (this.security) {
      result.security = {};

      if (this.security.deviceTrusted !== undefined) {
        (result.security as Record<string, unknown>).deviceTrusted = this.security.deviceTrusted;
      }

      if (this.security.trustLevel) {
        (result.security as Record<string, unknown>).trustLevel = this.security.trustLevel;
      }

      if (this.security.deviceInfo) {
        (result.security as Record<string, unknown>).deviceInfo = this.security.deviceInfo;
      }

      if (this.security.maskedIp) {
        (result.security as Record<string, unknown>).maskedIp = this.security.maskedIp;
      }

      if (this.security.district) {
        (result.security as Record<string, unknown>).district = this.security.district;
      }

      if (this.security.mobileOperator) {
        (result.security as Record<string, unknown>).mobileOperator = this.security.mobileOperator;
      }

      if (this.security.networkType) {
        (result.security as Record<string, unknown>).networkType = this.security.networkType;
      }

      if (this.security.securityAlertTriggered !== undefined) {
        (result.security as Record<string, unknown>).securityAlertTriggered = this.security.securityAlertTriggered;
      }

      if (this.security.securityAlertMessage) {
        (result.security as Record<string, unknown>).securityAlertMessage = this.security.securityAlertMessage;
      }
    }

    if (this.metrics) {
      result.metrics = {};

      if (this.metrics.healthScore !== undefined) {
        (result.metrics as Record<string, unknown>).healthScore = this.metrics.healthScore;
      }

      if (this.metrics.healthStatus) {
        (result.metrics as Record<string, unknown>).healthStatus = this.metrics.healthStatus;
      }

      if (this.metrics.rotationVelocity !== undefined) {
        (result.metrics as Record<string, unknown>).rotationVelocity = this.metrics.rotationVelocity;
      }

      if (this.metrics.timeSinceLastRotation !== undefined) {
        (result.metrics as Record<string, unknown>).timeSinceLastRotation = this.metrics.timeSinceLastRotation;
      }

      if (this.metrics.isVelocitySuspicious !== undefined) {
        (result.metrics as Record<string, unknown>).isVelocitySuspicious = this.metrics.isVelocitySuspicious;
      }

      if (this.metrics.recommendedAction) {
        (result.metrics as Record<string, unknown>).recommendedAction = this.metrics.recommendedAction;
      }
    }

    if (this.warning) {
      result.warning = this.warning;
    }

    if (this.warningBn) {
      result.warningBn = this.warningBn;
    }

    return result;
  }
}

// ============================================================
// Simplified Refresh Token Response DTO (For common use cases)
// ============================================================

/**
 * Simplified refresh token response (tokens only)
 */
export class SimpleRefreshTokenResponseDto {
  @ApiProperty({
    description: 'Access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiPropertyOptional({
    description: 'Refresh token (if rotated)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken?: string;

  @ApiProperty({
    description: 'Token type',
    example: 'Bearer',
  })
  tokenType: string = TOKEN_TYPES.BEARER;

  @ApiProperty({
    description: 'Access token expiry in seconds',
    example: 900,
  })
  expiresIn: number;

  @ApiPropertyOptional({
    description: 'Refresh token expiry in seconds',
    example: 604800,
  })
  refreshExpiresIn?: number;

  @ApiPropertyOptional({
    description: 'Token version',
    example: 2,
  })
  tokenVersion?: number;

  @ApiPropertyOptional({
    description: 'Family ID',
    example: 'fam_1234567890',
  })
  familyId?: string;

  @ApiPropertyOptional({
    description: 'Rotation count',
    example: 2,
  })
  rotationCount?: number;

  @ApiPropertyOptional({
    description: 'Whether token was rotated',
    example: true,
  })
  rotated?: boolean;

  constructor(data: Partial<SimpleRefreshTokenResponseDto>) {
    Object.assign(this, data);
    this.tokenType = this.tokenType || TOKEN_TYPES.BEARER;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { TokenInfoDto as TokenInfoType };
export type { SessionInfoDto as SessionInfoType };
export type { SecurityInfoDto as SecurityInfoType };
export type { MetricsInfoDto as MetricsInfoType };
