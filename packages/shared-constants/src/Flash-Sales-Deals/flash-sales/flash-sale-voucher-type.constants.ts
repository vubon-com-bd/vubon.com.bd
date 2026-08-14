/**
 * Flash Sale Voucher Type Constants
 * ভাউচারের প্রকারভেদ
 */

// ভাউচার টাইপ এনাম
export const VOUCHER_TYPE = {
  GIFT: 'gift',
  DISCOUNT: 'discount',
  FREE_ITEM: 'free_item',
  SERVICE: 'service',
  UPGRADE: 'upgrade',
  EXTRA: 'extra',
  BONUS: 'bonus',
  REWARD: 'reward',
  COMPENSATION: 'compensation',
  REFERRAL: 'referral',
  LOYALTY: 'loyalty',
  VIP: 'vip',
  PROMOTIONAL: 'promotional',
  SEASONAL: 'seasonal',
  HOLIDAY: 'holiday',
  BIRTHDAY: 'birthday',
  ANNIVERSARY: 'anniversary',
  CUSTOM: 'custom',
  DIGITAL: 'digital',
  PHYSICAL: 'physical',
  PREPAID: 'prepaid',
  POSTPAID: 'postpaid',
} as const;

// ভাউচার টাইপ টাইপ
export type VoucherType = (typeof VOUCHER_TYPE)[keyof typeof VOUCHER_TYPE];

// টাইপের লেবেল
export const VOUCHER_TYPE_LABELS: Record<VoucherType, string> = {
  gift: 'গিফট',
  discount: 'ডিসকাউন্ট',
  free_item: 'ফ্রি আইটেম',
  service: 'সেবা',
  upgrade: 'আপগ্রেড',
  extra: 'অতিরিক্ত',
  bonus: 'বোনাস',
  reward: 'পুরস্কার',
  compensation: 'ক্ষতিপূরণ',
  referral: 'রেফারেল',
  loyalty: 'লয়ালটি',
  vip: 'ভিআইপি',
  promotional: 'প্রচারমূলক',
  seasonal: 'মৌসুমি',
  holiday: 'ছুটির দিন',
  birthday: 'জন্মদিন',
  anniversary: 'বার্ষিকী',
  custom: 'কাস্টম',
  digital: 'ডিজিটাল',
  physical: 'ভৌত',
  prepaid: 'প্রিপেইড',
  postpaid: 'পোস্টপেইড',
};

// টাইপের বিবরণ
export const VOUCHER_TYPE_DESCRIPTIONS: Record<VoucherType, string> = {
  gift: 'উপহার হিসেবে প্রদত্ত ভাউচার',
  discount: 'ডিসকাউন্ট ভিত্তিক ভাউচার',
  free_item: 'ফ্রি আইটেম পাওয়ার ভাউচার',
  service: 'সেবা পাওয়ার ভাউচার',
  upgrade: 'আপগ্রেড পাওয়ার ভাউচার',
  extra: 'অতিরিক্ত সুবিধা পাওয়ার ভাউচার',
  bonus: 'বোনাস হিসেবে প্রদত্ত ভাউচার',
  reward: 'পুরস্কার হিসেবে প্রদত্ত ভাউচার',
  compensation: 'ক্ষতিপূরণ হিসেবে প্রদত্ত ভাউচার',
  referral: 'রেফারেল করার জন্য ভাউচার',
  loyalty: 'লয়ালটি প্রোগ্রামের ভাউচার',
  vip: 'ভিআইপি গ্রাহকদের জন্য ভাউচার',
  promotional: 'প্রচারমূলক ভাউচার',
  seasonal: 'মৌসুমি ভিত্তিক ভাউচার',
  holiday: 'ছুটির দিনের ভাউচার',
  birthday: 'জন্মদিনের ভাউচার',
  anniversary: 'বার্ষিকী উপলক্ষে ভাউচার',
  custom: 'কাস্টমাইজড ভাউচার',
  digital: 'ডিজিটাল ফরম্যাটের ভাউচার',
  physical: 'ভৌত ফরম্যাটের ভাউচার',
  prepaid: 'প্রিপেইড ভাউচার',
  postpaid: 'পোস্টপেইড ভাউচার',
};

// টাইপের আইকন
export const VOUCHER_TYPE_ICONS: Record<VoucherType, string> = {
  gift: 'Gift',
  discount: 'Percent',
  free_item: 'Package',
  service: 'Briefcase',
  upgrade: 'ArrowUp',
  extra: 'Plus',
  bonus: 'Star',
  reward: 'Trophy',
  compensation: 'Shield',
  referral: 'Users',
  loyalty: 'Heart',
  vip: 'Crown',
  promotional: 'Megaphone',
  seasonal: 'CloudSun',
  holiday: 'Calendar',
  birthday: 'Cake',
  anniversary: 'CalendarDays',
  custom: 'Settings',
  digital: 'Download',
  physical: 'Package',
  prepaid: 'CreditCard',
  postpaid: 'Wallet',
};

// টাইপের কালার
export const VOUCHER_TYPE_COLORS: Record<VoucherType, string> = {
  gift: '#EC4899',
  discount: '#3B82F6',
  free_item: '#22C55E',
  service: '#8B5CF6',
  upgrade: '#F59E0B',
  extra: '#14B8A6',
  bonus: '#FBBF24',
  reward: '#F97316',
  compensation: '#EF4444',
  referral: '#06B6D4',
  loyalty: '#EC4899',
  vip: '#8B5CF6',
  promotional: '#F97316',
  seasonal: '#22C55E',
  holiday: '#EF4444',
  birthday: '#EC4899',
  anniversary: '#8B5CF6',
  custom: '#6366F1',
  digital: '#06B6D4',
  physical: '#F59E0B',
  prepaid: '#3B82F6',
  postpaid: '#22C55E',
};

// টাইপ গ্রুপ
export const VOUCHER_TYPE_GROUPS = {
  VALUE_BASED: ['gift', 'discount', 'free_item'] as VoucherType[],
  SERVICE_BASED: ['service', 'upgrade', 'extra'] as VoucherType[],
  REWARD_BASED: ['bonus', 'reward', 'compensation', 'referral', 'loyalty', 'vip'] as VoucherType[],
  TIME_BASED: ['promotional', 'seasonal', 'holiday', 'birthday', 'anniversary'] as VoucherType[],
  FORMAT_BASED: ['digital', 'physical', 'prepaid', 'postpaid'] as VoucherType[],
  SPECIAL: ['custom'] as VoucherType[],
} as const;

// টাইপ কনফিগারেশন ইন্টারফেস
export interface VoucherTypeConfig {
  type: VoucherType;
  label: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
}

// সম্পূর্ণ টাইপ কনফিগারেশন
export const VOUCHER_TYPE_CONFIGS: Record<VoucherType, VoucherTypeConfig> = {
  gift: {
    type: 'gift',
    label: VOUCHER_TYPE_LABELS.gift,
    description: VOUCHER_TYPE_DESCRIPTIONS.gift,
    icon: VOUCHER_TYPE_ICONS.gift,
    color: VOUCHER_TYPE_COLORS.gift,
    isActive: true,
  },
  discount: {
    type: 'discount',
    label: VOUCHER_TYPE_LABELS.discount,
    description: VOUCHER_TYPE_DESCRIPTIONS.discount,
    icon: VOUCHER_TYPE_ICONS.discount,
    color: VOUCHER_TYPE_COLORS.discount,
    isActive: true,
  },
  free_item: {
    type: 'free_item',
    label: VOUCHER_TYPE_LABELS.free_item,
    description: VOUCHER_TYPE_DESCRIPTIONS.free_item,
    icon: VOUCHER_TYPE_ICONS.free_item,
    color: VOUCHER_TYPE_COLORS.free_item,
    isActive: true,
  },
  service: {
    type: 'service',
    label: VOUCHER_TYPE_LABELS.service,
    description: VOUCHER_TYPE_DESCRIPTIONS.service,
    icon: VOUCHER_TYPE_ICONS.service,
    color: VOUCHER_TYPE_COLORS.service,
    isActive: true,
  },
  upgrade: {
    type: 'upgrade',
    label: VOUCHER_TYPE_LABELS.upgrade,
    description: VOUCHER_TYPE_DESCRIPTIONS.upgrade,
    icon: VOUCHER_TYPE_ICONS.upgrade,
    color: VOUCHER_TYPE_COLORS.upgrade,
    isActive: true,
  },
  extra: {
    type: 'extra',
    label: VOUCHER_TYPE_LABELS.extra,
    description: VOUCHER_TYPE_DESCRIPTIONS.extra,
    icon: VOUCHER_TYPE_ICONS.extra,
    color: VOUCHER_TYPE_COLORS.extra,
    isActive: true,
  },
  bonus: {
    type: 'bonus',
    label: VOUCHER_TYPE_LABELS.bonus,
    description: VOUCHER_TYPE_DESCRIPTIONS.bonus,
    icon: VOUCHER_TYPE_ICONS.bonus,
    color: VOUCHER_TYPE_COLORS.bonus,
    isActive: true,
  },
  reward: {
    type: 'reward',
    label: VOUCHER_TYPE_LABELS.reward,
    description: VOUCHER_TYPE_DESCRIPTIONS.reward,
    icon: VOUCHER_TYPE_ICONS.reward,
    color: VOUCHER_TYPE_COLORS.reward,
    isActive: true,
  },
  compensation: {
    type: 'compensation',
    label: VOUCHER_TYPE_LABELS.compensation,
    description: VOUCHER_TYPE_DESCRIPTIONS.compensation,
    icon: VOUCHER_TYPE_ICONS.compensation,
    color: VOUCHER_TYPE_COLORS.compensation,
    isActive: true,
  },
  referral: {
    type: 'referral',
    label: VOUCHER_TYPE_LABELS.referral,
    description: VOUCHER_TYPE_DESCRIPTIONS.referral,
    icon: VOUCHER_TYPE_ICONS.referral,
    color: VOUCHER_TYPE_COLORS.referral,
    isActive: true,
  },
  loyalty: {
    type: 'loyalty',
    label: VOUCHER_TYPE_LABELS.loyalty,
    description: VOUCHER_TYPE_DESCRIPTIONS.loyalty,
    icon: VOUCHER_TYPE_ICONS.loyalty,
    color: VOUCHER_TYPE_COLORS.loyalty,
    isActive: true,
  },
  vip: {
    type: 'vip',
    label: VOUCHER_TYPE_LABELS.vip,
    description: VOUCHER_TYPE_DESCRIPTIONS.vip,
    icon: VOUCHER_TYPE_ICONS.vip,
    color: VOUCHER_TYPE_COLORS.vip,
    isActive: true,
  },
  promotional: {
    type: 'promotional',
    label: VOUCHER_TYPE_LABELS.promotional,
    description: VOUCHER_TYPE_DESCRIPTIONS.promotional,
    icon: VOUCHER_TYPE_ICONS.promotional,
    color: VOUCHER_TYPE_COLORS.promotional,
    isActive: true,
  },
  seasonal: {
    type: 'seasonal',
    label: VOUCHER_TYPE_LABELS.seasonal,
    description: VOUCHER_TYPE_DESCRIPTIONS.seasonal,
    icon: VOUCHER_TYPE_ICONS.seasonal,
    color: VOUCHER_TYPE_COLORS.seasonal,
    isActive: true,
  },
  holiday: {
    type: 'holiday',
    label: VOUCHER_TYPE_LABELS.holiday,
    description: VOUCHER_TYPE_DESCRIPTIONS.holiday,
    icon: VOUCHER_TYPE_ICONS.holiday,
    color: VOUCHER_TYPE_COLORS.holiday,
    isActive: true,
  },
  birthday: {
    type: 'birthday',
    label: VOUCHER_TYPE_LABELS.birthday,
    description: VOUCHER_TYPE_DESCRIPTIONS.birthday,
    icon: VOUCHER_TYPE_ICONS.birthday,
    color: VOUCHER_TYPE_COLORS.birthday,
    isActive: true,
  },
  anniversary: {
    type: 'anniversary',
    label: VOUCHER_TYPE_LABELS.anniversary,
    description: VOUCHER_TYPE_DESCRIPTIONS.anniversary,
    icon: VOUCHER_TYPE_ICONS.anniversary,
    color: VOUCHER_TYPE_COLORS.anniversary,
    isActive: true,
  },
  custom: {
    type: 'custom',
    label: VOUCHER_TYPE_LABELS.custom,
    description: VOUCHER_TYPE_DESCRIPTIONS.custom,
    icon: VOUCHER_TYPE_ICONS.custom,
    color: VOUCHER_TYPE_COLORS.custom,
    isActive: true,
  },
  digital: {
    type: 'digital',
    label: VOUCHER_TYPE_LABELS.digital,
    description: VOUCHER_TYPE_DESCRIPTIONS.digital,
    icon: VOUCHER_TYPE_ICONS.digital,
    color: VOUCHER_TYPE_COLORS.digital,
    isActive: true,
  },
  physical: {
    type: 'physical',
    label: VOUCHER_TYPE_LABELS.physical,
    description: VOUCHER_TYPE_DESCRIPTIONS.physical,
    icon: VOUCHER_TYPE_ICONS.physical,
    color: VOUCHER_TYPE_COLORS.physical,
    isActive: true,
  },
  prepaid: {
    type: 'prepaid',
    label: VOUCHER_TYPE_LABELS.prepaid,
    description: VOUCHER_TYPE_DESCRIPTIONS.prepaid,
    icon: VOUCHER_TYPE_ICONS.prepaid,
    color: VOUCHER_TYPE_COLORS.prepaid,
    isActive: true,
  },
  postpaid: {
    type: 'postpaid',
    label: VOUCHER_TYPE_LABELS.postpaid,
    description: VOUCHER_TYPE_DESCRIPTIONS.postpaid,
    icon: VOUCHER_TYPE_ICONS.postpaid,
    color: VOUCHER_TYPE_COLORS.postpaid,
    isActive: true,
  },
};

// হেল্পার ফাংশন: ভাউচার টাইপ ভ্যালিড কিনা চেক করুন
export const isValidVoucherType = (type: string): type is VoucherType => {
  return Object.values(VOUCHER_TYPE).includes(type as VoucherType);
};

// হেল্পার ফাংশন: সক্রিয় ভাউচার টাইপ গুলো পান
export const getActiveVoucherTypes = (): VoucherType[] => {
  return Object.values(VOUCHER_TYPE_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.type);
};

// হেল্পার ফাংশন: ভাউচার টাইপ গ্রুপ অনুযায়ী ফিল্টার
export const getVoucherTypesByGroup = (group: keyof typeof VOUCHER_TYPE_GROUPS): VoucherType[] => {
  return VOUCHER_TYPE_GROUPS[group] || [];
};

// হেল্পার ফাংশন: ভাউচার টাইপের লেবেল পান
export const getVoucherTypeLabel = (type: VoucherType): string => {
  return VOUCHER_TYPE_LABELS[type] || type;
};

// হেল্পার ফাংশন: ভাউচার টাইপের বিবরণ পান
export const getVoucherTypeDescription = (type: VoucherType): string => {
  return VOUCHER_TYPE_DESCRIPTIONS[type] || '';
};

// হেল্পার ফাংশন: ভাউচার টাইপের কালার পান
export const getVoucherTypeColor = (type: VoucherType): string => {
  return VOUCHER_TYPE_COLORS[type] || '#6B7280';
};

// হেল্পার ফাংশন: ভাউচার টাইপের আইকন পান
export const getVoucherTypeIcon = (type: VoucherType): string => {
  return VOUCHER_TYPE_ICONS[type] || 'Ticket';
};

// হেল্পার ফাংশন: ভাউচার টাইপ গিফট কিনা চেক করুন
export const isGiftVoucher = (type: VoucherType): boolean => {
  return type === 'gift';
};

// হেল্পার ফাংশন: ভাউচার টাইপ ডিজিটাল কিনা চেক করুন
export const isDigitalVoucher = (type: VoucherType): boolean => {
  const digitalTypes: VoucherType[] = ['digital', 'prepaid'];
  return digitalTypes.includes(type);
};
