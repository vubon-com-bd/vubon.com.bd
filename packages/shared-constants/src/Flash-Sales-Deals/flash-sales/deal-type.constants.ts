/**
 * Deal Type Constants
 * ডিলের প্রকারভেদ সংজ্ঞায়িত করা
 */

// ডিল টাইপ এনাম
export const DEAL_TYPE = {
  FLASH_DEAL: 'flash_deal',
  DAILY_DEAL: 'daily_deal',
  WEEKLY_DEAL: 'weekly_deal',
  MONTHLY_DEAL: 'monthly_deal',
  SEASONAL_DEAL: 'seasonal_deal',
  HOLIDAY_DEAL: 'holiday_deal',
  CLEARANCE_DEAL: 'clearance_deal',
  NEW_ARRIVAL_DEAL: 'new_arrival_deal',
  BEST_SELLER_DEAL: 'best_seller_deal',
  PRODUCT_DEAL: 'product_deal',
  BUNDLE_DEAL: 'bundle_deal',
  CATEGORY_DEAL: 'category_deal',
  BRAND_DEAL: 'brand_deal',
  LIMITED_DEAL: 'limited_deal',
  PREMIUM_DEAL: 'premium_deal',
  REGULAR_DEAL: 'regular_deal',
  CUSTOM_DEAL: 'custom_deal',
} as const;

// ডিল টাইপ টাইপ
export type DealType = (typeof DEAL_TYPE)[keyof typeof DEAL_TYPE];

// টাইপের লেবেল
export const DEAL_TYPE_LABELS: Record<DealType, string> = {
  flash_deal: 'ফ্ল্যাশ ডিল',
  daily_deal: 'দৈনিক ডিল',
  weekly_deal: 'সাপ্তাহিক ডিল',
  monthly_deal: 'মাসিক ডিল',
  seasonal_deal: 'মৌসুমি ডিল',
  holiday_deal: 'ছুটির ডিল',
  clearance_deal: 'ক্লিয়ারেন্স ডিল',
  new_arrival_deal: 'নতুন আগমন ডিল',
  best_seller_deal: 'বেস্ট সেলার ডিল',
  product_deal: 'পণ্য ডিল',
  bundle_deal: 'বান্ডেল ডিল',
  category_deal: 'ক্যাটাগরি ডিল',
  brand_deal: 'ব্র্যান্ড ডিল',
  limited_deal: 'সীমিত ডিল',
  premium_deal: 'প্রিমিয়াম ডিল',
  regular_deal: 'নিয়মিত ডিল',
  custom_deal: 'কাস্টম ডিল',
};

// টাইপের বিবরণ
export const DEAL_TYPE_DESCRIPTIONS: Record<DealType, string> = {
  flash_deal: 'স্বল্প সময়ের জন্য বিশেষ অফার',
  daily_deal: 'প্রতিদিনের বিশেষ অফার',
  weekly_deal: 'সাপ্তাহিক বিশেষ অফার',
  monthly_deal: 'মাসিক বিশেষ অফার',
  seasonal_deal: 'মৌসুমি বিশেষ অফার',
  holiday_deal: 'ছুটির দিনের বিশেষ অফার',
  clearance_deal: 'পুরনো স্টক ক্লিয়ার করার অফার',
  new_arrival_deal: 'নতুন পণ্য আসার উপলক্ষে অফার',
  best_seller_deal: 'বেস্ট সেলার পণ্যের উপর অফার',
  product_deal: 'নির্দিষ্ট পণ্যের উপর অফার',
  bundle_deal: 'একাধিক পণ্য একসাথে কেনার অফার',
  category_deal: 'নির্দিষ্ট ক্যাটাগরির উপর অফার',
  brand_deal: 'নির্দিষ্ট ব্র্যান্ডের উপর অফার',
  limited_deal: 'সীমিত সংখ্যক পণ্যের জন্য অফার',
  premium_deal: 'প্রিমিয়াম গ্রাহকদের জন্য বিশেষ অফার',
  regular_deal: 'নিয়মিত অফার',
  custom_deal: 'কাস্টমাইজড অফার',
};

// টাইপের আইকন (আইকন নাম)
export const DEAL_TYPE_ICONS: Record<DealType, string> = {
  flash_deal: 'Zap',
  daily_deal: 'Sun',
  weekly_deal: 'Calendar',
  monthly_deal: 'CalendarDays',
  seasonal_deal: 'CloudSun',
  holiday_deal: 'Gift',
  clearance_deal: 'Tag',
  new_arrival_deal: 'Sparkles',
  best_seller_deal: 'Trophy',
  product_deal: 'Box',
  bundle_deal: 'Layers',
  category_deal: 'Folder',
  brand_deal: 'Briefcase',
  limited_deal: 'Hash',
  premium_deal: 'Star',
  regular_deal: 'ShoppingBag',
  custom_deal: 'Settings',
};

// টাইপের কালার কোড
export const DEAL_TYPE_COLORS: Record<DealType, string> = {
  flash_deal: '#EF4444', // Red
  daily_deal: '#F59E0B', // Amber
  weekly_deal: '#3B82F6', // Blue
  monthly_deal: '#8B5CF6', // Purple
  seasonal_deal: '#22C55E', // Green
  holiday_deal: '#EC4899', // Pink
  clearance_deal: '#6B7280', // Gray
  new_arrival_deal: '#06B6D4', // Cyan
  best_seller_deal: '#FBBF24', // Yellow
  product_deal: '#0EA5E9', // Sky
  bundle_deal: '#F472B6', // Pink
  category_deal: '#8B5CF6', // Violet
  brand_deal: '#F59E0B', // Amber
  limited_deal: '#F97316', // Orange
  premium_deal: '#8B5CF6', // Purple
  regular_deal: '#3B82F6', // Blue
  custom_deal: '#6366F1', // Indigo
};

// টাইপের ডিসপ্লে অর্ডার
export const DEAL_TYPE_DISPLAY_ORDER: Record<DealType, number> = {
  flash_deal: 1,
  daily_deal: 2,
  weekly_deal: 3,
  monthly_deal: 4,
  seasonal_deal: 5,
  holiday_deal: 6,
  clearance_deal: 7,
  new_arrival_deal: 8,
  best_seller_deal: 9,
  product_deal: 10,
  bundle_deal: 11,
  category_deal: 12,
  brand_deal: 13,
  limited_deal: 14,
  premium_deal: 15,
  regular_deal: 16,
  custom_deal: 17,
};

// টাইপ গ্রুপ
export const DEAL_TYPE_GROUPS = {
  TIME_BASED: [
    'flash_deal',
    'daily_deal',
    'weekly_deal',
    'monthly_deal',
    'seasonal_deal',
    'holiday_deal',
  ] as DealType[],
  VALUE_BASED: ['clearance_deal', 'new_arrival_deal', 'best_seller_deal'] as DealType[],
  CATEGORY_BASED: ['product_deal', 'bundle_deal', 'category_deal', 'brand_deal'] as DealType[],
  SPECIAL: ['limited_deal', 'premium_deal', 'regular_deal', 'custom_deal'] as DealType[],
} as const;

// টাইপ কনফিগারেশন ইন্টারফেস
export interface DealTypeConfig {
  type: DealType;
  label: string;
  description: string;
  icon: string;
  color: string;
  displayOrder: number;
  isActive: boolean;
}

// সম্পূর্ণ টাইপ কনফিগারেশন
export const DEAL_TYPE_CONFIGS: Record<DealType, DealTypeConfig> = {
  flash_deal: {
    type: 'flash_deal',
    label: DEAL_TYPE_LABELS.flash_deal,
    description: DEAL_TYPE_DESCRIPTIONS.flash_deal,
    icon: DEAL_TYPE_ICONS.flash_deal,
    color: DEAL_TYPE_COLORS.flash_deal,
    displayOrder: DEAL_TYPE_DISPLAY_ORDER.flash_deal,
    isActive: true,
  },
  daily_deal: {
    type: 'daily_deal',
    label: DEAL_TYPE_LABELS.daily_deal,
    description: DEAL_TYPE_DESCRIPTIONS.daily_deal,
    icon: DEAL_TYPE_ICONS.daily_deal,
    color: DEAL_TYPE_COLORS.daily_deal,
    displayOrder: DEAL_TYPE_DISPLAY_ORDER.daily_deal,
    isActive: true,
  },
  weekly_deal: {
    type: 'weekly_deal',
    label: DEAL_TYPE_LABELS.weekly_deal,
    description: DEAL_TYPE_DESCRIPTIONS.weekly_deal,
    icon: DEAL_TYPE_ICONS.weekly_deal,
    color: DEAL_TYPE_COLORS.weekly_deal,
    displayOrder: DEAL_TYPE_DISPLAY_ORDER.weekly_deal,
    isActive: true,
  },
  monthly_deal: {
    type: 'monthly_deal',
    label: DEAL_TYPE_LABELS.monthly_deal,
    description: DEAL_TYPE_DESCRIPTIONS.monthly_deal,
    icon: DEAL_TYPE_ICONS.monthly_deal,
    color: DEAL_TYPE_COLORS.monthly_deal,
    displayOrder: DEAL_TYPE_DISPLAY_ORDER.monthly_deal,
    isActive: true,
  },
  seasonal_deal: {
    type: 'seasonal_deal',
    label: DEAL_TYPE_LABELS.seasonal_deal,
    description: DEAL_TYPE_DESCRIPTIONS.seasonal_deal,
    icon: DEAL_TYPE_ICONS.seasonal_deal,
    color: DEAL_TYPE_COLORS.seasonal_deal,
    displayOrder: DEAL_TYPE_DISPLAY_ORDER.seasonal_deal,
    isActive: true,
  },
  holiday_deal: {
    type: 'holiday_deal',
    label: DEAL_TYPE_LABELS.holiday_deal,
    description: DEAL_TYPE_DESCRIPTIONS.holiday_deal,
    icon: DEAL_TYPE_ICONS.holiday_deal,
    color: DEAL_TYPE_COLORS.holiday_deal,
    displayOrder: DEAL_TYPE_DISPLAY_ORDER.holiday_deal,
    isActive: true,
  },
  clearance_deal: {
    type: 'clearance_deal',
    label: DEAL_TYPE_LABELS.clearance_deal,
    description: DEAL_TYPE_DESCRIPTIONS.clearance_deal,
    icon: DEAL_TYPE_ICONS.clearance_deal,
    color: DEAL_TYPE_COLORS.clearance_deal,
    displayOrder: DEAL_TYPE_DISPLAY_ORDER.clearance_deal,
    isActive: true,
  },
  new_arrival_deal: {
    type: 'new_arrival_deal',
    label: DEAL_TYPE_LABELS.new_arrival_deal,
    description: DEAL_TYPE_DESCRIPTIONS.new_arrival_deal,
    icon: DEAL_TYPE_ICONS.new_arrival_deal,
    color: DEAL_TYPE_COLORS.new_arrival_deal,
    displayOrder: DEAL_TYPE_DISPLAY_ORDER.new_arrival_deal,
    isActive: true,
  },
  best_seller_deal: {
    type: 'best_seller_deal',
    label: DEAL_TYPE_LABELS.best_seller_deal,
    description: DEAL_TYPE_DESCRIPTIONS.best_seller_deal,
    icon: DEAL_TYPE_ICONS.best_seller_deal,
    color: DEAL_TYPE_COLORS.best_seller_deal,
    displayOrder: DEAL_TYPE_DISPLAY_ORDER.best_seller_deal,
    isActive: true,
  },
  product_deal: {
    type: 'product_deal',
    label: DEAL_TYPE_LABELS.product_deal,
    description: DEAL_TYPE_DESCRIPTIONS.product_deal,
    icon: DEAL_TYPE_ICONS.product_deal,
    color: DEAL_TYPE_COLORS.product_deal,
    displayOrder: DEAL_TYPE_DISPLAY_ORDER.product_deal,
    isActive: true,
  },
  bundle_deal: {
    type: 'bundle_deal',
    label: DEAL_TYPE_LABELS.bundle_deal,
    description: DEAL_TYPE_DESCRIPTIONS.bundle_deal,
    icon: DEAL_TYPE_ICONS.bundle_deal,
    color: DEAL_TYPE_COLORS.bundle_deal,
    displayOrder: DEAL_TYPE_DISPLAY_ORDER.bundle_deal,
    isActive: true,
  },
  category_deal: {
    type: 'category_deal',
    label: DEAL_TYPE_LABELS.category_deal,
    description: DEAL_TYPE_DESCRIPTIONS.category_deal,
    icon: DEAL_TYPE_ICONS.category_deal,
    color: DEAL_TYPE_COLORS.category_deal,
    displayOrder: DEAL_TYPE_DISPLAY_ORDER.category_deal,
    isActive: true,
  },
  brand_deal: {
    type: 'brand_deal',
    label: DEAL_TYPE_LABELS.brand_deal,
    description: DEAL_TYPE_DESCRIPTIONS.brand_deal,
    icon: DEAL_TYPE_ICONS.brand_deal,
    color: DEAL_TYPE_COLORS.brand_deal,
    displayOrder: DEAL_TYPE_DISPLAY_ORDER.brand_deal,
    isActive: true,
  },
  limited_deal: {
    type: 'limited_deal',
    label: DEAL_TYPE_LABELS.limited_deal,
    description: DEAL_TYPE_DESCRIPTIONS.limited_deal,
    icon: DEAL_TYPE_ICONS.limited_deal,
    color: DEAL_TYPE_COLORS.limited_deal,
    displayOrder: DEAL_TYPE_DISPLAY_ORDER.limited_deal,
    isActive: true,
  },
  premium_deal: {
    type: 'premium_deal',
    label: DEAL_TYPE_LABELS.premium_deal,
    description: DEAL_TYPE_DESCRIPTIONS.premium_deal,
    icon: DEAL_TYPE_ICONS.premium_deal,
    color: DEAL_TYPE_COLORS.premium_deal,
    displayOrder: DEAL_TYPE_DISPLAY_ORDER.premium_deal,
    isActive: true,
  },
  regular_deal: {
    type: 'regular_deal',
    label: DEAL_TYPE_LABELS.regular_deal,
    description: DEAL_TYPE_DESCRIPTIONS.regular_deal,
    icon: DEAL_TYPE_ICONS.regular_deal,
    color: DEAL_TYPE_COLORS.regular_deal,
    displayOrder: DEAL_TYPE_DISPLAY_ORDER.regular_deal,
    isActive: true,
  },
  custom_deal: {
    type: 'custom_deal',
    label: DEAL_TYPE_LABELS.custom_deal,
    description: DEAL_TYPE_DESCRIPTIONS.custom_deal,
    icon: DEAL_TYPE_ICONS.custom_deal,
    color: DEAL_TYPE_COLORS.custom_deal,
    displayOrder: DEAL_TYPE_DISPLAY_ORDER.custom_deal,
    isActive: true,
  },
};

// হেল্পার ফাংশন: ডিল টাইপ ভ্যালিড কিনা চেক করুন
export const isValidDealType = (type: string): type is DealType => {
  return Object.values(DEAL_TYPE).includes(type as DealType);
};

// হেল্পার ফাংশন: সক্রিয় ডিল টাইপ গুলো পান
export const getActiveDealTypes = (): DealType[] => {
  return Object.values(DEAL_TYPE_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.type);
};

// হেল্পার ফাংশন: ডিসপ্লে অর্ডার অনুযায়ী সাজান
export const getDealTypesByOrder = (): DealType[] => {
  return Object.values(DEAL_TYPE_CONFIGS)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((config) => config.type);
};

// হেল্পার ফাংশন: ডিল টাইপ গ্রুপ অনুযায়ী ফিল্টার
export const getDealTypesByGroup = (group: keyof typeof DEAL_TYPE_GROUPS): DealType[] => {
  return DEAL_TYPE_GROUPS[group] || [];
};

// হেল্পার ফাংশন: ডিল টাইপের লেবেল পান
export const getDealTypeLabel = (type: DealType): string => {
  return DEAL_TYPE_LABELS[type] || type;
};

// হেল্পার ফাংশন: ডিল টাইপের কালার পান
export const getDealTypeColor = (type: DealType): string => {
  return DEAL_TYPE_COLORS[type] || '#6B7280';
};
