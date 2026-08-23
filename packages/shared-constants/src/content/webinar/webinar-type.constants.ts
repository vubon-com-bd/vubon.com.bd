/**
 * Webinar Type Constants
 * Types and classifications of webinars
 */

export const CONTENT_WEBINAR_TYPE = {
  // Webinar Categories
  CATEGORIES: {
    EDUCATIONAL: 'educational',
    BUSINESS: 'business',
    TECHNICAL: 'technical',
    MARKETING: 'marketing',
    SALES: 'sales',
    PRODUCT: 'product',
    TRAINING: 'training',
    CUSTOMER: 'customer',
    INTERNAL: 'internal',
    INDUSTRY: 'industry',
    CUSTOM: 'custom',
  } as const,

  // Webinar Sub-Types
  SUB_TYPES: {
    // Educational
    LECTURE: 'lecture',
    WORKSHOP: 'workshop',
    SEMINAR: 'seminar',
    TUTORIAL: 'tutorial',

    // Business
    STRATEGY: 'strategy',
    PLANNING: 'planning',
    REVIEW: 'review',
    UPDATE: 'update',

    // Technical
    DEMO: 'demo',
    TROUBLESHOOTING: 'troubleshooting',
    BEST_PRACTICES: 'best_practices',

    // Marketing
    CAMPAIGN: 'campaign',
    STRATEGY_SESSION: 'strategy_session',
    MARKETING_TRENDS: 'marketing_trends',

    // Sales
    PITCH: 'pitch',
    NEGOTIATION: 'negotiation',
    CLOSING: 'closing',

    // Product
    LAUNCH: 'launch',
    SHOWCASE: 'showcase',
    FEATURE: 'feature',

    // Training
    ONBOARDING: 'onboarding',
    SKILL_DEVELOPMENT: 'skill_development',
    CERTIFICATION: 'certification',

    // Customer
    SUPPORT: 'support',
    FEEDBACK: 'feedback',
    SATISFACTION: 'satisfaction',

    // Internal
    TOWN_HALL: 'town_hall',
    TEAM_MEETING: 'team_meeting',
    ALL_HANDS: 'all_hands',

    // Industry
    TRENDS: 'trends',
    FORECAST: 'forecast',
    ANALYSIS: 'analysis',

    // Custom
    CUSTOM: 'custom',
  } as const,

  // Webinar Scopes
  SCOPES: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    COMPANY: 'company',
    DEPARTMENT: 'department',
    TEAM: 'team',
    CUSTOM: 'custom',
  } as const,

  // Webinar Complexity
  COMPLEXITY: {
    BASIC: 'basic',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
  } as const,

  // Webinar Production Quality
  PRODUCTION_QUALITY: {
    STANDARD: 'standard',
    PROFESSIONAL: 'professional',
    STUDIO: 'studio',
    PREMIUM: 'premium',
    CUSTOM: 'custom',
  } as const,

  // Webinar Languages
  LANGUAGES: {
    EN: 'en',
    BN: 'bn',
    HI: 'hi',
    AR: 'ar',
    ES: 'es',
    FR: 'fr',
    DE: 'de',
    ZH: 'zh',
    JA: 'ja',
    RU: 'ru',
    PT: 'pt',
    IT: 'it',
  } as const,

  // Webinar Interactivity Level
  INTERACTIVITY: {
    NONE: 'none',
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    FULL: 'full',
  } as const,
} as const;

// Webinar Categories
export type ContentWebinarTypeCategory =
  (typeof CONTENT_WEBINAR_TYPE.CATEGORIES)[keyof typeof CONTENT_WEBINAR_TYPE.CATEGORIES];

// Webinar Sub-Types
export type ContentWebinarTypeSubType =
  (typeof CONTENT_WEBINAR_TYPE.SUB_TYPES)[keyof typeof CONTENT_WEBINAR_TYPE.SUB_TYPES];

// Webinar Scopes
export type ContentWebinarTypeScope =
  (typeof CONTENT_WEBINAR_TYPE.SCOPES)[keyof typeof CONTENT_WEBINAR_TYPE.SCOPES];

// Webinar Complexity
export type ContentWebinarTypeComplexity =
  (typeof CONTENT_WEBINAR_TYPE.COMPLEXITY)[keyof typeof CONTENT_WEBINAR_TYPE.COMPLEXITY];

// Webinar Production Quality
export type ContentWebinarTypeProductionQuality =
  (typeof CONTENT_WEBINAR_TYPE.PRODUCTION_QUALITY)[keyof typeof CONTENT_WEBINAR_TYPE.PRODUCTION_QUALITY];

// Webinar Languages
export type ContentWebinarTypeLanguage =
  (typeof CONTENT_WEBINAR_TYPE.LANGUAGES)[keyof typeof CONTENT_WEBINAR_TYPE.LANGUAGES];

// Webinar Interactivity Level
export type ContentWebinarTypeInteractivity =
  (typeof CONTENT_WEBINAR_TYPE.INTERACTIVITY)[keyof typeof CONTENT_WEBINAR_TYPE.INTERACTIVITY];

// Utility Functions
export function contentWebinarTypeGetCategoryLabel(category: ContentWebinarTypeCategory): string {
  const labels: Record<ContentWebinarTypeCategory, string> = {
    [CONTENT_WEBINAR_TYPE.CATEGORIES.EDUCATIONAL]: 'Educational Webinar',
    [CONTENT_WEBINAR_TYPE.CATEGORIES.BUSINESS]: 'Business Webinar',
    [CONTENT_WEBINAR_TYPE.CATEGORIES.TECHNICAL]: 'Technical Webinar',
    [CONTENT_WEBINAR_TYPE.CATEGORIES.MARKETING]: 'Marketing Webinar',
    [CONTENT_WEBINAR_TYPE.CATEGORIES.SALES]: 'Sales Webinar',
    [CONTENT_WEBINAR_TYPE.CATEGORIES.PRODUCT]: 'Product Webinar',
    [CONTENT_WEBINAR_TYPE.CATEGORIES.TRAINING]: 'Training Webinar',
    [CONTENT_WEBINAR_TYPE.CATEGORIES.CUSTOMER]: 'Customer Webinar',
    [CONTENT_WEBINAR_TYPE.CATEGORIES.INTERNAL]: 'Internal Webinar',
    [CONTENT_WEBINAR_TYPE.CATEGORIES.INDUSTRY]: 'Industry Webinar',
    [CONTENT_WEBINAR_TYPE.CATEGORIES.CUSTOM]: 'Custom Webinar',
  };
  return labels[category] || 'Unknown Category';
}

export function contentWebinarTypeGetSubTypeLabel(subType: ContentWebinarTypeSubType): string {
  const labels: Record<ContentWebinarTypeSubType, string> = {
    // Educational
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.LECTURE]: 'Lecture',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.WORKSHOP]: 'Workshop',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.SEMINAR]: 'Seminar',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.TUTORIAL]: 'Tutorial',

    // Business
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.STRATEGY]: 'Strategy Session',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.PLANNING]: 'Planning Session',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.REVIEW]: 'Review Session',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.UPDATE]: 'Update Session',

    // Technical
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.DEMO]: 'Demo Session',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.TROUBLESHOOTING]: 'Troubleshooting',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.BEST_PRACTICES]: 'Best Practices',

    // Marketing
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.CAMPAIGN]: 'Campaign Session',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.STRATEGY_SESSION]: 'Strategy Session',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.MARKETING_TRENDS]: 'Marketing Trends',

    // Sales
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.PITCH]: 'Sales Pitch',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.NEGOTIATION]: 'Negotiation',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.CLOSING]: 'Closing Session',

    // Product
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.LAUNCH]: 'Product Launch',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.SHOWCASE]: 'Product Showcase',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.FEATURE]: 'Feature Session',

    // Training
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.ONBOARDING]: 'Onboarding',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.SKILL_DEVELOPMENT]: 'Skill Development',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.CERTIFICATION]: 'Certification',

    // Customer
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.SUPPORT]: 'Support Session',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.FEEDBACK]: 'Feedback Session',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.SATISFACTION]: 'Satisfaction Session',

    // Internal
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.TOWN_HALL]: 'Town Hall',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.TEAM_MEETING]: 'Team Meeting',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.ALL_HANDS]: 'All Hands',

    // Industry
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.TRENDS]: 'Industry Trends',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.FORECAST]: 'Industry Forecast',
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.ANALYSIS]: 'Industry Analysis',

    // Custom
    [CONTENT_WEBINAR_TYPE.SUB_TYPES.CUSTOM]: 'Custom Sub-Type',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function contentWebinarTypeGetScopeLabel(scope: ContentWebinarTypeScope): string {
  const labels: Record<ContentWebinarTypeScope, string> = {
    [CONTENT_WEBINAR_TYPE.SCOPES.GLOBAL]: 'Global',
    [CONTENT_WEBINAR_TYPE.SCOPES.REGIONAL]: 'Regional',
    [CONTENT_WEBINAR_TYPE.SCOPES.LOCAL]: 'Local',
    [CONTENT_WEBINAR_TYPE.SCOPES.COMPANY]: 'Company',
    [CONTENT_WEBINAR_TYPE.SCOPES.DEPARTMENT]: 'Department',
    [CONTENT_WEBINAR_TYPE.SCOPES.TEAM]: 'Team',
    [CONTENT_WEBINAR_TYPE.SCOPES.CUSTOM]: 'Custom Scope',
  };
  return labels[scope] || 'Unknown Scope';
}

export function contentWebinarTypeGetComplexityLabel(
  complexity: ContentWebinarTypeComplexity
): string {
  const labels: Record<ContentWebinarTypeComplexity, string> = {
    [CONTENT_WEBINAR_TYPE.COMPLEXITY.BASIC]: 'Basic',
    [CONTENT_WEBINAR_TYPE.COMPLEXITY.INTERMEDIATE]: 'Intermediate',
    [CONTENT_WEBINAR_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
    [CONTENT_WEBINAR_TYPE.COMPLEXITY.EXPERT]: 'Expert',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function contentWebinarTypeGetProductionQualityLabel(
  quality: ContentWebinarTypeProductionQuality
): string {
  const labels: Record<ContentWebinarTypeProductionQuality, string> = {
    [CONTENT_WEBINAR_TYPE.PRODUCTION_QUALITY.STANDARD]: 'Standard',
    [CONTENT_WEBINAR_TYPE.PRODUCTION_QUALITY.PROFESSIONAL]: 'Professional',
    [CONTENT_WEBINAR_TYPE.PRODUCTION_QUALITY.STUDIO]: 'Studio',
    [CONTENT_WEBINAR_TYPE.PRODUCTION_QUALITY.PREMIUM]: 'Premium',
    [CONTENT_WEBINAR_TYPE.PRODUCTION_QUALITY.CUSTOM]: 'Custom Quality',
  };
  return labels[quality] || 'Unknown Quality';
}

export function contentWebinarTypeGetLanguageLabel(language: ContentWebinarTypeLanguage): string {
  const labels: Record<ContentWebinarTypeLanguage, string> = {
    [CONTENT_WEBINAR_TYPE.LANGUAGES.EN]: 'English',
    [CONTENT_WEBINAR_TYPE.LANGUAGES.BN]: 'Bengali',
    [CONTENT_WEBINAR_TYPE.LANGUAGES.HI]: 'Hindi',
    [CONTENT_WEBINAR_TYPE.LANGUAGES.AR]: 'Arabic',
    [CONTENT_WEBINAR_TYPE.LANGUAGES.ES]: 'Spanish',
    [CONTENT_WEBINAR_TYPE.LANGUAGES.FR]: 'French',
    [CONTENT_WEBINAR_TYPE.LANGUAGES.DE]: 'German',
    [CONTENT_WEBINAR_TYPE.LANGUAGES.ZH]: 'Chinese',
    [CONTENT_WEBINAR_TYPE.LANGUAGES.JA]: 'Japanese',
    [CONTENT_WEBINAR_TYPE.LANGUAGES.RU]: 'Russian',
    [CONTENT_WEBINAR_TYPE.LANGUAGES.PT]: 'Portuguese',
    [CONTENT_WEBINAR_TYPE.LANGUAGES.IT]: 'Italian',
  };
  return labels[language] || 'Unknown Language';
}

export function contentWebinarTypeGetInteractivityLabel(
  level: ContentWebinarTypeInteractivity
): string {
  const labels: Record<ContentWebinarTypeInteractivity, string> = {
    [CONTENT_WEBINAR_TYPE.INTERACTIVITY.NONE]: 'None',
    [CONTENT_WEBINAR_TYPE.INTERACTIVITY.LOW]: 'Low',
    [CONTENT_WEBINAR_TYPE.INTERACTIVITY.MEDIUM]: 'Medium',
    [CONTENT_WEBINAR_TYPE.INTERACTIVITY.HIGH]: 'High',
    [CONTENT_WEBINAR_TYPE.INTERACTIVITY.FULL]: 'Full',
  };
  return labels[level] || 'Unknown Level';
}

export function contentWebinarTypeIsValidCategory(
  category: string
): category is ContentWebinarTypeCategory {
  return Object.values(CONTENT_WEBINAR_TYPE.CATEGORIES).includes(
    category as ContentWebinarTypeCategory
  );
}

export function contentWebinarTypeIsValidScope(scope: string): scope is ContentWebinarTypeScope {
  return Object.values(CONTENT_WEBINAR_TYPE.SCOPES).includes(scope as ContentWebinarTypeScope);
}
