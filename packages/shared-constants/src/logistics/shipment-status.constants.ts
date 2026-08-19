/**
 * শিপমেন্টের বিভিন্ন স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * শিপমেন্ট স্ট্যাটাস
 */
export const SHIPMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  PACKED: 'packed',
  SHIPPED: 'shipped',
  IN_TRANSIT: 'in_transit',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  FAILED: 'failed',
  RETURNED: 'returned',
  CANCELLED: 'cancelled',
  ON_HOLD: 'on_hold',
} as const;

/**
 * শিপমেন্ট স্ট্যাটাস টাইপ
 */
export type ShipmentStatus = (typeof SHIPMENT_STATUS)[keyof typeof SHIPMENT_STATUS];

/**
 * শিপমেন্ট স্ট্যাটাসের বিবরণ
 */
export const SHIPMENT_STATUS_DESCRIPTIONS: Record<ShipmentStatus, string> = {
  [SHIPMENT_STATUS.PENDING]: 'অপেক্ষমাণ - শিপমেন্ট তৈরি করা হয়েছে কিন্তু প্রক্রিয়াকরণ শুরু হয়নি',
  [SHIPMENT_STATUS.PROCESSING]: 'প্রক্রিয়াকরণ - শিপমেন্ট প্রক্রিয়াকরণ করা হচ্ছে',
  [SHIPMENT_STATUS.PACKED]: 'প্যাকড - শিপমেন্ট প্যাক করা হয়েছে এবং পাঠানোর জন্য প্রস্তুত',
  [SHIPMENT_STATUS.SHIPPED]: 'শিপড - শিপমেন্ট পাঠানো হয়েছে',
  [SHIPMENT_STATUS.IN_TRANSIT]: 'ট্রানজিটে - শিপমেন্ট পরিবহনের পথে রয়েছে',
  [SHIPMENT_STATUS.OUT_FOR_DELIVERY]:
    'ডেলিভারির জন্য বেরিয়েছে - শিপমেন্ট ডেলিভারির জন্য বের হয়েছে',
  [SHIPMENT_STATUS.DELIVERED]: 'ডেলিভারি হয়েছে - শিপমেন্ট সফলভাবে ডেলিভারি করা হয়েছে',
  [SHIPMENT_STATUS.FAILED]: 'ব্যর্থ - শিপমেন্ট ডেলিভারি ব্যর্থ হয়েছে',
  [SHIPMENT_STATUS.RETURNED]: 'রিটার্নড - শিপমেন্ট ফেরত দেওয়া হয়েছে',
  [SHIPMENT_STATUS.CANCELLED]: 'বাতিল - শিপমেন্ট বাতিল করা হয়েছে',
  [SHIPMENT_STATUS.ON_HOLD]: 'হোল্ডে - শিপমেন্ট আটকে রাখা হয়েছে',
};

/**
 * শিপমেন্ট স্ট্যাটাসের রং (UI এর জন্য)
 */
export const SHIPMENT_STATUS_COLORS: Record<ShipmentStatus, string> = {
  [SHIPMENT_STATUS.PENDING]: '#FFA500', // কমলা
  [SHIPMENT_STATUS.PROCESSING]: '#3498DB', // নীল
  [SHIPMENT_STATUS.PACKED]: '#9B59B6', // বেগুনি
  [SHIPMENT_STATUS.SHIPPED]: '#2ECC71', // সবুজ
  [SHIPMENT_STATUS.IN_TRANSIT]: '#F39C12', // হলুদ
  [SHIPMENT_STATUS.OUT_FOR_DELIVERY]: '#1ABC9C', // টিল
  [SHIPMENT_STATUS.DELIVERED]: '#27AE60', // গাঢ় সবুজ
  [SHIPMENT_STATUS.FAILED]: '#E74C3C', // লাল
  [SHIPMENT_STATUS.RETURNED]: '#95A5A6', // ধূসর
  [SHIPMENT_STATUS.CANCELLED]: '#7F8C8D', // গাঢ় ধূসর
  [SHIPMENT_STATUS.ON_HOLD]: '#F1C40F', // সোনালী
};

/**
 * শিপমেন্ট স্ট্যাটাসের আইকন (UI এর জন্য)
 */
export const SHIPMENT_STATUS_ICONS: Record<ShipmentStatus, string> = {
  [SHIPMENT_STATUS.PENDING]: 'clock',
  [SHIPMENT_STATUS.PROCESSING]: 'spinner',
  [SHIPMENT_STATUS.PACKED]: 'box',
  [SHIPMENT_STATUS.SHIPPED]: 'rocket',
  [SHIPMENT_STATUS.IN_TRANSIT]: 'truck',
  [SHIPMENT_STATUS.OUT_FOR_DELIVERY]: 'delivery',
  [SHIPMENT_STATUS.DELIVERED]: 'check-circle',
  [SHIPMENT_STATUS.FAILED]: 'times-circle',
  [SHIPMENT_STATUS.RETURNED]: 'undo',
  [SHIPMENT_STATUS.CANCELLED]: 'ban',
  [SHIPMENT_STATUS.ON_HOLD]: 'pause',
};

/**
 * শিপমেন্ট স্ট্যাটাসের ক্রম (ওয়ার্কফ্লো)
 */
export const SHIPMENT_STATUS_FLOW: readonly ShipmentStatus[] = [
  SHIPMENT_STATUS.PENDING,
  SHIPMENT_STATUS.PROCESSING,
  SHIPMENT_STATUS.PACKED,
  SHIPMENT_STATUS.SHIPPED,
  SHIPMENT_STATUS.IN_TRANSIT,
  SHIPMENT_STATUS.OUT_FOR_DELIVERY,
  SHIPMENT_STATUS.DELIVERED,
] as const;

/**
 * টার্মিনাল স্ট্যাটাস (শেষ অবস্থা)
 */
export const TERMINAL_STATUSES: readonly ShipmentStatus[] = [
  SHIPMENT_STATUS.DELIVERED,
  SHIPMENT_STATUS.FAILED,
  SHIPMENT_STATUS.RETURNED,
  SHIPMENT_STATUS.CANCELLED,
] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাস (চলমান)
 */
export const ACTIVE_STATUSES: readonly ShipmentStatus[] = [
  SHIPMENT_STATUS.PENDING,
  SHIPMENT_STATUS.PROCESSING,
  SHIPMENT_STATUS.PACKED,
  SHIPMENT_STATUS.SHIPPED,
  SHIPMENT_STATUS.IN_TRANSIT,
  SHIPMENT_STATUS.OUT_FOR_DELIVERY,
  SHIPMENT_STATUS.ON_HOLD,
] as const;

/**
 * সফল স্ট্যাটাস
 */
export const SUCCESS_STATUSES: readonly ShipmentStatus[] = [SHIPMENT_STATUS.DELIVERED] as const;

/**
 * ব্যর্থ স্ট্যাটাস
 */
export const FAILED_STATUSES: readonly ShipmentStatus[] = [
  SHIPMENT_STATUS.FAILED,
  SHIPMENT_STATUS.RETURNED,
  SHIPMENT_STATUS.CANCELLED,
] as const;

/**
 * শিপমেন্ট স্ট্যাটাস গ্রুপ
 */
export const SHIPMENT_STATUS_GROUPS = {
  ALL: Object.values(SHIPMENT_STATUS),
  ACTIVE: ACTIVE_STATUSES,
  TERMINAL: TERMINAL_STATUSES,
  SUCCESS: SUCCESS_STATUSES,
  FAILED: FAILED_STATUSES,
} as const;

/**
 * শিপমেন্ট স্ট্যাটাস গ্রুপ টাইপ
 */
export type ShipmentStatusGroup = typeof SHIPMENT_STATUS_GROUPS;

/**
 * শিপমেন্ট স্ট্যাটাস কনফিগারেশন
 */
export const SHIPMENT_STATUS_CONFIG = {
  STATUS: SHIPMENT_STATUS,
  DESCRIPTIONS: SHIPMENT_STATUS_DESCRIPTIONS,
  COLORS: SHIPMENT_STATUS_COLORS,
  ICONS: SHIPMENT_STATUS_ICONS,
  FLOW: SHIPMENT_STATUS_FLOW,
  GROUPS: SHIPMENT_STATUS_GROUPS,
  TERMINAL_STATUSES,
  ACTIVE_STATUSES,
  SUCCESS_STATUSES,
  FAILED_STATUSES,
} as const;

/**
 * শিপমেন্ট স্ট্যাটাস কনফিগারেশন টাইপ
 */
export type ShipmentStatusConfig = typeof SHIPMENT_STATUS_CONFIG;

/**
 * শিপমেন্ট স্ট্যাটাস ট্রানজিশন (কোন স্ট্যাটাস থেকে কোন স্ট্যাটাসে যেতে পারে)
 */
export const STATUS_TRANSITIONS: Record<ShipmentStatus, readonly ShipmentStatus[]> = {
  [SHIPMENT_STATUS.PENDING]: [
    SHIPMENT_STATUS.PROCESSING,
    SHIPMENT_STATUS.CANCELLED,
    SHIPMENT_STATUS.ON_HOLD,
  ],
  [SHIPMENT_STATUS.PROCESSING]: [
    SHIPMENT_STATUS.PACKED,
    SHIPMENT_STATUS.CANCELLED,
    SHIPMENT_STATUS.ON_HOLD,
  ],
  [SHIPMENT_STATUS.PACKED]: [
    SHIPMENT_STATUS.SHIPPED,
    SHIPMENT_STATUS.CANCELLED,
    SHIPMENT_STATUS.ON_HOLD,
  ],
  [SHIPMENT_STATUS.SHIPPED]: [
    SHIPMENT_STATUS.IN_TRANSIT,
    SHIPMENT_STATUS.RETURNED,
    SHIPMENT_STATUS.CANCELLED,
  ],
  [SHIPMENT_STATUS.IN_TRANSIT]: [
    SHIPMENT_STATUS.OUT_FOR_DELIVERY,
    SHIPMENT_STATUS.RETURNED,
    SHIPMENT_STATUS.FAILED,
  ],
  [SHIPMENT_STATUS.OUT_FOR_DELIVERY]: [
    SHIPMENT_STATUS.DELIVERED,
    SHIPMENT_STATUS.FAILED,
    SHIPMENT_STATUS.RETURNED,
  ],
  [SHIPMENT_STATUS.DELIVERED]: [],
  [SHIPMENT_STATUS.FAILED]: [SHIPMENT_STATUS.RETURNED, SHIPMENT_STATUS.PROCESSING],
  [SHIPMENT_STATUS.RETURNED]: [SHIPMENT_STATUS.PROCESSING],
  [SHIPMENT_STATUS.CANCELLED]: [],
  [SHIPMENT_STATUS.ON_HOLD]: [SHIPMENT_STATUS.PROCESSING, SHIPMENT_STATUS.CANCELLED],
};

/**
 * শিপমেন্ট স্ট্যাটাস ট্রানজিশন টাইপ
 */
export type StatusTransitions = typeof STATUS_TRANSITIONS;

/**
 * চেক করে যে একটি স্ট্যাটাস টার্মিনাল কিনা
 */
export function isTerminalStatus(status: ShipmentStatus): boolean {
  return TERMINAL_STATUSES.includes(status);
}

/**
 * চেক করে যে একটি স্ট্যাটাস অ্যাক্টিভ কিনা
 */
export function isActiveStatus(status: ShipmentStatus): boolean {
  return ACTIVE_STATUSES.includes(status);
}

/**
 * চেক করে যে একটি স্ট্যাটাস সফল কিনা
 */
export function isSuccessStatus(status: ShipmentStatus): boolean {
  return SUCCESS_STATUSES.includes(status);
}

/**
 * চেক করে যে একটি স্ট্যাটাস ব্যর্থ কিনা
 */
export function isFailedStatus(status: ShipmentStatus): boolean {
  return FAILED_STATUSES.includes(status);
}

/**
 * দুটি স্ট্যাটাসের মধ্যে ট্রানজিশন সম্ভব কিনা চেক করে
 */
export function canTransition(from: ShipmentStatus, to: ShipmentStatus): boolean {
  const allowedTransitions = STATUS_TRANSITIONS[from];
  return allowedTransitions.includes(to);
}

/**
 * একটি স্ট্যাটাস থেকে সম্ভাব্য পরবর্তী স্ট্যাটাসগুলোর তালিকা
 */
export function getNextStatuses(status: ShipmentStatus): readonly ShipmentStatus[] {
  return STATUS_TRANSITIONS[status] || [];
}
