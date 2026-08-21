/**
 * Common Audit Types Module
 * Audit logging and tracking types for the e-commerce platform
 * Handles audit trails, change tracking, and compliance
 */

import { UserId, Timestamp } from '../auth/core-primitives.types';

/**
 * Audit Action
 * Type of audit action
 */
export type AuditAction =
  | 'create'
  | 'update'
  | 'delete'
  | 'read'
  | 'list'
  | 'search'
  | 'export'
  | 'import'
  | 'approve'
  | 'reject'
  | 'review'
  | 'verify'
  | 'reset'
  | 'disable'
  | 'enable'
  | 'login'
  | 'logout'
  | 'register'
  | 'change_password'
  | 'change_email'
  | 'change_phone'
  | 'change_role'
  | 'change_permission'
  | 'system'
  | 'admin';

/**
 * Audit Resource
 * Type of resource being audited
 */
export type AuditResource =
  | 'user'
  | 'profile'
  | 'order'
  | 'product'
  | 'category'
  | 'payment'
  | 'shipping'
  | 'review'
  | 'wishlist'
  | 'address'
  | 'contact'
  | 'settings'
  | 'role'
  | 'permission'
  | 'system';

/**
 * Audit Severity
 * Severity level of audit entry
 */
export type AuditSeverity = 'info' | 'low' | 'medium' | 'high' | 'critical';

/**
 * Audit Log
 * Audit log entry
 */
export interface AuditLog {
  id: string;
  action: AuditAction;
  resource: AuditResource;
  resourceId?: string;
  userId: UserId;
  userEmail?: string;
  userName?: string;
  severity: AuditSeverity;
  changes?: AuditChange[];
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Timestamp;
  requestId?: string;
  sessionId?: string;
  source?: string;
}

/**
 * Audit Change
 * Individual change in audit log
 */
export interface AuditChange {
  field: string;
  oldValue?: unknown;
  newValue?: unknown;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'date' | 'null';
}

/**
 * Audit Query
 * Query for audit logs
 */
export interface AuditQuery {
  action?: AuditAction[];
  resource?: AuditResource[];
  resourceId?: string;
  userId?: UserId[];
  severity?: AuditSeverity[];
  startDate?: Timestamp;
  endDate?: Timestamp;
  ipAddress?: string[];
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'timestamp' | 'action' | 'severity';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Audit Statistics
 * Statistical data about audits
 */
export interface AuditStatistics {
  totalEntries: number;
  byAction: Record<AuditAction, number>;
  byResource: Record<AuditResource, number>;
  bySeverity: Record<AuditSeverity, number>;
  byUser: Record<UserId, number>;
  uniqueUsers: number;
  averageEntriesPerDay: number;
  peakTime: string;
  timestamp: Timestamp;
}

/**
 * Audit Report
 * Audit report data
 */
export interface AuditReport {
  period: {
    start: Timestamp;
    end: Timestamp;
  };
  summary: {
    total: number;
    created: number;
    updated: number;
    deleted: number;
    read: number;
  };
  topUsers: Array<{
    userId: UserId;
    name: string;
    actions: number;
  }>;
  topResources: Array<{
    resource: AuditResource;
    count: number;
  }>;
  timeline: Array<{
    timestamp: Timestamp;
    count: number;
  }>;
  generatedAt: Timestamp;
}

/**
 * Audit Retention
 * Audit retention policy
 */
export interface AuditRetention {
  maxAgeDays: number;
  maxSizeGB: number;
  archiveAfterDays: number;
  deleteAfterArchiveDays: number;
  compressArchives: boolean;
  encryptArchives: boolean;
  archivePath: string;
}

/**
 * Audit Constants
 * Audit-related constants
 */
export const AUDIT_ACTIONS = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  READ: 'read',
  LIST: 'list',
  SEARCH: 'search',
  EXPORT: 'export',
  IMPORT: 'import',
  APPROVE: 'approve',
  REJECT: 'reject',
  REVIEW: 'review',
  VERIFY: 'verify',
  RESET: 'reset',
  DISABLE: 'disable',
  ENABLE: 'enable',
  LOGIN: 'login',
  LOGOUT: 'logout',
  REGISTER: 'register',
  CHANGE_PASSWORD: 'change_password',
  CHANGE_EMAIL: 'change_email',
  CHANGE_PHONE: 'change_phone',
  CHANGE_ROLE: 'change_role',
  CHANGE_PERMISSION: 'change_permission',
  SYSTEM: 'system',
  ADMIN: 'admin',
} as const;

export const AUDIT_RESOURCES = {
  USER: 'user',
  PROFILE: 'profile',
  ORDER: 'order',
  PRODUCT: 'product',
  CATEGORY: 'category',
  PAYMENT: 'payment',
  SHIPPING: 'shipping',
  REVIEW: 'review',
  WISHLIST: 'wishlist',
  ADDRESS: 'address',
  CONTACT: 'contact',
  SETTINGS: 'settings',
  ROLE: 'role',
  PERMISSION: 'permission',
  SYSTEM: 'system',
} as const;

export const AUDIT_SEVERITY = {
  INFO: 'info',
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

/**
 * Default Audit Configuration
 */
export const DEFAULT_AUDIT_CONFIG = {
  enabled: true,
  enabledActions: ['create', 'update', 'delete', 'login', 'logout', 'change_password'],
  enabledResources: ['user', 'profile', 'order', 'payment', 'settings'],
  minSeverity: 'info' as AuditSeverity,
  retentionDays: 365,
  batchSize: 1000,
  enableChangeTracking: true,
  enableUserTracking: true,
  enableIpTracking: true,
  enableUserAgentTracking: true,
} as const;

/**
 * Audit Response Builder
 * Helper for building audit responses
 */
export interface AuditResponseBuilder {
  logSuccess(response: AuditLog): AuditLog;
  listSuccess(
    logs: AuditLog[],
    total: number
  ): { success: boolean; data: AuditLog[]; total: number };
  statisticsSuccess(statistics: AuditStatistics): { success: boolean; data: AuditStatistics };
  error(
    code: string,
    message: string,
    details?: Record<string, unknown>
  ): {
    success: false;
    error: { code: string; message: string; details?: Record<string, unknown> };
  };
}
