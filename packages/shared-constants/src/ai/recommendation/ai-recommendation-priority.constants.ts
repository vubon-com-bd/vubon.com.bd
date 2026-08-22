/**
 * AI Recommendation Priority Constants
 * Priority levels and scoring for recommendations
 */

// First define the factors
export const AI_RECOMMENDATION_PRIORITY_FACTORS = {
  RELEVANCE: 'relevance',
  RECENCY: 'recency',
  POPULARITY: 'popularity',
  DIVERSITY: 'diversity',
  NOVELTY: 'novelty',
  CONFIDENCE: 'confidence',
  ENGAGEMENT: 'engagement',
  CONVERSION: 'conversion',
  REVENUE: 'revenue',
  PROFIT: 'profit',
  CUSTOMER_VALUE: 'customer_value',
  INVENTORY: 'inventory',
  SEASONALITY: 'seasonality',
  CONTEXT: 'context',
  PERSONALIZATION: 'personalization',
} as const;

export type AIRecommendationPriorityFactor =
  (typeof AI_RECOMMENDATION_PRIORITY_FACTORS)[keyof typeof AI_RECOMMENDATION_PRIORITY_FACTORS];

export const AI_RECOMMENDATION_PRIORITY = {
  // Priority Levels
  LEVELS: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BACKGROUND: 'background',
    NONE: 'none',
  } as const,

  // Priority Scores
  SCORES: {
    CRITICAL: 100,
    HIGH: 75,
    MEDIUM: 50,
    LOW: 25,
    BACKGROUND: 10,
    NONE: 0,
  } as const,

  // Priority Factors - using the pre-defined factors
  FACTORS: AI_RECOMMENDATION_PRIORITY_FACTORS,

  // Priority Weights
  WEIGHTS: {
    [AI_RECOMMENDATION_PRIORITY_FACTORS.RELEVANCE]: 0.3,
    [AI_RECOMMENDATION_PRIORITY_FACTORS.RECENCY]: 0.15,
    [AI_RECOMMENDATION_PRIORITY_FACTORS.POPULARITY]: 0.1,
    [AI_RECOMMENDATION_PRIORITY_FACTORS.DIVERSITY]: 0.05,
    [AI_RECOMMENDATION_PRIORITY_FACTORS.NOVELTY]: 0.05,
    [AI_RECOMMENDATION_PRIORITY_FACTORS.CONFIDENCE]: 0.1,
    [AI_RECOMMENDATION_PRIORITY_FACTORS.ENGAGEMENT]: 0.05,
    [AI_RECOMMENDATION_PRIORITY_FACTORS.CONVERSION]: 0.1,
    [AI_RECOMMENDATION_PRIORITY_FACTORS.REVENUE]: 0.05,
    [AI_RECOMMENDATION_PRIORITY_FACTORS.PROFIT]: 0.05,
    [AI_RECOMMENDATION_PRIORITY_FACTORS.CUSTOMER_VALUE]: 0.05,
    [AI_RECOMMENDATION_PRIORITY_FACTORS.INVENTORY]: 0.05,
    [AI_RECOMMENDATION_PRIORITY_FACTORS.SEASONALITY]: 0.05,
    [AI_RECOMMENDATION_PRIORITY_FACTORS.CONTEXT]: 0.1,
    [AI_RECOMMENDATION_PRIORITY_FACTORS.PERSONALIZATION]: 0.1,
  } as const,

  // Priority Thresholds
  THRESHOLDS: {
    CRITICAL: 80,
    HIGH: 60,
    MEDIUM: 40,
    LOW: 20,
    BACKGROUND: 10,
  } as const,

  // Priority Decay
  DECAY: {
    FAST: 0.5,
    MEDIUM: 0.7,
    SLOW: 0.9,
    NONE: 1.0,
  } as const,

  // Priority Boost
  BOOST: {
    USER_ACTION: 1.5,
    SEASONAL: 1.3,
    TRENDING: 1.4,
    NEW_ARRIVAL: 1.2,
    LIMITED_STOCK: 1.8,
    FLASH_SALE: 2.0,
    VENDOR_SPONSORED: 1.6,
    PAID_PROMOTION: 1.7,
    EXCLUSIVE: 1.9,
  } as const,

  // Priority Penalties
  PENALTIES: {
    OUT_OF_STOCK: 0.1,
    LOW_RATING: 0.3,
    POOR_REVIEW: 0.2,
    HIGH_RETURN_RATE: 0.4,
    LOW_CONVERSION: 0.5,
    OLD_INVENTORY: 0.6,
    SEASON_END: 0.7,
    CLEARANCE: 0.8,
  } as const,
} as const;

// Priority Levels
export type AIRecommendationPriorityLevel =
  (typeof AI_RECOMMENDATION_PRIORITY.LEVELS)[keyof typeof AI_RECOMMENDATION_PRIORITY.LEVELS];

// Priority Scores
export type AIRecommendationPriorityScore =
  (typeof AI_RECOMMENDATION_PRIORITY.SCORES)[keyof typeof AI_RECOMMENDATION_PRIORITY.SCORES];

// Priority Weights
export type AIRecommendationPriorityWeight =
  (typeof AI_RECOMMENDATION_PRIORITY.WEIGHTS)[keyof typeof AI_RECOMMENDATION_PRIORITY.WEIGHTS];

// Priority Thresholds
export type AIRecommendationPriorityThreshold =
  (typeof AI_RECOMMENDATION_PRIORITY.THRESHOLDS)[keyof typeof AI_RECOMMENDATION_PRIORITY.THRESHOLDS];

// Priority Decay
export type AIRecommendationPriorityDecay =
  (typeof AI_RECOMMENDATION_PRIORITY.DECAY)[keyof typeof AI_RECOMMENDATION_PRIORITY.DECAY];

// Priority Boost
export type AIRecommendationPriorityBoost =
  (typeof AI_RECOMMENDATION_PRIORITY.BOOST)[keyof typeof AI_RECOMMENDATION_PRIORITY.BOOST];

// Priority Penalties
export type AIRecommendationPriorityPenalty =
  (typeof AI_RECOMMENDATION_PRIORITY.PENALTIES)[keyof typeof AI_RECOMMENDATION_PRIORITY.PENALTIES];

// Utility Functions
export function getPriorityLevelLabel(level: AIRecommendationPriorityLevel): string {
  const labels: Record<AIRecommendationPriorityLevel, string> = {
    [AI_RECOMMENDATION_PRIORITY.LEVELS.CRITICAL]: 'Critical',
    [AI_RECOMMENDATION_PRIORITY.LEVELS.HIGH]: 'High',
    [AI_RECOMMENDATION_PRIORITY.LEVELS.MEDIUM]: 'Medium',
    [AI_RECOMMENDATION_PRIORITY.LEVELS.LOW]: 'Low',
    [AI_RECOMMENDATION_PRIORITY.LEVELS.BACKGROUND]: 'Background',
    [AI_RECOMMENDATION_PRIORITY.LEVELS.NONE]: 'None',
  };
  return labels[level] || 'Unknown';
}

export function getPriorityScore(
  level: AIRecommendationPriorityLevel
): AIRecommendationPriorityScore {
  const scores: Record<AIRecommendationPriorityLevel, AIRecommendationPriorityScore> = {
    [AI_RECOMMENDATION_PRIORITY.LEVELS.CRITICAL]: AI_RECOMMENDATION_PRIORITY.SCORES.CRITICAL,
    [AI_RECOMMENDATION_PRIORITY.LEVELS.HIGH]: AI_RECOMMENDATION_PRIORITY.SCORES.HIGH,
    [AI_RECOMMENDATION_PRIORITY.LEVELS.MEDIUM]: AI_RECOMMENDATION_PRIORITY.SCORES.MEDIUM,
    [AI_RECOMMENDATION_PRIORITY.LEVELS.LOW]: AI_RECOMMENDATION_PRIORITY.SCORES.LOW,
    [AI_RECOMMENDATION_PRIORITY.LEVELS.BACKGROUND]: AI_RECOMMENDATION_PRIORITY.SCORES.BACKGROUND,
    [AI_RECOMMENDATION_PRIORITY.LEVELS.NONE]: AI_RECOMMENDATION_PRIORITY.SCORES.NONE,
  };
  return scores[level] || AI_RECOMMENDATION_PRIORITY.SCORES.MEDIUM;
}

export function getPriorityLevel(score: number): AIRecommendationPriorityLevel {
  if (score >= AI_RECOMMENDATION_PRIORITY.THRESHOLDS.CRITICAL) {
    return AI_RECOMMENDATION_PRIORITY.LEVELS.CRITICAL;
  }
  if (score >= AI_RECOMMENDATION_PRIORITY.THRESHOLDS.HIGH) {
    return AI_RECOMMENDATION_PRIORITY.LEVELS.HIGH;
  }
  if (score >= AI_RECOMMENDATION_PRIORITY.THRESHOLDS.MEDIUM) {
    return AI_RECOMMENDATION_PRIORITY.LEVELS.MEDIUM;
  }
  if (score >= AI_RECOMMENDATION_PRIORITY.THRESHOLDS.LOW) {
    return AI_RECOMMENDATION_PRIORITY.LEVELS.LOW;
  }
  if (score >= AI_RECOMMENDATION_PRIORITY.THRESHOLDS.BACKGROUND) {
    return AI_RECOMMENDATION_PRIORITY.LEVELS.BACKGROUND;
  }
  return AI_RECOMMENDATION_PRIORITY.LEVELS.NONE;
}

export function calculatePriorityScore(
  factors: Partial<Record<AIRecommendationPriorityFactor, number>>
): number {
  let score = 0;
  const weights = AI_RECOMMENDATION_PRIORITY.WEIGHTS;
  for (const [factor, value] of Object.entries(factors)) {
    const factorKey = factor as AIRecommendationPriorityFactor;
    const weight = weights[factorKey];
    if (weight && value !== undefined) {
      score += value * weight;
    }
  }
  return Math.min(score, 100);
}

export function applyPriorityBoost(
  score: number,
  boostFactors: AIRecommendationPriorityBoost[]
): number {
  let boostedScore = score;
  for (const boost of boostFactors) {
    boostedScore *= boost;
  }
  return Math.min(boostedScore, 100);
}

export function applyPriorityPenalty(
  score: number,
  penaltyFactors: AIRecommendationPriorityPenalty[]
): number {
  let penalizedScore = score;
  for (const penalty of penaltyFactors) {
    penalizedScore *= penalty;
  }
  return Math.max(penalizedScore, 0);
}

export function getPriorityBoostLabel(boost: AIRecommendationPriorityBoost): string {
  const labels: Record<AIRecommendationPriorityBoost, string> = {
    [AI_RECOMMENDATION_PRIORITY.BOOST.USER_ACTION]: 'User Action',
    [AI_RECOMMENDATION_PRIORITY.BOOST.SEASONAL]: 'Seasonal',
    [AI_RECOMMENDATION_PRIORITY.BOOST.TRENDING]: 'Trending',
    [AI_RECOMMENDATION_PRIORITY.BOOST.NEW_ARRIVAL]: 'New Arrival',
    [AI_RECOMMENDATION_PRIORITY.BOOST.LIMITED_STOCK]: 'Limited Stock',
    [AI_RECOMMENDATION_PRIORITY.BOOST.FLASH_SALE]: 'Flash Sale',
    [AI_RECOMMENDATION_PRIORITY.BOOST.VENDOR_SPONSORED]: 'Vendor Sponsored',
    [AI_RECOMMENDATION_PRIORITY.BOOST.PAID_PROMOTION]: 'Paid Promotion',
    [AI_RECOMMENDATION_PRIORITY.BOOST.EXCLUSIVE]: 'Exclusive',
  };
  return labels[boost] || 'Unknown';
}

export function getPriorityPenaltyLabel(penalty: AIRecommendationPriorityPenalty): string {
  const labels: Record<AIRecommendationPriorityPenalty, string> = {
    [AI_RECOMMENDATION_PRIORITY.PENALTIES.OUT_OF_STOCK]: 'Out of Stock',
    [AI_RECOMMENDATION_PRIORITY.PENALTIES.LOW_RATING]: 'Low Rating',
    [AI_RECOMMENDATION_PRIORITY.PENALTIES.POOR_REVIEW]: 'Poor Review',
    [AI_RECOMMENDATION_PRIORITY.PENALTIES.HIGH_RETURN_RATE]: 'High Return Rate',
    [AI_RECOMMENDATION_PRIORITY.PENALTIES.LOW_CONVERSION]: 'Low Conversion',
    [AI_RECOMMENDATION_PRIORITY.PENALTIES.OLD_INVENTORY]: 'Old Inventory',
    [AI_RECOMMENDATION_PRIORITY.PENALTIES.SEASON_END]: 'Season End',
    [AI_RECOMMENDATION_PRIORITY.PENALTIES.CLEARANCE]: 'Clearance',
  };
  return labels[penalty] || 'Unknown';
}

export function getDecayFactor(decay: AIRecommendationPriorityDecay): number {
  return decay;
}

export function getDefaultFactorWeights(): Record<AIRecommendationPriorityFactor, number> {
  return { ...AI_RECOMMENDATION_PRIORITY.WEIGHTS };
}

export function getDefaultThresholds(): Record<AIRecommendationPriorityLevel, number> {
  return {
    [AI_RECOMMENDATION_PRIORITY.LEVELS.CRITICAL]: AI_RECOMMENDATION_PRIORITY.THRESHOLDS.CRITICAL,
    [AI_RECOMMENDATION_PRIORITY.LEVELS.HIGH]: AI_RECOMMENDATION_PRIORITY.THRESHOLDS.HIGH,
    [AI_RECOMMENDATION_PRIORITY.LEVELS.MEDIUM]: AI_RECOMMENDATION_PRIORITY.THRESHOLDS.MEDIUM,
    [AI_RECOMMENDATION_PRIORITY.LEVELS.LOW]: AI_RECOMMENDATION_PRIORITY.THRESHOLDS.LOW,
    [AI_RECOMMENDATION_PRIORITY.LEVELS.BACKGROUND]:
      AI_RECOMMENDATION_PRIORITY.THRESHOLDS.BACKGROUND,
    [AI_RECOMMENDATION_PRIORITY.LEVELS.NONE]: 0,
  };
}
