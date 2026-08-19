/**
 * ভেন্ডার-শেয়ার্ড কমন কনস্ট্যান্টসমূহ
 * এই কনস্ট্যান্টগুলি অন্যান্য মডিউলেও ব্যবহৃত হয়
 */

/**
 * ভেন্ডার আইডি প্রিফিক্স
 */
export const VENDOR_ID_PREFIX = 'VEN-';

/**
 * ডিফল্ট ভেন্ডার স্ট্যাটাস
 */
export const DEFAULT_VENDOR_STATUS = 'PENDING';

/**
 * ভেন্ডার স্ট্যাটাস লিস্ট
 * অর্ডার, পেমেন্ট, নোটিফিকেশন মডিউল দ্বারা ব্যবহৃত
 */
export const VENDOR_STATUSES = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
  DECLINED: 'DECLINED',
  DELETED: 'DELETED',
} as const;

/**
 * ভেন্ডার স্ট্যাটাস টাইপ
 */
export type VendorStatusType = (typeof VENDOR_STATUSES)[keyof typeof VENDOR_STATUSES];

/**
 * ভেন্ডার স্ট্যাটাস লেবেলসমূহ
 */
export const VENDOR_STATUS_LABELS: Record<VendorStatusType, { en: string; bn: string }> = {
  [VENDOR_STATUSES.PENDING]: {
    en: 'Pending',
    bn: 'অপেক্ষমাণ',
  },
  [VENDOR_STATUSES.ACTIVE]: {
    en: 'Active',
    bn: 'সক্রিয়',
  },
  [VENDOR_STATUSES.INACTIVE]: {
    en: 'Inactive',
    bn: 'নিষ্ক্রিয়',
  },
  [VENDOR_STATUSES.SUSPENDED]: {
    en: 'Suspended',
    bn: 'স্থগিত',
  },
  [VENDOR_STATUSES.DECLINED]: {
    en: 'Declined',
    bn: 'বাতিল',
  },
  [VENDOR_STATUSES.DELETED]: {
    en: 'Deleted',
    bn: 'মুছে ফেলা হয়েছে',
  },
};

/**
 * ভেন্ডার টায়ার লিস্ট
 * ডিসকাউন্ট, কমিশন, ফিচার অ্যাক্সেস মডিউল দ্বারা ব্যবহৃত
 */
export const VENDOR_TIERS = {
  BRONZE: 'BRONZE',
  SILVER: 'SILVER',
  GOLD: 'GOLD',
  PLATINUM: 'PLATINUM',
  DIAMOND: 'DIAMOND',
} as const;

/**
 * ভেন্ডার টায়ার টাইপ
 */
export type VendorTierType = (typeof VENDOR_TIERS)[keyof typeof VENDOR_TIERS];

/**
 * ভেন্ডার টায়ার লেবেলসমূহ
 */
export const VENDOR_TIER_LABELS: Record<VendorTierType, { en: string; bn: string }> = {
  [VENDOR_TIERS.BRONZE]: {
    en: 'Bronze',
    bn: 'ব্রোঞ্জ',
  },
  [VENDOR_TIERS.SILVER]: {
    en: 'Silver',
    bn: 'সিলভার',
  },
  [VENDOR_TIERS.GOLD]: {
    en: 'Gold',
    bn: 'গোল্ড',
  },
  [VENDOR_TIERS.PLATINUM]: {
    en: 'Platinum',
    bn: 'প্লাটিনাম',
  },
  [VENDOR_TIERS.DIAMOND]: {
    en: 'Diamond',
    bn: 'ডায়মন্ড',
  },
};

/**
 * ভেন্ডার টায়ার অর্ডার (নিম্ন থেকে উচ্চ)
 */
export const VENDOR_TIER_ORDER: VendorTierType[] = [
  VENDOR_TIERS.BRONZE,
  VENDOR_TIERS.SILVER,
  VENDOR_TIERS.GOLD,
  VENDOR_TIERS.PLATINUM,
  VENDOR_TIERS.DIAMOND,
] as const;

/**
 * ভেন্ডার কমিশন টাইপ
 * পেমেন্ট/ফাইন্যান্স মডিউল দ্বারা ব্যবহৃত
 */
export const VENDOR_COMMISSION_TYPES = {
  PERCENTAGE: 'PERCENTAGE',
  FIXED: 'FIXED',
  TIERED: 'TIERED',
  HYBRID: 'HYBRID',
} as const;

/**
 * ভেন্ডার কমিশন টাইপ টাইপ
 */
export type VendorCommissionType =
  (typeof VENDOR_COMMISSION_TYPES)[keyof typeof VENDOR_COMMISSION_TYPES];

/**
 * ভেন্ডার কমিশন টাইপ লেবেলসমূহ
 */
export const VENDOR_COMMISSION_TYPE_LABELS: Record<
  VendorCommissionType,
  { en: string; bn: string }
> = {
  [VENDOR_COMMISSION_TYPES.PERCENTAGE]: {
    en: 'Percentage',
    bn: 'শতাংশ',
  },
  [VENDOR_COMMISSION_TYPES.FIXED]: {
    en: 'Fixed',
    bn: 'নির্দিষ্ট',
  },
  [VENDOR_COMMISSION_TYPES.TIERED]: {
    en: 'Tiered',
    bn: 'স্তর ভিত্তিক',
  },
  [VENDOR_COMMISSION_TYPES.HYBRID]: {
    en: 'Hybrid',
    bn: 'মিশ্র',
  },
};

/**
 * ভেন্ডার পেআউট স্ট্যাটাস
 * পেমেন্ট/নোটিফিকেশন মডিউল দ্বারা ব্যবহৃত
 */
export const VENDOR_PAYOUT_STATUSES = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
} as const;

/**
 * ভেন্ডার পেআউট স্ট্যাটাস টাইপ
 */
export type VendorPayoutStatusType =
  (typeof VENDOR_PAYOUT_STATUSES)[keyof typeof VENDOR_PAYOUT_STATUSES];

/**
 * ভেন্ডার পেআউট স্ট্যাটাস লেবেলসমূহ
 */
export const VENDOR_PAYOUT_STATUS_LABELS: Record<
  VendorPayoutStatusType,
  { en: string; bn: string }
> = {
  [VENDOR_PAYOUT_STATUSES.PENDING]: {
    en: 'Pending',
    bn: 'অপেক্ষমাণ',
  },
  [VENDOR_PAYOUT_STATUSES.PROCESSING]: {
    en: 'Processing',
    bn: 'প্রক্রিয়াধীন',
  },
  [VENDOR_PAYOUT_STATUSES.COMPLETED]: {
    en: 'Completed',
    bn: 'সম্পন্ন',
  },
  [VENDOR_PAYOUT_STATUSES.FAILED]: {
    en: 'Failed',
    bn: 'ব্যর্থ',
  },
  [VENDOR_PAYOUT_STATUSES.REFUNDED]: {
    en: 'Refunded',
    bn: 'ফেরত',
  },
};

/**
 * ভেন্ডার ডকুমেন্ট টাইপ
 * ভেরিফিকেশন/অ্যাপ্রুভাল মডিউল দ্বারা ব্যবহৃত
 */
export const VENDOR_DOCUMENT_TYPES = {
  NATIONAL_ID: 'NATIONAL_ID',
  PASSPORT: 'PASSPORT',
  TRADE_LICENSE: 'TRADE_LICENSE',
  TIN_CERTIFICATE: 'TIN_CERTIFICATE',
  BANK_STATEMENT: 'BANK_STATEMENT',
} as const;

/**
 * ভেন্ডার ডকুমেন্ট টাইপ টাইপ
 */
export type VendorDocumentType = (typeof VENDOR_DOCUMENT_TYPES)[keyof typeof VENDOR_DOCUMENT_TYPES];

/**
 * ভেন্ডার ডকুমেন্ট টাইপ লেবেলসমূহ
 */
export const VENDOR_DOCUMENT_TYPE_LABELS: Record<VendorDocumentType, { en: string; bn: string }> = {
  [VENDOR_DOCUMENT_TYPES.NATIONAL_ID]: {
    en: 'National ID',
    bn: 'জাতীয় পরিচয়পত্র',
  },
  [VENDOR_DOCUMENT_TYPES.PASSPORT]: {
    en: 'Passport',
    bn: 'পাসপোর্ট',
  },
  [VENDOR_DOCUMENT_TYPES.TRADE_LICENSE]: {
    en: 'Trade License',
    bn: 'ট্রেড লাইসেন্স',
  },
  [VENDOR_DOCUMENT_TYPES.TIN_CERTIFICATE]: {
    en: 'TIN Certificate',
    bn: 'টিআইএন সার্টিফিকেট',
  },
  [VENDOR_DOCUMENT_TYPES.BANK_STATEMENT]: {
    en: 'Bank Statement',
    bn: 'ব্যাংক স্টেটমেন্ট',
  },
};

/**
 * ভেন্ডার সাবস্ক্রিপশন প্ল্যান
 * বিলিং/ফিচার মডিউল দ্বারা ব্যবহৃত
 */
export const VENDOR_SUBSCRIPTION_PLANS = {
  FREE: 'FREE',
  STARTER: 'STARTER',
  GROWTH: 'GROWTH',
  BUSINESS: 'BUSINESS',
  ENTERPRISE: 'ENTERPRISE',
} as const;

/**
 * ভেন্ডার সাবস্ক্রিপশন প্ল্যান টাইপ
 */
export type VendorSubscriptionPlanType =
  (typeof VENDOR_SUBSCRIPTION_PLANS)[keyof typeof VENDOR_SUBSCRIPTION_PLANS];

/**
 * ভেন্ডার সাবস্ক্রিপশন প্ল্যান লেবেলসমূহ
 */
export const VENDOR_SUBSCRIPTION_PLAN_LABELS: Record<
  VendorSubscriptionPlanType,
  { en: string; bn: string }
> = {
  [VENDOR_SUBSCRIPTION_PLANS.FREE]: {
    en: 'Free',
    bn: 'বিনামূল্যে',
  },
  [VENDOR_SUBSCRIPTION_PLANS.STARTER]: {
    en: 'Starter',
    bn: 'শুরু',
  },
  [VENDOR_SUBSCRIPTION_PLANS.GROWTH]: {
    en: 'Growth',
    bn: 'গ্রোথ',
  },
  [VENDOR_SUBSCRIPTION_PLANS.BUSINESS]: {
    en: 'Business',
    bn: 'ব্যবসা',
  },
  [VENDOR_SUBSCRIPTION_PLANS.ENTERPRISE]: {
    en: 'Enterprise',
    bn: 'এন্টারপ্রাইজ',
  },
};

/**
 * ভেন্ডার সাবস্ক্রিপশন প্ল্যান অর্ডার (নিম্ন থেকে উচ্চ)
 */
export const VENDOR_SUBSCRIPTION_PLAN_ORDER: VendorSubscriptionPlanType[] = [
  VENDOR_SUBSCRIPTION_PLANS.FREE,
  VENDOR_SUBSCRIPTION_PLANS.STARTER,
  VENDOR_SUBSCRIPTION_PLANS.GROWTH,
  VENDOR_SUBSCRIPTION_PLANS.BUSINESS,
  VENDOR_SUBSCRIPTION_PLANS.ENTERPRISE,
] as const;

/**
 * ভেন্ডার ডিফল্ট সেটিংস
 */
export const VENDOR_DEFAULT_SETTINGS = {
  MAX_PRODUCTS_FREE: 10,
  MAX_PRODUCTS_STARTER: 50,
  MAX_PRODUCTS_GROWTH: 200,
  MAX_PRODUCTS_BUSINESS: 500,
  MAX_PRODUCTS_ENTERPRISE: -1, // Unlimited
  DEFAULT_COMMISSION_RATE: 5,
  MIN_PAYOUT_AMOUNT: 100,
  MAX_PAYOUT_AMOUNT: 1000000,
} as const;
