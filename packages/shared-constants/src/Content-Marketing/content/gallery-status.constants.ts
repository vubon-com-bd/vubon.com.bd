/**
 * গ্যালারির স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * গ্যালারির সব স্ট্যাটাস
 */
export const GALLERY_STATUSES = ['active', 'inactive', 'archived'] as const;

/**
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const GALLERY_STATUS_COLORS = {
  active: 'green',
  inactive: 'gray',
  archived: 'orange',
} as const satisfies Record<(typeof GALLERY_STATUSES)[number], string>;

/**
 * গ্যালারি স্ট্যাটাস টাইপ
 */
export type GalleryStatus = (typeof GALLERY_STATUSES)[number];

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getGalleryStatusColor(status: GalleryStatus): string {
  return GALLERY_STATUS_COLORS[status];
}

/**
 * সব গ্যালারি স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllGalleryStatuses(): readonly GalleryStatus[] {
  return GALLERY_STATUSES;
}

/**
 * গ্যালারি স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidGalleryStatus(status: string): status is GalleryStatus {
  return GALLERY_STATUSES.includes(status as GalleryStatus);
}

/**
 * গ্যালারি সক্রিয় কিনা চেক করার ফাংশন
 */
export function isGalleryActive(status: GalleryStatus): boolean {
  return status === 'active';
}

/**
 * গ্যালারি নিষ্ক্রিয় কিনা চেক করার ফাংশন
 */
export function isGalleryInactive(status: GalleryStatus): boolean {
  return status === 'inactive';
}

/**
 * গ্যালারি আর্কাইভড কিনা চেক করার ফাংশন
 */
export function isGalleryArchived(status: GalleryStatus): boolean {
  return status === 'archived';
}

/**
 * গ্যালারি পাবলিকভাবে দেখানো যাবে কিনা চেক করার ফাংশন
 */
export function isGalleryVisible(status: GalleryStatus): boolean {
  return status === 'active';
}

/**
 * গ্যালারি এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isGalleryEditable(status: GalleryStatus): boolean {
  return status === 'active' || status === 'inactive';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canGalleryTransitionTo(
  currentStatus: GalleryStatus,
  newStatus: GalleryStatus
): boolean {
  const transitions: Record<GalleryStatus, GalleryStatus[]> = {
    active: ['inactive', 'archived'],
    inactive: ['active', 'archived'],
    archived: ['active', 'inactive'],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * ডিফল্ট গ্যালারি স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultGalleryStatus(): GalleryStatus {
  return 'active';
}
