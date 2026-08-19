/**
 * ডেলিভারির বিভিন্ন স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * ডেলিভারি স্ট্যাটাস
 */
export const DELIVERY_STATUS = {
  SCHEDULED: 'scheduled',
  ASSIGNED: 'assigned',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  ARRIVED: 'arrived',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  FAILED: 'failed',
  RESCHEDULED: 'rescheduled',
  CANCELLED: 'cancelled',
} as const;

/**
 * ডেলিভারি স্ট্যাটাস টাইপ
 */
export type DeliveryStatus = (typeof DELIVERY_STATUS)[keyof typeof DELIVERY_STATUS];

/**
 * ডেলিভারি স্ট্যাটাসের বিবরণ
 */
export const DELIVERY_STATUS_DESCRIPTIONS: Record<DeliveryStatus, string> = {
  [DELIVERY_STATUS.SCHEDULED]: 'শিডিউলড - ডেলিভারি সময় নির্ধারণ করা হয়েছে',
  [DELIVERY_STATUS.ASSIGNED]: 'অ্যাসাইনড - ডেলিভারি ড্রাইভার নিয়োগ করা হয়েছে',
  [DELIVERY_STATUS.PICKED_UP]: 'পিকআপ করা হয়েছে - ডেলিভারি পিকআপ সম্পন্ন হয়েছে',
  [DELIVERY_STATUS.IN_TRANSIT]: 'ট্রানজিটে - ডেলিভারি পথে রয়েছে',
  [DELIVERY_STATUS.ARRIVED]: 'পৌঁছেছে - ডেলিভারি গন্তব্যে পৌঁছেছে',
  [DELIVERY_STATUS.OUT_FOR_DELIVERY]: 'ডেলিভারির জন্য বেরিয়েছে - ডেলিভারি চলমান',
  [DELIVERY_STATUS.DELIVERED]: 'ডেলিভারি হয়েছে - সফলভাবে ডেলিভারি সম্পন্ন',
  [DELIVERY_STATUS.FAILED]: 'ব্যর্থ - ডেলিভারি ব্যর্থ হয়েছে',
  [DELIVERY_STATUS.RESCHEDULED]: 'পুনঃশিডিউল - ডেলিভারি পুনঃনির্ধারণ করা হয়েছে',
  [DELIVERY_STATUS.CANCELLED]: 'বাতিল - ডেলিভারি বাতিল করা হয়েছে',
};

/**
 * ডেলিভারি স্ট্যাটাসের রং (UI এর জন্য)
 */
export const DELIVERY_STATUS_COLORS: Record<DeliveryStatus, string> = {
  [DELIVERY_STATUS.SCHEDULED]: '#3498DB', // নীল
  [DELIVERY_STATUS.ASSIGNED]: '#9B59B6', // বেগুনি
  [DELIVERY_STATUS.PICKED_UP]: '#2ECC71', // সবুজ
  [DELIVERY_STATUS.IN_TRANSIT]: '#F39C12', // কমলা
  [DELIVERY_STATUS.ARRIVED]: '#1ABC9C', // টিল
  [DELIVERY_STATUS.OUT_FOR_DELIVERY]: '#E67E22', // গাঢ় কমলা
  [DELIVERY_STATUS.DELIVERED]: '#27AE60', // গাঢ় সবুজ
  [DELIVERY_STATUS.FAILED]: '#E74C3C', // লাল
  [DELIVERY_STATUS.RESCHEDULED]: '#F1C40F', // সোনালী
  [DELIVERY_STATUS.CANCELLED]: '#95A5A6', // ধূসর
};

/**
 * ডেলিভারি স্ট্যাটাসের আইকন (UI এর জন্য)
 */
export const DELIVERY_STATUS_ICONS: Record<DeliveryStatus, string> = {
  [DELIVERY_STATUS.SCHEDULED]: 'calendar',
  [DELIVERY_STATUS.ASSIGNED]: 'user-check',
  [DELIVERY_STATUS.PICKED_UP]: 'package',
  [DELIVERY_STATUS.IN_TRANSIT]: 'truck',
  [DELIVERY_STATUS.ARRIVED]: 'map-pin',
  [DELIVERY_STATUS.OUT_FOR_DELIVERY]: 'delivery',
  [DELIVERY_STATUS.DELIVERED]: 'check-circle',
  [DELIVERY_STATUS.FAILED]: 'times-circle',
  [DELIVERY_STATUS.RESCHEDULED]: 'clock',
  [DELIVERY_STATUS.CANCELLED]: 'ban',
};

/**
 * ডেলিভারি স্ট্যাটাসের ক্রম (ওয়ার্কফ্লো)
 */
export const DELIVERY_STATUS_FLOW: readonly DeliveryStatus[] = [
  DELIVERY_STATUS.SCHEDULED,
  DELIVERY_STATUS.ASSIGNED,
  DELIVERY_STATUS.PICKED_UP,
  DELIVERY_STATUS.IN_TRANSIT,
  DELIVERY_STATUS.ARRIVED,
  DELIVERY_STATUS.OUT_FOR_DELIVERY,
  DELIVERY_STATUS.DELIVERED,
] as const;

/**
 * টার্মিনাল ডেলিভারি স্ট্যাটাস (শেষ অবস্থা)
 */
export const TERMINAL_DELIVERY_STATUSES: readonly DeliveryStatus[] = [
  DELIVERY_STATUS.DELIVERED,
  DELIVERY_STATUS.FAILED,
  DELIVERY_STATUS.CANCELLED,
] as const;

/**
 * অ্যাক্টিভ ডেলিভারি স্ট্যাটাস (চলমান)
 */
export const ACTIVE_DELIVERY_STATUSES: readonly DeliveryStatus[] = [
  DELIVERY_STATUS.SCHEDULED,
  DELIVERY_STATUS.ASSIGNED,
  DELIVERY_STATUS.PICKED_UP,
  DELIVERY_STATUS.IN_TRANSIT,
  DELIVERY_STATUS.ARRIVED,
  DELIVERY_STATUS.OUT_FOR_DELIVERY,
  DELIVERY_STATUS.RESCHEDULED,
] as const;

/**
 * সফল ডেলিভারি স্ট্যাটাস
 */
export const SUCCESS_DELIVERY_STATUSES: readonly DeliveryStatus[] = [
  DELIVERY_STATUS.DELIVERED,
] as const;

/**
 * ব্যর্থ ডেলিভারি স্ট্যাটাস
 */
export const FAILED_DELIVERY_STATUSES: readonly DeliveryStatus[] = [
  DELIVERY_STATUS.FAILED,
  DELIVERY_STATUS.CANCELLED,
] as const;

/**
 * ডেলিভারি স্ট্যাটাস গ্রুপ
 */
export const DELIVERY_STATUS_GROUPS = {
  ALL: Object.values(DELIVERY_STATUS),
  ACTIVE: ACTIVE_DELIVERY_STATUSES,
  TERMINAL: TERMINAL_DELIVERY_STATUSES,
  SUCCESS: SUCCESS_DELIVERY_STATUSES,
  FAILED: FAILED_DELIVERY_STATUSES,
} as const;

/**
 * ডেলিভারি স্ট্যাটাস গ্রুপ টাইপ
 */
export type DeliveryStatusGroup = typeof DELIVERY_STATUS_GROUPS;

/**
 * ডেলিভারি স্ট্যাটাস ট্রানজিশন (কোন স্ট্যাটাস থেকে কোন স্ট্যাটাসে যেতে পারে)
 */
export const DELIVERY_STATUS_TRANSITIONS: Record<DeliveryStatus, readonly DeliveryStatus[]> = {
  [DELIVERY_STATUS.SCHEDULED]: [
    DELIVERY_STATUS.ASSIGNED,
    DELIVERY_STATUS.RESCHEDULED,
    DELIVERY_STATUS.CANCELLED,
  ],
  [DELIVERY_STATUS.ASSIGNED]: [
    DELIVERY_STATUS.PICKED_UP,
    DELIVERY_STATUS.RESCHEDULED,
    DELIVERY_STATUS.CANCELLED,
  ],
  [DELIVERY_STATUS.PICKED_UP]: [
    DELIVERY_STATUS.IN_TRANSIT,
    DELIVERY_STATUS.FAILED,
    DELIVERY_STATUS.CANCELLED,
  ],
  [DELIVERY_STATUS.IN_TRANSIT]: [
    DELIVERY_STATUS.ARRIVED,
    DELIVERY_STATUS.FAILED,
    DELIVERY_STATUS.CANCELLED,
  ],
  [DELIVERY_STATUS.ARRIVED]: [
    DELIVERY_STATUS.OUT_FOR_DELIVERY,
    DELIVERY_STATUS.FAILED,
    DELIVERY_STATUS.CANCELLED,
  ],
  [DELIVERY_STATUS.OUT_FOR_DELIVERY]: [
    DELIVERY_STATUS.DELIVERED,
    DELIVERY_STATUS.FAILED,
    DELIVERY_STATUS.RESCHEDULED,
  ],
  [DELIVERY_STATUS.DELIVERED]: [],
  [DELIVERY_STATUS.FAILED]: [DELIVERY_STATUS.RESCHEDULED, DELIVERY_STATUS.CANCELLED],
  [DELIVERY_STATUS.RESCHEDULED]: [DELIVERY_STATUS.SCHEDULED, DELIVERY_STATUS.CANCELLED],
  [DELIVERY_STATUS.CANCELLED]: [],
};

/**
 * ডেলিভারি স্ট্যাটাস ট্রানজিশন টাইপ
 */
export type DeliveryStatusTransitions = typeof DELIVERY_STATUS_TRANSITIONS;

/**
 * ডেলিভারি স্ট্যাটাস কনফিগারেশন
 */
export const DELIVERY_STATUS_CONFIG = {
  STATUS: DELIVERY_STATUS,
  DESCRIPTIONS: DELIVERY_STATUS_DESCRIPTIONS,
  COLORS: DELIVERY_STATUS_COLORS,
  ICONS: DELIVERY_STATUS_ICONS,
  FLOW: DELIVERY_STATUS_FLOW,
  GROUPS: DELIVERY_STATUS_GROUPS,
  TRANSITIONS: DELIVERY_STATUS_TRANSITIONS,
  TERMINAL_STATUSES: TERMINAL_DELIVERY_STATUSES,
  ACTIVE_STATUSES: ACTIVE_DELIVERY_STATUSES,
  SUCCESS_STATUSES: SUCCESS_DELIVERY_STATUSES,
  FAILED_STATUSES: FAILED_DELIVERY_STATUSES,
} as const;

/**
 * ডেলিভারি স্ট্যাটাস কনফিগারেশন টাইপ
 */
export type DeliveryStatusConfig = typeof DELIVERY_STATUS_CONFIG;

/**
 * চেক করে যে একটি ডেলিভারি স্ট্যাটাস টার্মিনাল কিনা
 */
export function isDeliveryStatusTerminal(status: DeliveryStatus): boolean {
  return (TERMINAL_DELIVERY_STATUSES as readonly DeliveryStatus[]).includes(status);
}

/**
 * চেক করে যে একটি ডেলিভারি স্ট্যাটাস অ্যাক্টিভ কিনা
 */
export function isDeliveryStatusActive(status: DeliveryStatus): boolean {
  return (ACTIVE_DELIVERY_STATUSES as readonly DeliveryStatus[]).includes(status);
}

/**
 * চেক করে যে একটি ডেলিভারি স্ট্যাটাস সফল কিনা
 */
export function isDeliveryStatusSuccess(status: DeliveryStatus): boolean {
  return (SUCCESS_DELIVERY_STATUSES as readonly DeliveryStatus[]).includes(status);
}

/**
 * চেক করে যে একটি ডেলিভারি স্ট্যাটাস ব্যর্থ কিনা
 */
export function isDeliveryStatusFailed(status: DeliveryStatus): boolean {
  return (FAILED_DELIVERY_STATUSES as readonly DeliveryStatus[]).includes(status);
}

/**
 * দুটি ডেলিভারি স্ট্যাটাসের মধ্যে ট্রানজিশন সম্ভব কিনা চেক করে
 */
export function canDeliveryStatusTransition(from: DeliveryStatus, to: DeliveryStatus): boolean {
  const allowedTransitions = DELIVERY_STATUS_TRANSITIONS[from];
  return allowedTransitions.includes(to);
}

/**
 * একটি ডেলিভারি স্ট্যাটাস থেকে সম্ভাব্য পরবর্তী স্ট্যাটাসগুলোর তালিকা
 */
export function getNextDeliveryStatuses(status: DeliveryStatus): readonly DeliveryStatus[] {
  return DELIVERY_STATUS_TRANSITIONS[status] || [];
}

/**
 * ডেলিভারি স্ট্যাটাসের বিবরণ পাওয়া
 */
export function getDeliveryStatusDescription(status: DeliveryStatus): string {
  return DELIVERY_STATUS_DESCRIPTIONS[status];
}

/**
 * ডেলিভারি স্ট্যাটাসের রং পাওয়া
 */
export function getDeliveryStatusColor(status: DeliveryStatus): string {
  return DELIVERY_STATUS_COLORS[status];
}

/**
 * ডেলিভারি স্ট্যাটাসের আইকন পাওয়া
 */
export function getDeliveryStatusIcon(status: DeliveryStatus): string {
  return DELIVERY_STATUS_ICONS[status];
}
