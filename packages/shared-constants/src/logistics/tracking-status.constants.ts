/**
 * ট্র্যাকিং স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * ট্র্যাকিং স্ট্যাটাস
 */
export const TRACKING_STATUS = {
  ORDER_PLACED: 'order_placed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  IN_TRANSIT: 'in_transit',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  EXCEPTION: 'exception',
  RETURNED: 'returned',
} as const;

/**
 * ট্র্যাকিং স্ট্যাটাস টাইপ
 */
export type TrackingStatus = (typeof TRACKING_STATUS)[keyof typeof TRACKING_STATUS];

/**
 * ট্র্যাকিং স্ট্যাটাসের বিবরণ
 */
export const TRACKING_STATUS_DESCRIPTIONS: Record<TrackingStatus, string> = {
  [TRACKING_STATUS.ORDER_PLACED]: 'অর্ডার প্লেসড - অর্ডার তৈরি করা হয়েছে',
  [TRACKING_STATUS.PROCESSING]: 'প্রসেসিং - অর্ডার প্রক্রিয়াকরণ হচ্ছে',
  [TRACKING_STATUS.SHIPPED]: 'শিপড - অর্ডার পাঠানো হয়েছে',
  [TRACKING_STATUS.IN_TRANSIT]: 'ট্রানজিটে - অর্ডার পথে রয়েছে',
  [TRACKING_STATUS.OUT_FOR_DELIVERY]: 'ডেলিভারির জন্য বেরিয়েছে - ডেলিভারি চলমান',
  [TRACKING_STATUS.DELIVERED]: 'ডেলিভারি হয়েছে - সফলভাবে ডেলিভারি সম্পন্ন',
  [TRACKING_STATUS.EXCEPTION]: 'এক্সেপশন - সমস্যা হয়েছে',
  [TRACKING_STATUS.RETURNED]: 'রিটার্নড - ফেরত পাঠানো হয়েছে',
};

/**
 * ট্র্যাকিং স্ট্যাটাসের রং (UI এর জন্য)
 */
export const TRACKING_STATUS_COLORS: Record<TrackingStatus, string> = {
  [TRACKING_STATUS.ORDER_PLACED]: '#3498DB', // নীল
  [TRACKING_STATUS.PROCESSING]: '#9B59B6', // বেগুনি
  [TRACKING_STATUS.SHIPPED]: '#2ECC71', // সবুজ
  [TRACKING_STATUS.IN_TRANSIT]: '#F39C12', // কমলা
  [TRACKING_STATUS.OUT_FOR_DELIVERY]: '#E67E22', // গাঢ় কমলা
  [TRACKING_STATUS.DELIVERED]: '#27AE60', // গাঢ় সবুজ
  [TRACKING_STATUS.EXCEPTION]: '#E74C3C', // লাল
  [TRACKING_STATUS.RETURNED]: '#95A5A6', // ধূসর
};

/**
 * ট্র্যাকিং স্ট্যাটাসের আইকন (UI এর জন্য)
 */
export const TRACKING_STATUS_ICONS: Record<TrackingStatus, string> = {
  [TRACKING_STATUS.ORDER_PLACED]: 'shopping-cart',
  [TRACKING_STATUS.PROCESSING]: 'spinner',
  [TRACKING_STATUS.SHIPPED]: 'rocket',
  [TRACKING_STATUS.IN_TRANSIT]: 'truck',
  [TRACKING_STATUS.OUT_FOR_DELIVERY]: 'delivery',
  [TRACKING_STATUS.DELIVERED]: 'check-circle',
  [TRACKING_STATUS.EXCEPTION]: 'exclamation-triangle',
  [TRACKING_STATUS.RETURNED]: 'undo',
};

/**
 * ট্র্যাকিং স্ট্যাটাসের ক্রম (ওয়ার্কফ্লো)
 */
export const TRACKING_STATUS_FLOW: readonly TrackingStatus[] = [
  TRACKING_STATUS.ORDER_PLACED,
  TRACKING_STATUS.PROCESSING,
  TRACKING_STATUS.SHIPPED,
  TRACKING_STATUS.IN_TRANSIT,
  TRACKING_STATUS.OUT_FOR_DELIVERY,
  TRACKING_STATUS.DELIVERED,
] as const;

/**
 * টার্মিনাল ট্র্যাকিং স্ট্যাটাস
 */
export const TERMINAL_TRACKING_STATUSES: readonly TrackingStatus[] = [
  TRACKING_STATUS.DELIVERED,
  TRACKING_STATUS.EXCEPTION,
  TRACKING_STATUS.RETURNED,
] as const;

/**
 * অ্যাক্টিভ ট্র্যাকিং স্ট্যাটাস
 */
export const ACTIVE_TRACKING_STATUSES: readonly TrackingStatus[] = [
  TRACKING_STATUS.ORDER_PLACED,
  TRACKING_STATUS.PROCESSING,
  TRACKING_STATUS.SHIPPED,
  TRACKING_STATUS.IN_TRANSIT,
  TRACKING_STATUS.OUT_FOR_DELIVERY,
] as const;

/**
 * সফল ট্র্যাকিং স্ট্যাটাস
 */
export const SUCCESS_TRACKING_STATUSES: readonly TrackingStatus[] = [
  TRACKING_STATUS.DELIVERED,
] as const;

/**
 * ব্যর্থ ট্র্যাকিং স্ট্যাটাস
 */
export const FAILED_TRACKING_STATUSES: readonly TrackingStatus[] = [
  TRACKING_STATUS.EXCEPTION,
  TRACKING_STATUS.RETURNED,
] as const;

/**
 * ট্র্যাকিং স্ট্যাটাস গ্রুপ
 */
export const TRACKING_STATUS_GROUPS = {
  ALL: Object.values(TRACKING_STATUS),
  ACTIVE: ACTIVE_TRACKING_STATUSES,
  TERMINAL: TERMINAL_TRACKING_STATUSES,
  SUCCESS: SUCCESS_TRACKING_STATUSES,
  FAILED: FAILED_TRACKING_STATUSES,
} as const;

/**
 * ট্র্যাকিং স্ট্যাটাস গ্রুপ টাইপ
 */
export type TrackingStatusGroup = typeof TRACKING_STATUS_GROUPS;

/**
 * ট্র্যাকিং স্ট্যাটাস ট্রানজিশন
 */
export const TRACKING_STATUS_TRANSITIONS: Record<TrackingStatus, readonly TrackingStatus[]> = {
  [TRACKING_STATUS.ORDER_PLACED]: [TRACKING_STATUS.PROCESSING, TRACKING_STATUS.EXCEPTION],
  [TRACKING_STATUS.PROCESSING]: [TRACKING_STATUS.SHIPPED, TRACKING_STATUS.EXCEPTION],
  [TRACKING_STATUS.SHIPPED]: [
    TRACKING_STATUS.IN_TRANSIT,
    TRACKING_STATUS.EXCEPTION,
    TRACKING_STATUS.RETURNED,
  ],
  [TRACKING_STATUS.IN_TRANSIT]: [
    TRACKING_STATUS.OUT_FOR_DELIVERY,
    TRACKING_STATUS.EXCEPTION,
    TRACKING_STATUS.RETURNED,
  ],
  [TRACKING_STATUS.OUT_FOR_DELIVERY]: [
    TRACKING_STATUS.DELIVERED,
    TRACKING_STATUS.EXCEPTION,
    TRACKING_STATUS.RETURNED,
  ],
  [TRACKING_STATUS.DELIVERED]: [],
  [TRACKING_STATUS.EXCEPTION]: [TRACKING_STATUS.PROCESSING, TRACKING_STATUS.RETURNED],
  [TRACKING_STATUS.RETURNED]: [TRACKING_STATUS.PROCESSING],
};

/**
 * ট্র্যাকিং স্ট্যাটাস ট্রানজিশন টাইপ
 */
export type TrackingStatusTransitions = typeof TRACKING_STATUS_TRANSITIONS;

/**
 * ট্র্যাকিং স্ট্যাটাস কনফিগারেশন
 */
export const TRACKING_STATUS_CONFIG = {
  STATUS: TRACKING_STATUS,
  DESCRIPTIONS: TRACKING_STATUS_DESCRIPTIONS,
  COLORS: TRACKING_STATUS_COLORS,
  ICONS: TRACKING_STATUS_ICONS,
  FLOW: TRACKING_STATUS_FLOW,
  GROUPS: TRACKING_STATUS_GROUPS,
  TRANSITIONS: TRACKING_STATUS_TRANSITIONS,
  TERMINAL_STATUSES: TERMINAL_TRACKING_STATUSES,
  ACTIVE_STATUSES: ACTIVE_TRACKING_STATUSES,
  SUCCESS_STATUSES: SUCCESS_TRACKING_STATUSES,
  FAILED_STATUSES: FAILED_TRACKING_STATUSES,
} as const;

/**
 * ট্র্যাকিং স্ট্যাটাস কনফিগারেশন টাইপ
 */
export type TrackingStatusConfig = typeof TRACKING_STATUS_CONFIG;

/**
 * চেক করে যে ট্র্যাকিং স্ট্যাটাস টার্মিনাল কিনা
 */
export function isTrackingStatusTerminal(status: TrackingStatus): boolean {
  return (TERMINAL_TRACKING_STATUSES as readonly TrackingStatus[]).includes(status);
}

/**
 * চেক করে যে ট্র্যাকিং স্ট্যাটাস অ্যাক্টিভ কিনা
 */
export function isTrackingStatusActive(status: TrackingStatus): boolean {
  return (ACTIVE_TRACKING_STATUSES as readonly TrackingStatus[]).includes(status);
}

/**
 * চেক করে যে ট্র্যাকিং স্ট্যাটাস সফল কিনা
 */
export function isTrackingStatusSuccess(status: TrackingStatus): boolean {
  return (SUCCESS_TRACKING_STATUSES as readonly TrackingStatus[]).includes(status);
}

/**
 * চেক করে যে ট্র্যাকিং স্ট্যাটাস ব্যর্থ কিনা
 */
export function isTrackingStatusFailed(status: TrackingStatus): boolean {
  return (FAILED_TRACKING_STATUSES as readonly TrackingStatus[]).includes(status);
}

/**
 * দুটি ট্র্যাকিং স্ট্যাটাসের মধ্যে ট্রানজিশন সম্ভব কিনা চেক করে
 */
export function canTrackingStatusTransition(from: TrackingStatus, to: TrackingStatus): boolean {
  const allowedTransitions = TRACKING_STATUS_TRANSITIONS[from];
  return allowedTransitions.includes(to);
}

/**
 * ট্র্যাকিং স্ট্যাটাসের বিবরণ পাওয়া
 */
export function getTrackingStatusDescription(status: TrackingStatus): string {
  return TRACKING_STATUS_DESCRIPTIONS[status];
}

/**
 * ট্র্যাকিং স্ট্যাটাসের রং পাওয়া
 */
export function getTrackingStatusColor(status: TrackingStatus): string {
  return TRACKING_STATUS_COLORS[status];
}

/**
 * ট্র্যাকিং স্ট্যাটাসের আইকন পাওয়া
 */
export function getTrackingStatusIcon(status: TrackingStatus): string {
  return TRACKING_STATUS_ICONS[status];
}
