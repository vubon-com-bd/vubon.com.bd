/**
 * Video Type Constants
 * Types and classifications of videos
 */

export const CONTENT_VIDEO_TYPE = {
  // Video Categories
  CATEGORIES: {
    EDUCATIONAL: 'educational',
    ENTERTAINMENT: 'entertainment',
    MARKETING: 'marketing',
    TECHNICAL: 'technical',
    BUSINESS: 'business',
    PROMOTIONAL: 'promotional',
    TESTIMONIAL: 'testimonial',
    TUTORIAL: 'tutorial',
    DEMO: 'demo',
    EVENT: 'event',
    INTERVIEW: 'interview',
    DOCUMENTARY: 'documentary',
    CUSTOM: 'custom',
  } as const,

  // Video Sub-Types
  SUB_TYPES: {
    // Educational
    LECTURE: 'lecture',
    COURSE: 'course',
    WORKSHOP: 'workshop',
    SEMINAR: 'seminar',

    // Entertainment
    SHORT: 'short',
    FEATURE: 'feature',
    SERIES: 'series',
    CLIP: 'clip',

    // Marketing
    AD: 'ad',
    PROMO: 'promo',
    EXPLAINER: 'explainer',
    PRODUCT_SHOWCASE: 'product_showcase',

    // Technical
    SCREENCAST: 'screencast',
    CODE_DEMO: 'code_demo',
    TROUBLESHOOTING: 'troubleshooting',

    // Business
    PRESENTATION: 'presentation',
    MEETING: 'meeting',
    WEBINAR: 'webinar',

    // Custom
    CUSTOM: 'custom',
  } as const,

  // Video Scopes
  SCOPES: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    TEAM: 'team',
    DEPARTMENT: 'department',
    CUSTOM: 'custom',
  } as const,

  // Video Audiences
  AUDIENCES: {
    PUBLIC: 'public',
    TEAM: 'team',
    CLIENTS: 'clients',
    PARTNERS: 'partners',
    EMPLOYEES: 'employees',
    STUDENTS: 'students',
    CUSTOM: 'custom',
  } as const,

  // Video Complexity
  COMPLEXITY: {
    BASIC: 'basic',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
  } as const,

  // Video Quality
  QUALITY: {
    STANDARD: 'standard',
    PREMIUM: 'premium',
    PROFESSIONAL: 'professional',
    CUSTOM: 'custom',
  } as const,

  // Video Languages
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
} as const;

// Video Categories
export type ContentVideoTypeCategory =
  (typeof CONTENT_VIDEO_TYPE.CATEGORIES)[keyof typeof CONTENT_VIDEO_TYPE.CATEGORIES];

// Video Sub-Types
export type ContentVideoTypeSubType =
  (typeof CONTENT_VIDEO_TYPE.SUB_TYPES)[keyof typeof CONTENT_VIDEO_TYPE.SUB_TYPES];

// Video Scopes
export type ContentVideoTypeScope =
  (typeof CONTENT_VIDEO_TYPE.SCOPES)[keyof typeof CONTENT_VIDEO_TYPE.SCOPES];

// Video Audiences
export type ContentVideoTypeAudience =
  (typeof CONTENT_VIDEO_TYPE.AUDIENCES)[keyof typeof CONTENT_VIDEO_TYPE.AUDIENCES];

// Video Complexity
export type ContentVideoTypeComplexity =
  (typeof CONTENT_VIDEO_TYPE.COMPLEXITY)[keyof typeof CONTENT_VIDEO_TYPE.COMPLEXITY];

// Video Quality
export type ContentVideoTypeQuality =
  (typeof CONTENT_VIDEO_TYPE.QUALITY)[keyof typeof CONTENT_VIDEO_TYPE.QUALITY];

// Video Languages
export type ContentVideoTypeLanguage =
  (typeof CONTENT_VIDEO_TYPE.LANGUAGES)[keyof typeof CONTENT_VIDEO_TYPE.LANGUAGES];

// Utility Functions
export function contentVideoTypeGetCategoryLabel(category: ContentVideoTypeCategory): string {
  const labels: Record<ContentVideoTypeCategory, string> = {
    [CONTENT_VIDEO_TYPE.CATEGORIES.EDUCATIONAL]: 'Educational Video',
    [CONTENT_VIDEO_TYPE.CATEGORIES.ENTERTAINMENT]: 'Entertainment Video',
    [CONTENT_VIDEO_TYPE.CATEGORIES.MARKETING]: 'Marketing Video',
    [CONTENT_VIDEO_TYPE.CATEGORIES.TECHNICAL]: 'Technical Video',
    [CONTENT_VIDEO_TYPE.CATEGORIES.BUSINESS]: 'Business Video',
    [CONTENT_VIDEO_TYPE.CATEGORIES.PROMOTIONAL]: 'Promotional Video',
    [CONTENT_VIDEO_TYPE.CATEGORIES.TESTIMONIAL]: 'Testimonial Video',
    [CONTENT_VIDEO_TYPE.CATEGORIES.TUTORIAL]: 'Tutorial Video',
    [CONTENT_VIDEO_TYPE.CATEGORIES.DEMO]: 'Demo Video',
    [CONTENT_VIDEO_TYPE.CATEGORIES.EVENT]: 'Event Video',
    [CONTENT_VIDEO_TYPE.CATEGORIES.INTERVIEW]: 'Interview Video',
    [CONTENT_VIDEO_TYPE.CATEGORIES.DOCUMENTARY]: 'Documentary Video',
    [CONTENT_VIDEO_TYPE.CATEGORIES.CUSTOM]: 'Custom Video',
  };
  return labels[category] || 'Unknown Category';
}

export function contentVideoTypeGetSubTypeLabel(subType: ContentVideoTypeSubType): string {
  const labels: Record<ContentVideoTypeSubType, string> = {
    // Educational
    [CONTENT_VIDEO_TYPE.SUB_TYPES.LECTURE]: 'Lecture',
    [CONTENT_VIDEO_TYPE.SUB_TYPES.COURSE]: 'Course',
    [CONTENT_VIDEO_TYPE.SUB_TYPES.WORKSHOP]: 'Workshop',
    [CONTENT_VIDEO_TYPE.SUB_TYPES.SEMINAR]: 'Seminar',

    // Entertainment
    [CONTENT_VIDEO_TYPE.SUB_TYPES.SHORT]: 'Short Film',
    [CONTENT_VIDEO_TYPE.SUB_TYPES.FEATURE]: 'Feature Film',
    [CONTENT_VIDEO_TYPE.SUB_TYPES.SERIES]: 'Video Series',
    [CONTENT_VIDEO_TYPE.SUB_TYPES.CLIP]: 'Video Clip',

    // Marketing
    [CONTENT_VIDEO_TYPE.SUB_TYPES.AD]: 'Advertisement',
    [CONTENT_VIDEO_TYPE.SUB_TYPES.PROMO]: 'Promotional Video',
    [CONTENT_VIDEO_TYPE.SUB_TYPES.EXPLAINER]: 'Explainer Video',
    [CONTENT_VIDEO_TYPE.SUB_TYPES.PRODUCT_SHOWCASE]: 'Product Showcase',

    // Technical
    [CONTENT_VIDEO_TYPE.SUB_TYPES.SCREENCAST]: 'Screencast',
    [CONTENT_VIDEO_TYPE.SUB_TYPES.CODE_DEMO]: 'Code Demo',
    [CONTENT_VIDEO_TYPE.SUB_TYPES.TROUBLESHOOTING]: 'Troubleshooting',

    // Business
    [CONTENT_VIDEO_TYPE.SUB_TYPES.PRESENTATION]: 'Presentation',
    [CONTENT_VIDEO_TYPE.SUB_TYPES.MEETING]: 'Meeting Recording',
    [CONTENT_VIDEO_TYPE.SUB_TYPES.WEBINAR]: 'Webinar',

    // Custom
    [CONTENT_VIDEO_TYPE.SUB_TYPES.CUSTOM]: 'Custom Sub-Type',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function contentVideoTypeGetScopeLabel(scope: ContentVideoTypeScope): string {
  const labels: Record<ContentVideoTypeScope, string> = {
    [CONTENT_VIDEO_TYPE.SCOPES.GLOBAL]: 'Global',
    [CONTENT_VIDEO_TYPE.SCOPES.REGIONAL]: 'Regional',
    [CONTENT_VIDEO_TYPE.SCOPES.LOCAL]: 'Local',
    [CONTENT_VIDEO_TYPE.SCOPES.TEAM]: 'Team',
    [CONTENT_VIDEO_TYPE.SCOPES.DEPARTMENT]: 'Department',
    [CONTENT_VIDEO_TYPE.SCOPES.CUSTOM]: 'Custom Scope',
  };
  return labels[scope] || 'Unknown Scope';
}

export function contentVideoTypeGetAudienceLabel(audience: ContentVideoTypeAudience): string {
  const labels: Record<ContentVideoTypeAudience, string> = {
    [CONTENT_VIDEO_TYPE.AUDIENCES.PUBLIC]: 'Public',
    [CONTENT_VIDEO_TYPE.AUDIENCES.TEAM]: 'Team',
    [CONTENT_VIDEO_TYPE.AUDIENCES.CLIENTS]: 'Clients',
    [CONTENT_VIDEO_TYPE.AUDIENCES.PARTNERS]: 'Partners',
    [CONTENT_VIDEO_TYPE.AUDIENCES.EMPLOYEES]: 'Employees',
    [CONTENT_VIDEO_TYPE.AUDIENCES.STUDENTS]: 'Students',
    [CONTENT_VIDEO_TYPE.AUDIENCES.CUSTOM]: 'Custom Audience',
  };
  return labels[audience] || 'Unknown Audience';
}

export function contentVideoTypeGetComplexityLabel(complexity: ContentVideoTypeComplexity): string {
  const labels: Record<ContentVideoTypeComplexity, string> = {
    [CONTENT_VIDEO_TYPE.COMPLEXITY.BASIC]: 'Basic',
    [CONTENT_VIDEO_TYPE.COMPLEXITY.INTERMEDIATE]: 'Intermediate',
    [CONTENT_VIDEO_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
    [CONTENT_VIDEO_TYPE.COMPLEXITY.EXPERT]: 'Expert',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function contentVideoTypeGetQualityLabel(quality: ContentVideoTypeQuality): string {
  const labels: Record<ContentVideoTypeQuality, string> = {
    [CONTENT_VIDEO_TYPE.QUALITY.STANDARD]: 'Standard',
    [CONTENT_VIDEO_TYPE.QUALITY.PREMIUM]: 'Premium',
    [CONTENT_VIDEO_TYPE.QUALITY.PROFESSIONAL]: 'Professional',
    [CONTENT_VIDEO_TYPE.QUALITY.CUSTOM]: 'Custom Quality',
  };
  return labels[quality] || 'Unknown Quality';
}

export function contentVideoTypeGetLanguageLabel(language: ContentVideoTypeLanguage): string {
  const labels: Record<ContentVideoTypeLanguage, string> = {
    [CONTENT_VIDEO_TYPE.LANGUAGES.EN]: 'English',
    [CONTENT_VIDEO_TYPE.LANGUAGES.BN]: 'Bengali',
    [CONTENT_VIDEO_TYPE.LANGUAGES.HI]: 'Hindi',
    [CONTENT_VIDEO_TYPE.LANGUAGES.AR]: 'Arabic',
    [CONTENT_VIDEO_TYPE.LANGUAGES.ES]: 'Spanish',
    [CONTENT_VIDEO_TYPE.LANGUAGES.FR]: 'French',
    [CONTENT_VIDEO_TYPE.LANGUAGES.DE]: 'German',
    [CONTENT_VIDEO_TYPE.LANGUAGES.ZH]: 'Chinese',
    [CONTENT_VIDEO_TYPE.LANGUAGES.JA]: 'Japanese',
    [CONTENT_VIDEO_TYPE.LANGUAGES.RU]: 'Russian',
    [CONTENT_VIDEO_TYPE.LANGUAGES.PT]: 'Portuguese',
    [CONTENT_VIDEO_TYPE.LANGUAGES.IT]: 'Italian',
  };
  return labels[language] || 'Unknown Language';
}

export function contentVideoTypeIsValidCategory(
  category: string
): category is ContentVideoTypeCategory {
  return Object.values(CONTENT_VIDEO_TYPE.CATEGORIES).includes(
    category as ContentVideoTypeCategory
  );
}

export function contentVideoTypeIsValidScope(scope: string): scope is ContentVideoTypeScope {
  return Object.values(CONTENT_VIDEO_TYPE.SCOPES).includes(scope as ContentVideoTypeScope);
}

export function contentVideoTypeIsValidAudience(
  audience: string
): audience is ContentVideoTypeAudience {
  return Object.values(CONTENT_VIDEO_TYPE.AUDIENCES).includes(audience as ContentVideoTypeAudience);
}
