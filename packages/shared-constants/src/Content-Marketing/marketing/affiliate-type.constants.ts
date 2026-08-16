/**
 * অ্যাফিলিয়েটের ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * অ্যাফিলিয়েটের সব ধরন
 */
export const AFFILIATE_TYPES = ['individual', 'business', 'influencer'] as const;

/**
 * প্রতিটি টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const AFFILIATE_TYPE_LABELS = {
  individual: {
    en: 'Individual',
    bn: 'ব্যক্তি',
  },
  business: {
    en: 'Business',
    bn: 'ব্যবসা',
  },
  influencer: {
    en: 'Influencer',
    bn: 'ইনফ্লুয়েন্সার',
  },
} as const satisfies Record<(typeof AFFILIATE_TYPES)[number], { en: string; bn: string }>;

/**
 * অ্যাফিলিয়েট টাইপ টাইপ
 */
export type AffiliateType = (typeof AFFILIATE_TYPES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getAffiliateTypeLabel(type: AffiliateType, lang: Language = 'en'): string {
  return AFFILIATE_TYPE_LABELS[type][lang];
}

/**
 * সব অ্যাফিলিয়েট টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllAffiliateTypes(): readonly AffiliateType[] {
  return AFFILIATE_TYPES;
}

/**
 * অ্যাফিলিয়েট টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidAffiliateType(type: string): type is AffiliateType {
  return AFFILIATE_TYPES.includes(type as AffiliateType);
}

/**
 * টাইপ ইনডিভিজুয়াল কিনা চেক করার ফাংশন
 */
export function isIndividualAffiliateType(type: AffiliateType): boolean {
  return type === 'individual';
}

/**
 * টাইপ বিজনেস কিনা চেক করার ফাংশন
 */
export function isBusinessAffiliateType(type: AffiliateType): boolean {
  return type === 'business';
}

/**
 * টাইপ ইনফ্লুয়েন্সার কিনা চেক করার ফাংশন
 */
export function isInfluencerAffiliateType(type: AffiliateType): boolean {
  return type === 'influencer';
}

/**
 * টাইপ কর্পোরেট কিনা চেক করার ফাংশন (ব্যবসা বা ইনফ্লুয়েন্সার)
 */
export function isCorporateAffiliateType(type: AffiliateType): boolean {
  return type === 'business' || type === 'influencer';
}

/**
 * ডিফল্ট অ্যাফিলিয়েট টাইপ পাওয়ার ফাংশন
 */
export function getDefaultAffiliateType(): AffiliateType {
  return 'individual';
}

/**
 * টাইপের আইকন পাওয়ার ফাংশন
 */
export function getAffiliateTypeIcon(type: AffiliateType): string {
  const icons: Record<AffiliateType, string> = {
    individual: '👤',
    business: '🏢',
    influencer: '⭐',
  };
  return icons[type];
}

/**
 * টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getAffiliateTypeDescription(type: AffiliateType, lang: Language = 'en'): string {
  const descriptions: Record<AffiliateType, { en: string; bn: string }> = {
    individual: {
      en: 'Individual person promoting products or services',
      bn: 'ব্যক্তি যিনি পণ্য বা সেবা প্রচার করেন',
    },
    business: {
      en: 'Business entity promoting products or services',
      bn: 'ব্যবসা প্রতিষ্ঠান যা পণ্য বা সেবা প্রচার করে',
    },
    influencer: {
      en: 'Social media influencer with audience reach',
      bn: 'সোশ্যাল মিডিয়া ইনফ্লুয়েন্সার যার দর্শক রয়েছে',
    },
  };
  return descriptions[type][lang];
}
