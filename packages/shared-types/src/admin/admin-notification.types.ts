// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
import { admin } from '@vubon/shared-constants';

// 3. প্রকল্পের অন্য ফাইল
import type { AdminTimestamp } from './core-primitives.types';

/**
 * নোটিফিকেশন টাইপ
 * @description NOTIFICATION_TYPES থেকে মান নিবে
 */
export type NotificationType =
  (typeof admin.NOTIFICATION_TYPES)[keyof typeof admin.NOTIFICATION_TYPES];

/**
 * নোটিফিকেশন স্ট্যাটাস
 * @description NOTIFICATION_STATUS থেকে মান নিবে
 */
export type NotificationStatus =
  (typeof admin.NOTIFICATION_STATUS)[keyof typeof admin.NOTIFICATION_STATUS];

/**
 * অ্যাডমিন নোটিফিকেশন ইন্টারফেস
 */
export interface AdminNotification {
  /** অনন্য আইডি */
  id: string;
  /** অ্যাডমিন আইডি */
  adminId: string;
  /** নোটিফিকেশন টাইপ */
  type: NotificationType;
  /** নোটিফিকেশন স্ট্যাটাস */
  status: NotificationStatus;
  /** নোটিফিকেশনের শিরোনাম */
  title: string;
  /** নোটিফিকেশনের বার্তা */
  message: string;
  /** অতিরিক্ত ডেটা (ঐচ্ছিক) */
  data?: Record<string, unknown>;
  /** পড়ার সময় (ঐচ্ছিক) */
  readAt?: AdminTimestamp;
  /** ডেলিভারির সময় (ঐচ্ছিক) */
  deliveredAt?: AdminTimestamp;
  /** তৈরি করার সময় */
  createdAt: AdminTimestamp;
}
