/**
 * রুটের বিভিন্ন স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * রুট স্ট্যাটাস
 */
export const ROUTE_STATUS = {
  PLANNED: 'planned',
  ACTIVE: 'active',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  DELAYED: 'delayed',
  OPTIMIZED: 'optimized',
} as const;

/**
 * রুট স্ট্যাটাস টাইপ
 */
export type RouteStatus = (typeof ROUTE_STATUS)[keyof typeof ROUTE_STATUS];

/**
 * রুট স্ট্যাটাসের বিবরণ
 */
export const ROUTE_STATUS_DESCRIPTIONS: Record<RouteStatus, string> = {
  [ROUTE_STATUS.PLANNED]: 'পরিকল্পিত - রুট পরিকল্পনা করা হয়েছে',
  [ROUTE_STATUS.ACTIVE]: 'সক্রিয় - রুট সক্রিয় অবস্থায় আছে',
  [ROUTE_STATUS.IN_PROGRESS]: 'চলমান - রুট চলমান অবস্থায় আছে',
  [ROUTE_STATUS.COMPLETED]: 'সম্পন্ন - রুট সম্পূর্ণ হয়েছে',
  [ROUTE_STATUS.CANCELLED]: 'বাতিল - রুট বাতিল করা হয়েছে',
  [ROUTE_STATUS.DELAYED]: 'বিলম্বিত - রুট বিলম্বিত হয়েছে',
  [ROUTE_STATUS.OPTIMIZED]: 'অপ্টিমাইজড - রুট অপ্টিমাইজ করা হয়েছে',
};

/**
 * রুট স্ট্যাটাসের রং (UI এর জন্য)
 */
export const ROUTE_STATUS_COLORS: Record<RouteStatus, string> = {
  [ROUTE_STATUS.PLANNED]: '#3498DB', // নীল
  [ROUTE_STATUS.ACTIVE]: '#2ECC71', // সবুজ
  [ROUTE_STATUS.IN_PROGRESS]: '#F39C12', // কমলা
  [ROUTE_STATUS.COMPLETED]: '#27AE60', // গাঢ় সবুজ
  [ROUTE_STATUS.CANCELLED]: '#95A5A6', // ধূসর
  [ROUTE_STATUS.DELAYED]: '#E74C3C', // লাল
  [ROUTE_STATUS.OPTIMIZED]: '#9B59B6', // বেগুনি
};

/**
 * রুট স্ট্যাটাসের আইকন (UI এর জন্য)
 */
export const ROUTE_STATUS_ICONS: Record<RouteStatus, string> = {
  [ROUTE_STATUS.PLANNED]: 'map',
  [ROUTE_STATUS.ACTIVE]: 'play',
  [ROUTE_STATUS.IN_PROGRESS]: 'spinner',
  [ROUTE_STATUS.COMPLETED]: 'check-circle',
  [ROUTE_STATUS.CANCELLED]: 'times-circle',
  [ROUTE_STATUS.DELAYED]: 'clock',
  [ROUTE_STATUS.OPTIMIZED]: 'magic',
};

/**
 * অ্যাক্টিভ রুট স্ট্যাটাসসমূহ
 */
export const ACTIVE_ROUTE_STATUSES: readonly RouteStatus[] = [
  ROUTE_STATUS.ACTIVE,
  ROUTE_STATUS.IN_PROGRESS,
  ROUTE_STATUS.OPTIMIZED,
] as const;

/**
 * টার্মিনাল রুট স্ট্যাটাসসমূহ
 */
export const TERMINAL_ROUTE_STATUSES: readonly RouteStatus[] = [
  ROUTE_STATUS.COMPLETED,
  ROUTE_STATUS.CANCELLED,
] as const;

/**
 * রুট স্ট্যাটাস গ্রুপ
 */
export const ROUTE_STATUS_GROUPS = {
  ALL: Object.values(ROUTE_STATUS),
  ACTIVE: ACTIVE_ROUTE_STATUSES,
  TERMINAL: TERMINAL_ROUTE_STATUSES,
} as const;

/**
 * রুট স্ট্যাটাস গ্রুপ টাইপ
 */
export type RouteStatusGroup = typeof ROUTE_STATUS_GROUPS;

/**
 * রুট স্ট্যাটাস ট্রানজিশন
 */
export const ROUTE_STATUS_TRANSITIONS: Record<RouteStatus, readonly RouteStatus[]> = {
  [ROUTE_STATUS.PLANNED]: [ROUTE_STATUS.ACTIVE, ROUTE_STATUS.OPTIMIZED, ROUTE_STATUS.CANCELLED],
  [ROUTE_STATUS.ACTIVE]: [ROUTE_STATUS.IN_PROGRESS, ROUTE_STATUS.DELAYED, ROUTE_STATUS.CANCELLED],
  [ROUTE_STATUS.IN_PROGRESS]: [
    ROUTE_STATUS.COMPLETED,
    ROUTE_STATUS.DELAYED,
    ROUTE_STATUS.CANCELLED,
  ],
  [ROUTE_STATUS.COMPLETED]: [],
  [ROUTE_STATUS.CANCELLED]: [],
  [ROUTE_STATUS.DELAYED]: [ROUTE_STATUS.ACTIVE, ROUTE_STATUS.IN_PROGRESS, ROUTE_STATUS.CANCELLED],
  [ROUTE_STATUS.OPTIMIZED]: [ROUTE_STATUS.ACTIVE, ROUTE_STATUS.PLANNED, ROUTE_STATUS.CANCELLED],
};

/**
 * রুট স্ট্যাটাস ট্রানজিশন টাইপ
 */
export type RouteStatusTransitions = typeof ROUTE_STATUS_TRANSITIONS;

/**
 * রুট স্ট্যাটাস কনফিগারেশন
 */
export const ROUTE_STATUS_CONFIG = {
  STATUS: ROUTE_STATUS,
  DESCRIPTIONS: ROUTE_STATUS_DESCRIPTIONS,
  COLORS: ROUTE_STATUS_COLORS,
  ICONS: ROUTE_STATUS_ICONS,
  GROUPS: ROUTE_STATUS_GROUPS,
  TRANSITIONS: ROUTE_STATUS_TRANSITIONS,
  ACTIVE_STATUSES: ACTIVE_ROUTE_STATUSES,
  TERMINAL_STATUSES: TERMINAL_ROUTE_STATUSES,
} as const;

/**
 * রুট স্ট্যাটাস কনফিগারেশন টাইপ
 */
export type RouteStatusConfig = typeof ROUTE_STATUS_CONFIG;

/**
 * চেক করে যে রুট স্ট্যাটাস অ্যাক্টিভ কিনা
 */
export function isRouteStatusActive(status: RouteStatus): boolean {
  return (ACTIVE_ROUTE_STATUSES as readonly RouteStatus[]).includes(status);
}

/**
 * চেক করে যে রুট স্ট্যাটাস টার্মিনাল কিনা
 */
export function isRouteStatusTerminal(status: RouteStatus): boolean {
  return (TERMINAL_ROUTE_STATUSES as readonly RouteStatus[]).includes(status);
}

/**
 * দুটি রুট স্ট্যাটাসের মধ্যে ট্রানজিশন সম্ভব কিনা চেক করে
 */
export function canRouteStatusTransition(from: RouteStatus, to: RouteStatus): boolean {
  const allowedTransitions = ROUTE_STATUS_TRANSITIONS[from];
  return allowedTransitions.includes(to);
}

/**
 * রুট স্ট্যাটাসের বিবরণ পাওয়া
 */
export function getRouteStatusDescription(status: RouteStatus): string {
  return ROUTE_STATUS_DESCRIPTIONS[status];
}

/**
 * রুট স্ট্যাটাসের রং পাওয়া
 */
export function getRouteStatusColor(status: RouteStatus): string {
  return ROUTE_STATUS_COLORS[status];
}

/**
 * রুট স্ট্যাটাসের আইকন পাওয়া
 */
export function getRouteStatusIcon(status: RouteStatus): string {
  return ROUTE_STATUS_ICONS[status];
}

/**
 * রুট সম্পূর্ণ করা যায় কিনা
 */
export function canRouteBeCompleted(status: RouteStatus): boolean {
  return status === ROUTE_STATUS.IN_PROGRESS || status === ROUTE_STATUS.ACTIVE;
}

/**
 * রুট বাতিল করা যায় কিনা
 */
export function canRouteBeCancelled(status: RouteStatus): boolean {
  return status !== ROUTE_STATUS.COMPLETED && status !== ROUTE_STATUS.CANCELLED;
}

/**
 * রুট অপ্টিমাইজ করা যায় কিনা
 */
export function canRouteBeOptimized(status: RouteStatus): boolean {
  return status === ROUTE_STATUS.PLANNED || status === ROUTE_STATUS.ACTIVE;
}
