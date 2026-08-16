/**
 * SEO মেটা ট্যাগ সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * SEO মেটা ট্যাগসমূহ
 */
export const META_TAGS = ['title', 'description', 'keywords', 'robots', 'canonical'] as const;

/**
 * প্রয়োজনীয় মেটা ট্যাগসমূহ
 */
export const REQUIRED_META_TAGS = ['title', 'description'] as const;

/**
 * প্রতিটি মেটা ট্যাগের ফরম্যাট
 */
export const META_TAG_FORMATS = {
  title: {
    format: 'string',
    maxLength: 70,
    minLength: 20,
    example: 'My Page Title | Site Name',
    description: 'Page title displayed in search results and browser tab',
  },
  description: {
    format: 'string',
    maxLength: 320,
    minLength: 50,
    example: 'This is a brief description of the page content for search engines',
    description: 'Page description displayed in search results',
  },
  keywords: {
    format: 'string[]',
    maxCount: 10,
    minLength: 2,
    maxLength: 50,
    example: 'keyword1, keyword2, keyword3',
    description: 'Keywords for search engine optimization',
  },
  robots: {
    format: 'string',
    allowedValues: ['index, follow', 'noindex, nofollow', 'index, nofollow', 'noindex, follow'],
    default: 'index, follow',
    example: 'index, follow',
    description: 'Robots meta tag for search engine crawling instructions',
  },
  canonical: {
    format: 'string',
    maxLength: 2048,
    example: 'https://example.com/page',
    description: 'Canonical URL to avoid duplicate content issues',
  },
} as const;

/**
 * SEO মেটা ট্যাগ টাইপ
 */
export type MetaTag = (typeof META_TAGS)[number];

/**
 * প্রয়োজনীয় মেটা ট্যাগ টাইপ
 */
export type RequiredMetaTag = (typeof REQUIRED_META_TAGS)[number];

/**
 * মেটা ট্যাগের কনফিগারেশন ইন্টারফেস
 */
export interface MetaTagConfig {
  name: MetaTag;
  value: string | string[];
  maxLength?: number;
  minLength?: number;
  required?: boolean;
}

/**
 * মেটা ট্যাগ রেসপন্স ইন্টারফেস
 */
export interface MetaTagResponse {
  tag: MetaTag;
  value: string | string[];
  isValid: boolean;
  errors?: string[];
}

/**
 * SEO মেটা ডেটা ইন্টারফেস
 */
export interface SeoMetaData {
  title: string;
  description: string;
  keywords: string[];
  robots: string;
  canonical: string;
}

/**
 * মেটা ট্যাগ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidMetaTag(tag: string): tag is MetaTag {
  return META_TAGS.includes(tag as MetaTag);
}

/**
 * মেটা ট্যাগ প্রয়োজনীয় কিনা চেক করার ফাংশন
 */
export function isRequiredMetaTag(tag: string): tag is RequiredMetaTag {
  return REQUIRED_META_TAGS.includes(tag as RequiredMetaTag);
}

/**
 * মেটা ট্যাগের ফরম্যাট পাওয়ার ফাংশন
 */
export function getMetaTagFormat(tag: MetaTag) {
  return META_TAG_FORMATS[tag];
}

/**
 * মেটা ট্যাগ বৈধ কিনা চেক করার ফাংশন
 */
export function validateMetaTag(tag: MetaTag, value: string | string[]): MetaTagResponse {
  const errors: string[] = [];
  const format = META_TAG_FORMATS[tag];
  const response: MetaTagResponse = {
    tag,
    value,
    isValid: true,
    errors: [],
  };

  if (tag === 'keywords' && Array.isArray(value)) {
    const maxCount = 'maxCount' in format ? format.maxCount : 0;
    if (maxCount && value.length > maxCount) {
      errors.push(`Keywords count ${value.length} exceeds maximum ${maxCount}`);
      response.isValid = false;
    }
    const maxLength = 'maxLength' in format ? format.maxLength : 0;
    if (maxLength) {
      const invalidKeywords = value.filter(
        (keyword) => typeof keyword !== 'string' || keyword.length > maxLength
      );
      if (invalidKeywords.length > 0) {
        errors.push(`Some keywords exceed maximum length of ${maxLength}`);
        response.isValid = false;
      }
    }
  } else if (typeof value === 'string') {
    const minLength = 'minLength' in format ? format.minLength : 0;
    if (minLength && value.length < minLength) {
      errors.push(`Value length ${value.length} is less than minimum ${minLength}`);
      response.isValid = false;
    }
    const maxLength = 'maxLength' in format ? format.maxLength : 0;
    if (maxLength && value.length > maxLength) {
      errors.push(`Value length ${value.length} exceeds maximum ${maxLength}`);
      response.isValid = false;
    }
    if (tag === 'robots') {
      const allowedValues = 'allowedValues' in format ? format.allowedValues : [];
      if (allowedValues && allowedValues.length > 0) {
        const isAllowed = allowedValues.some((allowed) => allowed === value);
        if (!isAllowed) {
          errors.push(`Invalid robots value "${value}". Allowed: ${allowedValues.join(', ')}`);
          response.isValid = false;
        }
      }
    }
  }

  response.errors = errors;
  return response;
}

/**
 * SEO মেটা ডেটা তৈরির ফাংশন
 */
export function createSeoMetaData(data: Partial<SeoMetaData>): SeoMetaData {
  return {
    title: data.title || '',
    description: data.description || '',
    keywords: data.keywords || [],
    robots: data.robots || 'index, follow',
    canonical: data.canonical || '',
  };
}

/**
 * SEO মেটা ডেটা বৈধ কিনা চেক করার ফাংশন
 */
export function validateSeoMetaData(data: SeoMetaData): MetaTagResponse[] {
  const results: MetaTagResponse[] = [];

  // Validate required meta tags
  REQUIRED_META_TAGS.forEach((tag) => {
    const value = data[tag as keyof SeoMetaData] as string;
    const result = validateMetaTag(tag, value);
    results.push(result);
  });

  // Validate optional meta tags
  META_TAGS.forEach((tag) => {
    if (!REQUIRED_META_TAGS.includes(tag as RequiredMetaTag)) {
      const value = data[tag as keyof SeoMetaData] as string | string[];
      if (value && (Array.isArray(value) ? value.length > 0 : value.length > 0)) {
        const result = validateMetaTag(tag, value);
        results.push(result);
      }
    }
  });

  return results;
}

/**
 * সব মেটা ট্যাগের তালিকা পাওয়ার ফাংশন
 */
export function getAllMetaTags(): readonly MetaTag[] {
  return META_TAGS;
}

/**
 * প্রয়োজনীয় মেটা ট্যাগের তালিকা পাওয়ার ফাংশন
 */
export function getRequiredMetaTags(): readonly RequiredMetaTag[] {
  return REQUIRED_META_TAGS;
}

/**
 * মেটা ট্যাগ ফরম্যাট চেক করার ফাংশন
 */
export function getMetaTagFormatDescription(tag: MetaTag): string {
  return META_TAG_FORMATS[tag].description;
}

/**
 * মেটা ট্যাগের ডিফল্ট ভ্যালু পাওয়ার ফাংশন
 */
export function getDefaultMetaTagValue(tag: MetaTag): string | undefined {
  const format = META_TAG_FORMATS[tag];
  return 'default' in format ? format.default : undefined;
}
