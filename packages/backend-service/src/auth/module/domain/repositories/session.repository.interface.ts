// ✅ Shared packages
import type { SessionStatus } from '@vubon/shared-types';
import type { PaginationParams, PaginatedResponse } from '@vubon/shared-types';

// ✅ Domain Entities and Value Objects
import { Session } from '../entities/session.entity';
import { UserId } from '../value-objects/user-id.vo';
import { DeviceId } from '../value-objects/device-id.vo';
import { IpAddress } from '../value-objects/ip-address.vo';

// ✅ Base repository interface
import { IBaseRepository } from './base.repository.interface';

/**
 * Session Repository Interface
 *
 * সেশন এন্টিটির ডেটাবেস অপারেশন (সেভ, খোঁজা, ডিলিট) এর জন্য ইন্টারফেস।
 * IBaseRepository থেকে ইনহেরিট করে এবং সেশন-নির্দিষ্ট মেথড যোগ করে।
 */
export interface ISessionRepository extends IBaseRepository<Session, string> {
  /**
   * ইউজার আইডি দিয়ে সব সেশন খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns সেশনগুলোর অ্যারে
   */
  findByUserId(userId: UserId): Promise<Session[]>;

  /**
   * ইউজার আইডি দিয়ে সক্রিয় সেশন খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns সক্রিয় সেশনগুলোর অ্যারে
   */
  findActiveByUserId(userId: UserId): Promise<Session[]>;

  /**
   * ডিভাইস আইডি দিয়ে সেশন খুঁজে বের করে
   * @param deviceId - ডিভাইস আইডি (DeviceId Value Object)
   * @param userId - ইউজারের আইডি (UserId Value Object - optional)
   * @returns সেশনগুলোর অ্যারে
   */
  findByDeviceId(deviceId: DeviceId, userId?: UserId): Promise<Session[]>;

  /**
   * আইপি অ্যাড্রেস দিয়ে সেশন খুঁজে বের করে
   * @param ipAddress - আইপি অ্যাড্রেস (IpAddress Value Object)
   * @param userId - ইউজারের আইডি (UserId Value Object - optional)
   * @returns সেশনগুলোর অ্যারে
   */
  findByIpAddress(ipAddress: IpAddress, userId?: UserId): Promise<Session[]>;

  /**
   * স্ট্যাটাস অনুযায়ী সেশন খুঁজে বের করে
   * @param status - সেশন স্ট্যাটাস (SessionStatus)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড সেশন লিস্ট
   */
  findByStatus(
    status: SessionStatus,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Session>>;

  /**
   * ইউজারের সব সেশন রিভোক (বাতিল) করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param exceptSessionId - এই সেশনটি বাদ দিয়ে (optional)
   * @returns রিভোক করা সেশনের সংখ্যা
   */
  revokeAllByUserId(userId: UserId, exceptSessionId?: string): Promise<number>;

  /**
   * নির্দিষ্ট ডিভাইসের সব সেশন রিভোক করে
   * @param deviceId - ডিভাইস আইডি (DeviceId Value Object)
   * @param userId - ইউজারের আইডি (UserId Value Object - optional)
   * @returns রিভোক করা সেশনের সংখ্যা
   */
  revokeAllByDeviceId(deviceId: DeviceId, userId?: UserId): Promise<number>;

  /**
   * মেয়াদ উত্তীর্ণ (expired) সেশন খুঁজে বের করে
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড মেয়াদ উত্তীর্ণ সেশন লিস্ট
   */
  findExpiredSessions(params?: PaginationParams): Promise<PaginatedResponse<Session>>;

  /**
   * নির্দিষ্ট সময়ের বেশি নিষ্ক্রিয় (inactive) সেশন খুঁজে বের করে
   * @param idleThresholdSeconds - নিষ্ক্রিয়তার সময়সীমা (সেকেন্ডে)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড নিষ্ক্রিয় সেশন লিস্ট
   */
  findInactiveSessions(
    idleThresholdSeconds: number,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Session>>;

  /**
   * মেয়াদ উত্তীর্ণ বা রিভোক করা সেশনগুলো ডিলিট করে
   * @param olderThan - এই তারিখের আগের সেশনগুলো (optional)
   * @returns ডিলিট করা সেশনের সংখ্যা
   */
  deleteExpiredOrRevokedSessions(olderThan?: Date): Promise<number>;

  /**
   * একটি সেশন রিভোক (বাতিল) করে
   * @param sessionId - সেশন আইডি
   * @param reason - রিভোক করার কারণ
   * @returns সফল হলে true, না হলে false
   */
  revoke(sessionId: string, reason: string): Promise<boolean>;

  /**
   * ইউজারের সক্রিয় সেশন সংখ্যা গণনা করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns সক্রিয় সেশন সংখ্যা
   */
  countActiveByUserId(userId: UserId): Promise<number>;

  /**
   * ইউজারের মোট সেশন সংখ্যা গণনা করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns মোট সেশন সংখ্যা
   */
  countByUserId(userId: UserId): Promise<number>;

  /**
   * নির্দিষ্ট ডিভাইসে ইউজারের সেশন আছে কিনা চেক করে
   * @param deviceId - ডিভাইস আইডি (DeviceId Value Object)
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns true যদি সেশন থাকে, false যদি না থাকে
   */
  existsByDeviceId(deviceId: DeviceId, userId: UserId): Promise<boolean>;

  /**
   * একটি সেশন এক্সটেন্ড (বর্ধিত) করে
   * @param sessionId - সেশন আইডি
   * @param additionalSeconds - অতিরিক্ত সময় (সেকেন্ডে)
   * @returns আপডেট করা Session বা null
   */
  extendSession(sessionId: string, additionalSeconds: number): Promise<Session | null>;

  /**
   * সেশনের শেষ কার্যকলাপের সময় আপডেট করে
   * @param sessionId - সেশন আইডি
   * @returns আপডেট করা Session বা null
   */
  updateLastActivity(sessionId: string): Promise<Session | null>;
}
