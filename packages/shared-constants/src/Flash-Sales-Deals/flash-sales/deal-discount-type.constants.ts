/**
 * Deal Discount Type Constants
 * ডিলের ডিসকাউন্ট প্রকারভেদ সংজ্ঞায়িত করা
 */

// ডিসকাউন্ট টাইপ এনাম
export const DEAL_DISCOUNT_TYPE = {
  PERCENTAGE: 'percentage',
  FIXED_AMOUNT: 'fixed_amount',
  BUY_X_GET_Y: 'buy_x_get_y',
  BUNDLE_DISCOUNT: 'bundle_discount',
  VOLUME_DISCOUNT: 'volume_discount',
  TIERED_DISCOUNT: 'tiered_discount',
  COUPON_DISCOUNT: 'coupon_discount',
  VOUCHER_DISCOUNT: 'voucher_discount',
  FLASH_DISCOUNT: 'flash_discount',
  SEASONAL_DISCOUNT: 'seasonal_discount',
  MEMBER_DISCOUNT: 'member_discount',
  FIRST_ORDER: 'first_order',
  FREE_SHIPPING: 'free_shipping',
  FREE_GIFT: 'free_gift',
  CASHBACK: 'cashback',
  POINTS_DISCOUNT: 'points_discount',
} as const;

// ডিসকাউন্ট টাইপ টাইপ
export type DealDiscountType = (typeof DEAL_DISCOUNT_TYPE)[keyof typeof DEAL_DISCOUNT_TYPE];

// ডিসকাউন্ট টাইপের লেবেল
export const DEAL_DISCOUNT_TYPE_LABELS: Record<DealDiscountType, string> = {
  percentage: 'শতকরা ডিসকাউন্ট',
  fixed_amount: 'নির্দিষ্ট পরিমাণ ডিসকাউন্ট',
  buy_x_get_y: 'একটি কিনলে আরেকটি ফ্রি',
  bundle_discount: 'বান্ডেল ডিসকাউন্ট',
  volume_discount: 'ভলিউম ডিসকাউন্ট',
  tiered_discount: 'স্তরভিত্তিক ডিসকাউন্ট',
  coupon_discount: 'কুপন ডিসকাউন্ট',
  voucher_discount: 'ভাউচার ডিসকাউন্ট',
  flash_discount: 'ফ্ল্যাশ ডিসকাউন্ট',
  seasonal_discount: 'মৌসুমি ডিসকাউন্ট',
  member_discount: 'সদস্য ডিসকাউন্ট',
  first_order: 'প্রথম অর্ডার ডিসকাউন্ট',
  free_shipping: 'ফ্রি শিপিং',
  free_gift: 'ফ্রি গিফট',
  cashback: 'ক্যাশব্যাক',
  points_discount: 'পয়েন্ট ডিসকাউন্ট',
};

// ডিসকাউন্ট টাইপের বিবরণ
export const DEAL_DISCOUNT_TYPE_DESCRIPTIONS: Record<DealDiscountType, string> = {
  percentage: 'মূল্যের উপর শতকরা হারে ডিসকাউন্ট',
  fixed_amount: 'নির্দিষ্ট পরিমাণ টাকা ডিসকাউন্ট',
  buy_x_get_y: 'একটি পণ্য কিনলে অন্যটি ফ্রি',
  bundle_discount: 'একাধিক পণ্য একসাথে কিনলে ডিসকাউন্ট',
  volume_discount: 'অধিক পরিমাণ কেনার জন্য ডিসকাউন্ট',
  tiered_discount: 'পরিমাণ অনুযায়ী স্তরভিত্তিক ডিসকাউন্ট',
  coupon_discount: 'কুপন কোড ব্যবহার করে ডিসকাউন্ট',
  voucher_discount: 'ভাউচার ব্যবহার করে ডিসকাউন্ট',
  flash_discount: 'স্বল্প সময়ের জন্য বিশেষ ডিসকাউন্ট',
  seasonal_discount: 'মৌসুমি বিশেষ ডিসকাউন্ট',
  member_discount: 'সদস্যদের জন্য বিশেষ ডিসকাউন্ট',
  first_order: 'প্রথম অর্ডারের জন্য বিশেষ ডিসকাউন্ট',
  free_shipping: 'ডেলিভারি চার্জ ফ্রি',
  free_gift: 'উপহার হিসেবে পণ্য প্রদান',
  cashback: 'কেনাকাটার পর টাকা ফেরত',
  points_discount: 'পয়েন্ট ব্যবহার করে ডিসকাউন্ট',
};

// ডিসকাউন্ট টাইপের আইকন (আইকন নাম)
export const DEAL_DISCOUNT_TYPE_ICONS: Record<DealDiscountType, string> = {
  percentage: 'Percent',
  fixed_amount: 'DollarSign',
  buy_x_get_y: 'Gift',
  bundle_discount: 'Package',
  volume_discount: 'BarChart',
  tiered_discount: 'Layers',
  coupon_discount: 'Ticket',
  voucher_discount: 'CreditCard',
  flash_discount: 'Zap',
  seasonal_discount: 'CloudSun',
  member_discount: 'Users',
  first_order: 'Award',
  free_shipping: 'Truck',
  free_gift: 'Present',
  cashback: 'Wallet',
  points_discount: 'Coins',
};

// ডিসকাউন্ট টাইপের কালার কোড
export const DEAL_DISCOUNT_TYPE_COLORS: Record<DealDiscountType, string> = {
  percentage: '#3B82F6', // Blue
  fixed_amount: '#8B5CF6', // Purple
  buy_x_get_y: '#EC4899', // Pink
  bundle_discount: '#F59E0B', // Amber
  volume_discount: '#14B8A6', // Teal
  tiered_discount: '#6366F1', // Indigo
  coupon_discount: '#F97316', // Orange
  voucher_discount: '#22C55E', // Green
  flash_discount: '#EF4444', // Red
  seasonal_discount: '#06B6D4', // Cyan
  member_discount: '#8B5CF6', // Purple
  first_order: '#FBBF24', // Yellow
  free_shipping: '#10B981', // Emerald
  free_gift: '#EC4899', // Pink
  cashback: '#F59E0B', // Amber
  points_discount: '#6366F1', // Indigo
};

// ডিসকাউন্ট টাইপের ডিসপ্লে অর্ডার
export const DEAL_DISCOUNT_TYPE_DISPLAY_ORDER: Record<DealDiscountType, number> = {
  percentage: 1,
  fixed_amount: 2,
  buy_x_get_y: 3,
  bundle_discount: 4,
  volume_discount: 5,
  tiered_discount: 6,
  coupon_discount: 7,
  voucher_discount: 8,
  flash_discount: 9,
  seasonal_discount: 10,
  member_discount: 11,
  first_order: 12,
  free_shipping: 13,
  free_gift: 14,
  cashback: 15,
  points_discount: 16,
};

// ডিসকাউন্ট টাইপ গ্রুপ
export const DEAL_DISCOUNT_TYPE_GROUPS = {
  PERCENTAGE_BASED: ['percentage', 'flash_discount', 'seasonal_discount'] as DealDiscountType[],
  FIXED_BASED: ['fixed_amount', 'coupon_discount', 'voucher_discount'] as DealDiscountType[],
  QUANTITY_BASED: [
    'buy_x_get_y',
    'bundle_discount',
    'volume_discount',
    'tiered_discount',
  ] as DealDiscountType[],
  MEMBERSHIP_BASED: ['member_discount', 'first_order', 'points_discount'] as DealDiscountType[],
  BENEFIT_BASED: ['free_shipping', 'free_gift', 'cashback'] as DealDiscountType[],
} as const;

// ডিসকাউন্ট টাইপ কনফিগারেশন ইন্টারফেস
export interface DealDiscountTypeConfig {
  type: DealDiscountType;
  label: string;
  description: string;
  icon: string;
  color: string;
  displayOrder: number;
  isActive: boolean;
}

// সম্পূর্ণ ডিসকাউন্ট টাইপ কনফিগারেশন
export const DEAL_DISCOUNT_TYPE_CONFIGS: Record<DealDiscountType, DealDiscountTypeConfig> = {
  percentage: {
    type: 'percentage',
    label: DEAL_DISCOUNT_TYPE_LABELS.percentage,
    description: DEAL_DISCOUNT_TYPE_DESCRIPTIONS.percentage,
    icon: DEAL_DISCOUNT_TYPE_ICONS.percentage,
    color: DEAL_DISCOUNT_TYPE_COLORS.percentage,
    displayOrder: DEAL_DISCOUNT_TYPE_DISPLAY_ORDER.percentage,
    isActive: true,
  },
  fixed_amount: {
    type: 'fixed_amount',
    label: DEAL_DISCOUNT_TYPE_LABELS.fixed_amount,
    description: DEAL_DISCOUNT_TYPE_DESCRIPTIONS.fixed_amount,
    icon: DEAL_DISCOUNT_TYPE_ICONS.fixed_amount,
    color: DEAL_DISCOUNT_TYPE_COLORS.fixed_amount,
    displayOrder: DEAL_DISCOUNT_TYPE_DISPLAY_ORDER.fixed_amount,
    isActive: true,
  },
  buy_x_get_y: {
    type: 'buy_x_get_y',
    label: DEAL_DISCOUNT_TYPE_LABELS.buy_x_get_y,
    description: DEAL_DISCOUNT_TYPE_DESCRIPTIONS.buy_x_get_y,
    icon: DEAL_DISCOUNT_TYPE_ICONS.buy_x_get_y,
    color: DEAL_DISCOUNT_TYPE_COLORS.buy_x_get_y,
    displayOrder: DEAL_DISCOUNT_TYPE_DISPLAY_ORDER.buy_x_get_y,
    isActive: true,
  },
  bundle_discount: {
    type: 'bundle_discount',
    label: DEAL_DISCOUNT_TYPE_LABELS.bundle_discount,
    description: DEAL_DISCOUNT_TYPE_DESCRIPTIONS.bundle_discount,
    icon: DEAL_DISCOUNT_TYPE_ICONS.bundle_discount,
    color: DEAL_DISCOUNT_TYPE_COLORS.bundle_discount,
    displayOrder: DEAL_DISCOUNT_TYPE_DISPLAY_ORDER.bundle_discount,
    isActive: true,
  },
  volume_discount: {
    type: 'volume_discount',
    label: DEAL_DISCOUNT_TYPE_LABELS.volume_discount,
    description: DEAL_DISCOUNT_TYPE_DESCRIPTIONS.volume_discount,
    icon: DEAL_DISCOUNT_TYPE_ICONS.volume_discount,
    color: DEAL_DISCOUNT_TYPE_COLORS.volume_discount,
    displayOrder: DEAL_DISCOUNT_TYPE_DISPLAY_ORDER.volume_discount,
    isActive: true,
  },
  tiered_discount: {
    type: 'tiered_discount',
    label: DEAL_DISCOUNT_TYPE_LABELS.tiered_discount,
    description: DEAL_DISCOUNT_TYPE_DESCRIPTIONS.tiered_discount,
    icon: DEAL_DISCOUNT_TYPE_ICONS.tiered_discount,
    color: DEAL_DISCOUNT_TYPE_COLORS.tiered_discount,
    displayOrder: DEAL_DISCOUNT_TYPE_DISPLAY_ORDER.tiered_discount,
    isActive: true,
  },
  coupon_discount: {
    type: 'coupon_discount',
    label: DEAL_DISCOUNT_TYPE_LABELS.coupon_discount,
    description: DEAL_DISCOUNT_TYPE_DESCRIPTIONS.coupon_discount,
    icon: DEAL_DISCOUNT_TYPE_ICONS.coupon_discount,
    color: DEAL_DISCOUNT_TYPE_COLORS.coupon_discount,
    displayOrder: DEAL_DISCOUNT_TYPE_DISPLAY_ORDER.coupon_discount,
    isActive: true,
  },
  voucher_discount: {
    type: 'voucher_discount',
    label: DEAL_DISCOUNT_TYPE_LABELS.voucher_discount,
    description: DEAL_DISCOUNT_TYPE_DESCRIPTIONS.voucher_discount,
    icon: DEAL_DISCOUNT_TYPE_ICONS.voucher_discount,
    color: DEAL_DISCOUNT_TYPE_COLORS.voucher_discount,
    displayOrder: DEAL_DISCOUNT_TYPE_DISPLAY_ORDER.voucher_discount,
    isActive: true,
  },
  flash_discount: {
    type: 'flash_discount',
    label: DEAL_DISCOUNT_TYPE_LABELS.flash_discount,
    description: DEAL_DISCOUNT_TYPE_DESCRIPTIONS.flash_discount,
    icon: DEAL_DISCOUNT_TYPE_ICONS.flash_discount,
    color: DEAL_DISCOUNT_TYPE_COLORS.flash_discount,
    displayOrder: DEAL_DISCOUNT_TYPE_DISPLAY_ORDER.flash_discount,
    isActive: true,
  },
  seasonal_discount: {
    type: 'seasonal_discount',
    label: DEAL_DISCOUNT_TYPE_LABELS.seasonal_discount,
    description: DEAL_DISCOUNT_TYPE_DESCRIPTIONS.seasonal_discount,
    icon: DEAL_DISCOUNT_TYPE_ICONS.seasonal_discount,
    color: DEAL_DISCOUNT_TYPE_COLORS.seasonal_discount,
    displayOrder: DEAL_DISCOUNT_TYPE_DISPLAY_ORDER.seasonal_discount,
    isActive: true,
  },
  member_discount: {
    type: 'member_discount',
    label: DEAL_DISCOUNT_TYPE_LABELS.member_discount,
    description: DEAL_DISCOUNT_TYPE_DESCRIPTIONS.member_discount,
    icon: DEAL_DISCOUNT_TYPE_ICONS.member_discount,
    color: DEAL_DISCOUNT_TYPE_COLORS.member_discount,
    displayOrder: DEAL_DISCOUNT_TYPE_DISPLAY_ORDER.member_discount,
    isActive: true,
  },
  first_order: {
    type: 'first_order',
    label: DEAL_DISCOUNT_TYPE_LABELS.first_order,
    description: DEAL_DISCOUNT_TYPE_DESCRIPTIONS.first_order,
    icon: DEAL_DISCOUNT_TYPE_ICONS.first_order,
    color: DEAL_DISCOUNT_TYPE_COLORS.first_order,
    displayOrder: DEAL_DISCOUNT_TYPE_DISPLAY_ORDER.first_order,
    isActive: true,
  },
  free_shipping: {
    type: 'free_shipping',
    label: DEAL_DISCOUNT_TYPE_LABELS.free_shipping,
    description: DEAL_DISCOUNT_TYPE_DESCRIPTIONS.free_shipping,
    icon: DEAL_DISCOUNT_TYPE_ICONS.free_shipping,
    color: DEAL_DISCOUNT_TYPE_COLORS.free_shipping,
    displayOrder: DEAL_DISCOUNT_TYPE_DISPLAY_ORDER.free_shipping,
    isActive: true,
  },
  free_gift: {
    type: 'free_gift',
    label: DEAL_DISCOUNT_TYPE_LABELS.free_gift,
    description: DEAL_DISCOUNT_TYPE_DESCRIPTIONS.free_gift,
    icon: DEAL_DISCOUNT_TYPE_ICONS.free_gift,
    color: DEAL_DISCOUNT_TYPE_COLORS.free_gift,
    displayOrder: DEAL_DISCOUNT_TYPE_DISPLAY_ORDER.free_gift,
    isActive: true,
  },
  cashback: {
    type: 'cashback',
    label: DEAL_DISCOUNT_TYPE_LABELS.cashback,
    description: DEAL_DISCOUNT_TYPE_DESCRIPTIONS.cashback,
    icon: DEAL_DISCOUNT_TYPE_ICONS.cashback,
    color: DEAL_DISCOUNT_TYPE_COLORS.cashback,
    displayOrder: DEAL_DISCOUNT_TYPE_DISPLAY_ORDER.cashback,
    isActive: true,
  },
  points_discount: {
    type: 'points_discount',
    label: DEAL_DISCOUNT_TYPE_LABELS.points_discount,
    description: DEAL_DISCOUNT_TYPE_DESCRIPTIONS.points_discount,
    icon: DEAL_DISCOUNT_TYPE_ICONS.points_discount,
    color: DEAL_DISCOUNT_TYPE_COLORS.points_discount,
    displayOrder: DEAL_DISCOUNT_TYPE_DISPLAY_ORDER.points_discount,
    isActive: true,
  },
};

// হেল্পার ফাংশন: ডিসকাউন্ট টাইপ ভ্যালিড কিনা চেক করুন
export const isValidDealDiscountType = (type: string): type is DealDiscountType => {
  return Object.values(DEAL_DISCOUNT_TYPE).includes(type as DealDiscountType);
};

// হেল্পার ফাংশন: সক্রিয় ডিসকাউন্ট টাইপ গুলো পান
export const getActiveDealDiscountTypes = (): DealDiscountType[] => {
  return Object.values(DEAL_DISCOUNT_TYPE_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.type);
};

// হেল্পার ফাংশন: ডিসপ্লে অর্ডার অনুযায়ী সাজান
export const getDealDiscountTypesByOrder = (): DealDiscountType[] => {
  return Object.values(DEAL_DISCOUNT_TYPE_CONFIGS)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((config) => config.type);
};

// হেল্পার ফাংশন: ডিসকাউন্ট টাইপ গ্রুপ অনুযায়ী ফিল্টার
export const getDealDiscountTypesByGroup = (
  group: keyof typeof DEAL_DISCOUNT_TYPE_GROUPS
): DealDiscountType[] => {
  return DEAL_DISCOUNT_TYPE_GROUPS[group] || [];
};

// হেল্পার ফাংশন: ডিসকাউন্ট টাইপের লেবেল পান
export const getDealDiscountTypeLabel = (type: DealDiscountType): string => {
  return DEAL_DISCOUNT_TYPE_LABELS[type] || type;
};

// হেল্পার ফাংশন: ডিসকাউন্ট টাইপের কালার পান
export const getDealDiscountTypeColor = (type: DealDiscountType): string => {
  return DEAL_DISCOUNT_TYPE_COLORS[type] || '#6B7280';
};
