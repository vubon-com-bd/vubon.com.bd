/**
 * Admin Activity Types
 * অ্যাডমিন অ্যাক্টিভিটি সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { ADMIN_ACTIVITY } from '@vubon/shared-constants';

export interface AdminActivity extends BaseEntity {
  adminId: string;
  type: (typeof ADMIN_ACTIVITY.TYPES)[keyof typeof ADMIN_ACTIVITY.TYPES];
  status: (typeof ADMIN_ACTIVITY.STATUS)[keyof typeof ADMIN_ACTIVITY.STATUS];
  importance: (typeof ADMIN_ACTIVITY.IMPORTANCE)[keyof typeof ADMIN_ACTIVITY.IMPORTANCE];
  description?: string;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  metadata?: Record<string, unknown>;
  timestamp: Date;
}

export interface AdminActivityCreateInput {
  adminId: string;
  type: (typeof ADMIN_ACTIVITY.TYPES)[keyof typeof ADMIN_ACTIVITY.TYPES];
  status?: (typeof ADMIN_ACTIVITY.STATUS)[keyof typeof ADMIN_ACTIVITY.STATUS];
  importance?: (typeof ADMIN_ACTIVITY.IMPORTANCE)[keyof typeof ADMIN_ACTIVITY.IMPORTANCE];
  description?: string;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  metadata?: Record<string, unknown>;
}

export interface AdminActivityStats {
  total: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  byImportance: Record<string, number>;
  recentActivities: AdminActivity[];
}
