/**
 * Flash Sale Rule Type Constants
 * রুলের প্রকারভেদ
 */

// রুল টাইপ এনাম
export const RULE_TYPE = {
  ELIGIBILITY: 'eligibility',
  PRICING: 'pricing',
  DISCOUNT: 'discount',
  RESTRICTION: 'restriction',
  VALIDATION: 'validation',
  NOTIFICATION: 'notification',
  APPROVAL: 'approval',
  PRIORITY: 'priority',
  COUPON: 'coupon',
  VOUCHER: 'voucher',
  INVENTORY: 'inventory',
  TIMING: 'timing',
  PARTICIPANT: 'participant',
  PERFORMANCE: 'performance',
  COMPLIANCE: 'compliance',
  SECURITY: 'security',
  CUSTOM: 'custom',
  SYSTEM: 'system',
  USER: 'user',
  PRODUCT: 'product',
  CATEGORY: 'category',
  BRAND: 'brand',
} as const;

// রুল টাইপ টাইপ
export type RuleType = (typeof RULE_TYPE)[keyof typeof RULE_TYPE];

// রুল টাইপের লেবেল
export const RULE_TYPE_LABELS: Record<RuleType, string> = {
  eligibility: 'যোগ্যতা রুল',
  pricing: 'মূল্য নির্ধারণ রুল',
  discount: 'ডিসকাউন্ট রুল',
  restriction: 'সীমাবদ্ধতা রুল',
  validation: 'যাচাইকরণ রুল',
  notification: 'বিজ্ঞপ্তি রুল',
  approval: 'অনুমোদন রুল',
  priority: 'অগ্রাধিকার রুল',
  coupon: 'কুপন রুল',
  voucher: 'ভাউচার রুল',
  inventory: 'ইনভেন্টরি রুল',
  timing: 'সময় রুল',
  participant: 'অংশগ্রহণকারী রুল',
  performance: 'পারফরম্যান্স রুল',
  compliance: 'সম্মতি রুল',
  security: 'নিরাপত্তা রুল',
  custom: 'কাস্টম রুল',
  system: 'সিস্টেম রুল',
  user: 'ব্যবহারকারী রুল',
  product: 'পণ্য রুল',
  category: 'ক্যাটাগরি রুল',
  brand: 'ব্র্যান্ড রুল',
};

// রুল টাইপের বিবরণ
export const RULE_TYPE_DESCRIPTIONS: Record<RuleType, string> = {
  eligibility: 'ব্যবহারকারীর যোগ্যতা নির্ধারণের রুল',
  pricing: 'মূল্য নির্ধারণ সংক্রান্ত রুল',
  discount: 'ডিসকাউন্ট প্রয়োগের রুল',
  restriction: 'সীমাবদ্ধতা আরোপের রুল',
  validation: 'ডেটা যাচাইকরণের রুল',
  notification: 'বিজ্ঞপ্তি পাঠানোর রুল',
  approval: 'অনুমোদন প্রক্রিয়ার রুল',
  priority: 'অগ্রাধিকার নির্ধারণের রুল',
  coupon: 'কুপন ব্যবহারের রুল',
  voucher: 'ভাউচার ব্যবহারের রুল',
  inventory: 'ইনভেন্টরি ব্যবস্থাপনার রুল',
  timing: 'সময় নির্ধারণের রুল',
  participant: 'অংশগ্রহণকারী ব্যবস্থাপনার রুল',
  performance: 'পারফরম্যান্স মূল্যায়নের রুল',
  compliance: 'নিয়ম মেনে চলার রুল',
  security: 'নিরাপত্তা সংক্রান্ত রুল',
  custom: 'কাস্টমাইজড রুল',
  system: 'সিস্টেম লেভেলের রুল',
  user: 'ব্যবহারকারী ভিত্তিক রুল',
  product: 'পণ্য ভিত্তিক রুল',
  category: 'ক্যাটাগরি ভিত্তিক রুল',
  brand: 'ব্র্যান্ড ভিত্তিক রুল',
};

// রুল টাইপের আইকন
export const RULE_TYPE_ICONS: Record<RuleType, string> = {
  eligibility: 'Shield',
  pricing: 'DollarSign',
  discount: 'Percent',
  restriction: 'Lock',
  validation: 'CheckCircle',
  notification: 'Bell',
  approval: 'ThumbsUp',
  priority: 'ArrowUp',
  coupon: 'Ticket',
  voucher: 'CreditCard',
  inventory: 'Package',
  timing: 'Clock',
  participant: 'Users',
  performance: 'BarChart',
  compliance: 'FileCheck',
  security: 'ShieldCheck',
  custom: 'Sliders',
  system: 'Server',
  user: 'User',
  product: 'Box',
  category: 'Folder',
  brand: 'Briefcase',
};

// রুল টাইপের কালার
export const RULE_TYPE_COLORS: Record<RuleType, string> = {
  eligibility: '#3B82F6',
  pricing: '#22C55E',
  discount: '#EC4899',
  restriction: '#EF4444',
  validation: '#8B5CF6',
  notification: '#F59E0B',
  approval: '#34D399',
  priority: '#F97316',
  coupon: '#06B6D4',
  voucher: '#6366F1',
  inventory: '#14B8A6',
  timing: '#8B5CF6',
  participant: '#FBBF24',
  performance: '#10B981',
  compliance: '#3B82F6',
  security: '#DC2626',
  custom: '#8B5CF6',
  system: '#1F2937',
  user: '#3B82F6',
  product: '#F59E0B',
  category: '#EC4899',
  brand: '#F97316',
};

// রুল টাইপ গ্রুপ
export const RULE_TYPE_GROUPS = {
  BUSINESS_RULES: ['pricing', 'discount', 'coupon', 'voucher'] as RuleType[],
  USER_RULES: ['eligibility', 'participant', 'user'] as RuleType[],
  PRODUCT_RULES: ['product', 'category', 'brand', 'inventory'] as RuleType[],
  SYSTEM_RULES: ['system', 'security', 'compliance'] as RuleType[],
  OPERATIONAL_RULES: ['restriction', 'validation', 'approval', 'priority'] as RuleType[],
  COMMUNICATION_RULES: ['notification'] as RuleType[],
  ANALYTICAL_RULES: ['performance'] as RuleType[],
  TEMPORAL_RULES: ['timing'] as RuleType[],
  CUSTOM_RULES: ['custom'] as RuleType[],
} as const;

// রুল টাইপ কনফিগারেশন ইন্টারফেস
export interface RuleTypeConfig {
  type: RuleType;
  label: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
}

// সম্পূর্ণ রুল টাইপ কনফিগারেশন
export const RULE_TYPE_CONFIGS: Record<RuleType, RuleTypeConfig> = {
  eligibility: {
    type: 'eligibility',
    label: RULE_TYPE_LABELS.eligibility,
    description: RULE_TYPE_DESCRIPTIONS.eligibility,
    icon: RULE_TYPE_ICONS.eligibility,
    color: RULE_TYPE_COLORS.eligibility,
    isActive: true,
  },
  pricing: {
    type: 'pricing',
    label: RULE_TYPE_LABELS.pricing,
    description: RULE_TYPE_DESCRIPTIONS.pricing,
    icon: RULE_TYPE_ICONS.pricing,
    color: RULE_TYPE_COLORS.pricing,
    isActive: true,
  },
  discount: {
    type: 'discount',
    label: RULE_TYPE_LABELS.discount,
    description: RULE_TYPE_DESCRIPTIONS.discount,
    icon: RULE_TYPE_ICONS.discount,
    color: RULE_TYPE_COLORS.discount,
    isActive: true,
  },
  restriction: {
    type: 'restriction',
    label: RULE_TYPE_LABELS.restriction,
    description: RULE_TYPE_DESCRIPTIONS.restriction,
    icon: RULE_TYPE_ICONS.restriction,
    color: RULE_TYPE_COLORS.restriction,
    isActive: true,
  },
  validation: {
    type: 'validation',
    label: RULE_TYPE_LABELS.validation,
    description: RULE_TYPE_DESCRIPTIONS.validation,
    icon: RULE_TYPE_ICONS.validation,
    color: RULE_TYPE_COLORS.validation,
    isActive: true,
  },
  notification: {
    type: 'notification',
    label: RULE_TYPE_LABELS.notification,
    description: RULE_TYPE_DESCRIPTIONS.notification,
    icon: RULE_TYPE_ICONS.notification,
    color: RULE_TYPE_COLORS.notification,
    isActive: true,
  },
  approval: {
    type: 'approval',
    label: RULE_TYPE_LABELS.approval,
    description: RULE_TYPE_DESCRIPTIONS.approval,
    icon: RULE_TYPE_ICONS.approval,
    color: RULE_TYPE_COLORS.approval,
    isActive: true,
  },
  priority: {
    type: 'priority',
    label: RULE_TYPE_LABELS.priority,
    description: RULE_TYPE_DESCRIPTIONS.priority,
    icon: RULE_TYPE_ICONS.priority,
    color: RULE_TYPE_COLORS.priority,
    isActive: true,
  },
  coupon: {
    type: 'coupon',
    label: RULE_TYPE_LABELS.coupon,
    description: RULE_TYPE_DESCRIPTIONS.coupon,
    icon: RULE_TYPE_ICONS.coupon,
    color: RULE_TYPE_COLORS.coupon,
    isActive: true,
  },
  voucher: {
    type: 'voucher',
    label: RULE_TYPE_LABELS.voucher,
    description: RULE_TYPE_DESCRIPTIONS.voucher,
    icon: RULE_TYPE_ICONS.voucher,
    color: RULE_TYPE_COLORS.voucher,
    isActive: true,
  },
  inventory: {
    type: 'inventory',
    label: RULE_TYPE_LABELS.inventory,
    description: RULE_TYPE_DESCRIPTIONS.inventory,
    icon: RULE_TYPE_ICONS.inventory,
    color: RULE_TYPE_COLORS.inventory,
    isActive: true,
  },
  timing: {
    type: 'timing',
    label: RULE_TYPE_LABELS.timing,
    description: RULE_TYPE_DESCRIPTIONS.timing,
    icon: RULE_TYPE_ICONS.timing,
    color: RULE_TYPE_COLORS.timing,
    isActive: true,
  },
  participant: {
    type: 'participant',
    label: RULE_TYPE_LABELS.participant,
    description: RULE_TYPE_DESCRIPTIONS.participant,
    icon: RULE_TYPE_ICONS.participant,
    color: RULE_TYPE_COLORS.participant,
    isActive: true,
  },
  performance: {
    type: 'performance',
    label: RULE_TYPE_LABELS.performance,
    description: RULE_TYPE_DESCRIPTIONS.performance,
    icon: RULE_TYPE_ICONS.performance,
    color: RULE_TYPE_COLORS.performance,
    isActive: true,
  },
  compliance: {
    type: 'compliance',
    label: RULE_TYPE_LABELS.compliance,
    description: RULE_TYPE_DESCRIPTIONS.compliance,
    icon: RULE_TYPE_ICONS.compliance,
    color: RULE_TYPE_COLORS.compliance,
    isActive: true,
  },
  security: {
    type: 'security',
    label: RULE_TYPE_LABELS.security,
    description: RULE_TYPE_DESCRIPTIONS.security,
    icon: RULE_TYPE_ICONS.security,
    color: RULE_TYPE_COLORS.security,
    isActive: true,
  },
  custom: {
    type: 'custom',
    label: RULE_TYPE_LABELS.custom,
    description: RULE_TYPE_DESCRIPTIONS.custom,
    icon: RULE_TYPE_ICONS.custom,
    color: RULE_TYPE_COLORS.custom,
    isActive: true,
  },
  system: {
    type: 'system',
    label: RULE_TYPE_LABELS.system,
    description: RULE_TYPE_DESCRIPTIONS.system,
    icon: RULE_TYPE_ICONS.system,
    color: RULE_TYPE_COLORS.system,
    isActive: true,
  },
  user: {
    type: 'user',
    label: RULE_TYPE_LABELS.user,
    description: RULE_TYPE_DESCRIPTIONS.user,
    icon: RULE_TYPE_ICONS.user,
    color: RULE_TYPE_COLORS.user,
    isActive: true,
  },
  product: {
    type: 'product',
    label: RULE_TYPE_LABELS.product,
    description: RULE_TYPE_DESCRIPTIONS.product,
    icon: RULE_TYPE_ICONS.product,
    color: RULE_TYPE_COLORS.product,
    isActive: true,
  },
  category: {
    type: 'category',
    label: RULE_TYPE_LABELS.category,
    description: RULE_TYPE_DESCRIPTIONS.category,
    icon: RULE_TYPE_ICONS.category,
    color: RULE_TYPE_COLORS.category,
    isActive: true,
  },
  brand: {
    type: 'brand',
    label: RULE_TYPE_LABELS.brand,
    description: RULE_TYPE_DESCRIPTIONS.brand,
    icon: RULE_TYPE_ICONS.brand,
    color: RULE_TYPE_COLORS.brand,
    isActive: true,
  },
};

// হেল্পার ফাংশন: রুল টাইপ ভ্যালিড কিনা চেক করুন
export const isValidRuleType = (type: string): type is RuleType => {
  return Object.values(RULE_TYPE).includes(type as RuleType);
};

// হেল্পার ফাংশন: সক্রিয় রুল টাইপ গুলো পান
export const getActiveRuleTypes = (): RuleType[] => {
  return Object.values(RULE_TYPE_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.type);
};

// হেল্পার ফাংশন: রুল টাইপ গ্রুপ অনুযায়ী ফিল্টার
export const getRuleTypesByGroup = (group: keyof typeof RULE_TYPE_GROUPS): RuleType[] => {
  return RULE_TYPE_GROUPS[group] || [];
};

// হেল্পার ফাংশন: রুল টাইপের লেবেল পান
export const getRuleTypeLabel = (type: RuleType): string => {
  return RULE_TYPE_LABELS[type] || type;
};

// হেল্পার ফাংশন: রুল টাইপের বিবরণ পান
export const getRuleTypeDescription = (type: RuleType): string => {
  return RULE_TYPE_DESCRIPTIONS[type] || '';
};

// হেল্পার ফাংশন: রুল টাইপের কালার পান
export const getRuleTypeColor = (type: RuleType): string => {
  return RULE_TYPE_COLORS[type] || '#6B7280';
};

// হেল্পার ফাংশন: রুল টাইপের আইকন পান
export const getRuleTypeIcon = (type: RuleType): string => {
  return RULE_TYPE_ICONS[type] || 'Circle';
};

// হেল্পার ফাংশন: রুল টাইপ বিজনেস রুল কিনা চেক করুন
export const isBusinessRule = (type: RuleType): boolean => {
  const businessTypes: RuleType[] = ['pricing', 'discount', 'coupon', 'voucher'];
  return businessTypes.includes(type);
};

// হেল্পার ফাংশন: রুল টাইপ সিস্টেম রুল কিনা চেক করুন
export const isSystemRule = (type: RuleType): boolean => {
  const systemTypes: RuleType[] = ['system', 'security', 'compliance'];
  return systemTypes.includes(type);
};
