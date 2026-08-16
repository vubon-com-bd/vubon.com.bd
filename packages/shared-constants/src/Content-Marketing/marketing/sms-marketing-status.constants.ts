/**
 * এসএমএস মার্কেটিং এর স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * এসএমএসের সব স্ট্যাটাস
 */
export const SMS_STATUSES = ['draft', 'scheduled', 'sending', 'sent', 'failed'] as const;

/**
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const SMS_STATUS_COLORS = {
  draft: 'gray',
  scheduled: 'blue',
  sending: 'yellow',
  sent: 'green',
  failed: 'red',
} as const satisfies Record<(typeof SMS_STATUSES)[number], string>;

/**
 * প্রতিটি স্ট্যাটাসের জন্য লেবেল (বাংলা এবং ইংরেজি)
 */
export const SMS_STATUS_LABELS = {
  draft: {
    en: 'Draft',
    bn: 'খসড়া',
  },
  scheduled: {
    en: 'Scheduled',
    bn: 'নির্ধারিত',
  },
  sending: {
    en: 'Sending',
    bn: 'পাঠানো হচ্ছে',
  },
  sent: {
    en: 'Sent',
    bn: 'পাঠানো হয়েছে',
  },
  failed: {
    en: 'Failed',
    bn: 'ব্যর্থ',
  },
} as const satisfies Record<(typeof SMS_STATUSES)[number], { en: string; bn: string }>;

/**
 * এসএমএস স্ট্যাটাস টাইপ
 */
export type SmsStatus = (typeof SMS_STATUSES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getSmsStatusColor(status: SmsStatus): string {
  return SMS_STATUS_COLORS[status];
}

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getSmsStatusLabel(status: SmsStatus, lang: Language = 'en'): string {
  return SMS_STATUS_LABELS[status][lang];
}

/**
 * সব এসএমএস স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllSmsStatuses(): readonly SmsStatus[] {
  return SMS_STATUSES;
}

/**
 * এসএমএস স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSmsStatus(status: string): status is SmsStatus {
  return SMS_STATUSES.includes(status as SmsStatus);
}

/**
 * স্ট্যাটাস ড্রাফট কিনা চেক করার ফাংশন
 */
export function isDraftSmsStatus(status: SmsStatus): boolean {
  return status === 'draft';
}

/**
 * স্ট্যাটাস নির্ধারিত কিনা চেক করার ফাংশন
 */
export function isScheduledSmsStatus(status: SmsStatus): boolean {
  return status === 'scheduled';
}

/**
 * স্ট্যাটাস পাঠানো হচ্ছে কিনা চেক করার ফাংশন
 */
export function isSendingSmsStatus(status: SmsStatus): boolean {
  return status === 'sending';
}

/**
 * স্ট্যাটাস পাঠানো হয়েছে কিনা চেক করার ফাংশন
 */
export function isSentSmsStatus(status: SmsStatus): boolean {
  return status === 'sent';
}

/**
 * স্ট্যাটাস ব্যর্থ কিনা চেক করার ফাংশন
 */
export function isFailedSmsStatus(status: SmsStatus): boolean {
  return status === 'failed';
}

/**
 * স্ট্যাটাস টার্মিনাল (সেন্ট বা ফেইলড) কিনা চেক করার ফাংশন
 */
export function isTerminalSmsStatus(status: SmsStatus): boolean {
  return status === 'sent' || status === 'failed';
}

/**
 * স্ট্যাটাস অ্যাক্টিভ (শিডিউলড বা সেন্ডিং) কিনা চেক করার ফাংশন
 */
export function isActiveSmsStatus(status: SmsStatus): boolean {
  return status === 'scheduled' || status === 'sending';
}

/**
 * স্ট্যাটাস এডিটযোগ্য (ড্রাফট) কিনা চেক করার ফাংশন
 */
export function isEditableSmsStatus(status: SmsStatus): boolean {
  return status === 'draft';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canSmsTransitionTo(currentStatus: SmsStatus, newStatus: SmsStatus): boolean {
  const transitions: Record<SmsStatus, SmsStatus[]> = {
    draft: ['scheduled', 'sending', 'failed'],
    scheduled: ['sending', 'failed'],
    sending: ['sent', 'failed'],
    sent: [],
    failed: ['draft'],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * ডিফল্ট এসএমএস স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultSmsStatus(): SmsStatus {
  return 'draft';
}

/**
 * স্ট্যাটাসের আইকন পাওয়ার ফাংশন
 */
export function getSmsStatusIcon(status: SmsStatus): string {
  const icons: Record<SmsStatus, string> = {
    draft: '📝',
    scheduled: '📅',
    sending: '📤',
    sent: '✅',
    failed: '❌',
  };
  return icons[status];
}
