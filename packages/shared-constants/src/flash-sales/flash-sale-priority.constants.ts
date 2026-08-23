/**
 * Flash Sale Priority Constants
 * Priority levels for flash sales and deals
 */

export const FLASH_SALE_PRIORITY = {
  // Priority Levels
  LEVELS: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
    URGENT: 'urgent',
  } as const,

  // Priority Scores
  SCORES: {
    LOW: 10,
    MEDIUM: 30,
    HIGH: 60,
    CRITICAL: 80,
    URGENT: 100,
  } as const,

  // Priority Colors (for UI)
  COLORS: {
    LOW: '#6B7280',
    MEDIUM: '#F59E0B',
    HIGH: '#3B82F6',
    CRITICAL: '#EF4444',
    URGENT: '#DC2626',
  } as const,

  // SLA Targets (in minutes)
  SLA_TARGETS: {
    LOW: 120,
    MEDIUM: 60,
    HIGH: 30,
    CRITICAL: 15,
    URGENT: 5,
  } as const,

  // Resource Allocation (%)
  RESOURCE_ALLOCATION: {
    LOW: 10,
    MEDIUM: 20,
    HIGH: 35,
    CRITICAL: 50,
    URGENT: 70,
  } as const,

  // Priority Weight
  WEIGHT: {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    CRITICAL: 4,
    URGENT: 5,
  } as const,

  // Escalation Levels
  ESCALATION: {
    LOW: 'none',
    MEDIUM: 'level_1',
    HIGH: 'level_2',
    CRITICAL: 'level_3',
    URGENT: 'level_4',
  } as const,
} as const;

// Priority Levels
export type FlashSalePriorityLevel =
  (typeof FLASH_SALE_PRIORITY.LEVELS)[keyof typeof FLASH_SALE_PRIORITY.LEVELS];

// Priority Scores
export type FlashSalePriorityScore =
  (typeof FLASH_SALE_PRIORITY.SCORES)[keyof typeof FLASH_SALE_PRIORITY.SCORES];

// Priority Colors
export type FlashSalePriorityColor =
  (typeof FLASH_SALE_PRIORITY.COLORS)[keyof typeof FLASH_SALE_PRIORITY.COLORS];

// SLA Targets
export type FlashSalePrioritySLATarget =
  (typeof FLASH_SALE_PRIORITY.SLA_TARGETS)[keyof typeof FLASH_SALE_PRIORITY.SLA_TARGETS];

// Resource Allocation
export type FlashSalePriorityResourceAllocation =
  (typeof FLASH_SALE_PRIORITY.RESOURCE_ALLOCATION)[keyof typeof FLASH_SALE_PRIORITY.RESOURCE_ALLOCATION];

// Priority Weight
export type FlashSalePriorityWeight =
  (typeof FLASH_SALE_PRIORITY.WEIGHT)[keyof typeof FLASH_SALE_PRIORITY.WEIGHT];

// Escalation Levels
export type FlashSalePriorityEscalation =
  (typeof FLASH_SALE_PRIORITY.ESCALATION)[keyof typeof FLASH_SALE_PRIORITY.ESCALATION];

// Utility Functions
export function flashSalePriorityGetLevelLabel(level: FlashSalePriorityLevel): string {
  const labels: Record<FlashSalePriorityLevel, string> = {
    [FLASH_SALE_PRIORITY.LEVELS.LOW]: 'Low Priority',
    [FLASH_SALE_PRIORITY.LEVELS.MEDIUM]: 'Medium Priority',
    [FLASH_SALE_PRIORITY.LEVELS.HIGH]: 'High Priority',
    [FLASH_SALE_PRIORITY.LEVELS.CRITICAL]: 'Critical Priority',
    [FLASH_SALE_PRIORITY.LEVELS.URGENT]: 'Urgent Priority',
  };
  return labels[level] || 'Unknown Priority';
}

export function flashSalePriorityGetScore(level: FlashSalePriorityLevel): FlashSalePriorityScore {
  const scores: Record<FlashSalePriorityLevel, FlashSalePriorityScore> = {
    [FLASH_SALE_PRIORITY.LEVELS.LOW]: FLASH_SALE_PRIORITY.SCORES.LOW,
    [FLASH_SALE_PRIORITY.LEVELS.MEDIUM]: FLASH_SALE_PRIORITY.SCORES.MEDIUM,
    [FLASH_SALE_PRIORITY.LEVELS.HIGH]: FLASH_SALE_PRIORITY.SCORES.HIGH,
    [FLASH_SALE_PRIORITY.LEVELS.CRITICAL]: FLASH_SALE_PRIORITY.SCORES.CRITICAL,
    [FLASH_SALE_PRIORITY.LEVELS.URGENT]: FLASH_SALE_PRIORITY.SCORES.URGENT,
  };
  return scores[level] || FLASH_SALE_PRIORITY.SCORES.MEDIUM;
}

export function flashSalePriorityGetColor(level: FlashSalePriorityLevel): FlashSalePriorityColor {
  const colors: Record<FlashSalePriorityLevel, FlashSalePriorityColor> = {
    [FLASH_SALE_PRIORITY.LEVELS.LOW]: FLASH_SALE_PRIORITY.COLORS.LOW,
    [FLASH_SALE_PRIORITY.LEVELS.MEDIUM]: FLASH_SALE_PRIORITY.COLORS.MEDIUM,
    [FLASH_SALE_PRIORITY.LEVELS.HIGH]: FLASH_SALE_PRIORITY.COLORS.HIGH,
    [FLASH_SALE_PRIORITY.LEVELS.CRITICAL]: FLASH_SALE_PRIORITY.COLORS.CRITICAL,
    [FLASH_SALE_PRIORITY.LEVELS.URGENT]: FLASH_SALE_PRIORITY.COLORS.URGENT,
  };
  return colors[level] || FLASH_SALE_PRIORITY.COLORS.MEDIUM;
}

export function flashSalePriorityGetSLATarget(
  level: FlashSalePriorityLevel
): FlashSalePrioritySLATarget {
  const targets: Record<FlashSalePriorityLevel, FlashSalePrioritySLATarget> = {
    [FLASH_SALE_PRIORITY.LEVELS.LOW]: FLASH_SALE_PRIORITY.SLA_TARGETS.LOW,
    [FLASH_SALE_PRIORITY.LEVELS.MEDIUM]: FLASH_SALE_PRIORITY.SLA_TARGETS.MEDIUM,
    [FLASH_SALE_PRIORITY.LEVELS.HIGH]: FLASH_SALE_PRIORITY.SLA_TARGETS.HIGH,
    [FLASH_SALE_PRIORITY.LEVELS.CRITICAL]: FLASH_SALE_PRIORITY.SLA_TARGETS.CRITICAL,
    [FLASH_SALE_PRIORITY.LEVELS.URGENT]: FLASH_SALE_PRIORITY.SLA_TARGETS.URGENT,
  };
  return targets[level] || FLASH_SALE_PRIORITY.SLA_TARGETS.MEDIUM;
}

export function flashSalePriorityGetResourceAllocation(
  level: FlashSalePriorityLevel
): FlashSalePriorityResourceAllocation {
  const allocations: Record<FlashSalePriorityLevel, FlashSalePriorityResourceAllocation> = {
    [FLASH_SALE_PRIORITY.LEVELS.LOW]: FLASH_SALE_PRIORITY.RESOURCE_ALLOCATION.LOW,
    [FLASH_SALE_PRIORITY.LEVELS.MEDIUM]: FLASH_SALE_PRIORITY.RESOURCE_ALLOCATION.MEDIUM,
    [FLASH_SALE_PRIORITY.LEVELS.HIGH]: FLASH_SALE_PRIORITY.RESOURCE_ALLOCATION.HIGH,
    [FLASH_SALE_PRIORITY.LEVELS.CRITICAL]: FLASH_SALE_PRIORITY.RESOURCE_ALLOCATION.CRITICAL,
    [FLASH_SALE_PRIORITY.LEVELS.URGENT]: FLASH_SALE_PRIORITY.RESOURCE_ALLOCATION.URGENT,
  };
  return allocations[level] || FLASH_SALE_PRIORITY.RESOURCE_ALLOCATION.MEDIUM;
}

export function flashSalePriorityGetWeight(level: FlashSalePriorityLevel): FlashSalePriorityWeight {
  const weights: Record<FlashSalePriorityLevel, FlashSalePriorityWeight> = {
    [FLASH_SALE_PRIORITY.LEVELS.LOW]: FLASH_SALE_PRIORITY.WEIGHT.LOW,
    [FLASH_SALE_PRIORITY.LEVELS.MEDIUM]: FLASH_SALE_PRIORITY.WEIGHT.MEDIUM,
    [FLASH_SALE_PRIORITY.LEVELS.HIGH]: FLASH_SALE_PRIORITY.WEIGHT.HIGH,
    [FLASH_SALE_PRIORITY.LEVELS.CRITICAL]: FLASH_SALE_PRIORITY.WEIGHT.CRITICAL,
    [FLASH_SALE_PRIORITY.LEVELS.URGENT]: FLASH_SALE_PRIORITY.WEIGHT.URGENT,
  };
  return weights[level] || FLASH_SALE_PRIORITY.WEIGHT.MEDIUM;
}

export function flashSalePriorityGetEscalation(
  level: FlashSalePriorityLevel
): FlashSalePriorityEscalation {
  const escalations: Record<FlashSalePriorityLevel, FlashSalePriorityEscalation> = {
    [FLASH_SALE_PRIORITY.LEVELS.LOW]: FLASH_SALE_PRIORITY.ESCALATION.LOW,
    [FLASH_SALE_PRIORITY.LEVELS.MEDIUM]: FLASH_SALE_PRIORITY.ESCALATION.MEDIUM,
    [FLASH_SALE_PRIORITY.LEVELS.HIGH]: FLASH_SALE_PRIORITY.ESCALATION.HIGH,
    [FLASH_SALE_PRIORITY.LEVELS.CRITICAL]: FLASH_SALE_PRIORITY.ESCALATION.CRITICAL,
    [FLASH_SALE_PRIORITY.LEVELS.URGENT]: FLASH_SALE_PRIORITY.ESCALATION.URGENT,
  };
  return escalations[level] || FLASH_SALE_PRIORITY.ESCALATION.LOW;
}

export function flashSalePriorityIsUrgent(level: FlashSalePriorityLevel): boolean {
  const urgentLevels: FlashSalePriorityLevel[] = [
    FLASH_SALE_PRIORITY.LEVELS.CRITICAL,
    FLASH_SALE_PRIORITY.LEVELS.URGENT,
  ];
  return urgentLevels.includes(level);
}

export function flashSalePriorityIsHigh(level: FlashSalePriorityLevel): boolean {
  const highLevels: FlashSalePriorityLevel[] = [
    FLASH_SALE_PRIORITY.LEVELS.HIGH,
    FLASH_SALE_PRIORITY.LEVELS.CRITICAL,
    FLASH_SALE_PRIORITY.LEVELS.URGENT,
  ];
  return highLevels.includes(level);
}

export function flashSalePriorityIsLow(level: FlashSalePriorityLevel): boolean {
  const lowLevels: FlashSalePriorityLevel[] = [
    FLASH_SALE_PRIORITY.LEVELS.LOW,
    FLASH_SALE_PRIORITY.LEVELS.MEDIUM,
  ];
  return lowLevels.includes(level);
}

export function flashSalePriorityIsValid(level: string): level is FlashSalePriorityLevel {
  return Object.values(FLASH_SALE_PRIORITY.LEVELS).includes(level as FlashSalePriorityLevel);
}

export function flashSalePriorityGetPriorityFromScore(score: number): FlashSalePriorityLevel {
  if (score >= FLASH_SALE_PRIORITY.SCORES.URGENT) {
    return FLASH_SALE_PRIORITY.LEVELS.URGENT;
  }
  if (score >= FLASH_SALE_PRIORITY.SCORES.CRITICAL) {
    return FLASH_SALE_PRIORITY.LEVELS.CRITICAL;
  }
  if (score >= FLASH_SALE_PRIORITY.SCORES.HIGH) {
    return FLASH_SALE_PRIORITY.LEVELS.HIGH;
  }
  if (score >= FLASH_SALE_PRIORITY.SCORES.MEDIUM) {
    return FLASH_SALE_PRIORITY.LEVELS.MEDIUM;
  }
  return FLASH_SALE_PRIORITY.LEVELS.LOW;
}
