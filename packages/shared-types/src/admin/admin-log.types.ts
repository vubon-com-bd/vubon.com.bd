/**
 * Admin Log Types
 * অ্যাডমিন লগ সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { ADMIN_LOG } from '@vubon/shared-constants';

export interface AdminLog extends BaseEntity {
  adminId: string;
  level: (typeof ADMIN_LOG.LEVELS)[keyof typeof ADMIN_LOG.LEVELS];
  category: (typeof ADMIN_LOG.CATEGORIES)[keyof typeof ADMIN_LOG.CATEGORIES];
  message: string;
  ipAddress?: string;
  userAgent?: string;
  stack?: string;
  metadata?: Record<string, unknown>;
  timestamp: Date;
}

export interface AdminLogCreateInput {
  adminId: string;
  level: (typeof ADMIN_LOG.LEVELS)[keyof typeof ADMIN_LOG.LEVELS];
  category: (typeof ADMIN_LOG.CATEGORIES)[keyof typeof ADMIN_LOG.CATEGORIES];
  message: string;
  ipAddress?: string;
  userAgent?: string;
  stack?: string;
  metadata?: Record<string, unknown>;
}

export interface AdminLogQuery {
  adminId?: string;
  level?: (typeof ADMIN_LOG.LEVELS)[keyof typeof ADMIN_LOG.LEVELS];
  category?: (typeof ADMIN_LOG.CATEGORIES)[keyof typeof ADMIN_LOG.CATEGORIES];
  startDate?: Date;
  endDate?: Date;
  search?: string;
  page?: number;
  limit?: number;
}

export interface AdminLogStats {
  total: number;
  byLevel: Record<string, number>;
  byCategory: Record<string, number>;
  errors: number;
  warnings: number;
}
