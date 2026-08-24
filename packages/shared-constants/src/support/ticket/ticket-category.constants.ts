/**
 * Ticket Category Constants
 * Categories for support tickets
 */

export const TICKET_CATEGORY = {
  // Category Types
  TYPES: {
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

  // Category Departments
  DEPARTMENTS: {
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

  // Default Priorities
  DEFAULT_PRIORITIES: {
    ACCOUNT: 'medium',
    PAYMENT: 'high',
    ORDER: 'medium',
    SHIPPING: 'medium',
    PRODUCT: 'medium',
    TECHNICAL: 'high',
    GENERAL: 'low',
    BILLING: 'high',
    COMPLAINT: 'high',
    FEEDBACK: 'low',
    SECURITY: 'critical',
    PRIVACY: 'high',
    LEGAL: 'high',
  } as const,

  // Category Colors (for UI)
  COLORS: {
    ACCOUNT: '#blue-500',
    PAYMENT: '#green-500',
    ORDER: '#purple-500',
    SHIPPING: '#orange-500',
    PRODUCT: '#pink-500',
    TECHNICAL: '#red-500',
    GENERAL: '#gray-500',
    BILLING: '#yellow-500',
    COMPLAINT: '#red-600',
    FEEDBACK: '#indigo-500',
    SECURITY: '#red-700',
    PRIVACY: '#purple-600',
    LEGAL: '#gray-700',
  } as const,
} as const;

// Category Types
export type TicketCategoryType = (typeof TICKET_CATEGORY.TYPES)[keyof typeof TICKET_CATEGORY.TYPES];

// Category Departments
export type TicketCategoryDepartment =
  (typeof TICKET_CATEGORY.DEPARTMENTS)[keyof typeof TICKET_CATEGORY.DEPARTMENTS];

// Utility Functions
export function ticketCategoryGetLabel(category: TicketCategoryType): string {
  const labels: Record<TicketCategoryType, string> = {
    [TICKET_CATEGORY.TYPES.ACCOUNT]: 'Account',
    [TICKET_CATEGORY.TYPES.PAYMENT]: 'Payment',
    [TICKET_CATEGORY.TYPES.ORDER]: 'Order',
    [TICKET_CATEGORY.TYPES.SHIPPING]: 'Shipping',
    [TICKET_CATEGORY.TYPES.PRODUCT]: 'Product',
    [TICKET_CATEGORY.TYPES.TECHNICAL]: 'Technical',
    [TICKET_CATEGORY.TYPES.GENERAL]: 'General',
    [TICKET_CATEGORY.TYPES.BILLING]: 'Billing',
    [TICKET_CATEGORY.TYPES.COMPLAINT]: 'Complaint',
    [TICKET_CATEGORY.TYPES.FEEDBACK]: 'Feedback',
    [TICKET_CATEGORY.TYPES.SECURITY]: 'Security',
    [TICKET_CATEGORY.TYPES.PRIVACY]: 'Privacy',
    [TICKET_CATEGORY.TYPES.LEGAL]: 'Legal',
  };
  return labels[category] || 'Unknown';
}

export function ticketCategoryGetDefaultPriority(category: TicketCategoryType): string {
  const priorities: Record<TicketCategoryType, string> = {
    [TICKET_CATEGORY.TYPES.ACCOUNT]: TICKET_CATEGORY.DEFAULT_PRIORITIES.ACCOUNT,
    [TICKET_CATEGORY.TYPES.PAYMENT]: TICKET_CATEGORY.DEFAULT_PRIORITIES.PAYMENT,
    [TICKET_CATEGORY.TYPES.ORDER]: TICKET_CATEGORY.DEFAULT_PRIORITIES.ORDER,
    [TICKET_CATEGORY.TYPES.SHIPPING]: TICKET_CATEGORY.DEFAULT_PRIORITIES.SHIPPING,
    [TICKET_CATEGORY.TYPES.PRODUCT]: TICKET_CATEGORY.DEFAULT_PRIORITIES.PRODUCT,
    [TICKET_CATEGORY.TYPES.TECHNICAL]: TICKET_CATEGORY.DEFAULT_PRIORITIES.TECHNICAL,
    [TICKET_CATEGORY.TYPES.GENERAL]: TICKET_CATEGORY.DEFAULT_PRIORITIES.GENERAL,
    [TICKET_CATEGORY.TYPES.BILLING]: TICKET_CATEGORY.DEFAULT_PRIORITIES.BILLING,
    [TICKET_CATEGORY.TYPES.COMPLAINT]: TICKET_CATEGORY.DEFAULT_PRIORITIES.COMPLAINT,
    [TICKET_CATEGORY.TYPES.FEEDBACK]: TICKET_CATEGORY.DEFAULT_PRIORITIES.FEEDBACK,
    [TICKET_CATEGORY.TYPES.SECURITY]: TICKET_CATEGORY.DEFAULT_PRIORITIES.SECURITY,
    [TICKET_CATEGORY.TYPES.PRIVACY]: TICKET_CATEGORY.DEFAULT_PRIORITIES.PRIVACY,
    [TICKET_CATEGORY.TYPES.LEGAL]: TICKET_CATEGORY.DEFAULT_PRIORITIES.LEGAL,
  };
  return priorities[category] || 'medium';
}

export function ticketCategoryGetDepartment(
  category: TicketCategoryType
): TicketCategoryDepartment {
  const departments: Record<TicketCategoryType, TicketCategoryDepartment> = {
    [TICKET_CATEGORY.TYPES.ACCOUNT]: TICKET_CATEGORY.DEPARTMENTS.ACCOUNT,
    [TICKET_CATEGORY.TYPES.PAYMENT]: TICKET_CATEGORY.DEPARTMENTS.PAYMENT,
    [TICKET_CATEGORY.TYPES.ORDER]: TICKET_CATEGORY.DEPARTMENTS.ORDER,
    [TICKET_CATEGORY.TYPES.SHIPPING]: TICKET_CATEGORY.DEPARTMENTS.SHIPPING,
    [TICKET_CATEGORY.TYPES.PRODUCT]: TICKET_CATEGORY.DEPARTMENTS.PRODUCT,
    [TICKET_CATEGORY.TYPES.TECHNICAL]: TICKET_CATEGORY.DEPARTMENTS.TECHNICAL,
    [TICKET_CATEGORY.TYPES.GENERAL]: TICKET_CATEGORY.DEPARTMENTS.GENERAL,
    [TICKET_CATEGORY.TYPES.BILLING]: TICKET_CATEGORY.DEPARTMENTS.BILLING,
    [TICKET_CATEGORY.TYPES.COMPLAINT]: TICKET_CATEGORY.DEPARTMENTS.COMPLAINT,
    [TICKET_CATEGORY.TYPES.FEEDBACK]: TICKET_CATEGORY.DEPARTMENTS.FEEDBACK,
    [TICKET_CATEGORY.TYPES.SECURITY]: TICKET_CATEGORY.DEPARTMENTS.SECURITY,
    [TICKET_CATEGORY.TYPES.PRIVACY]: TICKET_CATEGORY.DEPARTMENTS.PRIVACY,
    [TICKET_CATEGORY.TYPES.LEGAL]: TICKET_CATEGORY.DEPARTMENTS.LEGAL,
  };
  return departments[category] || 'general';
}

export function ticketCategoryIsTechnical(category: TicketCategoryType): boolean {
  const technicalCategories: TicketCategoryType[] = [
    TICKET_CATEGORY.TYPES.TECHNICAL,
    TICKET_CATEGORY.TYPES.SECURITY,
    TICKET_CATEGORY.TYPES.PRIVACY,
  ];
  return technicalCategories.includes(category);
}

export function ticketCategoryIsBilling(category: TicketCategoryType): boolean {
  const billingCategories: TicketCategoryType[] = [
    TICKET_CATEGORY.TYPES.PAYMENT,
    TICKET_CATEGORY.TYPES.BILLING,
  ];
  return billingCategories.includes(category);
}
