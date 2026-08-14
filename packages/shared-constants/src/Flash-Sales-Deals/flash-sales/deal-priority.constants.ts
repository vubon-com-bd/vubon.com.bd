/**
 * Deal Priority Constants
 * ডিলের প্রায়োরিটি লেভেল নির্ধারণ
 */

// ডিল প্রায়োরিটি এনাম
export const DEAL_PRIORITY = {
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

// ডিল প্রায়োরিটি টাইপ
export type DealPriority = (typeof DEAL_PRIORITY)[keyof typeof DEAL_PRIORITY];

// প্রায়োরিটির লেবেল
export const DEAL_PRIORITY_LABELS: Record<DealPriority, string> = {
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
export const DEAL_PRIORITY_DESCRIPTIONS: Record<DealPriority, string> = {
  low: 'কম গুরুত্বপূর্ণ ডিল',
  medium: 'মাঝারি গুরুত্বের ডিল',
  high: 'উচ্চ গুরুত্বের ডিল',
  critical: 'সমালোচনামূলক গুরুত্বের ডিল',
  urgent: 'জরুরি ভিত্তিতে সম্পন্ন করতে হবে',
  normal: 'স্বাভাবিক গুরুত্বের ডিল',
  important: 'গুরুত্বপূর্ণ ডিল',
  very_high: 'অত্যন্ত উচ্চ গুরুত্বের ডিল',
  maximum: 'সর্বোচ্চ গুরুত্বের ডিল',
  minimum: 'সর্বনিম্ন গুরুত্বের ডিল',
  default: 'ডিফল্ট গুরুত্বের ডিল',
  custom: 'কাস্টম গুরুত্বের ডিল',
};

// প্রায়োরিটির আইকন (আইকন নাম)
export const DEAL_PRIORITY_ICONS: Record<DealPriority, string> = {
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
export const DEAL_PRIORITY_COLORS: Record<DealPriority, string> = {
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
export const DEAL_PRIORITY_DISPLAY_ORDER: Record<DealPriority, number> = {
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
export const DEAL_PRIORITY_VALUES: Record<DealPriority, number> = {
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
export const DEAL_PRIORITY_GROUPS = {
  HIGH_PRIORITY: ['maximum', 'critical', 'urgent', 'very_high', 'high'] as DealPriority[],
  MEDIUM_PRIORITY: ['important', 'medium', 'normal'] as DealPriority[],
  LOW_PRIORITY: ['low', 'minimum'] as DealPriority[],
  SPECIAL: ['default', 'custom'] as DealPriority[],
} as const;

// প্রায়োরিটি কনফিগারেশন ইন্টারফেস
export interface DealPriorityConfig {
  priority: DealPriority;
  label: string;
  description: string;
  icon: string;
  color: string;
  displayOrder: number;
  value: number;
  isActive: boolean;
}

// সম্পূর্ণ প্রায়োরিটি কনফিগারেশন
export const DEAL_PRIORITY_CONFIGS: Record<DealPriority, DealPriorityConfig> = {
  low: {
    priority: 'low',
    label: DEAL_PRIORITY_LABELS.low,
    description: DEAL_PRIORITY_DESCRIPTIONS.low,
    icon: DEAL_PRIORITY_ICONS.low,
    color: DEAL_PRIORITY_COLORS.low,
    displayOrder: DEAL_PRIORITY_DISPLAY_ORDER.low,
    value: DEAL_PRIORITY_VALUES.low,
    isActive: true,
  },
  medium: {
    priority: 'medium',
    label: DEAL_PRIORITY_LABELS.medium,
    description: DEAL_PRIORITY_DESCRIPTIONS.medium,
    icon: DEAL_PRIORITY_ICONS.medium,
    color: DEAL_PRIORITY_COLORS.medium,
    displayOrder: DEAL_PRIORITY_DISPLAY_ORDER.medium,
    value: DEAL_PRIORITY_VALUES.medium,
    isActive: true,
  },
  high: {
    priority: 'high',
    label: DEAL_PRIORITY_LABELS.high,
    description: DEAL_PRIORITY_DESCRIPTIONS.high,
    icon: DEAL_PRIORITY_ICONS.high,
    color: DEAL_PRIORITY_COLORS.high,
    displayOrder: DEAL_PRIORITY_DISPLAY_ORDER.high,
    value: DEAL_PRIORITY_VALUES.high,
    isActive: true,
  },
  critical: {
    priority: 'critical',
    label: DEAL_PRIORITY_LABELS.critical,
    description: DEAL_PRIORITY_DESCRIPTIONS.critical,
    icon: DEAL_PRIORITY_ICONS.critical,
    color: DEAL_PRIORITY_COLORS.critical,
    displayOrder: DEAL_PRIORITY_DISPLAY_ORDER.critical,
    value: DEAL_PRIORITY_VALUES.critical,
    isActive: true,
  },
  urgent: {
    priority: 'urgent',
    label: DEAL_PRIORITY_LABELS.urgent,
    description: DEAL_PRIORITY_DESCRIPTIONS.urgent,
    icon: DEAL_PRIORITY_ICONS.urgent,
    color: DEAL_PRIORITY_COLORS.urgent,
    displayOrder: DEAL_PRIORITY_DISPLAY_ORDER.urgent,
    value: DEAL_PRIORITY_VALUES.urgent,
    isActive: true,
  },
  normal: {
    priority: 'normal',
    label: DEAL_PRIORITY_LABELS.normal,
    description: DEAL_PRIORITY_DESCRIPTIONS.normal,
    icon: DEAL_PRIORITY_ICONS.normal,
    color: DEAL_PRIORITY_COLORS.normal,
    displayOrder: DEAL_PRIORITY_DISPLAY_ORDER.normal,
    value: DEAL_PRIORITY_VALUES.normal,
    isActive: true,
  },
  important: {
    priority: 'important',
    label: DEAL_PRIORITY_LABELS.important,
    description: DEAL_PRIORITY_DESCRIPTIONS.important,
    icon: DEAL_PRIORITY_ICONS.important,
    color: DEAL_PRIORITY_COLORS.important,
    displayOrder: DEAL_PRIORITY_DISPLAY_ORDER.important,
    value: DEAL_PRIORITY_VALUES.important,
    isActive: true,
  },
  very_high: {
    priority: 'very_high',
    label: DEAL_PRIORITY_LABELS.very_high,
    description: DEAL_PRIORITY_DESCRIPTIONS.very_high,
    icon: DEAL_PRIORITY_ICONS.very_high,
    color: DEAL_PRIORITY_COLORS.very_high,
    displayOrder: DEAL_PRIORITY_DISPLAY_ORDER.very_high,
    value: DEAL_PRIORITY_VALUES.very_high,
    isActive: true,
  },
  maximum: {
    priority: 'maximum',
    label: DEAL_PRIORITY_LABELS.maximum,
    description: DEAL_PRIORITY_DESCRIPTIONS.maximum,
    icon: DEAL_PRIORITY_ICONS.maximum,
    color: DEAL_PRIORITY_COLORS.maximum,
    displayOrder: DEAL_PRIORITY_DISPLAY_ORDER.maximum,
    value: DEAL_PRIORITY_VALUES.maximum,
    isActive: true,
  },
  minimum: {
    priority: 'minimum',
    label: DEAL_PRIORITY_LABELS.minimum,
    description: DEAL_PRIORITY_DESCRIPTIONS.minimum,
    icon: DEAL_PRIORITY_ICONS.minimum,
    color: DEAL_PRIORITY_COLORS.minimum,
    displayOrder: DEAL_PRIORITY_DISPLAY_ORDER.minimum,
    value: DEAL_PRIORITY_VALUES.minimum,
    isActive: true,
  },
  default: {
    priority: 'default',
    label: DEAL_PRIORITY_LABELS.default,
    description: DEAL_PRIORITY_DESCRIPTIONS.default,
    icon: DEAL_PRIORITY_ICONS.default,
    color: DEAL_PRIORITY_COLORS.default,
    displayOrder: DEAL_PRIORITY_DISPLAY_ORDER.default,
    value: DEAL_PRIORITY_VALUES.default,
    isActive: true,
  },
  custom: {
    priority: 'custom',
    label: DEAL_PRIORITY_LABELS.custom,
    description: DEAL_PRIORITY_DESCRIPTIONS.custom,
    icon: DEAL_PRIORITY_ICONS.custom,
    color: DEAL_PRIORITY_COLORS.custom,
    displayOrder: DEAL_PRIORITY_DISPLAY_ORDER.custom,
    value: DEAL_PRIORITY_VALUES.custom,
    isActive: true,
  },
};

// হেল্পার ফাংশন: প্রায়োরিটি ভ্যালিড কিনা চেক করুন
export const isValidDealPriority = (priority: string): priority is DealPriority => {
  return Object.values(DEAL_PRIORITY).includes(priority as DealPriority);
};

// হেল্পার ফাংশন: সক্রিয় প্রায়োরিটি গুলো পান
export const getActiveDealPriorities = (): DealPriority[] => {
  return Object.values(DEAL_PRIORITY_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.priority);
};

// হেল্পার ফাংশন: ডিসপ্লে অর্ডার অনুযায়ী সাজান
export const getDealPrioritiesByOrder = (): DealPriority[] => {
  return Object.values(DEAL_PRIORITY_CONFIGS)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((config) => config.priority);
};

// হেল্পার ফাংশন: প্রায়োরিটি গ্রুপ অনুযায়ী ফিল্টার
export const getDealPrioritiesByGroup = (
  group: keyof typeof DEAL_PRIORITY_GROUPS
): DealPriority[] => {
  return DEAL_PRIORITY_GROUPS[group] || [];
};

// হেল্পার ফাংশন: মান অনুযায়ী প্রায়োরিটি পান
export const getDealPriorityByValue = (value: number): DealPriority | null => {
  const priorities = Object.entries(DEAL_PRIORITY_VALUES);
  for (const [priority, priorityValue] of priorities) {
    if (priorityValue === value) {
      return priority as DealPriority;
    }
  }
  return null;
};

// হেল্পার ফাংশন: প্রায়োরিটির মান পান
export const getDealPriorityValue = (priority: DealPriority): number => {
  return DEAL_PRIORITY_VALUES[priority] || 0;
};

// হেল্পার ফাংশন: প্রায়োরিটির লেবেল পান
export const getDealPriorityLabel = (priority: DealPriority): string => {
  return DEAL_PRIORITY_LABELS[priority] || priority;
};

// হেল্পার ফাংশন: প্রায়োরিটির কালার পান
export const getDealPriorityColor = (priority: DealPriority): string => {
  return DEAL_PRIORITY_COLORS[priority] || '#6B7280';
};
