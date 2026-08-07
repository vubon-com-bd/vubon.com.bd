// ✅ Shared packages
import type { MFAType, MFAStatus } from '@vubon/shared-types';
import type { PaginationParams, PaginatedResponse } from '@vubon/shared-types';

// ✅ Domain Entities and Value Objects
import { Mfa } from '../entities/mfa.entity';
import { UserId } from '../value-objects/user-id.vo';

// ✅ Base repository interface
import { IBaseRepository } from './base.repository.interface';

/**
 * MFA Repository Interface
 *
 * MFA এন্টিটির ডেটাবেস অপারেশন (সেভ, খোঁজা, ডিলিট) এর জন্য ইন্টারফেস।
 * IBaseRepository থেকে ইনহেরিট করে এবং MFA-নির্দিষ্ট মেথড যোগ করে।
 */
export interface IMfaRepository extends IBaseRepository<Mfa, string> {
  /**
   * ইউজার আইডি দিয়ে MFA কনফিগারেশন খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns পাওয়া গেলে Mfa, না পেলে null
   */
  findByUserId(userId: UserId): Promise<Mfa | null>;

  /**
   * ইউজার আইডি এবং টাইপ দিয়ে MFA কনফিগারেশন খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param type - MFA টাইপ (MFAType)
   * @returns পাওয়া গেলে Mfa, না পেলে null
   */
  findByUserIdAndType(userId: UserId, type: MFAType): Promise<Mfa | null>;

  /**
   * স্ট্যাটাস অনুযায়ী MFA কনফিগারেশন খুঁজে বের করে
   * @param status - MFA স্ট্যাটাস (MFAStatus)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড MFA লিস্ট
   */
  findByStatus(status: MFAStatus, params?: PaginationParams): Promise<PaginatedResponse<Mfa>>;

  /**
   * টাইপ অনুযায়ী MFA কনফিগারেশন খুঁজে বের করে
   * @param type - MFA টাইপ (MFAType)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড MFA লিস্ট
   */
  findByType(type: MFAType, params?: PaginationParams): Promise<PaginatedResponse<Mfa>>;

  /**
   * একটি ইউজারের সব MFA কনফিগারেশন খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns MFA কনফিগারেশনগুলোর অ্যারে
   */
  findAllByUserId(userId: UserId): Promise<Mfa[]>;

  /**
   * একটি ইউজারের সক্রিয় MFA কনফিগারেশন খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns সক্রিয় MFA কনফিগারেশন বা null
   */
  findActiveByUserId(userId: UserId): Promise<Mfa | null>;

  /**
   * একটি ইউজারের ব্যাকআপ কোড আপডেট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param backupCodes - নতুন ব্যাকআপ কোডগুলোর অ্যারে
   * @returns আপডেট করা Mfa বা null
   */
  updateBackupCodes(userId: UserId, backupCodes: string[]): Promise<Mfa | null>;

  /**
   * একটি ইউজারের ব্যাকআপ কোড রিমুভ করে (কোনো কোড ব্যবহার করা হলে)
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param usedCode - ব্যবহার করা ব্যাকআপ কোড
   * @returns আপডেট করা Mfa বা null
   */
  removeUsedBackupCode(userId: UserId, usedCode: string): Promise<Mfa | null>;

  /**
   * একটি ইউজারের MFA স্ট্যাটাস আপডেট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param status - নতুন MFA স্ট্যাটাস (MFAStatus)
   * @returns আপডেট করা Mfa বা null
   */
  updateStatus(userId: UserId, status: MFAStatus): Promise<Mfa | null>;

  /**
   * একটি ইউজারের MFA ব্যর্থ প্রচেষ্টার সংখ্যা ইনক্রিমেন্ট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns আপডেট করা Mfa বা null
   */
  incrementFailedAttempts(userId: UserId): Promise<Mfa | null>;

  /**
   * একটি ইউজারের MFA ব্যর্থ প্রচেষ্টার সংখ্যা রিসেট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns আপডেট করা Mfa বা null
   */
  resetFailedAttempts(userId: UserId): Promise<Mfa | null>;

  /**
   * একটি ইউজারের MFA লক স্ট্যাটাস আপডেট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param isLocked - লক কিনা (true/false)
   * @param lockExpiresAt - লক মেয়াদ শেষের সময় (optional)
   * @returns আপডেট করা Mfa বা null
   */
  updateLockStatus(userId: UserId, isLocked: boolean, lockExpiresAt?: Date): Promise<Mfa | null>;

  /**
   * একটি নির্দিষ্ট টাইপের MFA কনফিগারেশন আছে কিনা চেক করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param type - MFA টাইপ (MFAType)
   * @returns true যদি থাকে, false যদি না থাকে
   */
  existsByUserIdAndType(userId: UserId, type: MFAType): Promise<boolean>;

  /**
   * একটি ইউজারের সক্রিয় MFA কনফিগারেশন আছে কিনা চেক করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns true যদি থাকে, false যদি না থাকে
   */
  existsActiveByUserId(userId: UserId): Promise<boolean>;

  /**
   * একটি ইউজারের MFA কনফিগারেশন ডিলিট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param type - MFA টাইপ (MFAType - optional)
   * @returns ডিলিট সফল হলে true, না হলে false
   */
  deleteByUserId(userId: UserId, type?: MFAType): Promise<boolean>;

  /**
   * নির্দিষ্ট টাইপের MFA কনফিগারেশন কাউন্ট করে
   * @param type - MFA টাইপ (MFAType)
   * @returns মোট কনফিগারেশন সংখ্যা
   */
  countByType(type: MFAType): Promise<number>;

  /**
   * নির্দিষ্ট স্ট্যাটাসের MFA কনফিগারেশন কাউন্ট করে
   * @param status - MFA স্ট্যাটাস (MFAStatus)
   * @returns মোট কনফিগারেশন সংখ্যা
   */
  countByStatus(status: MFAStatus): Promise<number>;
}
