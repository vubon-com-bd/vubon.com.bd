/**
 * SEO Score Type Constants
 * Types and classifications for SEO scoring
 */

export const SEO_SCORE_TYPE = {
  // Score Categories
  CATEGORIES: {
    TECHNICAL: 'technical',
    CONTENT: 'content',
    STRUCTURAL: 'structural',
    STRATEGIC: 'strategic',
    OPERATIONAL: 'operational',
  } as const,

  // Score Methodologies
  METHODOLOGIES: {
    WEIGHTED: 'weighted',
    AVERAGE: 'average',
    MAXIMUM: 'maximum',
    MINIMUM: 'minimum',
    CUSTOM: 'custom',
    AI_DRIVEN: 'ai_driven',
    RULE_BASED: 'rule_based',
  } as const,

  // Score Granularity
  GRANULARITY: {
    PAGE_LEVEL: 'page_level',
    SITE_LEVEL: 'site_level',
    SECTION_LEVEL: 'section_level',
    CATEGORY_LEVEL: 'category_level',
    KEYWORD_LEVEL: 'keyword_level',
  } as const,

  // Score Context
  CONTEXT: {
    ABSOLUTE: 'absolute',
    RELATIVE: 'relative',
    COMPARATIVE: 'comparative',
    TRENDING: 'trending',
    PREDICTIVE: 'predictive',
  } as const,

  // Score Format
  FORMAT: {
    PERCENTAGE: 'percentage',
    DECIMAL: 'decimal',
    INTEGER: 'integer',
    LETTER_GRADE: 'letter_grade',
    STAR_RATING: 'star_rating',
    COLOR_INDICATOR: 'color_indicator',
  } as const,

  // Score Perspective
  PERSPECTIVE: {
    USER: 'user',
    SEARCH_ENGINE: 'search_engine',
    BUSINESS: 'business',
    COMPETITOR: 'competitor',
    INDUSTRY: 'industry',
  } as const,

  // Score Dimension
  DIMENSIONS: {
    SINGLE: 'single',
    MULTI: 'multi',
    HOLISTIC: 'holistic',
    FOCUSED: 'focused',
  } as const,
} as const;

// Score Categories
export type SEOScoreTypeCategory =
  (typeof SEO_SCORE_TYPE.CATEGORIES)[keyof typeof SEO_SCORE_TYPE.CATEGORIES];

// Score Methodologies
export type SEOScoreTypeMethodology =
  (typeof SEO_SCORE_TYPE.METHODOLOGIES)[keyof typeof SEO_SCORE_TYPE.METHODOLOGIES];

// Score Granularity
export type SEOScoreTypeGranularity =
  (typeof SEO_SCORE_TYPE.GRANULARITY)[keyof typeof SEO_SCORE_TYPE.GRANULARITY];

// Score Context
export type SEOScoreTypeContext =
  (typeof SEO_SCORE_TYPE.CONTEXT)[keyof typeof SEO_SCORE_TYPE.CONTEXT];

// Score Format
export type SEOScoreTypeFormat = (typeof SEO_SCORE_TYPE.FORMAT)[keyof typeof SEO_SCORE_TYPE.FORMAT];

// Score Perspective
export type SEOScoreTypePerspective =
  (typeof SEO_SCORE_TYPE.PERSPECTIVE)[keyof typeof SEO_SCORE_TYPE.PERSPECTIVE];

// Score Dimension
export type SEOScoreTypeDimension =
  (typeof SEO_SCORE_TYPE.DIMENSIONS)[keyof typeof SEO_SCORE_TYPE.DIMENSIONS];

// Utility Functions
export function getSEOScoreCategoryTypeLabel(category: SEOScoreTypeCategory): string {
  const labels: Record<SEOScoreTypeCategory, string> = {
    [SEO_SCORE_TYPE.CATEGORIES.TECHNICAL]: 'Technical Score',
    [SEO_SCORE_TYPE.CATEGORIES.CONTENT]: 'Content Score',
    [SEO_SCORE_TYPE.CATEGORIES.STRUCTURAL]: 'Structural Score',
    [SEO_SCORE_TYPE.CATEGORIES.STRATEGIC]: 'Strategic Score',
    [SEO_SCORE_TYPE.CATEGORIES.OPERATIONAL]: 'Operational Score',
  };
  return labels[category] || 'Unknown Category';
}

export function getSEOScoreMethodologyLabel(methodology: SEOScoreTypeMethodology): string {
  const labels: Record<SEOScoreTypeMethodology, string> = {
    [SEO_SCORE_TYPE.METHODOLOGIES.WEIGHTED]: 'Weighted Score',
    [SEO_SCORE_TYPE.METHODOLOGIES.AVERAGE]: 'Average Score',
    [SEO_SCORE_TYPE.METHODOLOGIES.MAXIMUM]: 'Maximum Score',
    [SEO_SCORE_TYPE.METHODOLOGIES.MINIMUM]: 'Minimum Score',
    [SEO_SCORE_TYPE.METHODOLOGIES.CUSTOM]: 'Custom Score',
    [SEO_SCORE_TYPE.METHODOLOGIES.AI_DRIVEN]: 'AI-Driven Score',
    [SEO_SCORE_TYPE.METHODOLOGIES.RULE_BASED]: 'Rule-Based Score',
  };
  return labels[methodology] || 'Unknown Methodology';
}

export function getSEOScoreGranularityLabel(granularity: SEOScoreTypeGranularity): string {
  const labels: Record<SEOScoreTypeGranularity, string> = {
    [SEO_SCORE_TYPE.GRANULARITY.PAGE_LEVEL]: 'Page Level Score',
    [SEO_SCORE_TYPE.GRANULARITY.SITE_LEVEL]: 'Site Level Score',
    [SEO_SCORE_TYPE.GRANULARITY.SECTION_LEVEL]: 'Section Level Score',
    [SEO_SCORE_TYPE.GRANULARITY.CATEGORY_LEVEL]: 'Category Level Score',
    [SEO_SCORE_TYPE.GRANULARITY.KEYWORD_LEVEL]: 'Keyword Level Score',
  };
  return labels[granularity] || 'Unknown Granularity';
}

export function getSEOScoreContextLabel(context: SEOScoreTypeContext): string {
  const labels: Record<SEOScoreTypeContext, string> = {
    [SEO_SCORE_TYPE.CONTEXT.ABSOLUTE]: 'Absolute Score',
    [SEO_SCORE_TYPE.CONTEXT.RELATIVE]: 'Relative Score',
    [SEO_SCORE_TYPE.CONTEXT.COMPARATIVE]: 'Comparative Score',
    [SEO_SCORE_TYPE.CONTEXT.TRENDING]: 'Trending Score',
    [SEO_SCORE_TYPE.CONTEXT.PREDICTIVE]: 'Predictive Score',
  };
  return labels[context] || 'Unknown Context';
}

export function getSEOScoreFormatLabel(format: SEOScoreTypeFormat): string {
  const labels: Record<SEOScoreTypeFormat, string> = {
    [SEO_SCORE_TYPE.FORMAT.PERCENTAGE]: 'Percentage Format',
    [SEO_SCORE_TYPE.FORMAT.DECIMAL]: 'Decimal Format',
    [SEO_SCORE_TYPE.FORMAT.INTEGER]: 'Integer Format',
    [SEO_SCORE_TYPE.FORMAT.LETTER_GRADE]: 'Letter Grade Format',
    [SEO_SCORE_TYPE.FORMAT.STAR_RATING]: 'Star Rating Format',
    [SEO_SCORE_TYPE.FORMAT.COLOR_INDICATOR]: 'Color Indicator Format',
  };
  return labels[format] || 'Unknown Format';
}

export function getSEOScorePerspectiveLabel(perspective: SEOScoreTypePerspective): string {
  const labels: Record<SEOScoreTypePerspective, string> = {
    [SEO_SCORE_TYPE.PERSPECTIVE.USER]: 'User Perspective',
    [SEO_SCORE_TYPE.PERSPECTIVE.SEARCH_ENGINE]: 'Search Engine Perspective',
    [SEO_SCORE_TYPE.PERSPECTIVE.BUSINESS]: 'Business Perspective',
    [SEO_SCORE_TYPE.PERSPECTIVE.COMPETITOR]: 'Competitor Perspective',
    [SEO_SCORE_TYPE.PERSPECTIVE.INDUSTRY]: 'Industry Perspective',
  };
  return labels[perspective] || 'Unknown Perspective';
}

export function getSEOScoreDimensionLabel(dimension: SEOScoreTypeDimension): string {
  const labels: Record<SEOScoreTypeDimension, string> = {
    [SEO_SCORE_TYPE.DIMENSIONS.SINGLE]: 'Single Dimension',
    [SEO_SCORE_TYPE.DIMENSIONS.MULTI]: 'Multi Dimension',
    [SEO_SCORE_TYPE.DIMENSIONS.HOLISTIC]: 'Holistic Dimension',
    [SEO_SCORE_TYPE.DIMENSIONS.FOCUSED]: 'Focused Dimension',
  };
  return labels[dimension] || 'Unknown Dimension';
}
