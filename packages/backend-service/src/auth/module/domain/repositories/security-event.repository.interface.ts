// ✅ Shared packages
import type { SecurityEventType } from '@vubon/shared-types';
import type { PaginationParams, PaginatedResponse } from '@vubon/shared-types';

// ✅ Domain Entities and Value Objects
import { SecurityEvent } from '../entities/security-event.entity';
import { UserId } from '../value-objects/user-id.vo';
import { IpAddress } from '../value-objects/ip-address.vo';

// ✅ Base repository interface
import { IBaseRepository } from './base.repository.interface';

/**
 * Security Event Repository Interface
 *
 * সিকিউরিটি ইভেন্ট এন্টিটির ডেটাবেস অপারেশন (সেভ, খোঁজা, ডিলিট) এর জন্য ইন্টারফেস।
 * IBaseRepository থেকে ইনহেরিট করে এবং সিকিউরিটি ইভেন্ট-নির্দিষ্ট মেথড যোগ করে।
 */
export interface ISecurityEventRepository extends IBaseRepository<SecurityEvent, string> {
  /**
   * ইউজার আইডি দিয়ে সিকিউরিটি ইভেন্ট খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড সিকিউরিটি ইভেন্ট লিস্ট
   */
  findByUserId(
    userId: UserId,
    params?: PaginationParams
  ): Promise<PaginatedResponse<SecurityEvent>>;

  /**
   * আইপি অ্যাড্রেস দিয়ে সিকিউরিটি ইভেন্ট খুঁজে বের করে
   * @param ipAddress - আইপি অ্যাড্রেস (IpAddress Value Object)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড সিকিউরিটি ইভেন্ট লিস্ট
   */
  findByIpAddress(
    ipAddress: IpAddress,
    params?: PaginationParams
  ): Promise<PaginatedResponse<SecurityEvent>>;

  /**
   * ইভেন্ট টাইপ অনুযায়ী সিকিউরিটি ইভেন্ট খুঁজে বের করে
   * @param eventType - ইভেন্ট টাইপ (SecurityEventType)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড সিকিউরিটি ইভেন্ট লিস্ট
   */
  findByEventType(
    eventType: SecurityEventType,
    params?: PaginationParams
  ): Promise<PaginatedResponse<SecurityEvent>>;

  /**
   * সিভেরিটি লেভেল অনুযায়ী সিকিউরিটি ইভেন্ট খুঁজে বের করে
   * @param severity - সিভেরিটি লেভেল ('INFO' | 'WARNING' | 'ERROR' | 'CRITICAL')
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড সিকিউরিটি ইভেন্ট লিস্ট
   */
  findBySeverity(
    severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL',
    params?: PaginationParams
  ): Promise<PaginatedResponse<SecurityEvent>>;

  /**
   * সোর্স অনুযায়ী সিকিউরিটি ইভেন্ট খুঁজে বের করে
   * @param source - সোর্স ('api' | 'web' | 'cli' | 'system' | 'mobile')
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড সিকিউরিটি ইভেন্ট লিস্ট
   */
  findBySource(
    source: 'api' | 'web' | 'cli' | 'system' | 'mobile',
    params?: PaginationParams
  ): Promise<PaginatedResponse<SecurityEvent>>;

  /**
   * নির্দিষ্ট সময়ের মধ্যে সিকিউরিটি ইভেন্ট খুঁজে বের করে
   * @param fromDate - শুরু তারিখ
   * @param toDate - শেষ তারিখ
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড সিকিউরিটি ইভেন্ট লিস্ট
   */
  findByDateRange(
    fromDate: Date,
    toDate: Date,
    params?: PaginationParams
  ): Promise<PaginatedResponse<SecurityEvent>>;

  /**
   * ক্রিটিকাল সিকিউরিটি ইভেন্ট খুঁজে বের করে
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড ক্রিটিকাল ইভেন্ট লিস্ট
   */
  findCriticalEvents(params?: PaginationParams): Promise<PaginatedResponse<SecurityEvent>>;

  /**
   * অথেনটিকেশন সম্পর্কিত সিকিউরিটি ইভেন্ট খুঁজে বের করে
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড অথেনটিকেশন ইভেন্ট লিস্ট
   */
  findAuthEvents(params?: PaginationParams): Promise<PaginatedResponse<SecurityEvent>>;

  /**
   * অ্যাকাউন্ট সম্পর্কিত সিকিউরিটি ইভেন্ট খুঁজে বের করে
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড অ্যাকাউন্ট ইভেন্ট লিস্ট
   */
  findAccountEvents(params?: PaginationParams): Promise<PaginatedResponse<SecurityEvent>>;

  /**
   * নির্দিষ্ট সময়ের মধ্যে ইউজারের সিকিউরিটি ইভেন্ট কাউন্ট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param fromDate - শুরু তারিখ
   * @param toDate - শেষ তারিখ
   * @returns মোট ইভেন্ট সংখ্যা
   */
  countByUserIdBetween(userId: UserId, fromDate: Date, toDate: Date): Promise<number>;

  /**
   * নির্দিষ্ট সময়ের মধ্যে একটি আইপি থেকে সিকিউরিটি ইভেন্ট কাউন্ট করে
   * @param ipAddress - আইপি অ্যাড্রেস (IpAddress Value Object)
   * @param fromDate - শুরু তারিখ
   * @param toDate - শেষ তারিখ
   * @returns মোট ইভেন্ট সংখ্যা
   */
  countByIpAddressBetween(ipAddress: IpAddress, fromDate: Date, toDate: Date): Promise<number>;

  /**
   * নির্দিষ্ট সিভেরিটি লেভেলের সিকিউরিটি ইভেন্ট কাউন্ট করে
   * @param severity - সিভেরিটি লেভেল
   * @param fromDate - শুরু তারিখ (optional)
   * @param toDate - শেষ তারিখ (optional)
   * @returns মোট ইভেন্ট সংখ্যা
   */
  countBySeverity(
    severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL',
    fromDate?: Date,
    toDate?: Date
  ): Promise<number>;

  /**
   * নির্দিষ্ট ইভেন্ট টাইপের সিকিউরিটি ইভেন্ট কাউন্ট করে
   * @param eventType - ইভেন্ট টাইপ (SecurityEventType)
   * @param fromDate - শুরু তারিখ (optional)
   * @param toDate - শেষ তারিখ (optional)
   * @returns মোট ইভেন্ট সংখ্যা
   */
  countByEventType(eventType: SecurityEventType, fromDate?: Date, toDate?: Date): Promise<number>;

  /**
   * মোট ক্রিটিকাল ইভেন্ট কাউন্ট করে
   * @param fromDate - শুরু তারিখ (optional)
   * @param toDate - শেষ তারিখ (optional)
   * @returns মোট ক্রিটিকাল ইভেন্ট সংখ্যা
   */
  countCritical(fromDate?: Date, toDate?: Date): Promise<number>;

  /**
   * একটি ইউজারের সিকিউরিটি ইভেন্ট আছে কিনা চেক করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns true যদি ইভেন্ট থাকে, false যদি না থাকে
   */
  existsByUserId(userId: UserId): Promise<boolean>;

  /**
   * নির্দিষ্ট সময়ের পুরানো সিকিউরিটি ইভেন্ট ডিলিট করে
   * @param olderThan - এই তারিখের আগের ইভেন্টগুলো
   * @param userId - ইউজারের আইডি (UserId Value Object - optional)
   * @returns ডিলিট করা ইভেন্টের সংখ্যা
   */
  deleteOldEvents(olderThan: Date, userId?: UserId): Promise<number>;

  /**
   * একটি ইউজারের সব সিকিউরিটি ইভেন্ট ডিলিট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns ডিলিট করা ইভেন্টের সংখ্যা
   */
  deleteByUserId(userId: UserId): Promise<number>;

  /**
   * একটি আইপি অ্যাড্রেসের সব সিকিউরিটি ইভেন্ট ডিলিট করে
   * @param ipAddress - আইপি অ্যাড্রেস (IpAddress Value Object)
   * @returns ডিলিট করা ইভেন্টের সংখ্যা
   */
  deleteByIpAddress(ipAddress: IpAddress): Promise<number>;

  /**
   * নির্দিষ্ট সিভেরিটি লেভেলের সিকিউরিটি ইভেন্ট ডিলিট করে
   * @param severity - সিভেরিটি লেভেল
   * @param olderThan - এই তারিখের আগের ইভেন্টগুলো (optional)
   * @returns ডিলিট করা ইভেন্টের সংখ্যা
   */
  deleteBySeverity(
    severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL',
    olderThan?: Date
  ): Promise<number>;

  /**
   * একটি নির্দিষ্ট সেশন আইডির সিকিউরিটি ইভেন্ট খুঁজে বের করে
   * @param sessionId - সেশন আইডি
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড সিকিউরিটি ইভেন্ট লিস্ট
   */
  findBySessionId(
    sessionId: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<SecurityEvent>>;

  /**
   * একটি নির্দিষ্ট ডিভাইস আইডির সিকিউরিটি ইভেন্ট খুঁজে বের করে
   * @param deviceId - ডিভাইস আইডি
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড সিকিউরিটি ইভেন্ট লিস্ট
   */
  findByDeviceId(
    deviceId: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<SecurityEvent>>;
}
