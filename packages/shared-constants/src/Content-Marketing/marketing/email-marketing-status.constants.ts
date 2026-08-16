/**
 * ইমেইল মার্কেটিং এর স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * ইমেইলের সব স্ট্যাটাস
 */
export const EMAIL_STATUSES = ['draft', 'scheduled', 'sending', 'sent', 'failed'] as const;

/**
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const EMAIL_STATUS_COLORS = {
  draft: 'gray',
  scheduled: 'blue',
  sending: 'yellow',
  sent: 'green',
  failed: 'red',
} as const satisfies Record<(typeof EMAIL_STATUSES)[number], string>;

/**
 * প্রতিটি স্ট্যাটাসের জন্য লেবেল (বাংলা এবং ইংরেজি)
 */
export const EMAIL_STATUS_LABELS = {
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
} as const satisfies Record<(typeof EMAIL_STATUSES)[number], { en: string; bn: string }>;

/**
 * ইমেইল স্ট্যাটাস টাইপ
 */
export type EmailStatus = (typeof EMAIL_STATUSES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getEmailStatusColor(status: EmailStatus): string {
  return EMAIL_STATUS_COLORS[status];
}

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getEmailStatusLabel(status: EmailStatus, lang: Language = 'en'): string {
  return EMAIL_STATUS_LABELS[status][lang];
}

/**
 * সব ইমেইল স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllEmailStatuses(): readonly EmailStatus[] {
  return EMAIL_STATUSES;
}

/**
 * ইমেইল স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidEmailStatus(status: string): status is EmailStatus {
  return EMAIL_STATUSES.includes(status as EmailStatus);
}

/**
 * স্ট্যাটাস ড্রাফট কিনা চেক করার ফাংশন
 */
export function isDraftEmailStatus(status: EmailStatus): boolean {
  return status === 'draft';
}

/**
 * স্ট্যাটাস নির্ধারিত কিনা চেক করার ফাংশন
 */
export function isScheduledEmailStatus(status: EmailStatus): boolean {
  return status === 'scheduled';
}

/**
 * স্ট্যাটাস পাঠানো হচ্ছে কিনা চেক করার ফাংশন
 */
export function isSendingEmailStatus(status: EmailStatus): boolean {
  return status === 'sending';
}

/**
 * স্ট্যাটাস পাঠানো হয়েছে কিনা চেক করার ফাংশন
 */
export function isSentEmailStatus(status: EmailStatus): boolean {
  return status === 'sent';
}

/**
 * স্ট্যাটাস ব্যর্থ কিনা চেক করার ফাংশন
 */
export function isFailedEmailStatus(status: EmailStatus): boolean {
  return status === 'failed';
}

/**
 * স্ট্যাটাস টার্মিনাল (সেন্ট বা ফেইলড) কিনা চেক করার ফাংশন
 */
export function isTerminalEmailStatus(status: EmailStatus): boolean {
  return status === 'sent' || status === 'failed';
}

/**
 * স্ট্যাটাস অ্যাক্টিভ (শিডিউলড বা সেন্ডিং) কিনা চেক করার ফাংশন
 */
export function isActiveEmailStatus(status: EmailStatus): boolean {
  return status === 'scheduled' || status === 'sending';
}

/**
 * স্ট্যাটাস এডিটযোগ্য (ড্রাফট) কিনা চেক করার ফাংশন
 */
export function isEditableEmailStatus(status: EmailStatus): boolean {
  return status === 'draft';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canEmailTransitionTo(currentStatus: EmailStatus, newStatus: EmailStatus): boolean {
  const transitions: Record<EmailStatus, EmailStatus[]> = {
    draft: ['scheduled', 'sending', 'failed'],
    scheduled: ['sending', 'failed'],
    sending: ['sent', 'failed'],
    sent: [],
    failed: ['draft'],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * ডিফল্ট ইমেইল স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultEmailStatus(): EmailStatus {
  return 'draft';
}

/**
 * স্ট্যাটাসের আইকন পাওয়ার ফাংশন
 */
export function getEmailStatusIcon(status: EmailStatus): string {
  const icons: Record<EmailStatus, string> = {
    draft: '📝',
    scheduled: '📅',
    sending: '📤',
    sent: '✅',
    failed: '❌',
  };
  return icons[status];
}
