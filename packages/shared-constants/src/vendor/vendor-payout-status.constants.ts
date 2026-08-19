/**
 * পেআউট স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * পেআউট স্ট্যাটাস অবজেক্ট
 */
export const PayoutStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
  CANCELLED: 'CANCELLED',
  HOLD: 'HOLD',
  RELEASED: 'RELEASED',
} as const;

/**
 * পেআউট স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type PayoutStatusValue = (typeof PayoutStatus)[keyof typeof PayoutStatus];

/**
 * পেআউট স্ট্যাটাস লেবেলসমূহ
 */
export const PayoutStatusLabels: Record<PayoutStatusValue, { en: string; bn: string }> = {
  [PayoutStatus.PENDING]: {
    en: 'Pending',
    bn: 'অপেক্ষমাণ',
  },
  [PayoutStatus.PROCESSING]: {
    en: 'Processing',
    bn: 'প্রক্রিয়াধীন',
  },
  [PayoutStatus.COMPLETED]: {
    en: 'Completed',
    bn: 'সম্পন্ন',
  },
  [PayoutStatus.FAILED]: {
    en: 'Failed',
    bn: 'ব্যর্থ',
  },
  [PayoutStatus.REFUNDED]: {
    en: 'Refunded',
    bn: 'ফেরত',
  },
  [PayoutStatus.CANCELLED]: {
    en: 'Cancelled',
    bn: 'বাতিল',
  },
  [PayoutStatus.HOLD]: {
    en: 'Hold',
    bn: 'হোল্ড',
  },
  [PayoutStatus.RELEASED]: {
    en: 'Released',
    bn: 'রিলিজ',
  },
};

/**
 * পেআউট স্ট্যাটাস রঙ কোডসমূহ (Tailwind CSS ক্লাস)
 */
export const PayoutStatusColors: Record<PayoutStatusValue, string> = {
  [PayoutStatus.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [PayoutStatus.PROCESSING]: 'bg-blue-100 text-blue-800 border-blue-300',
  [PayoutStatus.COMPLETED]: 'bg-green-100 text-green-800 border-green-300',
  [PayoutStatus.FAILED]: 'bg-red-100 text-red-800 border-red-300',
  [PayoutStatus.REFUNDED]: 'bg-purple-100 text-purple-800 border-purple-300',
  [PayoutStatus.CANCELLED]: 'bg-gray-100 text-gray-800 border-gray-300',
  [PayoutStatus.HOLD]: 'bg-orange-100 text-orange-800 border-orange-300',
  [PayoutStatus.RELEASED]: 'bg-teal-100 text-teal-800 border-teal-300',
};

/**
 * পেআউট স্ট্যাটাস বিবরণসমূহ
 */
export const PayoutStatusDescriptions: Record<PayoutStatusValue, string> = {
  [PayoutStatus.PENDING]: 'Payout request is pending for processing',
  [PayoutStatus.PROCESSING]: 'Payout is being processed',
  [PayoutStatus.COMPLETED]: 'Payout has been completed successfully',
  [PayoutStatus.FAILED]: 'Payout has failed',
  [PayoutStatus.REFUNDED]: 'Payout has been refunded',
  [PayoutStatus.CANCELLED]: 'Payout has been cancelled',
  [PayoutStatus.HOLD]: 'Payout is on hold due to review',
  [PayoutStatus.RELEASED]: 'Payout has been released',
};

/**
 * পেআউট স্ট্যাটাস ট্রানজিশন রুলস
 * কোন স্ট্যাটাস থেকে কোন স্ট্যাটাসে যাওয়া যায়
 */
export const PayoutStatusTransitions: Record<PayoutStatusValue, PayoutStatusValue[]> = {
  [PayoutStatus.PENDING]: [PayoutStatus.PROCESSING, PayoutStatus.CANCELLED, PayoutStatus.HOLD],
  [PayoutStatus.PROCESSING]: [PayoutStatus.COMPLETED, PayoutStatus.FAILED, PayoutStatus.HOLD],
  [PayoutStatus.COMPLETED]: [PayoutStatus.REFUNDED],
  [PayoutStatus.FAILED]: [PayoutStatus.PENDING, PayoutStatus.CANCELLED],
  [PayoutStatus.REFUNDED]: [],
  [PayoutStatus.CANCELLED]: [],
  [PayoutStatus.HOLD]: [PayoutStatus.PROCESSING, PayoutStatus.CANCELLED],
  [PayoutStatus.RELEASED]: [PayoutStatus.COMPLETED],
};

/**
 * পেআউট সম্পন্ন স্ট্যাটাসসমূহ
 */
export const COMPLETED_PAYOUT_STATUSES: PayoutStatusValue[] = [
  PayoutStatus.COMPLETED,
  PayoutStatus.REFUNDED,
] as const;

/**
 * পেআউট প্রক্রিয়াধীন স্ট্যাটাসসমূহ
 */
export const IN_PROGRESS_PAYOUT_STATUSES: PayoutStatusValue[] = [
  PayoutStatus.PENDING,
  PayoutStatus.PROCESSING,
  PayoutStatus.HOLD,
] as const;

/**
 * পেআউট ব্যর্থ স্ট্যাটাসসমূহ
 */
export const FAILED_PAYOUT_STATUSES: PayoutStatusValue[] = [
  PayoutStatus.FAILED,
  PayoutStatus.CANCELLED,
] as const;
