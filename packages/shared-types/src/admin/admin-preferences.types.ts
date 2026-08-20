// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
import { admin } from '@vubon/shared-constants';

// 3. প্রকল্পের অন্য ফাইল
import type { AdminTimestamp } from './core-primitives.types';

/**
 * প্রিফারেন্স ক্যাটাগরি টাইপ
 * @description PREFERENCE_CATEGORIES থেকে মান নিবে
 */
export type PreferenceCategory =
  (typeof admin.PREFERENCE_CATEGORIES)[keyof typeof admin.PREFERENCE_CATEGORIES];

/**
 * অ্যাডমিন প্রিফারেন্স ইন্টারফেস
 */
export interface AdminPreference {
  /** প্রিফারেন্সের কী */
  key: string;
  /** প্রিফারেন্সের মান */
  value: unknown;
  /** প্রিফারেন্সের ক্যাটাগরি */
  category: PreferenceCategory;
  /** তৈরি করার সময় */
  createdAt: AdminTimestamp;
  /** শেষ আপডেটের সময় */
  updatedAt: AdminTimestamp;
}

/**
 * অ্যাডমিন প্রিফারেন্স টাইপ
 */
export interface AdminPreferences {
  /** থিম সেটিংস */
  theme: 'light' | 'dark' | 'system';
  /** ভাষা */
  language: string;
  /** সময় অঞ্চল */
  timezone: string;
  /** তারিখের ফরম্যাট */
  dateFormat: string;
  /** নোটিফিকেশন পছন্দসমূহ */
  notificationPreferences: Record<string, boolean>;
  /** ড্যাশবোর্ড লেআউট */
  dashboardLayout: string;
  /** অন্যান্য কাস্টম প্রিফারেন্স */
  [key: string]: unknown;
}
