/**
 * White Paper Type Constants
 * Types and classifications of white papers
 */

export const CONTENT_WHITE_PAPER_TYPE = {
  // White Paper Categories
  CATEGORIES: {
    TECHNICAL: 'technical',
    BUSINESS: 'business',
    ACADEMIC: 'academic',
    INDUSTRY: 'industry',
    GOVERNMENT: 'government',
    NON_PROFIT: 'non_profit',
    CUSTOM: 'custom',
  } as const,

  // White Paper Sub-Types
  SUB_TYPES: {
    // Technical
    TECHNOLOGY_OVERVIEW: 'technology_overview',
    ARCHITECTURE: 'architecture',
    IMPLEMENTATION: 'implementation',
    PERFORMANCE: 'performance',
    SECURITY: 'security',

    // Business
    MARKET_ANALYSIS: 'market_analysis',
    BUSINESS_CASE: 'business_case',
    ROI_ANALYSIS: 'roi_analysis',
    COMPETITIVE_ANALYSIS: 'competitive_analysis',

    // Academic
    RESEARCH: 'research',
    STUDY: 'study',
    ANALYSIS: 'analysis',
    REVIEW: 'review',

    // Industry
    TREND_ANALYSIS: 'trend_analysis',
    INDUSTRY_REPORT: 'industry_report',
    REGULATORY: 'regulatory',

    // Custom
    CUSTOM: 'custom',
  } as const,

  // White Paper Scopes
  SCOPES: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    NATIONAL: 'national',
    LOCAL: 'local',
    INDUSTRY: 'industry',
    SECTOR: 'sector',
    CUSTOM: 'custom',
  } as const,

  // White Paper Audiences
  AUDIENCES: {
    TECHNICAL: 'technical',
    BUSINESS: 'business',
    EXECUTIVE: 'executive',
    ACADEMIC: 'academic',
    INDUSTRY: 'industry',
    GENERAL: 'general',
    CUSTOM: 'custom',
  } as const,

  // White Paper Complexity
  COMPLEXITY: {
    BASIC: 'basic',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
  } as const,

  // White Paper Quality
  QUALITY: {
    STANDARD: 'standard',
    PREMIUM: 'premium',
    FEATURED: 'featured',
    CERTIFIED: 'certified',
    CUSTOM: 'custom',
  } as const,

  // White Paper Languages
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

// White Paper Categories
export type ContentWhitePaperTypeCategory =
  (typeof CONTENT_WHITE_PAPER_TYPE.CATEGORIES)[keyof typeof CONTENT_WHITE_PAPER_TYPE.CATEGORIES];

// White Paper Sub-Types
export type ContentWhitePaperTypeSubType =
  (typeof CONTENT_WHITE_PAPER_TYPE.SUB_TYPES)[keyof typeof CONTENT_WHITE_PAPER_TYPE.SUB_TYPES];

// White Paper Scopes
export type ContentWhitePaperTypeScope =
  (typeof CONTENT_WHITE_PAPER_TYPE.SCOPES)[keyof typeof CONTENT_WHITE_PAPER_TYPE.SCOPES];

// White Paper Audiences
export type ContentWhitePaperTypeAudience =
  (typeof CONTENT_WHITE_PAPER_TYPE.AUDIENCES)[keyof typeof CONTENT_WHITE_PAPER_TYPE.AUDIENCES];

// White Paper Complexity
export type ContentWhitePaperTypeComplexity =
  (typeof CONTENT_WHITE_PAPER_TYPE.COMPLEXITY)[keyof typeof CONTENT_WHITE_PAPER_TYPE.COMPLEXITY];

// White Paper Quality
export type ContentWhitePaperTypeQuality =
  (typeof CONTENT_WHITE_PAPER_TYPE.QUALITY)[keyof typeof CONTENT_WHITE_PAPER_TYPE.QUALITY];

// White Paper Languages
export type ContentWhitePaperTypeLanguage =
  (typeof CONTENT_WHITE_PAPER_TYPE.LANGUAGES)[keyof typeof CONTENT_WHITE_PAPER_TYPE.LANGUAGES];

// Utility Functions
export function contentWhitePaperTypeGetCategoryLabel(
  category: ContentWhitePaperTypeCategory
): string {
  const labels: Record<ContentWhitePaperTypeCategory, string> = {
    [CONTENT_WHITE_PAPER_TYPE.CATEGORIES.TECHNICAL]: 'Technical White Paper',
    [CONTENT_WHITE_PAPER_TYPE.CATEGORIES.BUSINESS]: 'Business White Paper',
    [CONTENT_WHITE_PAPER_TYPE.CATEGORIES.ACADEMIC]: 'Academic White Paper',
    [CONTENT_WHITE_PAPER_TYPE.CATEGORIES.INDUSTRY]: 'Industry White Paper',
    [CONTENT_WHITE_PAPER_TYPE.CATEGORIES.GOVERNMENT]: 'Government White Paper',
    [CONTENT_WHITE_PAPER_TYPE.CATEGORIES.NON_PROFIT]: 'Non-Profit White Paper',
    [CONTENT_WHITE_PAPER_TYPE.CATEGORIES.CUSTOM]: 'Custom White Paper',
  };
  return labels[category] || 'Unknown Category';
}

export function contentWhitePaperTypeGetSubTypeLabel(
  subType: ContentWhitePaperTypeSubType
): string {
  const labels: Record<ContentWhitePaperTypeSubType, string> = {
    // Technical
    [CONTENT_WHITE_PAPER_TYPE.SUB_TYPES.TECHNOLOGY_OVERVIEW]: 'Technology Overview',
    [CONTENT_WHITE_PAPER_TYPE.SUB_TYPES.ARCHITECTURE]: 'Architecture',
    [CONTENT_WHITE_PAPER_TYPE.SUB_TYPES.IMPLEMENTATION]: 'Implementation',
    [CONTENT_WHITE_PAPER_TYPE.SUB_TYPES.PERFORMANCE]: 'Performance',
    [CONTENT_WHITE_PAPER_TYPE.SUB_TYPES.SECURITY]: 'Security',

    // Business
    [CONTENT_WHITE_PAPER_TYPE.SUB_TYPES.MARKET_ANALYSIS]: 'Market Analysis',
    [CONTENT_WHITE_PAPER_TYPE.SUB_TYPES.BUSINESS_CASE]: 'Business Case',
    [CONTENT_WHITE_PAPER_TYPE.SUB_TYPES.ROI_ANALYSIS]: 'ROI Analysis',
    [CONTENT_WHITE_PAPER_TYPE.SUB_TYPES.COMPETITIVE_ANALYSIS]: 'Competitive Analysis',

    // Academic
    [CONTENT_WHITE_PAPER_TYPE.SUB_TYPES.RESEARCH]: 'Research',
    [CONTENT_WHITE_PAPER_TYPE.SUB_TYPES.STUDY]: 'Study',
    [CONTENT_WHITE_PAPER_TYPE.SUB_TYPES.ANALYSIS]: 'Analysis',
    [CONTENT_WHITE_PAPER_TYPE.SUB_TYPES.REVIEW]: 'Review',

    // Industry
    [CONTENT_WHITE_PAPER_TYPE.SUB_TYPES.TREND_ANALYSIS]: 'Trend Analysis',
    [CONTENT_WHITE_PAPER_TYPE.SUB_TYPES.INDUSTRY_REPORT]: 'Industry Report',
    [CONTENT_WHITE_PAPER_TYPE.SUB_TYPES.REGULATORY]: 'Regulatory',

    // Custom
    [CONTENT_WHITE_PAPER_TYPE.SUB_TYPES.CUSTOM]: 'Custom Sub-Type',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function contentWhitePaperTypeGetScopeLabel(scope: ContentWhitePaperTypeScope): string {
  const labels: Record<ContentWhitePaperTypeScope, string> = {
    [CONTENT_WHITE_PAPER_TYPE.SCOPES.GLOBAL]: 'Global',
    [CONTENT_WHITE_PAPER_TYPE.SCOPES.REGIONAL]: 'Regional',
    [CONTENT_WHITE_PAPER_TYPE.SCOPES.NATIONAL]: 'National',
    [CONTENT_WHITE_PAPER_TYPE.SCOPES.LOCAL]: 'Local',
    [CONTENT_WHITE_PAPER_TYPE.SCOPES.INDUSTRY]: 'Industry',
    [CONTENT_WHITE_PAPER_TYPE.SCOPES.SECTOR]: 'Sector',
    [CONTENT_WHITE_PAPER_TYPE.SCOPES.CUSTOM]: 'Custom Scope',
  };
  return labels[scope] || 'Unknown Scope';
}

export function contentWhitePaperTypeGetAudienceLabel(
  audience: ContentWhitePaperTypeAudience
): string {
  const labels: Record<ContentWhitePaperTypeAudience, string> = {
    [CONTENT_WHITE_PAPER_TYPE.AUDIENCES.TECHNICAL]: 'Technical Audience',
    [CONTENT_WHITE_PAPER_TYPE.AUDIENCES.BUSINESS]: 'Business Audience',
    [CONTENT_WHITE_PAPER_TYPE.AUDIENCES.EXECUTIVE]: 'Executive Audience',
    [CONTENT_WHITE_PAPER_TYPE.AUDIENCES.ACADEMIC]: 'Academic Audience',
    [CONTENT_WHITE_PAPER_TYPE.AUDIENCES.INDUSTRY]: 'Industry Audience',
    [CONTENT_WHITE_PAPER_TYPE.AUDIENCES.GENERAL]: 'General Audience',
    [CONTENT_WHITE_PAPER_TYPE.AUDIENCES.CUSTOM]: 'Custom Audience',
  };
  return labels[audience] || 'Unknown Audience';
}

export function contentWhitePaperTypeGetComplexityLabel(
  complexity: ContentWhitePaperTypeComplexity
): string {
  const labels: Record<ContentWhitePaperTypeComplexity, string> = {
    [CONTENT_WHITE_PAPER_TYPE.COMPLEXITY.BASIC]: 'Basic',
    [CONTENT_WHITE_PAPER_TYPE.COMPLEXITY.INTERMEDIATE]: 'Intermediate',
    [CONTENT_WHITE_PAPER_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
    [CONTENT_WHITE_PAPER_TYPE.COMPLEXITY.EXPERT]: 'Expert',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function contentWhitePaperTypeGetQualityLabel(
  quality: ContentWhitePaperTypeQuality
): string {
  const labels: Record<ContentWhitePaperTypeQuality, string> = {
    [CONTENT_WHITE_PAPER_TYPE.QUALITY.STANDARD]: 'Standard',
    [CONTENT_WHITE_PAPER_TYPE.QUALITY.PREMIUM]: 'Premium',
    [CONTENT_WHITE_PAPER_TYPE.QUALITY.FEATURED]: 'Featured',
    [CONTENT_WHITE_PAPER_TYPE.QUALITY.CERTIFIED]: 'Certified',
    [CONTENT_WHITE_PAPER_TYPE.QUALITY.CUSTOM]: 'Custom Quality',
  };
  return labels[quality] || 'Unknown Quality';
}

export function contentWhitePaperTypeGetLanguageLabel(
  language: ContentWhitePaperTypeLanguage
): string {
  const labels: Record<ContentWhitePaperTypeLanguage, string> = {
    [CONTENT_WHITE_PAPER_TYPE.LANGUAGES.EN]: 'English',
    [CONTENT_WHITE_PAPER_TYPE.LANGUAGES.BN]: 'Bengali',
    [CONTENT_WHITE_PAPER_TYPE.LANGUAGES.HI]: 'Hindi',
    [CONTENT_WHITE_PAPER_TYPE.LANGUAGES.AR]: 'Arabic',
    [CONTENT_WHITE_PAPER_TYPE.LANGUAGES.ES]: 'Spanish',
    [CONTENT_WHITE_PAPER_TYPE.LANGUAGES.FR]: 'French',
    [CONTENT_WHITE_PAPER_TYPE.LANGUAGES.DE]: 'German',
    [CONTENT_WHITE_PAPER_TYPE.LANGUAGES.ZH]: 'Chinese',
    [CONTENT_WHITE_PAPER_TYPE.LANGUAGES.JA]: 'Japanese',
    [CONTENT_WHITE_PAPER_TYPE.LANGUAGES.RU]: 'Russian',
  };
  return labels[language] || 'Unknown Language';
}

export function contentWhitePaperTypeIsValidCategory(
  category: string
): category is ContentWhitePaperTypeCategory {
  return Object.values(CONTENT_WHITE_PAPER_TYPE.CATEGORIES).includes(
    category as ContentWhitePaperTypeCategory
  );
}

export function contentWhitePaperTypeIsValidScope(
  scope: string
): scope is ContentWhitePaperTypeScope {
  return Object.values(CONTENT_WHITE_PAPER_TYPE.SCOPES).includes(
    scope as ContentWhitePaperTypeScope
  );
}

export function contentWhitePaperTypeIsValidAudience(
  audience: string
): audience is ContentWhitePaperTypeAudience {
  return Object.values(CONTENT_WHITE_PAPER_TYPE.AUDIENCES).includes(
    audience as ContentWhitePaperTypeAudience
  );
}
