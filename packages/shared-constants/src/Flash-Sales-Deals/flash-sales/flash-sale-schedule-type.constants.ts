/**
 * Flash Sale Schedule Type Constants
 * ফ্ল্যাশ সেল শিডিউলের প্রকারভেদ
 */

// ফ্ল্যাশ সেল শিডিউল টাইপ এনাম
export const FLASH_SALE_SCHEDULE_TYPE = {
  ONCE: 'once',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  CUSTOM: 'custom',
  RECURRING: 'recurring',
  ONE_TIME: 'one_time',
  PERIODIC: 'periodic',
  SEASONAL: 'seasonal',
  HOLIDAY: 'holiday',
  SPECIAL: 'special',
  URGENT: 'urgent',
  REGULAR: 'regular',
  PREMIUM: 'premium',
  LIMITED: 'limited',
} as const;

// ফ্ল্যাশ সেল শিডিউল টাইপ টাইপ
export type FlashSaleScheduleType =
  (typeof FLASH_SALE_SCHEDULE_TYPE)[keyof typeof FLASH_SALE_SCHEDULE_TYPE];

// টাইপের লেবেল
export const FLASH_SALE_SCHEDULE_TYPE_LABELS: Record<FlashSaleScheduleType, string> = {
  once: 'একবার',
  daily: 'দৈনিক',
  weekly: 'সাপ্তাহিক',
  monthly: 'মাসিক',
  custom: 'কাস্টম',
  recurring: 'পুনরাবৃত্ত',
  one_time: 'এককালীন',
  periodic: 'পর্যায়ক্রমিক',
  seasonal: 'মৌসুমি',
  holiday: 'ছুটির দিন',
  special: 'বিশেষ',
  urgent: 'জরুরি',
  regular: 'নিয়মিত',
  premium: 'প্রিমিয়াম',
  limited: 'সীমিত',
};

// টাইপের বিবরণ
export const FLASH_SALE_SCHEDULE_TYPE_DESCRIPTIONS: Record<FlashSaleScheduleType, string> = {
  once: 'শুধুমাত্র একবার শিডিউল করা হবে',
  daily: 'প্রতিদিন পুনরাবৃত্তি হবে',
  weekly: 'প্রতি সপ্তাহে পুনরাবৃত্তি হবে',
  monthly: 'প্রতি মাসে পুনরাবৃত্তি হবে',
  custom: 'কাস্টমাইজড শিডিউল প্যাটার্ন',
  recurring: 'পুনরাবৃত্ত শিডিউল',
  one_time: 'এককালীন ইভেন্ট',
  periodic: 'নির্দিষ্ট সময় পর পর',
  seasonal: 'মৌসুমি ভিত্তিক',
  holiday: 'ছুটির দিন ভিত্তিক',
  special: 'বিশেষ ইভেন্ট',
  urgent: 'জরুরি ভিত্তিক',
  regular: 'নিয়মিত শিডিউল',
  premium: 'প্রিমিয়াম গ্রাহকদের জন্য',
  limited: 'সীমিত সময়ের জন্য',
};

// টাইপের আইকন (আইকন নাম)
export const FLASH_SALE_SCHEDULE_TYPE_ICONS: Record<FlashSaleScheduleType, string> = {
  once: 'Circle',
  daily: 'Sun',
  weekly: 'Calendar',
  monthly: 'CalendarDays',
  custom: 'Settings',
  recurring: 'Repeat',
  one_time: 'Clock',
  periodic: 'RefreshCw',
  seasonal: 'CloudSun',
  holiday: 'Gift',
  special: 'Star',
  urgent: 'Bell',
  regular: 'Clock',
  premium: 'Diamond',
  limited: 'Hash',
};

// টাইপের কালার কোড
export const FLASH_SALE_SCHEDULE_TYPE_COLORS: Record<FlashSaleScheduleType, string> = {
  once: '#3B82F6', // Blue
  daily: '#F59E0B', // Amber
  weekly: '#8B5CF6', // Purple
  monthly: '#EC4899', // Pink
  custom: '#6366F1', // Indigo
  recurring: '#14B8A6', // Teal
  one_time: '#6B7280', // Gray
  periodic: '#06B6D4', // Cyan
  seasonal: '#22C55E', // Green
  holiday: '#EF4444', // Red
  special: '#FBBF24', // Yellow
  urgent: '#DC2626', // Dark Red
  regular: '#3B82F6', // Blue
  premium: '#8B5CF6', // Purple
  limited: '#F97316', // Orange
};

// টাইপের ডিসপ্লে অর্ডার
export const FLASH_SALE_SCHEDULE_TYPE_DISPLAY_ORDER: Record<FlashSaleScheduleType, number> = {
  once: 1,
  one_time: 2,
  daily: 3,
  weekly: 4,
  monthly: 5,
  periodic: 6,
  recurring: 7,
  seasonal: 8,
  holiday: 9,
  special: 10,
  urgent: 11,
  regular: 12,
  premium: 13,
  limited: 14,
  custom: 15,
};

// টাইপ গ্রুপ
export const FLASH_SALE_SCHEDULE_TYPE_GROUPS = {
  FREQUENCY_BASED: ['once', 'daily', 'weekly', 'monthly'] as FlashSaleScheduleType[],
  TIME_BASED: ['one_time', 'periodic', 'recurring'] as FlashSaleScheduleType[],
  EVENT_BASED: ['seasonal', 'holiday', 'special'] as FlashSaleScheduleType[],
  PRIORITY_BASED: ['regular', 'premium', 'urgent', 'limited'] as FlashSaleScheduleType[],
  CUSTOM_BASED: ['custom'] as FlashSaleScheduleType[],
} as const;

// টাইপ কনফিগারেশন ইন্টারফেস
export interface FlashSaleScheduleTypeConfig {
  type: FlashSaleScheduleType;
  label: string;
  description: string;
  icon: string;
  color: string;
  displayOrder: number;
  isActive: boolean;
}

// সম্পূর্ণ টাইপ কনফিগারেশন
export const FLASH_SALE_SCHEDULE_TYPE_CONFIGS: Record<
  FlashSaleScheduleType,
  FlashSaleScheduleTypeConfig
> = {
  once: {
    type: 'once',
    label: FLASH_SALE_SCHEDULE_TYPE_LABELS.once,
    description: FLASH_SALE_SCHEDULE_TYPE_DESCRIPTIONS.once,
    icon: FLASH_SALE_SCHEDULE_TYPE_ICONS.once,
    color: FLASH_SALE_SCHEDULE_TYPE_COLORS.once,
    displayOrder: FLASH_SALE_SCHEDULE_TYPE_DISPLAY_ORDER.once,
    isActive: true,
  },
  daily: {
    type: 'daily',
    label: FLASH_SALE_SCHEDULE_TYPE_LABELS.daily,
    description: FLASH_SALE_SCHEDULE_TYPE_DESCRIPTIONS.daily,
    icon: FLASH_SALE_SCHEDULE_TYPE_ICONS.daily,
    color: FLASH_SALE_SCHEDULE_TYPE_COLORS.daily,
    displayOrder: FLASH_SALE_SCHEDULE_TYPE_DISPLAY_ORDER.daily,
    isActive: true,
  },
  weekly: {
    type: 'weekly',
    label: FLASH_SALE_SCHEDULE_TYPE_LABELS.weekly,
    description: FLASH_SALE_SCHEDULE_TYPE_DESCRIPTIONS.weekly,
    icon: FLASH_SALE_SCHEDULE_TYPE_ICONS.weekly,
    color: FLASH_SALE_SCHEDULE_TYPE_COLORS.weekly,
    displayOrder: FLASH_SALE_SCHEDULE_TYPE_DISPLAY_ORDER.weekly,
    isActive: true,
  },
  monthly: {
    type: 'monthly',
    label: FLASH_SALE_SCHEDULE_TYPE_LABELS.monthly,
    description: FLASH_SALE_SCHEDULE_TYPE_DESCRIPTIONS.monthly,
    icon: FLASH_SALE_SCHEDULE_TYPE_ICONS.monthly,
    color: FLASH_SALE_SCHEDULE_TYPE_COLORS.monthly,
    displayOrder: FLASH_SALE_SCHEDULE_TYPE_DISPLAY_ORDER.monthly,
    isActive: true,
  },
  custom: {
    type: 'custom',
    label: FLASH_SALE_SCHEDULE_TYPE_LABELS.custom,
    description: FLASH_SALE_SCHEDULE_TYPE_DESCRIPTIONS.custom,
    icon: FLASH_SALE_SCHEDULE_TYPE_ICONS.custom,
    color: FLASH_SALE_SCHEDULE_TYPE_COLORS.custom,
    displayOrder: FLASH_SALE_SCHEDULE_TYPE_DISPLAY_ORDER.custom,
    isActive: true,
  },
  recurring: {
    type: 'recurring',
    label: FLASH_SALE_SCHEDULE_TYPE_LABELS.recurring,
    description: FLASH_SALE_SCHEDULE_TYPE_DESCRIPTIONS.recurring,
    icon: FLASH_SALE_SCHEDULE_TYPE_ICONS.recurring,
    color: FLASH_SALE_SCHEDULE_TYPE_COLORS.recurring,
    displayOrder: FLASH_SALE_SCHEDULE_TYPE_DISPLAY_ORDER.recurring,
    isActive: true,
  },
  one_time: {
    type: 'one_time',
    label: FLASH_SALE_SCHEDULE_TYPE_LABELS.one_time,
    description: FLASH_SALE_SCHEDULE_TYPE_DESCRIPTIONS.one_time,
    icon: FLASH_SALE_SCHEDULE_TYPE_ICONS.one_time,
    color: FLASH_SALE_SCHEDULE_TYPE_COLORS.one_time,
    displayOrder: FLASH_SALE_SCHEDULE_TYPE_DISPLAY_ORDER.one_time,
    isActive: true,
  },
  periodic: {
    type: 'periodic',
    label: FLASH_SALE_SCHEDULE_TYPE_LABELS.periodic,
    description: FLASH_SALE_SCHEDULE_TYPE_DESCRIPTIONS.periodic,
    icon: FLASH_SALE_SCHEDULE_TYPE_ICONS.periodic,
    color: FLASH_SALE_SCHEDULE_TYPE_COLORS.periodic,
    displayOrder: FLASH_SALE_SCHEDULE_TYPE_DISPLAY_ORDER.periodic,
    isActive: true,
  },
  seasonal: {
    type: 'seasonal',
    label: FLASH_SALE_SCHEDULE_TYPE_LABELS.seasonal,
    description: FLASH_SALE_SCHEDULE_TYPE_DESCRIPTIONS.seasonal,
    icon: FLASH_SALE_SCHEDULE_TYPE_ICONS.seasonal,
    color: FLASH_SALE_SCHEDULE_TYPE_COLORS.seasonal,
    displayOrder: FLASH_SALE_SCHEDULE_TYPE_DISPLAY_ORDER.seasonal,
    isActive: true,
  },
  holiday: {
    type: 'holiday',
    label: FLASH_SALE_SCHEDULE_TYPE_LABELS.holiday,
    description: FLASH_SALE_SCHEDULE_TYPE_DESCRIPTIONS.holiday,
    icon: FLASH_SALE_SCHEDULE_TYPE_ICONS.holiday,
    color: FLASH_SALE_SCHEDULE_TYPE_COLORS.holiday,
    displayOrder: FLASH_SALE_SCHEDULE_TYPE_DISPLAY_ORDER.holiday,
    isActive: true,
  },
  special: {
    type: 'special',
    label: FLASH_SALE_SCHEDULE_TYPE_LABELS.special,
    description: FLASH_SALE_SCHEDULE_TYPE_DESCRIPTIONS.special,
    icon: FLASH_SALE_SCHEDULE_TYPE_ICONS.special,
    color: FLASH_SALE_SCHEDULE_TYPE_COLORS.special,
    displayOrder: FLASH_SALE_SCHEDULE_TYPE_DISPLAY_ORDER.special,
    isActive: true,
  },
  urgent: {
    type: 'urgent',
    label: FLASH_SALE_SCHEDULE_TYPE_LABELS.urgent,
    description: FLASH_SALE_SCHEDULE_TYPE_DESCRIPTIONS.urgent,
    icon: FLASH_SALE_SCHEDULE_TYPE_ICONS.urgent,
    color: FLASH_SALE_SCHEDULE_TYPE_COLORS.urgent,
    displayOrder: FLASH_SALE_SCHEDULE_TYPE_DISPLAY_ORDER.urgent,
    isActive: true,
  },
  regular: {
    type: 'regular',
    label: FLASH_SALE_SCHEDULE_TYPE_LABELS.regular,
    description: FLASH_SALE_SCHEDULE_TYPE_DESCRIPTIONS.regular,
    icon: FLASH_SALE_SCHEDULE_TYPE_ICONS.regular,
    color: FLASH_SALE_SCHEDULE_TYPE_COLORS.regular,
    displayOrder: FLASH_SALE_SCHEDULE_TYPE_DISPLAY_ORDER.regular,
    isActive: true,
  },
  premium: {
    type: 'premium',
    label: FLASH_SALE_SCHEDULE_TYPE_LABELS.premium,
    description: FLASH_SALE_SCHEDULE_TYPE_DESCRIPTIONS.premium,
    icon: FLASH_SALE_SCHEDULE_TYPE_ICONS.premium,
    color: FLASH_SALE_SCHEDULE_TYPE_COLORS.premium,
    displayOrder: FLASH_SALE_SCHEDULE_TYPE_DISPLAY_ORDER.premium,
    isActive: true,
  },
  limited: {
    type: 'limited',
    label: FLASH_SALE_SCHEDULE_TYPE_LABELS.limited,
    description: FLASH_SALE_SCHEDULE_TYPE_DESCRIPTIONS.limited,
    icon: FLASH_SALE_SCHEDULE_TYPE_ICONS.limited,
    color: FLASH_SALE_SCHEDULE_TYPE_COLORS.limited,
    displayOrder: FLASH_SALE_SCHEDULE_TYPE_DISPLAY_ORDER.limited,
    isActive: true,
  },
};

// হেল্পার ফাংশন: শিডিউল টাইপ ভ্যালিড কিনা চেক করুন
export const isValidFlashSaleScheduleType = (type: string): type is FlashSaleScheduleType => {
  return Object.values(FLASH_SALE_SCHEDULE_TYPE).includes(type as FlashSaleScheduleType);
};

// হেল্পার ফাংশন: সক্রিয় শিডিউল টাইপ গুলো পান
export const getActiveFlashSaleScheduleTypes = (): FlashSaleScheduleType[] => {
  return Object.values(FLASH_SALE_SCHEDULE_TYPE_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.type);
};

// হেল্পার ফাংশন: ডিসপ্লে অর্ডার অনুযায়ী সাজান
export const getFlashSaleScheduleTypesByOrder = (): FlashSaleScheduleType[] => {
  return Object.values(FLASH_SALE_SCHEDULE_TYPE_CONFIGS)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((config) => config.type);
};

// হেল্পার ফাংশন: শিডিউল টাইপ গ্রুপ অনুযায়ী ফিল্টার
export const getFlashSaleScheduleTypesByGroup = (
  group: keyof typeof FLASH_SALE_SCHEDULE_TYPE_GROUPS
): FlashSaleScheduleType[] => {
  return FLASH_SALE_SCHEDULE_TYPE_GROUPS[group] || [];
};

// হেল্পার ফাংশন: শিডিউল টাইপের লেবেল পান
export const getFlashSaleScheduleTypeLabel = (type: FlashSaleScheduleType): string => {
  return FLASH_SALE_SCHEDULE_TYPE_LABELS[type] || type;
};

// হেল্পার ফাংশন: শিডিউল টাইপের কালার পান
export const getFlashSaleScheduleTypeColor = (type: FlashSaleScheduleType): string => {
  return FLASH_SALE_SCHEDULE_TYPE_COLORS[type] || '#6B7280';
};

// হেল্পার ফাংশন: শিডিউল টাইপের আইকন পান
export const getFlashSaleScheduleTypeIcon = (type: FlashSaleScheduleType): string => {
  return FLASH_SALE_SCHEDULE_TYPE_ICONS[type] || 'Circle';
};

// হেল্পার ফাংশন: শিডিউল টাইপ রিকারিং কিনা চেক করুন
export const isRecurringScheduleType = (type: FlashSaleScheduleType): boolean => {
  const recurringTypes: FlashSaleScheduleType[] = [
    'daily',
    'weekly',
    'monthly',
    'recurring',
    'periodic',
  ];
  return recurringTypes.includes(type);
};
