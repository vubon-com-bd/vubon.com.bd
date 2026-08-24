/**
 * Support SLA Constants
 * Configuration for Service Level Agreements
 */

export const SUPPORT_SLA = {
  // SLA Types
  TYPES: {
    RESPONSE: 'response',
    RESOLUTION: 'resolution',
    FIRST_RESPONSE: 'first_response',
    FULL_RESOLUTION: 'full_resolution',
    ESCALATION: 'escalation',
    UPTIME: 'uptime',
  } as const,

  // SLA Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // SLA Statuses
  STATUS: {
    ACTIVE: 'active',
    PAUSED: 'paused',
    EXPIRED: 'expired',
    VIOLATED: 'violated',
    MET: 'met',
    PARTIALLY_MET: 'partially_met',
  } as const,

  // SLA Time Units
  TIME_UNITS: {
    MINUTES: 'minutes',
    HOURS: 'hours',
    DAYS: 'days',
    BUSINESS_HOURS: 'business_hours',
  } as const,

  // SLA Time Ranges
  TIME_RANGES: {
    // Response Times (in minutes)
    RESPONSE: {
      CRITICAL: 15,
      HIGH: 30,
      MEDIUM: 60,
      LOW: 120,
    },
    // Resolution Times (in hours)
    RESOLUTION: {
      CRITICAL: 4,
      HIGH: 8,
      MEDIUM: 24,
      LOW: 48,
    },
    // First Response Times (in minutes)
    FIRST_RESPONSE: {
      CRITICAL: 5,
      HIGH: 15,
      MEDIUM: 30,
      LOW: 60,
    },
  } as const,

  // SLA Business Hours
  BUSINESS_HOURS: {
    START: 9, // 9 AM
    END: 18, // 6 PM
    WEEKEND_START: 10, // 10 AM
    WEEKEND_END: 16, // 4 PM
    HOLIDAY_START: 10,
    HOLIDAY_END: 14,
  } as const,

  // SLA Escalation Levels
  ESCALATION: {
    LEVEL_0: 'level_0',
    LEVEL_1: 'level_1',
    LEVEL_2: 'level_2',
    LEVEL_3: 'level_3',
    LEVEL_4: 'level_4',
  } as const,

  // SLA Thresholds
  THRESHOLDS: {
    WARNING: 0.7, // 70% of SLA time
    CRITICAL: 0.9, // 90% of SLA time
    VIOLATION: 1.0, // 100% of SLA time
  } as const,

  // SLA Penalties
  PENALTIES: {
    FINANCIAL: 'financial',
    SERVICE_CREDIT: 'service_credit',
    ESCALATION: 'escalation',
    REVIEW: 'review',
  } as const,
} as const;

// SLA Types
export type SupportSLAType = (typeof SUPPORT_SLA.TYPES)[keyof typeof SUPPORT_SLA.TYPES];

// SLA Priorities
export type SupportSLAPriority =
  (typeof SUPPORT_SLA.PRIORITIES)[keyof typeof SUPPORT_SLA.PRIORITIES];

// SLA Statuses
export type SupportSLAStatus = (typeof SUPPORT_SLA.STATUS)[keyof typeof SUPPORT_SLA.STATUS];

// SLA Time Units
export type SupportSLATimeUnit =
  (typeof SUPPORT_SLA.TIME_UNITS)[keyof typeof SUPPORT_SLA.TIME_UNITS];

// Escalation Levels
export type SupportSLAEscalationLevel =
  (typeof SUPPORT_SLA.ESCALATION)[keyof typeof SUPPORT_SLA.ESCALATION];

// SLA Penalties
export type SupportSLAPenalty = (typeof SUPPORT_SLA.PENALTIES)[keyof typeof SUPPORT_SLA.PENALTIES];

// Utility Functions
export function supportSLAGetTypeLabel(type: SupportSLAType): string {
  const labels: Record<SupportSLAType, string> = {
    [SUPPORT_SLA.TYPES.RESPONSE]: 'Response SLA',
    [SUPPORT_SLA.TYPES.RESOLUTION]: 'Resolution SLA',
    [SUPPORT_SLA.TYPES.FIRST_RESPONSE]: 'First Response SLA',
    [SUPPORT_SLA.TYPES.FULL_RESOLUTION]: 'Full Resolution SLA',
    [SUPPORT_SLA.TYPES.ESCALATION]: 'Escalation SLA',
    [SUPPORT_SLA.TYPES.UPTIME]: 'Uptime SLA',
  };
  return labels[type] || 'Unknown';
}

export function supportSLAGetPriorityLabel(priority: SupportSLAPriority): string {
  const labels: Record<SupportSLAPriority, string> = {
    [SUPPORT_SLA.PRIORITIES.CRITICAL]: 'Critical',
    [SUPPORT_SLA.PRIORITIES.HIGH]: 'High',
    [SUPPORT_SLA.PRIORITIES.MEDIUM]: 'Medium',
    [SUPPORT_SLA.PRIORITIES.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function supportSLAGetStatusLabel(status: SupportSLAStatus): string {
  const labels: Record<SupportSLAStatus, string> = {
    [SUPPORT_SLA.STATUS.ACTIVE]: 'Active',
    [SUPPORT_SLA.STATUS.PAUSED]: 'Paused',
    [SUPPORT_SLA.STATUS.EXPIRED]: 'Expired',
    [SUPPORT_SLA.STATUS.VIOLATED]: 'Violated',
    [SUPPORT_SLA.STATUS.MET]: 'Met',
    [SUPPORT_SLA.STATUS.PARTIALLY_MET]: 'Partially Met',
  };
  return labels[status] || 'Unknown';
}

export function supportSLAGetResponseTime(priority: SupportSLAPriority): number {
  const times: Record<SupportSLAPriority, number> = {
    [SUPPORT_SLA.PRIORITIES.CRITICAL]: SUPPORT_SLA.TIME_RANGES.RESPONSE.CRITICAL,
    [SUPPORT_SLA.PRIORITIES.HIGH]: SUPPORT_SLA.TIME_RANGES.RESPONSE.HIGH,
    [SUPPORT_SLA.PRIORITIES.MEDIUM]: SUPPORT_SLA.TIME_RANGES.RESPONSE.MEDIUM,
    [SUPPORT_SLA.PRIORITIES.LOW]: SUPPORT_SLA.TIME_RANGES.RESPONSE.LOW,
  };
  return times[priority] || 60;
}

export function supportSLAGetResolutionTime(priority: SupportSLAPriority): number {
  const times: Record<SupportSLAPriority, number> = {
    [SUPPORT_SLA.PRIORITIES.CRITICAL]: SUPPORT_SLA.TIME_RANGES.RESOLUTION.CRITICAL,
    [SUPPORT_SLA.PRIORITIES.HIGH]: SUPPORT_SLA.TIME_RANGES.RESOLUTION.HIGH,
    [SUPPORT_SLA.PRIORITIES.MEDIUM]: SUPPORT_SLA.TIME_RANGES.RESOLUTION.MEDIUM,
    [SUPPORT_SLA.PRIORITIES.LOW]: SUPPORT_SLA.TIME_RANGES.RESOLUTION.LOW,
  };
  return times[priority] || 24;
}

export function supportSLAGetFirstResponseTime(priority: SupportSLAPriority): number {
  const times: Record<SupportSLAPriority, number> = {
    [SUPPORT_SLA.PRIORITIES.CRITICAL]: SUPPORT_SLA.TIME_RANGES.FIRST_RESPONSE.CRITICAL,
    [SUPPORT_SLA.PRIORITIES.HIGH]: SUPPORT_SLA.TIME_RANGES.FIRST_RESPONSE.HIGH,
    [SUPPORT_SLA.PRIORITIES.MEDIUM]: SUPPORT_SLA.TIME_RANGES.FIRST_RESPONSE.MEDIUM,
    [SUPPORT_SLA.PRIORITIES.LOW]: SUPPORT_SLA.TIME_RANGES.FIRST_RESPONSE.LOW,
  };
  return times[priority] || 30;
}

export function supportSLAIsActive(status: SupportSLAStatus): boolean {
  return status === SUPPORT_SLA.STATUS.ACTIVE;
}

export function supportSLAIsViolated(status: SupportSLAStatus): boolean {
  return status === SUPPORT_SLA.STATUS.VIOLATED;
}

export function supportSLAGetEscalationLevel(level: SupportSLAEscalationLevel): string {
  const labels: Record<SupportSLAEscalationLevel, string> = {
    [SUPPORT_SLA.ESCALATION.LEVEL_0]: 'Level 0 - No Escalation',
    [SUPPORT_SLA.ESCALATION.LEVEL_1]: 'Level 1 - Agent',
    [SUPPORT_SLA.ESCALATION.LEVEL_2]: 'Level 2 - Team Lead',
    [SUPPORT_SLA.ESCALATION.LEVEL_3]: 'Level 3 - Manager',
    [SUPPORT_SLA.ESCALATION.LEVEL_4]: 'Level 4 - Director',
  };
  return labels[level] || 'Unknown';
}

export function supportSLAIsWithinBusinessHours(date: Date): boolean {
  const hours = date.getHours();
  const day = date.getDay();
  const isWeekend = day === 0 || day === 6;
  const start = isWeekend
    ? SUPPORT_SLA.BUSINESS_HOURS.WEEKEND_START
    : SUPPORT_SLA.BUSINESS_HOURS.START;
  const end = isWeekend ? SUPPORT_SLA.BUSINESS_HOURS.WEEKEND_END : SUPPORT_SLA.BUSINESS_HOURS.END;
  return hours >= start && hours < end;
}
