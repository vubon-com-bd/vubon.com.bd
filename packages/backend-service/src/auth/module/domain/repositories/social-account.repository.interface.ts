// ✅ Shared packages
import type { SocialProvider } from '@vubon/shared-types';
import type { PaginationParams, PaginatedResponse } from '@vubon/shared-types';

// ✅ Domain Entities and Value Objects
import { SocialAccount } from '../entities/social-account.entity';
import { UserId } from '../value-objects/user-id.vo';
import { Email } from '../value-objects/email.vo';

// ✅ Base repository interface
import { IBaseRepository } from './base.repository.interface';

/**
 * Social Account Repository Interface
 *
 * সোশ্যাল অ্যাকাউন্ট এন্টিটির ডেটাবেস অপারেশন (সেভ, খোঁজা, ডিলিট) এর জন্য ইন্টারফেস।
 * IBaseRepository থেকে ইনহেরিট করে এবং সোশ্যাল অ্যাকাউন্ট-নির্দিষ্ট মেথড যোগ করে।
 */
export interface ISocialAccountRepository extends IBaseRepository<SocialAccount, string> {
  /**
   * ইউজার আইডি দিয়ে সব সোশ্যাল অ্যাকাউন্ট খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড সোশ্যাল অ্যাকাউন্ট লিস্ট
   */
  findByUserId(
    userId: UserId,
    params?: PaginationParams
  ): Promise<PaginatedResponse<SocialAccount>>;

  /**
   * ইউজার আইডি এবং প্রোভাইডার দিয়ে সোশ্যাল অ্যাকাউন্ট খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param provider - সোশ্যাল প্রোভাইডার (SocialProvider)
   * @returns পাওয়া গেলে SocialAccount, না পেলে null
   */
  findByUserIdAndProvider(userId: UserId, provider: SocialProvider): Promise<SocialAccount | null>;

  /**
   * প্রোভাইডার ইউজার আইডি এবং প্রোভাইডার দিয়ে সোশ্যাল অ্যাকাউন্ট খুঁজে বের করে
   * @param providerUserId - প্রোভাইডারের ইউজার আইডি
   * @param provider - সোশ্যাল প্রোভাইডার (SocialProvider)
   * @returns পাওয়া গেলে SocialAccount, না পেলে null
   */
  findByProviderUserIdAndProvider(
    providerUserId: string,
    provider: SocialProvider
  ): Promise<SocialAccount | null>;

  /**
   * ইমেইল দিয়ে সোশ্যাল অ্যাকাউন্ট খুঁজে বের করে
   * @param email - ইমেইল (Email Value Object)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড সোশ্যাল অ্যাকাউন্ট লিস্ট
   */
  findByEmail(email: Email, params?: PaginationParams): Promise<PaginatedResponse<SocialAccount>>;

  /**
   * প্রোভাইডার অনুযায়ী সোশ্যাল অ্যাকাউন্ট খুঁজে বের করে
   * @param provider - সোশ্যাল প্রোভাইডার (SocialProvider)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড সোশ্যাল অ্যাকাউন্ট লিস্ট
   */
  findByProvider(
    provider: SocialProvider,
    params?: PaginationParams
  ): Promise<PaginatedResponse<SocialAccount>>;

  /**
   * ইউজারের সক্রিয় সোশ্যাল অ্যাকাউন্ট খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড সক্রিয় সোশ্যাল অ্যাকাউন্ট লিস্ট
   */
  findActiveByUserId(
    userId: UserId,
    params?: PaginationParams
  ): Promise<PaginatedResponse<SocialAccount>>;

  /**
   * একটি সোশ্যাল অ্যাকাউন্টের অ্যাক্সেস টোকেন আপডেট করে
   * @param accountId - অ্যাকাউন্ট আইডি
   * @param accessToken - নতুন অ্যাক্সেস টোকেন
   * @param expiresAt - টোকেন মেয়াদ শেষের সময় (optional)
   * @returns আপডেট করা SocialAccount বা null
   */
  updateAccessToken(
    accountId: string,
    accessToken: string,
    expiresAt?: Date
  ): Promise<SocialAccount | null>;

  /**
   * একটি সোশ্যাল অ্যাকাউন্টের রিফ্রেশ টোকেন আপডেট করে
   * @param accountId - অ্যাকাউন্ট আইডি
   * @param refreshToken - নতুন রিফ্রেশ টোকেন (optional)
   * @returns আপডেট করা SocialAccount বা null
   */
  updateRefreshToken(accountId: string, refreshToken: string | null): Promise<SocialAccount | null>;

  /**
   * একটি সোশ্যাল অ্যাকাউন্ট নিষ্ক্রিয় করে
   * @param accountId - অ্যাকাউন্ট আইডি
   * @returns আপডেট করা SocialAccount বা null
   */
  deactivate(accountId: string): Promise<SocialAccount | null>;

  /**
   * একটি সোশ্যাল অ্যাকাউন্ট পুনরায় সক্রিয় করে
   * @param accountId - অ্যাকাউন্ট আইডি
   * @returns আপডেট করা SocialAccount বা null
   */
  reactivate(accountId: string): Promise<SocialAccount | null>;

  /**
   * একটি ইউজারের নির্দিষ্ট প্রোভাইডারের সোশ্যাল অ্যাকাউন্ট আছে কিনা চেক করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param provider - সোশ্যাল প্রোভাইডার (SocialProvider)
   * @returns true যদি থাকে, false যদি না থাকে
   */
  existsByUserIdAndProvider(userId: UserId, provider: SocialProvider): Promise<boolean>;

  /**
   * একটি প্রোভাইডার ইউজার আইডি এবং প্রোভাইডারের সোশ্যাল অ্যাকাউন্ট আছে কিনা চেক করে
   * @param providerUserId - প্রোভাইডারের ইউজার আইডি
   * @param provider - সোশ্যাল প্রোভাইডার (SocialProvider)
   * @returns true যদি থাকে, false যদি না থাকে
   */
  existsByProviderUserIdAndProvider(
    providerUserId: string,
    provider: SocialProvider
  ): Promise<boolean>;

  /**
   * একটি ইমেইলে সোশ্যাল অ্যাকাউন্ট আছে কিনা চেক করে
   * @param email - ইমেইল (Email Value Object)
   * @returns true যদি থাকে, false যদি না থাকে
   */
  existsByEmail(email: Email): Promise<boolean>;

  /**
   * একটি ইউজারের সোশ্যাল অ্যাকাউন্ট কাউন্ট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns মোট সোশ্যাল অ্যাকাউন্ট সংখ্যা
   */
  countByUserId(userId: UserId): Promise<number>;

  /**
   * একটি প্রোভাইডারের সোশ্যাল অ্যাকাউন্ট কাউন্ট করে
   * @param provider - সোশ্যাল প্রোভাইডার (SocialProvider)
   * @returns মোট সোশ্যাল অ্যাকাউন্ট সংখ্যা
   */
  countByProvider(provider: SocialProvider): Promise<number>;

  /**
   * একটি ইউজারের সব সোশ্যাল অ্যাকাউন্ট ডিলিট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param provider - সোশ্যাল প্রোভাইডার (SocialProvider - optional)
   * @returns ডিলিট করা অ্যাকাউন্টের সংখ্যা
   */
  deleteByUserId(userId: UserId, provider?: SocialProvider): Promise<number>;

  /**
   * মেয়াদ উত্তীর্ণ অ্যাক্সেস টোকেনের সোশ্যাল অ্যাকাউন্ট খুঁজে বের করে
   * @param params - পেজিনেশন প্যারামিটার
   * @returns পেজিনেটেড মেয়াদ উত্তীর্ণ অ্যাকাউন্ট লিস্ট
   */
  findExpiredTokens(params?: PaginationParams): Promise<PaginatedResponse<SocialAccount>>;

  /**
   * নির্দিষ্ট সময়ের বেশি পুরানো সোশ্যাল অ্যাকাউন্ট ডিলিট করে
   * @param olderThan - এই তারিখের আগের অ্যাকাউন্টগুলো
   * @param userId - ইউজারের আইডি (UserId Value Object - optional)
   * @returns ডিলিট করা অ্যাকাউন্টের সংখ্যা
   */
  deleteOldAccounts(olderThan: Date, userId?: UserId): Promise<number>;

  /**
   * একটি ইউজারের সোশ্যাল অ্যাকাউন্ট প্রোফাইল আপডেট করে
   * @param accountId - অ্যাকাউন্ট আইডি
   * @param name - নতুন নাম
   * @param avatar - নতুন অ্যাভাটার ইউআরএল (optional)
   * @param email - নতুন ইমেইল (optional)
   * @param emailVerified - ইমেইল ভেরিফাইড কিনা (optional)
   * @returns আপডেট করা SocialAccount বা null
   */
  updateProfile(
    accountId: string,
    name: string,
    avatar?: string | null,
    email?: Email,
    emailVerified?: boolean
  ): Promise<SocialAccount | null>;
}
