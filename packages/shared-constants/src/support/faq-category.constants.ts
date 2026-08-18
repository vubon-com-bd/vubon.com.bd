/**
 * FAQ ক্যাটাগরি সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * FAQ ক্যাটাগরি
 */
export const FAQ_CATEGORY = {
  ACCOUNT: 'account',
  ORDER: 'order',
  PAYMENT: 'payment',
  SHIPPING: 'shipping',
  RETURNS: 'returns',
  WARRANTY: 'warranty',
  TECHNICAL: 'technical',
  GENERAL: 'general',
  PRODUCT: 'product',
  SERVICE: 'service',
  BILLING: 'billing',
  SUBSCRIPTION: 'subscription',
  SECURITY: 'security',
  PRIVACY: 'privacy',
  TROUBLESHOOTING: 'troubleshooting',
  FEATURES: 'features',
  INTEGRATION: 'integration',
  MOBILE: 'mobile',
  DESKTOP: 'desktop',
  API: 'api',
  REFUND: 'refund',
  CANCELLATION: 'cancellation',
  UPGRADE: 'upgrade',
  DOWNGRADE: 'downgrade',
  RENEWAL: 'renewal',
  NOTIFICATION: 'notification',
  SETTINGS: 'settings',
  PROFILE: 'profile',
  AUTHENTICATION: 'authentication',
  AUTHORIZATION: 'authorization',
} as const;

/**
 * FAQ ক্যাটাগরির ডিসপ্লে নাম
 */
export const FAQ_CATEGORY_DISPLAY_NAMES = {
  [FAQ_CATEGORY.ACCOUNT]: 'অ্যাকাউন্ট',
  [FAQ_CATEGORY.ORDER]: 'অর্ডার',
  [FAQ_CATEGORY.PAYMENT]: 'পেমেন্ট',
  [FAQ_CATEGORY.SHIPPING]: 'শিপিং',
  [FAQ_CATEGORY.RETURNS]: 'রিটার্নস',
  [FAQ_CATEGORY.WARRANTY]: 'ওয়ারেন্টি',
  [FAQ_CATEGORY.TECHNICAL]: 'প্রযুক্তিগত',
  [FAQ_CATEGORY.GENERAL]: 'সাধারণ',
  [FAQ_CATEGORY.PRODUCT]: 'পণ্য',
  [FAQ_CATEGORY.SERVICE]: 'সার্ভিস',
  [FAQ_CATEGORY.BILLING]: 'বিলিং',
  [FAQ_CATEGORY.SUBSCRIPTION]: 'সাবস্ক্রিপশন',
  [FAQ_CATEGORY.SECURITY]: 'সিকিউরিটি',
  [FAQ_CATEGORY.PRIVACY]: 'প্রাইভেসি',
  [FAQ_CATEGORY.TROUBLESHOOTING]: 'ট্রাবলশুটিং',
  [FAQ_CATEGORY.FEATURES]: 'ফিচারসমূহ',
  [FAQ_CATEGORY.INTEGRATION]: 'ইন্টিগ্রেশন',
  [FAQ_CATEGORY.MOBILE]: 'মোবাইল',
  [FAQ_CATEGORY.DESKTOP]: 'ডেস্কটপ',
  [FAQ_CATEGORY.API]: 'এপিআই',
  [FAQ_CATEGORY.REFUND]: 'রিফান্ড',
  [FAQ_CATEGORY.CANCELLATION]: 'বাতিলকরণ',
  [FAQ_CATEGORY.UPGRADE]: 'আপগ্রেড',
  [FAQ_CATEGORY.DOWNGRADE]: 'ডাউনগ্রেড',
  [FAQ_CATEGORY.RENEWAL]: 'রিনিউয়াল',
  [FAQ_CATEGORY.NOTIFICATION]: 'নোটিফিকেশন',
  [FAQ_CATEGORY.SETTINGS]: 'সেটিংস',
  [FAQ_CATEGORY.PROFILE]: 'প্রোফাইল',
  [FAQ_CATEGORY.AUTHENTICATION]: 'অথেন্টিকেশন',
  [FAQ_CATEGORY.AUTHORIZATION]: 'অথরাইজেশন',
} as const;

/**
 * FAQ ক্যাটাগরির আইকন (অনুষঙ্গিক নাম)
 */
export const FAQ_CATEGORY_ICONS = {
  [FAQ_CATEGORY.ACCOUNT]: 'user',
  [FAQ_CATEGORY.ORDER]: 'shopping-bag',
  [FAQ_CATEGORY.PAYMENT]: 'credit-card',
  [FAQ_CATEGORY.SHIPPING]: 'truck',
  [FAQ_CATEGORY.RETURNS]: 'rotate-ccw',
  [FAQ_CATEGORY.WARRANTY]: 'shield',
  [FAQ_CATEGORY.TECHNICAL]: 'cpu',
  [FAQ_CATEGORY.GENERAL]: 'help-circle',
  [FAQ_CATEGORY.PRODUCT]: 'package',
  [FAQ_CATEGORY.SERVICE]: 'briefcase',
  [FAQ_CATEGORY.BILLING]: 'file-text',
  [FAQ_CATEGORY.SUBSCRIPTION]: 'repeat',
  [FAQ_CATEGORY.SECURITY]: 'lock',
  [FAQ_CATEGORY.PRIVACY]: 'eye-off',
  [FAQ_CATEGORY.TROUBLESHOOTING]: 'wrench',
  [FAQ_CATEGORY.FEATURES]: 'star',
  [FAQ_CATEGORY.INTEGRATION]: 'link',
  [FAQ_CATEGORY.MOBILE]: 'smartphone',
  [FAQ_CATEGORY.DESKTOP]: 'monitor',
  [FAQ_CATEGORY.API]: 'code',
  [FAQ_CATEGORY.REFUND]: 'dollar-sign',
  [FAQ_CATEGORY.CANCELLATION]: 'x-circle',
  [FAQ_CATEGORY.UPGRADE]: 'arrow-up-circle',
  [FAQ_CATEGORY.DOWNGRADE]: 'arrow-down-circle',
  [FAQ_CATEGORY.RENEWAL]: 'refresh-cw',
  [FAQ_CATEGORY.NOTIFICATION]: 'bell',
  [FAQ_CATEGORY.SETTINGS]: 'settings',
  [FAQ_CATEGORY.PROFILE]: 'user-circle',
  [FAQ_CATEGORY.AUTHENTICATION]: 'log-in',
  [FAQ_CATEGORY.AUTHORIZATION]: 'shield-check',
} as const;

/**
 * FAQ ক্যাটাগরির রঙের কোড (হেক্স)
 */
export const FAQ_CATEGORY_COLORS = {
  [FAQ_CATEGORY.ACCOUNT]: '#9b59b6',
  [FAQ_CATEGORY.ORDER]: '#e67e22',
  [FAQ_CATEGORY.PAYMENT]: '#27ae60',
  [FAQ_CATEGORY.SHIPPING]: '#f39c12',
  [FAQ_CATEGORY.RETURNS]: '#e74c3c',
  [FAQ_CATEGORY.WARRANTY]: '#2c3e50',
  [FAQ_CATEGORY.TECHNICAL]: '#3498db',
  [FAQ_CATEGORY.GENERAL]: '#95a5a6',
  [FAQ_CATEGORY.PRODUCT]: '#e67e22',
  [FAQ_CATEGORY.SERVICE]: '#1abc9c',
  [FAQ_CATEGORY.BILLING]: '#2ecc71',
  [FAQ_CATEGORY.SUBSCRIPTION]: '#8e44ad',
  [FAQ_CATEGORY.SECURITY]: '#c0392b',
  [FAQ_CATEGORY.PRIVACY]: '#7f8c8d',
  [FAQ_CATEGORY.TROUBLESHOOTING]: '#e67e22',
  [FAQ_CATEGORY.FEATURES]: '#f1c40f',
  [FAQ_CATEGORY.INTEGRATION]: '#16a085',
  [FAQ_CATEGORY.MOBILE]: '#d35400',
  [FAQ_CATEGORY.DESKTOP]: '#34495e',
  [FAQ_CATEGORY.API]: '#2980b9',
  [FAQ_CATEGORY.REFUND]: '#e74c3c',
  [FAQ_CATEGORY.CANCELLATION]: '#c0392b',
  [FAQ_CATEGORY.UPGRADE]: '#2ecc71',
  [FAQ_CATEGORY.DOWNGRADE]: '#e67e22',
  [FAQ_CATEGORY.RENEWAL]: '#3498db',
  [FAQ_CATEGORY.NOTIFICATION]: '#f39c12',
  [FAQ_CATEGORY.SETTINGS]: '#7f8c8d',
  [FAQ_CATEGORY.PROFILE]: '#9b59b6',
  [FAQ_CATEGORY.AUTHENTICATION]: '#2980b9',
  [FAQ_CATEGORY.AUTHORIZATION]: '#27ae60',
} as const;

/**
 * FAQ ক্যাটাগরির গ্রুপ
 */
export const FAQ_CATEGORY_GROUPS = {
  ACCOUNT: ['account', 'profile', 'authentication', 'authorization'] as const,
  ORDER: ['order', 'shipping', 'returns', 'refund', 'cancellation'] as const,
  PAYMENT: ['payment', 'billing', 'subscription', 'renewal', 'upgrade', 'downgrade'] as const,
  TECHNICAL: ['technical', 'troubleshooting', 'api', 'integration', 'security', 'privacy'] as const,
  GENERAL: ['general', 'product', 'service', 'features', 'settings', 'notification'] as const,
  PLATFORM: ['mobile', 'desktop'] as const,
  SUPPORT: ['warranty'] as const,
} as const;

/**
 * FAQ ক্যাটাগরির ডিফল্ট প্রায়োরিটি (অর্ডারের জন্য)
 */
export const FAQ_CATEGORY_DEFAULT_ORDER = {
  [FAQ_CATEGORY.ACCOUNT]: 1,
  [FAQ_CATEGORY.ORDER]: 2,
  [FAQ_CATEGORY.PAYMENT]: 3,
  [FAQ_CATEGORY.SHIPPING]: 4,
  [FAQ_CATEGORY.RETURNS]: 5,
  [FAQ_CATEGORY.WARRANTY]: 6,
  [FAQ_CATEGORY.TECHNICAL]: 7,
  [FAQ_CATEGORY.GENERAL]: 8,
  [FAQ_CATEGORY.PRODUCT]: 9,
  [FAQ_CATEGORY.SERVICE]: 10,
  [FAQ_CATEGORY.BILLING]: 11,
  [FAQ_CATEGORY.SUBSCRIPTION]: 12,
  [FAQ_CATEGORY.SECURITY]: 13,
  [FAQ_CATEGORY.PRIVACY]: 14,
  [FAQ_CATEGORY.TROUBLESHOOTING]: 15,
  [FAQ_CATEGORY.FEATURES]: 16,
  [FAQ_CATEGORY.INTEGRATION]: 17,
  [FAQ_CATEGORY.MOBILE]: 18,
  [FAQ_CATEGORY.DESKTOP]: 19,
  [FAQ_CATEGORY.API]: 20,
  [FAQ_CATEGORY.REFUND]: 21,
  [FAQ_CATEGORY.CANCELLATION]: 22,
  [FAQ_CATEGORY.UPGRADE]: 23,
  [FAQ_CATEGORY.DOWNGRADE]: 24,
  [FAQ_CATEGORY.RENEWAL]: 25,
  [FAQ_CATEGORY.NOTIFICATION]: 26,
  [FAQ_CATEGORY.SETTINGS]: 27,
  [FAQ_CATEGORY.PROFILE]: 28,
  [FAQ_CATEGORY.AUTHENTICATION]: 29,
  [FAQ_CATEGORY.AUTHORIZATION]: 30,
} as const;

/**
 * FAQ ক্যাটাগরির সাব-ক্যাটাগরি ম্যাপিং
 */
export const FAQ_CATEGORY_SUB_CATEGORIES = {
  [FAQ_CATEGORY.ACCOUNT]: ['profile', 'settings', 'authentication', 'authorization'] as const,
  [FAQ_CATEGORY.ORDER]: ['shipping', 'returns', 'refund', 'cancellation'] as const,
  [FAQ_CATEGORY.PAYMENT]: ['billing', 'subscription', 'renewal', 'upgrade', 'downgrade'] as const,
  [FAQ_CATEGORY.TECHNICAL]: [
    'troubleshooting',
    'api',
    'integration',
    'security',
    'privacy',
  ] as const,
  [FAQ_CATEGORY.GENERAL]: ['product', 'service', 'features', 'settings', 'notification'] as const,
  [FAQ_CATEGORY.MOBILE]: ['mobile'] as const,
  [FAQ_CATEGORY.DESKTOP]: ['desktop'] as const,
  [FAQ_CATEGORY.WARRANTY]: ['warranty'] as const,
} as const;

export type FAQCategory = (typeof FAQ_CATEGORY)[keyof typeof FAQ_CATEGORY];
export type FAQCategoryDisplayNames = typeof FAQ_CATEGORY_DISPLAY_NAMES;
export type FAQCategoryIcons = typeof FAQ_CATEGORY_ICONS;
export type FAQCategoryColors = typeof FAQ_CATEGORY_COLORS;
export type FAQCategoryGroups = typeof FAQ_CATEGORY_GROUPS;
export type FAQCategoryDefaultOrder = typeof FAQ_CATEGORY_DEFAULT_ORDER;
export type FAQCategorySubCategories = typeof FAQ_CATEGORY_SUB_CATEGORIES;

export type FAQCategoryGroup = keyof typeof FAQ_CATEGORY_GROUPS;

export interface FAQCategoryConfig {
  category: FAQCategory;
  displayName: string;
  icon: string;
  color: string;
  group: FAQCategoryGroup;
  order: number;
  subCategories?: readonly FAQCategory[];
}

/**
 * FAQ ক্যাটাগরি কনফিগারেশন অবজেক্ট
 */
export const FAQ_CATEGORY_CONFIGS: Record<FAQCategory, FAQCategoryConfig> = {
  [FAQ_CATEGORY.ACCOUNT]: {
    category: FAQ_CATEGORY.ACCOUNT,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.ACCOUNT],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.ACCOUNT],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.ACCOUNT],
    group: 'ACCOUNT',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.ACCOUNT],
  },
  [FAQ_CATEGORY.ORDER]: {
    category: FAQ_CATEGORY.ORDER,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.ORDER],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.ORDER],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.ORDER],
    group: 'ORDER',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.ORDER],
  },
  [FAQ_CATEGORY.PAYMENT]: {
    category: FAQ_CATEGORY.PAYMENT,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.PAYMENT],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.PAYMENT],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.PAYMENT],
    group: 'PAYMENT',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.PAYMENT],
  },
  [FAQ_CATEGORY.SHIPPING]: {
    category: FAQ_CATEGORY.SHIPPING,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.SHIPPING],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.SHIPPING],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.SHIPPING],
    group: 'ORDER',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.SHIPPING],
  },
  [FAQ_CATEGORY.RETURNS]: {
    category: FAQ_CATEGORY.RETURNS,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.RETURNS],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.RETURNS],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.RETURNS],
    group: 'ORDER',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.RETURNS],
  },
  [FAQ_CATEGORY.WARRANTY]: {
    category: FAQ_CATEGORY.WARRANTY,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.WARRANTY],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.WARRANTY],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.WARRANTY],
    group: 'SUPPORT',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.WARRANTY],
  },
  [FAQ_CATEGORY.TECHNICAL]: {
    category: FAQ_CATEGORY.TECHNICAL,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.TECHNICAL],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.TECHNICAL],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.TECHNICAL],
    group: 'TECHNICAL',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.TECHNICAL],
  },
  [FAQ_CATEGORY.GENERAL]: {
    category: FAQ_CATEGORY.GENERAL,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.GENERAL],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.GENERAL],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.GENERAL],
    group: 'GENERAL',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.GENERAL],
  },
  [FAQ_CATEGORY.PRODUCT]: {
    category: FAQ_CATEGORY.PRODUCT,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.PRODUCT],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.PRODUCT],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.PRODUCT],
    group: 'GENERAL',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.PRODUCT],
  },
  [FAQ_CATEGORY.SERVICE]: {
    category: FAQ_CATEGORY.SERVICE,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.SERVICE],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.SERVICE],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.SERVICE],
    group: 'GENERAL',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.SERVICE],
  },
  [FAQ_CATEGORY.BILLING]: {
    category: FAQ_CATEGORY.BILLING,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.BILLING],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.BILLING],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.BILLING],
    group: 'PAYMENT',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.BILLING],
  },
  [FAQ_CATEGORY.SUBSCRIPTION]: {
    category: FAQ_CATEGORY.SUBSCRIPTION,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.SUBSCRIPTION],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.SUBSCRIPTION],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.SUBSCRIPTION],
    group: 'PAYMENT',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.SUBSCRIPTION],
  },
  [FAQ_CATEGORY.SECURITY]: {
    category: FAQ_CATEGORY.SECURITY,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.SECURITY],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.SECURITY],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.SECURITY],
    group: 'TECHNICAL',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.SECURITY],
  },
  [FAQ_CATEGORY.PRIVACY]: {
    category: FAQ_CATEGORY.PRIVACY,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.PRIVACY],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.PRIVACY],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.PRIVACY],
    group: 'TECHNICAL',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.PRIVACY],
  },
  [FAQ_CATEGORY.TROUBLESHOOTING]: {
    category: FAQ_CATEGORY.TROUBLESHOOTING,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.TROUBLESHOOTING],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.TROUBLESHOOTING],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.TROUBLESHOOTING],
    group: 'TECHNICAL',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.TROUBLESHOOTING],
  },
  [FAQ_CATEGORY.FEATURES]: {
    category: FAQ_CATEGORY.FEATURES,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.FEATURES],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.FEATURES],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.FEATURES],
    group: 'GENERAL',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.FEATURES],
  },
  [FAQ_CATEGORY.INTEGRATION]: {
    category: FAQ_CATEGORY.INTEGRATION,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.INTEGRATION],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.INTEGRATION],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.INTEGRATION],
    group: 'TECHNICAL',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.INTEGRATION],
  },
  [FAQ_CATEGORY.MOBILE]: {
    category: FAQ_CATEGORY.MOBILE,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.MOBILE],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.MOBILE],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.MOBILE],
    group: 'PLATFORM',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.MOBILE],
  },
  [FAQ_CATEGORY.DESKTOP]: {
    category: FAQ_CATEGORY.DESKTOP,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.DESKTOP],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.DESKTOP],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.DESKTOP],
    group: 'PLATFORM',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.DESKTOP],
  },
  [FAQ_CATEGORY.API]: {
    category: FAQ_CATEGORY.API,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.API],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.API],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.API],
    group: 'TECHNICAL',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.API],
  },
  [FAQ_CATEGORY.REFUND]: {
    category: FAQ_CATEGORY.REFUND,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.REFUND],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.REFUND],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.REFUND],
    group: 'ORDER',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.REFUND],
  },
  [FAQ_CATEGORY.CANCELLATION]: {
    category: FAQ_CATEGORY.CANCELLATION,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.CANCELLATION],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.CANCELLATION],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.CANCELLATION],
    group: 'ORDER',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.CANCELLATION],
  },
  [FAQ_CATEGORY.UPGRADE]: {
    category: FAQ_CATEGORY.UPGRADE,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.UPGRADE],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.UPGRADE],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.UPGRADE],
    group: 'PAYMENT',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.UPGRADE],
  },
  [FAQ_CATEGORY.DOWNGRADE]: {
    category: FAQ_CATEGORY.DOWNGRADE,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.DOWNGRADE],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.DOWNGRADE],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.DOWNGRADE],
    group: 'PAYMENT',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.DOWNGRADE],
  },
  [FAQ_CATEGORY.RENEWAL]: {
    category: FAQ_CATEGORY.RENEWAL,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.RENEWAL],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.RENEWAL],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.RENEWAL],
    group: 'PAYMENT',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.RENEWAL],
  },
  [FAQ_CATEGORY.NOTIFICATION]: {
    category: FAQ_CATEGORY.NOTIFICATION,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.NOTIFICATION],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.NOTIFICATION],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.NOTIFICATION],
    group: 'GENERAL',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.NOTIFICATION],
  },
  [FAQ_CATEGORY.SETTINGS]: {
    category: FAQ_CATEGORY.SETTINGS,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.SETTINGS],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.SETTINGS],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.SETTINGS],
    group: 'GENERAL',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.SETTINGS],
  },
  [FAQ_CATEGORY.PROFILE]: {
    category: FAQ_CATEGORY.PROFILE,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.PROFILE],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.PROFILE],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.PROFILE],
    group: 'ACCOUNT',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.PROFILE],
  },
  [FAQ_CATEGORY.AUTHENTICATION]: {
    category: FAQ_CATEGORY.AUTHENTICATION,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.AUTHENTICATION],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.AUTHENTICATION],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.AUTHENTICATION],
    group: 'ACCOUNT',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.AUTHENTICATION],
  },
  [FAQ_CATEGORY.AUTHORIZATION]: {
    category: FAQ_CATEGORY.AUTHORIZATION,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.AUTHORIZATION],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.AUTHORIZATION],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.AUTHORIZATION],
    group: 'ACCOUNT',
    order: FAQ_CATEGORY_DEFAULT_ORDER[FAQ_CATEGORY.AUTHORIZATION],
  },
};

/**
 * FAQ ক্যাটাগরি গ্রুপ কনফিগারেশন
 */
export const FAQ_CATEGORY_GROUP_CONFIGS: Record<
  FAQCategoryGroup,
  {
    group: FAQCategoryGroup;
    displayName: string;
    icon: string;
    color: string;
    categories: readonly FAQCategory[];
  }
> = {
  ACCOUNT: {
    group: 'ACCOUNT',
    displayName: 'অ্যাকাউন্ট',
    icon: 'user',
    color: '#9b59b6',
    categories: ['account', 'profile', 'authentication', 'authorization'] as const,
  },
  ORDER: {
    group: 'ORDER',
    displayName: 'অর্ডার ও ডেলিভারি',
    icon: 'shopping-bag',
    color: '#e67e22',
    categories: ['order', 'shipping', 'returns', 'refund', 'cancellation'] as const,
  },
  PAYMENT: {
    group: 'PAYMENT',
    displayName: 'পেমেন্ট ও বিলিং',
    icon: 'credit-card',
    color: '#27ae60',
    categories: ['payment', 'billing', 'subscription', 'renewal', 'upgrade', 'downgrade'] as const,
  },
  TECHNICAL: {
    group: 'TECHNICAL',
    displayName: 'প্রযুক্তিগত',
    icon: 'cpu',
    color: '#3498db',
    categories: [
      'technical',
      'troubleshooting',
      'api',
      'integration',
      'security',
      'privacy',
    ] as const,
  },
  GENERAL: {
    group: 'GENERAL',
    displayName: 'সাধারণ',
    icon: 'help-circle',
    color: '#95a5a6',
    categories: ['general', 'product', 'service', 'features', 'settings', 'notification'] as const,
  },
  PLATFORM: {
    group: 'PLATFORM',
    displayName: 'প্ল্যাটফর্ম',
    icon: 'smartphone',
    color: '#d35400',
    categories: ['mobile', 'desktop'] as const,
  },
  SUPPORT: {
    group: 'SUPPORT',
    displayName: 'সাপোর্ট',
    icon: 'shield',
    color: '#2c3e50',
    categories: ['warranty'] as const,
  },
};

/**
 * FAQ ক্যাটাগরি স্ট্যাটাস
 */
export const FAQ_CATEGORY_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ARCHIVED: 'archived',
} as const;

export type FAQCategoryStatus = (typeof FAQ_CATEGORY_STATUS)[keyof typeof FAQ_CATEGORY_STATUS];
