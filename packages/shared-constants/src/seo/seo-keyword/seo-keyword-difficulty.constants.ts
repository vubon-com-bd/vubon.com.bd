/**
 * SEO Keyword Difficulty Constants
 * Difficulty scoring for keywords
 */

export const SEO_KEYWORD_DIFFICULTY = {
  // Difficulty Levels (0-100)
  LEVELS: {
    VERY_EASY: 0,
    EASY: 25,
    MODERATE: 50,
    HARD: 75,
    VERY_HARD: 90,
    COMPETITIVE: 100,
  } as const,

  // Difficulty Ranges
  RANGES: {
    VERY_EASY: [0, 20],
    EASY: [21, 40],
    MODERATE: [41, 60],
    HARD: [61, 80],
    VERY_HARD: [81, 95],
    COMPETITIVE: [96, 100],
  } as const,

  // Difficulty Labels
  LABELS: {
    VERY_EASY: 'Very Easy',
    EASY: 'Easy',
    MODERATE: 'Moderate',
    HARD: 'Hard',
    VERY_HARD: 'Very Hard',
    COMPETITIVE: 'Competitive',
  } as const,

  // Difficulty Colors
  COLORS: {
    VERY_EASY: '#4CAF50',
    EASY: '#8BC34A',
    MODERATE: '#FFC107',
    HARD: '#FF9800',
    VERY_HARD: '#F44336',
    COMPETITIVE: '#D32F2F',
  } as const,

  // Factors affecting difficulty
  FACTORS: {
    DOMAIN_AUTHORITY: 'domain_authority',
    PAGE_AUTHORITY: 'page_authority',
    BACKLINK_COUNT: 'backlink_count',
    REFERRING_DOMAINS: 'referring_domains',
    COMPETITOR_STRENGTH: 'competitor_strength',
    SEARCH_VOLUME: 'search_volume',
    CTR: 'ctr',
    CONTENT_QUALITY: 'content_quality',
  } as const,

  // Factor Weights
  WEIGHTS: {
    DOMAIN_AUTHORITY: 0.3,
    PAGE_AUTHORITY: 0.25,
    BACKLINK_COUNT: 0.2,
    REFERRING_DOMAINS: 0.15,
    COMPETITOR_STRENGTH: 0.1,
  } as const,
} as const;

// Difficulty Levels (numeric)
export type SEOKeywordDifficultyLevel =
  (typeof SEO_KEYWORD_DIFFICULTY.LEVELS)[keyof typeof SEO_KEYWORD_DIFFICULTY.LEVELS];

// Difficulty Ranges
export type SEOKeywordDifficultyRange =
  (typeof SEO_KEYWORD_DIFFICULTY.RANGES)[keyof typeof SEO_KEYWORD_DIFFICULTY.RANGES];

// Difficulty Labels
export type SEOKeywordDifficultyLabel =
  (typeof SEO_KEYWORD_DIFFICULTY.LABELS)[keyof typeof SEO_KEYWORD_DIFFICULTY.LABELS];

// Difficulty Colors
export type SEOKeywordDifficultyColor =
  (typeof SEO_KEYWORD_DIFFICULTY.COLORS)[keyof typeof SEO_KEYWORD_DIFFICULTY.COLORS];

// Difficulty Factors
export type SEOKeywordDifficultyFactor =
  (typeof SEO_KEYWORD_DIFFICULTY.FACTORS)[keyof typeof SEO_KEYWORD_DIFFICULTY.FACTORS];

// Utility Functions
export function getDifficultyLevel(score: number): SEOKeywordDifficultyLevel {
  if (score <= 20) return SEO_KEYWORD_DIFFICULTY.LEVELS.VERY_EASY;
  if (score <= 40) return SEO_KEYWORD_DIFFICULTY.LEVELS.EASY;
  if (score <= 60) return SEO_KEYWORD_DIFFICULTY.LEVELS.MODERATE;
  if (score <= 80) return SEO_KEYWORD_DIFFICULTY.LEVELS.HARD;
  if (score <= 95) return SEO_KEYWORD_DIFFICULTY.LEVELS.VERY_HARD;
  return SEO_KEYWORD_DIFFICULTY.LEVELS.COMPETITIVE;
}

export function getDifficultyLabel(score: number): SEOKeywordDifficultyLabel {
  const level = getDifficultyLevel(score);
  const labels: Record<SEOKeywordDifficultyLevel, SEOKeywordDifficultyLabel> = {
    [SEO_KEYWORD_DIFFICULTY.LEVELS.VERY_EASY]: 'Very Easy',
    [SEO_KEYWORD_DIFFICULTY.LEVELS.EASY]: 'Easy',
    [SEO_KEYWORD_DIFFICULTY.LEVELS.MODERATE]: 'Moderate',
    [SEO_KEYWORD_DIFFICULTY.LEVELS.HARD]: 'Hard',
    [SEO_KEYWORD_DIFFICULTY.LEVELS.VERY_HARD]: 'Very Hard',
    [SEO_KEYWORD_DIFFICULTY.LEVELS.COMPETITIVE]: 'Competitive',
  };
  return labels[level] || 'Unknown';
}

export function getDifficultyColor(score: number): SEOKeywordDifficultyColor {
  const level = getDifficultyLevel(score);
  const colors: Record<SEOKeywordDifficultyLevel, SEOKeywordDifficultyColor> = {
    [SEO_KEYWORD_DIFFICULTY.LEVELS.VERY_EASY]: '#4CAF50',
    [SEO_KEYWORD_DIFFICULTY.LEVELS.EASY]: '#8BC34A',
    [SEO_KEYWORD_DIFFICULTY.LEVELS.MODERATE]: '#FFC107',
    [SEO_KEYWORD_DIFFICULTY.LEVELS.HARD]: '#FF9800',
    [SEO_KEYWORD_DIFFICULTY.LEVELS.VERY_HARD]: '#F44336',
    [SEO_KEYWORD_DIFFICULTY.LEVELS.COMPETITIVE]: '#D32F2F',
  };
  return colors[level] || '#9E9E9E';
}

export function calculateDifficulty(
  domainAuthority: number,
  pageAuthority: number,
  backlinkCount: number,
  referringDomains: number,
  competitorStrength: number
): number {
  // Normalize scores to 0-100
  const daScore = Math.min(100, domainAuthority);
  const paScore = Math.min(100, pageAuthority);
  const blScore = Math.min(100, Math.min(100, backlinkCount / 1000));
  const rdScore = Math.min(100, Math.min(100, referringDomains / 500));
  const csScore = Math.min(100, competitorStrength);

  const difficulty =
    daScore * SEO_KEYWORD_DIFFICULTY.WEIGHTS.DOMAIN_AUTHORITY +
    paScore * SEO_KEYWORD_DIFFICULTY.WEIGHTS.PAGE_AUTHORITY +
    blScore * SEO_KEYWORD_DIFFICULTY.WEIGHTS.BACKLINK_COUNT +
    rdScore * SEO_KEYWORD_DIFFICULTY.WEIGHTS.REFERRING_DOMAINS +
    csScore * SEO_KEYWORD_DIFFICULTY.WEIGHTS.COMPETITOR_STRENGTH;

  return Math.round(difficulty);
}

export function getDifficultyRecommendation(score: number): string {
  const level = getDifficultyLevel(score);
  const recommendations: Record<SEOKeywordDifficultyLevel, string> = {
    [SEO_KEYWORD_DIFFICULTY.LEVELS.VERY_EASY]:
      'Focus on this keyword for quick wins. Minimal effort required.',
    [SEO_KEYWORD_DIFFICULTY.LEVELS.EASY]: 'Good opportunity. Some optimization needed for ranking.',
    [SEO_KEYWORD_DIFFICULTY.LEVELS.MODERATE]:
      'Requires consistent effort and quality content to rank.',
    [SEO_KEYWORD_DIFFICULTY.LEVELS.HARD]:
      'Significant resources needed. Consider long-term strategy.',
    [SEO_KEYWORD_DIFFICULTY.LEVELS.VERY_HARD]:
      'Extremely competitive. Only pursue with strong resources.',
    [SEO_KEYWORD_DIFFICULTY.LEVELS.COMPETITIVE]:
      'Highest competition. Requires substantial investment.',
  };
  return recommendations[level] || 'Unknown difficulty level';
}

export function getEaseOfRanking(score: number): number {
  // Reverse the difficulty score to get ease of ranking (0-100)
  const ease = 100 - score;
  return Math.max(0, Math.min(100, ease));
}

export function getDifficultyCategory(score: number): 'low' | 'medium' | 'high' {
  if (score <= 40) return 'low';
  if (score <= 70) return 'medium';
  return 'high';
}
