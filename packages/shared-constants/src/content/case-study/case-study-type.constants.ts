/**
 * Case Study Type Constants
 * Types and classifications of case studies
 */

export const CONTENT_CASE_STUDY_TYPE = {
  // Case Study Categories
  CATEGORIES: {
    BUSINESS: 'business',
    TECHNICAL: 'technical',
    CUSTOMER: 'customer',
    PRODUCT: 'product',
    SERVICE: 'service',
    IMPLEMENTATION: 'implementation',
    TRANSFORMATION: 'transformation',
    INNOVATION: 'innovation',
    SUCCESS: 'success',
    CHALLENGE: 'challenge',
    SOLUTION: 'solution',
    CUSTOM: 'custom',
  } as const,

  // Case Study Sub-Types
  SUB_TYPES: {
    // Business
    GROWTH: 'growth',
    SCALING: 'scaling',
    OPTIMIZATION: 'optimization',

    // Technical
    TECHNOLOGY_IMPLEMENTATION: 'technology_implementation',
    SYSTEM_UPGRADE: 'system_upgrade',
    INTEGRATION: 'integration',

    // Customer
    CUSTOMER_EXPERIENCE: 'customer_experience',
    CUSTOMER_ENGAGEMENT: 'customer_engagement',
    CUSTOMER_RETENTION: 'customer_retention',

    // Product
    PRODUCT_LAUNCH: 'product_launch',
    PRODUCT_IMPROVEMENT: 'product_improvement',
    PRODUCT_ADOPTION: 'product_adoption',

    // Service
    SERVICE_DELIVERY: 'service_delivery',
    SERVICE_QUALITY: 'service_quality',
    SERVICE_INNOVATION: 'service_innovation',

    // Implementation
    SUCCESSFUL_IMPLEMENTATION: 'successful_implementation',
    CHALLENGING_IMPLEMENTATION: 'challenging_implementation',

    // Transformation
    DIGITAL_TRANSFORMATION: 'digital_transformation',
    ORGANIZATIONAL_TRANSFORMATION: 'organizational_transformation',

    // Innovation
    PRODUCT_INNOVATION: 'product_innovation',
    PROCESS_INNOVATION: 'process_innovation',

    // Success
    NOTABLE_SUCCESS: 'notable_success',
    MEASURABLE_SUCCESS: 'measurable_success',

    // Challenge
    OVERCOMING_CHALLENGES: 'overcoming_challenges',
    COMPLEX_CHALLENGES: 'complex_challenges',

    // Solution
    CREATIVE_SOLUTION: 'creative_solution',
    EFFECTIVE_SOLUTION: 'effective_solution',

    // Custom
    CUSTOM: 'custom',
  } as const,

  // Case Study Scopes
  SCOPES: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    INDUSTRY: 'industry',
    COMPANY: 'company',
    PROJECT: 'project',
    CUSTOM: 'custom',
  } as const,

  // Case Study Audiences
  AUDIENCES: {
    INTERNAL: 'internal',
    EXTERNAL: 'external',
    CLIENTS: 'clients',
    PARTNERS: 'partners',
    INVESTORS: 'investors',
    PUBLIC: 'public',
    INDUSTRY: 'industry',
    CUSTOM: 'custom',
  } as const,

  // Case Study Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
    VERY_COMPLEX: 'very_complex',
  } as const,

  // Case Study Quality
  QUALITY: {
    STANDARD: 'standard',
    PREMIUM: 'premium',
    FEATURED: 'featured',
    HIGHLIGHT: 'highlight',
    CUSTOM: 'custom',
  } as const,

  // Case Study Languages
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
  } as const,
} as const;

// Case Study Categories
export type ContentCaseStudyTypeCategory =
  (typeof CONTENT_CASE_STUDY_TYPE.CATEGORIES)[keyof typeof CONTENT_CASE_STUDY_TYPE.CATEGORIES];

// Case Study Sub-Types
export type ContentCaseStudyTypeSubType =
  (typeof CONTENT_CASE_STUDY_TYPE.SUB_TYPES)[keyof typeof CONTENT_CASE_STUDY_TYPE.SUB_TYPES];

// Case Study Scopes
export type ContentCaseStudyTypeScope =
  (typeof CONTENT_CASE_STUDY_TYPE.SCOPES)[keyof typeof CONTENT_CASE_STUDY_TYPE.SCOPES];

// Case Study Audiences
export type ContentCaseStudyTypeAudience =
  (typeof CONTENT_CASE_STUDY_TYPE.AUDIENCES)[keyof typeof CONTENT_CASE_STUDY_TYPE.AUDIENCES];

// Case Study Complexity
export type ContentCaseStudyTypeComplexity =
  (typeof CONTENT_CASE_STUDY_TYPE.COMPLEXITY)[keyof typeof CONTENT_CASE_STUDY_TYPE.COMPLEXITY];

// Case Study Quality
export type ContentCaseStudyTypeQuality =
  (typeof CONTENT_CASE_STUDY_TYPE.QUALITY)[keyof typeof CONTENT_CASE_STUDY_TYPE.QUALITY];

// Case Study Languages
export type ContentCaseStudyTypeLanguage =
  (typeof CONTENT_CASE_STUDY_TYPE.LANGUAGES)[keyof typeof CONTENT_CASE_STUDY_TYPE.LANGUAGES];

// Utility Functions
export function contentCaseStudyTypeGetCategoryLabel(
  category: ContentCaseStudyTypeCategory
): string {
  const labels: Record<ContentCaseStudyTypeCategory, string> = {
    [CONTENT_CASE_STUDY_TYPE.CATEGORIES.BUSINESS]: 'Business Case Study',
    [CONTENT_CASE_STUDY_TYPE.CATEGORIES.TECHNICAL]: 'Technical Case Study',
    [CONTENT_CASE_STUDY_TYPE.CATEGORIES.CUSTOMER]: 'Customer Case Study',
    [CONTENT_CASE_STUDY_TYPE.CATEGORIES.PRODUCT]: 'Product Case Study',
    [CONTENT_CASE_STUDY_TYPE.CATEGORIES.SERVICE]: 'Service Case Study',
    [CONTENT_CASE_STUDY_TYPE.CATEGORIES.IMPLEMENTATION]: 'Implementation Case Study',
    [CONTENT_CASE_STUDY_TYPE.CATEGORIES.TRANSFORMATION]: 'Transformation Case Study',
    [CONTENT_CASE_STUDY_TYPE.CATEGORIES.INNOVATION]: 'Innovation Case Study',
    [CONTENT_CASE_STUDY_TYPE.CATEGORIES.SUCCESS]: 'Success Case Study',
    [CONTENT_CASE_STUDY_TYPE.CATEGORIES.CHALLENGE]: 'Challenge Case Study',
    [CONTENT_CASE_STUDY_TYPE.CATEGORIES.SOLUTION]: 'Solution Case Study',
    [CONTENT_CASE_STUDY_TYPE.CATEGORIES.CUSTOM]: 'Custom Case Study',
  };
  return labels[category] || 'Unknown Category';
}

export function contentCaseStudyTypeGetSubTypeLabel(subType: ContentCaseStudyTypeSubType): string {
  const labels: Record<ContentCaseStudyTypeSubType, string> = {
    // Business
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.GROWTH]: 'Growth',
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.SCALING]: 'Scaling',
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.OPTIMIZATION]: 'Optimization',

    // Technical
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.TECHNOLOGY_IMPLEMENTATION]: 'Technology Implementation',
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.SYSTEM_UPGRADE]: 'System Upgrade',
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.INTEGRATION]: 'Integration',

    // Customer
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.CUSTOMER_EXPERIENCE]: 'Customer Experience',
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.CUSTOMER_ENGAGEMENT]: 'Customer Engagement',
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.CUSTOMER_RETENTION]: 'Customer Retention',

    // Product
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.PRODUCT_LAUNCH]: 'Product Launch',
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.PRODUCT_IMPROVEMENT]: 'Product Improvement',
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.PRODUCT_ADOPTION]: 'Product Adoption',

    // Service
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.SERVICE_DELIVERY]: 'Service Delivery',
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.SERVICE_QUALITY]: 'Service Quality',
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.SERVICE_INNOVATION]: 'Service Innovation',

    // Implementation
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.SUCCESSFUL_IMPLEMENTATION]: 'Successful Implementation',
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.CHALLENGING_IMPLEMENTATION]: 'Challenging Implementation',

    // Transformation
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.DIGITAL_TRANSFORMATION]: 'Digital Transformation',
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.ORGANIZATIONAL_TRANSFORMATION]:
      'Organizational Transformation',

    // Innovation
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.PRODUCT_INNOVATION]: 'Product Innovation',
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.PROCESS_INNOVATION]: 'Process Innovation',

    // Success
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.NOTABLE_SUCCESS]: 'Notable Success',
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.MEASURABLE_SUCCESS]: 'Measurable Success',

    // Challenge
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.OVERCOMING_CHALLENGES]: 'Overcoming Challenges',
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.COMPLEX_CHALLENGES]: 'Complex Challenges',

    // Solution
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.CREATIVE_SOLUTION]: 'Creative Solution',
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.EFFECTIVE_SOLUTION]: 'Effective Solution',

    // Custom
    [CONTENT_CASE_STUDY_TYPE.SUB_TYPES.CUSTOM]: 'Custom Sub-Type',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function contentCaseStudyTypeGetScopeLabel(scope: ContentCaseStudyTypeScope): string {
  const labels: Record<ContentCaseStudyTypeScope, string> = {
    [CONTENT_CASE_STUDY_TYPE.SCOPES.GLOBAL]: 'Global',
    [CONTENT_CASE_STUDY_TYPE.SCOPES.REGIONAL]: 'Regional',
    [CONTENT_CASE_STUDY_TYPE.SCOPES.LOCAL]: 'Local',
    [CONTENT_CASE_STUDY_TYPE.SCOPES.INDUSTRY]: 'Industry',
    [CONTENT_CASE_STUDY_TYPE.SCOPES.COMPANY]: 'Company',
    [CONTENT_CASE_STUDY_TYPE.SCOPES.PROJECT]: 'Project',
    [CONTENT_CASE_STUDY_TYPE.SCOPES.CUSTOM]: 'Custom Scope',
  };
  return labels[scope] || 'Unknown Scope';
}

export function contentCaseStudyTypeGetAudienceLabel(
  audience: ContentCaseStudyTypeAudience
): string {
  const labels: Record<ContentCaseStudyTypeAudience, string> = {
    [CONTENT_CASE_STUDY_TYPE.AUDIENCES.INTERNAL]: 'Internal',
    [CONTENT_CASE_STUDY_TYPE.AUDIENCES.EXTERNAL]: 'External',
    [CONTENT_CASE_STUDY_TYPE.AUDIENCES.CLIENTS]: 'Clients',
    [CONTENT_CASE_STUDY_TYPE.AUDIENCES.PARTNERS]: 'Partners',
    [CONTENT_CASE_STUDY_TYPE.AUDIENCES.INVESTORS]: 'Investors',
    [CONTENT_CASE_STUDY_TYPE.AUDIENCES.PUBLIC]: 'Public',
    [CONTENT_CASE_STUDY_TYPE.AUDIENCES.INDUSTRY]: 'Industry',
    [CONTENT_CASE_STUDY_TYPE.AUDIENCES.CUSTOM]: 'Custom Audience',
  };
  return labels[audience] || 'Unknown Audience';
}

export function contentCaseStudyTypeGetComplexityLabel(
  complexity: ContentCaseStudyTypeComplexity
): string {
  const labels: Record<ContentCaseStudyTypeComplexity, string> = {
    [CONTENT_CASE_STUDY_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [CONTENT_CASE_STUDY_TYPE.COMPLEXITY.MODERATE]: 'Moderate',
    [CONTENT_CASE_STUDY_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [CONTENT_CASE_STUDY_TYPE.COMPLEXITY.VERY_COMPLEX]: 'Very Complex',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function contentCaseStudyTypeGetQualityLabel(quality: ContentCaseStudyTypeQuality): string {
  const labels: Record<ContentCaseStudyTypeQuality, string> = {
    [CONTENT_CASE_STUDY_TYPE.QUALITY.STANDARD]: 'Standard',
    [CONTENT_CASE_STUDY_TYPE.QUALITY.PREMIUM]: 'Premium',
    [CONTENT_CASE_STUDY_TYPE.QUALITY.FEATURED]: 'Featured',
    [CONTENT_CASE_STUDY_TYPE.QUALITY.HIGHLIGHT]: 'Highlight',
    [CONTENT_CASE_STUDY_TYPE.QUALITY.CUSTOM]: 'Custom Quality',
  };
  return labels[quality] || 'Unknown Quality';
}

export function contentCaseStudyTypeGetLanguageLabel(
  language: ContentCaseStudyTypeLanguage
): string {
  const labels: Record<ContentCaseStudyTypeLanguage, string> = {
    [CONTENT_CASE_STUDY_TYPE.LANGUAGES.EN]: 'English',
    [CONTENT_CASE_STUDY_TYPE.LANGUAGES.BN]: 'Bengali',
    [CONTENT_CASE_STUDY_TYPE.LANGUAGES.HI]: 'Hindi',
    [CONTENT_CASE_STUDY_TYPE.LANGUAGES.AR]: 'Arabic',
    [CONTENT_CASE_STUDY_TYPE.LANGUAGES.ES]: 'Spanish',
    [CONTENT_CASE_STUDY_TYPE.LANGUAGES.FR]: 'French',
    [CONTENT_CASE_STUDY_TYPE.LANGUAGES.DE]: 'German',
    [CONTENT_CASE_STUDY_TYPE.LANGUAGES.ZH]: 'Chinese',
    [CONTENT_CASE_STUDY_TYPE.LANGUAGES.JA]: 'Japanese',
    [CONTENT_CASE_STUDY_TYPE.LANGUAGES.RU]: 'Russian',
  };
  return labels[language] || 'Unknown Language';
}

export function contentCaseStudyTypeIsValidCategory(
  category: string
): category is ContentCaseStudyTypeCategory {
  return Object.values(CONTENT_CASE_STUDY_TYPE.CATEGORIES).includes(
    category as ContentCaseStudyTypeCategory
  );
}

export function contentCaseStudyTypeIsValidScope(
  scope: string
): scope is ContentCaseStudyTypeScope {
  return Object.values(CONTENT_CASE_STUDY_TYPE.SCOPES).includes(scope as ContentCaseStudyTypeScope);
}

export function contentCaseStudyTypeIsValidAudience(
  audience: string
): audience is ContentCaseStudyTypeAudience {
  return Object.values(CONTENT_CASE_STUDY_TYPE.AUDIENCES).includes(
    audience as ContentCaseStudyTypeAudience
  );
}
