/**
 * Ticket Type Constants
 * Types of support tickets
 */

export const TICKET_TYPE = {
  // Type Types
  TYPES: {
    QUESTION: 'question',
    PROBLEM: 'problem',
    FEATURE_REQUEST: 'feature_request',
    COMPLAINT: 'complaint',
    FEEDBACK: 'feedback',
    BUG: 'bug',
    INCIDENT: 'incident',
    SERVICE_REQUEST: 'service_request',
    CHANGE_REQUEST: 'change_request',
  } as const,

  // Type Categories
  CATEGORIES: {
    INQUIRY: 'inquiry',
    ISSUE: 'issue',
    REQUEST: 'request',
    FEEDBACK: 'feedback',
  } as const,

  // Default Priorities
  DEFAULT_PRIORITIES: {
    QUESTION: 'low',
    PROBLEM: 'high',
    FEATURE_REQUEST: 'medium',
    COMPLAINT: 'high',
    FEEDBACK: 'low',
    BUG: 'high',
    INCIDENT: 'critical',
    SERVICE_REQUEST: 'medium',
    CHANGE_REQUEST: 'medium',
  } as const,

  // Type Icons (for UI)
  ICONS: {
    QUESTION: '❓',
    PROBLEM: '⚠️',
    FEATURE_REQUEST: '💡',
    COMPLAINT: '😤',
    FEEDBACK: '💬',
    BUG: '🐛',
    INCIDENT: '🚨',
    SERVICE_REQUEST: '🔧',
    CHANGE_REQUEST: '🔄',
  } as const,
} as const;

// Type Types
export type TicketTypeType = (typeof TICKET_TYPE.TYPES)[keyof typeof TICKET_TYPE.TYPES];

// Type Categories
export type TicketTypeCategory =
  (typeof TICKET_TYPE.CATEGORIES)[keyof typeof TICKET_TYPE.CATEGORIES];

// Utility Functions
export function ticketTypeGetLabel(type: TicketTypeType): string {
  const labels: Record<TicketTypeType, string> = {
    [TICKET_TYPE.TYPES.QUESTION]: 'Question',
    [TICKET_TYPE.TYPES.PROBLEM]: 'Problem',
    [TICKET_TYPE.TYPES.FEATURE_REQUEST]: 'Feature Request',
    [TICKET_TYPE.TYPES.COMPLAINT]: 'Complaint',
    [TICKET_TYPE.TYPES.FEEDBACK]: 'Feedback',
    [TICKET_TYPE.TYPES.BUG]: 'Bug',
    [TICKET_TYPE.TYPES.INCIDENT]: 'Incident',
    [TICKET_TYPE.TYPES.SERVICE_REQUEST]: 'Service Request',
    [TICKET_TYPE.TYPES.CHANGE_REQUEST]: 'Change Request',
  };
  return labels[type] || 'Unknown';
}

export function ticketTypeGetCategory(type: TicketTypeType): TicketTypeCategory {
  const categories: Record<TicketTypeType, TicketTypeCategory> = {
    [TICKET_TYPE.TYPES.QUESTION]: TICKET_TYPE.CATEGORIES.INQUIRY,
    [TICKET_TYPE.TYPES.PROBLEM]: TICKET_TYPE.CATEGORIES.ISSUE,
    [TICKET_TYPE.TYPES.FEATURE_REQUEST]: TICKET_TYPE.CATEGORIES.REQUEST,
    [TICKET_TYPE.TYPES.COMPLAINT]: TICKET_TYPE.CATEGORIES.FEEDBACK,
    [TICKET_TYPE.TYPES.FEEDBACK]: TICKET_TYPE.CATEGORIES.FEEDBACK,
    [TICKET_TYPE.TYPES.BUG]: TICKET_TYPE.CATEGORIES.ISSUE,
    [TICKET_TYPE.TYPES.INCIDENT]: TICKET_TYPE.CATEGORIES.ISSUE,
    [TICKET_TYPE.TYPES.SERVICE_REQUEST]: TICKET_TYPE.CATEGORIES.REQUEST,
    [TICKET_TYPE.TYPES.CHANGE_REQUEST]: TICKET_TYPE.CATEGORIES.REQUEST,
  };
  return categories[type] || TICKET_TYPE.CATEGORIES.INQUIRY;
}

export function ticketTypeGetDefaultPriority(type: TicketTypeType): string {
  const priorities: Record<TicketTypeType, string> = {
    [TICKET_TYPE.TYPES.QUESTION]: TICKET_TYPE.DEFAULT_PRIORITIES.QUESTION,
    [TICKET_TYPE.TYPES.PROBLEM]: TICKET_TYPE.DEFAULT_PRIORITIES.PROBLEM,
    [TICKET_TYPE.TYPES.FEATURE_REQUEST]: TICKET_TYPE.DEFAULT_PRIORITIES.FEATURE_REQUEST,
    [TICKET_TYPE.TYPES.COMPLAINT]: TICKET_TYPE.DEFAULT_PRIORITIES.COMPLAINT,
    [TICKET_TYPE.TYPES.FEEDBACK]: TICKET_TYPE.DEFAULT_PRIORITIES.FEEDBACK,
    [TICKET_TYPE.TYPES.BUG]: TICKET_TYPE.DEFAULT_PRIORITIES.BUG,
    [TICKET_TYPE.TYPES.INCIDENT]: TICKET_TYPE.DEFAULT_PRIORITIES.INCIDENT,
    [TICKET_TYPE.TYPES.SERVICE_REQUEST]: TICKET_TYPE.DEFAULT_PRIORITIES.SERVICE_REQUEST,
    [TICKET_TYPE.TYPES.CHANGE_REQUEST]: TICKET_TYPE.DEFAULT_PRIORITIES.CHANGE_REQUEST,
  };
  return priorities[type] || 'medium';
}

export function ticketTypeIsTechnical(type: TicketTypeType): boolean {
  const technicalTypes: TicketTypeType[] = [
    TICKET_TYPE.TYPES.PROBLEM,
    TICKET_TYPE.TYPES.BUG,
    TICKET_TYPE.TYPES.INCIDENT,
    TICKET_TYPE.TYPES.SERVICE_REQUEST,
    TICKET_TYPE.TYPES.CHANGE_REQUEST,
  ];
  return technicalTypes.includes(type);
}

export function ticketTypeIsBilling(type: TicketTypeType): boolean {
  return type === TICKET_TYPE.TYPES.COMPLAINT;
}
