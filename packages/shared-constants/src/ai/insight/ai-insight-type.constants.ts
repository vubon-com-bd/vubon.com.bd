/**
 * AI Insight Type Constants
 * Types and classifications for AI insights
 */

export const AI_INSIGHT_TYPE = {
  // Insight Domains
  DOMAINS: {
    BUSINESS: 'business',
    MARKET: 'market',
    CUSTOMER: 'customer',
    PRODUCT: 'product',
    OPERATIONAL: 'operational',
    FINANCIAL: 'financial',
    SALES: 'sales',
    MARKETING: 'marketing',
    SUPPORT: 'support',
    TECHNICAL: 'technical',
    STRATEGIC: 'strategic',
  } as const,

  // Insight Sub-Types
  SUB_TYPES: {
    // Business
    REVENUE_OPPORTUNITY: 'revenue_opportunity',
    COST_SAVINGS: 'cost_savings',
    EFFICIENCY_GAIN: 'efficiency_gain',
    GROWTH_POTENTIAL: 'growth_potential',

    // Customer
    SEGMENT_INSIGHT: 'segment_insight',
    BEHAVIOR_INSIGHT: 'behavior_insight',
    PREFERENCE_INSIGHT: 'preference_insight',
    SATISFACTION_INSIGHT: 'satisfaction_insight',
    CHURN_RISK: 'churn_risk',

    // Product
    PERFORMANCE_INSIGHT: 'performance_insight',
    USAGE_INSIGHT: 'usage_insight',
    FEATURE_INSIGHT: 'feature_insight',
    QUALITY_INSIGHT: 'quality_insight',

    // Market
    TREND_INSIGHT: 'trend_insight',
    COMPETITIVE_INSIGHT: 'competitive_insight',
    OPPORTUNITY_INSIGHT: 'opportunity_insight',
    THREAT_INSIGHT: 'threat_insight',

    // Operational
    PROCESS_INSIGHT: 'process_insight',
    BOTTLE_NECK: 'bottle_neck',
    OPTIMIZATION_INSIGHT: 'optimization_insight',
    RESOURCE_INSIGHT: 'resource_insight',
  } as const,

  // Insight Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
    VERY_COMPLEX: 'very_complex',
  } as const,

  // Insight Maturity
  MATURITY: {
    EMERGING: 'emerging',
    DEVELOPING: 'developing',
    MATURE: 'mature',
    STABLE: 'stable',
    DECLINING: 'declining',
  } as const,

  // Insight Scope
  SCOPE: {
    INDIVIDUAL: 'individual',
    TEAM: 'team',
    DEPARTMENT: 'department',
    ORGANIZATION: 'organization',
    INDUSTRY: 'industry',
    MARKET: 'market',
  } as const,

  // Insight Horizon
  HORIZON: {
    IMMEDIATE: 'immediate',
    SHORT_TERM: 'short_term',
    MEDIUM_TERM: 'medium_term',
    LONG_TERM: 'long_term',
  } as const,
} as const;

export type AIInsightDomain =
  (typeof AI_INSIGHT_TYPE.DOMAINS)[keyof typeof AI_INSIGHT_TYPE.DOMAINS];
export type AIInsightSubType =
  (typeof AI_INSIGHT_TYPE.SUB_TYPES)[keyof typeof AI_INSIGHT_TYPE.SUB_TYPES];
export type AIInsightComplexity =
  (typeof AI_INSIGHT_TYPE.COMPLEXITY)[keyof typeof AI_INSIGHT_TYPE.COMPLEXITY];
export type AIInsightMaturity =
  (typeof AI_INSIGHT_TYPE.MATURITY)[keyof typeof AI_INSIGHT_TYPE.MATURITY];
export type AIInsightScope = (typeof AI_INSIGHT_TYPE.SCOPE)[keyof typeof AI_INSIGHT_TYPE.SCOPE];
export type AIInsightHorizon =
  (typeof AI_INSIGHT_TYPE.HORIZON)[keyof typeof AI_INSIGHT_TYPE.HORIZON];

export function getAiInsightDomainLabel(domain: AIInsightDomain): string {
  const labels: Record<AIInsightDomain, string> = {
    [AI_INSIGHT_TYPE.DOMAINS.BUSINESS]: 'Business',
    [AI_INSIGHT_TYPE.DOMAINS.MARKET]: 'Market',
    [AI_INSIGHT_TYPE.DOMAINS.CUSTOMER]: 'Customer',
    [AI_INSIGHT_TYPE.DOMAINS.PRODUCT]: 'Product',
    [AI_INSIGHT_TYPE.DOMAINS.OPERATIONAL]: 'Operational',
    [AI_INSIGHT_TYPE.DOMAINS.FINANCIAL]: 'Financial',
    [AI_INSIGHT_TYPE.DOMAINS.SALES]: 'Sales',
    [AI_INSIGHT_TYPE.DOMAINS.MARKETING]: 'Marketing',
    [AI_INSIGHT_TYPE.DOMAINS.SUPPORT]: 'Support',
    [AI_INSIGHT_TYPE.DOMAINS.TECHNICAL]: 'Technical',
    [AI_INSIGHT_TYPE.DOMAINS.STRATEGIC]: 'Strategic',
  };
  return labels[domain] || 'Unknown';
}

export function getAiInsightSubTypeLabel(subType: AIInsightSubType): string {
  const labels: Record<AIInsightSubType, string> = {
    [AI_INSIGHT_TYPE.SUB_TYPES.REVENUE_OPPORTUNITY]: 'Revenue Opportunity',
    [AI_INSIGHT_TYPE.SUB_TYPES.COST_SAVINGS]: 'Cost Savings',
    [AI_INSIGHT_TYPE.SUB_TYPES.EFFICIENCY_GAIN]: 'Efficiency Gain',
    [AI_INSIGHT_TYPE.SUB_TYPES.GROWTH_POTENTIAL]: 'Growth Potential',
    [AI_INSIGHT_TYPE.SUB_TYPES.SEGMENT_INSIGHT]: 'Segment Insight',
    [AI_INSIGHT_TYPE.SUB_TYPES.BEHAVIOR_INSIGHT]: 'Behavior Insight',
    [AI_INSIGHT_TYPE.SUB_TYPES.PREFERENCE_INSIGHT]: 'Preference Insight',
    [AI_INSIGHT_TYPE.SUB_TYPES.SATISFACTION_INSIGHT]: 'Satisfaction Insight',
    [AI_INSIGHT_TYPE.SUB_TYPES.CHURN_RISK]: 'Churn Risk',
    [AI_INSIGHT_TYPE.SUB_TYPES.PERFORMANCE_INSIGHT]: 'Performance Insight',
    [AI_INSIGHT_TYPE.SUB_TYPES.USAGE_INSIGHT]: 'Usage Insight',
    [AI_INSIGHT_TYPE.SUB_TYPES.FEATURE_INSIGHT]: 'Feature Insight',
    [AI_INSIGHT_TYPE.SUB_TYPES.QUALITY_INSIGHT]: 'Quality Insight',
    [AI_INSIGHT_TYPE.SUB_TYPES.TREND_INSIGHT]: 'Trend Insight',
    [AI_INSIGHT_TYPE.SUB_TYPES.COMPETITIVE_INSIGHT]: 'Competitive Insight',
    [AI_INSIGHT_TYPE.SUB_TYPES.OPPORTUNITY_INSIGHT]: 'Opportunity Insight',
    [AI_INSIGHT_TYPE.SUB_TYPES.THREAT_INSIGHT]: 'Threat Insight',
    [AI_INSIGHT_TYPE.SUB_TYPES.PROCESS_INSIGHT]: 'Process Insight',
    [AI_INSIGHT_TYPE.SUB_TYPES.BOTTLE_NECK]: 'Bottleneck',
    [AI_INSIGHT_TYPE.SUB_TYPES.OPTIMIZATION_INSIGHT]: 'Optimization Insight',
    [AI_INSIGHT_TYPE.SUB_TYPES.RESOURCE_INSIGHT]: 'Resource Insight',
  };
  return labels[subType] || 'Unknown';
}

export function getAiInsightComplexityLabel(complexity: AIInsightComplexity): string {
  const labels: Record<AIInsightComplexity, string> = {
    [AI_INSIGHT_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [AI_INSIGHT_TYPE.COMPLEXITY.MODERATE]: 'Moderate',
    [AI_INSIGHT_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [AI_INSIGHT_TYPE.COMPLEXITY.VERY_COMPLEX]: 'Very Complex',
  };
  return labels[complexity] || 'Unknown';
}

export function getAiInsightMaturityLabel(maturity: AIInsightMaturity): string {
  const labels: Record<AIInsightMaturity, string> = {
    [AI_INSIGHT_TYPE.MATURITY.EMERGING]: 'Emerging',
    [AI_INSIGHT_TYPE.MATURITY.DEVELOPING]: 'Developing',
    [AI_INSIGHT_TYPE.MATURITY.MATURE]: 'Mature',
    [AI_INSIGHT_TYPE.MATURITY.STABLE]: 'Stable',
    [AI_INSIGHT_TYPE.MATURITY.DECLINING]: 'Declining',
  };
  return labels[maturity] || 'Unknown';
}

export function getAiInsightScopeLabel(scope: AIInsightScope): string {
  const labels: Record<AIInsightScope, string> = {
    [AI_INSIGHT_TYPE.SCOPE.INDIVIDUAL]: 'Individual',
    [AI_INSIGHT_TYPE.SCOPE.TEAM]: 'Team',
    [AI_INSIGHT_TYPE.SCOPE.DEPARTMENT]: 'Department',
    [AI_INSIGHT_TYPE.SCOPE.ORGANIZATION]: 'Organization',
    [AI_INSIGHT_TYPE.SCOPE.INDUSTRY]: 'Industry',
    [AI_INSIGHT_TYPE.SCOPE.MARKET]: 'Market',
  };
  return labels[scope] || 'Unknown';
}

export function getAiInsightHorizonLabel(horizon: AIInsightHorizon): string {
  const labels: Record<AIInsightHorizon, string> = {
    [AI_INSIGHT_TYPE.HORIZON.IMMEDIATE]: 'Immediate',
    [AI_INSIGHT_TYPE.HORIZON.SHORT_TERM]: 'Short Term',
    [AI_INSIGHT_TYPE.HORIZON.MEDIUM_TERM]: 'Medium Term',
    [AI_INSIGHT_TYPE.HORIZON.LONG_TERM]: 'Long Term',
  };
  return labels[horizon] || 'Unknown';
}

export function getAiInsightComplexityScore(complexity: AIInsightComplexity): number {
  const scores: Record<AIInsightComplexity, number> = {
    [AI_INSIGHT_TYPE.COMPLEXITY.SIMPLE]: 1,
    [AI_INSIGHT_TYPE.COMPLEXITY.MODERATE]: 3,
    [AI_INSIGHT_TYPE.COMPLEXITY.COMPLEX]: 5,
    [AI_INSIGHT_TYPE.COMPLEXITY.VERY_COMPLEX]: 8,
  };
  return scores[complexity] || 1;
}

export function getAiInsightMaturityScore(maturity: AIInsightMaturity): number {
  const scores: Record<AIInsightMaturity, number> = {
    [AI_INSIGHT_TYPE.MATURITY.EMERGING]: 1,
    [AI_INSIGHT_TYPE.MATURITY.DEVELOPING]: 3,
    [AI_INSIGHT_TYPE.MATURITY.MATURE]: 6,
    [AI_INSIGHT_TYPE.MATURITY.STABLE]: 8,
    [AI_INSIGHT_TYPE.MATURITY.DECLINING]: 4,
  };
  return scores[maturity] || 1;
}
