/**
 * ড্রাইভারের বিভিন্ন স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * ড্রাইভার স্ট্যাটাস
 */
export const DRIVER_STATUS = {
  AVAILABLE: 'available',
  ON_DUTY: 'on_duty',
  ON_ROUTE: 'on_route',
  BREAK: 'break',
  OFFLINE: 'offline',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
} as const;

/**
 * ড্রাইভার স্ট্যাটাস টাইপ
 */
export type DriverStatus = (typeof DRIVER_STATUS)[keyof typeof DRIVER_STATUS];

/**
 * ড্রাইভার স্ট্যাটাসের বিবরণ
 */
export const DRIVER_STATUS_DESCRIPTIONS: Record<DriverStatus, string> = {
  [DRIVER_STATUS.AVAILABLE]: 'উপলব্ধ - ড্রাইভার কাজের জন্য প্রস্তুত',
  [DRIVER_STATUS.ON_DUTY]: 'ডিউটিতে - ড্রাইভার ডিউটিতে রয়েছে',
  [DRIVER_STATUS.ON_ROUTE]: 'রুটে - ড্রাইভার ডেলিভারি রুটে রয়েছে',
  [DRIVER_STATUS.BREAK]: 'বিরতি - ড্রাইভার বিরতিতে রয়েছে',
  [DRIVER_STATUS.OFFLINE]: 'অফলাইন - ড্রাইভার সিস্টেমে লগইন নেই',
  [DRIVER_STATUS.INACTIVE]: 'নিষ্ক্রিয় - ড্রাইভার সক্রিয় নয়',
  [DRIVER_STATUS.SUSPENDED]: 'স্থগিত - ড্রাইভারের কার্যক্রম স্থগিত',
};

/**
 * ড্রাইভার স্ট্যাটাসের রং (UI এর জন্য)
 */
export const DRIVER_STATUS_COLORS: Record<DriverStatus, string> = {
  [DRIVER_STATUS.AVAILABLE]: '#2ECC71', // সবুজ
  [DRIVER_STATUS.ON_DUTY]: '#3498DB', // নীল
  [DRIVER_STATUS.ON_ROUTE]: '#F39C12', // কমলা
  [DRIVER_STATUS.BREAK]: '#9B59B6', // বেগুনি
  [DRIVER_STATUS.OFFLINE]: '#95A5A6', // ধূসর
  [DRIVER_STATUS.INACTIVE]: '#7F8C8D', // গাঢ় ধূসর
  [DRIVER_STATUS.SUSPENDED]: '#E74C3C', // লাল
};

/**
 * ড্রাইভার স্ট্যাটাসের আইকন (UI এর জন্য)
 */
export const DRIVER_STATUS_ICONS: Record<DriverStatus, string> = {
  [DRIVER_STATUS.AVAILABLE]: 'check-circle',
  [DRIVER_STATUS.ON_DUTY]: 'clock',
  [DRIVER_STATUS.ON_ROUTE]: 'truck',
  [DRIVER_STATUS.BREAK]: 'coffee',
  [DRIVER_STATUS.OFFLINE]: 'power-off',
  [DRIVER_STATUS.INACTIVE]: 'pause',
  [DRIVER_STATUS.SUSPENDED]: 'ban',
};

/**
 * অ্যাক্টিভ ড্রাইভার স্ট্যাটাসসমূহ
 */
export const ACTIVE_DRIVER_STATUSES: readonly DriverStatus[] = [
  DRIVER_STATUS.AVAILABLE,
  DRIVER_STATUS.ON_DUTY,
  DRIVER_STATUS.ON_ROUTE,
  DRIVER_STATUS.BREAK,
] as const;

/**
 * ইনঅ্যাক্টিভ ড্রাইভার স্ট্যাটাসসমূহ
 */
export const INACTIVE_DRIVER_STATUSES: readonly DriverStatus[] = [
  DRIVER_STATUS.OFFLINE,
  DRIVER_STATUS.INACTIVE,
  DRIVER_STATUS.SUSPENDED,
] as const;

/**
 * ড্রাইভার স্ট্যাটাস গ্রুপ
 */
export const DRIVER_STATUS_GROUPS = {
  ALL: Object.values(DRIVER_STATUS),
  ACTIVE: ACTIVE_DRIVER_STATUSES,
  INACTIVE: INACTIVE_DRIVER_STATUSES,
} as const;

/**
 * ড্রাইভার স্ট্যাটাস গ্রুপ টাইপ
 */
export type DriverStatusGroup = typeof DRIVER_STATUS_GROUPS;

/**
 * ড্রাইভার স্ট্যাটাস ট্রানজিশন
 */
export const DRIVER_STATUS_TRANSITIONS: Record<DriverStatus, readonly DriverStatus[]> = {
  [DRIVER_STATUS.AVAILABLE]: [DRIVER_STATUS.ON_DUTY, DRIVER_STATUS.OFFLINE, DRIVER_STATUS.INACTIVE],
  [DRIVER_STATUS.ON_DUTY]: [
    DRIVER_STATUS.ON_ROUTE,
    DRIVER_STATUS.BREAK,
    DRIVER_STATUS.OFFLINE,
    DRIVER_STATUS.INACTIVE,
  ],
  [DRIVER_STATUS.ON_ROUTE]: [
    DRIVER_STATUS.ON_DUTY,
    DRIVER_STATUS.BREAK,
    DRIVER_STATUS.OFFLINE,
    DRIVER_STATUS.INACTIVE,
  ],
  [DRIVER_STATUS.BREAK]: [DRIVER_STATUS.ON_DUTY, DRIVER_STATUS.OFFLINE, DRIVER_STATUS.INACTIVE],
  [DRIVER_STATUS.OFFLINE]: [DRIVER_STATUS.AVAILABLE, DRIVER_STATUS.INACTIVE],
  [DRIVER_STATUS.INACTIVE]: [DRIVER_STATUS.AVAILABLE, DRIVER_STATUS.SUSPENDED],
  [DRIVER_STATUS.SUSPENDED]: [DRIVER_STATUS.INACTIVE, DRIVER_STATUS.AVAILABLE],
};

/**
 * ড্রাইভার স্ট্যাটাস ট্রানজিশন টাইপ
 */
export type DriverStatusTransitions = typeof DRIVER_STATUS_TRANSITIONS;

/**
 * ড্রাইভার স্ট্যাটাস কনফিগারেশন
 */
export const DRIVER_STATUS_CONFIG = {
  STATUS: DRIVER_STATUS,
  DESCRIPTIONS: DRIVER_STATUS_DESCRIPTIONS,
  COLORS: DRIVER_STATUS_COLORS,
  ICONS: DRIVER_STATUS_ICONS,
  GROUPS: DRIVER_STATUS_GROUPS,
  TRANSITIONS: DRIVER_STATUS_TRANSITIONS,
  ACTIVE_STATUSES: ACTIVE_DRIVER_STATUSES,
  INACTIVE_STATUSES: INACTIVE_DRIVER_STATUSES,
} as const;

/**
 * ড্রাইভার স্ট্যাটাস কনফিগারেশন টাইপ
 */
export type DriverStatusConfig = typeof DRIVER_STATUS_CONFIG;

/**
 * চেক করে যে ড্রাইভার স্ট্যাটাস অ্যাক্টিভ কিনা
 */
export function isDriverStatusActive(status: DriverStatus): boolean {
  return (ACTIVE_DRIVER_STATUSES as readonly DriverStatus[]).includes(status);
}

/**
 * চেক করে যে ড্রাইভার স্ট্যাটাস ইনঅ্যাক্টিভ কিনা
 */
export function isDriverStatusInactive(status: DriverStatus): boolean {
  return (INACTIVE_DRIVER_STATUSES as readonly DriverStatus[]).includes(status);
}

/**
 * দুটি ড্রাইভার স্ট্যাটাসের মধ্যে ট্রানজিশন সম্ভব কিনা চেক করে
 */
export function canDriverStatusTransition(from: DriverStatus, to: DriverStatus): boolean {
  const allowedTransitions = DRIVER_STATUS_TRANSITIONS[from];
  return allowedTransitions.includes(to);
}

/**
 * ড্রাইভার স্ট্যাটাসের বিবরণ পাওয়া
 */
export function getDriverStatusDescription(status: DriverStatus): string {
  return DRIVER_STATUS_DESCRIPTIONS[status];
}

/**
 * ড্রাইভার স্ট্যাটাসের রং পাওয়া
 */
export function getDriverStatusColor(status: DriverStatus): string {
  return DRIVER_STATUS_COLORS[status];
}

/**
 * ড্রাইভার স্ট্যাটাসের আইকন পাওয়া
 */
export function getDriverStatusIcon(status: DriverStatus): string {
  return DRIVER_STATUS_ICONS[status];
}

/**
 * ড্রাইভার কাজের জন্য প্রস্তুত কিনা
 */
export function isDriverReadyForWork(status: DriverStatus): boolean {
  return (
    status === DRIVER_STATUS.AVAILABLE ||
    status === DRIVER_STATUS.ON_DUTY ||
    status === DRIVER_STATUS.ON_ROUTE
  );
}

/**
 * ড্রাইভার বিরতিতে আছে কিনা
 */
export function isDriverOnBreak(status: DriverStatus): boolean {
  return status === DRIVER_STATUS.BREAK;
}

/**
 * ড্রাইভার সক্রিয় করা যাবে কিনা
 */
export function canDriverBeActivated(status: DriverStatus): boolean {
  return (
    status === DRIVER_STATUS.INACTIVE ||
    status === DRIVER_STATUS.SUSPENDED ||
    status === DRIVER_STATUS.OFFLINE
  );
}
