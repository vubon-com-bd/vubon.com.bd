/**
 * পডকাস্ট ম্যানেজমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * পডকাস্ট ম্যানেজমেন্ট মডিউলের নাম
 */
export const PODCAST_MODULE_NAME = 'Podcast Management';

/**
 * পডকাস্টের ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_PODCAST_STATUS = 'draft' as const;

/**
 * পডকাস্ট স্ট্যাটাস টাইপ
 */
export type PodcastStatus = typeof DEFAULT_PODCAST_STATUS | 'published' | 'archived';

/**
 * পডকাস্ট ইন্টারফেস
 */
export interface Podcast {
  id: string;
  title: string;
  slug: string;
  status: PodcastStatus;
  description: string;
  audioUrl: string;
  coverImage?: string;
  duration?: number;
  episodeNumber?: number;
  seasonNumber?: number;
  authorId: string;
  views: number;
  likes: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  metadata?: PodcastMetadata;
}

/**
 * পডকাস্ট মেটাডেটা ইন্টারফেস
 */
export interface PodcastMetadata {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  tags?: string[];
  categories?: string[];
  isFeatured?: boolean;
  transcript?: string;
  relatedPodcasts?: string[];
  explicit?: boolean;
}

/**
 * পডকাস্ট তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreatePodcastInput {
  title: string;
  slug: string;
  description: string;
  audioUrl: string;
  coverImage?: string;
  duration?: number;
  episodeNumber?: number;
  seasonNumber?: number;
  authorId: string;
  metadata?: PodcastMetadata;
  status?: PodcastStatus;
}

/**
 * পডকাস্ট আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdatePodcastInput {
  title?: string;
  slug?: string;
  description?: string;
  audioUrl?: string;
  coverImage?: string;
  duration?: number;
  episodeNumber?: number;
  seasonNumber?: number;
  status?: PodcastStatus;
  metadata?: PodcastMetadata;
}

/**
 * পডকাস্ট ফিল্টার ইন্টারফেস
 */
export interface PodcastFilter {
  search?: string;
  status?: PodcastStatus;
  authorId?: string;
  category?: string;
  tag?: string;
  isFeatured?: boolean;
  fromDate?: Date;
  toDate?: Date;
  sortBy?:
    'createdAt' | 'updatedAt' | 'title' | 'publishedAt' | 'views' | 'likes' | 'episodeNumber';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * পডকাস্ট স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPodcastStatus(status: string): status is PodcastStatus {
  const validStatuses: PodcastStatus[] = ['draft', 'published', 'archived'];
  return validStatuses.includes(status as PodcastStatus);
}

/**
 * পডকাস্ট ড্রাফট কিনা চেক করার ফাংশন
 */
export function isPodcastDraft(status: PodcastStatus): boolean {
  return status === 'draft';
}

/**
 * পডকাস্ট প্রকাশিত কিনা চেক করার ফাংশন
 */
export function isPodcastPublished(status: PodcastStatus): boolean {
  return status === 'published';
}

/**
 * পডকাস্ট আর্কাইভড কিনা চেক করার ফাংশন
 */
export function isPodcastArchived(status: PodcastStatus): boolean {
  return status === 'archived';
}

/**
 * পডকাস্ট প্রকাশযোগ্য কিনা চেক করার ফাংশন
 */
export function isPodcastPublishable(status: PodcastStatus): boolean {
  return status === 'draft';
}

/**
 * পডকাস্ট এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isPodcastEditable(status: PodcastStatus): boolean {
  return status === 'draft' || status === 'published';
}

/**
 * পডকাস্ট স্ট্যাটাস লেবেল পাওয়ার ফাংশন
 */
export function getPodcastStatusLabel(status: PodcastStatus): { en: string; bn: string } {
  const labels: Record<PodcastStatus, { en: string; bn: string }> = {
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
 * পডকাস্ট স্ট্যাটাস কালার পাওয়ার ফাংশন
 */
export function getPodcastStatusColor(status: PodcastStatus): string {
  const colors: Record<PodcastStatus, string> = {
    draft: 'gray',
    published: 'green',
    archived: 'orange',
  };
  return colors[status];
}

/**
 * ডিফল্ট পডকাস্ট স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultPodcastStatus(): PodcastStatus {
  return DEFAULT_PODCAST_STATUS;
}

/**
 * পডকাস্ট স্লাগ তৈরির ফাংশন
 */
export function generatePodcastSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
