/**
 * Report Priority Constants
 * Priority levels for report generation and delivery
 */

export const REPORT_PRIORITY = {
  // Priority Levels
  LEVELS: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BACKGROUND: 'background',
  } as const,

  // Priority Scores
  SCORES: {
    CRITICAL: 100,
    HIGH: 75,
    MEDIUM: 50,
    LOW: 25,
    BACKGROUND: 0,
  } as const,

  // Priority Colors (for UI)
  COLORS: {
    CRITICAL: '#EF4444',
    HIGH: '#F59E0B',
    MEDIUM: '#3B82F6',
    LOW: '#10B981',
    BACKGROUND: '#6B7280',
  } as const,

  // SLA Targets (in minutes)
  SLA_TARGETS: {
    CRITICAL: 5,
    HIGH: 15,
    MEDIUM: 30,
    LOW: 60,
    BACKGROUND: 120,
  } as const,

  // Escalation Levels
  ESCALATION_LEVELS: {
    LEVEL_1: 'level_1',
    LEVEL_2: 'level_2',
    LEVEL_3: 'level_3',
    LEVEL_4: 'level_4',
    LEVEL_5: 'level_5',
  } as const,
} as const;

// Priority Levels
export type ReportPriorityLevel =
  (typeof REPORT_PRIORITY.LEVELS)[keyof typeof REPORT_PRIORITY.LEVELS];

// Priority Scores
export type ReportPriorityScore =
  (typeof REPORT_PRIORITY.SCORES)[keyof typeof REPORT_PRIORITY.SCORES];

// Priority Colors
export type ReportPriorityColor =
  (typeof REPORT_PRIORITY.COLORS)[keyof typeof REPORT_PRIORITY.COLORS];

// SLA Targets
export type ReportSLATarget =
  (typeof REPORT_PRIORITY.SLA_TARGETS)[keyof typeof REPORT_PRIORITY.SLA_TARGETS];

// Escalation Levels
export type ReportEscalationLevel =
  (typeof REPORT_PRIORITY.ESCALATION_LEVELS)[keyof typeof REPORT_PRIORITY.ESCALATION_LEVELS];

// Utility Functions
export function getReportPriorityLabel(priority: ReportPriorityLevel): string {
  const labels: Record<ReportPriorityLevel, string> = {
    [REPORT_PRIORITY.LEVELS.CRITICAL]: 'Critical',
    [REPORT_PRIORITY.LEVELS.HIGH]: 'High',
    [REPORT_PRIORITY.LEVELS.MEDIUM]: 'Medium',
    [REPORT_PRIORITY.LEVELS.LOW]: 'Low',
    [REPORT_PRIORITY.LEVELS.BACKGROUND]: 'Background',
  };
  return labels[priority] || 'Unknown Priority';
}

export function getReportPriorityScore(priority: ReportPriorityLevel): ReportPriorityScore {
  const scores: Record<ReportPriorityLevel, ReportPriorityScore> = {
    [REPORT_PRIORITY.LEVELS.CRITICAL]: REPORT_PRIORITY.SCORES.CRITICAL,
    [REPORT_PRIORITY.LEVELS.HIGH]: REPORT_PRIORITY.SCORES.HIGH,
    [REPORT_PRIORITY.LEVELS.MEDIUM]: REPORT_PRIORITY.SCORES.MEDIUM,
    [REPORT_PRIORITY.LEVELS.LOW]: REPORT_PRIORITY.SCORES.LOW,
    [REPORT_PRIORITY.LEVELS.BACKGROUND]: REPORT_PRIORITY.SCORES.BACKGROUND,
  };
  return scores[priority] || REPORT_PRIORITY.SCORES.MEDIUM;
}

export function getReportPriorityColor(priority: ReportPriorityLevel): ReportPriorityColor {
  const colors: Record<ReportPriorityLevel, ReportPriorityColor> = {
    [REPORT_PRIORITY.LEVELS.CRITICAL]: REPORT_PRIORITY.COLORS.CRITICAL,
    [REPORT_PRIORITY.LEVELS.HIGH]: REPORT_PRIORITY.COLORS.HIGH,
    [REPORT_PRIORITY.LEVELS.MEDIUM]: REPORT_PRIORITY.COLORS.MEDIUM,
    [REPORT_PRIORITY.LEVELS.LOW]: REPORT_PRIORITY.COLORS.LOW,
    [REPORT_PRIORITY.LEVELS.BACKGROUND]: REPORT_PRIORITY.COLORS.BACKGROUND,
  };
  return colors[priority] || REPORT_PRIORITY.COLORS.MEDIUM;
}

export function getReportSLATarget(priority: ReportPriorityLevel): ReportSLATarget {
  const targets: Record<ReportPriorityLevel, ReportSLATarget> = {
    [REPORT_PRIORITY.LEVELS.CRITICAL]: REPORT_PRIORITY.SLA_TARGETS.CRITICAL,
    [REPORT_PRIORITY.LEVELS.HIGH]: REPORT_PRIORITY.SLA_TARGETS.HIGH,
    [REPORT_PRIORITY.LEVELS.MEDIUM]: REPORT_PRIORITY.SLA_TARGETS.MEDIUM,
    [REPORT_PRIORITY.LEVELS.LOW]: REPORT_PRIORITY.SLA_TARGETS.LOW,
    [REPORT_PRIORITY.LEVELS.BACKGROUND]: REPORT_PRIORITY.SLA_TARGETS.BACKGROUND,
  };
  return targets[priority] || REPORT_PRIORITY.SLA_TARGETS.MEDIUM;
}

export function getReportEscalationLevel(
  priority: ReportPriorityLevel,
  retryCount: number
): ReportEscalationLevel {
  if (priority === REPORT_PRIORITY.LEVELS.CRITICAL) {
    if (retryCount >= 4) return REPORT_PRIORITY.ESCALATION_LEVELS.LEVEL_5;
    if (retryCount >= 3) return REPORT_PRIORITY.ESCALATION_LEVELS.LEVEL_4;
    if (retryCount >= 2) return REPORT_PRIORITY.ESCALATION_LEVELS.LEVEL_3;
    if (retryCount >= 1) return REPORT_PRIORITY.ESCALATION_LEVELS.LEVEL_2;
    return REPORT_PRIORITY.ESCALATION_LEVELS.LEVEL_1;
  }

  if (priority === REPORT_PRIORITY.LEVELS.HIGH) {
    if (retryCount >= 4) return REPORT_PRIORITY.ESCALATION_LEVELS.LEVEL_4;
    if (retryCount >= 3) return REPORT_PRIORITY.ESCALATION_LEVELS.LEVEL_3;
    if (retryCount >= 2) return REPORT_PRIORITY.ESCALATION_LEVELS.LEVEL_2;
    return REPORT_PRIORITY.ESCALATION_LEVELS.LEVEL_1;
  }

  if (priority === REPORT_PRIORITY.LEVELS.MEDIUM) {
    if (retryCount >= 4) return REPORT_PRIORITY.ESCALATION_LEVELS.LEVEL_3;
    if (retryCount >= 2) return REPORT_PRIORITY.ESCALATION_LEVELS.LEVEL_2;
    return REPORT_PRIORITY.ESCALATION_LEVELS.LEVEL_1;
  }

  return REPORT_PRIORITY.ESCALATION_LEVELS.LEVEL_1;
}

export function getEscalationLevelLabel(level: ReportEscalationLevel): string {
  const labels: Record<ReportEscalationLevel, string> = {
    [REPORT_PRIORITY.ESCALATION_LEVELS.LEVEL_1]: 'Level 1 - Initial',
    [REPORT_PRIORITY.ESCALATION_LEVELS.LEVEL_2]: 'Level 2 - Team Lead',
    [REPORT_PRIORITY.ESCALATION_LEVELS.LEVEL_3]: 'Level 3 - Manager',
    [REPORT_PRIORITY.ESCALATION_LEVELS.LEVEL_4]: 'Level 4 - Director',
    [REPORT_PRIORITY.ESCALATION_LEVELS.LEVEL_5]: 'Level 5 - Executive',
  };
  return labels[level] || 'Unknown Level';
}

export function isPriorityAboveThreshold(
  priority: ReportPriorityLevel,
  threshold: ReportPriorityLevel
): boolean {
  const priorityOrder: ReportPriorityLevel[] = [
    REPORT_PRIORITY.LEVELS.BACKGROUND,
    REPORT_PRIORITY.LEVELS.LOW,
    REPORT_PRIORITY.LEVELS.MEDIUM,
    REPORT_PRIORITY.LEVELS.HIGH,
    REPORT_PRIORITY.LEVELS.CRITICAL,
  ];

  const priorityIndex = priorityOrder.indexOf(priority);
  const thresholdIndex = priorityOrder.indexOf(threshold);

  return priorityIndex > thresholdIndex;
}

export function shouldEscalateReport(
  priority: ReportPriorityLevel,
  retryCount: number,
  timeElapsed: number
): boolean {
  const slaTarget = getReportSLATarget(priority);
  const maxRetries = priority === REPORT_PRIORITY.LEVELS.CRITICAL ? 3 : 5;

  return retryCount > maxRetries || timeElapsed > slaTarget * 2;
}

export function getPriorityFromScore(score: number): ReportPriorityLevel {
  if (score >= REPORT_PRIORITY.SCORES.CRITICAL) {
    return REPORT_PRIORITY.LEVELS.CRITICAL;
  }
  if (score >= REPORT_PRIORITY.SCORES.HIGH) {
    return REPORT_PRIORITY.LEVELS.HIGH;
  }
  if (score >= REPORT_PRIORITY.SCORES.MEDIUM) {
    return REPORT_PRIORITY.LEVELS.MEDIUM;
  }
  if (score >= REPORT_PRIORITY.SCORES.LOW) {
    return REPORT_PRIORITY.LEVELS.LOW;
  }
  return REPORT_PRIORITY.LEVELS.BACKGROUND;
}
