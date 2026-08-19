/**
 * শিপমেন্টের প্রায়োরিটি লেভেল সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * শিপমেন্ট প্রায়োরিটি লেভেল
 */
export const SHIPMENT_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
  CRITICAL: 'critical',
} as const;

/**
 * শিপমেন্ট প্রায়োরিটি টাইপ
 */
export type ShipmentPriority = (typeof SHIPMENT_PRIORITY)[keyof typeof SHIPMENT_PRIORITY];

/**
 * প্রায়োরিটি লেভেলের বিবরণ
 */
export const PRIORITY_DESCRIPTIONS: Record<ShipmentPriority, string> = {
  [SHIPMENT_PRIORITY.LOW]: 'নিম্ন - সাধারণ গুরুত্ব, কোনো জরুরীতা নেই',
  [SHIPMENT_PRIORITY.MEDIUM]: 'মাঝারি - মাঝারি গুরুত্ব, সাধারণ সময়সীমা',
  [SHIPMENT_PRIORITY.HIGH]: 'উচ্চ - বেশি গুরুত্ব, দ্রুত প্রক্রিয়াকরণ প্রয়োজন',
  [SHIPMENT_PRIORITY.URGENT]: 'জরুরি - অত্যন্ত জরুরি, তাৎক্ষণিক মনোযোগ প্রয়োজন',
  [SHIPMENT_PRIORITY.CRITICAL]: 'অত্যন্ত জরুরি - সর্বোচ্চ গুরুত্ব, তাৎক্ষণিক পদক্ষেপ প্রয়োজন',
};

/**
 * প্রায়োরিটি লেভেলের রং (UI এর জন্য)
 */
export const PRIORITY_COLORS: Record<ShipmentPriority, string> = {
  [SHIPMENT_PRIORITY.LOW]: '#95A5A6', // ধূসর
  [SHIPMENT_PRIORITY.MEDIUM]: '#3498DB', // নীল
  [SHIPMENT_PRIORITY.HIGH]: '#F39C12', // কমলা
  [SHIPMENT_PRIORITY.URGENT]: '#E67E22', // গাঢ় কমলা
  [SHIPMENT_PRIORITY.CRITICAL]: '#E74C3C', // লাল
};

/**
 * প্রায়োরিটি লেভেলের আইকন (UI এর জন্য)
 */
export const PRIORITY_ICONS: Record<ShipmentPriority, string> = {
  [SHIPMENT_PRIORITY.LOW]: 'arrow-down',
  [SHIPMENT_PRIORITY.MEDIUM]: 'minus',
  [SHIPMENT_PRIORITY.HIGH]: 'arrow-up',
  [SHIPMENT_PRIORITY.URGENT]: 'exclamation',
  [SHIPMENT_PRIORITY.CRITICAL]: 'exclamation-triangle',
};

/**
 * প্রায়োরিটি লেভেলের সংখ্যাসূচক মান (সাজানোর জন্য)
 */
export const PRIORITY_WEIGHTS: Record<ShipmentPriority, number> = {
  [SHIPMENT_PRIORITY.LOW]: 1,
  [SHIPMENT_PRIORITY.MEDIUM]: 2,
  [SHIPMENT_PRIORITY.HIGH]: 3,
  [SHIPMENT_PRIORITY.URGENT]: 4,
  [SHIPMENT_PRIORITY.CRITICAL]: 5,
};

/**
 * প্রায়োরিটি লেভেলের ডেলিভারি সময় (ঘন্টায়)
 */
export const PRIORITY_DELIVERY_HOURS: Record<ShipmentPriority, number> = {
  [SHIPMENT_PRIORITY.LOW]: 72,
  [SHIPMENT_PRIORITY.MEDIUM]: 48,
  [SHIPMENT_PRIORITY.HIGH]: 24,
  [SHIPMENT_PRIORITY.URGENT]: 12,
  [SHIPMENT_PRIORITY.CRITICAL]: 6,
};

/**
 * প্রায়োরিটি লেভেলের অতিরিক্ত চার্জ (শতাংশ)
 */
export const PRIORITY_EXTRA_CHARGE_PERCENT: Record<ShipmentPriority, number> = {
  [SHIPMENT_PRIORITY.LOW]: 0,
  [SHIPMENT_PRIORITY.MEDIUM]: 5,
  [SHIPMENT_PRIORITY.HIGH]: 15,
  [SHIPMENT_PRIORITY.URGENT]: 30,
  [SHIPMENT_PRIORITY.CRITICAL]: 50,
};

/**
 * প্রায়োরিটি লেভেলের প্রয়োজনীয় অ্যাপ্রুভাল
 */
export const PRIORITY_REQUIRES_APPROVAL: Record<ShipmentPriority, boolean> = {
  [SHIPMENT_PRIORITY.LOW]: false,
  [SHIPMENT_PRIORITY.MEDIUM]: false,
  [SHIPMENT_PRIORITY.HIGH]: true,
  [SHIPMENT_PRIORITY.URGENT]: true,
  [SHIPMENT_PRIORITY.CRITICAL]: true,
};

/**
 * প্রায়োরিটি লেভেলের এসএলএ (সার্ভিস লেভেল এগ্রিমেন্ট)
 */
export const PRIORITY_SLA: Record<ShipmentPriority, string> = {
  [SHIPMENT_PRIORITY.LOW]: '৭২ ঘন্টার মধ্যে প্রক্রিয়াকরণ',
  [SHIPMENT_PRIORITY.MEDIUM]: '৪৮ ঘন্টার মধ্যে প্রক্রিয়াকরণ',
  [SHIPMENT_PRIORITY.HIGH]: '২৪ ঘন্টার মধ্যে প্রক্রিয়াকরণ',
  [SHIPMENT_PRIORITY.URGENT]: '১২ ঘন্টার মধ্যে প্রক্রিয়াকরণ',
  [SHIPMENT_PRIORITY.CRITICAL]: '৬ ঘন্টার মধ্যে প্রক্রিয়াকরণ',
};

/**
 * প্রায়োরিটি লেভেলের নোটিফিকেশন সেটিংস
 */
export const PRIORITY_NOTIFICATIONS: Record<
  ShipmentPriority,
  {
    email: boolean;
    sms: boolean;
    push: boolean;
    frequency: 'instant' | 'hourly' | 'daily';
  }
> = {
  [SHIPMENT_PRIORITY.LOW]: {
    email: true,
    sms: false,
    push: false,
    frequency: 'daily',
  },
  [SHIPMENT_PRIORITY.MEDIUM]: {
    email: true,
    sms: true,
    push: false,
    frequency: 'hourly',
  },
  [SHIPMENT_PRIORITY.HIGH]: {
    email: true,
    sms: true,
    push: true,
    frequency: 'hourly',
  },
  [SHIPMENT_PRIORITY.URGENT]: {
    email: true,
    sms: true,
    push: true,
    frequency: 'instant',
  },
  [SHIPMENT_PRIORITY.CRITICAL]: {
    email: true,
    sms: true,
    push: true,
    frequency: 'instant',
  },
};

/**
 * প্রায়োরিটি লেভেল গ্রুপ
 */
export const PRIORITY_GROUPS = {
  ALL: Object.values(SHIPMENT_PRIORITY),
  STANDARD: [SHIPMENT_PRIORITY.LOW, SHIPMENT_PRIORITY.MEDIUM] as ShipmentPriority[],
  HIGH_PRIORITY: [
    SHIPMENT_PRIORITY.HIGH,
    SHIPMENT_PRIORITY.URGENT,
    SHIPMENT_PRIORITY.CRITICAL,
  ] as ShipmentPriority[],
  URGENT_PRIORITY: [SHIPMENT_PRIORITY.URGENT, SHIPMENT_PRIORITY.CRITICAL] as ShipmentPriority[],
} as const;

/**
 * প্রায়োরিটি লেভেল গ্রুপ টাইপ
 */
export type PriorityGroup = typeof PRIORITY_GROUPS;

/**
 * চেক করে যে একটি প্রায়োরিটি স্ট্যান্ডার্ড কিনা
 */
export function isStandardPriority(priority: ShipmentPriority): boolean {
  return (PRIORITY_GROUPS.STANDARD as readonly ShipmentPriority[]).includes(priority);
}

/**
 * চেক করে যে একটি প্রায়োরিটি উচ্চ কিনা
 */
export function isHighPriority(priority: ShipmentPriority): boolean {
  return (PRIORITY_GROUPS.HIGH_PRIORITY as readonly ShipmentPriority[]).includes(priority);
}

/**
 * চেক করে যে একটি প্রায়োরিটি জরুরি কিনা
 */
export function isUrgentPriority(priority: ShipmentPriority): boolean {
  return (PRIORITY_GROUPS.URGENT_PRIORITY as readonly ShipmentPriority[]).includes(priority);
}

/**
 * প্রায়োরিটি অনুযায়ী ডেলিভারি সময় পাওয়া
 */
export function getPriorityDeliveryHours(priority: ShipmentPriority): number {
  return PRIORITY_DELIVERY_HOURS[priority];
}

/**
 * প্রায়োরিটি অনুযায়ী অতিরিক্ত চার্জ পাওয়া
 */
export function getPriorityExtraCharge(priority: ShipmentPriority): number {
  return PRIORITY_EXTRA_CHARGE_PERCENT[priority];
}

/**
 * প্রায়োরিটি অনুযায়ী ওজন মান পাওয়া
 */
export function getPriorityWeight(priority: ShipmentPriority): number {
  return PRIORITY_WEIGHTS[priority];
}

/**
 * দুটি প্রায়োরিটি তুলনা করা
 */
export function comparePriority(a: ShipmentPriority, b: ShipmentPriority): number {
  return PRIORITY_WEIGHTS[a] - PRIORITY_WEIGHTS[b];
}

/**
 * প্রায়োরিটি কনফিগারেশন
 */
export const SHIPMENT_PRIORITY_CONFIG = {
  PRIORITIES: SHIPMENT_PRIORITY,
  DESCRIPTIONS: PRIORITY_DESCRIPTIONS,
  COLORS: PRIORITY_COLORS,
  ICONS: PRIORITY_ICONS,
  WEIGHTS: PRIORITY_WEIGHTS,
  DELIVERY_HOURS: PRIORITY_DELIVERY_HOURS,
  EXTRA_CHARGE_PERCENT: PRIORITY_EXTRA_CHARGE_PERCENT,
  REQUIRES_APPROVAL: PRIORITY_REQUIRES_APPROVAL,
  SLA: PRIORITY_SLA,
  NOTIFICATIONS: PRIORITY_NOTIFICATIONS,
  GROUPS: PRIORITY_GROUPS,
} as const;

/**
 * প্রায়োরিটি কনফিগারেশন টাইপ
 */
export type ShipmentPriorityConfig = typeof SHIPMENT_PRIORITY_CONFIG;
