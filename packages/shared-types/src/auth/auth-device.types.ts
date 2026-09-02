/**
 * Auth Device Types
 * প্রমাণীকরণ ডিভাইস সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common/base.entity';
import { AUTH_DEVICE } from '@vubon/shared-constants';

export interface AuthDevice extends BaseEntity {
  userId: string;
  deviceId: string;
  type: AuthDeviceType;
  platform: AuthDevicePlatform;
  status: AuthDeviceStatus;
  name?: string;
  fingerprint?: string;
  lastActiveAt: Date;
  trustedUntil?: Date;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  metadata?: Record<string, unknown>;
}

export interface AuthDeviceCreateInput {
  userId: string;
  type: AuthDeviceType;
  platform: AuthDevicePlatform;
  name?: string;
  fingerprint?: string;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  trustDuration?: number;
}

export interface AuthDeviceUpdateInput {
  name?: string;
  status?: AuthDeviceStatus;
  lastActiveAt?: Date;
  trustedUntil?: Date;
  location?: string;
}

export type AuthDeviceType = (typeof AUTH_DEVICE.TYPES)[keyof typeof AUTH_DEVICE.TYPES];
export type AuthDevicePlatform = (typeof AUTH_DEVICE.PLATFORMS)[keyof typeof AUTH_DEVICE.PLATFORMS];
export type AuthDeviceStatus = (typeof AUTH_DEVICE.STATUS)[keyof typeof AUTH_DEVICE.STATUS];
