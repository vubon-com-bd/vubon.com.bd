/**
 * SEO Open Graph Type Constants
 * Types and classifications for Open Graph tags
 */

export const SEO_OPEN_GRAPH_TYPE = {
  // OG Categories
  CATEGORIES: {
    BASIC: 'basic',
    MEDIA: 'media',
    SOCIAL: 'social',
    COMMERCE: 'commerce',
    LOCATION: 'location',
    EVENT: 'event',
    CREATIVE: 'creative',
    ORGANIZATION: 'organization',
  } as const,

  // OG Sub-types
  SUB_TYPES: {
    // Basic
    WEBSITE: 'website',
    BLOG: 'blog',
    PORTFOLIO: 'portfolio',
    RESUME: 'resume',

    // Social
    PROFILE: 'profile',
    PAGE: 'page',
    GROUP: 'group',
    COMMUNITY: 'community',

    // Media
    PHOTO: 'photo',
    GALLERY: 'gallery',
    VIDEO: 'video',
    AUDIO: 'audio',
    PODCAST: 'podcast',
    LIVE: 'live',

    // Commerce
    PRODUCT: 'product',
    SERVICE: 'service',
    BUNDLE: 'bundle',
    SUBSCRIPTION: 'subscription',

    // Event
    CONFERENCE: 'conference',
    WORKSHOP: 'workshop',
    SEMINAR: 'seminar',
    MEETUP: 'meetup',
    CONCERT: 'concert',
    FESTIVAL: 'festival',

    // Creative
    ARTICLE: 'article',
    STORY: 'story',
    POEM: 'poem',
    RECIPE: 'recipe',
    TUTORIAL: 'tutorial',

    // Organization
    COMPANY: 'company',
    NONPROFIT: 'nonprofit',
    GOVERNMENT: 'government',
    EDUCATIONAL: 'educational',
  } as const,

  // OG Contexts
  CONTEXTS: {
    SOCIAL: 'social',
    SEARCH: 'search',
    EMAIL: 'email',
    APP: 'app',
    MESSENGER: 'messenger',
  } as const,

  // OG Purposes
  PURPOSES: {
    SHARING: 'sharing',
    SEARCH: 'search',
    PREVIEW: 'preview',
    RICH_SNIPPET: 'rich_snippet',
    SOCIAL_CARD: 'social_card',
  } as const,

  // OG Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    STANDARD: 'standard',
    EXTENDED: 'extended',
    COMPLEX: 'complex',
  } as const,
} as const;

// OG Categories
export type SEOOpenGraphTypeCategory =
  (typeof SEO_OPEN_GRAPH_TYPE.CATEGORIES)[keyof typeof SEO_OPEN_GRAPH_TYPE.CATEGORIES];

// OG Sub-types
export type SEOOpenGraphTypeSubType =
  (typeof SEO_OPEN_GRAPH_TYPE.SUB_TYPES)[keyof typeof SEO_OPEN_GRAPH_TYPE.SUB_TYPES];

// OG Contexts
export type SEOOpenGraphTypeContext =
  (typeof SEO_OPEN_GRAPH_TYPE.CONTEXTS)[keyof typeof SEO_OPEN_GRAPH_TYPE.CONTEXTS];

// OG Purposes
export type SEOOpenGraphTypePurpose =
  (typeof SEO_OPEN_GRAPH_TYPE.PURPOSES)[keyof typeof SEO_OPEN_GRAPH_TYPE.PURPOSES];

// OG Complexity
export type SEOOpenGraphTypeComplexity =
  (typeof SEO_OPEN_GRAPH_TYPE.COMPLEXITY)[keyof typeof SEO_OPEN_GRAPH_TYPE.COMPLEXITY];

// Utility Functions
export function getSEOOpenGraphCategoryLabel(category: SEOOpenGraphTypeCategory): string {
  const labels: Record<SEOOpenGraphTypeCategory, string> = {
    [SEO_OPEN_GRAPH_TYPE.CATEGORIES.BASIC]: 'Basic OG Tags',
    [SEO_OPEN_GRAPH_TYPE.CATEGORIES.MEDIA]: 'Media OG Tags',
    [SEO_OPEN_GRAPH_TYPE.CATEGORIES.SOCIAL]: 'Social OG Tags',
    [SEO_OPEN_GRAPH_TYPE.CATEGORIES.COMMERCE]: 'Commerce OG Tags',
    [SEO_OPEN_GRAPH_TYPE.CATEGORIES.LOCATION]: 'Location OG Tags',
    [SEO_OPEN_GRAPH_TYPE.CATEGORIES.EVENT]: 'Event OG Tags',
    [SEO_OPEN_GRAPH_TYPE.CATEGORIES.CREATIVE]: 'Creative OG Tags',
    [SEO_OPEN_GRAPH_TYPE.CATEGORIES.ORGANIZATION]: 'Organization OG Tags',
  };
  return labels[category] || 'Unknown Category';
}

export function getSEOOpenGraphSubTypeLabel(subType: SEOOpenGraphTypeSubType): string {
  const labels: Record<SEOOpenGraphTypeSubType, string> = {
    // Basic
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.WEBSITE]: 'Website',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.BLOG]: 'Blog',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.PORTFOLIO]: 'Portfolio',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.RESUME]: 'Resume',

    // Social
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.PROFILE]: 'Profile',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.PAGE]: 'Page',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.GROUP]: 'Group',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.COMMUNITY]: 'Community',

    // Media
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.PHOTO]: 'Photo',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.GALLERY]: 'Gallery',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.VIDEO]: 'Video',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.AUDIO]: 'Audio',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.PODCAST]: 'Podcast',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.LIVE]: 'Live Broadcast',

    // Commerce
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.PRODUCT]: 'Product',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.SERVICE]: 'Service',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.BUNDLE]: 'Bundle',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.SUBSCRIPTION]: 'Subscription',

    // Event
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.CONFERENCE]: 'Conference',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.WORKSHOP]: 'Workshop',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.SEMINAR]: 'Seminar',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.MEETUP]: 'Meetup',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.CONCERT]: 'Concert',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.FESTIVAL]: 'Festival',

    // Creative
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.ARTICLE]: 'Article',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.STORY]: 'Story',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.POEM]: 'Poem',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.RECIPE]: 'Recipe',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.TUTORIAL]: 'Tutorial',

    // Organization
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.COMPANY]: 'Company',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.NONPROFIT]: 'Nonprofit',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.GOVERNMENT]: 'Government',
    [SEO_OPEN_GRAPH_TYPE.SUB_TYPES.EDUCATIONAL]: 'Educational',
  };
  return labels[subType] || 'Unknown Sub-type';
}

export function getSEOOpenGraphContextLabel(context: SEOOpenGraphTypeContext): string {
  const labels: Record<SEOOpenGraphTypeContext, string> = {
    [SEO_OPEN_GRAPH_TYPE.CONTEXTS.SOCIAL]: 'Social Media',
    [SEO_OPEN_GRAPH_TYPE.CONTEXTS.SEARCH]: 'Search Engine',
    [SEO_OPEN_GRAPH_TYPE.CONTEXTS.EMAIL]: 'Email',
    [SEO_OPEN_GRAPH_TYPE.CONTEXTS.APP]: 'Mobile App',
    [SEO_OPEN_GRAPH_TYPE.CONTEXTS.MESSENGER]: 'Messenger',
  };
  return labels[context] || 'Unknown Context';
}

export function getSEOOpenGraphPurposeLabel(purpose: SEOOpenGraphTypePurpose): string {
  const labels: Record<SEOOpenGraphTypePurpose, string> = {
    [SEO_OPEN_GRAPH_TYPE.PURPOSES.SHARING]: 'Sharing',
    [SEO_OPEN_GRAPH_TYPE.PURPOSES.SEARCH]: 'Search',
    [SEO_OPEN_GRAPH_TYPE.PURPOSES.PREVIEW]: 'Preview',
    [SEO_OPEN_GRAPH_TYPE.PURPOSES.RICH_SNIPPET]: 'Rich Snippet',
    [SEO_OPEN_GRAPH_TYPE.PURPOSES.SOCIAL_CARD]: 'Social Card',
  };
  return labels[purpose] || 'Unknown Purpose';
}

export function getSEOOpenGraphComplexityLabel(complexity: SEOOpenGraphTypeComplexity): string {
  const labels: Record<SEOOpenGraphTypeComplexity, string> = {
    [SEO_OPEN_GRAPH_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [SEO_OPEN_GRAPH_TYPE.COMPLEXITY.STANDARD]: 'Standard',
    [SEO_OPEN_GRAPH_TYPE.COMPLEXITY.EXTENDED]: 'Extended',
    [SEO_OPEN_GRAPH_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
  };
  return labels[complexity] || 'Unknown Complexity';
}
