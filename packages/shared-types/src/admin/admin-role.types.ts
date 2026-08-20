// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
import { admin } from '@vubon/shared-constants';

// 3. প্রকল্পের অন্য ফাইল
import type { AdminTimestamp } from './core-primitives.types';

/**
 * রোল আইডি টাইপ
 */
export type RoleId = string;

/**
 * রোল নাম টাইপ
 */
export type RoleName = string;

/**
 * রোল স্ট্যাটাস টাইপ
 * @description ROLE_STATUS থেকে মান নিবে
 */
export type RoleStatus = (typeof admin.ROLE_STATUS)[keyof typeof admin.ROLE_STATUS];

/**
 * রোল লেভেল টাইপ
 * @description ROLE_LEVEL থেকে মান নিবে
 */
export type RoleLevel = (typeof admin.ROLE_LEVEL)[keyof typeof admin.ROLE_LEVEL];

/**
 * অ্যাডমিন রোল ইন্টারফেস
 */
export interface AdminRole {
  /** অনন্য আইডি */
  id: RoleId;
  /** রোলের নাম */
  name: RoleName;
  /** রোলের বিবরণ (ঐচ্ছিক) */
  description?: string;
  /** রোলের লেভেল */
  level: RoleLevel;
  /** রোলের স্ট্যাটাস */
  status: RoleStatus;
  /** পারমিশন আইডির অ্যারে */
  permissions: string[];
  /** ডিফল্ট রোল কিনা */
  isDefault: boolean;
  /** তৈরি করার সময় */
  createdAt: AdminTimestamp;
  /** শেষ আপডেটের সময় */
  updatedAt: AdminTimestamp;
}

/**
 * রোল তৈরির জন্য DTO
 */
export interface CreateRoleDto {
  /** রোলের নাম */
  name: RoleName;
  /** রোলের বিবরণ (ঐচ্ছিক) */
  description?: string;
  /** রোলের লেভেল */
  level: RoleLevel;
  /** পারমিশন আইডির অ্যারে */
  permissions: string[];
  /** ডিফল্ট রোল কিনা */
  isDefault?: boolean;
}

/**
 * রোল আপডেটের জন্য DTO
 */
export interface UpdateRoleDto {
  /** রোলের নাম (ঐচ্ছিক) */
  name?: RoleName;
  /** রোলের বিবরণ (ঐচ্ছিক) */
  description?: string;
  /** রোলের লেভেল (ঐচ্ছিক) */
  level?: RoleLevel;
  /** রোলের স্ট্যাটাস (ঐচ্ছিক) */
  status?: RoleStatus;
  /** পারমিশন আইডির অ্যারে (ঐচ্ছিক) */
  permissions?: string[];
  /** ডিফল্ট রোল কিনা (ঐচ্ছিক) */
  isDefault?: boolean;
}
