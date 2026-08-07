// ✅ Shared packages
import type { PasswordResetStatus } from '@vubon/shared-types';
import type { PaginationParams, PaginatedResponse } from '@vubon/shared-types';

// ✅ Domain Entities and Value Objects
import { PasswordReset } from '../entities/password-reset.entity';
import { UserId } from '../value-objects/user-id.vo';
import { Email } from '../value-objects/email.vo';
import { Token } from '../value-objects/token.vo';

// ✅ Base repository interface
import { IBaseRepository } from './base.repository.interface';

/**
 * Password Reset Repository Interface
 *
 * পাসওয়ার্ড রিসেট এন্টিটির ডেটাবেস অপারেশন (সেভ, খোঁজা, ডিলিট) এর জন্য ইন্টারফেস।
 * IBaseRepository থেকে ইনহেরিট করে এবং পাসওয়ার্ড রিসেট-নির্দিষ্ট মেথড যোগ করে।
 */
export interface IPasswordResetRepository extends IBaseRepository<PasswordReset, string> {
  /**
   * টোকেন দিয়ে পাসওয়ার্ড রিসেট খুঁজে বের করে
   * @param token - রিসেট টোকেন (Token Value Object)
   * @returns পাওয়া গেলে PasswordReset, না পেলে null
   */
  findByToken(token: Token): Promise<PasswordReset | null>;

  /**
   * ইউজার আইডি দিয়ে পাসওয়ার্ড রিসেট খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns পাওয়া গেলে PasswordReset, না পেলে null
   */
  findByUserId(userId: UserId): Promise<PasswordReset | null>;

  /**
   * ইমেইল দিয়ে পাসওয়ার্ড রিসেট খুঁজে বের করে
   * @param email - ইমেইল (Email Value Object)
   * @returns পাওয়া গেলে PasswordReset, না পেলে null
   */
  findByEmail(email: Email): Promise<PasswordReset | null>;

  /**
   * ইউজার আইডি এবং ইমেইল দিয়ে পাসওয়ার্ড রিসেট খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param email - ইমেইল (Email Value Object)
   * @returns পাওয়া গেলে PasswordReset, না পেলে null
   */
  findByUserIdAndEmail(userId: UserId, email: Email): Promise<PasswordReset | null>;

  /**
   * স্ট্যাটাস অনুযায়ী পাসওয়ার্ড রিসেট খুঁজে বের করে
   * @param status - রিসেট স্ট্যাটাস (PasswordResetStatus)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড রিসেট লিস্ট
   */
  findByStatus(
    status: PasswordResetStatus,
    params?: PaginationParams
  ): Promise<PaginatedResponse<PasswordReset>>;

  /**
   * মেয়াদ উত্তীর্ণ (expired) পাসওয়ার্ড রিসেট খুঁজে বের করে
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড মেয়াদ উত্তীর্ণ রিসেট লিস্ট
   */
  findExpired(params?: PaginationParams): Promise<PaginatedResponse<PasswordReset>>;

  /**
   * মেয়াদ উত্তীর্ণ পাসওয়ার্ড রিসেট ডিলিট করে
   * @param olderThan - এই তারিখের আগের রিসেটগুলো (optional)
   * @returns ডিলিট করা রিসেটের সংখ্যা
   */
  deleteExpired(olderThan?: Date): Promise<number>;

  /**
   * একটি ইউজারের পাসওয়ার্ড রিসেট স্ট্যাটাস আপডেট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param status - নতুন রিসেট স্ট্যাটাস (PasswordResetStatus)
   * @returns আপডেট করা PasswordReset বা null
   */
  updateStatus(userId: UserId, status: PasswordResetStatus): Promise<PasswordReset | null>;

  /**
   * একটি পাসওয়ার্ড রিসেট কমপ্লিট (সম্পন্ন) হিসেবে চিহ্নিত করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param resetIpAddress - রিসেট করা আইপি অ্যাড্রেস
   * @param resetUserAgent - রিসেট করা ইউজার এজেন্ট
   * @param resetAt - রিসেট সময় (optional, default: now)
   * @returns আপডেট করা PasswordReset বা null
   */
  markAsCompleted(
    userId: UserId,
    resetIpAddress: string,
    resetUserAgent: string,
    resetAt?: Date
  ): Promise<PasswordReset | null>;

  /**
   * একটি পাসওয়ার্ড রিসেট ব্যর্থ হিসেবে চিহ্নিত করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns আপডেট করা PasswordReset বা null
   */
  markAsFailed(userId: UserId): Promise<PasswordReset | null>;

  /**
   * একটি পাসওয়ার্ড রিসেট প্রচেষ্টার সংখ্যা ইনক্রিমেন্ট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns আপডেট করা PasswordReset বা null
   */
  incrementAttempts(userId: UserId): Promise<PasswordReset | null>;

  /**
   * একটি পাসওয়ার্ড রিসেট রিসেট করে (নতুন টোকেন দিয়ে)
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param newToken - নতুন টোকেন (Token Value Object)
   * @param newExpiresAt - নতুন মেয়াদ শেষের সময়
   * @returns আপডেট করা PasswordReset বা null
   */
  resetWithNewToken(
    userId: UserId,
    newToken: Token,
    newExpiresAt: Date
  ): Promise<PasswordReset | null>;

  /**
   * একটি ইউজারের পাসওয়ার্ড রিসেট আছে কিনা চেক করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns true যদি থাকে, false যদি না থাকে
   */
  existsByUserId(userId: UserId): Promise<boolean>;

  /**
   * একটি ইমেইলের পাসওয়ার্ড রিসেট আছে কিনা চেক করে
   * @param email - ইমেইল (Email Value Object)
   * @returns true যদি থাকে, false যদি না থাকে
   */
  existsByEmail(email: Email): Promise<boolean>;

  /**
   * একটি ইউজারের পাসওয়ার্ড রিসেট পেন্ডিং কিনা চেক করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns true যদি পেন্ডিং হয়, false যদি না হয়
   */
  isPending(userId: UserId): Promise<boolean>;

  /**
   * একটি ইউজারের পাসওয়ার্ড রিসেট কমপ্লিট কিনা চেক করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns true যদি কমপ্লিট হয়, false যদি না হয়
   */
  isCompleted(userId: UserId): Promise<boolean>;

  /**
   * একটি ইউজারের পাসওয়ার্ড রিসেট ব্যর্থ কিনা চেক করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns true যদি ব্যর্থ হয়, false যদি না হয়
   */
  isFailed(userId: UserId): Promise<boolean>;

  /**
   * একটি ইউজারের পাসওয়ার্ড রিসেট রিসেন্ড (পুনরায় পাঠানো) করা যায় কিনা চেক করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns true যদি রিসেন্ড করা যায়, false যদি না যায়
   */
  canResend(userId: UserId): Promise<boolean>;

  /**
   * নির্দিষ্ট স্ট্যাটাসের পাসওয়ার্ড রিসেট কাউন্ট করে
   * @param status - রিসেট স্ট্যাটাস (PasswordResetStatus)
   * @returns মোট রিসেট সংখ্যা
   */
  countByStatus(status: PasswordResetStatus): Promise<number>;

  /**
   * মোট কমপ্লিট পাসওয়ার্ড রিসেট কাউন্ট করে
   * @returns মোট কমপ্লিট রিসেট সংখ্যা
   */
  countCompleted(): Promise<number>;

  /**
   * মোট পেন্ডিং পাসওয়ার্ড রিসেট কাউন্ট করে
   * @returns মোট পেন্ডিং রিসেট সংখ্যা
   */
  countPending(): Promise<number>;

  /**
   * মোট ব্যর্থ পাসওয়ার্ড রিসেট কাউন্ট করে
   * @returns মোট ব্যর্থ রিসেট সংখ্যা
   */
  countFailed(): Promise<number>;

  /**
   * নির্দিষ্ট সময়ের মধ্যে তৈরি পাসওয়ার্ড রিসেট কাউন্ট করে
   * @param fromDate - শুরু তারিখ
   * @param toDate - শেষ তারিখ
   * @returns মোট রিসেট সংখ্যা
   */
  countCreatedBetween(fromDate: Date, toDate: Date): Promise<number>;

  /**
   * নির্দিষ্ট সময়ের মধ্যে কমপ্লিট পাসওয়ার্ড রিসেট কাউন্ট করে
   * @param fromDate - শুরু তারিখ
   * @param toDate - শেষ তারিখ
   * @returns মোট কমপ্লিট রিসেট সংখ্যা
   */
  countCompletedBetween(fromDate: Date, toDate: Date): Promise<number>;
}
