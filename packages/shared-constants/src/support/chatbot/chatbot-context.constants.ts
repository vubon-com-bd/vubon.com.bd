/**
 * Chatbot Context Constants
 * Configuration for chatbot contexts
 */

export const CHATBOT_CONTEXT = {
  // Context Types
  TYPES: {
    GENERAL: 'general',
    ACCOUNT: 'account',
    ORDER: 'order',
    PAYMENT: 'payment',
    PRODUCT: 'product',
    SUPPORT: 'support',
    SALES: 'sales',
    COMPLAINT: 'complaint',
    FEEDBACK: 'feedback',
    AUTHENTICATION: 'authentication',
  } as const,

  // Context Statuses
  STATUS: {
    ACTIVE: 'active',
    EXPIRED: 'expired',
    CLEARED: 'cleared',
    OVERRIDDEN: 'overridden',
  } as const,

  // Context Lifetimes (in seconds)
  LIFETIMES: {
    SHORT: 60, // 1 minute
    MEDIUM: 300, // 5 minutes
    LONG: 1800, // 30 minutes
    EXTENDED: 3600, // 1 hour
  } as const,

  // Context Priorities
  PRIORITY: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Context Scopes
  SCOPES: {
    GLOBAL: 'global',
    SESSION: 'session',
    INTENT: 'intent',
    USER: 'user',
  } as const,

  // Context Actions
  ACTIONS: {
    CREATE: 'create',
    UPDATE: 'update',
    CLEAR: 'clear',
    MERGE: 'merge',
    OVERRIDE: 'override',
  } as const,
} as const;

// Context Types
export type ChatbotContextType = (typeof CHATBOT_CONTEXT.TYPES)[keyof typeof CHATBOT_CONTEXT.TYPES];

// Context Statuses
export type ChatbotContextStatus =
  (typeof CHATBOT_CONTEXT.STATUS)[keyof typeof CHATBOT_CONTEXT.STATUS];

// Context Priorities
export type ChatbotContextPriority =
  (typeof CHATBOT_CONTEXT.PRIORITY)[keyof typeof CHATBOT_CONTEXT.PRIORITY];

// Context Scopes
export type ChatbotContextScope =
  (typeof CHATBOT_CONTEXT.SCOPES)[keyof typeof CHATBOT_CONTEXT.SCOPES];

// Context Actions
export type ChatbotContextAction =
  (typeof CHATBOT_CONTEXT.ACTIONS)[keyof typeof CHATBOT_CONTEXT.ACTIONS];

// Utility Functions
export function chatbotContextGetTypeLabel(type: ChatbotContextType): string {
  const labels: Record<ChatbotContextType, string> = {
    [CHATBOT_CONTEXT.TYPES.GENERAL]: 'General',
    [CHATBOT_CONTEXT.TYPES.ACCOUNT]: 'Account',
    [CHATBOT_CONTEXT.TYPES.ORDER]: 'Order',
    [CHATBOT_CONTEXT.TYPES.PAYMENT]: 'Payment',
    [CHATBOT_CONTEXT.TYPES.PRODUCT]: 'Product',
    [CHATBOT_CONTEXT.TYPES.SUPPORT]: 'Support',
    [CHATBOT_CONTEXT.TYPES.SALES]: 'Sales',
    [CHATBOT_CONTEXT.TYPES.COMPLAINT]: 'Complaint',
    [CHATBOT_CONTEXT.TYPES.FEEDBACK]: 'Feedback',
    [CHATBOT_CONTEXT.TYPES.AUTHENTICATION]: 'Authentication',
  };
  return labels[type] || 'Unknown';
}

export function chatbotContextGetStatusLabel(status: ChatbotContextStatus): string {
  const labels: Record<ChatbotContextStatus, string> = {
    [CHATBOT_CONTEXT.STATUS.ACTIVE]: 'Active',
    [CHATBOT_CONTEXT.STATUS.EXPIRED]: 'Expired',
    [CHATBOT_CONTEXT.STATUS.CLEARED]: 'Cleared',
    [CHATBOT_CONTEXT.STATUS.OVERRIDDEN]: 'Overridden',
  };
  return labels[status] || 'Unknown';
}

export function chatbotContextGetPriorityLabel(priority: ChatbotContextPriority): string {
  const labels: Record<ChatbotContextPriority, string> = {
    [CHATBOT_CONTEXT.PRIORITY.HIGH]: 'High',
    [CHATBOT_CONTEXT.PRIORITY.MEDIUM]: 'Medium',
    [CHATBOT_CONTEXT.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function chatbotContextGetScopeLabel(scope: ChatbotContextScope): string {
  const labels: Record<ChatbotContextScope, string> = {
    [CHATBOT_CONTEXT.SCOPES.GLOBAL]: 'Global',
    [CHATBOT_CONTEXT.SCOPES.SESSION]: 'Session',
    [CHATBOT_CONTEXT.SCOPES.INTENT]: 'Intent',
    [CHATBOT_CONTEXT.SCOPES.USER]: 'User',
  };
  return labels[scope] || 'Unknown';
}

export function chatbotContextIsActive(status: ChatbotContextStatus): boolean {
  return status === CHATBOT_CONTEXT.STATUS.ACTIVE;
}

export function chatbotContextGetLifetime(type: ChatbotContextType): number {
  const lifetimes: Record<ChatbotContextType, number> = {
    [CHATBOT_CONTEXT.TYPES.GENERAL]: CHATBOT_CONTEXT.LIFETIMES.MEDIUM,
    [CHATBOT_CONTEXT.TYPES.ACCOUNT]: CHATBOT_CONTEXT.LIFETIMES.LONG,
    [CHATBOT_CONTEXT.TYPES.ORDER]: CHATBOT_CONTEXT.LIFETIMES.MEDIUM,
    [CHATBOT_CONTEXT.TYPES.PAYMENT]: CHATBOT_CONTEXT.LIFETIMES.MEDIUM,
    [CHATBOT_CONTEXT.TYPES.PRODUCT]: CHATBOT_CONTEXT.LIFETIMES.SHORT,
    [CHATBOT_CONTEXT.TYPES.SUPPORT]: CHATBOT_CONTEXT.LIFETIMES.LONG,
    [CHATBOT_CONTEXT.TYPES.SALES]: CHATBOT_CONTEXT.LIFETIMES.MEDIUM,
    [CHATBOT_CONTEXT.TYPES.COMPLAINT]: CHATBOT_CONTEXT.LIFETIMES.EXTENDED,
    [CHATBOT_CONTEXT.TYPES.FEEDBACK]: CHATBOT_CONTEXT.LIFETIMES.MEDIUM,
    [CHATBOT_CONTEXT.TYPES.AUTHENTICATION]: CHATBOT_CONTEXT.LIFETIMES.SHORT,
  };
  return lifetimes[type] || CHATBOT_CONTEXT.LIFETIMES.MEDIUM;
}

export function chatbotContextGetPriority(type: ChatbotContextType): ChatbotContextPriority {
  const priorities: Record<ChatbotContextType, ChatbotContextPriority> = {
    [CHATBOT_CONTEXT.TYPES.GENERAL]: CHATBOT_CONTEXT.PRIORITY.LOW,
    [CHATBOT_CONTEXT.TYPES.ACCOUNT]: CHATBOT_CONTEXT.PRIORITY.HIGH,
    [CHATBOT_CONTEXT.TYPES.ORDER]: CHATBOT_CONTEXT.PRIORITY.HIGH,
    [CHATBOT_CONTEXT.TYPES.PAYMENT]: CHATBOT_CONTEXT.PRIORITY.HIGH,
    [CHATBOT_CONTEXT.TYPES.PRODUCT]: CHATBOT_CONTEXT.PRIORITY.MEDIUM,
    [CHATBOT_CONTEXT.TYPES.SUPPORT]: CHATBOT_CONTEXT.PRIORITY.HIGH,
    [CHATBOT_CONTEXT.TYPES.SALES]: CHATBOT_CONTEXT.PRIORITY.MEDIUM,
    [CHATBOT_CONTEXT.TYPES.COMPLAINT]: CHATBOT_CONTEXT.PRIORITY.HIGH,
    [CHATBOT_CONTEXT.TYPES.FEEDBACK]: CHATBOT_CONTEXT.PRIORITY.MEDIUM,
    [CHATBOT_CONTEXT.TYPES.AUTHENTICATION]: CHATBOT_CONTEXT.PRIORITY.HIGH,
  };
  return priorities[type] || CHATBOT_CONTEXT.PRIORITY.MEDIUM;
}
