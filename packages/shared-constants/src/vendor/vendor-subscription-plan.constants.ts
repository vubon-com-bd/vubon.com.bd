/**
 * সাবস্ক্রিপশন প্ল্যান সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * প্ল্যান টাইপ অবজেক্ট
 */
export const PlanType = {
  FREE: 'FREE',
  STARTER: 'STARTER',
  GROWTH: 'GROWTH',
  BUSINESS: 'BUSINESS',
  ENTERPRISE: 'ENTERPRISE',
  CUSTOM: 'CUSTOM',
} as const;

/**
 * প্ল্যান টাইপ - ইউনিয়ন টাইপ
 */
export type PlanTypeValue = (typeof PlanType)[keyof typeof PlanType];

/**
 * প্ল্যান প্রাইসিং (BDT)
 */
export const PlanPricing: Record<
  PlanTypeValue,
  {
    monthly: number;
    yearly: number;
    quarterly: number;
  }
> = {
  [PlanType.FREE]: {
    monthly: 0,
    yearly: 0,
    quarterly: 0,
  },
  [PlanType.STARTER]: {
    monthly: 499,
    yearly: 4990,
    quarterly: 1497,
  },
  [PlanType.GROWTH]: {
    monthly: 999,
    yearly: 9990,
    quarterly: 2997,
  },
  [PlanType.BUSINESS]: {
    monthly: 1999,
    yearly: 19990,
    quarterly: 5997,
  },
  [PlanType.ENTERPRISE]: {
    monthly: 4999,
    yearly: 49990,
    quarterly: 14997,
  },
  [PlanType.CUSTOM]: {
    monthly: 0,
    yearly: 0,
    quarterly: 0,
  },
};

/**
 * প্ল্যান ফিচার তালিকা
 */
export const PlanFeatures: Record<PlanTypeValue, string[]> = {
  [PlanType.FREE]: [
    'Basic vendor profile',
    'Up to 10 products',
    'Community support',
    'Basic reporting',
  ],
  [PlanType.STARTER]: [
    'Standard vendor profile',
    'Up to 50 products',
    'Email support',
    'Basic analytics',
    'Standard dashboard',
    '1 featured listing',
  ],
  [PlanType.GROWTH]: [
    'Enhanced vendor profile',
    'Up to 200 products',
    'Priority support',
    'Advanced analytics',
    'Custom dashboard',
    '3 featured listings',
    'Promotional tools',
  ],
  [PlanType.BUSINESS]: [
    'Premium vendor profile',
    'Up to 500 products',
    '24/7 support',
    'Advanced analytics',
    'Custom dashboard',
    '10 featured listings',
    'Promotional tools',
    'API access',
  ],
  [PlanType.ENTERPRISE]: [
    'Enterprise vendor profile',
    'Unlimited products',
    'Dedicated support',
    'Advanced analytics',
    'Custom dashboard',
    'Unlimited featured listings',
    'Promotional tools',
    'API access',
    'Custom integrations',
    'White-label options',
  ],
  [PlanType.CUSTOM]: [
    'Custom features',
    'Flexible limits',
    'Custom pricing',
    'Dedicated support',
    'Custom integrations',
  ],
};

/**
 * প্ল্যান লিমিটসমূহ
 */
export const PlanLimits: Record<
  PlanTypeValue,
  {
    productLimit: number;
    orderLimit: number;
    storageLimitGB: number;
    employeeLimit: number;
    apiCallsPerDay: number;
  }
> = {
  [PlanType.FREE]: {
    productLimit: 10,
    orderLimit: 50,
    storageLimitGB: 1,
    employeeLimit: 1,
    apiCallsPerDay: 50,
  },
  [PlanType.STARTER]: {
    productLimit: 50,
    orderLimit: 200,
    storageLimitGB: 5,
    employeeLimit: 2,
    apiCallsPerDay: 200,
  },
  [PlanType.GROWTH]: {
    productLimit: 200,
    orderLimit: 500,
    storageLimitGB: 20,
    employeeLimit: 5,
    apiCallsPerDay: 500,
  },
  [PlanType.BUSINESS]: {
    productLimit: 500,
    orderLimit: 1000,
    storageLimitGB: 50,
    employeeLimit: 10,
    apiCallsPerDay: 1000,
  },
  [PlanType.ENTERPRISE]: {
    productLimit: -1, // Unlimited
    orderLimit: -1, // Unlimited
    storageLimitGB: 200,
    employeeLimit: -1, // Unlimited
    apiCallsPerDay: 5000,
  },
  [PlanType.CUSTOM]: {
    productLimit: -1, // Unlimited
    orderLimit: -1, // Unlimited
    storageLimitGB: 100,
    employeeLimit: -1, // Unlimited
    apiCallsPerDay: 2000,
  },
};

/**
 * প্ল্যান ডিসকাউন্ট (বার্ষিক/আধ-বার্ষিক)
 */
export const PlanDiscounts: Record<
  PlanTypeValue,
  {
    quarterlyDiscount: number;
    yearlyDiscount: number;
  }
> = {
  [PlanType.FREE]: {
    quarterlyDiscount: 0,
    yearlyDiscount: 0,
  },
  [PlanType.STARTER]: {
    quarterlyDiscount: 5,
    yearlyDiscount: 15,
  },
  [PlanType.GROWTH]: {
    quarterlyDiscount: 5,
    yearlyDiscount: 15,
  },
  [PlanType.BUSINESS]: {
    quarterlyDiscount: 10,
    yearlyDiscount: 20,
  },
  [PlanType.ENTERPRISE]: {
    quarterlyDiscount: 10,
    yearlyDiscount: 25,
  },
  [PlanType.CUSTOM]: {
    quarterlyDiscount: 15,
    yearlyDiscount: 30,
  },
};

/**
 * প্ল্যান স্ট্যাটাস
 */
export const PlanStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DEPRECATED: 'DEPRECATED',
} as const;

/**
 * প্ল্যান স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type PlanStatusValue = (typeof PlanStatus)[keyof typeof PlanStatus];

/**
 * প্ল্যান টাইপ লেবেলসমূহ
 */
export const PlanTypeLabels: Record<PlanTypeValue, { en: string; bn: string }> = {
  [PlanType.FREE]: {
    en: 'Free',
    bn: 'বিনামূল্যে',
  },
  [PlanType.STARTER]: {
    en: 'Starter',
    bn: 'শুরু',
  },
  [PlanType.GROWTH]: {
    en: 'Growth',
    bn: 'গ্রোথ',
  },
  [PlanType.BUSINESS]: {
    en: 'Business',
    bn: 'ব্যবসা',
  },
  [PlanType.ENTERPRISE]: {
    en: 'Enterprise',
    bn: 'এন্টারপ্রাইজ',
  },
  [PlanType.CUSTOM]: {
    en: 'Custom',
    bn: 'কাস্টম',
  },
};

/**
 * প্ল্যান স্ট্যাটাস লেবেলসমূহ
 */
export const PlanStatusLabels: Record<PlanStatusValue, { en: string; bn: string }> = {
  [PlanStatus.ACTIVE]: {
    en: 'Active',
    bn: 'সক্রিয়',
  },
  [PlanStatus.INACTIVE]: {
    en: 'Inactive',
    bn: 'নিষ্ক্রিয়',
  },
  [PlanStatus.DEPRECATED]: {
    en: 'Deprecated',
    bn: 'অব্যবহৃত',
  },
};
