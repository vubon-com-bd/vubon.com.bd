/**
 * Auth Social Types
 * Type definitions for social authentication based on shared-constants
 * @module AuthSocialTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants auth social
// ============================================================
import {
  // Core Social Constants
  AUTH_SOCIAL,
  SOCIAL_CONFIG,
  SOCIAL_EVENTS,
  SOCIAL_PROVIDER_CONFIGS,
  // Core Social Types
  AuthSocialConfig,
  AuthSocialEvent,
  AuthSocialDefaults,
  SocialProviderConfig,
  // Core Social Status Types
  AuthsocialStatus,
  // Core Social Provider Types
  AuthsocialProvider,
  // Core Social Functions
  getAuthsocialProviderConfig,
  getAuthsocialProviderScopes,
  getAuthsocialProviderRedirectUri,
  getAuthsocialProviderClientId,
  getAuthsocialAuthUrl,
  isAuthsocialProviderSupported,
  getAuthsocialSupportedProviders,
  getAuthsocialProviderLabel,
  getAuthsocialProviderIcon,
  getAuthsocialProviderColor,
  getAuthsocialStateExpiry,
  getAuthsocialCodeExpiry,
  getAuthsocialTokenExpiry,
  getAuthsocialRefreshTokenExpiry,
  isAuthsocialStateValid,
  isAuthsocialCodeValid,
  isAuthsocialTokenValid,
  shouldAuthsocialRefreshToken,
} from '@vubon/shared-constants';

// ============================================================
// Auth Social Extended Types
// ============================================================

/**
 * Auth social with additional metadata
 */
export interface AuthSocialExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  provider: AuthsocialProvider;
  status: AuthsocialStatus;
  providerUserId: string;
  email?: string;
  name?: string;
  avatar?: string;
  accessToken: string;
  refreshToken?: string;
  tokenExpiry: Date;
  refreshTokenExpiry?: Date;
  scopes: string[];
  isActive: boolean;
  isPending: boolean;
  isInactive: boolean;
  isFailed: boolean;
  isSecurityIssue: boolean;
  isTokenStatus: boolean;
  isLinked: boolean;
  isVerified: boolean;
  lastUsedAt?: Date;
  metadata?: Metadata;
}

/**
 * Auth social filter
 */
export interface AuthSocialFilter {
  userIds?: ID[];
  providers?: AuthsocialProvider[];
  statuses?: AuthsocialStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isPending?: boolean;
  isInactive?: boolean;
  isFailed?: boolean;
  isLinked?: boolean;
  isVerified?: boolean;
  isTokenStatus?: boolean;
  isSecurityIssue?: boolean;
  searchTerm?: string;
}

/**
 * Auth social statistics
 */
export interface AuthSocialStatistics {
  userId: ID;
  totalConnections: number;
  activeConnections: number;
  pendingConnections: number;
  inactiveConnections: number;
  failedConnections: number;
  linkedConnections: number;
  verifiedConnections: number;
  byProvider: Record<AuthsocialProvider, number>;
  byStatus: Record<AuthsocialStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentProvider: AuthsocialProvider;
  mostFrequentStatus: AuthsocialStatus;
}

/**
 * Auth social summary
 */
export interface AuthSocialSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  pending: number;
  inactive: number;
  failed: number;
  linked: number;
  verified: number;
  byProvider: Record<AuthsocialProvider, number>;
  byStatus: Record<AuthsocialStatus, number>;
  socialTrend: {
    date: Date;
    total: number;
    active: number;
    linked: number;
  }[];
  topProviders: {
    provider: AuthsocialProvider;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: AuthsocialStatus;
    count: number;
    label: string;
  }[];
}

/**
 * Auth social configuration
 */
export interface AuthSocialConfiguration {
  enabled: boolean;
  defaultProviders: AuthsocialProvider[];
  stateExpirySeconds: number;
  codeExpirySeconds: number;
  tokenExpirySeconds: number;
  refreshTokenExpirySeconds: number;
  requireVerification: boolean;
  allowAutoLink: boolean;
  allowMultipleConnections: boolean;
  notificationOnLink: boolean;
  notificationOnUnlink: boolean;
  notificationOnTokenRefresh: boolean;
  alertConfig?: AuthSocialAlertConfig;
}

/**
 * Auth social alert configuration
 */
export interface AuthSocialAlertConfig {
  enabled: boolean;
  failedConnectionAlert: boolean;
  tokenExpiryAlert: boolean;
  suspiciousActivityAlert: boolean;
  providerErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Auth social history
 */
export interface AuthSocialHistory extends BaseEntity, Timestamp {
  id: ID;
  socialId: ID;
  userId: ID;
  action: 'link' | 'unlink' | 'refresh' | 'verify' | 'fail' | 'expire' | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * Auth social token
 */
export interface AuthSocialToken extends BaseEntity, Timestamp {
  id: ID;
  socialId: ID;
  userId: ID;
  provider: AuthsocialProvider;
  accessToken: string;
  refreshToken?: string;
  tokenType: string;
  expiresAt: Date;
  refreshTokenExpiresAt?: Date;
  scopes: string[];
  isValid: boolean;
  isExpired: boolean;
  metadata?: Metadata;
}

/**
 * Auth social profile
 */
export interface AuthSocialProfile extends BaseEntity, Timestamp {
  id: ID;
  socialId: ID;
  userId: ID;
  provider: AuthsocialProvider;
  providerUserId: string;
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  location?: string;
  gender?: string;
  birthday?: Date;
  metadata?: Metadata;
}

/**
 * Auth social export
 */
export interface AuthSocialExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: AuthSocialFilter;
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
  // Core Constants
  AUTH_SOCIAL,
  SOCIAL_CONFIG,
  SOCIAL_EVENTS,
  SOCIAL_PROVIDER_CONFIGS,
  // Core Types
  AuthSocialConfig,
  AuthSocialEvent,
  AuthSocialDefaults,
  SocialProviderConfig,
  AuthsocialStatus,
  AuthsocialProvider,
  // Core Functions
  getAuthsocialProviderConfig,
  getAuthsocialProviderScopes,
  getAuthsocialProviderRedirectUri,
  getAuthsocialProviderClientId,
  getAuthsocialAuthUrl,
  isAuthsocialProviderSupported,
  getAuthsocialSupportedProviders,
  getAuthsocialProviderLabel,
  getAuthsocialProviderIcon,
  getAuthsocialProviderColor,
  getAuthsocialStateExpiry,
  getAuthsocialCodeExpiry,
  getAuthsocialTokenExpiry,
  getAuthsocialRefreshTokenExpiry,
  isAuthsocialStateValid,
  isAuthsocialCodeValid,
  isAuthsocialTokenValid,
  shouldAuthsocialRefreshToken,
};
