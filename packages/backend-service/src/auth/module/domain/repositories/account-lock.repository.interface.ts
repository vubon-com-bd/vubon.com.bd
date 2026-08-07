// ✅ Shared packages
import type { LockLevel, LockReason, AccountLockStatus } from '@vubon/shared-types';
import type { PaginationParams, PaginatedResponse } from '@vubon/shared-types';

// ✅ Domain Entities and Value Objects
import { AccountLock } from '../entities/account-lock.entity';
import { UserId } from '../value-objects/user-id.vo';
import { IpAddress } from '../value-objects/ip-address.vo';

// ✅ Base repository interface
import { IBaseRepository } from './base.repository.interface';

/**
 * Account Lock Repository Interface
 *
 * অ্যাকাউন্ট লক এন্টিটির ডেটাবেস অপারেশন (সেভ, খোঁজা, ডিলিট) এর জন্য ইন্টারফেস।
 * IBaseRepository থেকে ইনহেরিট করে এবং অ্যাকাউন্ট লক-নির্দিষ্ট মেথড যোগ করে।
 */
export interface IAccountLockRepository extends IBaseRepository<AccountLock, string> {
  /**
   * ইউজার আইডি দিয়ে সব অ্যাকাউন্ট লক খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns অ্যাকাউন্ট লকগুলোর অ্যারে
   */
  findByUserId(userId: UserId): Promise<AccountLock[]>;

  /**
   * ইউজার আইডি দিয়ে সক্রিয় অ্যাকাউন্ট লক খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns পাওয়া গেলে AccountLock, না পেলে null
   */
  findActiveLock(userId: UserId): Promise<AccountLock | null>;

  /**
   * আইপি অ্যাড্রেস দিয়ে অ্যাকাউন্ট লক খুঁজে বের করে
   * @param ipAddress - আইপি অ্যাড্রেস (IpAddress Value Object)
   * @param userId - ইউজারের আইডি (UserId Value Object - optional)
   * @returns অ্যাকাউন্ট লকগুলোর অ্যারে
   */
  findByIpAddress(ipAddress: IpAddress, userId?: UserId): Promise<AccountLock[]>;

  /**
   * লক লেভেল অনুযায়ী অ্যাকাউন্ট লক খুঁজে বের করে
   * @param lockLevel - লক লেভেল (LockLevel)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড অ্যাকাউন্ট লক লিস্ট
   */
  findByLockLevel(
    lockLevel: LockLevel,
    params?: PaginationParams
  ): Promise<PaginatedResponse<AccountLock>>;

  /**
   * লক রিজন অনুযায়ী অ্যাকাউন্ট লক খুঁজে বের করে
   * @param reason - লক রিজন (LockReason)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড অ্যাকাউন্ট লক লিস্ট
   */
  findByReason(
    reason: LockReason,
    params?: PaginationParams
  ): Promise<PaginatedResponse<AccountLock>>;

  /**
   * স্ট্যাটাস অনুযায়ী অ্যাকাউন্ট লক খুঁজে বের করে
   * @param status - অ্যাকাউন্ট লক স্ট্যাটাস (AccountLockStatus)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড অ্যাকাউন্ট লক লিস্ট
   */
  findByStatus(
    status: AccountLockStatus,
    params?: PaginationParams
  ): Promise<PaginatedResponse<AccountLock>>;

  /**
   * মেয়াদ উত্তীর্ণ (expired) অ্যাকাউন্ট লক খুঁজে বের করে
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড মেয়াদ উত্তীর্ণ লক লিস্ট
   */
  findExpired(params?: PaginationParams): Promise<PaginatedResponse<AccountLock>>;

  /**
   * মেয়াদ উত্তীর্ণ অ্যাকাউন্ট লক ডিলিট করে
   * @param olderThan - এই তারিখের আগের লকগুলো (optional)
   * @returns ডিলিট করা লকের সংখ্যা
   */
  deleteExpired(olderThan?: Date): Promise<number>;

  /**
   * একটি ইউজারের অ্যাকাউন্ট লক আনলক করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param unlockedAt - আনলক করার সময় (optional, default: now)
   * @returns আপডেট করা AccountLock বা null
   */
  unlock(userId: UserId, unlockedAt?: Date): Promise<AccountLock | null>;

  /**
   * একটি ইউজারের অ্যাকাউন্ট লক এসকেলেট (বাড়ানো) করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param newLevel - নতুন লক লেভেল (LockLevel)
   * @param newExpiresAt - নতুন মেয়াদ শেষের সময় (optional)
   * @returns আপডেট করা AccountLock বা null
   */
  escalateLock(
    userId: UserId,
    newLevel: LockLevel,
    newExpiresAt?: Date
  ): Promise<AccountLock | null>;

  /**
   * একটি ইউজারের অ্যাকাউন্ট লক আছে কিনা চেক করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns true যদি লক থাকে, false যদি না থাকে
   */
  existsByUserId(userId: UserId): Promise<boolean>;

  /**
   * একটি ইউজারের সক্রিয় অ্যাকাউন্ট লক আছে কিনা চেক করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns true যদি সক্রিয় লক থাকে, false যদি না থাকে
   */
  existsActiveLock(userId: UserId): Promise<boolean>;

  /**
   * একটি ইউজারের অ্যাকাউন্ট লক কাউন্ট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns মোট লক সংখ্যা
   */
  countByUserId(userId: UserId): Promise<number>;

  /**
   * নির্দিষ্ট লক লেভেলের অ্যাকাউন্ট লক কাউন্ট করে
   * @param lockLevel - লক লেভেল (LockLevel)
   * @returns মোট লক সংখ্যা
   */
  countByLockLevel(lockLevel: LockLevel): Promise<number>;

  /**
   * নির্দিষ্ট লক রিজনের অ্যাকাউন্ট লক কাউন্ট করে
   * @param reason - লক রিজন (LockReason)
   * @returns মোট লক সংখ্যা
   */
  countByReason(reason: LockReason): Promise<number>;

  /**
   * নির্দিষ্ট সময়ের মধ্যে তৈরি অ্যাকাউন্ট লক কাউন্ট করে
   * @param fromDate - শুরু তারিখ
   * @param toDate - শেষ তারিখ
   * @returns মোট লক সংখ্যা
   */
  countCreatedBetween(fromDate: Date, toDate: Date): Promise<number>;

  /**
   * নির্দিষ্ট সময়ের মধ্যে আনলক করা অ্যাকাউন্ট লক কাউন্ট করে
   * @param fromDate - শুরু তারিখ
   * @param toDate - শেষ তারিখ
   * @returns মোট আনলক সংখ্যা
   */
  countUnlockedBetween(fromDate: Date, toDate: Date): Promise<number>;

  /**
   * একটি ইউজারের সর্বশেষ অ্যাকাউন্ট লক খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns পাওয়া গেলে AccountLock, না পেলে null
   */
  findLastLock(userId: UserId): Promise<AccountLock | null>;

  /**
   * একটি ইউজারের অ্যাকাউন্ট লক হিস্ট্রি খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড অ্যাকাউন্ট লক হিস্ট্রি
   */
  findLockHistory(
    userId: UserId,
    params?: PaginationParams
  ): Promise<PaginatedResponse<AccountLock>>;

  /**
   * একটি ইউজারের অ্যাকাউন্ট লক এসকেলেশন হিস্ট্রি খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns এসকেলেশন হিস্ট্রির অ্যারে
   */
  findEscalationHistory(userId: UserId): Promise<AccountLock[]>;
}
