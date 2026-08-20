// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
import { admin } from '@vubon/shared-constants';

// 3. প্রকল্পের অন্য ফাইল
import type { AdminTimestamp } from './core-primitives.types';

/**
 * বায়োমেট্রিক টাইপ
 * @description BIOMETRIC_TYPES থেকে মান নিবে
 */
export type BiometricType = (typeof admin.BIOMETRIC_TYPES)[keyof typeof admin.BIOMETRIC_TYPES];

/**
 * বায়োমেট্রিক স্ট্যাটাস
 * @description BIOMETRIC_STATUS থেকে মান নিবে
 */
export type BiometricStatus = (typeof admin.BIOMETRIC_STATUS)[keyof typeof admin.BIOMETRIC_STATUS];

/**
 * অ্যাডমিন বায়োমেট্রিক ইন্টারফেস
 */
export interface AdminBiometric {
  /** অনন্য আইডি */
  id: string;
  /** অ্যাডমিন আইডি */
  adminId: string;
  /** বায়োমেট্রিক টাইপ */
  type: BiometricType;
  /** বায়োমেট্রিক স্ট্যাটাস */
  status: BiometricStatus;
  /** ডিভাইস আইডি */
  deviceId: string;
  /** এনক্রিপ্টেড ডেটা */
  encryptedData: string;
  /** সক্রিয় হওয়ার সময় (ঐচ্ছিক) */
  enabledAt?: AdminTimestamp;
  /** তৈরি করার সময় */
  createdAt: AdminTimestamp;
}
