/**
 * Campaign Type Constants
 * Types and classifications of marketing campaigns
 */

export const MARKETINGCAMPAIGN_TYPE = {
  // Campaign Types
  TYPES: {
    BRAND_AWARENESS: 'brand_awareness',
    LEAD_GENERATION: 'lead_generation',
    CONVERSION: 'conversion',
    RETENTION: 'retention',
    REENGAGEMENT: 'reengagement',
    LOYALTY: 'loyalty',
    REFERRAL: 'referral',
    SEASONAL: 'seasonal',
    HOLIDAY: 'holiday',
    PRODUCT_LAUNCH: 'product_launch',
    SERVICE_LAUNCH: 'service_launch',
    PROMOTIONAL: 'promotional',
    EDUCATIONAL: 'educational',
    EVENT: 'event',
    CONTEST: 'contest',
    GIVEAWAY: 'giveaway',
    SURVEY: 'survey',
    FEEDBACK: 'feedback',
    TESTIMONIAL: 'testimonial',
    INFLUENCER: 'influencer',
    PARTNERSHIP: 'partnership',
    CROSS_SELL: 'cross_sell',
    UP_SELL: 'up_sell',
    CUSTOM: 'custom',
  } as const,

  // Sub Types
  SUB_TYPES: {
    EMAIL: 'email',
    SOCIAL: 'social',
    SEARCH: 'search',
    DISPLAY: 'display',
    VIDEO: 'video',
    CONTENT: 'content',
    NATIVE: 'native',
    PROGRAMMATIC: 'programmatic',
    DIRECT: 'direct',
    INDIRECT: 'indirect',
    DIGITAL: 'digital',
    TRADITIONAL: 'traditional',
    OMNICHANNEL: 'omnichannel',
    MULTICHANNEL: 'multichannel',
  } as const,

  // Campaign Categories
  CATEGORIES: {
    ACQUISITION: 'acquisition',
    RETENTION: 'retention',
    GROWTH: 'growth',
    BRANDING: 'branding',
    RELATIONSHIP: 'relationship',
    REVENUE: 'revenue',
    PRODUCT: 'product',
    SERVICE: 'service',
  } as const,

  // Campaign Focus Areas
  FOCUS_AREAS: {
    B2C: 'b2c',
    B2B: 'b2b',
    B2G: 'b2g',
    C2C: 'c2c',
    D2C: 'd2c',
  } as const,

  // Campaign Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
    VERY_COMPLEX: 'very_complex',
  } as const,

  // Campaign Scale
  SCALE: {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    ENTERPRISE: 'enterprise',
  } as const,
} as const;

// Campaign Types
export type MarketingCampaignTypeType =
  (typeof MARKETINGCAMPAIGN_TYPE.TYPES)[keyof typeof MARKETINGCAMPAIGN_TYPE.TYPES];

// Campaign Sub Types
export type MarketingCampaignSubType =
  (typeof MARKETINGCAMPAIGN_TYPE.SUB_TYPES)[keyof typeof MARKETINGCAMPAIGN_TYPE.SUB_TYPES];

// Campaign Categories
export type MarketingCampaignCategory =
  (typeof MARKETINGCAMPAIGN_TYPE.CATEGORIES)[keyof typeof MARKETINGCAMPAIGN_TYPE.CATEGORIES];

// Campaign Focus Areas
export type MarketingCampaignFocusArea =
  (typeof MARKETINGCAMPAIGN_TYPE.FOCUS_AREAS)[keyof typeof MARKETINGCAMPAIGN_TYPE.FOCUS_AREAS];

// Campaign Complexity
export type MarketingCampaignComplexity =
  (typeof MARKETINGCAMPAIGN_TYPE.COMPLEXITY)[keyof typeof MARKETINGCAMPAIGN_TYPE.COMPLEXITY];

// Campaign Scale
export type MarketingCampaignScale =
  (typeof MARKETINGCAMPAIGN_TYPE.SCALE)[keyof typeof MARKETINGCAMPAIGN_TYPE.SCALE];

// Utility Functions
export function marketingcampaignGetTypeLabel(type: MarketingCampaignTypeType): string {
  const labels: Record<MarketingCampaignTypeType, string> = {
    [MARKETINGCAMPAIGN_TYPE.TYPES.BRAND_AWARENESS]: 'Brand Awareness',
    [MARKETINGCAMPAIGN_TYPE.TYPES.LEAD_GENERATION]: 'Lead Generation',
    [MARKETINGCAMPAIGN_TYPE.TYPES.CONVERSION]: 'Conversion',
    [MARKETINGCAMPAIGN_TYPE.TYPES.RETENTION]: 'Retention',
    [MARKETINGCAMPAIGN_TYPE.TYPES.REENGAGEMENT]: 'Re-engagement',
    [MARKETINGCAMPAIGN_TYPE.TYPES.LOYALTY]: 'Loyalty',
    [MARKETINGCAMPAIGN_TYPE.TYPES.REFERRAL]: 'Referral',
    [MARKETINGCAMPAIGN_TYPE.TYPES.SEASONAL]: 'Seasonal',
    [MARKETINGCAMPAIGN_TYPE.TYPES.HOLIDAY]: 'Holiday',
    [MARKETINGCAMPAIGN_TYPE.TYPES.PRODUCT_LAUNCH]: 'Product Launch',
    [MARKETINGCAMPAIGN_TYPE.TYPES.SERVICE_LAUNCH]: 'Service Launch',
    [MARKETINGCAMPAIGN_TYPE.TYPES.PROMOTIONAL]: 'Promotional',
    [MARKETINGCAMPAIGN_TYPE.TYPES.EDUCATIONAL]: 'Educational',
    [MARKETINGCAMPAIGN_TYPE.TYPES.EVENT]: 'Event',
    [MARKETINGCAMPAIGN_TYPE.TYPES.CONTEST]: 'Contest',
    [MARKETINGCAMPAIGN_TYPE.TYPES.GIVEAWAY]: 'Giveaway',
    [MARKETINGCAMPAIGN_TYPE.TYPES.SURVEY]: 'Survey',
    [MARKETINGCAMPAIGN_TYPE.TYPES.FEEDBACK]: 'Feedback',
    [MARKETINGCAMPAIGN_TYPE.TYPES.TESTIMONIAL]: 'Testimonial',
    [MARKETINGCAMPAIGN_TYPE.TYPES.INFLUENCER]: 'Influencer',
    [MARKETINGCAMPAIGN_TYPE.TYPES.PARTNERSHIP]: 'Partnership',
    [MARKETINGCAMPAIGN_TYPE.TYPES.CROSS_SELL]: 'Cross-Sell',
    [MARKETINGCAMPAIGN_TYPE.TYPES.UP_SELL]: 'Up-Sell',
    [MARKETINGCAMPAIGN_TYPE.TYPES.CUSTOM]: 'Custom Campaign',
  };
  return labels[type] || 'Unknown Campaign Type';
}

export function marketingcampaignGetSubTypeLabel(subType: MarketingCampaignSubType): string {
  const labels: Record<MarketingCampaignSubType, string> = {
    [MARKETINGCAMPAIGN_TYPE.SUB_TYPES.EMAIL]: 'Email',
    [MARKETINGCAMPAIGN_TYPE.SUB_TYPES.SOCIAL]: 'Social Media',
    [MARKETINGCAMPAIGN_TYPE.SUB_TYPES.SEARCH]: 'Search Engine',
    [MARKETINGCAMPAIGN_TYPE.SUB_TYPES.DISPLAY]: 'Display Ads',
    [MARKETINGCAMPAIGN_TYPE.SUB_TYPES.VIDEO]: 'Video',
    [MARKETINGCAMPAIGN_TYPE.SUB_TYPES.CONTENT]: 'Content',
    [MARKETINGCAMPAIGN_TYPE.SUB_TYPES.NATIVE]: 'Native Advertising',
    [MARKETINGCAMPAIGN_TYPE.SUB_TYPES.PROGRAMMATIC]: 'Programmatic',
    [MARKETINGCAMPAIGN_TYPE.SUB_TYPES.DIRECT]: 'Direct',
    [MARKETINGCAMPAIGN_TYPE.SUB_TYPES.INDIRECT]: 'Indirect',
    [MARKETINGCAMPAIGN_TYPE.SUB_TYPES.DIGITAL]: 'Digital',
    [MARKETINGCAMPAIGN_TYPE.SUB_TYPES.TRADITIONAL]: 'Traditional',
    [MARKETINGCAMPAIGN_TYPE.SUB_TYPES.OMNICHANNEL]: 'Omnichannel',
    [MARKETINGCAMPAIGN_TYPE.SUB_TYPES.MULTICHANNEL]: 'Multichannel',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function marketingcampaignGetCategoryLabel(category: MarketingCampaignCategory): string {
  const labels: Record<MarketingCampaignCategory, string> = {
    [MARKETINGCAMPAIGN_TYPE.CATEGORIES.ACQUISITION]: 'Acquisition',
    [MARKETINGCAMPAIGN_TYPE.CATEGORIES.RETENTION]: 'Retention',
    [MARKETINGCAMPAIGN_TYPE.CATEGORIES.GROWTH]: 'Growth',
    [MARKETINGCAMPAIGN_TYPE.CATEGORIES.BRANDING]: 'Branding',
    [MARKETINGCAMPAIGN_TYPE.CATEGORIES.RELATIONSHIP]: 'Relationship',
    [MARKETINGCAMPAIGN_TYPE.CATEGORIES.REVENUE]: 'Revenue',
    [MARKETINGCAMPAIGN_TYPE.CATEGORIES.PRODUCT]: 'Product',
    [MARKETINGCAMPAIGN_TYPE.CATEGORIES.SERVICE]: 'Service',
  };
  return labels[category] || 'Unknown Category';
}

export function marketingcampaignGetFocusAreaLabel(focusArea: MarketingCampaignFocusArea): string {
  const labels: Record<MarketingCampaignFocusArea, string> = {
    [MARKETINGCAMPAIGN_TYPE.FOCUS_AREAS.B2C]: 'Business to Consumer',
    [MARKETINGCAMPAIGN_TYPE.FOCUS_AREAS.B2B]: 'Business to Business',
    [MARKETINGCAMPAIGN_TYPE.FOCUS_AREAS.B2G]: 'Business to Government',
    [MARKETINGCAMPAIGN_TYPE.FOCUS_AREAS.C2C]: 'Consumer to Consumer',
    [MARKETINGCAMPAIGN_TYPE.FOCUS_AREAS.D2C]: 'Direct to Consumer',
  };
  return labels[focusArea] || 'Unknown Focus Area';
}

export function marketingcampaignGetComplexityLabel(
  complexity: MarketingCampaignComplexity
): string {
  const labels: Record<MarketingCampaignComplexity, string> = {
    [MARKETINGCAMPAIGN_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [MARKETINGCAMPAIGN_TYPE.COMPLEXITY.MODERATE]: 'Moderate',
    [MARKETINGCAMPAIGN_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [MARKETINGCAMPAIGN_TYPE.COMPLEXITY.VERY_COMPLEX]: 'Very Complex',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function marketingcampaignGetScaleLabel(scale: MarketingCampaignScale): string {
  const labels: Record<MarketingCampaignScale, string> = {
    [MARKETINGCAMPAIGN_TYPE.SCALE.SMALL]: 'Small',
    [MARKETINGCAMPAIGN_TYPE.SCALE.MEDIUM]: 'Medium',
    [MARKETINGCAMPAIGN_TYPE.SCALE.LARGE]: 'Large',
    [MARKETINGCAMPAIGN_TYPE.SCALE.ENTERPRISE]: 'Enterprise',
  };
  return labels[scale] || 'Unknown Scale';
}

export function marketingcampaignIsAcquisitionType(type: MarketingCampaignTypeType): boolean {
  const acquisitionTypes: MarketingCampaignTypeType[] = [
    MARKETINGCAMPAIGN_TYPE.TYPES.LEAD_GENERATION,
    MARKETINGCAMPAIGN_TYPE.TYPES.CONVERSION,
    MARKETINGCAMPAIGN_TYPE.TYPES.REFERRAL,
    MARKETINGCAMPAIGN_TYPE.TYPES.CROSS_SELL,
    MARKETINGCAMPAIGN_TYPE.TYPES.UP_SELL,
  ];
  return acquisitionTypes.includes(type);
}

export function marketingcampaignIsRetentionType(type: MarketingCampaignTypeType): boolean {
  const retentionTypes: MarketingCampaignTypeType[] = [
    MARKETINGCAMPAIGN_TYPE.TYPES.RETENTION,
    MARKETINGCAMPAIGN_TYPE.TYPES.REENGAGEMENT,
    MARKETINGCAMPAIGN_TYPE.TYPES.LOYALTY,
    MARKETINGCAMPAIGN_TYPE.TYPES.SURVEY,
    MARKETINGCAMPAIGN_TYPE.TYPES.FEEDBACK,
  ];
  return retentionTypes.includes(type);
}

export function marketingcampaignIsBrandingType(type: MarketingCampaignTypeType): boolean {
  const brandingTypes: MarketingCampaignTypeType[] = [
    MARKETINGCAMPAIGN_TYPE.TYPES.BRAND_AWARENESS,
    MARKETINGCAMPAIGN_TYPE.TYPES.TESTIMONIAL,
    MARKETINGCAMPAIGN_TYPE.TYPES.INFLUENCER,
    MARKETINGCAMPAIGN_TYPE.TYPES.PARTNERSHIP,
  ];
  return brandingTypes.includes(type);
}
