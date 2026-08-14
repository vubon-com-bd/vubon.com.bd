/**
 * Deal Restriction Constants
 * ডিলের রেস্ট্রিকশন টাইপসমূহ সংজ্ঞায়িত করা
 */

// ডিল রেস্ট্রিকশন এনাম
export const DEAL_RESTRICTION = {
  MINIMUM_ORDER_AMOUNT: 'minimum_order_amount',
  MAXIMUM_QUANTITY: 'maximum_quantity',
  USER_LIMIT: 'user_limit',
  PRODUCT_LIMIT: 'product_limit',
  CATEGORY_LIMIT: 'category_limit',
  BRAND_LIMIT: 'brand_limit',
  TIME_LIMIT: 'time_limit',
  DAY_LIMIT: 'day_limit',
  WEEK_LIMIT: 'week_limit',
  MONTH_LIMIT: 'month_limit',
  LOCATION_LIMIT: 'location_limit',
  USER_GROUP_LIMIT: 'user_group_limit',
  NEW_USER_ONLY: 'new_user_only',
  EXISTING_USER_ONLY: 'existing_user_only',
  FIRST_PURCHASE_ONLY: 'first_purchase_only',
  REPEAT_PURCHASE_ONLY: 'repeat_purchase_only',
} as const;

// ডিল রেস্ট্রিকশন টাইপ
export type DealRestriction = (typeof DEAL_RESTRICTION)[keyof typeof DEAL_RESTRICTION];

// রেস্ট্রিকশনের লেবেল
export const DEAL_RESTRICTION_LABELS: Record<DealRestriction, string> = {
  minimum_order_amount: 'ন্যূনতম অর্ডার পরিমাণ',
  maximum_quantity: 'সর্বোচ্চ পরিমাণ',
  user_limit: 'ব্যবহারকারী সীমা',
  product_limit: 'পণ্য সীমা',
  category_limit: 'ক্যাটাগরি সীমা',
  brand_limit: 'ব্র্যান্ড সীমা',
  time_limit: 'সময় সীমা',
  day_limit: 'দিন সীমা',
  week_limit: 'সপ্তাহ সীমা',
  month_limit: 'মাস সীমা',
  location_limit: 'অবস্থান সীমা',
  user_group_limit: 'ব্যবহারকারী গ্রুপ সীমা',
  new_user_only: 'শুধু নতুন ব্যবহারকারী',
  existing_user_only: 'শুধু বিদ্যমান ব্যবহারকারী',
  first_purchase_only: 'শুধু প্রথম ক্রয়',
  repeat_purchase_only: 'শুধু পুনরায় ক্রয়',
};

// রেস্ট্রিকশনের বিবরণ
export const DEAL_RESTRICTION_DESCRIPTIONS: Record<DealRestriction, string> = {
  minimum_order_amount: 'নির্দিষ্ট পরিমাণের বেশি অর্ডার করলেই ডিল প্রযোজ্য',
  maximum_quantity: 'সর্বোচ্চ কতটি পণ্য কেনা যাবে তা নির্ধারণ',
  user_limit: 'প্রতি ব্যবহারকারী কতবার ডিল ব্যবহার করতে পারবে',
  product_limit: 'কোন পণ্যের উপর ডিল প্রযোজ্য হবে',
  category_limit: 'কোন ক্যাটাগরির পণ্যের উপর ডিল প্রযোজ্য হবে',
  brand_limit: 'কোন ব্র্যান্ডের পণ্যের উপর ডিল প্রযোজ্য হবে',
  time_limit: 'নির্দিষ্ট সময়ে ডিল প্রযোজ্য হবে',
  day_limit: 'নির্দিষ্ট দিনে ডিল প্রযোজ্য হবে',
  week_limit: 'নির্দিষ্ট সপ্তাহে ডিল প্রযোজ্য হবে',
  month_limit: 'নির্দিষ্ট মাসে ডিল প্রযোজ্য হবে',
  location_limit: 'নির্দিষ্ট অঞ্চলে ডিল প্রযোজ্য হবে',
  user_group_limit: 'নির্দিষ্ট ব্যবহারকারী গ্রুপের জন্য ডিল প্রযোজ্য',
  new_user_only: 'শুধুমাত্র নতুন ব্যবহারকারীদের জন্য ডিল',
  existing_user_only: 'শুধুমাত্র বিদ্যমান ব্যবহারকারীদের জন্য ডিল',
  first_purchase_only: 'শুধুমাত্র প্রথম ক্রয়ের জন্য ডিল',
  repeat_purchase_only: 'শুধুমাত্র পুনরায় ক্রয়ের জন্য ডিল',
};

// রেস্ট্রিকশনের আইকন (আইকন নাম)
export const DEAL_RESTRICTION_ICONS: Record<DealRestriction, string> = {
  minimum_order_amount: 'DollarSign',
  maximum_quantity: 'Package',
  user_limit: 'Users',
  product_limit: 'Box',
  category_limit: 'Folder',
  brand_limit: 'Briefcase',
  time_limit: 'Clock',
  day_limit: 'Sun',
  week_limit: 'Calendar',
  month_limit: 'CalendarDays',
  location_limit: 'MapPin',
  user_group_limit: 'UserCog',
  new_user_only: 'UserPlus',
  existing_user_only: 'UserCheck',
  first_purchase_only: 'ShoppingBag',
  repeat_purchase_only: 'Repeat',
};

// রেস্ট্রিকশনের কালার কোড
export const DEAL_RESTRICTION_COLORS: Record<DealRestriction, string> = {
  minimum_order_amount: '#3B82F6', // Blue
  maximum_quantity: '#EF4444', // Red
  user_limit: '#8B5CF6', // Purple
  product_limit: '#F59E0B', // Amber
  category_limit: '#22C55E', // Green
  brand_limit: '#EC4899', // Pink
  time_limit: '#F97316', // Orange
  day_limit: '#14B8A6', // Teal
  week_limit: '#6366F1', // Indigo
  month_limit: '#06B6D4', // Cyan
  location_limit: '#10B981', // Emerald
  user_group_limit: '#FBBF24', // Yellow
  new_user_only: '#34D399', // Green
  existing_user_only: '#3B82F6', // Blue
  first_purchase_only: '#F472B6', // Pink
  repeat_purchase_only: '#8B5CF6', // Purple
};

// রেস্ট্রিকশনের ডিসপ্লে অর্ডার
export const DEAL_RESTRICTION_DISPLAY_ORDER: Record<DealRestriction, number> = {
  minimum_order_amount: 1,
  maximum_quantity: 2,
  user_limit: 3,
  product_limit: 4,
  category_limit: 5,
  brand_limit: 6,
  time_limit: 7,
  day_limit: 8,
  week_limit: 9,
  month_limit: 10,
  location_limit: 11,
  user_group_limit: 12,
  new_user_only: 13,
  existing_user_only: 14,
  first_purchase_only: 15,
  repeat_purchase_only: 16,
};

// রেস্ট্রিকশন গ্রুপ
export const DEAL_RESTRICTION_GROUPS = {
  ORDER_BASED: ['minimum_order_amount'] as DealRestriction[],
  QUANTITY_BASED: ['maximum_quantity'] as DealRestriction[],
  USER_BASED: [
    'user_limit',
    'user_group_limit',
    'new_user_only',
    'existing_user_only',
  ] as DealRestriction[],
  PRODUCT_BASED: ['product_limit', 'category_limit', 'brand_limit'] as DealRestriction[],
  TIME_BASED: ['time_limit', 'day_limit', 'week_limit', 'month_limit'] as DealRestriction[],
  LOCATION_BASED: ['location_limit'] as DealRestriction[],
  PURCHASE_BASED: ['first_purchase_only', 'repeat_purchase_only'] as DealRestriction[],
} as const;

// রেস্ট্রিকশন কনফিগারেশন ইন্টারফেস
export interface DealRestrictionConfig {
  restriction: DealRestriction;
  label: string;
  description: string;
  icon: string;
  color: string;
  displayOrder: number;
  isActive: boolean;
}

// সম্পূর্ণ রেস্ট্রিকশন কনফিগারেশন
export const DEAL_RESTRICTION_CONFIGS: Record<DealRestriction, DealRestrictionConfig> = {
  minimum_order_amount: {
    restriction: 'minimum_order_amount',
    label: DEAL_RESTRICTION_LABELS.minimum_order_amount,
    description: DEAL_RESTRICTION_DESCRIPTIONS.minimum_order_amount,
    icon: DEAL_RESTRICTION_ICONS.minimum_order_amount,
    color: DEAL_RESTRICTION_COLORS.minimum_order_amount,
    displayOrder: DEAL_RESTRICTION_DISPLAY_ORDER.minimum_order_amount,
    isActive: true,
  },
  maximum_quantity: {
    restriction: 'maximum_quantity',
    label: DEAL_RESTRICTION_LABELS.maximum_quantity,
    description: DEAL_RESTRICTION_DESCRIPTIONS.maximum_quantity,
    icon: DEAL_RESTRICTION_ICONS.maximum_quantity,
    color: DEAL_RESTRICTION_COLORS.maximum_quantity,
    displayOrder: DEAL_RESTRICTION_DISPLAY_ORDER.maximum_quantity,
    isActive: true,
  },
  user_limit: {
    restriction: 'user_limit',
    label: DEAL_RESTRICTION_LABELS.user_limit,
    description: DEAL_RESTRICTION_DESCRIPTIONS.user_limit,
    icon: DEAL_RESTRICTION_ICONS.user_limit,
    color: DEAL_RESTRICTION_COLORS.user_limit,
    displayOrder: DEAL_RESTRICTION_DISPLAY_ORDER.user_limit,
    isActive: true,
  },
  product_limit: {
    restriction: 'product_limit',
    label: DEAL_RESTRICTION_LABELS.product_limit,
    description: DEAL_RESTRICTION_DESCRIPTIONS.product_limit,
    icon: DEAL_RESTRICTION_ICONS.product_limit,
    color: DEAL_RESTRICTION_COLORS.product_limit,
    displayOrder: DEAL_RESTRICTION_DISPLAY_ORDER.product_limit,
    isActive: true,
  },
  category_limit: {
    restriction: 'category_limit',
    label: DEAL_RESTRICTION_LABELS.category_limit,
    description: DEAL_RESTRICTION_DESCRIPTIONS.category_limit,
    icon: DEAL_RESTRICTION_ICONS.category_limit,
    color: DEAL_RESTRICTION_COLORS.category_limit,
    displayOrder: DEAL_RESTRICTION_DISPLAY_ORDER.category_limit,
    isActive: true,
  },
  brand_limit: {
    restriction: 'brand_limit',
    label: DEAL_RESTRICTION_LABELS.brand_limit,
    description: DEAL_RESTRICTION_DESCRIPTIONS.brand_limit,
    icon: DEAL_RESTRICTION_ICONS.brand_limit,
    color: DEAL_RESTRICTION_COLORS.brand_limit,
    displayOrder: DEAL_RESTRICTION_DISPLAY_ORDER.brand_limit,
    isActive: true,
  },
  time_limit: {
    restriction: 'time_limit',
    label: DEAL_RESTRICTION_LABELS.time_limit,
    description: DEAL_RESTRICTION_DESCRIPTIONS.time_limit,
    icon: DEAL_RESTRICTION_ICONS.time_limit,
    color: DEAL_RESTRICTION_COLORS.time_limit,
    displayOrder: DEAL_RESTRICTION_DISPLAY_ORDER.time_limit,
    isActive: true,
  },
  day_limit: {
    restriction: 'day_limit',
    label: DEAL_RESTRICTION_LABELS.day_limit,
    description: DEAL_RESTRICTION_DESCRIPTIONS.day_limit,
    icon: DEAL_RESTRICTION_ICONS.day_limit,
    color: DEAL_RESTRICTION_COLORS.day_limit,
    displayOrder: DEAL_RESTRICTION_DISPLAY_ORDER.day_limit,
    isActive: true,
  },
  week_limit: {
    restriction: 'week_limit',
    label: DEAL_RESTRICTION_LABELS.week_limit,
    description: DEAL_RESTRICTION_DESCRIPTIONS.week_limit,
    icon: DEAL_RESTRICTION_ICONS.week_limit,
    color: DEAL_RESTRICTION_COLORS.week_limit,
    displayOrder: DEAL_RESTRICTION_DISPLAY_ORDER.week_limit,
    isActive: true,
  },
  month_limit: {
    restriction: 'month_limit',
    label: DEAL_RESTRICTION_LABELS.month_limit,
    description: DEAL_RESTRICTION_DESCRIPTIONS.month_limit,
    icon: DEAL_RESTRICTION_ICONS.month_limit,
    color: DEAL_RESTRICTION_COLORS.month_limit,
    displayOrder: DEAL_RESTRICTION_DISPLAY_ORDER.month_limit,
    isActive: true,
  },
  location_limit: {
    restriction: 'location_limit',
    label: DEAL_RESTRICTION_LABELS.location_limit,
    description: DEAL_RESTRICTION_DESCRIPTIONS.location_limit,
    icon: DEAL_RESTRICTION_ICONS.location_limit,
    color: DEAL_RESTRICTION_COLORS.location_limit,
    displayOrder: DEAL_RESTRICTION_DISPLAY_ORDER.location_limit,
    isActive: true,
  },
  user_group_limit: {
    restriction: 'user_group_limit',
    label: DEAL_RESTRICTION_LABELS.user_group_limit,
    description: DEAL_RESTRICTION_DESCRIPTIONS.user_group_limit,
    icon: DEAL_RESTRICTION_ICONS.user_group_limit,
    color: DEAL_RESTRICTION_COLORS.user_group_limit,
    displayOrder: DEAL_RESTRICTION_DISPLAY_ORDER.user_group_limit,
    isActive: true,
  },
  new_user_only: {
    restriction: 'new_user_only',
    label: DEAL_RESTRICTION_LABELS.new_user_only,
    description: DEAL_RESTRICTION_DESCRIPTIONS.new_user_only,
    icon: DEAL_RESTRICTION_ICONS.new_user_only,
    color: DEAL_RESTRICTION_COLORS.new_user_only,
    displayOrder: DEAL_RESTRICTION_DISPLAY_ORDER.new_user_only,
    isActive: true,
  },
  existing_user_only: {
    restriction: 'existing_user_only',
    label: DEAL_RESTRICTION_LABELS.existing_user_only,
    description: DEAL_RESTRICTION_DESCRIPTIONS.existing_user_only,
    icon: DEAL_RESTRICTION_ICONS.existing_user_only,
    color: DEAL_RESTRICTION_COLORS.existing_user_only,
    displayOrder: DEAL_RESTRICTION_DISPLAY_ORDER.existing_user_only,
    isActive: true,
  },
  first_purchase_only: {
    restriction: 'first_purchase_only',
    label: DEAL_RESTRICTION_LABELS.first_purchase_only,
    description: DEAL_RESTRICTION_DESCRIPTIONS.first_purchase_only,
    icon: DEAL_RESTRICTION_ICONS.first_purchase_only,
    color: DEAL_RESTRICTION_COLORS.first_purchase_only,
    displayOrder: DEAL_RESTRICTION_DISPLAY_ORDER.first_purchase_only,
    isActive: true,
  },
  repeat_purchase_only: {
    restriction: 'repeat_purchase_only',
    label: DEAL_RESTRICTION_LABELS.repeat_purchase_only,
    description: DEAL_RESTRICTION_DESCRIPTIONS.repeat_purchase_only,
    icon: DEAL_RESTRICTION_ICONS.repeat_purchase_only,
    color: DEAL_RESTRICTION_COLORS.repeat_purchase_only,
    displayOrder: DEAL_RESTRICTION_DISPLAY_ORDER.repeat_purchase_only,
    isActive: true,
  },
};

// হেল্পার ফাংশন: রেস্ট্রিকশন ভ্যালিড কিনা চেক করুন
export const isValidDealRestriction = (restriction: string): restriction is DealRestriction => {
  return Object.values(DEAL_RESTRICTION).includes(restriction as DealRestriction);
};

// হেল্পার ফাংশন: সক্রিয় রেস্ট্রিকশন গুলো পান
export const getActiveDealRestrictions = (): DealRestriction[] => {
  return Object.values(DEAL_RESTRICTION_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.restriction);
};

// হেল্পার ফাংশন: ডিসপ্লে অর্ডার অনুযায়ী সাজান
export const getDealRestrictionsByOrder = (): DealRestriction[] => {
  return Object.values(DEAL_RESTRICTION_CONFIGS)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((config) => config.restriction);
};

// হেল্পার ফাংশন: রেস্ট্রিকশন গ্রুপ অনুযায়ী ফিল্টার
export const getDealRestrictionsByGroup = (
  group: keyof typeof DEAL_RESTRICTION_GROUPS
): DealRestriction[] => {
  return DEAL_RESTRICTION_GROUPS[group] || [];
};

// হেল্পার ফাংশন: রেস্ট্রিকশনের লেবেল পান
export const getDealRestrictionLabel = (restriction: DealRestriction): string => {
  return DEAL_RESTRICTION_LABELS[restriction] || restriction;
};

// হেল্পার ফাংশন: রেস্ট্রিকশনের কালার পান
export const getDealRestrictionColor = (restriction: DealRestriction): string => {
  return DEAL_RESTRICTION_COLORS[restriction] || '#6B7280';
};

// হেল্পার ফাংশন: রেস্ট্রিকশনের আইকন পান
export const getDealRestrictionIcon = (restriction: DealRestriction): string => {
  return DEAL_RESTRICTION_ICONS[restriction] || 'Circle';
};
