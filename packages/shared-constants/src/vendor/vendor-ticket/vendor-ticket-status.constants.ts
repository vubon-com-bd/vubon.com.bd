/**
 * Vendor Ticket Status Constants
 * Status definitions for vendor tickets
 */

export const VENDOR_TICKET_STATUS = {
  // Status Types
  TYPES: {
    OPEN: 'open',
    IN_PROGRESS: 'in_progress',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    CLOSED: 'closed',
    ESCALATED: 'escalated',
    REOPENED: 'reopened',
  } as const,

  // Status Categories
  CATEGORIES: {
    ACTIVE: 'active',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    CLOSED: 'closed',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    OPEN: '#blue-500',
    IN_PROGRESS: '#purple-500',
    PENDING: '#yellow-500',
    RESOLVED: '#green-500',
    CLOSED: '#gray-500',
    ESCALATED: '#red-500',
    REOPENED: '#orange-500',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    OPEN: '📩',
    IN_PROGRESS: '🔄',
    PENDING: '⏳',
    RESOLVED: '✅',
    CLOSED: '🔒',
    ESCALATED: '🚨',
    REOPENED: '🔓',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    OPEN_TO_IN_PROGRESS: 'open_to_in_progress',
    OPEN_TO_PENDING: 'open_to_pending',
    OPEN_TO_ESCALATED: 'open_to_escalated',
    IN_PROGRESS_TO_RESOLVED: 'in_progress_to_resolved',
    IN_PROGRESS_TO_PENDING: 'in_progress_to_pending',
    IN_PROGRESS_TO_ESCALATED: 'in_progress_to_escalated',
    PENDING_TO_OPEN: 'pending_to_open',
    PENDING_TO_IN_PROGRESS: 'pending_to_in_progress',
    PENDING_TO_ESCALATED: 'pending_to_escalated',
    RESOLVED_TO_CLOSED: 'resolved_to_closed',
    RESOLVED_TO_REOPENED: 'resolved_to_reopened',
    REOPENED_TO_OPEN: 'reopened_to_open',
    REOPENED_TO_IN_PROGRESS: 'reopened_to_in_progress',
    ESCALATED_TO_OPEN: 'escalated_to_open',
    CLOSED_TO_REOPENED: 'closed_to_reopened',
  } as const,
} as const;

// Status Types
export type VendorTicketStatusType =
  (typeof VENDOR_TICKET_STATUS.TYPES)[keyof typeof VENDOR_TICKET_STATUS.TYPES];

// Status Categories
export type VendorTicketStatusCategory =
  (typeof VENDOR_TICKET_STATUS.CATEGORIES)[keyof typeof VENDOR_TICKET_STATUS.CATEGORIES];

// Status Colors
export type VendorTicketStatusColor =
  (typeof VENDOR_TICKET_STATUS.COLORS)[keyof typeof VENDOR_TICKET_STATUS.COLORS];

// Status Icons
export type VendorTicketStatusIcon =
  (typeof VENDOR_TICKET_STATUS.ICONS)[keyof typeof VENDOR_TICKET_STATUS.ICONS];

// Status Transitions
export type VendorTicketStatusTransition =
  (typeof VENDOR_TICKET_STATUS.TRANSITIONS)[keyof typeof VENDOR_TICKET_STATUS.TRANSITIONS];

// Utility Functions
export function vendorTicketStatusGetLabel(status: VendorTicketStatusType): string {
  const labels: Record<VendorTicketStatusType, string> = {
    [VENDOR_TICKET_STATUS.TYPES.OPEN]: 'Open',
    [VENDOR_TICKET_STATUS.TYPES.IN_PROGRESS]: 'In Progress',
    [VENDOR_TICKET_STATUS.TYPES.PENDING]: 'Pending',
    [VENDOR_TICKET_STATUS.TYPES.RESOLVED]: 'Resolved',
    [VENDOR_TICKET_STATUS.TYPES.CLOSED]: 'Closed',
    [VENDOR_TICKET_STATUS.TYPES.ESCALATED]: 'Escalated',
    [VENDOR_TICKET_STATUS.TYPES.REOPENED]: 'Reopened',
  };
  return labels[status] || 'Unknown';
}

export function vendorTicketStatusIsOpen(status: VendorTicketStatusType): boolean {
  return (
    status === VENDOR_TICKET_STATUS.TYPES.OPEN || status === VENDOR_TICKET_STATUS.TYPES.IN_PROGRESS
  );
}

export function vendorTicketStatusIsResolved(status: VendorTicketStatusType): boolean {
  return (
    status === VENDOR_TICKET_STATUS.TYPES.RESOLVED || status === VENDOR_TICKET_STATUS.TYPES.CLOSED
  );
}

export function vendorTicketStatusIsPending(status: VendorTicketStatusType): boolean {
  return status === VENDOR_TICKET_STATUS.TYPES.PENDING;
}

export function vendorTicketStatusGetCategory(
  status: VendorTicketStatusType
): VendorTicketStatusCategory {
  const categories: Record<VendorTicketStatusType, VendorTicketStatusCategory> = {
    [VENDOR_TICKET_STATUS.TYPES.OPEN]: VENDOR_TICKET_STATUS.CATEGORIES.ACTIVE,
    [VENDOR_TICKET_STATUS.TYPES.IN_PROGRESS]: VENDOR_TICKET_STATUS.CATEGORIES.ACTIVE,
    [VENDOR_TICKET_STATUS.TYPES.PENDING]: VENDOR_TICKET_STATUS.CATEGORIES.PENDING,
    [VENDOR_TICKET_STATUS.TYPES.RESOLVED]: VENDOR_TICKET_STATUS.CATEGORIES.RESOLVED,
    [VENDOR_TICKET_STATUS.TYPES.CLOSED]: VENDOR_TICKET_STATUS.CATEGORIES.CLOSED,
    [VENDOR_TICKET_STATUS.TYPES.ESCALATED]: VENDOR_TICKET_STATUS.CATEGORIES.ACTIVE,
    [VENDOR_TICKET_STATUS.TYPES.REOPENED]: VENDOR_TICKET_STATUS.CATEGORIES.ACTIVE,
  };
  return categories[status] || VENDOR_TICKET_STATUS.CATEGORIES.PENDING;
}

export function vendorTicketStatusCanTransition(
  status: VendorTicketStatusType,
  transition: VendorTicketStatusTransition
): boolean {
  const allowedTransitions: Record<VendorTicketStatusType, VendorTicketStatusTransition[]> = {
    [VENDOR_TICKET_STATUS.TYPES.OPEN]: [
      VENDOR_TICKET_STATUS.TRANSITIONS.OPEN_TO_IN_PROGRESS,
      VENDOR_TICKET_STATUS.TRANSITIONS.OPEN_TO_PENDING,
      VENDOR_TICKET_STATUS.TRANSITIONS.OPEN_TO_ESCALATED,
    ],
    [VENDOR_TICKET_STATUS.TYPES.IN_PROGRESS]: [
      VENDOR_TICKET_STATUS.TRANSITIONS.IN_PROGRESS_TO_RESOLVED,
      VENDOR_TICKET_STATUS.TRANSITIONS.IN_PROGRESS_TO_PENDING,
      VENDOR_TICKET_STATUS.TRANSITIONS.IN_PROGRESS_TO_ESCALATED,
    ],
    [VENDOR_TICKET_STATUS.TYPES.PENDING]: [
      VENDOR_TICKET_STATUS.TRANSITIONS.PENDING_TO_OPEN,
      VENDOR_TICKET_STATUS.TRANSITIONS.PENDING_TO_IN_PROGRESS,
      VENDOR_TICKET_STATUS.TRANSITIONS.PENDING_TO_ESCALATED,
    ],
    [VENDOR_TICKET_STATUS.TYPES.RESOLVED]: [
      VENDOR_TICKET_STATUS.TRANSITIONS.RESOLVED_TO_CLOSED,
      VENDOR_TICKET_STATUS.TRANSITIONS.RESOLVED_TO_REOPENED,
    ],
    [VENDOR_TICKET_STATUS.TYPES.REOPENED]: [
      VENDOR_TICKET_STATUS.TRANSITIONS.REOPENED_TO_OPEN,
      VENDOR_TICKET_STATUS.TRANSITIONS.REOPENED_TO_IN_PROGRESS,
    ],
    [VENDOR_TICKET_STATUS.TYPES.ESCALATED]: [VENDOR_TICKET_STATUS.TRANSITIONS.ESCALATED_TO_OPEN],
    [VENDOR_TICKET_STATUS.TYPES.CLOSED]: [VENDOR_TICKET_STATUS.TRANSITIONS.CLOSED_TO_REOPENED],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
