/**
 * FAQ-এর স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * FAQ-এর সব স্ট্যাটাস
 */
export const FAQ_STATUSES = ['active', 'inactive', 'archived'] as const;

/**
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const FAQ_STATUS_COLORS = {
  active: 'green',
  inactive: 'gray',
  archived: 'orange',
} as const satisfies Record<(typeof FAQ_STATUSES)[number], string>;

/**
 * FAQ স্ট্যাটাস টাইপ
 */
export type FaqStatus = (typeof FAQ_STATUSES)[number];

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getFaqStatusColor(status: FaqStatus): string {
  return FAQ_STATUS_COLORS[status];
}

/**
 * সব FAQ স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllFaqStatuses(): readonly FaqStatus[] {
  return FAQ_STATUSES;
}

/**
 * FAQ স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidFaqStatus(status: string): status is FaqStatus {
  return FAQ_STATUSES.includes(status as FaqStatus);
}

/**
 * FAQ সক্রিয় কিনা চেক করার ফাংশন
 */
export function isFaqActive(status: FaqStatus): boolean {
  return status === 'active';
}

/**
 * FAQ নিষ্ক্রিয় কিনা চেক করার ফাংশন
 */
export function isFaqInactive(status: FaqStatus): boolean {
  return status === 'inactive';
}

/**
 * FAQ আর্কাইভড কিনা চেক করার ফাংশন
 */
export function isFaqArchived(status: FaqStatus): boolean {
  return status === 'archived';
}

/**
 * FAQ প্রকাশযোগ্য কিনা চেক করার ফাংশন
 */
export function isFaqPublishable(status: FaqStatus): boolean {
  return status === 'active';
}

/**
 * FAQ এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isFaqEditable(status: FaqStatus): boolean {
  return status === 'active' || status === 'inactive';
}

/**
 * FAQ আর্কাইভ করা যায় কিনা চেক করার ফাংশন
 */
export function isFaqArchivable(status: FaqStatus): boolean {
  return status === 'active' || status === 'inactive';
}

/**
 * FAQ পুনরায় সক্রিয় করা যায় কিনা চেক করার ফাংশন
 */
export function isFaqReactivateable(status: FaqStatus): boolean {
  return status === 'inactive' || status === 'archived';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canFaqTransitionTo(currentStatus: FaqStatus, newStatus: FaqStatus): boolean {
  const transitions: Record<FaqStatus, FaqStatus[]> = {
    active: ['inactive', 'archived'],
    inactive: ['active', 'archived'],
    archived: ['active', 'inactive'],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * FAQ স্ট্যাটাস লেবেল পাওয়ার ফাংশন (বাংলা এবং ইংরেজি)
 */
export function getFaqStatusLabel(status: FaqStatus): { en: string; bn: string } {
  const labels: Record<FaqStatus, { en: string; bn: string }> = {
    active: {
      en: 'Active',
      bn: 'সক্রিয়',
    },
    inactive: {
      en: 'Inactive',
      bn: 'নিষ্ক্রিয়',
    },
    archived: {
      en: 'Archived',
      bn: 'আর্কাইভড',
    },
  };
  return labels[status];
}

/**
 * FAQ স্ট্যাটাসের বিবরণ পাওয়ার ফাংশন (বাংলা এবং ইংরেজি)
 */
export function getFaqStatusDescription(status: FaqStatus): { en: string; bn: string } {
  const descriptions: Record<FaqStatus, { en: string; bn: string }> = {
    active: {
      en: 'FAQ is active and visible to users',
      bn: 'FAQ সক্রিয় এবং ব্যবহারকারীদের কাছে দৃশ্যমান',
    },
    inactive: {
      en: 'FAQ is inactive and hidden from users',
      bn: 'FAQ নিষ্ক্রিয় এবং ব্যবহারকারীদের থেকে লুকানো',
    },
    archived: {
      en: 'FAQ has been archived',
      bn: 'FAQ আর্কাইভ করা হয়েছে',
    },
  };
  return descriptions[status];
}

/**
 * ডিফল্ট FAQ স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultFaqStatus(): FaqStatus {
  return 'active';
}
