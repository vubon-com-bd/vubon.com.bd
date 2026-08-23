/**
 * Analytics Medium Constants
 * Marketing mediums and channels
 */

export const ANALYTICS_MEDIUM = {
  // Marketing Mediums
  MEDIUMS: {
    // Organic Mediums
    ORGANIC: 'organic',
    SEO: 'seo',
    CONTENT: 'content',

    // Paid Mediums
    CPC: 'cpc',
    PPC: 'ppc',
    CPM: 'cpm',
    CPA: 'cpa',
    CPL: 'cpl',
    CPS: 'cps',

    // Social Mediums
    SOCIAL: 'social',
    SOCIAL_ORGANIC: 'social_organic',
    SOCIAL_PAID: 'social_paid',

    // Email Mediums
    EMAIL: 'email',
    NEWSLETTER: 'newsletter',
    PROMOTIONAL: 'promotional',
    TRANSACTIONAL: 'transactional',

    // Referral Mediums
    REFERRAL: 'referral',
    AFFILIATE: 'affiliate',
    INFLUENCER: 'influencer',

    // Display Mediums
    DISPLAY: 'display',
    BANNER: 'banner',
    NATIVE: 'native',

    // Video Mediums
    VIDEO: 'video',
    YOUTUBE: 'youtube',
    VIMEO: 'vimeo',

    // Other Mediums
    DIRECT: 'direct',
    OFFLINE: 'offline',
    PR: 'pr',
    WEBINAR: 'webinar',
    EVENT: 'event',
    UNKNOWN: 'unknown',
  } as const,

  // Medium Categories
  CATEGORIES: {
    ORGANIC: 'organic',
    PAID: 'paid',
    SOCIAL: 'social',
    EMAIL: 'email',
    REFERRAL: 'referral',
    DISPLAY: 'display',
    VIDEO: 'video',
    OTHER: 'other',
  } as const,

  // Medium Types
  TYPES: {
    ACQUISITION: 'acquisition',
    RETENTION: 'retention',
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
  } as const,

  // Medium Channels
  CHANNELS: {
    SEARCH: 'search',
    SOCIAL: 'social',
    EMAIL: 'email',
    DISPLAY: 'display',
    VIDEO: 'video',
    REFERRAL: 'referral',
    DIRECT: 'direct',
    OTHER: 'other',
  } as const,

  // Medium Priority
  PRIORITY: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,
} as const;

// Analytics Medium Types
export type AnalyticsMediumType =
  (typeof ANALYTICS_MEDIUM.MEDIUMS)[keyof typeof ANALYTICS_MEDIUM.MEDIUMS];

// Analytics Medium Categories
export type AnalyticsMediumCategory =
  (typeof ANALYTICS_MEDIUM.CATEGORIES)[keyof typeof ANALYTICS_MEDIUM.CATEGORIES];

// Analytics Medium Types Enum
export type AnalyticsMediumTypeEnum =
  (typeof ANALYTICS_MEDIUM.TYPES)[keyof typeof ANALYTICS_MEDIUM.TYPES];

// Analytics Medium Channels
export type AnalyticsMediumChannel =
  (typeof ANALYTICS_MEDIUM.CHANNELS)[keyof typeof ANALYTICS_MEDIUM.CHANNELS];

// Analytics Medium Priority
export type AnalyticsMediumPriority =
  (typeof ANALYTICS_MEDIUM.PRIORITY)[keyof typeof ANALYTICS_MEDIUM.PRIORITY];

// Analytics Medium Labels
export function getAnalyticsMediumLabel(medium: AnalyticsMediumType): string {
  const labels: Record<AnalyticsMediumType, string> = {
    [ANALYTICS_MEDIUM.MEDIUMS.ORGANIC]: 'Organic',
    [ANALYTICS_MEDIUM.MEDIUMS.SEO]: 'SEO',
    [ANALYTICS_MEDIUM.MEDIUMS.CONTENT]: 'Content',
    [ANALYTICS_MEDIUM.MEDIUMS.CPC]: 'CPC',
    [ANALYTICS_MEDIUM.MEDIUMS.PPC]: 'PPC',
    [ANALYTICS_MEDIUM.MEDIUMS.CPM]: 'CPM',
    [ANALYTICS_MEDIUM.MEDIUMS.CPA]: 'CPA',
    [ANALYTICS_MEDIUM.MEDIUMS.CPL]: 'CPL',
    [ANALYTICS_MEDIUM.MEDIUMS.CPS]: 'CPS',
    [ANALYTICS_MEDIUM.MEDIUMS.SOCIAL]: 'Social',
    [ANALYTICS_MEDIUM.MEDIUMS.SOCIAL_ORGANIC]: 'Social Organic',
    [ANALYTICS_MEDIUM.MEDIUMS.SOCIAL_PAID]: 'Social Paid',
    [ANALYTICS_MEDIUM.MEDIUMS.EMAIL]: 'Email',
    [ANALYTICS_MEDIUM.MEDIUMS.NEWSLETTER]: 'Newsletter',
    [ANALYTICS_MEDIUM.MEDIUMS.PROMOTIONAL]: 'Promotional',
    [ANALYTICS_MEDIUM.MEDIUMS.TRANSACTIONAL]: 'Transactional',
    [ANALYTICS_MEDIUM.MEDIUMS.REFERRAL]: 'Referral',
    [ANALYTICS_MEDIUM.MEDIUMS.AFFILIATE]: 'Affiliate',
    [ANALYTICS_MEDIUM.MEDIUMS.INFLUENCER]: 'Influencer',
    [ANALYTICS_MEDIUM.MEDIUMS.DISPLAY]: 'Display',
    [ANALYTICS_MEDIUM.MEDIUMS.BANNER]: 'Banner',
    [ANALYTICS_MEDIUM.MEDIUMS.NATIVE]: 'Native',
    [ANALYTICS_MEDIUM.MEDIUMS.VIDEO]: 'Video',
    [ANALYTICS_MEDIUM.MEDIUMS.YOUTUBE]: 'YouTube',
    [ANALYTICS_MEDIUM.MEDIUMS.VIMEO]: 'Vimeo',
    [ANALYTICS_MEDIUM.MEDIUMS.DIRECT]: 'Direct',
    [ANALYTICS_MEDIUM.MEDIUMS.OFFLINE]: 'Offline',
    [ANALYTICS_MEDIUM.MEDIUMS.PR]: 'PR',
    [ANALYTICS_MEDIUM.MEDIUMS.WEBINAR]: 'Webinar',
    [ANALYTICS_MEDIUM.MEDIUMS.EVENT]: 'Event',
    [ANALYTICS_MEDIUM.MEDIUMS.UNKNOWN]: 'Unknown',
  };
  return labels[medium] || 'Unknown';
}

// Analytics Medium Category Labels
export function getAnalyticsMediumCategoryLabel(category: AnalyticsMediumCategory): string {
  const labels: Record<AnalyticsMediumCategory, string> = {
    [ANALYTICS_MEDIUM.CATEGORIES.ORGANIC]: 'Organic',
    [ANALYTICS_MEDIUM.CATEGORIES.PAID]: 'Paid',
    [ANALYTICS_MEDIUM.CATEGORIES.SOCIAL]: 'Social',
    [ANALYTICS_MEDIUM.CATEGORIES.EMAIL]: 'Email',
    [ANALYTICS_MEDIUM.CATEGORIES.REFERRAL]: 'Referral',
    [ANALYTICS_MEDIUM.CATEGORIES.DISPLAY]: 'Display',
    [ANALYTICS_MEDIUM.CATEGORIES.VIDEO]: 'Video',
    [ANALYTICS_MEDIUM.CATEGORIES.OTHER]: 'Other',
  };
  return labels[category] || 'Unknown';
}

// Analytics Medium Type Labels
export function getAnalyticsMediumTypeLabel(type: AnalyticsMediumTypeEnum): string {
  const labels: Record<AnalyticsMediumTypeEnum, string> = {
    [ANALYTICS_MEDIUM.TYPES.ACQUISITION]: 'Acquisition',
    [ANALYTICS_MEDIUM.TYPES.RETENTION]: 'Retention',
    [ANALYTICS_MEDIUM.TYPES.ENGAGEMENT]: 'Engagement',
    [ANALYTICS_MEDIUM.TYPES.CONVERSION]: 'Conversion',
  };
  return labels[type] || 'Unknown';
}

// Analytics Medium Channel Labels
export function getAnalyticsMediumChannelLabel(channel: AnalyticsMediumChannel): string {
  const labels: Record<AnalyticsMediumChannel, string> = {
    [ANALYTICS_MEDIUM.CHANNELS.SEARCH]: 'Search',
    [ANALYTICS_MEDIUM.CHANNELS.SOCIAL]: 'Social',
    [ANALYTICS_MEDIUM.CHANNELS.EMAIL]: 'Email',
    [ANALYTICS_MEDIUM.CHANNELS.DISPLAY]: 'Display',
    [ANALYTICS_MEDIUM.CHANNELS.VIDEO]: 'Video',
    [ANALYTICS_MEDIUM.CHANNELS.REFERRAL]: 'Referral',
    [ANALYTICS_MEDIUM.CHANNELS.DIRECT]: 'Direct',
    [ANALYTICS_MEDIUM.CHANNELS.OTHER]: 'Other',
  };
  return labels[channel] || 'Unknown';
}

// Analytics Medium Priority Labels
export function getAnalyticsMediumPriorityLabel(priority: AnalyticsMediumPriority): string {
  const labels: Record<AnalyticsMediumPriority, string> = {
    [ANALYTICS_MEDIUM.PRIORITY.HIGH]: 'High',
    [ANALYTICS_MEDIUM.PRIORITY.MEDIUM]: 'Medium',
    [ANALYTICS_MEDIUM.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

// Check if medium is organic
export function isAnalyticsMediumOrganic(medium: AnalyticsMediumType): boolean {
  const organicMediums: AnalyticsMediumType[] = [
    ANALYTICS_MEDIUM.MEDIUMS.ORGANIC,
    ANALYTICS_MEDIUM.MEDIUMS.SEO,
    ANALYTICS_MEDIUM.MEDIUMS.CONTENT,
    ANALYTICS_MEDIUM.MEDIUMS.SOCIAL_ORGANIC,
  ];
  return organicMediums.includes(medium);
}

// Check if medium is paid
export function isAnalyticsMediumPaid(medium: AnalyticsMediumType): boolean {
  const paidMediums: AnalyticsMediumType[] = [
    ANALYTICS_MEDIUM.MEDIUMS.CPC,
    ANALYTICS_MEDIUM.MEDIUMS.PPC,
    ANALYTICS_MEDIUM.MEDIUMS.CPM,
    ANALYTICS_MEDIUM.MEDIUMS.CPA,
    ANALYTICS_MEDIUM.MEDIUMS.CPL,
    ANALYTICS_MEDIUM.MEDIUMS.CPS,
    ANALYTICS_MEDIUM.MEDIUMS.SOCIAL_PAID,
  ];
  return paidMediums.includes(medium);
}

// Check if medium is social
export function isAnalyticsMediumSocial(medium: AnalyticsMediumType): boolean {
  const socialMediums: AnalyticsMediumType[] = [
    ANALYTICS_MEDIUM.MEDIUMS.SOCIAL,
    ANALYTICS_MEDIUM.MEDIUMS.SOCIAL_ORGANIC,
    ANALYTICS_MEDIUM.MEDIUMS.SOCIAL_PAID,
  ];
  return socialMediums.includes(medium);
}

// Check if medium is email
export function isAnalyticsMediumEmail(medium: AnalyticsMediumType): boolean {
  const emailMediums: AnalyticsMediumType[] = [
    ANALYTICS_MEDIUM.MEDIUMS.EMAIL,
    ANALYTICS_MEDIUM.MEDIUMS.NEWSLETTER,
    ANALYTICS_MEDIUM.MEDIUMS.PROMOTIONAL,
    ANALYTICS_MEDIUM.MEDIUMS.TRANSACTIONAL,
  ];
  return emailMediums.includes(medium);
}

// Get medium category
export function getAnalyticsMediumCategory(medium: AnalyticsMediumType): AnalyticsMediumCategory {
  if (isAnalyticsMediumOrganic(medium)) return ANALYTICS_MEDIUM.CATEGORIES.ORGANIC;
  if (isAnalyticsMediumPaid(medium)) return ANALYTICS_MEDIUM.CATEGORIES.PAID;
  if (isAnalyticsMediumSocial(medium)) return ANALYTICS_MEDIUM.CATEGORIES.SOCIAL;
  if (isAnalyticsMediumEmail(medium)) return ANALYTICS_MEDIUM.CATEGORIES.EMAIL;

  if (
    medium === ANALYTICS_MEDIUM.MEDIUMS.REFERRAL ||
    medium === ANALYTICS_MEDIUM.MEDIUMS.AFFILIATE ||
    medium === ANALYTICS_MEDIUM.MEDIUMS.INFLUENCER
  ) {
    return ANALYTICS_MEDIUM.CATEGORIES.REFERRAL;
  }

  if (
    medium === ANALYTICS_MEDIUM.MEDIUMS.DISPLAY ||
    medium === ANALYTICS_MEDIUM.MEDIUMS.BANNER ||
    medium === ANALYTICS_MEDIUM.MEDIUMS.NATIVE
  ) {
    return ANALYTICS_MEDIUM.CATEGORIES.DISPLAY;
  }

  if (
    medium === ANALYTICS_MEDIUM.MEDIUMS.VIDEO ||
    medium === ANALYTICS_MEDIUM.MEDIUMS.YOUTUBE ||
    medium === ANALYTICS_MEDIUM.MEDIUMS.VIMEO
  ) {
    return ANALYTICS_MEDIUM.CATEGORIES.VIDEO;
  }

  return ANALYTICS_MEDIUM.CATEGORIES.OTHER;
}

// Get channel from medium
export function getAnalyticsChannelFromMedium(medium: AnalyticsMediumType): AnalyticsMediumChannel {
  const category = getAnalyticsMediumCategory(medium);

  switch (category) {
    case ANALYTICS_MEDIUM.CATEGORIES.ORGANIC:
      return ANALYTICS_MEDIUM.CHANNELS.SEARCH;
    case ANALYTICS_MEDIUM.CATEGORIES.PAID:
      return ANALYTICS_MEDIUM.CHANNELS.SEARCH;
    case ANALYTICS_MEDIUM.CATEGORIES.SOCIAL:
      return ANALYTICS_MEDIUM.CHANNELS.SOCIAL;
    case ANALYTICS_MEDIUM.CATEGORIES.EMAIL:
      return ANALYTICS_MEDIUM.CHANNELS.EMAIL;
    case ANALYTICS_MEDIUM.CATEGORIES.REFERRAL:
      return ANALYTICS_MEDIUM.CHANNELS.REFERRAL;
    case ANALYTICS_MEDIUM.CATEGORIES.DISPLAY:
      return ANALYTICS_MEDIUM.CHANNELS.DISPLAY;
    case ANALYTICS_MEDIUM.CATEGORIES.VIDEO:
      return ANALYTICS_MEDIUM.CHANNELS.VIDEO;
    default:
      return ANALYTICS_MEDIUM.CHANNELS.OTHER;
  }
}
