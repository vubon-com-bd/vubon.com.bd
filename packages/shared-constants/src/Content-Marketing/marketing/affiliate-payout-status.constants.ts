/**
 * অ্যাফিলিয়েট পেমেন্টের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * পেমেন্টের সব স্ট্যাটাস
 */
export const PAYOUT_STATUSES = [
  'pending',
  'processing',
  'completed',
  'failed',
  'cancelled',
] as const;

/**
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const PAYOUT_STATUS_COLORS = {
  pending: 'yellow',
  processing: 'blue',
  completed: 'green',
  failed: 'red',
  cancelled: 'gray',
} as const satisfies Record<(typeof PAYOUT_STATUSES)[number], string>;

/**
 * প্রতিটি স্ট্যাটাসের জন্য লেবেল (বাংলা এবং ইংরেজি)
 */
export const PAYOUT_STATUS_LABELS = {
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
  cancelled: {
    en: 'Cancelled',
    bn: 'বাতিল',
  },
} as const satisfies Record<(typeof PAYOUT_STATUSES)[number], { en: string; bn: string }>;

/**
 * পেমেন্ট স্ট্যাটাস টাইপ
 */
export type PayoutStatus = (typeof PAYOUT_STATUSES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getPayoutStatusColor(status: PayoutStatus): string {
  return PAYOUT_STATUS_COLORS[status];
}

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getPayoutStatusLabel(status: PayoutStatus, lang: Language = 'en'): string {
  return PAYOUT_STATUS_LABELS[status][lang];
}

/**
 * সব পেমেন্ট স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllPayoutStatuses(): readonly PayoutStatus[] {
  return PAYOUT_STATUSES;
}

/**
 * পেমেন্ট স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPayoutStatus(status: string): status is PayoutStatus {
  return PAYOUT_STATUSES.includes(status as PayoutStatus);
}

/**
 * স্ট্যাটাস পেন্ডিং কিনা চেক করার ফাংশন
 */
export function isPendingPayoutStatus(status: PayoutStatus): boolean {
  return status === 'pending';
}

/**
 * স্ট্যাটাস প্রসেসিং কিনা চেক করার ফাংশন
 */
export function isProcessingPayoutStatus(status: PayoutStatus): boolean {
  return status === 'processing';
}

/**
 * স্ট্যাটাস কমপ্লিটেড কিনা চেক করার ফাংশন
 */
export function isCompletedPayoutStatus(status: PayoutStatus): boolean {
  return status === 'completed';
}

/**
 * স্ট্যাটাস ফেইলড কিনা চেক করার ফাংশন
 */
export function isFailedPayoutStatus(status: PayoutStatus): boolean {
  return status === 'failed';
}

/**
 * স্ট্যাটাস ক্যান্সেলড কিনা চেক করার ফাংশন
 */
export function isCancelledPayoutStatus(status: PayoutStatus): boolean {
  return status === 'cancelled';
}

/**
 * স্ট্যাটাস অ্যাক্টিভ (পেন্ডিং বা প্রসেসিং) কিনা চেক করার ফাংশন
 */
export function isActivePayoutStatus(status: PayoutStatus): boolean {
  return status === 'pending' || status === 'processing';
}

/**
 * স্ট্যাটাস টার্মিনাল (কমপ্লিটেড, ফেইলড, বা ক্যান্সেলড) কিনা চেক করার ফাংশন
 */
export function isTerminalPayoutStatus(status: PayoutStatus): boolean {
  return ['completed', 'failed', 'cancelled'].includes(status);
}

/**
 * স্ট্যাটাস সফল (কমপ্লিটেড) কিনা চেক করার ফাংশন
 */
export function isSuccessfulPayoutStatus(status: PayoutStatus): boolean {
  return status === 'completed';
}

/**
 * স্ট্যাটাস এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isEditablePayoutStatus(status: PayoutStatus): boolean {
  return status === 'pending' || status === 'processing';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canPayoutTransitionTo(
  currentStatus: PayoutStatus,
  newStatus: PayoutStatus
): boolean {
  const transitions: Record<PayoutStatus, PayoutStatus[]> = {
    pending: ['processing', 'cancelled'],
    processing: ['completed', 'failed', 'cancelled'],
    completed: [],
    failed: [],
    cancelled: [],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * ডিফল্ট পেমেন্ট স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultPayoutStatus(): PayoutStatus {
  return 'pending';
}

/**
 * স্ট্যাটাসের আইকন পাওয়ার ফাংশন
 */
export function getPayoutStatusIcon(status: PayoutStatus): string {
  const icons: Record<PayoutStatus, string> = {
    pending: '⏳',
    processing: '🔄',
    completed: '✅',
    failed: '❌',
    cancelled: '🚫',
  };
  return icons[status];
}
