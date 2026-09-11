import { BaseEntity } from '../common/base.types';
import { ADMIN_ACTIVITY } from '@vubon/shared-constants/src/admin/admin-activity.constants';
import { AdminPublic } from './admin.types';

/**
 * Audit action value
 */
export type AuditAction = (typeof ADMIN_ACTIVITY)[keyof typeof ADMIN_ACTIVITY];

/**
 * Audit change interface
 */
export interface AuditChange {
  field: string;
  from: unknown;
  to: unknown;
}

/**
 * Admin audit interface
 */
export interface AdminAudit extends BaseEntity {
  auditId: string;
  adminId: string;
  admin: AdminPublic;
  action: AuditAction;
  resource: string;
  resourceId: string;
  changes: AuditChange[];
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}
