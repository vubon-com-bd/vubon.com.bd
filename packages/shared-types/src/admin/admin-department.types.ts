// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
import { admin } from '@vubon/shared-constants';

// 3. প্রকল্পের অন্য ফাইল
import type { AdminTimestamp } from './core-primitives.types';

/**
 * ডিপার্টমেন্ট আইডি টাইপ
 */
export type DepartmentId = string;

/**
 * ডিপার্টমেন্ট স্ট্যাটাস টাইপ
 * @description DEPARTMENT_STATUS থেকে মান নিবে
 */
export type DepartmentStatus =
  (typeof admin.DEPARTMENT_STATUS)[keyof typeof admin.DEPARTMENT_STATUS];

/**
 * অ্যাডমিন ডিপার্টমেন্ট ইন্টারফেস
 */
export interface AdminDepartment {
  /** অনন্য আইডি */
  id: DepartmentId;
  /** ডিপার্টমেন্টের নাম */
  name: string;
  /** ডিপার্টমেন্টের বিবরণ (ঐচ্ছিক) */
  description?: string;
  /** ডিপার্টমেন্ট স্ট্যাটাস */
  status: DepartmentStatus;
  /** ডিপার্টমেন্ট হেডের আইডি (ঐচ্ছিক) */
  headId?: string;
  /** ডিপার্টমেন্টের সদস্যদের আইডি (অ্যাডমিন আইডির অ্যারে) */
  memberIds: string[];
  /** ডিপার্টমেন্টের রঙ (ঐচ্ছিক) */
  color?: string;
  /** ডিপার্টমেন্টের আইকন (ঐচ্ছিক) */
  icon?: string;
  /** তৈরি করার সময় */
  createdAt: AdminTimestamp;
  /** শেষ আপডেটের সময় */
  updatedAt: AdminTimestamp;
}
