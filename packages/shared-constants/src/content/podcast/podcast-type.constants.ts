/**
 * Podcast Type Constants
 * Types and classifications of podcasts
 */

export const CONTENT_PODCAST_TYPE = {
  // Podcast Categories
  CATEGORIES: {
    EDUCATIONAL: 'educational',
    ENTERTAINMENT: 'entertainment',
    BUSINESS: 'business',
    TECHNOLOGY: 'technology',
    HEALTH: 'health',
    LIFESTYLE: 'lifestyle',
    NEWS: 'news',
    TRUE_CRIME: 'true_crime',
    HISTORY: 'history',
    SCIENCE: 'science',
    FICTION: 'fiction',
    COMEDY: 'comedy',
    INTERVIEW: 'interview',
    CUSTOM: 'custom',
  } as const,

  // Podcast Sub-Types
  SUB_TYPES: {
    // Educational
    LECTURE: 'lecture',
    COURSE: 'course',
    WORKSHOP: 'workshop',

    // Entertainment
    STORY: 'story',
    SERIES: 'series',
    DRAMA: 'drama',

    // Business
    ENTREPRENEUR: 'entrepreneur',
    LEADERSHIP: 'leadership',
    MANAGEMENT: 'management',
    FINANCE: 'finance',

    // Technology
    TECH_NEWS: 'tech_news',
    PRODUCT_REVIEW: 'product_review',
    DEVELOPMENT: 'development',

    // Health
    WELLNESS: 'wellness',
    FITNESS: 'fitness',
    NUTRITION: 'nutrition',
    MENTAL_HEALTH: 'mental_health',

    // Lifestyle
    TRAVEL: 'travel',
    FOOD: 'food',
    FASHION: 'fashion',
    CULTURE: 'culture',

    // News
    DAILY_NEWS: 'daily_news',
    WEEKLY_DIGEST: 'weekly_digest',
    BREAKING: 'breaking',

    // Custom
    CUSTOM: 'custom',
  } as const,

  // Podcast Scopes
  SCOPES: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    NATIONAL: 'national',
    CUSTOM: 'custom',
  } as const,

  // Podcast Audiences
  AUDIENCES: {
    GENERAL: 'general',
    PROFESSIONAL: 'professional',
    ACADEMIC: 'academic',
    ENTHUSIAST: 'enthusiast',
    BEGINNER: 'beginner',
    EXPERT: 'expert',
    CUSTOM: 'custom',
  } as const,

  // Podcast Complexity
  COMPLEXITY: {
    BASIC: 'basic',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
  } as const,

  // Podcast Production Quality
  PRODUCTION_QUALITY: {
    INDIE: 'indie',
    PROFESSIONAL: 'professional',
    STUDIO: 'studio',
    PREMIUM: 'premium',
    CUSTOM: 'custom',
  } as const,

  // Podcast Languages
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

// Podcast Categories
export type ContentPodcastTypeCategory =
  (typeof CONTENT_PODCAST_TYPE.CATEGORIES)[keyof typeof CONTENT_PODCAST_TYPE.CATEGORIES];

// Podcast Sub-Types
export type ContentPodcastTypeSubType =
  (typeof CONTENT_PODCAST_TYPE.SUB_TYPES)[keyof typeof CONTENT_PODCAST_TYPE.SUB_TYPES];

// Podcast Scopes
export type ContentPodcastTypeScope =
  (typeof CONTENT_PODCAST_TYPE.SCOPES)[keyof typeof CONTENT_PODCAST_TYPE.SCOPES];

// Podcast Audiences
export type ContentPodcastTypeAudience =
  (typeof CONTENT_PODCAST_TYPE.AUDIENCES)[keyof typeof CONTENT_PODCAST_TYPE.AUDIENCES];

// Podcast Complexity
export type ContentPodcastTypeComplexity =
  (typeof CONTENT_PODCAST_TYPE.COMPLEXITY)[keyof typeof CONTENT_PODCAST_TYPE.COMPLEXITY];

// Podcast Production Quality
export type ContentPodcastTypeProductionQuality =
  (typeof CONTENT_PODCAST_TYPE.PRODUCTION_QUALITY)[keyof typeof CONTENT_PODCAST_TYPE.PRODUCTION_QUALITY];

// Podcast Languages
export type ContentPodcastTypeLanguage =
  (typeof CONTENT_PODCAST_TYPE.LANGUAGES)[keyof typeof CONTENT_PODCAST_TYPE.LANGUAGES];

// Utility Functions
export function contentPodcastTypeGetCategoryLabel(category: ContentPodcastTypeCategory): string {
  const labels: Record<ContentPodcastTypeCategory, string> = {
    [CONTENT_PODCAST_TYPE.CATEGORIES.EDUCATIONAL]: 'Educational Podcast',
    [CONTENT_PODCAST_TYPE.CATEGORIES.ENTERTAINMENT]: 'Entertainment Podcast',
    [CONTENT_PODCAST_TYPE.CATEGORIES.BUSINESS]: 'Business Podcast',
    [CONTENT_PODCAST_TYPE.CATEGORIES.TECHNOLOGY]: 'Technology Podcast',
    [CONTENT_PODCAST_TYPE.CATEGORIES.HEALTH]: 'Health Podcast',
    [CONTENT_PODCAST_TYPE.CATEGORIES.LIFESTYLE]: 'Lifestyle Podcast',
    [CONTENT_PODCAST_TYPE.CATEGORIES.NEWS]: 'News Podcast',
    [CONTENT_PODCAST_TYPE.CATEGORIES.TRUE_CRIME]: 'True Crime Podcast',
    [CONTENT_PODCAST_TYPE.CATEGORIES.HISTORY]: 'History Podcast',
    [CONTENT_PODCAST_TYPE.CATEGORIES.SCIENCE]: 'Science Podcast',
    [CONTENT_PODCAST_TYPE.CATEGORIES.FICTION]: 'Fiction Podcast',
    [CONTENT_PODCAST_TYPE.CATEGORIES.COMEDY]: 'Comedy Podcast',
    [CONTENT_PODCAST_TYPE.CATEGORIES.INTERVIEW]: 'Interview Podcast',
    [CONTENT_PODCAST_TYPE.CATEGORIES.CUSTOM]: 'Custom Podcast',
  };
  return labels[category] || 'Unknown Category';
}

export function contentPodcastTypeGetSubTypeLabel(subType: ContentPodcastTypeSubType): string {
  const labels: Record<ContentPodcastTypeSubType, string> = {
    // Educational
    [CONTENT_PODCAST_TYPE.SUB_TYPES.LECTURE]: 'Lecture',
    [CONTENT_PODCAST_TYPE.SUB_TYPES.COURSE]: 'Course',
    [CONTENT_PODCAST_TYPE.SUB_TYPES.WORKSHOP]: 'Workshop',

    // Entertainment
    [CONTENT_PODCAST_TYPE.SUB_TYPES.STORY]: 'Story',
    [CONTENT_PODCAST_TYPE.SUB_TYPES.SERIES]: 'Series',
    [CONTENT_PODCAST_TYPE.SUB_TYPES.DRAMA]: 'Drama',

    // Business
    [CONTENT_PODCAST_TYPE.SUB_TYPES.ENTREPRENEUR]: 'Entrepreneur',
    [CONTENT_PODCAST_TYPE.SUB_TYPES.LEADERSHIP]: 'Leadership',
    [CONTENT_PODCAST_TYPE.SUB_TYPES.MANAGEMENT]: 'Management',
    [CONTENT_PODCAST_TYPE.SUB_TYPES.FINANCE]: 'Finance',

    // Technology
    [CONTENT_PODCAST_TYPE.SUB_TYPES.TECH_NEWS]: 'Tech News',
    [CONTENT_PODCAST_TYPE.SUB_TYPES.PRODUCT_REVIEW]: 'Product Review',
    [CONTENT_PODCAST_TYPE.SUB_TYPES.DEVELOPMENT]: 'Development',

    // Health
    [CONTENT_PODCAST_TYPE.SUB_TYPES.WELLNESS]: 'Wellness',
    [CONTENT_PODCAST_TYPE.SUB_TYPES.FITNESS]: 'Fitness',
    [CONTENT_PODCAST_TYPE.SUB_TYPES.NUTRITION]: 'Nutrition',
    [CONTENT_PODCAST_TYPE.SUB_TYPES.MENTAL_HEALTH]: 'Mental Health',

    // Lifestyle
    [CONTENT_PODCAST_TYPE.SUB_TYPES.TRAVEL]: 'Travel',
    [CONTENT_PODCAST_TYPE.SUB_TYPES.FOOD]: 'Food',
    [CONTENT_PODCAST_TYPE.SUB_TYPES.FASHION]: 'Fashion',
    [CONTENT_PODCAST_TYPE.SUB_TYPES.CULTURE]: 'Culture',

    // News
    [CONTENT_PODCAST_TYPE.SUB_TYPES.DAILY_NEWS]: 'Daily News',
    [CONTENT_PODCAST_TYPE.SUB_TYPES.WEEKLY_DIGEST]: 'Weekly Digest',
    [CONTENT_PODCAST_TYPE.SUB_TYPES.BREAKING]: 'Breaking News',

    // Custom
    [CONTENT_PODCAST_TYPE.SUB_TYPES.CUSTOM]: 'Custom Sub-Type',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function contentPodcastTypeGetScopeLabel(scope: ContentPodcastTypeScope): string {
  const labels: Record<ContentPodcastTypeScope, string> = {
    [CONTENT_PODCAST_TYPE.SCOPES.GLOBAL]: 'Global',
    [CONTENT_PODCAST_TYPE.SCOPES.REGIONAL]: 'Regional',
    [CONTENT_PODCAST_TYPE.SCOPES.LOCAL]: 'Local',
    [CONTENT_PODCAST_TYPE.SCOPES.NATIONAL]: 'National',
    [CONTENT_PODCAST_TYPE.SCOPES.CUSTOM]: 'Custom Scope',
  };
  return labels[scope] || 'Unknown Scope';
}

export function contentPodcastTypeGetAudienceLabel(audience: ContentPodcastTypeAudience): string {
  const labels: Record<ContentPodcastTypeAudience, string> = {
    [CONTENT_PODCAST_TYPE.AUDIENCES.GENERAL]: 'General',
    [CONTENT_PODCAST_TYPE.AUDIENCES.PROFESSIONAL]: 'Professional',
    [CONTENT_PODCAST_TYPE.AUDIENCES.ACADEMIC]: 'Academic',
    [CONTENT_PODCAST_TYPE.AUDIENCES.ENTHUSIAST]: 'Enthusiast',
    [CONTENT_PODCAST_TYPE.AUDIENCES.BEGINNER]: 'Beginner',
    [CONTENT_PODCAST_TYPE.AUDIENCES.EXPERT]: 'Expert',
    [CONTENT_PODCAST_TYPE.AUDIENCES.CUSTOM]: 'Custom Audience',
  };
  return labels[audience] || 'Unknown Audience';
}

export function contentPodcastTypeGetComplexityLabel(
  complexity: ContentPodcastTypeComplexity
): string {
  const labels: Record<ContentPodcastTypeComplexity, string> = {
    [CONTENT_PODCAST_TYPE.COMPLEXITY.BASIC]: 'Basic',
    [CONTENT_PODCAST_TYPE.COMPLEXITY.INTERMEDIATE]: 'Intermediate',
    [CONTENT_PODCAST_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
    [CONTENT_PODCAST_TYPE.COMPLEXITY.EXPERT]: 'Expert',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function contentPodcastTypeGetProductionQualityLabel(
  quality: ContentPodcastTypeProductionQuality
): string {
  const labels: Record<ContentPodcastTypeProductionQuality, string> = {
    [CONTENT_PODCAST_TYPE.PRODUCTION_QUALITY.INDIE]: 'Indie',
    [CONTENT_PODCAST_TYPE.PRODUCTION_QUALITY.PROFESSIONAL]: 'Professional',
    [CONTENT_PODCAST_TYPE.PRODUCTION_QUALITY.STUDIO]: 'Studio',
    [CONTENT_PODCAST_TYPE.PRODUCTION_QUALITY.PREMIUM]: 'Premium',
    [CONTENT_PODCAST_TYPE.PRODUCTION_QUALITY.CUSTOM]: 'Custom Quality',
  };
  return labels[quality] || 'Unknown Quality';
}

export function contentPodcastTypeGetLanguageLabel(language: ContentPodcastTypeLanguage): string {
  const labels: Record<ContentPodcastTypeLanguage, string> = {
    [CONTENT_PODCAST_TYPE.LANGUAGES.EN]: 'English',
    [CONTENT_PODCAST_TYPE.LANGUAGES.BN]: 'Bengali',
    [CONTENT_PODCAST_TYPE.LANGUAGES.HI]: 'Hindi',
    [CONTENT_PODCAST_TYPE.LANGUAGES.AR]: 'Arabic',
    [CONTENT_PODCAST_TYPE.LANGUAGES.ES]: 'Spanish',
    [CONTENT_PODCAST_TYPE.LANGUAGES.FR]: 'French',
    [CONTENT_PODCAST_TYPE.LANGUAGES.DE]: 'German',
    [CONTENT_PODCAST_TYPE.LANGUAGES.ZH]: 'Chinese',
    [CONTENT_PODCAST_TYPE.LANGUAGES.JA]: 'Japanese',
    [CONTENT_PODCAST_TYPE.LANGUAGES.RU]: 'Russian',
    [CONTENT_PODCAST_TYPE.LANGUAGES.PT]: 'Portuguese',
    [CONTENT_PODCAST_TYPE.LANGUAGES.IT]: 'Italian',
  };
  return labels[language] || 'Unknown Language';
}

export function contentPodcastTypeIsValidCategory(
  category: string
): category is ContentPodcastTypeCategory {
  return Object.values(CONTENT_PODCAST_TYPE.CATEGORIES).includes(
    category as ContentPodcastTypeCategory
  );
}

export function contentPodcastTypeIsValidScope(scope: string): scope is ContentPodcastTypeScope {
  return Object.values(CONTENT_PODCAST_TYPE.SCOPES).includes(scope as ContentPodcastTypeScope);
}

export function contentPodcastTypeIsValidAudience(
  audience: string
): audience is ContentPodcastTypeAudience {
  return Object.values(CONTENT_PODCAST_TYPE.AUDIENCES).includes(
    audience as ContentPodcastTypeAudience
  );
}
