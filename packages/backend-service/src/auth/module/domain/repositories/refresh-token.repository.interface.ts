// ✅ Shared packages
import type { TokenFamily } from '@vubon/shared-types';

// ✅ Domain Entities and Value Objects
import { RefreshToken } from '../entities/refresh-token.entity';
import { UserId } from '../value-objects/user-id.vo';
import { Token } from '../value-objects/token.vo';

// ✅ Base repository interface
import { IBaseRepository } from './base.repository.interface';

/**
 * Refresh Token Repository Interface
 *
 * রিফ্রেশ টোকেন এন্টিটির ডেটাবেস অপারেশন (সেভ, খোঁজা, ডিলিট) এর জন্য ইন্টারফেস।
 * IBaseRepository থেকে ইনহেরিট করে এবং রিফ্রেশ টোকেন-নির্দিষ্ট মেথড যোগ করে।
 */
export interface IRefreshTokenRepository extends IBaseRepository<RefreshToken, string> {
  /**
   * টোকেন ভ্যালু দিয়ে রিফ্রেশ টোকেন খুঁজে বের করে
   * @param token - রিফ্রেশ টোকেন (Token Value Object)
   * @returns পাওয়া গেলে RefreshToken, না পেলে null
   */
  findByToken(token: Token): Promise<RefreshToken | null>;

  /**
   * ফ্যামিলি আইডি দিয়ে সব রিফ্রেশ টোকেন খুঁজে বের করে
   * @param familyId - টোকেন ফ্যামিলি আইডি
   * @returns রিফ্রেশ টোকেনগুলোর অ্যারে
   */
  findByFamilyId(familyId: string): Promise<RefreshToken[]>;

  /**
   * ইউজার আইডি দিয়ে সব রিফ্রেশ টোকেন খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns রিফ্রেশ টোকেনগুলোর অ্যারে
   */
  findByUserId(userId: UserId): Promise<RefreshToken[]>;

  /**
   * ইউজার আইডি এবং ফ্যামিলি আইডি দিয়ে রিফ্রেশ টোকেন খুঁজে বের করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param familyId - টোকেন ফ্যামিলি আইডি
   * @returns পাওয়া গেলে RefreshToken, না পেলে null
   */
  findByUserIdAndFamilyId(userId: UserId, familyId: string): Promise<RefreshToken | null>;

  /**
   * একটি ফ্যামিলির সব রিফ্রেশ টোকেন রিভোক (বাতিল) করে
   * @param familyId - টোকেন ফ্যামিলি আইডি
   * @param reason - রিভোক করার কারণ
   * @returns রিভোক করা টোকেনের সংখ্যা
   */
  revokeAllByFamilyId(familyId: string, reason: string): Promise<number>;

  /**
   * একটি ইউজারের সব রিফ্রেশ টোকেন রিভোক করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param reason - রিভোক করার কারণ
   * @returns রিভোক করা টোকেনের সংখ্যা
   */
  revokeAllByUserId(userId: UserId, reason: string): Promise<number>;

  /**
   * একটি টোকেন রিভোক করে
   * @param tokenId - টোকেন আইডি
   * @param reason - রিভোক করার কারণ
   * @returns সফল হলে true, না হলে false
   */
  revoke(tokenId: string, reason: string): Promise<boolean>;

  /**
   * একটি ফ্যামিলির সব রিফ্রেশ টোকেন ডিলিট করে
   * @param familyId - টোকেন ফ্যামিলি আইডি
   * @returns ডিলিট করা টোকেনের সংখ্যা
   */
  deleteAllByFamilyId(familyId: string): Promise<number>;

  /**
   * একটি ইউজারের সব রিফ্রেশ টোকেন ডিলিট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns ডিলিট করা টোকেনের সংখ্যা
   */
  deleteAllByUserId(userId: UserId): Promise<number>;

  /**
   * মেয়াদ উত্তীর্ণ (expired) রিফ্রেশ টোকেন খুঁজে বের করে
   * @param olderThan - এই তারিখের আগের টোকেনগুলো (optional)
   * @returns মেয়াদ উত্তীর্ণ টোকেনগুলোর অ্যারে
   */
  findExpiredTokens(olderThan?: Date): Promise<RefreshToken[]>;

  /**
   * মেয়াদ উত্তীর্ণ রিফ্রেশ টোকেন ডিলিট করে
   * @param olderThan - এই তারিখের আগের টোকেনগুলো (optional)
   * @returns ডিলিট করা টোকেনের সংখ্যা
   */
  deleteExpiredTokens(olderThan?: Date): Promise<number>;

  /**
   * একটি ফ্যামিলির সর্বশেষ রিফ্রেশ টোকেন খুঁজে বের করে
   * @param familyId - টোকেন ফ্যামিলি আইডি
   * @returns পাওয়া গেলে RefreshToken, না পেলে null
   */
  findLatestByFamilyId(familyId: string): Promise<RefreshToken | null>;

  /**
   * একটি টোকেন রোটেট (ঘোরানো) করে নতুন টোকেন তৈরি করে
   * @param oldTokenId - পুরানো টোকেনের আইডি
   * @param newToken - নতুন টোকেন (Token Value Object)
   * @param newExpiresAt - নতুন মেয়াদ শেষের সময়
   * @returns নতুন RefreshToken
   */
  rotateToken(oldTokenId: string, newToken: Token, newExpiresAt: Date): Promise<RefreshToken>;

  /**
   * একটি ফ্যামিলির টোকেন কাউন্ট করে
   * @param familyId - টোকেন ফ্যামিলি আইডি
   * @returns মোট টোকেন সংখ্যা
   */
  countByFamilyId(familyId: string): Promise<number>;

  /**
   * একটি ইউজারের টোকেন কাউন্ট করে
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @returns মোট টোকেন সংখ্যা
   */
  countByUserId(userId: UserId): Promise<number>;

  /**
   * একটি টোকেন ফ্যামিলি তৈরি করে
   * @param familyId - টোকেন ফ্যামিলি আইডি
   * @param userId - ইউজারের আইডি (UserId Value Object)
   * @param maxRotations - সর্বোচ্চ রোটেশন সংখ্যা
   * @returns তৈরি করা TokenFamily
   */
  createTokenFamily(familyId: string, userId: UserId, maxRotations: number): Promise<TokenFamily>;

  /**
   * একটি টোকেন ফ্যামিলি খুঁজে বের করে
   * @param familyId - টোকেন ফ্যামিলি আইডি
   * @returns পাওয়া গেলে TokenFamily, না পেলে null
   */
  findTokenFamily(familyId: string): Promise<TokenFamily | null>;

  /**
   * একটি টোকেন ফ্যামিলি আপডেট করে
   * @param familyId - টোকেন ফ্যামিলি আইডি
   * @param updates - আপডেট করা ডেটা
   * @returns আপডেট করা TokenFamily বা null
   */
  updateTokenFamily(familyId: string, updates: Partial<TokenFamily>): Promise<TokenFamily | null>;

  /**
   * একটি টোকেন ফ্যামিলি ডিলিট করে
   * @param familyId - টোকেন ফ্যামিলি আইডি
   * @returns ডিলিট সফল হলে true, না হলে false
   */
  deleteTokenFamily(familyId: string): Promise<boolean>;

  /**
   * একটি টোকেন বৈধ কিনা চেক করে (মেয়াদ শেষ হয়নি এবং রিভোক করা হয়নি)
   * @param tokenId - টোকেন আইডি
   * @returns true যদি বৈধ হয়, false যদি না হয়
   */
  isValidToken(tokenId: string): Promise<boolean>;

  /**
   * একটি টোকেনের মেয়াদ শেষের সময় আপডেট করে
   * @param tokenId - টোকেন আইডি
   * @param newExpiresAt - নতুন মেয়াদ শেষের সময়
   * @returns আপডেট করা RefreshToken বা null
   */
  updateExpiry(tokenId: string, newExpiresAt: Date): Promise<RefreshToken | null>;
}
