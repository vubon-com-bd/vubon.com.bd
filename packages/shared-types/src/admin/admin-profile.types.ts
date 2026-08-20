// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
// (কোনটি প্রয়োজন নেই)

// 3. প্রকল্পের অন্য ফাইল
import type { AdminId, AdminTimestamp } from './core-primitives.types';

/**
 * অ্যাডমিন প্রোফাইল ইন্টারফেস
 */
export interface AdminProfile {
  /** প্রোফাইলের অনন্য আইডি */
  id: string;
  /** অ্যাডমিন আইডি */
  adminId: AdminId;
  /** প্রথম নাম */
  firstName: string;
  /** শেষ নাম (ঐচ্ছিক) */
  lastName?: string;
  /** প্রোফাইল ছবির URL (ঐচ্ছিক) */
  avatar?: string;
  /** জীবনী (ঐচ্ছিক) */
  bio?: string;
  /** ফোন নম্বর (ঐচ্ছিক) */
  phone?: string;
  /** ঠিকানা (ঐচ্ছিক) */
  address?: string;
  /** শহর (ঐচ্ছিক) */
  city?: string;
  /** দেশ (ঐচ্ছিক) */
  country?: string;
  /** পোস্টাল কোড (ঐচ্ছিক) */
  postalCode?: string;
  /** সোশ্যাল মিডিয়া লিংক (ঐচ্ছিক) */
  socialLinks?: Record<string, string>;
  /** পছন্দসমূহ (ঐচ্ছিক) */
  preferences?: Record<string, unknown>;
  /** তৈরি করার সময় */
  createdAt: AdminTimestamp;
  /** শেষ আপডেটের সময় */
  updatedAt: AdminTimestamp;
}
