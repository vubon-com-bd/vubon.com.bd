/**
 * Ticket Status Constants
 * Status definitions for support tickets
 */

export const TICKET_STATUS = {
  // Status Types
  TYPES: {
    NEW: 'new',
    OPEN: 'open',
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    RESOLVED: 'resolved',
    CLOSED: 'closed',
    REOPENED: 'reopened',
    ESCALATED: 'escalated',
    ON_HOLD: 'on_hold',
    DUPLICATE: 'duplicate',
    SPAM: 'spam',
  } as const,

  // Status Categories
  CATEGORIES: {
    ACTIVE: 'active',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    CLOSED: 'closed',
    INVALID: 'invalid',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    NEW: '#blue-500',
    OPEN: '#green-500',
    PENDING: '#yellow-500',
    IN_PROGRESS: '#purple-500',
    RESOLVED: '#green-600',
    CLOSED: '#gray-500',
    REOPENED: '#orange-500',
    ESCALATED: '#red-500',
    ON_HOLD: '#gray-400',
    DUPLICATE: '#gray-400',
    SPAM: '#red-400',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    NEW_TO_OPEN: 'new_to_open',
    NEW_TO_PENDING: 'new_to_pending',
    OPEN_TO_IN_PROGRESS: 'open_to_in_progress',
    OPEN_TO_PENDING: 'open_to_pending',
    IN_PROGRESS_TO_RESOLVED: 'in_progress_to_resolved',
    IN_PROGRESS_TO_PENDING: 'in_progress_to_pending',
    PENDING_TO_OPEN: 'pending_to_open',
    PENDING_TO_IN_PROGRESS: 'pending_to_in_progress',
    RESOLVED_TO_CLOSED: 'resolved_to_closed',
    RESOLVED_TO_REOPENED: 'resolved_to_reopened',
    REOPENED_TO_OPEN: 'reopened_to_open',
    OPEN_TO_ESCALATED: 'open_to_escalated',
    ESCALATED_TO_OPEN: 'escalated_to_open',
    OPEN_TO_ON_HOLD: 'open_to_on_hold',
    ON_HOLD_TO_OPEN: 'on_hold_to_open',
  } as const,
} as const;

// Status Types
export type TicketStatusType = (typeof TICKET_STATUS.TYPES)[keyof typeof TICKET_STATUS.TYPES];

// Status Categories
export type TicketStatusCategory =
  (typeof TICKET_STATUS.CATEGORIES)[keyof typeof TICKET_STATUS.CATEGORIES];

// Status Colors
export type TicketStatusColor = (typeof TICKET_STATUS.COLORS)[keyof typeof TICKET_STATUS.COLORS];

// Status Transitions
export type TicketStatusTransition =
  (typeof TICKET_STATUS.TRANSITIONS)[keyof typeof TICKET_STATUS.TRANSITIONS];

// Utility Functions
export function ticketStatusGetLabel(status: TicketStatusType): string {
  const labels: Record<TicketStatusType, string> = {
    [TICKET_STATUS.TYPES.NEW]: 'New',
    [TICKET_STATUS.TYPES.OPEN]: 'Open',
    [TICKET_STATUS.TYPES.PENDING]: 'Pending',
    [TICKET_STATUS.TYPES.IN_PROGRESS]: 'In Progress',
    [TICKET_STATUS.TYPES.RESOLVED]: 'Resolved',
    [TICKET_STATUS.TYPES.CLOSED]: 'Closed',
    [TICKET_STATUS.TYPES.REOPENED]: 'Reopened',
    [TICKET_STATUS.TYPES.ESCALATED]: 'Escalated',
    [TICKET_STATUS.TYPES.ON_HOLD]: 'On Hold',
    [TICKET_STATUS.TYPES.DUPLICATE]: 'Duplicate',
    [TICKET_STATUS.TYPES.SPAM]: 'Spam',
  };
  return labels[status] || 'Unknown';
}

export function ticketStatusIsResolved(status: TicketStatusType): boolean {
  return status === TICKET_STATUS.TYPES.RESOLVED || status === TICKET_STATUS.TYPES.CLOSED;
}

export function ticketStatusIsOpen(status: TicketStatusType): boolean {
  return (
    status === TICKET_STATUS.TYPES.OPEN ||
    status === TICKET_STATUS.TYPES.IN_PROGRESS ||
    status === TICKET_STATUS.TYPES.NEW
  );
}

export function ticketStatusIsClosed(status: TicketStatusType): boolean {
  return status === TICKET_STATUS.TYPES.CLOSED;
}

export function ticketStatusIsPending(status: TicketStatusType): boolean {
  return status === TICKET_STATUS.TYPES.PENDING || status === TICKET_STATUS.TYPES.ON_HOLD;
}

export function ticketStatusGetCategory(status: TicketStatusType): TicketStatusCategory {
  const categories: Record<TicketStatusType, TicketStatusCategory> = {
    [TICKET_STATUS.TYPES.NEW]: TICKET_STATUS.CATEGORIES.ACTIVE,
    [TICKET_STATUS.TYPES.OPEN]: TICKET_STATUS.CATEGORIES.ACTIVE,
    [TICKET_STATUS.TYPES.IN_PROGRESS]: TICKET_STATUS.CATEGORIES.ACTIVE,
    [TICKET_STATUS.TYPES.REOPENED]: TICKET_STATUS.CATEGORIES.ACTIVE,
    [TICKET_STATUS.TYPES.ESCALATED]: TICKET_STATUS.CATEGORIES.ACTIVE,
    [TICKET_STATUS.TYPES.PENDING]: TICKET_STATUS.CATEGORIES.PENDING,
    [TICKET_STATUS.TYPES.ON_HOLD]: TICKET_STATUS.CATEGORIES.PENDING,
    [TICKET_STATUS.TYPES.RESOLVED]: TICKET_STATUS.CATEGORIES.RESOLVED,
    [TICKET_STATUS.TYPES.CLOSED]: TICKET_STATUS.CATEGORIES.CLOSED,
    [TICKET_STATUS.TYPES.DUPLICATE]: TICKET_STATUS.CATEGORIES.INVALID,
    [TICKET_STATUS.TYPES.SPAM]: TICKET_STATUS.CATEGORIES.INVALID,
  };
  return categories[status] || TICKET_STATUS.CATEGORIES.ACTIVE;
}

export function ticketStatusIsActive(status: TicketStatusType): boolean {
  return ticketStatusGetCategory(status) === TICKET_STATUS.CATEGORIES.ACTIVE;
}
