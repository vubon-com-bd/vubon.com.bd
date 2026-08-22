/**
 * SEO Keyword Type Constants
 * Types and classifications for keywords
 */

export const SEO_KEYWORD_TYPE = {
  // Keyword Categories
  CATEGORIES: {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TERTIARY: 'tertiary',
    SUPPORTING: 'supporting',
    RELATED: 'related',
    LSI: 'lsi',
    SEMANTIC: 'semantic',
    CONTEXTUAL: 'contextual',
  } as const,

  // Keyword Formats
  FORMATS: {
    SINGLE_WORD: 'single_word',
    TWO_WORD: 'two_word',
    THREE_WORD: 'three_word',
    FOUR_WORD: 'four_word',
    FIVE_PLUS: 'five_plus',
    PHRASE: 'phrase',
    QUESTION: 'question',
    COMPARISON: 'comparison',
    REVIEW: 'review_keyword',
    TUTORIAL: 'tutorial',
    GUIDE: 'guide',
    CHECKLIST: 'checklist',
    HOW_TO: 'how_to',
    BEST: 'best',
    TOP: 'top',
    VS: 'vs',
    ALTERNATIVE: 'alternative',
  } as const,

  // Keyword Modifiers
  MODIFIERS: {
    BEST: 'best',
    CHEAP: 'cheap',
    AFFORDABLE: 'affordable',
    DISCOUNT: 'discount',
    DEAL: 'deal',
    SALE: 'sale',
    FREE: 'free',
    NEW: 'new',
    TOP: 'top',
    REVIEW: 'review_modifier',
    COMPARISON: 'comparison',
    ALTERNATIVE: 'alternative',
    GUIDE: 'guide',
    TUTORIAL: 'tutorial',
    HOW_TO: 'how_to',
    TIPS: 'tips',
    IDEAS: 'ideas',
    EXAMPLES: 'examples',
    TEMPLATE: 'template',
    CHECKLIST: 'checklist',
    COURSE: 'course',
    TRAINING: 'training',
    CERTIFICATION: 'certification',
    ONLINE: 'online',
    NEAR_ME: 'near_me',
    LOCAL: 'local',
  } as const,

  // Keyword Types by Intent
  INTENT_TYPES: {
    INFORMATION: 'information',
    NAVIGATION: 'navigation',
    TRANSACTION: 'transaction',
    COMMERCIAL: 'commercial',
    LOCAL: 'local',
  } as const,

  // Keyword Score Types
  SCORE_TYPES: {
    RELEVANCE: 'relevance',
    OPPORTUNITY: 'opportunity',
    DIFFICULTY: 'difficulty',
    EASE: 'ease',
    EFFICIENCY: 'efficiency',
    OVERALL: 'overall',
  } as const,

  // Keyword Funnel Stages
  FUNNEL_STAGES: {
    TOP: 'top', // Awareness
    MIDDLE: 'middle', // Consideration
    BOTTOM: 'bottom', // Decision
    RETENTION: 'retention', // Retention
  } as const,

  // Keyword Seasonality
  SEASONALITY: {
    YEAR_ROUND: 'year_round',
    SPRING: 'spring',
    SUMMER: 'summer',
    AUTUMN: 'autumn',
    WINTER: 'winter',
    HOLIDAY: 'holiday',
    EVENT: 'event',
    TRENDING: 'trending',
  } as const,

  // Keyword Geographic Scope
  GEO_SCOPES: {
    GLOBAL: 'global',
    NATIONAL: 'national',
    REGIONAL: 'regional',
    CITY: 'city',
    LOCAL: 'local',
    NEIGHBORHOOD: 'neighborhood',
  } as const,
} as const;

// Keyword Categories
export type SEOKeywordTypeCategory =
  (typeof SEO_KEYWORD_TYPE.CATEGORIES)[keyof typeof SEO_KEYWORD_TYPE.CATEGORIES];

// Keyword Formats
export type SEOKeywordTypeFormat =
  (typeof SEO_KEYWORD_TYPE.FORMATS)[keyof typeof SEO_KEYWORD_TYPE.FORMATS];

// Keyword Modifiers
export type SEOKeywordTypeModifier =
  (typeof SEO_KEYWORD_TYPE.MODIFIERS)[keyof typeof SEO_KEYWORD_TYPE.MODIFIERS];

// Intent Types
export type SEOKeywordTypeIntent =
  (typeof SEO_KEYWORD_TYPE.INTENT_TYPES)[keyof typeof SEO_KEYWORD_TYPE.INTENT_TYPES];

// Score Types
export type SEOKeywordTypeScore =
  (typeof SEO_KEYWORD_TYPE.SCORE_TYPES)[keyof typeof SEO_KEYWORD_TYPE.SCORE_TYPES];

// Funnel Stages
export type SEOKeywordTypeFunnelStage =
  (typeof SEO_KEYWORD_TYPE.FUNNEL_STAGES)[keyof typeof SEO_KEYWORD_TYPE.FUNNEL_STAGES];

// Seasonality
export type SEOKeywordTypeSeasonality =
  (typeof SEO_KEYWORD_TYPE.SEASONALITY)[keyof typeof SEO_KEYWORD_TYPE.SEASONALITY];

// Geographic Scope
export type SEOKeywordTypeGeoScope =
  (typeof SEO_KEYWORD_TYPE.GEO_SCOPES)[keyof typeof SEO_KEYWORD_TYPE.GEO_SCOPES];

// Utility Functions
export function getSEOKeywordCategoryLabel(category: SEOKeywordTypeCategory): string {
  const labels: Record<SEOKeywordTypeCategory, string> = {
    [SEO_KEYWORD_TYPE.CATEGORIES.PRIMARY]: 'Primary Keywords',
    [SEO_KEYWORD_TYPE.CATEGORIES.SECONDARY]: 'Secondary Keywords',
    [SEO_KEYWORD_TYPE.CATEGORIES.TERTIARY]: 'Tertiary Keywords',
    [SEO_KEYWORD_TYPE.CATEGORIES.SUPPORTING]: 'Supporting Keywords',
    [SEO_KEYWORD_TYPE.CATEGORIES.RELATED]: 'Related Keywords',
    [SEO_KEYWORD_TYPE.CATEGORIES.LSI]: 'LSI Keywords',
    [SEO_KEYWORD_TYPE.CATEGORIES.SEMANTIC]: 'Semantic Keywords',
    [SEO_KEYWORD_TYPE.CATEGORIES.CONTEXTUAL]: 'Contextual Keywords',
  };
  return labels[category] || 'Unknown Category';
}

export function getSEOKeywordFormatLabel(format: SEOKeywordTypeFormat): string {
  const labels: Record<SEOKeywordTypeFormat, string> = {
    [SEO_KEYWORD_TYPE.FORMATS.SINGLE_WORD]: 'Single Word',
    [SEO_KEYWORD_TYPE.FORMATS.TWO_WORD]: 'Two Words',
    [SEO_KEYWORD_TYPE.FORMATS.THREE_WORD]: 'Three Words',
    [SEO_KEYWORD_TYPE.FORMATS.FOUR_WORD]: 'Four Words',
    [SEO_KEYWORD_TYPE.FORMATS.FIVE_PLUS]: 'Five+ Words',
    [SEO_KEYWORD_TYPE.FORMATS.PHRASE]: 'Phrase',
    [SEO_KEYWORD_TYPE.FORMATS.QUESTION]: 'Question',
    [SEO_KEYWORD_TYPE.FORMATS.COMPARISON]: 'Comparison',
    [SEO_KEYWORD_TYPE.FORMATS.REVIEW]: 'Review',
    [SEO_KEYWORD_TYPE.FORMATS.TUTORIAL]: 'Tutorial',
    [SEO_KEYWORD_TYPE.FORMATS.GUIDE]: 'Guide',
    [SEO_KEYWORD_TYPE.FORMATS.CHECKLIST]: 'Checklist',
    [SEO_KEYWORD_TYPE.FORMATS.HOW_TO]: 'How-To',
    [SEO_KEYWORD_TYPE.FORMATS.BEST]: 'Best',
    [SEO_KEYWORD_TYPE.FORMATS.TOP]: 'Top',
    [SEO_KEYWORD_TYPE.FORMATS.VS]: 'Vs',
    [SEO_KEYWORD_TYPE.FORMATS.ALTERNATIVE]: 'Alternative',
  };
  return labels[format] || 'Unknown Format';
}

export function getSEOKeywordModifierLabel(modifier: SEOKeywordTypeModifier): string {
  const labels: Record<SEOKeywordTypeModifier, string> = {
    [SEO_KEYWORD_TYPE.MODIFIERS.BEST]: 'Best',
    [SEO_KEYWORD_TYPE.MODIFIERS.CHEAP]: 'Cheap',
    [SEO_KEYWORD_TYPE.MODIFIERS.AFFORDABLE]: 'Affordable',
    [SEO_KEYWORD_TYPE.MODIFIERS.DISCOUNT]: 'Discount',
    [SEO_KEYWORD_TYPE.MODIFIERS.DEAL]: 'Deal',
    [SEO_KEYWORD_TYPE.MODIFIERS.SALE]: 'Sale',
    [SEO_KEYWORD_TYPE.MODIFIERS.FREE]: 'Free',
    [SEO_KEYWORD_TYPE.MODIFIERS.NEW]: 'New',
    [SEO_KEYWORD_TYPE.MODIFIERS.TOP]: 'Top',
    [SEO_KEYWORD_TYPE.MODIFIERS.REVIEW]: 'Review',
    [SEO_KEYWORD_TYPE.MODIFIERS.COMPARISON]: 'Comparison',
    [SEO_KEYWORD_TYPE.MODIFIERS.ALTERNATIVE]: 'Alternative',
    [SEO_KEYWORD_TYPE.MODIFIERS.GUIDE]: 'Guide',
    [SEO_KEYWORD_TYPE.MODIFIERS.TUTORIAL]: 'Tutorial',
    [SEO_KEYWORD_TYPE.MODIFIERS.HOW_TO]: 'How-To',
    [SEO_KEYWORD_TYPE.MODIFIERS.TIPS]: 'Tips',
    [SEO_KEYWORD_TYPE.MODIFIERS.IDEAS]: 'Ideas',
    [SEO_KEYWORD_TYPE.MODIFIERS.EXAMPLES]: 'Examples',
    [SEO_KEYWORD_TYPE.MODIFIERS.TEMPLATE]: 'Template',
    [SEO_KEYWORD_TYPE.MODIFIERS.CHECKLIST]: 'Checklist',
    [SEO_KEYWORD_TYPE.MODIFIERS.COURSE]: 'Course',
    [SEO_KEYWORD_TYPE.MODIFIERS.TRAINING]: 'Training',
    [SEO_KEYWORD_TYPE.MODIFIERS.CERTIFICATION]: 'Certification',
    [SEO_KEYWORD_TYPE.MODIFIERS.ONLINE]: 'Online',
    [SEO_KEYWORD_TYPE.MODIFIERS.NEAR_ME]: 'Near Me',
    [SEO_KEYWORD_TYPE.MODIFIERS.LOCAL]: 'Local',
  };
  return labels[modifier] || 'Unknown Modifier';
}

export function getSEOKeywordIntentTypeLabel(intent: SEOKeywordTypeIntent): string {
  const labels: Record<SEOKeywordTypeIntent, string> = {
    [SEO_KEYWORD_TYPE.INTENT_TYPES.INFORMATION]: 'Informational Intent',
    [SEO_KEYWORD_TYPE.INTENT_TYPES.NAVIGATION]: 'Navigational Intent',
    [SEO_KEYWORD_TYPE.INTENT_TYPES.TRANSACTION]: 'Transactional Intent',
    [SEO_KEYWORD_TYPE.INTENT_TYPES.COMMERCIAL]: 'Commercial Intent',
    [SEO_KEYWORD_TYPE.INTENT_TYPES.LOCAL]: 'Local Intent',
  };
  return labels[intent] || 'Unknown Intent';
}

export function getSEOKeywordFunnelStageLabel(stage: SEOKeywordTypeFunnelStage): string {
  const labels: Record<SEOKeywordTypeFunnelStage, string> = {
    [SEO_KEYWORD_TYPE.FUNNEL_STAGES.TOP]: 'Top of Funnel (Awareness)',
    [SEO_KEYWORD_TYPE.FUNNEL_STAGES.MIDDLE]: 'Middle of Funnel (Consideration)',
    [SEO_KEYWORD_TYPE.FUNNEL_STAGES.BOTTOM]: 'Bottom of Funnel (Decision)',
    [SEO_KEYWORD_TYPE.FUNNEL_STAGES.RETENTION]: 'Retention Stage',
  };
  return labels[stage] || 'Unknown Funnel Stage';
}

export function getSEOKeywordSeasonalityLabel(seasonality: SEOKeywordTypeSeasonality): string {
  const labels: Record<SEOKeywordTypeSeasonality, string> = {
    [SEO_KEYWORD_TYPE.SEASONALITY.YEAR_ROUND]: 'Year-Round',
    [SEO_KEYWORD_TYPE.SEASONALITY.SPRING]: 'Spring',
    [SEO_KEYWORD_TYPE.SEASONALITY.SUMMER]: 'Summer',
    [SEO_KEYWORD_TYPE.SEASONALITY.AUTUMN]: 'Autumn',
    [SEO_KEYWORD_TYPE.SEASONALITY.WINTER]: 'Winter',
    [SEO_KEYWORD_TYPE.SEASONALITY.HOLIDAY]: 'Holiday Season',
    [SEO_KEYWORD_TYPE.SEASONALITY.EVENT]: 'Event-Based',
    [SEO_KEYWORD_TYPE.SEASONALITY.TRENDING]: 'Trending',
  };
  return labels[seasonality] || 'Unknown Seasonality';
}

export function getSEOKeywordGeoScopeLabel(scope: SEOKeywordTypeGeoScope): string {
  const labels: Record<SEOKeywordTypeGeoScope, string> = {
    [SEO_KEYWORD_TYPE.GEO_SCOPES.GLOBAL]: 'Global',
    [SEO_KEYWORD_TYPE.GEO_SCOPES.NATIONAL]: 'National',
    [SEO_KEYWORD_TYPE.GEO_SCOPES.REGIONAL]: 'Regional',
    [SEO_KEYWORD_TYPE.GEO_SCOPES.CITY]: 'City',
    [SEO_KEYWORD_TYPE.GEO_SCOPES.LOCAL]: 'Local',
    [SEO_KEYWORD_TYPE.GEO_SCOPES.NEIGHBORHOOD]: 'Neighborhood',
  };
  return labels[scope] || 'Unknown Geographic Scope';
}
