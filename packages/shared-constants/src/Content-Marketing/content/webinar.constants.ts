/**
 * ওয়েবিনার ম্যানেজমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * ওয়েবিনার ম্যানেজমেন্ট মডিউলের নাম
 */
export const WEBINAR_MODULE_NAME = 'Webinar Management';

/**
 * ওয়েবিনারের ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_WEBINAR_STATUS = 'draft' as const;

/**
 * ওয়েবিনার স্ট্যাটাস টাইপ
 */
export type WebinarStatus = typeof DEFAULT_WEBINAR_STATUS | 'published' | 'archived';

/**
 * ওয়েবিনার টাইপ টাইপ
 */
export type WebinarType = 'live' | 'recorded' | 'hybrid';

/**
 * ওয়েবিনার ইন্টারফেস
 */
export interface Webinar {
  id: string;
  title: string;
  slug: string;
  status: WebinarStatus;
  type: WebinarType;
  description: string;
  speaker: string;
  speakerBio?: string;
  speakerImage?: string;
  coverImage?: string;
  startTime: Date;
  endTime: Date;
  duration?: number;
  meetingUrl?: string;
  recordingUrl?: string;
  maxAttendees?: number;
  registeredCount: number;
  attendedCount: number;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: WebinarMetadata;
}

/**
 * ওয়েবিনার মেটাডেটা ইন্টারফেস
 */
export interface WebinarMetadata {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  tags?: string[];
  categories?: string[];
  isFeatured?: boolean;
  agenda?: string[];
  resources?: string[];
  recordingPassword?: string;
}

/**
 * ওয়েবিনার তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateWebinarInput {
  title: string;
  slug: string;
  type: WebinarType;
  description: string;
  speaker: string;
  startTime: Date;
  endTime: Date;
  speakerBio?: string;
  speakerImage?: string;
  coverImage?: string;
  meetingUrl?: string;
  maxAttendees?: number;
  metadata?: WebinarMetadata;
  status?: WebinarStatus;
}

/**
 * ওয়েবিনার আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateWebinarInput {
  title?: string;
  slug?: string;
  type?: WebinarType;
  description?: string;
  speaker?: string;
  speakerBio?: string;
  speakerImage?: string;
  coverImage?: string;
  startTime?: Date;
  endTime?: Date;
  meetingUrl?: string;
  recordingUrl?: string;
  maxAttendees?: number;
  status?: WebinarStatus;
  metadata?: WebinarMetadata;
}

/**
 * ওয়েবিনার ফিল্টার ইন্টারফেস
 */
export interface WebinarFilter {
  search?: string;
  status?: WebinarStatus;
  type?: WebinarType;
  speaker?: string;
  category?: string;
  tag?: string;
  isFeatured?: boolean;
  fromDate?: Date;
  toDate?: Date;
  sortBy?: 'createdAt' | 'updatedAt' | 'title' | 'startTime' | 'registeredCount';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * ওয়েবিনার স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidWebinarStatus(status: string): status is WebinarStatus {
  const validStatuses: WebinarStatus[] = ['draft', 'published', 'archived'];
  return validStatuses.includes(status as WebinarStatus);
}

/**
 * ওয়েবিনার টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidWebinarType(type: string): type is WebinarType {
  const validTypes: WebinarType[] = ['live', 'recorded', 'hybrid'];
  return validTypes.includes(type as WebinarType);
}

/**
 * ওয়েবিনার ড্রাফট কিনা চেক করার ফাংশন
 */
export function isWebinarDraft(status: WebinarStatus): boolean {
  return status === 'draft';
}

/**
 * ওয়েবিনার প্রকাশিত কিনা চেক করার ফাংশন
 */
export function isWebinarPublished(status: WebinarStatus): boolean {
  return status === 'published';
}

/**
 * ওয়েবিনার আর্কাইভড কিনা চেক করার ফাংশন
 */
export function isWebinarArchived(status: WebinarStatus): boolean {
  return status === 'archived';
}

/**
 * ওয়েবিনার প্রকাশযোগ্য কিনা চেক করার ফাংশন
 */
export function isWebinarPublishable(status: WebinarStatus): boolean {
  return status === 'draft';
}

/**
 * ওয়েবিনার এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isWebinarEditable(status: WebinarStatus): boolean {
  return status === 'draft' || status === 'published';
}

/**
 * ওয়েবিনার স্ট্যাটাস লেবেল পাওয়ার ফাংশন
 */
export function getWebinarStatusLabel(status: WebinarStatus): { en: string; bn: string } {
  const labels: Record<WebinarStatus, { en: string; bn: string }> = {
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
  };
  return labels[status];
}

/**
 * ওয়েবিনার স্ট্যাটাস কালার পাওয়ার ফাংশন
 */
export function getWebinarStatusColor(status: WebinarStatus): string {
  const colors: Record<WebinarStatus, string> = {
    draft: 'gray',
    published: 'green',
    archived: 'orange',
  };
  return colors[status];
}

/**
 * ওয়েবিনার টাইপ লেবেল পাওয়ার ফাংশন
 */
export function getWebinarTypeLabel(type: WebinarType): { en: string; bn: string } {
  const labels: Record<WebinarType, { en: string; bn: string }> = {
    live: {
      en: 'Live',
      bn: 'লাইভ',
    },
    recorded: {
      en: 'Recorded',
      bn: 'রেকর্ডেড',
    },
    hybrid: {
      en: 'Hybrid',
      bn: 'হাইব্রিড',
    },
  };
  return labels[type];
}

/**
 * ওয়েবিনারের টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getWebinarTypeDescription(type: WebinarType): { en: string; bn: string } {
  const descriptions: Record<WebinarType, { en: string; bn: string }> = {
    live: {
      en: 'Live interactive webinar with real-time participation',
      bn: 'রিয়েল-টাইম অংশগ্রহণ সহ লাইভ ইন্টারেক্টিভ ওয়েবিনার',
    },
    recorded: {
      en: 'Pre-recorded webinar available for on-demand viewing',
      bn: 'অন-ডিমান্ড দেখার জন্য প্রাক-রেকর্ডেড ওয়েবিনার',
    },
    hybrid: {
      en: 'Combination of live and recorded elements',
      bn: 'লাইভ এবং রেকর্ডেড উপাদানের সমন্বয়',
    },
  };
  return descriptions[type];
}

/**
 * ডিফল্ট ওয়েবিনার স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultWebinarStatus(): WebinarStatus {
  return DEFAULT_WEBINAR_STATUS;
}

/**
 * ডিফল্ট ওয়েবিনার টাইপ পাওয়ার ফাংশন
 */
export function getDefaultWebinarType(): WebinarType {
  return 'live';
}

/**
 * ওয়েবিনার স্লাগ তৈরির ফাংশন
 */
export function generateWebinarSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
