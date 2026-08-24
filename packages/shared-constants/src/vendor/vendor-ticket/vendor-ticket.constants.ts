/**
 * Vendor Ticket Constants
 * Configuration for vendor tickets
 */

export const VENDOR_TICKET = {
  // Ticket Types
  TYPES: {
    GENERAL: 'general',
    TECHNICAL: 'technical',
    BILLING: 'billing',
    ACCOUNT: 'account',
    PRODUCT: 'product',
    SHIPPING: 'shipping',
    COMPLAINT: 'complaint',
    FEEDBACK: 'feedback',
  } as const,

  // Ticket Statuses
  STATUS: {
    OPEN: 'open',
    IN_PROGRESS: 'in_progress',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    CLOSED: 'closed',
    ESCALATED: 'escalated',
    REOPENED: 'reopened',
  } as const,

  // Ticket Priorities
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
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
  } as const,

  // Ticket Channels
  CHANNELS: {
    EMAIL: 'email',
    PHONE: 'phone',
    CHAT: 'chat',
    TICKET: 'ticket',
    WHATSAPP: 'whatsapp',
    PORTAL: 'portal',
  } as const,

  // Ticket Response Times (in hours)
  RESPONSE_TIMES: {
    CRITICAL: 1,
    HIGH: 4,
    MEDIUM: 8,
    LOW: 24,
  } as const,

  // Ticket Resolution Times (in hours)
  RESOLUTION_TIMES: {
    CRITICAL: 4,
    HIGH: 8,
    MEDIUM: 24,
    LOW: 48,
  } as const,

  // Ticket Limits
  LIMITS: {
    MAX_TICKETS_PER_DAY: 10,
    MAX_ATTACHMENTS: 5,
    MAX_ATTACHMENT_SIZE: 5242880, // 5MB
  } as const,
} as const;

// Ticket Types
export type VendorTicketType = (typeof VENDOR_TICKET.TYPES)[keyof typeof VENDOR_TICKET.TYPES];

// Ticket Statuses
export type VendorTicketStatus = (typeof VENDOR_TICKET.STATUS)[keyof typeof VENDOR_TICKET.STATUS];

// Ticket Priorities
export type VendorTicketPriority =
  (typeof VENDOR_TICKET.PRIORITY)[keyof typeof VENDOR_TICKET.PRIORITY];

// Ticket Categories
export type VendorTicketCategory =
  (typeof VENDOR_TICKET.CATEGORIES)[keyof typeof VENDOR_TICKET.CATEGORIES];

// Ticket Channels
export type VendorTicketChannel =
  (typeof VENDOR_TICKET.CHANNELS)[keyof typeof VENDOR_TICKET.CHANNELS];

// Utility Functions
export function vendorTicketGetTypeLabel(type: VendorTicketType): string {
  const labels: Record<VendorTicketType, string> = {
    [VENDOR_TICKET.TYPES.GENERAL]: 'General',
    [VENDOR_TICKET.TYPES.TECHNICAL]: 'Technical',
    [VENDOR_TICKET.TYPES.BILLING]: 'Billing',
    [VENDOR_TICKET.TYPES.ACCOUNT]: 'Account',
    [VENDOR_TICKET.TYPES.PRODUCT]: 'Product',
    [VENDOR_TICKET.TYPES.SHIPPING]: 'Shipping',
    [VENDOR_TICKET.TYPES.COMPLAINT]: 'Complaint',
    [VENDOR_TICKET.TYPES.FEEDBACK]: 'Feedback',
  };
  return labels[type] || 'Unknown';
}

export function vendorTicketGetStatusLabel(status: VendorTicketStatus): string {
  const labels: Record<VendorTicketStatus, string> = {
    [VENDOR_TICKET.STATUS.OPEN]: 'Open',
    [VENDOR_TICKET.STATUS.IN_PROGRESS]: 'In Progress',
    [VENDOR_TICKET.STATUS.PENDING]: 'Pending',
    [VENDOR_TICKET.STATUS.RESOLVED]: 'Resolved',
    [VENDOR_TICKET.STATUS.CLOSED]: 'Closed',
    [VENDOR_TICKET.STATUS.ESCALATED]: 'Escalated',
    [VENDOR_TICKET.STATUS.REOPENED]: 'Reopened',
  };
  return labels[status] || 'Unknown';
}

export function vendorTicketGetPriorityLabel(priority: VendorTicketPriority): string {
  const labels: Record<VendorTicketPriority, string> = {
    [VENDOR_TICKET.PRIORITY.CRITICAL]: 'Critical',
    [VENDOR_TICKET.PRIORITY.HIGH]: 'High',
    [VENDOR_TICKET.PRIORITY.MEDIUM]: 'Medium',
    [VENDOR_TICKET.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function vendorTicketGetCategoryLabel(category: VendorTicketCategory): string {
  const labels: Record<VendorTicketCategory, string> = {
    [VENDOR_TICKET.CATEGORIES.ACCOUNT]: 'Account',
    [VENDOR_TICKET.CATEGORIES.PAYMENT]: 'Payment',
    [VENDOR_TICKET.CATEGORIES.ORDER]: 'Order',
    [VENDOR_TICKET.CATEGORIES.SHIPPING]: 'Shipping',
    [VENDOR_TICKET.CATEGORIES.PRODUCT]: 'Product',
    [VENDOR_TICKET.CATEGORIES.TECHNICAL]: 'Technical',
    [VENDOR_TICKET.CATEGORIES.GENERAL]: 'General',
  };
  return labels[category] || 'Unknown';
}

export function vendorTicketGetChannelLabel(channel: VendorTicketChannel): string {
  const labels: Record<VendorTicketChannel, string> = {
    [VENDOR_TICKET.CHANNELS.EMAIL]: 'Email',
    [VENDOR_TICKET.CHANNELS.PHONE]: 'Phone',
    [VENDOR_TICKET.CHANNELS.CHAT]: 'Live Chat',
    [VENDOR_TICKET.CHANNELS.TICKET]: 'Ticket',
    [VENDOR_TICKET.CHANNELS.WHATSAPP]: 'WhatsApp',
    [VENDOR_TICKET.CHANNELS.PORTAL]: 'Portal',
  };
  return labels[channel] || 'Unknown';
}

export function vendorTicketIsOpen(status: VendorTicketStatus): boolean {
  return status === VENDOR_TICKET.STATUS.OPEN || status === VENDOR_TICKET.STATUS.IN_PROGRESS;
}

export function vendorTicketIsResolved(status: VendorTicketStatus): boolean {
  return status === VENDOR_TICKET.STATUS.RESOLVED || status === VENDOR_TICKET.STATUS.CLOSED;
}

export function vendorTicketGetResponseTime(priority: VendorTicketPriority): number {
  const times: Record<VendorTicketPriority, number> = {
    [VENDOR_TICKET.PRIORITY.CRITICAL]: VENDOR_TICKET.RESPONSE_TIMES.CRITICAL,
    [VENDOR_TICKET.PRIORITY.HIGH]: VENDOR_TICKET.RESPONSE_TIMES.HIGH,
    [VENDOR_TICKET.PRIORITY.MEDIUM]: VENDOR_TICKET.RESPONSE_TIMES.MEDIUM,
    [VENDOR_TICKET.PRIORITY.LOW]: VENDOR_TICKET.RESPONSE_TIMES.LOW,
  };
  return times[priority] || 8;
}

export function vendorTicketGetResolutionTime(priority: VendorTicketPriority): number {
  const times: Record<VendorTicketPriority, number> = {
    [VENDOR_TICKET.PRIORITY.CRITICAL]: VENDOR_TICKET.RESOLUTION_TIMES.CRITICAL,
    [VENDOR_TICKET.PRIORITY.HIGH]: VENDOR_TICKET.RESOLUTION_TIMES.HIGH,
    [VENDOR_TICKET.PRIORITY.MEDIUM]: VENDOR_TICKET.RESOLUTION_TIMES.MEDIUM,
    [VENDOR_TICKET.PRIORITY.LOW]: VENDOR_TICKET.RESOLUTION_TIMES.LOW,
  };
  return times[priority] || 24;
}
