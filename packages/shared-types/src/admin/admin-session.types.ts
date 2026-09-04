/**
 * Admin Session Types
 * অ্যাডমিন সেশন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { ADMIN_SESSION } from '@vubon/shared-constants';

export interface AdminSession extends BaseEntity {
  adminId: string;
  token: string;
  status: (typeof ADMIN_SESSION.STATUS)[keyof typeof ADMIN_SESSION.STATUS];
  expiresAt: Date;
  lastActivityAt: Date;
  deviceId: string;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
}

export interface AdminSessionCreateInput {
  adminId: string;
  deviceId: string;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  expiresIn?: number;
}

export interface AdminSessionUpdateInput {
  status?: (typeof ADMIN_SESSION.STATUS)[keyof typeof ADMIN_SESSION.STATUS];
  lastActivityAt?: Date;
  expiresAt?: Date;
}

export interface AdminSessionListResponse {
  sessions: AdminSession[];
  total: number;
  active: number;
}
