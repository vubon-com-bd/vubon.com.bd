/**
 * SEO Schema Constants
 * Configuration for schema markup and structured data
 */

export const CONTENT_SEO_SCHEMA = {
  // Schema Types
  TYPES: {
    ORGANIZATION: 'Organization',
    PERSON: 'Person',
    PRODUCT: 'Product',
    SERVICE: 'Service',
    OFFER: 'Offer',
    REVIEW: 'Review',
    ARTICLE: 'Article',
    BLOG_POSTING: 'BlogPosting',
    NEWS_ARTICLE: 'NewsArticle',
    WEB_PAGE: 'WebPage',
    ABOUT_PAGE: 'AboutPage',
    CONTACT_PAGE: 'ContactPage',
    FAQ_PAGE: 'FAQPage',
    QUESTION: 'Question',
    ANSWER: 'Answer',
    EVENT: 'Event',
    LOCAL_BUSINESS: 'LocalBusiness',
    RESTAURANT: 'Restaurant',
    STORE: 'Store',
    MOVIE: 'Movie',
    BOOK: 'Book',
    RECIPE: 'Recipe',
    VIDEO_OBJECT: 'VideoObject',
    AUDIO_OBJECT: 'AudioObject',
    IMAGE_OBJECT: 'ImageObject',
    CUSTOM: 'Custom',
  } as const,

  // Schema Formats
  FORMATS: {
    JSON_LD: 'json_ld',
    MICRODATA: 'microdata',
    RDFA: 'rdfa',
    CUSTOM: 'custom',
  } as const,

  // Schema Properties
  PROPERTIES: {
    NAME: 'name',
    DESCRIPTION: 'description',
    URL: 'url',
    IMAGE: 'image',
    LOGO: 'logo',
    PRICE: 'price',
    PRICE_CURRENCY: 'priceCurrency',
    AVAILABILITY: 'availability',
    RATING: 'rating',
    REVIEW_COUNT: 'reviewCount',
    AUTHOR: 'author',
    DATE_PUBLISHED: 'datePublished',
    DATE_MODIFIED: 'dateModified',
    KEYWORDS: 'keywords',
    ADDRESS: 'address',
    TELEPHONE: 'telephone',
    EMAIL: 'email',
    SOCIAL: 'social',
    CUSTOM: 'custom',
  } as const,

  // Schema Defaults
  DEFAULTS: {
    FORMAT: 'json_ld',
    TYPE: 'WebPage',
  } as const,

  // Schema Limits
  LIMITS: {
    MAX_PROPERTIES: 50,
    MAX_NESTED_LEVELS: 5,
    MAX_SIZE_BYTES: 10000,
  } as const,
} as const;

// Schema Types
export type ContentSEOSchemaType =
  (typeof CONTENT_SEO_SCHEMA.TYPES)[keyof typeof CONTENT_SEO_SCHEMA.TYPES];

// Schema Formats
export type ContentSEOSchemaFormat =
  (typeof CONTENT_SEO_SCHEMA.FORMATS)[keyof typeof CONTENT_SEO_SCHEMA.FORMATS];

// Schema Properties
export type ContentSEOSchemaProperty =
  (typeof CONTENT_SEO_SCHEMA.PROPERTIES)[keyof typeof CONTENT_SEO_SCHEMA.PROPERTIES];

// Utility Functions
export function contentSeoSchemaGetTypeLabel(type: ContentSEOSchemaType): string {
  const labels: Record<ContentSEOSchemaType, string> = {
    [CONTENT_SEO_SCHEMA.TYPES.ORGANIZATION]: 'Organization Schema',
    [CONTENT_SEO_SCHEMA.TYPES.PERSON]: 'Person Schema',
    [CONTENT_SEO_SCHEMA.TYPES.PRODUCT]: 'Product Schema',
    [CONTENT_SEO_SCHEMA.TYPES.SERVICE]: 'Service Schema',
    [CONTENT_SEO_SCHEMA.TYPES.OFFER]: 'Offer Schema',
    [CONTENT_SEO_SCHEMA.TYPES.REVIEW]: 'Review Schema',
    [CONTENT_SEO_SCHEMA.TYPES.ARTICLE]: 'Article Schema',
    [CONTENT_SEO_SCHEMA.TYPES.BLOG_POSTING]: 'Blog Posting Schema',
    [CONTENT_SEO_SCHEMA.TYPES.NEWS_ARTICLE]: 'News Article Schema',
    [CONTENT_SEO_SCHEMA.TYPES.WEB_PAGE]: 'Web Page Schema',
    [CONTENT_SEO_SCHEMA.TYPES.ABOUT_PAGE]: 'About Page Schema',
    [CONTENT_SEO_SCHEMA.TYPES.CONTACT_PAGE]: 'Contact Page Schema',
    [CONTENT_SEO_SCHEMA.TYPES.FAQ_PAGE]: 'FAQ Page Schema',
    [CONTENT_SEO_SCHEMA.TYPES.QUESTION]: 'Question Schema',
    [CONTENT_SEO_SCHEMA.TYPES.ANSWER]: 'Answer Schema',
    [CONTENT_SEO_SCHEMA.TYPES.EVENT]: 'Event Schema',
    [CONTENT_SEO_SCHEMA.TYPES.LOCAL_BUSINESS]: 'Local Business Schema',
    [CONTENT_SEO_SCHEMA.TYPES.RESTAURANT]: 'Restaurant Schema',
    [CONTENT_SEO_SCHEMA.TYPES.STORE]: 'Store Schema',
    [CONTENT_SEO_SCHEMA.TYPES.MOVIE]: 'Movie Schema',
    [CONTENT_SEO_SCHEMA.TYPES.BOOK]: 'Book Schema',
    [CONTENT_SEO_SCHEMA.TYPES.RECIPE]: 'Recipe Schema',
    [CONTENT_SEO_SCHEMA.TYPES.VIDEO_OBJECT]: 'Video Object Schema',
    [CONTENT_SEO_SCHEMA.TYPES.AUDIO_OBJECT]: 'Audio Object Schema',
    [CONTENT_SEO_SCHEMA.TYPES.IMAGE_OBJECT]: 'Image Object Schema',
    [CONTENT_SEO_SCHEMA.TYPES.CUSTOM]: 'Custom Schema',
  };
  return labels[type] || 'Unknown Schema Type';
}

export function contentSeoSchemaGetFormatLabel(format: ContentSEOSchemaFormat): string {
  const labels: Record<ContentSEOSchemaFormat, string> = {
    [CONTENT_SEO_SCHEMA.FORMATS.JSON_LD]: 'JSON-LD Format',
    [CONTENT_SEO_SCHEMA.FORMATS.MICRODATA]: 'Microdata Format',
    [CONTENT_SEO_SCHEMA.FORMATS.RDFA]: 'RDFa Format',
    [CONTENT_SEO_SCHEMA.FORMATS.CUSTOM]: 'Custom Format',
  };
  return labels[format] || 'Unknown Format';
}

export function contentSeoSchemaGetPropertyLabel(property: ContentSEOSchemaProperty): string {
  const labels: Record<ContentSEOSchemaProperty, string> = {
    [CONTENT_SEO_SCHEMA.PROPERTIES.NAME]: 'Name',
    [CONTENT_SEO_SCHEMA.PROPERTIES.DESCRIPTION]: 'Description',
    [CONTENT_SEO_SCHEMA.PROPERTIES.URL]: 'URL',
    [CONTENT_SEO_SCHEMA.PROPERTIES.IMAGE]: 'Image',
    [CONTENT_SEO_SCHEMA.PROPERTIES.LOGO]: 'Logo',
    [CONTENT_SEO_SCHEMA.PROPERTIES.PRICE]: 'Price',
    [CONTENT_SEO_SCHEMA.PROPERTIES.PRICE_CURRENCY]: 'Price Currency',
    [CONTENT_SEO_SCHEMA.PROPERTIES.AVAILABILITY]: 'Availability',
    [CONTENT_SEO_SCHEMA.PROPERTIES.RATING]: 'Rating',
    [CONTENT_SEO_SCHEMA.PROPERTIES.REVIEW_COUNT]: 'Review Count',
    [CONTENT_SEO_SCHEMA.PROPERTIES.AUTHOR]: 'Author',
    [CONTENT_SEO_SCHEMA.PROPERTIES.DATE_PUBLISHED]: 'Date Published',
    [CONTENT_SEO_SCHEMA.PROPERTIES.DATE_MODIFIED]: 'Date Modified',
    [CONTENT_SEO_SCHEMA.PROPERTIES.KEYWORDS]: 'Keywords',
    [CONTENT_SEO_SCHEMA.PROPERTIES.ADDRESS]: 'Address',
    [CONTENT_SEO_SCHEMA.PROPERTIES.TELEPHONE]: 'Telephone',
    [CONTENT_SEO_SCHEMA.PROPERTIES.EMAIL]: 'Email',
    [CONTENT_SEO_SCHEMA.PROPERTIES.SOCIAL]: 'Social Media',
    [CONTENT_SEO_SCHEMA.PROPERTIES.CUSTOM]: 'Custom Property',
  };
  return labels[property] || 'Unknown Property';
}

export function contentSeoSchemaGetDefaultFormat(): ContentSEOSchemaFormat {
  return CONTENT_SEO_SCHEMA.DEFAULTS.FORMAT as ContentSEOSchemaFormat;
}

export function contentSeoSchemaGetDefaultType(): ContentSEOSchemaType {
  return CONTENT_SEO_SCHEMA.DEFAULTS.TYPE as ContentSEOSchemaType;
}

export function contentSeoSchemaIsValidType(type: string): type is ContentSEOSchemaType {
  return Object.values(CONTENT_SEO_SCHEMA.TYPES).includes(type as ContentSEOSchemaType);
}

export function contentSeoSchemaIsValidFormat(format: string): format is ContentSEOSchemaFormat {
  return Object.values(CONTENT_SEO_SCHEMA.FORMATS).includes(format as ContentSEOSchemaFormat);
}
