/**
 * Ticket Constants
 * Configuration for support tickets
 */

export const TICKET = {
  // Ticket Statuses
  STATUS: {
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

  // Ticket Priorities
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BACKGROUND: 'background',
  } as const,

  // Ticket Types
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

  // Ticket Channels
  CHANNELS: {
    EMAIL: 'email',
    PHONE: 'phone',
    CHAT: 'chat',
    SOCIAL: 'social',
    WHATSAPP: 'whatsapp',
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    WEBSITE: 'website',
    APP: 'app',
    API: 'api',
  } as const,

  // Ticket Categories
  CATEGORIES: {
    ACCOUNT: 'account',
    PAYMENT: 'payment',
    ORDER: 'order',
    SHIPPING: 'shipping',
    PRODUCT: 'product',
    TECHNICAL: 'technical',
    GENERAL: 'general',
    BILLING: 'billing',
    COMPLAINT: 'complaint',
    FEEDBACK: 'feedback',
    SECURITY: 'security',
    PRIVACY: 'privacy',
    LEGAL: 'legal',
  } as const,

  // Ticket Tags
  TAGS: {
    URGENT: 'urgent',
    VIP: 'vip',
    BUG: 'bug',
    FEATURE: 'feature',
    ENHANCEMENT: 'enhancement',
    DOCUMENTATION: 'documentation',
    TRAINING: 'training',
    ONBOARDING: 'onboarding',
    RETENTION: 'retention',
    CANCELLATION: 'cancellation',
    REFUND: 'refund',
    DISPUTE: 'dispute',
  } as const,

  // Escalation Levels
  ESCALATION: {
    LEVEL_0: 0,
    LEVEL_1: 1,
    LEVEL_2: 2,
    LEVEL_3: 3,
    LEVEL_4: 4,
    LEVEL_5: 5,
  } as const,

  // Satisfaction Levels
  SATISFACTION: {
    VERY_UNSATISFIED: 1,
    UNSATISFIED: 2,
    NEUTRAL: 3,
    SATISFIED: 4,
    VERY_SATISFIED: 5,
  } as const,
} as const;

// Ticket Status
export type TicketStatus = (typeof TICKET.STATUS)[keyof typeof TICKET.STATUS];

// Ticket Priority
export type TicketPriority = (typeof TICKET.PRIORITY)[keyof typeof TICKET.PRIORITY];

// Ticket Type
export type TicketType = (typeof TICKET.TYPES)[keyof typeof TICKET.TYPES];

// Ticket Channel
export type TicketChannel = (typeof TICKET.CHANNELS)[keyof typeof TICKET.CHANNELS];

// Ticket Category
export type TicketCategory = (typeof TICKET.CATEGORIES)[keyof typeof TICKET.CATEGORIES];

// Ticket Tag
export type TicketTag = (typeof TICKET.TAGS)[keyof typeof TICKET.TAGS];

// Escalation Level
export type TicketEscalationLevel = (typeof TICKET.ESCALATION)[keyof typeof TICKET.ESCALATION];

// Satisfaction Level
export type TicketSatisfactionLevel =
  (typeof TICKET.SATISFACTION)[keyof typeof TICKET.SATISFACTION];

// Utility Functions
export function ticketGetStatusLabel(status: TicketStatus): string {
  const labels: Record<TicketStatus, string> = {
    [TICKET.STATUS.NEW]: 'New',
    [TICKET.STATUS.OPEN]: 'Open',
    [TICKET.STATUS.PENDING]: 'Pending',
    [TICKET.STATUS.IN_PROGRESS]: 'In Progress',
    [TICKET.STATUS.RESOLVED]: 'Resolved',
    [TICKET.STATUS.CLOSED]: 'Closed',
    [TICKET.STATUS.REOPENED]: 'Reopened',
    [TICKET.STATUS.ESCALATED]: 'Escalated',
    [TICKET.STATUS.ON_HOLD]: 'On Hold',
    [TICKET.STATUS.DUPLICATE]: 'Duplicate',
    [TICKET.STATUS.SPAM]: 'Spam',
  };
  return labels[status] || 'Unknown';
}

export function ticketGetPriorityLabel(priority: TicketPriority): string {
  const labels: Record<TicketPriority, string> = {
    [TICKET.PRIORITY.CRITICAL]: 'Critical',
    [TICKET.PRIORITY.HIGH]: 'High',
    [TICKET.PRIORITY.MEDIUM]: 'Medium',
    [TICKET.PRIORITY.LOW]: 'Low',
    [TICKET.PRIORITY.BACKGROUND]: 'Background',
  };
  return labels[priority] || 'Unknown';
}

export function ticketGetTypeLabel(type: TicketType): string {
  const labels: Record<TicketType, string> = {
    [TICKET.TYPES.QUESTION]: 'Question',
    [TICKET.TYPES.PROBLEM]: 'Problem',
    [TICKET.TYPES.FEATURE_REQUEST]: 'Feature Request',
    [TICKET.TYPES.COMPLAINT]: 'Complaint',
    [TICKET.TYPES.FEEDBACK]: 'Feedback',
    [TICKET.TYPES.BUG]: 'Bug',
    [TICKET.TYPES.INCIDENT]: 'Incident',
    [TICKET.TYPES.SERVICE_REQUEST]: 'Service Request',
    [TICKET.TYPES.CHANGE_REQUEST]: 'Change Request',
  };
  return labels[type] || 'Unknown';
}

export function ticketGetChannelLabel(channel: TicketChannel): string {
  const labels: Record<TicketChannel, string> = {
    [TICKET.CHANNELS.EMAIL]: 'Email',
    [TICKET.CHANNELS.PHONE]: 'Phone',
    [TICKET.CHANNELS.CHAT]: 'Chat',
    [TICKET.CHANNELS.SOCIAL]: 'Social Media',
    [TICKET.CHANNELS.WHATSAPP]: 'WhatsApp',
    [TICKET.CHANNELS.FACEBOOK]: 'Facebook',
    [TICKET.CHANNELS.TWITTER]: 'Twitter',
    [TICKET.CHANNELS.WEBSITE]: 'Website',
    [TICKET.CHANNELS.APP]: 'Mobile App',
    [TICKET.CHANNELS.API]: 'API',
  };
  return labels[channel] || 'Unknown';
}

export function ticketGetCategoryLabel(category: TicketCategory): string {
  const labels: Record<TicketCategory, string> = {
    [TICKET.CATEGORIES.ACCOUNT]: 'Account',
    [TICKET.CATEGORIES.PAYMENT]: 'Payment',
    [TICKET.CATEGORIES.ORDER]: 'Order',
    [TICKET.CATEGORIES.SHIPPING]: 'Shipping',
    [TICKET.CATEGORIES.PRODUCT]: 'Product',
    [TICKET.CATEGORIES.TECHNICAL]: 'Technical',
    [TICKET.CATEGORIES.GENERAL]: 'General',
    [TICKET.CATEGORIES.BILLING]: 'Billing',
    [TICKET.CATEGORIES.COMPLAINT]: 'Complaint',
    [TICKET.CATEGORIES.FEEDBACK]: 'Feedback',
    [TICKET.CATEGORIES.SECURITY]: 'Security',
    [TICKET.CATEGORIES.PRIVACY]: 'Privacy',
    [TICKET.CATEGORIES.LEGAL]: 'Legal',
  };
  return labels[category] || 'Unknown';
}

export function ticketGetEscalationLevel(level: TicketEscalationLevel): string {
  const labels: Record<TicketEscalationLevel, string> = {
    [TICKET.ESCALATION.LEVEL_0]: 'Level 0',
    [TICKET.ESCALATION.LEVEL_1]: 'Level 1',
    [TICKET.ESCALATION.LEVEL_2]: 'Level 2',
    [TICKET.ESCALATION.LEVEL_3]: 'Level 3',
    [TICKET.ESCALATION.LEVEL_4]: 'Level 4',
    [TICKET.ESCALATION.LEVEL_5]: 'Level 5',
  };
  return labels[level] || 'Unknown';
}

export function ticketGetSatisfactionLabel(level: TicketSatisfactionLevel): string {
  const labels: Record<TicketSatisfactionLevel, string> = {
    [TICKET.SATISFACTION.VERY_UNSATISFIED]: 'Very Unsatisfied',
    [TICKET.SATISFACTION.UNSATISFIED]: 'Unsatisfied',
    [TICKET.SATISFACTION.NEUTRAL]: 'Neutral',
    [TICKET.SATISFACTION.SATISFIED]: 'Satisfied',
    [TICKET.SATISFACTION.VERY_SATISFIED]: 'Very Satisfied',
  };
  return labels[level] || 'Unknown';
}

export function ticketIsResolved(status: TicketStatus): boolean {
  return status === TICKET.STATUS.RESOLVED || status === TICKET.STATUS.CLOSED;
}

export function ticketIsOpen(status: TicketStatus): boolean {
  return (
    status === TICKET.STATUS.OPEN ||
    status === TICKET.STATUS.IN_PROGRESS ||
    status === TICKET.STATUS.NEW
  );
}

export function ticketIsClosed(status: TicketStatus): boolean {
  return status === TICKET.STATUS.CLOSED;
}

export function ticketIsEscalated(status: TicketStatus): boolean {
  return status === TICKET.STATUS.ESCALATED;
}

export function ticketGetPriorityWeight(priority: TicketPriority): number {
  const weights: Record<TicketPriority, number> = {
    [TICKET.PRIORITY.CRITICAL]: 5,
    [TICKET.PRIORITY.HIGH]: 4,
    [TICKET.PRIORITY.MEDIUM]: 3,
    [TICKET.PRIORITY.LOW]: 2,
    [TICKET.PRIORITY.BACKGROUND]: 1,
  };
  return weights[priority] || 3;
}
