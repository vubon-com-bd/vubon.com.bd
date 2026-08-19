/**
 * ভেন্ডার টায়ার বা লেভেল সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * ভেন্ডার টায়ার অবজেক্ট
 */
export const VendorTier = {
  BRONZE: 'BRONZE',
  SILVER: 'SILVER',
  GOLD: 'GOLD',
  PLATINUM: 'PLATINUM',
  DIAMOND: 'DIAMOND',
} as const;

/**
 * ভেন্ডার টায়ার - ইউনিয়ন টাইপ
 */
export type VendorTierValue = (typeof VendorTier)[keyof typeof VendorTier];

/**
 * ভেন্ডার টায়ার লেবেলসমূহ
 */
export const VendorTierLabels: Record<VendorTierValue, { en: string; bn: string }> = {
  [VendorTier.BRONZE]: {
    en: 'Bronze',
    bn: 'ব্রোঞ্জ',
  },
  [VendorTier.SILVER]: {
    en: 'Silver',
    bn: 'সিলভার',
  },
  [VendorTier.GOLD]: {
    en: 'Gold',
    bn: 'গোল্ড',
  },
  [VendorTier.PLATINUM]: {
    en: 'Platinum',
    bn: 'প্লাটিনাম',
  },
  [VendorTier.DIAMOND]: {
    en: 'Diamond',
    bn: 'ডায়মন্ড',
  },
};

/**
 * প্রতিটি টায়ারের জন্য প্রয়োজনীয় পয়েন্ট থ্রেশহোল্ড
 */
export const VendorTierThresholds: Record<VendorTierValue, number> = {
  [VendorTier.BRONZE]: 0,
  [VendorTier.SILVER]: 1000,
  [VendorTier.GOLD]: 5000,
  [VendorTier.PLATINUM]: 15000,
  [VendorTier.DIAMOND]: 50000,
};

/**
 * প্রতিটি টায়ারের জন্য প্রয়োজনীয় সেলস থ্রেশহোল্ড (মাসিক)
 */
export const VendorTierSalesThresholds: Record<VendorTierValue, number> = {
  [VendorTier.BRONZE]: 0,
  [VendorTier.SILVER]: 500,
  [VendorTier.GOLD]: 2000,
  [VendorTier.PLATINUM]: 8000,
  [VendorTier.DIAMOND]: 25000,
};

/**
 * প্রতিটি টায়ারের সুবিধাসমূহ
 */
export const VendorTierBenefits: Record<VendorTierValue, string[]> = {
  [VendorTier.BRONZE]: ['Basic profile visibility', 'Standard support', '1 featured product slot'],
  [VendorTier.SILVER]: [
    'Enhanced profile visibility',
    'Priority support',
    '3 featured product slots',
    '5% commission discount',
  ],
  [VendorTier.GOLD]: [
    'Premium profile visibility',
    '24/7 dedicated support',
    '10 featured product slots',
    '10% commission discount',
    'Free promotional campaigns',
  ],
  [VendorTier.PLATINUM]: [
    'Top profile visibility',
    '24/7 VIP support',
    '25 featured product slots',
    '15% commission discount',
    'Free promotional campaigns',
    'Early access to new features',
  ],
  [VendorTier.DIAMOND]: [
    'Exclusive profile visibility',
    '24/7 VIP support',
    'Unlimited featured products',
    '20% commission discount',
    'Free promotional campaigns',
    'Early access to new features',
    'Invitation to exclusive events',
  ],
};

/**
 * প্রতিটি টায়ারের জন্য কমিশন রেট (শতকরা)
 */
export const VendorTierCommissionRates: Record<VendorTierValue, number> = {
  [VendorTier.BRONZE]: 15,
  [VendorTier.SILVER]: 12,
  [VendorTier.GOLD]: 10,
  [VendorTier.PLATINUM]: 8,
  [VendorTier.DIAMOND]: 5,
};

/**
 * টায়ার আপগ্রেড করার জন্য প্রয়োজনীয় সময় (দিন)
 */
export const VendorTierUpgradeCooldownDays = 30;

/**
 * টায়ার ডাউনগ্রেড করার জন্য প্রয়োজনীয় সময় (দিন)
 */
export const VendorTierDowngradeCooldownDays = 60;

/**
 * টায়ার অনুযায়ী সর্বোচ্চ পণ্য সংখ্যা
 */
export const VendorTierMaxProducts: Record<VendorTierValue, number> = {
  [VendorTier.BRONZE]: 50,
  [VendorTier.SILVER]: 200,
  [VendorTier.GOLD]: 500,
  [VendorTier.PLATINUM]: 1000,
  [VendorTier.DIAMOND]: 5000,
};

/**
 * টায়ার অনুযায়ী ডিসকাউন্ট রেট (শতকরা)
 */
export const VendorTierDiscountRates: Record<VendorTierValue, number> = {
  [VendorTier.BRONZE]: 0,
  [VendorTier.SILVER]: 5,
  [VendorTier.GOLD]: 10,
  [VendorTier.PLATINUM]: 15,
  [VendorTier.DIAMOND]: 20,
};
