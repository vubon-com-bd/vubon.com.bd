/**
 * ভিডিও ম্যানেজমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * ভিডিও ম্যানেজমেন্ট মডিউলের নাম
 */
export const VIDEO_MODULE_NAME = 'Video Management';

/**
 * ভিডিওর ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_VIDEO_STATUS = 'draft' as const;

/**
 * ভিডিও টাইটেলের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_VIDEO_TITLE_LENGTH = 200;

/**
 * ভিডিও স্ট্যাটাস টাইপ
 */
export type VideoStatus = typeof DEFAULT_VIDEO_STATUS | 'published' | 'archived';

/**
 * ভিডিও ইন্টারফেস
 */
export interface Video {
  id: string;
  title: string;
  slug: string;
  status: VideoStatus;
  description: string;
  url: string;
  thumbnail?: string;
  duration?: number;
  authorId: string;
  views: number;
  likes: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  metadata?: VideoMetadata;
}

/**
 * ভিডিও মেটাডেটা ইন্টারফেস
 */
export interface VideoMetadata {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  tags?: string[];
  categories?: string[];
  isFeatured?: boolean;
  transcript?: string;
  captions?: string[];
  relatedVideos?: string[];
}

/**
 * ভিডিও তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateVideoInput {
  title: string;
  slug: string;
  description: string;
  url: string;
  thumbnail?: string;
  duration?: number;
  authorId: string;
  metadata?: VideoMetadata;
  status?: VideoStatus;
}

/**
 * ভিডিও আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateVideoInput {
  title?: string;
  slug?: string;
  description?: string;
  url?: string;
  thumbnail?: string;
  duration?: number;
  status?: VideoStatus;
  metadata?: VideoMetadata;
}

/**
 * ভিডিও ফিল্টার ইন্টারফেস
 */
export interface VideoFilter {
  search?: string;
  status?: VideoStatus;
  authorId?: string;
  category?: string;
  tag?: string;
  isFeatured?: boolean;
  fromDate?: Date;
  toDate?: Date;
  sortBy?: 'createdAt' | 'updatedAt' | 'title' | 'publishedAt' | 'views' | 'likes';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * ভিডিও স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidVideoStatus(status: string): status is VideoStatus {
  const validStatuses: VideoStatus[] = ['draft', 'published', 'archived'];
  return validStatuses.includes(status as VideoStatus);
}

/**
 * ভিডিও টাইটেল বৈধ কিনা চেক করার ফাংশন
 */
export function isValidVideoTitle(title: string): boolean {
  if (!title || typeof title !== 'string') {
    return false;
  }
  const trimmedTitle = title.trim();
  return trimmedTitle.length > 0 && trimmedTitle.length <= MAX_VIDEO_TITLE_LENGTH;
}

/**
 * ভিডিও ড্রাফট কিনা চেক করার ফাংশন
 */
export function isVideoDraft(status: VideoStatus): boolean {
  return status === 'draft';
}

/**
 * ভিডিও প্রকাশিত কিনা চেক করার ফাংশন
 */
export function isVideoPublished(status: VideoStatus): boolean {
  return status === 'published';
}

/**
 * ভিডিও আর্কাইভড কিনা চেক করার ফাংশন
 */
export function isVideoArchived(status: VideoStatus): boolean {
  return status === 'archived';
}

/**
 * ভিডিও প্রকাশযোগ্য কিনা চেক করার ফাংশন
 */
export function isVideoPublishable(status: VideoStatus): boolean {
  return status === 'draft';
}

/**
 * ভিডিও এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isVideoEditable(status: VideoStatus): boolean {
  return status === 'draft' || status === 'published';
}

/**
 * ভিডিও স্ট্যাটাস লেবেল পাওয়ার ফাংশন
 */
export function getVideoStatusLabel(status: VideoStatus): { en: string; bn: string } {
  const labels: Record<VideoStatus, { en: string; bn: string }> = {
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
 * ভিডিও স্ট্যাটাস কালার পাওয়ার ফাংশন
 */
export function getVideoStatusColor(status: VideoStatus): string {
  const colors: Record<VideoStatus, string> = {
    draft: 'gray',
    published: 'green',
    archived: 'orange',
  };
  return colors[status];
}

/**
 * ডিফল্ট ভিডিও স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultVideoStatus(): VideoStatus {
  return DEFAULT_VIDEO_STATUS;
}

/**
 * ভিডিও স্লাগ তৈরির ফাংশন
 */
export function generateVideoSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
