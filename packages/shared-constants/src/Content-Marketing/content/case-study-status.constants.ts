/**
 * কেস স্টাডির স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * কেস স্টাডির সব স্ট্যাটাস
 */
export const CASE_STUDY_STATUSES = ['draft', 'published', 'archived'] as const;

/**
 * কেস স্টাডি স্ট্যাটাস টাইপ
 */
export type CaseStudyStatus = (typeof CASE_STUDY_STATUSES)[number];

/**
 * কেস স্টাডি স্ট্যাটাসের কালার কোড
 */
export const CASE_STUDY_STATUS_COLORS = {
  draft: 'gray',
  published: 'green',
  archived: 'orange',
} as const satisfies Record<CaseStudyStatus, string>;

/**
 * কেস স্টাডি স্ট্যাটাস লেবেল (বাংলা এবং ইংরেজি)
 */
export const CASE_STUDY_STATUS_LABELS = {
  draft: {
    en: 'Draft',
    bn: 'খসড়া',
  },
  published: {
    en: 'Published',
    bn: 'প্রকাশিত',
  },
  archived: {
    en: 'Archived',
    bn: 'আর্কাইভড',
  },
} as const satisfies Record<CaseStudyStatus, { en: string; bn: string }>;

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getCaseStudyStatusColor(status: CaseStudyStatus): string {
  return CASE_STUDY_STATUS_COLORS[status];
}

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getCaseStudyStatusLabel(status: CaseStudyStatus, lang: 'en' | 'bn' = 'en'): string {
  return CASE_STUDY_STATUS_LABELS[status][lang];
}

/**
 * সব কেস স্টাডি স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllCaseStudyStatuses(): readonly CaseStudyStatus[] {
  return CASE_STUDY_STATUSES;
}

/**
 * কেস স্টাডি স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidCaseStudyStatus(status: string): status is CaseStudyStatus {
  return CASE_STUDY_STATUSES.includes(status as CaseStudyStatus);
}

/**
 * কেস স্টাডি ড্রাফট কিনা চেক করার ফাংশন
 */
export function isCaseStudyDraft(status: CaseStudyStatus): boolean {
  return status === 'draft';
}

/**
 * কেস স্টাডি প্রকাশিত কিনা চেক করার ফাংশন
 */
export function isCaseStudyPublished(status: CaseStudyStatus): boolean {
  return status === 'published';
}

/**
 * কেস স্টাডি আর্কাইভড কিনা চেক করার ফাংশন
 */
export function isCaseStudyArchived(status: CaseStudyStatus): boolean {
  return status === 'archived';
}

/**
 * কেস স্টাডি প্রকাশযোগ্য কিনা চেক করার ফাংশন
 */
export function isCaseStudyPublishable(status: CaseStudyStatus): boolean {
  return status === 'draft';
}

/**
 * কেস স্টাডি এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isCaseStudyEditable(status: CaseStudyStatus): boolean {
  return status === 'draft' || status === 'published';
}

/**
 * কেস স্টাডি আর্কাইভ করা যায় কিনা চেক করার ফাংশন
 */
export function isCaseStudyArchivable(status: CaseStudyStatus): boolean {
  return status === 'published' || status === 'draft';
}

/**
 * কেস স্টাডি পুনরুদ্ধার করা যায় কিনা চেক করার ফাংশন
 */
export function isCaseStudyRestorable(status: CaseStudyStatus): boolean {
  return status === 'archived';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canCaseStudyTransitionTo(
  currentStatus: CaseStudyStatus,
  newStatus: CaseStudyStatus
): boolean {
  const transitions: Record<CaseStudyStatus, CaseStudyStatus[]> = {
    draft: ['published', 'archived'],
    published: ['archived'],
    archived: ['published'],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * ডিফল্ট কেস স্টাডি স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultCaseStudyStatus(): CaseStudyStatus {
  return 'draft';
}
