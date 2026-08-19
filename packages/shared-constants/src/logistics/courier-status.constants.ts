/**
 * কুরিয়ারের বিভিন্ন স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * কুরিয়ার স্ট্যাটাস
 */
export const COURIER_STATUS = {
  AVAILABLE: 'available',
  BUSY: 'busy',
  ON_ROUTE: 'on_route',
  OFFLINE: 'offline',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  ACTIVE: 'active',
} as const;

/**
 * কুরিয়ার স্ট্যাটাস টাইপ
 */
export type CourierStatus = (typeof COURIER_STATUS)[keyof typeof COURIER_STATUS];

/**
 * কুরিয়ার স্ট্যাটাসের বিবরণ
 */
export const COURIER_STATUS_DESCRIPTIONS: Record<CourierStatus, string> = {
  [COURIER_STATUS.AVAILABLE]: 'উপলব্ধ - কুরিয়ার ডেলিভারি নিতে প্রস্তুত',
  [COURIER_STATUS.BUSY]: 'ব্যস্ত - কুরিয়ার বর্তমানে ডেলিভারি করছে',
  [COURIER_STATUS.ON_ROUTE]: 'রুটে - কুরিয়ার ডেলিভারি রুটে রয়েছে',
  [COURIER_STATUS.OFFLINE]: 'অফলাইন - কুরিয়ার সিস্টেমে লগইন নেই',
  [COURIER_STATUS.INACTIVE]: 'নিষ্ক্রিয় - কুরিয়ার সক্রিয় নয়',
  [COURIER_STATUS.SUSPENDED]: 'স্থগিত - কুরিয়ার কার্যক্রম স্থগিত',
  [COURIER_STATUS.ACTIVE]: 'সক্রিয় - কুরিয়ার সক্রিয়ভাবে কাজ করছে',
};

/**
 * কুরিয়ার স্ট্যাটাসের রং (UI এর জন্য)
 */
export const COURIER_STATUS_COLORS: Record<CourierStatus, string> = {
  [COURIER_STATUS.AVAILABLE]: '#2ECC71', // সবুজ
  [COURIER_STATUS.BUSY]: '#F39C12', // কমলা
  [COURIER_STATUS.ON_ROUTE]: '#3498DB', // নীল
  [COURIER_STATUS.OFFLINE]: '#95A5A6', // ধূসর
  [COURIER_STATUS.INACTIVE]: '#7F8C8D', // গাঢ় ধূসর
  [COURIER_STATUS.SUSPENDED]: '#E74C3C', // লাল
  [COURIER_STATUS.ACTIVE]: '#27AE60', // গাঢ় সবুজ
};

/**
 * কুরিয়ার স্ট্যাটাসের আইকন (UI এর জন্য)
 */
export const COURIER_STATUS_ICONS: Record<CourierStatus, string> = {
  [COURIER_STATUS.AVAILABLE]: 'check-circle',
  [COURIER_STATUS.BUSY]: 'clock',
  [COURIER_STATUS.ON_ROUTE]: 'truck',
  [COURIER_STATUS.OFFLINE]: 'power-off',
  [COURIER_STATUS.INACTIVE]: 'pause',
  [COURIER_STATUS.SUSPENDED]: 'ban',
  [COURIER_STATUS.ACTIVE]: 'play',
};

/**
 * অ্যাক্টিভ কুরিয়ার স্ট্যাটাসসমূহ
 */
export const ACTIVE_COURIER_STATUSES: readonly CourierStatus[] = [
  COURIER_STATUS.AVAILABLE,
  COURIER_STATUS.BUSY,
  COURIER_STATUS.ON_ROUTE,
  COURIER_STATUS.ACTIVE,
] as const;

/**
 * ইনঅ্যাক্টিভ কুরিয়ার স্ট্যাটাসসমূহ
 */
export const INACTIVE_COURIER_STATUSES: readonly CourierStatus[] = [
  COURIER_STATUS.OFFLINE,
  COURIER_STATUS.INACTIVE,
  COURIER_STATUS.SUSPENDED,
] as const;

/**
 * কুরিয়ার স্ট্যাটাস গ্রুপ
 */
export const COURIER_STATUS_GROUPS = {
  ALL: Object.values(COURIER_STATUS),
  ACTIVE: ACTIVE_COURIER_STATUSES,
  INACTIVE: INACTIVE_COURIER_STATUSES,
} as const;

/**
 * কুরিয়ার স্ট্যাটাস গ্রুপ টাইপ
 */
export type CourierStatusGroup = typeof COURIER_STATUS_GROUPS;

/**
 * কুরিয়ার স্ট্যাটাস ট্রানজিশন
 */
export const COURIER_STATUS_TRANSITIONS: Record<CourierStatus, readonly CourierStatus[]> = {
  [COURIER_STATUS.AVAILABLE]: [
    COURIER_STATUS.BUSY,
    COURIER_STATUS.ON_ROUTE,
    COURIER_STATUS.OFFLINE,
    COURIER_STATUS.INACTIVE,
  ],
  [COURIER_STATUS.BUSY]: [
    COURIER_STATUS.AVAILABLE,
    COURIER_STATUS.ON_ROUTE,
    COURIER_STATUS.OFFLINE,
  ],
  [COURIER_STATUS.ON_ROUTE]: [
    COURIER_STATUS.AVAILABLE,
    COURIER_STATUS.BUSY,
    COURIER_STATUS.OFFLINE,
  ],
  [COURIER_STATUS.OFFLINE]: [
    COURIER_STATUS.AVAILABLE,
    COURIER_STATUS.ACTIVE,
    COURIER_STATUS.INACTIVE,
  ],
  [COURIER_STATUS.INACTIVE]: [COURIER_STATUS.ACTIVE, COURIER_STATUS.SUSPENDED],
  [COURIER_STATUS.SUSPENDED]: [COURIER_STATUS.INACTIVE, COURIER_STATUS.ACTIVE],
  [COURIER_STATUS.ACTIVE]: [
    COURIER_STATUS.AVAILABLE,
    COURIER_STATUS.OFFLINE,
    COURIER_STATUS.INACTIVE,
  ],
};

/**
 * কুরিয়ার স্ট্যাটাস ট্রানজিশন টাইপ
 */
export type CourierStatusTransitions = typeof COURIER_STATUS_TRANSITIONS;

/**
 * কুরিয়ার স্ট্যাটাস কনফিগারেশন
 */
export const COURIER_STATUS_CONFIG = {
  STATUS: COURIER_STATUS,
  DESCRIPTIONS: COURIER_STATUS_DESCRIPTIONS,
  COLORS: COURIER_STATUS_COLORS,
  ICONS: COURIER_STATUS_ICONS,
  GROUPS: COURIER_STATUS_GROUPS,
  TRANSITIONS: COURIER_STATUS_TRANSITIONS,
  ACTIVE_STATUSES: ACTIVE_COURIER_STATUSES,
  INACTIVE_STATUSES: INACTIVE_COURIER_STATUSES,
} as const;

/**
 * কুরিয়ার স্ট্যাটাস কনফিগারেশন টাইপ
 */
export type CourierStatusConfig = typeof COURIER_STATUS_CONFIG;

/**
 * চেক করে যে কুরিয়ার স্ট্যাটাস অ্যাক্টিভ কিনা
 */
export function isCourierStatusActive(status: CourierStatus): boolean {
  return (ACTIVE_COURIER_STATUSES as readonly CourierStatus[]).includes(status);
}

/**
 * চেক করে যে কুরিয়ার স্ট্যাটাস ইনঅ্যাক্টিভ কিনা
 */
export function isCourierStatusInactive(status: CourierStatus): boolean {
  return (INACTIVE_COURIER_STATUSES as readonly CourierStatus[]).includes(status);
}

/**
 * দুটি কুরিয়ার স্ট্যাটাসের মধ্যে ট্রানজিশন সম্ভব কিনা চেক করে
 */
export function canCourierStatusTransition(from: CourierStatus, to: CourierStatus): boolean {
  const allowedTransitions = COURIER_STATUS_TRANSITIONS[from];
  return allowedTransitions.includes(to);
}

/**
 * কুরিয়ার স্ট্যাটাসের বিবরণ পাওয়া
 */
export function getCourierStatusDescription(status: CourierStatus): string {
  return COURIER_STATUS_DESCRIPTIONS[status];
}

/**
 * কুরিয়ার স্ট্যাটাসের রং পাওয়া
 */
export function getCourierStatusColor(status: CourierStatus): string {
  return COURIER_STATUS_COLORS[status];
}

/**
 * কুরিয়ার স্ট্যাটাসের আইকন পাওয়া
 */
export function getCourierStatusIcon(status: CourierStatus): string {
  return COURIER_STATUS_ICONS[status];
}
