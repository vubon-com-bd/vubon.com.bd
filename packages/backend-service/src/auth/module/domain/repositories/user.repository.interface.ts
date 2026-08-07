// ✅ Shared packages - সরাসরি মূল প্যাকেজ থেকে ইম্পোর্ট
import type {
  UserStatus,
  UserRole,
  PaginationParams,
  PaginatedResponse,
} from '@vubon/shared-types';

// ✅ Domain Entities and Value Objects
import { User } from '../entities/user.entity';
import { UserId } from '../value-objects/user-id.vo';
import { Email } from '../value-objects/email.vo';
import { Phone } from '../value-objects/phone.vo';

// ✅ Base repository interface
import { IBaseRepository } from './base.repository.interface';

/**
 * User Repository Interface
 *
 * ইউজার এন্টিটির ডেটাবেস অপারেশন (সেভ, খোঁজা, ডিলিট) এর জন্য ইন্টারফেস।
 * IBaseRepository থেকে ইনহেরিট করে এবং ইউজার-নির্দিষ্ট মেথড যোগ করে।
 */
export interface IUserRepository extends IBaseRepository<User, string> {
  /**
   * ইমেইল দিয়ে ইউজার খুঁজে বের করে
   * @param email - ইউজারের ইমেইল (Email Value Object)
   * @returns পাওয়া গেলে User, না পেলে null
   */
  findByEmail(email: Email): Promise<User | null>;

  /**
   * ফোন নম্বর দিয়ে ইউজার খুঁজে বের করে
   * @param phone - ইউজারের ফোন নম্বর (Phone Value Object)
   * @returns পাওয়া গেলে User, না পেলে null
   */
  findByPhone(phone: Phone): Promise<User | null>;

  /**
   * স্ট্যাটাস অনুযায়ী ইউজারদের তালিকা বের করে
   * @param status - ইউজারের স্ট্যাটাস (UserStatus)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড ইউজার লিস্ট
   */
  findByStatus(status: UserStatus, params?: PaginationParams): Promise<PaginatedResponse<User>>;

  /**
   * রোল অনুযায়ী ইউজারদের তালিকা বের করে
   * @param role - ইউজারের রোল (UserRole)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড ইউজার লিস্ট
   */
  findByRole(role: UserRole, params?: PaginationParams): Promise<PaginatedResponse<User>>;

  /**
   * সার্চ টার্ম অনুযায়ী ইউজার খুঁজে বের করে (নাম বা ইমেইল দিয়ে)
   * @param searchTerm - সার্চ টার্ম
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড ইউজার লিস্ট
   */
  search(searchTerm: string, params?: PaginationParams): Promise<PaginatedResponse<User>>;

  /**
   * ইমেইল ভেরিফাইড কিনা তার ভিত্তিতে ইউজার খুঁজে বের করে
   * @param isVerified - ভেরিফাইড কিনা (true/false)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড ইউজার লিস্ট
   */
  findByEmailVerificationStatus(
    isVerified: boolean,
    params?: PaginationParams
  ): Promise<PaginatedResponse<User>>;

  /**
   * ফোন ভেরিফাইড কিনা তার ভিত্তিতে ইউজার খুঁজে বের করে
   * @param isVerified - ভেরিফাইড কিনা (true/false)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড ইউজার লিস্ট
   */
  findByPhoneVerificationStatus(
    isVerified: boolean,
    params?: PaginationParams
  ): Promise<PaginatedResponse<User>>;

  /**
   * নির্দিষ্ট সময়ের মধ্যে লগইন করা ইউজারদের তালিকা বের করে
   * @param fromDate - শুরু তারিখ
   * @param toDate - শেষ তারিখ
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড ইউজার লিস্ট
   */
  findUsersWithLoginBetween(
    fromDate: Date,
    toDate: Date,
    params?: PaginationParams
  ): Promise<PaginatedResponse<User>>;

  /**
   * নির্দিষ্ট স্ট্যাটাসে ইউজারের সংখ্যা গণনা করে
   * @param status - ইউজারের স্ট্যাটাস
   * @returns মোট ইউজার সংখ্যা
   */
  countByStatus(status: UserStatus): Promise<number>;

  /**
   * নির্দিষ্ট রোলে ইউজারের সংখ্যা গণনা করে
   * @param role - ইউজারের রোল
   * @returns মোট ইউজার সংখ্যা
   */
  countByRole(role: UserRole): Promise<number>;

  /**
   * ইমেইল ইউজার আছে কিনা চেক করে
   * @param email - ইউজারের ইমেইল
   * @returns true যদি ইউজার থাকে, false যদি না থাকে
   */
  existsByEmail(email: Email): Promise<boolean>;

  /**
   * ফোন নম্বর ইউজার আছে কিনা চেক করে
   * @param phone - ইউজারের ফোন নম্বর
   * @returns true যদি ইউজার থাকে, false যদি না থাকে
   */
  existsByPhone(phone: Phone): Promise<boolean>;

  /**
   * সক্রিয় (Active) ইউজারদের তালিকা বের করে
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড সক্রিয় ইউজার লিস্ট
   */
  findActiveUsers(params?: PaginationParams): Promise<PaginatedResponse<User>>;

  /**
   * ব্লকড (Blocked) বা ব্যানড (Banned) ইউজারদের তালিকা বের করে
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড ব্লকড/ব্যানড ইউজার লিস্ট
   */
  findBlockedUsers(params?: PaginationParams): Promise<PaginatedResponse<User>>;

  /**
   * নির্দিষ্ট সময়ের বেশি নিষ্ক্রিয় (Inactive) ইউজারদের তালিকা বের করে
   * @param inactiveThreshold - নিষ্ক্রিয়তার সময়সীমা (দিনে)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড নিষ্ক্রিয় ইউজার লিস্ট
   */
  findInactiveUsers(
    inactiveThreshold: number,
    params?: PaginationParams
  ): Promise<PaginatedResponse<User>>;

  /**
   * ডিলিট করা ইউজারদের তালিকা বের করে
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড ডিলিট করা ইউজার লিস্ট
   */
  findDeletedUsers(params?: PaginationParams): Promise<PaginatedResponse<User>>;

  /**
   * ইউজারের শেষ লগইন আপডেট করে
   * @param userId - ইউজারের আইডি
   * @param lastLoginAt - শেষ লগইনের সময়
   * @returns আপডেট করা User বা null
   */
  updateLastLogin(userId: UserId, lastLoginAt: Date): Promise<User | null>;

  /**
   * ইউজারের পাসওয়ার্ড হ্যাশ আপডেট করে
   * @param userId - ইউজারের আইডি
   * @param passwordHash - নতুন পাসওয়ার্ড হ্যাশ
   * @returns আপডেট করা User বা null
   */
  updatePasswordHash(userId: UserId, passwordHash: string): Promise<User | null>;
}
