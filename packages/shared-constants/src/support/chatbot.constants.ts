export const CHATBOT_TYPE = {
  RULE_BASED: 'rule_based',
  AI_POWERED: 'ai_powered',
  HYBRID: 'hybrid',
  FLOW_BASED: 'flow_based',
  INTENT_BASED: 'intent_based',
} as const;

export const CHATBOT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  TRAINING: 'training',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
} as const;

export const CHATBOT_INTENT = {
  GREETING: 'greeting',
  ORDER_STATUS: 'order_status',
  PRODUCT_INFO: 'product_info',
  PRICING: 'pricing',
  SHIPPING: 'shipping',
  RETURNS: 'returns',
  REFUNDS: 'refunds',
  ACCOUNT: 'account',
  PAYMENT: 'payment',
  COMPLAINT: 'complaint',
  HUMAN_HANDOFF: 'human_handoff',
  GOODBYE: 'goodbye',
  FALLBACK: 'fallback',
} as const;

export const CHATBOT = {
  TYPE: CHATBOT_TYPE,
  STATUS: CHATBOT_STATUS,
  INTENT: CHATBOT_INTENT,
  MAX_INTENTS: 500,
  MAX_RESPONSES_PER_INTENT: 20,
  MIN_CONFIDENCE: 0.7,
  CONFIDENCE_HANDOFF: 0.5,
  MAX_CONTEXT_MESSAGES: 20,
  SESSION_TIMEOUT_MINUTES: 30,
  TYPING_DELAY_MS: 800,
  MAX_FALLBACK_ATTEMPTS: 3,
  HANDOFF_ENABLED: true,
  MULTI_LANGUAGE: true,
  RETENTION_DAYS: 365,
} as const;

export type ChatbotTypeType = (typeof CHATBOT_TYPE)[keyof typeof CHATBOT_TYPE];
export type ChatbotStatusType = (typeof CHATBOT_STATUS)[keyof typeof CHATBOT_STATUS];
export type ChatbotIntentType = (typeof CHATBOT_INTENT)[keyof typeof CHATBOT_INTENT];
