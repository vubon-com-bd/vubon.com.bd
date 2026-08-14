/**
 * Bundle Deal Type Constants
 * বান্ডেল ডিলের প্রকারভেদ সংজ্ঞায়িত করা
 */

// বান্ডেল ডিল টাইপ এনাম
export const BUNDLE_DEAL_TYPE = {
  FIXED_BUNDLE: 'fixed_bundle',
  CUSTOM_BUNDLE: 'custom_bundle',
  MIX_AND_MATCH: 'mix_and_match',
  BUY_TOGETHER: 'buy_together',
  CROSS_SELL: 'cross_sell',
  UPSELL_BUNDLE: 'upsell_bundle',
  STARTER_BUNDLE: 'starter_bundle',
  PRO_BUNDLE: 'pro_bundle',
  PREMIUM_BUNDLE: 'premium_bundle',
  SEASONAL_BUNDLE: 'seasonal_bundle',
  HOLIDAY_BUNDLE: 'holiday_bundle',
  CLEARANCE_BUNDLE: 'clearance_bundle',
  NEW_ARRIVAL_BUNDLE: 'new_arrival_bundle',
  BEST_SELLER_BUNDLE: 'best_seller_bundle',
} as const;

// বান্ডেল ডিল টাইপ টাইপ
export type BundleDealType = (typeof BUNDLE_DEAL_TYPE)[keyof typeof BUNDLE_DEAL_TYPE];

// টাইপের লেবেল
export const BUNDLE_DEAL_TYPE_LABELS: Record<BundleDealType, string> = {
  fixed_bundle: 'নির্দিষ্ট বান্ডেল',
  custom_bundle: 'কাস্টম বান্ডেল',
  mix_and_match: 'মিক্স এন্ড ম্যাচ',
  buy_together: 'একসাথে কিনুন',
  cross_sell: 'ক্রস সেল',
  upsell_bundle: 'আপসেল বান্ডেল',
  starter_bundle: 'স্টার্টার বান্ডেল',
  pro_bundle: 'প্রো বান্ডেল',
  premium_bundle: 'প্রিমিয়াম বান্ডেল',
  seasonal_bundle: 'মৌসুমি বান্ডেল',
  holiday_bundle: 'ছুটির বান্ডেল',
  clearance_bundle: 'ক্লিয়ারেন্স বান্ডেল',
  new_arrival_bundle: 'নতুন আগমন বান্ডেল',
  best_seller_bundle: 'বেস্ট সেলার বান্ডেল',
};

// টাইপের বিবরণ
export const BUNDLE_DEAL_TYPE_DESCRIPTIONS: Record<BundleDealType, string> = {
  fixed_bundle: 'নির্দিষ্ট পণ্যের সেট সহ বান্ডেল',
  custom_bundle: 'গ্রাহকের পছন্দমতো কাস্টমাইজযোগ্য বান্ডেল',
  mix_and_match: 'বিভিন্ন পণ্য মিক্স করে বান্ডেল',
  buy_together: 'একসাথে কেনার জন্য সুপারিশকৃত বান্ডেল',
  cross_sell: 'অন্যান্য পণ্যের সাথে ক্রস সেল বান্ডেল',
  upsell_bundle: 'আপগ্রেড করার জন্য বান্ডেল',
  starter_bundle: 'নতুনদের জন্য স্টার্টার বান্ডেল',
  pro_bundle: 'পেশাদারদের জন্য প্রো বান্ডেল',
  premium_bundle: 'প্রিমিয়াম গ্রাহকদের জন্য বান্ডেল',
  seasonal_bundle: 'মৌসুমি বিশেষ বান্ডেল',
  holiday_bundle: 'ছুটির দিনের বিশেষ বান্ডেল',
  clearance_bundle: 'পুরনো স্টক ক্লিয়ার করার বান্ডেল',
  new_arrival_bundle: 'নতুন পণ্যের বান্ডেল',
  best_seller_bundle: 'বেস্ট সেলার পণ্যের বান্ডেল',
};

// টাইপের আইকন (আইকন নাম)
export const BUNDLE_DEAL_TYPE_ICONS: Record<BundleDealType, string> = {
  fixed_bundle: 'Lock',
  custom_bundle: 'Settings',
  mix_and_match: 'Layers',
  buy_together: 'ShoppingCart',
  cross_sell: 'ArrowRight',
  upsell_bundle: 'ArrowUp',
  starter_bundle: 'Rocket',
  pro_bundle: 'Briefcase',
  premium_bundle: 'Star',
  seasonal_bundle: 'CloudSun',
  holiday_bundle: 'Gift',
  clearance_bundle: 'Tag',
  new_arrival_bundle: 'Sparkles',
  best_seller_bundle: 'Trophy',
};

// টাইপের কালার কোড
export const BUNDLE_DEAL_TYPE_COLORS: Record<BundleDealType, string> = {
  fixed_bundle: '#3B82F6', // Blue
  custom_bundle: '#8B5CF6', // Purple
  mix_and_match: '#EC4899', // Pink
  buy_together: '#F59E0B', // Amber
  cross_sell: '#14B8A6', // Teal
  upsell_bundle: '#F97316', // Orange
  starter_bundle: '#22C55E', // Green
  pro_bundle: '#6366F1', // Indigo
  premium_bundle: '#EC4899', // Pink
  seasonal_bundle: '#06B6D4', // Cyan
  holiday_bundle: '#EF4444', // Red
  clearance_bundle: '#6B7280', // Gray
  new_arrival_bundle: '#0EA5E9', // Sky
  best_seller_bundle: '#FBBF24', // Yellow
};

// টাইপের ডিসপ্লে অর্ডার
export const BUNDLE_DEAL_TYPE_DISPLAY_ORDER: Record<BundleDealType, number> = {
  fixed_bundle: 1,
  custom_bundle: 2,
  mix_and_match: 3,
  buy_together: 4,
  cross_sell: 5,
  upsell_bundle: 6,
  starter_bundle: 7,
  pro_bundle: 8,
  premium_bundle: 9,
  seasonal_bundle: 10,
  holiday_bundle: 11,
  clearance_bundle: 12,
  new_arrival_bundle: 13,
  best_seller_bundle: 14,
};

// টাইপ গ্রুপ
export const BUNDLE_DEAL_TYPE_GROUPS = {
  FIXED_BASED: ['fixed_bundle'] as BundleDealType[],
  CUSTOM_BASED: ['custom_bundle', 'mix_and_match'] as BundleDealType[],
  SALES_BASED: ['buy_together', 'cross_sell', 'upsell_bundle'] as BundleDealType[],
  LEVEL_BASED: ['starter_bundle', 'pro_bundle', 'premium_bundle'] as BundleDealType[],
  SEASONAL_BASED: ['seasonal_bundle', 'holiday_bundle'] as BundleDealType[],
  SPECIAL_BASED: [
    'clearance_bundle',
    'new_arrival_bundle',
    'best_seller_bundle',
  ] as BundleDealType[],
} as const;

// টাইপ কনফিগারেশন ইন্টারফেস
export interface BundleDealTypeConfig {
  type: BundleDealType;
  label: string;
  description: string;
  icon: string;
  color: string;
  displayOrder: number;
  isActive: boolean;
}

// সম্পূর্ণ টাইপ কনফিগারেশন
export const BUNDLE_DEAL_TYPE_CONFIGS: Record<BundleDealType, BundleDealTypeConfig> = {
  fixed_bundle: {
    type: 'fixed_bundle',
    label: BUNDLE_DEAL_TYPE_LABELS.fixed_bundle,
    description: BUNDLE_DEAL_TYPE_DESCRIPTIONS.fixed_bundle,
    icon: BUNDLE_DEAL_TYPE_ICONS.fixed_bundle,
    color: BUNDLE_DEAL_TYPE_COLORS.fixed_bundle,
    displayOrder: BUNDLE_DEAL_TYPE_DISPLAY_ORDER.fixed_bundle,
    isActive: true,
  },
  custom_bundle: {
    type: 'custom_bundle',
    label: BUNDLE_DEAL_TYPE_LABELS.custom_bundle,
    description: BUNDLE_DEAL_TYPE_DESCRIPTIONS.custom_bundle,
    icon: BUNDLE_DEAL_TYPE_ICONS.custom_bundle,
    color: BUNDLE_DEAL_TYPE_COLORS.custom_bundle,
    displayOrder: BUNDLE_DEAL_TYPE_DISPLAY_ORDER.custom_bundle,
    isActive: true,
  },
  mix_and_match: {
    type: 'mix_and_match',
    label: BUNDLE_DEAL_TYPE_LABELS.mix_and_match,
    description: BUNDLE_DEAL_TYPE_DESCRIPTIONS.mix_and_match,
    icon: BUNDLE_DEAL_TYPE_ICONS.mix_and_match,
    color: BUNDLE_DEAL_TYPE_COLORS.mix_and_match,
    displayOrder: BUNDLE_DEAL_TYPE_DISPLAY_ORDER.mix_and_match,
    isActive: true,
  },
  buy_together: {
    type: 'buy_together',
    label: BUNDLE_DEAL_TYPE_LABELS.buy_together,
    description: BUNDLE_DEAL_TYPE_DESCRIPTIONS.buy_together,
    icon: BUNDLE_DEAL_TYPE_ICONS.buy_together,
    color: BUNDLE_DEAL_TYPE_COLORS.buy_together,
    displayOrder: BUNDLE_DEAL_TYPE_DISPLAY_ORDER.buy_together,
    isActive: true,
  },
  cross_sell: {
    type: 'cross_sell',
    label: BUNDLE_DEAL_TYPE_LABELS.cross_sell,
    description: BUNDLE_DEAL_TYPE_DESCRIPTIONS.cross_sell,
    icon: BUNDLE_DEAL_TYPE_ICONS.cross_sell,
    color: BUNDLE_DEAL_TYPE_COLORS.cross_sell,
    displayOrder: BUNDLE_DEAL_TYPE_DISPLAY_ORDER.cross_sell,
    isActive: true,
  },
  upsell_bundle: {
    type: 'upsell_bundle',
    label: BUNDLE_DEAL_TYPE_LABELS.upsell_bundle,
    description: BUNDLE_DEAL_TYPE_DESCRIPTIONS.upsell_bundle,
    icon: BUNDLE_DEAL_TYPE_ICONS.upsell_bundle,
    color: BUNDLE_DEAL_TYPE_COLORS.upsell_bundle,
    displayOrder: BUNDLE_DEAL_TYPE_DISPLAY_ORDER.upsell_bundle,
    isActive: true,
  },
  starter_bundle: {
    type: 'starter_bundle',
    label: BUNDLE_DEAL_TYPE_LABELS.starter_bundle,
    description: BUNDLE_DEAL_TYPE_DESCRIPTIONS.starter_bundle,
    icon: BUNDLE_DEAL_TYPE_ICONS.starter_bundle,
    color: BUNDLE_DEAL_TYPE_COLORS.starter_bundle,
    displayOrder: BUNDLE_DEAL_TYPE_DISPLAY_ORDER.starter_bundle,
    isActive: true,
  },
  pro_bundle: {
    type: 'pro_bundle',
    label: BUNDLE_DEAL_TYPE_LABELS.pro_bundle,
    description: BUNDLE_DEAL_TYPE_DESCRIPTIONS.pro_bundle,
    icon: BUNDLE_DEAL_TYPE_ICONS.pro_bundle,
    color: BUNDLE_DEAL_TYPE_COLORS.pro_bundle,
    displayOrder: BUNDLE_DEAL_TYPE_DISPLAY_ORDER.pro_bundle,
    isActive: true,
  },
  premium_bundle: {
    type: 'premium_bundle',
    label: BUNDLE_DEAL_TYPE_LABELS.premium_bundle,
    description: BUNDLE_DEAL_TYPE_DESCRIPTIONS.premium_bundle,
    icon: BUNDLE_DEAL_TYPE_ICONS.premium_bundle,
    color: BUNDLE_DEAL_TYPE_COLORS.premium_bundle,
    displayOrder: BUNDLE_DEAL_TYPE_DISPLAY_ORDER.premium_bundle,
    isActive: true,
  },
  seasonal_bundle: {
    type: 'seasonal_bundle',
    label: BUNDLE_DEAL_TYPE_LABELS.seasonal_bundle,
    description: BUNDLE_DEAL_TYPE_DESCRIPTIONS.seasonal_bundle,
    icon: BUNDLE_DEAL_TYPE_ICONS.seasonal_bundle,
    color: BUNDLE_DEAL_TYPE_COLORS.seasonal_bundle,
    displayOrder: BUNDLE_DEAL_TYPE_DISPLAY_ORDER.seasonal_bundle,
    isActive: true,
  },
  holiday_bundle: {
    type: 'holiday_bundle',
    label: BUNDLE_DEAL_TYPE_LABELS.holiday_bundle,
    description: BUNDLE_DEAL_TYPE_DESCRIPTIONS.holiday_bundle,
    icon: BUNDLE_DEAL_TYPE_ICONS.holiday_bundle,
    color: BUNDLE_DEAL_TYPE_COLORS.holiday_bundle,
    displayOrder: BUNDLE_DEAL_TYPE_DISPLAY_ORDER.holiday_bundle,
    isActive: true,
  },
  clearance_bundle: {
    type: 'clearance_bundle',
    label: BUNDLE_DEAL_TYPE_LABELS.clearance_bundle,
    description: BUNDLE_DEAL_TYPE_DESCRIPTIONS.clearance_bundle,
    icon: BUNDLE_DEAL_TYPE_ICONS.clearance_bundle,
    color: BUNDLE_DEAL_TYPE_COLORS.clearance_bundle,
    displayOrder: BUNDLE_DEAL_TYPE_DISPLAY_ORDER.clearance_bundle,
    isActive: true,
  },
  new_arrival_bundle: {
    type: 'new_arrival_bundle',
    label: BUNDLE_DEAL_TYPE_LABELS.new_arrival_bundle,
    description: BUNDLE_DEAL_TYPE_DESCRIPTIONS.new_arrival_bundle,
    icon: BUNDLE_DEAL_TYPE_ICONS.new_arrival_bundle,
    color: BUNDLE_DEAL_TYPE_COLORS.new_arrival_bundle,
    displayOrder: BUNDLE_DEAL_TYPE_DISPLAY_ORDER.new_arrival_bundle,
    isActive: true,
  },
  best_seller_bundle: {
    type: 'best_seller_bundle',
    label: BUNDLE_DEAL_TYPE_LABELS.best_seller_bundle,
    description: BUNDLE_DEAL_TYPE_DESCRIPTIONS.best_seller_bundle,
    icon: BUNDLE_DEAL_TYPE_ICONS.best_seller_bundle,
    color: BUNDLE_DEAL_TYPE_COLORS.best_seller_bundle,
    displayOrder: BUNDLE_DEAL_TYPE_DISPLAY_ORDER.best_seller_bundle,
    isActive: true,
  },
};

// হেল্পার ফাংশন: বান্ডেল ডিল টাইপ ভ্যালিড কিনা চেক করুন
export const isValidBundleDealType = (type: string): type is BundleDealType => {
  return Object.values(BUNDLE_DEAL_TYPE).includes(type as BundleDealType);
};

// হেল্পার ফাংশন: সক্রিয় বান্ডেল ডিল টাইপ গুলো পান
export const getActiveBundleDealTypes = (): BundleDealType[] => {
  return Object.values(BUNDLE_DEAL_TYPE_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.type);
};

// হেল্পার ফাংশন: ডিসপ্লে অর্ডার অনুযায়ী সাজান
export const getBundleDealTypesByOrder = (): BundleDealType[] => {
  return Object.values(BUNDLE_DEAL_TYPE_CONFIGS)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((config) => config.type);
};

// হেল্পার ফাংশন: বান্ডেল ডিল টাইপ গ্রুপ অনুযায়ী ফিল্টার
export const getBundleDealTypesByGroup = (
  group: keyof typeof BUNDLE_DEAL_TYPE_GROUPS
): BundleDealType[] => {
  return BUNDLE_DEAL_TYPE_GROUPS[group] || [];
};

// হেল্পার ফাংশন: বান্ডেল ডিল টাইপের লেবেল পান
export const getBundleDealTypeLabel = (type: BundleDealType): string => {
  return BUNDLE_DEAL_TYPE_LABELS[type] || type;
};

// হেল্পার ফাংশন: বান্ডেল ডিল টাইপের কালার পান
export const getBundleDealTypeColor = (type: BundleDealType): string => {
  return BUNDLE_DEAL_TYPE_COLORS[type] || '#6B7280';
};

// হেল্পার ফাংশন: বান্ডেল ডিল টাইপের আইকন পান
export const getBundleDealTypeIcon = (type: BundleDealType): string => {
  return BUNDLE_DEAL_TYPE_ICONS[type] || 'Circle';
};
