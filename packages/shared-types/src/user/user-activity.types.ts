/**
 * User Activity Types
 * ইউজার অ্যাক্টিভিটি সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { USER_ACTIVITY } from '@vubon/shared-constants';

export interface UserActivity extends BaseEntity {
  userId: string;
  type: (typeof USER_ACTIVITY.TYPES)[keyof typeof USER_ACTIVITY.TYPES];
  status: (typeof USER_ACTIVITY.STATUS)[keyof typeof USER_ACTIVITY.STATUS];
  importance: (typeof USER_ACTIVITY.IMPORTANCE)[keyof typeof USER_ACTIVITY.IMPORTANCE];
  description?: string;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  metadata?: Record<string, unknown>;
  timestamp: Date;
}

export interface UserActivityCreateInput {
  userId: string;
  type: (typeof USER_ACTIVITY.TYPES)[keyof typeof USER_ACTIVITY.TYPES];
  status?: (typeof USER_ACTIVITY.STATUS)[keyof typeof USER_ACTIVITY.STATUS];
  importance?: (typeof USER_ACTIVITY.IMPORTANCE)[keyof typeof USER_ACTIVITY.IMPORTANCE];
  description?: string;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  metadata?: Record<string, unknown>;
}

export interface UserActivityStats {
  totalActivities: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  byImportance: Record<string, number>;
  lastActivityAt?: Date;
  mostActiveDay?: string;
}
