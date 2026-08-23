/**
 * Page Template Constants
 * Templates for page layouts and designs
 */

export const CONTENT_PAGE_TEMPLATE = {
  // Template Categories
  CATEGORIES: {
    GENERAL: 'general',
    BUSINESS: 'business',
    ECOMMERCE: 'ecommerce',
    BLOG: 'blog',
    PORTFOLIO: 'portfolio',
    AGENCY: 'agency',
    STARTUP: 'startup',
    CORPORATE: 'corporate',
    CREATIVE: 'creative',
    EDUCATIONAL: 'educational',
    MEDICAL: 'medical',
    REAL_ESTATE: 'real_estate',
    CUSTOM: 'custom',
  } as const,

  // Template Complexity
  COMPLEXITY: {
    BASIC: 'basic',
    STANDARD: 'standard',
    ADVANCED: 'advanced',
    PREMIUM: 'premium',
  } as const,

  // Template Features
  FEATURES: {
    RESPONSIVE: 'responsive',
    RETINA: 'retina',
    ANIMATED: 'animated',
    INTERACTIVE: 'interactive',
    PARALLAX: 'parallax',
    VIDEO: 'video',
    AUDIO: 'audio',
    SLIDER: 'slider',
    CAROUSEL: 'carousel',
    MODAL: 'modal',
    DROPDOWN: 'dropdown',
    MEGA_MENU: 'mega_menu',
    SEARCH: 'search',
    FILTER: 'filter',
    PAGINATION: 'pagination',
    SORTING: 'sorting',
    COMPARE: 'compare',
    WISHLIST: 'wishlist',
    SHARE: 'share',
    PRINT: 'print',
    DOWNLOAD: 'download',
    CONTACT_FORM: 'contact_form',
    NEWSLETTER: 'newsletter',
    SOCIAL_MEDIA: 'social_media',
    LIVE_CHAT: 'live_chat',
    CUSTOM: 'custom',
  } as const,

  // Template Support
  SUPPORT: {
    BROWSER: 'browser',
    MOBILE: 'mobile',
    TABLET: 'tablet',
    DESKTOP: 'desktop',
    ALL: 'all',
  } as const,

  // Template Performance
  PERFORMANCE: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    OPTIMAL: 'optimal',
  } as const,

  // Template SEO
  SEO: {
    BASIC: 'basic',
    STANDARD: 'standard',
    ADVANCED: 'advanced',
    OPTIMAL: 'optimal',
  } as const,

  // Template Accessibility
  ACCESSIBILITY: {
    BASIC: 'basic',
    STANDARD: 'standard',
    ADVANCED: 'advanced',
    WCAG: 'wcag',
  } as const,
} as const;

// Template Categories
export type ContentPageTemplateCategory =
  (typeof CONTENT_PAGE_TEMPLATE.CATEGORIES)[keyof typeof CONTENT_PAGE_TEMPLATE.CATEGORIES];

// Template Complexity
export type ContentPageTemplateComplexity =
  (typeof CONTENT_PAGE_TEMPLATE.COMPLEXITY)[keyof typeof CONTENT_PAGE_TEMPLATE.COMPLEXITY];

// Template Features
export type ContentPageTemplateFeature =
  (typeof CONTENT_PAGE_TEMPLATE.FEATURES)[keyof typeof CONTENT_PAGE_TEMPLATE.FEATURES];

// Template Support
export type ContentPageTemplateSupport =
  (typeof CONTENT_PAGE_TEMPLATE.SUPPORT)[keyof typeof CONTENT_PAGE_TEMPLATE.SUPPORT];

// Template Performance
export type ContentPageTemplatePerformance =
  (typeof CONTENT_PAGE_TEMPLATE.PERFORMANCE)[keyof typeof CONTENT_PAGE_TEMPLATE.PERFORMANCE];

// Template SEO
export type ContentPageTemplateSEO =
  (typeof CONTENT_PAGE_TEMPLATE.SEO)[keyof typeof CONTENT_PAGE_TEMPLATE.SEO];

// Template Accessibility
export type ContentPageTemplateAccessibility =
  (typeof CONTENT_PAGE_TEMPLATE.ACCESSIBILITY)[keyof typeof CONTENT_PAGE_TEMPLATE.ACCESSIBILITY];

// Utility Functions
export function contentPageTemplateGetCategoryLabel(category: ContentPageTemplateCategory): string {
  const labels: Record<ContentPageTemplateCategory, string> = {
    [CONTENT_PAGE_TEMPLATE.CATEGORIES.GENERAL]: 'General Template',
    [CONTENT_PAGE_TEMPLATE.CATEGORIES.BUSINESS]: 'Business Template',
    [CONTENT_PAGE_TEMPLATE.CATEGORIES.ECOMMERCE]: 'E-commerce Template',
    [CONTENT_PAGE_TEMPLATE.CATEGORIES.BLOG]: 'Blog Template',
    [CONTENT_PAGE_TEMPLATE.CATEGORIES.PORTFOLIO]: 'Portfolio Template',
    [CONTENT_PAGE_TEMPLATE.CATEGORIES.AGENCY]: 'Agency Template',
    [CONTENT_PAGE_TEMPLATE.CATEGORIES.STARTUP]: 'Startup Template',
    [CONTENT_PAGE_TEMPLATE.CATEGORIES.CORPORATE]: 'Corporate Template',
    [CONTENT_PAGE_TEMPLATE.CATEGORIES.CREATIVE]: 'Creative Template',
    [CONTENT_PAGE_TEMPLATE.CATEGORIES.EDUCATIONAL]: 'Educational Template',
    [CONTENT_PAGE_TEMPLATE.CATEGORIES.MEDICAL]: 'Medical Template',
    [CONTENT_PAGE_TEMPLATE.CATEGORIES.REAL_ESTATE]: 'Real Estate Template',
    [CONTENT_PAGE_TEMPLATE.CATEGORIES.CUSTOM]: 'Custom Template',
  };
  return labels[category] || 'Unknown Category';
}

export function contentPageTemplateGetComplexityLabel(
  complexity: ContentPageTemplateComplexity
): string {
  const labels: Record<ContentPageTemplateComplexity, string> = {
    [CONTENT_PAGE_TEMPLATE.COMPLEXITY.BASIC]: 'Basic',
    [CONTENT_PAGE_TEMPLATE.COMPLEXITY.STANDARD]: 'Standard',
    [CONTENT_PAGE_TEMPLATE.COMPLEXITY.ADVANCED]: 'Advanced',
    [CONTENT_PAGE_TEMPLATE.COMPLEXITY.PREMIUM]: 'Premium',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function contentPageTemplateGetFeatureLabel(feature: ContentPageTemplateFeature): string {
  const labels: Record<ContentPageTemplateFeature, string> = {
    [CONTENT_PAGE_TEMPLATE.FEATURES.RESPONSIVE]: 'Responsive Design',
    [CONTENT_PAGE_TEMPLATE.FEATURES.RETINA]: 'Retina Ready',
    [CONTENT_PAGE_TEMPLATE.FEATURES.ANIMATED]: 'Animated',
    [CONTENT_PAGE_TEMPLATE.FEATURES.INTERACTIVE]: 'Interactive',
    [CONTENT_PAGE_TEMPLATE.FEATURES.PARALLAX]: 'Parallax Scrolling',
    [CONTENT_PAGE_TEMPLATE.FEATURES.VIDEO]: 'Video Support',
    [CONTENT_PAGE_TEMPLATE.FEATURES.AUDIO]: 'Audio Support',
    [CONTENT_PAGE_TEMPLATE.FEATURES.SLIDER]: 'Image Slider',
    [CONTENT_PAGE_TEMPLATE.FEATURES.CAROUSEL]: 'Product Carousel',
    [CONTENT_PAGE_TEMPLATE.FEATURES.MODAL]: 'Modal Windows',
    [CONTENT_PAGE_TEMPLATE.FEATURES.DROPDOWN]: 'Dropdown Menus',
    [CONTENT_PAGE_TEMPLATE.FEATURES.MEGA_MENU]: 'Mega Menu',
    [CONTENT_PAGE_TEMPLATE.FEATURES.SEARCH]: 'Search Functionality',
    [CONTENT_PAGE_TEMPLATE.FEATURES.FILTER]: 'Filter Options',
    [CONTENT_PAGE_TEMPLATE.FEATURES.PAGINATION]: 'Pagination',
    [CONTENT_PAGE_TEMPLATE.FEATURES.SORTING]: 'Sorting Options',
    [CONTENT_PAGE_TEMPLATE.FEATURES.COMPARE]: 'Compare Products',
    [CONTENT_PAGE_TEMPLATE.FEATURES.WISHLIST]: 'Wishlist',
    [CONTENT_PAGE_TEMPLATE.FEATURES.SHARE]: 'Social Share',
    [CONTENT_PAGE_TEMPLATE.FEATURES.PRINT]: 'Print Feature',
    [CONTENT_PAGE_TEMPLATE.FEATURES.DOWNLOAD]: 'Download Options',
    [CONTENT_PAGE_TEMPLATE.FEATURES.CONTACT_FORM]: 'Contact Form',
    [CONTENT_PAGE_TEMPLATE.FEATURES.NEWSLETTER]: 'Newsletter Signup',
    [CONTENT_PAGE_TEMPLATE.FEATURES.SOCIAL_MEDIA]: 'Social Media Integration',
    [CONTENT_PAGE_TEMPLATE.FEATURES.LIVE_CHAT]: 'Live Chat',
    [CONTENT_PAGE_TEMPLATE.FEATURES.CUSTOM]: 'Custom Features',
  };
  return labels[feature] || 'Unknown Feature';
}

export function contentPageTemplateGetSupportLabel(support: ContentPageTemplateSupport): string {
  const labels: Record<ContentPageTemplateSupport, string> = {
    [CONTENT_PAGE_TEMPLATE.SUPPORT.BROWSER]: 'Browser Only',
    [CONTENT_PAGE_TEMPLATE.SUPPORT.MOBILE]: 'Mobile Optimized',
    [CONTENT_PAGE_TEMPLATE.SUPPORT.TABLET]: 'Tablet Optimized',
    [CONTENT_PAGE_TEMPLATE.SUPPORT.DESKTOP]: 'Desktop Optimized',
    [CONTENT_PAGE_TEMPLATE.SUPPORT.ALL]: 'All Devices',
  };
  return labels[support] || 'Unknown Support';
}

export function contentPageTemplateGetPerformanceLabel(
  performance: ContentPageTemplatePerformance
): string {
  const labels: Record<ContentPageTemplatePerformance, string> = {
    [CONTENT_PAGE_TEMPLATE.PERFORMANCE.LOW]: 'Low Performance',
    [CONTENT_PAGE_TEMPLATE.PERFORMANCE.MEDIUM]: 'Medium Performance',
    [CONTENT_PAGE_TEMPLATE.PERFORMANCE.HIGH]: 'High Performance',
    [CONTENT_PAGE_TEMPLATE.PERFORMANCE.OPTIMAL]: 'Optimal Performance',
  };
  return labels[performance] || 'Unknown Performance';
}

export function contentPageTemplateGetSEOLabel(seo: ContentPageTemplateSEO): string {
  const labels: Record<ContentPageTemplateSEO, string> = {
    [CONTENT_PAGE_TEMPLATE.SEO.BASIC]: 'Basic SEO',
    [CONTENT_PAGE_TEMPLATE.SEO.STANDARD]: 'Standard SEO',
    [CONTENT_PAGE_TEMPLATE.SEO.ADVANCED]: 'Advanced SEO',
    [CONTENT_PAGE_TEMPLATE.SEO.OPTIMAL]: 'Optimal SEO',
  };
  return labels[seo] || 'Unknown SEO Level';
}

export function contentPageTemplateGetAccessibilityLabel(
  accessibility: ContentPageTemplateAccessibility
): string {
  const labels: Record<ContentPageTemplateAccessibility, string> = {
    [CONTENT_PAGE_TEMPLATE.ACCESSIBILITY.BASIC]: 'Basic Accessibility',
    [CONTENT_PAGE_TEMPLATE.ACCESSIBILITY.STANDARD]: 'Standard Accessibility',
    [CONTENT_PAGE_TEMPLATE.ACCESSIBILITY.ADVANCED]: 'Advanced Accessibility',
    [CONTENT_PAGE_TEMPLATE.ACCESSIBILITY.WCAG]: 'WCAG Compliant',
  };
  return labels[accessibility] || 'Unknown Accessibility Level';
}

export function contentPageTemplateIsValidCategory(
  category: string
): category is ContentPageTemplateCategory {
  return Object.values(CONTENT_PAGE_TEMPLATE.CATEGORIES).includes(
    category as ContentPageTemplateCategory
  );
}

export function contentPageTemplateIsValidFeature(
  feature: string
): feature is ContentPageTemplateFeature {
  return Object.values(CONTENT_PAGE_TEMPLATE.FEATURES).includes(
    feature as ContentPageTemplateFeature
  );
}
