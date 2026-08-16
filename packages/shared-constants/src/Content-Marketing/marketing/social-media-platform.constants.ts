/**
 * সোশ্যাল মিডিয়া প্ল্যাটফর্ম সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * সোশ্যাল মিডিয়া প্ল্যাটফর্মসমূহ
 */
export const SOCIAL_PLATFORMS = [
  'facebook',
  'twitter',
  'instagram',
  'linkedin',
  'youtube',
  'tiktok',
] as const;

/**
 * প্রতিটি প্ল্যাটফর্মের লেবেল (বাংলা এবং ইংরেজি)
 */
export const PLATFORM_LABELS = {
  facebook: {
    en: 'Facebook',
    bn: 'ফেসবুক',
  },
  twitter: {
    en: 'Twitter / X',
    bn: 'টুইটার / এক্স',
  },
  instagram: {
    en: 'Instagram',
    bn: 'ইনস্টাগ্রাম',
  },
  linkedin: {
    en: 'LinkedIn',
    bn: 'লিংকডইন',
  },
  youtube: {
    en: 'YouTube',
    bn: 'ইউটিউব',
  },
  tiktok: {
    en: 'TikTok',
    bn: 'টিকটক',
  },
} as const satisfies Record<(typeof SOCIAL_PLATFORMS)[number], { en: string; bn: string }>;

/**
 * প্রতিটি প্ল্যাটফর্মের আইকন (ইমোজি)
 */
export const PLATFORM_ICONS = {
  facebook: '📘',
  twitter: '🐦',
  instagram: '📸',
  linkedin: '💼',
  youtube: '▶️',
  tiktok: '🎵',
} as const satisfies Record<(typeof SOCIAL_PLATFORMS)[number], string>;

/**
 * প্রতিটি প্ল্যাটফর্মের রঙ
 */
export const PLATFORM_COLORS = {
  facebook: '#1877F2',
  twitter: '#000000',
  instagram: '#E4405F',
  linkedin: '#0A66C2',
  youtube: '#FF0000',
  tiktok: '#000000',
} as const satisfies Record<(typeof SOCIAL_PLATFORMS)[number], string>;

/**
 * প্রতিটি প্ল্যাটফর্মের সর্বোচ্চ পোস্ট দৈর্ঘ্য
 */
export const PLATFORM_MAX_LENGTHS = {
  facebook: 63206,
  twitter: 280,
  instagram: 2200,
  linkedin: 3000,
  youtube: 5000,
  tiktok: 2200,
} as const satisfies Record<(typeof SOCIAL_PLATFORMS)[number], number>;

/**
 * প্রতিটি প্ল্যাটফর্মের সর্বোচ্চ হ্যাশট্যাগ সংখ্যা
 */
export const PLATFORM_MAX_HASHTAGS = {
  facebook: 30,
  twitter: 30,
  instagram: 30,
  linkedin: 3,
  youtube: 15,
  tiktok: 30,
} as const satisfies Record<(typeof SOCIAL_PLATFORMS)[number], number>;

/**
 * প্রতিটি প্ল্যাটফর্মের URL
 */
export const PLATFORM_URLS = {
  facebook: 'https://facebook.com',
  twitter: 'https://twitter.com',
  instagram: 'https://instagram.com',
  linkedin: 'https://linkedin.com',
  youtube: 'https://youtube.com',
  tiktok: 'https://tiktok.com',
} as const satisfies Record<(typeof SOCIAL_PLATFORMS)[number], string>;

/**
 * সোশ্যাল মিডিয়া প্ল্যাটফর্ম টাইপ
 */
export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট প্ল্যাটফর্মের লেবেল পাওয়ার ফাংশন
 */
export function getPlatformLabel(platform: SocialPlatform, lang: Language = 'en'): string {
  return PLATFORM_LABELS[platform][lang];
}

/**
 * নির্দিষ্ট প্ল্যাটফর্মের আইকন পাওয়ার ফাংশন
 */
export function getPlatformIcon(platform: SocialPlatform): string {
  return PLATFORM_ICONS[platform];
}

/**
 * নির্দিষ্ট প্ল্যাটফর্মের রঙ পাওয়ার ফাংশন
 */
export function getPlatformColor(platform: SocialPlatform): string {
  return PLATFORM_COLORS[platform];
}

/**
 * নির্দিষ্ট প্ল্যাটফর্মের সর্বোচ্চ পোস্ট দৈর্ঘ্য পাওয়ার ফাংশন
 */
export function getPlatformMaxLength(platform: SocialPlatform): number {
  return PLATFORM_MAX_LENGTHS[platform];
}

/**
 * নির্দিষ্ট প্ল্যাটফর্মের সর্বোচ্চ হ্যাশট্যাগ সংখ্যা পাওয়ার ফাংশন
 */
export function getPlatformMaxHashtags(platform: SocialPlatform): number {
  return PLATFORM_MAX_HASHTAGS[platform];
}

/**
 * নির্দিষ্ট প্ল্যাটফর্মের URL পাওয়ার ফাংশন
 */
export function getPlatformUrl(platform: SocialPlatform): string {
  return PLATFORM_URLS[platform];
}

/**
 * সব সোশ্যাল মিডিয়া প্ল্যাটফর্মের তালিকা পাওয়ার ফাংশন
 */
export function getAllSocialPlatforms(): readonly SocialPlatform[] {
  return SOCIAL_PLATFORMS;
}

/**
 * সোশ্যাল মিডিয়া প্ল্যাটফর্ম বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSocialPlatform(platform: string): platform is SocialPlatform {
  return SOCIAL_PLATFORMS.includes(platform as SocialPlatform);
}

/**
 * প্ল্যাটফর্মটি মাইক্রোব্লগিং (টুইটার) কিনা চেক করার ফাংশন
 */
export function isMicrobloggingPlatform(platform: SocialPlatform): boolean {
  return platform === 'twitter';
}

/**
 * প্ল্যাটফর্মটি ভিজুয়াল (ইনস্টাগ্রাম, টিকটক) কিনা চেক করার ফাংশন
 */
export function isVisualPlatform(platform: SocialPlatform): boolean {
  return platform === 'instagram' || platform === 'tiktok';
}

/**
 * প্ল্যাটফর্মটি প্রফেশনাল (লিংকডইন) কিনা চেক করার ফাংশন
 */
export function isProfessionalPlatform(platform: SocialPlatform): boolean {
  return platform === 'linkedin';
}

/**
 * প্ল্যাটফর্মটি ভিডিও (ইউটিউব) কিনা চেক করার ফাংশন
 */
export function isVideoPlatform(platform: SocialPlatform): boolean {
  return platform === 'youtube';
}

/**
 * প্ল্যাটফর্মটি সোশ্যাল নেটওয়ার্ক (ফেসবুক) কিনা চেক করার ফাংশন
 */
export function isSocialNetworkPlatform(platform: SocialPlatform): boolean {
  return platform === 'facebook';
}

/**
 * প্ল্যাটফর্মের টাইপ ক্যাটাগরি পাওয়ার ফাংশন
 */
export function getPlatformCategory(platform: SocialPlatform): string {
  if (isMicrobloggingPlatform(platform)) return 'microblogging';
  if (isVisualPlatform(platform)) return 'visual';
  if (isProfessionalPlatform(platform)) return 'professional';
  if (isVideoPlatform(platform)) return 'video';
  if (isSocialNetworkPlatform(platform)) return 'social-network';
  return 'other';
}

/**
 * ডিফল্ট সোশ্যাল মিডিয়া প্ল্যাটফর্ম পাওয়ার ফাংশন
 */
export function getDefaultSocialPlatform(): SocialPlatform {
  return 'facebook';
}

/**
 * প্ল্যাটফর্মের বিবরণ পাওয়ার ফাংশন
 */
export function getPlatformDescription(platform: SocialPlatform, lang: Language = 'en'): string {
  const descriptions: Record<SocialPlatform, { en: string; bn: string }> = {
    facebook: {
      en: 'Largest social networking platform',
      bn: 'সবচেয়ে বড় সোশ্যাল নেটওয়ার্কিং প্ল্যাটফর্ম',
    },
    twitter: {
      en: 'Microblogging platform for short updates',
      bn: 'সংক্ষিপ্ত আপডেটের জন্য মাইক্রোব্লগিং প্ল্যাটফর্ম',
    },
    instagram: {
      en: 'Visual platform for photos and videos',
      bn: 'ছবি এবং ভিডিওর জন্য ভিজুয়াল প্ল্যাটফর্ম',
    },
    linkedin: {
      en: 'Professional networking platform',
      bn: 'পেশাদার নেটওয়ার্কিং প্ল্যাটফর্ম',
    },
    youtube: {
      en: 'Video sharing platform',
      bn: 'ভিডিও শেয়ারিং প্ল্যাটফর্ম',
    },
    tiktok: {
      en: 'Short-form video platform',
      bn: 'সংক্ষিপ্ত ভিডিও প্ল্যাটফর্ম',
    },
  };
  return descriptions[platform][lang];
}
