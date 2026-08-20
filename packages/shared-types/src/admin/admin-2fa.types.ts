// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
import { admin } from '@vubon/shared-constants';

// 3. প্রকল্পের অন্য ফাইল
import type { AdminTimestamp } from './core-primitives.types';

/**
 * 2FA টাইপ
 * @description TWO_FA_TYPES থেকে মান নিবে
 */
export type TwoFAType = (typeof admin.TWO_FA_TYPES)[keyof typeof admin.TWO_FA_TYPES];

/**
 * 2FA স্ট্যাটাস
 * @description TWO_FA_STATUS থেকে মান নিবে
 */
export type TwoFAStatus = (typeof admin.TWO_FA_STATUS)[keyof typeof admin.TWO_FA_STATUS];

/**
 * অ্যাডমিন 2FA ইন্টারফেস
 */
export interface Admin2FA {
  /** অনন্য আইডি */
  id: string;
  /** অ্যাডমিন আইডি */
  adminId: string;
  /** 2FA টাইপ */
  type: TwoFAType;
  /** 2FA স্ট্যাটাস */
  status: TwoFAStatus;
  /** সিক্রেট কী */
  secret: string;
  /** ব্যাকআপ কোডসমূহ */
  backupCodes: string[];
  /** রিকভারি কোডসমূহ */
  recoveryCodes: string[];
  /** সক্রিয় হওয়ার সময় (ঐচ্ছিক) */
  enabledAt?: AdminTimestamp;
  /** নিষ্ক্রিয় হওয়ার সময় (ঐচ্ছিক) */
  disabledAt?: AdminTimestamp;
  /** তৈরি করার সময় */
  createdAt: AdminTimestamp;
}
