/**
 * Auth Session Types
 * প্রমাণীকরণ সেশন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common/base.entity';
import { AuthDevice } from './auth-device.types';
import { AUTH } from '@vubon/shared-constants';

export interface AuthSession extends BaseEntity {
  userId: string;
  token: string;
  expiresAt: Date;
  lastActivityAt: Date;
  deviceId: string;
  status: AuthSessionStatus;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  isActive: boolean;
  terminatedAt?: Date;
}

export interface AuthSessionWithDevice extends AuthSession {
  device: AuthDevice;
}

export interface AuthSessionCreateInput {
  userId: string;
  deviceId: string;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  expiresIn?: number;
}

export interface AuthSessionUpdateInput {
  lastActivityAt?: Date;
  status?: AuthSessionStatus;
  terminatedAt?: Date;
  isActive?: boolean;
}

export type AuthSessionStatus = (typeof AUTH.STATUS)[keyof typeof AUTH.STATUS];
