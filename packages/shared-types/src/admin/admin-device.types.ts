// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
import { admin } from '@vubon/shared-constants';

// 3. প্রকল্পের অন্য ফাইল
import type { AdminTimestamp } from './core-primitives.types';

/**
 * ডিভাইস টাইপ
 * @description DEVICE_TYPES থেকে মান নিবে
 */
export type DeviceType = (typeof admin.DEVICE_TYPES)[keyof typeof admin.DEVICE_TYPES];

/**
 * ডিভাইস স্ট্যাটাস
 * @description DEVICE_STATUS থেকে মান নিবে
 */
export type DeviceStatus = (typeof admin.DEVICE_STATUS)[keyof typeof admin.DEVICE_STATUS];

/**
 * অ্যাডমিন ডিভাইস ইন্টারফেস
 */
export interface AdminDevice {
  /** অনন্য আইডি */
  id: string;
  /** অ্যাডমিন আইডি */
  adminId: string;
  /** ডিভাইস টাইপ */
  type: DeviceType;
  /** ডিভাইস স্ট্যাটাস */
  status: DeviceStatus;
  /** ডিভাইস ফিঙ্গারপ্রিন্ট */
  fingerprint: string;
  /** ডিভাইসের নাম (ঐচ্ছিক) */
  name?: string;
  /** অপারেটিং সিস্টেম (ঐচ্ছিক) */
  os?: string;
  /** ব্রাউজার (ঐচ্ছিক) */
  browser?: string;
  /** ট্রাস্ট স্কোর (0-100) */
  trustScore: number;
  /** শেষ ব্যবহারের সময় */
  lastUsedAt: AdminTimestamp;
  /** তৈরি করার সময় */
  createdAt: AdminTimestamp;
}
