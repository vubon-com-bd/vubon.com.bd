/**
 * Promotion Target Constants
 * Target configurations for promotions
 */

export const MARKETINGPROMOTION_TARGET = {
  // Target Types
  TYPES: {
    ALL_CUSTOMERS: 'all_customers',
    NEW_CUSTOMERS: 'new_customers',
    RETURNING_CUSTOMERS: 'returning_customers',
    HIGH_VALUE: 'high_value',
    MEDIUM_VALUE: 'medium_value',
    LOW_VALUE: 'low_value',
    INACTIVE: 'inactive',
    ACTIVE: 'active',
    LOYAL: 'loyal',
    VIP: 'vip',
    AT_RISK: 'at_risk',
    LOOKALIKE: 'lookalike',
    CUSTOM: 'custom',
    SEGMENT: 'segment',
    DEMOGRAPHIC: 'demographic',
    BEHAVIORAL: 'behavioral',
    PSYCHOGRAPHIC: 'psychographic',
  } as const,

  // Target Demographics
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
    INCOME_LOW: 'income_low',
    INCOME_MEDIUM: 'income_medium',
    INCOME_HIGH: 'income_high',
    EDUCATION_SCHOOL: 'education_school',
    EDUCATION_COLLEGE: 'education_college',
    EDUCATION_UNIVERSITY: 'education_university',
    EDUCATION_GRADUATE: 'education_graduate',
    EMPLOYMENT_STUDENT: 'employment_student',
    EMPLOYMENT_EMPLOYED: 'employment_employed',
    EMPLOYMENT_SELF_EMPLOYED: 'employment_self_employed',
    EMPLOYMENT_UNEMPLOYED: 'employment_unemployed',
    EMPLOYMENT_RETIRED: 'employment_retired',
  } as const,

  // Target Geography
  GEOGRAPHY: {
    GLOBAL: 'global',
    CONTINENT: 'continent',
    COUNTRY: 'country',
    REGION: 'region',
    STATE: 'state',
    CITY: 'city',
    ZIP_CODE: 'zip_code',
    RADIUS: 'radius',
    TIMEZONE: 'timezone',
    LANGUAGE: 'language',
    CULTURE: 'culture',
  } as const,

  // Target Behaviors
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
    AOV: 'aov',
    LTV: 'ltv',
  } as const,

  // Target Devices
  DEVICES: {
    DESKTOP: 'desktop',
    MOBILE: 'mobile',
    TABLET: 'tablet',
    SMART_PHONE: 'smart_phone',
    SMART_TV: 'smart_tv',
    GAMING_CONSOLE: 'gaming_console',
    WEARABLE: 'wearable',
    ALL: 'all',
  } as const,

  // Target OS
  OS: {
    WINDOWS: 'windows',
    MACOS: 'macos',
    LINUX: 'linux',
    IOS: 'ios',
    ANDROID: 'android',
    WEB: 'web',
    ALL: 'all',
  } as const,

  // Target Channels
  CHANNELS: {
    WEBSITE: 'website',
    APP: 'app',
    EMAIL: 'email',
    SMS: 'sms',
    SOCIAL: 'social',
    SEARCH: 'search',
    DISPLAY: 'display',
    VIDEO: 'video',
    AFFILIATE: 'affiliate',
    IN_STORE: 'in_store',
    MARKETPLACE: 'marketplace',
    ALL: 'all',
  } as const,

  // Target Defaults
  DEFAULTS: {
    DEFAULT_TARGET_TYPE: 'all_customers',
    MIN_RADIUS_KM: 1,
    MAX_RADIUS_KM: 500,
    DEFAULT_RADIUS_KM: 50,
    MAX_TARGET_SEGMENTS: 10,
    MIN_AGE: 18,
    MAX_AGE: 100,
    DEFAULT_MIN_ORDER_COUNT: 0,
    DEFAULT_MAX_ORDER_COUNT: 0,
    DEFAULT_MIN_SPENT_AMOUNT: 0,
    DEFAULT_MAX_SPENT_AMOUNT: 0,
  } as const,
} as const;

// Target Types
export type MarketingPromotionTargetType =
  (typeof MARKETINGPROMOTION_TARGET.TYPES)[keyof typeof MARKETINGPROMOTION_TARGET.TYPES];

// Target Demographics
export type MarketingPromotionTargetDemographic =
  (typeof MARKETINGPROMOTION_TARGET.DEMOGRAPHICS)[keyof typeof MARKETINGPROMOTION_TARGET.DEMOGRAPHICS];

// Target Geography
export type MarketingPromotionTargetGeography =
  (typeof MARKETINGPROMOTION_TARGET.GEOGRAPHY)[keyof typeof MARKETINGPROMOTION_TARGET.GEOGRAPHY];

// Target Behaviors
export type MarketingPromotionTargetBehavior =
  (typeof MARKETINGPROMOTION_TARGET.BEHAVIORS)[keyof typeof MARKETINGPROMOTION_TARGET.BEHAVIORS];

// Target Devices
export type MarketingPromotionTargetDevice =
  (typeof MARKETINGPROMOTION_TARGET.DEVICES)[keyof typeof MARKETINGPROMOTION_TARGET.DEVICES];

// Target OS
export type MarketingPromotionTargetOS =
  (typeof MARKETINGPROMOTION_TARGET.OS)[keyof typeof MARKETINGPROMOTION_TARGET.OS];

// Target Channels
export type MarketingPromotionTargetChannel =
  (typeof MARKETINGPROMOTION_TARGET.CHANNELS)[keyof typeof MARKETINGPROMOTION_TARGET.CHANNELS];

// Target Defaults
export type MarketingPromotionTargetDefault =
  (typeof MARKETINGPROMOTION_TARGET.DEFAULTS)[keyof typeof MARKETINGPROMOTION_TARGET.DEFAULTS];

// Utility Functions
export function marketingpromotionGetTargetTypeLabel(
  targetType: MarketingPromotionTargetType
): string {
  const labels: Record<MarketingPromotionTargetType, string> = {
    [MARKETINGPROMOTION_TARGET.TYPES.ALL_CUSTOMERS]: 'All Customers',
    [MARKETINGPROMOTION_TARGET.TYPES.NEW_CUSTOMERS]: 'New Customers',
    [MARKETINGPROMOTION_TARGET.TYPES.RETURNING_CUSTOMERS]: 'Returning Customers',
    [MARKETINGPROMOTION_TARGET.TYPES.HIGH_VALUE]: 'High Value',
    [MARKETINGPROMOTION_TARGET.TYPES.MEDIUM_VALUE]: 'Medium Value',
    [MARKETINGPROMOTION_TARGET.TYPES.LOW_VALUE]: 'Low Value',
    [MARKETINGPROMOTION_TARGET.TYPES.INACTIVE]: 'Inactive',
    [MARKETINGPROMOTION_TARGET.TYPES.ACTIVE]: 'Active',
    [MARKETINGPROMOTION_TARGET.TYPES.LOYAL]: 'Loyal',
    [MARKETINGPROMOTION_TARGET.TYPES.VIP]: 'VIP',
    [MARKETINGPROMOTION_TARGET.TYPES.AT_RISK]: 'At Risk',
    [MARKETINGPROMOTION_TARGET.TYPES.LOOKALIKE]: 'Lookalike',
    [MARKETINGPROMOTION_TARGET.TYPES.CUSTOM]: 'Custom',
    [MARKETINGPROMOTION_TARGET.TYPES.SEGMENT]: 'Segment',
    [MARKETINGPROMOTION_TARGET.TYPES.DEMOGRAPHIC]: 'Demographic',
    [MARKETINGPROMOTION_TARGET.TYPES.BEHAVIORAL]: 'Behavioral',
    [MARKETINGPROMOTION_TARGET.TYPES.PSYCHOGRAPHIC]: 'Psychographic',
  };
  return labels[targetType] || 'Unknown Target Type';
}

export function marketingpromotionGetTargetDemographicLabel(
  demographic: MarketingPromotionTargetDemographic
): string {
  const labels: Record<MarketingPromotionTargetDemographic, string> = {
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.AGE_18_24]: '18-24 Years',
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.AGE_25_34]: '25-34 Years',
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.AGE_35_44]: '35-44 Years',
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.AGE_45_54]: '45-54 Years',
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.AGE_55_64]: '55-64 Years',
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.AGE_65_PLUS]: '65+ Years',
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.MALE]: 'Male',
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.FEMALE]: 'Female',
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.NON_BINARY]: 'Non-Binary',
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.ALL_GENDERS]: 'All Genders',
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.INCOME_LOW]: 'Low Income',
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.INCOME_MEDIUM]: 'Medium Income',
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.INCOME_HIGH]: 'High Income',
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.EDUCATION_SCHOOL]: 'School Education',
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.EDUCATION_COLLEGE]: 'College Education',
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.EDUCATION_UNIVERSITY]: 'University Education',
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.EDUCATION_GRADUATE]: 'Graduate Education',
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.EMPLOYMENT_STUDENT]: 'Student',
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.EMPLOYMENT_EMPLOYED]: 'Employed',
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.EMPLOYMENT_SELF_EMPLOYED]: 'Self-Employed',
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.EMPLOYMENT_UNEMPLOYED]: 'Unemployed',
    [MARKETINGPROMOTION_TARGET.DEMOGRAPHICS.EMPLOYMENT_RETIRED]: 'Retired',
  };
  return labels[demographic] || 'Unknown Demographic';
}

export function marketingpromotionGetTargetGeographyLabel(
  geography: MarketingPromotionTargetGeography
): string {
  const labels: Record<MarketingPromotionTargetGeography, string> = {
    [MARKETINGPROMOTION_TARGET.GEOGRAPHY.GLOBAL]: 'Global',
    [MARKETINGPROMOTION_TARGET.GEOGRAPHY.CONTINENT]: 'Continent',
    [MARKETINGPROMOTION_TARGET.GEOGRAPHY.COUNTRY]: 'Country',
    [MARKETINGPROMOTION_TARGET.GEOGRAPHY.REGION]: 'Region',
    [MARKETINGPROMOTION_TARGET.GEOGRAPHY.STATE]: 'State/Province',
    [MARKETINGPROMOTION_TARGET.GEOGRAPHY.CITY]: 'City',
    [MARKETINGPROMOTION_TARGET.GEOGRAPHY.ZIP_CODE]: 'ZIP Code',
    [MARKETINGPROMOTION_TARGET.GEOGRAPHY.RADIUS]: 'Radius',
    [MARKETINGPROMOTION_TARGET.GEOGRAPHY.TIMEZONE]: 'Timezone',
    [MARKETINGPROMOTION_TARGET.GEOGRAPHY.LANGUAGE]: 'Language',
    [MARKETINGPROMOTION_TARGET.GEOGRAPHY.CULTURE]: 'Culture',
  };
  return labels[geography] || 'Unknown Geography';
}

export function marketingpromotionGetTargetBehaviorLabel(
  behavior: MarketingPromotionTargetBehavior
): string {
  const labels: Record<MarketingPromotionTargetBehavior, string> = {
    [MARKETINGPROMOTION_TARGET.BEHAVIORS.PURCHASE_HISTORY]: 'Purchase History',
    [MARKETINGPROMOTION_TARGET.BEHAVIORS.BROWSING_HISTORY]: 'Browsing History',
    [MARKETINGPROMOTION_TARGET.BEHAVIORS.SEARCH_HISTORY]: 'Search History',
    [MARKETINGPROMOTION_TARGET.BEHAVIORS.CART_ABANDONMENT]: 'Cart Abandonment',
    [MARKETINGPROMOTION_TARGET.BEHAVIORS.PRODUCT_VIEWS]: 'Product Views',
    [MARKETINGPROMOTION_TARGET.BEHAVIORS.CATEGORY_PREFERENCE]: 'Category Preference',
    [MARKETINGPROMOTION_TARGET.BEHAVIORS.BRAND_PREFERENCE]: 'Brand Preference',
    [MARKETINGPROMOTION_TARGET.BEHAVIORS.PRICE_SENSITIVITY]: 'Price Sensitivity',
    [MARKETINGPROMOTION_TARGET.BEHAVIORS.LOYALTY_LEVEL]: 'Loyalty Level',
    [MARKETINGPROMOTION_TARGET.BEHAVIORS.ENGAGEMENT_SCORE]: 'Engagement Score',
    [MARKETINGPROMOTION_TARGET.BEHAVIORS.RECENCY]: 'Recency (R)',
    [MARKETINGPROMOTION_TARGET.BEHAVIORS.FREQUENCY]: 'Frequency (F)',
    [MARKETINGPROMOTION_TARGET.BEHAVIORS.MONETARY]: 'Monetary (M)',
    [MARKETINGPROMOTION_TARGET.BEHAVIORS.AOV]: 'Average Order Value',
    [MARKETINGPROMOTION_TARGET.BEHAVIORS.LTV]: 'Lifetime Value',
  };
  return labels[behavior] || 'Unknown Behavior';
}

export function marketingpromotionGetTargetDeviceLabel(
  device: MarketingPromotionTargetDevice
): string {
  const labels: Record<MarketingPromotionTargetDevice, string> = {
    [MARKETINGPROMOTION_TARGET.DEVICES.DESKTOP]: 'Desktop',
    [MARKETINGPROMOTION_TARGET.DEVICES.MOBILE]: 'Mobile',
    [MARKETINGPROMOTION_TARGET.DEVICES.TABLET]: 'Tablet',
    [MARKETINGPROMOTION_TARGET.DEVICES.SMART_PHONE]: 'Smart Phone',
    [MARKETINGPROMOTION_TARGET.DEVICES.SMART_TV]: 'Smart TV',
    [MARKETINGPROMOTION_TARGET.DEVICES.GAMING_CONSOLE]: 'Gaming Console',
    [MARKETINGPROMOTION_TARGET.DEVICES.WEARABLE]: 'Wearable',
    [MARKETINGPROMOTION_TARGET.DEVICES.ALL]: 'All Devices',
  };
  return labels[device] || 'Unknown Device';
}

export function marketingpromotionGetTargetOSLabel(os: MarketingPromotionTargetOS): string {
  const labels: Record<MarketingPromotionTargetOS, string> = {
    [MARKETINGPROMOTION_TARGET.OS.WINDOWS]: 'Windows',
    [MARKETINGPROMOTION_TARGET.OS.MACOS]: 'macOS',
    [MARKETINGPROMOTION_TARGET.OS.LINUX]: 'Linux',
    [MARKETINGPROMOTION_TARGET.OS.IOS]: 'iOS',
    [MARKETINGPROMOTION_TARGET.OS.ANDROID]: 'Android',
    [MARKETINGPROMOTION_TARGET.OS.WEB]: 'Web',
    [MARKETINGPROMOTION_TARGET.OS.ALL]: 'All OS',
  };
  return labels[os] || 'Unknown OS';
}

export function marketingpromotionGetTargetChannelLabel(
  channel: MarketingPromotionTargetChannel
): string {
  const labels: Record<MarketingPromotionTargetChannel, string> = {
    [MARKETINGPROMOTION_TARGET.CHANNELS.WEBSITE]: 'Website',
    [MARKETINGPROMOTION_TARGET.CHANNELS.APP]: 'App',
    [MARKETINGPROMOTION_TARGET.CHANNELS.EMAIL]: 'Email',
    [MARKETINGPROMOTION_TARGET.CHANNELS.SMS]: 'SMS',
    [MARKETINGPROMOTION_TARGET.CHANNELS.SOCIAL]: 'Social Media',
    [MARKETINGPROMOTION_TARGET.CHANNELS.SEARCH]: 'Search',
    [MARKETINGPROMOTION_TARGET.CHANNELS.DISPLAY]: 'Display',
    [MARKETINGPROMOTION_TARGET.CHANNELS.VIDEO]: 'Video',
    [MARKETINGPROMOTION_TARGET.CHANNELS.AFFILIATE]: 'Affiliate',
    [MARKETINGPROMOTION_TARGET.CHANNELS.IN_STORE]: 'In-Store',
    [MARKETINGPROMOTION_TARGET.CHANNELS.MARKETPLACE]: 'Marketplace',
    [MARKETINGPROMOTION_TARGET.CHANNELS.ALL]: 'All Channels',
  };
  return labels[channel] || 'Unknown Channel';
}

export function marketingpromotionGetDefaultTargetType(): MarketingPromotionTargetType {
  return MARKETINGPROMOTION_TARGET.DEFAULTS.DEFAULT_TARGET_TYPE;
}

export function marketingpromotionGetDefaultRadius(): number {
  return MARKETINGPROMOTION_TARGET.DEFAULTS.DEFAULT_RADIUS_KM;
}

export function marketingpromotionGetMaxTargetSegments(): number {
  return MARKETINGPROMOTION_TARGET.DEFAULTS.MAX_TARGET_SEGMENTS;
}

export function marketingpromotionIsValueTarget(targetType: MarketingPromotionTargetType): boolean {
  const valueTargets: MarketingPromotionTargetType[] = [
    MARKETINGPROMOTION_TARGET.TYPES.HIGH_VALUE,
    MARKETINGPROMOTION_TARGET.TYPES.MEDIUM_VALUE,
    MARKETINGPROMOTION_TARGET.TYPES.LOW_VALUE,
  ];
  return valueTargets.includes(targetType);
}

export function marketingpromotionIsBehaviorTarget(
  targetType: MarketingPromotionTargetType
): boolean {
  const behaviorTargets: MarketingPromotionTargetType[] = [
    MARKETINGPROMOTION_TARGET.TYPES.ACTIVE,
    MARKETINGPROMOTION_TARGET.TYPES.INACTIVE,
    MARKETINGPROMOTION_TARGET.TYPES.LOYAL,
    MARKETINGPROMOTION_TARGET.TYPES.AT_RISK,
    MARKETINGPROMOTION_TARGET.TYPES.BEHAVIORAL,
  ];
  return behaviorTargets.includes(targetType);
}
