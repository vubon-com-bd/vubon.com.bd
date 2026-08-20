// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
import { admin } from '@vubon/shared-constants';

// 3. প্রকল্পের অন্য ফাইল
import type { AdminTimestamp } from './core-primitives.types';

/**
 * অডিট টাইপ
 * @description AUDIT_TYPES থেকে মান নিবে
 */
export type AuditType = (typeof admin.AUDIT_TYPES)[keyof typeof admin.AUDIT_TYPES];

/**
 * অডিট স্ট্যাটাস
 * @description AUDIT_STATUS থেকে মান নিবে
 */
export type AuditStatus = (typeof admin.AUDIT_STATUS)[keyof typeof admin.AUDIT_STATUS];

/**
 * পরিবর্তনের মান সংরক্ষণের জন্য টাইপ
 */
export type ChangeValue = { old: unknown; new: unknown };

/**
 * অ্যাডমিন অডিট ইন্টারফেস
 */
export interface AdminAudit {
  /** অনন্য আইডি */
  id: string;
  /** অ্যাডমিন আইডি */
  adminId: string;
  /** অডিট টাইপ */
  type: AuditType;
  /** অডিট স্ট্যাটাস */
  status: AuditStatus;
  /** সম্পাদিত অ্যাকশন */
  action: string;
  /** রিসোর্সের নাম */
  resource: string;
  /** রিসোর্স আইডি (ঐচ্ছিক) */
  resourceId?: string;
  /** পরিবর্তনের বিবরণ (ঐচ্ছিক) */
  changes?: Record<string, ChangeValue>;
  /** আইপি ঠিকানা (ঐচ্ছিক) */
  ipAddress?: string;
  /** ইউজার এজেন্ট (ঐচ্ছিক) */
  userAgent?: string;
  /** অতিরিক্ত মেটাডেটা (ঐচ্ছিক) */
  metadata?: Record<string, unknown>;
  /** তৈরি করার সময় */
  createdAt: AdminTimestamp;
}

/**
 * অডিট ফিল্টার টাইপ
 */
export interface AuditFilter {
  /** অ্যাডমিন আইডি দ্বারা ফিল্টার */
  adminId?: string;
  /** অডিট টাইপ দ্বারা ফিল্টার */
  type?: AuditType;
  /** অডিট স্ট্যাটাস দ্বারা ফিল্টার */
  status?: AuditStatus;
  /** অ্যাকশন দ্বারা ফিল্টার */
  action?: string;
  /** রিসোর্স দ্বারা ফিল্টার */
  resource?: string;
  /** তারিখের রেঞ্জ (শুরু) */
  startDate?: AdminTimestamp;
  /** তারিখের রেঞ্জ (শেষ) */
  endDate?: AdminTimestamp;
}
