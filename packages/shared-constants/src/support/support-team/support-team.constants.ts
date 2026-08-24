/**
 * Support Team Constants
 * Configuration for support teams
 */

export const SUPPORT_TEAM = {
  // Team Types
  TYPES: {
    GENERAL: 'general',
    TECHNICAL: 'technical',
    SALES: 'sales',
    BILLING: 'billing',
    SPECIALIST: 'specialist',
    ESCALATION: 'escalation',
    QUALITY: 'quality',
    TRAINING: 'training',
  } as const,

  // Team Statuses
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PAUSED: 'paused',
    ARCHIVED: 'archived',
  } as const,

  // Team Sizes
  SIZES: {
    SMALL: 3,
    MEDIUM: 7,
    LARGE: 15,
    XLARGE: 25,
  } as const,

  // Team Shifts
  SHIFTS: {
    MORNING: 'morning',
    AFTERNOON: 'afternoon',
    EVENING: 'evening',
    NIGHT: 'night',
    ROTATING: 'rotating',
    FLEXIBLE: 'flexible',
  } as const,

  // Team Performance Metrics
  METRICS: {
    TICKET_RESOLUTION: 'ticket_resolution',
    AVERAGE_RESPONSE_TIME: 'average_response_time',
    AVERAGE_HANDLE_TIME: 'average_handle_time',
    CSAT_SCORE: 'csat_score',
    NPS_SCORE: 'nps_score',
    PRODUCTIVITY_RATE: 'productivity_rate',
    UTILIZATION_RATE: 'utilization_rate',
    ESCALATION_RATE: 'escalation_rate',
    FIRST_CONTACT_RESOLUTION: 'first_contact_resolution',
    QUALITY_SCORE: 'quality_score',
  } as const,

  // Team Limits
  LIMITS: {
    MIN_AGENTS: 2,
    MAX_AGENTS: 30,
    MAX_TEAMS_PER_DEPARTMENT: 10,
    MAX_SHIFTS_PER_TEAM: 5,
  } as const,
} as const;

// Team Types
export type SupportTeamType = (typeof SUPPORT_TEAM.TYPES)[keyof typeof SUPPORT_TEAM.TYPES];

// Team Statuses
export type SupportTeamStatus = (typeof SUPPORT_TEAM.STATUS)[keyof typeof SUPPORT_TEAM.STATUS];

// Team Sizes
export type SupportTeamSize = (typeof SUPPORT_TEAM.SIZES)[keyof typeof SUPPORT_TEAM.SIZES];

// Team Shifts
export type SupportTeamShift = (typeof SUPPORT_TEAM.SHIFTS)[keyof typeof SUPPORT_TEAM.SHIFTS];

// Team Performance Metrics
export type SupportTeamMetric = (typeof SUPPORT_TEAM.METRICS)[keyof typeof SUPPORT_TEAM.METRICS];

// Utility Functions
export function supportTeamGetTypeLabel(type: SupportTeamType): string {
  const labels: Record<SupportTeamType, string> = {
    [SUPPORT_TEAM.TYPES.GENERAL]: 'General Support',
    [SUPPORT_TEAM.TYPES.TECHNICAL]: 'Technical Support',
    [SUPPORT_TEAM.TYPES.SALES]: 'Sales Support',
    [SUPPORT_TEAM.TYPES.BILLING]: 'Billing Support',
    [SUPPORT_TEAM.TYPES.SPECIALIST]: 'Specialist Support',
    [SUPPORT_TEAM.TYPES.ESCALATION]: 'Escalation Team',
    [SUPPORT_TEAM.TYPES.QUALITY]: 'Quality Team',
    [SUPPORT_TEAM.TYPES.TRAINING]: 'Training Team',
  };
  return labels[type] || 'Unknown';
}

export function supportTeamGetStatusLabel(status: SupportTeamStatus): string {
  const labels: Record<SupportTeamStatus, string> = {
    [SUPPORT_TEAM.STATUS.ACTIVE]: 'Active',
    [SUPPORT_TEAM.STATUS.INACTIVE]: 'Inactive',
    [SUPPORT_TEAM.STATUS.PAUSED]: 'Paused',
    [SUPPORT_TEAM.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown';
}

export function supportTeamGetShiftLabel(shift: SupportTeamShift): string {
  const labels: Record<SupportTeamShift, string> = {
    [SUPPORT_TEAM.SHIFTS.MORNING]: 'Morning (6AM - 2PM)',
    [SUPPORT_TEAM.SHIFTS.AFTERNOON]: 'Afternoon (2PM - 10PM)',
    [SUPPORT_TEAM.SHIFTS.EVENING]: 'Evening (4PM - 12AM)',
    [SUPPORT_TEAM.SHIFTS.NIGHT]: 'Night (10PM - 6AM)',
    [SUPPORT_TEAM.SHIFTS.ROTATING]: 'Rotating',
    [SUPPORT_TEAM.SHIFTS.FLEXIBLE]: 'Flexible',
  };
  return labels[shift] || 'Unknown';
}

export function supportTeamIsActive(status: SupportTeamStatus): boolean {
  return status === SUPPORT_TEAM.STATUS.ACTIVE;
}

export function supportTeamGetMetricLabel(metric: SupportTeamMetric): string {
  const labels: Record<SupportTeamMetric, string> = {
    [SUPPORT_TEAM.METRICS.TICKET_RESOLUTION]: 'Ticket Resolution',
    [SUPPORT_TEAM.METRICS.AVERAGE_RESPONSE_TIME]: 'Average Response Time',
    [SUPPORT_TEAM.METRICS.AVERAGE_HANDLE_TIME]: 'Average Handle Time',
    [SUPPORT_TEAM.METRICS.CSAT_SCORE]: 'CSAT Score',
    [SUPPORT_TEAM.METRICS.NPS_SCORE]: 'NPS Score',
    [SUPPORT_TEAM.METRICS.PRODUCTIVITY_RATE]: 'Productivity Rate',
    [SUPPORT_TEAM.METRICS.UTILIZATION_RATE]: 'Utilization Rate',
    [SUPPORT_TEAM.METRICS.ESCALATION_RATE]: 'Escalation Rate',
    [SUPPORT_TEAM.METRICS.FIRST_CONTACT_RESOLUTION]: 'First Contact Resolution',
    [SUPPORT_TEAM.METRICS.QUALITY_SCORE]: 'Quality Score',
  };
  return labels[metric] || 'Unknown';
}

export function supportTeamGetOptimalSize(teamType: SupportTeamType): number {
  const sizes: Record<SupportTeamType, number> = {
    [SUPPORT_TEAM.TYPES.GENERAL]: SUPPORT_TEAM.SIZES.MEDIUM,
    [SUPPORT_TEAM.TYPES.TECHNICAL]: SUPPORT_TEAM.SIZES.MEDIUM,
    [SUPPORT_TEAM.TYPES.SALES]: SUPPORT_TEAM.SIZES.MEDIUM,
    [SUPPORT_TEAM.TYPES.BILLING]: SUPPORT_TEAM.SIZES.SMALL,
    [SUPPORT_TEAM.TYPES.SPECIALIST]: SUPPORT_TEAM.SIZES.SMALL,
    [SUPPORT_TEAM.TYPES.ESCALATION]: SUPPORT_TEAM.SIZES.SMALL,
    [SUPPORT_TEAM.TYPES.QUALITY]: SUPPORT_TEAM.SIZES.SMALL,
    [SUPPORT_TEAM.TYPES.TRAINING]: SUPPORT_TEAM.SIZES.MEDIUM,
  };
  return sizes[teamType] || SUPPORT_TEAM.SIZES.MEDIUM;
}
