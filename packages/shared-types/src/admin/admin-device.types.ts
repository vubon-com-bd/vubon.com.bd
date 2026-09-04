/**
 * Admin Device Types
 * অ্যাডমিন ডিভাইস সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { ADMIN_DEVICE } from '@vubon/shared-constants';

export interface AdminDevice extends BaseEntity {
  adminId: string;
  deviceId: string;
  type: (typeof ADMIN_DEVICE.TYPES)[keyof typeof ADMIN_DEVICE.TYPES];
  status: (typeof ADMIN_DEVICE.STATUS)[keyof typeof ADMIN_DEVICE.STATUS];
  name?: string;
  fingerprint?: string;
  lastActiveAt: Date;
  trustedUntil?: Date;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
}

export interface AdminDeviceCreateInput {
  adminId: string;
  type: (typeof ADMIN_DEVICE.TYPES)[keyof typeof ADMIN_DEVICE.TYPES];
  name?: string;
  fingerprint?: string;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  trustDuration?: number;
}

export interface AdminDeviceUpdateInput {
  name?: string;
  status?: (typeof ADMIN_DEVICE.STATUS)[keyof typeof ADMIN_DEVICE.STATUS];
  lastActiveAt?: Date;
  trustedUntil?: Date;
}
