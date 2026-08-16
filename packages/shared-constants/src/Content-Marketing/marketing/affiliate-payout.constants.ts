/**
 * অ্যাফিলিয়েট পেমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * পেআউট পদ্ধতিসমূহ
 */
export const PAYOUT_METHODS = ['bank-transfer', 'paypal', 'stripe', 'check'] as const;

/**
 * সর্বনিম্ন পেআউট পরিমাণ
 */
export const MIN_PAYOUT_AMOUNT = 100;

/**
 * সর্বোচ্চ পেআউট পরিমাণ
 */
export const MAX_PAYOUT_AMOUNT = 100000;

/**
 * পেআউট পদ্ধতি টাইপ
 */
export type PayoutMethod = (typeof PAYOUT_METHODS)[number];

/**
 * পেআউট পদ্ধতির লেবেল (বাংলা এবং ইংরেজি)
 */
export const PAYOUT_METHOD_LABELS = {
  'bank-transfer': {
    en: 'Bank Transfer',
    bn: 'ব্যাংক ট্রান্সফার',
  },
  paypal: {
    en: 'PayPal',
    bn: 'পেপ্যাল',
  },
  stripe: {
    en: 'Stripe',
    bn: 'স্ট্রাইপ',
  },
  check: {
    en: 'Check',
    bn: 'চেক',
  },
} as const satisfies Record<PayoutMethod, { en: string; bn: string }>;

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * পেআউট ইন্টারফেস
 */
export interface PayoutInterface {
  id: string;
  affiliateId: string;
  amount: number;
  method: PayoutMethod;
  status: PayoutStatus;
  date: Date;
  transactionId?: string;
  notes?: string;
  metadata?: PayoutMetadata;
}

/**
 * পেআউট স্ট্যাটাস টাইপ
 */
export type PayoutStatus = 'pending' | 'processing' | 'completed' | 'failed';

/**
 * পেআউট মেটাডেটা ইন্টারফেস
 */
export interface PayoutMetadata {
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
  routingNumber?: string;
  paypalEmail?: string;
  stripeAccountId?: string;
  checkNumber?: string;
  processingFee?: number;
}

/**
 * পেআউট তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreatePayoutInput {
  affiliateId: string;
  amount: number;
  method: PayoutMethod;
  notes?: string;
  metadata?: PayoutMetadata;
}

/**
 * পেআউট আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdatePayoutInput {
  status?: PayoutStatus;
  transactionId?: string;
  notes?: string;
  metadata?: PayoutMetadata;
}

/**
 * পেআউট ফিল্টার ইন্টারফেস
 */
export interface PayoutFilter {
  affiliateId?: string;
  status?: PayoutStatus;
  method?: PayoutMethod;
  minAmount?: number;
  maxAmount?: number;
  fromDate?: Date;
  toDate?: Date;
  limit?: number;
  offset?: number;
}

/**
 * নির্দিষ্ট পেআউট পদ্ধতির লেবেল পাওয়ার ফাংশন
 */
export function getPayoutMethodLabel(method: PayoutMethod, lang: Language = 'en'): string {
  return PAYOUT_METHOD_LABELS[method][lang];
}

/**
 * পেআউট পদ্ধতি বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPayoutMethod(method: string): method is PayoutMethod {
  return PAYOUT_METHODS.includes(method as PayoutMethod);
}

/**
 * সব পেআউট পদ্ধতির তালিকা পাওয়ার ফাংশন
 */
export function getAllPayoutMethods(): readonly PayoutMethod[] {
  return PAYOUT_METHODS;
}

/**
 * পেআউট পরিমাণ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPayoutAmount(amount: number): boolean {
  return typeof amount === 'number' && amount >= MIN_PAYOUT_AMOUNT && amount <= MAX_PAYOUT_AMOUNT;
}

/**
 * পেআউট স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPayoutStatus(status: string): status is PayoutStatus {
  return ['pending', 'processing', 'completed', 'failed'].includes(status);
}

/**
 * পেআউট স্ট্যাটাসের লেবেল পাওয়ার ফাংশন
 */
export function getPayoutStatusLabel(status: PayoutStatus, lang: Language = 'en'): string {
  const labels: Record<PayoutStatus, { en: string; bn: string }> = {
    pending: {
      en: 'Pending',
      bn: 'অপেক্ষমাণ',
    },
    processing: {
      en: 'Processing',
      bn: 'প্রক্রিয়াধীন',
    },
    completed: {
      en: 'Completed',
      bn: 'সম্পন্ন',
    },
    failed: {
      en: 'Failed',
      bn: 'ব্যর্থ',
    },
  };
  return labels[status][lang];
}

/**
 * পেআউট পদ্ধতির আইকন পাওয়ার ফাংশন
 */
export function getPayoutMethodIcon(method: PayoutMethod): string {
  const icons: Record<PayoutMethod, string> = {
    'bank-transfer': '🏦',
    paypal: '💳',
    stripe: '⚡',
    check: '📝',
  };
  return icons[method];
}

/**
 * পেআউট পদ্ধতির বিবরণ পাওয়ার ফাংশন
 */
export function getPayoutMethodDescription(method: PayoutMethod, lang: Language = 'en'): string {
  const descriptions: Record<PayoutMethod, { en: string; bn: string }> = {
    'bank-transfer': {
      en: 'Direct transfer to bank account',
      bn: 'ব্যাংক অ্যাকাউন্টে সরাসরি ট্রান্সফার',
    },
    paypal: {
      en: 'Payment via PayPal',
      bn: 'পেপ্যালের মাধ্যমে পেমেন্ট',
    },
    stripe: {
      en: 'Payment via Stripe',
      bn: 'স্ট্রাইপের মাধ্যমে পেমেন্ট',
    },
    check: {
      en: 'Physical check mailed to address',
      bn: 'ঠিকানায় মেইল করা ফিজিক্যাল চেক',
    },
  };
  return descriptions[method][lang];
}

/**
 * পেআউট সম্পন্ন হয়েছে কিনা চেক করার ফাংশন
 */
export function isPayoutCompleted(status: PayoutStatus): boolean {
  return status === 'completed';
}

/**
 * পেআউট ব্যর্থ হয়েছে কিনা চেক করার ফাংশন
 */
export function isPayoutFailed(status: PayoutStatus): boolean {
  return status === 'failed';
}

/**
 * পেআউট প্রক্রিয়াধীন কিনা চেক করার ফাংশন
 */
export function isPayoutProcessing(status: PayoutStatus): boolean {
  return status === 'processing' || status === 'pending';
}

/**
 * ডিফল্ট পেআউট পদ্ধতি পাওয়ার ফাংশন
 */
export function getDefaultPayoutMethod(): PayoutMethod {
  return 'bank-transfer';
}
