/**
 * সাবস্ক্রিপশনের স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * সাবস্ক্রিপশন স্ট্যাটাস (বিস্তারিত)
 */
export const SubscriptionStatusExtended = {
  PENDING_ACTIVATION: 'PENDING_ACTIVATION',
  ACTIVE: 'ACTIVE',
  TRIAL: 'TRIAL',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED',
  SUSPENDED: 'SUSPENDED',
  ON_HOLD: 'ON_HOLD',
  INCOMPLETE: 'INCOMPLETE',
  FAILED: 'FAILED',
} as const;

/**
 * সাবস্ক্রিপশন স্ট্যাটাস (বিস্তারিত) - ইউনিয়ন টাইপ
 */
export type SubscriptionStatusExtendedValue =
  (typeof SubscriptionStatusExtended)[keyof typeof SubscriptionStatusExtended];

/**
 * সাবস্ক্রিপশন স্ট্যাটাস লেবেলসমূহ
 */
export const SubscriptionStatusExtendedLabels: Record<
  SubscriptionStatusExtendedValue,
  { en: string; bn: string }
> = {
  [SubscriptionStatusExtended.PENDING_ACTIVATION]: {
    en: 'Pending Activation',
    bn: 'সক্রিয়করণ অপেক্ষমাণ',
  },
  [SubscriptionStatusExtended.ACTIVE]: {
    en: 'Active',
    bn: 'সক্রিয়',
  },
  [SubscriptionStatusExtended.TRIAL]: {
    en: 'Trial',
    bn: 'ট্রায়াল',
  },
  [SubscriptionStatusExtended.EXPIRED]: {
    en: 'Expired',
    bn: 'মেয়াদ উত্তীর্ণ',
  },
  [SubscriptionStatusExtended.CANCELLED]: {
    en: 'Cancelled',
    bn: 'বাতিল',
  },
  [SubscriptionStatusExtended.SUSPENDED]: {
    en: 'Suspended',
    bn: 'স্থগিত',
  },
  [SubscriptionStatusExtended.ON_HOLD]: {
    en: 'On Hold',
    bn: 'হোল্ডে',
  },
  [SubscriptionStatusExtended.INCOMPLETE]: {
    en: 'Incomplete',
    bn: 'অসম্পূর্ণ',
  },
  [SubscriptionStatusExtended.FAILED]: {
    en: 'Failed',
    bn: 'ব্যর্থ',
  },
};

/**
 * সাবস্ক্রিপশন স্ট্যাটাস রঙ কোডসমূহ
 */
export const SubscriptionStatusExtendedColors: Record<SubscriptionStatusExtendedValue, string> = {
  [SubscriptionStatusExtended.PENDING_ACTIVATION]:
    'bg-yellow-100 text-yellow-800 border-yellow-300',
  [SubscriptionStatusExtended.ACTIVE]: 'bg-green-100 text-green-800 border-green-300',
  [SubscriptionStatusExtended.TRIAL]: 'bg-blue-100 text-blue-800 border-blue-300',
  [SubscriptionStatusExtended.EXPIRED]: 'bg-red-100 text-red-800 border-red-300',
  [SubscriptionStatusExtended.CANCELLED]: 'bg-gray-100 text-gray-800 border-gray-300',
  [SubscriptionStatusExtended.SUSPENDED]: 'bg-orange-100 text-orange-800 border-orange-300',
  [SubscriptionStatusExtended.ON_HOLD]: 'bg-purple-100 text-purple-800 border-purple-300',
  [SubscriptionStatusExtended.INCOMPLETE]: 'bg-pink-100 text-pink-800 border-pink-300',
  [SubscriptionStatusExtended.FAILED]: 'bg-red-200 text-red-900 border-red-400',
};

/**
 * সাবস্ক্রিপশন স্ট্যাটাস ট্রানজিশন রুলস
 */
export const SubscriptionStatusTransitions: Record<
  SubscriptionStatusExtendedValue,
  SubscriptionStatusExtendedValue[]
> = {
  [SubscriptionStatusExtended.PENDING_ACTIVATION]: [
    SubscriptionStatusExtended.ACTIVE,
    SubscriptionStatusExtended.TRIAL,
    SubscriptionStatusExtended.CANCELLED,
    SubscriptionStatusExtended.FAILED,
  ],
  [SubscriptionStatusExtended.ACTIVE]: [
    SubscriptionStatusExtended.EXPIRED,
    SubscriptionStatusExtended.CANCELLED,
    SubscriptionStatusExtended.SUSPENDED,
    SubscriptionStatusExtended.ON_HOLD,
  ],
  [SubscriptionStatusExtended.TRIAL]: [
    SubscriptionStatusExtended.ACTIVE,
    SubscriptionStatusExtended.EXPIRED,
    SubscriptionStatusExtended.CANCELLED,
    SubscriptionStatusExtended.SUSPENDED,
  ],
  [SubscriptionStatusExtended.EXPIRED]: [
    SubscriptionStatusExtended.ACTIVE,
    SubscriptionStatusExtended.CANCELLED,
  ],
  [SubscriptionStatusExtended.CANCELLED]: [SubscriptionStatusExtended.ACTIVE],
  [SubscriptionStatusExtended.SUSPENDED]: [
    SubscriptionStatusExtended.ACTIVE,
    SubscriptionStatusExtended.CANCELLED,
    SubscriptionStatusExtended.ON_HOLD,
  ],
  [SubscriptionStatusExtended.ON_HOLD]: [
    SubscriptionStatusExtended.ACTIVE,
    SubscriptionStatusExtended.CANCELLED,
  ],
  [SubscriptionStatusExtended.INCOMPLETE]: [
    SubscriptionStatusExtended.PENDING_ACTIVATION,
    SubscriptionStatusExtended.CANCELLED,
    SubscriptionStatusExtended.FAILED,
  ],
  [SubscriptionStatusExtended.FAILED]: [
    SubscriptionStatusExtended.PENDING_ACTIVATION,
    SubscriptionStatusExtended.CANCELLED,
  ],
};

/**
 * গ্রেস পিরিয়ড দিন
 */
export const SubscriptionGracePeriodDays = 3;

/**
 * অটো-রিনিউয়াল সক্ষম
 */
export const AutoRenewalEnabled = true;

/**
 * সাবস্ক্রিপশন রিনিউয়াল রিমাইন্ডার দিন
 */
export const SubscriptionRenewalReminderDays = [30, 15, 7, 3, 1] as const;

/**
 * সাবস্ক্রিপশন এক্সপায়ারি থ্রেশহোল্ড (দিন)
 */
export const SubscriptionExpiryThresholdDays = 5;

/**
 * সক্রিয় সাবস্ক্রিপশন স্ট্যাটাসসমূহ
 */
export const ACTIVE_SUBSCRIPTION_STATUSES: SubscriptionStatusExtendedValue[] = [
  SubscriptionStatusExtended.ACTIVE,
  SubscriptionStatusExtended.TRIAL,
] as const;

/**
 * নিষ্ক্রিয় সাবস্ক্রিপশন স্ট্যাটাসসমূহ
 */
export const INACTIVE_SUBSCRIPTION_STATUSES: SubscriptionStatusExtendedValue[] = [
  SubscriptionStatusExtended.EXPIRED,
  SubscriptionStatusExtended.CANCELLED,
  SubscriptionStatusExtended.SUSPENDED,
  SubscriptionStatusExtended.ON_HOLD,
] as const;

/**
 * সমস্যা সাবস্ক্রিপশন স্ট্যাটাসসমূহ
 */
export const PROBLEM_SUBSCRIPTION_STATUSES: SubscriptionStatusExtendedValue[] = [
  SubscriptionStatusExtended.FAILED,
  SubscriptionStatusExtended.INCOMPLETE,
  SubscriptionStatusExtended.SUSPENDED,
] as const;
