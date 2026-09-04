/**
 * Vendor Notification Types
 * ভেন্ডর নোটিফিকেশন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';

export interface VendorNotification extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  type: 'email' | 'sms' | 'push' | 'in_app';
  title: string;
  titleBangla?: string;
  message: string;
  messageBangla?: string;
  status: 'pending' | 'sent' | 'failed' | 'read' | 'delivered';
  sentAt?: Date;
  readAt?: Date;
  deliveredAt?: Date;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorNotificationCreateInput {
  vendorId: string;
  type: 'email' | 'sms' | 'push' | 'in_app';
  title: string;
  titleBangla?: string;
  message: string;
  messageBangla?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorNotificationUpdateInput {
  status?: 'pending' | 'sent' | 'failed' | 'read' | 'delivered';
  sentAt?: Date;
  readAt?: Date;
  deliveredAt?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorNotificationResponse {
  vendorNotification: VendorNotification;
}
