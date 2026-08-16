/**
 * লয়্যালটি রিওয়ার্ড সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * রিওয়ার্ড ক্যাটাগরি
 */
export const REWARD_CATEGORIES = ['discount', 'free-product', 'shipping', 'exclusive'] as const;

/**
 * রিওয়ার্ড উপলব্ধতা
 */
export const REWARD_AVAILABILITY = ['always', 'limited-time', 'limited-quantity'] as const;

/**
 * রিওয়ার্ড ক্যাটাগরি টাইপ
 */
export type RewardCategory = (typeof REWARD_CATEGORIES)[number];

/**
 * রিওয়ার্ড উপলব্ধতা টাইপ
 */
export type RewardAvailability = (typeof REWARD_AVAILABILITY)[number];

/**
 * প্রতিটি ক্যাটাগরির লেবেল (বাংলা এবং ইংরেজি)
 */
export const REWARD_CATEGORY_LABELS = {
  discount: {
    en: 'Discount',
    bn: 'ডিসকাউন্ট',
  },
  'free-product': {
    en: 'Free Product',
    bn: 'ফ্রি পণ্য',
  },
  shipping: {
    en: 'Free Shipping',
    bn: 'ফ্রি শিপিং',
  },
  exclusive: {
    en: 'Exclusive Access',
    bn: 'এক্সক্লুসিভ অ্যাক্সেস',
  },
} as const satisfies Record<RewardCategory, { en: string; bn: string }>;

/**
 * প্রতিটি উপলব্ধতার লেবেল (বাংলা এবং ইংরেজি)
 */
export const REWARD_AVAILABILITY_LABELS = {
  always: {
    en: 'Always Available',
    bn: 'সর্বদা উপলব্ধ',
  },
  'limited-time': {
    en: 'Limited Time',
    bn: 'নির্দিষ্ট সময়ের জন্য',
  },
  'limited-quantity': {
    en: 'Limited Quantity',
    bn: 'সীমিত পরিমাণ',
  },
} as const satisfies Record<RewardAvailability, { en: string; bn: string }>;

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * রিওয়ার্ড ইন্টারফেস
 */
export interface RewardInterface {
  id: string;
  name: string;
  description: string;
  category: RewardCategory;
  availability: RewardAvailability;
  pointsRequired: number;
  quantity?: number;
  expiresAt?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  metadata?: RewardMetadata;
}

/**
 * রিওয়ার্ড মেটাডেটা ইন্টারফেস
 */
export interface RewardMetadata {
  discountPercentage?: number;
  discountAmount?: number;
  productId?: string;
  productName?: string;
  shippingType?: 'standard' | 'express';
  exclusiveAccess?: string;
  termsAndConditions?: string;
  imageUrl?: string;
}

/**
 * রিওয়ার্ড তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateRewardInput {
  name: string;
  description: string;
  category: RewardCategory;
  availability: RewardAvailability;
  pointsRequired: number;
  quantity?: number;
  expiresAt?: Date;
  metadata?: RewardMetadata;
}

/**
 * রিওয়ার্ড আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateRewardInput {
  name?: string;
  description?: string;
  category?: RewardCategory;
  availability?: RewardAvailability;
  pointsRequired?: number;
  quantity?: number;
  expiresAt?: Date;
  isActive?: boolean;
  metadata?: RewardMetadata;
}

/**
 * রিওয়ার্ড ফিল্টার ইন্টারফেস
 */
export interface RewardFilter {
  category?: RewardCategory;
  availability?: RewardAvailability;
  minPoints?: number;
  maxPoints?: number;
  isActive?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}

/**
 * নির্দিষ্ট ক্যাটাগরির লেবেল পাওয়ার ফাংশন
 */
export function getRewardCategoryLabel(category: RewardCategory, lang: Language = 'en'): string {
  return REWARD_CATEGORY_LABELS[category][lang];
}

/**
 * নির্দিষ্ট উপলব্ধতার লেবেল পাওয়ার ফাংশন
 */
export function getRewardAvailabilityLabel(
  availability: RewardAvailability,
  lang: Language = 'en'
): string {
  return REWARD_AVAILABILITY_LABELS[availability][lang];
}

/**
 * সব রিওয়ার্ড ক্যাটাগরি পাওয়ার ফাংশন
 */
export function getAllRewardCategories(): readonly RewardCategory[] {
  return REWARD_CATEGORIES;
}

/**
 * সব রিওয়ার্ড উপলব্ধতা পাওয়ার ফাংশন
 */
export function getAllRewardAvailabilities(): readonly RewardAvailability[] {
  return REWARD_AVAILABILITY;
}

/**
 * রিওয়ার্ড ক্যাটাগরি বৈধ কিনা চেক করার ফাংশন
 */
export function isValidRewardCategory(category: string): category is RewardCategory {
  return REWARD_CATEGORIES.includes(category as RewardCategory);
}

/**
 * রিওয়ার্ড উপলব্ধতা বৈধ কিনা চেক করার ফাংশন
 */
export function isValidRewardAvailability(
  availability: string
): availability is RewardAvailability {
  return REWARD_AVAILABILITY.includes(availability as RewardAvailability);
}

/**
 * রিওয়ার্ড উপলব্ধ কিনা চেক করার ফাংশন
 */
export function isRewardAvailable(reward: RewardInterface): boolean {
  if (!reward.isActive) return false;

  if (reward.availability === 'limited-time' && reward.expiresAt) {
    return new Date() <= reward.expiresAt;
  }

  if (reward.availability === 'limited-quantity' && reward.quantity !== undefined) {
    return reward.quantity > 0;
  }

  return true;
}

/**
 * রিওয়ার্ড রিডিম করার ফাংশন
 */
export function redeemReward(reward: RewardInterface): RewardInterface {
  if (!isRewardAvailable(reward)) {
    throw new Error('Reward is not available');
  }

  const updatedReward = { ...reward };
  if (reward.availability === 'limited-quantity' && reward.quantity !== undefined) {
    updatedReward.quantity = Math.max(0, reward.quantity - 1);
    if (updatedReward.quantity === 0) {
      updatedReward.isActive = false;
    }
  }

  return updatedReward;
}

/**
 * রিওয়ার্ডের আইকন পাওয়ার ফাংশন
 */
export function getRewardCategoryIcon(category: RewardCategory): string {
  const icons: Record<RewardCategory, string> = {
    discount: '🏷️',
    'free-product': '🎁',
    shipping: '🚚',
    exclusive: '⭐',
  };
  return icons[category];
}

/**
 * রিওয়ার্ডের রঙ পাওয়ার ফাংশন
 */
export function getRewardCategoryColor(category: RewardCategory): string {
  const colors: Record<RewardCategory, string> = {
    discount: '#3B82F6',
    'free-product': '#10B981',
    shipping: '#8B5CF6',
    exclusive: '#F59E0B',
  };
  return colors[category];
}

/**
 * রিওয়ার্ডের বিবরণ পাওয়ার ফাংশন
 */
export function getRewardCategoryDescription(
  category: RewardCategory,
  lang: Language = 'en'
): string {
  const descriptions: Record<RewardCategory, { en: string; bn: string }> = {
    discount: {
      en: 'Get discounts on purchases',
      bn: 'ক্রয়ে ডিসকাউন্ট পান',
    },
    'free-product': {
      en: 'Get free products',
      bn: 'ফ্রি পণ্য পান',
    },
    shipping: {
      en: 'Get free shipping',
      bn: 'ফ্রি শিপিং পান',
    },
    exclusive: {
      en: 'Get exclusive access or offers',
      bn: 'এক্সক্লুসিভ অ্যাক্সেস বা অফার পান',
    },
  };
  return descriptions[category][lang];
}

/**
 * ডিফল্ট রিওয়ার্ড ক্যাটাগরি পাওয়ার ফাংশন
 */
export function getDefaultRewardCategory(): RewardCategory {
  return 'discount';
}

/**
 * ডিফল্ট রিওয়ার্ড উপলব্ধতা পাওয়ার ফাংশন
 */
export function getDefaultRewardAvailability(): RewardAvailability {
  return 'always';
}
