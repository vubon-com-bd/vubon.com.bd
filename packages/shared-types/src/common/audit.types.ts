/**
 * Audit Types
 * Audit logging and tracking data structures
 */

import { ID, Timestamp, JsonObject } from './core-primitives.types';

/**
 * Audit Action Types
 */
export const AUDIT_ACTIONS = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  READ: 'read',
  LOGIN: 'login',
  LOGOUT: 'logout',
  EXPORT: 'export',
  IMPORT: 'import',
  APPROVE: 'approve',
  REJECT: 'reject',
  SUSPEND: 'suspend',
  UNSUSPEND: 'unsuspend',
  BLOCK: 'block',
  UNBLOCK: 'unblock',
} as const;

export type AuditAction = (typeof AUDIT_ACTIONS)[keyof typeof AUDIT_ACTIONS];

/**
 * Audit Resource Types
 */
export const AUDIT_RESOURCES = {
  USER: 'user',
  ADMIN: 'admin',
  VENDOR: 'vendor',
  PRODUCT: 'product',
  ORDER: 'order',
  PAYMENT: 'payment',
  SETTINGS: 'settings',
  CONTENT: 'content',
  SEO: 'seo',
  ANALYTICS: 'analytics',
  NOTIFICATION: 'notification',
  TICKET: 'ticket',
  REPORT: 'report',
} as const;

export type AuditResource = (typeof AUDIT_RESOURCES)[keyof typeof AUDIT_RESOURCES];

/**
 * Audit Log Entry
 * Complete audit log record
 */
export interface AuditLog {
  /** Unique identifier for the log entry */
  id: ID;
  /** ID of the user who performed the action */
  userId: ID;
  /** ID of the admin (if performed by admin) */
  adminId?: ID;
  /** Action performed */
  action: AuditAction;
  /** Resource type affected */
  resource: AuditResource;
  /** ID of the resource affected */
  resourceId: ID;
  /** Changes made (before/after) */
  changes?: {
    before?: JsonObject;
    after?: JsonObject;
  };
  /** Additional metadata */
  metadata?: JsonObject;
  /** IP address of the request */
  ipAddress: string;
  /** User agent of the request */
  userAgent: string;
  /** Timestamp of the action */
  createdAt: Timestamp;
}

/**
 * Audit Log Filter
 * Filters for querying audit logs
 */
export interface AuditLogFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by admin ID */
  adminId?: ID;
  /** Filter by action */
  action?: AuditAction;
  /** Filter by resource type */
  resource?: AuditResource;
  /** Filter by resource ID */
  resourceId?: ID;
  /** Start date for filter */
  startDate?: Date;
  /** End date for filter */
  endDate?: Date;
  /** Search term for metadata */
  searchTerm?: string;
}

/**
 * Audit Log Summary
 * Aggregated audit log statistics
 */
export interface AuditLogSummary {
  /** Total number of actions */
  totalActions: number;
  /** Count by action type */
  actionCounts: Record<AuditAction, number>;
  /** Count by resource type */
  resourceCounts: Record<AuditResource, number>;
  /** Most active users */
  topUsers: Array<{
    userId: ID;
    actionCount: number;
  }>;
  /** Time period covered */
  period: {
    start: Date;
    end: Date;
  };
}
