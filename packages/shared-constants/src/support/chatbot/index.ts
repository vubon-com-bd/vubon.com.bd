/**
 * Chatbot Constants Index
 * Export all chatbot constants and types for easy importing
 */

// Chatbot Constants
export {
  CHATBOT,
  chatbotGetTypeLabel,
  chatbotGetStatusLabel,
  chatbotGetPlatformLabel,
  chatbotIsActive,
  chatbotCanBeUsed,
  chatbotGetResponseTypeLabel,
  chatbotGetEscalationReasonLabel,
} from './chatbot.constants';

export type {
  ChatbotType,
  ChatbotStatus,
  ChatbotPlatform,
  ChatbotLanguage,
  ChatbotResponseType,
  ChatbotEscalationReason,
} from './chatbot.constants';

// Chatbot Intent Constants
export {
  CHATBOT_INTENT,
  chatbotIntentGetTypeLabel,
  chatbotIntentGetCategory,
  chatbotIntentGetStatusLabel,
  chatbotIntentGetPriorityLabel,
  chatbotIntentIsActive,
  chatbotIntentGetContext,
} from './chatbot-intent.constants';

export type {
  ChatbotIntentType,
  ChatbotIntentCategory,
  ChatbotIntentStatus,
  ChatbotIntentPriority,
  ChatbotIntentContext,
  ChatbotIntentAction,
} from './chatbot-intent.constants';

// Chatbot Entity Constants
export {
  CHATBOT_ENTITY,
  chatbotEntityGetTypeLabel,
  chatbotEntityGetCategory,
  chatbotEntityGetStatusLabel,
  chatbotEntityIsActive,
  chatbotEntityGetRole,
} from './chatbot-entity.constants';

export type {
  ChatbotEntityType,
  ChatbotEntityCategory,
  ChatbotEntityStatus,
  ChatbotEntityExtractionMethod,
  ChatbotEntityRole,
} from './chatbot-entity.constants';

// Chatbot Context Constants
export {
  CHATBOT_CONTEXT,
  chatbotContextGetTypeLabel,
  chatbotContextGetStatusLabel,
  chatbotContextGetPriorityLabel,
  chatbotContextGetScopeLabel,
  chatbotContextIsActive,
  chatbotContextGetLifetime,
  chatbotContextGetPriority,
} from './chatbot-context.constants';

export type {
  ChatbotContextType,
  ChatbotContextStatus,
  ChatbotContextPriority,
  ChatbotContextScope,
  ChatbotContextAction,
} from './chatbot-context.constants';
