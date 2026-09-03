/**
 * User Log Types
 * ইউজার লগ সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { USER_LOG } from '@vubon/shared-constants';

export interface UserLog extends BaseEntity {
  userId: string;
  level: (typeof USER_LOG.LEVELS)[keyof typeof USER_LOG.LEVELS];
  category: (typeof USER_LOG.CATEGORIES)[keyof typeof USER_LOG.CATEGORIES];
  message: string;
  ipAddress?: string;
  userAgent?: string;
  stack?: string;
  metadata?: Record<string, unknown>;
  timestamp: Date;
}

export interface UserLogCreateInput {
  userId: string;
  level: (typeof USER_LOG.LEVELS)[keyof typeof USER_LOG.LEVELS];
  category: (typeof USER_LOG.CATEGORIES)[keyof typeof USER_LOG.CATEGORIES];
  message: string;
  ipAddress?: string;
  userAgent?: string;
  stack?: string;
  metadata?: Record<string, unknown>;
}

export interface UserLogQuery {
  userId?: string;
  level?: (typeof USER_LOG.LEVELS)[keyof typeof USER_LOG.LEVELS];
  category?: (typeof USER_LOG.CATEGORIES)[keyof typeof USER_LOG.CATEGORIES];
  startDate?: Date;
  endDate?: Date;
  search?: string;
  page?: number;
  limit?: number;
}

export interface UserLogResponse {
  logs: UserLog[];
  total: number;
  page: number;
  limit: number;
}
