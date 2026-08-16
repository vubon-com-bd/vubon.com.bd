/**
 * ঘোষণার স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * ঘোষণার সব স্ট্যাটাস
 */
export const ANNOUNCEMENT_STATUSES = ['draft', 'active', 'expired', 'archived'] as const;

/**
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const ANNOUNCEMENT_STATUS_COLORS = {
  draft: 'gray',
  active: 'green',
  expired: 'red',
  archived: 'orange',
} as const satisfies Record<(typeof ANNOUNCEMENT_STATUSES)[number], string>;

/**
 * ঘোষণা স্ট্যাটাস টাইপ
 */
export type AnnouncementStatus = (typeof ANNOUNCEMENT_STATUSES)[number];

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getAnnouncementStatusColor(status: AnnouncementStatus): string {
  return ANNOUNCEMENT_STATUS_COLORS[status];
}

/**
 * সব ঘোষণা স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllAnnouncementStatuses(): readonly AnnouncementStatus[] {
  return ANNOUNCEMENT_STATUSES;
}

/**
 * ঘোষণা স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidAnnouncementStatus(status: string): status is AnnouncementStatus {
  return ANNOUNCEMENT_STATUSES.includes(status as AnnouncementStatus);
}

/**
 * ঘোষণা সক্রিয় কিনা চেক করার ফাংশন
 */
export function isAnnouncementActive(status: AnnouncementStatus): boolean {
  return status === 'active';
}

/**
 * ঘোষণা ড্রাফট কিনা চেক করার ফাংশন
 */
export function isAnnouncementDraft(status: AnnouncementStatus): boolean {
  return status === 'draft';
}

/**
 * ঘোষণা মেয়াদোত্তীর্ণ কিনা চেক করার ফাংশন
 */
export function isAnnouncementExpired(status: AnnouncementStatus): boolean {
  return status === 'expired';
}

/**
 * ঘোষণা আর্কাইভড কিনা চেক করার ফাংশন
 */
export function isAnnouncementArchived(status: AnnouncementStatus): boolean {
  return status === 'archived';
}

/**
 * ঘোষণা পাবলিকভাবে দেখানো যাবে কিনা চেক করার ফাংশন
 */
export function isAnnouncementVisible(status: AnnouncementStatus): boolean {
  return status === 'active';
}

/**
 * ঘোষণা এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isAnnouncementEditable(status: AnnouncementStatus): boolean {
  return status === 'draft' || status === 'active';
}

/**
 * ঘোষণা ডিলিট করা যায় কিনা চেক করার ফাংশন
 */
export function isAnnouncementDeletable(status: AnnouncementStatus): boolean {
  return status === 'draft' || status === 'archived';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canAnnouncementTransitionTo(
  currentStatus: AnnouncementStatus,
  newStatus: AnnouncementStatus
): boolean {
  const transitions: Record<AnnouncementStatus, AnnouncementStatus[]> = {
    draft: ['active', 'archived'],
    active: ['expired', 'archived'],
    expired: ['archived'],
    archived: ['draft'],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * ডিফল্ট ঘোষণা স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultAnnouncementStatus(): AnnouncementStatus {
  return 'draft';
}
