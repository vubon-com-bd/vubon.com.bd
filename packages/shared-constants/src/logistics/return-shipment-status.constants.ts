/**
 * রিটার্ন শিপমেন্টের বিভিন্ন স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * রিটার্ন স্ট্যাটাস
 */
export const RETURN_STATUS = {
  REQUESTED: 'requested',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  PICKUP_SCHEDULED: 'pickup_scheduled',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  RECEIVED: 'received',
  PROCESSED: 'processed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

/**
 * রিটার্ন স্ট্যাটাস টাইপ
 */
export type ReturnStatus = (typeof RETURN_STATUS)[keyof typeof RETURN_STATUS];

/**
 * রিটার্ন স্ট্যাটাসের বিবরণ
 */
export const RETURN_STATUS_DESCRIPTIONS: Record<ReturnStatus, string> = {
  [RETURN_STATUS.REQUESTED]: 'অনুরোধকৃত - রিটার্ন অনুরোধ করা হয়েছে',
  [RETURN_STATUS.APPROVED]: 'অনুমোদিত - রিটার্ন অনুমোদন করা হয়েছে',
  [RETURN_STATUS.REJECTED]: 'প্রত্যাখ্যাত - রিটার্ন প্রত্যাখ্যান করা হয়েছে',
  [RETURN_STATUS.PICKUP_SCHEDULED]: 'পিকআপ শিডিউল - পিকআপ সময় নির্ধারণ করা হয়েছে',
  [RETURN_STATUS.PICKED_UP]: 'পিকআপ করা হয়েছে - পণ্য পিকআপ সম্পন্ন হয়েছে',
  [RETURN_STATUS.IN_TRANSIT]: 'ট্রানজিটে - রিটার্ন পথে রয়েছে',
  [RETURN_STATUS.RECEIVED]: 'গৃহীত - রিটার্ন গ্রহণ করা হয়েছে',
  [RETURN_STATUS.PROCESSED]: 'প্রক্রিয়াকৃত - রিটার্ন প্রক্রিয়াকরণ সম্পন্ন',
  [RETURN_STATUS.COMPLETED]: 'সম্পন্ন - রিটার্ন সম্পূর্ণ হয়েছে',
  [RETURN_STATUS.CANCELLED]: 'বাতিল - রিটার্ন বাতিল করা হয়েছে',
};

/**
 * রিটার্ন স্ট্যাটাসের রং (UI এর জন্য)
 */
export const RETURN_STATUS_COLORS: Record<ReturnStatus, string> = {
  [RETURN_STATUS.REQUESTED]: '#3498DB', // নীল
  [RETURN_STATUS.APPROVED]: '#2ECC71', // সবুজ
  [RETURN_STATUS.REJECTED]: '#E74C3C', // লাল
  [RETURN_STATUS.PICKUP_SCHEDULED]: '#F39C12', // কমলা
  [RETURN_STATUS.PICKED_UP]: '#9B59B6', // বেগুনি
  [RETURN_STATUS.IN_TRANSIT]: '#1ABC9C', // টিল
  [RETURN_STATUS.RECEIVED]: '#E67E22', // গাঢ় কমলা
  [RETURN_STATUS.PROCESSED]: '#27AE60', // গাঢ় সবুজ
  [RETURN_STATUS.COMPLETED]: '#2ECC71', // সবুজ
  [RETURN_STATUS.CANCELLED]: '#95A5A6', // ধূসর
};

/**
 * রিটার্ন স্ট্যাটাসের আইকন (UI এর জন্য)
 */
export const RETURN_STATUS_ICONS: Record<ReturnStatus, string> = {
  [RETURN_STATUS.REQUESTED]: 'inbox',
  [RETURN_STATUS.APPROVED]: 'check-circle',
  [RETURN_STATUS.REJECTED]: 'times-circle',
  [RETURN_STATUS.PICKUP_SCHEDULED]: 'calendar',
  [RETURN_STATUS.PICKED_UP]: 'package',
  [RETURN_STATUS.IN_TRANSIT]: 'truck',
  [RETURN_STATUS.RECEIVED]: 'archive',
  [RETURN_STATUS.PROCESSED]: 'cog',
  [RETURN_STATUS.COMPLETED]: 'check',
  [RETURN_STATUS.CANCELLED]: 'ban',
};

/**
 * রিটার্ন স্ট্যাটাসের ক্রম (ওয়ার্কফ্লো)
 */
export const RETURN_STATUS_FLOW: readonly ReturnStatus[] = [
  RETURN_STATUS.REQUESTED,
  RETURN_STATUS.APPROVED,
  RETURN_STATUS.PICKUP_SCHEDULED,
  RETURN_STATUS.PICKED_UP,
  RETURN_STATUS.IN_TRANSIT,
  RETURN_STATUS.RECEIVED,
  RETURN_STATUS.PROCESSED,
  RETURN_STATUS.COMPLETED,
] as const;

/**
 * টার্মিনাল রিটার্ন স্ট্যাটাস
 */
export const TERMINAL_RETURN_STATUSES: readonly ReturnStatus[] = [
  RETURN_STATUS.COMPLETED,
  RETURN_STATUS.REJECTED,
  RETURN_STATUS.CANCELLED,
] as const;

/**
 * অ্যাক্টিভ রিটার্ন স্ট্যাটাস
 */
export const ACTIVE_RETURN_STATUSES: readonly ReturnStatus[] = [
  RETURN_STATUS.REQUESTED,
  RETURN_STATUS.APPROVED,
  RETURN_STATUS.PICKUP_SCHEDULED,
  RETURN_STATUS.PICKED_UP,
  RETURN_STATUS.IN_TRANSIT,
  RETURN_STATUS.RECEIVED,
  RETURN_STATUS.PROCESSED,
] as const;

/**
 * সফল রিটার্ন স্ট্যাটাস
 */
export const SUCCESS_RETURN_STATUSES: readonly ReturnStatus[] = [RETURN_STATUS.COMPLETED] as const;

/**
 * ব্যর্থ রিটার্ন স্ট্যাটাস
 */
export const FAILED_RETURN_STATUSES: readonly ReturnStatus[] = [
  RETURN_STATUS.REJECTED,
  RETURN_STATUS.CANCELLED,
] as const;

/**
 * রিটার্ন স্ট্যাটাস গ্রুপ
 */
export const RETURN_STATUS_GROUPS = {
  ALL: Object.values(RETURN_STATUS),
  ACTIVE: ACTIVE_RETURN_STATUSES,
  TERMINAL: TERMINAL_RETURN_STATUSES,
  SUCCESS: SUCCESS_RETURN_STATUSES,
  FAILED: FAILED_RETURN_STATUSES,
} as const;

/**
 * রিটার্ন স্ট্যাটাস গ্রুপ টাইপ
 */
export type ReturnStatusGroup = typeof RETURN_STATUS_GROUPS;

/**
 * রিটার্ন স্ট্যাটাস ট্রানজিশন
 */
export const RETURN_STATUS_TRANSITIONS: Record<ReturnStatus, readonly ReturnStatus[]> = {
  [RETURN_STATUS.REQUESTED]: [
    RETURN_STATUS.APPROVED,
    RETURN_STATUS.REJECTED,
    RETURN_STATUS.CANCELLED,
  ],
  [RETURN_STATUS.APPROVED]: [RETURN_STATUS.PICKUP_SCHEDULED, RETURN_STATUS.CANCELLED],
  [RETURN_STATUS.REJECTED]: [],
  [RETURN_STATUS.PICKUP_SCHEDULED]: [RETURN_STATUS.PICKED_UP, RETURN_STATUS.CANCELLED],
  [RETURN_STATUS.PICKED_UP]: [RETURN_STATUS.IN_TRANSIT, RETURN_STATUS.CANCELLED],
  [RETURN_STATUS.IN_TRANSIT]: [RETURN_STATUS.RECEIVED, RETURN_STATUS.CANCELLED],
  [RETURN_STATUS.RECEIVED]: [RETURN_STATUS.PROCESSED, RETURN_STATUS.CANCELLED],
  [RETURN_STATUS.PROCESSED]: [RETURN_STATUS.COMPLETED, RETURN_STATUS.CANCELLED],
  [RETURN_STATUS.COMPLETED]: [],
  [RETURN_STATUS.CANCELLED]: [],
};

/**
 * রিটার্ন স্ট্যাটাস ট্রানজিশন টাইপ
 */
export type ReturnStatusTransitions = typeof RETURN_STATUS_TRANSITIONS;

/**
 * রিটার্ন স্ট্যাটাস কনফিগারেশন
 */
export const RETURN_STATUS_CONFIG = {
  STATUS: RETURN_STATUS,
  DESCRIPTIONS: RETURN_STATUS_DESCRIPTIONS,
  COLORS: RETURN_STATUS_COLORS,
  ICONS: RETURN_STATUS_ICONS,
  FLOW: RETURN_STATUS_FLOW,
  GROUPS: RETURN_STATUS_GROUPS,
  TRANSITIONS: RETURN_STATUS_TRANSITIONS,
  TERMINAL_STATUSES: TERMINAL_RETURN_STATUSES,
  ACTIVE_STATUSES: ACTIVE_RETURN_STATUSES,
  SUCCESS_STATUSES: SUCCESS_RETURN_STATUSES,
  FAILED_STATUSES: FAILED_RETURN_STATUSES,
} as const;

/**
 * রিটার্ন স্ট্যাটাস কনফিগারেশন টাইপ
 */
export type ReturnStatusConfig = typeof RETURN_STATUS_CONFIG;

/**
 * চেক করে যে রিটার্ন স্ট্যাটাস টার্মিনাল কিনা
 */
export function isReturnStatusTerminal(status: ReturnStatus): boolean {
  return (TERMINAL_RETURN_STATUSES as readonly ReturnStatus[]).includes(status);
}

/**
 * চেক করে যে রিটার্ন স্ট্যাটাস অ্যাক্টিভ কিনা
 */
export function isReturnStatusActive(status: ReturnStatus): boolean {
  return (ACTIVE_RETURN_STATUSES as readonly ReturnStatus[]).includes(status);
}

/**
 * চেক করে যে রিটার্ন স্ট্যাটাস সফল কিনা
 */
export function isReturnStatusSuccess(status: ReturnStatus): boolean {
  return (SUCCESS_RETURN_STATUSES as readonly ReturnStatus[]).includes(status);
}

/**
 * চেক করে যে রিটার্ন স্ট্যাটাস ব্যর্থ কিনা
 */
export function isReturnStatusFailed(status: ReturnStatus): boolean {
  return (FAILED_RETURN_STATUSES as readonly ReturnStatus[]).includes(status);
}

/**
 * দুটি রিটার্ন স্ট্যাটাসের মধ্যে ট্রানজিশন সম্ভব কিনা চেক করে
 */
export function canReturnStatusTransition(from: ReturnStatus, to: ReturnStatus): boolean {
  const allowedTransitions = RETURN_STATUS_TRANSITIONS[from];
  return allowedTransitions.includes(to);
}

/**
 * রিটার্ন স্ট্যাটাসের বিবরণ পাওয়া
 */
export function getReturnStatusDescription(status: ReturnStatus): string {
  return RETURN_STATUS_DESCRIPTIONS[status];
}

/**
 * রিটার্ন স্ট্যাটাসের রং পাওয়া
 */
export function getReturnStatusColor(status: ReturnStatus): string {
  return RETURN_STATUS_COLORS[status];
}

/**
 * রিটার্ন স্ট্যাটাসের আইকন পাওয়া
 */
export function getReturnStatusIcon(status: ReturnStatus): string {
  return RETURN_STATUS_ICONS[status];
}
