// ✅ Shared packages
import type { PaginationParams, PaginatedResponse } from '@vubon/shared-types';

// ✅ Domain Entities and Value Objects
import { Role } from '../entities/role.entity';

// ✅ Base repository interface
import { IBaseRepository } from './base.repository.interface';

/**
 * Role Status Type (Local definition)
 * Since RoleStatus is not exported from shared-types, we define it locally
 * This matches the status values used in the Role entity
 */
export type RoleStatus = 'active' | 'inactive';

/**
 * Role Repository Interface
 *
 * রোল এন্টিটির ডেটাবেস অপারেশন (সেভ, খোঁজা, ডিলিট) এর জন্য ইন্টারফেস।
 * IBaseRepository থেকে ইনহেরিট করে এবং রোল-নির্দিষ্ট মেথড যোগ করে।
 */
export interface IRoleRepository extends IBaseRepository<Role, string> {
  /**
   * রোল নাম দিয়ে রোল খুঁজে বের করে
   * @param name - রোল নাম (যেমন: 'admin', 'user')
   * @returns পাওয়া গেলে Role, না পেলে null
   */
  findByName(name: string): Promise<Role | null>;

  /**
   * স্ট্যাটাস অনুযায়ী রোল খুঁজে বের করে
   * @param status - রোল স্ট্যাটাস (RoleStatus)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড রোল লিস্ট
   */
  findByStatus(status: RoleStatus, params?: PaginationParams): Promise<PaginatedResponse<Role>>;

  /**
   * সিস্টেম রোল খুঁজে বের করে
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড সিস্টেম রোল লিস্ট
   */
  findSystemRoles(params?: PaginationParams): Promise<PaginatedResponse<Role>>;

  /**
   * নন-সিস্টেম রোল খুঁজে বের করে
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড নন-সিস্টেম রোল লিস্ট
   */
  findNonSystemRoles(params?: PaginationParams): Promise<PaginatedResponse<Role>>;

  /**
   * সক্রিয় রোল খুঁজে বের করে
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড সক্রিয় রোল লিস্ট
   */
  findActiveRoles(params?: PaginationParams): Promise<PaginatedResponse<Role>>;

  /**
   * প্রায়োরিটি অনুযায়ী রোল খুঁজে বের করে (উচ্চ থেকে নিম্ন)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড রোল লিস্ট
   */
  findByPriority(params?: PaginationParams): Promise<PaginatedResponse<Role>>;

  /**
   * একটি রোল সক্রিয় করে
   * @param roleId - রোল আইডি (string)
   * @returns আপডেট করা Role বা null
   */
  activate(roleId: string): Promise<Role | null>;

  /**
   * একটি রোল নিষ্ক্রিয় করে
   * @param roleId - রোল আইডি (string)
   * @returns আপডেট করা Role বা null
   */
  deactivate(roleId: string): Promise<Role | null>;

  /**
   * একটি রোলে পারমিশন যোগ করে
   * @param roleId - রোল আইডি (string)
   * @param permission - পারমিশন কী
   * @returns আপডেট করা Role বা null
   */
  addPermission(roleId: string, permission: string): Promise<Role | null>;

  /**
   * একটি রোল থেকে পারমিশন সরিয়ে ফেলে
   * @param roleId - রোল আইডি (string)
   * @param permission - পারমিশন কী
   * @returns আপডেট করা Role বা null
   */
  removePermission(roleId: string, permission: string): Promise<Role | null>;

  /**
   * একটি রোলের সব পারমিশন সেট করে (প্রতিস্থাপন)
   * @param roleId - রোল আইডি (string)
   * @param permissions - পারমিশন কীগুলোর অ্যারে
   * @returns আপডেট করা Role বা null
   */
  setPermissions(roleId: string, permissions: string[]): Promise<Role | null>;

  /**
   * একটি রোলের ডিটেইলস আপডেট করে
   * @param roleId - রোল আইডি (string)
   * @param data - আপডেট করার ডেটা
   * @returns আপডেট করা Role বা null
   */
  updateDetails(
    roleId: string,
    data: {
      displayName?: string;
      description?: string;
      priority?: number;
      color?: string;
      icon?: string | null;
    }
  ): Promise<Role | null>;

  /**
   * একটি রোলের ইনহেরিটেন্স সেট করে (প্রতিস্থাপন)
   * @param roleId - রোল আইডি (string)
   * @param inheritsFrom - ইনহেরিট করা রোল নামগুলোর অ্যারে
   * @returns আপডেট করা Role বা null
   */
  setInheritance(roleId: string, inheritsFrom: string[]): Promise<Role | null>;

  /**
   * একটি রোলে ইনহেরিটেন্স যোগ করে
   * @param roleId - রোল আইডি (string)
   * @param parentRole - প্যারেন্ট রোল নাম
   * @returns আপডেট করা Role বা null
   */
  addInheritance(roleId: string, parentRole: string): Promise<Role | null>;

  /**
   * একটি রোল থেকে ইনহেরিটেন্স সরিয়ে ফেলে
   * @param roleId - রোল আইডি (string)
   * @param parentRole - প্যারেন্ট রোল নাম
   * @returns আপডেট করা Role বা null
   */
  removeInheritance(roleId: string, parentRole: string): Promise<Role | null>;

  /**
   * একটি রোলের নাম আছে কিনা চেক করে
   * @param name - রোল নাম
   * @param excludeId - বাদ দেওয়ার জন্য আইডি (optional)
   * @returns true যদি থাকে, false যদি না থাকে
   */
  existsByName(name: string, excludeId?: string): Promise<boolean>;

  /**
   * একটি রোলের ডিসপ্লে নাম আছে কিনা চেক করে
   * @param displayName - ডিসপ্লে নাম
   * @param excludeId - বাদ দেওয়ার জন্য আইডি (optional)
   * @returns true যদি থাকে, false যদি না থাকে
   */
  existsByDisplayName(displayName: string, excludeId?: string): Promise<boolean>;

  /**
   * একটি পারমিশন যুক্ত রোল আছে কিনা চেক করে
   * @param permission - পারমিশন কী
   * @returns true যদি থাকে, false যদি না থাকে
   */
  existsByPermission(permission: string): Promise<boolean>;

  /**
   * মোট সিস্টেম রোল কাউন্ট করে
   * @returns মোট সিস্টেম রোল সংখ্যা
   */
  countSystem(): Promise<number>;

  /**
   * মোট সক্রিয় রোল কাউন্ট করে
   * @returns মোট সক্রিয় রোল সংখ্যা
   */
  countActive(): Promise<number>;

  /**
   * মোট নিষ্ক্রিয় রোল কাউন্ট করে
   * @returns মোট নিষ্ক্রিয় রোল সংখ্যা
   */
  countInactive(): Promise<number>;

  /**
   * নির্দিষ্ট স্ট্যাটাসের রোল কাউন্ট করে
   * @param status - রোল স্ট্যাটাস (RoleStatus)
   * @returns মোট রোল সংখ্যা
   */
  countByStatus(status: RoleStatus): Promise<number>;

  /**
   * একটি রোলের সব পারমিশন খুঁজে বের করে (ইনহেরিটেড সহ)
   * @param roleId - রোল আইডি (string)
   * @returns পারমিশন কীগুলোর অ্যারে
   */
  findAllPermissions(roleId: string): Promise<string[]>;

  /**
   * একটি রোলের ইনহেরিটেন্স চেইন খুঁজে বের করে
   * @param roleId - রোল আইডি (string)
   * @returns রোল নামগুলোর অ্যারে (শ্রেণিবদ্ধ ক্রমে)
   */
  findInheritanceChain(roleId: string): Promise<string[]>;

  /**
   * একটি রোল ডিলিট করে (শুধু নন-সিস্টেম রোল)
   * @param roleId - রোল আইডি (string)
   * @returns ডিলিট সফল হলে true, না হলে false
   */
  delete(roleId: string): Promise<boolean>;

  /**
   * একাধিক রোল ডিলিট করে (শুধু নন-সিস্টেম রোল)
   * @param roleIds - রোল আইডিগুলোর অ্যারে
   * @returns ডিলিট করা রোলের সংখ্যা
   */
  deleteMany(roleIds: string[]): Promise<number>;
}
