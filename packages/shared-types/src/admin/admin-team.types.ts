// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
import { admin } from '@vubon/shared-constants';

// 3. প্রকল্পের অন্য ফাইল
import type { AdminTimestamp } from './core-primitives.types';

/**
 * টিম টাইপ
 * @description TEAM_TYPES থেকে মান নিবে
 */
export type TeamType = (typeof admin.TEAM_TYPES)[keyof typeof admin.TEAM_TYPES];

/**
 * টিম স্ট্যাটাস
 * @description TEAM_STATUS থেকে মান নিবে
 */
export type TeamStatus = (typeof admin.TEAM_STATUS)[keyof typeof admin.TEAM_STATUS];

/**
 * অ্যাডমিন টিম ইন্টারফেস
 */
export interface AdminTeam {
  /** অনন্য আইডি */
  id: string;
  /** টিমের নাম */
  name: string;
  /** টিম টাইপ */
  type: TeamType;
  /** টিম স্ট্যাটাস */
  status: TeamStatus;
  /** টিম লিডারের আইডি (অ্যাডমিন আইডি) */
  leaderId: string;
  /** টিমের সদস্যদের আইডি (অ্যাডমিন আইডির অ্যারে) */
  memberIds: string[];
  /** টিমের বিবরণ (ঐচ্ছিক) */
  description?: string;
  /** তৈরি করার সময় */
  createdAt: AdminTimestamp;
  /** শেষ আপডেটের সময় */
  updatedAt: AdminTimestamp;
}
