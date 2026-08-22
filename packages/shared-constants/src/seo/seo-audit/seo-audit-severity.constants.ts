/**
 * SEO Audit Severity Constants
 * Severity levels for audit findings and issues
 */

export const SEO_AUDIT_SEVERITY = {
  // Severity Levels
  LEVELS: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    INFO: 'info',
    NONE: 'none',
  } as const,

  // Severity Scores (1-10)
  SCORES: {
    CRITICAL: 10,
    HIGH: 8,
    MEDIUM: 6,
    LOW: 4,
    INFO: 2,
    NONE: 0,
  } as const,

  // Severity Colors
  COLORS: {
    CRITICAL: '#D32F2F',
    HIGH: '#F44336',
    MEDIUM: '#FF9800',
    LOW: '#FFC107',
    INFO: '#2196F3',
    NONE: '#9E9E9E',
  } as const,

  // Severity Priority
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    INFO: 'info',
    NONE: 'none',
  } as const,

  // Severity Impact
  IMPACT: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    MINIMAL: 'minimal',
  } as const,

  // Severity Urgency
  URGENCY: {
    IMMEDIATE: 'immediate',
    URGENT: 'urgent',
    SOON: 'soon',
    LATER: 'later',
    WHENEVER: 'whenever',
  } as const,

  // Severity Categories
  CATEGORIES: {
    CRITICAL: 'critical',
    MAJOR: 'major',
    MINOR: 'minor',
    TRIVIAL: 'trivial',
    INFO: 'info',
  } as const,
} as const;

// Severity Levels
export type SEOAuditSeverityLevel =
  (typeof SEO_AUDIT_SEVERITY.LEVELS)[keyof typeof SEO_AUDIT_SEVERITY.LEVELS];

// Severity Scores
export type SEOAuditSeverityScore =
  (typeof SEO_AUDIT_SEVERITY.SCORES)[keyof typeof SEO_AUDIT_SEVERITY.SCORES];

// Severity Colors
export type SEOAuditSeverityColor =
  (typeof SEO_AUDIT_SEVERITY.COLORS)[keyof typeof SEO_AUDIT_SEVERITY.COLORS];

// Severity Priority
export type SEOAuditSeverityPriority =
  (typeof SEO_AUDIT_SEVERITY.PRIORITY)[keyof typeof SEO_AUDIT_SEVERITY.PRIORITY];

// Severity Impact
export type SEOAuditSeverityImpact =
  (typeof SEO_AUDIT_SEVERITY.IMPACT)[keyof typeof SEO_AUDIT_SEVERITY.IMPACT];

// Severity Urgency
export type SEOAuditSeverityUrgency =
  (typeof SEO_AUDIT_SEVERITY.URGENCY)[keyof typeof SEO_AUDIT_SEVERITY.URGENCY];

// Severity Categories
export type SEOAuditSeverityCategory =
  (typeof SEO_AUDIT_SEVERITY.CATEGORIES)[keyof typeof SEO_AUDIT_SEVERITY.CATEGORIES];

// Utility Functions
export function getAuditSeverityLevelLabel(level: SEOAuditSeverityLevel): string {
  const labels: Record<SEOAuditSeverityLevel, string> = {
    [SEO_AUDIT_SEVERITY.LEVELS.CRITICAL]: 'Critical',
    [SEO_AUDIT_SEVERITY.LEVELS.HIGH]: 'High',
    [SEO_AUDIT_SEVERITY.LEVELS.MEDIUM]: 'Medium',
    [SEO_AUDIT_SEVERITY.LEVELS.LOW]: 'Low',
    [SEO_AUDIT_SEVERITY.LEVELS.INFO]: 'Info',
    [SEO_AUDIT_SEVERITY.LEVELS.NONE]: 'None',
  };
  return labels[level] || 'Unknown Severity';
}

export function getAuditSeverityScore(level: SEOAuditSeverityLevel): SEOAuditSeverityScore {
  const scores: Record<SEOAuditSeverityLevel, SEOAuditSeverityScore> = {
    [SEO_AUDIT_SEVERITY.LEVELS.CRITICAL]: SEO_AUDIT_SEVERITY.SCORES.CRITICAL,
    [SEO_AUDIT_SEVERITY.LEVELS.HIGH]: SEO_AUDIT_SEVERITY.SCORES.HIGH,
    [SEO_AUDIT_SEVERITY.LEVELS.MEDIUM]: SEO_AUDIT_SEVERITY.SCORES.MEDIUM,
    [SEO_AUDIT_SEVERITY.LEVELS.LOW]: SEO_AUDIT_SEVERITY.SCORES.LOW,
    [SEO_AUDIT_SEVERITY.LEVELS.INFO]: SEO_AUDIT_SEVERITY.SCORES.INFO,
    [SEO_AUDIT_SEVERITY.LEVELS.NONE]: SEO_AUDIT_SEVERITY.SCORES.NONE,
  };
  return scores[level] || SEO_AUDIT_SEVERITY.SCORES.NONE;
}

export function getAuditSeverityColor(level: SEOAuditSeverityLevel): SEOAuditSeverityColor {
  const colors: Record<SEOAuditSeverityLevel, SEOAuditSeverityColor> = {
    [SEO_AUDIT_SEVERITY.LEVELS.CRITICAL]: SEO_AUDIT_SEVERITY.COLORS.CRITICAL,
    [SEO_AUDIT_SEVERITY.LEVELS.HIGH]: SEO_AUDIT_SEVERITY.COLORS.HIGH,
    [SEO_AUDIT_SEVERITY.LEVELS.MEDIUM]: SEO_AUDIT_SEVERITY.COLORS.MEDIUM,
    [SEO_AUDIT_SEVERITY.LEVELS.LOW]: SEO_AUDIT_SEVERITY.COLORS.LOW,
    [SEO_AUDIT_SEVERITY.LEVELS.INFO]: SEO_AUDIT_SEVERITY.COLORS.INFO,
    [SEO_AUDIT_SEVERITY.LEVELS.NONE]: SEO_AUDIT_SEVERITY.COLORS.NONE,
  };
  return colors[level] || SEO_AUDIT_SEVERITY.COLORS.NONE;
}

export function getAuditSeverityPriority(level: SEOAuditSeverityLevel): SEOAuditSeverityPriority {
  const priorities: Record<SEOAuditSeverityLevel, SEOAuditSeverityPriority> = {
    [SEO_AUDIT_SEVERITY.LEVELS.CRITICAL]: SEO_AUDIT_SEVERITY.PRIORITY.CRITICAL,
    [SEO_AUDIT_SEVERITY.LEVELS.HIGH]: SEO_AUDIT_SEVERITY.PRIORITY.HIGH,
    [SEO_AUDIT_SEVERITY.LEVELS.MEDIUM]: SEO_AUDIT_SEVERITY.PRIORITY.MEDIUM,
    [SEO_AUDIT_SEVERITY.LEVELS.LOW]: SEO_AUDIT_SEVERITY.PRIORITY.LOW,
    [SEO_AUDIT_SEVERITY.LEVELS.INFO]: SEO_AUDIT_SEVERITY.PRIORITY.INFO,
    [SEO_AUDIT_SEVERITY.LEVELS.NONE]: SEO_AUDIT_SEVERITY.PRIORITY.NONE,
  };
  return priorities[level] || SEO_AUDIT_SEVERITY.PRIORITY.NONE;
}

export function getAuditSeverityImpact(level: SEOAuditSeverityLevel): SEOAuditSeverityImpact {
  const impacts: Record<SEOAuditSeverityLevel, SEOAuditSeverityImpact> = {
    [SEO_AUDIT_SEVERITY.LEVELS.CRITICAL]: SEO_AUDIT_SEVERITY.IMPACT.HIGH,
    [SEO_AUDIT_SEVERITY.LEVELS.HIGH]: SEO_AUDIT_SEVERITY.IMPACT.HIGH,
    [SEO_AUDIT_SEVERITY.LEVELS.MEDIUM]: SEO_AUDIT_SEVERITY.IMPACT.MEDIUM,
    [SEO_AUDIT_SEVERITY.LEVELS.LOW]: SEO_AUDIT_SEVERITY.IMPACT.LOW,
    [SEO_AUDIT_SEVERITY.LEVELS.INFO]: SEO_AUDIT_SEVERITY.IMPACT.MINIMAL,
    [SEO_AUDIT_SEVERITY.LEVELS.NONE]: SEO_AUDIT_SEVERITY.IMPACT.MINIMAL,
  };
  return impacts[level] || SEO_AUDIT_SEVERITY.IMPACT.MINIMAL;
}

export function getAuditSeverityUrgency(level: SEOAuditSeverityLevel): SEOAuditSeverityUrgency {
  const urgencies: Record<SEOAuditSeverityLevel, SEOAuditSeverityUrgency> = {
    [SEO_AUDIT_SEVERITY.LEVELS.CRITICAL]: SEO_AUDIT_SEVERITY.URGENCY.IMMEDIATE,
    [SEO_AUDIT_SEVERITY.LEVELS.HIGH]: SEO_AUDIT_SEVERITY.URGENCY.URGENT,
    [SEO_AUDIT_SEVERITY.LEVELS.MEDIUM]: SEO_AUDIT_SEVERITY.URGENCY.SOON,
    [SEO_AUDIT_SEVERITY.LEVELS.LOW]: SEO_AUDIT_SEVERITY.URGENCY.LATER,
    [SEO_AUDIT_SEVERITY.LEVELS.INFO]: SEO_AUDIT_SEVERITY.URGENCY.WHENEVER,
    [SEO_AUDIT_SEVERITY.LEVELS.NONE]: SEO_AUDIT_SEVERITY.URGENCY.WHENEVER,
  };
  return urgencies[level] || SEO_AUDIT_SEVERITY.URGENCY.WHENEVER;
}

export function getAuditSeverityCategory(level: SEOAuditSeverityLevel): SEOAuditSeverityCategory {
  const categories: Record<SEOAuditSeverityLevel, SEOAuditSeverityCategory> = {
    [SEO_AUDIT_SEVERITY.LEVELS.CRITICAL]: SEO_AUDIT_SEVERITY.CATEGORIES.CRITICAL,
    [SEO_AUDIT_SEVERITY.LEVELS.HIGH]: SEO_AUDIT_SEVERITY.CATEGORIES.MAJOR,
    [SEO_AUDIT_SEVERITY.LEVELS.MEDIUM]: SEO_AUDIT_SEVERITY.CATEGORIES.MINOR,
    [SEO_AUDIT_SEVERITY.LEVELS.LOW]: SEO_AUDIT_SEVERITY.CATEGORIES.TRIVIAL,
    [SEO_AUDIT_SEVERITY.LEVELS.INFO]: SEO_AUDIT_SEVERITY.CATEGORIES.INFO,
    [SEO_AUDIT_SEVERITY.LEVELS.NONE]: SEO_AUDIT_SEVERITY.CATEGORIES.INFO,
  };
  return categories[level] || SEO_AUDIT_SEVERITY.CATEGORIES.INFO;
}

export function getAuditSeverityWeight(level: SEOAuditSeverityLevel): number {
  const weights: Record<SEOAuditSeverityLevel, number> = {
    [SEO_AUDIT_SEVERITY.LEVELS.CRITICAL]: 5,
    [SEO_AUDIT_SEVERITY.LEVELS.HIGH]: 4,
    [SEO_AUDIT_SEVERITY.LEVELS.MEDIUM]: 3,
    [SEO_AUDIT_SEVERITY.LEVELS.LOW]: 2,
    [SEO_AUDIT_SEVERITY.LEVELS.INFO]: 1,
    [SEO_AUDIT_SEVERITY.LEVELS.NONE]: 0,
  };
  return weights[level] || 0;
}

export function isAuditSeverityActionable(level: SEOAuditSeverityLevel): boolean {
  const actionableLevels: SEOAuditSeverityLevel[] = [
    SEO_AUDIT_SEVERITY.LEVELS.CRITICAL,
    SEO_AUDIT_SEVERITY.LEVELS.HIGH,
    SEO_AUDIT_SEVERITY.LEVELS.MEDIUM,
    SEO_AUDIT_SEVERITY.LEVELS.LOW,
  ];
  return actionableLevels.includes(level);
}

export function getAuditSeverityRecommendation(level: SEOAuditSeverityLevel): string {
  const recommendations: Record<SEOAuditSeverityLevel, string> = {
    [SEO_AUDIT_SEVERITY.LEVELS.CRITICAL]:
      'Immediate action required. Critical impact on SEO performance.',
    [SEO_AUDIT_SEVERITY.LEVELS.HIGH]:
      'Urgent action needed. Significant impact on SEO performance.',
    [SEO_AUDIT_SEVERITY.LEVELS.MEDIUM]: 'Action recommended. Moderate impact on SEO performance.',
    [SEO_AUDIT_SEVERITY.LEVELS.LOW]: 'Consider action. Minor impact on SEO performance.',
    [SEO_AUDIT_SEVERITY.LEVELS.INFO]: 'Informational. No immediate action required.',
    [SEO_AUDIT_SEVERITY.LEVELS.NONE]: 'No action needed.',
  };
  return recommendations[level] || 'Unknown recommendation.';
}
