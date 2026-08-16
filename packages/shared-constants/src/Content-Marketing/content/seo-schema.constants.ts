/**
 * Schema.org সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * Schema টাইপসমূহ
 */
export const SCHEMA_TYPES = [
  'Article',
  'BlogPosting',
  'WebPage',
  'Product',
  'FAQPage',
  'VideoObject',
  'PodcastEpisode',
] as const;

/**
 * প্রতিটি Schema টাইপের জন্য প্রয়োজনীয় প্রপার্টি
 */
export const REQUIRED_SCHEMA_PROPERTIES = {
  Article: ['headline', 'author', 'datePublished', 'dateModified'],
  BlogPosting: ['headline', 'author', 'datePublished', 'dateModified', 'mainEntityOfPage'],
  WebPage: ['name', 'description', 'url'],
  Product: ['name', 'description', 'sku', 'offers'],
  FAQPage: ['mainEntity'],
  VideoObject: ['name', 'description', 'thumbnailUrl', 'uploadDate'],
  PodcastEpisode: ['name', 'description', 'datePublished', 'duration'],
} as const;

/**
 * Schema টাইপের জন্য প্রস্তাবিত প্রপার্টি
 */
export const RECOMMENDED_SCHEMA_PROPERTIES = {
  Article: ['keywords', 'image', 'publisher', 'mainEntityOfPage'],
  BlogPosting: ['keywords', 'image', 'publisher', 'wordCount'],
  WebPage: ['breadcrumb', 'keywords', 'lastReviewed', 'primaryImageOfPage'],
  Product: ['image', 'brand', 'review', 'aggregateRating'],
  FAQPage: ['headline', 'description'],
  VideoObject: ['duration', 'contentUrl', 'interactionCount'],
  PodcastEpisode: ['audio', 'episodeNumber', 'seasonNumber'],
} as const;

/**
 * Schema টাইপের জন্য সম্পূর্ণ প্রপার্টি তালিকা
 */
export const FULL_SCHEMA_PROPERTIES = {
  Article: [
    'headline',
    'author',
    'datePublished',
    'dateModified',
    'keywords',
    'image',
    'publisher',
    'mainEntityOfPage',
    'articleBody',
    'articleSection',
  ],
  BlogPosting: [
    'headline',
    'author',
    'datePublished',
    'dateModified',
    'mainEntityOfPage',
    'keywords',
    'image',
    'publisher',
    'wordCount',
    'articleBody',
  ],
  WebPage: [
    'name',
    'description',
    'url',
    'breadcrumb',
    'keywords',
    'lastReviewed',
    'primaryImageOfPage',
    'about',
  ],
  Product: [
    'name',
    'description',
    'sku',
    'offers',
    'image',
    'brand',
    'review',
    'aggregateRating',
    'mpn',
    'gtin',
  ],
  FAQPage: ['mainEntity', 'headline', 'description', 'about'],
  VideoObject: [
    'name',
    'description',
    'thumbnailUrl',
    'uploadDate',
    'duration',
    'contentUrl',
    'interactionCount',
    'transcript',
  ],
  PodcastEpisode: [
    'name',
    'description',
    'datePublished',
    'duration',
    'audio',
    'episodeNumber',
    'seasonNumber',
  ],
} as const;

/**
 * Schema টাইপ টাইপ
 */
export type SchemaType = (typeof SCHEMA_TYPES)[number];

/**
 * Schema প্রপার্টি ভ্যালু টাইপ
 */
export type SchemaPropertyValue = string | number | boolean | object | undefined;

/**
 * Schema অবজেক্ট ইন্টারফেস
 */
export interface SchemaObject {
  '@context': string;
  '@type': SchemaType;
  [key: string]: SchemaPropertyValue | Record<string, unknown> | unknown[];
}

/**
 * Schema টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSchemaType(type: string): type is SchemaType {
  return SCHEMA_TYPES.includes(type as SchemaType);
}

/**
 * Schema টাইপের জন্য প্রয়োজনীয় প্রপার্টি পাওয়ার ফাংশন
 */
export function getRequiredSchemaProperties(schemaType: SchemaType): readonly string[] {
  return REQUIRED_SCHEMA_PROPERTIES[schemaType] as readonly string[];
}

/**
 * Schema টাইপের জন্য প্রস্তাবিত প্রপার্টি পাওয়ার ফাংশন
 */
export function getRecommendedSchemaProperties(schemaType: SchemaType): readonly string[] {
  return RECOMMENDED_SCHEMA_PROPERTIES[schemaType] as readonly string[];
}

/**
 * Schema টাইপের জন্য সম্পূর্ণ প্রপার্টি পাওয়ার ফাংশন
 */
export function getFullSchemaProperties(schemaType: SchemaType): readonly string[] {
  return FULL_SCHEMA_PROPERTIES[schemaType] as readonly string[];
}

/**
 * Schema অবজেক্ট তৈরির ফাংশন
 */
export function createSchemaObject<T extends Record<string, unknown>>(
  type: SchemaType,
  data: T
): SchemaObject {
  const schemaObject: SchemaObject = {
    '@context': 'https://schema.org',
    '@type': type,
  } as SchemaObject;

  // Add all data properties to schema object
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (value !== undefined) {
      schemaObject[key] = value as SchemaPropertyValue | Record<string, unknown> | unknown[];
    }
  });

  return schemaObject;
}

/**
 * Schema প্রপার্টি বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSchemaProperty(schemaType: SchemaType, property: string): boolean {
  const fullProperties = FULL_SCHEMA_PROPERTIES[schemaType];
  return fullProperties.includes(property as never);
}

/**
 * Schema এর প্রয়োজনীয় প্রপার্টি চেক করার ফাংশন
 */
export function hasRequiredSchemaProperties(
  schemaType: SchemaType,
  data: Record<string, unknown>
): boolean {
  const required = REQUIRED_SCHEMA_PROPERTIES[schemaType];
  return required.every((prop) => prop in data);
}

/**
 * Schema এর জন্য অনুপস্থিত প্রয়োজনীয় প্রপার্টি পাওয়ার ফাংশন
 */
export function getMissingRequiredSchemaProperties(
  schemaType: SchemaType,
  data: Record<string, unknown>
): string[] {
  const required = REQUIRED_SCHEMA_PROPERTIES[schemaType];
  return required.filter((prop) => !(prop in data));
}

/**
 * সব Schema টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllSchemaTypes(): readonly SchemaType[] {
  return SCHEMA_TYPES;
}

/**
 * Schema টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getSchemaTypeDescription(schemaType: SchemaType): string {
  const descriptions: Record<SchemaType, string> = {
    Article: 'A news article or blog post',
    BlogPosting: 'A blog post',
    WebPage: 'A web page',
    Product: 'A product for sale',
    FAQPage: 'A frequently asked questions page',
    VideoObject: 'A video',
    PodcastEpisode: 'A podcast episode',
  };
  return descriptions[schemaType];
}

/**
 * Schema টাইপের উদাহরণ পাওয়ার ফাংশন
 */
export function getSchemaTypeExample(schemaType: SchemaType): SchemaObject {
  const examples: Record<SchemaType, SchemaObject> = {
    Article: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Example Article',
      author: 'John Doe',
      datePublished: '2024-01-01',
      dateModified: '2024-01-02',
    } as SchemaObject,
    BlogPosting: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Example Blog Post',
      author: 'Jane Doe',
      datePublished: '2024-01-01',
      dateModified: '2024-01-02',
      mainEntityOfPage: 'https://example.com/blog/post',
    } as SchemaObject,
    WebPage: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Example Page',
      description: 'This is an example web page',
      url: 'https://example.com/page',
    } as SchemaObject,
    Product: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Example Product',
      description: 'This is an example product',
      sku: '12345',
      offers: {
        '@type': 'Offer',
        price: '100',
        priceCurrency: 'USD',
      },
    } as SchemaObject,
    FAQPage: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Frequently Asked Question?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'This is the answer to the question.',
          },
        },
      ],
    } as SchemaObject,
    VideoObject: {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Example Video',
      description: 'This is an example video',
      thumbnailUrl: 'https://example.com/thumbnail.jpg',
      uploadDate: '2024-01-01',
    } as SchemaObject,
    PodcastEpisode: {
      '@context': 'https://schema.org',
      '@type': 'PodcastEpisode',
      name: 'Example Podcast Episode',
      description: 'This is an example podcast episode',
      datePublished: '2024-01-01',
      duration: 'PT30M',
    } as SchemaObject,
  };
  return examples[schemaType];
}
