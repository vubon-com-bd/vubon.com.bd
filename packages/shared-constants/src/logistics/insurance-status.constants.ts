/**
 * বীমার বিভিন্ন স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * বীমা স্ট্যাটাস
 */
export const INSURANCE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
  PENDING: 'pending',
  CLAIMED: 'claimed',
  SETTLED: 'settled',
  REJECTED: 'rejected',
} as const;

/**
 * বীমা স্ট্যাটাস টাইপ
 */
export type InsuranceStatus = (typeof INSURANCE_STATUS)[keyof typeof INSURANCE_STATUS];

/**
 * বীমা স্ট্যাটাসের বিবরণ
 */
export const INSURANCE_STATUS_DESCRIPTIONS: Record<InsuranceStatus, string> = {
  [INSURANCE_STATUS.ACTIVE]: 'সক্রিয় - বীমা সক্রিয় অবস্থায় আছে',
  [INSURANCE_STATUS.INACTIVE]: 'নিষ্ক্রিয় - বীমা সক্রিয় নয়',
  [INSURANCE_STATUS.EXPIRED]: 'মেয়াদোত্তীর্ণ - বীমার মেয়াদ শেষ হয়েছে',
  [INSURANCE_STATUS.PENDING]: 'পেন্ডিং - বীমা প্রক্রিয়াকরণের অপেক্ষায়',
  [INSURANCE_STATUS.CLAIMED]: 'দাবি করা হয়েছে - বীমা দাবি করা হয়েছে',
  [INSURANCE_STATUS.SETTLED]: 'নিষ্পত্তি হয়েছে - বীমা দাবি নিষ্পত্তি হয়েছে',
  [INSURANCE_STATUS.REJECTED]: 'প্রত্যাখ্যাত - বীমা দাবি প্রত্যাখ্যান করা হয়েছে',
};

/**
 * বীমা স্ট্যাটাসের রং (UI এর জন্য)
 */
export const INSURANCE_STATUS_COLORS: Record<InsuranceStatus, string> = {
  [INSURANCE_STATUS.ACTIVE]: '#2ECC71', // সবুজ
  [INSURANCE_STATUS.INACTIVE]: '#95A5A6', // ধূসর
  [INSURANCE_STATUS.EXPIRED]: '#E74C3C', // লাল
  [INSURANCE_STATUS.PENDING]: '#F39C12', // কমলা
  [INSURANCE_STATUS.CLAIMED]: '#3498DB', // নীল
  [INSURANCE_STATUS.SETTLED]: '#27AE60', // গাঢ় সবুজ
  [INSURANCE_STATUS.REJECTED]: '#E74C3C', // লাল
};

/**
 * বীমা স্ট্যাটাসের আইকন (UI এর জন্য)
 */
export const INSURANCE_STATUS_ICONS: Record<InsuranceStatus, string> = {
  [INSURANCE_STATUS.ACTIVE]: 'play',
  [INSURANCE_STATUS.INACTIVE]: 'pause',
  [INSURANCE_STATUS.EXPIRED]: 'clock',
  [INSURANCE_STATUS.PENDING]: 'spinner',
  [INSURANCE_STATUS.CLAIMED]: 'file-text',
  [INSURANCE_STATUS.SETTLED]: 'check-circle',
  [INSURANCE_STATUS.REJECTED]: 'times-circle',
};

/**
 * অ্যাক্টিভ বীমা স্ট্যাটাসসমূহ
 */
export const ACTIVE_INSURANCE_STATUSES: readonly InsuranceStatus[] = [
  INSURANCE_STATUS.ACTIVE,
  INSURANCE_STATUS.CLAIMED,
  INSURANCE_STATUS.PENDING,
] as const;

/**
 * টার্মিনাল বীমা স্ট্যাটাসসমূহ
 */
export const TERMINAL_INSURANCE_STATUSES: readonly InsuranceStatus[] = [
  INSURANCE_STATUS.SETTLED,
  INSURANCE_STATUS.REJECTED,
  INSURANCE_STATUS.EXPIRED,
] as const;

/**
 * বীমা স্ট্যাটাস গ্রুপ
 */
export const INSURANCE_STATUS_GROUPS = {
  ALL: Object.values(INSURANCE_STATUS),
  ACTIVE: ACTIVE_INSURANCE_STATUSES,
  TERMINAL: TERMINAL_INSURANCE_STATUSES,
} as const;

/**
 * বীমা স্ট্যাটাস গ্রুপ টাইপ
 */
export type InsuranceStatusGroup = typeof INSURANCE_STATUS_GROUPS;

/**
 * বীমা স্ট্যাটাস ট্রানজিশন
 */
export const INSURANCE_STATUS_TRANSITIONS: Record<InsuranceStatus, readonly InsuranceStatus[]> = {
  [INSURANCE_STATUS.PENDING]: [
    INSURANCE_STATUS.ACTIVE,
    INSURANCE_STATUS.INACTIVE,
    INSURANCE_STATUS.REJECTED,
  ],
  [INSURANCE_STATUS.ACTIVE]: [
    INSURANCE_STATUS.EXPIRED,
    INSURANCE_STATUS.CLAIMED,
    INSURANCE_STATUS.INACTIVE,
  ],
  [INSURANCE_STATUS.INACTIVE]: [INSURANCE_STATUS.ACTIVE, INSURANCE_STATUS.EXPIRED],
  [INSURANCE_STATUS.EXPIRED]: [INSURANCE_STATUS.ACTIVE, INSURANCE_STATUS.INACTIVE],
  [INSURANCE_STATUS.CLAIMED]: [INSURANCE_STATUS.SETTLED, INSURANCE_STATUS.REJECTED],
  [INSURANCE_STATUS.SETTLED]: [],
  [INSURANCE_STATUS.REJECTED]: [INSURANCE_STATUS.PENDING, INSURANCE_STATUS.ACTIVE],
};

/**
 * বীমা স্ট্যাটাস ট্রানজিশন টাইপ
 */
export type InsuranceStatusTransitions = typeof INSURANCE_STATUS_TRANSITIONS;

/**
 * বীমা স্ট্যাটাস কনফিগারেশন
 */
export const INSURANCE_STATUS_CONFIG = {
  STATUS: INSURANCE_STATUS,
  DESCRIPTIONS: INSURANCE_STATUS_DESCRIPTIONS,
  COLORS: INSURANCE_STATUS_COLORS,
  ICONS: INSURANCE_STATUS_ICONS,
  GROUPS: INSURANCE_STATUS_GROUPS,
  TRANSITIONS: INSURANCE_STATUS_TRANSITIONS,
  ACTIVE_STATUSES: ACTIVE_INSURANCE_STATUSES,
  TERMINAL_STATUSES: TERMINAL_INSURANCE_STATUSES,
} as const;

/**
 * বীমা স্ট্যাটাস কনফিগারেশন টাইপ
 */
export type InsuranceStatusConfig = typeof INSURANCE_STATUS_CONFIG;

/**
 * চেক করে যে বীমা স্ট্যাটাস অ্যাক্টিভ কিনা
 */
export function isInsuranceStatusActive(status: InsuranceStatus): boolean {
  return (ACTIVE_INSURANCE_STATUSES as readonly InsuranceStatus[]).includes(status);
}

/**
 * চেক করে যে বীমা স্ট্যাটাস টার্মিনাল কিনা
 */
export function isInsuranceStatusTerminal(status: InsuranceStatus): boolean {
  return (TERMINAL_INSURANCE_STATUSES as readonly InsuranceStatus[]).includes(status);
}

/**
 * দুটি বীমা স্ট্যাটাসের মধ্যে ট্রানজিশন সম্ভব কিনা চেক করে
 */
export function canInsuranceStatusTransition(from: InsuranceStatus, to: InsuranceStatus): boolean {
  const allowedTransitions = INSURANCE_STATUS_TRANSITIONS[from];
  return allowedTransitions.includes(to);
}

/**
 * বীমা স্ট্যাটাসের বিবরণ পাওয়া
 */
export function getInsuranceStatusDescription(status: InsuranceStatus): string {
  return INSURANCE_STATUS_DESCRIPTIONS[status];
}

/**
 * বীমা স্ট্যাটাসের রং পাওয়া
 */
export function getInsuranceStatusColor(status: InsuranceStatus): string {
  return INSURANCE_STATUS_COLORS[status];
}

/**
 * বীমা স্ট্যাটাসের আইকন পাওয়া
 */
export function getInsuranceStatusIcon(status: InsuranceStatus): string {
  return INSURANCE_STATUS_ICONS[status];
}

/**
 * বীমা দাবি করা যায় কিনা
 */
export function canClaimInsurance(status: InsuranceStatus): boolean {
  return status === INSURANCE_STATUS.ACTIVE || status === INSURANCE_STATUS.PENDING;
}

/**
 * বীমা পুনরায় সক্রিয় করা যায় কিনা
 */
export function canReactivateInsurance(status: InsuranceStatus): boolean {
  return (
    status === INSURANCE_STATUS.INACTIVE ||
    status === INSURANCE_STATUS.EXPIRED ||
    status === INSURANCE_STATUS.REJECTED
  );
}
