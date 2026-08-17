/**
 * SEO ম্যানেজমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * SEO ম্যানেজমেন্ট মডিউলের নাম
 */
export const SEO_MODULE_NAME = 'SEO Management';

/**
 * ডিফল্ট SEO টাইটেল দৈর্ঘ্য
 */
export const DEFAULT_SEO_TITLE_LENGTH = 60;

/**
 * ডিফল্ট SEO বিবরণ দৈর্ঘ্য
 */
export const DEFAULT_SEO_DESCRIPTION_LENGTH = 160;

/**
 * SEO টাইটেলের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_SEO_TITLE_LENGTH = 70;

/**
 * SEO বিবরণের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_SEO_DESCRIPTION_LENGTH = 320;

/**
 * SEO কীওয়ার্ডের সর্বোচ্চ সংখ্যা
 */
export const MAX_SEO_KEYWORDS = 10;

/**
 * ডিফল্ট OG ইমেজ
 */
export const DEFAULT_OG_IMAGE = '/images/default-og-image.jpg';

/**
 * SEO ডেটা ইন্টারফেস
 */
export interface SeoData {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

/**
 * SEO মেটা ট্যাগ ইন্টারফেস
 */
export interface SeoMetaTags {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonical: string;
  robots: string;
}

/**
 * SEO টাইটেল বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSeoTitle(title: string): boolean {
  if (!title || typeof title !== 'string') {
    return false;
  }
  const trimmedTitle = title.trim();
  return trimmedTitle.length > 0 && trimmedTitle.length <= MAX_SEO_TITLE_LENGTH;
}

/**
 * SEO বিবরণ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSeoDescription(description: string): boolean {
  if (!description || typeof description !== 'string') {
    return false;
  }
  const trimmedDescription = description.trim();
  return trimmedDescription.length > 0 && trimmedDescription.length <= MAX_SEO_DESCRIPTION_LENGTH;
}

/**
 * SEO কীওয়ার্ড বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSeoKeywords(keywords: string[]): boolean {
  if (!Array.isArray(keywords)) {
    return false;
  }
  if (keywords.length > MAX_SEO_KEYWORDS) {
    return false;
  }
  return keywords.every((keyword) => {
    if (typeof keyword !== 'string') {
      return false;
    }
    const trimmedKeyword = keyword.trim();
    return trimmedKeyword.length > 0 && trimmedKeyword.length <= 50;
  });
}

/**
 * SEO টাইটেল ট্রাঙ্কেট করার ফাংশন
 */
export function truncateSeoTitle(title: string, maxLength: number = MAX_SEO_TITLE_LENGTH): string {
  if (title.length <= maxLength) {
    return title;
  }
  return title.substring(0, maxLength - 3) + '...';
}

/**
 * SEO বিবরণ ট্রাঙ্কেট করার ফাংশন
 */
export function truncateSeoDescription(
  description: string,
  maxLength: number = MAX_SEO_DESCRIPTION_LENGTH
): string {
  if (description.length <= maxLength) {
    return description;
  }
  return description.substring(0, maxLength - 3) + '...';
}

/**
 * SEO টাইটেল ফরম্যাট করার ফাংশন
 */
export function formatSeoTitle(title: string, siteName?: string): string {
  const trimmedTitle = title.trim();
  if (!siteName) {
    return trimmedTitle;
  }
  return `${trimmedTitle} | ${siteName}`;
}

/**
 * SEO ডেটা থেকে মেটা ট্যাগ তৈরির ফাংশন
 */
export function generateSeoMetaTags(data: SeoData, siteName?: string): SeoMetaTags {
  const title = data.title || '';
  const description = data.description || '';
  const keywords = data.keywords || [];
  const ogImage = data.ogImage || DEFAULT_OG_IMAGE;
  const canonicalUrl = data.canonicalUrl || '';
  const ogTitle = data.ogTitle || title;
  const ogDescription = data.ogDescription || description;

  const formattedTitle = formatSeoTitle(title, siteName);
  const truncatedTitle = truncateSeoTitle(formattedTitle);
  const truncatedDescription = truncateSeoDescription(description);

  let robots = 'index, follow';
  if (data.noIndex && data.noFollow) {
    robots = 'noindex, nofollow';
  } else if (data.noIndex) {
    robots = 'noindex, follow';
  } else if (data.noFollow) {
    robots = 'index, nofollow';
  }

  return {
    title: truncatedTitle,
    description: truncatedDescription,
    keywords: keywords.join(', '),
    ogTitle: truncateSeoTitle(ogTitle),
    ogDescription: truncateSeoDescription(ogDescription),
    ogImage: ogImage,
    canonical: canonicalUrl,
    robots: robots,
  };
}

/**
 * ডিফল্ট SEO ডেটা পাওয়ার ফাংশন
 */
export function getDefaultSeoData(): SeoData {
  return {
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    noFollow: false,
  };
}

/**
 * SEO ডেটা বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSeoData(data: SeoData): boolean {
  if (data.title && !isValidSeoTitle(data.title)) {
    return false;
  }
  if (data.description && !isValidSeoDescription(data.description)) {
    return false;
  }
  if (data.keywords && !isValidSeoKeywords(data.keywords)) {
    return false;
  }
  return true;
}
