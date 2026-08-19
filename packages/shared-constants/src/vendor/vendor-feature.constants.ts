/**
 * ভেন্ডার ফিচার সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * ফিচার ক্যাটাগরি অবজেক্ট
 */
export const FeatureCategory = {
  PRODUCT_MANAGEMENT: 'PRODUCT_MANAGEMENT',
  ORDER_MANAGEMENT: 'ORDER_MANAGEMENT',
  ANALYTICS: 'ANALYTICS',
  MARKETING: 'MARKETING',
  CUSTOMER_MANAGEMENT: 'CUSTOMER_MANAGEMENT',
  SETTINGS: 'SETTINGS',
  TEAM_MANAGEMENT: 'TEAM_MANAGEMENT',
  PAYMENT: 'PAYMENT',
} as const;

/**
 * ফিচার ক্যাটাগরি - ইউনিয়ন টাইপ
 */
export type FeatureCategoryValue = (typeof FeatureCategory)[keyof typeof FeatureCategory];

/**
 * ফিচার টাইপ অবজেক্ট
 */
export const FeatureType = {
  BASIC: 'BASIC',
  ADVANCED: 'ADVANCED',
  PREMIUM: 'PREMIUM',
  ENTERPRISE: 'ENTERPRISE',
} as const;

/**
 * ফিচার টাইপ - ইউনিয়ন টাইপ
 */
export type FeatureTypeValue = (typeof FeatureType)[keyof typeof FeatureType];

/**
 * ফিচার স্ট্যাটাস
 */
export const FeatureStatus = {
  ENABLED: 'ENABLED',
  DISABLED: 'DISABLED',
  COMING_SOON: 'COMING_SOON',
  DEPRECATED: 'DEPRECATED',
} as const;

/**
 * ফিচার স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type FeatureStatusValue = (typeof FeatureStatus)[keyof typeof FeatureStatus];

/**
 * ফিচার ক্যাটাগরি লেবেলসমূহ
 */
export const FeatureCategoryLabels: Record<FeatureCategoryValue, { en: string; bn: string }> = {
  [FeatureCategory.PRODUCT_MANAGEMENT]: {
    en: 'Product Management',
    bn: 'পণ্য ব্যবস্থাপনা',
  },
  [FeatureCategory.ORDER_MANAGEMENT]: {
    en: 'Order Management',
    bn: 'অর্ডার ব্যবস্থাপনা',
  },
  [FeatureCategory.ANALYTICS]: {
    en: 'Analytics',
    bn: 'বিশ্লেষণ',
  },
  [FeatureCategory.MARKETING]: {
    en: 'Marketing',
    bn: 'মার্কেটিং',
  },
  [FeatureCategory.CUSTOMER_MANAGEMENT]: {
    en: 'Customer Management',
    bn: 'গ্রাহক ব্যবস্থাপনা',
  },
  [FeatureCategory.SETTINGS]: {
    en: 'Settings',
    bn: 'সেটিংস',
  },
  [FeatureCategory.TEAM_MANAGEMENT]: {
    en: 'Team Management',
    bn: 'টিম ব্যবস্থাপনা',
  },
  [FeatureCategory.PAYMENT]: {
    en: 'Payment',
    bn: 'পেমেন্ট',
  },
};

/**
 * ফিচার টাইপ লেবেলসমূহ
 */
export const FeatureTypeLabels: Record<FeatureTypeValue, { en: string; bn: string }> = {
  [FeatureType.BASIC]: {
    en: 'Basic',
    bn: 'বেসিক',
  },
  [FeatureType.ADVANCED]: {
    en: 'Advanced',
    bn: 'উন্নত',
  },
  [FeatureType.PREMIUM]: {
    en: 'Premium',
    bn: 'প্রিমিয়াম',
  },
  [FeatureType.ENTERPRISE]: {
    en: 'Enterprise',
    bn: 'এন্টারপ্রাইজ',
  },
};

/**
 * ফিচার স্ট্যাটাস লেবেলসমূহ
 */
export const FeatureStatusLabels: Record<FeatureStatusValue, { en: string; bn: string }> = {
  [FeatureStatus.ENABLED]: {
    en: 'Enabled',
    bn: 'সক্রিয়',
  },
  [FeatureStatus.DISABLED]: {
    en: 'Disabled',
    bn: 'নিষ্ক্রিয়',
  },
  [FeatureStatus.COMING_SOON]: {
    en: 'Coming Soon',
    bn: 'শীঘ্রই আসছে',
  },
  [FeatureStatus.DEPRECATED]: {
    en: 'Deprecated',
    bn: 'অব্যবহৃত',
  },
};

/**
 * ফিচার স্ট্যাটাস রঙ কোডসমূহ
 */
export const FeatureStatusColors: Record<FeatureStatusValue, string> = {
  [FeatureStatus.ENABLED]: 'bg-green-100 text-green-800 border-green-300',
  [FeatureStatus.DISABLED]: 'bg-red-100 text-red-800 border-red-300',
  [FeatureStatus.COMING_SOON]: 'bg-blue-100 text-blue-800 border-blue-300',
  [FeatureStatus.DEPRECATED]: 'bg-gray-100 text-gray-800 border-gray-300',
};

/**
 * ডিফল্ট ফিচারসমূহ (সব প্ল্যানে সক্রিয়)
 */
export const DefaultFeatures: string[] = [
  'basic_profile',
  'product_management',
  'order_management',
  'basic_analytics',
  'standard_support',
];

/**
 * ফিচার ডিপেন্ডেন্সি ম্যাপিং
 */
export const FeatureDependencies: Record<string, string[]> = {
  advanced_analytics: ['basic_analytics'],
  team_management: ['user_management'],
  promotional_tools: ['marketing_tools'],
  api_access: ['advanced_analytics'],
  custom_integrations: ['api_access'],
  white_label: ['custom_integrations'],
};

/**
 * ফিচার টগল সেটিংস
 */
export const FeatureToggles: Record<
  string,
  {
    description: string;
    defaultState: boolean;
    category: FeatureCategoryValue;
    type: FeatureTypeValue;
  }
> = {
  basic_profile: {
    description: 'Basic vendor profile features',
    defaultState: true,
    category: FeatureCategory.SETTINGS,
    type: FeatureType.BASIC,
  },
  product_management: {
    description: 'Product creation and management',
    defaultState: true,
    category: FeatureCategory.PRODUCT_MANAGEMENT,
    type: FeatureType.BASIC,
  },
  order_management: {
    description: 'Order processing and tracking',
    defaultState: true,
    category: FeatureCategory.ORDER_MANAGEMENT,
    type: FeatureType.BASIC,
  },
  basic_analytics: {
    description: 'Basic analytics and reporting',
    defaultState: true,
    category: FeatureCategory.ANALYTICS,
    type: FeatureType.BASIC,
  },
  advanced_analytics: {
    description: 'Advanced analytics and insights',
    defaultState: false,
    category: FeatureCategory.ANALYTICS,
    type: FeatureType.ADVANCED,
  },
  marketing_tools: {
    description: 'Marketing and promotional tools',
    defaultState: false,
    category: FeatureCategory.MARKETING,
    type: FeatureType.PREMIUM,
  },
  team_management: {
    description: 'Team and staff management',
    defaultState: false,
    category: FeatureCategory.TEAM_MANAGEMENT,
    type: FeatureType.ADVANCED,
  },
  customer_management: {
    description: 'Customer relationship management',
    defaultState: false,
    category: FeatureCategory.CUSTOMER_MANAGEMENT,
    type: FeatureType.PREMIUM,
  },
  api_access: {
    description: 'API access for integrations',
    defaultState: false,
    category: FeatureCategory.SETTINGS,
    type: FeatureType.ENTERPRISE,
  },
  custom_integrations: {
    description: 'Custom integrations with third-party services',
    defaultState: false,
    category: FeatureCategory.SETTINGS,
    type: FeatureType.ENTERPRISE,
  },
};

/**
 * ফিচার এক্সপাইরি সময় (দিন)
 */
export const FeatureExpiryDays = 30;

/**
 * ফিচার অডিট লগ রিটেনশন (দিন)
 */
export const FeatureAuditLogRetentionDays = 365;
