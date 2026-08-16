/**
 * নিউজলেটারের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * নিউজলেটারের সব স্ট্যাটাস
 */
export const NEWSLETTER_STATUSES = [
  'draft',
  'scheduled',
  'sending',
  'sent',
  'failed',
  'cancelled',
] as const;

/**
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const NEWSLETTER_STATUS_COLORS = {
  draft: 'gray',
  scheduled: 'blue',
  sending: 'yellow',
  sent: 'green',
  failed: 'red',
  cancelled: 'orange',
} as const satisfies Record<(typeof NEWSLETTER_STATUSES)[number], string>;

/**
 * নিউজলেটার স্ট্যাটাস টাইপ
 */
export type NewsletterStatus = (typeof NEWSLETTER_STATUSES)[number];

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getNewsletterStatusColor(status: NewsletterStatus): string {
  return NEWSLETTER_STATUS_COLORS[status];
}

/**
 * সব নিউজলেটার স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllNewsletterStatuses(): readonly NewsletterStatus[] {
  return NEWSLETTER_STATUSES;
}

/**
 * নিউজলেটার স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidNewsletterStatus(status: string): status is NewsletterStatus {
  return NEWSLETTER_STATUSES.includes(status as NewsletterStatus);
}

/**
 * নিউজলেটার ড্রাফট কিনা চেক করার ফাংশন
 */
export function isNewsletterDraft(status: NewsletterStatus): boolean {
  return status === 'draft';
}

/**
 * নিউজলেটার নির্ধারিত কিনা চেক করার ফাংশন
 */
export function isNewsletterScheduled(status: NewsletterStatus): boolean {
  return status === 'scheduled';
}

/**
 * নিউজলেটার পাঠানো হচ্ছে কিনা চেক করার ফাংশন
 */
export function isNewsletterSending(status: NewsletterStatus): boolean {
  return status === 'sending';
}

/**
 * নিউজলেটার পাঠানো হয়েছে কিনা চেক করার ফাংশন
 */
export function isNewsletterSent(status: NewsletterStatus): boolean {
  return status === 'sent';
}

/**
 * নিউজলেটার ব্যর্থ হয়েছে কিনা চেক করার ফাংশন
 */
export function isNewsletterFailed(status: NewsletterStatus): boolean {
  return status === 'failed';
}

/**
 * নিউজলেটার বাতিল হয়েছে কিনা চেক করার ফাংশন
 */
export function isNewsletterCancelled(status: NewsletterStatus): boolean {
  return status === 'cancelled';
}

/**
 * নিউজলেটার সম্পূর্ণ হয়েছে কিনা চেক করার ফাংশন (সফল বা ব্যর্থ)
 */
export function isNewsletterCompleted(status: NewsletterStatus): boolean {
  return status === 'sent' || status === 'failed' || status === 'cancelled';
}

/**
 * নিউজলেটার প্রক্রিয়াধীন কিনা চেক করার ফাংশন
 */
export function isNewsletterProcessing(status: NewsletterStatus): boolean {
  return status === 'sending' || status === 'scheduled';
}

/**
 * নিউজলেটার এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isNewsletterEditable(status: NewsletterStatus): boolean {
  return status === 'draft' || status === 'scheduled';
}

/**
 * নিউজলেটার বাতিল করা যায় কিনা চেক করার ফাংশন
 */
export function isNewsletterCancellable(status: NewsletterStatus): boolean {
  return status === 'draft' || status === 'scheduled' || status === 'sending';
}

/**
 * নিউজলেটার পুনরায় পাঠানো যায় কিনা চেক করার ফাংশন
 */
export function isNewsletterResendable(status: NewsletterStatus): boolean {
  return status === 'failed' || status === 'cancelled';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canNewsletterTransitionTo(
  currentStatus: NewsletterStatus,
  newStatus: NewsletterStatus
): boolean {
  const transitions: Record<NewsletterStatus, NewsletterStatus[]> = {
    draft: ['scheduled', 'sending', 'cancelled'],
    scheduled: ['sending', 'cancelled'],
    sending: ['sent', 'failed', 'cancelled'],
    sent: [],
    failed: ['sending', 'cancelled'],
    cancelled: ['draft', 'scheduled'],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * নিউজলেটার স্ট্যাটাস লেবেল পাওয়ার ফাংশন (বাংলা এবং ইংরেজি)
 */
export function getNewsletterStatusLabel(status: NewsletterStatus): { en: string; bn: string } {
  const labels: Record<NewsletterStatus, { en: string; bn: string }> = {
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
      bn: 'ব্যর্থ হয়েছে',
    },
    cancelled: {
      en: 'Cancelled',
      bn: 'বাতিল হয়েছে',
    },
  };
  return labels[status];
}

/**
 * ডিফল্ট নিউজলেটার স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultNewsletterStatus(): NewsletterStatus {
  return 'draft';
}
