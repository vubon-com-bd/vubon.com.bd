/**
 * Auth Permission Types
 * Type definitions for authentication permissions based on shared-constants
 * @module AuthPermissionTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants auth
// ============================================================
import {
  // Auth Session - for session-based permissions
  AuthSessionStatus,
  AuthSessionType,
  AuthSessionEvent,
  AuthSessionKey,
  // Auth Token - for token-based permissions
  AuthTokenType,
  AuthTokenStatus,
  AuthTokenAlgorithm,
  AuthTokenClaim,
  AuthTokenEvent,
  // Auth Verification - for verification-based permissions
  AuthVerificationType,
  AuthVerificationStatus,
  AuthVerificationEvent,
  AuthVerificationChannel,
  AuthVerificationLevel,
  // Auth Password
  AuthPasswordStrength,
  AuthPasswordError,
} from '@vubon/shared-constants';

// ============================================================
// Auth Permission Types
// ============================================================

/**
 * Permission definition
 */
export interface AuthPermission {
  id: ID;
  name: string;
  description?: string;
  resource: string;
  action: string;
  attributes?: Record<string, unknown>;
  conditions?: AuthPermissionCondition[];
}

/**
 * Permission condition
 */
export interface AuthPermissionCondition {
  field: string;
  operator:
    | 'eq'
    | 'ne'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'in'
    | 'nin'
    | 'contains'
    | 'startsWith'
    | 'endsWith';
  value: unknown;
}

/**
 * Permission check context
 */
export interface AuthPermissionContext {
  userId: ID;
  roles: string[];
  permissions: string[];
  session?: {
    id: ID;
    type: AuthSessionType;
    status: AuthSessionStatus;
  };
  token?: {
    type: AuthTokenType;
    status: AuthTokenStatus;
    claims: AuthTokenClaim[];
  };
  verification?: {
    type: AuthVerificationType;
    status: AuthVerificationStatus;
    level: AuthVerificationLevel;
  };
  resource?: {
    id: ID;
    type: string;
    attributes?: Record<string, unknown>;
  };
  metadata?: Metadata;
}

/**
 * Permission check result
 */
export interface AuthPermissionCheckResult {
  granted: boolean;
  permission: string;
  resource: string;
  action: string;
  reason?: string;
  conditions?: {
    passed: boolean;
    failed?: AuthPermissionCondition[];
  };
}

/**
 * Permission evaluation result
 */
export interface AuthPermissionEvaluationResult {
  granted: boolean;
  permissions: AuthPermissionCheckResult[];
  requiredPermissions: string[];
  missingPermissions: string[];
  reason?: string;
}

/**
 * Permission assignment
 */
export interface AuthPermissionAssignment extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  permission: string;
  grantedBy: ID;
  grantedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Permission group
 */
export interface AuthPermissionGroup {
  id: ID;
  name: string;
  description?: string;
  permissions: string[];
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Permission role
 */
export interface AuthPermissionRole {
  id: ID;
  name: string;
  description?: string;
  permissions: string[];
  isDefault?: boolean;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Permission policy
 */
export interface AuthPermissionPolicy {
  id: ID;
  name: string;
  description?: string;
  effect: 'allow' | 'deny';
  actions: string[];
  resources: string[];
  conditions?: AuthPermissionCondition[];
  priority: number;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Permission filter
 */
export interface AuthPermissionFilter {
  userIds?: ID[];
  permissions?: string[];
  resources?: string[];
  actions?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  searchTerm?: string;
}

/**
 * Permission statistics
 */
export interface AuthPermissionStatistics {
  userId: ID;
  totalPermissions: number;
  activePermissions: number;
  expiredPermissions: number;
  byResource: Record<string, number>;
  byAction: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentResource: string;
  mostFrequentAction: string;
}

/**
 * Permission summary
 */
export interface AuthPermissionSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  expired: number;
  byResource: Record<string, number>;
  byAction: Record<string, number>;
  permissionTrend: {
    date: Date;
    total: number;
    active: number;
    expired: number;
  }[];
  topResources: {
    resource: string;
    count: number;
  }[];
  topActions: {
    action: string;
    count: number;
  }[];
}

/**
 * Permission validation
 */
export interface AuthPermissionValidation {
  isValid: boolean;
  permission: string;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Permission export
 */
export interface AuthPermissionExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: AuthPermissionFilter;
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
  // Session types (re-exported for convenience)
  AuthSessionStatus,
  AuthSessionType,
  AuthSessionEvent,
  AuthSessionKey,
  // Token types
  AuthTokenType,
  AuthTokenStatus,
  AuthTokenAlgorithm,
  AuthTokenClaim,
  AuthTokenEvent,
  // Verification types
  AuthVerificationType,
  AuthVerificationStatus,
  AuthVerificationEvent,
  AuthVerificationChannel,
  AuthVerificationLevel,
  // Password types
  AuthPasswordStrength,
  AuthPasswordError,
};
