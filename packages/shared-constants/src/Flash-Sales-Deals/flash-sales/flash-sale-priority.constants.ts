/**
 * Flash Sale Priority Constants
 * ফ্ল্যাশ সেলের প্রায়োরিটি লেভেল নির্ধারণ
 */

// ফ্ল্যাশ সেল প্রায়োরিটি এনাম
export const FLASH_SALE_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
  URGENT: 'urgent',
  NORMAL: 'normal',
  IMPORTANT: 'important',
  VERY_HIGH: 'very_high',
  MAXIMUM: 'maximum',
  MINIMUM: 'minimum',
  DEFAULT: 'default',
  CUSTOM: 'custom',
} as const;

// ফ্ল্যাশ সেল প্রায়োরিটি টাইপ
export type FlashSalePriority = (typeof FLASH_SALE_PRIORITY)[keyof typeof FLASH_SALE_PRIORITY];

// প্রায়োরিটির লেবেল
export const FLASH_SALE_PRIORITY_LABELS: Record<FlashSalePriority, string> = {
  low: 'নিম্ন',
  medium: 'মাঝারি',
  high: 'উচ্চ',
  critical: 'সমালোচনামূলক',
  urgent: 'জরুরি',
  normal: 'স্বাভাবিক',
  important: 'গুরুত্বপূর্ণ',
  very_high: 'অত্যন্ত উচ্চ',
  maximum: 'সর্বোচ্চ',
  minimum: 'সর্বনিম্ন',
  default: 'ডিফল্ট',
  custom: 'কাস্টম',
};

// প্রায়োরিটির বিবরণ
export const FLASH_SALE_PRIORITY_DESCRIPTIONS: Record<FlashSalePriority, string> = {
  low: 'কম গুরুত্বপূর্ণ ফ্ল্যাশ সেল',
  medium: 'মাঝারি গুরুত্বের ফ্ল্যাশ সেল',
  high: 'উচ্চ গুরুত্বের ফ্ল্যাশ সেল',
  critical: 'সমালোচনামূলক গুরুত্বের ফ্ল্যাশ সেল',
  urgent: 'জরুরি ভিত্তিতে সম্পন্ন করতে হবে',
  normal: 'স্বাভাবিক গুরুত্বের ফ্ল্যাশ সেল',
  important: 'গুরুত্বপূর্ণ ফ্ল্যাশ সেল',
  very_high: 'অত্যন্ত উচ্চ গুরুত্বের ফ্ল্যাশ সেল',
  maximum: 'সর্বোচ্চ গুরুত্বের ফ্ল্যাশ সেল',
  minimum: 'সর্বনিম্ন গুরুত্বের ফ্ল্যাশ সেল',
  default: 'ডিফল্ট গুরুত্বের ফ্ল্যাশ সেল',
  custom: 'কাস্টম গুরুত্বের ফ্ল্যাশ সেল',
};

// প্রায়োরিটির আইকন (আইকন নাম)
export const FLASH_SALE_PRIORITY_ICONS: Record<FlashSalePriority, string> = {
  low: 'ArrowDown',
  medium: 'Minus',
  high: 'ArrowUp',
  critical: 'AlertOctagon',
  urgent: 'Bell',
  normal: 'Circle',
  important: 'Star',
  very_high: 'ArrowUpCircle',
  maximum: 'Maximize',
  minimum: 'Minimize',
  default: 'Settings',
  custom: 'Sliders',
};

// প্রায়োরিটির কালার কোড
export const FLASH_SALE_PRIORITY_COLORS: Record<FlashSalePriority, string> = {
  low: '#22C55E', // Green
  medium: '#F59E0B', // Amber
  high: '#F97316', // Orange
  critical: '#EF4444', // Red
  urgent: '#DC2626', // Dark Red
  normal: '#3B82F6', // Blue
  important: '#8B5CF6', // Purple
  very_high: '#EC4899', // Pink
  maximum: '#1F2937', // Dark
  minimum: '#9CA3AF', // Gray
  default: '#6B7280', // Gray
  custom: '#6366F1', // Indigo
};

// প্রায়োরিটির ডিসপ্লে অর্ডার
export const FLASH_SALE_PRIORITY_DISPLAY_ORDER: Record<FlashSalePriority, number> = {
  maximum: 1,
  critical: 2,
  urgent: 3,
  very_high: 4,
  high: 5,
  important: 6,
  medium: 7,
  normal: 8,
  low: 9,
  minimum: 10,
  default: 11,
  custom: 12,
};

// প্রায়োরিটির সংখ্যাসূচক মান
export const FLASH_SALE_PRIORITY_VALUES: Record<FlashSalePriority, number> = {
  maximum: 100,
  critical: 90,
  urgent: 85,
  very_high: 80,
  high: 70,
  important: 60,
  medium: 50,
  normal: 40,
  low: 30,
  minimum: 10,
  default: 50,
  custom: 50,
};

// প্রায়োরিটি গ্রুপ
export const FLASH_SALE_PRIORITY_GROUPS = {
  HIGH_PRIORITY: ['maximum', 'critical', 'urgent', 'very_high', 'high'] as FlashSalePriority[],
  MEDIUM_PRIORITY: ['important', 'medium', 'normal'] as FlashSalePriority[],
  LOW_PRIORITY: ['low', 'minimum'] as FlashSalePriority[],
  SPECIAL: ['default', 'custom'] as FlashSalePriority[],
} as const;

// প্রায়োরিটি কনফিগারেশন ইন্টারফেস
export interface FlashSalePriorityConfig {
  priority: FlashSalePriority;
  label: string;
  description: string;
  icon: string;
  color: string;
  displayOrder: number;
  value: number;
  isActive: boolean;
}

// সম্পূর্ণ প্রায়োরিটি কনফিগারেশন
export const FLASH_SALE_PRIORITY_CONFIGS: Record<FlashSalePriority, FlashSalePriorityConfig> = {
  low: {
    priority: 'low',
    label: FLASH_SALE_PRIORITY_LABELS.low,
    description: FLASH_SALE_PRIORITY_DESCRIPTIONS.low,
    icon: FLASH_SALE_PRIORITY_ICONS.low,
    color: FLASH_SALE_PRIORITY_COLORS.low,
    displayOrder: FLASH_SALE_PRIORITY_DISPLAY_ORDER.low,
    value: FLASH_SALE_PRIORITY_VALUES.low,
    isActive: true,
  },
  medium: {
    priority: 'medium',
    label: FLASH_SALE_PRIORITY_LABELS.medium,
    description: FLASH_SALE_PRIORITY_DESCRIPTIONS.medium,
    icon: FLASH_SALE_PRIORITY_ICONS.medium,
    color: FLASH_SALE_PRIORITY_COLORS.medium,
    displayOrder: FLASH_SALE_PRIORITY_DISPLAY_ORDER.medium,
    value: FLASH_SALE_PRIORITY_VALUES.medium,
    isActive: true,
  },
  high: {
    priority: 'high',
    label: FLASH_SALE_PRIORITY_LABELS.high,
    description: FLASH_SALE_PRIORITY_DESCRIPTIONS.high,
    icon: FLASH_SALE_PRIORITY_ICONS.high,
    color: FLASH_SALE_PRIORITY_COLORS.high,
    displayOrder: FLASH_SALE_PRIORITY_DISPLAY_ORDER.high,
    value: FLASH_SALE_PRIORITY_VALUES.high,
    isActive: true,
  },
  critical: {
    priority: 'critical',
    label: FLASH_SALE_PRIORITY_LABELS.critical,
    description: FLASH_SALE_PRIORITY_DESCRIPTIONS.critical,
    icon: FLASH_SALE_PRIORITY_ICONS.critical,
    color: FLASH_SALE_PRIORITY_COLORS.critical,
    displayOrder: FLASH_SALE_PRIORITY_DISPLAY_ORDER.critical,
    value: FLASH_SALE_PRIORITY_VALUES.critical,
    isActive: true,
  },
  urgent: {
    priority: 'urgent',
    label: FLASH_SALE_PRIORITY_LABELS.urgent,
    description: FLASH_SALE_PRIORITY_DESCRIPTIONS.urgent,
    icon: FLASH_SALE_PRIORITY_ICONS.urgent,
    color: FLASH_SALE_PRIORITY_COLORS.urgent,
    displayOrder: FLASH_SALE_PRIORITY_DISPLAY_ORDER.urgent,
    value: FLASH_SALE_PRIORITY_VALUES.urgent,
    isActive: true,
  },
  normal: {
    priority: 'normal',
    label: FLASH_SALE_PRIORITY_LABELS.normal,
    description: FLASH_SALE_PRIORITY_DESCRIPTIONS.normal,
    icon: FLASH_SALE_PRIORITY_ICONS.normal,
    color: FLASH_SALE_PRIORITY_COLORS.normal,
    displayOrder: FLASH_SALE_PRIORITY_DISPLAY_ORDER.normal,
    value: FLASH_SALE_PRIORITY_VALUES.normal,
    isActive: true,
  },
  important: {
    priority: 'important',
    label: FLASH_SALE_PRIORITY_LABELS.important,
    description: FLASH_SALE_PRIORITY_DESCRIPTIONS.important,
    icon: FLASH_SALE_PRIORITY_ICONS.important,
    color: FLASH_SALE_PRIORITY_COLORS.important,
    displayOrder: FLASH_SALE_PRIORITY_DISPLAY_ORDER.important,
    value: FLASH_SALE_PRIORITY_VALUES.important,
    isActive: true,
  },
  very_high: {
    priority: 'very_high',
    label: FLASH_SALE_PRIORITY_LABELS.very_high,
    description: FLASH_SALE_PRIORITY_DESCRIPTIONS.very_high,
    icon: FLASH_SALE_PRIORITY_ICONS.very_high,
    color: FLASH_SALE_PRIORITY_COLORS.very_high,
    displayOrder: FLASH_SALE_PRIORITY_DISPLAY_ORDER.very_high,
    value: FLASH_SALE_PRIORITY_VALUES.very_high,
    isActive: true,
  },
  maximum: {
    priority: 'maximum',
    label: FLASH_SALE_PRIORITY_LABELS.maximum,
    description: FLASH_SALE_PRIORITY_DESCRIPTIONS.maximum,
    icon: FLASH_SALE_PRIORITY_ICONS.maximum,
    color: FLASH_SALE_PRIORITY_COLORS.maximum,
    displayOrder: FLASH_SALE_PRIORITY_DISPLAY_ORDER.maximum,
    value: FLASH_SALE_PRIORITY_VALUES.maximum,
    isActive: true,
  },
  minimum: {
    priority: 'minimum',
    label: FLASH_SALE_PRIORITY_LABELS.minimum,
    description: FLASH_SALE_PRIORITY_DESCRIPTIONS.minimum,
    icon: FLASH_SALE_PRIORITY_ICONS.minimum,
    color: FLASH_SALE_PRIORITY_COLORS.minimum,
    displayOrder: FLASH_SALE_PRIORITY_DISPLAY_ORDER.minimum,
    value: FLASH_SALE_PRIORITY_VALUES.minimum,
    isActive: true,
  },
  default: {
    priority: 'default',
    label: FLASH_SALE_PRIORITY_LABELS.default,
    description: FLASH_SALE_PRIORITY_DESCRIPTIONS.default,
    icon: FLASH_SALE_PRIORITY_ICONS.default,
    color: FLASH_SALE_PRIORITY_COLORS.default,
    displayOrder: FLASH_SALE_PRIORITY_DISPLAY_ORDER.default,
    value: FLASH_SALE_PRIORITY_VALUES.default,
    isActive: true,
  },
  custom: {
    priority: 'custom',
    label: FLASH_SALE_PRIORITY_LABELS.custom,
    description: FLASH_SALE_PRIORITY_DESCRIPTIONS.custom,
    icon: FLASH_SALE_PRIORITY_ICONS.custom,
    color: FLASH_SALE_PRIORITY_COLORS.custom,
    displayOrder: FLASH_SALE_PRIORITY_DISPLAY_ORDER.custom,
    value: FLASH_SALE_PRIORITY_VALUES.custom,
    isActive: true,
  },
};

// হেল্পার ফাংশন: প্রায়োরিটি ভ্যালিড কিনা চেক করুন
export const isValidFlashSalePriority = (priority: string): priority is FlashSalePriority => {
  return Object.values(FLASH_SALE_PRIORITY).includes(priority as FlashSalePriority);
};

// হেল্পার ফাংশন: সক্রিয় প্রায়োরিটি গুলো পান
export const getActiveFlashSalePriorities = (): FlashSalePriority[] => {
  return Object.values(FLASH_SALE_PRIORITY_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.priority);
};

// হেল্পার ফাংশন: ডিসপ্লে অর্ডার অনুযায়ী সাজান
export const getFlashSalePrioritiesByOrder = (): FlashSalePriority[] => {
  return Object.values(FLASH_SALE_PRIORITY_CONFIGS)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((config) => config.priority);
};

// হেল্পার ফাংশন: প্রায়োরিটি গ্রুপ অনুযায়ী ফিল্টার
export const getFlashSalePrioritiesByGroup = (
  group: keyof typeof FLASH_SALE_PRIORITY_GROUPS
): FlashSalePriority[] => {
  return FLASH_SALE_PRIORITY_GROUPS[group] || [];
};

// হেল্পার ফাংশন: মান অনুযায়ী প্রায়োরিটি পান
export const getFlashSalePriorityByValue = (value: number): FlashSalePriority | null => {
  const priorities = Object.entries(FLASH_SALE_PRIORITY_VALUES);
  for (const [priority, priorityValue] of priorities) {
    if (priorityValue === value) {
      return priority as FlashSalePriority;
    }
  }
  return null;
};

// হেল্পার ফাংশন: প্রায়োরিটির মান পান
export const getFlashSalePriorityValue = (priority: FlashSalePriority): number => {
  return FLASH_SALE_PRIORITY_VALUES[priority] || 0;
};
