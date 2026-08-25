/**
 * Auth SSO Types
 * Type definitions for Single Sign-On authentication based on shared-constants
 * @module AuthSSOTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants auth sso
// ============================================================
import {
  // Core SSO Constants
  AUTH_SSO,
  SSO_PROTOCOLS,
  SSO_SAML_BINDINGS,
  SSO_SAML_NAME_ID_FORMATS,
  SSO_LDAP_ATTRIBUTES,
  SSO_SECURITY,
  SSO_SESSION,
  SSO_RATE_LIMIT,
  SSO_DEFAULTS,
  SSO_EVENTS,
  SSO_PROVIDER_CONFIGS,
  // Core SSO Types
  AuthSSOConfig,
  AuthSSOEvent,
  AuthSSODefaults,
  SSOProviderConfig,
  // Core SSO Status Types
  AuthssoStatus,
  // Core SSO Provider Types
  AuthSSOProvider,
  // Core SSO Functions
  getAuthssoProviderConfig,
  getAuthssoProtocol,
  getAuthssoProviderLabel,
  getAuthssoProviderIcon,
  getAuthssoProviderColor,
  getAuthssoProtocolLabel,
  getAuthssoSAMLNameIdFormatLabel,
  getAuthssoSAMLBindingLabel,
  getAuthssoLDAPAttributeLabel,
  getAuthssoSessionMaxAge,
  getAuthssoSessionInactivityTimeout,
  getAuthssoMaxSessionsPerUser,
  isAuthssoProviderSupported,
  getAuthssoSupportedProviders,
} from '@vubon/shared-constants';

// ============================================================
// Auth SSO Extended Types
// ============================================================

/**
 * Auth SSO with additional metadata
 */
export interface AuthSSOExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  provider: AuthSSOProvider;
  status: AuthssoStatus;
  protocol: string;
  providerUserId: string;
  email?: string;
  name?: string;
  avatar?: string;
  samlResponse?: string;
  samlAssertion?: string;
  ldapDn?: string;
  ldapAttributes?: Record<string, string[]>;
  sessionIndex?: string;
  nameId?: string;
  nameIdFormat?: string;
  binding?: string;
  isActive: boolean;
  isPending: boolean;
  isInactive: boolean;
  isFailed: boolean;
  isSecurityIssue: boolean;
  isSAMLStatus: boolean;
  isLDAPStatus: boolean;
  isLogoutStatus: boolean;
  isEnterprise: boolean;
  isSAMLProvider: boolean;
  isOIDCProvider: boolean;
  isLDAPProvider: boolean;
  lastUsedAt?: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Auth SSO filter
 */
export interface AuthSSOFilter {
  userIds?: ID[];
  providers?: AuthSSOProvider[];
  statuses?: AuthssoStatus[];
  protocols?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isPending?: boolean;
  isInactive?: boolean;
  isFailed?: boolean;
  isSAMLStatus?: boolean;
  isLDAPStatus?: boolean;
  isLogoutStatus?: boolean;
  isSecurityIssue?: boolean;
  isEnterprise?: boolean;
  isSAMLProvider?: boolean;
  isOIDCProvider?: boolean;
  isLDAPProvider?: boolean;
  searchTerm?: string;
}

/**
 * Auth SSO statistics
 */
export interface AuthSSOStatistics {
  userId: ID;
  totalConnections: number;
  activeConnections: number;
  pendingConnections: number;
  inactiveConnections: number;
  failedConnections: number;
  samlConnections: number;
  ldapConnections: number;
  logoutConnections: number;
  byProvider: Record<AuthSSOProvider, number>;
  byStatus: Record<AuthssoStatus, number>;
  byProtocol: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentProvider: AuthSSOProvider;
  mostFrequentStatus: AuthssoStatus;
  mostFrequentProtocol: string;
}

/**
 * Auth SSO summary
 */
export interface AuthSSOSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  pending: number;
  inactive: number;
  failed: number;
  saml: number;
  ldap: number;
  logout: number;
  byProvider: Record<AuthSSOProvider, number>;
  byStatus: Record<AuthssoStatus, number>;
  byProtocol: Record<string, number>;
  ssoTrend: {
    date: Date;
    total: number;
    active: number;
    saml: number;
  }[];
  topProviders: {
    provider: AuthSSOProvider;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: AuthssoStatus;
    count: number;
    label: string;
  }[];
}

/**
 * Auth SSO configuration
 */
export interface AuthSSOConfiguration {
  enabled: boolean;
  defaultProviders: AuthSSOProvider[];
  defaultProtocol: string;
  sessionMaxAgeSeconds: number;
  sessionInactivityTimeoutSeconds: number;
  maxSessionsPerUser: number;
  requireSAML: boolean;
  requireLDAP: boolean;
  allowAutoLink: boolean;
  allowMultipleConnections: boolean;
  notificationOnLink: boolean;
  notificationOnUnlink: boolean;
  notificationOnLogout: boolean;
  alertConfig?: AuthSSOAlertConfig;
}

/**
 * Auth SSO alert configuration
 */
export interface AuthSSOAlertConfig {
  enabled: boolean;
  failedConnectionAlert: boolean;
  sessionExpiryAlert: boolean;
  suspiciousActivityAlert: boolean;
  providerErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Auth SSO history
 */
export interface AuthSSOHistory extends BaseEntity, Timestamp {
  id: ID;
  ssoId: ID;
  userId: ID;
  action: 'link' | 'unlink' | 'login' | 'logout' | 'fail' | 'expire' | 'update' | 'refresh';
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
 * Auth SSO SAML assertion
 */
export interface AuthSSOSAMLAssertion extends BaseEntity, Timestamp {
  id: ID;
  ssoId: ID;
  userId: ID;
  provider: AuthSSOProvider;
  assertion: string;
  nameId: string;
  nameIdFormat: string;
  sessionIndex: string;
  attributes: Record<string, string[]>;
  issuedAt: Date;
  expiresAt: Date;
  isValid: boolean;
  isExpired: boolean;
  metadata?: Metadata;
}

/**
 * Auth SSO LDAP session
 */
export interface AuthSSOLDAPSession extends BaseEntity, Timestamp {
  id: ID;
  ssoId: ID;
  userId: ID;
  provider: AuthSSOProvider;
  dn: string;
  attributes: Record<string, string[]>;
  baseDn: string;
  filter: string;
  scope: string;
  issuedAt: Date;
  expiresAt: Date;
  isValid: boolean;
  isExpired: boolean;
  metadata?: Metadata;
}

/**
 * Auth SSO logout request
 */
export interface AuthSSOLogoutRequest extends BaseEntity, Timestamp {
  id: ID;
  ssoId: ID;
  userId: ID;
  provider: AuthSSOProvider;
  logoutUrl: string;
  logoutRequest: string;
  status: 'pending' | 'completed' | 'failed';
  completedAt?: Date;
  errorMessage?: string;
  metadata?: Metadata;
}

/**
 * Auth SSO export
 */
export interface AuthSSOExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: AuthSSOFilter;
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
  AUTH_SSO,
  SSO_PROTOCOLS,
  SSO_SAML_BINDINGS,
  SSO_SAML_NAME_ID_FORMATS,
  SSO_LDAP_ATTRIBUTES,
  SSO_SECURITY,
  SSO_SESSION,
  SSO_RATE_LIMIT,
  SSO_DEFAULTS,
  SSO_EVENTS,
  SSO_PROVIDER_CONFIGS,
  // Core Types
  AuthSSOConfig,
  AuthSSOEvent,
  AuthSSODefaults,
  SSOProviderConfig,
  AuthssoStatus,
  AuthSSOProvider,
  // Core Functions
  getAuthssoProviderConfig,
  getAuthssoProtocol,
  getAuthssoProviderLabel,
  getAuthssoProviderIcon,
  getAuthssoProviderColor,
  getAuthssoProtocolLabel,
  getAuthssoSAMLNameIdFormatLabel,
  getAuthssoSAMLBindingLabel,
  getAuthssoLDAPAttributeLabel,
  getAuthssoSessionMaxAge,
  getAuthssoSessionInactivityTimeout,
  getAuthssoMaxSessionsPerUser,
  isAuthssoProviderSupported,
  getAuthssoSupportedProviders,
};
