/**
 * Notification Priority Constants
 * Priority definitions for notifications
 */

export const NOTIFICATION_PRIORITY = {
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

  // Priority Defaults
  DEFAULTS: {
    DEFAULT_PRIORITY: 'medium',
    DEFAULT_SCORE: 50,
    DEFAULT_COLOR: '#3B82F6',
    DEFAULT_SLA_TARGET: 30,
  } as const,
} as const;

// Priority Levels
export type NotificationPriorityLevel =
  (typeof NOTIFICATION_PRIORITY.LEVELS)[keyof typeof NOTIFICATION_PRIORITY.LEVELS];

// Priority Scores
export type NotificationPriorityScore =
  (typeof NOTIFICATION_PRIORITY.SCORES)[keyof typeof NOTIFICATION_PRIORITY.SCORES];

// Priority Colors
export type NotificationPriorityColor =
  (typeof NOTIFICATION_PRIORITY.COLORS)[keyof typeof NOTIFICATION_PRIORITY.COLORS];

// SLA Targets
export type NotificationPrioritySLATarget =
  (typeof NOTIFICATION_PRIORITY.SLA_TARGETS)[keyof typeof NOTIFICATION_PRIORITY.SLA_TARGETS];

// Priority Defaults
export type NotificationPriorityDefault =
  (typeof NOTIFICATION_PRIORITY.DEFAULTS)[keyof typeof NOTIFICATION_PRIORITY.DEFAULTS];

// Utility Functions
export function notificationGetPriorityLabel(priority: NotificationPriorityLevel): string {
  const labels: Record<NotificationPriorityLevel, string> = {
    [NOTIFICATION_PRIORITY.LEVELS.CRITICAL]: 'Critical',
    [NOTIFICATION_PRIORITY.LEVELS.HIGH]: 'High',
    [NOTIFICATION_PRIORITY.LEVELS.MEDIUM]: 'Medium',
    [NOTIFICATION_PRIORITY.LEVELS.LOW]: 'Low',
    [NOTIFICATION_PRIORITY.LEVELS.BACKGROUND]: 'Background',
  };
  return labels[priority] || 'Unknown Priority';
}

export function notificationGetPriorityScore(
  priority: NotificationPriorityLevel
): NotificationPriorityScore {
  const scores: Record<NotificationPriorityLevel, NotificationPriorityScore> = {
    [NOTIFICATION_PRIORITY.LEVELS.CRITICAL]: NOTIFICATION_PRIORITY.SCORES.CRITICAL,
    [NOTIFICATION_PRIORITY.LEVELS.HIGH]: NOTIFICATION_PRIORITY.SCORES.HIGH,
    [NOTIFICATION_PRIORITY.LEVELS.MEDIUM]: NOTIFICATION_PRIORITY.SCORES.MEDIUM,
    [NOTIFICATION_PRIORITY.LEVELS.LOW]: NOTIFICATION_PRIORITY.SCORES.LOW,
    [NOTIFICATION_PRIORITY.LEVELS.BACKGROUND]: NOTIFICATION_PRIORITY.SCORES.BACKGROUND,
  };
  return scores[priority] || NOTIFICATION_PRIORITY.SCORES.MEDIUM;
}

export function notificationGetPriorityColor(
  priority: NotificationPriorityLevel
): NotificationPriorityColor {
  const colors: Record<NotificationPriorityLevel, NotificationPriorityColor> = {
    [NOTIFICATION_PRIORITY.LEVELS.CRITICAL]: NOTIFICATION_PRIORITY.COLORS.CRITICAL,
    [NOTIFICATION_PRIORITY.LEVELS.HIGH]: NOTIFICATION_PRIORITY.COLORS.HIGH,
    [NOTIFICATION_PRIORITY.LEVELS.MEDIUM]: NOTIFICATION_PRIORITY.COLORS.MEDIUM,
    [NOTIFICATION_PRIORITY.LEVELS.LOW]: NOTIFICATION_PRIORITY.COLORS.LOW,
    [NOTIFICATION_PRIORITY.LEVELS.BACKGROUND]: NOTIFICATION_PRIORITY.COLORS.BACKGROUND,
  };
  return colors[priority] || NOTIFICATION_PRIORITY.COLORS.MEDIUM;
}

export function notificationGetPrioritySLATarget(
  priority: NotificationPriorityLevel
): NotificationPrioritySLATarget {
  const targets: Record<NotificationPriorityLevel, NotificationPrioritySLATarget> = {
    [NOTIFICATION_PRIORITY.LEVELS.CRITICAL]: NOTIFICATION_PRIORITY.SLA_TARGETS.CRITICAL,
    [NOTIFICATION_PRIORITY.LEVELS.HIGH]: NOTIFICATION_PRIORITY.SLA_TARGETS.HIGH,
    [NOTIFICATION_PRIORITY.LEVELS.MEDIUM]: NOTIFICATION_PRIORITY.SLA_TARGETS.MEDIUM,
    [NOTIFICATION_PRIORITY.LEVELS.LOW]: NOTIFICATION_PRIORITY.SLA_TARGETS.LOW,
    [NOTIFICATION_PRIORITY.LEVELS.BACKGROUND]: NOTIFICATION_PRIORITY.SLA_TARGETS.BACKGROUND,
  };
  return targets[priority] || NOTIFICATION_PRIORITY.SLA_TARGETS.MEDIUM;
}

export function notificationIsCriticalPriority(priority: NotificationPriorityLevel): boolean {
  return priority === NOTIFICATION_PRIORITY.LEVELS.CRITICAL;
}

export function notificationIsHighPriority(priority: NotificationPriorityLevel): boolean {
  const highPriorities: NotificationPriorityLevel[] = [
    NOTIFICATION_PRIORITY.LEVELS.CRITICAL,
    NOTIFICATION_PRIORITY.LEVELS.HIGH,
  ];
  return highPriorities.includes(priority);
}

export function notificationIsLowPriority(priority: NotificationPriorityLevel): boolean {
  const lowPriorities: NotificationPriorityLevel[] = [
    NOTIFICATION_PRIORITY.LEVELS.LOW,
    NOTIFICATION_PRIORITY.LEVELS.BACKGROUND,
  ];
  return lowPriorities.includes(priority);
}

export function notificationGetDefaultPriority(): NotificationPriorityLevel {
  return NOTIFICATION_PRIORITY.DEFAULTS.DEFAULT_PRIORITY;
}

export function notificationGetDefaultScore(): number {
  return NOTIFICATION_PRIORITY.DEFAULTS.DEFAULT_SCORE;
}

export function notificationGetPriorityFromScore(score: number): NotificationPriorityLevel {
  if (score >= NOTIFICATION_PRIORITY.SCORES.CRITICAL) {
    return NOTIFICATION_PRIORITY.LEVELS.CRITICAL;
  }
  if (score >= NOTIFICATION_PRIORITY.SCORES.HIGH) {
    return NOTIFICATION_PRIORITY.LEVELS.HIGH;
  }
  if (score >= NOTIFICATION_PRIORITY.SCORES.MEDIUM) {
    return NOTIFICATION_PRIORITY.LEVELS.MEDIUM;
  }
  if (score >= NOTIFICATION_PRIORITY.SCORES.LOW) {
    return NOTIFICATION_PRIORITY.LEVELS.LOW;
  }
  return NOTIFICATION_PRIORITY.LEVELS.BACKGROUND;
}
