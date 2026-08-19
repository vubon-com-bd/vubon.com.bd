/**
 * ডিসপ্যাচের বিভিন্ন স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * ডিসপ্যাচ স্ট্যাটাস
 */
export const DISPATCH_STATUS = {
  PENDING: 'pending',
  ASSIGNED: 'assigned',
  LOADING: 'loading',
  DEPARTED: 'departed',
  IN_TRANSIT: 'in_transit',
  ARRIVED: 'arrived',
  UNLOADING: 'unloading',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

/**
 * ডিসপ্যাচ স্ট্যাটাস টাইপ
 */
export type DispatchStatus = (typeof DISPATCH_STATUS)[keyof typeof DISPATCH_STATUS];

/**
 * ডিসপ্যাচ স্ট্যাটাসের বিবরণ
 */
export const DISPATCH_STATUS_DESCRIPTIONS: Record<DispatchStatus, string> = {
  [DISPATCH_STATUS.PENDING]: 'পেন্ডিং - ডিসপ্যাচ শুরু হয়নি',
  [DISPATCH_STATUS.ASSIGNED]: 'অ্যাসাইনড - ডিসপ্যাচ ড্রাইভার নিয়োগ করা হয়েছে',
  [DISPATCH_STATUS.LOADING]: 'লোডিং - পণ্য লোড করা হচ্ছে',
  [DISPATCH_STATUS.DEPARTED]: 'রওয়ানা - ডিসপ্যাচ রওয়ানা হয়েছে',
  [DISPATCH_STATUS.IN_TRANSIT]: 'ট্রানজিটে - ডিসপ্যাচ পথে রয়েছে',
  [DISPATCH_STATUS.ARRIVED]: 'পৌঁছেছে - ডিসপ্যাচ গন্তব্যে পৌঁছেছে',
  [DISPATCH_STATUS.UNLOADING]: 'আনলোডিং - পণ্য আনলোড করা হচ্ছে',
  [DISPATCH_STATUS.COMPLETED]: 'সম্পন্ন - ডিসপ্যাচ সম্পূর্ণ হয়েছে',
  [DISPATCH_STATUS.FAILED]: 'ব্যর্থ - ডিসপ্যাচ ব্যর্থ হয়েছে',
  [DISPATCH_STATUS.CANCELLED]: 'বাতিল - ডিসপ্যাচ বাতিল করা হয়েছে',
};

/**
 * ডিসপ্যাচ স্ট্যাটাসের রং (UI এর জন্য)
 */
export const DISPATCH_STATUS_COLORS: Record<DispatchStatus, string> = {
  [DISPATCH_STATUS.PENDING]: '#3498DB', // নীল
  [DISPATCH_STATUS.ASSIGNED]: '#9B59B6', // বেগুনি
  [DISPATCH_STATUS.LOADING]: '#F39C12', // কমলা
  [DISPATCH_STATUS.DEPARTED]: '#1ABC9C', // টিল
  [DISPATCH_STATUS.IN_TRANSIT]: '#2ECC71', // সবুজ
  [DISPATCH_STATUS.ARRIVED]: '#E67E22', // গাঢ় কমলা
  [DISPATCH_STATUS.UNLOADING]: '#F1C40F', // সোনালী
  [DISPATCH_STATUS.COMPLETED]: '#27AE60', // গাঢ় সবুজ
  [DISPATCH_STATUS.FAILED]: '#E74C3C', // লাল
  [DISPATCH_STATUS.CANCELLED]: '#95A5A6', // ধূসর
};

/**
 * ডিসপ্যাচ স্ট্যাটাসের আইকন (UI এর জন্য)
 */
export const DISPATCH_STATUS_ICONS: Record<DispatchStatus, string> = {
  [DISPATCH_STATUS.PENDING]: 'clock',
  [DISPATCH_STATUS.ASSIGNED]: 'user-check',
  [DISPATCH_STATUS.LOADING]: 'package',
  [DISPATCH_STATUS.DEPARTED]: 'rocket',
  [DISPATCH_STATUS.IN_TRANSIT]: 'truck',
  [DISPATCH_STATUS.ARRIVED]: 'map-pin',
  [DISPATCH_STATUS.UNLOADING]: 'box',
  [DISPATCH_STATUS.COMPLETED]: 'check-circle',
  [DISPATCH_STATUS.FAILED]: 'times-circle',
  [DISPATCH_STATUS.CANCELLED]: 'ban',
};

/**
 * ডিসপ্যাচ স্ট্যাটাসের ক্রম (ওয়ার্কফ্লো)
 */
export const DISPATCH_STATUS_FLOW: readonly DispatchStatus[] = [
  DISPATCH_STATUS.PENDING,
  DISPATCH_STATUS.ASSIGNED,
  DISPATCH_STATUS.LOADING,
  DISPATCH_STATUS.DEPARTED,
  DISPATCH_STATUS.IN_TRANSIT,
  DISPATCH_STATUS.ARRIVED,
  DISPATCH_STATUS.UNLOADING,
  DISPATCH_STATUS.COMPLETED,
] as const;

/**
 * টার্মিনাল ডিসপ্যাচ স্ট্যাটাস
 */
export const TERMINAL_DISPATCH_STATUSES: readonly DispatchStatus[] = [
  DISPATCH_STATUS.COMPLETED,
  DISPATCH_STATUS.FAILED,
  DISPATCH_STATUS.CANCELLED,
] as const;

/**
 * অ্যাক্টিভ ডিসপ্যাচ স্ট্যাটাস
 */
export const ACTIVE_DISPATCH_STATUSES: readonly DispatchStatus[] = [
  DISPATCH_STATUS.PENDING,
  DISPATCH_STATUS.ASSIGNED,
  DISPATCH_STATUS.LOADING,
  DISPATCH_STATUS.DEPARTED,
  DISPATCH_STATUS.IN_TRANSIT,
  DISPATCH_STATUS.ARRIVED,
  DISPATCH_STATUS.UNLOADING,
] as const;

/**
 * সফল ডিসপ্যাচ স্ট্যাটাস
 */
export const SUCCESS_DISPATCH_STATUSES: readonly DispatchStatus[] = [
  DISPATCH_STATUS.COMPLETED,
] as const;

/**
 * ব্যর্থ ডিসপ্যাচ স্ট্যাটাস
 */
export const FAILED_DISPATCH_STATUSES: readonly DispatchStatus[] = [
  DISPATCH_STATUS.FAILED,
  DISPATCH_STATUS.CANCELLED,
] as const;

/**
 * ডিসপ্যাচ স্ট্যাটাস গ্রুপ
 */
export const DISPATCH_STATUS_GROUPS = {
  ALL: Object.values(DISPATCH_STATUS),
  ACTIVE: ACTIVE_DISPATCH_STATUSES,
  TERMINAL: TERMINAL_DISPATCH_STATUSES,
  SUCCESS: SUCCESS_DISPATCH_STATUSES,
  FAILED: FAILED_DISPATCH_STATUSES,
} as const;

/**
 * ডিসপ্যাচ স্ট্যাটাস গ্রুপ টাইপ
 */
export type DispatchStatusGroup = typeof DISPATCH_STATUS_GROUPS;

/**
 * ডিসপ্যাচ স্ট্যাটাস ট্রানজিশন
 */
export const DISPATCH_STATUS_TRANSITIONS: Record<DispatchStatus, readonly DispatchStatus[]> = {
  [DISPATCH_STATUS.PENDING]: [DISPATCH_STATUS.ASSIGNED, DISPATCH_STATUS.CANCELLED],
  [DISPATCH_STATUS.ASSIGNED]: [DISPATCH_STATUS.LOADING, DISPATCH_STATUS.CANCELLED],
  [DISPATCH_STATUS.LOADING]: [
    DISPATCH_STATUS.DEPARTED,
    DISPATCH_STATUS.FAILED,
    DISPATCH_STATUS.CANCELLED,
  ],
  [DISPATCH_STATUS.DEPARTED]: [
    DISPATCH_STATUS.IN_TRANSIT,
    DISPATCH_STATUS.FAILED,
    DISPATCH_STATUS.CANCELLED,
  ],
  [DISPATCH_STATUS.IN_TRANSIT]: [
    DISPATCH_STATUS.ARRIVED,
    DISPATCH_STATUS.FAILED,
    DISPATCH_STATUS.CANCELLED,
  ],
  [DISPATCH_STATUS.ARRIVED]: [
    DISPATCH_STATUS.UNLOADING,
    DISPATCH_STATUS.FAILED,
    DISPATCH_STATUS.CANCELLED,
  ],
  [DISPATCH_STATUS.UNLOADING]: [
    DISPATCH_STATUS.COMPLETED,
    DISPATCH_STATUS.FAILED,
    DISPATCH_STATUS.CANCELLED,
  ],
  [DISPATCH_STATUS.COMPLETED]: [],
  [DISPATCH_STATUS.FAILED]: [DISPATCH_STATUS.PENDING, DISPATCH_STATUS.CANCELLED],
  [DISPATCH_STATUS.CANCELLED]: [],
};

/**
 * ডিসপ্যাচ স্ট্যাটাস ট্রানজিশন টাইপ
 */
export type DispatchStatusTransitions = typeof DISPATCH_STATUS_TRANSITIONS;

/**
 * ডিসপ্যাচ স্ট্যাটাস কনফিগারেশন
 */
export const DISPATCH_STATUS_CONFIG = {
  STATUS: DISPATCH_STATUS,
  DESCRIPTIONS: DISPATCH_STATUS_DESCRIPTIONS,
  COLORS: DISPATCH_STATUS_COLORS,
  ICONS: DISPATCH_STATUS_ICONS,
  FLOW: DISPATCH_STATUS_FLOW,
  GROUPS: DISPATCH_STATUS_GROUPS,
  TRANSITIONS: DISPATCH_STATUS_TRANSITIONS,
  TERMINAL_STATUSES: TERMINAL_DISPATCH_STATUSES,
  ACTIVE_STATUSES: ACTIVE_DISPATCH_STATUSES,
  SUCCESS_STATUSES: SUCCESS_DISPATCH_STATUSES,
  FAILED_STATUSES: FAILED_DISPATCH_STATUSES,
} as const;

/**
 * ডিসপ্যাচ স্ট্যাটাস কনফিগারেশন টাইপ
 */
export type DispatchStatusConfig = typeof DISPATCH_STATUS_CONFIG;

/**
 * চেক করে যে ডিসপ্যাচ স্ট্যাটাস টার্মিনাল কিনা
 */
export function isDispatchStatusTerminal(status: DispatchStatus): boolean {
  return (TERMINAL_DISPATCH_STATUSES as readonly DispatchStatus[]).includes(status);
}

/**
 * চেক করে যে ডিসপ্যাচ স্ট্যাটাস অ্যাক্টিভ কিনা
 */
export function isDispatchStatusActive(status: DispatchStatus): boolean {
  return (ACTIVE_DISPATCH_STATUSES as readonly DispatchStatus[]).includes(status);
}

/**
 * চেক করে যে ডিসপ্যাচ স্ট্যাটাস সফল কিনা
 */
export function isDispatchStatusSuccess(status: DispatchStatus): boolean {
  return (SUCCESS_DISPATCH_STATUSES as readonly DispatchStatus[]).includes(status);
}

/**
 * চেক করে যে ডিসপ্যাচ স্ট্যাটাস ব্যর্থ কিনা
 */
export function isDispatchStatusFailed(status: DispatchStatus): boolean {
  return (FAILED_DISPATCH_STATUSES as readonly DispatchStatus[]).includes(status);
}

/**
 * দুটি ডিসপ্যাচ স্ট্যাটাসের মধ্যে ট্রানজিশন সম্ভব কিনা চেক করে
 */
export function canDispatchStatusTransition(from: DispatchStatus, to: DispatchStatus): boolean {
  const allowedTransitions = DISPATCH_STATUS_TRANSITIONS[from];
  return allowedTransitions.includes(to);
}

/**
 * ডিসপ্যাচ স্ট্যাটাসের বিবরণ পাওয়া
 */
export function getDispatchStatusDescription(status: DispatchStatus): string {
  return DISPATCH_STATUS_DESCRIPTIONS[status];
}

/**
 * ডিসপ্যাচ স্ট্যাটাসের রং পাওয়া
 */
export function getDispatchStatusColor(status: DispatchStatus): string {
  return DISPATCH_STATUS_COLORS[status];
}

/**
 * ডিসপ্যাচ স্ট্যাটাসের আইকন পাওয়া
 */
export function getDispatchStatusIcon(status: DispatchStatus): string {
  return DISPATCH_STATUS_ICONS[status];
}
