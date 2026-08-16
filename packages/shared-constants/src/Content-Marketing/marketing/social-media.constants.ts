/**
 * সোশ্যাল মিডিয়া মার্কেটিং সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * সোশ্যাল মিডিয়া মার্কেটিং মডিউলের নাম
 */
export const SOCIAL_MEDIA_MODULE_NAME = 'Social Media Marketing';

/**
 * সোশ্যাল পোস্টের ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_SOCIAL_STATUS = 'draft' as const;

/**
 * সোশ্যাল পোস্টের সর্বোচ্চ দৈর্ঘ্য (Twitter/X এর জন্য)
 */
export const MAX_POST_LENGTH = 280;

/**
 * সর্বোচ্চ হ্যাশট্যাগ সংখ্যা
 */
export const MAX_HASHTAGS = 30;

/**
 * সোশ্যাল মিডিয়া প্ল্যাটফর্ম টাইপ
 */
export type SocialPlatform =
  'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok';

/**
 * সোশ্যাল পোস্ট স্ট্যাটাস টাইপ
 */
export type SocialStatus = typeof DEFAULT_SOCIAL_STATUS;

/**
 * সোশ্যাল পোস্ট ইন্টারফেস
 */
export interface SocialPostInterface {
  id: string;
  content: string;
  platform: SocialPlatform;
  status: SocialStatus;
  hashtags: string[];
  mentions: string[];
  mediaUrls: string[];
  scheduledAt?: Date;
  publishedAt?: Date;
  likes: number;
  shares: number;
  comments: number;
  engagement: number;
  reach: number;
  impressions: number;
  createdAt: Date;
  updatedAt: Date;
  metadata?: SocialMetadata;
}

/**
 * সোশ্যাল মেটাডেটা ইন্টারফেস
 */
export interface SocialMetadata {
  campaignId?: string;
  isPaid?: boolean;
  adSpend?: number;
  targetAudience?: string[];
  location?: string;
  link?: string;
  linkPreview?: string;
  replyToId?: string;
  threadId?: string;
}

/**
 * সোশ্যাল পোস্ট তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateSocialPostInput {
  content: string;
  platform: SocialPlatform;
  hashtags?: string[];
  mentions?: string[];
  mediaUrls?: string[];
  scheduledAt?: Date;
  metadata?: SocialMetadata;
  status?: SocialStatus;
}

/**
 * সোশ্যাল পোস্ট আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateSocialPostInput {
  content?: string;
  platform?: SocialPlatform;
  status?: SocialStatus;
  hashtags?: string[];
  mentions?: string[];
  mediaUrls?: string[];
  scheduledAt?: Date;
  publishedAt?: Date;
  likes?: number;
  shares?: number;
  comments?: number;
  engagement?: number;
  reach?: number;
  impressions?: number;
  metadata?: SocialMetadata;
}

/**
 * সোশ্যাল পোস্ট ফিল্টার ইন্টারফেস
 */
export interface SocialPostFilter {
  search?: string;
  platform?: SocialPlatform;
  status?: SocialStatus;
  fromDate?: Date;
  toDate?: Date;
  minLikes?: number;
  maxLikes?: number;
  minShares?: number;
  maxShares?: number;
  minEngagement?: number;
  maxEngagement?: number;
  hasMedia?: boolean;
  isPaid?: boolean;
  limit?: number;
  offset?: number;
}

/**
 * সোশ্যাল প্ল্যাটফর্ম বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSocialPlatform(platform: string): platform is SocialPlatform {
  return ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'tiktok'].includes(platform);
}

/**
 * সোশ্যাল স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSocialStatus(status: string): status is SocialStatus {
  return status === 'draft';
}

/**
 * পোস্ট কন্টেন্ট বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPostContent(content: string): boolean {
  if (!content || typeof content !== 'string') {
    return false;
  }
  const trimmedContent = content.trim();
  return trimmedContent.length > 0 && trimmedContent.length <= MAX_POST_LENGTH;
}

/**
 * হ্যাশট্যাগ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidHashtags(hashtags: string[]): boolean {
  if (!Array.isArray(hashtags)) {
    return false;
  }
  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }
  const hashtagRegex = /^[a-zA-Z0-9_]+$/;
  return hashtags.every((tag) => {
    if (typeof tag !== 'string') {
      return false;
    }
    const cleanTag = tag.startsWith('#') ? tag.substring(1) : tag;
    return cleanTag.length > 0 && cleanTag.length <= 50 && hashtagRegex.test(cleanTag);
  });
}

/**
 * প্ল্যাটফর্মের নাম পাওয়ার ফাংশন
 */
export function getPlatformName(platform: SocialPlatform): string {
  const names: Record<SocialPlatform, string> = {
    facebook: 'Facebook',
    twitter: 'Twitter / X',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    youtube: 'YouTube',
    tiktok: 'TikTok',
  };
  return names[platform];
}

/**
 * প্ল্যাটফর্মের আইকন পাওয়ার ফাংশন
 */
export function getPlatformIcon(platform: SocialPlatform): string {
  const icons: Record<SocialPlatform, string> = {
    facebook: '📘',
    twitter: '🐦',
    instagram: '📸',
    linkedin: '💼',
    youtube: '▶️',
    tiktok: '🎵',
  };
  return icons[platform];
}

/**
 * প্ল্যাটফর্মের রঙ পাওয়ার ফাংশন
 */
export function getPlatformColor(platform: SocialPlatform): string {
  const colors: Record<SocialPlatform, string> = {
    facebook: '#1877F2',
    twitter: '#000000',
    instagram: '#E4405F',
    linkedin: '#0A66C2',
    youtube: '#FF0000',
    tiktok: '#000000',
  };
  return colors[platform];
}

/**
 * প্ল্যাটফর্মের সর্বোচ্চ পোস্ট দৈর্ঘ্য পাওয়ার ফাংশন
 */
export function getPlatformMaxLength(platform: SocialPlatform): number {
  const maxLengths: Record<SocialPlatform, number> = {
    facebook: 63206,
    twitter: 280,
    instagram: 2200,
    linkedin: 3000,
    youtube: 5000,
    tiktok: 2200,
  };
  return maxLengths[platform];
}

/**
 * পোস্টের এনগেজমেন্ট রেট গণনা করার ফাংশন
 */
export function calculateEngagementRate(post: SocialPostInterface): number {
  const total = post.likes + post.shares + post.comments;
  if (post.reach === 0) return 0;
  return (total / post.reach) * 100;
}

/**
 * পোস্টের ভাইরালিটি স্কোর গণনা করার ফাংশন
 */
export function calculateViralityScore(post: SocialPostInterface): number {
  if (post.impressions === 0) return 0;
  const shareRate = post.shares / post.impressions;
  return Math.min(100, shareRate * 1000);
}

/**
 * পোস্ট প্রকাশিত হয়েছে কিনা চেক করার ফাংশন
 */
export function isPostPublished(post: SocialPostInterface): boolean {
  return post.status === 'draft' && post.publishedAt !== undefined;
}

/**
 * পোস্ট নির্ধারিত কিনা চেক করার ফাংশন
 */
export function isPostScheduled(post: SocialPostInterface): boolean {
  return post.status === 'draft' && post.scheduledAt !== undefined;
}

/**
 * পোস্ট ড্রাফট কিনা চেক করার ফাংশন
 */
export function isPostDraft(post: SocialPostInterface): boolean {
  return post.status === 'draft' && !post.publishedAt;
}

/**
 * ডিফল্ট সোশ্যাল স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultSocialStatus(): SocialStatus {
  return DEFAULT_SOCIAL_STATUS;
}

/**
 * সব সোশ্যাল প্ল্যাটফর্মের তালিকা পাওয়ার ফাংশন
 */
export function getAllSocialPlatforms(): SocialPlatform[] {
  return ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'tiktok'];
}

/**
 * প্ল্যাটফর্মের সর্বোচ্চ হ্যাশট্যাগ সংখ্যা পাওয়ার ফাংশন
 */
export function getPlatformMaxHashtags(platform: SocialPlatform): number {
  const maxHashtags: Record<SocialPlatform, number> = {
    facebook: 30,
    twitter: 30,
    instagram: 30,
    linkedin: 3,
    youtube: 15,
    tiktok: 30,
  };
  return maxHashtags[platform];
}
