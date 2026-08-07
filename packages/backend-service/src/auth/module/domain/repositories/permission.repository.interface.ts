// ✅ Shared packages
import type { PermissionResource, PermissionAction } from '@vubon/shared-types';
import type { PaginationParams, PaginatedResponse } from '@vubon/shared-types';

// ✅ Domain Entities and Value Objects
import { Permission } from '../entities/permission.entity';

// ✅ Base repository interface
import { IBaseRepository } from './base.repository.interface';

/**
 * Permission Repository Interface
 *
 * পারমিশন এন্টিটির ডেটাবেস অপারেশন (সেভ, খোঁজা, ডিলিট) এর জন্য ইন্টারফেস।
 * IBaseRepository থেকে ইনহেরিট করে এবং পারমিশন-নির্দিষ্ট মেথড যোগ করে।
 */
export interface IPermissionRepository extends IBaseRepository<Permission, string> {
  /**
   * পারমিশন কী দিয়ে পারমিশন খুঁজে বের করে
   * @param key - পারমিশন কী (যেমন: 'user:create')
   * @returns পাওয়া গেলে Permission, না পেলে null
   */
  findByKey(key: string): Promise<Permission | null>;

  /**
   * রিসোর্স অনুযায়ী পারমিশন খুঁজে বের করে
   * @param resource - রিসোর্স (PermissionResource)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড পারমিশন লিস্ট
   */
  findByResource(
    resource: PermissionResource,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Permission>>;

  /**
   * অ্যাকশন অনুযায়ী পারমিশন খুঁজে বের করে
   * @param action - অ্যাকশন (PermissionAction)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড পারমিশন লিস্ট
   */
  findByAction(
    action: PermissionAction,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Permission>>;

  /**
   * ক্যাটাগরি অনুযায়ী পারমিশন খুঁজে বের করে
   * @param category - ক্যাটাগরি
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড পারমিশন লিস্ট
   */
  findByCategory(
    category: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Permission>>;

  /**
   * সিস্টেম পারমিশন খুঁজে বের করে
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড সিস্টেম পারমিশন লিস্ট
   */
  findSystemPermissions(params?: PaginationParams): Promise<PaginatedResponse<Permission>>;

  /**
   * নন-সিস্টেম পারমিশন খুঁজে বের করে
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড নন-সিস্টেম পারমিশন লিস্ট
   */
  findNonSystemPermissions(params?: PaginationParams): Promise<PaginatedResponse<Permission>>;

  /**
   * সক্রিয় (নন-ডিপ্রিকেটেড) পারমিশন খুঁজে বের করে
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড সক্রিয় পারমিশন লিস্ট
   */
  findActive(params?: PaginationParams): Promise<PaginatedResponse<Permission>>;

  /**
   * ডিপ্রিকেটেড পারমিশন খুঁজে বের করে
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড ডিপ্রিকেটেড পারমিশন লিস্ট
   */
  findDeprecated(params?: PaginationParams): Promise<PaginatedResponse<Permission>>;

  /**
   * একটি পারমিশন ডিপ্রিকেটেড হিসেবে চিহ্নিত করে
   * @param permissionId - পারমিশন আইডি (string)
   * @param reason - ডিপ্রিকেট করার কারণ
   * @returns আপডেট করা Permission বা null
   */
  deprecate(permissionId: string, reason: string): Promise<Permission | null>;

  /**
   * একটি পারমিশনের ডিপ্রিকেটেড স্ট্যাটাস সরিয়ে ফেলে
   * @param permissionId - পারমিশন আইডি (string)
   * @returns আপডেট করা Permission বা null
   */
  undeprecate(permissionId: string): Promise<Permission | null>;

  /**
   * একটি পারমিশনের বিবরণ আপডেট করে
   * @param permissionId - পারমিশন আইডি (string)
   * @param description - নতুন বিবরণ
   * @returns আপডেট করা Permission বা null
   */
  updateDescription(permissionId: string, description: string): Promise<Permission | null>;

  /**
   * একটি পারমিশনের নাম আপডেট করে
   * @param permissionId - পারমিশন আইডি (string)
   * @param name - নতুন নাম
   * @returns আপডেট করা Permission বা null
   */
  updateName(permissionId: string, name: string): Promise<Permission | null>;

  /**
   * একটি পারমিশনের ডিপেন্ডেন্সি আপডেট করে
   * @param permissionId - পারমিশন আইডি (string)
   * @param dependsOn - ডিপেন্ডেন্সি পারমিশন কীগুলোর অ্যারে
   * @returns আপডেট করা Permission বা null
   */
  updateDependencies(permissionId: string, dependsOn: string[]): Promise<Permission | null>;

  /**
   * একটি পারমিশনের কী আছে কিনা চেক করে
   * @param key - পারমিশন কী
   * @returns true যদি থাকে, false যদি না থাকে
   */
  existsByKey(key: string): Promise<boolean>;

  /**
   * একটি পারমিশনের নাম আছে কিনা চেক করে
   * @param name - পারমিশনের নাম
   * @param excludeId - বাদ দেওয়ার জন্য আইডি (optional)
   * @returns true যদি থাকে, false যদি না থাকে
   */
  existsByName(name: string, excludeId?: string): Promise<boolean>;

  /**
   * নির্দিষ্ট রিসোর্সে পারমিশন আছে কিনা চেক করে
   * @param resource - রিসোর্স (PermissionResource)
   * @returns true যদি থাকে, false যদি না থাকে
   */
  existsByResource(resource: PermissionResource): Promise<boolean>;

  /**
   * মোট সিস্টেম পারমিশন কাউন্ট করে
   * @returns মোট সিস্টেম পারমিশন সংখ্যা
   */
  countSystem(): Promise<number>;

  /**
   * মোট সক্রিয় পারমিশন কাউন্ট করে
   * @returns মোট সক্রিয় পারমিশন সংখ্যা
   */
  countActive(): Promise<number>;

  /**
   * মোট ডিপ্রিকেটেড পারমিশন কাউন্ট করে
   * @returns মোট ডিপ্রিকেটেড পারমিশন সংখ্যা
   */
  countDeprecated(): Promise<number>;

  /**
   * নির্দিষ্ট ক্যাটাগরির পারমিশন কাউন্ট করে
   * @param category - ক্যাটাগরি
   * @returns মোট পারমিশন সংখ্যা
   */
  countByCategory(category: string): Promise<number>;

  /**
   * নির্দিষ্ট রিসোর্সের পারমিশন কাউন্ট করে
   * @param resource - রিসোর্স (PermissionResource)
   * @returns মোট পারমিশন সংখ্যা
   */
  countByResource(resource: PermissionResource): Promise<number>;

  /**
   * একাধিক কী দিয়ে পারমিশন খুঁজে বের করে
   * @param keys - পারমিশন কীগুলোর অ্যারে
   * @returns পারমিশনগুলোর অ্যারে
   */
  findByKeys(keys: string[]): Promise<Permission[]>;

  /**
   * একটি পারমিশন ডিলিট করে (শুধু নন-সিস্টেম পারমিশন)
   * @param permissionId - পারমিশন আইডি (string)
   * @returns ডিলিট সফল হলে true, না হলে false
   */
  delete(permissionId: string): Promise<boolean>;

  /**
   * একাধিক পারমিশন ডিলিট করে (শুধু নন-সিস্টেম পারমিশন)
   * @param permissionIds - পারমিশন আইডিগুলোর অ্যারে
   * @returns ডিলিট করা পারমিশনের সংখ্যা
   */
  deleteMany(permissionIds: string[]): Promise<number>;
}
