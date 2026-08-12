/**
 * SEO স্কিমা টাইপ এনাম
 */
export const SEO_SCHEMA_TYPE = {
  PRODUCT: 'Product',
  ARTICLE: 'Article',
  BLOG_POSTING: 'BlogPosting',
  FAQ: 'FAQPage',
  HOW_TO: 'HowTo',
  ORGANIZATION: 'Organization',
  PERSON: 'Person',
  LOCAL_BUSINESS: 'LocalBusiness',
  EVENT: 'Event',
  REVIEW: 'Review',
  VIDEO: 'VideoObject',
  IMAGE: 'ImageObject',
  BOOK: 'Book',
  RECIPE: 'Recipe',
} as const;

/**
 * SEO_SCHEMA_TYPE থেকে টাইপ
 */
export type SEOSchemaType = (typeof SEO_SCHEMA_TYPE)[keyof typeof SEO_SCHEMA_TYPE];

/**
 * SEO স্কিমা টাইপ লেবেল
 */
export const SEO_SCHEMA_TYPE_LABELS: Record<SEOSchemaType, string> = {
  [SEO_SCHEMA_TYPE.PRODUCT]: 'Product',
  [SEO_SCHEMA_TYPE.ARTICLE]: 'Article',
  [SEO_SCHEMA_TYPE.BLOG_POSTING]: 'Blog Post',
  [SEO_SCHEMA_TYPE.FAQ]: 'FAQ Page',
  [SEO_SCHEMA_TYPE.HOW_TO]: 'How-To',
  [SEO_SCHEMA_TYPE.ORGANIZATION]: 'Organization',
  [SEO_SCHEMA_TYPE.PERSON]: 'Person',
  [SEO_SCHEMA_TYPE.LOCAL_BUSINESS]: 'Local Business',
  [SEO_SCHEMA_TYPE.EVENT]: 'Event',
  [SEO_SCHEMA_TYPE.REVIEW]: 'Review',
  [SEO_SCHEMA_TYPE.VIDEO]: 'Video',
  [SEO_SCHEMA_TYPE.IMAGE]: 'Image',
  [SEO_SCHEMA_TYPE.BOOK]: 'Book',
  [SEO_SCHEMA_TYPE.RECIPE]: 'Recipe',
} as const;

/**
 * SEO স্কিমা টাইপ বিবরণ
 */
export const SEO_SCHEMA_TYPE_DESCRIPTIONS: Record<SEOSchemaType, string> = {
  [SEO_SCHEMA_TYPE.PRODUCT]: 'Structured data for products and services',
  [SEO_SCHEMA_TYPE.ARTICLE]: 'Structured data for articles and news content',
  [SEO_SCHEMA_TYPE.BLOG_POSTING]: 'Structured data for blog posts',
  [SEO_SCHEMA_TYPE.FAQ]: 'Structured data for frequently asked questions',
  [SEO_SCHEMA_TYPE.HOW_TO]: 'Structured data for step-by-step instructions',
  [SEO_SCHEMA_TYPE.ORGANIZATION]: 'Structured data for organizations and companies',
  [SEO_SCHEMA_TYPE.PERSON]: 'Structured data for individuals and people',
  [SEO_SCHEMA_TYPE.LOCAL_BUSINESS]: 'Structured data for local businesses',
  [SEO_SCHEMA_TYPE.EVENT]: 'Structured data for events and gatherings',
  [SEO_SCHEMA_TYPE.REVIEW]: 'Structured data for reviews and ratings',
  [SEO_SCHEMA_TYPE.VIDEO]: 'Structured data for video content',
  [SEO_SCHEMA_TYPE.IMAGE]: 'Structured data for images',
  [SEO_SCHEMA_TYPE.BOOK]: 'Structured data for books and publications',
  [SEO_SCHEMA_TYPE.RECIPE]: 'Structured data for recipes and cooking instructions',
} as const;

/**
 * SEO স্কিমা টাইপ আইকন
 */
export const SEO_SCHEMA_TYPE_ICONS: Record<SEOSchemaType, string> = {
  [SEO_SCHEMA_TYPE.PRODUCT]: '🛒',
  [SEO_SCHEMA_TYPE.ARTICLE]: '📄',
  [SEO_SCHEMA_TYPE.BLOG_POSTING]: '📝',
  [SEO_SCHEMA_TYPE.FAQ]: '❓',
  [SEO_SCHEMA_TYPE.HOW_TO]: '📖',
  [SEO_SCHEMA_TYPE.ORGANIZATION]: '🏢',
  [SEO_SCHEMA_TYPE.PERSON]: '👤',
  [SEO_SCHEMA_TYPE.LOCAL_BUSINESS]: '📍',
  [SEO_SCHEMA_TYPE.EVENT]: '📅',
  [SEO_SCHEMA_TYPE.REVIEW]: '⭐',
  [SEO_SCHEMA_TYPE.VIDEO]: '🎬',
  [SEO_SCHEMA_TYPE.IMAGE]: '🖼️',
  [SEO_SCHEMA_TYPE.BOOK]: '📚',
  [SEO_SCHEMA_TYPE.RECIPE]: '🍳',
} as const;

/**
 * SEO স্কিমা টাইপ কালার (হেক্স কোড)
 */
export const SEO_SCHEMA_TYPE_COLORS: Record<SEOSchemaType, string> = {
  [SEO_SCHEMA_TYPE.PRODUCT]: '#22c55e', // Green-500
  [SEO_SCHEMA_TYPE.ARTICLE]: '#8b5cf6', // Violet-500
  [SEO_SCHEMA_TYPE.BLOG_POSTING]: '#f59e0b', // Amber-500
  [SEO_SCHEMA_TYPE.FAQ]: '#3b82f6', // Blue-500
  [SEO_SCHEMA_TYPE.HOW_TO]: '#06b6d4', // Cyan-500
  [SEO_SCHEMA_TYPE.ORGANIZATION]: '#6366f1', // Indigo-500
  [SEO_SCHEMA_TYPE.PERSON]: '#f97316', // Orange-500
  [SEO_SCHEMA_TYPE.LOCAL_BUSINESS]: '#ec4899', // Pink-500
  [SEO_SCHEMA_TYPE.EVENT]: '#f472b6', // Pink-400
  [SEO_SCHEMA_TYPE.REVIEW]: '#fbbf24', // Yellow-400
  [SEO_SCHEMA_TYPE.VIDEO]: '#dc2626', // Red-600
  [SEO_SCHEMA_TYPE.IMAGE]: '#94a3b8', // Slate-400
  [SEO_SCHEMA_TYPE.BOOK]: '#8b5cf6', // Violet-500
  [SEO_SCHEMA_TYPE.RECIPE]: '#f59e0b', // Amber-500
} as const;

/**
 * SEO স্কিমা টাইপ প্রায়োরিটি (১ = সর্বোচ্চ)
 */
export const SEO_SCHEMA_TYPE_PRIORITY: Record<SEOSchemaType, number> = {
  [SEO_SCHEMA_TYPE.PRODUCT]: 1,
  [SEO_SCHEMA_TYPE.ARTICLE]: 3,
  [SEO_SCHEMA_TYPE.BLOG_POSTING]: 4,
  [SEO_SCHEMA_TYPE.FAQ]: 2,
  [SEO_SCHEMA_TYPE.HOW_TO]: 5,
  [SEO_SCHEMA_TYPE.ORGANIZATION]: 1,
  [SEO_SCHEMA_TYPE.PERSON]: 6,
  [SEO_SCHEMA_TYPE.LOCAL_BUSINESS]: 2,
  [SEO_SCHEMA_TYPE.EVENT]: 7,
  [SEO_SCHEMA_TYPE.REVIEW]: 8,
  [SEO_SCHEMA_TYPE.VIDEO]: 4,
  [SEO_SCHEMA_TYPE.IMAGE]: 9,
  [SEO_SCHEMA_TYPE.BOOK]: 5,
  [SEO_SCHEMA_TYPE.RECIPE]: 6,
} as const;

/**
 * SEO স্কিমা টাইপ ক্যাটাগরি
 */
export const SEO_SCHEMA_TYPE_CATEGORY = {
  COMMERCE: 'commerce',
  CONTENT: 'content',
  ORGANIZATION: 'organization',
  PERSONAL: 'personal',
  MEDIA: 'media',
  FOOD: 'food',
} as const;

/**
 * SEO_SCHEMA_TYPE_CATEGORY থেকে টাইপ
 */
export type SEOSchemaTypeCategory =
  (typeof SEO_SCHEMA_TYPE_CATEGORY)[keyof typeof SEO_SCHEMA_TYPE_CATEGORY];

/**
 * SEO স্কিমা টাইপ ক্যাটাগরি লেবেল
 */
export const SEO_SCHEMA_TYPE_CATEGORY_LABELS: Record<SEOSchemaTypeCategory, string> = {
  [SEO_SCHEMA_TYPE_CATEGORY.COMMERCE]: 'Commerce',
  [SEO_SCHEMA_TYPE_CATEGORY.CONTENT]: 'Content',
  [SEO_SCHEMA_TYPE_CATEGORY.ORGANIZATION]: 'Organization',
  [SEO_SCHEMA_TYPE_CATEGORY.PERSONAL]: 'Personal',
  [SEO_SCHEMA_TYPE_CATEGORY.MEDIA]: 'Media',
  [SEO_SCHEMA_TYPE_CATEGORY.FOOD]: 'Food & Drink',
} as const;

/**
 * SEO স্কিমা টাইপ ক্যাটাগরি ম্যাপিং
 */
export const SEO_SCHEMA_TYPE_CATEGORY_MAP: Record<SEOSchemaType, SEOSchemaTypeCategory> = {
  [SEO_SCHEMA_TYPE.PRODUCT]: SEO_SCHEMA_TYPE_CATEGORY.COMMERCE,
  [SEO_SCHEMA_TYPE.ARTICLE]: SEO_SCHEMA_TYPE_CATEGORY.CONTENT,
  [SEO_SCHEMA_TYPE.BLOG_POSTING]: SEO_SCHEMA_TYPE_CATEGORY.CONTENT,
  [SEO_SCHEMA_TYPE.FAQ]: SEO_SCHEMA_TYPE_CATEGORY.CONTENT,
  [SEO_SCHEMA_TYPE.HOW_TO]: SEO_SCHEMA_TYPE_CATEGORY.CONTENT,
  [SEO_SCHEMA_TYPE.ORGANIZATION]: SEO_SCHEMA_TYPE_CATEGORY.ORGANIZATION,
  [SEO_SCHEMA_TYPE.PERSON]: SEO_SCHEMA_TYPE_CATEGORY.PERSONAL,
  [SEO_SCHEMA_TYPE.LOCAL_BUSINESS]: SEO_SCHEMA_TYPE_CATEGORY.ORGANIZATION,
  [SEO_SCHEMA_TYPE.EVENT]: SEO_SCHEMA_TYPE_CATEGORY.PERSONAL,
  [SEO_SCHEMA_TYPE.REVIEW]: SEO_SCHEMA_TYPE_CATEGORY.CONTENT,
  [SEO_SCHEMA_TYPE.VIDEO]: SEO_SCHEMA_TYPE_CATEGORY.MEDIA,
  [SEO_SCHEMA_TYPE.IMAGE]: SEO_SCHEMA_TYPE_CATEGORY.MEDIA,
  [SEO_SCHEMA_TYPE.BOOK]: SEO_SCHEMA_TYPE_CATEGORY.MEDIA,
  [SEO_SCHEMA_TYPE.RECIPE]: SEO_SCHEMA_TYPE_CATEGORY.FOOD,
} as const;

/**
 * SEO স্কিমা টাইপ কনফিগারেশন
 */
export interface SEOSchemaTypeConfig {
  type: SEOSchemaType;
  label: string;
  description: string;
  icon: string;
  color: string;
  priority: number;
  category: SEOSchemaTypeCategory;
  requiredProperties: string[];
  recommendedProperties: string[];
  order: number;
}

/**
 * SEO স্কিমা টাইপ মেটাডেটা
 */
export const SEO_SCHEMA_TYPE_METADATA: Record<SEOSchemaType, SEOSchemaTypeConfig> = {
  [SEO_SCHEMA_TYPE.PRODUCT]: {
    type: SEO_SCHEMA_TYPE.PRODUCT,
    label: SEO_SCHEMA_TYPE_LABELS[SEO_SCHEMA_TYPE.PRODUCT],
    description: SEO_SCHEMA_TYPE_DESCRIPTIONS[SEO_SCHEMA_TYPE.PRODUCT],
    icon: SEO_SCHEMA_TYPE_ICONS[SEO_SCHEMA_TYPE.PRODUCT],
    color: SEO_SCHEMA_TYPE_COLORS[SEO_SCHEMA_TYPE.PRODUCT],
    priority: SEO_SCHEMA_TYPE_PRIORITY[SEO_SCHEMA_TYPE.PRODUCT],
    category: SEO_SCHEMA_TYPE_CATEGORY_MAP[SEO_SCHEMA_TYPE.PRODUCT],
    requiredProperties: ['name', 'description'],
    recommendedProperties: ['image', 'brand', 'offers', 'sku', 'mpn'],
    order: 0,
  },
  [SEO_SCHEMA_TYPE.ARTICLE]: {
    type: SEO_SCHEMA_TYPE.ARTICLE,
    label: SEO_SCHEMA_TYPE_LABELS[SEO_SCHEMA_TYPE.ARTICLE],
    description: SEO_SCHEMA_TYPE_DESCRIPTIONS[SEO_SCHEMA_TYPE.ARTICLE],
    icon: SEO_SCHEMA_TYPE_ICONS[SEO_SCHEMA_TYPE.ARTICLE],
    color: SEO_SCHEMA_TYPE_COLORS[SEO_SCHEMA_TYPE.ARTICLE],
    priority: SEO_SCHEMA_TYPE_PRIORITY[SEO_SCHEMA_TYPE.ARTICLE],
    category: SEO_SCHEMA_TYPE_CATEGORY_MAP[SEO_SCHEMA_TYPE.ARTICLE],
    requiredProperties: ['headline', 'author', 'datePublished'],
    recommendedProperties: ['image', 'description', 'dateModified', 'publisher'],
    order: 1,
  },
  [SEO_SCHEMA_TYPE.BLOG_POSTING]: {
    type: SEO_SCHEMA_TYPE.BLOG_POSTING,
    label: SEO_SCHEMA_TYPE_LABELS[SEO_SCHEMA_TYPE.BLOG_POSTING],
    description: SEO_SCHEMA_TYPE_DESCRIPTIONS[SEO_SCHEMA_TYPE.BLOG_POSTING],
    icon: SEO_SCHEMA_TYPE_ICONS[SEO_SCHEMA_TYPE.BLOG_POSTING],
    color: SEO_SCHEMA_TYPE_COLORS[SEO_SCHEMA_TYPE.BLOG_POSTING],
    priority: SEO_SCHEMA_TYPE_PRIORITY[SEO_SCHEMA_TYPE.BLOG_POSTING],
    category: SEO_SCHEMA_TYPE_CATEGORY_MAP[SEO_SCHEMA_TYPE.BLOG_POSTING],
    requiredProperties: ['headline', 'author', 'datePublished'],
    recommendedProperties: ['image', 'description', 'dateModified', 'publisher'],
    order: 2,
  },
  [SEO_SCHEMA_TYPE.FAQ]: {
    type: SEO_SCHEMA_TYPE.FAQ,
    label: SEO_SCHEMA_TYPE_LABELS[SEO_SCHEMA_TYPE.FAQ],
    description: SEO_SCHEMA_TYPE_DESCRIPTIONS[SEO_SCHEMA_TYPE.FAQ],
    icon: SEO_SCHEMA_TYPE_ICONS[SEO_SCHEMA_TYPE.FAQ],
    color: SEO_SCHEMA_TYPE_COLORS[SEO_SCHEMA_TYPE.FAQ],
    priority: SEO_SCHEMA_TYPE_PRIORITY[SEO_SCHEMA_TYPE.FAQ],
    category: SEO_SCHEMA_TYPE_CATEGORY_MAP[SEO_SCHEMA_TYPE.FAQ],
    requiredProperties: ['mainEntity'],
    recommendedProperties: ['about', 'headline', 'description'],
    order: 3,
  },
  [SEO_SCHEMA_TYPE.HOW_TO]: {
    type: SEO_SCHEMA_TYPE.HOW_TO,
    label: SEO_SCHEMA_TYPE_LABELS[SEO_SCHEMA_TYPE.HOW_TO],
    description: SEO_SCHEMA_TYPE_DESCRIPTIONS[SEO_SCHEMA_TYPE.HOW_TO],
    icon: SEO_SCHEMA_TYPE_ICONS[SEO_SCHEMA_TYPE.HOW_TO],
    color: SEO_SCHEMA_TYPE_COLORS[SEO_SCHEMA_TYPE.HOW_TO],
    priority: SEO_SCHEMA_TYPE_PRIORITY[SEO_SCHEMA_TYPE.HOW_TO],
    category: SEO_SCHEMA_TYPE_CATEGORY_MAP[SEO_SCHEMA_TYPE.HOW_TO],
    requiredProperties: ['name', 'step'],
    recommendedProperties: ['description', 'image', 'totalTime', 'supply'],
    order: 4,
  },
  [SEO_SCHEMA_TYPE.ORGANIZATION]: {
    type: SEO_SCHEMA_TYPE.ORGANIZATION,
    label: SEO_SCHEMA_TYPE_LABELS[SEO_SCHEMA_TYPE.ORGANIZATION],
    description: SEO_SCHEMA_TYPE_DESCRIPTIONS[SEO_SCHEMA_TYPE.ORGANIZATION],
    icon: SEO_SCHEMA_TYPE_ICONS[SEO_SCHEMA_TYPE.ORGANIZATION],
    color: SEO_SCHEMA_TYPE_COLORS[SEO_SCHEMA_TYPE.ORGANIZATION],
    priority: SEO_SCHEMA_TYPE_PRIORITY[SEO_SCHEMA_TYPE.ORGANIZATION],
    category: SEO_SCHEMA_TYPE_CATEGORY_MAP[SEO_SCHEMA_TYPE.ORGANIZATION],
    requiredProperties: ['name'],
    recommendedProperties: ['logo', 'url', 'description', 'address', 'contactPoint'],
    order: 5,
  },
  [SEO_SCHEMA_TYPE.PERSON]: {
    type: SEO_SCHEMA_TYPE.PERSON,
    label: SEO_SCHEMA_TYPE_LABELS[SEO_SCHEMA_TYPE.PERSON],
    description: SEO_SCHEMA_TYPE_DESCRIPTIONS[SEO_SCHEMA_TYPE.PERSON],
    icon: SEO_SCHEMA_TYPE_ICONS[SEO_SCHEMA_TYPE.PERSON],
    color: SEO_SCHEMA_TYPE_COLORS[SEO_SCHEMA_TYPE.PERSON],
    priority: SEO_SCHEMA_TYPE_PRIORITY[SEO_SCHEMA_TYPE.PERSON],
    category: SEO_SCHEMA_TYPE_CATEGORY_MAP[SEO_SCHEMA_TYPE.PERSON],
    requiredProperties: ['name'],
    recommendedProperties: ['url', 'image', 'description', 'jobTitle', 'worksFor'],
    order: 6,
  },
  [SEO_SCHEMA_TYPE.LOCAL_BUSINESS]: {
    type: SEO_SCHEMA_TYPE.LOCAL_BUSINESS,
    label: SEO_SCHEMA_TYPE_LABELS[SEO_SCHEMA_TYPE.LOCAL_BUSINESS],
    description: SEO_SCHEMA_TYPE_DESCRIPTIONS[SEO_SCHEMA_TYPE.LOCAL_BUSINESS],
    icon: SEO_SCHEMA_TYPE_ICONS[SEO_SCHEMA_TYPE.LOCAL_BUSINESS],
    color: SEO_SCHEMA_TYPE_COLORS[SEO_SCHEMA_TYPE.LOCAL_BUSINESS],
    priority: SEO_SCHEMA_TYPE_PRIORITY[SEO_SCHEMA_TYPE.LOCAL_BUSINESS],
    category: SEO_SCHEMA_TYPE_CATEGORY_MAP[SEO_SCHEMA_TYPE.LOCAL_BUSINESS],
    requiredProperties: ['name', 'address'],
    recommendedProperties: ['telephone', 'url', 'image', 'openingHours', 'priceRange'],
    order: 7,
  },
  [SEO_SCHEMA_TYPE.EVENT]: {
    type: SEO_SCHEMA_TYPE.EVENT,
    label: SEO_SCHEMA_TYPE_LABELS[SEO_SCHEMA_TYPE.EVENT],
    description: SEO_SCHEMA_TYPE_DESCRIPTIONS[SEO_SCHEMA_TYPE.EVENT],
    icon: SEO_SCHEMA_TYPE_ICONS[SEO_SCHEMA_TYPE.EVENT],
    color: SEO_SCHEMA_TYPE_COLORS[SEO_SCHEMA_TYPE.EVENT],
    priority: SEO_SCHEMA_TYPE_PRIORITY[SEO_SCHEMA_TYPE.EVENT],
    category: SEO_SCHEMA_TYPE_CATEGORY_MAP[SEO_SCHEMA_TYPE.EVENT],
    requiredProperties: ['name', 'startDate'],
    recommendedProperties: ['endDate', 'location', 'description', 'image', 'organizer'],
    order: 8,
  },
  [SEO_SCHEMA_TYPE.REVIEW]: {
    type: SEO_SCHEMA_TYPE.REVIEW,
    label: SEO_SCHEMA_TYPE_LABELS[SEO_SCHEMA_TYPE.REVIEW],
    description: SEO_SCHEMA_TYPE_DESCRIPTIONS[SEO_SCHEMA_TYPE.REVIEW],
    icon: SEO_SCHEMA_TYPE_ICONS[SEO_SCHEMA_TYPE.REVIEW],
    color: SEO_SCHEMA_TYPE_COLORS[SEO_SCHEMA_TYPE.REVIEW],
    priority: SEO_SCHEMA_TYPE_PRIORITY[SEO_SCHEMA_TYPE.REVIEW],
    category: SEO_SCHEMA_TYPE_CATEGORY_MAP[SEO_SCHEMA_TYPE.REVIEW],
    requiredProperties: ['itemReviewed', 'reviewRating'],
    recommendedProperties: ['author', 'datePublished', 'reviewBody'],
    order: 9,
  },
  [SEO_SCHEMA_TYPE.VIDEO]: {
    type: SEO_SCHEMA_TYPE.VIDEO,
    label: SEO_SCHEMA_TYPE_LABELS[SEO_SCHEMA_TYPE.VIDEO],
    description: SEO_SCHEMA_TYPE_DESCRIPTIONS[SEO_SCHEMA_TYPE.VIDEO],
    icon: SEO_SCHEMA_TYPE_ICONS[SEO_SCHEMA_TYPE.VIDEO],
    color: SEO_SCHEMA_TYPE_COLORS[SEO_SCHEMA_TYPE.VIDEO],
    priority: SEO_SCHEMA_TYPE_PRIORITY[SEO_SCHEMA_TYPE.VIDEO],
    category: SEO_SCHEMA_TYPE_CATEGORY_MAP[SEO_SCHEMA_TYPE.VIDEO],
    requiredProperties: ['name', 'thumbnailUrl'],
    recommendedProperties: ['description', 'uploadDate', 'contentUrl', 'duration'],
    order: 10,
  },
  [SEO_SCHEMA_TYPE.IMAGE]: {
    type: SEO_SCHEMA_TYPE.IMAGE,
    label: SEO_SCHEMA_TYPE_LABELS[SEO_SCHEMA_TYPE.IMAGE],
    description: SEO_SCHEMA_TYPE_DESCRIPTIONS[SEO_SCHEMA_TYPE.IMAGE],
    icon: SEO_SCHEMA_TYPE_ICONS[SEO_SCHEMA_TYPE.IMAGE],
    color: SEO_SCHEMA_TYPE_COLORS[SEO_SCHEMA_TYPE.IMAGE],
    priority: SEO_SCHEMA_TYPE_PRIORITY[SEO_SCHEMA_TYPE.IMAGE],
    category: SEO_SCHEMA_TYPE_CATEGORY_MAP[SEO_SCHEMA_TYPE.IMAGE],
    requiredProperties: ['url'],
    recommendedProperties: ['name', 'description', 'width', 'height'],
    order: 11,
  },
  [SEO_SCHEMA_TYPE.BOOK]: {
    type: SEO_SCHEMA_TYPE.BOOK,
    label: SEO_SCHEMA_TYPE_LABELS[SEO_SCHEMA_TYPE.BOOK],
    description: SEO_SCHEMA_TYPE_DESCRIPTIONS[SEO_SCHEMA_TYPE.BOOK],
    icon: SEO_SCHEMA_TYPE_ICONS[SEO_SCHEMA_TYPE.BOOK],
    color: SEO_SCHEMA_TYPE_COLORS[SEO_SCHEMA_TYPE.BOOK],
    priority: SEO_SCHEMA_TYPE_PRIORITY[SEO_SCHEMA_TYPE.BOOK],
    category: SEO_SCHEMA_TYPE_CATEGORY_MAP[SEO_SCHEMA_TYPE.BOOK],
    requiredProperties: ['name', 'author'],
    recommendedProperties: ['isbn', 'description', 'image', 'datePublished', 'publisher'],
    order: 12,
  },
  [SEO_SCHEMA_TYPE.RECIPE]: {
    type: SEO_SCHEMA_TYPE.RECIPE,
    label: SEO_SCHEMA_TYPE_LABELS[SEO_SCHEMA_TYPE.RECIPE],
    description: SEO_SCHEMA_TYPE_DESCRIPTIONS[SEO_SCHEMA_TYPE.RECIPE],
    icon: SEO_SCHEMA_TYPE_ICONS[SEO_SCHEMA_TYPE.RECIPE],
    color: SEO_SCHEMA_TYPE_COLORS[SEO_SCHEMA_TYPE.RECIPE],
    priority: SEO_SCHEMA_TYPE_PRIORITY[SEO_SCHEMA_TYPE.RECIPE],
    category: SEO_SCHEMA_TYPE_CATEGORY_MAP[SEO_SCHEMA_TYPE.RECIPE],
    requiredProperties: ['name', 'recipeIngredient', 'recipeInstructions'],
    recommendedProperties: ['description', 'image', 'cookTime', 'prepTime', 'nutrition'],
    order: 13,
  },
} as const;

/**
 * SEO স্কিমা টাইপ গ্রুপ
 */
export const SEO_SCHEMA_TYPE_GROUPS = {
  COMMERCE: [SEO_SCHEMA_TYPE.PRODUCT] as const,
  CONTENT: [
    SEO_SCHEMA_TYPE.ARTICLE,
    SEO_SCHEMA_TYPE.BLOG_POSTING,
    SEO_SCHEMA_TYPE.FAQ,
    SEO_SCHEMA_TYPE.HOW_TO,
    SEO_SCHEMA_TYPE.REVIEW,
  ] as const,
  ORGANIZATION: [SEO_SCHEMA_TYPE.ORGANIZATION, SEO_SCHEMA_TYPE.LOCAL_BUSINESS] as const,
  PERSONAL: [SEO_SCHEMA_TYPE.PERSON, SEO_SCHEMA_TYPE.EVENT] as const,
  MEDIA: [SEO_SCHEMA_TYPE.VIDEO, SEO_SCHEMA_TYPE.IMAGE, SEO_SCHEMA_TYPE.BOOK] as const,
  FOOD: [SEO_SCHEMA_TYPE.RECIPE] as const,
} as const;

/**
 * SEO স্কিমা টাইপ গ্রুপ লেবেল
 */
export const SEO_SCHEMA_TYPE_GROUP_LABELS = {
  COMMERCE: 'Commerce',
  CONTENT: 'Content',
  ORGANIZATION: 'Organization',
  PERSONAL: 'Personal',
  MEDIA: 'Media',
  FOOD: 'Food & Drink',
} as const;

/**
 * SEO স্কিমা টাইপ গ্রুপ কালার
 */
export const SEO_SCHEMA_TYPE_GROUP_COLORS = {
  COMMERCE: '#22c55e',
  CONTENT: '#8b5cf6',
  ORGANIZATION: '#6366f1',
  PERSONAL: '#f59e0b',
  MEDIA: '#ec4899',
  FOOD: '#f97316',
} as const;
