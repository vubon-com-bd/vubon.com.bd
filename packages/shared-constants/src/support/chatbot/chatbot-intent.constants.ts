/**
 * Chatbot Intent Constants
 * Configuration for chatbot intents
 */

export const CHATBOT_INTENT = {
  // Intent Types
  TYPES: {
    GREETING: 'greeting',
    FAREWELL: 'farewell',
    HELP: 'help',
    ACCOUNT: 'account',
    ORDER: 'order',
    PAYMENT: 'payment',
    SHIPPING: 'shipping',
    PRODUCT: 'product',
    PRICING: 'pricing',
    SUPPORT: 'support',
    COMPLAINT: 'complaint',
    FEEDBACK: 'feedback',
    GENERAL: 'general',
  } as const,

  // Intent Categories
  CATEGORIES: {
    GREETING: 'greeting',
    SUPPORT: 'support',
    TRANSACTION: 'transaction',
    INQUIRY: 'inquiry',
    FEEDBACK: 'feedback',
  } as const,

  // Intent Statuses
  STATUS: {
    DRAFT: 'draft',
    ACTIVE: 'active',
    PAUSED: 'paused',
    ARCHIVED: 'archived',
  } as const,

  // Intent Priorities
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Intent Contexts
  CONTEXTS: {
    GENERAL: 'general',
    ACCOUNT: 'account',
    ORDER: 'order',
    PAYMENT: 'payment',
    PRODUCT: 'product',
    SUPPORT: 'support',
  } as const,

  // Intent Confidence Thresholds
  CONFIDENCE: {
    MINIMUM: 0.3,
    MEDIUM: 0.5,
    HIGH: 0.7,
    MAXIMUM: 0.9,
  } as const,

  // Intent Actions
  ACTIONS: {
    REPLY: 'reply',
    ASK_QUESTION: 'ask_question',
    COLLECT_INFO: 'collect_info',
    ESCALATE: 'escalate',
    TRANSFER: 'transfer',
    CALL_API: 'call_api',
    SEND_EMAIL: 'send_email',
    SEND_SMS: 'send_sms',
    CREATE_TICKET: 'create_ticket',
    VIEW_ORDER: 'view_order',
    UPDATE_ORDER: 'update_order',
    PROCESS_PAYMENT: 'process_payment',
  } as const,
} as const;

// Intent Types
export type ChatbotIntentType = (typeof CHATBOT_INTENT.TYPES)[keyof typeof CHATBOT_INTENT.TYPES];

// Intent Categories
export type ChatbotIntentCategory =
  (typeof CHATBOT_INTENT.CATEGORIES)[keyof typeof CHATBOT_INTENT.CATEGORIES];

// Intent Statuses
export type ChatbotIntentStatus =
  (typeof CHATBOT_INTENT.STATUS)[keyof typeof CHATBOT_INTENT.STATUS];

// Intent Priorities
export type ChatbotIntentPriority =
  (typeof CHATBOT_INTENT.PRIORITY)[keyof typeof CHATBOT_INTENT.PRIORITY];

// Intent Contexts
export type ChatbotIntentContext =
  (typeof CHATBOT_INTENT.CONTEXTS)[keyof typeof CHATBOT_INTENT.CONTEXTS];

// Intent Actions
export type ChatbotIntentAction =
  (typeof CHATBOT_INTENT.ACTIONS)[keyof typeof CHATBOT_INTENT.ACTIONS];

// Utility Functions
export function chatbotIntentGetTypeLabel(type: ChatbotIntentType): string {
  const labels: Record<ChatbotIntentType, string> = {
    [CHATBOT_INTENT.TYPES.GREETING]: 'Greeting',
    [CHATBOT_INTENT.TYPES.FAREWELL]: 'Farewell',
    [CHATBOT_INTENT.TYPES.HELP]: 'Help',
    [CHATBOT_INTENT.TYPES.ACCOUNT]: 'Account',
    [CHATBOT_INTENT.TYPES.ORDER]: 'Order',
    [CHATBOT_INTENT.TYPES.PAYMENT]: 'Payment',
    [CHATBOT_INTENT.TYPES.SHIPPING]: 'Shipping',
    [CHATBOT_INTENT.TYPES.PRODUCT]: 'Product',
    [CHATBOT_INTENT.TYPES.PRICING]: 'Pricing',
    [CHATBOT_INTENT.TYPES.SUPPORT]: 'Support',
    [CHATBOT_INTENT.TYPES.COMPLAINT]: 'Complaint',
    [CHATBOT_INTENT.TYPES.FEEDBACK]: 'Feedback',
    [CHATBOT_INTENT.TYPES.GENERAL]: 'General',
  };
  return labels[type] || 'Unknown';
}

export function chatbotIntentGetCategory(type: ChatbotIntentType): ChatbotIntentCategory {
  const categories: Record<ChatbotIntentType, ChatbotIntentCategory> = {
    [CHATBOT_INTENT.TYPES.GREETING]: CHATBOT_INTENT.CATEGORIES.GREETING,
    [CHATBOT_INTENT.TYPES.FAREWELL]: CHATBOT_INTENT.CATEGORIES.GREETING,
    [CHATBOT_INTENT.TYPES.HELP]: CHATBOT_INTENT.CATEGORIES.SUPPORT,
    [CHATBOT_INTENT.TYPES.ACCOUNT]: CHATBOT_INTENT.CATEGORIES.TRANSACTION,
    [CHATBOT_INTENT.TYPES.ORDER]: CHATBOT_INTENT.CATEGORIES.TRANSACTION,
    [CHATBOT_INTENT.TYPES.PAYMENT]: CHATBOT_INTENT.CATEGORIES.TRANSACTION,
    [CHATBOT_INTENT.TYPES.SHIPPING]: CHATBOT_INTENT.CATEGORIES.TRANSACTION,
    [CHATBOT_INTENT.TYPES.PRODUCT]: CHATBOT_INTENT.CATEGORIES.INQUIRY,
    [CHATBOT_INTENT.TYPES.PRICING]: CHATBOT_INTENT.CATEGORIES.INQUIRY,
    [CHATBOT_INTENT.TYPES.SUPPORT]: CHATBOT_INTENT.CATEGORIES.SUPPORT,
    [CHATBOT_INTENT.TYPES.COMPLAINT]: CHATBOT_INTENT.CATEGORIES.FEEDBACK,
    [CHATBOT_INTENT.TYPES.FEEDBACK]: CHATBOT_INTENT.CATEGORIES.FEEDBACK,
    [CHATBOT_INTENT.TYPES.GENERAL]: CHATBOT_INTENT.CATEGORIES.INQUIRY,
  };
  return categories[type] || CHATBOT_INTENT.CATEGORIES.INQUIRY;
}

export function chatbotIntentGetStatusLabel(status: ChatbotIntentStatus): string {
  const labels: Record<ChatbotIntentStatus, string> = {
    [CHATBOT_INTENT.STATUS.DRAFT]: 'Draft',
    [CHATBOT_INTENT.STATUS.ACTIVE]: 'Active',
    [CHATBOT_INTENT.STATUS.PAUSED]: 'Paused',
    [CHATBOT_INTENT.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown';
}

export function chatbotIntentGetPriorityLabel(priority: ChatbotIntentPriority): string {
  const labels: Record<ChatbotIntentPriority, string> = {
    [CHATBOT_INTENT.PRIORITY.CRITICAL]: 'Critical',
    [CHATBOT_INTENT.PRIORITY.HIGH]: 'High',
    [CHATBOT_INTENT.PRIORITY.MEDIUM]: 'Medium',
    [CHATBOT_INTENT.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function chatbotIntentIsActive(status: ChatbotIntentStatus): boolean {
  return status === CHATBOT_INTENT.STATUS.ACTIVE;
}

export function chatbotIntentGetContext(type: ChatbotIntentType): ChatbotIntentContext {
  const contexts: Record<ChatbotIntentType, ChatbotIntentContext> = {
    [CHATBOT_INTENT.TYPES.GREETING]: CHATBOT_INTENT.CONTEXTS.GENERAL,
    [CHATBOT_INTENT.TYPES.FAREWELL]: CHATBOT_INTENT.CONTEXTS.GENERAL,
    [CHATBOT_INTENT.TYPES.HELP]: CHATBOT_INTENT.CONTEXTS.SUPPORT,
    [CHATBOT_INTENT.TYPES.ACCOUNT]: CHATBOT_INTENT.CONTEXTS.ACCOUNT,
    [CHATBOT_INTENT.TYPES.ORDER]: CHATBOT_INTENT.CONTEXTS.ORDER,
    [CHATBOT_INTENT.TYPES.PAYMENT]: CHATBOT_INTENT.CONTEXTS.PAYMENT,
    [CHATBOT_INTENT.TYPES.SHIPPING]: CHATBOT_INTENT.CONTEXTS.ORDER,
    [CHATBOT_INTENT.TYPES.PRODUCT]: CHATBOT_INTENT.CONTEXTS.PRODUCT,
    [CHATBOT_INTENT.TYPES.PRICING]: CHATBOT_INTENT.CONTEXTS.PRODUCT,
    [CHATBOT_INTENT.TYPES.SUPPORT]: CHATBOT_INTENT.CONTEXTS.SUPPORT,
    [CHATBOT_INTENT.TYPES.COMPLAINT]: CHATBOT_INTENT.CONTEXTS.SUPPORT,
    [CHATBOT_INTENT.TYPES.FEEDBACK]: CHATBOT_INTENT.CONTEXTS.SUPPORT,
    [CHATBOT_INTENT.TYPES.GENERAL]: CHATBOT_INTENT.CONTEXTS.GENERAL,
  };
  return contexts[type] || CHATBOT_INTENT.CONTEXTS.GENERAL;
}
