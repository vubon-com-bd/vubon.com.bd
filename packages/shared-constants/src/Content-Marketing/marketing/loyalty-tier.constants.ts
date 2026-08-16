/**
 * লয়্যালটি টায়ার সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * লয়্যালটির সব টায়ার
 */
export const LOYALTY_TIERS = ['bronze', 'silver', 'gold', 'platinum', 'diamond'] as const;

/**
 * প্রতিটি টায়ারের সুবিধা (বাংলা এবং ইংরেজি)
 */
export const TIER_BENEFITS = {
  bronze: {
    en: ['Basic loyalty points', 'Birthday bonus', 'Early access to sales'],
    bn: ['মৌলিক লয়্যালটি পয়েন্ট', 'জন্মদিনের বোনাস', 'সেলের আগে অ্যাক্সেস'],
  },
  silver: {
    en: ['5% discount on all purchases', 'Free shipping', 'Priority support'],
    bn: ['সব ক্রয়ে ৫% ডিসকাউন্ট', 'ফ্রি শিপিং', 'প্রায়োরিটি সাপোর্ট'],
  },
  gold: {
    en: [
      '10% discount on all purchases',
      'Free express shipping',
      'Exclusive offers',
      'Dedicated support',
    ],
    bn: [
      'সব ক্রয়ে ১০% ডিসকাউন্ট',
      'ফ্রি এক্সপ্রেস শিপিং',
      'এক্সক্লুসিভ অফার',
      'ডেডিকেটেড সাপোর্ট',
    ],
  },
  platinum: {
    en: [
      '15% discount on all purchases',
      'Free express shipping',
      'Early access to new products',
      'Personal shopper',
      'VIP events',
    ],
    bn: [
      'সব ক্রয়ে ১৫% ডিসকাউন্ট',
      'ফ্রি এক্সপ্রেস শিপিং',
      'নতুন পণ্যে আগে অ্যাক্সেস',
      'পার্সোনাল শপার',
      'ভিআইপি ইভেন্ট',
    ],
  },
  diamond: {
    en: [
      '20% discount on all purchases',
      'Free express shipping',
      'Early access to new products',
      'Personal shopper',
      'VIP events',
      'Exclusive gifts',
      'Lifetime status',
    ],
    bn: [
      'সব ক্রয়ে ২০% ডিসকাউন্ট',
      'ফ্রি এক্সপ্রেস শিপিং',
      'নতুন পণ্যে আগে অ্যাক্সেস',
      'পার্সোনাল শপার',
      'ভিআইপি ইভেন্ট',
      'এক্সক্লুসিভ গিফট',
      'আজীবন স্ট্যাটাস',
    ],
  },
} as const satisfies Record<(typeof LOYALTY_TIERS)[number], { en: string[]; bn: string[] }>;

/**
 * টায়ার আপগ্রেডের জন্য প্রয়োজনীয় পয়েন্ট
 */
export const TIER_UPGRADE_REQUIREMENTS = {
  bronze: 0,
  silver: 500,
  gold: 2000,
  platinum: 5000,
  diamond: 10000,
} as const satisfies Record<(typeof LOYALTY_TIERS)[number], number>;

/**
 * প্রতিটি টায়ারের ডিসকাউন্ট রেট
 */
export const TIER_DISCOUNT_RATES = {
  bronze: 0,
  silver: 5,
  gold: 10,
  platinum: 15,
  diamond: 20,
} as const satisfies Record<(typeof LOYALTY_TIERS)[number], number>;

/**
 * লয়্যালটি টায়ার টাইপ
 */
export type LoyaltyTier = (typeof LOYALTY_TIERS)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট টায়ারের নাম পাওয়ার ফাংশন
 */
export function getTierName(tier: LoyaltyTier): string {
  const names: Record<LoyaltyTier, string> = {
    bronze: 'Bronze',
    silver: 'Silver',
    gold: 'Gold',
    platinum: 'Platinum',
    diamond: 'Diamond',
  };
  return names[tier];
}

/**
 * নির্দিষ্ট টায়ারের নাম (বাংলা) পাওয়ার ফাংশন
 */
export function getTierNameBn(tier: LoyaltyTier): string {
  const names: Record<LoyaltyTier, string> = {
    bronze: 'ব্রোঞ্জ',
    silver: 'সিলভার',
    gold: 'গোল্ড',
    platinum: 'প্লাটিনাম',
    diamond: 'ডায়মন্ড',
  };
  return names[tier];
}

/**
 * নির্দিষ্ট টায়ারের সুবিধা পাওয়ার ফাংশন
 */
export function getTierBenefits(tier: LoyaltyTier, lang: Language = 'en'): string[] {
  return TIER_BENEFITS[tier][lang];
}

/**
 * নির্দিষ্ট টায়ারের জন্য প্রয়োজনীয় পয়েন্ট পাওয়ার ফাংশন
 */
export function getTierUpgradeRequirement(tier: LoyaltyTier): number {
  return TIER_UPGRADE_REQUIREMENTS[tier];
}

/**
 * নির্দিষ্ট টায়ারের ডিসকাউন্ট রেট পাওয়ার ফাংশন
 */
export function getTierDiscountRate(tier: LoyaltyTier): number {
  return TIER_DISCOUNT_RATES[tier];
}

/**
 * সব লয়্যালটি টায়ারের তালিকা পাওয়ার ফাংশন
 */
export function getAllTiers(): readonly LoyaltyTier[] {
  return LOYALTY_TIERS;
}

/**
 * লয়্যালটি টায়ার বৈধ কিনা চেক করার ফাংশন
 */
export function isValidTier(tier: string): tier is LoyaltyTier {
  return LOYALTY_TIERS.includes(tier as LoyaltyTier);
}

/**
 * পয়েন্টের ভিত্তিতে টায়ার নির্ধারণ করার ফাংশন
 */
export function determineTierFromPoints(points: number): LoyaltyTier {
  if (points >= 10000) return 'diamond';
  if (points >= 5000) return 'platinum';
  if (points >= 2000) return 'gold';
  if (points >= 500) return 'silver';
  return 'bronze';
}

/**
 * পরবর্তী টায়ার পাওয়ার ফাংশন
 */
export function getNextTier(currentTier: LoyaltyTier): LoyaltyTier | null {
  const tiers = LOYALTY_TIERS;
  const currentIndex = tiers.indexOf(currentTier);
  if (currentIndex === tiers.length - 1) {
    return null;
  }
  return tiers[currentIndex + 1];
}

/**
 * পরবর্তী টায়ারের জন্য প্রয়োজনীয় পয়েন্ট পাওয়ার ফাংশন
 */
export function getPointsToNextTier(currentTier: LoyaltyTier): number {
  const nextTier = getNextTier(currentTier);
  if (!nextTier) return 0;
  return TIER_UPGRADE_REQUIREMENTS[nextTier];
}

/**
 * টায়ারের আইকন পাওয়ার ফাংশন
 */
export function getTierIcon(tier: LoyaltyTier): string {
  const icons: Record<LoyaltyTier, string> = {
    bronze: '🥉',
    silver: '🥈',
    gold: '🥇',
    platinum: '💎',
    diamond: '👑',
  };
  return icons[tier];
}

/**
 * টায়ারের রঙ পাওয়ার ফাংশন
 */
export function getTierColor(tier: LoyaltyTier): string {
  const colors: Record<LoyaltyTier, string> = {
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    gold: '#FFD700',
    platinum: '#E5E4E2',
    diamond: '#B9F2FF',
  };
  return colors[tier];
}

/**
 * টায়ারের বিবরণ পাওয়ার ফাংশন
 */
export function getTierDescription(tier: LoyaltyTier, lang: Language = 'en'): string {
  const descriptions: Record<LoyaltyTier, { en: string; bn: string }> = {
    bronze: {
      en: 'Entry level tier for new members',
      bn: 'নতুন সদস্যদের জন্য প্রাথমিক স্তর',
    },
    silver: {
      en: 'Mid-level tier with better benefits',
      bn: 'মাঝারি স্তরের টায়ার যা ভালো সুবিধা দেয়',
    },
    gold: {
      en: 'High-level tier with premium benefits',
      bn: 'উচ্চ স্তরের টায়ার যা প্রিমিয়াম সুবিধা দেয়',
    },
    platinum: {
      en: 'Premium tier with exclusive benefits',
      bn: 'প্রিমিয়াম টায়ার যা এক্সক্লুসিভ সুবিধা দেয়',
    },
    diamond: {
      en: 'Top-tier with the best benefits and lifetime status',
      bn: 'সর্বোচ্চ টায়ার যা সেরা সুবিধা এবং আজীবন স্ট্যাটাস দেয়',
    },
  };
  return descriptions[tier][lang];
}
