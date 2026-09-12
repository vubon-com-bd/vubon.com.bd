import { BaseEntity } from '../common/base.types';
import { ADMIN_ACTIVITY } from '@vubon/shared-constants/src/admin/admin-activity.constants';

/**
 * Audit action value — from ADMIN_ACTIVITY
 */
export type AuditAction = (typeof ADMIN_ACTIVITY)[keyof typeof ADMIN_ACTIVITY];

/**
 * Audit-safe primitive value.
 * Prevents leaking arbitrary objects (e.g. nested tokens) into logs.
 * Replace sensitive values with the literal '[REDACTED]' upstream.
 */
export type AuditValue = string | number | boolean | null | undefined | '[REDACTED]';

/**
 * Audit change record — before/after for a single field
 */
export interface AuditChange {
  field: string;
  from: AuditValue;
  to: AuditValue;
}

/**
 * Admin audit interface
 *
 * Design notes:
 * - `adminId` only — no Admin summary embed.
 * - `changes[]` records field-level diffs for compliance.
 * - `ipAddress`/`userAgent` recorded for forensic trace.
 */
export interface AdminAudit extends BaseEntity {
  auditId: string;
  adminId: string;
  action: AuditAction;
  resource: string;
  resourceId: string;
  changes: AuditChange[];
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}
