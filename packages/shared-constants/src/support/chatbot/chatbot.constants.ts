/**
 * Chatbot Constants
 * Configuration for chatbot system
 */

export const CHATBOT = {
  // Chatbot Types
  TYPES: {
    RULE_BASED: 'rule_based',
    ML_BASED: 'ml_based',
    HYBRID: 'hybrid',
    GENERATIVE: 'generative',
  } as const,

  // Chatbot Statuses
  STATUS: {
    DRAFT: 'draft',
    TRAINING: 'training',
    ACTIVE: 'active',
    PAUSED: 'paused',
    ERROR: 'error',
    DEPRECATED: 'deprecated',
  } as const,

  // Chatbot Platforms
  PLATFORMS: {
    WEBSITE: 'website',
    APP: 'app',
    FACEBOOK: 'facebook',
    MESSENGER: 'messenger',
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram',
    SLACK: 'slack',
    DISCORD: 'discord',
  } as const,

  // Chatbot Languages
  LANGUAGES: {
    BENGALI: 'bn',
    ENGLISH: 'en',
  } as const,

  // Chatbot Limits
  LIMITS: {
    MAX_INTENTS: 100,
    MAX_ENTITIES: 50,
    MAX_CONTEXTS: 20,
    MAX_TRAINING_SAMPLES: 10000,
    MAX_RESPONSES_PER_INTENT: 10,
    MAX_CONVERSATION_TURNS: 20,
    MAX_SESSION_DURATION: 1800, // 30 minutes
  } as const,

  // Chatbot Confidence Thresholds
  CONFIDENCE: {
    HIGH: 0.8,
    MEDIUM: 0.5,
    LOW: 0.3,
    MINIMUM: 0.2,
  } as const,

  // Chatbot Response Types
  RESPONSE_TYPES: {
    TEXT: 'text',
    BUTTON: 'button',
    QUICK_REPLY: 'quick_reply',
    CAROUSEL: 'carousel',
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
    FILE: 'file',
    FORM: 'form',
    ESCALATE: 'escalate',
  } as const,

  // Chatbot Escalation Reasons
  ESCALATION_REASONS: {
    LOW_CONFIDENCE: 'low_confidence',
    UNKNOWN_INTENT: 'unknown_intent',
    COMPLEX_QUERY: 'complex_query',
    SENSITIVE_TOPIC: 'sensitive_topic',
    CUSTOMER_REQUEST: 'customer_request',
    MULTIPLE_TURNS: 'multiple_turns',
    ANGER_DETECTED: 'anger_detected',
  } as const,
} as const;

// Chatbot Types
export type ChatbotType = (typeof CHATBOT.TYPES)[keyof typeof CHATBOT.TYPES];

// Chatbot Statuses
export type ChatbotStatus = (typeof CHATBOT.STATUS)[keyof typeof CHATBOT.STATUS];

// Chatbot Platforms
export type ChatbotPlatform = (typeof CHATBOT.PLATFORMS)[keyof typeof CHATBOT.PLATFORMS];

// Chatbot Languages
export type ChatbotLanguage = (typeof CHATBOT.LANGUAGES)[keyof typeof CHATBOT.LANGUAGES];

// Chatbot Response Types
export type ChatbotResponseType =
  (typeof CHATBOT.RESPONSE_TYPES)[keyof typeof CHATBOT.RESPONSE_TYPES];

// Chatbot Escalation Reasons
export type ChatbotEscalationReason =
  (typeof CHATBOT.ESCALATION_REASONS)[keyof typeof CHATBOT.ESCALATION_REASONS];

// Utility Functions
export function chatbotGetTypeLabel(type: ChatbotType): string {
  const labels: Record<ChatbotType, string> = {
    [CHATBOT.TYPES.RULE_BASED]: 'Rule Based',
    [CHATBOT.TYPES.ML_BASED]: 'ML Based',
    [CHATBOT.TYPES.HYBRID]: 'Hybrid',
    [CHATBOT.TYPES.GENERATIVE]: 'Generative',
  };
  return labels[type] || 'Unknown';
}

export function chatbotGetStatusLabel(status: ChatbotStatus): string {
  const labels: Record<ChatbotStatus, string> = {
    [CHATBOT.STATUS.DRAFT]: 'Draft',
    [CHATBOT.STATUS.TRAINING]: 'Training',
    [CHATBOT.STATUS.ACTIVE]: 'Active',
    [CHATBOT.STATUS.PAUSED]: 'Paused',
    [CHATBOT.STATUS.ERROR]: 'Error',
    [CHATBOT.STATUS.DEPRECATED]: 'Deprecated',
  };
  return labels[status] || 'Unknown';
}

export function chatbotGetPlatformLabel(platform: ChatbotPlatform): string {
  const labels: Record<ChatbotPlatform, string> = {
    [CHATBOT.PLATFORMS.WEBSITE]: 'Website',
    [CHATBOT.PLATFORMS.APP]: 'Mobile App',
    [CHATBOT.PLATFORMS.FACEBOOK]: 'Facebook',
    [CHATBOT.PLATFORMS.MESSENGER]: 'Messenger',
    [CHATBOT.PLATFORMS.WHATSAPP]: 'WhatsApp',
    [CHATBOT.PLATFORMS.TELEGRAM]: 'Telegram',
    [CHATBOT.PLATFORMS.SLACK]: 'Slack',
    [CHATBOT.PLATFORMS.DISCORD]: 'Discord',
  };
  return labels[platform] || 'Unknown';
}

export function chatbotIsActive(status: ChatbotStatus): boolean {
  return status === CHATBOT.STATUS.ACTIVE;
}

export function chatbotCanBeUsed(status: ChatbotStatus): boolean {
  return status === CHATBOT.STATUS.ACTIVE || status === CHATBOT.STATUS.TRAINING;
}

export function chatbotGetResponseTypeLabel(type: ChatbotResponseType): string {
  const labels: Record<ChatbotResponseType, string> = {
    [CHATBOT.RESPONSE_TYPES.TEXT]: 'Text',
    [CHATBOT.RESPONSE_TYPES.BUTTON]: 'Button',
    [CHATBOT.RESPONSE_TYPES.QUICK_REPLY]: 'Quick Reply',
    [CHATBOT.RESPONSE_TYPES.CAROUSEL]: 'Carousel',
    [CHATBOT.RESPONSE_TYPES.IMAGE]: 'Image',
    [CHATBOT.RESPONSE_TYPES.VIDEO]: 'Video',
    [CHATBOT.RESPONSE_TYPES.AUDIO]: 'Audio',
    [CHATBOT.RESPONSE_TYPES.FILE]: 'File',
    [CHATBOT.RESPONSE_TYPES.FORM]: 'Form',
    [CHATBOT.RESPONSE_TYPES.ESCALATE]: 'Escalate',
  };
  return labels[type] || 'Unknown';
}

export function chatbotGetEscalationReasonLabel(reason: ChatbotEscalationReason): string {
  const labels: Record<ChatbotEscalationReason, string> = {
    [CHATBOT.ESCALATION_REASONS.LOW_CONFIDENCE]: 'Low Confidence',
    [CHATBOT.ESCALATION_REASONS.UNKNOWN_INTENT]: 'Unknown Intent',
    [CHATBOT.ESCALATION_REASONS.COMPLEX_QUERY]: 'Complex Query',
    [CHATBOT.ESCALATION_REASONS.SENSITIVE_TOPIC]: 'Sensitive Topic',
    [CHATBOT.ESCALATION_REASONS.CUSTOMER_REQUEST]: 'Customer Request',
    [CHATBOT.ESCALATION_REASONS.MULTIPLE_TURNS]: 'Multiple Turns',
    [CHATBOT.ESCALATION_REASONS.ANGER_DETECTED]: 'Anger Detected',
  };
  return labels[reason] || 'Unknown';
}
