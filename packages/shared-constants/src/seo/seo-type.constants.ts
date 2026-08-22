/**
 * SEO Type Constants
 * Types and classifications for SEO elements
 */

export const SEO_TYPE = {
  // SEO Categories
  CATEGORIES: {
    TECHNICAL: 'technical',
    CONTENT: 'content',
    OFF_PAGE: 'off_page',
    LOCAL: 'local',
    ECOMMERCE: 'ecommerce',
    MOBILE: 'mobile',
    VOICE: 'voice',
    VIDEO: 'video',
    IMAGE: 'image',
    INTERNATIONAL: 'international',
  } as const,

  // Page Types
  PAGE_TYPES: {
    HOME: 'home',
    PRODUCT: 'product',
    CATEGORY: 'category',
    BLOG: 'blog',
    ABOUT: 'about',
    CONTACT: 'contact',
    FAQ: 'faq',
    CART: 'cart',
    CHECKOUT: 'checkout',
    ACCOUNT: 'account',
    ORDER: 'order',
    SEARCH: 'search',
    LANDING: 'landing',
    GALLERY: 'gallery',
    EVENT: 'event',
    NEWS: 'news',
    CAREER: 'career',
    LEGAL: 'legal',
    POLICY: 'policy',
    TERMS: 'terms',
  } as const,

  // Content Types
  CONTENT_TYPES: {
    TEXT: 'text',
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
    DOCUMENT: 'document',
    PRODUCT: 'product',
    REVIEW: 'review',
    RATING: 'rating',
    COMMENT: 'comment',
    USER_GENERATED: 'user_generated',
  } as const,

  // Link Attributes
  LINK_ATTRIBUTES: {
    DOFOLLOW: 'dofollow',
    NOFOLLOW: 'nofollow',
    SPONSORED: 'sponsored',
    UGC: 'ugc',
    REL_CANONICAL: 'canonical',
    REL_NEXT: 'next',
    REL_PREV: 'prev',
    REL_ALTERNATE: 'alternate',
    REL_AMP: 'amp',
  } as const,

  // Mobile Types
  MOBILE_TYPES: {
    RESPONSIVE: 'responsive',
    DYNAMIC_SERVING: 'dynamic_serving',
    SEPARATE_URL: 'separate_url',
    AMP: 'amp',
    M_WEBSITE: 'm_website',
  } as const,

  // International SEO Types
  INTERNATIONAL_TYPES: {
    HREFLANG: 'hreflang',
    CC_TLD: 'cc_tld',
    SUBDIRECTORY: 'subdirectory',
    SUBDOMAIN: 'subdomain',
    GEO_TARGETING: 'geo_targeting',
    LANGUAGE_TAGS: 'language_tags',
  } as const,

  // Search Engine Types
  SEARCH_ENGINES: {
    GOOGLE: 'google',
    BING: 'bing',
    YANDEX: 'yandex',
    BAIDU: 'baidu',
    NAUVER: 'naver',
    YAHOO: 'yahoo',
    DUCKDUCKGO: 'duckduckgo',
    ECOSIA: 'ecosia',
  } as const,

  // Algorithm Updates
  ALGORITHM_UPDATES: {
    PANDA: 'panda',
    PENGUIN: 'penguin',
    HUMMINGBIRD: 'hummingbird',
    COLOSSUS: 'colossus',
    POSSUM: 'possum',
    FRED: 'fred',
    BERT: 'bert',
    CORE_UPDATE: 'core_update',
    HELPFUL_CONTENT: 'helpful_content',
    E_EAT: 'e_eat',
  } as const,

  // Rich Snippet Types
  RICH_SNIPPET_TYPES: {
    REVIEW: 'review',
    RATING: 'rating',
    PRICE: 'price',
    AVAILABILITY: 'availability',
    EVENT: 'event',
    RECIPE: 'recipe',
    VIDEO: 'video',
    FAQ: 'faq',
    HOW_TO: 'how_to',
    Q_A: 'q_a',
    PRODUCT: 'product',
    ORGANIZATION: 'organization',
    LOCAL_BUSINESS: 'local_business',
    BREADCRUMB: 'breadcrumb',
    SITELINKS: 'sitelinks',
  } as const,

  // Local SEO Types
  LOCAL_TYPES: {
    GMB: 'gmb',
    LOCAL_CITATION: 'local_citation',
    REVIEW_MANAGEMENT: 'review_management',
    LOCAL_KEYWORDS: 'local_keywords',
    MAPS: 'maps',
    DIRECTORY: 'directory',
    LOCATION_PAGES: 'location_pages',
  } as const,

  // E-commerce SEO Types
  ECOMMERCE_TYPES: {
    PRODUCT_PAGE: 'product_page',
    CATEGORY_PAGE: 'category_page',
    FACETED_NAVIGATION: 'faceted_navigation',
    PRODUCT_REVIEWS: 'product_reviews',
    PRODUCT_COMPARISON: 'product_comparison',
    RELATED_PRODUCTS: 'related_products',
    UPSELL: 'upsell',
    CROSS_SELL: 'cross_sell',
    BUNDLE: 'bundle',
    PERSONALIZATION: 'personalization',
  } as const,
} as const;

// SEO Categories
export type SEOTypeCategory = (typeof SEO_TYPE.CATEGORIES)[keyof typeof SEO_TYPE.CATEGORIES];

// Page Types
export type SEOTypePageType = (typeof SEO_TYPE.PAGE_TYPES)[keyof typeof SEO_TYPE.PAGE_TYPES];

// Content Types
export type SEOTypeContentType =
  (typeof SEO_TYPE.CONTENT_TYPES)[keyof typeof SEO_TYPE.CONTENT_TYPES];

// Link Attributes
export type SEOTypeLinkAttribute =
  (typeof SEO_TYPE.LINK_ATTRIBUTES)[keyof typeof SEO_TYPE.LINK_ATTRIBUTES];

// Mobile Types
export type SEOTypeMobileType = (typeof SEO_TYPE.MOBILE_TYPES)[keyof typeof SEO_TYPE.MOBILE_TYPES];

// International Types
export type SEOTypeInternationalType =
  (typeof SEO_TYPE.INTERNATIONAL_TYPES)[keyof typeof SEO_TYPE.INTERNATIONAL_TYPES];

// Search Engines
export type SEOTypeSearchEngine =
  (typeof SEO_TYPE.SEARCH_ENGINES)[keyof typeof SEO_TYPE.SEARCH_ENGINES];

// Algorithm Updates
export type SEOTypeAlgorithmUpdate =
  (typeof SEO_TYPE.ALGORITHM_UPDATES)[keyof typeof SEO_TYPE.ALGORITHM_UPDATES];

// Rich Snippet Types
export type SEOTypeRichSnippet =
  (typeof SEO_TYPE.RICH_SNIPPET_TYPES)[keyof typeof SEO_TYPE.RICH_SNIPPET_TYPES];

// Local SEO Types
export type SEOTypeLocalType = (typeof SEO_TYPE.LOCAL_TYPES)[keyof typeof SEO_TYPE.LOCAL_TYPES];

// E-commerce Types
export type SEOTypeEcommerceType =
  (typeof SEO_TYPE.ECOMMERCE_TYPES)[keyof typeof SEO_TYPE.ECOMMERCE_TYPES];

// SEO Specific Utility Functions (renamed to avoid conflicts)
export function getSEOPageTypeLabel(pageType: SEOTypePageType): string {
  const labels: Record<SEOTypePageType, string> = {
    [SEO_TYPE.PAGE_TYPES.HOME]: 'Homepage',
    [SEO_TYPE.PAGE_TYPES.PRODUCT]: 'Product Page',
    [SEO_TYPE.PAGE_TYPES.CATEGORY]: 'Category Page',
    [SEO_TYPE.PAGE_TYPES.BLOG]: 'Blog Page',
    [SEO_TYPE.PAGE_TYPES.ABOUT]: 'About Page',
    [SEO_TYPE.PAGE_TYPES.CONTACT]: 'Contact Page',
    [SEO_TYPE.PAGE_TYPES.FAQ]: 'FAQ Page',
    [SEO_TYPE.PAGE_TYPES.CART]: 'Cart Page',
    [SEO_TYPE.PAGE_TYPES.CHECKOUT]: 'Checkout Page',
    [SEO_TYPE.PAGE_TYPES.ACCOUNT]: 'Account Page',
    [SEO_TYPE.PAGE_TYPES.ORDER]: 'Order Page',
    [SEO_TYPE.PAGE_TYPES.SEARCH]: 'Search Page',
    [SEO_TYPE.PAGE_TYPES.LANDING]: 'Landing Page',
    [SEO_TYPE.PAGE_TYPES.GALLERY]: 'Gallery Page',
    [SEO_TYPE.PAGE_TYPES.EVENT]: 'Event Page',
    [SEO_TYPE.PAGE_TYPES.NEWS]: 'News Page',
    [SEO_TYPE.PAGE_TYPES.CAREER]: 'Career Page',
    [SEO_TYPE.PAGE_TYPES.LEGAL]: 'Legal Page',
    [SEO_TYPE.PAGE_TYPES.POLICY]: 'Policy Page',
    [SEO_TYPE.PAGE_TYPES.TERMS]: 'Terms Page',
  };
  return labels[pageType] || 'Unknown Page';
}

export function getSEOSearchEngineLabel(engine: SEOTypeSearchEngine): string {
  const labels: Record<SEOTypeSearchEngine, string> = {
    [SEO_TYPE.SEARCH_ENGINES.GOOGLE]: 'Google',
    [SEO_TYPE.SEARCH_ENGINES.BING]: 'Bing',
    [SEO_TYPE.SEARCH_ENGINES.YANDEX]: 'Yandex',
    [SEO_TYPE.SEARCH_ENGINES.BAIDU]: 'Baidu',
    [SEO_TYPE.SEARCH_ENGINES.NAUVER]: 'Naver',
    [SEO_TYPE.SEARCH_ENGINES.YAHOO]: 'Yahoo',
    [SEO_TYPE.SEARCH_ENGINES.DUCKDUCKGO]: 'DuckDuckGo',
    [SEO_TYPE.SEARCH_ENGINES.ECOSIA]: 'Ecosia',
  };
  return labels[engine] || 'Unknown Search Engine';
}

export function getSEORichSnippetLabel(snippet: SEOTypeRichSnippet): string {
  const labels: Record<SEOTypeRichSnippet, string> = {
    [SEO_TYPE.RICH_SNIPPET_TYPES.REVIEW]: 'Review Snippet',
    [SEO_TYPE.RICH_SNIPPET_TYPES.RATING]: 'Rating Snippet',
    [SEO_TYPE.RICH_SNIPPET_TYPES.PRICE]: 'Price Snippet',
    [SEO_TYPE.RICH_SNIPPET_TYPES.AVAILABILITY]: 'Availability Snippet',
    [SEO_TYPE.RICH_SNIPPET_TYPES.EVENT]: 'Event Snippet',
    [SEO_TYPE.RICH_SNIPPET_TYPES.RECIPE]: 'Recipe Snippet',
    [SEO_TYPE.RICH_SNIPPET_TYPES.VIDEO]: 'Video Snippet',
    [SEO_TYPE.RICH_SNIPPET_TYPES.FAQ]: 'FAQ Snippet',
    [SEO_TYPE.RICH_SNIPPET_TYPES.HOW_TO]: 'How-to Snippet',
    [SEO_TYPE.RICH_SNIPPET_TYPES.Q_A]: 'Q&A Snippet',
    [SEO_TYPE.RICH_SNIPPET_TYPES.PRODUCT]: 'Product Snippet',
    [SEO_TYPE.RICH_SNIPPET_TYPES.ORGANIZATION]: 'Organization Snippet',
    [SEO_TYPE.RICH_SNIPPET_TYPES.LOCAL_BUSINESS]: 'Local Business Snippet',
    [SEO_TYPE.RICH_SNIPPET_TYPES.BREADCRUMB]: 'Breadcrumb Snippet',
    [SEO_TYPE.RICH_SNIPPET_TYPES.SITELINKS]: 'Sitelinks Snippet',
  };
  return labels[snippet] || 'Unknown Rich Snippet';
}

export function getSEOEcommerceTypeLabel(type: SEOTypeEcommerceType): string {
  const labels: Record<SEOTypeEcommerceType, string> = {
    [SEO_TYPE.ECOMMERCE_TYPES.PRODUCT_PAGE]: 'Product Page SEO',
    [SEO_TYPE.ECOMMERCE_TYPES.CATEGORY_PAGE]: 'Category Page SEO',
    [SEO_TYPE.ECOMMERCE_TYPES.FACETED_NAVIGATION]: 'Faceted Navigation',
    [SEO_TYPE.ECOMMERCE_TYPES.PRODUCT_REVIEWS]: 'Product Reviews',
    [SEO_TYPE.ECOMMERCE_TYPES.PRODUCT_COMPARISON]: 'Product Comparison',
    [SEO_TYPE.ECOMMERCE_TYPES.RELATED_PRODUCTS]: 'Related Products',
    [SEO_TYPE.ECOMMERCE_TYPES.UPSELL]: 'Upsell Products',
    [SEO_TYPE.ECOMMERCE_TYPES.CROSS_SELL]: 'Cross-sell Products',
    [SEO_TYPE.ECOMMERCE_TYPES.BUNDLE]: 'Product Bundle',
    [SEO_TYPE.ECOMMERCE_TYPES.PERSONALIZATION]: 'Personalization',
  };
  return labels[type] || 'Unknown E-commerce Type';
}

export function getSEOMobileTypeLabel(mobileType: SEOTypeMobileType): string {
  const labels: Record<SEOTypeMobileType, string> = {
    [SEO_TYPE.MOBILE_TYPES.RESPONSIVE]: 'Responsive Design',
    [SEO_TYPE.MOBILE_TYPES.DYNAMIC_SERVING]: 'Dynamic Serving',
    [SEO_TYPE.MOBILE_TYPES.SEPARATE_URL]: 'Separate URL',
    [SEO_TYPE.MOBILE_TYPES.AMP]: 'AMP (Accelerated Mobile Pages)',
    [SEO_TYPE.MOBILE_TYPES.M_WEBSITE]: 'Mobile Subdomain (m.)',
  };
  return labels[mobileType] || 'Unknown Mobile Type';
}
