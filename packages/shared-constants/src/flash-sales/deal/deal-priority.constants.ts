/**
 * Deal Priority Constants
 * Priority levels for deals
 */

export const DEAL_PRIORITY = {
  // Priority Levels
  LEVELS: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
    URGENT: 'urgent',
  },

  // Priority Scores
  SCORES: {
    LOW: 10,
    MEDIUM: 30,
    HIGH: 60,
    CRITICAL: 80,
    URGENT: 100,
  },

  // Priority Colors (for UI)
  COLORS: {
    LOW: '#6B7280',
    MEDIUM: '#F59E0B',
    HIGH: '#3B82F6',
    CRITICAL: '#EF4444',
    URGENT: '#DC2626',
  },

  // SLA Targets (in minutes)
  SLA_TARGETS: {
    LOW: 120,
    MEDIUM: 60,
    HIGH: 30,
    CRITICAL: 15,
    URGENT: 5,
  },

  // Resource Allocation (%)
  RESOURCE_ALLOCATION: {
    LOW: 10,
    MEDIUM: 20,
    HIGH: 35,
    CRITICAL: 50,
    URGENT: 70,
  },

  // Priority Weight
  WEIGHT: {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    CRITICAL: 4,
    URGENT: 5,
  },
} as const;

// Priority Levels
export type DealPriorityLevel = (typeof DEAL_PRIORITY.LEVELS)[keyof typeof DEAL_PRIORITY.LEVELS];

// Priority Scores
export type DealPriorityScore = (typeof DEAL_PRIORITY.SCORES)[keyof typeof DEAL_PRIORITY.SCORES];

// Priority Colors
export type DealPriorityColor = (typeof DEAL_PRIORITY.COLORS)[keyof typeof DEAL_PRIORITY.COLORS];

// SLA Targets
export type DealPrioritySLATarget =
  (typeof DEAL_PRIORITY.SLA_TARGETS)[keyof typeof DEAL_PRIORITY.SLA_TARGETS];

// Resource Allocation
export type DealPriorityResourceAllocation =
  (typeof DEAL_PRIORITY.RESOURCE_ALLOCATION)[keyof typeof DEAL_PRIORITY.RESOURCE_ALLOCATION];

// Priority Weight
export type DealPriorityWeight = (typeof DEAL_PRIORITY.WEIGHT)[keyof typeof DEAL_PRIORITY.WEIGHT];

// Utility Functions
export function flashsalesDealPriorityGetLevelLabel(level: DealPriorityLevel): string {
  const labels: Record<DealPriorityLevel, string> = {
    [DEAL_PRIORITY.LEVELS.LOW]: 'Low Priority',
    [DEAL_PRIORITY.LEVELS.MEDIUM]: 'Medium Priority',
    [DEAL_PRIORITY.LEVELS.HIGH]: 'High Priority',
    [DEAL_PRIORITY.LEVELS.CRITICAL]: 'Critical Priority',
    [DEAL_PRIORITY.LEVELS.URGENT]: 'Urgent Priority',
  };
  return labels[level] || 'Unknown Priority';
}

export function flashsalesDealPriorityGetScore(level: DealPriorityLevel): DealPriorityScore {
  const scores: Record<DealPriorityLevel, DealPriorityScore> = {
    [DEAL_PRIORITY.LEVELS.LOW]: DEAL_PRIORITY.SCORES.LOW,
    [DEAL_PRIORITY.LEVELS.MEDIUM]: DEAL_PRIORITY.SCORES.MEDIUM,
    [DEAL_PRIORITY.LEVELS.HIGH]: DEAL_PRIORITY.SCORES.HIGH,
    [DEAL_PRIORITY.LEVELS.CRITICAL]: DEAL_PRIORITY.SCORES.CRITICAL,
    [DEAL_PRIORITY.LEVELS.URGENT]: DEAL_PRIORITY.SCORES.URGENT,
  };
  return scores[level] || DEAL_PRIORITY.SCORES.MEDIUM;
}

export function flashsalesDealPriorityGetColor(level: DealPriorityLevel): DealPriorityColor {
  const colors: Record<DealPriorityLevel, DealPriorityColor> = {
    [DEAL_PRIORITY.LEVELS.LOW]: DEAL_PRIORITY.COLORS.LOW,
    [DEAL_PRIORITY.LEVELS.MEDIUM]: DEAL_PRIORITY.COLORS.MEDIUM,
    [DEAL_PRIORITY.LEVELS.HIGH]: DEAL_PRIORITY.COLORS.HIGH,
    [DEAL_PRIORITY.LEVELS.CRITICAL]: DEAL_PRIORITY.COLORS.CRITICAL,
    [DEAL_PRIORITY.LEVELS.URGENT]: DEAL_PRIORITY.COLORS.URGENT,
  };
  return colors[level] || DEAL_PRIORITY.COLORS.MEDIUM;
}

export function flashsalesDealPriorityGetSLATarget(
  level: DealPriorityLevel
): DealPrioritySLATarget {
  const targets: Record<DealPriorityLevel, DealPrioritySLATarget> = {
    [DEAL_PRIORITY.LEVELS.LOW]: DEAL_PRIORITY.SLA_TARGETS.LOW,
    [DEAL_PRIORITY.LEVELS.MEDIUM]: DEAL_PRIORITY.SLA_TARGETS.MEDIUM,
    [DEAL_PRIORITY.LEVELS.HIGH]: DEAL_PRIORITY.SLA_TARGETS.HIGH,
    [DEAL_PRIORITY.LEVELS.CRITICAL]: DEAL_PRIORITY.SLA_TARGETS.CRITICAL,
    [DEAL_PRIORITY.LEVELS.URGENT]: DEAL_PRIORITY.SLA_TARGETS.URGENT,
  };
  return targets[level] || DEAL_PRIORITY.SLA_TARGETS.MEDIUM;
}

export function flashsalesDealPriorityGetResourceAllocation(
  level: DealPriorityLevel
): DealPriorityResourceAllocation {
  const allocations: Record<DealPriorityLevel, DealPriorityResourceAllocation> = {
    [DEAL_PRIORITY.LEVELS.LOW]: DEAL_PRIORITY.RESOURCE_ALLOCATION.LOW,
    [DEAL_PRIORITY.LEVELS.MEDIUM]: DEAL_PRIORITY.RESOURCE_ALLOCATION.MEDIUM,
    [DEAL_PRIORITY.LEVELS.HIGH]: DEAL_PRIORITY.RESOURCE_ALLOCATION.HIGH,
    [DEAL_PRIORITY.LEVELS.CRITICAL]: DEAL_PRIORITY.RESOURCE_ALLOCATION.CRITICAL,
    [DEAL_PRIORITY.LEVELS.URGENT]: DEAL_PRIORITY.RESOURCE_ALLOCATION.URGENT,
  };
  return allocations[level] || DEAL_PRIORITY.RESOURCE_ALLOCATION.MEDIUM;
}

export function flashsalesDealPriorityGetWeight(level: DealPriorityLevel): DealPriorityWeight {
  const weights: Record<DealPriorityLevel, DealPriorityWeight> = {
    [DEAL_PRIORITY.LEVELS.LOW]: DEAL_PRIORITY.WEIGHT.LOW,
    [DEAL_PRIORITY.LEVELS.MEDIUM]: DEAL_PRIORITY.WEIGHT.MEDIUM,
    [DEAL_PRIORITY.LEVELS.HIGH]: DEAL_PRIORITY.WEIGHT.HIGH,
    [DEAL_PRIORITY.LEVELS.CRITICAL]: DEAL_PRIORITY.WEIGHT.CRITICAL,
    [DEAL_PRIORITY.LEVELS.URGENT]: DEAL_PRIORITY.WEIGHT.URGENT,
  };
  return weights[level] || DEAL_PRIORITY.WEIGHT.MEDIUM;
}

export function flashsalesDealPriorityIsUrgent(level: DealPriorityLevel): boolean {
  const urgentLevels: DealPriorityLevel[] = [
    DEAL_PRIORITY.LEVELS.CRITICAL,
    DEAL_PRIORITY.LEVELS.URGENT,
  ];
  return urgentLevels.includes(level);
}

export function flashsalesDealPriorityIsHigh(level: DealPriorityLevel): boolean {
  const highLevels: DealPriorityLevel[] = [
    DEAL_PRIORITY.LEVELS.HIGH,
    DEAL_PRIORITY.LEVELS.CRITICAL,
    DEAL_PRIORITY.LEVELS.URGENT,
  ];
  return highLevels.includes(level);
}

export function flashsalesDealPriorityIsLow(level: DealPriorityLevel): boolean {
  const lowLevels: DealPriorityLevel[] = [DEAL_PRIORITY.LEVELS.LOW, DEAL_PRIORITY.LEVELS.MEDIUM];
  return lowLevels.includes(level);
}

export function flashsalesDealPriorityIsValid(level: string): level is DealPriorityLevel {
  return Object.values(DEAL_PRIORITY.LEVELS).includes(level as DealPriorityLevel);
}

export function flashsalesDealPriorityGetPriorityFromScore(score: number): DealPriorityLevel {
  if (score >= DEAL_PRIORITY.SCORES.URGENT) {
    return DEAL_PRIORITY.LEVELS.URGENT;
  }
  if (score >= DEAL_PRIORITY.SCORES.CRITICAL) {
    return DEAL_PRIORITY.LEVELS.CRITICAL;
  }
  if (score >= DEAL_PRIORITY.SCORES.HIGH) {
    return DEAL_PRIORITY.LEVELS.HIGH;
  }
  if (score >= DEAL_PRIORITY.SCORES.MEDIUM) {
    return DEAL_PRIORITY.LEVELS.MEDIUM;
  }
  return DEAL_PRIORITY.LEVELS.LOW;
}
