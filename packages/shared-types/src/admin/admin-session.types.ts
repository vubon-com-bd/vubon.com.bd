// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
import { admin } from '@vubon/shared-constants';

// 3. প্রকল্পের অন্য ফাইল
import type { AdminTimestamp } from './core-primitives.types';

/**
 * সেশন স্ট্যাটাস টাইপ
 * @description SESSION_STATUS থেকে মান নিবে
 */
export type SessionStatus = (typeof admin.SESSION_STATUS)[keyof typeof admin.SESSION_STATUS];

/**
 * অ্যাডমিন সেশন ইন্টারফেস
 */
export interface AdminSession {
  /** অনন্য আইডি */
  id: string;
  /** অ্যাডমিন আইডি */
  adminId: string;
  /** অ্যাক্সেস টোকেন */
  token: string;
  /** রিফ্রেশ টোকেন */
  refreshToken: string;
  /** সেশন স্ট্যাটাস */
  status: SessionStatus;
  /** মেয়াদ শেষ হওয়ার সময় */
  expiresAt: AdminTimestamp;
  /** শেষ কার্যকলাপের সময় */
  lastActivityAt: AdminTimestamp;
  /** আইপি ঠিকানা (ঐচ্ছিক) */
  ipAddress?: string;
  /** ইউজার এজেন্ট (ঐচ্ছিক) */
  userAgent?: string;
  /** ডিভাইস আইডি (ঐচ্ছিক) */
  deviceId?: string;
  /** অবস্থান (ঐচ্ছিক) */
  location?: string;
  /** তৈরি করার সময় */
  createdAt: AdminTimestamp;
}

/**
 * সেশন ফিল্টার টাইপ
 */
export interface SessionFilter {
  /** অ্যাডমিন আইডি দ্বারা ফিল্টার */
  adminId?: string;
  /** সেশন স্ট্যাটাস দ্বারা ফিল্টার */
  status?: SessionStatus;
  /** ডিভাইস আইডি দ্বারা ফিল্টার */
  deviceId?: string;
  /** তারিখের রেঞ্জ (শুরু) */
  startDate?: AdminTimestamp;
  /** তারিখের রেঞ্জ (শেষ) */
  endDate?: AdminTimestamp;
}
