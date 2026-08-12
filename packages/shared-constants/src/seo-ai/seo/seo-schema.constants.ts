/**
 * ডিফল্ট স্কিমা টাইপ
 */
export const SEO_SCHEMA_DEFAULT_TYPE = 'WebPage' as const;

/**
 * সর্বোচ্চ প্রপার্টি সংখ্যা (৫০)
 */
export const SEO_SCHEMA_MAX_PROPERTIES = 50 as const;

/**
 * সাপোর্টেড স্কিমা টাইপের তালিকা
 */
export const SEO_SCHEMA_SUPPORTED_TYPES = [
  'WebPage',
  'Article',
  'BlogPosting',
  'NewsArticle',
  'Product',
  'Service',
  'Organization',
  'LocalBusiness',
  'Person',
  'Event',
  'Review',
  'Recipe',
  'VideoObject',
  'ImageObject',
  'FAQPage',
  'HowTo',
  'BreadcrumbList',
  'ItemList',
  'Course',
  'EducationalOrganization',
  'Restaurant',
  'Hotel',
  'MedicalOrganization',
  'Book',
  'Movie',
  'MusicAlbum',
  'JobPosting',
  'QAPage',
  'Website',
  'CreativeWork',
] as const;

/**
 * SEO_SCHEMA_SUPPORTED_TYPES থেকে টাইপ
 */
export type SEOSchemaType = (typeof SEO_SCHEMA_SUPPORTED_TYPES)[number];

/**
 * স্কিমা প্রপার্টি টাইপ এনাম
 */
export const SEO_SCHEMA_PROPERTY_TYPE = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  DATE: 'date',
  DATETIME: 'datetime',
  URL: 'url',
  EMAIL: 'email',
  TELEPHONE: 'telephone',
  POSTAL_ADDRESS: 'postal-address',
  GEO_COORDINATES: 'geo-coordinates',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  TEXT: 'text',
  ARRAY: 'array',
  OBJECT: 'object',
  REFERENCE: 'reference',
} as const;

/**
 * SEO_SCHEMA_PROPERTY_TYPE থেকে টাইপ
 */
export type SEOSchemaPropertyType =
  (typeof SEO_SCHEMA_PROPERTY_TYPE)[keyof typeof SEO_SCHEMA_PROPERTY_TYPE];

/**
 * স্কিমা প্রপার্টি কনফিগারেশন
 */
export interface SEOSchemaProperty {
  name: string;
  type: SEOSchemaPropertyType;
  required: boolean;
  description?: string;
  multiple?: boolean;
  defaultValue?: unknown;
  allowedValues?: unknown[];
}

/**
 * স্কিমা টাইপ কনফিগারেশন
 */
export interface SEOSchemaTypeConfig {
  type: SEOSchemaType;
  label: string;
  description: string;
  properties: SEOSchemaProperty[];
  requiredProperties: string[];
  parentType?: SEOSchemaType;
  icon?: string;
  color?: string;
}

/**
 * স্কিমা ডেটা
 */
export interface SEOSchemaData {
  '@context': string;
  '@type': SEOSchemaType;
  [key: string]: unknown;
}

/**
 * স্কিমা কনফিগারেশন
 */
export interface SEOSchemaConfig {
  defaultType: SEOSchemaType;
  maxProperties: number;
  supportedTypes: SEOSchemaType[];
  includeContext: boolean;
  validateProperties: boolean;
}

/**
 * স্কিমা ডিফল্ট কনফিগারেশন
 */
export const SEO_SCHEMA_DEFAULT_CONFIG: SEOSchemaConfig = {
  defaultType: SEO_SCHEMA_DEFAULT_TYPE as SEOSchemaType,
  maxProperties: SEO_SCHEMA_MAX_PROPERTIES,
  supportedTypes: SEO_SCHEMA_SUPPORTED_TYPES as unknown as SEOSchemaType[],
  includeContext: true,
  validateProperties: true,
} as const;

/**
 * স্কিমা টাইপ লেবেল
 */
export const SEO_SCHEMA_TYPE_LABELS: Record<SEOSchemaType, string> = {
  WebPage: 'Web Page',
  Article: 'Article',
  BlogPosting: 'Blog Post',
  NewsArticle: 'News Article',
  Product: 'Product',
  Service: 'Service',
  Organization: 'Organization',
  LocalBusiness: 'Local Business',
  Person: 'Person',
  Event: 'Event',
  Review: 'Review',
  Recipe: 'Recipe',
  VideoObject: 'Video',
  ImageObject: 'Image',
  FAQPage: 'FAQ Page',
  HowTo: 'How-To',
  BreadcrumbList: 'Breadcrumb List',
  ItemList: 'Item List',
  Course: 'Course',
  EducationalOrganization: 'Educational Organization',
  Restaurant: 'Restaurant',
  Hotel: 'Hotel',
  MedicalOrganization: 'Medical Organization',
  Book: 'Book',
  Movie: 'Movie',
  MusicAlbum: 'Music Album',
  JobPosting: 'Job Posting',
  QAPage: 'Q&A Page',
  Website: 'Website',
  CreativeWork: 'Creative Work',
} as const;

/**
 * স্কিমা টাইপ আইকন
 */
export const SEO_SCHEMA_TYPE_ICONS: Record<SEOSchemaType, string> = {
  WebPage: '🌐',
  Article: '📄',
  BlogPosting: '📝',
  NewsArticle: '📰',
  Product: '🛒',
  Service: '🔧',
  Organization: '🏢',
  LocalBusiness: '📍',
  Person: '👤',
  Event: '📅',
  Review: '⭐',
  Recipe: '🍳',
  VideoObject: '🎬',
  ImageObject: '🖼️',
  FAQPage: '❓',
  HowTo: '📖',
  BreadcrumbList: '🔗',
  ItemList: '📋',
  Course: '🎓',
  EducationalOrganization: '🏫',
  Restaurant: '🍽️',
  Hotel: '🏨',
  MedicalOrganization: '🏥',
  Book: '📚',
  Movie: '🎥',
  MusicAlbum: '🎵',
  JobPosting: '💼',
  QAPage: '🤔',
  Website: '💻',
  CreativeWork: '🎨',
} as const;

/**
 * স্কিমা টাইপ কালার (হেক্স কোড)
 */
export const SEO_SCHEMA_TYPE_COLORS: Record<SEOSchemaType, string> = {
  WebPage: '#3b82f6',
  Article: '#8b5cf6',
  BlogPosting: '#f59e0b',
  NewsArticle: '#dc2626',
  Product: '#22c55e',
  Service: '#06b6d4',
  Organization: '#6366f1',
  LocalBusiness: '#ec4899',
  Person: '#f97316',
  Event: '#f472b6',
  Review: '#fbbf24',
  Recipe: '#f59e0b',
  VideoObject: '#dc2626',
  ImageObject: '#8b5cf6',
  FAQPage: '#3b82f6',
  HowTo: '#22c55e',
  BreadcrumbList: '#94a3b8',
  ItemList: '#6366f1',
  Course: '#8b5cf6',
  EducationalOrganization: '#3b82f6',
  Restaurant: '#f97316',
  Hotel: '#06b6d4',
  MedicalOrganization: '#22c55e',
  Book: '#8b5cf6',
  Movie: '#dc2626',
  MusicAlbum: '#ec4899',
  JobPosting: '#3b82f6',
  QAPage: '#f59e0b',
  Website: '#6366f1',
  CreativeWork: '#8b5cf6',
} as const;

/**
 * স্কিমা টাইপ ক্যাটাগরি
 */
export const SEO_SCHEMA_TYPE_CATEGORY = {
  WEB: 'web',
  CONTENT: 'content',
  COMMERCE: 'commerce',
  ORGANIZATION: 'organization',
  PERSONAL: 'personal',
  MEDIA: 'media',
} as const;

/**
 * SEO_SCHEMA_TYPE_CATEGORY থেকে টাইপ
 */
export type SEOSchemaTypeCategory =
  (typeof SEO_SCHEMA_TYPE_CATEGORY)[keyof typeof SEO_SCHEMA_TYPE_CATEGORY];

/**
 * স্কিমা টাইপ ক্যাটাগরি লেবেল
 */
export const SEO_SCHEMA_TYPE_CATEGORY_LABELS: Record<SEOSchemaTypeCategory, string> = {
  [SEO_SCHEMA_TYPE_CATEGORY.WEB]: 'Web Pages',
  [SEO_SCHEMA_TYPE_CATEGORY.CONTENT]: 'Content',
  [SEO_SCHEMA_TYPE_CATEGORY.COMMERCE]: 'Commerce',
  [SEO_SCHEMA_TYPE_CATEGORY.ORGANIZATION]: 'Organization',
  [SEO_SCHEMA_TYPE_CATEGORY.PERSONAL]: 'Personal',
  [SEO_SCHEMA_TYPE_CATEGORY.MEDIA]: 'Media',
} as const;

/**
 * স্কিমা টাইপ ক্যাটাগরি ম্যাপিং
 */
export const SEO_SCHEMA_TYPE_CATEGORY_MAP: Record<SEOSchemaType, SEOSchemaTypeCategory> = {
  WebPage: SEO_SCHEMA_TYPE_CATEGORY.WEB,
  Article: SEO_SCHEMA_TYPE_CATEGORY.CONTENT,
  BlogPosting: SEO_SCHEMA_TYPE_CATEGORY.CONTENT,
  NewsArticle: SEO_SCHEMA_TYPE_CATEGORY.CONTENT,
  Product: SEO_SCHEMA_TYPE_CATEGORY.COMMERCE,
  Service: SEO_SCHEMA_TYPE_CATEGORY.COMMERCE,
  Organization: SEO_SCHEMA_TYPE_CATEGORY.ORGANIZATION,
  LocalBusiness: SEO_SCHEMA_TYPE_CATEGORY.ORGANIZATION,
  Person: SEO_SCHEMA_TYPE_CATEGORY.PERSONAL,
  Event: SEO_SCHEMA_TYPE_CATEGORY.PERSONAL,
  Review: SEO_SCHEMA_TYPE_CATEGORY.CONTENT,
  Recipe: SEO_SCHEMA_TYPE_CATEGORY.CONTENT,
  VideoObject: SEO_SCHEMA_TYPE_CATEGORY.MEDIA,
  ImageObject: SEO_SCHEMA_TYPE_CATEGORY.MEDIA,
  FAQPage: SEO_SCHEMA_TYPE_CATEGORY.WEB,
  HowTo: SEO_SCHEMA_TYPE_CATEGORY.CONTENT,
  BreadcrumbList: SEO_SCHEMA_TYPE_CATEGORY.WEB,
  ItemList: SEO_SCHEMA_TYPE_CATEGORY.WEB,
  Course: SEO_SCHEMA_TYPE_CATEGORY.ORGANIZATION,
  EducationalOrganization: SEO_SCHEMA_TYPE_CATEGORY.ORGANIZATION,
  Restaurant: SEO_SCHEMA_TYPE_CATEGORY.ORGANIZATION,
  Hotel: SEO_SCHEMA_TYPE_CATEGORY.ORGANIZATION,
  MedicalOrganization: SEO_SCHEMA_TYPE_CATEGORY.ORGANIZATION,
  Book: SEO_SCHEMA_TYPE_CATEGORY.MEDIA,
  Movie: SEO_SCHEMA_TYPE_CATEGORY.MEDIA,
  MusicAlbum: SEO_SCHEMA_TYPE_CATEGORY.MEDIA,
  JobPosting: SEO_SCHEMA_TYPE_CATEGORY.PERSONAL,
  QAPage: SEO_SCHEMA_TYPE_CATEGORY.WEB,
  Website: SEO_SCHEMA_TYPE_CATEGORY.WEB,
  CreativeWork: SEO_SCHEMA_TYPE_CATEGORY.CONTENT,
} as const;

/**
 * স্কিমা টাইপ গ্রুপ
 */
export const SEO_SCHEMA_TYPE_GROUPS = {
  WEB: ['WebPage', 'FAQPage', 'BreadcrumbList', 'ItemList', 'QAPage', 'Website'] as const,
  CONTENT: [
    'Article',
    'BlogPosting',
    'NewsArticle',
    'Review',
    'Recipe',
    'HowTo',
    'CreativeWork',
  ] as const,
  COMMERCE: ['Product', 'Service'] as const,
  ORGANIZATION: [
    'Organization',
    'LocalBusiness',
    'EducationalOrganization',
    'Restaurant',
    'Hotel',
    'MedicalOrganization',
  ] as const,
  PERSONAL: ['Person', 'Event', 'JobPosting'] as const,
  MEDIA: ['VideoObject', 'ImageObject', 'Book', 'Movie', 'MusicAlbum'] as const,
} as const;

/**
 * স্কিমা টাইপ গ্রুপ লেবেল
 */
export const SEO_SCHEMA_TYPE_GROUP_LABELS = {
  WEB: 'Web Pages',
  CONTENT: 'Content',
  COMMERCE: 'Commerce',
  ORGANIZATION: 'Organization',
  PERSONAL: 'Personal',
  MEDIA: 'Media',
} as const;

/**
 * স্কিমা টাইপ গ্রুপ কালার
 */
export const SEO_SCHEMA_TYPE_GROUP_COLORS = {
  WEB: '#3b82f6',
  CONTENT: '#8b5cf6',
  COMMERCE: '#22c55e',
  ORGANIZATION: '#6366f1',
  PERSONAL: '#f59e0b',
  MEDIA: '#ec4899',
} as const;

/**
 * স্কিমা ফিল্টার
 */
export interface SEOSchemaFilter {
  type?: SEOSchemaType;
  category?: SEOSchemaTypeCategory;
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * স্কিমা রেসপন্স
 */
export interface SEOSchemaResponse {
  data: SEOSchemaData[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
