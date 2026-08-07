// ✅ Shared packages
import type { EmailVerificationStatus } from '@vubon/shared-types';
import type { PaginationParams, PaginatedResponse } from '@vubon/shared-types';

// ✅ Domain Entities and Value Objects
import { EmailVerification } from '../entities/email-verification.entity';
import { UserId } from '../value-objects/user-id.vo';
import { Email } from '../value-objects/email.vo';
import { Token } from '../value-objects/token.vo';

// ✅ Base repository interface
import { IBaseRepository } from './base.repository.interface';

/**
 * Email Verification Repository Interface
 *
 * ইমেইল ভেরিফিকেশন এন্টিটির ডেটাবেস অপারেশন (সেভ, খোঁজা, ডিলিট) এর জন্য ইন্টারফেস।
 * IBaseRepository থেকে ইনহেরিট করে এবং ইমেইল ভেরিফিকেশন-নির্দিষ্ট মেথড যোগ করে।
 */
export interface IEmailVerificationRepository extends IBaseRepository<EmailVerification, string> {
  /**
   * টোকেন দিয়ে ইমেইল ভেরিফিকেশন খুঁজে বের করে
   * @param token - ভেরিফিকেশন টোকেন (Token Value Object)
   * @returns পাওয়া গেলে EmailVerification, না পেলে null
   */
  findByToken(token: Token): Promise<EmailVerification | null>;

  /**
   * ইউজার আইডি দিয়ে ইমেইল ভেরিফিকেশন খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns পাওয়া গেলে EmailVerification, না পেলে null
   */
  findByUserId(userId: UserId): Promise<EmailVerification | null>;

  /**
   * ইমেইল দিয়ে ইমেইল ভেরিফিকেশন খুঁজে বের করে
   * @param email - ইমেইল (Email Value Object)
   * @returns পাওয়া গেলে EmailVerification, না পেলে null
   */
  findByEmail(email: Email): Promise<EmailVerification | null>;

  /**
   * ইউজার আইডি এবং ইমেইল দিয়ে ইমেইল ভেরিফিকেশন খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param email - ইমেইল (Email Value Object)
   * @returns পাওয়া গেলে EmailVerification, না পেলে null
   */
  findByUserIdAndEmail(userId: UserId, email: Email): Promise<EmailVerification | null>;

  /**
   * স্ট্যাটাস অনুযায়ী ইমেইল ভেরিফিকেশন খুঁজে বের করে
   * @param status - ভেরিফিকেশন স্ট্যাটাস (EmailVerificationStatus)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড ভেরিফিকেশন লিস্ট
   */
  findByStatus(
    status: EmailVerificationStatus,
    params?: PaginationParams
  ): Promise<PaginatedResponse<EmailVerification>>;

  /**
   * মেয়াদ উত্তীর্ণ (expired) ইমেইল ভেরিফিকেশন খুঁজে বের করে
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড মেয়াদ উত্তীর্ণ ভেরিফিকেশন লিস্ট
   */
  findExpired(params?: PaginationParams): Promise<PaginatedResponse<EmailVerification>>;

  /**
   * মেয়াদ উত্তীর্ণ ইমেইল ভেরিফিকেশন ডিলিট করে
   * @param olderThan - এই তারিখের আগের ভেরিফিকেশনগুলো (optional)
   * @returns ডিলিট করা ভেরিফিকেশনের সংখ্যা
   */
  deleteExpired(olderThan?: Date): Promise<number>;

  /**
   * একটি ইউজারের ইমেইল ভেরিফিকেশন স্ট্যাটাস আপডেট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param status - নতুন ভেরিফিকেশন স্ট্যাটাস (EmailVerificationStatus)
   * @returns আপডেট করা EmailVerification বা null
   */
  updateStatus(userId: UserId, status: EmailVerificationStatus): Promise<EmailVerification | null>;

  /**
   * একটি ইউজারের ইমেইল ভেরিফিকেশন ভেরিফাইড হিসেবে চিহ্নিত করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param verifiedAt - ভেরিফিকেশন সময় (optional, default: now)
   * @returns আপডেট করা EmailVerification বা null
   */
  markAsVerified(userId: UserId, verifiedAt?: Date): Promise<EmailVerification | null>;

  /**
   * একটি ইউজারের ইমেইল ভেরিফিকেশন ব্যর্থ হিসেবে চিহ্নিত করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns আপডেট করা EmailVerification বা null
   */
  markAsFailed(userId: UserId): Promise<EmailVerification | null>;

  /**
   * একটি ইউজারের ইমেইল ভেরিফিকেশন প্রচেষ্টার সংখ্যা ইনক্রিমেন্ট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns আপডেট করা EmailVerification বা null
   */
  incrementAttempts(userId: UserId): Promise<EmailVerification | null>;

  /**
   * একটি ইউজারের ইমেইল ভেরিফিকেশন রিসেট করে (নতুন টোকেন দিয়ে)
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param newToken - নতুন টোকেন (Token Value Object)
   * @param newExpiresAt - নতুন মেয়াদ শেষের সময়
   * @returns আপডেট করা EmailVerification বা null
   */
  resetVerification(
    userId: UserId,
    newToken: Token,
    newExpiresAt: Date
  ): Promise<EmailVerification | null>;

  /**
   * একটি ইউজারের ইমেইল ভেরিফিকেশন আছে কিনা চেক করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns true যদি থাকে, false যদি না থাকে
   */
  existsByUserId(userId: UserId): Promise<boolean>;

  /**
   * একটি ইমেইলের ভেরিফিকেশন আছে কিনা চেক করে
   * @param email - ইমেইল (Email Value Object)
   * @returns true যদি থাকে, false যদি না থাকে
   */
  existsByEmail(email: Email): Promise<boolean>;

  /**
   * একটি ইউজারের ইমেইল ভেরিফাইড কিনা চেক করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns true যদি ভেরিফাইড হয়, false যদি না হয়
   */
  isVerified(userId: UserId): Promise<boolean>;

  /**
   * একটি ইউজারের ইমেইল ভেরিফিকেশন পেন্ডিং কিনা চেক করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns true যদি পেন্ডিং হয়, false যদি না হয়
   */
  isPending(userId: UserId): Promise<boolean>;

  /**
   * নির্দিষ্ট স্ট্যাটাসের ইমেইল ভেরিফিকেশন কাউন্ট করে
   * @param status - ভেরিফিকেশন স্ট্যাটাস (EmailVerificationStatus)
   * @returns মোট ভেরিফিকেশন সংখ্যা
   */
  countByStatus(status: EmailVerificationStatus): Promise<number>;

  /**
   * মোট ভেরিফাইড ইমেইল কাউন্ট করে
   * @returns মোট ভেরিফাইড ইমেইল সংখ্যা
   */
  countVerified(): Promise<number>;

  /**
   * মোট পেন্ডিং ইমেইল কাউন্ট করে
   * @returns মোট পেন্ডিং ইমেইল সংখ্যা
   */
  countPending(): Promise<number>;

  /**
   * মোট ব্যর্থ ইমেইল কাউন্ট করে
   * @returns মোট ব্যর্থ ইমেইল সংখ্যা
   */
  countFailed(): Promise<number>;
}
