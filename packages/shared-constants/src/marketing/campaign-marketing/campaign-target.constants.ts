/**
 * Campaign Target Constants
 * Targeting configurations for marketing campaigns
 */

export const MARKETINGCAMPAIGN_TARGET = {
  // Target Audiences
  AUDIENCES: {
    ALL: 'all',
    NEW_CUSTOMERS: 'new_customers',
    RETURNING_CUSTOMERS: 'returning_customers',
    HIGH_VALUE: 'high_value',
    MEDIUM_VALUE: 'medium_value',
    LOW_VALUE: 'low_value',
    INACTIVE: 'inactive',
    ACTIVE: 'active',
    LOYAL: 'loyal',
    AT_RISK: 'at_risk',
    LOOKALIKE: 'lookalike',
    CUSTOM: 'custom',
  } as const,

  // Demographics
  DEMOGRAPHICS: {
    AGE_18_24: 'age_18_24',
    AGE_25_34: 'age_25_34',
    AGE_35_44: 'age_35_44',
    AGE_45_54: 'age_45_54',
    AGE_55_64: 'age_55_64',
    AGE_65_PLUS: 'age_65_plus',
    MALE: 'male',
    FEMALE: 'female',
    NON_BINARY: 'non_binary',
    ALL_GENDERS: 'all_genders',
  } as const,

  // Geographic Targeting
  GEOGRAPHY: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    COUNTRY: 'country',
    STATE: 'state',
    CITY: 'city',
    ZIP_CODE: 'zip_code',
    RADIUS: 'radius',
    CONTINENT: 'continent',
    TIMEZONE: 'timezone',
    LANGUAGE: 'language',
  } as const,

  // Behavioral Targeting
  BEHAVIORS: {
    PURCHASE_HISTORY: 'purchase_history',
    BROWSING_HISTORY: 'browsing_history',
    SEARCH_HISTORY: 'search_history',
    CART_ABANDONMENT: 'cart_abandonment',
    PRODUCT_VIEWS: 'product_views',
    CATEGORY_PREFERENCE: 'category_preference',
    BRAND_PREFERENCE: 'brand_preference',
    PRICE_SENSITIVITY: 'price_sensitivity',
    LOYALTY_LEVEL: 'loyalty_level',
    ENGAGEMENT_SCORE: 'engagement_score',
    RECENCY: 'recency',
    FREQUENCY: 'frequency',
    MONETARY: 'monetary',
  } as const,

  // Psychographic Targeting
  PSYCHOGRAPHICS: {
    INTERESTS: 'interests',
    HOBBIES: 'hobbies',
    VALUES: 'values',
    LIFESTYLE: 'lifestyle',
    PERSONALITY: 'personality',
    OPINIONS: 'opinions',
    ATTITUDES: 'attitudes',
    BELIEFS: 'beliefs',
  } as const,

  // Device Targeting
  DEVICES: {
    DESKTOP: 'desktop',
    MOBILE: 'mobile',
    TABLET: 'tablet',
    SMARTPHONE: 'smartphone',
    SMART_TV: 'smart_tv',
    GAMING_CONSOLE: 'gaming_console',
    WEARABLE: 'wearable',
    ALL: 'all',
  } as const,

  // OS Platforms
  OS: {
    WINDOWS: 'windows',
    MACOS: 'macos',
    LINUX: 'linux',
    IOS: 'ios',
    ANDROID: 'android',
    WEB: 'web',
    ALL: 'all',
  } as const,

  // Target Exclusions
  EXCLUSIONS: {
    EXISTING_CUSTOMERS: 'existing_customers',
    RECENT_PURCHASERS: 'recent_purchasers',
    COMPETITOR_CUSTOMERS: 'competitor_customers',
    BOUNCED_EMAILS: 'bounced_emails',
    UNSUBSCRIBED: 'unsubscribed',
    SPAM_REPORTERS: 'spam_reporters',
    FRAUDULENT: 'fraudulent',
  } as const,

  // Target Defaults
  DEFAULTS: {
    DEFAULT_AUDIENCE: 'all',
    MAX_TARGET_GROUPS: 10,
    MIN_RADIUS_KM: 1,
    MAX_RADIUS_KM: 500,
    DEFAULT_RADIUS_KM: 50,
    MIN_AGE: 18,
    MAX_AGE: 100,
    DEFAULT_FREQUENCY_CAP: 3,
    DEFAULT_IMPRESSION_CAP: 10,
  } as const,
} as const;

// Target Audiences
export type MarketingCampaignTargetAudience =
  (typeof MARKETINGCAMPAIGN_TARGET.AUDIENCES)[keyof typeof MARKETINGCAMPAIGN_TARGET.AUDIENCES];

// Demographics
export type MarketingCampaignDemographic =
  (typeof MARKETINGCAMPAIGN_TARGET.DEMOGRAPHICS)[keyof typeof MARKETINGCAMPAIGN_TARGET.DEMOGRAPHICS];

// Geographic Targeting
export type MarketingCampaignGeography =
  (typeof MARKETINGCAMPAIGN_TARGET.GEOGRAPHY)[keyof typeof MARKETINGCAMPAIGN_TARGET.GEOGRAPHY];

// Behavioral Targeting
export type MarketingCampaignBehavior =
  (typeof MARKETINGCAMPAIGN_TARGET.BEHAVIORS)[keyof typeof MARKETINGCAMPAIGN_TARGET.BEHAVIORS];

// Psychographic Targeting
export type MarketingCampaignPsychographic =
  (typeof MARKETINGCAMPAIGN_TARGET.PSYCHOGRAPHICS)[keyof typeof MARKETINGCAMPAIGN_TARGET.PSYCHOGRAPHICS];

// Device Targeting
export type MarketingCampaignDevice =
  (typeof MARKETINGCAMPAIGN_TARGET.DEVICES)[keyof typeof MARKETINGCAMPAIGN_TARGET.DEVICES];

// OS Platforms
export type MarketingCampaignOS =
  (typeof MARKETINGCAMPAIGN_TARGET.OS)[keyof typeof MARKETINGCAMPAIGN_TARGET.OS];

// Target Exclusions
export type MarketingCampaignExclusion =
  (typeof MARKETINGCAMPAIGN_TARGET.EXCLUSIONS)[keyof typeof MARKETINGCAMPAIGN_TARGET.EXCLUSIONS];

// Target Defaults
export type MarketingCampaignTargetDefault =
  (typeof MARKETINGCAMPAIGN_TARGET.DEFAULTS)[keyof typeof MARKETINGCAMPAIGN_TARGET.DEFAULTS];

// Utility Functions
export function marketingcampaignGetAudienceLabel(
  audience: MarketingCampaignTargetAudience
): string {
  const labels: Record<MarketingCampaignTargetAudience, string> = {
    [MARKETINGCAMPAIGN_TARGET.AUDIENCES.ALL]: 'All Customers',
    [MARKETINGCAMPAIGN_TARGET.AUDIENCES.NEW_CUSTOMERS]: 'New Customers',
    [MARKETINGCAMPAIGN_TARGET.AUDIENCES.RETURNING_CUSTOMERS]: 'Returning Customers',
    [MARKETINGCAMPAIGN_TARGET.AUDIENCES.HIGH_VALUE]: 'High Value',
    [MARKETINGCAMPAIGN_TARGET.AUDIENCES.MEDIUM_VALUE]: 'Medium Value',
    [MARKETINGCAMPAIGN_TARGET.AUDIENCES.LOW_VALUE]: 'Low Value',
    [MARKETINGCAMPAIGN_TARGET.AUDIENCES.INACTIVE]: 'Inactive',
    [MARKETINGCAMPAIGN_TARGET.AUDIENCES.ACTIVE]: 'Active',
    [MARKETINGCAMPAIGN_TARGET.AUDIENCES.LOYAL]: 'Loyal',
    [MARKETINGCAMPAIGN_TARGET.AUDIENCES.AT_RISK]: 'At Risk',
    [MARKETINGCAMPAIGN_TARGET.AUDIENCES.LOOKALIKE]: 'Lookalike Audience',
    [MARKETINGCAMPAIGN_TARGET.AUDIENCES.CUSTOM]: 'Custom Audience',
  };
  return labels[audience] || 'Unknown Audience';
}

export function marketingcampaignGetDemographicLabel(
  demographic: MarketingCampaignDemographic
): string {
  const labels: Record<MarketingCampaignDemographic, string> = {
    [MARKETINGCAMPAIGN_TARGET.DEMOGRAPHICS.AGE_18_24]: '18-24 Years',
    [MARKETINGCAMPAIGN_TARGET.DEMOGRAPHICS.AGE_25_34]: '25-34 Years',
    [MARKETINGCAMPAIGN_TARGET.DEMOGRAPHICS.AGE_35_44]: '35-44 Years',
    [MARKETINGCAMPAIGN_TARGET.DEMOGRAPHICS.AGE_45_54]: '45-54 Years',
    [MARKETINGCAMPAIGN_TARGET.DEMOGRAPHICS.AGE_55_64]: '55-64 Years',
    [MARKETINGCAMPAIGN_TARGET.DEMOGRAPHICS.AGE_65_PLUS]: '65+ Years',
    [MARKETINGCAMPAIGN_TARGET.DEMOGRAPHICS.MALE]: 'Male',
    [MARKETINGCAMPAIGN_TARGET.DEMOGRAPHICS.FEMALE]: 'Female',
    [MARKETINGCAMPAIGN_TARGET.DEMOGRAPHICS.NON_BINARY]: 'Non-Binary',
    [MARKETINGCAMPAIGN_TARGET.DEMOGRAPHICS.ALL_GENDERS]: 'All Genders',
  };
  return labels[demographic] || 'Unknown Demographic';
}

export function marketingcampaignGetGeographyLabel(geography: MarketingCampaignGeography): string {
  const labels: Record<MarketingCampaignGeography, string> = {
    [MARKETINGCAMPAIGN_TARGET.GEOGRAPHY.GLOBAL]: 'Global',
    [MARKETINGCAMPAIGN_TARGET.GEOGRAPHY.REGIONAL]: 'Regional',
    [MARKETINGCAMPAIGN_TARGET.GEOGRAPHY.COUNTRY]: 'Country',
    [MARKETINGCAMPAIGN_TARGET.GEOGRAPHY.STATE]: 'State/Province',
    [MARKETINGCAMPAIGN_TARGET.GEOGRAPHY.CITY]: 'City',
    [MARKETINGCAMPAIGN_TARGET.GEOGRAPHY.ZIP_CODE]: 'ZIP Code',
    [MARKETINGCAMPAIGN_TARGET.GEOGRAPHY.RADIUS]: 'Radius',
    [MARKETINGCAMPAIGN_TARGET.GEOGRAPHY.CONTINENT]: 'Continent',
    [MARKETINGCAMPAIGN_TARGET.GEOGRAPHY.TIMEZONE]: 'Timezone',
    [MARKETINGCAMPAIGN_TARGET.GEOGRAPHY.LANGUAGE]: 'Language',
  };
  return labels[geography] || 'Unknown Geography';
}

export function marketingcampaignGetBehaviorLabel(behavior: MarketingCampaignBehavior): string {
  const labels: Record<MarketingCampaignBehavior, string> = {
    [MARKETINGCAMPAIGN_TARGET.BEHAVIORS.PURCHASE_HISTORY]: 'Purchase History',
    [MARKETINGCAMPAIGN_TARGET.BEHAVIORS.BROWSING_HISTORY]: 'Browsing History',
    [MARKETINGCAMPAIGN_TARGET.BEHAVIORS.SEARCH_HISTORY]: 'Search History',
    [MARKETINGCAMPAIGN_TARGET.BEHAVIORS.CART_ABANDONMENT]: 'Cart Abandonment',
    [MARKETINGCAMPAIGN_TARGET.BEHAVIORS.PRODUCT_VIEWS]: 'Product Views',
    [MARKETINGCAMPAIGN_TARGET.BEHAVIORS.CATEGORY_PREFERENCE]: 'Category Preference',
    [MARKETINGCAMPAIGN_TARGET.BEHAVIORS.BRAND_PREFERENCE]: 'Brand Preference',
    [MARKETINGCAMPAIGN_TARGET.BEHAVIORS.PRICE_SENSITIVITY]: 'Price Sensitivity',
    [MARKETINGCAMPAIGN_TARGET.BEHAVIORS.LOYALTY_LEVEL]: 'Loyalty Level',
    [MARKETINGCAMPAIGN_TARGET.BEHAVIORS.ENGAGEMENT_SCORE]: 'Engagement Score',
    [MARKETINGCAMPAIGN_TARGET.BEHAVIORS.RECENCY]: 'Recency (R)',
    [MARKETINGCAMPAIGN_TARGET.BEHAVIORS.FREQUENCY]: 'Frequency (F)',
    [MARKETINGCAMPAIGN_TARGET.BEHAVIORS.MONETARY]: 'Monetary (M)',
  };
  return labels[behavior] || 'Unknown Behavior';
}

export function marketingcampaignGetPsychographicLabel(
  psychographic: MarketingCampaignPsychographic
): string {
  const labels: Record<MarketingCampaignPsychographic, string> = {
    [MARKETINGCAMPAIGN_TARGET.PSYCHOGRAPHICS.INTERESTS]: 'Interests',
    [MARKETINGCAMPAIGN_TARGET.PSYCHOGRAPHICS.HOBBIES]: 'Hobbies',
    [MARKETINGCAMPAIGN_TARGET.PSYCHOGRAPHICS.VALUES]: 'Values',
    [MARKETINGCAMPAIGN_TARGET.PSYCHOGRAPHICS.LIFESTYLE]: 'Lifestyle',
    [MARKETINGCAMPAIGN_TARGET.PSYCHOGRAPHICS.PERSONALITY]: 'Personality',
    [MARKETINGCAMPAIGN_TARGET.PSYCHOGRAPHICS.OPINIONS]: 'Opinions',
    [MARKETINGCAMPAIGN_TARGET.PSYCHOGRAPHICS.ATTITUDES]: 'Attitudes',
    [MARKETINGCAMPAIGN_TARGET.PSYCHOGRAPHICS.BELIEFS]: 'Beliefs',
  };
  return labels[psychographic] || 'Unknown Psychographic';
}

export function marketingcampaignGetDeviceLabel(device: MarketingCampaignDevice): string {
  const labels: Record<MarketingCampaignDevice, string> = {
    [MARKETINGCAMPAIGN_TARGET.DEVICES.DESKTOP]: 'Desktop',
    [MARKETINGCAMPAIGN_TARGET.DEVICES.MOBILE]: 'Mobile',
    [MARKETINGCAMPAIGN_TARGET.DEVICES.TABLET]: 'Tablet',
    [MARKETINGCAMPAIGN_TARGET.DEVICES.SMARTPHONE]: 'Smartphone',
    [MARKETINGCAMPAIGN_TARGET.DEVICES.SMART_TV]: 'Smart TV',
    [MARKETINGCAMPAIGN_TARGET.DEVICES.GAMING_CONSOLE]: 'Gaming Console',
    [MARKETINGCAMPAIGN_TARGET.DEVICES.WEARABLE]: 'Wearable',
    [MARKETINGCAMPAIGN_TARGET.DEVICES.ALL]: 'All Devices',
  };
  return labels[device] || 'Unknown Device';
}

export function marketingcampaignGetOSLabel(os: MarketingCampaignOS): string {
  const labels: Record<MarketingCampaignOS, string> = {
    [MARKETINGCAMPAIGN_TARGET.OS.WINDOWS]: 'Windows',
    [MARKETINGCAMPAIGN_TARGET.OS.MACOS]: 'macOS',
    [MARKETINGCAMPAIGN_TARGET.OS.LINUX]: 'Linux',
    [MARKETINGCAMPAIGN_TARGET.OS.IOS]: 'iOS',
    [MARKETINGCAMPAIGN_TARGET.OS.ANDROID]: 'Android',
    [MARKETINGCAMPAIGN_TARGET.OS.WEB]: 'Web',
    [MARKETINGCAMPAIGN_TARGET.OS.ALL]: 'All OS',
  };
  return labels[os] || 'Unknown OS';
}

export function marketingcampaignGetExclusionLabel(exclusion: MarketingCampaignExclusion): string {
  const labels: Record<MarketingCampaignExclusion, string> = {
    [MARKETINGCAMPAIGN_TARGET.EXCLUSIONS.EXISTING_CUSTOMERS]: 'Existing Customers',
    [MARKETINGCAMPAIGN_TARGET.EXCLUSIONS.RECENT_PURCHASERS]: 'Recent Purchasers',
    [MARKETINGCAMPAIGN_TARGET.EXCLUSIONS.COMPETITOR_CUSTOMERS]: 'Competitor Customers',
    [MARKETINGCAMPAIGN_TARGET.EXCLUSIONS.BOUNCED_EMAILS]: 'Bounced Emails',
    [MARKETINGCAMPAIGN_TARGET.EXCLUSIONS.UNSUBSCRIBED]: 'Unsubscribed',
    [MARKETINGCAMPAIGN_TARGET.EXCLUSIONS.SPAM_REPORTERS]: 'Spam Reporters',
    [MARKETINGCAMPAIGN_TARGET.EXCLUSIONS.FRAUDULENT]: 'Fraudulent Users',
  };
  return labels[exclusion] || 'Unknown Exclusion';
}

export function marketingcampaignGetDefaultAudience(): MarketingCampaignTargetAudience {
  return MARKETINGCAMPAIGN_TARGET.DEFAULTS.DEFAULT_AUDIENCE;
}

export function marketingcampaignGetMaxTargetGroups(): number {
  return MARKETINGCAMPAIGN_TARGET.DEFAULTS.MAX_TARGET_GROUPS;
}

export function marketingcampaignGetDefaultRadius(): number {
  return MARKETINGCAMPAIGN_TARGET.DEFAULTS.DEFAULT_RADIUS_KM;
}

export function marketingcampaignIsValueSegment(
  audience: MarketingCampaignTargetAudience
): boolean {
  const valueSegments: MarketingCampaignTargetAudience[] = [
    MARKETINGCAMPAIGN_TARGET.AUDIENCES.HIGH_VALUE,
    MARKETINGCAMPAIGN_TARGET.AUDIENCES.MEDIUM_VALUE,
    MARKETINGCAMPAIGN_TARGET.AUDIENCES.LOW_VALUE,
  ];
  return valueSegments.includes(audience);
}

export function marketingcampaignIsBehaviorSegment(
  audience: MarketingCampaignTargetAudience
): boolean {
  const behaviorSegments: MarketingCampaignTargetAudience[] = [
    MARKETINGCAMPAIGN_TARGET.AUDIENCES.ACTIVE,
    MARKETINGCAMPAIGN_TARGET.AUDIENCES.INACTIVE,
    MARKETINGCAMPAIGN_TARGET.AUDIENCES.LOYAL,
    MARKETINGCAMPAIGN_TARGET.AUDIENCES.AT_RISK,
  ];
  return behaviorSegments.includes(audience);
}
