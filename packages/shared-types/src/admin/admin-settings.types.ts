// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
import { admin } from '@vubon/shared-constants';

// 3. প্রকল্পের অন্য ফাইল
import type { AdminTimestamp } from './core-primitives.types';

/**
 * সেটিংস ক্যাটাগরি টাইপ
 * @description SETTINGS_CATEGORIES থেকে মান নিবে
 */
export type SettingsCategory =
  (typeof admin.SETTINGS_CATEGORIES)[keyof typeof admin.SETTINGS_CATEGORIES];

/**
 * সেটিংস ভ্যালু টাইপ
 */
export type SettingValue = string | number | boolean | object | null;

/**
 * অ্যাডমিন সেটিংস ইন্টারফেস
 */
export interface AdminSetting {
  /** সেটিংসের কী */
  key: string;
  /** সেটিংসের মান */
  value: SettingValue;
  /** সেটিংসের ক্যাটাগরি */
  category: SettingsCategory;
  /** পাবলিক সেটিংস কিনা */
  isPublic: boolean;
  /** তৈরি করার সময় */
  createdAt: AdminTimestamp;
  /** শেষ আপডেটের সময় */
  updatedAt: AdminTimestamp;
}

/**
 * অ্যাডমিন সেটিংস টাইপ (সব সেটিংসের অবজেক্ট)
 */
export type AdminSettings = Record<string, SettingValue>;
