/**
 * Admin Audit Types
 * অ্যাডমিন অডিট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { ADMIN_AUDIT } from '@vubon/shared-constants';

export interface AdminAudit extends BaseEntity {
  adminId: string;
  action: (typeof ADMIN_AUDIT.ACTIONS)[keyof typeof ADMIN_AUDIT.ACTIONS];
  resource: (typeof ADMIN_AUDIT.RESOURCES)[keyof typeof ADMIN_AUDIT.RESOURCES];
  resourceId?: string;
  status: (typeof ADMIN_AUDIT.STATUS)[keyof typeof ADMIN_AUDIT.STATUS];
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

export interface AdminAuditCreateInput {
  adminId: string;
  action: (typeof ADMIN_AUDIT.ACTIONS)[keyof typeof ADMIN_AUDIT.ACTIONS];
  resource: (typeof ADMIN_AUDIT.RESOURCES)[keyof typeof ADMIN_AUDIT.RESOURCES];
  resourceId?: string;
  status?: (typeof ADMIN_AUDIT.STATUS)[keyof typeof ADMIN_AUDIT.STATUS];
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export interface AdminAuditQuery {
  adminId?: string;
  action?: (typeof ADMIN_AUDIT.ACTIONS)[keyof typeof ADMIN_AUDIT.ACTIONS];
  resource?: (typeof ADMIN_AUDIT.RESOURCES)[keyof typeof ADMIN_AUDIT.RESOURCES];
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}
