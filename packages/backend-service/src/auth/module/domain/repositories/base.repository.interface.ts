// ✅ Shared packages
import type { PaginationParams, PaginatedResponse } from '@vubon/shared-types';

/**
 * Base Repository Interface
 *
 * এই ইন্টারফেস সব রিপোজিটরির জন্য কমন মেথড ডিফাইন করে।
 * CRUD (Create, Read, Update, Delete) অপারেশনের বেস লেয়ার।
 *
 * @template T - Entity Type (যেমন User, Session)
 * @template ID - ID Type (যেমন UserId, string)
 */
export interface IBaseRepository<T, ID = string> {
  /**
   * একটি নতুন এন্টিটি সংরক্ষণ করে (কি-ওয়ার্ড: save)
   * @param entity - সংরক্ষণ করার জন্য এন্টিটি
   * @returns সংরক্ষিত এন্টিটি
   */
  save(entity: T): Promise<T>;

  /**
   * আইডি দিয়ে একটি এন্টিটি খুঁজে বের করে
   * @param id - এন্টিটির আইডি
   * @returns পাওয়া গেলে এন্টিটি, না পেলে null
   */
  findById(id: ID): Promise<T | null>;

  /**
   * সব এন্টিটি খুঁজে বের করে (পেজিনেশন সহ)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড রেসপন্স
   */
  findAll(params?: PaginationParams): Promise<PaginatedResponse<T>>;

  /**
   * একটি এন্টিটি আপডেট করে
   * @param id - এন্টিটির আইডি
   * @param entity - আপডেট করা ডেটা
   * @returns আপডেট করা এন্টিটি
   */
  update(id: ID, entity: Partial<T>): Promise<T | null>;

  /**
   * একটি এন্টিটি ডিলিট করে
   * @param id - এন্টিটির আইডি
   * @returns ডিলিট সফল হলে true, না হলে false
   */
  delete(id: ID): Promise<boolean>;

  /**
   * শর্ত অনুযায়ী এন্টিটি খুঁজে বের করে
   * @param criteria - সার্চ শর্ত
   * @returns পাওয়া এন্টিটিগুলোর অ্যারে
   */
  findByCriteria(criteria: Partial<T>): Promise<T[]>;

  /**
   * একটি নির্দিষ্ট শর্তে এন্টিটি আছে কিনা চেক করে
   * @param criteria - সার্চ শর্ত
   * @returns true যদি থাকে, false যদি না থাকে
   */
  exists(criteria: Partial<T>): Promise<boolean>;

  /**
   * মোট এন্টিটি কাউন্ট রিটার্ন করে
   * @returns মোট এন্টিটি সংখ্যা
   */
  count(): Promise<number>;
}
