/**
 * Flash Sale Notification Types
 * ফ্ল্যাশ সেল নোটিফিকেশন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface FlashSaleNotification extends BaseEntity {
  flashSaleId: string;
  type: 'email' | 'sms' | 'push' | 'in_app';
  title: string;
  titleBangla?: string;
  message: string;
  messageBangla?: string;
  recipients: string[];
  status: 'pending' | 'sent' | 'failed' | 'cancelled';
  scheduledAt?: Date;
  sentAt?: Date;
  failedAt?: Date;
  retryCount: number;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlashSaleNotificationCreateInput {
  flashSaleId: string;
  type: 'email' | 'sms' | 'push' | 'in_app';
  title: string;
  titleBangla?: string;
  message: string;
  messageBangla?: string;
  recipients: string[];
  scheduledAt?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleNotificationUpdateInput {
  status?: 'pending' | 'sent' | 'failed' | 'cancelled';
  sentAt?: Date;
  failedAt?: Date;
  retryCount?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleNotificationResponse {
  flashSaleNotification: FlashSaleNotification;
}
