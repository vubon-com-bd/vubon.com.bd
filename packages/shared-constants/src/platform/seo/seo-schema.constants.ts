export const SEO_SCHEMA_TYPE = {
  ORGANIZATION: 'Organization',
  WEBSITE: 'WebSite',
  WEBPAGE: 'WebPage',
  BREADCRUMB: 'BreadcrumbList',
  PRODUCT: 'Product',
  OFFER: 'Offer',
  REVIEW: 'Review',
  ARTICLE: 'Article',
  BLOG_POSTING: 'BlogPosting',
  FAQ: 'FAQPage',
  HOW_TO: 'HowTo',
  EVENT: 'Event',
  LOCAL_BUSINESS: 'LocalBusiness',
  PERSON: 'Person',
  VIDEO: 'VideoObject',
  IMAGE: 'ImageObject',
  ITEM_LIST: 'ItemList',
  SEARCH_ACTION: 'SearchAction',
} as const;

export const SEO_SCHEMA_FORMAT = {
  JSON_LD: 'json_ld',
  MICRODATA: 'microdata',
  RDFA: 'rdfa',
} as const;

export const SEO_SCHEMA = {
  DEFAULT_FORMAT: SEO_SCHEMA_FORMAT.JSON_LD,
  AUTO_GENERATE: true,
  VALIDATE: true,
  MAX_NESTED_DEPTH: 5,
  INCLUDE_BREADCRUMB: true,
  INCLUDE_ORGANIZATION: true,
  INCLUDE_WEBSITE: true,
} as const;

export type SeoSchemaTypeType = (typeof SEO_SCHEMA_TYPE)[keyof typeof SEO_SCHEMA_TYPE];
export type SeoSchemaFormatType = (typeof SEO_SCHEMA_FORMAT)[keyof typeof SEO_SCHEMA_FORMAT];
