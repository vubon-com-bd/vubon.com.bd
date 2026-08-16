/**
 * Twitter Card সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * Twitter Card টাইপসমূহ
 */
export const TWITTER_CARD_TYPES = ['summary', 'summary_large_image', 'app', 'player'] as const;

/**
 * ডিফল্ট Twitter Card টাইপ
 */
export const DEFAULT_TWITTER_CARD_TYPE = 'summary_large_image' as const;

/**
 * Twitter Card প্রপার্টিসমূহ
 */
export const TWITTER_PROPERTIES = [
  'card',
  'title',
  'description',
  'image',
  'site',
  'creator',
] as const;

/**
 * Twitter Card টাইপ টাইপ
 */
export type TwitterCardType = (typeof TWITTER_CARD_TYPES)[number];

/**
 * Twitter Card প্রপার্টি টাইপ
 */
export type TwitterProperty = (typeof TWITTER_PROPERTIES)[number];

/**
 * Twitter Card ডেটা ইন্টারফেস
 */
export interface TwitterCardData {
  card: TwitterCardType;
  title: string;
  description?: string;
  image?: string;
  site?: string;
  creator?: string;
  [key: string]: string | TwitterCardType | undefined;
}

/**
 * Twitter Card মেটা ট্যাগ ইন্টারফেস
 */
export interface TwitterMetaTag {
  name: string;
  content: string;
}

/**
 * Twitter Card টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidTwitterCardType(type: string): type is TwitterCardType {
  return TWITTER_CARD_TYPES.includes(type as TwitterCardType);
}

/**
 * Twitter Card প্রপার্টি বৈধ কিনা চেক করার ফাংশন
 */
export function isValidTwitterProperty(property: string): property is TwitterProperty {
  return TWITTER_PROPERTIES.includes(property as TwitterProperty);
}

/**
 * Twitter Card ডেটা তৈরির ফাংশন
 */
export function createTwitterCardData(
  title: string,
  options?: {
    card?: TwitterCardType;
    description?: string;
    image?: string;
    site?: string;
    creator?: string;
  }
): TwitterCardData {
  const data: TwitterCardData = {
    card: options?.card || DEFAULT_TWITTER_CARD_TYPE,
    title,
  };

  if (options?.description) {
    data.description = options.description;
  }

  if (options?.image) {
    data.image = options.image;
  }

  if (options?.site) {
    data.site = options.site;
  }

  if (options?.creator) {
    data.creator = options.creator;
  }

  return data;
}

/**
 * Twitter Card মেটা ট্যাগ তৈরির ফাংশন
 */
export function createTwitterMetaTags(data: TwitterCardData): TwitterMetaTag[] {
  const tags: TwitterMetaTag[] = [];

  // Add all properties
  TWITTER_PROPERTIES.forEach((property) => {
    let value = data[property];

    // Handle card type
    if (property === 'card' && value && typeof value === 'string') {
      tags.push({
        name: `twitter:${property}`,
        content: value,
      });
    } else if (value && typeof value === 'string') {
      tags.push({
        name: `twitter:${property}`,
        content: value,
      });
    }
  });

  return tags;
}

/**
 * Twitter Card ডেটা বৈধ কিনা চেক করার ফাংশন
 */
export function isValidTwitterCardData(data: TwitterCardData): boolean {
  // Check required properties
  if (!data.title || data.title.trim() === '') {
    return false;
  }

  // Check card type if present
  if (data.card && !isValidTwitterCardType(data.card)) {
    return false;
  }

  return true;
}

/**
 * সব Twitter Card টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllTwitterCardTypes(): readonly TwitterCardType[] {
  return TWITTER_CARD_TYPES;
}

/**
 * সব Twitter Card প্রপার্টির তালিকা পাওয়ার ফাংশন
 */
export function getAllTwitterProperties(): readonly TwitterProperty[] {
  return TWITTER_PROPERTIES;
}

/**
 * ডিফল্ট Twitter Card টাইপ পাওয়ার ফাংশন
 */
export function getDefaultTwitterCardType(): TwitterCardType {
  return DEFAULT_TWITTER_CARD_TYPE;
}

/**
 * Twitter Card প্রপার্টির বিবরণ পাওয়ার ফাংশন
 */
export function getTwitterPropertyDescription(property: TwitterProperty): string {
  const descriptions: Record<TwitterProperty, string> = {
    card: 'The type of Twitter Card to display (summary, summary_large_image, app, player)',
    title: 'The title of your page or content for Twitter',
    description: 'A brief description of your page or content for Twitter',
    image: 'The URL of the image to display on Twitter',
    site: 'The Twitter username of the site',
    creator: 'The Twitter username of the content creator',
  };
  return descriptions[property];
}

/**
 * Twitter Card প্রপার্টির উদাহরণ পাওয়ার ফাংশন
 */
export function getTwitterPropertyExample(property: TwitterProperty): string {
  const examples: Record<TwitterProperty, string> = {
    card: 'summary_large_image',
    title: 'My Awesome Page',
    description: 'This is a description of my awesome page for Twitter',
    image: 'https://example.com/twitter-image.jpg',
    site: '@mysite',
    creator: '@mycreator',
  };
  return examples[property];
}

/**
 * Twitter Card টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getTwitterCardTypeDescription(cardType: TwitterCardType): string {
  const descriptions: Record<TwitterCardType, string> = {
    summary: 'A summary card with a small image and text',
    summary_large_image: 'A summary card with a large featured image',
    app: 'A card for mobile app promotion',
    player: 'A card for video or audio content',
  };
  return descriptions[cardType];
}
