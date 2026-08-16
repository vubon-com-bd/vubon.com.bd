/**
 * লয়্যালটি ম্যানেজমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * লয়্যালটি ম্যানেজমেন্ট মডিউলের নাম
 */
export const LOYALTY_MODULE_NAME = 'Loyalty Management';

/**
 * লয়্যালটির ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_LOYALTY_STATUS = 'active' as const;

/**
 * প্রতি ক্রয়ে পয়েন্ট
 */
export const POINTS_PER_PURCHASE = 1;

/**
 * পয়েন্ট রিডেম্পশন রেট (1 পয়েন্ট = 0.01 ইউনিট)
 */
export const POINTS_REDEMPTION_RATE = 0.01;

/**
 * লয়্যালটি স্ট্যাটাস টাইপ
 */
export type LoyaltyStatus = typeof DEFAULT_LOYALTY_STATUS;

/**
 * লয়্যালটি টিয়ার লেভেল
 */
export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'platinum';

/**
 * লয়্যালটি ইন্টারফেস
 */
export interface LoyaltyInterface {
  id: string;
  userId: string;
  points: number;
  tier: LoyaltyTier;
  status: LoyaltyStatus;
  totalPurchases: number;
  totalSpent: number;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
  metadata?: LoyaltyMetadata;
}

/**
 * লয়্যালটি মেটাডেটা ইন্টারফেস
 */
export interface LoyaltyMetadata {
  lastActivityDate?: Date;
  referralCount?: number;
  favoriteCategory?: string;
  preferences?: string[];
}

/**
 * লয়্যালটি তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateLoyaltyInput {
  userId: string;
  points?: number;
  tier?: LoyaltyTier;
  totalPurchases?: number;
  totalSpent?: number;
  metadata?: LoyaltyMetadata;
}

/**
 * লয়্যালটি আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateLoyaltyInput {
  points?: number;
  tier?: LoyaltyTier;
  status?: LoyaltyStatus;
  totalPurchases?: number;
  totalSpent?: number;
  metadata?: LoyaltyMetadata;
}

/**
 * লয়্যালটি ফিল্টার ইন্টারফেস
 */
export interface LoyaltyFilter {
  userId?: string;
  status?: LoyaltyStatus;
  tier?: LoyaltyTier;
  minPoints?: number;
  maxPoints?: number;
  minSpent?: number;
  maxSpent?: number;
  fromDate?: Date;
  toDate?: Date;
  limit?: number;
  offset?: number;
}

/**
 * লয়্যালটি স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidLoyaltyStatus(status: string): status is LoyaltyStatus {
  return status === 'active';
}

/**
 * লয়্যালটি টিয়ার বৈধ কিনা চেক করার ফাংশন
 */
export function isValidLoyaltyTier(tier: string): tier is LoyaltyTier {
  return ['bronze', 'silver', 'gold', 'platinum'].includes(tier);
}

/**
 * টিয়ারের নাম পাওয়ার ফাংশন
 */
export function getTierName(tier: LoyaltyTier): string {
  const names: Record<LoyaltyTier, string> = {
    bronze: 'Bronze',
    silver: 'Silver',
    gold: 'Gold',
    platinum: 'Platinum',
  };
  return names[tier];
}

/**
 * টিয়ারের প্রয়োজনীয় পয়েন্ট পাওয়ার ফাংশন
 */
export function getTierRequiredPoints(tier: LoyaltyTier): number {
  const requirements: Record<LoyaltyTier, number> = {
    bronze: 0,
    silver: 500,
    gold: 2000,
    platinum: 5000,
  };
  return requirements[tier];
}

/**
 * টিয়ারের ডিসকাউন্ট রেট পাওয়ার ফাংশন
 */
export function getTierDiscountRate(tier: LoyaltyTier): number {
  const rates: Record<LoyaltyTier, number> = {
    bronze: 0,
    silver: 5,
    gold: 10,
    platinum: 15,
  };
  return rates[tier];
}

/**
 * টিয়ারের আইকন পাওয়ার ফাংশন
 */
export function getTierIcon(tier: LoyaltyTier): string {
  const icons: Record<LoyaltyTier, string> = {
    bronze: '🥉',
    silver: '🥈',
    gold: '🥇',
    platinum: '💎',
  };
  return icons[tier];
}

/**
 * পয়েন্ট যোগ করার ফাংশন
 */
export function addPoints(loyalty: LoyaltyInterface, points: number): LoyaltyInterface {
  return {
    ...loyalty,
    points: loyalty.points + points,
    updatedAt: new Date(),
  };
}

/**
 * পয়েন্ট রিডিম করার ফাংশন
 */
export function redeemPoints(loyalty: LoyaltyInterface, points: number): LoyaltyInterface {
  if (points > loyalty.points) {
    throw new Error('Insufficient points');
  }
  return {
    ...loyalty,
    points: loyalty.points - points,
    updatedAt: new Date(),
  };
}

/**
 * পয়েন্ট থেকে মান গণনা করার ফাংশন
 */
export function calculateValueFromPoints(points: number): number {
  return points * POINTS_REDEMPTION_RATE;
}

/**
 * মান থেকে পয়েন্ট গণনা করার ফাংশন
 */
export function calculatePointsFromValue(value: number): number {
  return Math.round(value / POINTS_REDEMPTION_RATE);
}

/**
 * টিয়ার নির্ধারণ করার ফাংশন
 */
export function determineTier(points: number): LoyaltyTier {
  if (points >= 5000) return 'platinum';
  if (points >= 2000) return 'gold';
  if (points >= 500) return 'silver';
  return 'bronze';
}

/**
 * লয়্যালটি সক্রিয় কিনা চেক করার ফাংশন
 */
export function isLoyaltyActive(loyalty: LoyaltyInterface): boolean {
  return loyalty.status === 'active';
}

/**
 * লয়্যালটির পয়েন্ট বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPoints(points: number): boolean {
  return typeof points === 'number' && points >= 0 && points <= 1000000;
}

/**
 * ডিফল্ট লয়্যালটি স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultLoyaltyStatus(): LoyaltyStatus {
  return DEFAULT_LOYALTY_STATUS;
}

/**
 * সব লয়্যালটি টিয়ারের তালিকা পাওয়ার ফাংশন
 */
export function getAllTiers(): LoyaltyTier[] {
  return ['bronze', 'silver', 'gold', 'platinum'];
}

/**
 * টিয়ারের বিবরণ পাওয়ার ফাংশন
 */
export function getTierDescription(tier: LoyaltyTier): string {
  const descriptions: Record<LoyaltyTier, string> = {
    bronze: 'Entry level tier',
    silver: 'Mid level tier with benefits',
    gold: 'High level tier with premium benefits',
    platinum: 'Top tier with exclusive benefits',
  };
  return descriptions[tier];
}
