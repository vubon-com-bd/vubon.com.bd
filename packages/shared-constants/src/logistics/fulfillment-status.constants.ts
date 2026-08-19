/**
 * ফুলফিলমেন্টের বিভিন্ন স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * ফুলফিলমেন্ট স্ট্যাটাস
 */
export const FULFILLMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  PICKING: 'picking',
  PACKING: 'packing',
  READY_TO_SHIP: 'ready_to_ship',
  SHIPPED: 'shipped',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

/**
 * ফুলফিলমেন্ট স্ট্যাটাস টাইপ
 */
export type FulfillmentStatus = (typeof FULFILLMENT_STATUS)[keyof typeof FULFILLMENT_STATUS];

/**
 * ফুলফিলমেন্ট স্ট্যাটাসের বিবরণ
 */
export const FULFILLMENT_STATUS_DESCRIPTIONS: Record<FulfillmentStatus, string> = {
  [FULFILLMENT_STATUS.PENDING]: 'পেন্ডিং - ফুলফিলমেন্ট শুরু হয়নি',
  [FULFILLMENT_STATUS.PROCESSING]: 'প্রসেসিং - ফুলফিলমেন্ট প্রক্রিয়াকরণ চলছে',
  [FULFILLMENT_STATUS.PICKING]: 'পিকিং - আইটেম সংগ্রহ করা হচ্ছে',
  [FULFILLMENT_STATUS.PACKING]: 'প্যাকিং - আইটেম প্যাকেজ করা হচ্ছে',
  [FULFILLMENT_STATUS.READY_TO_SHIP]: 'শিপের জন্য প্রস্তুত - প্যাকেজ পাঠানোর জন্য প্রস্তুত',
  [FULFILLMENT_STATUS.SHIPPED]: 'শিপড - প্যাকেজ পাঠানো হয়েছে',
  [FULFILLMENT_STATUS.COMPLETED]: 'সম্পন্ন - ফুলফিলমেন্ট সম্পূর্ণ হয়েছে',
  [FULFILLMENT_STATUS.FAILED]: 'ব্যর্থ - ফুলফিলমেন্ট ব্যর্থ হয়েছে',
  [FULFILLMENT_STATUS.CANCELLED]: 'বাতিল - ফুলফিলমেন্ট বাতিল করা হয়েছে',
};

/**
 * ফুলফিলমেন্ট স্ট্যাটাসের রং (UI এর জন্য)
 */
export const FULFILLMENT_STATUS_COLORS: Record<FulfillmentStatus, string> = {
  [FULFILLMENT_STATUS.PENDING]: '#3498DB', // নীল
  [FULFILLMENT_STATUS.PROCESSING]: '#9B59B6', // বেগুনি
  [FULFILLMENT_STATUS.PICKING]: '#F39C12', // কমলা
  [FULFILLMENT_STATUS.PACKING]: '#E67E22', // গাঢ় কমলা
  [FULFILLMENT_STATUS.READY_TO_SHIP]: '#1ABC9C', // টিল
  [FULFILLMENT_STATUS.SHIPPED]: '#2ECC71', // সবুজ
  [FULFILLMENT_STATUS.COMPLETED]: '#27AE60', // গাঢ় সবুজ
  [FULFILLMENT_STATUS.FAILED]: '#E74C3C', // লাল
  [FULFILLMENT_STATUS.CANCELLED]: '#95A5A6', // ধূসর
};

/**
 * ফুলফিলমেন্ট স্ট্যাটাসের আইকন (UI এর জন্য)
 */
export const FULFILLMENT_STATUS_ICONS: Record<FulfillmentStatus, string> = {
  [FULFILLMENT_STATUS.PENDING]: 'clock',
  [FULFILLMENT_STATUS.PROCESSING]: 'spinner',
  [FULFILLMENT_STATUS.PICKING]: 'shopping-cart',
  [FULFILLMENT_STATUS.PACKING]: 'box',
  [FULFILLMENT_STATUS.READY_TO_SHIP]: 'check-circle',
  [FULFILLMENT_STATUS.SHIPPED]: 'rocket',
  [FULFILLMENT_STATUS.COMPLETED]: 'check',
  [FULFILLMENT_STATUS.FAILED]: 'times-circle',
  [FULFILLMENT_STATUS.CANCELLED]: 'ban',
};

/**
 * ফুলফিলমেন্ট স্ট্যাটাসের ক্রম (ওয়ার্কফ্লো)
 */
export const FULFILLMENT_STATUS_FLOW: readonly FulfillmentStatus[] = [
  FULFILLMENT_STATUS.PENDING,
  FULFILLMENT_STATUS.PROCESSING,
  FULFILLMENT_STATUS.PICKING,
  FULFILLMENT_STATUS.PACKING,
  FULFILLMENT_STATUS.READY_TO_SHIP,
  FULFILLMENT_STATUS.SHIPPED,
  FULFILLMENT_STATUS.COMPLETED,
] as const;

/**
 * টার্মিনাল ফুলফিলমেন্ট স্ট্যাটাস
 */
export const TERMINAL_FULFILLMENT_STATUSES: readonly FulfillmentStatus[] = [
  FULFILLMENT_STATUS.COMPLETED,
  FULFILLMENT_STATUS.FAILED,
  FULFILLMENT_STATUS.CANCELLED,
] as const;

/**
 * অ্যাক্টিভ ফুলফিলমেন্ট স্ট্যাটাস
 */
export const ACTIVE_FULFILLMENT_STATUSES: readonly FulfillmentStatus[] = [
  FULFILLMENT_STATUS.PENDING,
  FULFILLMENT_STATUS.PROCESSING,
  FULFILLMENT_STATUS.PICKING,
  FULFILLMENT_STATUS.PACKING,
  FULFILLMENT_STATUS.READY_TO_SHIP,
  FULFILLMENT_STATUS.SHIPPED,
] as const;

/**
 * সফল ফুলফিলমেন্ট স্ট্যাটাস
 */
export const SUCCESS_FULFILLMENT_STATUSES: readonly FulfillmentStatus[] = [
  FULFILLMENT_STATUS.COMPLETED,
] as const;

/**
 * ব্যর্থ ফুলফিলমেন্ট স্ট্যাটাস
 */
export const FAILED_FULFILLMENT_STATUSES: readonly FulfillmentStatus[] = [
  FULFILLMENT_STATUS.FAILED,
  FULFILLMENT_STATUS.CANCELLED,
] as const;

/**
 * ফুলফিলমেন্ট স্ট্যাটাস গ্রুপ
 */
export const FULFILLMENT_STATUS_GROUPS = {
  ALL: Object.values(FULFILLMENT_STATUS),
  ACTIVE: ACTIVE_FULFILLMENT_STATUSES,
  TERMINAL: TERMINAL_FULFILLMENT_STATUSES,
  SUCCESS: SUCCESS_FULFILLMENT_STATUSES,
  FAILED: FAILED_FULFILLMENT_STATUSES,
} as const;

/**
 * ফুলফিলমেন্ট স্ট্যাটাস গ্রুপ টাইপ
 */
export type FulfillmentStatusGroup = typeof FULFILLMENT_STATUS_GROUPS;

/**
 * ফুলফিলমেন্ট স্ট্যাটাস ট্রানজিশন
 */
export const FULFILLMENT_STATUS_TRANSITIONS: Record<
  FulfillmentStatus,
  readonly FulfillmentStatus[]
> = {
  [FULFILLMENT_STATUS.PENDING]: [FULFILLMENT_STATUS.PROCESSING, FULFILLMENT_STATUS.CANCELLED],
  [FULFILLMENT_STATUS.PROCESSING]: [
    FULFILLMENT_STATUS.PICKING,
    FULFILLMENT_STATUS.FAILED,
    FULFILLMENT_STATUS.CANCELLED,
  ],
  [FULFILLMENT_STATUS.PICKING]: [
    FULFILLMENT_STATUS.PACKING,
    FULFILLMENT_STATUS.FAILED,
    FULFILLMENT_STATUS.CANCELLED,
  ],
  [FULFILLMENT_STATUS.PACKING]: [
    FULFILLMENT_STATUS.READY_TO_SHIP,
    FULFILLMENT_STATUS.FAILED,
    FULFILLMENT_STATUS.CANCELLED,
  ],
  [FULFILLMENT_STATUS.READY_TO_SHIP]: [
    FULFILLMENT_STATUS.SHIPPED,
    FULFILLMENT_STATUS.FAILED,
    FULFILLMENT_STATUS.CANCELLED,
  ],
  [FULFILLMENT_STATUS.SHIPPED]: [FULFILLMENT_STATUS.COMPLETED, FULFILLMENT_STATUS.FAILED],
  [FULFILLMENT_STATUS.COMPLETED]: [],
  [FULFILLMENT_STATUS.FAILED]: [FULFILLMENT_STATUS.PROCESSING, FULFILLMENT_STATUS.CANCELLED],
  [FULFILLMENT_STATUS.CANCELLED]: [],
};

/**
 * ফুলফিলমেন্ট স্ট্যাটাস ট্রানজিশন টাইপ
 */
export type FulfillmentStatusTransitions = typeof FULFILLMENT_STATUS_TRANSITIONS;

/**
 * ফুলফিলমেন্ট স্ট্যাটাস কনফিগারেশন
 */
export const FULFILLMENT_STATUS_CONFIG = {
  STATUS: FULFILLMENT_STATUS,
  DESCRIPTIONS: FULFILLMENT_STATUS_DESCRIPTIONS,
  COLORS: FULFILLMENT_STATUS_COLORS,
  ICONS: FULFILLMENT_STATUS_ICONS,
  FLOW: FULFILLMENT_STATUS_FLOW,
  GROUPS: FULFILLMENT_STATUS_GROUPS,
  TRANSITIONS: FULFILLMENT_STATUS_TRANSITIONS,
  TERMINAL_STATUSES: TERMINAL_FULFILLMENT_STATUSES,
  ACTIVE_STATUSES: ACTIVE_FULFILLMENT_STATUSES,
  SUCCESS_STATUSES: SUCCESS_FULFILLMENT_STATUSES,
  FAILED_STATUSES: FAILED_FULFILLMENT_STATUSES,
} as const;

/**
 * ফুলফিলমেন্ট স্ট্যাটাস কনফিগারেশন টাইপ
 */
export type FulfillmentStatusConfig = typeof FULFILLMENT_STATUS_CONFIG;

/**
 * চেক করে যে ফুলফিলমেন্ট স্ট্যাটাস টার্মিনাল কিনা
 */
export function isFulfillmentStatusTerminal(status: FulfillmentStatus): boolean {
  return (TERMINAL_FULFILLMENT_STATUSES as readonly FulfillmentStatus[]).includes(status);
}

/**
 * চেক করে যে ফুলফিলমেন্ট স্ট্যাটাস অ্যাক্টিভ কিনা
 */
export function isFulfillmentStatusActive(status: FulfillmentStatus): boolean {
  return (ACTIVE_FULFILLMENT_STATUSES as readonly FulfillmentStatus[]).includes(status);
}

/**
 * চেক করে যে ফুলফিলমেন্ট স্ট্যাটাস সফল কিনা
 */
export function isFulfillmentStatusSuccess(status: FulfillmentStatus): boolean {
  return (SUCCESS_FULFILLMENT_STATUSES as readonly FulfillmentStatus[]).includes(status);
}

/**
 * চেক করে যে ফুলফিলমেন্ট স্ট্যাটাস ব্যর্থ কিনা
 */
export function isFulfillmentStatusFailed(status: FulfillmentStatus): boolean {
  return (FAILED_FULFILLMENT_STATUSES as readonly FulfillmentStatus[]).includes(status);
}

/**
 * দুটি ফুলফিলমেন্ট স্ট্যাটাসের মধ্যে ট্রানজিশন সম্ভব কিনা চেক করে
 */
export function canFulfillmentStatusTransition(
  from: FulfillmentStatus,
  to: FulfillmentStatus
): boolean {
  const allowedTransitions = FULFILLMENT_STATUS_TRANSITIONS[from];
  return allowedTransitions.includes(to);
}

/**
 * ফুলফিলমেন্ট স্ট্যাটাসের বিবরণ পাওয়া
 */
export function getFulfillmentStatusDescription(status: FulfillmentStatus): string {
  return FULFILLMENT_STATUS_DESCRIPTIONS[status];
}

/**
 * ফুলফিলমেন্ট স্ট্যাটাসের রং পাওয়া
 */
export function getFulfillmentStatusColor(status: FulfillmentStatus): string {
  return FULFILLMENT_STATUS_COLORS[status];
}

/**
 * ফুলফিলমেন্ট স্ট্যাটাসের আইকন পাওয়া
 */
export function getFulfillmentStatusIcon(status: FulfillmentStatus): string {
  return FULFILLMENT_STATUS_ICONS[status];
}
