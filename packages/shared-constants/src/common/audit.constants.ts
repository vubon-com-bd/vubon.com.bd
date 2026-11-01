/**
 * Audit Constants
 * @module shared-constants/common/audit
 *
 * Cross-cutting audit + activity types।
 */

export const AUDIT_ACTION = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  VIEW: 'view',
  EXPORT: 'export',
  IMPORT: 'import',
  APPROVE: 'approve',
  REJECT: 'reject',
  ASSIGN: 'assign',
  REVOKE: 'revoke',
  CONFIG_CHANGE: 'config_change',
  LOGIN: 'login',
  LOGOUT: 'logout',
} as const;

export const AUDIT_SCOPE = {
  SYSTEM: 'system',
  USER: 'user',
  ADMIN: 'admin',
  CONFIG: 'config',
  SECURITY: 'security',
  PAYMENT: 'payment',
  ORDER: 'order',
  DATA: 'data',
  ACCESS: 'access',
} as const;

export const AUDIT_STATUS = {
  SUCCESS: 'success',
  FAILED: 'failed',
  PENDING: 'pending',
} as const;

export type AuditActionType = (typeof AUDIT_ACTION)[keyof typeof AUDIT_ACTION];
export type AuditScopeType = (typeof AUDIT_SCOPE)[keyof typeof AUDIT_SCOPE];
export type AuditStatusType = (typeof AUDIT_STATUS)[keyof typeof AUDIT_STATUS];
