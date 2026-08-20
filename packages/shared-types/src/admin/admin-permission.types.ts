// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
import { admin } from '@vubon/shared-constants';

// 3. প্রকল্পের অন্য ফাইল
import type { AdminTimestamp } from './core-primitives.types';

/**
 * পারমিশন আইডি টাইপ
 */
export type PermissionId = string;

/**
 * পারমিশন অ্যাকশন টাইপ
 * @description PERMISSION_ACTION_TYPES থেকে মান নিবে
 */
export type PermissionAction =
  (typeof admin.PERMISSION_ACTION_TYPES)[keyof typeof admin.PERMISSION_ACTION_TYPES];

/**
 * পারমিশন গ্রুপ টাইপ
 * @description DEFAULT_PERMISSION_GROUPS থেকে মান নিবে
 */
export type PermissionGroup =
  (typeof admin.DEFAULT_PERMISSION_GROUPS)[keyof typeof admin.DEFAULT_PERMISSION_GROUPS];

/**
 * পারমিশন লেভেল টাইপ
 * @description PERMISSION_LEVEL থেকে মান নিবে
 */
export type PermissionLevel = (typeof admin.PERMISSION_LEVEL)[keyof typeof admin.PERMISSION_LEVEL];

/**
 * অ্যাডমিন পারমিশন ইন্টারফেস
 */
export interface AdminPermission {
  /** অনন্য আইডি */
  id: PermissionId;
  /** পারমিশনের নাম */
  name: string;
  /** পারমিশনের বিবরণ (ঐচ্ছিক) */
  description?: string;
  /** অ্যাকশন টাইপ */
  action: PermissionAction;
  /** রিসোর্স নাম */
  resource: string;
  /** পারমিশন গ্রুপ */
  group: PermissionGroup;
  /** পারমিশন লেভেল */
  level: PermissionLevel;
  /** ক্যাটাগরি */
  category: string;
  /** তৈরি করার সময় */
  createdAt: AdminTimestamp;
}
