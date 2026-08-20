// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
import { admin } from '@vubon/shared-constants';

// 3. প্রকল্পের অন্য ফাইল
import type { AdminTimestamp } from './core-primitives.types';

/**
 * ভেরিফিকেশন টাইপ
 * @description VERIFICATION_TYPES থেকে মান নিবে
 */
export type VerificationType =
  (typeof admin.VERIFICATION_TYPES)[keyof typeof admin.VERIFICATION_TYPES];

/**
 * ভেরিফিকেশন স্ট্যাটাস
 * @description VERIFICATION_STATUS থেকে মান নিবে
 */
export type VerificationStatus =
  (typeof admin.VERIFICATION_STATUS)[keyof typeof admin.VERIFICATION_STATUS];

/**
 * অ্যাডমিন ভেরিফিকেশন ইন্টারফেস
 */
export interface AdminVerification {
  /** অনন্য আইডি */
  id: string;
  /** অ্যাডমিন আইডি */
  adminId: string;
  /** ভেরিফিকেশন টাইপ */
  type: VerificationType;
  /** ভেরিফিকেশন স্ট্যাটাস */
  status: VerificationStatus;
  /** ভেরিফিকেশন কোড */
  code: string;
  /** মেয়াদ শেষ হওয়ার সময় */
  expiresAt: AdminTimestamp;
  /** চেষ্টার সংখ্যা */
  attempts: number;
  /** সর্বোচ্চ চেষ্টার সংখ্যা */
  maxAttempts: number;
  /** ভেরিফাইড হওয়ার সময় (ঐচ্ছিক) */
  verifiedAt?: AdminTimestamp;
  /** তৈরি করার সময় */
  createdAt: AdminTimestamp;
}
