/**
 * SEO Priority Constants
 * Priority levels for SEO tasks and optimization
 */

export const SEO_PRIORITY = {
  // Priority Levels
  LEVELS: {
    P0: 'p0', // Critical - Immediate action required
    P1: 'p1', // High - Urgent action required
    P2: 'p2', // Medium - Important but not urgent
    P3: 'p3', // Low - Can be scheduled
    P4: 'p4', // Optional - Nice to have
  } as const,

  // Priority Scores (1-10)
  SCORES: {
    CRITICAL: 10,
    VERY_HIGH: 8,
    HIGH: 6,
    MEDIUM: 5,
    LOW: 3,
    VERY_LOW: 1,
    NONE: 0,
  } as const,

  // Priority Impact Levels
  IMPACTS: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    MINIMAL: 'minimal',
  } as const,

  // Priority Effort Levels
  EFFORTS: {
    EXTREME: 'extreme', // > 40 hours
    HIGH: 'high', // 20-40 hours
    MEDIUM: 'medium', // 10-20 hours
    LOW: 'low', // 5-10 hours
    MINIMAL: 'minimal', // < 5 hours
  } as const,

  // Priority Time Frames
  TIME_FRAMES: {
    IMMEDIATE: 'immediate', // < 24 hours
    URGENT: 'urgent', // 24-72 hours
    SOON: 'soon', // 3-7 days
    NORMAL: 'normal', // 1-2 weeks
    SCHEDULED: 'scheduled', // > 2 weeks
  } as const,

  // Priority Values for Sorting
  VALUES: {
    [0]: 0, // None
    [1]: 1, // P4
    [2]: 2, // P3
    [3]: 3, // P2
    [4]: 4, // P1
    [5]: 5, // P0
  } as const,
} as const;

// Priority Levels
export type SEOPriorityLevel = (typeof SEO_PRIORITY.LEVELS)[keyof typeof SEO_PRIORITY.LEVELS];

// Priority Scores
export type SEOPriorityScore = (typeof SEO_PRIORITY.SCORES)[keyof typeof SEO_PRIORITY.SCORES];

// Priority Impact
export type SEOPriorityImpact = (typeof SEO_PRIORITY.IMPACTS)[keyof typeof SEO_PRIORITY.IMPACTS];

// Priority Effort
export type SEOPriorityEffort = (typeof SEO_PRIORITY.EFFORTS)[keyof typeof SEO_PRIORITY.EFFORTS];

// Priority Time Frame
export type SEOPriorityTimeFrame =
  (typeof SEO_PRIORITY.TIME_FRAMES)[keyof typeof SEO_PRIORITY.TIME_FRAMES];

// SEO Specific Utility Functions (renamed to avoid conflicts with AI)
export function getSEOPriorityLevelLabel(level: SEOPriorityLevel): string {
  const labels: Record<SEOPriorityLevel, string> = {
    [SEO_PRIORITY.LEVELS.P0]: 'P0 - Critical',
    [SEO_PRIORITY.LEVELS.P1]: 'P1 - High',
    [SEO_PRIORITY.LEVELS.P2]: 'P2 - Medium',
    [SEO_PRIORITY.LEVELS.P3]: 'P3 - Low',
    [SEO_PRIORITY.LEVELS.P4]: 'P4 - Optional',
  };
  return labels[level] || 'Unknown Priority';
}

export function getSEOPriorityScoreLabel(score: SEOPriorityScore): string {
  const labels: Record<SEOPriorityScore, string> = {
    [SEO_PRIORITY.SCORES.CRITICAL]: 'Critical (10)',
    [SEO_PRIORITY.SCORES.VERY_HIGH]: 'Very High (8)',
    [SEO_PRIORITY.SCORES.HIGH]: 'High (6)',
    [SEO_PRIORITY.SCORES.MEDIUM]: 'Medium (5)',
    [SEO_PRIORITY.SCORES.LOW]: 'Low (3)',
    [SEO_PRIORITY.SCORES.VERY_LOW]: 'Very Low (1)',
    [SEO_PRIORITY.SCORES.NONE]: 'None (0)',
  };
  return labels[score] || 'Unknown Score';
}

export function getSEOPriorityImpactLabel(impact: SEOPriorityImpact): string {
  const labels: Record<SEOPriorityImpact, string> = {
    [SEO_PRIORITY.IMPACTS.CRITICAL]: 'Critical Impact',
    [SEO_PRIORITY.IMPACTS.HIGH]: 'High Impact',
    [SEO_PRIORITY.IMPACTS.MEDIUM]: 'Medium Impact',
    [SEO_PRIORITY.IMPACTS.LOW]: 'Low Impact',
    [SEO_PRIORITY.IMPACTS.MINIMAL]: 'Minimal Impact',
  };
  return labels[impact] || 'Unknown Impact';
}

export function getSEOPriorityEffortLabel(effort: SEOPriorityEffort): string {
  const labels: Record<SEOPriorityEffort, string> = {
    [SEO_PRIORITY.EFFORTS.EXTREME]: 'Extreme Effort (>40h)',
    [SEO_PRIORITY.EFFORTS.HIGH]: 'High Effort (20-40h)',
    [SEO_PRIORITY.EFFORTS.MEDIUM]: 'Medium Effort (10-20h)',
    [SEO_PRIORITY.EFFORTS.LOW]: 'Low Effort (5-10h)',
    [SEO_PRIORITY.EFFORTS.MINIMAL]: 'Minimal Effort (<5h)',
  };
  return labels[effort] || 'Unknown Effort';
}

export function getSEOPriorityTimeFrameLabel(timeFrame: SEOPriorityTimeFrame): string {
  const labels: Record<SEOPriorityTimeFrame, string> = {
    [SEO_PRIORITY.TIME_FRAMES.IMMEDIATE]: 'Immediate (<24h)',
    [SEO_PRIORITY.TIME_FRAMES.URGENT]: 'Urgent (24-72h)',
    [SEO_PRIORITY.TIME_FRAMES.SOON]: 'Soon (3-7 days)',
    [SEO_PRIORITY.TIME_FRAMES.NORMAL]: 'Normal (1-2 weeks)',
    [SEO_PRIORITY.TIME_FRAMES.SCHEDULED]: 'Scheduled (>2 weeks)',
  };
  return labels[timeFrame] || 'Unknown Time Frame';
}

export function calculateSEOPriorityScore(
  impact: SEOPriorityImpact,
  effort: SEOPriorityEffort,
  urgency: SEOPriorityTimeFrame
): SEOPriorityScore {
  // Impact score (1-5)
  const impactScores: Record<SEOPriorityImpact, number> = {
    [SEO_PRIORITY.IMPACTS.CRITICAL]: 5,
    [SEO_PRIORITY.IMPACTS.HIGH]: 4,
    [SEO_PRIORITY.IMPACTS.MEDIUM]: 3,
    [SEO_PRIORITY.IMPACTS.LOW]: 2,
    [SEO_PRIORITY.IMPACTS.MINIMAL]: 1,
  };

  // Effort score (1-5, inverted - lower effort is better)
  const effortScores: Record<SEOPriorityEffort, number> = {
    [SEO_PRIORITY.EFFORTS.EXTREME]: 1,
    [SEO_PRIORITY.EFFORTS.HIGH]: 2,
    [SEO_PRIORITY.EFFORTS.MEDIUM]: 3,
    [SEO_PRIORITY.EFFORTS.LOW]: 4,
    [SEO_PRIORITY.EFFORTS.MINIMAL]: 5,
  };

  // Urgency score (1-5)
  const urgencyScores: Record<SEOPriorityTimeFrame, number> = {
    [SEO_PRIORITY.TIME_FRAMES.IMMEDIATE]: 5,
    [SEO_PRIORITY.TIME_FRAMES.URGENT]: 4,
    [SEO_PRIORITY.TIME_FRAMES.SOON]: 3,
    [SEO_PRIORITY.TIME_FRAMES.NORMAL]: 2,
    [SEO_PRIORITY.TIME_FRAMES.SCHEDULED]: 1,
  };

  const score =
    impactScores[impact] * 0.4 + effortScores[effort] * 0.3 + urgencyScores[urgency] * 0.3;

  // Convert to priority score (1-10)
  const finalScore = Math.round(score);

  if (finalScore >= 9) return SEO_PRIORITY.SCORES.CRITICAL;
  if (finalScore >= 7) return SEO_PRIORITY.SCORES.VERY_HIGH;
  if (finalScore >= 5) return SEO_PRIORITY.SCORES.HIGH;
  if (finalScore >= 4) return SEO_PRIORITY.SCORES.MEDIUM;
  if (finalScore >= 3) return SEO_PRIORITY.SCORES.LOW;
  if (finalScore >= 1) return SEO_PRIORITY.SCORES.VERY_LOW;
  return SEO_PRIORITY.SCORES.NONE;
}

export function getSEOPriorityLevelFromScore(score: SEOPriorityScore): SEOPriorityLevel {
  const levelMap: Record<SEOPriorityScore, SEOPriorityLevel> = {
    [SEO_PRIORITY.SCORES.CRITICAL]: SEO_PRIORITY.LEVELS.P0,
    [SEO_PRIORITY.SCORES.VERY_HIGH]: SEO_PRIORITY.LEVELS.P1,
    [SEO_PRIORITY.SCORES.HIGH]: SEO_PRIORITY.LEVELS.P1,
    [SEO_PRIORITY.SCORES.MEDIUM]: SEO_PRIORITY.LEVELS.P2,
    [SEO_PRIORITY.SCORES.LOW]: SEO_PRIORITY.LEVELS.P3,
    [SEO_PRIORITY.SCORES.VERY_LOW]: SEO_PRIORITY.LEVELS.P3,
    [SEO_PRIORITY.SCORES.NONE]: SEO_PRIORITY.LEVELS.P4,
  };
  return levelMap[score] || SEO_PRIORITY.LEVELS.P4;
}

export function getSEOPriorityValue(level: SEOPriorityLevel): number {
  const values: Record<SEOPriorityLevel, number> = {
    [SEO_PRIORITY.LEVELS.P0]: 5,
    [SEO_PRIORITY.LEVELS.P1]: 4,
    [SEO_PRIORITY.LEVELS.P2]: 3,
    [SEO_PRIORITY.LEVELS.P3]: 2,
    [SEO_PRIORITY.LEVELS.P4]: 1,
  };
  return values[level] || 0;
}

export function shouldSEOPrioritizeOver(
  level1: SEOPriorityLevel,
  level2: SEOPriorityLevel
): boolean {
  return getSEOPriorityValue(level1) > getSEOPriorityValue(level2);
}

export function getSEOPriorityColor(level: SEOPriorityLevel): string {
  const colors: Record<SEOPriorityLevel, string> = {
    [SEO_PRIORITY.LEVELS.P0]: '#D32F2F', // Red - Critical
    [SEO_PRIORITY.LEVELS.P1]: '#F44336', // Red - High
    [SEO_PRIORITY.LEVELS.P2]: '#FF9800', // Orange - Medium
    [SEO_PRIORITY.LEVELS.P3]: '#2196F3', // Blue - Low
    [SEO_PRIORITY.LEVELS.P4]: '#9E9E9E', // Gray - Optional
  };
  return colors[level] || '#9E9E9E';
}
