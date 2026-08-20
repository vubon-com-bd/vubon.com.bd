// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
import { admin } from '@vubon/shared-constants';

// 3. প্রকল্পের অন্য ফাইল
import type { AdminId, AdminTimestamp } from './core-primitives.types';

/**
 * অ্যাক্টিভিটি টাইপ
 * @description ACTIVITY_TYPES থেকে মান নিবে
 */
export type ActivityType = (typeof admin.ACTIVITY_TYPES)[keyof typeof admin.ACTIVITY_TYPES];

/**
 * অ্যাক্টিভিটি স্ট্যাটাস
 * @description ACTIVITY_STATUS থেকে মান নিবে
 */
export type ActivityStatus = (typeof admin.ACTIVITY_STATUS)[keyof typeof admin.ACTIVITY_STATUS];

/**
 * অ্যাডমিন অ্যাক্টিভিটি ইন্টারফেস
 */
export interface AdminActivity {
  /** অনন্য আইডি */
  id: string;
  /** অ্যাডমিন আইডি */
  adminId: AdminId;
  /** অ্যাক্টিভিটি টাইপ */
  type: ActivityType;
  /** অ্যাক্টিভিটি স্ট্যাটাস */
  status: ActivityStatus;
  /** অ্যাক্টিভিটির বিবরণ */
  description: string;
  /** অতিরিক্ত মেটাডেটা (ঐচ্ছিক) */
  metadata?: Record<string, unknown>;
  /** আইপি ঠিকানা (ঐচ্ছিক) */
  ipAddress?: string;
  /** ইউজার এজেন্ট (ঐচ্ছিক) */
  userAgent?: string;
  /** কার্যকাল (মিলিসেকেন্ডে) (ঐচ্ছিক) */
  duration?: number;
  /** তৈরি করার সময় */
  createdAt: AdminTimestamp;
  /** শেষ হওয়ার সময় (ঐচ্ছিক) */
  completedAt?: AdminTimestamp;
}

/**
 * অ্যাক্টিভিটি ফিল্টার টাইপ
 */
export interface ActivityFilter {
  /** অ্যাডমিন আইডি দ্বারা ফিল্টার */
  adminId?: AdminId;
  /** অ্যাক্টিভিটি টাইপ দ্বারা ফিল্টার */
  type?: ActivityType;
  /** অ্যাক্টিভিটি স্ট্যাটাস দ্বারা ফিল্টার */
  status?: ActivityStatus;
  /** তারিখের রেঞ্জ (শুরু) */
  startDate?: AdminTimestamp;
  /** তারিখের রেঞ্জ (শেষ) */
  endDate?: AdminTimestamp;
  /** সর্বনিম্ন কার্যকাল */
  minDuration?: number;
  /** সর্বোচ্চ কার্যকাল */
  maxDuration?: number;
}
