// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
// (কোনটি প্রয়োজন নেই)

// 3. প্রকল্পের অন্য ফাইল
import type {
  AdminId,
  AdminEmail,
  AdminName,
  AdminStatus,
  AdminType,
  AdminTimestamp,
} from './core-primitives.types';

/**
 * সম্পূর্ণ অ্যাডমিন টাইপ
 */
export interface Admin {
  /** অনন্য আইডি */
  id: AdminId;
  /** ইমেইল ঠিকানা */
  email: AdminEmail;
  /** সম্পূর্ণ নাম */
  name: AdminName;
  /** অ্যাডমিনের স্ট্যাটাস */
  status: AdminStatus;
  /** অ্যাডমিনের ধরন */
  type: AdminType;
  /** রোল আইডি */
  roleId: string;
  /** প্রোফাইল আইডি (ঐচ্ছিক) */
  profileId?: string;
  /** তৈরি করার সময় */
  createdAt: AdminTimestamp;
  /** শেষ আপডেটের সময় */
  updatedAt: AdminTimestamp;
  /** শেষ লগইনের সময় (ঐচ্ছিক) */
  lastLoginAt?: AdminTimestamp;
  /** ইমেইল ভেরিফাইড কিনা */
  isVerified: boolean;
  /** 2FA সক্রিয় কিনা */
  is2FAEnabled: boolean;
  /** অতিরিক্ত মেটাডেটা (ঐচ্ছিক) */
  metadata?: Record<string, unknown>;
}
