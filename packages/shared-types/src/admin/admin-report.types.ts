// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
import { admin } from '@vubon/shared-constants';

// 3. প্রকল্পের অন্য ফাইল
import type { AdminTimestamp } from './core-primitives.types';

/**
 * রিপোর্ট টাইপ
 * @description REPORT_TYPES থেকে মান নিবে
 */
export type ReportType = (typeof admin.REPORT_TYPES)[keyof typeof admin.REPORT_TYPES];

/**
 * রিপোর্ট স্ট্যাটাস
 * @description REPORT_STATUS থেকে মান নিবে
 */
export type ReportStatus = (typeof admin.REPORT_STATUS)[keyof typeof admin.REPORT_STATUS];

/**
 * রিপোর্ট ফরম্যাট টাইপ
 */
export type ReportFormat = 'pdf' | 'excel' | 'csv' | 'json';

/**
 * অ্যাডমিন রিপোর্ট ইন্টারফেস
 */
export interface AdminReport {
  /** অনন্য আইডি */
  id: string;
  /** অ্যাডমিন আইডি */
  adminId: string;
  /** রিপোর্ট টাইপ */
  type: ReportType;
  /** রিপোর্ট স্ট্যাটাস */
  status: ReportStatus;
  /** রিপোর্টের নাম */
  name: string;
  /** রিপোর্টের বিবরণ (ঐচ্ছিক) */
  description?: string;
  /** রিপোর্ট ডেটা */
  data: Record<string, unknown>;
  /** রিপোর্ট ফরম্যাট */
  format: ReportFormat;
  /** ফাইলের URL (ঐচ্ছিক) */
  fileUrl?: string;
  /** জেনারেট হওয়ার সময় (ঐচ্ছিক) */
  generatedAt?: AdminTimestamp;
  /** তৈরি করার সময় */
  createdAt: AdminTimestamp;
}
