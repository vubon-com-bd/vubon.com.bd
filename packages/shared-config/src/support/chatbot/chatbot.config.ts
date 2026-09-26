/**
 * Chatbot configuration
 * @module shared-config/support/chatbot
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const CHATBOT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('CHATBOT_ENABLED', false),
  maxIntents: getOptionalEnvInt('CHATBOT_MAX_INTENTS', 500),
  maxResponsesPerIntent: getOptionalEnvInt('CHATBOT_MAX_RESPONSES', 20),
  minConfidence: getOptionalEnvInt('CHATBOT_MIN_CONFIDENCE_PCT', 70),
  confidenceHandoff: getOptionalEnvInt('CHATBOT_HANDOFF_CONFIDENCE_PCT', 50),
  maxContextMessages: getOptionalEnvInt('CHATBOT_MAX_CONTEXT', 20),
  sessionTimeoutMinutes: getOptionalEnvInt('CHATBOT_SESSION_TIMEOUT_MIN', 30),
  typingDelayMs: getOptionalEnvInt('CHATBOT_TYPING_DELAY_MS', 800),
  maxFallbackAttempts: getOptionalEnvInt('CHATBOT_MAX_FALLBACK', 3),
  handoffEnabled: getOptionalEnvBool('CHATBOT_HANDOFF_ENABLED', true),
  multiLanguage: getOptionalEnvBool('CHATBOT_MULTI_LANGUAGE', true),
});
