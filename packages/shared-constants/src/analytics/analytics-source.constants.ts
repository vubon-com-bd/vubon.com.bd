/**
 * Analytics Source Constants
 * Traffic sources and acquisition channels
 */

export const ANALYTICS_SOURCE = {
  // Traffic Sources
  SOURCES: {
    // Organic Sources
    ORGANIC: 'organic',
    ORGANIC_SEARCH: 'organic_search',
    ORGANIC_SOCIAL: 'organic_social',

    // Paid Sources
    PAID: 'paid',
    PAID_SEARCH: 'paid_search',
    PAID_SOCIAL: 'paid_social',
    DISPLAY: 'display',
    VIDEO: 'video',
    NATIVE: 'native',

    // Direct Sources
    DIRECT: 'direct',
    BOOKMARK: 'bookmark',
    TYPED: 'typed',

    // Referral Sources
    REFERRAL: 'referral',
    BACKLINK: 'backlink',
    AFFILIATE: 'affiliate',

    // Social Sources
    FACEBOOK: 'facebook',
    INSTAGRAM: 'instagram',
    TWITTER: 'twitter',
    LINKEDIN: 'linkedin',
    YOUTUBE: 'youtube',
    TIKTOK: 'tiktok',
    SNAPCHAT: 'snapchat',
    PINTEREST: 'pinterest',
    REDDIT: 'reddit',
    QUORA: 'quora',

    // Email Sources
    EMAIL: 'email',
    NEWSLETTER: 'newsletter',
    PROMOTIONAL: 'promotional',

    // Search Engines
    GOOGLE: 'google',
    BING: 'bing',
    YAHOO: 'yahoo',
    BAIDU: 'baidu',
    YANDEX: 'yandex',

    // Other Sources
    OTHER: 'other',
    UNKNOWN: 'unknown',
    OFFLINE: 'offline',
    INFLUENCER: 'influencer',
    CONTENT: 'content',
    PR: 'pr',
  } as const,

  // Source Categories
  CATEGORIES: {
    ORGANIC: 'organic',
    PAID: 'paid',
    DIRECT: 'direct',
    REFERRAL: 'referral',
    SOCIAL: 'social',
    EMAIL: 'email',
    SEARCH: 'search',
    OTHER: 'other',
  } as const,

  // Source Sub-categories
  SUB_CATEGORIES: {
    // Organic
    ORGANIC_SEARCH: 'organic_search',
    ORGANIC_SOCIAL: 'organic_social',

    // Paid
    PAID_SEARCH: 'paid_search',
    PAID_SOCIAL: 'paid_social',
    DISPLAY_ADS: 'display_ads',
    VIDEO_ADS: 'video_ads',

    // Social
    SOCIAL_ORGANIC: 'social_organic',
    SOCIAL_PAID: 'social_paid',

    // Referral
    BACKLINK: 'backlink',
    AFFILIATE: 'affiliate',
    INFLUENCER: 'influencer',
  } as const,

  // Source Types
  TYPES: {
    WEBSITE: 'website',
    APP: 'app',
    SOCIAL: 'social',
    EMAIL: 'email',
    OFFLINE: 'offline',
    OTHER: 'other',
  } as const,

  // Source Confidence
  CONFIDENCE: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    UNKNOWN: 'unknown',
  } as const,

  // Source Validity
  VALIDITY: {
    VALID: 'valid',
    SUSPICIOUS: 'suspicious',
    INVALID: 'invalid',
    FRAUDULENT: 'fraudulent',
  } as const,
} as const;

// Analytics Source Types
export type AnalyticsSourceType =
  (typeof ANALYTICS_SOURCE.SOURCES)[keyof typeof ANALYTICS_SOURCE.SOURCES];

// Analytics Source Categories
export type AnalyticsSourceCategory =
  (typeof ANALYTICS_SOURCE.CATEGORIES)[keyof typeof ANALYTICS_SOURCE.CATEGORIES];

// Analytics Source Sub-categories
export type AnalyticsSourceSubCategory =
  (typeof ANALYTICS_SOURCE.SUB_CATEGORIES)[keyof typeof ANALYTICS_SOURCE.SUB_CATEGORIES];

// Analytics Source Type
export type AnalyticsSourceTypeEnum =
  (typeof ANALYTICS_SOURCE.TYPES)[keyof typeof ANALYTICS_SOURCE.TYPES];

// Analytics Source Confidence
export type AnalyticsSourceConfidence =
  (typeof ANALYTICS_SOURCE.CONFIDENCE)[keyof typeof ANALYTICS_SOURCE.CONFIDENCE];

// Analytics Source Validity
export type AnalyticsSourceValidity =
  (typeof ANALYTICS_SOURCE.VALIDITY)[keyof typeof ANALYTICS_SOURCE.VALIDITY];

// Analytics Source Labels
export function getAnalyticsSourceLabel(source: AnalyticsSourceType): string {
  const labels: Record<AnalyticsSourceType, string> = {
    [ANALYTICS_SOURCE.SOURCES.ORGANIC]: 'Organic',
    [ANALYTICS_SOURCE.SOURCES.ORGANIC_SEARCH]: 'Organic Search',
    [ANALYTICS_SOURCE.SOURCES.ORGANIC_SOCIAL]: 'Organic Social',
    [ANALYTICS_SOURCE.SOURCES.PAID]: 'Paid',
    [ANALYTICS_SOURCE.SOURCES.PAID_SEARCH]: 'Paid Search',
    [ANALYTICS_SOURCE.SOURCES.PAID_SOCIAL]: 'Paid Social',
    [ANALYTICS_SOURCE.SOURCES.DISPLAY]: 'Display',
    [ANALYTICS_SOURCE.SOURCES.VIDEO]: 'Video',
    [ANALYTICS_SOURCE.SOURCES.NATIVE]: 'Native',
    [ANALYTICS_SOURCE.SOURCES.DIRECT]: 'Direct',
    [ANALYTICS_SOURCE.SOURCES.BOOKMARK]: 'Bookmark',
    [ANALYTICS_SOURCE.SOURCES.TYPED]: 'Typed',
    [ANALYTICS_SOURCE.SOURCES.REFERRAL]: 'Referral',
    [ANALYTICS_SOURCE.SOURCES.BACKLINK]: 'Backlink',
    [ANALYTICS_SOURCE.SOURCES.AFFILIATE]: 'Affiliate',
    [ANALYTICS_SOURCE.SOURCES.FACEBOOK]: 'Facebook',
    [ANALYTICS_SOURCE.SOURCES.INSTAGRAM]: 'Instagram',
    [ANALYTICS_SOURCE.SOURCES.TWITTER]: 'Twitter',
    [ANALYTICS_SOURCE.SOURCES.LINKEDIN]: 'LinkedIn',
    [ANALYTICS_SOURCE.SOURCES.YOUTUBE]: 'YouTube',
    [ANALYTICS_SOURCE.SOURCES.TIKTOK]: 'TikTok',
    [ANALYTICS_SOURCE.SOURCES.SNAPCHAT]: 'Snapchat',
    [ANALYTICS_SOURCE.SOURCES.PINTEREST]: 'Pinterest',
    [ANALYTICS_SOURCE.SOURCES.REDDIT]: 'Reddit',
    [ANALYTICS_SOURCE.SOURCES.QUORA]: 'Quora',
    [ANALYTICS_SOURCE.SOURCES.EMAIL]: 'Email',
    [ANALYTICS_SOURCE.SOURCES.NEWSLETTER]: 'Newsletter',
    [ANALYTICS_SOURCE.SOURCES.PROMOTIONAL]: 'Promotional',
    [ANALYTICS_SOURCE.SOURCES.GOOGLE]: 'Google',
    [ANALYTICS_SOURCE.SOURCES.BING]: 'Bing',
    [ANALYTICS_SOURCE.SOURCES.YAHOO]: 'Yahoo',
    [ANALYTICS_SOURCE.SOURCES.BAIDU]: 'Baidu',
    [ANALYTICS_SOURCE.SOURCES.YANDEX]: 'Yandex',
    [ANALYTICS_SOURCE.SOURCES.OTHER]: 'Other',
    [ANALYTICS_SOURCE.SOURCES.UNKNOWN]: 'Unknown',
    [ANALYTICS_SOURCE.SOURCES.OFFLINE]: 'Offline',
    [ANALYTICS_SOURCE.SOURCES.INFLUENCER]: 'Influencer',
    [ANALYTICS_SOURCE.SOURCES.CONTENT]: 'Content',
    [ANALYTICS_SOURCE.SOURCES.PR]: 'PR',
  };
  return labels[source] || 'Unknown';
}

// Analytics Source Category Labels
export function getAnalyticsSourceCategoryLabel(category: AnalyticsSourceCategory): string {
  const labels: Record<AnalyticsSourceCategory, string> = {
    [ANALYTICS_SOURCE.CATEGORIES.ORGANIC]: 'Organic',
    [ANALYTICS_SOURCE.CATEGORIES.PAID]: 'Paid',
    [ANALYTICS_SOURCE.CATEGORIES.DIRECT]: 'Direct',
    [ANALYTICS_SOURCE.CATEGORIES.REFERRAL]: 'Referral',
    [ANALYTICS_SOURCE.CATEGORIES.SOCIAL]: 'Social',
    [ANALYTICS_SOURCE.CATEGORIES.EMAIL]: 'Email',
    [ANALYTICS_SOURCE.CATEGORIES.SEARCH]: 'Search',
    [ANALYTICS_SOURCE.CATEGORIES.OTHER]: 'Other',
  };
  return labels[category] || 'Unknown';
}

// Analytics Source Confidence Labels
export function getAnalyticsSourceConfidenceLabel(confidence: AnalyticsSourceConfidence): string {
  const labels: Record<AnalyticsSourceConfidence, string> = {
    [ANALYTICS_SOURCE.CONFIDENCE.HIGH]: 'High',
    [ANALYTICS_SOURCE.CONFIDENCE.MEDIUM]: 'Medium',
    [ANALYTICS_SOURCE.CONFIDENCE.LOW]: 'Low',
    [ANALYTICS_SOURCE.CONFIDENCE.UNKNOWN]: 'Unknown',
  };
  return labels[confidence] || 'Unknown';
}

// Analytics Source Validity Labels
export function getAnalyticsSourceValidityLabel(validity: AnalyticsSourceValidity): string {
  const labels: Record<AnalyticsSourceValidity, string> = {
    [ANALYTICS_SOURCE.VALIDITY.VALID]: 'Valid',
    [ANALYTICS_SOURCE.VALIDITY.SUSPICIOUS]: 'Suspicious',
    [ANALYTICS_SOURCE.VALIDITY.INVALID]: 'Invalid',
    [ANALYTICS_SOURCE.VALIDITY.FRAUDULENT]: 'Fraudulent',
  };
  return labels[validity] || 'Unknown';
}

// Check if source is social media
export function isAnalyticsSocialMedia(source: AnalyticsSourceType): boolean {
  const socialSources: AnalyticsSourceType[] = [
    ANALYTICS_SOURCE.SOURCES.FACEBOOK,
    ANALYTICS_SOURCE.SOURCES.INSTAGRAM,
    ANALYTICS_SOURCE.SOURCES.TWITTER,
    ANALYTICS_SOURCE.SOURCES.LINKEDIN,
    ANALYTICS_SOURCE.SOURCES.YOUTUBE,
    ANALYTICS_SOURCE.SOURCES.TIKTOK,
    ANALYTICS_SOURCE.SOURCES.SNAPCHAT,
    ANALYTICS_SOURCE.SOURCES.PINTEREST,
    ANALYTICS_SOURCE.SOURCES.REDDIT,
    ANALYTICS_SOURCE.SOURCES.QUORA,
  ];
  return socialSources.includes(source);
}

// Check if source is a search engine
export function isAnalyticsSearchEngine(source: AnalyticsSourceType): boolean {
  const searchEngines: AnalyticsSourceType[] = [
    ANALYTICS_SOURCE.SOURCES.GOOGLE,
    ANALYTICS_SOURCE.SOURCES.BING,
    ANALYTICS_SOURCE.SOURCES.YAHOO,
    ANALYTICS_SOURCE.SOURCES.BAIDU,
    ANALYTICS_SOURCE.SOURCES.YANDEX,
  ];
  return searchEngines.includes(source);
}

// Check if source is organic
export function isAnalyticsOrganic(source: AnalyticsSourceType): boolean {
  const organicSources: AnalyticsSourceType[] = [
    ANALYTICS_SOURCE.SOURCES.ORGANIC,
    ANALYTICS_SOURCE.SOURCES.ORGANIC_SEARCH,
    ANALYTICS_SOURCE.SOURCES.ORGANIC_SOCIAL,
  ];
  return organicSources.includes(source);
}

// Check if source is paid
export function isAnalyticsPaid(source: AnalyticsSourceType): boolean {
  const paidSources: AnalyticsSourceType[] = [
    ANALYTICS_SOURCE.SOURCES.PAID,
    ANALYTICS_SOURCE.SOURCES.PAID_SEARCH,
    ANALYTICS_SOURCE.SOURCES.PAID_SOCIAL,
    ANALYTICS_SOURCE.SOURCES.DISPLAY,
    ANALYTICS_SOURCE.SOURCES.VIDEO,
    ANALYTICS_SOURCE.SOURCES.NATIVE,
  ];
  return paidSources.includes(source);
}

// Get source category
export function getAnalyticsSourceCategory(source: AnalyticsSourceType): AnalyticsSourceCategory {
  if (isAnalyticsOrganic(source)) return ANALYTICS_SOURCE.CATEGORIES.ORGANIC;
  if (isAnalyticsPaid(source)) return ANALYTICS_SOURCE.CATEGORIES.PAID;
  if (isAnalyticsSocialMedia(source)) return ANALYTICS_SOURCE.CATEGORIES.SOCIAL;
  if (isAnalyticsSearchEngine(source)) return ANALYTICS_SOURCE.CATEGORIES.SEARCH;

  if (source === ANALYTICS_SOURCE.SOURCES.DIRECT) return ANALYTICS_SOURCE.CATEGORIES.DIRECT;
  if (source === ANALYTICS_SOURCE.SOURCES.REFERRAL) return ANALYTICS_SOURCE.CATEGORIES.REFERRAL;
  if (source === ANALYTICS_SOURCE.SOURCES.EMAIL) return ANALYTICS_SOURCE.CATEGORIES.EMAIL;

  return ANALYTICS_SOURCE.CATEGORIES.OTHER;
}
