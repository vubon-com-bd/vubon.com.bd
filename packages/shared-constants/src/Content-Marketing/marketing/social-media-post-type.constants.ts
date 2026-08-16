/**
 * সোশ্যাল মিডিয়া পোস্টের ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * সোশ্যাল মিডিয়া পোস্টের সব ধরন
 */
export const POST_TYPES = ['text', 'image', 'video', 'carousel', 'story'] as const;

/**
 * প্রতিটি পোস্ট টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const POST_TYPE_LABELS = {
  text: {
    en: 'Text Post',
    bn: 'টেক্সট পোস্ট',
  },
  image: {
    en: 'Image Post',
    bn: 'ইমেজ পোস্ট',
  },
  video: {
    en: 'Video Post',
    bn: 'ভিডিও পোস্ট',
  },
  carousel: {
    en: 'Carousel Post',
    bn: 'ক্যারোসেল পোস্ট',
  },
  story: {
    en: 'Story',
    bn: 'স্টোরি',
  },
} as const satisfies Record<(typeof POST_TYPES)[number], { en: string; bn: string }>;

/**
 * পোস্ট টাইপ টাইপ
 */
export type PostType = (typeof POST_TYPES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট পোস্ট টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getPostTypeLabel(type: PostType, lang: Language = 'en'): string {
  return POST_TYPE_LABELS[type][lang];
}

/**
 * সব পোস্ট টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllPostTypes(): readonly PostType[] {
  return POST_TYPES;
}

/**
 * পোস্ট টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPostType(type: string): type is PostType {
  return POST_TYPES.includes(type as PostType);
}

/**
 * টাইপ টেক্সট কিনা চেক করার ফাংশন
 */
export function isTextPostType(type: PostType): boolean {
  return type === 'text';
}

/**
 * টাইপ ইমেজ কিনা চেক করার ফাংশন
 */
export function isImagePostType(type: PostType): boolean {
  return type === 'image';
}

/**
 * টাইপ ভিডিও কিনা চেক করার ফাংশন
 */
export function isVideoPostType(type: PostType): boolean {
  return type === 'video';
}

/**
 * টাইপ ক্যারোসেল কিনা চেক করার ফাংশন
 */
export function isCarouselPostType(type: PostType): boolean {
  return type === 'carousel';
}

/**
 * টাইপ স্টোরি কিনা চেক করার ফাংশন
 */
export function isStoryPostType(type: PostType): boolean {
  return type === 'story';
}

/**
 * টাইপ ভিজ্যুয়াল (ইমেজ, ভিডিও, ক্যারোসেল) কিনা চেক করার ফাংশন
 */
export function isVisualPostType(type: PostType): boolean {
  return type === 'image' || type === 'video' || type === 'carousel';
}

/**
 * টাইপ মিডিয়া (ইমেজ, ভিডিও) কিনা চেক করার ফাংশন
 */
export function isMediaPostType(type: PostType): boolean {
  return type === 'image' || type === 'video';
}

/**
 * টাইপ মাল্টি-মিডিয়া (ক্যারোসেল) কিনা চেক করার ফাংশন
 */
export function isMultiMediaPostType(type: PostType): boolean {
  return type === 'carousel';
}

/**
 * টাইপ টেম্পোরারি (স্টোরি) কিনা চেক করার ফাংশন
 */
export function isTemporaryPostType(type: PostType): boolean {
  return type === 'story';
}

/**
 * ডিফল্ট পোস্ট টাইপ পাওয়ার ফাংশন
 */
export function getDefaultPostType(): PostType {
  return 'text';
}

/**
 * পোস্ট টাইপের আইকন পাওয়ার ফাংশন
 */
export function getPostTypeIcon(type: PostType): string {
  const icons: Record<PostType, string> = {
    text: '📝',
    image: '🖼️',
    video: '🎬',
    carousel: '🎠',
    story: '📖',
  };
  return icons[type];
}

/**
 * পোস্ট টাইপের রঙ পাওয়ার ফাংশন
 */
export function getPostTypeColor(type: PostType): string {
  const colors: Record<PostType, string> = {
    text: '#6B7280',
    image: '#3B82F6',
    video: '#EF4444',
    carousel: '#F59E0B',
    story: '#8B5CF6',
  };
  return colors[type];
}

/**
 * পোস্ট টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getPostTypeDescription(type: PostType, lang: Language = 'en'): string {
  const descriptions: Record<PostType, { en: string; bn: string }> = {
    text: {
      en: 'Text-only post with no media',
      bn: 'শুধুমাত্র টেক্সট পোস্ট, কোনো মিডিয়া নেই',
    },
    image: {
      en: 'Post with a single image',
      bn: 'একটি ইমেজ সহ পোস্ট',
    },
    video: {
      en: 'Post with a video',
      bn: 'একটি ভিডিও সহ পোস্ট',
    },
    carousel: {
      en: 'Post with multiple images or videos',
      bn: 'একাধিক ইমেজ বা ভিডিও সহ পোস্ট',
    },
    story: {
      en: 'Temporary post that expires after 24 hours',
      bn: 'অস্থায়ী পোস্ট যা ২৪ ঘন্টা পরে মেয়াদ শেষ হয়',
    },
  };
  return descriptions[type][lang];
}
