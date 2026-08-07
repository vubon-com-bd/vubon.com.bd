// ✅ Shared packages
import type { LoginAttemptStatus, LoginFailureReason } from '@vubon/shared-types';
import type { PaginationParams, PaginatedResponse } from '@vubon/shared-types';

// ✅ Domain Entities and Value Objects
import { LoginAttempt } from '../entities/login-attempt.entity';
import { UserId } from '../value-objects/user-id.vo';
import { Email } from '../value-objects/email.vo';
import { IpAddress } from '../value-objects/ip-address.vo';

// ✅ Base repository interface
import { IBaseRepository } from './base.repository.interface';

/**
 * Login Attempt Repository Interface
 *
 * লগইন অ্যাটেম্পট এন্টিটির ডেটাবেস অপারেশন (সেভ, খোঁজা, ডিলিট) এর জন্য ইন্টারফেস।
 * IBaseRepository থেকে ইনহেরিট করে এবং লগইন অ্যাটেম্পট-নির্দিষ্ট মেথড যোগ করে।
 */
export interface ILoginAttemptRepository extends IBaseRepository<LoginAttempt, string> {
  /**
   * ইউজার আইডি দিয়ে সব লগইন অ্যাটেম্পট খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড লগইন অ্যাটেম্পট লিস্ট
   */
  findByUserId(userId: UserId, params?: PaginationParams): Promise<PaginatedResponse<LoginAttempt>>;

  /**
   * ইমেইল দিয়ে সব লগইন অ্যাটেম্পট খুঁজে বের করে
   * @param email - ইমেইল (Email Value Object)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড লগইন অ্যাটেম্পট লিস্ট
   */
  findByEmail(email: Email, params?: PaginationParams): Promise<PaginatedResponse<LoginAttempt>>;

  /**
   * ইউজার আইডি এবং ইমেইল দিয়ে লগইন অ্যাটেম্পট খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param email - ইমেইল (Email Value Object)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড লগইন অ্যাটেম্পট লিস্ট
   */
  findByUserIdAndEmail(
    userId: UserId,
    email: Email,
    params?: PaginationParams
  ): Promise<PaginatedResponse<LoginAttempt>>;

  /**
   * আইপি অ্যাড্রেস দিয়ে লগইন অ্যাটেম্পট খুঁজে বের করে
   * @param ipAddress - আইপি অ্যাড্রেস (IpAddress Value Object)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড লগইন অ্যাটেম্পট লিস্ট
   */
  findByIpAddress(
    ipAddress: IpAddress,
    params?: PaginationParams
  ): Promise<PaginatedResponse<LoginAttempt>>;

  /**
   * স্ট্যাটাস অনুযায়ী লগইন অ্যাটেম্পট খুঁজে বের করে
   * @param status - লগইন স্ট্যাটাস (LoginAttemptStatus)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড লগইন অ্যাটেম্পট লিস্ট
   */
  findByStatus(
    status: LoginAttemptStatus,
    params?: PaginationParams
  ): Promise<PaginatedResponse<LoginAttempt>>;

  /**
   * নির্দিষ্ট সময়ের মধ্যে ইউজারের লগইন অ্যাটেম্পট কাউন্ট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param fromDate - শুরু তারিখ
   * @param toDate - শেষ তারিখ
   * @returns মোট অ্যাটেম্পট সংখ্যা
   */
  countByUserIdBetween(userId: UserId, fromDate: Date, toDate: Date): Promise<number>;

  /**
   * নির্দিষ্ট সময়ের মধ্যে একটি আইপি থেকে লগইন অ্যাটেম্পট কাউন্ট করে
   * @param ipAddress - আইপি অ্যাড্রেস (IpAddress Value Object)
   * @param fromDate - শুরু তারিখ
   * @param toDate - শেষ তারিখ
   * @returns মোট অ্যাটেম্পট সংখ্যা
   */
  countByIpAddressBetween(ipAddress: IpAddress, fromDate: Date, toDate: Date): Promise<number>;

  /**
   * একটি ইউজারের সাম্প্রতিক ব্যর্থ লগইন অ্যাটেম্পট কাউন্ট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param windowMinutes - সময়সীমা (মিনিটে)
   * @returns ব্যর্থ অ্যাটেম্পট সংখ্যা
   */
  countRecentFailures(userId: UserId, windowMinutes: number): Promise<number>;

  /**
   * একটি আইপি থেকে সাম্প্রতিক ব্যর্থ লগইন অ্যাটেম্পট কাউন্ট করে
   * @param ipAddress - আইপি অ্যাড্রেস (IpAddress Value Object)
   * @param windowMinutes - সময়সীমা (মিনিটে)
   * @returns ব্যর্থ অ্যাটেম্পট সংখ্যা
   */
  countRecentFailuresByIp(ipAddress: IpAddress, windowMinutes: number): Promise<number>;

  /**
   * একটি ইউজারের সর্বশেষ সফল লগইন অ্যাটেম্পট খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns পাওয়া গেলে LoginAttempt, না পেলে null
   */
  findLastSuccessByUserId(userId: UserId): Promise<LoginAttempt | null>;

  /**
   * একটি ইউজারের সর্বশেষ ব্যর্থ লগইন অ্যাটেম্পট খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns পাওয়া গেলে LoginAttempt, না পেলে null
   */
  findLastFailureByUserId(userId: UserId): Promise<LoginAttempt | null>;

  /**
   * একটি ইউজারের সাম্প্রতিক লগইন অ্যাটেম্পট হিস্ট্রি খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param limit - কতটি রেকর্ড (default: 10)
   * @returns লগইন অ্যাটেম্পটগুলোর অ্যারে
   */
  findRecentHistory(userId: UserId, limit?: number): Promise<LoginAttempt[]>;

  /**
   * নির্দিষ্ট ব্যর্থতার কারণে লগইন অ্যাটেম্পট খুঁজে বের করে
   * @param failureReason - ব্যর্থতার কারণ (LoginFailureReason)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড লগইন অ্যাটেম্পট লিস্ট
   */
  findByFailureReason(
    failureReason: LoginFailureReason,
    params?: PaginationParams
  ): Promise<PaginatedResponse<LoginAttempt>>;

  /**
   * মোট সফল লগইন অ্যাটেম্পট কাউন্ট করে
   * @param userId - ইউজারের আইডি (UserId Value Object - optional)
   * @returns মোট সফল অ্যাটেম্পট সংখ্যা
   */
  countSuccess(userId?: UserId): Promise<number>;

  /**
   * মোট ব্যর্থ লগইন অ্যাটেম্পট কাউন্ট করে
   * @param userId - ইউজারের আইডি (UserId Value Object - optional)
   * @returns মোট ব্যর্থ অ্যাটেম্পট সংখ্যা
   */
  countFailures(userId?: UserId): Promise<number>;

  /**
   * নির্দিষ্ট সময়ের পুরানো লগইন অ্যাটেম্পট ডিলিট করে
   * @param olderThan - এই তারিখের আগের অ্যাটেম্পটগুলো
   * @returns ডিলিট করা অ্যাটেম্পট সংখ্যা
   */
  deleteOldAttempts(olderThan: Date): Promise<number>;

  /**
   * একটি ইউজারের সব লগইন অ্যাটেম্পট ডিলিট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns ডিলিট করা অ্যাটেম্পট সংখ্যা
   */
  deleteByUserId(userId: UserId): Promise<number>;

  /**
   * একটি আইপি অ্যাড্রেসের সব লগইন অ্যাটেম্পট ডিলিট করে
   * @param ipAddress - আইপি অ্যাড্রেস (IpAddress Value Object)
   * @returns ডিলিট করা অ্যাটেম্পট সংখ্যা
   */
  deleteByIpAddress(ipAddress: IpAddress): Promise<number>;
}
