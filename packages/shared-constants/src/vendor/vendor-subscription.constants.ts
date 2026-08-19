/**
 * ভেন্ডার সাবস্ক্রিপশন সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * সাবস্ক্রিপশন টাইপ অবজেক্ট
 */
export const SubscriptionType = {
  BASIC: 'BASIC',
  PREMIUM: 'PREMIUM',
  ENTERPRISE: 'ENTERPRISE',
  CUSTOM: 'CUSTOM',
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY',
  LIFETIME: 'LIFETIME',
} as const;

/**
 * সাবস্ক্রিপশন টাইপ - ইউনিয়ন টাইপ
 */
export type SubscriptionTypeValue = (typeof SubscriptionType)[keyof typeof SubscriptionType];

/**
 * বিলিং সাইকেল অবজেক্ট
 */
export const BillingCycle = {
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
  HALF_YEARLY: 'HALF_YEARLY',
  YEARLY: 'YEARLY',
} as const;

/**
 * বিলিং সাইকেল - ইউনিয়ন টাইপ
 */
export type BillingCycleValue = (typeof BillingCycle)[keyof typeof BillingCycle];

/**
 * ট্রায়াল পিরিয়ড দিন
 */
export const TrialPeriodDays = 14;

/**
 * সাবস্ক্রিপশন স্ট্যাটাস
 */
export const SubscriptionStatus = {
  ACTIVE: 'ACTIVE',
  TRIAL: 'TRIAL',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED',
  PAUSED: 'PAUSED',
} as const;

/**
 * সাবস্ক্রিপশন স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type SubscriptionStatusValue = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];

/**
 * সাবস্ক্রিপশন টাইপ লেবেলসমূহ
 */
export const SubscriptionTypeLabels: Record<SubscriptionTypeValue, { en: string; bn: string }> = {
  [SubscriptionType.BASIC]: {
    en: 'Basic',
    bn: 'বেসিক',
  },
  [SubscriptionType.PREMIUM]: {
    en: 'Premium',
    bn: 'প্রিমিয়াম',
  },
  [SubscriptionType.ENTERPRISE]: {
    en: 'Enterprise',
    bn: 'এন্টারপ্রাইজ',
  },
  [SubscriptionType.CUSTOM]: {
    en: 'Custom',
    bn: 'কাস্টম',
  },
  [SubscriptionType.MONTHLY]: {
    en: 'Monthly',
    bn: 'মাসিক',
  },
  [SubscriptionType.YEARLY]: {
    en: 'Yearly',
    bn: 'বার্ষিক',
  },
  [SubscriptionType.LIFETIME]: {
    en: 'Lifetime',
    bn: 'আজীবন',
  },
};

/**
 * বিলিং সাইকেল লেবেলসমূহ
 */
export const BillingCycleLabels: Record<BillingCycleValue, { en: string; bn: string }> = {
  [BillingCycle.MONTHLY]: {
    en: 'Monthly',
    bn: 'মাসিক',
  },
  [BillingCycle.QUARTERLY]: {
    en: 'Quarterly',
    bn: 'ত্রৈমাসিক',
  },
  [BillingCycle.HALF_YEARLY]: {
    en: 'Half Yearly',
    bn: 'আধ-বার্ষিক',
  },
  [BillingCycle.YEARLY]: {
    en: 'Yearly',
    bn: 'বার্ষিক',
  },
};

/**
 * সাবস্ক্রিপশন ফিচারসমূহ (টাইপ অনুযায়ী)
 */
export const SubscriptionFeatures: Record<SubscriptionTypeValue, string[]> = {
  [SubscriptionType.BASIC]: [
    'Basic vendor profile',
    'Up to 50 products',
    'Standard support',
    'Basic analytics',
  ],
  [SubscriptionType.PREMIUM]: [
    'Premium vendor profile',
    'Up to 200 products',
    'Priority support',
    'Advanced analytics',
    'Promotional tools',
    'Featured listings',
  ],
  [SubscriptionType.ENTERPRISE]: [
    'Enterprise vendor profile',
    'Unlimited products',
    '24/7 dedicated support',
    'Advanced analytics',
    'Promotional tools',
    'Featured listings',
    'API access',
    'Custom integrations',
  ],
  [SubscriptionType.CUSTOM]: [
    'Custom features',
    'Flexible product limits',
    'Custom support level',
    'Tailored analytics',
    'Custom integrations',
  ],
  [SubscriptionType.MONTHLY]: ['Monthly billing', 'Flexible cancellation', 'Standard features'],
  [SubscriptionType.YEARLY]: [
    'Yearly billing',
    'Save up to 20%',
    'Premium features',
    'Priority support',
  ],
  [SubscriptionType.LIFETIME]: [
    'One-time payment',
    'Lifetime access',
    'All premium features',
    'Lifetime support',
    'Regular updates',
  ],
};

/**
 * সাবস্ক্রিপশন লিমিটসমূহ (টাইপ অনুযায়ী)
 */
export const SubscriptionLimits: Record<
  SubscriptionTypeValue,
  {
    maxProducts: number;
    maxOrders: number;
    storageGB: number;
    apiCallsPerDay: number;
  }
> = {
  [SubscriptionType.BASIC]: {
    maxProducts: 50,
    maxOrders: 100,
    storageGB: 5,
    apiCallsPerDay: 100,
  },
  [SubscriptionType.PREMIUM]: {
    maxProducts: 200,
    maxOrders: 500,
    storageGB: 20,
    apiCallsPerDay: 500,
  },
  [SubscriptionType.ENTERPRISE]: {
    maxProducts: -1, // Unlimited
    maxOrders: -1, // Unlimited
    storageGB: 100,
    apiCallsPerDay: 5000,
  },
  [SubscriptionType.CUSTOM]: {
    maxProducts: -1, // Unlimited
    maxOrders: -1, // Unlimited
    storageGB: 50,
    apiCallsPerDay: 1000,
  },
  [SubscriptionType.MONTHLY]: {
    maxProducts: 100,
    maxOrders: 250,
    storageGB: 10,
    apiCallsPerDay: 250,
  },
  [SubscriptionType.YEARLY]: {
    maxProducts: 200,
    maxOrders: 500,
    storageGB: 20,
    apiCallsPerDay: 500,
  },
  [SubscriptionType.LIFETIME]: {
    maxProducts: 500,
    maxOrders: 1000,
    storageGB: 50,
    apiCallsPerDay: 1000,
  },
};

/**
 * সাবস্ক্রিপশন স্ট্যাটাস লেবেলসমূহ
 */
export const SubscriptionStatusLabels: Record<SubscriptionStatusValue, { en: string; bn: string }> =
  {
    [SubscriptionStatus.ACTIVE]: {
      en: 'Active',
      bn: 'সক্রিয়',
    },
    [SubscriptionStatus.TRIAL]: {
      en: 'Trial',
      bn: 'ট্রায়াল',
    },
    [SubscriptionStatus.EXPIRED]: {
      en: 'Expired',
      bn: 'মেয়াদ উত্তীর্ণ',
    },
    [SubscriptionStatus.CANCELLED]: {
      en: 'Cancelled',
      bn: 'বাতিল',
    },
    [SubscriptionStatus.PAUSED]: {
      en: 'Paused',
      bn: 'স্থগিত',
    },
  };

/**
 * সাবস্ক্রিপশন স্ট্যাটাস রঙ কোডসমূহ
 */
export const SubscriptionStatusColors: Record<SubscriptionStatusValue, string> = {
  [SubscriptionStatus.ACTIVE]: 'bg-green-100 text-green-800 border-green-300',
  [SubscriptionStatus.TRIAL]: 'bg-blue-100 text-blue-800 border-blue-300',
  [SubscriptionStatus.EXPIRED]: 'bg-red-100 text-red-800 border-red-300',
  [SubscriptionStatus.CANCELLED]: 'bg-gray-100 text-gray-800 border-gray-300',
  [SubscriptionStatus.PAUSED]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
};
