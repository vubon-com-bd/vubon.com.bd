// ✅ Shared packages
import type { DeviceType, DeviceTrustLevel, DeviceStatus } from '@vubon/shared-types';
import type { PaginationParams, PaginatedResponse } from '@vubon/shared-types';

// ✅ Domain Entities and Value Objects
import { Device } from '../entities/device.entity';
import { UserId } from '../value-objects/user-id.vo';
import { DeviceId } from '../value-objects/device-id.vo';
import { IpAddress } from '../value-objects/ip-address.vo';

// ✅ Base repository interface
import { IBaseRepository } from './base.repository.interface';

/**
 * Device Repository Interface
 *
 * ডিভাইস এন্টিটির ডেটাবেস অপারেশন (সেভ, খোঁজা, ডিলিট) এর জন্য ইন্টারফেস।
 * IBaseRepository থেকে ইনহেরিট করে এবং ডিভাইস-নির্দিষ্ট মেথড যোগ করে।
 */
export interface IDeviceRepository extends IBaseRepository<Device, string> {
  /**
   * ইউজার আইডি দিয়ে সব ডিভাইস খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড ডিভাইস লিস্ট
   */
  findByUserId(userId: UserId, params?: PaginationParams): Promise<PaginatedResponse<Device>>;

  /**
   * ডিভাইস আইডি দিয়ে ডিভাইস খুঁজে বের করে
   * @param deviceId - ডিভাইস আইডি (DeviceId Value Object)
   * @param userId - ইউজারের আইডি (UserId Value Object - optional)
   * @returns পাওয়া গেলে Device, না পেলে null
   */
  findByDeviceId(deviceId: DeviceId, userId?: UserId): Promise<Device | null>;

  /**
   * ডিভাইস টাইপ অনুযায়ী ডিভাইস খুঁজে বের করে
   * @param deviceType - ডিভাইস টাইপ (DeviceType)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড ডিভাইস লিস্ট
   */
  findByDeviceType(
    deviceType: DeviceType,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Device>>;

  /**
   * ট্রাস্ট লেভেল অনুযায়ী ডিভাইস খুঁজে বের করে
   * @param trustLevel - ট্রাস্ট লেভেল (DeviceTrustLevel)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড ডিভাইস লিস্ট
   */
  findByTrustLevel(
    trustLevel: DeviceTrustLevel,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Device>>;

  /**
   * স্ট্যাটাস অনুযায়ী ডিভাইস খুঁজে বের করে
   * @param status - ডিভাইস স্ট্যাটাস (DeviceStatus)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড ডিভাইস লিস্ট
   */
  findByStatus(status: DeviceStatus, params?: PaginationParams): Promise<PaginatedResponse<Device>>;

  /**
   * আইপি অ্যাড্রেস দিয়ে ডিভাইস খুঁজে বের করে
   * @param ipAddress - আইপি অ্যাড্রেস (IpAddress Value Object)
   * @param userId - ইউজারের আইডি (UserId Value Object - optional)
   * @returns ডিভাইসগুলোর অ্যারে
   */
  findByIpAddress(ipAddress: IpAddress, userId?: UserId): Promise<Device[]>;

  /**
   * ইউজারের ট্রাস্টেড ডিভাইস খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড ট্রাস্টেড ডিভাইস লিস্ট
   */
  findTrustedDevices(userId: UserId, params?: PaginationParams): Promise<PaginatedResponse<Device>>;

  /**
   * ইউজারের ব্লকড ডিভাইস খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড ব্লকড ডিভাইস লিস্ট
   */
  findBlockedDevices(userId: UserId, params?: PaginationParams): Promise<PaginatedResponse<Device>>;

  /**
   * ইউজারের সক্রিয় ডিভাইস খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড সক্রিয় ডিভাইস লিস্ট
   */
  findActiveDevices(userId: UserId, params?: PaginationParams): Promise<PaginatedResponse<Device>>;

  /**
   * একটি ডিভাইসের ট্রাস্ট লেভেল আপডেট করে
   * @param deviceId - ডিভাইস আইডি (DeviceId Value Object)
   * @param trustLevel - নতুন ট্রাস্ট লেভেল (DeviceTrustLevel)
   * @param trustExpiresAt - ট্রাস্ট মেয়াদ শেষের সময় (optional)
   * @returns আপডেট করা Device বা null
   */
  updateTrustLevel(
    deviceId: DeviceId,
    trustLevel: DeviceTrustLevel,
    trustExpiresAt?: Date
  ): Promise<Device | null>;

  /**
   * একটি ডিভাইস ব্লক করে
   * @param deviceId - ডিভাইস আইডি (DeviceId Value Object)
   * @returns আপডেট করা Device বা null
   */
  blockDevice(deviceId: DeviceId): Promise<Device | null>;

  /**
   * একটি ডিভাইস আনব্লক করে
   * @param deviceId - ডিভাইস আইডি (DeviceId Value Object)
   * @returns আপডেট করা Device বা null
   */
  unblockDevice(deviceId: DeviceId): Promise<Device | null>;

  /**
   * একটি ডিভাইস ভেরিফাই করে
   * @param deviceId - ডিভাইস আইডি (DeviceId Value Object)
   * @returns আপডেট করা Device বা null
   */
  verifyDevice(deviceId: DeviceId): Promise<Device | null>;

  /**
   * একটি ডিভাইসের শেষ ব্যবহারের সময় আপডেট করে
   * @param deviceId - ডিভাইস আইডি (DeviceId Value Object)
   * @param lastUsedAt - শেষ ব্যবহারের সময় (optional, default: now)
   * @returns আপডেট করা Device বা null
   */
  updateLastUsed(deviceId: DeviceId, lastUsedAt?: Date): Promise<Device | null>;

  /**
   * একটি ডিভাইসের ব্যর্থ প্রচেষ্টার সংখ্যা ইনক্রিমেন্ট করে
   * @param deviceId - ডিভাইস আইডি (DeviceId Value Object)
   * @returns আপডেট করা Device বা null
   */
  incrementFailedAttempts(deviceId: DeviceId): Promise<Device | null>;

  /**
   * একটি ডিভাইসের ব্যর্থ প্রচেষ্টার সংখ্যা রিসেট করে
   * @param deviceId - ডিভাইস আইডি (DeviceId Value Object)
   * @returns আপডেট করা Device বা null
   */
  resetFailedAttempts(deviceId: DeviceId): Promise<Device | null>;

  /**
   * একটি ইউজারের ডিভাইস কাউন্ট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns মোট ডিভাইস সংখ্যা
   */
  countByUserId(userId: UserId): Promise<number>;

  /**
   * একটি ইউজারের ট্রাস্টেড ডিভাইস কাউন্ট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns মোট ট্রাস্টেড ডিভাইস সংখ্যা
   */
  countTrustedByUserId(userId: UserId): Promise<number>;

  /**
   * নির্দিষ্ট টাইপের ডিভাইস কাউন্ট করে
   * @param deviceType - ডিভাইস টাইপ (DeviceType)
   * @param userId - ইউজারের আইডি (UserId Value Object - optional)
   * @returns মোট ডিভাইস সংখ্যা
   */
  countByDeviceType(deviceType: DeviceType, userId?: UserId): Promise<number>;

  /**
   * নির্দিষ্ট ট্রাস্ট লেভেলের ডিভাইস কাউন্ট করে
   * @param trustLevel - ট্রাস্ট লেভেল (DeviceTrustLevel)
   * @param userId - ইউজারের আইডি (UserId Value Object - optional)
   * @returns মোট ডিভাইস সংখ্যা
   */
  countByTrustLevel(trustLevel: DeviceTrustLevel, userId?: UserId): Promise<number>;

  /**
   * একটি ইউজারের ডিভাইস আছে কিনা চেক করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param deviceId - ডিভাইস আইডি (DeviceId Value Object)
   * @returns true যদি ডিভাইস থাকে, false যদি না থাকে
   */
  existsByUserIdAndDeviceId(userId: UserId, deviceId: DeviceId): Promise<boolean>;

  /**
   * একটি ইউজারের ট্রাস্টেড ডিভাইস আছে কিনা চেক করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns true যদি ট্রাস্টেড ডিভাইস থাকে, false যদি না থাকে
   */
  hasTrustedDevice(userId: UserId): Promise<boolean>;

  /**
   * মেয়াদ উত্তীর্ণ ট্রাস্ট ডিভাইস খুঁজে বের করে
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড মেয়াদ উত্তীর্ণ ডিভাইস লিস্ট
   */
  findExpiredTrustedDevices(params?: PaginationParams): Promise<PaginatedResponse<Device>>;

  /**
   * একটি ইউজারের ডিভাইস ডিলিট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param deviceId - ডিভাইস আইডি (DeviceId Value Object - optional)
   * @returns ডিলিট করা ডিভাইসের সংখ্যা
   */
  deleteByUserId(userId: UserId, deviceId?: DeviceId): Promise<number>;

  /**
   * নির্দিষ্ট সময়ের বেশি পুরানো ডিভাইস ডিলিট করে
   * @param olderThan - এই তারিখের আগের ডিভাইসগুলো
   * @param userId - ইউজারের আইডি (UserId Value Object - optional)
   * @returns ডিলিট করা ডিভাইসের সংখ্যা
   */
  deleteOldDevices(olderThan: Date, userId?: UserId): Promise<number>;
}
