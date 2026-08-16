/**
 * রেফারেলের ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * রেফারেলের সব ধরন
 */
export const REFERRAL_TYPES = ['user', 'seller', 'affiliate'] as const;

/**
 * প্রতিটি টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const REFERRAL_TYPE_LABELS = {
  user: {
    en: 'User Referral',
    bn: 'ব্যবহারকারী রেফারেল',
  },
  seller: {
    en: 'Seller Referral',
    bn: 'বিক্রেতা রেফারেল',
  },
  affiliate: {
    en: 'Affiliate Referral',
    bn: 'অ্যাফিলিয়েট রেফারেল',
  },
} as const satisfies Record<(typeof REFERRAL_TYPES)[number], { en: string; bn: string }>;

/**
 * রেফারেল টাইপ টাইপ
 */
export type ReferralType = (typeof REFERRAL_TYPES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getReferralTypeLabel(type: ReferralType, lang: Language = 'en'): string {
  return REFERRAL_TYPE_LABELS[type][lang];
}

/**
 * সব রেফারেল টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllReferralTypes(): readonly ReferralType[] {
  return REFERRAL_TYPES;
}

/**
 * রেফারেল টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidReferralType(type: string): type is ReferralType {
  return REFERRAL_TYPES.includes(type as ReferralType);
}

/**
 * টাইপ ইউজার কিনা চেক করার ফাংশন
 */
export function isUserReferralType(type: ReferralType): boolean {
  return type === 'user';
}

/**
 * টাইপ সেলার কিনা চেক করার ফাংশন
 */
export function isSellerReferralType(type: ReferralType): boolean {
  return type === 'seller';
}

/**
 * টাইপ অ্যাফিলিয়েট কিনা চেক করার ফাংশন
 */
export function isAffiliateReferralType(type: ReferralType): boolean {
  return type === 'affiliate';
}

/**
 * টাইপ পার্টনার (সেলার বা অ্যাফিলিয়েট) কিনা চেক করার ফাংশন
 */
export function isPartnerReferralType(type: ReferralType): boolean {
  return type === 'seller' || type === 'affiliate';
}

/**
 * ডিফল্ট রেফারেল টাইপ পাওয়ার ফাংশন
 */
export function getDefaultReferralType(): ReferralType {
  return 'user';
}

/**
 * টাইপের আইকন পাওয়ার ফাংশন
 */
export function getReferralTypeIcon(type: ReferralType): string {
  const icons: Record<ReferralType, string> = {
    user: '👤',
    seller: '🛒',
    affiliate: '🤝',
  };
  return icons[type];
}

/**
 * টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getReferralTypeDescription(type: ReferralType, lang: Language = 'en'): string {
  const descriptions: Record<ReferralType, { en: string; bn: string }> = {
    user: {
      en: 'Referral from regular user',
      bn: 'সাধারণ ব্যবহারকারী থেকে রেফারেল',
    },
    seller: {
      en: 'Referral from seller/vendor',
      bn: 'বিক্রেতা/ভেন্ডর থেকে রেফারেল',
    },
    affiliate: {
      en: 'Referral from affiliate partner',
      bn: 'অ্যাফিলিয়েট পার্টনার থেকে রেফারেল',
    },
  };
  return descriptions[type][lang];
}

/**
 * টাইপের রঙ পাওয়ার ফাংশন
 */
export function getReferralTypeColor(type: ReferralType): string {
  const colors: Record<ReferralType, string> = {
    user: '#3B82F6',
    seller: '#10B981',
    affiliate: '#8B5CF6',
  };
  return colors[type];
}
