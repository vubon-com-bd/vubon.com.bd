/**
 * Ticket Escalation Constants
 * Escalation levels and rules for support tickets
 */

export const TICKET_ESCALATION = {
  // Escalation Types
  TYPES: {
    AUTO: 'auto',
    MANUAL: 'manual',
    TIME_BASED: 'time_based',
    PRIORITY_BASED: 'priority_based',
    CATEGORY_BASED: 'category_based',
    CUSTOMER_BASED: 'customer_based',
  } as const,

  // Escalation Levels
  LEVELS: {
    LEVEL_0: 'level_0',
    LEVEL_1: 'level_1',
    LEVEL_2: 'level_2',
    LEVEL_3: 'level_3',
    LEVEL_4: 'level_4',
    LEVEL_5: 'level_5',
  } as const,

  // Escalation Actions
  ACTIONS: {
    NOTIFY: 'notify',
    ASSIGN: 'assign',
    REASSIGN: 'reassign',
    ESCALATE: 'escalate',
    PRIORITY_UP: 'priority_up',
    PRIORITY_DOWN: 'priority_down',
    TIMER_UPDATE: 'timer_update',
    STATUS_CHANGE: 'status_change',
    TRIGGER_WORKFLOW: 'trigger_workflow',
  } as const,

  // Escalation Triggers
  TRIGGERS: {
    TIMEOUT: 'timeout',
    PRIORITY_CHANGE: 'priority_change',
    STATUS_CHANGE: 'status_change',
    CUSTOMER_ACTION: 'customer_action',
    AGENT_ACTION: 'agent_action',
    SCHEDULED: 'scheduled',
    MANUAL: 'manual',
  } as const,

  // Escalation Timeouts (in hours)
  TIMEOUTS: {
    CRITICAL: 1,
    HIGH: 4,
    MEDIUM: 8,
    LOW: 24,
    BACKGROUND: 48,
  } as const,

  // Escalation Levels (numeric)
  LEVEL_NUMBERS: {
    LEVEL_0: 0,
    LEVEL_1: 1,
    LEVEL_2: 2,
    LEVEL_3: 3,
    LEVEL_4: 4,
    LEVEL_5: 5,
  } as const,
} as const;

// Escalation Types
export type TicketEscalationType =
  (typeof TICKET_ESCALATION.TYPES)[keyof typeof TICKET_ESCALATION.TYPES];

// Escalation Levels
export type TicketEscalationLevel =
  (typeof TICKET_ESCALATION.LEVELS)[keyof typeof TICKET_ESCALATION.LEVELS];

// Escalation Actions
export type TicketEscalationAction =
  (typeof TICKET_ESCALATION.ACTIONS)[keyof typeof TICKET_ESCALATION.ACTIONS];

// Escalation Triggers
export type TicketEscalationTrigger =
  (typeof TICKET_ESCALATION.TRIGGERS)[keyof typeof TICKET_ESCALATION.TRIGGERS];

// Utility Functions
export function ticketEscalationGetLabel(level: TicketEscalationLevel): string {
  const labels: Record<TicketEscalationLevel, string> = {
    [TICKET_ESCALATION.LEVELS.LEVEL_0]: 'Level 0 - First Line',
    [TICKET_ESCALATION.LEVELS.LEVEL_1]: 'Level 1 - Second Line',
    [TICKET_ESCALATION.LEVELS.LEVEL_2]: 'Level 2 - Third Line',
    [TICKET_ESCALATION.LEVELS.LEVEL_3]: 'Level 3 - Team Lead',
    [TICKET_ESCALATION.LEVELS.LEVEL_4]: 'Level 4 - Manager',
    [TICKET_ESCALATION.LEVELS.LEVEL_5]: 'Level 5 - Director',
  };
  return labels[level] || 'Unknown';
}

export function ticketEscalationGetLevel(level: TicketEscalationLevel): number {
  const numbers: Record<TicketEscalationLevel, number> = {
    [TICKET_ESCALATION.LEVELS.LEVEL_0]: TICKET_ESCALATION.LEVEL_NUMBERS.LEVEL_0,
    [TICKET_ESCALATION.LEVELS.LEVEL_1]: TICKET_ESCALATION.LEVEL_NUMBERS.LEVEL_1,
    [TICKET_ESCALATION.LEVELS.LEVEL_2]: TICKET_ESCALATION.LEVEL_NUMBERS.LEVEL_2,
    [TICKET_ESCALATION.LEVELS.LEVEL_3]: TICKET_ESCALATION.LEVEL_NUMBERS.LEVEL_3,
    [TICKET_ESCALATION.LEVELS.LEVEL_4]: TICKET_ESCALATION.LEVEL_NUMBERS.LEVEL_4,
    [TICKET_ESCALATION.LEVELS.LEVEL_5]: TICKET_ESCALATION.LEVEL_NUMBERS.LEVEL_5,
  };
  return numbers[level] || 0;
}

export function ticketEscalationGetThreshold(priority: string): number {
  const thresholds: Record<string, number> = {
    critical: TICKET_ESCALATION.TIMEOUTS.CRITICAL,
    high: TICKET_ESCALATION.TIMEOUTS.HIGH,
    medium: TICKET_ESCALATION.TIMEOUTS.MEDIUM,
    low: TICKET_ESCALATION.TIMEOUTS.LOW,
    background: TICKET_ESCALATION.TIMEOUTS.BACKGROUND,
  };
  return thresholds[priority] || 8;
}

export function ticketEscalationGetAction(
  trigger: TicketEscalationTrigger
): TicketEscalationAction {
  const actions: Record<TicketEscalationTrigger, TicketEscalationAction> = {
    [TICKET_ESCALATION.TRIGGERS.TIMEOUT]: TICKET_ESCALATION.ACTIONS.ESCALATE,
    [TICKET_ESCALATION.TRIGGERS.PRIORITY_CHANGE]: TICKET_ESCALATION.ACTIONS.PRIORITY_UP,
    [TICKET_ESCALATION.TRIGGERS.STATUS_CHANGE]: TICKET_ESCALATION.ACTIONS.STATUS_CHANGE,
    [TICKET_ESCALATION.TRIGGERS.CUSTOMER_ACTION]: TICKET_ESCALATION.ACTIONS.NOTIFY,
    [TICKET_ESCALATION.TRIGGERS.AGENT_ACTION]: TICKET_ESCALATION.ACTIONS.REASSIGN,
    [TICKET_ESCALATION.TRIGGERS.SCHEDULED]: TICKET_ESCALATION.ACTIONS.TRIGGER_WORKFLOW,
    [TICKET_ESCALATION.TRIGGERS.MANUAL]: TICKET_ESCALATION.ACTIONS.ESCALATE,
  };
  return actions[trigger] || TICKET_ESCALATION.ACTIONS.NOTIFY;
}

export function ticketEscalationGetNotification(level: TicketEscalationLevel): string[] {
  const notifications: Record<TicketEscalationLevel, string[]> = {
    [TICKET_ESCALATION.LEVELS.LEVEL_0]: ['agent'],
    [TICKET_ESCALATION.LEVELS.LEVEL_1]: ['agent', 'team_lead'],
    [TICKET_ESCALATION.LEVELS.LEVEL_2]: ['agent', 'team_lead', 'manager'],
    [TICKET_ESCALATION.LEVELS.LEVEL_3]: ['team_lead', 'manager'],
    [TICKET_ESCALATION.LEVELS.LEVEL_4]: ['manager', 'director'],
    [TICKET_ESCALATION.LEVELS.LEVEL_5]: ['director', 'executive'],
  };
  return notifications[level] || ['agent'];
}
