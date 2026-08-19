/**
 * গুদামের বিভিন্ন স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * ওয়্যারহাউস স্ট্যাটাস
 */
export const WAREHOUSE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
  FULL: 'full',
  CLOSED: 'closed',
  UNDER_CONSTRUCTION: 'under_construction',
} as const;

/**
 * ওয়্যারহাউস স্ট্যাটাস টাইপ
 */
export type WarehouseStatus = (typeof WAREHOUSE_STATUS)[keyof typeof WAREHOUSE_STATUS];

/**
 * ওয়্যারহাউস স্ট্যাটাসের বিবরণ
 */
export const WAREHOUSE_STATUS_DESCRIPTIONS: Record<WarehouseStatus, string> = {
  [WAREHOUSE_STATUS.ACTIVE]: 'সক্রিয় - গুদাম সম্পূর্ণ কার্যকরী',
  [WAREHOUSE_STATUS.INACTIVE]: 'নিষ্ক্রিয় - গুদাম বর্তমানে সক্রিয় নয়',
  [WAREHOUSE_STATUS.MAINTENANCE]: 'রক্ষণাবেক্ষণ - গুদাম রক্ষণাবেক্ষণে রয়েছে',
  [WAREHOUSE_STATUS.FULL]: 'পূর্ণ - গুদামের স্টোরেজ ক্ষমতা পূর্ণ',
  [WAREHOUSE_STATUS.CLOSED]: 'বন্ধ - গুদাম বন্ধ করা হয়েছে',
  [WAREHOUSE_STATUS.UNDER_CONSTRUCTION]: 'নির্মাণাধীন - গুদাম নির্মাণ চলছে',
};

/**
 * ওয়্যারহাউস স্ট্যাটাসের রং (UI এর জন্য)
 */
export const WAREHOUSE_STATUS_COLORS: Record<WarehouseStatus, string> = {
  [WAREHOUSE_STATUS.ACTIVE]: '#2ECC71', // সবুজ
  [WAREHOUSE_STATUS.INACTIVE]: '#95A5A6', // ধূসর
  [WAREHOUSE_STATUS.MAINTENANCE]: '#F39C12', // কমলা
  [WAREHOUSE_STATUS.FULL]: '#E74C3C', // লাল
  [WAREHOUSE_STATUS.CLOSED]: '#7F8C8D', // গাঢ় ধূসর
  [WAREHOUSE_STATUS.UNDER_CONSTRUCTION]: '#3498DB', // নীল
};

/**
 * ওয়্যারহাউস স্ট্যাটাসের আইকন (UI এর জন্য)
 */
export const WAREHOUSE_STATUS_ICONS: Record<WarehouseStatus, string> = {
  [WAREHOUSE_STATUS.ACTIVE]: 'play',
  [WAREHOUSE_STATUS.INACTIVE]: 'pause',
  [WAREHOUSE_STATUS.MAINTENANCE]: 'wrench',
  [WAREHOUSE_STATUS.FULL]: 'exclamation-circle',
  [WAREHOUSE_STATUS.CLOSED]: 'times-circle',
  [WAREHOUSE_STATUS.UNDER_CONSTRUCTION]: 'building',
};

/**
 * অ্যাক্টিভ ওয়্যারহাউস স্ট্যাটাসসমূহ
 */
export const ACTIVE_WAREHOUSE_STATUSES: readonly WarehouseStatus[] = [
  WAREHOUSE_STATUS.ACTIVE,
  WAREHOUSE_STATUS.MAINTENANCE,
  WAREHOUSE_STATUS.FULL,
] as const;

/**
 * ইনঅ্যাক্টিভ ওয়্যারহাউস স্ট্যাটাসসমূহ
 */
export const INACTIVE_WAREHOUSE_STATUSES: readonly WarehouseStatus[] = [
  WAREHOUSE_STATUS.INACTIVE,
  WAREHOUSE_STATUS.CLOSED,
  WAREHOUSE_STATUS.UNDER_CONSTRUCTION,
] as const;

/**
 * ওয়্যারহাউস স্ট্যাটাস গ্রুপ
 */
export const WAREHOUSE_STATUS_GROUPS = {
  ALL: Object.values(WAREHOUSE_STATUS),
  ACTIVE: ACTIVE_WAREHOUSE_STATUSES,
  INACTIVE: INACTIVE_WAREHOUSE_STATUSES,
} as const;

/**
 * ওয়্যারহাউস স্ট্যাটাস গ্রুপ টাইপ
 */
export type WarehouseStatusGroup = typeof WAREHOUSE_STATUS_GROUPS;

/**
 * ওয়্যারহাউস স্ট্যাটাস ট্রানজিশন
 */
export const WAREHOUSE_STATUS_TRANSITIONS: Record<WarehouseStatus, readonly WarehouseStatus[]> = {
  [WAREHOUSE_STATUS.ACTIVE]: [
    WAREHOUSE_STATUS.MAINTENANCE,
    WAREHOUSE_STATUS.FULL,
    WAREHOUSE_STATUS.INACTIVE,
  ],
  [WAREHOUSE_STATUS.INACTIVE]: [
    WAREHOUSE_STATUS.ACTIVE,
    WAREHOUSE_STATUS.CLOSED,
    WAREHOUSE_STATUS.UNDER_CONSTRUCTION,
  ],
  [WAREHOUSE_STATUS.MAINTENANCE]: [WAREHOUSE_STATUS.ACTIVE, WAREHOUSE_STATUS.INACTIVE],
  [WAREHOUSE_STATUS.FULL]: [WAREHOUSE_STATUS.ACTIVE, WAREHOUSE_STATUS.INACTIVE],
  [WAREHOUSE_STATUS.CLOSED]: [WAREHOUSE_STATUS.UNDER_CONSTRUCTION, WAREHOUSE_STATUS.INACTIVE],
  [WAREHOUSE_STATUS.UNDER_CONSTRUCTION]: [WAREHOUSE_STATUS.ACTIVE, WAREHOUSE_STATUS.INACTIVE],
};

/**
 * ওয়্যারহাউস স্ট্যাটাস ট্রানজিশন টাইপ
 */
export type WarehouseStatusTransitions = typeof WAREHOUSE_STATUS_TRANSITIONS;

/**
 * ওয়্যারহাউস স্ট্যাটাস কনফিগারেশন
 */
export const WAREHOUSE_STATUS_CONFIG = {
  STATUS: WAREHOUSE_STATUS,
  DESCRIPTIONS: WAREHOUSE_STATUS_DESCRIPTIONS,
  COLORS: WAREHOUSE_STATUS_COLORS,
  ICONS: WAREHOUSE_STATUS_ICONS,
  GROUPS: WAREHOUSE_STATUS_GROUPS,
  TRANSITIONS: WAREHOUSE_STATUS_TRANSITIONS,
  ACTIVE_STATUSES: ACTIVE_WAREHOUSE_STATUSES,
  INACTIVE_STATUSES: INACTIVE_WAREHOUSE_STATUSES,
} as const;

/**
 * ওয়্যারহাউস স্ট্যাটাস কনফিগারেশন টাইপ
 */
export type WarehouseStatusConfig = typeof WAREHOUSE_STATUS_CONFIG;

/**
 * চেক করে যে ওয়্যারহাউস স্ট্যাটাস অ্যাক্টিভ কিনা
 */
export function isWarehouseStatusActive(status: WarehouseStatus): boolean {
  return (ACTIVE_WAREHOUSE_STATUSES as readonly WarehouseStatus[]).includes(status);
}

/**
 * চেক করে যে ওয়্যারহাউস স্ট্যাটাস ইনঅ্যাক্টিভ কিনা
 */
export function isWarehouseStatusInactive(status: WarehouseStatus): boolean {
  return (INACTIVE_WAREHOUSE_STATUSES as readonly WarehouseStatus[]).includes(status);
}

/**
 * দুটি ওয়্যারহাউস স্ট্যাটাসের মধ্যে ট্রানজিশন সম্ভব কিনা চেক করে
 */
export function canWarehouseStatusTransition(from: WarehouseStatus, to: WarehouseStatus): boolean {
  const allowedTransitions = WAREHOUSE_STATUS_TRANSITIONS[from];
  return allowedTransitions.includes(to);
}

/**
 * ওয়্যারহাউস স্ট্যাটাসের বিবরণ পাওয়া
 */
export function getWarehouseStatusDescription(status: WarehouseStatus): string {
  return WAREHOUSE_STATUS_DESCRIPTIONS[status];
}

/**
 * ওয়্যারহাউস স্ট্যাটাসের রং পাওয়া
 */
export function getWarehouseStatusColor(status: WarehouseStatus): string {
  return WAREHOUSE_STATUS_COLORS[status];
}

/**
 * ওয়্যারহাউস স্ট্যাটাসের আইকন পাওয়া
 */
export function getWarehouseStatusIcon(status: WarehouseStatus): string {
  return WAREHOUSE_STATUS_ICONS[status];
}
