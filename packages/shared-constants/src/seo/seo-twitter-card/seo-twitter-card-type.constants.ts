/**
 * SEO Twitter Card Type Constants
 * Types and classifications for Twitter Cards
 */

export const SEO_TWITTER_CARD_TYPE = {
  // Card Categories
  CATEGORIES: {
    BASIC: 'basic',
    MEDIA: 'media',
    COMMERCE: 'commerce',
    SOCIAL: 'social',
    ORGANIZATION: 'organization',
    EVENT: 'event',
  } as const,

  // Card Sub-types
  SUB_TYPES: {
    // Basic
    WEBSITE: 'website',
    BLOG: 'blog',
    PORTFOLIO: 'portfolio',
    RESUME: 'resume',

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
    DEAL: 'deal',
    OFFER: 'offer',

    // Social
    PROFILE: 'profile',
    PAGE: 'page',
    COMMUNITY: 'community',

    // Organization
    COMPANY: 'company',
    NONPROFIT: 'nonprofit',
    EDUCATIONAL: 'educational',

    // Event
    CONFERENCE: 'conference',
    WORKSHOP: 'workshop',
    MEETUP: 'meetup',
    CONCERT: 'concert',
  } as const,

  // Card Contexts
  CONTEXTS: {
    TWITTER: 'twitter',
    X: 'x',
    TWITTER_APP: 'twitter_app',
    X_APP: 'x_app',
    EMBED: 'embed',
  } as const,

  // Card Purposes
  PURPOSES: {
    SHARING: 'sharing',
    PREVIEW: 'preview',
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
    BRANDING: 'branding',
    TRAFFIC: 'traffic',
  } as const,

  // Card Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    STANDARD: 'standard',
    EXTENDED: 'extended',
    COMPLEX: 'complex',
  } as const,

  // Card Display
  DISPLAY: {
    COMPACT: 'compact',
    LARGE: 'large',
    FULL: 'full',
    MINIMAL: 'minimal',
  } as const,
} as const;

// Card Categories
export type SEOTwitterCardTypeCategory =
  (typeof SEO_TWITTER_CARD_TYPE.CATEGORIES)[keyof typeof SEO_TWITTER_CARD_TYPE.CATEGORIES];

// Card Sub-types
export type SEOTwitterCardTypeSubType =
  (typeof SEO_TWITTER_CARD_TYPE.SUB_TYPES)[keyof typeof SEO_TWITTER_CARD_TYPE.SUB_TYPES];

// Card Contexts
export type SEOTwitterCardTypeContext =
  (typeof SEO_TWITTER_CARD_TYPE.CONTEXTS)[keyof typeof SEO_TWITTER_CARD_TYPE.CONTEXTS];

// Card Purposes
export type SEOTwitterCardTypePurpose =
  (typeof SEO_TWITTER_CARD_TYPE.PURPOSES)[keyof typeof SEO_TWITTER_CARD_TYPE.PURPOSES];

// Card Complexity
export type SEOTwitterCardTypeComplexity =
  (typeof SEO_TWITTER_CARD_TYPE.COMPLEXITY)[keyof typeof SEO_TWITTER_CARD_TYPE.COMPLEXITY];

// Card Display
export type SEOTwitterCardTypeDisplay =
  (typeof SEO_TWITTER_CARD_TYPE.DISPLAY)[keyof typeof SEO_TWITTER_CARD_TYPE.DISPLAY];

// Utility Functions
export function getSEOTwitterCardCategoryLabel(category: SEOTwitterCardTypeCategory): string {
  const labels: Record<SEOTwitterCardTypeCategory, string> = {
    [SEO_TWITTER_CARD_TYPE.CATEGORIES.BASIC]: 'Basic Cards',
    [SEO_TWITTER_CARD_TYPE.CATEGORIES.MEDIA]: 'Media Cards',
    [SEO_TWITTER_CARD_TYPE.CATEGORIES.COMMERCE]: 'Commerce Cards',
    [SEO_TWITTER_CARD_TYPE.CATEGORIES.SOCIAL]: 'Social Cards',
    [SEO_TWITTER_CARD_TYPE.CATEGORIES.ORGANIZATION]: 'Organization Cards',
    [SEO_TWITTER_CARD_TYPE.CATEGORIES.EVENT]: 'Event Cards',
  };
  return labels[category] || 'Unknown Category';
}

export function getSEOTwitterCardSubTypeLabel(subType: SEOTwitterCardTypeSubType): string {
  const labels: Record<SEOTwitterCardTypeSubType, string> = {
    // Basic
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.WEBSITE]: 'Website',
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.BLOG]: 'Blog',
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.PORTFOLIO]: 'Portfolio',
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.RESUME]: 'Resume',

    // Media
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.PHOTO]: 'Photo',
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.GALLERY]: 'Gallery',
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.VIDEO]: 'Video',
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.AUDIO]: 'Audio',
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.PODCAST]: 'Podcast',
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.LIVE]: 'Live Broadcast',

    // Commerce
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.PRODUCT]: 'Product',
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.SERVICE]: 'Service',
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.DEAL]: 'Deal',
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.OFFER]: 'Offer',

    // Social
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.PROFILE]: 'Profile',
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.PAGE]: 'Page',
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.COMMUNITY]: 'Community',

    // Organization
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.COMPANY]: 'Company',
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.NONPROFIT]: 'Nonprofit',
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.EDUCATIONAL]: 'Educational',

    // Event
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.CONFERENCE]: 'Conference',
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.WORKSHOP]: 'Workshop',
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.MEETUP]: 'Meetup',
    [SEO_TWITTER_CARD_TYPE.SUB_TYPES.CONCERT]: 'Concert',
  };
  return labels[subType] || 'Unknown Sub-type';
}

export function getSEOTwitterCardContextLabel(context: SEOTwitterCardTypeContext): string {
  const labels: Record<SEOTwitterCardTypeContext, string> = {
    [SEO_TWITTER_CARD_TYPE.CONTEXTS.TWITTER]: 'Twitter',
    [SEO_TWITTER_CARD_TYPE.CONTEXTS.X]: 'X',
    [SEO_TWITTER_CARD_TYPE.CONTEXTS.TWITTER_APP]: 'Twitter App',
    [SEO_TWITTER_CARD_TYPE.CONTEXTS.X_APP]: 'X App',
    [SEO_TWITTER_CARD_TYPE.CONTEXTS.EMBED]: 'Embed',
  };
  return labels[context] || 'Unknown Context';
}

export function getSEOTwitterCardPurposeLabel(purpose: SEOTwitterCardTypePurpose): string {
  const labels: Record<SEOTwitterCardTypePurpose, string> = {
    [SEO_TWITTER_CARD_TYPE.PURPOSES.SHARING]: 'Sharing',
    [SEO_TWITTER_CARD_TYPE.PURPOSES.PREVIEW]: 'Preview',
    [SEO_TWITTER_CARD_TYPE.PURPOSES.ENGAGEMENT]: 'Engagement',
    [SEO_TWITTER_CARD_TYPE.PURPOSES.CONVERSION]: 'Conversion',
    [SEO_TWITTER_CARD_TYPE.PURPOSES.BRANDING]: 'Branding',
    [SEO_TWITTER_CARD_TYPE.PURPOSES.TRAFFIC]: 'Traffic',
  };
  return labels[purpose] || 'Unknown Purpose';
}

export function getSEOTwitterCardComplexityLabel(complexity: SEOTwitterCardTypeComplexity): string {
  const labels: Record<SEOTwitterCardTypeComplexity, string> = {
    [SEO_TWITTER_CARD_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [SEO_TWITTER_CARD_TYPE.COMPLEXITY.STANDARD]: 'Standard',
    [SEO_TWITTER_CARD_TYPE.COMPLEXITY.EXTENDED]: 'Extended',
    [SEO_TWITTER_CARD_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function getSEOTwitterCardDisplayLabel(display: SEOTwitterCardTypeDisplay): string {
  const labels: Record<SEOTwitterCardTypeDisplay, string> = {
    [SEO_TWITTER_CARD_TYPE.DISPLAY.COMPACT]: 'Compact',
    [SEO_TWITTER_CARD_TYPE.DISPLAY.LARGE]: 'Large',
    [SEO_TWITTER_CARD_TYPE.DISPLAY.FULL]: 'Full',
    [SEO_TWITTER_CARD_TYPE.DISPLAY.MINIMAL]: 'Minimal',
  };
  return labels[display] || 'Unknown Display';
}
