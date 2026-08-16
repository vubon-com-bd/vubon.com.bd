/**
 * অ্যাফিলিয়েট কমিশন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * কমিশনের ধরনসমূহ
 */
export const COMMISSION_TYPES = ['percentage', 'fixed'] as const;

/**
 * ডিফল্ট কমিশন টাইপ
 */
export const DEFAULT_COMMISSION_TYPE = 'percentage' as const;

/**
 * কমিশন পেআউট শিডিউলসমূহ
 */
export const COMMISSION_PAYOUT_SCHEDULES = ['daily', 'weekly', 'monthly'] as const;

/**
 * কমিশন টাইপ টাইপ
 */
export type CommissionType = (typeof COMMISSION_TYPES)[number];

/**
 * কমিশন পেআউট শিডিউল টাইপ
 */
export type CommissionPayoutSchedule = (typeof COMMISSION_PAYOUT_SCHEDULES)[number];

/**
 * কমিশন টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const COMMISSION_TYPE_LABELS = {
  percentage: {
    en: 'Percentage Commission',
    bn: 'শতাংশ কমিশন',
  },
  fixed: {
    en: 'Fixed Amount Commission',
    bn: 'নির্দিষ্ট পরিমাণ কমিশন',
  },
} as const satisfies Record<CommissionType, { en: string; bn: string }>;

/**
 * কমিশন পেআউট শিডিউলের লেবেল (বাংলা এবং ইংরেজি)
 */
export const COMMISSION_PAYOUT_LABELS = {
  daily: {
    en: 'Daily',
    bn: 'দৈনিক',
  },
  weekly: {
    en: 'Weekly',
    bn: 'সাপ্তাহিক',
  },
  monthly: {
    en: 'Monthly',
    bn: 'মাসিক',
  },
} as const satisfies Record<CommissionPayoutSchedule, { en: string; bn: string }>;

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * কমিশন ইন্টারফেস
 */
export interface CommissionInterface {
  type: CommissionType;
  rate: number;
  minAmount?: number;
  maxAmount?: number;
  payoutSchedule: CommissionPayoutSchedule;
  nextPayoutDate?: Date;
}

/**
 * নির্দিষ্ট কমিশন টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getCommissionTypeLabel(type: CommissionType, lang: Language = 'en'): string {
  return COMMISSION_TYPE_LABELS[type][lang];
}

/**
 * কমিশন টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidCommissionType(type: string): type is CommissionType {
  return COMMISSION_TYPES.includes(type as CommissionType);
}

/**
 * কমিশন পেআউট শিডিউল বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPayoutSchedule(schedule: string): schedule is CommissionPayoutSchedule {
  return COMMISSION_PAYOUT_SCHEDULES.includes(schedule as CommissionPayoutSchedule);
}

/**
 * পেআউট শিডিউলের লেবেল পাওয়ার ফাংশন
 */
export function getPayoutScheduleLabel(
  schedule: CommissionPayoutSchedule,
  lang: Language = 'en'
): string {
  return COMMISSION_PAYOUT_LABELS[schedule][lang];
}

/**
 * সব কমিশন টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllCommissionTypes(): readonly CommissionType[] {
  return COMMISSION_TYPES;
}

/**
 * সব পেআউট শিডিউলের তালিকা পাওয়ার ফাংশন
 */
export function getAllPayoutSchedules(): readonly CommissionPayoutSchedule[] {
  return COMMISSION_PAYOUT_SCHEDULES;
}

/**
 * ডিফল্ট কমিশন টাইপ পাওয়ার ফাংশন
 */
export function getDefaultCommissionType(): CommissionType {
  return DEFAULT_COMMISSION_TYPE;
}

/**
 * কমিশন শতাংশ টাইপ কিনা চেক করার ফাংশন
 */
export function isPercentageCommission(type: CommissionType): boolean {
  return type === 'percentage';
}

/**
 * কমিশন ফিক্সড টাইপ কিনা চেক করার ফাংশন
 */
export function isFixedCommission(type: CommissionType): boolean {
  return type === 'fixed';
}

/**
 * পেআউট শিডিউল ডেইলি কিনা চেক করার ফাংশন
 */
export function isDailyPayout(schedule: CommissionPayoutSchedule): boolean {
  return schedule === 'daily';
}

/**
 * পেআউট শিডিউল উইকলি কিনা চেক করার ফাংশন
 */
export function isWeeklyPayout(schedule: CommissionPayoutSchedule): boolean {
  return schedule === 'weekly';
}

/**
 * পেআউট শিডিউল মান্থলি কিনা চেক করার ফাংশন
 */
export function isMonthlyPayout(schedule: CommissionPayoutSchedule): boolean {
  return schedule === 'monthly';
}

/**
 * কমিশন গণনা করার ফাংশন
 */
export function calculateCommission(amount: number, type: CommissionType, rate: number): number {
  if (type === 'percentage') {
    return (amount * rate) / 100;
  }
  return rate;
}

/**
 * কমিশনের জন্য ন্যূনতম পরিমাণ চেক করার ফাংশন
 */
export function isCommissionValid(commission: CommissionInterface, amount: number): boolean {
  if (commission.minAmount !== undefined && amount < commission.minAmount) {
    return false;
  }
  if (commission.maxAmount !== undefined && amount > commission.maxAmount) {
    return false;
  }
  return true;
}

/**
 * ডিফল্ট কমিশন তৈরি করার ফাংশন
 */
export function createDefaultCommission(): CommissionInterface {
  return {
    type: DEFAULT_COMMISSION_TYPE,
    rate: 10,
    payoutSchedule: 'monthly',
  };
}

/**
 * পেআউট শিডিউলের আইকন পাওয়ার ফাংশন
 */
export function getPayoutScheduleIcon(schedule: CommissionPayoutSchedule): string {
  const icons: Record<CommissionPayoutSchedule, string> = {
    daily: '📅',
    weekly: '📆',
    monthly: '📊',
  };
  return icons[schedule];
}

/**
 * কমিশন টাইপের আইকন পাওয়ার ফাংশন
 */
export function getCommissionTypeIcon(type: CommissionType): string {
  const icons: Record<CommissionType, string> = {
    percentage: '%',
    fixed: '💰',
  };
  return icons[type];
}
