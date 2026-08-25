/**
 * AI Insight Priority Constants
 * Priority definitions and calculations for AI insights
 */

// First define the factors separately
export const AI_INSIGHT_PRIORITY_FACTORS = {
  FACTORS: {
    URGENCY: 'urgency',
    IMPACT: 'impact',
    EFFORT: 'effort',
    RISK: 'risk',
    OPPORTUNITY: 'opportunity',
    TIMELINESS: 'timeliness',
    FEASIBILITY: 'feasibility',
    STRATEGIC_ALIGNMENT: 'strategic_alignment',
  } as const,
};

export type AIInsightPriorityFactor =
  (typeof AI_INSIGHT_PRIORITY_FACTORS.FACTORS)[keyof typeof AI_INSIGHT_PRIORITY_FACTORS.FACTORS];

// Then define the weights using the factors
export const AI_INSIGHT_PRIORITY_WEIGHTS = {
  [AI_INSIGHT_PRIORITY_FACTORS.FACTORS.URGENCY]: 0.3,
  [AI_INSIGHT_PRIORITY_FACTORS.FACTORS.IMPACT]: 0.25,
  [AI_INSIGHT_PRIORITY_FACTORS.FACTORS.OPPORTUNITY]: 0.15,
  [AI_INSIGHT_PRIORITY_FACTORS.FACTORS.RISK]: 0.1,
  [AI_INSIGHT_PRIORITY_FACTORS.FACTORS.TIMELINESS]: 0.1,
  [AI_INSIGHT_PRIORITY_FACTORS.FACTORS.FEASIBILITY]: 0.05,
  [AI_INSIGHT_PRIORITY_FACTORS.FACTORS.STRATEGIC_ALIGNMENT]: 0.05,
} as const;

export type AIInsightPriorityWeight =
  (typeof AI_INSIGHT_PRIORITY_WEIGHTS)[keyof typeof AI_INSIGHT_PRIORITY_WEIGHTS];

export const AI_INSIGHT_PRIORITY_THRESHOLDS = {
  CRITICAL: 80,
  HIGH: 60,
  MEDIUM: 40,
  LOW: 20,
  BACKGROUND: 10,
} as const;

export type AIInsightPriorityThreshold =
  (typeof AI_INSIGHT_PRIORITY_THRESHOLDS)[keyof typeof AI_INSIGHT_PRIORITY_THRESHOLDS];

export const AI_INSIGHT_PRIORITY_BOOSTS = {
  TIME_SENSITIVE: 15,
  HIGH_IMPACT: 10,
  EASY_WIN: 5,
  STRATEGIC: 8,
  COMPLIANCE: 12,
  COMPETITIVE: 6,
} as const;

export type AIInsightPriorityBoost =
  (typeof AI_INSIGHT_PRIORITY_BOOSTS)[keyof typeof AI_INSIGHT_PRIORITY_BOOSTS];

export const AI_INSIGHT_PRIORITY_PENALTIES = {
  HIGH_EFFORT: -10,
  LOW_FEASIBILITY: -8,
  LOW_ALIGNMENT: -5,
  HIGH_RISK: -7,
  DEPRECATED: -15,
} as const;

export type AIInsightPriorityPenalty =
  (typeof AI_INSIGHT_PRIORITY_PENALTIES)[keyof typeof AI_INSIGHT_PRIORITY_PENALTIES];

export const AI_INSIGHT_PRIORITY_DECAY = {
  FAST: 0.9,
  NORMAL: 0.95,
  SLOW: 0.98,
  NONE: 1.0,
} as const;

export type AIInsightPriorityDecay =
  (typeof AI_INSIGHT_PRIORITY_DECAY)[keyof typeof AI_INSIGHT_PRIORITY_DECAY];

export function getAiInsightPriorityFactorLabel(factor: AIInsightPriorityFactor): string {
  const labels: Record<AIInsightPriorityFactor, string> = {
    [AI_INSIGHT_PRIORITY_FACTORS.FACTORS.URGENCY]: 'Urgency',
    [AI_INSIGHT_PRIORITY_FACTORS.FACTORS.IMPACT]: 'Impact',
    [AI_INSIGHT_PRIORITY_FACTORS.FACTORS.EFFORT]: 'Effort',
    [AI_INSIGHT_PRIORITY_FACTORS.FACTORS.RISK]: 'Risk',
    [AI_INSIGHT_PRIORITY_FACTORS.FACTORS.OPPORTUNITY]: 'Opportunity',
    [AI_INSIGHT_PRIORITY_FACTORS.FACTORS.TIMELINESS]: 'Timeliness',
    [AI_INSIGHT_PRIORITY_FACTORS.FACTORS.FEASIBILITY]: 'Feasibility',
    [AI_INSIGHT_PRIORITY_FACTORS.FACTORS.STRATEGIC_ALIGNMENT]: 'Strategic Alignment',
  };
  return labels[factor] || 'Unknown';
}

export function getAiInsightPriorityBoostLabel(boost: AIInsightPriorityBoost): string {
  const labels: Record<AIInsightPriorityBoost, string> = {
    [AI_INSIGHT_PRIORITY_BOOSTS.TIME_SENSITIVE]: 'Time Sensitive',
    [AI_INSIGHT_PRIORITY_BOOSTS.HIGH_IMPACT]: 'High Impact',
    [AI_INSIGHT_PRIORITY_BOOSTS.EASY_WIN]: 'Easy Win',
    [AI_INSIGHT_PRIORITY_BOOSTS.STRATEGIC]: 'Strategic',
    [AI_INSIGHT_PRIORITY_BOOSTS.COMPLIANCE]: 'Compliance',
    [AI_INSIGHT_PRIORITY_BOOSTS.COMPETITIVE]: 'Competitive',
  };
  return labels[boost] || 'Unknown';
}

export function getAiInsightPriorityPenaltyLabel(penalty: AIInsightPriorityPenalty): string {
  const labels: Record<AIInsightPriorityPenalty, string> = {
    [AI_INSIGHT_PRIORITY_PENALTIES.HIGH_EFFORT]: 'High Effort',
    [AI_INSIGHT_PRIORITY_PENALTIES.LOW_FEASIBILITY]: 'Low Feasibility',
    [AI_INSIGHT_PRIORITY_PENALTIES.LOW_ALIGNMENT]: 'Low Alignment',
    [AI_INSIGHT_PRIORITY_PENALTIES.HIGH_RISK]: 'High Risk',
    [AI_INSIGHT_PRIORITY_PENALTIES.DEPRECATED]: 'Deprecated',
  };
  return labels[penalty] || 'Unknown';
}

export function getAiInsightPriorityDecayLabel(decay: AIInsightPriorityDecay): string {
  const labels: Record<AIInsightPriorityDecay, string> = {
    [AI_INSIGHT_PRIORITY_DECAY.FAST]: 'Fast',
    [AI_INSIGHT_PRIORITY_DECAY.NORMAL]: 'Normal',
    [AI_INSIGHT_PRIORITY_DECAY.SLOW]: 'Slow',
    [AI_INSIGHT_PRIORITY_DECAY.NONE]: 'None',
  };
  return labels[decay] || 'Unknown';
}

export function getAiInsightPriorityThresholds(): Record<string, number> {
  return { ...AI_INSIGHT_PRIORITY_THRESHOLDS };
}

export function getAiInsightDefaultFactorWeights(): Record<string, number> {
  return { ...AI_INSIGHT_PRIORITY_WEIGHTS };
}

export function getAiInsightDecayFactor(decay: AIInsightPriorityDecay): number {
  const factors: Record<AIInsightPriorityDecay, number> = {
    [AI_INSIGHT_PRIORITY_DECAY.FAST]: 0.9,
    [AI_INSIGHT_PRIORITY_DECAY.NORMAL]: 0.95,
    [AI_INSIGHT_PRIORITY_DECAY.SLOW]: 0.98,
    [AI_INSIGHT_PRIORITY_DECAY.NONE]: 1.0,
  };
  return factors[decay] || 0.95;
}
