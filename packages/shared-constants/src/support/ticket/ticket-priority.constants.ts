/**
 * Ticket Priority Constants
 * Priority levels for support tickets
 */

export const TICKET_PRIORITY = {
  // Priority Types
  TYPES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BACKGROUND: 'background',
  } as const,

  // Priority Levels (numeric)
  LEVELS: {
    CRITICAL: 5,
    HIGH: 4,
    MEDIUM: 3,
    LOW: 2,
    BACKGROUND: 1,
  } as const,

  // Priority Colors (for UI)
  COLORS: {
    CRITICAL: '#red-600',
    HIGH: '#orange-500',
    MEDIUM: '#yellow-500',
    LOW: '#blue-400',
    BACKGROUND: '#gray-400',
  } as const,

  // SLA Times (in hours)
  SLA_HOURS: {
    CRITICAL: 1,
    HIGH: 4,
    MEDIUM: 8,
    LOW: 24,
    BACKGROUND: 48,
  } as const,

  // Response Times (in minutes)
  RESPONSE_TIMES: {
    CRITICAL: 15,
    HIGH: 30,
    MEDIUM: 60,
    LOW: 120,
    BACKGROUND: 240,
  } as const,
} as const;

// Priority Types
export type TicketPriorityType = (typeof TICKET_PRIORITY.TYPES)[keyof typeof TICKET_PRIORITY.TYPES];

// Priority Levels
export type TicketPriorityLevel =
  (typeof TICKET_PRIORITY.LEVELS)[keyof typeof TICKET_PRIORITY.LEVELS];

// Priority Colors
export type TicketPriorityColor =
  (typeof TICKET_PRIORITY.COLORS)[keyof typeof TICKET_PRIORITY.COLORS];

// Utility Functions
export function ticketPriorityGetLabel(priority: TicketPriorityType): string {
  const labels: Record<TicketPriorityType, string> = {
    [TICKET_PRIORITY.TYPES.CRITICAL]: 'Critical',
    [TICKET_PRIORITY.TYPES.HIGH]: 'High',
    [TICKET_PRIORITY.TYPES.MEDIUM]: 'Medium',
    [TICKET_PRIORITY.TYPES.LOW]: 'Low',
    [TICKET_PRIORITY.TYPES.BACKGROUND]: 'Background',
  };
  return labels[priority] || 'Unknown';
}

export function ticketPriorityGetWeight(priority: TicketPriorityType): number {
  const weights: Record<TicketPriorityType, number> = {
    [TICKET_PRIORITY.TYPES.CRITICAL]: TICKET_PRIORITY.LEVELS.CRITICAL,
    [TICKET_PRIORITY.TYPES.HIGH]: TICKET_PRIORITY.LEVELS.HIGH,
    [TICKET_PRIORITY.TYPES.MEDIUM]: TICKET_PRIORITY.LEVELS.MEDIUM,
    [TICKET_PRIORITY.TYPES.LOW]: TICKET_PRIORITY.LEVELS.LOW,
    [TICKET_PRIORITY.TYPES.BACKGROUND]: TICKET_PRIORITY.LEVELS.BACKGROUND,
  };
  return weights[priority] || 3;
}

export function ticketPriorityGetSLA(priority: TicketPriorityType): number {
  const sla: Record<TicketPriorityType, number> = {
    [TICKET_PRIORITY.TYPES.CRITICAL]: TICKET_PRIORITY.SLA_HOURS.CRITICAL,
    [TICKET_PRIORITY.TYPES.HIGH]: TICKET_PRIORITY.SLA_HOURS.HIGH,
    [TICKET_PRIORITY.TYPES.MEDIUM]: TICKET_PRIORITY.SLA_HOURS.MEDIUM,
    [TICKET_PRIORITY.TYPES.LOW]: TICKET_PRIORITY.SLA_HOURS.LOW,
    [TICKET_PRIORITY.TYPES.BACKGROUND]: TICKET_PRIORITY.SLA_HOURS.BACKGROUND,
  };
  return sla[priority] || 8;
}

export function ticketPriorityIsUrgent(priority: TicketPriorityType): boolean {
  return priority === TICKET_PRIORITY.TYPES.CRITICAL || priority === TICKET_PRIORITY.TYPES.HIGH;
}

export function ticketPriorityGetColor(priority: TicketPriorityType): TicketPriorityColor {
  const colors: Record<TicketPriorityType, TicketPriorityColor> = {
    [TICKET_PRIORITY.TYPES.CRITICAL]: TICKET_PRIORITY.COLORS.CRITICAL,
    [TICKET_PRIORITY.TYPES.HIGH]: TICKET_PRIORITY.COLORS.HIGH,
    [TICKET_PRIORITY.TYPES.MEDIUM]: TICKET_PRIORITY.COLORS.MEDIUM,
    [TICKET_PRIORITY.TYPES.LOW]: TICKET_PRIORITY.COLORS.LOW,
    [TICKET_PRIORITY.TYPES.BACKGROUND]: TICKET_PRIORITY.COLORS.BACKGROUND,
  };
  return colors[priority] || '#gray-400';
}

export function ticketPriorityGetLevel(priority: TicketPriorityType): number {
  const levels: Record<TicketPriorityType, number> = {
    [TICKET_PRIORITY.TYPES.CRITICAL]: TICKET_PRIORITY.LEVELS.CRITICAL,
    [TICKET_PRIORITY.TYPES.HIGH]: TICKET_PRIORITY.LEVELS.HIGH,
    [TICKET_PRIORITY.TYPES.MEDIUM]: TICKET_PRIORITY.LEVELS.MEDIUM,
    [TICKET_PRIORITY.TYPES.LOW]: TICKET_PRIORITY.LEVELS.LOW,
    [TICKET_PRIORITY.TYPES.BACKGROUND]: TICKET_PRIORITY.LEVELS.BACKGROUND,
  };
  return levels[priority] || 3;
}
