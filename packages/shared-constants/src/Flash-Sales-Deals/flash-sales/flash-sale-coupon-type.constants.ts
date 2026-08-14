/**
 * Flash Sale Coupon Type Constants
 * কুপনের প্রকারভেদ
 */

// কুপন টাইপ এনাম
export const COUPON_TYPE = {
  PERCENTAGE: 'percentage',
  FIXED_AMOUNT: 'fixed_amount',
  FREE_SHIPPING: 'free_shipping',
  BUY_GET: 'buy_get',
  BUNDLE: 'bundle',
  SEASONAL: 'seasonal',
  WELCOME: 'welcome',
  BIRTHDAY: 'birthday',
  ANNIVERSARY: 'anniversary',
  REFERRAL: 'referral',
  LOYALTY: 'loyalty',
  VIP: 'vip',
  LIMITED: 'limited',
  FLASH: 'flash',
  DEAL: 'deal',
  CUSTOM: 'custom',
  SINGLE_USE: 'single_use',
  MULTI_USE: 'multi_use',
  UNLIMITED: 'unlimited',
  CODE_BASED: 'code_based',
  AUTOMATIC: 'automatic',
  MANUAL: 'manual',
} as const;

// কুপন টাইপ টাইপ
export type CouponType = (typeof COUPON_TYPE)[keyof typeof COUPON_TYPE];

// টাইপের লেবেল
export const COUPON_TYPE_LABELS: Record<CouponType, string> = {
  percentage: 'শতকরা',
  fixed_amount: 'নির্দিষ্ট পরিমাণ',
  free_shipping: 'ফ্রি শিপিং',
  buy_get: 'কিনুন ও পান',
  bundle: 'বান্ডেল',
  seasonal: 'মৌসুমি',
  welcome: 'স্বাগতম',
  birthday: 'জন্মদিন',
  anniversary: 'বার্ষিকী',
  referral: 'রেফারেল',
  loyalty: 'লয়ালটি',
  vip: 'ভিআইপি',
  limited: 'সীমিত',
  flash: 'ফ্ল্যাশ',
  deal: 'ডিল',
  custom: 'কাস্টম',
  single_use: 'একবার ব্যবহার',
  multi_use: 'একাধিক ব্যবহার',
  unlimited: 'সীমাহীন',
  code_based: 'কোড ভিত্তিক',
  automatic: 'স্বয়ংক্রিয়',
  manual: 'ম্যানুয়াল',
};

// টাইপের বিবরণ
export const COUPON_TYPE_DESCRIPTIONS: Record<CouponType, string> = {
  percentage: 'শতকরা হারে ডিসকাউন্ট',
  fixed_amount: 'নির্দিষ্ট পরিমাণ টাকা ডিসকাউন্ট',
  free_shipping: 'ডেলিভারি চার্জ ফ্রি',
  buy_get: 'একটি পণ্য কিনলে অন্যটি ফ্রি বা ডিসকাউন্ট',
  bundle: 'একাধিক পণ্য একসাথে কিনলে ডিসকাউন্ট',
  seasonal: 'মৌসুমি বিশেষ অফার',
  welcome: 'নতুন ব্যবহারকারীদের জন্য স্বাগতম অফার',
  birthday: 'জন্মদিনের বিশেষ অফার',
  anniversary: 'বার্ষিকী উপলক্ষে অফার',
  referral: 'রেফারেল করার জন্য অফার',
  loyalty: 'লয়ালটি প্রোগ্রামের অফার',
  vip: 'ভিআইপি ব্যবহারকারীদের জন্য অফার',
  limited: 'সীমিত সময়ের জন্য অফার',
  flash: 'ফ্ল্যাশ সেল অফার',
  deal: 'বিশেষ ডিল অফার',
  custom: 'কাস্টমাইজড অফার',
  single_use: 'শুধুমাত্র একবার ব্যবহারযোগ্য',
  multi_use: 'একাধিকবার ব্যবহারযোগ্য',
  unlimited: 'সীমাহীন ব্যবহারযোগ্য',
  code_based: 'কোড ব্যবহার করে অ্যাক্টিভেট',
  automatic: 'স্বয়ংক্রিয়ভাবে প্রযোজ্য',
  manual: 'ম্যানুয়ালি প্রয়োগ করতে হবে',
};

// টাইপের আইকন
export const COUPON_TYPE_ICONS: Record<CouponType, string> = {
  percentage: 'Percent',
  fixed_amount: 'DollarSign',
  free_shipping: 'Truck',
  buy_get: 'Gift',
  bundle: 'Layers',
  seasonal: 'CloudSun',
  welcome: 'UserPlus',
  birthday: 'Cake',
  anniversary: 'Calendar',
  referral: 'Users',
  loyalty: 'Star',
  vip: 'Crown',
  limited: 'Clock',
  flash: 'Zap',
  deal: 'Tag',
  custom: 'Settings',
  single_use: 'Hash',
  multi_use: 'Repeat',
  unlimited: 'Infinity',
  code_based: 'Code',
  automatic: 'Robot',
  manual: 'Hand',
};

// টাইপের কালার
export const COUPON_TYPE_COLORS: Record<CouponType, string> = {
  percentage: '#3B82F6',
  fixed_amount: '#22C55E',
  free_shipping: '#8B5CF6',
  buy_get: '#EC4899',
  bundle: '#F59E0B',
  seasonal: '#06B6D4',
  welcome: '#10B981',
  birthday: '#EC4899',
  anniversary: '#8B5CF6',
  referral: '#3B82F6',
  loyalty: '#FBBF24',
  vip: '#EC4899',
  limited: '#F97316',
  flash: '#EF4444',
  deal: '#F59E0B',
  custom: '#6366F1',
  single_use: '#6B7280',
  multi_use: '#3B82F6',
  unlimited: '#22C55E',
  code_based: '#8B5CF6',
  automatic: '#06B6D4',
  manual: '#F59E0B',
};

// টাইপ গ্রুপ
export const COUPON_TYPE_GROUPS = {
  DISCOUNT_BASED: ['percentage', 'fixed_amount'] as CouponType[],
  BENEFIT_BASED: ['free_shipping', 'buy_get'] as CouponType[],
  TIME_BASED: ['seasonal', 'flash', 'limited'] as CouponType[],
  USER_BASED: ['welcome', 'birthday', 'anniversary', 'referral', 'loyalty', 'vip'] as CouponType[],
  USAGE_BASED: ['single_use', 'multi_use', 'unlimited'] as CouponType[],
  APPLICATION_BASED: ['code_based', 'automatic', 'manual'] as CouponType[],
  SPECIAL: ['bundle', 'deal', 'custom'] as CouponType[],
} as const;

// টাইপ কনফিগারেশন ইন্টারফেস
export interface CouponTypeConfig {
  type: CouponType;
  label: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
}

// সম্পূর্ণ টাইপ কনফিগারেশন
export const COUPON_TYPE_CONFIGS: Record<CouponType, CouponTypeConfig> = {
  percentage: {
    type: 'percentage',
    label: COUPON_TYPE_LABELS.percentage,
    description: COUPON_TYPE_DESCRIPTIONS.percentage,
    icon: COUPON_TYPE_ICONS.percentage,
    color: COUPON_TYPE_COLORS.percentage,
    isActive: true,
  },
  fixed_amount: {
    type: 'fixed_amount',
    label: COUPON_TYPE_LABELS.fixed_amount,
    description: COUPON_TYPE_DESCRIPTIONS.fixed_amount,
    icon: COUPON_TYPE_ICONS.fixed_amount,
    color: COUPON_TYPE_COLORS.fixed_amount,
    isActive: true,
  },
  free_shipping: {
    type: 'free_shipping',
    label: COUPON_TYPE_LABELS.free_shipping,
    description: COUPON_TYPE_DESCRIPTIONS.free_shipping,
    icon: COUPON_TYPE_ICONS.free_shipping,
    color: COUPON_TYPE_COLORS.free_shipping,
    isActive: true,
  },
  buy_get: {
    type: 'buy_get',
    label: COUPON_TYPE_LABELS.buy_get,
    description: COUPON_TYPE_DESCRIPTIONS.buy_get,
    icon: COUPON_TYPE_ICONS.buy_get,
    color: COUPON_TYPE_COLORS.buy_get,
    isActive: true,
  },
  bundle: {
    type: 'bundle',
    label: COUPON_TYPE_LABELS.bundle,
    description: COUPON_TYPE_DESCRIPTIONS.bundle,
    icon: COUPON_TYPE_ICONS.bundle,
    color: COUPON_TYPE_COLORS.bundle,
    isActive: true,
  },
  seasonal: {
    type: 'seasonal',
    label: COUPON_TYPE_LABELS.seasonal,
    description: COUPON_TYPE_DESCRIPTIONS.seasonal,
    icon: COUPON_TYPE_ICONS.seasonal,
    color: COUPON_TYPE_COLORS.seasonal,
    isActive: true,
  },
  welcome: {
    type: 'welcome',
    label: COUPON_TYPE_LABELS.welcome,
    description: COUPON_TYPE_DESCRIPTIONS.welcome,
    icon: COUPON_TYPE_ICONS.welcome,
    color: COUPON_TYPE_COLORS.welcome,
    isActive: true,
  },
  birthday: {
    type: 'birthday',
    label: COUPON_TYPE_LABELS.birthday,
    description: COUPON_TYPE_DESCRIPTIONS.birthday,
    icon: COUPON_TYPE_ICONS.birthday,
    color: COUPON_TYPE_COLORS.birthday,
    isActive: true,
  },
  anniversary: {
    type: 'anniversary',
    label: COUPON_TYPE_LABELS.anniversary,
    description: COUPON_TYPE_DESCRIPTIONS.anniversary,
    icon: COUPON_TYPE_ICONS.anniversary,
    color: COUPON_TYPE_COLORS.anniversary,
    isActive: true,
  },
  referral: {
    type: 'referral',
    label: COUPON_TYPE_LABELS.referral,
    description: COUPON_TYPE_DESCRIPTIONS.referral,
    icon: COUPON_TYPE_ICONS.referral,
    color: COUPON_TYPE_COLORS.referral,
    isActive: true,
  },
  loyalty: {
    type: 'loyalty',
    label: COUPON_TYPE_LABELS.loyalty,
    description: COUPON_TYPE_DESCRIPTIONS.loyalty,
    icon: COUPON_TYPE_ICONS.loyalty,
    color: COUPON_TYPE_COLORS.loyalty,
    isActive: true,
  },
  vip: {
    type: 'vip',
    label: COUPON_TYPE_LABELS.vip,
    description: COUPON_TYPE_DESCRIPTIONS.vip,
    icon: COUPON_TYPE_ICONS.vip,
    color: COUPON_TYPE_COLORS.vip,
    isActive: true,
  },
  limited: {
    type: 'limited',
    label: COUPON_TYPE_LABELS.limited,
    description: COUPON_TYPE_DESCRIPTIONS.limited,
    icon: COUPON_TYPE_ICONS.limited,
    color: COUPON_TYPE_COLORS.limited,
    isActive: true,
  },
  flash: {
    type: 'flash',
    label: COUPON_TYPE_LABELS.flash,
    description: COUPON_TYPE_DESCRIPTIONS.flash,
    icon: COUPON_TYPE_ICONS.flash,
    color: COUPON_TYPE_COLORS.flash,
    isActive: true,
  },
  deal: {
    type: 'deal',
    label: COUPON_TYPE_LABELS.deal,
    description: COUPON_TYPE_DESCRIPTIONS.deal,
    icon: COUPON_TYPE_ICONS.deal,
    color: COUPON_TYPE_COLORS.deal,
    isActive: true,
  },
  custom: {
    type: 'custom',
    label: COUPON_TYPE_LABELS.custom,
    description: COUPON_TYPE_DESCRIPTIONS.custom,
    icon: COUPON_TYPE_ICONS.custom,
    color: COUPON_TYPE_COLORS.custom,
    isActive: true,
  },
  single_use: {
    type: 'single_use',
    label: COUPON_TYPE_LABELS.single_use,
    description: COUPON_TYPE_DESCRIPTIONS.single_use,
    icon: COUPON_TYPE_ICONS.single_use,
    color: COUPON_TYPE_COLORS.single_use,
    isActive: true,
  },
  multi_use: {
    type: 'multi_use',
    label: COUPON_TYPE_LABELS.multi_use,
    description: COUPON_TYPE_DESCRIPTIONS.multi_use,
    icon: COUPON_TYPE_ICONS.multi_use,
    color: COUPON_TYPE_COLORS.multi_use,
    isActive: true,
  },
  unlimited: {
    type: 'unlimited',
    label: COUPON_TYPE_LABELS.unlimited,
    description: COUPON_TYPE_DESCRIPTIONS.unlimited,
    icon: COUPON_TYPE_ICONS.unlimited,
    color: COUPON_TYPE_COLORS.unlimited,
    isActive: true,
  },
  code_based: {
    type: 'code_based',
    label: COUPON_TYPE_LABELS.code_based,
    description: COUPON_TYPE_DESCRIPTIONS.code_based,
    icon: COUPON_TYPE_ICONS.code_based,
    color: COUPON_TYPE_COLORS.code_based,
    isActive: true,
  },
  automatic: {
    type: 'automatic',
    label: COUPON_TYPE_LABELS.automatic,
    description: COUPON_TYPE_DESCRIPTIONS.automatic,
    icon: COUPON_TYPE_ICONS.automatic,
    color: COUPON_TYPE_COLORS.automatic,
    isActive: true,
  },
  manual: {
    type: 'manual',
    label: COUPON_TYPE_LABELS.manual,
    description: COUPON_TYPE_DESCRIPTIONS.manual,
    icon: COUPON_TYPE_ICONS.manual,
    color: COUPON_TYPE_COLORS.manual,
    isActive: true,
  },
};

// হেল্পার ফাংশন: কুপন টাইপ ভ্যালিড কিনা চেক করুন
export const isValidCouponType = (type: string): type is CouponType => {
  return Object.values(COUPON_TYPE).includes(type as CouponType);
};

// হেল্পার ফাংশন: সক্রিয় কুপন টাইপ গুলো পান
export const getActiveCouponTypes = (): CouponType[] => {
  return Object.values(COUPON_TYPE_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.type);
};

// হেল্পার ফাংশন: কুপন টাইপ গ্রুপ অনুযায়ী ফিল্টার
export const getCouponTypesByGroup = (group: keyof typeof COUPON_TYPE_GROUPS): CouponType[] => {
  return COUPON_TYPE_GROUPS[group] || [];
};

// হেল্পার ফাংশন: কুপন টাইপের লেবেল পান
export const getCouponTypeLabel = (type: CouponType): string => {
  return COUPON_TYPE_LABELS[type] || type;
};

// হেল্পার ফাংশন: কুপন টাইপের বিবরণ পান
export const getCouponTypeDescription = (type: CouponType): string => {
  return COUPON_TYPE_DESCRIPTIONS[type] || '';
};

// হেল্পার ফাংশন: কুপন টাইপের কালার পান
export const getCouponTypeColor = (type: CouponType): string => {
  return COUPON_TYPE_COLORS[type] || '#6B7280';
};

// হেল্পার ফাংশন: কুপন টাইপের আইকন পান
export const getCouponTypeIcon = (type: CouponType): string => {
  return COUPON_TYPE_ICONS[type] || 'Ticket';
};

// হেল্পার ফাংশন: কুপন টাইপ ডিসকাউন্ট বেসড কিনা চেক করুন
export const isDiscountBasedCoupon = (type: CouponType): boolean => {
  const discountTypes: CouponType[] = ['percentage', 'fixed_amount'];
  return discountTypes.includes(type);
};

// হেল্পার ফাংশন: কুপন টাইপ ইউজার বেসড কিনা চেক করুন
export const isUserBasedCoupon = (type: CouponType): boolean => {
  const userTypes: CouponType[] = [
    'welcome',
    'birthday',
    'anniversary',
    'referral',
    'loyalty',
    'vip',
  ];
  return userTypes.includes(type);
};

// হেল্পার ফাংশন: কুপন টাইপ সিঙ্গেল ইউজ কিনা চেক করুন
export const isSingleUseCoupon = (type: CouponType): boolean => {
  return type === 'single_use';
};
