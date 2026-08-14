/**
 * Flash Sale Price Type Constants
 * প্রাইস টাইপসমূহ
 */

// প্রাইস টাইপ এনাম
export const PRICE_TYPE = {
  REGULAR: 'regular',
  DISCOUNTED: 'discounted',
  FLASH_SALE: 'flash_sale',
  DEAL: 'deal',
  BUNDLE: 'bundle',
  VOLUME: 'volume',
  TIERED: 'tiered',
  MEMBER: 'member',
  COUPON: 'coupon',
  VOUCHER: 'voucher',
  SEASONAL: 'seasonal',
  PROMOTIONAL: 'promotional',
  CLEARANCE: 'clearance',
  PREMIUM: 'premium',
  STANDARD: 'standard',
  ECONOMY: 'economy',
  CUSTOM: 'custom',
  DYNAMIC: 'dynamic',
  STATIC: 'static',
  COMPARATIVE: 'comparative',
} as const;

// প্রাইস টাইপ টাইপ
export type PriceType = (typeof PRICE_TYPE)[keyof typeof PRICE_TYPE];

// টাইপের লেবেল
export const PRICE_TYPE_LABELS: Record<PriceType, string> = {
  regular: 'নিয়মিত',
  discounted: 'ডিসকাউন্টেড',
  flash_sale: 'ফ্ল্যাশ সেল',
  deal: 'ডিল',
  bundle: 'বান্ডেল',
  volume: 'ভলিউম',
  tiered: 'স্তরভিত্তিক',
  member: 'সদস্য',
  coupon: 'কুপন',
  voucher: 'ভাউচার',
  seasonal: 'মৌসুমি',
  promotional: 'প্রচারমূলক',
  clearance: 'ক্লিয়ারেন্স',
  premium: 'প্রিমিয়াম',
  standard: 'স্ট্যান্ডার্ড',
  economy: 'ইকোনমি',
  custom: 'কাস্টম',
  dynamic: 'ডায়নামিক',
  static: 'স্ট্যাটিক',
  comparative: 'তুলনামূলক',
};

// টাইপের বিবরণ
export const PRICE_TYPE_DESCRIPTIONS: Record<PriceType, string> = {
  regular: 'নিয়মিত মূল্য',
  discounted: 'ডিসকাউন্টকৃত মূল্য',
  flash_sale: 'ফ্ল্যাশ সেল মূল্য',
  deal: 'ডিল মূল্য',
  bundle: 'বান্ডেল মূল্য',
  volume: 'ভলিউম ভিত্তিক মূল্য',
  tiered: 'স্তরভিত্তিক মূল্য',
  member: 'সদস্য বিশেষ মূল্য',
  coupon: 'কুপন ভিত্তিক মূল্য',
  voucher: 'ভাউচার ভিত্তিক মূল্য',
  seasonal: 'মৌসুমি মূল্য',
  promotional: 'প্রচারমূলক মূল্য',
  clearance: 'ক্লিয়ারেন্স মূল্য',
  premium: 'প্রিমিয়াম মূল্য',
  standard: 'স্ট্যান্ডার্ড মূল্য',
  economy: 'ইকোনমি মূল্য',
  custom: 'কাস্টম মূল্য',
  dynamic: 'ডায়নামিক মূল্য',
  static: 'স্ট্যাটিক মূল্য',
  comparative: 'তুলনামূলক মূল্য',
};

// টাইপের আইকন
export const PRICE_TYPE_ICONS: Record<PriceType, string> = {
  regular: 'ShoppingBag',
  discounted: 'Percent',
  flash_sale: 'Zap',
  deal: 'Tag',
  bundle: 'Layers',
  volume: 'BarChart',
  tiered: 'Layers',
  member: 'Users',
  coupon: 'Ticket',
  voucher: 'CreditCard',
  seasonal: 'CloudSun',
  promotional: 'Megaphone',
  clearance: 'Tag',
  premium: 'Star',
  standard: 'Check',
  economy: 'Coins',
  custom: 'Settings',
  dynamic: 'Activity',
  static: 'Circle',
  comparative: 'GitCompare',
};

// টাইপের কালার
export const PRICE_TYPE_COLORS: Record<PriceType, string> = {
  regular: '#3B82F6',
  discounted: '#22C55E',
  flash_sale: '#EF4444',
  deal: '#F59E0B',
  bundle: '#8B5CF6',
  volume: '#14B8A6',
  tiered: '#6366F1',
  member: '#EC4899',
  coupon: '#06B6D4',
  voucher: '#F97316',
  seasonal: '#22C55E',
  promotional: '#EC4899',
  clearance: '#F97316',
  premium: '#8B5CF6',
  standard: '#3B82F6',
  economy: '#10B981',
  custom: '#6366F1',
  dynamic: '#06B6D4',
  static: '#9CA3AF',
  comparative: '#FBBF24',
};

// টাইপ গ্রুপ
export const PRICE_TYPE_GROUPS = {
  REGULAR_PRICE: ['regular', 'standard', 'economy'] as PriceType[],
  DISCOUNTED_PRICE: ['discounted', 'flash_sale', 'deal', 'clearance'] as PriceType[],
  USER_BASED: ['member', 'coupon', 'voucher'] as PriceType[],
  QUANTITY_BASED: ['volume', 'tiered', 'bundle'] as PriceType[],
  TIME_BASED: ['seasonal', 'promotional'] as PriceType[],
  SPECIAL: ['premium', 'custom', 'dynamic', 'static', 'comparative'] as PriceType[],
} as const;

// টাইপ কনফিগারেশন ইন্টারফেস
export interface PriceTypeConfig {
  type: PriceType;
  label: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
}

// সম্পূর্ণ টাইপ কনফিগারেশন
export const PRICE_TYPE_CONFIGS: Record<PriceType, PriceTypeConfig> = {
  regular: {
    type: 'regular',
    label: PRICE_TYPE_LABELS.regular,
    description: PRICE_TYPE_DESCRIPTIONS.regular,
    icon: PRICE_TYPE_ICONS.regular,
    color: PRICE_TYPE_COLORS.regular,
    isActive: true,
  },
  discounted: {
    type: 'discounted',
    label: PRICE_TYPE_LABELS.discounted,
    description: PRICE_TYPE_DESCRIPTIONS.discounted,
    icon: PRICE_TYPE_ICONS.discounted,
    color: PRICE_TYPE_COLORS.discounted,
    isActive: true,
  },
  flash_sale: {
    type: 'flash_sale',
    label: PRICE_TYPE_LABELS.flash_sale,
    description: PRICE_TYPE_DESCRIPTIONS.flash_sale,
    icon: PRICE_TYPE_ICONS.flash_sale,
    color: PRICE_TYPE_COLORS.flash_sale,
    isActive: true,
  },
  deal: {
    type: 'deal',
    label: PRICE_TYPE_LABELS.deal,
    description: PRICE_TYPE_DESCRIPTIONS.deal,
    icon: PRICE_TYPE_ICONS.deal,
    color: PRICE_TYPE_COLORS.deal,
    isActive: true,
  },
  bundle: {
    type: 'bundle',
    label: PRICE_TYPE_LABELS.bundle,
    description: PRICE_TYPE_DESCRIPTIONS.bundle,
    icon: PRICE_TYPE_ICONS.bundle,
    color: PRICE_TYPE_COLORS.bundle,
    isActive: true,
  },
  volume: {
    type: 'volume',
    label: PRICE_TYPE_LABELS.volume,
    description: PRICE_TYPE_DESCRIPTIONS.volume,
    icon: PRICE_TYPE_ICONS.volume,
    color: PRICE_TYPE_COLORS.volume,
    isActive: true,
  },
  tiered: {
    type: 'tiered',
    label: PRICE_TYPE_LABELS.tiered,
    description: PRICE_TYPE_DESCRIPTIONS.tiered,
    icon: PRICE_TYPE_ICONS.tiered,
    color: PRICE_TYPE_COLORS.tiered,
    isActive: true,
  },
  member: {
    type: 'member',
    label: PRICE_TYPE_LABELS.member,
    description: PRICE_TYPE_DESCRIPTIONS.member,
    icon: PRICE_TYPE_ICONS.member,
    color: PRICE_TYPE_COLORS.member,
    isActive: true,
  },
  coupon: {
    type: 'coupon',
    label: PRICE_TYPE_LABELS.coupon,
    description: PRICE_TYPE_DESCRIPTIONS.coupon,
    icon: PRICE_TYPE_ICONS.coupon,
    color: PRICE_TYPE_COLORS.coupon,
    isActive: true,
  },
  voucher: {
    type: 'voucher',
    label: PRICE_TYPE_LABELS.voucher,
    description: PRICE_TYPE_DESCRIPTIONS.voucher,
    icon: PRICE_TYPE_ICONS.voucher,
    color: PRICE_TYPE_COLORS.voucher,
    isActive: true,
  },
  seasonal: {
    type: 'seasonal',
    label: PRICE_TYPE_LABELS.seasonal,
    description: PRICE_TYPE_DESCRIPTIONS.seasonal,
    icon: PRICE_TYPE_ICONS.seasonal,
    color: PRICE_TYPE_COLORS.seasonal,
    isActive: true,
  },
  promotional: {
    type: 'promotional',
    label: PRICE_TYPE_LABELS.promotional,
    description: PRICE_TYPE_DESCRIPTIONS.promotional,
    icon: PRICE_TYPE_ICONS.promotional,
    color: PRICE_TYPE_COLORS.promotional,
    isActive: true,
  },
  clearance: {
    type: 'clearance',
    label: PRICE_TYPE_LABELS.clearance,
    description: PRICE_TYPE_DESCRIPTIONS.clearance,
    icon: PRICE_TYPE_ICONS.clearance,
    color: PRICE_TYPE_COLORS.clearance,
    isActive: true,
  },
  premium: {
    type: 'premium',
    label: PRICE_TYPE_LABELS.premium,
    description: PRICE_TYPE_DESCRIPTIONS.premium,
    icon: PRICE_TYPE_ICONS.premium,
    color: PRICE_TYPE_COLORS.premium,
    isActive: true,
  },
  standard: {
    type: 'standard',
    label: PRICE_TYPE_LABELS.standard,
    description: PRICE_TYPE_DESCRIPTIONS.standard,
    icon: PRICE_TYPE_ICONS.standard,
    color: PRICE_TYPE_COLORS.standard,
    isActive: true,
  },
  economy: {
    type: 'economy',
    label: PRICE_TYPE_LABELS.economy,
    description: PRICE_TYPE_DESCRIPTIONS.economy,
    icon: PRICE_TYPE_ICONS.economy,
    color: PRICE_TYPE_COLORS.economy,
    isActive: true,
  },
  custom: {
    type: 'custom',
    label: PRICE_TYPE_LABELS.custom,
    description: PRICE_TYPE_DESCRIPTIONS.custom,
    icon: PRICE_TYPE_ICONS.custom,
    color: PRICE_TYPE_COLORS.custom,
    isActive: true,
  },
  dynamic: {
    type: 'dynamic',
    label: PRICE_TYPE_LABELS.dynamic,
    description: PRICE_TYPE_DESCRIPTIONS.dynamic,
    icon: PRICE_TYPE_ICONS.dynamic,
    color: PRICE_TYPE_COLORS.dynamic,
    isActive: true,
  },
  static: {
    type: 'static',
    label: PRICE_TYPE_LABELS.static,
    description: PRICE_TYPE_DESCRIPTIONS.static,
    icon: PRICE_TYPE_ICONS.static,
    color: PRICE_TYPE_COLORS.static,
    isActive: true,
  },
  comparative: {
    type: 'comparative',
    label: PRICE_TYPE_LABELS.comparative,
    description: PRICE_TYPE_DESCRIPTIONS.comparative,
    icon: PRICE_TYPE_ICONS.comparative,
    color: PRICE_TYPE_COLORS.comparative,
    isActive: true,
  },
};

// হেল্পার ফাংশন: প্রাইস টাইপ ভ্যালিড কিনা চেক করুন
export const isValidPriceType = (type: string): type is PriceType => {
  return Object.values(PRICE_TYPE).includes(type as PriceType);
};

// হেল্পার ফাংশন: সক্রিয় প্রাইস টাইপ গুলো পান
export const getActivePriceTypes = (): PriceType[] => {
  return Object.values(PRICE_TYPE_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.type);
};

// হেল্পার ফাংশন: প্রাইস টাইপ গ্রুপ অনুযায়ী ফিল্টার
export const getPriceTypesByGroup = (group: keyof typeof PRICE_TYPE_GROUPS): PriceType[] => {
  return PRICE_TYPE_GROUPS[group] || [];
};

// হেল্পার ফাংশন: প্রাইস টাইপের লেবেল পান
export const getPriceTypeLabel = (type: PriceType): string => {
  return PRICE_TYPE_LABELS[type] || type;
};

// হেল্পার ফাংশন: প্রাইস টাইপের বিবরণ পান
export const getPriceTypeDescription = (type: PriceType): string => {
  return PRICE_TYPE_DESCRIPTIONS[type] || '';
};

// হেল্পার ফাংশন: প্রাইস টাইপের কালার পান
export const getPriceTypeColor = (type: PriceType): string => {
  return PRICE_TYPE_COLORS[type] || '#6B7280';
};

// হেল্পার ফাংশন: প্রাইস টাইপের আইকন পান
export const getPriceTypeIcon = (type: PriceType): string => {
  return PRICE_TYPE_ICONS[type] || 'Circle';
};

// হেল্পার ফাংশন: প্রাইস টাইপ ডিসকাউন্টেড কিনা চেক করুন
export const isDiscountedPriceType = (type: PriceType): boolean => {
  const discountedTypes: PriceType[] = [
    'discounted',
    'flash_sale',
    'deal',
    'clearance',
    'promotional',
  ];
  return discountedTypes.includes(type);
};

// হেল্পার ফাংশন: প্রাইস টাইপ ইউজার বেসড কিনা চেক করুন
export const isUserBasedPriceType = (type: PriceType): boolean => {
  const userBasedTypes: PriceType[] = ['member', 'coupon', 'voucher'];
  return userBasedTypes.includes(type);
};
