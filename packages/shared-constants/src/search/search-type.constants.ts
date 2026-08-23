/**
 * Search Type Constants
 * Type definitions and classifications for search
 */

export const SEARCH_TYPE = {
  // Search Categories
  CATEGORIES: {
    PRODUCT: 'product',
    CATEGORY: 'category',
    BRAND: 'brand',
    VENDOR: 'vendor',
    ORDER: 'order',
    USER: 'user',
    CONTENT: 'content',
    DOCUMENT: 'document',
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
    LOCATION: 'location',
    ALL: 'all',
    CUSTOM: 'custom',
  } as const,

  // Search Sub-Types
  SUB_TYPES: {
    // Product
    PHYSICAL: 'physical',
    DIGITAL: 'digital',
    SERVICE: 'service',
    SUBSCRIPTION: 'subscription',

    // Content
    ARTICLE: 'article',
    BLOG: 'blog',
    NEWS: 'news',
    REVIEW: 'review',
    TUTORIAL: 'tutorial',
    GUIDE: 'guide',

    // Document
    PDF: 'pdf',
    DOC: 'doc',
    SPREADSHEET: 'spreadsheet',
    PRESENTATION: 'presentation',

    // User
    CUSTOMER: 'customer',
    VENDOR_USER: 'vendor_user',
    ADMIN: 'admin',
    EMPLOYEE: 'employee',
  } as const,

  // Search Contexts
  CONTEXTS: {
    ECOMMERCE: 'ecommerce',
    KNOWLEDGE_BASE: 'knowledge_base',
    SUPPORT: 'support',
    COMMUNITY: 'community',
    ADMIN: 'admin',
    PUBLIC: 'public',
    PRIVATE: 'private',
  } as const,

  // Search Intent
  INTENTS: {
    NAVIGATIONAL: 'navigational',
    INFORMATIONAL: 'informational',
    TRANSACTIONAL: 'transactional',
    COMPARISON: 'comparison',
    EXPLORATORY: 'exploratory',
    CUSTOM: 'custom',
  } as const,

  // Search Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
    VERY_COMPLEX: 'very_complex',
  } as const,
} as const;

// Search Categories
export type SearchCategoryType =
  (typeof SEARCH_TYPE.CATEGORIES)[keyof typeof SEARCH_TYPE.CATEGORIES];

// Search Sub-Types
export type SearchSubType = (typeof SEARCH_TYPE.SUB_TYPES)[keyof typeof SEARCH_TYPE.SUB_TYPES];

// Search Contexts
export type SearchContext = (typeof SEARCH_TYPE.CONTEXTS)[keyof typeof SEARCH_TYPE.CONTEXTS];

// Search Intent
export type SearchIntent = (typeof SEARCH_TYPE.INTENTS)[keyof typeof SEARCH_TYPE.INTENTS];

// Search Complexity
export type SearchComplexity = (typeof SEARCH_TYPE.COMPLEXITY)[keyof typeof SEARCH_TYPE.COMPLEXITY];

// Utility Functions
export function searchTypeGetCategoryLabel(category: SearchCategoryType): string {
  const labels: Record<SearchCategoryType, string> = {
    [SEARCH_TYPE.CATEGORIES.PRODUCT]: 'Product',
    [SEARCH_TYPE.CATEGORIES.CATEGORY]: 'Category',
    [SEARCH_TYPE.CATEGORIES.BRAND]: 'Brand',
    [SEARCH_TYPE.CATEGORIES.VENDOR]: 'Vendor',
    [SEARCH_TYPE.CATEGORIES.ORDER]: 'Order',
    [SEARCH_TYPE.CATEGORIES.USER]: 'User',
    [SEARCH_TYPE.CATEGORIES.CONTENT]: 'Content',
    [SEARCH_TYPE.CATEGORIES.DOCUMENT]: 'Document',
    [SEARCH_TYPE.CATEGORIES.IMAGE]: 'Image',
    [SEARCH_TYPE.CATEGORIES.VIDEO]: 'Video',
    [SEARCH_TYPE.CATEGORIES.AUDIO]: 'Audio',
    [SEARCH_TYPE.CATEGORIES.LOCATION]: 'Location',
    [SEARCH_TYPE.CATEGORIES.ALL]: 'All',
    [SEARCH_TYPE.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function searchTypeGetSubTypeLabel(subType: SearchSubType): string {
  const labels: Record<SearchSubType, string> = {
    // Product
    [SEARCH_TYPE.SUB_TYPES.PHYSICAL]: 'Physical Product',
    [SEARCH_TYPE.SUB_TYPES.DIGITAL]: 'Digital Product',
    [SEARCH_TYPE.SUB_TYPES.SERVICE]: 'Service',
    [SEARCH_TYPE.SUB_TYPES.SUBSCRIPTION]: 'Subscription',

    // Content
    [SEARCH_TYPE.SUB_TYPES.ARTICLE]: 'Article',
    [SEARCH_TYPE.SUB_TYPES.BLOG]: 'Blog',
    [SEARCH_TYPE.SUB_TYPES.NEWS]: 'News',
    [SEARCH_TYPE.SUB_TYPES.REVIEW]: 'Review',
    [SEARCH_TYPE.SUB_TYPES.TUTORIAL]: 'Tutorial',
    [SEARCH_TYPE.SUB_TYPES.GUIDE]: 'Guide',

    // Document
    [SEARCH_TYPE.SUB_TYPES.PDF]: 'PDF',
    [SEARCH_TYPE.SUB_TYPES.DOC]: 'Document',
    [SEARCH_TYPE.SUB_TYPES.SPREADSHEET]: 'Spreadsheet',
    [SEARCH_TYPE.SUB_TYPES.PRESENTATION]: 'Presentation',

    // User
    [SEARCH_TYPE.SUB_TYPES.CUSTOMER]: 'Customer',
    [SEARCH_TYPE.SUB_TYPES.VENDOR_USER]: 'Vendor User',
    [SEARCH_TYPE.SUB_TYPES.ADMIN]: 'Admin',
    [SEARCH_TYPE.SUB_TYPES.EMPLOYEE]: 'Employee',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function searchTypeGetContextLabel(context: SearchContext): string {
  const labels: Record<SearchContext, string> = {
    [SEARCH_TYPE.CONTEXTS.ECOMMERCE]: 'E-Commerce',
    [SEARCH_TYPE.CONTEXTS.KNOWLEDGE_BASE]: 'Knowledge Base',
    [SEARCH_TYPE.CONTEXTS.SUPPORT]: 'Support',
    [SEARCH_TYPE.CONTEXTS.COMMUNITY]: 'Community',
    [SEARCH_TYPE.CONTEXTS.ADMIN]: 'Admin',
    [SEARCH_TYPE.CONTEXTS.PUBLIC]: 'Public',
    [SEARCH_TYPE.CONTEXTS.PRIVATE]: 'Private',
  };
  return labels[context] || 'Unknown Context';
}

export function searchTypeGetIntentLabel(intent: SearchIntent): string {
  const labels: Record<SearchIntent, string> = {
    [SEARCH_TYPE.INTENTS.NAVIGATIONAL]: 'Navigational',
    [SEARCH_TYPE.INTENTS.INFORMATIONAL]: 'Informational',
    [SEARCH_TYPE.INTENTS.TRANSACTIONAL]: 'Transactional',
    [SEARCH_TYPE.INTENTS.COMPARISON]: 'Comparison',
    [SEARCH_TYPE.INTENTS.EXPLORATORY]: 'Exploratory',
    [SEARCH_TYPE.INTENTS.CUSTOM]: 'Custom',
  };
  return labels[intent] || 'Unknown Intent';
}

export function searchTypeGetComplexityLabel(complexity: SearchComplexity): string {
  const labels: Record<SearchComplexity, string> = {
    [SEARCH_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [SEARCH_TYPE.COMPLEXITY.MODERATE]: 'Moderate',
    [SEARCH_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [SEARCH_TYPE.COMPLEXITY.VERY_COMPLEX]: 'Very Complex',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function searchTypeIsProductCategory(category: SearchCategoryType): boolean {
  return category === SEARCH_TYPE.CATEGORIES.PRODUCT;
}

export function searchTypeIsContentCategory(category: SearchCategoryType): boolean {
  return category === SEARCH_TYPE.CATEGORIES.CONTENT;
}

export function searchTypeIsDocumentCategory(category: SearchCategoryType): boolean {
  return category === SEARCH_TYPE.CATEGORIES.DOCUMENT;
}

export function searchTypeIsUserCategory(category: SearchCategoryType): boolean {
  return category === SEARCH_TYPE.CATEGORIES.USER;
}

export function searchTypeIsEcommerceContext(context: SearchContext): boolean {
  return context === SEARCH_TYPE.CONTEXTS.ECOMMERCE;
}

export function searchTypeIsTransactionalIntent(intent: SearchIntent): boolean {
  return intent === SEARCH_TYPE.INTENTS.TRANSACTIONAL;
}
