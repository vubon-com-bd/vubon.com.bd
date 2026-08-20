// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
import { admin } from '@vubon/shared-constants';

// 3. প্রকল্পের অন্য ফাইল
import type { AdminTimestamp } from './core-primitives.types';

/**
 * লগ টাইপ
 * @description LOG_TYPES থেকে মান নিবে
 */
export type LogType = (typeof admin.LOG_TYPES)[keyof typeof admin.LOG_TYPES];

/**
 * লগ স্ট্যাটাস
 * @description LOG_STATUS থেকে মান নিবে
 */
export type LogStatus = (typeof admin.LOG_STATUS)[keyof typeof admin.LOG_STATUS];

/**
 * লগ লেভেল
 */
export type LogLevel = 'info' | 'warning' | 'error' | 'debug';

/**
 * অ্যাডমিন লগ ইন্টারফেস
 */
export interface AdminLog {
  /** অনন্য আইডি */
  id: string;
  /** অ্যাডমিন আইডি */
  adminId: string;
  /** লগ টাইপ */
  type: LogType;
  /** লগ স্ট্যাটাস */
  status: LogStatus;
  /** লগ বার্তা */
  message: string;
  /** লগ লেভেল */
  level: LogLevel;
  /** অতিরিক্ত প্রসঙ্গ (ঐচ্ছিক) */
  context?: Record<string, unknown>;
  /** আইপি ঠিকানা (ঐচ্ছিক) */
  ipAddress?: string;
  /** তৈরি করার সময় */
  createdAt: AdminTimestamp;
}

/**
 * লগ ফিল্টার টাইপ
 */
export interface LogFilter {
  /** অ্যাডমিন আইডি দ্বারা ফিল্টার */
  adminId?: string;
  /** লগ টাইপ দ্বারা ফিল্টার */
  type?: LogType;
  /** লগ স্ট্যাটাস দ্বারা ফিল্টার */
  status?: LogStatus;
  /** লগ লেভেল দ্বারা ফিল্টার */
  level?: LogLevel;
  /** তারিখের রেঞ্জ (শুরু) */
  startDate?: AdminTimestamp;
  /** তারিখের রেঞ্জ (শেষ) */
  endDate?: AdminTimestamp;
}
