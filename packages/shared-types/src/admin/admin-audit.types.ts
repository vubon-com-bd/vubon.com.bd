import { BaseEntity } from '../common/base.types';
import { Admin } from './admin.types';

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
  admin: Admin;
  action: string;
  resource: string;
  resourceId: string;
  changes: AuditChange[];
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
