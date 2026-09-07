import { Admin } from './admin.types';

export interface AuditChange {
  field: string;
  from: unknown;
  to: unknown;
}

export interface AdminAudit {
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
