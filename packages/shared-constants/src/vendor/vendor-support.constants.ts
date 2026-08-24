/**
 * Vendor Support Constants
 * Configuration for vendor support
 */

export const VENDOR_SUPPORT = {
  // Support Types
  TYPES: {
    TECHNICAL: 'technical',
    BILLING: 'billing',
    ACCOUNT: 'account',
    GENERAL: 'general',
    PRODUCT: 'product',
    SHIPPING: 'shipping',
  } as const,

  // Support Statuses
  STATUS: {
    OPEN: 'open',
    IN_PROGRESS: 'in_progress',
    RESOLVED: 'resolved',
    CLOSED: 'closed',
    ESCALATED: 'escalated',
    PENDING: 'pending',
  } as const,

  // Support Priorities
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Support Channels
  CHANNELS: {
    EMAIL: 'email',
    PHONE: 'phone',
    CHAT: 'chat',
    TICKET: 'ticket',
    WHATSAPP: 'whatsapp',
  } as const,

  // Support Categories
  CATEGORIES: {
    ACCOUNT: 'account',
    PAYMENT: 'payment',
    ORDER: 'order',
    SHIPPING: 'shipping',
    PRODUCT: 'product',
    TECHNICAL: 'technical',
    GENERAL: 'general',
  } as const,

  // Support Response Times (in hours)
  RESPONSE_TIMES: {
    CRITICAL: 1,
    HIGH: 4,
    MEDIUM: 8,
    LOW: 24,
  } as const,

  // Support Resolution Times (in hours)
  RESOLUTION_TIMES: {
    CRITICAL: 4,
    HIGH: 8,
    MEDIUM: 24,
    LOW: 48,
  } as const,
} as const;

// Support Types
export type VendorSupportType = (typeof VENDOR_SUPPORT.TYPES)[keyof typeof VENDOR_SUPPORT.TYPES];

// Support Statuses
export type VendorSupportStatus =
  (typeof VENDOR_SUPPORT.STATUS)[keyof typeof VENDOR_SUPPORT.STATUS];

// Support Priorities
export type VendorSupportPriority =
  (typeof VENDOR_SUPPORT.PRIORITY)[keyof typeof VENDOR_SUPPORT.PRIORITY];

// Support Channels
export type VendorSupportChannel =
  (typeof VENDOR_SUPPORT.CHANNELS)[keyof typeof VENDOR_SUPPORT.CHANNELS];

// Support Categories
export type VendorSupportCategory =
  (typeof VENDOR_SUPPORT.CATEGORIES)[keyof typeof VENDOR_SUPPORT.CATEGORIES];

// Utility Functions
export function vendorSupportGetTypeLabel(type: VendorSupportType): string {
  const labels: Record<VendorSupportType, string> = {
    [VENDOR_SUPPORT.TYPES.TECHNICAL]: 'Technical Support',
    [VENDOR_SUPPORT.TYPES.BILLING]: 'Billing Support',
    [VENDOR_SUPPORT.TYPES.ACCOUNT]: 'Account Support',
    [VENDOR_SUPPORT.TYPES.GENERAL]: 'General Support',
    [VENDOR_SUPPORT.TYPES.PRODUCT]: 'Product Support',
    [VENDOR_SUPPORT.TYPES.SHIPPING]: 'Shipping Support',
  };
  return labels[type] || 'Unknown';
}

export function vendorSupportGetStatusLabel(status: VendorSupportStatus): string {
  const labels: Record<VendorSupportStatus, string> = {
    [VENDOR_SUPPORT.STATUS.OPEN]: 'Open',
    [VENDOR_SUPPORT.STATUS.IN_PROGRESS]: 'In Progress',
    [VENDOR_SUPPORT.STATUS.RESOLVED]: 'Resolved',
    [VENDOR_SUPPORT.STATUS.CLOSED]: 'Closed',
    [VENDOR_SUPPORT.STATUS.ESCALATED]: 'Escalated',
    [VENDOR_SUPPORT.STATUS.PENDING]: 'Pending',
  };
  return labels[status] || 'Unknown';
}

export function vendorSupportGetPriorityLabel(priority: VendorSupportPriority): string {
  const labels: Record<VendorSupportPriority, string> = {
    [VENDOR_SUPPORT.PRIORITY.CRITICAL]: 'Critical',
    [VENDOR_SUPPORT.PRIORITY.HIGH]: 'High',
    [VENDOR_SUPPORT.PRIORITY.MEDIUM]: 'Medium',
    [VENDOR_SUPPORT.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function vendorSupportGetChannelLabel(channel: VendorSupportChannel): string {
  const labels: Record<VendorSupportChannel, string> = {
    [VENDOR_SUPPORT.CHANNELS.EMAIL]: 'Email',
    [VENDOR_SUPPORT.CHANNELS.PHONE]: 'Phone',
    [VENDOR_SUPPORT.CHANNELS.CHAT]: 'Live Chat',
    [VENDOR_SUPPORT.CHANNELS.TICKET]: 'Ticket',
    [VENDOR_SUPPORT.CHANNELS.WHATSAPP]: 'WhatsApp',
  };
  return labels[channel] || 'Unknown';
}

export function vendorSupportGetCategoryLabel(category: VendorSupportCategory): string {
  const labels: Record<VendorSupportCategory, string> = {
    [VENDOR_SUPPORT.CATEGORIES.ACCOUNT]: 'Account',
    [VENDOR_SUPPORT.CATEGORIES.PAYMENT]: 'Payment',
    [VENDOR_SUPPORT.CATEGORIES.ORDER]: 'Order',
    [VENDOR_SUPPORT.CATEGORIES.SHIPPING]: 'Shipping',
    [VENDOR_SUPPORT.CATEGORIES.PRODUCT]: 'Product',
    [VENDOR_SUPPORT.CATEGORIES.TECHNICAL]: 'Technical',
    [VENDOR_SUPPORT.CATEGORIES.GENERAL]: 'General',
  };
  return labels[category] || 'Unknown';
}

export function vendorSupportIsOpen(status: VendorSupportStatus): boolean {
  return status === VENDOR_SUPPORT.STATUS.OPEN || status === VENDOR_SUPPORT.STATUS.IN_PROGRESS;
}

export function vendorSupportIsResolved(status: VendorSupportStatus): boolean {
  return status === VENDOR_SUPPORT.STATUS.RESOLVED || status === VENDOR_SUPPORT.STATUS.CLOSED;
}

export function vendorSupportGetResponseTime(priority: VendorSupportPriority): number {
  const times: Record<VendorSupportPriority, number> = {
    [VENDOR_SUPPORT.PRIORITY.CRITICAL]: VENDOR_SUPPORT.RESPONSE_TIMES.CRITICAL,
    [VENDOR_SUPPORT.PRIORITY.HIGH]: VENDOR_SUPPORT.RESPONSE_TIMES.HIGH,
    [VENDOR_SUPPORT.PRIORITY.MEDIUM]: VENDOR_SUPPORT.RESPONSE_TIMES.MEDIUM,
    [VENDOR_SUPPORT.PRIORITY.LOW]: VENDOR_SUPPORT.RESPONSE_TIMES.LOW,
  };
  return times[priority] || 8;
}

export function vendorSupportGetResolutionTime(priority: VendorSupportPriority): number {
  const times: Record<VendorSupportPriority, number> = {
    [VENDOR_SUPPORT.PRIORITY.CRITICAL]: VENDOR_SUPPORT.RESOLUTION_TIMES.CRITICAL,
    [VENDOR_SUPPORT.PRIORITY.HIGH]: VENDOR_SUPPORT.RESOLUTION_TIMES.HIGH,
    [VENDOR_SUPPORT.PRIORITY.MEDIUM]: VENDOR_SUPPORT.RESOLUTION_TIMES.MEDIUM,
    [VENDOR_SUPPORT.PRIORITY.LOW]: VENDOR_SUPPORT.RESOLUTION_TIMES.LOW,
  };
  return times[priority] || 24;
}
