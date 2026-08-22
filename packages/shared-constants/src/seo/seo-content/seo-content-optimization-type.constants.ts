/**
 * SEO Content Optimization Type Constants
 * Types and classifications for content optimization strategies
 */

export const SEO_CONTENT_OPTIMIZATION_TYPE = {
  // Optimization Categories
  CATEGORIES: {
    ON_PAGE: 'on_page',
    OFF_PAGE: 'off_page',
    TECHNICAL: 'technical',
    CONTENT: 'content',
    STRUCTURAL: 'structural',
    SEMANTIC: 'semantic',
  } as const,

  // Optimization Approaches
  APPROACHES: {
    AGGRESSIVE: 'aggressive',
    BALANCED: 'balanced',
    CONSERVATIVE: 'conservative',
    MINIMAL: 'minimal',
  } as const,

  // Optimization Strategies
  STRATEGIES: {
    KEYWORD_FOCUSED: 'keyword_focused',
    TOPIC_FOCUSED: 'topic_focused',
    USER_INTENT_FOCUSED: 'user_intent_focused',
    COMPETITOR_FOCUSED: 'competitor_focused',
    DATA_DRIVEN: 'data_driven',
    HOLISTIC: 'holistic',
  } as const,

  // Optimization Phases
  PHASES: {
    RESEARCH: 'research',
    ANALYSIS: 'analysis',
    PLANNING: 'planning',
    EXECUTION: 'execution',
    REVIEW: 'review',
    MONITORING: 'monitoring',
    REFINEMENT: 'refinement',
  } as const,

  // Optimization Scopes
  SCOPES: {
    PAGE_LEVEL: 'page_level',
    SITE_LEVEL: 'site_level',
    SECTION_LEVEL: 'section_level',
    KEYWORD_LEVEL: 'keyword_level',
    TOPIC_LEVEL: 'topic_level',
  } as const,

  // Optimization Triggers
  TRIGGERS: {
    ALGORITHM_UPDATE: 'algorithm_update',
    COMPETITOR_MOVES: 'competitor_moves',
    PERFORMANCE_DROP: 'performance_drop',
    CONTENT_UPDATE: 'content_update',
    SEASONAL_CHANGE: 'seasonal_change',
    USER_FEEDBACK: 'user_feedback',
    AUDIT_RESULTS: 'audit_results',
  } as const,
} as const;

// Optimization Categories
export type SEOContentOptimizationTypeCategory =
  (typeof SEO_CONTENT_OPTIMIZATION_TYPE.CATEGORIES)[keyof typeof SEO_CONTENT_OPTIMIZATION_TYPE.CATEGORIES];

// Optimization Approaches
export type SEOContentOptimizationTypeApproach =
  (typeof SEO_CONTENT_OPTIMIZATION_TYPE.APPROACHES)[keyof typeof SEO_CONTENT_OPTIMIZATION_TYPE.APPROACHES];

// Optimization Strategies
export type SEOContentOptimizationTypeStrategy =
  (typeof SEO_CONTENT_OPTIMIZATION_TYPE.STRATEGIES)[keyof typeof SEO_CONTENT_OPTIMIZATION_TYPE.STRATEGIES];

// Optimization Phases
export type SEOContentOptimizationTypePhase =
  (typeof SEO_CONTENT_OPTIMIZATION_TYPE.PHASES)[keyof typeof SEO_CONTENT_OPTIMIZATION_TYPE.PHASES];

// Optimization Scopes
export type SEOContentOptimizationTypeScope =
  (typeof SEO_CONTENT_OPTIMIZATION_TYPE.SCOPES)[keyof typeof SEO_CONTENT_OPTIMIZATION_TYPE.SCOPES];

// Optimization Triggers
export type SEOContentOptimizationTypeTrigger =
  (typeof SEO_CONTENT_OPTIMIZATION_TYPE.TRIGGERS)[keyof typeof SEO_CONTENT_OPTIMIZATION_TYPE.TRIGGERS];

// Utility Functions
export function getSEOContentOptimizationCategoryLabel(
  category: SEOContentOptimizationTypeCategory
): string {
  const labels: Record<SEOContentOptimizationTypeCategory, string> = {
    [SEO_CONTENT_OPTIMIZATION_TYPE.CATEGORIES.ON_PAGE]: 'On-Page Optimization',
    [SEO_CONTENT_OPTIMIZATION_TYPE.CATEGORIES.OFF_PAGE]: 'Off-Page Optimization',
    [SEO_CONTENT_OPTIMIZATION_TYPE.CATEGORIES.TECHNICAL]: 'Technical Optimization',
    [SEO_CONTENT_OPTIMIZATION_TYPE.CATEGORIES.CONTENT]: 'Content Optimization',
    [SEO_CONTENT_OPTIMIZATION_TYPE.CATEGORIES.STRUCTURAL]: 'Structural Optimization',
    [SEO_CONTENT_OPTIMIZATION_TYPE.CATEGORIES.SEMANTIC]: 'Semantic Optimization',
  };
  return labels[category] || 'Unknown Category';
}

export function getSEOContentOptimizationApproachLabel(
  approach: SEOContentOptimizationTypeApproach
): string {
  const labels: Record<SEOContentOptimizationTypeApproach, string> = {
    [SEO_CONTENT_OPTIMIZATION_TYPE.APPROACHES.AGGRESSIVE]: 'Aggressive',
    [SEO_CONTENT_OPTIMIZATION_TYPE.APPROACHES.BALANCED]: 'Balanced',
    [SEO_CONTENT_OPTIMIZATION_TYPE.APPROACHES.CONSERVATIVE]: 'Conservative',
    [SEO_CONTENT_OPTIMIZATION_TYPE.APPROACHES.MINIMAL]: 'Minimal',
  };
  return labels[approach] || 'Unknown Approach';
}

export function getSEOContentOptimizationStrategyLabel(
  strategy: SEOContentOptimizationTypeStrategy
): string {
  const labels: Record<SEOContentOptimizationTypeStrategy, string> = {
    [SEO_CONTENT_OPTIMIZATION_TYPE.STRATEGIES.KEYWORD_FOCUSED]: 'Keyword-Focused',
    [SEO_CONTENT_OPTIMIZATION_TYPE.STRATEGIES.TOPIC_FOCUSED]: 'Topic-Focused',
    [SEO_CONTENT_OPTIMIZATION_TYPE.STRATEGIES.USER_INTENT_FOCUSED]: 'User Intent-Focused',
    [SEO_CONTENT_OPTIMIZATION_TYPE.STRATEGIES.COMPETITOR_FOCUSED]: 'Competitor-Focused',
    [SEO_CONTENT_OPTIMIZATION_TYPE.STRATEGIES.DATA_DRIVEN]: 'Data-Driven',
    [SEO_CONTENT_OPTIMIZATION_TYPE.STRATEGIES.HOLISTIC]: 'Holistic',
  };
  return labels[strategy] || 'Unknown Strategy';
}

export function getSEOContentOptimizationPhaseLabel(
  phase: SEOContentOptimizationTypePhase
): string {
  const labels: Record<SEOContentOptimizationTypePhase, string> = {
    [SEO_CONTENT_OPTIMIZATION_TYPE.PHASES.RESEARCH]: 'Research Phase',
    [SEO_CONTENT_OPTIMIZATION_TYPE.PHASES.ANALYSIS]: 'Analysis Phase',
    [SEO_CONTENT_OPTIMIZATION_TYPE.PHASES.PLANNING]: 'Planning Phase',
    [SEO_CONTENT_OPTIMIZATION_TYPE.PHASES.EXECUTION]: 'Execution Phase',
    [SEO_CONTENT_OPTIMIZATION_TYPE.PHASES.REVIEW]: 'Review Phase',
    [SEO_CONTENT_OPTIMIZATION_TYPE.PHASES.MONITORING]: 'Monitoring Phase',
    [SEO_CONTENT_OPTIMIZATION_TYPE.PHASES.REFINEMENT]: 'Refinement Phase',
  };
  return labels[phase] || 'Unknown Phase';
}

export function getSEOContentOptimizationScopeLabel(
  scope: SEOContentOptimizationTypeScope
): string {
  const labels: Record<SEOContentOptimizationTypeScope, string> = {
    [SEO_CONTENT_OPTIMIZATION_TYPE.SCOPES.PAGE_LEVEL]: 'Page Level',
    [SEO_CONTENT_OPTIMIZATION_TYPE.SCOPES.SITE_LEVEL]: 'Site Level',
    [SEO_CONTENT_OPTIMIZATION_TYPE.SCOPES.SECTION_LEVEL]: 'Section Level',
    [SEO_CONTENT_OPTIMIZATION_TYPE.SCOPES.KEYWORD_LEVEL]: 'Keyword Level',
    [SEO_CONTENT_OPTIMIZATION_TYPE.SCOPES.TOPIC_LEVEL]: 'Topic Level',
  };
  return labels[scope] || 'Unknown Scope';
}

export function getSEOContentOptimizationTriggerLabel(
  trigger: SEOContentOptimizationTypeTrigger
): string {
  const labels: Record<SEOContentOptimizationTypeTrigger, string> = {
    [SEO_CONTENT_OPTIMIZATION_TYPE.TRIGGERS.ALGORITHM_UPDATE]: 'Algorithm Update',
    [SEO_CONTENT_OPTIMIZATION_TYPE.TRIGGERS.COMPETITOR_MOVES]: 'Competitor Moves',
    [SEO_CONTENT_OPTIMIZATION_TYPE.TRIGGERS.PERFORMANCE_DROP]: 'Performance Drop',
    [SEO_CONTENT_OPTIMIZATION_TYPE.TRIGGERS.CONTENT_UPDATE]: 'Content Update',
    [SEO_CONTENT_OPTIMIZATION_TYPE.TRIGGERS.SEASONAL_CHANGE]: 'Seasonal Change',
    [SEO_CONTENT_OPTIMIZATION_TYPE.TRIGGERS.USER_FEEDBACK]: 'User Feedback',
    [SEO_CONTENT_OPTIMIZATION_TYPE.TRIGGERS.AUDIT_RESULTS]: 'Audit Results',
  };
  return labels[trigger] || 'Unknown Trigger';
}
