/**
 * Support Agent Constants
 * Configuration for support agents
 */

export const SUPPORT_AGENT = {
  // Agent Types
  TYPES: {
    SUPPORT: 'support',
    TECHNICAL: 'technical',
    SALES: 'sales',
    BILLING: 'billing',
    SPECIALIST: 'specialist',
    MANAGER: 'manager',
    SUPERVISOR: 'supervisor',
  } as const,

  // Agent Statuses
  STATUS: {
    AVAILABLE: 'available',
    BUSY: 'busy',
    OFFLINE: 'offline',
    AWAY: 'away',
    DO_NOT_DISTURB: 'do_not_disturb',
    IN_MEETING: 'in_meeting',
    ON_BREAK: 'on_break',
    TRAINING: 'training',
    ON_LEAVE: 'on_leave',
  } as const,

  // Agent Roles
  ROLES: {
    JUNIOR: 'junior',
    SENIOR: 'senior',
    EXPERT: 'expert',
    LEAD: 'lead',
    SUPERVISOR: 'supervisor',
    MANAGER: 'manager',
  } as const,

  // Agent Skills
  SKILLS: {
    COMMUNICATION: 'communication',
    PROBLEM_SOLVING: 'problem_solving',
    TECHNICAL: 'technical',
    PRODUCT_KNOWLEDGE: 'product_knowledge',
    LANGUAGE: 'language',
    SALES: 'sales',
    NEGOTIATION: 'negotiation',
    EMPATHY: 'empathy',
    TIME_MANAGEMENT: 'time_management',
    LEADERSHIP: 'leadership',
  } as const,

  // Agent Levels
  LEVELS: {
    L1: 'l1',
    L2: 'l2',
    L3: 'l3',
    L4: 'l4',
    L5: 'l5',
  } as const,

  // Agent Performance Metrics
  PERFORMANCE_METRICS: {
    TICKETS_RESOLVED: 'tickets_resolved',
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

  // Agent Shift Types
  SHIFT_TYPES: {
    MORNING: 'morning',
    AFTERNOON: 'afternoon',
    EVENING: 'evening',
    NIGHT: 'night',
    FLEXIBLE: 'flexible',
    ROTATING: 'rotating',
  } as const,

  // Agent Limits
  LIMITS: {
    MAX_CONCURRENT_CHATS: 5,
    MAX_TICKETS_PER_DAY: 50,
    MAX_ESCALATIONS_PER_DAY: 10,
    MAX_TRANSFERS_PER_DAY: 10,
    MAX_VACATION_DAYS: 30,
    MAX_SICK_LEAVE_DAYS: 15,
  } as const,
} as const;

// Agent Types
export type SupportAgentType = (typeof SUPPORT_AGENT.TYPES)[keyof typeof SUPPORT_AGENT.TYPES];

// Agent Statuses
export type SupportAgentStatus = (typeof SUPPORT_AGENT.STATUS)[keyof typeof SUPPORT_AGENT.STATUS];

// Agent Roles
export type SupportAgentRole = (typeof SUPPORT_AGENT.ROLES)[keyof typeof SUPPORT_AGENT.ROLES];

// Agent Skills
export type SupportAgentSkill = (typeof SUPPORT_AGENT.SKILLS)[keyof typeof SUPPORT_AGENT.SKILLS];

// Agent Levels
export type SupportAgentLevel = (typeof SUPPORT_AGENT.LEVELS)[keyof typeof SUPPORT_AGENT.LEVELS];

// Agent Shift Types
export type SupportAgentShiftType =
  (typeof SUPPORT_AGENT.SHIFT_TYPES)[keyof typeof SUPPORT_AGENT.SHIFT_TYPES];

// Utility Functions
export function supportAgentGetTypeLabel(type: SupportAgentType): string {
  const labels: Record<SupportAgentType, string> = {
    [SUPPORT_AGENT.TYPES.SUPPORT]: 'Support',
    [SUPPORT_AGENT.TYPES.TECHNICAL]: 'Technical',
    [SUPPORT_AGENT.TYPES.SALES]: 'Sales',
    [SUPPORT_AGENT.TYPES.BILLING]: 'Billing',
    [SUPPORT_AGENT.TYPES.SPECIALIST]: 'Specialist',
    [SUPPORT_AGENT.TYPES.MANAGER]: 'Manager',
    [SUPPORT_AGENT.TYPES.SUPERVISOR]: 'Supervisor',
  };
  return labels[type] || 'Unknown';
}

export function supportAgentGetStatusLabel(status: SupportAgentStatus): string {
  const labels: Record<SupportAgentStatus, string> = {
    [SUPPORT_AGENT.STATUS.AVAILABLE]: 'Available',
    [SUPPORT_AGENT.STATUS.BUSY]: 'Busy',
    [SUPPORT_AGENT.STATUS.OFFLINE]: 'Offline',
    [SUPPORT_AGENT.STATUS.AWAY]: 'Away',
    [SUPPORT_AGENT.STATUS.DO_NOT_DISTURB]: 'Do Not Disturb',
    [SUPPORT_AGENT.STATUS.IN_MEETING]: 'In Meeting',
    [SUPPORT_AGENT.STATUS.ON_BREAK]: 'On Break',
    [SUPPORT_AGENT.STATUS.TRAINING]: 'Training',
    [SUPPORT_AGENT.STATUS.ON_LEAVE]: 'On Leave',
  };
  return labels[status] || 'Unknown';
}

export function supportAgentGetRoleLabel(role: SupportAgentRole): string {
  const labels: Record<SupportAgentRole, string> = {
    [SUPPORT_AGENT.ROLES.JUNIOR]: 'Junior Agent',
    [SUPPORT_AGENT.ROLES.SENIOR]: 'Senior Agent',
    [SUPPORT_AGENT.ROLES.EXPERT]: 'Expert Agent',
    [SUPPORT_AGENT.ROLES.LEAD]: 'Team Lead',
    [SUPPORT_AGENT.ROLES.SUPERVISOR]: 'Supervisor',
    [SUPPORT_AGENT.ROLES.MANAGER]: 'Manager',
  };
  return labels[role] || 'Unknown';
}

export function supportAgentGetLevelLabel(level: SupportAgentLevel): string {
  const labels: Record<SupportAgentLevel, string> = {
    [SUPPORT_AGENT.LEVELS.L1]: 'Level 1',
    [SUPPORT_AGENT.LEVELS.L2]: 'Level 2',
    [SUPPORT_AGENT.LEVELS.L3]: 'Level 3',
    [SUPPORT_AGENT.LEVELS.L4]: 'Level 4',
    [SUPPORT_AGENT.LEVELS.L5]: 'Level 5',
  };
  return labels[level] || 'Unknown';
}

export function supportAgentIsAvailable(status: SupportAgentStatus): boolean {
  return status === SUPPORT_AGENT.STATUS.AVAILABLE;
}

export function supportAgentIsOnline(status: SupportAgentStatus): boolean {
  const onlineStatuses: SupportAgentStatus[] = [
    SUPPORT_AGENT.STATUS.AVAILABLE,
    SUPPORT_AGENT.STATUS.BUSY,
    SUPPORT_AGENT.STATUS.AWAY,
    SUPPORT_AGENT.STATUS.DO_NOT_DISTURB,
  ];
  return onlineStatuses.includes(status);
}

export function supportAgentCanHandleWork(status: SupportAgentStatus): boolean {
  const workStatuses: SupportAgentStatus[] = [
    SUPPORT_AGENT.STATUS.AVAILABLE,
    SUPPORT_AGENT.STATUS.BUSY,
  ];
  return workStatuses.includes(status);
}

export function supportAgentGetSkillLabel(skill: SupportAgentSkill): string {
  const labels: Record<SupportAgentSkill, string> = {
    [SUPPORT_AGENT.SKILLS.COMMUNICATION]: 'Communication',
    [SUPPORT_AGENT.SKILLS.PROBLEM_SOLVING]: 'Problem Solving',
    [SUPPORT_AGENT.SKILLS.TECHNICAL]: 'Technical Skills',
    [SUPPORT_AGENT.SKILLS.PRODUCT_KNOWLEDGE]: 'Product Knowledge',
    [SUPPORT_AGENT.SKILLS.LANGUAGE]: 'Language Skills',
    [SUPPORT_AGENT.SKILLS.SALES]: 'Sales Skills',
    [SUPPORT_AGENT.SKILLS.NEGOTIATION]: 'Negotiation Skills',
    [SUPPORT_AGENT.SKILLS.EMPATHY]: 'Empathy',
    [SUPPORT_AGENT.SKILLS.TIME_MANAGEMENT]: 'Time Management',
    [SUPPORT_AGENT.SKILLS.LEADERSHIP]: 'Leadership',
  };
  return labels[skill] || 'Unknown';
}

export function supportAgentGetShiftTypeLabel(shift: SupportAgentShiftType): string {
  const labels: Record<SupportAgentShiftType, string> = {
    [SUPPORT_AGENT.SHIFT_TYPES.MORNING]: 'Morning (6AM - 2PM)',
    [SUPPORT_AGENT.SHIFT_TYPES.AFTERNOON]: 'Afternoon (2PM - 10PM)',
    [SUPPORT_AGENT.SHIFT_TYPES.EVENING]: 'Evening (4PM - 12AM)',
    [SUPPORT_AGENT.SHIFT_TYPES.NIGHT]: 'Night (10PM - 6AM)',
    [SUPPORT_AGENT.SHIFT_TYPES.FLEXIBLE]: 'Flexible',
    [SUPPORT_AGENT.SHIFT_TYPES.ROTATING]: 'Rotating',
  };
  return labels[shift] || 'Unknown';
}
