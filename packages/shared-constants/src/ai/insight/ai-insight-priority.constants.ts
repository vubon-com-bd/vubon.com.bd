/**
 * AI Insight Priority Constants
 * Priority definitions for AI insights
 */

// First define priority factors
export const AI_INSIGHT_PRIORITY_FACTORS = {
  BUSINESS_IMPACT: 'business_impact',
  URGENCY: 'urgency',
  FEASIBILITY: 'feasibility',
  EFFORT: 'effort',
  RESOURCES: 'resources',
  RISK: 'risk',
  ROI: 'roi',
  TIMELINESS: 'timeliness',
  STRATEGIC_ALIGNMENT: 'strategic_alignment',
  CUSTOMER_IMPACT: 'customer_impact',
  COMPETITIVE_ADVANTAGE: 'competitive_advantage',
  COMPLEXITY: 'complexity',
} as const;

export type AIInsightPriorityFactor =
  (typeof AI_INSIGHT_PRIORITY_FACTORS)[keyof typeof AI_INSIGHT_PRIORITY_FACTORS];

export const AI_INSIGHT_PRIORITY = {
  // Priority Levels
  LEVELS: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BACKGROUND: 'background',
    NICE_TO_HAVE: 'nice_to_have',
  } as const,

  // Priority Scores
  SCORES: {
    CRITICAL: 100,
    HIGH: 80,
    MEDIUM: 60,
    LOW: 40,
    BACKGROUND: 20,
    NICE_TO_HAVE: 0,
  } as const,

  // Priority Factors - using pre-defined factors
  FACTORS: AI_INSIGHT_PRIORITY_FACTORS,

  // Priority Weights
  WEIGHTS: {
    [AI_INSIGHT_PRIORITY_FACTORS.BUSINESS_IMPACT]: 0.25,
    [AI_INSIGHT_PRIORITY_FACTORS.URGENCY]: 0.15,
    [AI_INSIGHT_PRIORITY_FACTORS.FEASIBILITY]: 0.1,
    [AI_INSIGHT_PRIORITY_FACTORS.EFFORT]: 0.05,
    [AI_INSIGHT_PRIORITY_FACTORS.RESOURCES]: 0.05,
    [AI_INSIGHT_PRIORITY_FACTORS.RISK]: 0.05,
    [AI_INSIGHT_PRIORITY_FACTORS.ROI]: 0.1,
    [AI_INSIGHT_PRIORITY_FACTORS.TIMELINESS]: 0.05,
    [AI_INSIGHT_PRIORITY_FACTORS.STRATEGIC_ALIGNMENT]: 0.1,
    [AI_INSIGHT_PRIORITY_FACTORS.CUSTOMER_IMPACT]: 0.05,
    [AI_INSIGHT_PRIORITY_FACTORS.COMPETITIVE_ADVANTAGE]: 0.03,
    [AI_INSIGHT_PRIORITY_FACTORS.COMPLEXITY]: 0.02,
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

  // Priority Boosts - using numeric values directly
  BOOSTS: {
    EXECUTIVE_ATTENTION: 1.5,
    CUSTOMER_FACING: 1.3,
    REVENUE_IMPACT: 1.4,
    COST_SAVING: 1.3,
    REGULATORY: 1.8,
    STRATEGIC: 1.2,
    TIME_SENSITIVE: 1.5,
  } as const,

  // Priority Penalties - using numeric values directly
  PENALTIES: {
    HIGH_EFFORT: 0.7,
    HIGH_RESOURCE: 0.6,
    HIGH_RISK: 0.5,
    LOW_ROI: 0.4,
    LOW_ALIGNMENT: 0.6,
    COMPLEX_IMPLEMENTATION: 0.5,
  } as const,
} as const;

// Priority Levels
export type AIInsightPriorityLevel =
  (typeof AI_INSIGHT_PRIORITY.LEVELS)[keyof typeof AI_INSIGHT_PRIORITY.LEVELS];

// Priority Scores
export type AIInsightPriorityScore =
  (typeof AI_INSIGHT_PRIORITY.SCORES)[keyof typeof AI_INSIGHT_PRIORITY.SCORES];

// Priority Weights
export type AIInsightPriorityWeight =
  (typeof AI_INSIGHT_PRIORITY.WEIGHTS)[keyof typeof AI_INSIGHT_PRIORITY.WEIGHTS];

// Priority Thresholds
export type AIInsightPriorityThreshold =
  (typeof AI_INSIGHT_PRIORITY.THRESHOLDS)[keyof typeof AI_INSIGHT_PRIORITY.THRESHOLDS];

// Priority Decay
export type AIInsightPriorityDecay =
  (typeof AI_INSIGHT_PRIORITY.DECAY)[keyof typeof AI_INSIGHT_PRIORITY.DECAY];

// Priority Boosts
export type AIInsightPriorityBoost = keyof typeof AI_INSIGHT_PRIORITY.BOOSTS;

// Priority Penalties
export type AIInsightPriorityPenalty = keyof typeof AI_INSIGHT_PRIORITY.PENALTIES;

// Utility Functions
export function getInsightPriorityLevelLabel(level: AIInsightPriorityLevel): string {
  const labels: Record<AIInsightPriorityLevel, string> = {
    [AI_INSIGHT_PRIORITY.LEVELS.CRITICAL]: 'Critical',
    [AI_INSIGHT_PRIORITY.LEVELS.HIGH]: 'High',
    [AI_INSIGHT_PRIORITY.LEVELS.MEDIUM]: 'Medium',
    [AI_INSIGHT_PRIORITY.LEVELS.LOW]: 'Low',
    [AI_INSIGHT_PRIORITY.LEVELS.BACKGROUND]: 'Background',
    [AI_INSIGHT_PRIORITY.LEVELS.NICE_TO_HAVE]: 'Nice to Have',
  };
  return labels[level] || 'Unknown';
}

export function getInsightPriorityScore(level: AIInsightPriorityLevel): AIInsightPriorityScore {
  const scores: Record<AIInsightPriorityLevel, AIInsightPriorityScore> = {
    [AI_INSIGHT_PRIORITY.LEVELS.CRITICAL]: AI_INSIGHT_PRIORITY.SCORES.CRITICAL,
    [AI_INSIGHT_PRIORITY.LEVELS.HIGH]: AI_INSIGHT_PRIORITY.SCORES.HIGH,
    [AI_INSIGHT_PRIORITY.LEVELS.MEDIUM]: AI_INSIGHT_PRIORITY.SCORES.MEDIUM,
    [AI_INSIGHT_PRIORITY.LEVELS.LOW]: AI_INSIGHT_PRIORITY.SCORES.LOW,
    [AI_INSIGHT_PRIORITY.LEVELS.BACKGROUND]: AI_INSIGHT_PRIORITY.SCORES.BACKGROUND,
    [AI_INSIGHT_PRIORITY.LEVELS.NICE_TO_HAVE]: AI_INSIGHT_PRIORITY.SCORES.NICE_TO_HAVE,
  };
  return scores[level] || AI_INSIGHT_PRIORITY.SCORES.MEDIUM;
}

export function getInsightPriorityLevel(score: number): AIInsightPriorityLevel {
  if (score >= AI_INSIGHT_PRIORITY.THRESHOLDS.CRITICAL) {
    return AI_INSIGHT_PRIORITY.LEVELS.CRITICAL;
  }
  if (score >= AI_INSIGHT_PRIORITY.THRESHOLDS.HIGH) {
    return AI_INSIGHT_PRIORITY.LEVELS.HIGH;
  }
  if (score >= AI_INSIGHT_PRIORITY.THRESHOLDS.MEDIUM) {
    return AI_INSIGHT_PRIORITY.LEVELS.MEDIUM;
  }
  if (score >= AI_INSIGHT_PRIORITY.THRESHOLDS.LOW) {
    return AI_INSIGHT_PRIORITY.LEVELS.LOW;
  }
  if (score >= AI_INSIGHT_PRIORITY.THRESHOLDS.BACKGROUND) {
    return AI_INSIGHT_PRIORITY.LEVELS.BACKGROUND;
  }
  return AI_INSIGHT_PRIORITY.LEVELS.NICE_TO_HAVE;
}

export function calculateInsightPriorityScore(
  factors: Partial<Record<AIInsightPriorityFactor, number>>
): number {
  let score = 0;
  const weights = AI_INSIGHT_PRIORITY.WEIGHTS;
  for (const [factor, value] of Object.entries(factors)) {
    const factorKey = factor as AIInsightPriorityFactor;
    const weight = weights[factorKey];
    if (weight && value !== undefined) {
      score += value * weight;
    }
  }
  return Math.min(score, 100);
}

export function applyInsightPriorityBoost(
  score: number,
  boostFactors: AIInsightPriorityBoost[]
): number {
  let boostedScore = score;
  for (const boost of boostFactors) {
    boostedScore *= AI_INSIGHT_PRIORITY.BOOSTS[boost];
  }
  return Math.min(boostedScore, 100);
}

export function applyInsightPriorityPenalty(
  score: number,
  penaltyFactors: AIInsightPriorityPenalty[]
): number {
  let penalizedScore = score;
  for (const penalty of penaltyFactors) {
    penalizedScore *= AI_INSIGHT_PRIORITY.PENALTIES[penalty];
  }
  return Math.max(penalizedScore, 0);
}

export function getInsightPriorityBoostLabel(boost: AIInsightPriorityBoost): string {
  const labels: Record<AIInsightPriorityBoost, string> = {
    EXECUTIVE_ATTENTION: 'Executive Attention',
    CUSTOMER_FACING: 'Customer Facing',
    REVENUE_IMPACT: 'Revenue Impact',
    COST_SAVING: 'Cost Saving',
    REGULATORY: 'Regulatory',
    STRATEGIC: 'Strategic',
    TIME_SENSITIVE: 'Time Sensitive',
  };
  return labels[boost] || 'Unknown';
}

export function getInsightPriorityPenaltyLabel(penalty: AIInsightPriorityPenalty): string {
  const labels: Record<AIInsightPriorityPenalty, string> = {
    HIGH_EFFORT: 'High Effort',
    HIGH_RESOURCE: 'High Resource',
    HIGH_RISK: 'High Risk',
    LOW_ROI: 'Low ROI',
    LOW_ALIGNMENT: 'Low Alignment',
    COMPLEX_IMPLEMENTATION: 'Complex Implementation',
  };
  return labels[penalty] || 'Unknown';
}

export function getDefaultInsightWeights(): Record<AIInsightPriorityFactor, number> {
  return { ...AI_INSIGHT_PRIORITY.WEIGHTS };
}

export function getDefaultInsightThresholds(): Record<AIInsightPriorityLevel, number> {
  return {
    [AI_INSIGHT_PRIORITY.LEVELS.CRITICAL]: AI_INSIGHT_PRIORITY.THRESHOLDS.CRITICAL,
    [AI_INSIGHT_PRIORITY.LEVELS.HIGH]: AI_INSIGHT_PRIORITY.THRESHOLDS.HIGH,
    [AI_INSIGHT_PRIORITY.LEVELS.MEDIUM]: AI_INSIGHT_PRIORITY.THRESHOLDS.MEDIUM,
    [AI_INSIGHT_PRIORITY.LEVELS.LOW]: AI_INSIGHT_PRIORITY.THRESHOLDS.LOW,
    [AI_INSIGHT_PRIORITY.LEVELS.BACKGROUND]: AI_INSIGHT_PRIORITY.THRESHOLDS.BACKGROUND,
    [AI_INSIGHT_PRIORITY.LEVELS.NICE_TO_HAVE]: 0,
  };
}
