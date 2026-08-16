/**
 * Open Graph মেটা ট্যাগ সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * Open Graph টাইপসমূহ
 */
export const OG_TYPES = ['website', 'article', 'product', 'video', 'music'] as const;

/**
 * ডিফল্ট Open Graph টাইপ
 */
export const DEFAULT_OG_TYPE = 'website' as const;

/**
 * Open Graph প্রপার্টিসমূহ
 */
export const OG_PROPERTIES = ['title', 'description', 'image', 'url', 'type', 'site_name'] as const;

/**
 * প্রয়োজনীয় Open Graph প্রপার্টিসমূহ
 */
export const REQUIRED_OG_PROPERTIES = ['title', 'image', 'url'] as const;

/**
 * Open Graph টাইপ টাইপ
 */
export type OgType = (typeof OG_TYPES)[number];

/**
 * Open Graph প্রপার্টি টাইপ
 */
export type OgProperty = (typeof OG_PROPERTIES)[number];

/**
 * প্রয়োজনীয় Open Graph প্রপার্টি টাইপ
 */
export type RequiredOgProperty = (typeof REQUIRED_OG_PROPERTIES)[number];

/**
 * Open Graph ডেটা ইন্টারফেস
 */
export interface OgData {
  title: string;
  description?: string;
  image: string;
  url: string;
  type?: OgType;
  site_name?: string;
  [key: string]: string | undefined;
}

/**
 * Open Graph মেটা ট্যাগ ইন্টারফেস
 */
export interface OgMetaTag {
  property: string;
  content: string;
}

/**
 * Open Graph টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidOgType(type: string): type is OgType {
  return OG_TYPES.includes(type as OgType);
}

/**
 * Open Graph প্রপার্টি বৈধ কিনা চেক করার ফাংশন
 */
export function isValidOgProperty(property: string): property is OgProperty {
  return OG_PROPERTIES.includes(property as OgProperty);
}

/**
 * Open Graph প্রপার্টি প্রয়োজনীয় কিনা চেক করার ফাংশন
 */
export function isRequiredOgProperty(property: string): property is RequiredOgProperty {
  return REQUIRED_OG_PROPERTIES.includes(property as RequiredOgProperty);
}

/**
 * Open Graph ডেটা তৈরির ফাংশন
 */
export function createOgData(
  title: string,
  image: string,
  url: string,
  options?: {
    description?: string;
    type?: OgType;
    site_name?: string;
  }
): OgData {
  const data: OgData = {
    title,
    image,
    url,
    type: options?.type || DEFAULT_OG_TYPE,
  };

  if (options?.description) {
    data.description = options.description;
  }

  if (options?.site_name) {
    data.site_name = options.site_name;
  }

  return data;
}

/**
 * Open Graph মেটা ট্যাগ তৈরির ফাংশন
 */
export function createOgMetaTags(data: OgData): OgMetaTag[] {
  const tags: OgMetaTag[] = [];

  // Add all properties
  OG_PROPERTIES.forEach((property) => {
    const value = data[property];
    if (value && typeof value === 'string') {
      tags.push({
        property: `og:${property}`,
        content: value,
      });
    }
  });

  // Add type if present
  if (data.type && isValidOgType(data.type)) {
    tags.push({
      property: 'og:type',
      content: data.type,
    });
  }

  return tags;
}

/**
 * Open Graph ডেটা বৈধ কিনা চেক করার ফাংশন
 */
export function isValidOgData(data: OgData): boolean {
  // Check required properties
  const hasRequired = REQUIRED_OG_PROPERTIES.every((prop) => {
    const value = data[prop];
    return value !== undefined && value !== null && value !== '';
  });

  if (!hasRequired) {
    return false;
  }

  // Check type if present
  if (data.type && !isValidOgType(data.type)) {
    return false;
  }

  return true;
}

/**
 * Open Graph ডেটার জন্য অনুপস্থিত প্রয়োজনীয় প্রপার্টি পাওয়ার ফাংশন
 */
export function getMissingRequiredOgProperties(data: OgData): string[] {
  return REQUIRED_OG_PROPERTIES.filter((prop) => {
    const value = data[prop];
    return value === undefined || value === null || value === '';
  });
}

/**
 * সব Open Graph টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllOgTypes(): readonly OgType[] {
  return OG_TYPES;
}

/**
 * সব Open Graph প্রপার্টির তালিকা পাওয়ার ফাংশন
 */
export function getAllOgProperties(): readonly OgProperty[] {
  return OG_PROPERTIES;
}

/**
 * প্রয়োজনীয় Open Graph প্রপার্টির তালিকা পাওয়ার ফাংশন
 */
export function getRequiredOgProperties(): readonly RequiredOgProperty[] {
  return REQUIRED_OG_PROPERTIES;
}

/**
 * ডিফল্ট Open Graph টাইপ পাওয়ার ফাংশন
 */
export function getDefaultOgType(): OgType {
  return DEFAULT_OG_TYPE;
}

/**
 * Open Graph প্রপার্টির বিবরণ পাওয়ার ফাংশন
 */
export function getOgPropertyDescription(property: OgProperty): string {
  const descriptions: Record<OgProperty, string> = {
    title: 'The title of your page or content',
    description: 'A brief description of your page or content',
    image: 'The URL of the image to display',
    url: 'The canonical URL of your page',
    type: 'The type of your content (website, article, etc.)',
    site_name: 'The name of your website',
  };
  return descriptions[property];
}

/**
 * Open Graph প্রপার্টির উদাহরণ পাওয়ার ফাংশন
 */
export function getOgPropertyExample(property: OgProperty): string {
  const examples: Record<OgProperty, string> = {
    title: 'My Awesome Page',
    description: 'This is a description of my awesome page',
    image: 'https://example.com/image.jpg',
    url: 'https://example.com/page',
    type: 'website',
    site_name: 'My Website',
  };
  return examples[property];
}
