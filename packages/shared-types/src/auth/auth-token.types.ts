/**
 * Auth Token Types
 * Type definitions for authentication tokens based on shared-constants
 * @module AuthTokenTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants auth token
// ============================================================
import {
  // Token Constants
  AUTH_TOKEN,
  BEARER_TOKEN_TYPES,
  SINGLE_USE_TOKEN_TYPES,
  VALID_TOKEN_STATUSES,
  INVALID_TOKEN_STATUSES,
  // Token Types
  AuthTokenType,
  AuthTokenStatus,
  AuthTokenAlgorithm,
  AuthTokenClaim,
  AuthTokenEvent,
  // Token Functions
  isTokenValid,
  isTokenInvalid,
  isBearerToken,
  isSingleUseToken,
  getTokenExpiry,
  getTokenTypeLabel,
  getTokenStatusLabel,
  getAlgorithmLabel,
  getDefaultAlgorithm,
  isTokenExpired,
  getTokenRemainingTime,
} from '@vubon/shared-constants';

// ============================================================
// Auth Token Extended Types
// ============================================================

/**
 * Auth token with additional metadata
 */
export interface AuthTokenExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  token: string;
  type: AuthTokenType;
  status: AuthTokenStatus;
  algorithm: AuthTokenAlgorithm;
  claims: AuthTokenClaim[];
  expiresAt: Date;
  issuedAt: Date;
  isBearer: boolean;
  isSingleUse: boolean;
  isValid: boolean;
  isInvalid: boolean;
  isExpired: boolean;
  metadata?: Metadata;
}

/**
 * Auth token filter
 */
export interface AuthTokenFilter {
  userIds?: ID[];
  types?: AuthTokenType[];
  statuses?: AuthTokenStatus[];
  algorithms?: AuthTokenAlgorithm[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isValid?: boolean;
  isInvalid?: boolean;
  isExpired?: boolean;
  isBearer?: boolean;
  isSingleUse?: boolean;
  expiresBefore?: Date;
  expiresAfter?: Date;
  searchTerm?: string;
}

/**
 * Auth token statistics
 */
export interface AuthTokenStatistics {
  userId: ID;
  totalTokens: number;
  validTokens: number;
  invalidTokens: number;
  expiredTokens: number;
  byType: Record<AuthTokenType, number>;
  byStatus: Record<AuthTokenStatus, number>;
  byAlgorithm: Record<AuthTokenAlgorithm, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageTokenLifetime: number;
  mostFrequentType: AuthTokenType;
  mostFrequentAlgorithm: AuthTokenAlgorithm;
  tokenRefreshCount: number;
}

/**
 * Auth token summary
 */
export interface AuthTokenSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  valid: number;
  invalid: number;
  expired: number;
  byType: Record<AuthTokenType, number>;
  byStatus: Record<AuthTokenStatus, number>;
  byAlgorithm: Record<AuthTokenAlgorithm, number>;
  tokenTrend: {
    date: Date;
    total: number;
    valid: number;
    expired: number;
  }[];
  topTypes: {
    type: AuthTokenType;
    count: number;
    label: string;
  }[];
  topAlgorithms: {
    algorithm: AuthTokenAlgorithm;
    count: number;
    label: string;
  }[];
}

/**
 * Auth token configuration
 */
export interface AuthTokenConfiguration {
  enabled: boolean;
  defaultType: AuthTokenType;
  defaultAlgorithm: AuthTokenAlgorithm;
  defaultExpirySeconds: number;
  refreshTokenExpirySeconds: number;
  maxTokensPerUser: number;
  allowRefreshToken: boolean;
  allowSingleUseTokens: boolean;
  allowBearerTokens: boolean;
  rotateRefreshToken: boolean;
  expireOnUserLogout: boolean;
  validationConfig?: AuthTokenValidationConfig;
  alertConfig?: AuthTokenAlertConfig;
}

/**
 * Auth token validation configuration
 */
export interface AuthTokenValidationConfig {
  validateSignature: boolean;
  validateExpiry: boolean;
  validateIssuer: boolean;
  validateAudience: boolean;
  validateSubject: boolean;
  validateClaims: boolean;
  validateRevocation: boolean;
  leewaySeconds: number;
}

/**
 * Auth token alert configuration
 */
export interface AuthTokenAlertConfig {
  enabled: boolean;
  invalidTokenAlert: boolean;
  expiredTokenAlert: boolean;
  tokenRevocationAlert: boolean;
  suspiciousTokenAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  invalidTokenThreshold: number;
}

/**
 * Auth token history
 */
export interface AuthTokenHistory extends BaseEntity, Timestamp {
  id: ID;
  tokenId: ID;
  userId: ID;
  action: 'create' | 'refresh' | 'revoke' | 'expire' | 'invalidate' | 'rotate';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Auth token validation result
 */
export interface AuthTokenValidationResult {
  isValid: boolean;
  tokenId?: ID;
  userId?: ID;
  type?: AuthTokenType;
  status?: AuthTokenStatus;
  algorithm?: AuthTokenAlgorithm;
  claims?: AuthTokenClaim[];
  errors?: string[];
  warnings?: string[];
  expiry?: Date;
  issuedAt?: Date;
}

/**
 * Auth token revocation
 */
export interface AuthTokenRevocation extends BaseEntity, Timestamp {
  id: ID;
  tokenId: ID;
  userId: ID;
  revokedBy: ID;
  reason: 'user_action' | 'admin_action' | 'security' | 'expired' | 'compromised' | 'other';
  description?: string;
  metadata?: Metadata;
}

/**
 * Auth token export
 */
export interface AuthTokenExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: AuthTokenFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Constants
  AUTH_TOKEN,
  BEARER_TOKEN_TYPES,
  SINGLE_USE_TOKEN_TYPES,
  VALID_TOKEN_STATUSES,
  INVALID_TOKEN_STATUSES,
  // Types
  AuthTokenType,
  AuthTokenStatus,
  AuthTokenAlgorithm,
  AuthTokenClaim,
  AuthTokenEvent,
  // Functions
  isTokenValid,
  isTokenInvalid,
  isBearerToken,
  isSingleUseToken,
  getTokenExpiry,
  getTokenTypeLabel,
  getTokenStatusLabel,
  getAlgorithmLabel,
  getDefaultAlgorithm,
  isTokenExpired,
  getTokenRemainingTime,
};
