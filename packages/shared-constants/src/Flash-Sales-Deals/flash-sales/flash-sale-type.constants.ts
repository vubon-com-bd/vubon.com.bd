/**
 * Flash Sale Type Constants
 * ফ্ল্যাশ সেলের প্রকারভেদ সংজ্ঞায়িত করা
 */

// ফ্ল্যাশ সেল টাইপ এনাম
export const FLASH_SALE_TYPE = {
  REGULAR: 'regular',
  PREMIUM: 'premium',
  URGENT: 'urgent',
  LIMITED: 'limited',
  MEGA: 'mega',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  SEASONAL: 'seasonal',
  HOLIDAY: 'holiday',
  CLEARANCE: 'clearance',
  NEW_ARRIVAL: 'new_arrival',
  BEST_SELLER: 'best_seller',
  CUSTOM: 'custom',
  BULK: 'bulk',
  INDIVIDUAL: 'individual',
  BUNDLE: 'bundle',
  PRODUCT_BASED: 'product_based',
  CATEGORY_BASED: 'category_based',
  BRAND_BASED: 'brand_based',
} as const;

// ফ্ল্যাশ সেল টাইপ টাইপ
export type FlashSaleType = (typeof FLASH_SALE_TYPE)[keyof typeof FLASH_SALE_TYPE];

// টাইপের লেবেল
export const FLASH_SALE_TYPE_LABELS: Record<FlashSaleType, string> = {
  regular: 'নিয়মিত',
  premium: 'প্রিমিয়াম',
  urgent: 'জরুরি',
  limited: 'সীমিত',
  mega: 'মেগা',
  daily: 'দৈনিক',
  weekly: 'সাপ্তাহিক',
  monthly: 'মাসিক',
  seasonal: 'মৌসুমি',
  holiday: 'ছুটির দিন',
  clearance: 'ক্লিয়ারেন্স',
  new_arrival: 'নতুন আগমন',
  best_seller: 'বেস্ট সেলার',
  custom: 'কাস্টম',
  bulk: 'পাইকারি',
  individual: 'ব্যক্তিগত',
  bundle: 'বান্ডেল',
  product_based: 'পণ্য ভিত্তিক',
  category_based: 'ক্যাটাগরি ভিত্তিক',
  brand_based: 'ব্র্যান্ড ভিত্তিক',
};

// টাইপের বিবরণ
export const FLASH_SALE_TYPE_DESCRIPTIONS: Record<FlashSaleType, string> = {
  regular: 'নিয়মিত ফ্ল্যাশ সেল অফার',
  premium: 'প্রিমিয়াম গ্রাহকদের জন্য বিশেষ অফার',
  urgent: 'জরুরি ভিত্তিতে সীমিত সময়ের অফার',
  limited: 'সীমিত সংখ্যক পণ্যের জন্য অফার',
  mega: 'বিশাল ডিসকাউন্ট সহ বড় আকারের অফার',
  daily: 'প্রতিদিনের বিশেষ অফার',
  weekly: 'সাপ্তাহিক বিশেষ অফার',
  monthly: 'মাসিক বিশেষ অফার',
  seasonal: 'মৌসুমি বিশেষ অফার',
  holiday: 'ছুটির দিনের বিশেষ অফার',
  clearance: 'পুরনো স্টক ক্লিয়ার করার অফার',
  new_arrival: 'নতুন পণ্য আসার উপলক্ষে অফার',
  best_seller: 'বেস্ট সেলার পণ্যের উপর অফার',
  custom: 'কাস্টমাইজড অফার',
  bulk: 'বulk পরিমাণে কেনার জন্য অফার',
  individual: 'ব্যক্তিগত গ্রাহকের জন্য অফার',
  bundle: 'একাধিক পণ্য একসাথে কেনার অফার',
  product_based: 'নির্দিষ্ট পণ্যের উপর অফার',
  category_based: 'নির্দিষ্ট ক্যাটাগরির উপর অফার',
  brand_based: 'নির্দিষ্ট ব্র্যান্ডের উপর অফার',
};

// টাইপের আইকন (আইকন নাম)
export const FLASH_SALE_TYPE_ICONS: Record<FlashSaleType, string> = {
  regular: 'ShoppingBag',
  premium: 'Star',
  urgent: 'AlertTriangle',
  limited: 'Hash',
  mega: 'LayoutGrid',
  daily: 'Sun',
  weekly: 'Calendar',
  monthly: 'CalendarDays',
  seasonal: 'CloudSun',
  holiday: 'Gift',
  clearance: 'Tag',
  new_arrival: 'Sparkles',
  best_seller: 'Trophy',
  custom: 'Settings',
  bulk: 'Package',
  individual: 'User',
  bundle: 'Layers',
  product_based: 'Box',
  category_based: 'Folder',
  brand_based: 'Briefcase',
};

// টাইপের কালার কোড
export const FLASH_SALE_TYPE_COLORS: Record<FlashSaleType, string> = {
  regular: '#3B82F6', // Blue
  premium: '#8B5CF6', // Purple
  urgent: '#EF4444', // Red
  limited: '#F59E0B', // Amber
  mega: '#EC4899', // Pink
  daily: '#F97316', // Orange
  weekly: '#14B8A6', // Teal
  monthly: '#6366F1', // Indigo
  seasonal: '#22C55E', // Green
  holiday: '#E11D48', // Rose
  clearance: '#6B7280', // Gray
  new_arrival: '#06B6D4', // Cyan
  best_seller: '#FBBF24', // Yellow
  custom: '#8B5CF6', // Purple
  bulk: '#1F2937', // Dark
  individual: '#10B981', // Emerald
  bundle: '#F472B6', // Pink
  product_based: '#0EA5E9', // Sky
  category_based: '#8B5CF6', // Violet
  brand_based: '#F59E0B', // Amber
};

// টাইপের প্রায়োরিটি লেভেল
export const FLASH_SALE_TYPE_PRIORITY: Record<FlashSaleType, number> = {
  regular: 1,
  premium: 5,
  urgent: 4,
  limited: 3,
  mega: 5,
  daily: 2,
  weekly: 3,
  monthly: 4,
  seasonal: 3,
  holiday: 4,
  clearance: 2,
  new_arrival: 3,
  best_seller: 4,
  custom: 5,
  bulk: 3,
  individual: 2,
  bundle: 4,
  product_based: 3,
  category_based: 3,
  brand_based: 3,
};

// টাইপ গ্রুপ
export const FLASH_SALE_TYPE_GROUPS = {
  TIME_BASED: ['daily', 'weekly', 'monthly', 'seasonal', 'holiday'] as FlashSaleType[],
  VALUE_BASED: ['regular', 'premium', 'mega', 'urgent'] as FlashSaleType[],
  QUANTITY_BASED: ['limited', 'bulk', 'individual', 'bundle'] as FlashSaleType[],
  CATEGORY_BASED: ['product_based', 'category_based', 'brand_based'] as FlashSaleType[],
  SPECIAL: ['clearance', 'new_arrival', 'best_seller', 'custom'] as FlashSaleType[],
} as const;

// টাইপ কনফিগারেশন ইন্টারফেস
export interface FlashSaleTypeConfig {
  type: FlashSaleType;
  label: string;
  description: string;
  icon: string;
  color: string;
  priority: number;
  isActive: boolean;
}

// সম্পূর্ণ টাইপ কনফিগারেশন
export const FLASH_SALE_TYPE_CONFIGS: Record<FlashSaleType, FlashSaleTypeConfig> = {
  regular: {
    type: 'regular',
    label: FLASH_SALE_TYPE_LABELS.regular,
    description: FLASH_SALE_TYPE_DESCRIPTIONS.regular,
    icon: FLASH_SALE_TYPE_ICONS.regular,
    color: FLASH_SALE_TYPE_COLORS.regular,
    priority: FLASH_SALE_TYPE_PRIORITY.regular,
    isActive: true,
  },
  premium: {
    type: 'premium',
    label: FLASH_SALE_TYPE_LABELS.premium,
    description: FLASH_SALE_TYPE_DESCRIPTIONS.premium,
    icon: FLASH_SALE_TYPE_ICONS.premium,
    color: FLASH_SALE_TYPE_COLORS.premium,
    priority: FLASH_SALE_TYPE_PRIORITY.premium,
    isActive: true,
  },
  urgent: {
    type: 'urgent',
    label: FLASH_SALE_TYPE_LABELS.urgent,
    description: FLASH_SALE_TYPE_DESCRIPTIONS.urgent,
    icon: FLASH_SALE_TYPE_ICONS.urgent,
    color: FLASH_SALE_TYPE_COLORS.urgent,
    priority: FLASH_SALE_TYPE_PRIORITY.urgent,
    isActive: true,
  },
  limited: {
    type: 'limited',
    label: FLASH_SALE_TYPE_LABELS.limited,
    description: FLASH_SALE_TYPE_DESCRIPTIONS.limited,
    icon: FLASH_SALE_TYPE_ICONS.limited,
    color: FLASH_SALE_TYPE_COLORS.limited,
    priority: FLASH_SALE_TYPE_PRIORITY.limited,
    isActive: true,
  },
  mega: {
    type: 'mega',
    label: FLASH_SALE_TYPE_LABELS.mega,
    description: FLASH_SALE_TYPE_DESCRIPTIONS.mega,
    icon: FLASH_SALE_TYPE_ICONS.mega,
    color: FLASH_SALE_TYPE_COLORS.mega,
    priority: FLASH_SALE_TYPE_PRIORITY.mega,
    isActive: true,
  },
  daily: {
    type: 'daily',
    label: FLASH_SALE_TYPE_LABELS.daily,
    description: FLASH_SALE_TYPE_DESCRIPTIONS.daily,
    icon: FLASH_SALE_TYPE_ICONS.daily,
    color: FLASH_SALE_TYPE_COLORS.daily,
    priority: FLASH_SALE_TYPE_PRIORITY.daily,
    isActive: true,
  },
  weekly: {
    type: 'weekly',
    label: FLASH_SALE_TYPE_LABELS.weekly,
    description: FLASH_SALE_TYPE_DESCRIPTIONS.weekly,
    icon: FLASH_SALE_TYPE_ICONS.weekly,
    color: FLASH_SALE_TYPE_COLORS.weekly,
    priority: FLASH_SALE_TYPE_PRIORITY.weekly,
    isActive: true,
  },
  monthly: {
    type: 'monthly',
    label: FLASH_SALE_TYPE_LABELS.monthly,
    description: FLASH_SALE_TYPE_DESCRIPTIONS.monthly,
    icon: FLASH_SALE_TYPE_ICONS.monthly,
    color: FLASH_SALE_TYPE_COLORS.monthly,
    priority: FLASH_SALE_TYPE_PRIORITY.monthly,
    isActive: true,
  },
  seasonal: {
    type: 'seasonal',
    label: FLASH_SALE_TYPE_LABELS.seasonal,
    description: FLASH_SALE_TYPE_DESCRIPTIONS.seasonal,
    icon: FLASH_SALE_TYPE_ICONS.seasonal,
    color: FLASH_SALE_TYPE_COLORS.seasonal,
    priority: FLASH_SALE_TYPE_PRIORITY.seasonal,
    isActive: true,
  },
  holiday: {
    type: 'holiday',
    label: FLASH_SALE_TYPE_LABELS.holiday,
    description: FLASH_SALE_TYPE_DESCRIPTIONS.holiday,
    icon: FLASH_SALE_TYPE_ICONS.holiday,
    color: FLASH_SALE_TYPE_COLORS.holiday,
    priority: FLASH_SALE_TYPE_PRIORITY.holiday,
    isActive: true,
  },
  clearance: {
    type: 'clearance',
    label: FLASH_SALE_TYPE_LABELS.clearance,
    description: FLASH_SALE_TYPE_DESCRIPTIONS.clearance,
    icon: FLASH_SALE_TYPE_ICONS.clearance,
    color: FLASH_SALE_TYPE_COLORS.clearance,
    priority: FLASH_SALE_TYPE_PRIORITY.clearance,
    isActive: true,
  },
  new_arrival: {
    type: 'new_arrival',
    label: FLASH_SALE_TYPE_LABELS.new_arrival,
    description: FLASH_SALE_TYPE_DESCRIPTIONS.new_arrival,
    icon: FLASH_SALE_TYPE_ICONS.new_arrival,
    color: FLASH_SALE_TYPE_COLORS.new_arrival,
    priority: FLASH_SALE_TYPE_PRIORITY.new_arrival,
    isActive: true,
  },
  best_seller: {
    type: 'best_seller',
    label: FLASH_SALE_TYPE_LABELS.best_seller,
    description: FLASH_SALE_TYPE_DESCRIPTIONS.best_seller,
    icon: FLASH_SALE_TYPE_ICONS.best_seller,
    color: FLASH_SALE_TYPE_COLORS.best_seller,
    priority: FLASH_SALE_TYPE_PRIORITY.best_seller,
    isActive: true,
  },
  custom: {
    type: 'custom',
    label: FLASH_SALE_TYPE_LABELS.custom,
    description: FLASH_SALE_TYPE_DESCRIPTIONS.custom,
    icon: FLASH_SALE_TYPE_ICONS.custom,
    color: FLASH_SALE_TYPE_COLORS.custom,
    priority: FLASH_SALE_TYPE_PRIORITY.custom,
    isActive: true,
  },
  bulk: {
    type: 'bulk',
    label: FLASH_SALE_TYPE_LABELS.bulk,
    description: FLASH_SALE_TYPE_DESCRIPTIONS.bulk,
    icon: FLASH_SALE_TYPE_ICONS.bulk,
    color: FLASH_SALE_TYPE_COLORS.bulk,
    priority: FLASH_SALE_TYPE_PRIORITY.bulk,
    isActive: true,
  },
  individual: {
    type: 'individual',
    label: FLASH_SALE_TYPE_LABELS.individual,
    description: FLASH_SALE_TYPE_DESCRIPTIONS.individual,
    icon: FLASH_SALE_TYPE_ICONS.individual,
    color: FLASH_SALE_TYPE_COLORS.individual,
    priority: FLASH_SALE_TYPE_PRIORITY.individual,
    isActive: true,
  },
  bundle: {
    type: 'bundle',
    label: FLASH_SALE_TYPE_LABELS.bundle,
    description: FLASH_SALE_TYPE_DESCRIPTIONS.bundle,
    icon: FLASH_SALE_TYPE_ICONS.bundle,
    color: FLASH_SALE_TYPE_COLORS.bundle,
    priority: FLASH_SALE_TYPE_PRIORITY.bundle,
    isActive: true,
  },
  product_based: {
    type: 'product_based',
    label: FLASH_SALE_TYPE_LABELS.product_based,
    description: FLASH_SALE_TYPE_DESCRIPTIONS.product_based,
    icon: FLASH_SALE_TYPE_ICONS.product_based,
    color: FLASH_SALE_TYPE_COLORS.product_based,
    priority: FLASH_SALE_TYPE_PRIORITY.product_based,
    isActive: true,
  },
  category_based: {
    type: 'category_based',
    label: FLASH_SALE_TYPE_LABELS.category_based,
    description: FLASH_SALE_TYPE_DESCRIPTIONS.category_based,
    icon: FLASH_SALE_TYPE_ICONS.category_based,
    color: FLASH_SALE_TYPE_COLORS.category_based,
    priority: FLASH_SALE_TYPE_PRIORITY.category_based,
    isActive: true,
  },
  brand_based: {
    type: 'brand_based',
    label: FLASH_SALE_TYPE_LABELS.brand_based,
    description: FLASH_SALE_TYPE_DESCRIPTIONS.brand_based,
    icon: FLASH_SALE_TYPE_ICONS.brand_based,
    color: FLASH_SALE_TYPE_COLORS.brand_based,
    priority: FLASH_SALE_TYPE_PRIORITY.brand_based,
    isActive: true,
  },
};

// হেল্পার ফাংশন: টাইপ ভ্যালিড কিনা চেক করুন
export const isValidFlashSaleType = (type: string): type is FlashSaleType => {
  return Object.values(FLASH_SALE_TYPE).includes(type as FlashSaleType);
};

// হেল্পার ফাংশন: সক্রিয় টাইপ গুলো পান
export const getActiveFlashSaleTypes = (): FlashSaleType[] => {
  return Object.values(FLASH_SALE_TYPE_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.type);
};

// হেল্পার ফাংশন: টাইপ গ্রুপ অনুযায়ী ফিল্টার
export const getFlashSaleTypesByGroup = (
  group: keyof typeof FLASH_SALE_TYPE_GROUPS
): FlashSaleType[] => {
  return FLASH_SALE_TYPE_GROUPS[group] || [];
};

// হেল্পার ফাংশন: প্রায়োরিটি অনুযায়ী সাজান
export const getFlashSaleTypesByPriority = (): FlashSaleType[] => {
  return Object.values(FLASH_SALE_TYPE_CONFIGS)
    .sort((a, b) => b.priority - a.priority)
    .map((config) => config.type);
};
